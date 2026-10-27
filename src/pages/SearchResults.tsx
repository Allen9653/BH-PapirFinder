import { useState, useEffect, useMemo } from 'react';
import { getOfficialWebsite } from '@/lib/institution-directory';
import { useDirectoryVersion } from '@/hooks/use-directory-version';
import InstitutionAutocomplete from '@/components/InstitutionAutocomplete';
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
  Radar,
  Sparkles,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniversalBackButton from '@/components/UniversalBackButton';
import PrintPreviewModal from '@/components/PrintPreviewModal';
import { safeOpenExternal } from '@/lib/security';
import { saveRecentSearch } from '@/lib/recent-searches';
import { searchMunicipalities, UnifiedSearchResult } from '@/lib/municipalities-database-enhanced';
import { hasAccess, recordSearch } from '@/lib/trial';
import { getUserAccessLevel, getSubscriptionMessage } from '@/lib/access-control';
import { SortOption } from '@/lib/supabaseClient';
import {
  getAllMunicipalities,
  searchMunicipalityForms,
  MunicipalityForm,
  MunicipalityInfo,
} from '@/data/municipality-registry';
import DomainDetector from '@/components/DomainDetector';

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
  const [sortOption, setSortOption] = useState<SortOption>('trust_score_desc');
  const [expandedDetector, setExpandedDetector] = useState<string | null>(null);
  const [showAllForms, setShowAllForms] = useState(false);
  const [municipalityFilter, setMunicipalityFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('results');
  const [previewForm, setPreviewForm] = useState<FormMatch | null>(null);
  const accessLevel = getUserAccessLevel();

  const allMunicipalities = useMemo(() => getAllMunicipalities(), []);

  useEffect(() => {
    const performSearch = async (searchTerm: string, sort: SortOption) => {
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
        const searchResults = await searchMunicipalities(searchTerm, sort);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleDetector = (resultId: string) => {
    setExpandedDetector(expandedDetector === resultId ? null : resultId);
  };

  const filteredFormResults = useMemo(() => {
    if (municipalityFilter === 'all') return allFormResults;
    return allFormResults.filter((r) => r.municipality.slug === municipalityFilter);
  }, [allFormResults, municipalityFilter]);

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

  const sortLabels: Record<SortOption, string> = {
    trust_score_desc: t('sort.trustDesc'),
    trust_score_asc: t('sort.trustAsc'),
    name_asc: t('sort.nameAsc'),
    name_desc: t('sort.nameDesc'),
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
          <div className="flex items-center justify-between gap-4 mb-5">
            <UniversalBackButton variant="command" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/30">
              <Radar className="w-3.5 h-3.5 animate-pulse" />
              <span>RADAR SEARCH ENGINE • BIH</span>
            </div>
          </div>

          <div className="max-w-3xl mb-3">
            <InstitutionAutocomplete />
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-3xl">
            <div className="flex gap-2 p-1.5 rounded-2xl bg-[#0b142d]/80 border border-white/15 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <div className="flex-1 relative flex items-center pl-3">
                <Search className="w-5 h-5 text-[#5df0a8] mr-2 shrink-0" />
                <Input
                  type="text"
                  placeholder="Pretraži obrasce po nazivu, općini, kantonu ili ustanovi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-11 bg-transparent border-0 text-white placeholder:text-slate-400 focus-visible:ring-0 text-sm sm:text-base"
                />
              </div>
              <Button
                type="submit"
                className="h-11 px-6 bg-[#5df0a8] hover:bg-[#4de69c] text-[#04060f] font-bold rounded-xl shadow-[0_0_15px_rgba(93,240,168,0.3)] shrink-0"
              >
                <Search className="h-4 w-4 mr-1.5" />
                Pretraži
              </Button>
            </div>
          </form>
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
                {/* Filter & Sort Bar */}
                <div className="glass-panel p-4 rounded-xl mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <Filter className="h-4 w-4 text-[#5df0a8] shrink-0" />
                    <Select value={municipalityFilter} onValueChange={setMunicipalityFilter}>
                      <SelectTrigger className="w-full sm:w-[260px] h-9 text-xs bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Filtriraj po općini" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0b142d] border-white/10 text-slate-200">
                        <SelectItem value="all">Sve općine ({allFormResults.length})</SelectItem>
                        {allMunicipalities.map((m) => {
                          const count = allFormResults.filter(
                            (r) => r.municipality.slug === m.slug,
                          ).length;
                          if (count === 0) return null;
                          return (
                            <SelectItem key={m.slug} value={m.slug}>
                              {m.name} ({count})
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-slate-400 shrink-0" />
                    <Select
                      value={sortOption}
                      onValueChange={(val) => setSortOption(val as SortOption)}
                    >
                      <SelectTrigger className="w-full sm:w-[220px] h-9 text-xs bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0b142d] border-white/10 text-slate-200">
                        <SelectItem value="trust_score_desc">{sortLabels.trust_score_desc}</SelectItem>
                        <SelectItem value="trust_score_asc">{sortLabels.trust_score_asc}</SelectItem>
                        <SelectItem value="name_asc">{sortLabels.name_asc}</SelectItem>
                        <SelectItem value="name_desc">{sortLabels.name_desc}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Individual Forms List (Glass Cards) */}
                {filteredFormResults.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#5df0a8]" />
                        <span>Službeni Obrasci & Formular</span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#5df0a8]/20 text-[#5df0a8]">
                          {filteredFormResults.length}
                        </span>
                      </h3>
                    </div>

                    <div className="grid gap-3">
                      {displayedForms.map(({ municipality, form }) => (
                        <div
                          key={`${municipality.slug}-${form.id}`}
                          className="glass-panel p-4 rounded-xl hover:border-[#5df0a8]/40 hover:bg-[#0c1635] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                                {form.category}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5df0a8]/10 text-[#5df0a8] border border-[#5df0a8]/20">
                                {municipality.name} ({municipality.cantonShort})
                              </span>
                              {form.sizeKB && (
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {form.sizeKB} KB PDF
                                </span>
                              )}
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
                              variant="ghost"
                              className="h-8 px-2.5 text-xs text-slate-300 hover:text-[#5df0a8] hover:bg-white/5"
                              onClick={() => setPreviewForm({ municipality, form })}
                              title="Print Preview na papiru"
                            >
                              <Printer className="h-3.5 w-3.5 mr-1" />
                              <span className="hidden sm:inline">Print Preview</span>
                            </Button>

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
                              onClick={() => safeOpenExternal(form.pdfUrl)}
                            >
                              <Download className="h-3.5 w-3.5 mr-1" />
                              Preuzmi
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredFormResults.length > 10 && !showAllForms && (
                      <Button
                        variant="ghost"
                        className="mt-4 text-[#5df0a8] hover:bg-white/5 w-full text-xs font-mono"
                        onClick={() => setShowAllForms(true)}
                      >
                        Prikaži preostalih {filteredFormResults.length - 10} obrazaca ↓
                      </Button>
                    )}

                    {showAllForms && filteredFormResults.length > 10 && (
                      <Button
                        variant="ghost"
                        className="mt-4 text-slate-400 hover:bg-white/5 w-full text-xs font-mono"
                        onClick={() => setShowAllForms(false)}
                      >
                        Prikaži manje ↑
                      </Button>
                    )}
                  </div>
                )}

                {/* Municipalities & Institutions section */}
                {results.length > 0 && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 mb-4">
                      <Building2 className="w-4 h-4 text-[#5df0a8]" />
                      <span>Općinski & Institucionalni Registri</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#5df0a8]/20 text-[#5df0a8]">
                        {results.length}
                      </span>
                    </h3>

                    <div className="grid gap-3">
                      {results.map((result) => {
                        const websiteUrl = getOfficialWebsite(result.slug);
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
                                  {result.is_premium && (
                                    <Badge className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px]">
                                      <Star className="h-3 w-3 mr-1" /> Verified
                                    </Badge>
                                  )}
                                  <span
                                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getTrustScoreColor(
                                      result.trust_score,
                                    )}`}
                                  >
                                    Trust Score: {result.trust_score}%
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
                                  {result.canton && <span>{result.canton}</span>}
                                  {result.entity && <span>• {result.entity}</span>}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {websiteUrl && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 text-xs border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                                    onClick={() => safeOpenExternal(websiteUrl)}
                                  >
                                    <ExternalLink className="h-3.5 w-3.5 mr-1" />
                                    Web
                                  </Button>
                                )}

                                <Button
                                  size="sm"
                                  className="h-8 text-xs bg-[#5df0a8]/20 hover:bg-[#5df0a8]/30 text-[#5df0a8] border border-[#5df0a8]/40"
                                  onClick={() => navigate(`/municipality/${result.slug}`)}
                                >
                                  Otvori Registar
                                  <ChevronRight className="h-3.5 w-3.5 ml-1" />
                                </Button>
                              </div>
                            </div>

                            {/* Domain detector trigger */}
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
                                  domain={result.domain || ''}
                                  entity={result.entity}
                                  canton={result.canton}
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

      {/* Modal za Print Preview obrazaca */}
      {previewForm && (
        <PrintPreviewModal
          open={!!previewForm}
          onOpenChange={(open) => {
            if (!open) setPreviewForm(null);
          }}
          formId={previewForm.form.id}
          displayName={previewForm.form.name}
          originalName={previewForm.form.name}
          category={previewForm.form.category}
          municipalityName={previewForm.municipality.name}
          cantonShort={previewForm.municipality.cantonShort}
          sizeKB={previewForm.form.sizeKB}
          fileUrl={previewForm.form.pdfUrl}
        />
      )}

      <Footer />
    </div>
  );
};

export default SearchResults;