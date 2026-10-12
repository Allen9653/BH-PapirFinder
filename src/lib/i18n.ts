// ============================================================
// BH PapirFinder — i18n kompatibilnosti sloj
//
// PAŽNJA: Ovo NIJE izvor istine. Svi rječnici i logika prevođenja
// nalaze se u `src/locales/`. Ovaj fajl samo re-eksportuje javni API
// kako bi stari importi (`@/lib/i18n`) nastavili raditi.
// ============================================================

export {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  dictionaries,
  translations,
  bsCyrl,
  translate,
  getTranslation,
  getDictionary,
  getDashboardLocale,
  normalizeLanguage,
  loadStoredLanguage,
  persistLanguage,
  getHtmlLang,
} from '@/locales';

export type {
  Language,
  LanguageOption,
  Dictionary,
  TranslationKey,
  DashboardLocale,
  TranslateParams,
} from '@/locales';