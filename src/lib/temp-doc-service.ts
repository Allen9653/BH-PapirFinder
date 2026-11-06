import { supabase } from './supabaseClient';
import { toBase64 } from './client-pdf';

export interface TempDocSession {
  session_token: string;
  signed_url: string;
  expires_at: string;
}

const FN = 'handle-temp-doc';

async function call<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke(FN, { body });
  if (error) {
    const ctx = (error as { context?: Response }).context;
    const detail = ctx && typeof ctx.json === 'function' ? await ctx.json().catch(() => null) : null;
    throw new Error(detail?.error ?? error.message);
  }
  return data as T;
}

/** Privremeno sprema PDF (najviše 5 sati) i vraća session_token + potpisani link. */
export async function uploadTempDoc(bytes: Uint8Array, fileName: string): Promise<TempDocSession> {
  const data = await call<Partial<TempDocSession> & { error?: string }>({
    action: 'upload',
    file_name: fileName,
    content_base64: toBase64(bytes),
  });
  if (!data?.session_token || !data.signed_url) throw new Error(data?.error ?? 'Upload nije uspio');
  return data as TempDocSession;
}

/** Trajno briše privremeni dokument sa servera. */
export async function deleteTempDoc(sessionToken: string): Promise<void> {
  const data = await call<{ deleted?: boolean; error?: string }>({ action: 'delete', session_token: sessionToken });
  if (!data?.deleted) throw new Error(data?.error ?? 'Brisanje nije uspjelo');
}
