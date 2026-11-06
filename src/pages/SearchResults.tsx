import { useState, useEffect, useMemo } from 'react';
import { getOfficialWebsite } from '@/lib/institution-directory';
import type { UnifiedSearchResult } from '@/lib/municipalities-database-enhanced';
import { useDirectoryVersion } from '@/hooks/use-directory-version';
import InstitutionAutocomplete from '@/components/InstitutionAutocomplete';
import SearchAutocompleteDropdown from '@/components/SearchAutocompleteDropdown';
import DomainDetector from '@/components/DomainDetector';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  ExternalLink,
  FileText,
  MapPin,
  Lock,
  Shield,
  ArrowUpDown,
  Star,
  Database,
  Globe,
  Building2,
  GitCompareArrows,
  Filter,
  Printer,
  Download,
  Save,
  Eye,
  Radar,
  Sparkles,
  ChevronRight,
  SlidersHorizontal,
  Calendar,
  X,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Layers,
  Tag,
  Check,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import TagNavigation, { UNIVERSAL_TAGS } from '@/components/TagNavigation';
import { hasAccess, recordSearch } from '@/lib/trial';
import { getUserAccessLevel, getSubscriptionMessage } from '@/lib/access-control';
import { SortOption } from '@/lib/supabaseClient';
import {
  getAllMunicipalities,
  searchMunicipalityForms,
  MunicipalityForm,
  MunicipalityInfo,
  getFormDateAdded,
} from '@/data/municipality-registry';
import { searchMunicipalities } from '@/data/municipalities-database';
import { saveDocumentLocally, type LocalSavedDocument } from '@/lib/saved-documents';
import {
  getRecentSearches,
  saveRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
  RECENT_SEARCHES_EVENT,
  MAX_RECENT_SEARCHES,
} from '@/lib/recent-searches';
import { toast } from 'sonner';
import RecentSearches from '@/components/RecentSearches';
import DocumentViewer from '@/components/DocumentViewer';

type FormMatch = { municipality: MunicipalityInfo; form: MunicipalityForm };

function normalizeFormName(name: string): string {
  return name
    .toLowerCase()
    .replace(/zahtjev za /g, '')
    .replace(/izdavanje /g, '')
    .replace(/ostvarivanje prava na /g, '')
    .replace(/[čćžšđ]/g, (c) => {
      const map: Record<string, string> = { č: 'c', ć: 'c', ž: 'z', š: 's', đ: 'd' };
      return map[c] || c;
    })
    .trim()
    .substring(0, 40);
}

function findSimilarForms(
  query: string,
  municipalities: MunicipalityInfo[],
): { keyword: string; matches: FormMatch[] }[] {
  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase().trim();
  const allMatches: FormMatch[] = [];

  for (const municipality of municipalities) {
    const forms = searchMunicipalityForms(municipality.slug, searchTerm);
    for (const form of forms) {
      allMatches.push({ municipality, form });
    }
  }

  const groups = new Map<string, FormMatch[]>();
  for (const match of allMatches) {
    const normalizedKey = normalizeFormName(match.form.name);
    const existing = groups.get(normalizedKey) || [];
    existing.push(match);
    groups.set(normalizedKey, existing);
  }

  const comparisons: { keyword: string; matches: FormMatch[] }[] = [];
  for (const [key, matches] of groups.entries()) {
    const uniqueMunicipalities = new Set(matches.map((m) => m.municipality.slug));
    if (uniqueMunicipalities.size > 1) {
      comparisons.push({ keyword: key, matches });
    }
  }

  return comparisons.sort((a, b) => b.matches.length - a.matches.length);
}

const SearchResults = () => {
  useDirectoryVersion();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<UnifiedSearchResult[]>([]);
  const [allFormResults, setAllFormResults] = useState<FormMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorKey, setErrorKey] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('trust_score_desc');
  const [expandedDetector, setExpandedDetector] = useState<string | null>(null);
  const [showAllForms, setShowAllForms] = useState(false);
  const [municipalityFilter, setMunicipalityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('results');
  const [previewForm, setPreviewForm] = useState<FormMatch | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => getRecentSearches());
  const accessLevel = getUserAccessLevel();

  const allMunicipalities = useMemo(() => getAllMunicipalities(), []);

  // Sync recent searches from localStorage whenever updated across the app
  useEffect(() => {
    const handleSearchesChange = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      if (customEvent.detail) {
        setRecentSearches(customEvent.detail);
      } else {
        setRecentSearches(getRecentSearches());
      }
    };
    window.addEventListener(RECENT_SEARCHES_EVENT, handleSearchesChange);
    return () => window.removeEventListener(RECENT_SEARCHES_EVENT, handleSearchesChange);
  }, []);

  const handleSelectRecentSearch = (selectedQuery: string) => {
    setSearchQuery(selectedQuery);
    navigate(`/search?q=${encodeURIComponent(selectedQuery.trim())}`);
  };

  const handleRemoveRecentSearch = (queryToRemove: string) => {
    const updated = removeRecentSearch(queryToRemove);
    setRecentSearches(updated);
  };

  const handleClearAllRecentSearches = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  useEffect(() => {
    const performSearch = async (searchTerm: string, sort: string) => {
      if (!searchTerm.trim()) {
        setResults([]);
        setAllFormResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setErrorKey('');
      setShowAllForms(false);
      saveRecentSearch(searchTerm.trim());

      try {
        const apiSort: SortOption = sort.startsWith('date_') ? 'trust_score_desc' : (sort as SortOption);
        const searchResults = await searchMunicipalities(searchTerm, apiSort);

        const formResults: FormMatch[] = [];
        for (const municipality of allMunicipalities) {
          const forms = searchMunicipalityForms(municipality.slug, searchTerm);
          for (const form of forms) {
            formResults.push({ municipality, form });
          }
        }
        setAllFormResults(formResults);

        if (searchResults.length === 0 && formResults.length === 0) {
          setErrorKey('searchPage.noFormsForTerm');
        } else {
          setResults(searchResults);
          if (hasAccess()) {
            recordSearch(searchTerm, searchResults.length + formResults.length);
          }
        }
      } catch (err) {
        console.error('Search error:', err);
        setErrorKey('searchPage.searchError');
      } finally {
        setLoading(false);
      }
    };

    performSearch(query, sortOption);
  }, [query, sortOption, allMunicipalities]);

  const handleSearch = (e?: React.FormEvent, overrideTerm?: string) => {
    if (e) e.preventDefault();
    const term = (overrideTerm !== undefined ? overrideTerm : searchQuery).trim();
    if (term) {
      saveRecentSearch(term);
      navigate(`/search?q=${encodeURIComponent(term)}`);
    }
  };

  const toggleDetector = (resultId: string) => {
    setExpandedDetector(expandedDetector === resultId ? null : resultId);
  };

  const isWithinDateRange = (dateStr: string, range: string): boolean => {
    if (range === 'all') return true;
    const formDate = new Date(dateStr).getTime();
    if (isNaN(formDate)) return true;
    const now = Date.now();
    const diffDays = (now - formDate) / (1000 * 60 * 60 * 24);

    if (range === '30d') return diffDays <= 30;
    if (range === '180d') return diffDays <= 180;
    if (range === '365d') return diffDays <= 365;
    if (range === 'older') return diffDays > 365;
    return true;
  };

  const availableCategories = useMemo(() => {
    const map = new Map<string, number>();
    for (const { form } of allFormResults) {
      if (form.category) {
        map.set(form.category, (map.get(form.category) || 0) + 1);
      }
    }
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [allFormResults]);

  const availableMunicipalities = useMemo(() => {
    const map = new Map<string, { slug: string; name: string; cantonShort: string; count: number }>();
    for (const { municipality } of allFormResults) {
      const existing = map.get(municipality.slug);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(municipality.slug, {
          slug: municipality.slug,
          name: municipality.name,
          cantonShort: municipality.cantonShort,
          count: 1,
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [allFormResults]);

  const filteredFormResults = useMemo(() => {
    let list = allFormResults.filter(({ municipality, form }) => {
      if (municipalityFilter !== 'all' && municipality.slug !== municipalityFilter) {
        return false;
      }
      if (categoryFilter !== 'all' && !matchesTagFilter(form, categoryFilter)) {
        return false;
      }
      const formDate = getFormDateAdded(form);
      if (!isWithinDateRange(formDate, dateFilter)) {
        return false;
      }
      return true;
    });

    if (sortOption === 'date_desc') {
      list = [...list].sort((a, b) => getFormDateAdded(b.form).localeCompare(getFormDateAdded(a.form)));
    } else if (sortOption === 'date_asc') {
      list = [...list].sort((a, b) => getFormDateAdded(a.form).localeCompare(getFormDateAdded(b.form)));
    } else if (sortOption === 'name_asc') {
      list = [...list].sort((a, b) => a.form.name.localeCompare(b.form.name));
    } else if (sortOption === 'name_desc') {
      list = [...list].sort((a, b) => b.form.name.localeCompare(a.form.name));
    }

    return list;
  }, [allFormResults, municipalityFilter, categoryFilter, dateFilter, sortOption]);

  const filteredInstitutions = useMemo(() => {
    return results.filter((result) => {
      if (municipalityFilter !== 'all') {
        const matchSlug = result.id.includes(municipalityFilter) || result.name.toLowerCase().includes(municipalityFilter.toLowerCase());
        if (!matchSlug) return false;
      }
      if (categoryFilter !== 'all') {
        const matchCat = result.categories?.some((c) =>
          c.toLowerCase().includes(categoryFilter.toLowerCase()),
        );
        if (!matchCat) return false;
      }
      return true;
    });
  }, [results, municipalityFilter, categoryFilter]);

  const activeFilterCount =
    (municipalityFilter !== 'all' ? 1 : 0) +
    (categoryFilter !== 'all' ? 1 : 0) +
    (dateFilter !== 'all' ? 1 : 0);

  const handleResetAllFilters = () => {
    setMunicipalityFilter('all');
    setCategoryFilter('all');
    setDateFilter('all');
  };

  const dateLabels: Record<string, string> = {
    all: 'Svi periodi',
    '30d': 'Zadnjih 30 dana',
    '180d': 'Zadnjih 6 mjeseci',
    '365d': 'Zadnjih 12 mjeseci',
    older: 'Arhivirani (> 1 god.)',
  };

  const comparisonData = useMemo(
    () => findSimilarForms(query, allMunicipalities),
    [query, allMunicipalities],
  );

  const getTrustScoreColor = (score: number): string => {
    if (score >= 80) return 'text-[#5df0a8] bg-[#5df0a8]/10 border-[#5df0a8]/30';
    if (score >= 60) return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
    if (score >= 40) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-slate-400 bg-white/5 border-white/10';
  };

  const sortLabels: Record<string, string> = {
    trust_score_desc: t('sort.trustDesc') || 'Najviši trust score',
    trust_score_asc: t('sort.trustAsc') || 'Najniži trust score',
    date_desc: 'Datum: Najnoviji prvo',
    date_asc: 'Datum: Najstariji prvo',
    name_asc: t('sort.nameAsc') || 'Naziv (A-Z)',
    name_desc: t('sort.nameDesc') || 'Naziv (Z-A)',
  };

  const totalResults = results.length + allFormResults.length;
  const displayedForms = showAllForms ? filteredFormResults : filteredFormResults.slice(0, 10);
  const uniqueMunicipalityCount = new Set(allFormResults.map((r) => r.municipality.slug)).size;

  return (
    <div className="min-h-screen flex flex-col text-slate-100 selection:bg-[#5df0a8]/30 selection:text-white">
      <Header />

      {/* DISCOVERY CONSOLE HEADER */}
      <div className="border-b border-white/10 bg-[#070b1a]/90 backdrop-blur-2xl py-8 relative overflow-hidden">
        <div className="container max-w-6xl px-4 mx-auto relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div className="flex flex-wrap items-center gap-3">
              <Breadcrumbs />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/30">
              <Radar className="w-3.5 h-3.5 animate-pulse" />
              <span>RADAR SEARCH ENGINE • BIH</span>
            </div>
          </div>

          <div className="max-w-3xl mb-3">
            <InstitutionAutocomplete />
          </div>

          {/* Autocomplete Search Bar */}
          <div className="max-w-3xl">
            <SearchAutocompleteDropdown
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={(term) => handleSearch(undefined, term)}
              placeholder="Pretraži obrasce po nazivu, općini, kantonu ili ustanovi..."
            />
          </div>

          {/* Local Storage-backed Recent Searches */}
          <div className="max-w-3xl">
            <RecentSearches
              searches={recentSearches}
              onSelectSearch={handleSelectRecentSearch}
              onRemoveSearch={handleRemoveRecentSearch}
              onClearAll={handleClearAllRecentSearches}
              className="!mx-0 !mt-3"
            />
          </div>
        </div>
      </div>

      {/* Subscription Alert if limited */}
      {!accessLevel.isAdmin && !accessLevel.hasSubscription && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 py-3 backdrop-blur-md">
          <div className="container max-w-6xl px-4 mx-auto">
            <Alert className="bg-transparent border-0 p-0 text-amber-300">
              <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
                <span className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>{getSubscriptionMessage(language)}</span>
                </span>
                <Button
                  size="sm"
                  className="bg-[#5df0a8] hover:bg-[#4de69c] text-[#04060f] font-bold shrink-0 text-xs shadow-md"
                  onClick={() => navigate('/subscription')}
                >
                  {t('searchPage.subscribeCta')}
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}

      {/* Main Results Body */}
      <div className="container max-w-6xl px-4 py-8 mx-auto flex-1">
        {loading ? (
          <div className="text-center py-20">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-[#5df0a8]/20 animate-ping" />
              <div className="animate-spin rounded-full h-16 w-16 border-2 border-transparent border-t-[#5df0a8]" />
              <Radar className="w-6 h-6 text-[#5df0a8] absolute inset-0 m-auto" />
            </div>
            <p className="text-slate-300 font-mono text-sm tracking-wide">
              Skeniranje registara općina i institucija...
            </p>
          </div>
        ) : errorKey ? (
          <div className="glass-panel text-center py-16 px-6 rounded-2xl max-w-xl mx-auto">
            <FileText className="h-14 w-14 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">{t(errorKey)}</h3>
            <p className="text-slate-400 text-sm mb-6">{t('searchPage.tryOtherTermOrSupport')}</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                navigate('/search');
              }}
              variant="outline"
              className="border-white/10 text-slate-200"
            >
              Resetuj pretragu
            </Button>
          </div>
        ) : totalResults === 0 ? (
          <div className="glass-panel text-center py-16 px-6 rounded-2xl max-w-xl mx-auto">
            <FileText className="h-14 w-14 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">{t('searchPage.noResultsTitle')}</h3>
            <p className="text-slate-400 text-sm mb-6">{t('searchPage.tryOtherTerm')}</p>
            <Button
              onClick={() => navigate('/generator')}
              className="bg-[#5df0a8] text-[#04060f] font-bold text-xs"
            >
              Otvori generator općih obrazaca
            </Button>
          </div>
        ) : (
          <>
            {/* Header info */}
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Rezultati za: <span className="text-[#5df0a8]">&ldquo;{query}&rdquo;</span>
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Pronađeno <strong>{totalResults}</strong> zapisa
                  {allFormResults.length > 0 && (
                    <span className="ml-2 text-[#5df0a8]">
                      • {allFormResults.length} formulara u {uniqueMunicipalityCount} općina
                    </span>
                  )}
                </p>
              </div>

              {/* Tabs trigger */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList className="bg-[#0b142d] border border-white/10">
                  <TabsTrigger
                    value="results"
                    className="data-[state=active]:bg-[#5df0a8] data-[state=active]:text-[#04060f] text-xs font-semibold"
                  >
                    <Search className="h-3.5 w-3.5 mr-1.5" />
                    {t('searchPage.tabResults')} ({totalResults})
                  </TabsTrigger>
                  <TabsTrigger
                    value="compare"
                    className="data-[state=active]:bg-[#5df0a8] data-[state=active]:text-[#04060f] text-xs font-semibold"
                  >
                    <GitCompareArrows className="h-3.5 w-3.5 mr-1.5" />
                    {t('searchPage.tabCompare')}
                    {comparisonData.length > 0 && (
                      <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                        {comparisonData.length}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* TAB: RESULTS */}
            {activeTab === 'results' && (
              <div>
                {/* Tag-Based Navigation Bar */}
                <div className="glass-panel p-4 rounded-xl mb-4">
                  <TagNavigation
                    forms={allFormResults.map((r) => r.form)}
                    activeTag={categoryFilter === 'all' ? null : categoryFilter}
                    onSelectTag={(tag) => setCategoryFilter(tag === null ? 'all' : tag)}
                    theme="dark"
                    totalCount={allFormResults.length}
                  />
                </div>

                {/* TOP BAR: Active Filters, Mobile Drawer Trigger, and Sort Controls */}
                <div className="glass-panel p-4 rounded-xl mb-6 flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    {/* Mobile filter toggle */}
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        className="lg:hidden h-9 border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs font-semibold gap-1.5"
                      >
                        <SlidersHorizontal className="h-3.5 w-3.5 text-[#5df0a8]" />
                        <span>Filteri</span>
                        {activeFilterCount > 0 && (
                          <Badge className="bg-[#5df0a8] text-[#04060f] text-[10px] h-4 px-1 font-bold ml-1">
                            {activeFilterCount}
                          </Badge>
                        )}
                        {isMobileFiltersOpen ? (
                          <ChevronUp className="h-3.5 w-3.5 ml-1 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5 ml-1 text-slate-400" />
                        )}
                      </Button>

                      <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
                        <Filter className="h-3.5 w-3.5 text-[#5df0a8]" />
                        <span>
                          Prikazano: <strong className="text-white">{filteredFormResults.length}</strong> od {allFormResults.length} obrazaca
                        </span>
                      </div>
                    </div>

                    {/* Sorting selector */}
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <Select
                        value={sortOption}
                        onValueChange={(val) => setSortOption(val)}
                      >
                        <SelectTrigger className="w-full sm:w-[230px] h-9 text-xs bg-white/5 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0b142d] border-white/10 text-slate-200">
                          <SelectItem value="trust_score_desc">{sortLabels.trust_score_desc}</SelectItem>
                          <SelectItem value="date_desc">{sortLabels.date_desc}</SelectItem>
                          <SelectItem value="date_asc">{sortLabels.date_asc}</SelectItem>
                          <SelectItem value="name_asc">{sortLabels.name_asc}</SelectItem>
                          <SelectItem value="name_desc">{sortLabels.name_desc}</SelectItem>
                          <SelectItem value="trust_score_asc">{sortLabels.trust_score_asc}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Active Filter Chips */}
                  {activeFilterCount > 0 && (
                    <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-slate-400 font-mono text-[11px] mr-1">Aktivni filteri:</span>

                      {categoryFilter !== 'all' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5df0a8]/10 text-[#5df0a8] border border-[#5df0a8]/30 text-xs">
                          <Layers className="w-3 h-3" />
                          <span>Kategorija: {categoryFilter}</span>
                          <button
                            type="button"
                            onClick={() => setCategoryFilter('all')}
                            className="hover:text-white p-0.5 rounded-full hover:bg-white/10"
                            title="Ukloni filter"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {municipalityFilter !== 'all' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs">
                          <MapPin className="w-3 h-3" />
                          <span>
                            Općina: {allMunicipalities.find((m) => m.slug === municipalityFilter)?.name || municipalityFilter}
                          </span>
                          <button
                            type="button"
                            onClick={() => setMunicipalityFilter('all')}
                            className="hover:text-white p-0.5 rounded-full hover:bg-white/10"
                            title="Ukloni filter"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {dateFilter !== 'all' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs">
                          <Calendar className="w-3 h-3" />
                          <span>Period: {dateLabels[dateFilter]}</span>
                          <button
                            type="button"
                            onClick={() => setDateFilter('all')}
                            className="hover:text-white p-0.5 rounded-full hover:bg-white/10"
                            title="Ukloni filter"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleResetAllFilters}
                        className="h-7 px-2 text-[11px] text-slate-400 hover:text-white hover:bg-white/5 gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Poništi sve
                      </Button>
                    </div>
                  )}

                  {/* Mobile Collapsible Filter Drawer */}
                  {isMobileFiltersOpen && (
                    <div className="lg:hidden pt-3 border-t border-white/10 space-y-4 animate-in fade-in slide-in-from-top-2">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#5df0a8]" />
                          <span>Kategorija obrasca</span>
                        </label>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger className="w-full h-9 text-xs bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Odaberi kategoriju" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0b142d] border-white/10 text-slate-200">
                            <SelectItem value="all">Sve kategorije ({allFormResults.length})</SelectItem>
                            {availableCategories.map((c) => (
                              <SelectItem key={c.name} value={c.name}>
                                {c.name} ({c.count})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#5df0a8]" />
                          <span>Općina / Grad</span>
                        </label>
                        <Select value={municipalityFilter} onValueChange={setMunicipalityFilter}>
                          <SelectTrigger className="w-full h-9 text-xs bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Odaberi općinu" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0b142d] border-white/10 text-slate-200">
                            <SelectItem value="all">Sve općine ({allFormResults.length})</SelectItem>
                            {availableMunicipalities.map((m) => (
                              <SelectItem key={m.slug} value={m.slug}>
                                {m.name} ({m.count})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#5df0a8]" />
                          <span>Datum dodavanja</span>
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {Object.entries(dateLabels).map(([key, label]) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setDateFilter(key)}
                              className={`px-2.5 py-1.5 rounded-lg text-xs text-left transition-all flex items-center justify-between ${
                                dateFilter === key
                                  ? 'bg-[#5df0a8]/20 text-[#5df0a8] border border-[#5df0a8]/40 font-semibold'
                                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                              }`}
                            >
                              <span>{label}</span>
                              {dateFilter === key && <Check className="w-3 h-3 text-[#5df0a8]" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2-COLUMN LAYOUT: Desktop Sidebar Filter Group + Results Grid */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  {/* DESKTOP SIDEBAR FILTER GROUP */}
                  <aside className="hidden lg:block lg:w-72 shrink-0 w-full">
                    <div className="glass-panel p-5 rounded-2xl sticky top-24 space-y-6">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <SlidersHorizontal className="w-4 h-4 text-[#5df0a8]" />
                          <h3 className="text-sm font-bold text-white tracking-wide">Filteri dokumenata</h3>
                        </div>
                        {activeFilterCount > 0 && (
                          <button
                            type="button"
                            onClick={handleResetAllFilters}
                            className="text-[11px] font-mono text-[#5df0a8] hover:underline flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            Poništi ({activeFilterCount})
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-200 mb-2.5 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-[#5df0a8]" />
                            <span>Kategorija</span>
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {availableCategories.length} dostupno
                          </span>
                        </label>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger className="w-full h-9 text-xs bg-white/5 border-white/10 text-white mb-2">
                            <SelectValue placeholder="Odaberi kategoriju" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0b142d] border-white/10 text-slate-200 max-h-56">
                            <SelectItem value="all">Sve kategorije ({allFormResults.length})</SelectItem>
                            {availableCategories.map((c) => (
                              <SelectItem key={c.name} value={c.name}>
                                {c.name} ({c.count})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <div className="flex flex-wrap gap-1 mt-2">
                          <button
                            type="button"
                            onClick={() => setCategoryFilter('all')}
                            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                              categoryFilter === 'all'
                                ? 'bg-[#5df0a8]/20 text-[#5df0a8] border border-[#5df0a8]/30 font-semibold'
                                : 'bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
                            }`}
                          >
                            Sve
                          </button>
                          {UNIVERSAL_TAGS.slice(0, 3).map((uTag) => {
                            const isSelected = categoryFilter === uTag.id;
                            return (
                              <button
                                key={uTag.id}
                                type="button"
                                onClick={() => setCategoryFilter(isSelected ? 'all' : uTag.id)}
                                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                                  isSelected
                                    ? 'bg-[#5df0a8] text-[#04060f] font-bold shadow-xs'
                                    : 'bg-[#5df0a8]/10 text-[#5df0a8] hover:bg-[#5df0a8]/20 border border-[#5df0a8]/20'
                                }`}
                                title={uTag.labels.en}
                              >
                                {uTag.labels.en}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <label className="text-xs font-bold text-slate-200 mb-2.5 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#5df0a8]" />
                            <span>Općina / Grad</span>
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {availableMunicipalities.length} općina
                          </span>
                        </label>
                        <Select value={municipalityFilter} onValueChange={setMunicipalityFilter}>
                          <SelectTrigger className="w-full h-9 text-xs bg-white/5 border-white/10 text-white mb-2">
                            <SelectValue placeholder="Odaberi općinu" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0b142d] border-white/10 text-slate-200 max-h-56">
                            <SelectItem value="all">Sve općine ({allFormResults.length})</SelectItem>
                            {availableMunicipalities.map((m) => (
                              <SelectItem key={m.slug} value={m.slug}>
                                {m.name} ({m.count})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <label className="text-xs font-bold text-slate-200 mb-2.5 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#5df0a8]" />
                            <span>Datum dodavanja</span>
                          </span>
                        </label>
                        <div className="space-y-1">
                          {Object.entries(dateLabels).map(([key, label]) => {
                            const isSelected = dateFilter === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setDateFilter(key)}
                                className={`w-full px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                                  isSelected
                                    ? 'bg-[#5df0a8]/15 text-[#5df0a8] font-semibold border border-[#5df0a8]/30 shadow-[0_0_10px_rgba(93,240,168,0.15)]'
                                    : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                                }`}
                              >
                                <span>{label}</span>
                                {isSelected ? (
                                  <Check className="w-3.5 h-3.5 text-[#5df0a8]" />
                                ) : (
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </aside>

                  {/* MAIN CONTENT AREA */}
                  <div className="flex-1 min-w-0 w-full">
                    <div className="mb-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#5df0a8]" />
                          <span>Službeni Obrasci & Formulari</span>
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#5df0a8]/20 text-[#5df0a8]">
                            {filteredFormResults.length}
                          </span>
                        </h3>
                      </div>

                      {filteredFormResults.length === 0 ? (
                        <div className="glass-panel text-center py-12 px-6 rounded-2xl">
                          <Filter className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                          <h4 className="text-base font-bold text-white mb-1">
                            Nema formulara za odabrane filtere
                          </h4>
                          <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
                            Pokušajte promijeniti kategoriju, općinu ili vremenski period da vidite više rezultata.
                          </p>
                          <Button
                            size="sm"
                            onClick={handleResetAllFilters}
                            className="bg-[#5df0a8] hover:bg-[#4de69c] text-[#04060f] font-bold text-xs"
                          >
                            <RotateCcw className="w-3.5 h-3.5 mr-1" />
                            Poništi filtere
                          </Button>
                        </div>
                      ) : (
                        <div className="grid gap-3">
                          {displayedForms.map(({ municipality, form }) => {
                            const dateAdded = getFormDateAdded(form);
                            return (
                              <div
                                key={`${municipality.slug}-${form.id}`}
                                className="glass-panel p-4 rounded-xl hover:border-[#5df0a8]/40 hover:bg-[#0c1635] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5df0a8]/10 text-[#5df0a8] border border-[#5df0a8]/20">
                                      {municipality.name} ({municipality.cantonShort})
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-300 flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                                      <Calendar className="w-3 h-3 text-[#5df0a8]" />
                                      <span>{dateAdded}</span>
                                    </span>
                                  </div>
                                  <h4
                                    onClick={() => navigate(`/form/${form.id}`)}
                                    className="text-sm sm:text-base font-semibold text-white group-hover:text-[#5df0a8] transition-colors cursor-pointer"
                                  >
                                    {form.name}
                                  </h4>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 px-3 text-xs border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                                    onClick={() => navigate(`/form/${form.id}`)}
                                  >
                                    Detalji
                                  </Button>

                                  <Button
                                    size="sm"
                                    className="h-8 px-3.5 text-xs bg-[#5df0a8] hover:bg-[#4be096] text-[#04060f] font-bold shadow-[0_0_12px_rgba(93,240,168,0.3)]"
                                    onClick={() => setPreviewForm({ municipality, form })}
                                  >
                                    <Eye className="h-3.5 w-3.5 mr-1" />
                                    Otvori PDF
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Municipalities & Institutions section */}
                    {filteredInstitutions.length > 0 && (
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 mb-4">
                          <Building2 className="w-4 h-4 text-[#5df0a8]" />
                          <span>Općinski & Institucionalni Registri</span>
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#5df0a8]/20 text-[#5df0a8]">
                            {filteredInstitutions.length}
                          </span>
                        </h3>

                        <div className="grid gap-3">
                          {filteredInstitutions.map((result) => {
                            const websiteUrl = getOfficialWebsite(result.name);
                            const municipalitySlug = allMunicipalities.find(
                              (municipality) => municipality.name.toLowerCase() === result.name.toLowerCase(),
                            )?.slug;
                            return (
                              <div
                                key={result.id}
                                className="glass-panel p-5 rounded-2xl hover:border-[#5df0a8]/40 transition-all"
                              >
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                      <h4 className="text-base sm:text-lg font-bold text-white">
                                        {result.name}
                                      </h4>
                                      <span
                                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getTrustScoreColor(
                                          result.trust_score,
                                        )}`}
                                      >
                                        Trust Score: {result.trust_score}%
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    {municipalitySlug && (
                                      <Button
                                        size="sm"
                                        className="h-8 text-xs bg-[#5df0a8]/20 hover:bg-[#5df0a8]/30 text-[#5df0a8] border border-[#5df0a8]/40"
                                        onClick={() => navigate(`/municipality/${municipalitySlug}`)}
                                      >
                                        Otvori Registar
                                        <ChevronRight className="h-3.5 w-3.5 ml-1" />
                                      </Button>
                                    )}
                                  </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                                  <span className="text-slate-400">
                                    Službena domena: <code className="text-slate-200">{result.domain || 'U registru'}</code>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => toggleDetector(result.id)}
                                    className="text-[#5df0a8] hover:underline"
                                  >
                                    {expandedDetector === result.id ? 'Sakrij detalje' : 'Provjeri domenu'}
                                  </button>
                                </div>

                                {expandedDetector === result.id && (
                                  <div className="mt-3 pt-3 border-t border-white/10">
                                    <DomainDetector
                                      municipalityName={result.name}
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: COMPARE */}
            {activeTab === 'compare' && (
              <div className="space-y-4">
                <div className="glass-panel p-5 rounded-2xl mb-6">
                  <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                    <GitCompareArrows className="w-4 h-4 text-[#5df0a8]" />
                    Međuopćinska Usporedba Formulara
                  </h3>
                  <p className="text-xs text-slate-400">
                    Uporedite zahtjeve i potrebnu dokumentaciju za istu vrstu postupka između različitih općina u BiH.
                  </p>
                </div>

                {comparisonData.length === 0 ? (
                  <div className="glass-panel text-center py-12 px-4 rounded-xl text-slate-400 text-sm">
                    Nema sličnih obrazaca u više općina za ovaj upit.
                  </div>
                ) : (
                  comparisonData.map((group) => (
                    <div key={group.keyword} className="glass-panel p-5 rounded-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-white capitalize text-sm sm:text-base">
                          {group.keyword}
                        </h4>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#5df0a8]/20 text-[#5df0a8]">
                          {group.matches.length} općina
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {group.matches.map((item) => (
                          <div
                            key={`${item.municipality.slug}-${item.form.id}`}
                            className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#5df0a8]/30 transition-all flex flex-col justify-between"
                          >
                            <div>
                              <span className="text-[10px] font-mono text-[#5df0a8]">
                                {item.municipality.name}
                              </span>
                              <p className="text-xs font-semibold text-white mt-1 line-clamp-2">
                                {item.form.name}
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                              <span className="text-[10px] text-slate-400">
                                {item.form.sizeKB ? `${item.form.sizeKB} KB` : 'PDF'}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 text-[10px] text-[#5df0a8] hover:bg-white/5 p-1"
                                onClick={() => navigate(`/form/${item.form.id}`)}
                              >
                                Pregledaj
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal za DocumentViewer PDF pregleda */}
      {previewForm && (
        <DocumentViewer
          open={!!previewForm}
          onOpenChange={(open) => {
            if (!open) setPreviewForm(null);
          }}
          documentUrl={previewForm.form.pdfUrl}
          title={previewForm.form.name}
          category={previewForm.form.category}
          municipality={previewForm.municipality.name}
        />
      )}

      <Footer />
    </div>
  );
};

export default SearchResults;
