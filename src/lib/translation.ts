// Translation module for Bosnian → EN/DE/TR
// Uses MyMemory Translation API (free, no API key required)
// Includes rate limit handling and basic fallback dictionary

export type SupportedLanguage = 'en' | 'de' | 'tr';

interface TranslationCache {
  [key: string]: {
    translation: string;
    timestamp: number;
  };
}

// Cache translations in memory (24 hours)
const translationCache: TranslationCache = {};
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Rate limiting state
let requestCount = 0;
let rateLimitResetTime = Date.now() + 60 * 60 * 1000; // 1 hour window
const MAX_REQUESTS_PER_HOUR = 450; // Stay under 500/day limit with buffer
let isRateLimited = false;

// Basic fallback dictionary for common UI terms
const fallbackDictionary: Record<string, Record<SupportedLanguage, string>> = {
  'Pretraga': { en: 'Search', de: 'Suche', tr: 'Arama' },
  'Obrazac': { en: 'Form', de: 'Formular', tr: 'Form' },
  'Dokument': { en: 'Document', de: 'Dokument', tr: 'Belge' },
  'Općina': { en: 'Municipality', de: 'Gemeinde', tr: 'Belediye' },
  'Prijava': { en: 'Login', de: 'Anmeldung', tr: 'Giriş' },
  'Registracija': { en: 'Registration', de: 'Registrierung', tr: 'Kayıt' },
  'Pretplata': { en: 'Subscription', de: 'Abonnement', tr: 'Abonelik' },
  'Podrška': { en: 'Support', de: 'Unterstützung', tr: 'Destek' },
  'Početna': { en: 'Home', de: 'Startseite', tr: 'Ana Sayfa' },
  'Preuzmi': { en: 'Download', de: 'Herunterladen', tr: 'İndir' },
  'Ispis': { en: 'Print', de: 'Drucken', tr: 'Yazdır' },
  'Podijeli': { en: 'Share', de: 'Teilen', tr: 'Paylaş' },
  'Nazad': { en: 'Back', de: 'Zurück', tr: 'Geri' },
  'Dalje': { en: 'Next', de: 'Weiter', tr: 'İleri' },
  'Spremi': { en: 'Save', de: 'Speichern', tr: 'Kaydet' },
  'Otkaži': { en: 'Cancel', de: 'Abbrechen', tr: 'İptal' },
  'Potvrdi': { en: 'Confirm', de: 'Bestätigen', tr: 'Onayla' },
  'Kategorija': { en: 'Category', de: 'Kategorie', tr: 'Kategori' },
  'Rezultati': { en: 'Results', de: 'Ergebnisse', tr: 'Sonuçlar' },
  'Nema rezultata': { en: 'No results', de: 'Keine Ergebnisse', tr: 'Sonuç yok' },
  'Učitavanje': { en: 'Loading', de: 'Laden', tr: 'Yükleniyor' },
  'Greška': { en: 'Error', de: 'Fehler', tr: 'Hata' },
  'Uspješno': { en: 'Success', de: 'Erfolg', tr: 'Başarılı' },
  'Vodič': { en: 'Guide', de: 'Anleitung', tr: 'Rehber' },
  'Privatnost': { en: 'Privacy', de: 'Datenschutz', tr: 'Gizlilik' },
  'Uslovi korištenja': { en: 'Terms of Use', de: 'Nutzungsbedingungen', tr: 'Kullanım Koşulları' },
};

/**
 * Check and update rate limiting state
 */
function checkRateLimit(): boolean {
  const now = Date.now();

  // Reset counter every hour
  if (now > rateLimitResetTime) {
    requestCount = 0;
    rateLimitResetTime = now + 60 * 60 * 1000;
    isRateLimited = false;
  }

  if (requestCount >= MAX_REQUESTS_PER_HOUR) {
    isRateLimited = true;
    return false;
  }

  return true;
}

/**
 * Try to find a fallback translation from the dictionary
 */
function getFallbackTranslation(text: string, targetLang: SupportedLanguage): string | null {
  // Exact match
  if (fallbackDictionary[text]?.[targetLang]) {
    return fallbackDictionary[text][targetLang];
  }

  // Case-insensitive match
  const lowerText = text.toLowerCase();
  for (const [key, translations] of Object.entries(fallbackDictionary)) {
    if (key.toLowerCase() === lowerText) {
      return translations[targetLang];
    }
  }

  return null;
}

/**
 * Translates text from Bosnian to target language
 * @param text - Text to translate (in Bosnian)
 * @param targetLang - Target language code (en, de, tr)
 * @returns Translated text
 */
export async function translateText(
  text: string,
  targetLang: SupportedLanguage
): Promise<string> {
  if (!text || text.trim().length === 0) {
    return text;
  }

  // Check cache first
  const cacheKey = `${text}_${targetLang}`;
  const cached = translationCache[cacheKey];

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.translation;
  }

  // Check fallback dictionary before making API call
  const fallback = getFallbackTranslation(text, targetLang);
  if (fallback) {
    translationCache[cacheKey] = { translation: fallback, timestamp: Date.now() };
    return fallback;
  }

  // Check rate limit before making API call
  if (!checkRateLimit()) {
    console.warn('Translation rate limit reached, returning original text');
    return text;
  }

  try {
    // Use MyMemory Translation API (free, no API key required)
    const sourceLang = 'bs'; // Bosnian
    const encodedText = encodeURIComponent(text);
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceLang}|${targetLang}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    requestCount++;

    if (!response.ok) {
      // If we get 429 (Too Many Requests), mark as rate limited
      if (response.status === 429) {
        isRateLimited = true;
        console.warn('Translation API rate limited (429)');
        return text;
      }
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();

    // Check for quota exceeded in response
    if (data.responseStatus === 429 || data.quotaFinished) {
      isRateLimited = true;
      console.warn('Translation API quota finished');
      return text;
    }

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translation = data.responseData.translatedText;

      // Cache the translation
      translationCache[cacheKey] = {
        translation,
        timestamp: Date.now(),
      };

      return translation;
    } else {
      throw new Error('Translation failed: Invalid response');
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.warn('Translation request timed out');
    } else {
      console.error('Translation error:', error);
    }
    // Return original text if translation fails
    return text;
  }
}

/**
 * Translates multiple texts in batch with concurrency control
 * @param texts - Array of texts to translate
 * @param targetLang - Target language code
 * @returns Array of translated texts
 */
export async function translateBatch(
  texts: string[],
  targetLang: SupportedLanguage
): Promise<string[]> {
  // Process in batches of 5 to avoid overwhelming the API
  const batchSize = 5;
  const results: string[] = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(text => translateText(text, targetLang))
    );
    results.push(...batchResults);

    // Small delay between batches to be respectful to the API
    if (i + batchSize < texts.length) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  return results;
}

/**
 * Gets language name from code
 * @param langCode - Language code (en, de, tr)
 * @returns Full language name
 */
export function getLanguageName(langCode: SupportedLanguage): string {
  const languageNames: Record<SupportedLanguage, string> = {
    en: 'English',
    de: 'Deutsch',
    tr: 'Türkçe',
  };

  return languageNames[langCode];
}

/**
 * Clears translation cache
 */
export function clearTranslationCache(): void {
  Object.keys(translationCache).forEach(key => {
    delete translationCache[key];
  });
}

/**
 * Gets cache statistics
 * @returns Object with cache size and oldest entry age
 */
export function getCacheStats(): { size: number; oldestEntryAge: number; isRateLimited: boolean; requestsUsed: number } {
  const keys = Object.keys(translationCache);
  const now = Date.now();

  let oldestAge = 0;

  keys.forEach(key => {
    const age = now - translationCache[key].timestamp;
    if (age > oldestAge) {
      oldestAge = age;
    }
  });

  return {
    size: keys.length,
    oldestEntryAge: Math.floor(oldestAge / 1000 / 60), // in minutes
    isRateLimited,
    requestsUsed: requestCount,
  };
}