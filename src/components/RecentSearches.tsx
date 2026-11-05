import React from 'react';
import { History, X, Search, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RecentSearchesProps {
  searches: string[];
  onSelectSearch: (query: string) => void;
  onRemoveSearch: (query: string) => void;
  onClearAll: () => void;
  className?: string;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  searches,
  onSelectSearch,
  onRemoveSearch,
  onClearAll,
  className = '',
}) => {
  const { t } = useLanguage();

  if (!searches || searches.length === 0) {
    return null;
  }

  return (
    <div
      className={`w-full max-w-2xl mx-auto mt-4 px-3 py-2.5 bg-black/20 backdrop-blur-md rounded-xl border border-white/15 text-left animate-in fade-in duration-200 ${className}`}
      aria-label="Nedavne pretrage"
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-200">
          <History className="h-3.5 w-3.5 flex-shrink-0 text-cyan-300" />
          <span>{t('home.recentSearches') || 'Nedavne pretrage'}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-gray-200 border border-white/15">
            {searches.length}/5
          </span>
        </div>
        <button
          type="button"
          onClick={onClearAll}
          className="text-[11px] text-gray-300 hover:text-white flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded hover:bg-white/10"
          title="Obriši sve nedavne pretrage"
        >
          <Trash2 className="h-3 w-3" />
          <span>{t('home.clearRecentSearches') || 'Obriši sve'}</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {searches.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="group inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white text-xs rounded-full border border-white/20 transition-all shadow-sm backdrop-blur-sm cursor-pointer"
            onClick={() => onSelectSearch(item)}
            title={`Ponovi pretragu: "${item}"`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectSearch(item);
              }
            }}
          >
            <Search className="h-3 w-3 text-cyan-200 opacity-70 group-hover:opacity-100 flex-shrink-0" />
            <span className="font-medium truncate max-w-[150px] sm:max-w-[200px]">
              {item}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveSearch(item);
              }}
              className="p-0.5 text-white/60 hover:text-white hover:bg-black/25 rounded-full transition-colors flex-shrink-0"
              title={`Ukloni "${item}" iz historije`}
              aria-label={`Ukloni "${item}"`}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
