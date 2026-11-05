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
  Star,
  Tag,
  Save,
} from 'lucide-react';
import { safeOpenExternal } from '@/lib/security';
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
import Breadcrumbs from '@/components/Breadcrumbs';
import TagNavigation, { matchesTagFilter } from '@/components/TagNavigation';
import { toast } from 'sonner';
import { saveDocumentLocally } from '@/lib/saved-documents';
import OfficialDocumentPreview from '@/components/OfficialDocumentPreview';
import KladanjRequestNotice from '@/components/KladanjRequestNotice';
import MunicipalityEmailRequest from '@/components/MunicipalityEmailRequest';
import { getMunicipalityContactEmail } from '@/data/municipality-contact-emails';
import { getDirectoryEntry, hasNoListedMunicipalityDocuments } from '@/lib/institution-directory';

/** Ujednačeni tip za prikaz (radi i sa statičkim i sa Supabase podacima). */
interface DisplayForm {
  id: string;
  name: string;
  description?: string;
  translatedName?: string;
  translatedDescription?: string;
  pdfUrl: string;
  sourceUrl?: string;
  fileType?: 'pdf' | 'docx' | 'doc' | 'html';
  external?: boolean;
  category: string;
  sizeKB?: number;
  keywords?: string;
  source: 'static' | 'supabase';
  availableTranslations?: string[];
}

const MunicipalityForms = () => {
  const directoryVersion = useDirectoryVersion();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [supabaseForms, setSupabaseForms] = useState<DokumentWithInstitucija[]>([]);
  const [translations, setTranslations] = useState<Record<string, DokumentPrevod[]>>({});
  const [supabaseLoaded, setSupabaseLoaded] = useState(false);
  const [dataSource, setDataSource] = useState<'static' | 'supabase'>('static');
  const [previewForm, setPreviewForm] = useState<DisplayForm | null>(null);
  const hasAccess = canAccessUrls();

  /** Lokalizuje tekst iz baze — u ćiriličnom modu automatski preslovljava. */
  const localizeDbText = (value: string): string =>
    language === 'bs-Cyrl' ? latinToCyrillic(value) : value;

  const municipality = useMemo(() => {
    if (!slug) return null;
    const registered = getMunicipalityBySlug(slug);
    if (registered) return registered;

    const entry = getDirectoryEntry(slug);
    if (entry?.kind !== 'municipality') return null;
    return {
      slug: entry.slug,
      name: entry.name,
      canton: entry.canton || '',
      cantonShort: '',
      entity: entry.entity || '',
      website: entry.website,
      officialUrl: entry.formsUrl || entry.officialUrl || entry.website || '',
      formsCount: entry.forms.length,
      forms: entry.forms.flatMap((form) => form.url ? [{
        id: form.id,
        name: form.name,
        pdfUrl: form.url,
        category: form.category,
        sourceUrl: form.sourceUrl,
        fileType: form.fileType,
        external: !form.internal,
      }] : []),
      categories: entry.categories,
      notice: entry.note,
    };
  }, [slug, directoryVersion]);
  const directoryEntry = useMemo(
    () => (slug ? getDirectoryEntry(slug) : undefined),
    [slug, directoryVersion],
  );

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
      sourceUrl: f.sourceUrl,
      category: f.category,
      sizeKB: f.sizeKB,
      fileType: f.fileType,
      external: f.external,
      source: 'static' as const,
      translatedName: language === 'bs-Cyrl' ? latinToCyrillic(f.name) : undefined,
    }));
  }, [municipality, language]);

  const allForms = useMemo(() => {
    if (dataSource !== 'supabase' || supabaseForms.length === 0) return staticDisplayForms;
    if (
      !['kalesija', 'grude', 'gornji-vakuf-uskoplje', 'gornji-vakuf', 'kljuc', 'lukavac', 'kotor-varos', 'lopare', 'livno']
        .includes(slug ?? '')
    ) {
      return supabaseDisplayForms;
    }

    const existingUrls = new Set(
      supabaseDisplayForms.map((form) => form.pdfUrl.trim().replace(/\/+$/, '').toLowerCase()),
    );
    const existingNames = new Set(
      supabaseDisplayForms.map((form) => form.name.trim().toLocaleLowerCase('bs-BA')),
    );
    const additionalStaticForms = staticDisplayForms.filter((form) => (
      !existingUrls.has(form.pdfUrl.trim().replace(/\/+$/, '').toLowerCase()) &&
      !existingNames.has(form.name.trim().toLocaleLowerCase('bs-BA'))
    ));

    return [...supabaseDisplayForms, ...additionalStaticForms];
  }, [dataSource, supabaseForms.length, slug, staticDisplayForms, supabaseDisplayForms]);

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
      forms = forms.filter((f) => matchesTagFilter(f, selectedCategory));
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
  const handleSave = (form: DisplayForm) => {
    try {
      const saved = saveDocumentLocally({
        id: form.id,
        name: form.translatedName || form.name,
        municipality: municipalityName,
        category: form.category,
        file_url: form.pdfUrl,
        notes: form.sourceUrl ? `Izvor: ${form.sourceUrl}` : '',
      });
      toast.success(saved ? t('inst.savedToArchive') : t('inst.alreadySaved'));
    } catch (error) {
      console.error('Document save failed:', error);
      toast.error(t('inst.saveFailed'));
    }
  };
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
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2 flex-shrink-0" />
              {t('common.back')}
            </Button>
            <Breadcrumbs />
          </div>

          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl font-bold break-words">
              {localizeDbText(municipalityName)}
            </h1>
          </div>
          <p className="text-white/80 text-base sm:text-lg break-words">
            {t('forms.electronicForms')} — {totalForms} {t('forms.formsAvailableCount')}
          </p>
          {municipality?.notice && (
            <p className="mt-2 max-w-3xl text-sm text-white/85 break-words">
              {localizeDbText(municipality.notice)}
            </p>
          )}
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
                  {municipality?.slug === 'bosanska-krupa'
                    ? 'Otvori eCitizen portal'
                    : 'Službeni repozitorij obrazaca'}
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

      {/* Pretraga i Tag-based navigacija */}
      <div className="container px-4 py-6 flex-1">
        {slug === 'kladanj' && supabaseLoaded && allForms.length === 0 && (
          <KladanjRequestNotice language={language} />
        )}
        {slug !== 'kladanj' && supabaseLoaded && hasNoListedMunicipalityDocuments(directoryEntry) && allForms.length === 0 && (
          <MunicipalityEmailRequest
            municipalitySlug={municipality.slug}
            municipalityName={municipality.name}
            municipalityEmail={directoryEntry?.email || getMunicipalityContactEmail(municipality.slug)}
            municipalityContact={directoryEntry}
            formsUrl={municipality.officialUrl}
            language={language}
          />
        )}
        <div className="mb-6 space-y-4">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={t('forms.searchDetailedPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-white"
            />
          </div>

          {/* Tag-Based Navigation Bar */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
            <TagNavigation
              forms={allForms}
              activeTag={selectedCategory}
              onSelectTag={setSelectedCategory}
              theme="light"
              totalCount={totalForms}
            />
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
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-[#003D7A] flex flex-wrap items-center gap-2">
                    <FileText className="h-5 w-5 flex-shrink-0" />
                    <span className="break-words">{localizeDbText(category)}</span>
                    <Badge variant="secondary" className="flex-shrink-0">
                      {forms.length}
                    </Badge>
                  </h3>
                  {forms.find((form) => form.sourceUrl)?.sourceUrl && (
                    <Button asChild size="sm" variant="link" className="h-auto p-0 text-xs">
                      <a href={forms.find((form) => form.sourceUrl)?.sourceUrl} target="_blank" rel="noopener noreferrer">
                        {t('inst.officialSource')}
                      </a>
                    </Button>
                  )}
                </div>
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
                                {(form.fileType || 'pdf').toUpperCase()} • {form.sizeKB ? `${form.sizeKB} KB` : t('common.notAvailable')}
                              </span>
                              <button
                                type="button"
                                onClick={() => setSelectedCategory(selectedCategory === form.category ? null : form.category)}
                                className={`text-xs px-2 py-0.5 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                                  selectedCategory === form.category
                                    ? 'bg-[#00A651] text-white shadow-xs'
                                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                                }`}
                                title={`Klikni za filtriranje po kategoriji "${form.category}"`}
                              >
                                <Tag className="w-2.5 h-2.5" />
                                <span>{localizeDbText(form.category)}</span>
                              </button>
                              <span
                                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 cursor-pointer hover:bg-amber-100 transition-colors"
                                onClick={() => navigate(`/form/${form.id}?tab=reviews`)}
                                title="Pogledaj ocjene i tačnost ovog obrasca"
                              >
                                <Star className="h-3 w-3 fill-amber-400 text-amber-500" />
                                4.8 ★
                              </span>
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
                              onClick={() => form.external ? setPreviewForm(form) : navigate(`/form/${form.id}`)}
                            >
                              <Eye className="h-4 w-4 mr-1 flex-shrink-0" />
                              {t('common.preview')}
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="border-sky-600 text-sky-700 hover:bg-sky-50"
                              onClick={() => {
                                if (form.fileType === 'docx' || form.fileType === 'doc') {
                                  safeOpenExternal(form.pdfUrl);
                                  toast.info(t('inst.downloadToEdit'));
                                } else if (form.fileType === 'html') {
                                  safeOpenExternal(form.pdfUrl);
                                } else {
                                  navigate(`/form/${form.id}`);
                                }
                              }}
                            >
                              <Pencil className="h-4 w-4 mr-1 flex-shrink-0" />
                              {t('inst.edit')}
                            </Button>

                            <Button
                              size="sm"
                              className="bg-[#003D7A] hover:bg-[#002A5A]"
                              onClick={() => {
                                if (hasAccess) {
                                  const link = document.createElement('a');
                                  link.href = form.pdfUrl;
                                  link.download = '';
                                  link.target = '_blank';
                                  link.rel = 'noopener noreferrer';
                                  link.click();
                                } else {
                                  navigate('/subscription');
                                }
                              }}
                            >
                              <Download className="h-4 w-4 mr-1 flex-shrink-0" />
                              {t('common.download')}
                            </Button>

                            {/* Print-Friendly Mode navigation */}
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-300 text-slate-800 hover:bg-slate-100"
                              onClick={() => navigate(`/form/${form.id}?mode=print`)}
                            >
                              <Printer className="h-4 w-4 mr-1 flex-shrink-0 text-[#003D7A]" />
                              {t('common.print')}
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
                              onClick={() => handleSave(form)}
                            >
                              <Save className="h-4 w-4 mr-1 flex-shrink-0" />
                              {t('inst.save')}
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="border-amber-600 text-amber-700 hover:bg-amber-50"
                              onClick={() => navigate(`/form/${form.id}?tab=reviews`)}
                            >
                              <Star className="h-4 w-4 mr-1 flex-shrink-0 fill-amber-400 text-amber-500" />
                              Ocjene
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

      {previewForm && (
        <OfficialDocumentPreview
          open={!!previewForm}
          onOpenChange={(open) => {
            if (!open) setPreviewForm(null);
          }}
          title={previewForm.translatedName || previewForm.name}
          url={previewForm.pdfUrl}
          fileType={previewForm.fileType}
        />
      )}

      <Footer />
    </div>
  );
};

export default MunicipalityForms;