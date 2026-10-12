import { useState, useMemo, useEffect } from 'react';
import { safeHttpsUrl, getOfficialWebsite } from '@/lib/institution-directory';
import { useDirectoryVersion } from '@/hooks/use-directory-version';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Search,
  FileText,
  Download,
  Filter,
  ExternalLink,
  Building2,
  Eye,
  Database,
  Globe,
  Share2,
  Pencil,
  Languages,
  Printer,
} from 'lucide-react';
import {
  getMunicipalityBySlug,
  getAllMunicipalities,
} from '@/data/municipality-registry';
import {
  getDokumentiBySlug,
  getPrevodiForDokument,
  DokumentWithInstitucija,
  DokumentPrevod,
} from '@/lib/dokumenti-service';
import { latinToCyrillic } from '@/lib/cyrillic-converter';
import { canAccessUrls } from '@/lib/access-control';
import ReportBrokenLink from '@/components/ReportBrokenLink';
import Footer from '@/components/Footer';

/** Ujednačeni tip za prikaz (radi i sa statičkim i sa Supabase podacima). */
interface DisplayForm {
  id: string;
  name: string;
  description?: string;
  translatedName?: string;
  translatedDescription?: string;
  pdfUrl: string;
  category: string;
  sizeKB?: number;
  keywords?: string;
  source: 'static' | 'supabase';
  availableTranslations?: string[];
}

const MunicipalityForms = () => {
  useDirectoryVersion();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [supabaseForms, setSupabaseForms] = useState<DokumentWithInstitucija[]>([]);
  const [translations, setTranslations] = useState<Record<string, DokumentPrevod[]>>({});
  const [supabaseLoaded, setSupabaseLoaded] = useState(false);
  const [dataSource, setDataSource] = useState<'static' | 'supabase'>('static');
  const hasAccess = canAccessUrls();

  /** Lokalizuje tekst iz baze — u ćiriličnom modu automatski preslovljava. */
  const localizeDbText = (value: string): string =>
    language === 'bs-Cyrl' ? latinToCyrillic(value) : value;

  const municipality = useMemo(() => (slug ? getMunicipalityBySlug(slug) : null), [slug]);

  useEffect(() => {
    if (!slug) return;

    const loadSupabaseData = async () => {
      try {
        const docs = await getDokumentiBySlug(slug);
        if (docs.length > 0) {
          setSupabaseForms(docs);
          setDataSource('supabase');

          const translationMap: Record<string, DokumentPrevod[]> = {};
          for (const doc of docs) {
            const prevodi = await getPrevodiForDokument(doc.id);
            if (prevodi.length > 0) {
              translationMap[doc.id] = prevodi;
            }
          }
          setTranslations(translationMap);
        }
      } catch (err) {
        console.error('Supabase dokumenti load failed, using static data:', err);
      } finally {
        setSupabaseLoaded(true);
      }
    };

    loadSupabaseData();
  }, [slug]);

  const supabaseDisplayForms = useMemo((): DisplayForm[] => {
    return supabaseForms.map((doc) => {
      let translatedName: string | undefined;
      let translatedDescription: string | undefined;
      const availableTranslations: string[] = [];

      if (translations[doc.id]) {
        for (const prevod of translations[doc.id]) {
          availableTranslations.push(prevod.jezik);
          if (prevod.jezik === language || (language === 'bs-Cyrl' && prevod.jezik === 'bs_cyr')) {
            translatedName = prevod.naziv_preveden;
            translatedDescription = prevod.opis_preveden || undefined;
          }
        }
      }

      if (language === 'bs-Cyrl' && !translatedName) {
        translatedName = latinToCyrillic(doc.naziv_original);
        if (doc.opis_original) {
          translatedDescription = latinToCyrillic(doc.opis_original);
        }
      }

      return {
        id: doc.id,
        name: doc.naziv_original,
        description: doc.opis_original || undefined,
        translatedName,
        translatedDescription,
        pdfUrl: doc.file_url,
        category: doc.kategorija || t('common.other'),
        sizeKB: doc.velicina_kb || undefined,
        keywords: doc.keywords || undefined,
        source: 'supabase' as const,
        availableTranslations,
      };
    });
  }, [supabaseForms, translations, language, t]);

  const staticDisplayForms = useMemo((): DisplayForm[] => {
    if (!municipality) return [];
    return municipality.forms.map((f) => ({
      id: f.id,
      name: f.name,
      pdfUrl: f.pdfUrl,
      category: f.category,
      sizeKB: f.sizeKB,
      source: 'static' as const,
      translatedName: language === 'bs-Cyrl' ? latinToCyrillic(f.name) : undefined,
    }));
  }, [municipality, language]);

  const allForms =
    dataSource === 'supabase' && supabaseForms.length > 0
      ? supabaseDisplayForms
      : staticDisplayForms;

  const filteredForms = useMemo((): DisplayForm[] => {
    let forms = allForms;

    if (searchQuery.trim()) {
      const term = searchQuery.toLowerCase().trim();
      forms = forms.filter((f) => {
        const keywordsMatch = f.keywords?.toLowerCase().includes(term);
        const nameMatch = f.name.toLowerCase().includes(term);
        const descMatch = f.description?.toLowerCase().includes(term);
        const translatedMatch = f.translatedName?.toLowerCase().includes(term);
        const categoryMatch = f.category.toLowerCase().includes(term);
        return keywordsMatch || nameMatch || descMatch || translatedMatch || categoryMatch;
      });
    }

    if (selectedCategory) {
      forms = forms.filter((f) => f.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    return forms;
  }, [allForms, searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    for (const f of allForms) {
      cats.add(f.category);
    }
    return Array.from(cats).sort();
  }, [allForms]);

  const formsByCategory = useMemo(() => {
    const grouped: Record<string, DisplayForm[]> = {};
    for (const form of filteredForms) {
      if (!grouped[form.category]) {
        grouped[form.category] = [];
      }
      grouped[form.category].push(form);
    }
    return grouped;
  }, [filteredForms]);

  const handleShare = async (form: DisplayForm) => {
    const shareUrl = form.pdfUrl;
    const title = form.translatedName || form.name;
    const shareData = {
      title,
      text: `${title} — BH PapirFinder`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        navigator.clipboard.writeText(shareUrl);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  // Općina nije pronađena — prikaži dostupne općine
  if (!municipality && supabaseLoaded && supabaseForms.length === 0) {
    const allMunicipalities = getAllMunicipalities();
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-[#003D7A] to-[#00A651] text-white py-8">
          <div className="container px-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 mb-4"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2 flex-shrink-0" />
              {t('common.back')}
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold break-words">
              {t('forms.municipalityNotFound')}
            </h1>
          </div>
        </div>
        <div className="container px-4 py-8">
          <Card className="max-w-lg mx-auto">
            <CardContent className="text-center py-12">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 break-words">
                {t('forms.notAvailableYet')}
              </h3>
              <p className="text-gray-600 mb-6 break-words">{t('forms.currentlyAvailable')}:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {allMunicipalities.map((m) => (
                  <Button
                    key={m.slug}
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/municipality/${m.slug}`)}
                  >
                    <Building2 className="h-4 w-4 mr-1 flex-shrink-0" />
                    {m.name} ({m.formsCount})
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const municipalityName = municipality?.name || supabaseForms[0]?.institucije?.naziv || slug || '';
  const totalForms = allForms.length;
  const cantonInfo = municipality
    ? `${municipality.canton} (${municipality.cantonShort}) • ${municipality.entity}`
    : supabaseForms[0]?.institucije
      ? `${supabaseForms[0].institucije.kanton || ''} (${
          supabaseForms[0].institucije.kanton_kratko || ''
        }) • ${supabaseForms[0].institucije.entitet || ''}`
      : '';
  const officialUrl = municipality
    ? (municipality.website || getOfficialWebsite(municipality.name.replace(/^(Općina|Opština|Grad)\s+/, '')) || municipality.officialUrl)
    : undefined;
  const formsPortalUrl = municipality?.officialUrl;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Zaglavlje */}
      <div className="bg-gradient-to-r from-[#003D7A] to-[#00A651] text-white py-8">
        <div className="container px-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2 flex-shrink-0" />
            {t('common.back')}
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl font-bold break-words">
              {localizeDbText(municipalityName)}
            </h1>
          </div>
          <p className="text-white/80 text-base sm:text-lg break-words">
            {t('forms.electronicForms')} — {totalForms} {t('forms.formsAvailableCount')}
          </p>
          {cantonInfo && (
            <p className="text-white/60 text-sm mt-1 break-words">{localizeDbText(cantonInfo)}</p>
          )}

          <div className="flex flex-wrap items-center gap-3 mt-4">
            {safeHttpsUrl(officialUrl) && (
              <Button asChild variant="outline" size="sm" className="!bg-transparent border-white/50 text-white hover:!bg-white/10">
                <a href={safeHttpsUrl(officialUrl)} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
                  {t('forms.visitOfficial')}
                </a>
              </Button>
            )}

            {safeHttpsUrl(formsPortalUrl) && formsPortalUrl !== officialUrl && (
              <Button asChild variant="outline" size="sm" className="!bg-white/20 border-white/60 text-white hover:!bg-white/30 font-medium">
                <a href={safeHttpsUrl(formsPortalUrl)} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
                  Službeni repozitorij obrazaca
                </a>
              </Button>
            )}

            <Badge className="bg-white/20 text-white border-white/30 text-xs">
              {dataSource === 'supabase' ? (
                <>
                  <Database className="h-3 w-3 mr-1 flex-shrink-0" />
                  {t('forms.liveDatabase')}
                </>
              ) : (
                <>
                  <Globe className="h-3 w-3 mr-1 flex-shrink-0" />
                  {t('forms.staticData')}
                </>
              )}
            </Badge>

            <ReportBrokenLink
              municipalityName={municipalityName}
              municipalitySlug={slug}
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className="!bg-transparent border-white/50 text-white hover:!bg-transparent"
                >
                  {t('report.title')}
                </Button>
              }
            />
          </div>
        </div>
      </div>

      {/* Pretraga i filteri */}
      <div className="container px-4 py-6 flex-1">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={t('forms.searchDetailedPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="h-4 w-4 text-gray-500 flex-shrink-0" />
            <Badge
              variant={selectedCategory === null ? 'default' : 'outline'}
              className={`cursor-pointer ${
                selectedCategory === null ? 'bg-[#003D7A] text-white' : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              {t('common.all')} ({totalForms})
            </Badge>
            {categories.map((cat) => {
              const count = allForms.filter(
                (f) => f.category.toLowerCase() === cat.toLowerCase(),
              ).length;
              return (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  className={`cursor-pointer ${
                    selectedCategory === cat ? 'bg-[#00A651] text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                >
                  {localizeDbText(cat)} ({count})
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Broj rezultata */}
        <p className="text-sm text-gray-600 mb-4 break-words">
          {t('forms.showingCount', { shown: filteredForms.length, total: totalForms })}
          {searchQuery && ` ${t('forms.forQuery', { query: searchQuery })}`}
          {selectedCategory &&
            ` ${t('forms.inCategory', { category: localizeDbText(selectedCategory) })}`}
        </p>

        {/* Obrasci grupisani po kategoriji */}
        {filteredForms.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t('common.noResults')}
              </h3>
              <p className="text-gray-600 break-words">{t('forms.noResultsHintCategory')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(formsByCategory).map(([category, forms]) => (
              <div key={category}>
                <h3 className="text-base sm:text-lg font-semibold text-[#003D7A] mb-3 flex flex-wrap items-center gap-2">
                  <FileText className="h-5 w-5 flex-shrink-0" />
                  <span className="break-words">{localizeDbText(category)}</span>
                  <Badge variant="secondary" className="flex-shrink-0">
                    {forms.length}
                  </Badge>
                </h3>
                <div className="grid gap-3">
                  {forms.map((form) => (
                    <Card
                      key={form.id}
                      className="hover:shadow-md transition-shadow border-l-4 border-l-[#00A651]"
                    >
                      <CardContent className="py-4 px-4 sm:px-5">
                        <div className="flex flex-col gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 text-sm leading-relaxed break-words">
                              {form.translatedName || form.name}
                            </p>
                            {form.translatedName && form.translatedName !== form.name && (
                              <p className="text-xs text-gray-500 mt-0.5 italic break-words">
                                {form.name}
                              </p>
                            )}
                            {(form.translatedDescription || form.description) && (
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2 break-words">
                                {form.translatedDescription || form.description}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <span className="text-xs text-gray-500">
                                PDF • {form.sizeKB ? `${form.sizeKB} KB` : t('common.notAvailable')}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {localizeDbText(form.category)}
                              </Badge>
                              {form.source === 'supabase' && (
                                <Badge variant="secondary" className="text-xs">
                                  <Database className="h-3 w-3 mr-1 flex-shrink-0" />
                                  DB
                                </Badge>
                              )}
                              {form.availableTranslations &&
                                form.availableTranslations.length > 0 && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs bg-purple-50 text-purple-700 border-purple-200"
                                  >
                                    <Languages className="h-3 w-3 mr-1 flex-shrink-0" />
                                    {form.availableTranslations
                                      .map((l) => l.toUpperCase())
                                      .join(', ')}
                                  </Badge>
                                )}
                            </div>
                          </div>

                          {/* Akcije */}
                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#003D7A] text-[#003D7A]"
                              onClick={() => navigate(`/form/${form.id}`)}
                            >
                              <Eye className="h-4 w-4 mr-1 flex-shrink-0" />
                              {t('common.preview')}
                            </Button>

                            <Button
                              size="sm"
                              className="bg-[#003D7A] hover:bg-[#002A5A]"
                              onClick={() => {
                                if (hasAccess) {
                                  window.open(form.pdfUrl, '_blank', 'noopener,noreferrer');
                                } else {
                                  navigate('/subscription');
                                }
                              }}
                            >
                              <Download className="h-4 w-4 mr-1 flex-shrink-0" />
                              {t('common.download')}
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-600 text-green-700 hover:bg-green-50"
                              onClick={() => handleShare(form)}
                            >
                              <Share2 className="h-4 w-4 mr-1 flex-shrink-0" />
                              {t('common.share')}
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="border-amber-600 text-amber-700 hover:bg-amber-50"
                              onClick={() => navigate(`/form/${form.id}?mode=edit`)}
                            >
                              <Pencil className="h-4 w-4 mr-1 flex-shrink-0" />
                              {t('common.edit')}
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="hidden sm:flex"
                              onClick={() => {
                                if (hasAccess) {
                                  const printWindow = window.open(form.pdfUrl, '_blank');
                                  if (printWindow) {
                                    printWindow.addEventListener('load', () => {
                                      printWindow.print();
                                    });
                                  }
                                } else {
                                  navigate('/subscription');
                                }
                              }}
                            >
                              <Printer className="h-4 w-4 mr-1 flex-shrink-0" />
                              {t('common.print')}
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="border-purple-600 text-purple-700 hover:bg-purple-50 hidden sm:flex"
                              onClick={() => navigate(`/form/${form.id}?tab=translations`)}
                            >
                              <Languages className="h-4 w-4 mr-1 flex-shrink-0" />
                              {t('common.translate')}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MunicipalityForms;