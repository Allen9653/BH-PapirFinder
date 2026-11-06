import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '@/locales';

/**
 * Globalni selektor jezika / pisma.
 * Promjena instantno re-renderuje cijelu aplikaciju putem LanguageProvider-a.
 */
const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const current = SUPPORTED_LANGUAGES.find((lang) => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 max-w-[190px]"
          aria-label={t('nav.language')}
        >
          <Globe className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">{current?.flag}</span>
          <span className="hidden md:inline truncate">{current?.shortName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${language === lang.code ? 'bg-[#003D7A] text-white' : ''}`}
          >
            <span className="mr-2 text-lg">{lang.flag}</span>
            <span className="flex-1 truncate">{lang.nativeName}</span>
            {language === lang.code && <Check className="ml-2 h-4 w-4 flex-shrink-0" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;