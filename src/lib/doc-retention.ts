/** Rok čuvanja privremenih dokumenata: 5 sati od kreiranja. */
export const DOC_TTL_MS = 5 * 60 * 60 * 1000;
export const DOC_TTL_SECONDS = DOC_TTL_MS / 1000;
/** true tek kada je u Supabase-u pokrenut supabase/auto-delete-5h.sql i dodan Vault ključ. */
export const SERVER_PURGE_ACTIVE = false;

const LOCAL_DOC_KEYS = ['bh_papirfinder_saved_docs', 'bh_papirfinder_generated_docs'];

type StoredDoc = Record<string, unknown> & { created_at?: string; createdAt?: string };

const createdAt = (d: StoredDoc): number => Date.parse(String(d.created_at ?? d.createdAt ?? ''));

/** Briše iz localStorage sve dokumente starije od ttlMs; zapisima bez vremena dodjeljuje trenutno vrijeme. */
export function purgeExpiredLocalDocs(ttlMs = DOC_TTL_MS, now = Date.now()): number {
  let removed = 0;
  for (const key of LOCAL_DOC_KEYS) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const list = JSON.parse(raw) as StoredDoc[];
      if (!Array.isArray(list)) continue;
      const kept = list
        .map(d => (Number.isNaN(createdAt(d)) ? { ...d, created_at: new Date(now).toISOString() } : d))
        .filter(d => now - createdAt(d) < ttlMs);
      removed += list.length - kept.length;
      localStorage.setItem(key, JSON.stringify(kept));
    } catch {
      localStorage.removeItem(key);
    }
  }
  return removed;
}

let timer: ReturnType<typeof setInterval> | undefined;

/** Pokreće brisanje pri učitavanju i svakih 5 minuta. */
export function startDocRetention(intervalMs = 5 * 60 * 1000): void {
  purgeExpiredLocalDocs();
  if (!timer) timer = setInterval(() => purgeExpiredLocalDocs(), intervalMs);
}
