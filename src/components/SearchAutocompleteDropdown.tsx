import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  FileText,
  Layers,
  MapPin,
  ArrowRight,
  X,
  Radar,
  Sparkles,
  CornerDownLeft,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  getAllMunicipalities,
  MunicipalityForm,
  MunicipalityInfo,
} from '@/data/municipality-registry';

interface SearchAutocompleteDropdownProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (term: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

interface CategoryMatch {
  name: string;
  count: number;
}

interface FormMatch {
  form: MunicipalityForm;
  municipality: MunicipalityInfo;
}

export const SearchAutocompleteDropdown: React.FC<SearchAutocompleteDropdownProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Npr. CIPS prijava, rodni list, građevinska dozvola, obrt...',
  className = '',
  autoFocus = false,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allMunicipalities = useMemo(() => getAllMunicipalities(), []);

  // Precompute unique categories with their total form counts
  const categoryStats = useMemo(() => {
    const map = new Map<string, number>();
    for (const m of allMunicipalities) {
      for (const f of m.forms) {
        if (f.category) {
          map.set(f.category, (map.get(f.category) || 0) + 1);
        }
      }
    }
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [allMunicipalities]);

  // Compute matching categories and documents based on current input
  const { matchingCategories, matchingForms } = useMemo(() => {
    const query = value.toLowerCase().trim();
    if (!query) {
      return { matchingCategories: [], matchingForms: [] };
    }

    // Matching categories
    const categories: CategoryMatch[] = categoryStats
      .filter((c) => c.name.toLowerCase().includes(query))
      .slice(0, 3);

    // Matching forms
    const forms: FormMatch[] = [];
    for (const m of allMunicipalities) {
      for (const f of m.forms) {
        const nameMatch = f.name.toLowerCase().includes(query);
        const catMatch = f.category.toLowerCase().includes(query);
        const munMatch = m.name.toLowerCase().includes(query);

        if (nameMatch || catMatch || munMatch) {
          forms.push({ form: f, municipality: m });
          if (forms.length >= 6) break;
        }
      }
      if (forms.length >= 6) break;
    }

    return {
      matchingCategories: categories,
      matchingForms: forms,
    };
  }, [value, categoryStats, allMunicipalities]);

  const totalInteractiveItems = matchingCategories.length + matchingForms.length;

  // Handle clicking outside to dismiss dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [value]);

  const handleSelectCategory = (catName: string) => {
    onChange(catName);
    setIsOpen(false);
    onSubmit(catName);
  };

  const handleSelectDocument = (formId: string) => {
    setIsOpen(false);
    navigate(`/form/${formId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || totalInteractiveItems === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSubmit(value);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < totalInteractiveItems ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalInteractiveItems - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < matchingCategories.length) {
        handleSelectCategory(matchingCategories[selectedIndex].name);
      } else if (selectedIndex >= matchingCategories.length) {
        const formIndex = selectedIndex - matchingCategories.length;
        if (matchingForms[formIndex]) {
          handleSelectDocument(matchingForms[formIndex].form.id);
        }
      } else {
        setIsOpen(false);
        onSubmit(value);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Highlight matched text
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const q = query.trim().toLowerCase();
    const index = text.toLowerCase().indexOf(q);
    if (index === -1) return text;

    const before = text.substring(0, index);
    const match = text.substring(index, index + q.length);
    const after = text.substring(index + q.length);

    return (
      <>
        {before}
        <span className="text-[#5df0a8] font-bold underline decoration-[#5df0a8]/40">{match}</span>
        {after}
      </>
    );
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row gap-2 bg-[#070b1a]/90 border border-white/15 backdrop-blur-2xl rounded-2xl p-2 shadow-[0_12px_40px_rgba(0,0,0,0.6)] focus-within:border-[#5df0a8]/60 transition-all">
        <div className="flex-1 relative flex items-center pl-3">
          <Search className="w-5 h-5 text-[#5df0a8] mr-2 shrink-0" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={value}
            autoFocus={autoFocus}
            onFocus={() => {
              if (value.trim().length > 0) setIsOpen(true);
            }}
            onChange={(e) => {
              onChange(e.target.value);
              setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            aria-autocomplete="list"
            aria-expanded={isOpen}
            className="flex-1 h-12 text-sm sm:text-base bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-slate-400 pr-8"
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="text-slate-400 hover:text-white p-1"
              title="Očisti upit"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Button
          type="button"
          onClick={() => {
            setIsOpen(false);
            onSubmit(value);
          }}
          size="lg"
          className="h-12 px-6 bg-[#5df0a8] hover:bg-[#4de69c] text-[#04060f] font-bold rounded-xl shadow-[0_0_20px_rgba(93,240,168,0.35)] shrink-0 transition-transform active:scale-95"
        >
          <Radar className="h-4 w-4 mr-2 text-[#04060f]" />
          Pretraži Radar
        </Button>
      </div>

      {/* Auto-Complete Suggestions Dropdown */}
      {isOpen && value.trim().length > 0 && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#070b1c]/95 border border-[#5df0a8]/40 backdrop-blur-2xl rounded-2xl shadow-[0_16px_60px_rgba(0,0,0,0.85)] overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {totalInteractiveItems === 0 ? (
            <div className="p-6 text-center text-slate-400 text-sm">
              <p>Nema direktnih prijedloga za &ldquo;{value}&rdquo;.</p>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onSubmit(value);
                }}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#5df0a8] hover:underline font-semibold"
              >
                <span>Pretraži cjelokupnu bazu institucija i obrazaca</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="max-h-[380px] overflow-y-auto divide-y divide-white/5">
              {/* SECTION 1: Matching Categories */}
              {matchingCategories.length > 0 && (
                <div className="p-3 bg-white/2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 px-2 pb-2 uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5 text-[#5df0a8]" />
                    <span>Predložene Kategorije</span>
                  </div>
                  <div className="flex flex-wrap gap-2 px-1">
                    {matchingCategories.map((cat, idx) => {
                      const isHighlighted = selectedIndex === idx;
                      return (
                        <button
                          key={cat.name}
                          type="button"
                          onClick={() => handleSelectCategory(cat.name)}
                          className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer ${
                            isHighlighted
                              ? 'bg-[#5df0a8] text-[#04060f] font-bold shadow-[0_0_12px_rgba(93,240,168,0.4)]'
                              : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                          }`}
                        >
                          <span>{highlightMatch(cat.name, value)}</span>
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                              isHighlighted
                                ? 'bg-black/20 text-[#04060f]'
                                : 'bg-white/10 text-[#5df0a8]'
                            }`}
                          >
                            {cat.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 2: Matching Documents */}
              {matchingForms.length > 0 && (
                <div className="p-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5 text-[#5df0a8]" />
                    <span>Predloženi Dokumenti ({matchingForms.length})</span>
                  </div>

                  <div className="space-y-1">
                    {matchingForms.map(({ form, municipality }, idx) => {
                      const itemIndex = matchingCategories.length + idx;
                      const isHighlighted = selectedIndex === itemIndex;
                      return (
                        <div
                          key={`${municipality.slug}-${form.id}`}
                          onClick={() => handleSelectDocument(form.id)}
                          className={`px-3 py-2.5 rounded-xl transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                            isHighlighted
                              ? 'bg-[#101b3d] border border-[#5df0a8]/40 shadow-sm'
                              : 'hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#5df0a8] transition-colors truncate">
                              {highlightMatch(form.name, value)}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-300 border border-white/10">
                                {form.category}
                              </span>
                              <span className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5 text-slate-500" />
                                {municipality.name} ({municipality.cantonShort})
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[11px] font-mono text-[#5df0a8] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                              <span>Otvori</span>
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Quick Action: Full Search */}
              <div className="p-3 bg-[#050814] flex items-center justify-between text-xs text-slate-400 px-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onSubmit(value);
                  }}
                  className="text-slate-300 hover:text-[#5df0a8] flex items-center gap-1.5 transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-[#5df0a8]" />
                  <span>
                    Pretraži sve rezultate za &ldquo;<strong>{value}</strong>&rdquo;
                  </span>
                </button>

                <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-slate-500">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 flex items-center gap-0.5">
                    <CornerDownLeft className="w-2.5 h-2.5" /> Enter
                  </kbd>
                  <span>za odabir</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAutocompleteDropdown;
