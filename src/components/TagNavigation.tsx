import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Tag,
  Receipt,
  ClipboardCheck,
  FileText,
  Building,
  ScrollText,
  Briefcase,
  HeartHandshake,
  X,
  Layers,
  Sparkles,
} from 'lucide-react';

export interface FormItemForTag {
  id?: string;
  name: string;
  category: string;
  description?: string;
  keywords?: string;
}

export interface UniversalTagDefinition {
  id: string;
  labels: {
    bs: string;
    'bs-Cyrl': string;
    en: string;
    de: string;
    tr: string;
  };
  subtitleKey?: string;
  icon: React.ComponentType<{ className?: string }>;
  matches: (form: FormItemForTag) => boolean;
}

export const UNIVERSAL_TAGS: UniversalTagDefinition[] = [
  {
    id: 'tax',
    labels: {
      bs: 'Porezi & Takse',
      'bs-Cyrl': 'Порези и таксе',
      en: 'Tax',
      de: 'Steuern & Abgaben',
      tr: 'Vergi ve Harçlar',
    },
    icon: Receipt,
    matches: (form) => {
      const text = `${form.name} ${form.category} ${form.description || ''} ${form.keywords || ''}`.toLowerCase();
      return /porez|taks|prihod|fiskal|carin|naknad|tax|duty|fee/.test(text);
    },
  },
  {
    id: 'registration',
    labels: {
      bs: 'Registracija & CIPS',
      'bs-Cyrl': 'Регистрација и ЦИПС',
      en: 'Registration',
      de: 'Registrierung',
      tr: 'Kayıt ve CIPS',
    },
    icon: ClipboardCheck,
    matches: (form) => {
      const text = `${form.name} ${form.category} ${form.description || ''} ${form.keywords || ''}`.toLowerCase();
      return /registr|cips|prebival|boravi[sš]|upis|prijava|ličn|licn|kart|identity|registration/.test(text);
    },
  },
  {
    id: 'application',
    labels: {
      bs: 'Zahtjevi & Prijave',
      'bs-Cyrl': 'Захтјеви и пријаве',
      en: 'Application',
      de: 'Anträge',
      tr: 'Başvurular',
    },
    icon: FileText,
    matches: (form) => {
      const text = `${form.name} ${form.category} ${form.description || ''} ${form.keywords || ''}`.toLowerCase();
      return /zahtjev|molb|prijavn|obrazac|formul|application|petition|request/.test(text);
    },
  },
  {
    id: 'permits',
    labels: {
      bs: 'Dozvole & Urbanizam',
      'bs-Cyrl': 'Дозволе и урбанизам',
      en: 'Permits & Urbanism',
      de: 'Genehmigungen',
      tr: 'İzinler ve İmar',
    },
    icon: Building,
    matches: (form) => {
      const text = `${form.name} ${form.category} ${form.description || ''} ${form.keywords || ''}`.toLowerCase();
      return /dozvol|urban|gradnj|saglasn|lokacij|upotreb|građev|gradev|permit|license/.test(text);
    },
  },
  {
    id: 'civil_registry',
    labels: {
      bs: 'Matične knjige',
      'bs-Cyrl': 'Матичне књиге',
      en: 'Civil Registry',
      de: 'Standesamt',
      tr: 'Nüfus Kayıt',
    },
    icon: ScrollText,
    matches: (form) => {
      const text = `${form.name} ${form.category} ${form.description || ''} ${form.keywords || ''}`.toLowerCase();
      return /matič|matic|rodn|vjenčan|vjencan|umrli|izvod|dr[zž]avljan|birth|marriage|death/.test(text);
    },
  },
  {
    id: 'business',
    labels: {
      bs: 'Privreda & Obrt',
      'bs-Cyrl': 'Привреда и обрт',
      en: 'Business & Trade',
      de: 'Gewerbe & Wirtschaft',
      tr: 'İşletme ve Ticaret',
    },
    icon: Briefcase,
    matches: (form) => {
      const text = `${form.name} ${form.category} ${form.description || ''} ${form.keywords || ''}`.toLowerCase();
      return /obrt|privred|poslov|preduze|firm|djelatn|trade|business|craft/.test(text);
    },
  },
  {
    id: 'social',
    labels: {
      bs: 'Socijalna zaštita',
      'bs-Cyrl': 'Социјална заштита',
      en: 'Social & Welfare',
      de: 'Soziales & Familie',
      tr: 'Sosyal Yardım',
    },
    icon: HeartHandshake,
    matches: (form) => {
      const text = `${form.name} ${form.category} ${form.description || ''} ${form.keywords || ''}`.toLowerCase();
      return /socij|dodat|pomo[cć]|bora[cč]|invalid|porodic|welfare|social/.test(text);
    },
  },
];

/** Check if a form matches a given tag ID (universal tag or category name) */
export const matchesTagFilter = (form: FormItemForTag, tagId: string | null): boolean => {
  if (!tagId || tagId === 'all') return true;

  const universal = UNIVERSAL_TAGS.find((u) => u.id === tagId);
  if (universal) {
    return universal.matches(form);
  }

  // Exact or case-insensitive category match
  return form.category.toLowerCase() === tagId.toLowerCase();
};

export interface TagNavigationProps {
  forms: FormItemForTag[];
  activeTag: string | null;
  onSelectTag: (tagId: string | null) => void;
  theme?: 'dark' | 'light';
  showCategoryTags?: boolean;
  className?: string;
  totalCount?: number;
}

export const TagNavigation: React.FC<TagNavigationProps> = ({
  forms,
  activeTag,
  onSelectTag,
  theme = 'dark',
  showCategoryTags = true,
  className = '',
  totalCount,
}) => {
  const { language } = useLanguage();

  const isDark = theme === 'dark';

  // Compute form counts for universal tags based on current dataset
  const universalTagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const tag of UNIVERSAL_TAGS) {
      let count = 0;
      for (const f of forms) {
        if (tag.matches(f)) {
          count++;
        }
      }
      counts[tag.id] = count;
    }
    return counts;
  }, [forms]);

  // Compute dynamic category tags from current dataset
  const dynamicCategories = useMemo(() => {
    if (!showCategoryTags) return [];
    const map = new Map<string, number>();
    for (const f of forms) {
      if (f.category) {
        map.set(f.category, (map.get(f.category) || 0) + 1);
      }
    }
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [forms, showCategoryTags]);

  const totalFormsCount = totalCount !== undefined ? totalCount : forms.length;

  const getTagLabel = (tag: UniversalTagDefinition) => {
    const lang = (language in tag.labels ? language : 'bs') as keyof typeof tag.labels;
    return tag.labels[lang] || tag.labels.en;
  };

  const isAllActive = activeTag === null || activeTag === 'all';

  // Determine current active tag title for banner display
  const activeTagDisplay = useMemo(() => {
    if (isAllActive) return null;
    const universal = UNIVERSAL_TAGS.find((t) => t.id === activeTag);
    if (universal) {
      return getTagLabel(universal);
    }
    return activeTag;
  }, [activeTag, isAllActive, language]);

  return (
    <nav
      aria-label="Tag-based navigation"
      className={`w-full ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Tag className={`w-3.5 h-3.5 ${isDark ? 'text-[#5df0a8]' : 'text-[#00A651]'}`} />
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            {language === 'en'
              ? 'Tags & Categories'
              : language === 'de'
              ? 'Tags & Kategorien'
              : language === 'tr'
              ? 'Etiketler ve Kategoriler'
              : 'Oznake & Kategorije'}
          </span>
          <span
            className={`text-[11px] font-mono px-1.5 py-0.2 rounded ${
              isDark ? 'text-slate-400 bg-white/5' : 'text-slate-500 bg-slate-100'
            }`}
          >
            {totalFormsCount} {language === 'en' ? 'forms' : 'obrazaca'}
          </span>
        </div>

        {!isAllActive && (
          <button
            type="button"
            onClick={() => onSelectTag(null)}
            className={`text-[11px] font-medium flex items-center gap-1 transition-colors ${
              isDark
                ? 'text-[#5df0a8] hover:text-white'
                : 'text-[#00A651] hover:text-[#003D7A]'
            }`}
          >
            <X className="w-3 h-3" />
            <span>
              {language === 'en'
                ? 'Clear tag'
                : language === 'de'
                ? 'Tag löschen'
                : language === 'tr'
                ? 'Filtreyi temizle'
                : 'Poništi oznaku'}
            </span>
          </button>
        )}
      </div>

      {/* Horizontal Scrolling Tag Bar with smooth fade edges */}
      <div className="relative group">
        <div
          role="tablist"
          className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent snap-x"
        >
          {/* "All" Tag */}
          <button
            role="tab"
            aria-selected={isAllActive}
            type="button"
            onClick={() => onSelectTag(null)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isAllActive
                ? isDark
                  ? 'bg-[#5df0a8] text-[#04060f] shadow-[0_0_15px_rgba(93,240,168,0.35)]'
                  : 'bg-[#003D7A] text-white shadow-sm'
                : isDark
                ? 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'All' : language === 'de' ? 'Alle' : language === 'tr' ? 'Tümü' : 'Sve'}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                isAllActive
                  ? isDark
                    ? 'bg-[#04060f]/20 text-[#04060f]'
                    : 'bg-white/20 text-white'
                  : isDark
                  ? 'bg-white/10 text-slate-400'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {totalFormsCount}
            </span>
          </button>

          {/* Universal Core Tags (Tax, Registration, Application, Permits, etc.) */}
          {UNIVERSAL_TAGS.map((tag) => {
            const count = universalTagCounts[tag.id] || 0;
            const isSelected = activeTag === tag.id;
            const TagIcon = tag.icon;

            return (
              <button
                key={tag.id}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => onSelectTag(isSelected ? null : tag.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'bg-[#5df0a8] text-[#04060f] shadow-[0_0_15px_rgba(93,240,168,0.35)]'
                      : 'bg-[#00A651] text-white shadow-sm'
                    : isDark
                    ? 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
                }`}
                title={`Filter by ${getTagLabel(tag)} (${count} ${
                  language === 'en' ? 'forms' : 'obrazaca'
                })`}
              >
                <TagIcon className="w-3.5 h-3.5" />
                <span>{getTagLabel(tag)}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? isDark
                          ? 'bg-[#04060f]/20 text-[#04060f]'
                          : 'bg-white/20 text-white'
                        : isDark
                        ? 'bg-white/10 text-slate-400'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}

          {/* Dynamic specific category tags from this document collection */}
          {dynamicCategories.map((c) => {
            const isSelected = activeTag === c.name;
            return (
              <button
                key={c.name}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => onSelectTag(isSelected ? null : c.name)}
                className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'bg-sky-400 text-[#04060f] font-bold shadow-[0_0_12px_rgba(56,189,248,0.35)]'
                      : 'bg-sky-700 text-white font-bold shadow-sm'
                    : isDark
                    ? 'bg-white/[0.03] text-slate-400 hover:bg-white/10 hover:text-slate-200 border border-white/5'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span className="truncate max-w-[160px]">{c.name}</span>
                <span
                  className={`text-[10px] font-mono px-1 py-0.1 rounded ${
                    isSelected
                      ? isDark
                        ? 'bg-[#04060f]/20 text-[#04060f]'
                        : 'bg-white/20 text-white'
                      : isDark
                      ? 'bg-white/5 text-slate-400'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {c.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Status Banner if filtered */}
      {!isAllActive && activeTagDisplay && (
        <div
          className={`mt-2 px-3 py-1.5 rounded-lg flex items-center justify-between text-xs transition-all ${
            isDark
              ? 'bg-[#5df0a8]/10 border border-[#5df0a8]/25 text-slate-200'
              : 'bg-emerald-50 border border-emerald-200 text-emerald-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles
              className={`w-3.5 h-3.5 ${isDark ? 'text-[#5df0a8]' : 'text-[#00A651]'}`}
            />
            <span>
              {language === 'en'
                ? 'Filtered by tag:'
                : language === 'de'
                ? 'Gefiltert nach Tag:'
                : language === 'tr'
                ? 'Etikete göre filtrelendi:'
                : 'Filtrirano po oznaci:'}{' '}
              <strong className={isDark ? 'text-[#5df0a8]' : 'text-[#00A651]'}>
                {activeTagDisplay}
              </strong>
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSelectTag(null)}
            className={`font-semibold hover:underline text-[11px] flex items-center gap-1 ${
              isDark ? 'text-[#5df0a8]' : 'text-[#00A651]'
            }`}
          >
            <span>
              {language === 'en'
                ? 'Show all'
                : language === 'de'
                ? 'Alle anzeigen'
                : language === 'tr'
                ? 'Tümünü göster'
                : 'Prikaži sve'}
            </span>
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default TagNavigation;
