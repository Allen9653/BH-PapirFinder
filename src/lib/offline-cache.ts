// ============================================================
// Offline Cache Utility
// Manages PDF caching for offline access via Service Worker Cache API
// ============================================================

const PDF_CACHE_NAME = 'bh-papirfinder-pdfs-v1';

// ============================================================
// Check if a specific URL is cached
// ============================================================

export async function isUrlCached(url: string): Promise<boolean> {
  if (!('caches' in window)) return false;

  try {
    const cache = await caches.open(PDF_CACHE_NAME);
    const response = await cache.match(url);
    return !!response;
  } catch {
    return false;
  }
}

// ============================================================
// Manually cache a PDF URL
// ============================================================

export async function cachePdfUrl(url: string): Promise<boolean> {
  if (!('caches' in window)) return false;

  try {
    const cache = await caches.open(PDF_CACHE_NAME);
    const response = await fetch(url, { mode: 'cors' });

    if (!response.ok) {
      // Try no-cors as fallback (opaque response)
      const opaqueResponse = await fetch(url, { mode: 'no-cors' });
      await cache.put(url, opaqueResponse);
      return true;
    }

    await cache.put(url, response);
    return true;
  } catch (error) {
    console.warn('Failed to cache PDF:', url, error);
    return false;
  }
}

// ============================================================
// Remove a cached PDF
// ============================================================

export async function removeCachedPdf(url: string): Promise<boolean> {
  if (!('caches' in window)) return false;

  try {
    const cache = await caches.open(PDF_CACHE_NAME);
    return await cache.delete(url);
  } catch {
    return false;
  }
}

// ============================================================
// Get all cached PDF URLs
// ============================================================

export async function getCachedPdfUrls(): Promise<string[]> {
  if (!('caches' in window)) return [];

  try {
    const cache = await caches.open(PDF_CACHE_NAME);
    const keys = await cache.keys();
    return keys.map((request) => request.url);
  } catch {
    return [];
  }
}

// ============================================================
// Get cache size info
// ============================================================

export async function getCacheStats(): Promise<{
  count: number;
  estimatedSizeKB: number;
}> {
  if (!('caches' in window)) return { count: 0, estimatedSizeKB: 0 };

  try {
    const cache = await caches.open(PDF_CACHE_NAME);
    const keys = await cache.keys();
    let totalSize = 0;

    for (const request of keys) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.clone().blob();
        totalSize += blob.size;
      }
    }

    return {
      count: keys.length,
      estimatedSizeKB: Math.round(totalSize / 1024),
    };
  } catch {
    return { count: 0, estimatedSizeKB: 0 };
  }
}

// ============================================================
// Clear all cached PDFs
// ============================================================

export async function clearPdfCache(): Promise<boolean> {
  if (!('caches' in window)) return false;

  try {
    return await caches.delete(PDF_CACHE_NAME);
  } catch {
    return false;
  }
}

// ============================================================
// Batch cache multiple PDFs (with progress)
// ============================================================

export async function batchCachePdfs(
  urls: string[],
  onProgress?: (cached: number, total: number) => void
): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  for (let i = 0; i < urls.length; i++) {
    const result = await cachePdfUrl(urls[i]);
    if (result) {
      success++;
    } else {
      failed++;
    }
    if (onProgress) {
      onProgress(i + 1, urls.length);
    }
  }

  return { success, failed };
}

// ============================================================
// Register message listener for SW communication
// ============================================================

export function notifySwToCachePdf(url: string): void {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CACHE_PDF',
      url,
    });
  }
}