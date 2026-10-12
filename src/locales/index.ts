// ============================================================
// BH PapirFinder — Centralizirani i18n (JEDAN IZVOR ISTINE)
//
// Podržani jezici / pisma:
//   bs      — Bosanski (Latinica)  [izvorni jezik, fallback #1]
//   bs-Cyrl — Bosanski (Ćirilica)  [automatski generisano iz bs]
//   en      — English              [fallback #2]
//   de      — Deutsch
//   tr      — Türkçe
//
// Fallback lanac: traženi jezik → bs → en → ključ (nikad prazan ekran)
// ============================================================

import { latinToCyrillic } from '@/lib/cyrillic-converter';
import { bs, type Dictionary, type TranslationKey } from './bs';
import { en } from './en';
import { de } from './de';
import { tr } from './tr';

export type { Dictionary, TranslationKey };

export type Language = 'bs' | 'bs-Cyrl' | 'en' | 'de' | 'tr';

export interface LanguageOption {
  code: Language;
  nativeName: string;
  shortName: string;
  flag: string;
}

export const DEFAULT_LANGUAGE: Language = 'bs';
export const LANGUAGE_STORAGE_KEY = 'bh_papirfinder_language';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'bs', nativeName: 'Bosanski (Latinica)', shortName: 'Bosanski', flag: '🇧🇦' },
  { code: 'bs-Cyrl', nativeName: 'Босански (Ћирилица)', shortName: 'Ћирилица', flag: '🇧🇦' },
  { code: 'en', nativeName: 'English', shortName: 'English', flag: '🇬🇧' },
  { code: 'de', nativeName: 'Deutsch', shortName: 'Deutsch', flag: '🇩🇪' },
  { code: 'tr', nativeName: 'Türkçe', shortName: 'Türkçe', flag: '🇹🇷' },
];

// ------------------------------------------------------------
// Normalizacija jezičkih kodova (uključujući stare: sr-Cyrl, bs-Latn)
// ------------------------------------------------------------

const LANGUAGE_ALIASES: Record<string, Language> = {
  bs: 'bs',
  'bs-latn': 'bs',
  'bs-ba': 'bs',
  hr: 'bs',
  'hr-hr': 'bs',
  sr: 'bs-Cyrl',
  'sr-cyrl': 'bs-Cyrl',
  'sr-rs': 'bs-Cyrl',
  'bs-cyrl': 'bs-Cyrl',
  cyr: 'bs-Cyrl',
  en: 'en',
  'en-us': 'en',
  'en-gb': 'en',
  de: 'de',
  'de-de': 'de',
  'de-at': 'de',
  'de-ch': 'de',
  tr: 'tr',
  'tr-tr': 'tr',
};

/** Normalizuje bilo koji jezički kod u podržani jezik. */
export function normalizeLanguage(lang?: string | null): Language {
  if (!lang) return DEFAULT_LANGUAGE;
  const key = String(lang).trim().toLowerCase();
  if (LANGUAGE_ALIASES[key]) return LANGUAGE_ALIASES[key];
  const base = key.split('-')[0];
  if (LANGUAGE_ALIASES[base]) return LANGUAGE_ALIASES[base];
  return DEFAULT_LANGUAGE;
}

// ------------------------------------------------------------
// Automatsko generisanje ćiriličnog rječnika iz bosanske latinice
// Brendovi, e-mailovi, URL-ovi i latinične skraćenice ostaju netaknuti.
// ------------------------------------------------------------

/** Tokeni koji se NE preslovljavaju (brendovi, tehnički pojmovi, skraćenice). */
const PRESERVED_TOKENS = [
  'BH PapirFinder',
  'PapirFinder',
  'B&H Assistant',
  'e-Citizen PRO',
  'e-Citizen',
  'Smart Document Studio',
  'Document Studio',
  'PayPal',
  'PRO',
  'BHS',
  'AI',
  'PDF',
  'URL',
  'KM',
  'BiH',
  'ZDK',
  'JIB',
  'MBS',
  'Push',
  'push',
  'Offline',
  'offline',
  'Online',
  'online',
  'Latinica',
  'latinica',
  'Ćirilica',
  'ćirilica',
  'Latinicu',
  'latinicu',
  'Ćirilicu',
  'ćirilicu',
];

/** Regex za email adrese i URL-ove koji moraju ostati u latinici. */
const TECHNICAL_PATTERN = /([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}|https?:\/\/\S+|www\.\S+)/gi;

/**
 * Preslovljava jedan string u ćirilicu, štiteći brendove, e-mailove i URL-ove.
 */
function transliterateValue(value: string): string {
  if (!value) return value;

  const placeholders: string[] = [];
  // Sentinel iz Unicode privatne zone (nije kontrolni znak — lint-safe)
  const SENTINEL = '\uE000';
  const store = (match: string): string => {
    placeholders.push(match);
    return `${SENTINEL}${placeholders.length - 1}${SENTINEL}`;
  };

  // 1) Zaštiti email adrese i URL-ove
  let working = value.replace(TECHNICAL_PATTERN, store);

  // 2) Zaštiti brendove i tehničke tokene (duži prvi da se izbjegne parcijalno poklapanje)
  const sortedTokens = [...PRESERVED_TOKENS].sort((a, b) => b.length - a.length);
  for (const token of sortedTokens) {
    if (!working.includes(token)) continue;
    working = working.split(token).join(store(token));
  }

  // 3) Preslovi ostatak
  let result = latinToCyrillic(working);

  // 4) Vrati zaštićene tokene
  result = result.replace(
    new RegExp(`${SENTINEL}(\\d+)${SENTINEL}`, 'g'),
    (_m, index: string) => placeholders[Number(index)],
  );

  return result;
}

/** Generiše cjelovit ćirilični rječnik iz bosanske latinice. */
function buildCyrillicDictionary(source: Dictionary): Dictionary {
  const output = {} as Dictionary;
  (Object.keys(source) as TranslationKey[]).forEach((key) => {
    output[key] = transliterateValue(source[key]);
  });
  return output;
}

export const bsCyrl: Dictionary = buildCyrillicDictionary(bs as Dictionary);

// ------------------------------------------------------------
// Registar rječnika
// ------------------------------------------------------------

export const dictionaries: Record<Language, Dictionary> = {
  bs: bs as Dictionary,
  'bs-Cyrl': bsCyrl,
  en,
  de,
  tr,
};

/** Naslijeđeni naziv (kompatibilnost sa starim kodom). */
export const translations = dictionaries;

// ------------------------------------------------------------
// Prevođenje sa fallback lancem i interpolacijom
// ------------------------------------------------------------

export type TranslateParams = Record<string, string | number>;

function interpolate(template: string, params?: TranslateParams): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = params[name];
    return value === undefined || value === null ? match : String(value);
  });
}

/**
 * Vraća prevod za ključ uz graceful fallback:
 * traženi jezik → bs (latinica) → en → sam ključ.
 */
export function translate(
  lang: Language | string,
  key: string,
  params?: TranslateParams,
): string {
  const normalized = normalizeLanguage(lang);
  const chain: Language[] = [normalized, 'bs', 'en'];

  for (const candidate of chain) {
    const dict = dictionaries[candidate] as Record<string, string> | undefined;
    const value = dict?.[key];
    if (typeof value === 'string' && value.length > 0) {
      return interpolate(value, params);
    }
  }

  // Nikad ne prikazuj sirovi ključ sa prefiksom — vrati zadnji segment kao čitljiv tekst
  if (import.meta.env.DEV) {
    console.warn(`[i18n] Nedostaje prevodni ključ: "${key}" (jezik: ${normalized})`);
  }
  const readable = key.includes('.') ? key.split('.').pop() ?? key : key;
  return interpolate(readable, params);
}

/** Naslijeđeni API — zadržan zbog kompatibilnosti. */
export function getTranslation(lang: Language | string, key: string): string {
  return translate(lang, key);
}

/** Vraća cijeli rječnik za dati jezik (sa fallbackom na bs). */
export function getDictionary(lang: Language | string): Dictionary {
  return dictionaries[normalizeLanguage(lang)] ?? (bs as Dictionary);
}

// ------------------------------------------------------------
// Naslijeđeni dashboard API (dashboard.* ključevi bez prefiksa)
// ------------------------------------------------------------

export type DashboardLocale = Record<string, string>;

/**
 * Naslijeđena podrška: vraća objekt sa dashboard ključevima bez `dashboard.` prefiksa,
 * tako da stari kod (`loc.savedDocuments`) nastavi raditi.
 */
export function getDashboardLocale(lang: Language | string): DashboardLocale {
  const dict = getDictionary(lang) as Record<string, string>;
  const result: DashboardLocale = {};
  Object.keys(dict).forEach((key) => {
    if (key.startsWith('dashboard.')) {
      result[key.slice('dashboard.'.length)] = dict[key];
    }
  });
  return result;
}

// ------------------------------------------------------------
// Perzistencija odabranog jezika
// ------------------------------------------------------------

/**
 * Čita sačuvani jezik iz localStorage.
 *
 * Napomena: ciljna publika su građani BiH, pa je podrazumijevani jezik uvijek
 * bosanski (latinica) dok korisnik sam ne odabere drugi jezik. Jezik uređaja se
 * NE koristi automatski, jer je na većini uređaja postavljen na engleski.
 */
export function loadStoredLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored) return normalizeLanguage(stored);
  } catch (error) {
    console.error('[i18n] Neuspješno čitanje jezičke postavke:', error);
  }
  return DEFAULT_LANGUAGE;
}

/** Zapisuje odabrani jezik u localStorage. */
export function persistLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch (error) {
    console.error('[i18n] Neuspješno čuvanje jezičke postavke:', error);
  }
}

/** HTML lang atribut za odabrani jezik (pristupačnost i SEO). */
export function getHtmlLang(lang: Language): string {
  switch (lang) {
    case 'bs-Cyrl':
      return 'bs-Cyrl';
    case 'en':
      return 'en';
    case 'de':
      return 'de';
    case 'tr':
      return 'tr';
    default:
      return 'bs';
  }
}

export default dictionaries;