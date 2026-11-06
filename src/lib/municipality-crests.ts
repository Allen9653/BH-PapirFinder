import { supabase } from './supabaseClient';
import { cyrillicToLatinText } from './transliteration';

// ============================================================
// Municipality Crests — Supabase Storage (public bucket)
// ============================================================

export const CREST_BUCKET = 'municipality-crests';

/** Removes type prefixes so "Opština Zenica" and "Zenica" map to the same file. */
const TYPE_PREFIX =
  /^(grad|opština|opcina|opstina|municipality|city)\s+/i;

const COMMON_SUFFIX = /\s*\((?:kantona|kantoni|regija|distrikt)\)\s*/gi;

/**
 * Turns a display name into the storage file name used in the bucket.
 *
 * "Bosanska Krupa"      -> "bosanska-krupa.png"
 * "Opština Zenica"      -> "zenica.png"
 * "Мркоњић Град" (Cyr.) -> "mrkonjic-grad.png"
 * "Mrkonjić Grad"       -> "mrkonjic-grad.png"
 */
export function crestFileName(name: string): string {
  if (!name || !name.trim()) return '';

  let slug = cyrillicToLatinText(name.trim());

  slug = slug.replace(TYPE_PREFIX, (m, p1: string) =>
    /^(grad|opština|opcina|opstina|municipality|city)$/i.test(p1)
      ? ''
      : m,
  );
  slug = slug.replace(COMMON_SUFFIX, ' ');

  return (
    slug
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // strip diacritics
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '.png'
  );
}

/**
 * Public Storage URL for a municipality crest.
 * Returns null for empty names so callers can skip rendering.
 */
export function getMunicipalityCrestUrl(name: string): string | null {
  const fileName = crestFileName(name);
  if (!fileName) return null;

  const { data } = supabase.storage.from(CREST_BUCKET).getPublicUrl(fileName);
  return data?.publicUrl ?? null;
}

/**
 * Checks whether the crest image actually exists in the bucket.
 * Public buckets still return a publicUrl for missing files, so this
 * uses a HEAD-style request via `fetch` (GET) and inspects the status.
 *
 * Results are cached in-memory per file name for the lifetime of the
 * session so we don't flood Supabase with repeated HEAD requests
 * when the same crest is rendered many times (e.g. in lists).
 */
const existsCache = new Map<string, boolean>();

/** Clears the session cache (e.g. after uploading a missing crest). */
export function clearCrestExistsCache(): void {
  existsCache.clear();
}

export async function crestExists(name: string): Promise<boolean> {
  const fileName = crestFileName(name);
  if (!fileName) return false;

  const cached = existsCache.get(fileName);
  if (cached !== undefined) return cached;

  const url = getMunicipalityCrestUrl(name);
  if (!url) {
    existsCache.set(fileName, false);
    return false;
  }

  let result = false;
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (res.ok) result = true;
    else if (res.status === 405) {
      const getRes = await fetch(url, { method: 'GET' });
      result = getRes.ok;
    }
  } catch {
    result = false;
  }

  existsCache.set(fileName, result);
  return result;
}
