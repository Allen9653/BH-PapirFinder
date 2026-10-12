import { supabase } from './supabaseClient';
import { Language, translations } from './i18n';

// ============================================================
// Translation Cache — Dynamic Localization from Supabase
// ============================================================
// Equivalent of: def get_localized_string(key, lang)
// Fetches translations from 'translation_cache' table in Supabase
// Falls back to static translations if DB is unavailable
// ============================================================

/**
 * Supabase table: translation_cache
 * Expected columns:
 *   - id: uuid (primary key)
 *   - key: text (translation key, e.g. 'ask_for_father_name')
 *   - lang: text (language code: 'bs', 'en', 'de', 'tr', 'bs-Cyrl')
 *   - value: text (translated string)
 *   - context: text (optional, for disambiguation)
 *   - created_at: timestamptz
 *   - updated_at: timestamptz
 */

export interface TranslationEntry {
  id: string;
  key: string;
  lang: string;
  value: string;
  context?: string;
  created_at?: string;
  updated_at?: string;
}

// In-memory cache to avoid repeated DB calls
const memoryCache = new Map<string, string>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
let lastCacheRefresh = 0;

/**
 * Generate a cache key for the memory map
 */
function getCacheKey(key: string, lang: string): string {
  return `${lang}::${key}`;
}

/**
 * get_localized_string — Main function
 * 
 * Fetches a localized string from the translation_cache table.
 * If not found in DB, falls back to static i18n translations.
 * 
 * @param key - Translation key (e.g. 'ask_for_father_name')
 * @param lang - Language code ('bs', 'en', 'de', 'tr', 'bs-Cyrl')
 * @returns Translated string or the key itself if no translation found
 * 
 * @example
 * const text = await getLocalizedString('ask_for_father_name', 'tr');
 * // Returns: 'Babanızın adı nedir?'
 * 
 * @example
 * const text = await getLocalizedString('greeting', 'de');
 * // Returns: 'Willkommen!' (from DB or static fallback)
 */
export async function getLocalizedString(key: string, lang: string): Promise<string> {
  // 1. Check in-memory cache first
  const cacheKey = getCacheKey(key, lang);
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey)!;
  }

  // 2. Try fetching from Supabase translation_cache table
  try {
    const { data, error } = await supabase
      .from('translation_cache')
      .select('value')
      .eq('key', key)
      .eq('lang', lang)
      .single();

    if (!error && data?.value) {
      // Store in memory cache
      memoryCache.set(cacheKey, data.value);
      return data.value;
    }
  } catch (err) {
    console.warn(`[TranslationCache] DB lookup failed for key="${key}", lang="${lang}":`, err);
  }

  // 3. Fallback to static translations
  const staticTranslation = getStaticTranslation(key, lang as Language);
  if (staticTranslation) {
    memoryCache.set(cacheKey, staticTranslation);
    return staticTranslation;
  }

  // 4. Try Bosnian (default language) as last resort
  if (lang !== 'bs') {
    const bsFallback = getStaticTranslation(key, 'bs');
    if (bsFallback) {
      return bsFallback;
    }
  }

  // 5. Return the key itself if nothing found
  return key;
}

/**
 * Synchronous version — uses only memory cache and static translations
 * Useful for rendering where async is not possible
 */
export function getLocalizedStringSync(key: string, lang: string): string {
  // Check memory cache
  const cacheKey = getCacheKey(key, lang);
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey)!;
  }

  // Fallback to static
  const staticTranslation = getStaticTranslation(key, lang as Language);
  if (staticTranslation) return staticTranslation;

  // Try default language
  if (lang !== 'bs') {
    const bsFallback = getStaticTranslation(key, 'bs');
    if (bsFallback) return bsFallback;
  }

  return key;
}

/**
 * Preload all translations for a given language into memory cache
 * Call this on app initialization or language change for better performance
 */
export async function preloadTranslations(lang: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('translation_cache')
      .select('key, value')
      .eq('lang', lang);

    if (error || !data) {
      console.warn(`[TranslationCache] Failed to preload translations for lang="${lang}":`, error?.message);
      return 0;
    }

    let count = 0;
    for (const entry of data) {
      if (entry.key && entry.value) {
        memoryCache.set(getCacheKey(entry.key, lang), entry.value);
        count++;
      }
    }

    lastCacheRefresh = Date.now();
    console.log(`[TranslationCache] Preloaded ${count} translations for lang="${lang}"`);
    return count;
  } catch (err) {
    console.error('[TranslationCache] Preload error:', err);
    return 0;
  }
}

/**
 * Batch fetch multiple translation keys at once
 * More efficient than calling getLocalizedString multiple times
 */
export async function getLocalizedStrings(
  keys: string[],
  lang: string
): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  const keysToFetch: string[] = [];

  // Check memory cache first
  for (const key of keys) {
    const cacheKey = getCacheKey(key, lang);
    if (memoryCache.has(cacheKey)) {
      result[key] = memoryCache.get(cacheKey)!;
    } else {
      keysToFetch.push(key);
    }
  }

  // Fetch remaining from DB
  if (keysToFetch.length > 0) {
    try {
      const { data, error } = await supabase
        .from('translation_cache')
        .select('key, value')
        .eq('lang', lang)
        .in('key', keysToFetch);

      if (!error && data) {
        for (const entry of data) {
          if (entry.key && entry.value) {
            result[entry.key] = entry.value;
            memoryCache.set(getCacheKey(entry.key, lang), entry.value);
          }
        }
      }
    } catch (err) {
      console.warn('[TranslationCache] Batch fetch error:', err);
    }

    // Fill remaining with static fallbacks
    for (const key of keysToFetch) {
      if (!result[key]) {
        const staticVal = getStaticTranslation(key, lang as Language);
        result[key] = staticVal || key;
      }
    }
  }

  return result;
}

/**
 * Add or update a translation in the cache (admin function)
 */
export async function setLocalizedString(
  key: string,
  lang: string,
  value: string,
  context?: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('translation_cache')
      .upsert(
        {
          key,
          lang,
          value,
          context: context || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key,lang' }
      );

    if (error) {
      console.error('[TranslationCache] Failed to set translation:', error.message);
      return false;
    }

    // Update memory cache
    memoryCache.set(getCacheKey(key, lang), value);
    return true;
  } catch (err) {
    console.error('[TranslationCache] Set error:', err);
    return false;
  }
}

/**
 * Delete a translation from the cache (admin function)
 */
export async function deleteLocalizedString(key: string, lang: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('translation_cache')
      .delete()
      .eq('key', key)
      .eq('lang', lang);

    if (error) {
      console.error('[TranslationCache] Failed to delete translation:', error.message);
      return false;
    }

    // Remove from memory cache
    memoryCache.delete(getCacheKey(key, lang));
    return true;
  } catch (err) {
    console.error('[TranslationCache] Delete error:', err);
    return false;
  }
}

/**
 * Clear the in-memory cache (useful when translations are updated externally)
 */
export function clearTranslationCache(): void {
  memoryCache.clear();
  lastCacheRefresh = 0;
}

/**
 * Check if the cache needs refreshing based on TTL
 */
export function isCacheStale(): boolean {
  return Date.now() - lastCacheRefresh > CACHE_TTL_MS;
}

/**
 * Get all available translation keys for a language
 */
export async function getAvailableKeys(lang: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('translation_cache')
      .select('key')
      .eq('lang', lang);

    if (error || !data) return [];
    return data.map(d => d.key);
  } catch {
    return [];
  }
}

// ============================================================
// AI Assistant Dialog Keys — Predefined for the Smart Form UX
// ============================================================

/**
 * Common dialog keys used by the AI assistant
 * These should be populated in the translation_cache table
 */
export const AI_DIALOG_KEYS = {
  // Greetings & General
  greeting: 'ai_greeting',
  askConfirmation: 'ai_ask_confirmation',
  thankYou: 'ai_thank_you',
  goodbye: 'ai_goodbye',

  // Form filling flow
  foundForm: 'ai_found_form',                    // "Pronašao sam obrazac za {form_name} u {institution}"
  askToFill: 'ai_ask_to_fill',                   // "Želite li da ga popunim za vas?"
  confirmYes: 'ai_confirm_yes',                  // "Da, molim te."
  haveProfileData: 'ai_have_profile_data',       // "Vaše ime i JMBG već imam iz vašeg profila."
  askMissingField: 'ai_ask_missing_field',       // "Treba mi još {field_name}?"
  askFatherName: 'ask_for_father_name',          // "Ime vašeg oca?"
  askAddress: 'ask_for_address',                 // "Adresa prebivališta?"
  askPurpose: 'ask_for_purpose',                 // "Svrha zahtjeva?"
  askJMBG: 'ask_for_jmbg',                      // "Vaš JMBG?"

  // Completion
  documentReady: 'ai_document_ready',            // "Gotovo! Evo vašeg popunjenog PDF-a."
  downloadLink: 'ai_download_link',              // "Spremno za printanje. [Link]"
  linkExpiry: 'ai_link_expiry',                  // "Link važi 15 minuta."

  // Errors
  formNotFound: 'ai_form_not_found',             // "Nisam pronašao traženi obrazac."
  tryAgain: 'ai_try_again',                      // "Pokušajte ponovo ili kontaktirajte podršku."
  serviceUnavailable: 'ai_service_unavailable',  // "Usluga trenutno nije dostupna."
} as const;

/**
 * Get a dialog string for the AI assistant with variable interpolation
 * 
 * @example
 * const msg = await getAIDialogString('ai_found_form', 'bs', { form_name: 'rodni list', institution: 'Općina Zenica' });
 * // Returns: "Pronašao sam obrazac za rodni list u Općina Zenica. Želite li da ga popunim za vas?"
 */
export async function getAIDialogString(
  key: string,
  lang: string,
  variables?: Record<string, string>
): Promise<string> {
  let text = await getLocalizedString(key, lang);

  // Interpolate variables: {variable_name} -> value
  if (variables) {
    for (const [varName, varValue] of Object.entries(variables)) {
      text = text.replace(new RegExp(`\\{${varName}\\}`, 'g'), varValue);
    }
  }

  return text;
}

// ============================================================
// Helper: Static translation lookup
// ============================================================

function getStaticTranslation(key: string, lang: Language): string | null {
  const langTranslations = translations[lang];
  if (!langTranslations) return null;

  const value = (langTranslations as Record<string, string>)[key];
  return value || null;
}

// ============================================================
// Supported languages mapping
// ============================================================

export const SUPPORTED_LANGUAGES = {
  bs: { name: 'Bosanski', nativeName: 'Bosanski', flag: '🇧🇦' },
  en: { name: 'English', nativeName: 'English', flag: '🇬🇧' },
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  'bs-Cyrl': { name: 'Serbian Cyrillic', nativeName: 'Српски', flag: '🇷🇸' },
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;