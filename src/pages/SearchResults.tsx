import { useState, useEffect, useMemo } from 'react';
import { getOfficialWebsite } from '@/lib/institution-directory';
import { useDirectoryVersion } from '@/hooks/use-directory-version';
import InstitutionAutocomplete from '@/components/InstitutionAutocomplete';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  ArrowLeft,
  ExternalLink,
  FileText,
  MapPin,
  Lock,
  Shield,
  ArrowUpDown,
  Star,
  Database,
  Globe,
  Download,
  Building2,
  GitCompareArrows,
  Filter,
} from 'lucide-react';
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

/** Normalizuje naziv obrasca radi grupisanja sličnih obrazaca iz različitih općina. */
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

/** Pronalazi slične obrasce koji postoje u više općina (za tab usporedbe). */
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
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getTrustScoreLabel = (score: number): string => {
    if (score >= 80) return t('searchPage.trustHigh');
    if (score >= 60) return t('searchPage.trustGood');
    if (score >= 40) return t('searchPage.trustModerate');
    return t('searchPage.trustBasic');
  };

  const sortLabels: Record<SortOption, string> = {
    trust_score_desc: t('sort.trustDesc'),
    trust_score_asc: t('sort.trustAsc'),
    name_asc: t('sort.nameAsc'),
    name_desc: t('sort.nameDesc'),
  };

  const totalResults = results.length + allFormResults.length;
  const displayedForms = showAllForms ? filteredFormResults : filteredFormResults.slice(0, 8);
  const uniqueMunicipalityCount = new Set(allFormResults.map((r) => r.municipality.slug)).size;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Zaglavlje sa pretragom */}
      <div className="bg-gradient-to-r from-[#003D7A] to-[#00A651] text-white py-8">
        <div className="container px-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{t('searchPage.backHome')}</span>
          </Button>

          <div className="max-w-2xl mx-auto mb-3"><InstitutionAutocomplete /></div>
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-12 bg-white text-gray-900"
              />
              <Button type="submit" size="lg" className="h-12 bg-[#00A651] hover:bg-[#008F45]">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Obavještenje o nivou pristupa */}
      {!accessLevel.isAdmin && !accessLevel.hasSubscription && (
        <div className="bg-yellow-50 border-b border-yellow-200 py-3">
          <div className="container px-4">
            <Alert className="bg-transparent border-0 p-0">
              <AlertDescription className="text-yellow-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="flex items-start sm:items-center gap-2">
                  <Lock className="h-4 w-4 mt-0.5 sm:mt-0 flex-shrink-0" />
                  <span className="break-words">{getSubscriptionMessage(language)}</span>
                </span>
                <Button
                  size="sm"
                  className="bg-[#003D7A] hover:bg-[#002A5A] text-white flex-shrink-0"
                  onClick={() => navigate('/subscription')}
                >
                  {t('searchPage.subscribeCta')}
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}

      <div className="container px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003D7A] mx-auto" />
            <p className="mt-4 text-gray-600">{t('searchPage.searching')}</p>
          </div>
        ) : errorKey ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2 break-words">
                {t(errorKey)}
              </h3>
              <p className="text-gray-600 mt-4 break-words">
                {t('searchPage.tryOtherTermOrSupport')}
              </p>
            </CardContent>
          </Card>
        ) : totalResults === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t('searchPage.noResultsTitle')}
              </h3>
              <p className="text-gray-600 break-words">{t('searchPage.tryOtherTerm')}</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#003D7A] break-words">
                {t('searchPage.resultsForQuery', { query })}
              </h2>
              <p className="text-gray-600 mt-1 break-words">
                {t('searchPage.foundResults', { count: totalResults })}
                {allFormResults.length > 0 && (
                  <span className="ml-2 text-xs text-green-600">
                    <FileText className="h-3 w-3 inline mr-1" />
                    {t('searchPage.formsFromMunicipalities', {
                      forms: allFormResults.length,
                      municipalities: uniqueMunicipalityCount,
                    })}
                  </span>
                )}
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="results" className="flex items-center gap-2">
                  <Search className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{t('searchPage.tabResults')}</span>
                </TabsTrigger>
                <TabsTrigger value="compare" className="flex items-center gap-1.5">
                  <GitCompareArrows className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{t('searchPage.tabCompare')}</span>
                  {comparisonData.length > 0 && (
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      {comparisonData.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* Tab: rezultati */}
              <TabsContent value="results" className="mt-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Filter className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <Select value={municipalityFilter} onValueChange={setMunicipalityFilter}>
                      <SelectTrigger className="w-full sm:w-[240px]">
                        <SelectValue placeholder={t('searchPage.filterByMunicipality')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          {t('searchPage.allMunicipalitiesCount', { count: allFormResults.length })}
                        </SelectItem>
                        {allMunicipalities.map((m) => {
                          const count = allFormResults.filter(
                            (r) => r.municipality.slug === m.slug,
                          ).length;
                          if (count === 0) return null;
                          return (
                            <SelectItem key={m.slug} value={m.slug}>
                              {t('searchPage.municipalityFormsCount', { name: m.name, count })}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2 min-w-0">
                    <ArrowUpDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <Select
                      value={sortOption}
                      onValueChange={(value) => setSortOption(value as SortOption)}
                    >
                      <SelectTrigger className="w-full sm:w-[220px]">
                        <SelectValue placeholder={t('searchPage.sortBy')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trust_score_desc">
                          {sortLabels.trust_score_desc}
                        </SelectItem>
                        <SelectItem value="trust_score_asc">{sortLabels.trust_score_asc}</SelectItem>
                        <SelectItem value="name_asc">{sortLabels.name_asc}</SelectItem>
                        <SelectItem value="name_desc">{sortLabels.name_desc}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Pojedinačni obrasci */}
                {filteredFormResults.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-[#003D7A] flex flex-wrap items-center gap-2 mb-4">
                      <Building2 className="h-5 w-5 flex-shrink-0" />
                      <span className="break-words">{t('searchPage.formsHeading')}</span>
                      {municipalityFilter !== 'all' && (
                        <span className="text-gray-500 font-normal break-words">
                          — {allMunicipalities.find((m) => m.slug === municipalityFilter)?.name}
                        </span>
                      )}
                      <Badge className="bg-[#00A651] text-white flex-shrink-0">
                        {filteredFormResults.length}
                      </Badge>
                    </h3>

                    <div className="grid gap-2">
                      {displayedForms.map(({ municipality, form }) => (
                        <Card
                          key={`${municipality.slug}-${form.id}`}
                          className="hover:shadow-md transition-shadow border-l-4 border-l-[#00A651]"
                        >
                          <CardContent className="py-3 px-4 sm:px-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-800 text-sm leading-relaxed break-words">
                                  {form.name}
                                </p>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  <span className="text-xs text-gray-500">
                                    PDF •{' '}
                                    {form.sizeKB ? `${form.sizeKB} KB` : t('common.notAvailable')}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {form.category}
                                  </Badge>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs bg-[#003D7A]/10 text-[#003D7A]"
                                  >
                                    {municipality.name}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-[#003D7A] text-[#003D7A] hidden sm:flex"
                                  onClick={() => navigate(`/form/${form.id}`)}
                                >
                                  <FileText className="h-4 w-4 mr-1 flex-shrink-0" />
                                  {t('searchPage.details')}
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-[#003D7A] hover:bg-[#002A5A]"
                                  onClick={() => window.open(form.pdfUrl, '_blank', 'noopener,noreferrer')}
                                >
                                  <Download className="h-4 w-4 mr-1 flex-shrink-0" />
                                  {t('common.download')}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {filteredFormResults.length > 8 && !showAllForms && (
                      <Button
                        variant="ghost"
                        className="mt-3 text-[#003D7A] hover:bg-[#003D7A]/5 w-full"
                        onClick={() => setShowAllForms(true)}
                      >
                        {t('searchPage.showMoreForms', { count: filteredFormResults.length - 8 })}
                      </Button>
                    )}

                    {showAllForms && filteredFormResults.length > 8 && (
                      <Button
                        variant="ghost"
                        className="mt-3 text-gray-500 hover:bg-gray-100 w-full"
                        onClick={() => setShowAllForms(false)}
                      >
                        {t('common.showLess')}
                      </Button>
                    )}
                  </div>
                )}

                {/* Općine i institucije */}
                {results.length > 0 && (
                  <>
                    {filteredFormResults.length > 0 && (
                      <h3 className="text-lg font-semibold text-[#003D7A] mb-4 flex items-center gap-2">
                        <MapPin className="h-5 w-5 flex-shrink-0" />
                        <span className="break-words">{t('searchPage.municipalitiesHeading')}</span>
                      </h3>
                    )}
                    <div className="grid gap-4">
                      {results.map((result) => (
                        <Card key={result.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-lg sm:text-xl text-[#003D7A] mb-2 flex flex-wrap items-center gap-2">
                                  <MapPin className="h-5 w-5 flex-shrink-0" />
                                  <span className="break-words">{result.name}</span>
                                  {result.is_premium && (
                                    <Badge className="bg-amber-500 text-white text-xs">
                                      <Star className="h-3 w-3 mr-1 flex-shrink-0" />
                                      {t('searchPage.premium')}
                                    </Badge>
                                  )}
                                </CardTitle>
                                <CardDescription className="flex flex-wrap gap-2">
                                  {result.canton && (
                                    <Badge variant="outline">{result.canton}</Badge>
                                  )}
                                  {result.region && !result.canton && (
                                    <Badge variant="outline">{result.region}</Badge>
                                  )}
                                  {result.entity && (
                                    <Badge variant="outline">{result.entity}</Badge>
                                  )}
                                </CardDescription>
                              </div>

                              <div
                                className={`flex flex-col items-center px-3 py-2 rounded-lg border flex-shrink-0 ${getTrustScoreColor(
                                  result.trust_score,
                                )}`}
                              >
                                <Shield className="h-4 w-4 mb-1" />
                                <span className="text-lg font-bold">{result.trust_score}</span>
                                <span className="text-xs whitespace-nowrap">
                                  {getTrustScoreLabel(result.trust_score)}
                                </span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            {result.description && (
                              <p className="text-gray-600 text-sm mb-3 break-words">
                                {result.description}
                              </p>
                            )}

                            {result.categories && result.categories.length > 0 && (
                              <div className="space-y-2 mb-4">
                                <h4 className="font-semibold text-gray-700 text-sm">
                                  {t('searchPage.availableFormsLabel')}:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {result.categories.map((category: string, idx: number) => (
                                    <Badge key={idx} className="bg-[#00A651] text-white">
                                      {category}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="mt-4 flex items-center gap-3 flex-wrap">
                              {!accessLevel.canViewFormUrls ? null : getOfficialWebsite(result.name) ? (
                                <Button asChild className="bg-[#003D7A] hover:bg-[#002A5A] text-white">
                                  <a href={getOfficialWebsite(result.name)} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
                                    {t('searchPage.visitWebsite')}
                                  </a>
                                </Button>
                              ) : null}
                              {accessLevel.canViewFormUrls ? null : (
                                <Button
                                  variant="outline"
                                  className="border-[#003D7A] text-[#003D7A]"
                                  onClick={() => navigate('/subscription')}
                                >
                                  <Lock className="h-4 w-4 mr-2 flex-shrink-0" />
                                  {t('searchPage.subscribeForUrl')}
                                </Button>
                              )}

                              {allMunicipalities.some(
                                (m) =>
                                  m.name.toLowerCase().includes(result.name.toLowerCase()) ||
                                  result.name.toLowerCase().includes(m.slug),
                              ) && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-[#00A651] text-[#00A651] hover:bg-[#00A651]/5"
                                  onClick={() => {
                                    const match = allMunicipalities.find(
                                      (m) =>
                                        m.name.toLowerCase().includes(result.name.toLowerCase()) ||
                                        result.name.toLowerCase().includes(m.slug),
                                    );
                                    if (match) navigate(`/municipality/${match.slug}`);
                                  }}
                                >
                                  <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                                  {t('searchPage.viewForms')}
                                </Button>
                              )}

                              {accessLevel.canViewFormUrls && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleDetector(result.id)}
                                  className="border-[#003D7A]/50 text-[#003D7A] hover:bg-[#003D7A]/5"
                                >
                                  <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
                                  {expandedDetector === result.id
                                    ? t('searchPage.closeDetector')
                                    : t('searchPage.detectDomains')}
                                </Button>
                              )}

                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Database className="h-3 w-3 flex-shrink-0" />
                                {result.source === 'supabase'
                                  ? t('forms.liveDatabase')
                                  : t('searchPage.localDatabase')}
                              </span>
                            </div>

                            {expandedDetector === result.id && (
                              <div className="mt-4">
                                <DomainDetector
                                  municipalityName={result.name}
                                  onUrlFound={(url) => {
                                    console.log(`Found domain for ${result.name}: ${url}`);
                                  }}
                                />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>

              {/* Tab: usporedba općina */}
              <TabsContent value="compare" className="mt-6">
                {comparisonData.length === 0 ? (
                  <Card className="text-center py-12">
                    <CardContent>
                      <GitCompareArrows className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2 break-words">
                        {t('searchPage.noComparisonTitle')}
                      </h3>
                      <p className="text-gray-500 max-w-md mx-auto break-words">
                        {t('searchPage.noComparisonHint')}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800 flex items-start gap-2 break-words">
                        <GitCompareArrows className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        {t('searchPage.comparisonIntro', { count: comparisonData.length })}
                      </p>
                    </div>

                    {comparisonData.map((group, groupIdx) => (
                      <Card key={groupIdx} className="overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-[#003D7A]/5 to-[#00A651]/5 pb-3">
                          <CardTitle className="text-base text-[#003D7A] flex items-center gap-2">
                            <FileText className="h-4 w-4 flex-shrink-0" />
                            <span className="break-words">
                              {t('searchPage.similarFormVersions', { count: group.matches.length })}
                            </span>
                          </CardTitle>
                          <CardDescription className="text-xs break-words">
                            {t('searchPage.availableIn', {
                              list: [
                                ...new Set(group.matches.map((m) => m.municipality.name)),
                              ].join(', '),
                            })}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="divide-y">
                            {group.matches.map((match, matchIdx) => (
                              <div
                                key={matchIdx}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-800 leading-relaxed break-words">
                                    {match.form.name}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    <Badge
                                      variant="secondary"
                                      className="text-xs bg-[#003D7A]/10 text-[#003D7A]"
                                    >
                                      <Building2 className="h-3 w-3 mr-1 flex-shrink-0" />
                                      {match.municipality.name}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {match.form.category}
                                    </Badge>
                                    {match.form.sizeKB && (
                                      <span className="text-xs text-gray-400">
                                        {match.form.sizeKB} KB
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-[#003D7A] text-[#003D7A] hidden sm:flex"
                                    onClick={() => navigate(`/form/${match.form.id}`)}
                                  >
                                    {t('searchPage.details')}
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-[#00A651] hover:bg-[#008F45]"
                                    onClick={() => window.open(match.form.pdfUrl, '_blank', 'noopener,noreferrer')}
                                  >
                                    <Download className="h-4 w-4 mr-1 flex-shrink-0" />
                                    PDF
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;