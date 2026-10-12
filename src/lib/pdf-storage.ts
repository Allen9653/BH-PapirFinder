import { DOC_TTL_SECONDS } from './doc-retention';
import { supabase } from './supabaseClient';

// ============================================================
// PDF Storage Service — Supabase Storage with Signed URLs
// ============================================================

const BUCKET_NAME = 'pdf-forms';
const SIGNED_URL_EXPIRY_SECONDS = DOC_TTL_SECONDS;

/**
 * Upload a filled PDF to Supabase Storage and return a signed URL
 * 
 * @param pdfBytes - The PDF file as Uint8Array
 * @param fileName - The desired filename (without path)
 * @returns Object with signed URL and expiry time, or error
 */
export async function uploadPdfAndGetSignedUrl(
  pdfBytes: Uint8Array,
  fileName: string
): Promise<{ url: string; expiresAt: Date } | { error: string }> {
  try {
    // Generate a unique path: user_id/timestamp_filename
    const timestamp = Date.now();
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `generated/${timestamp}_${sanitizedName}`;

    // Convert Uint8Array to Blob for upload
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, blob, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (uploadError) {
      console.error('[PdfStorage] Upload error:', uploadError.message);

      // If bucket doesn't exist, try creating it or use fallback
      if (uploadError.message.includes('not found') || uploadError.message.includes('Bucket')) {
        return await fallbackLocalDownload(pdfBytes, fileName);
      }

      return { error: `Upload failed: ${uploadError.message}` };
    }

    // Generate signed URL (valid for 15 minutes)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filePath, DOC_TTL_SECONDS);

    if (signedUrlError || !signedUrlData?.signedUrl) {
      console.error('[PdfStorage] Signed URL error:', signedUrlError?.message);
      return { error: `Failed to generate download link: ${signedUrlError?.message}` };
    }

    const expiresAt = new Date(Date.now() + DOC_TTL_SECONDS * 1000);

    return {
      url: signedUrlData.signedUrl,
      expiresAt,
    };
  } catch (err) {
    console.error('[PdfStorage] Unexpected error:', err);
    return await fallbackLocalDownload(pdfBytes, fileName);
  }
}

/**
 * Fallback: Create a local blob URL for download when Supabase Storage is unavailable
 */
async function fallbackLocalDownload(
  pdfBytes: Uint8Array,
  fileName: string
): Promise<{ url: string; expiresAt: Date }> {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  // Local blob URLs don't expire, but we set a logical expiry for UI consistency
  const expiresAt = new Date(Date.now() + DOC_TTL_SECONDS * 1000);

  // Auto-revoke after 15 minutes to free memory
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, SIGNED_URL_EXPIRY_SECONDS * 1000);

  console.log(`[PdfStorage] Using local fallback for: ${fileName}`);
  return { url, expiresAt };
}

/**
 * Delete an uploaded PDF from storage (cleanup)
 */
export async function deletePdf(filePath: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error('[PdfStorage] Delete error:', error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * List all generated PDFs for the current user
 */
export async function listUserPdfs(): Promise<{ name: string; created_at: string }[]> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list('generated', {
        limit: 50,
        sortBy: { column: 'created_at', order: 'desc' },
      });

    if (error || !data) return [];
    return data.map(f => ({ name: f.name, created_at: f.created_at || '' }));
  } catch {
    return [];
  }
}

/**
 * Trigger a browser download of a PDF from its URL
 */
export function triggerPdfDownload(url: string, fileName: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Format the expiry time for display
 */
export function formatExpiryTime(expiresAt: Date, lang: string = 'bs'): string {
  const now = new Date();
  const diffMs = expiresAt.getTime() - now.getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

  const messages: Record<string, string> = {
    bs: `Link važi još ${diffMinutes} minuta`,
    en: `Link valid for ${diffMinutes} more minutes`,
    tr: `Bağlantı ${diffMinutes} dakika daha geçerli`,
    de: `Link noch ${diffMinutes} Minuten gültig`,
    'bs-Cyrl': `Линк важи још ${diffMinutes} минута`,
  };

  return messages[lang] || messages['bs'];
}