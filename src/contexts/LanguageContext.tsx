import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  getDictionary,
  getHtmlLang,
  loadStoredLanguage,
  normalizeLanguage,
  persistLanguage,
  translate,
  type Dictionary,
  type Language,
  type TranslateParams,
} from '@/locales';

interface LanguageContextType {
  /** Trenutno aktivni jezik / pismo */
  language: Language;
  /** Mijenja jezik i trenutno re-renderuje sve potrošače konteksta */
  setLanguage: (lang: Language | string) => void;
  /** Prevodi ključ uz fallback lanac (traženi jezik → bs → en) */
  t: (key: string, params?: TranslateParams) => string;
  /** Cijeli rječnik za trenutni jezik (za rijetke slučajeve masovnog pristupa) */
  dictionary: Dictionary;
  /** Da li je jezička postavka još u fazi učitavanja */
  isLoading: boolean;
}

const defaultContextValue: LanguageContextType = {
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  t: (key: string, params?: TranslateParams) => translate(DEFAULT_LANGUAGE, key, params),
  dictionary: getDictionary(DEFAULT_LANGUAGE),
  isLoading: false,
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

/**
 * Globalni i18n provider — jedini izvor jezičkog stanja u aplikaciji.
 * Perzistira odabir u localStorage i sinhronizuje ga između tabova.
 */
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicijalizacija odmah iz localStorage kako ne bi bilo "bljeska" pogrešnog jezika
  const [language, setLanguageState] = useState<Language>(() => loadStoredLanguage());
  const [isLoading, setIsLoading] = useState(false);

  // Postavi <html lang> radi pristupačnosti i SEO-a
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = getHtmlLang(language);
    }
  }, [language]);

  // Sinhronizacija između više otvorenih tabova / prozora
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === LANGUAGE_STORAGE_KEY && event.newValue) {
        setLanguageState(normalizeLanguage(event.newValue));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const setLanguage = useCallback((lang: Language | string) => {
    const normalized = normalizeLanguage(lang);
    setIsLoading(true);
    setLanguageState(normalized);
    persistLanguage(normalized);
    setIsLoading(false);
  }, []);

  const dictionary = useMemo(() => getDictionary(language), [language]);

  // `t` se mijenja pri promjeni jezika → svi potrošači se instantno re-renderuju
  const t = useCallback(
    (key: string, params?: TranslateParams) => translate(language, key, params),
    [language],
  );

  const value = useMemo<LanguageContextType>(
    () => ({ language, setLanguage, t, dictionary, isLoading }),
    [language, setLanguage, t, dictionary, isLoading],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

/** Hook za pristup jeziku i prevodima. */
export const useLanguage = (): LanguageContextType => useContext(LanguageContext);

/** Skraćeni hook kada je potrebna samo funkcija prevođenja. */
export const useTranslation = () => {
  const { t, language, setLanguage } = useLanguage();
  return { t, language, setLanguage };
};

export default LanguageContext;