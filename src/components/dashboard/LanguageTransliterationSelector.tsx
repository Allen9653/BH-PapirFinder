import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SUPPORTED_LANGUAGES, type Language } from '@/locales';

/**
 * Selektor jezika i pisma unutar korisničkog panela.
 * Koristi isti globalni i18n store kao i ostatak aplikacije.
 */
const LanguageTransliterationSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
      <SelectTrigger
        className="w-[150px] sm:w-[180px] h-9 text-xs border-gray-200"
        aria-label={t('nav.language')}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span className="truncate">{lang.shortName}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageTransliterationSelector;