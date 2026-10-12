import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building2, Search, ShieldCheck } from 'lucide-react';
import { searchDirectory } from '@/lib/institution-directory';
import { useDirectoryVersion } from '@/hooks/use-directory-version';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  className?: string;
}

const InstitutionAutocomplete = ({ className = '' }: Props) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const dirVersion = useDirectoryVersion();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const results = useMemo(() => searchDirectory(query), [query, dirVersion]);

  const go = (slug: string) => {
    setOpen(false);
    setQuery('');
    navigate(`/institucija/${slug}`);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={e => { if (e.key === 'Enter' && results[0]) go(results[0].slug); }}
        placeholder={t('inst.searchPlaceholder')}
        aria-label={t('inst.searchPlaceholder')}
        className="pl-9 h-11 bg-white text-gray-900"
      />
      {open && query.trim().length >= 2 && (
        <ul className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-80 overflow-y-auto text-left">
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-gray-500 break-words">{t('inst.noResults')}</li>
          ) : results.map(r => (
            <li key={r.slug}>
              <button
                type="button"
                onMouseDown={() => go(r.slug)}
                className="w-full flex items-start gap-2 px-4 py-2.5 hover:bg-blue-50 text-left"
              >
                <Building2 className="h-4 w-4 mt-0.5 text-[#003D7A] flex-shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-gray-900 break-words">{r.name}</span>
                  <span className="block text-xs text-gray-500 truncate">
                    {t(`inst.kind.${r.kind}`)}{r.canton ? ` · ${r.canton}` : ''}
                  </span>
                </span>
                {r.forms.length > 0 && (
                  <Badge variant="secondary" className="text-xs flex-shrink-0">{r.forms.length}</Badge>
                )}
                {r.verified && <ShieldCheck className="h-4 w-4 text-[#00A651] flex-shrink-0" aria-label={t('inst.verified')} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstitutionAutocomplete;
