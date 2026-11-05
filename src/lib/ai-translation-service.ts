// ============================================================
// AI Batch Translation Service
// Translates document names and descriptions into EN, DE, TR
// Uses MyMemory API with rate limiting and batch processing
// ============================================================

import { getAllDokumenti, getPrevodiForDokument, batchInsertPrevodi, PrevodInsert, DokumentWithInstitucija } from './dokumenti-service';

// ============================================================
// Types
// ============================================================

export interface TranslationProgress {
  total: number;
  completed: number;
  failed: number;
  currentDocument: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  errors: string[];
}

export interface BatchTranslationResult {
  totalDocuments: number;
  translatedDocuments: number;
  translationsCreated: number;
  errors: string[];
  duration: number;
}

type ProgressCallback = (progress: TranslationProgress) => void;

// Target languages for translation
const TARGET_LANGUAGES = [
  { code: 'en', myMemoryCode: 'en', label: 'English' },
  { code: 'de', myMemoryCode: 'de', label: 'Deutsch' },
  { code: 'tr', myMemoryCode: 'tr', label: 'Türkçe' },
];

// Rate limiting: MyMemory allows ~500 req/day, ~10 req/sec
const DELAY_BETWEEN_REQUESTS_MS = 600; // ~1.6 req/sec to stay safe
const MAX_RETRIES = 2;

// ============================================================
// MyMemory Translation API
// ============================================================

async function translateText(
  text: string,
  targetLang: string,
  sourceLang: string = 'bs'
): Promise<string | null> {
  if (!text || text.trim().length === 0) return null;

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url);

      if (response.status === 429) {
        // Rate limited — wait longer and retry
        await delay(5000 * (attempt + 1));
        continue;
      }

      if (!response.ok) {
        console.warn(`Translation API returned ${response.status} for "${text.substring(0, 30)}..."`);
        return null;
      }

      const data = await response.json();

      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        const translated = data.responseData.translatedText;
        // MyMemory sometimes returns the same text if it can't translate
        if (translated.toLowerCase() === text.toLowerCase()) {
          return null; // No meaningful translation
        }
        return translated;
      }

      // Rate limit response from MyMemory
      if (data.responseStatus === 429 || data.responseStatus === 403) {
        await delay(5000 * (attempt + 1));
        continue;
      }

      return null;
    } catch (error) {
      console.error(`Translation attempt ${attempt + 1} failed:`, error);
      if (attempt < MAX_RETRIES) {
        await delay(2000 * (attempt + 1));
      }
    }
  }

  return null;
}

// ============================================================
// Batch Translation Logic
// ============================================================

/**
 * Run batch translation for all documents that are missing translations.
 * Translates naziv_original and opis_original into EN, DE, TR.
 */
export async function runBatchTranslation(
  onProgress?: ProgressCallback
): Promise<BatchTranslationResult> {
  const startTime = Date.now();
  const errors: string[] = [];
  let translationsCreated = 0;
  let translatedDocuments = 0;

  const progress: TranslationProgress = {
    total: 0,
    completed: 0,
    failed: 0,
    currentDocument: '',
    status: 'running',
    errors: [],
  };

  const updateProgress = () => {
    if (onProgress) onProgress({ ...progress });
  };

  try {
    // 1. Fetch all documents
    const documents = await getAllDokumenti();
    progress.total = documents.length;
    updateProgress();

    if (documents.length === 0) {
      progress.status = 'completed';
      updateProgress();
      return {
        totalDocuments: 0,
        translatedDocuments: 0,
        translationsCreated: 0,
        errors: [],
        duration: Date.now() - startTime,
      };
    }

    // 2. Process each document
    for (const doc of documents) {
      progress.currentDocument = doc.naziv_original.substring(0, 50);
      updateProgress();

      try {
        const docTranslationsCreated = await translateDocument(doc);
        translationsCreated += docTranslationsCreated;
        if (docTranslationsCreated > 0) {
          translatedDocuments++;
        }
        progress.completed++;
      } catch (err) {
        const errorMsg = `Failed: ${doc.naziv_original.substring(0, 40)} — ${err instanceof Error ? err.message : 'Unknown error'}`;
        errors.push(errorMsg);
        progress.failed++;
        progress.errors.push(errorMsg);
      }

      updateProgress();
    }

    progress.status = 'completed';
    progress.currentDocument = '';
    updateProgress();
  } catch (err) {
    progress.status = 'error';
    const errorMsg = err instanceof Error ? err.message : 'Batch translation failed';
    errors.push(errorMsg);
    progress.errors.push(errorMsg);
    updateProgress();
  }

  return {
    totalDocuments: progress.total,
    translatedDocuments,
    translationsCreated,
    errors,
    duration: Date.now() - startTime,
  };
}

/**
 * Translate a single document into all target languages.
 * Skips languages that already have translations.
 * Returns the number of new translations created.
 */
async function translateDocument(doc: DokumentWithInstitucija): Promise<number> {
  // Get existing translations
  const existingPrevodi = await getPrevodiForDokument(doc.id);
  const existingLanguages = new Set(existingPrevodi.map((p) => p.jezik));

  // Determine which languages need translation
  const missingLanguages = TARGET_LANGUAGES.filter(
    (lang) => !existingLanguages.has(lang.code)
  );

  if (missingLanguages.length === 0) return 0;

  const newPrevodi: PrevodInsert[] = [];

  for (const lang of missingLanguages) {
    // Translate name
    await delay(DELAY_BETWEEN_REQUESTS_MS);
    const translatedName = await translateText(
      doc.naziv_original,
      lang.myMemoryCode
    );

    if (!translatedName) continue; // Skip if translation failed

    // Translate description if available
    let translatedDesc: string | null = null;
    if (doc.opis_original) {
      await delay(DELAY_BETWEEN_REQUESTS_MS);
      translatedDesc = await translateText(
        doc.opis_original,
        lang.myMemoryCode
      );
    }

    newPrevodi.push({
      dokument_id: doc.id,
      jezik: lang.code,
      naziv_preveden: translatedName,
      opis_preveden: translatedDesc || undefined,
    });
  }

  // Batch insert all translations for this document
  if (newPrevodi.length > 0) {
    const { success, error } = await batchInsertPrevodi(newPrevodi);
    if (!success) {
      throw new Error(error || 'Failed to insert translations');
    }
  }

  return newPrevodi.length;
}

/**
 * Translate a single document by ID (for on-demand translation).
 */
export async function translateSingleDocument(
  doc: DokumentWithInstitucija,
  targetLanguages?: string[]
): Promise<{ created: number; errors: string[] }> {
  const errors: string[] = [];
  const languages = targetLanguages
    ? TARGET_LANGUAGES.filter((l) => targetLanguages.includes(l.code))
    : TARGET_LANGUAGES;

  const existingPrevodi = await getPrevodiForDokument(doc.id);
  const existingLanguages = new Set(existingPrevodi.map((p) => p.jezik));

  const missingLanguages = languages.filter(
    (lang) => !existingLanguages.has(lang.code)
  );

  if (missingLanguages.length === 0) {
    return { created: 0, errors: [] };
  }

  const newPrevodi: PrevodInsert[] = [];

  for (const lang of missingLanguages) {
    await delay(DELAY_BETWEEN_REQUESTS_MS);
    const translatedName = await translateText(
      doc.naziv_original,
      lang.myMemoryCode
    );

    if (!translatedName) {
      errors.push(`Could not translate to ${lang.label}`);
      continue;
    }

    let translatedDesc: string | null = null;
    if (doc.opis_original) {
      await delay(DELAY_BETWEEN_REQUESTS_MS);
      translatedDesc = await translateText(
        doc.opis_original,
        lang.myMemoryCode
      );
    }

    newPrevodi.push({
      dokument_id: doc.id,
      jezik: lang.code,
      naziv_preveden: translatedName,
      opis_preveden: translatedDesc || undefined,
    });
  }

  if (newPrevodi.length > 0) {
    const { success, error } = await batchInsertPrevodi(newPrevodi);
    if (!success) {
      errors.push(error || 'Database insert failed');
    }
  }

  return { created: newPrevodi.length, errors };
}

/**
 * Get translation coverage stats for all documents.
 */
export async function getTranslationCoverage(): Promise<{
  totalDocuments: number;
  fullyTranslated: number;
  partiallyTranslated: number;
  untranslated: number;
  coveragePercent: number;
}> {
  const documents = await getAllDokumenti();
  let fullyTranslated = 0;
  let partiallyTranslated = 0;
  let untranslated = 0;

  for (const doc of documents) {
    const prevodi = await getPrevodiForDokument(doc.id);
    const translatedLangs = prevodi.length;

    if (translatedLangs >= TARGET_LANGUAGES.length) {
      fullyTranslated++;
    } else if (translatedLangs > 0) {
      partiallyTranslated++;
    } else {
      untranslated++;
    }
  }

  const totalDocuments = documents.length;
  const coveragePercent = totalDocuments > 0
    ? Math.round(((fullyTranslated + partiallyTranslated * 0.5) / totalDocuments) * 100)
    : 0;

  return {
    totalDocuments,
    fullyTranslated,
    partiallyTranslated,
    untranslated,
    coveragePercent,
  };
}

// ============================================================
// Utility
// ============================================================

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}