// Supabase Edge Function: handle-temp-doc
// Privremeno čuvanje PDF dokumenata (najviše 5 sati) i trenutno brisanje po session_token-u.
// Service-role ključ postoji samo ovdje (env SUPABASE_SERVICE_ROLE_KEY), nikad na frontendu.
import { createClient } from 'npm:@supabase/supabase-js@2';

const BUCKET = 'temp_documents';
const TTL_SECONDS = 5 * 60 * 60;
const MAX_BYTES = 5 * 1024 * 1024;

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

async function sha256(text: string): Promise<string> {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(d)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false },
});

/** Briše istekle dokumente (dodatno uz pg_cron zadatak iz auto-delete-5h.sql). */
async function purgeExpired() {
  const { data } = await admin.from('temp_doc_sessions').select('id, storage_path').lt('expires_at', new Date().toISOString()).limit(100);
  if (!data?.length) return;
  await admin.storage.from(BUCKET).remove(data.map(r => r.storage_path));
  await admin.from('temp_doc_sessions').delete().in('id', data.map(r => r.id));
}

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let body: { action?: string; content_base64?: string; session_token?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  try {
    if (body.action === 'upload') {
      let bytes: Uint8Array;
      try {
        bytes = Uint8Array.from(atob(String(body.content_base64 ?? '')), c => c.charCodeAt(0));
      } catch {
        return json({ error: 'Invalid base64' }, 400);
      }
      if (!bytes.length || bytes.length > MAX_BYTES) return json({ error: 'File must be between 1 B and 5 MB' }, 413);
      if (new TextDecoder().decode(bytes.subarray(0, 5)) !== '%PDF-') return json({ error: 'Only PDF files are allowed' }, 415);

      await purgeExpired();
      const token = `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, '');
      const path = `${crypto.randomUUID()}.pdf`;
      const expiresAt = new Date(Date.now() + TTL_SECONDS * 1000).toISOString();

      const up = await admin.storage.from(BUCKET).upload(path, bytes, { contentType: 'application/pdf', upsert: false });
      if (up.error) return json({ error: up.error.message }, 500);

      const ins = await admin.from('temp_doc_sessions').insert({ token_hash: await sha256(token), storage_path: path, expires_at: expiresAt });
      if (ins.error) {
        await admin.storage.from(BUCKET).remove([path]);
        return json({ error: ins.error.message }, 500);
      }

      const signed = await admin.storage.from(BUCKET).createSignedUrl(path, TTL_SECONDS);
      if (signed.error) return json({ error: signed.error.message }, 500);
      return json({ session_token: token, signed_url: signed.data.signedUrl, expires_at: expiresAt });
    }

    if (body.action === 'delete') {
      const token = String(body.session_token ?? '');
      if (!/^[a-f0-9]{64}$/.test(token)) return json({ error: 'Invalid session_token' }, 400);
      const { data, error } = await admin.from('temp_doc_sessions').select('id, storage_path').eq('token_hash', await sha256(token)).maybeSingle();
      if (error) return json({ error: error.message }, 500);
      if (!data) return json({ deleted: true, already_removed: true });
      const rm = await admin.storage.from(BUCKET).remove([data.storage_path]);
      if (rm.error) return json({ error: rm.error.message }, 500);
      const del = await admin.from('temp_doc_sessions').delete().eq('id', data.id);
      if (del.error) return json({ error: del.error.message }, 500);
      return json({ deleted: true });
    }

    return json({ error: 'Unknown action' }, 400);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : 'Server error' }, 500);
  }
});
