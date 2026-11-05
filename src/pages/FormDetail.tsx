import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Download,
  Printer,
  Share2,
  ExternalLink,
  FileText,
  Copy,
  CheckCircle,
  Languages,
  Database,
  Eye,
  Pencil,
  Globe,
  WifiOff,
  CloudDownload,
  Star,
  FileDown,
  Loader2,
  Link2,
} from 'lucide-react';
import { getFormById, MunicipalityForm, MunicipalityInfo } from '@/data/municipality-registry';
import {
  getDokumentById,
  getPrevodiForDokument,
  DokumentWithInstitucija,
  DokumentPrevod,
} from '@/lib/dokumenti-service';
import { latinToCyrillic } from '@/lib/cyrillic-converter';
import { canAccessUrls } from '@/lib/access-control';
import { isUrlCached, cachePdfUrl } from '@/lib/offline-cache';
import { safeOpenExternal } from '@/lib/security';
import { exportDirectFallbackPdf } from '@/lib/pdf-export-service';
import FormFillerAssistant from '@/components/FormFillerAssistant';
import ReportBrokenLink from '@/components/ReportBrokenLink';
import DocumentRatingSystem from '@/components/DocumentRatingSystem';
import DocumentClarityAccuracyRating from '@/components/DocumentClarityAccuracyRating';
import RecommendedDocuments from '@/components/RecommendedDocuments';
import PrintFriendlyFormView from '@/components/PrintFriendlyFormView';
import PrintPreviewModal from '@/components/PrintPreviewModal';
import QuickPreviewOverlay from '@/components/QuickPreviewOverlay';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniversalBackButton from '@/components/UniversalBackButton';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import DocumentSourcesReferences from '@/components/DocumentSourcesReferences';
import DocumentPdfViewer from '@/components/DocumentPdfViewer';
import { toast } from 'sonner';

const FormDetail = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { formId } = useParams<{ formId: string }>();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'preview';
  const [isPrintMode, setIsPrintMode] = useState(searchParams.get('mode') === 'print');
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [showQuickPreview, setShowQuickPreview] = useState(false);
  const [recommendedPreviewForm, setRecommendedPreviewForm] = useState<{ form: MunicipalityForm; municipality: MunicipalityInfo } | null>(null);
  const [aggregateRatingInfo, setAggregateRatingInfo] = useState<{ average: number; count: number } | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [form, setForm] = useState<MunicipalityForm | null>(null);
  const [municipality, setMunicipality] = useState<MunicipalityInfo | null>(null);
  const [supabaseDoc, setSupabaseDoc] = useState<DokumentWithInstitucija | null>(null);
  const [translations, setTranslations] = useState<DokumentPrevod[]>([]);
  const [dataSource, setDataSource] = useState<'static' | 'supabase'>('static');
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isCached, setIsCached] = useState(false);
  const [caching, setCaching] = useState(false);
  const hasAccess = canAccessUrls();

  useEffect(() => {
    if (!formId) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      // First try static registry
      const staticResult = getFormById(formId);
      if (staticResult) {
        setForm(staticResult.form);
        setMunicipality(staticResult.municipality);
        setDataSource('static');
      }

      // Also try Supabase (may have translations + opis_original)
      try {
        const doc = await getDokumentById(formId);
        if (doc) {
          setSupabaseDoc(doc);
          setDataSource('supabase');

          // Load translations
          const prevodi = await getPrevodiForDokument(doc.id);
          setTranslations(prevodi);
        }
      } catch (err) {
        console.error('Supabase document load failed:', err);
      }

      setLoading(false);
    };

    loadData();
  }, [formId]);

  // Check if PDF is cached for offline access
  useEffect(() => {
    const checkCache = async () => {
      const url = fileUrl;
      if (url) {
        const cached = await isUrlCached(url);
        setIsCached(cached);
      }
    };
    if (!loading) {
      checkCache();
    }
  });

  // Determine display values based on data source — uses naziv_original and opis_original
  const displayName = (() => {
    if (dataSource === 'supabase' && supabaseDoc) {
      if (language === 'bs-Cyrl') {
        const prevod = translations.find((t) => t.jezik === 'bs_cyr');
        if (prevod) return prevod.naziv_preveden;
        return latinToCyrillic(supabaseDoc.naziv_original);
      }
      if (language !== 'bs') {
        const prevod = translations.find((t) => t.jezik === language);
        if (prevod) return prevod.naziv_preveden;
      }
      return supabaseDoc.naziv_original;
    }
    if (language === 'bs-Cyrl' && form) {
      return latinToCyrillic(form.name);
    }
    return form?.name || '';
  })();

  const originalName = (() => {
    if (dataSource === 'supabase' && supabaseDoc) return supabaseDoc.naziv_original;
    return form?.name || '';
  })();

  // file_url — the actual document URL
  const fileUrl = (() => {
    if (dataSource === 'supabase' && supabaseDoc) return supabaseDoc.file_url;
    return form?.pdfUrl || '';
  })();

  const category = (() => {
    if (dataSource === 'supabase' && supabaseDoc) return supabaseDoc.kategorija || 'Ostalo';
    return form?.category || '';
  })();

  const sizeKB = (() => {
    if (dataSource === 'supabase' && supabaseDoc) return supabaseDoc.velicina_kb;
    return form?.sizeKB;
  })();

  const municipalityName = (() => {
    if (dataSource === 'supabase' && supabaseDoc?.institucije) {
      return supabaseDoc.institucije.naziv;
    }
    return municipality?.name || '';
  })();

  const cantonShort = (() => {
    if (dataSource === 'supabase' && supabaseDoc?.institucije) {
      return supabaseDoc.institucije.kanton_kratko || '';
    }
    return municipality?.cantonShort || '';
  })();

  // opis_original — document description
  const description = (() => {
    if (dataSource === 'supabase' && supabaseDoc) {
      if (language === 'bs-Cyrl') {
        const prevod = translations.find((t) => t.jezik === 'bs_cyr');
        if (prevod?.opis_preveden) return prevod.opis_preveden;
        if (supabaseDoc.opis_original) return latinToCyrillic(supabaseDoc.opis_original);
      }
      if (language !== 'bs') {
        const prevod = translations.find((t) => t.jezik === language);
        if (prevod?.opis_preveden) return prevod.opis_preveden;
      }
      return supabaseDoc.opis_original;
    }
    return null;
  })();

  const handleDownload = () => {
    if (fileUrl && hasAccess) {
      safeOpenExternal(fileUrl);
    }
  };

  const handlePrint = () => {
    setIsPrintMode(true);
  };

  const handleDirectPrint = () => {
    window.print();
  };

  const handleDownloadPdfLocally = () => {
    setIsDownloadingPdf(true);
    try {
      const success = exportDirectFallbackPdf({
        formName: displayName,
        municipalityName,
        category,
        description: description || undefined,
      });
      if (success) {
        toast.success(language === 'en' ? 'PDF generated and downloaded successfully!' : 'Obrazac je uspješno generisan i preuzet kao PDF!');
      } else {
        toast.error('Greška pri snimanju PDF-a.');
      }
    } catch (err) {
      console.error('PDF export error:', err);
      toast.error('Došlo je do greške pri generisanju PDF-a.');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Share using navigator.share() with file_url — works with Viber/WhatsApp
  const handleShare = async () => {
    if (!fileUrl) return;

    const shareData = {
      title: displayName,
      text: `${displayName} — BH PapirFinder`,
      url: fileUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or not supported — fallback to clipboard
      }
    }

    // Fallback: copy file_url to clipboard
    copyLink(fileUrl);
  };

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyDocumentLink = () => {
    const documentUrl = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(documentUrl)
        .then(() => {
          setLinkCopied(true);
          toast.success(
            language === 'en'
              ? 'Document link copied to clipboard!'
              : language === 'de'
                ? 'Dokumenten-Link in die Zwischenablage kopiert!'
                : language === 'tr'
                  ? 'Belge bağlantısı panoya kopyalandı!'
                  : 'Direktni link do obrasca je kopiran u međuspremnik!'
          );
          setTimeout(() => setLinkCopied(false), 2500);
        })
        .catch(() => {
          fallbackCopyText(documentUrl);
        });
    } else {
      fallbackCopyText(documentUrl);
    }
  };

  const fallbackCopyText = (text: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setLinkCopied(true);
      toast.success(
        language === 'en'
          ? 'Document link copied to clipboard!'
          : 'Direktni link do obrasca je kopiran u međuspremnik!'
      );
      setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      toast.error('Nije uspjelo kopiranje linka.');
    }
  };

  // Cache PDF for offline
  const handleCacheForOffline = async () => {
    if (!fileUrl) return;
    setCaching(true);
    const success = await cachePdfUrl(fileUrl);
    setIsCached(success);
    setCaching(false);
  };

  // Language labels for translation display
  const languageLabels: Record<string, string> = {
    en: 'English',
    de: 'Deutsch',
    tr: 'Türkçe',
    bs_cyr: 'Ћирилица (BHS)',
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3 animate-pulse" />
          <p className="text-gray-600">
            {language === 'en' ? 'Loading form...' : language === 'de' ? 'Formular wird geladen...' : language === 'tr' ? 'Form yükleniyor...' : 'Učitavanje obrasca...'}
          </p>
        </div>
      </div>
    );
  }

  // Not found
  if (!form && !supabaseDoc) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {language === 'en' ? 'Form not found' : language === 'de' ? 'Formular nicht gefunden' : language === 'tr' ? 'Form bulunamadı' : 'Obrazac nije pronađen'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'en'
                ? 'The form you are looking for does not exist or has been removed.'
                : language === 'de'
                  ? 'Das gesuchte Formular existiert nicht oder wurde entfernt.'
                  : language === 'tr'
                    ? 'Aradığınız form mevcut değil veya kaldırılmış.'
                    : 'Obrazac koji tražite ne postoji ili je uklonjen.'}
            </p>
            <Button onClick={() => navigate('/')}>
              {language === 'en' ? 'Back to home' : language === 'de' ? 'Zurück zur Startseite' : language === 'tr' ? 'Ana sayfaya dön' : 'Nazad na početnu'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Print-Friendly Mode view
  if (isPrintMode) {
    return (
      <PrintFriendlyFormView
        formId={formId || ''}
        displayName={displayName}
        originalName={originalName}
        category={category}
        municipalityName={municipalityName}
        cantonShort={cantonShort}
        sizeKB={sizeKB}
        description={description}
        fileUrl={fileUrl}
        onExit={() => setIsPrintMode(false)}
      />
    );
  }

  // Google Docs Viewer for PDF preview (works with HTTPS PDFs via file_url)
  const previewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;

  return (
    <div className="min-h-screen flex flex-col text-slate-100 selection:bg-[#5df0a8]/30 selection:text-white">
      {/* Scroll-based reading progress bar */}
      <ReadingProgressBar />
      <Header />

      {/* Header */}
      <div className="border-b border-white/10 bg-[#070b1a]/90 backdrop-blur-2xl py-8 relative">
        <div className="container max-w-5xl px-4 mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-3">
              <UniversalBackButton variant="command" />
              <Breadcrumbs />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowQuickPreview(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-sky-300 hover:text-white bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 transition-all cursor-pointer shadow-xs"
                title="Otvori brzi interaktivni pregled dokumenta bez preuzimanja"
              >
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span>Quick Preview</span>
              </button>
              <button
                type="button"
                onClick={handleCopyDocumentLink}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all cursor-pointer shadow-xs"
                title="Kopiraj direktni URL do obrasca za dijeljenje"
              >
                {linkCopied ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-[#5df0a8]" />
                    <span className="text-[#5df0a8] font-bold">Link kopiran!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-3.5 h-3.5 text-[#5df0a8]" />
                    <span>Kopiraj link</span>
                  </>
                )}
              </button>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/30">
                <span>ADMINISTRATIVNI DOKUMENT</span>
              </div>
            </div>
          </div>

          <h1 className="text-xl md:text-2xl font-bold leading-tight mb-2 text-white">
            {displayName}
          </h1>

          {/* Show original name if translated */}
          {displayName !== originalName && (
            <p className="text-slate-400 text-sm italic mb-2">{originalName}</p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-white/20 text-white border-white/30">
              {language === 'bs-Cyrl' ? latinToCyrillic(category) : category}
            </Badge>
            <span className="text-white/70 text-sm">
              PDF • {sizeKB ? `${sizeKB} KB` : 'N/A'}
            </span>
            <Badge variant="outline" className="border-white/50 text-white text-xs">
              {language === 'bs-Cyrl' ? latinToCyrillic(municipalityName) : municipalityName}
            </Badge>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('ratings-clarity-accuracy-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setActiveTab('reviews');
                }
              }}
              className="inline-flex items-center gap-1.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-300/30 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors"
            >
              <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
              <span>
                {aggregateRatingInfo
                  ? `${aggregateRatingInfo.average.toFixed(1)} ★ (${aggregateRatingInfo.count} ocjena)`
                  : '5-Star Ocjena Jasnoće & Tačnosti'}
              </span>
            </button>
            {dataSource === 'supabase' && (
              <Badge className="bg-white/10 text-white/80 border-white/20 text-xs">
                <Database className="h-3 w-3 mr-1" />
                DB
              </Badge>
            )}
            {isCached && (
              <Badge className="bg-green-500/20 text-green-100 border-green-300/30 text-xs">
                <WifiOff className="h-3 w-3 mr-1" />
                {language === 'en' ? 'Offline' : 'Offline'}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10 no-print">
        <div className="container px-4 py-3 flex flex-wrap gap-2 items-center">
          <Button
            size="sm"
            className="bg-[#003D7A] hover:bg-[#002A5A]"
            onClick={handleDownload}
            disabled={!hasAccess}
          >
            <Download className="h-4 w-4 mr-1" />
            {language === 'en' ? 'Download' : language === 'de' ? 'Herunterladen' : language === 'tr' ? 'İndir' : 'Preuzmi'}
          </Button>

          {/* Direct Print Button — prints specific form content using existing print CSS */}
          <Button
            size="sm"
            onClick={handleDirectPrint}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm gap-1.5"
            title="Isprintaj samo obrazac u A4 formatu"
          >
            <Printer className="h-4 w-4" />
            <span>{language === 'en' ? 'Print' : 'Printaj'}</span>
          </Button>

          {/* Download as PDF locally using jspdf & html2canvas */}
          <Button
            size="sm"
            onClick={handleDownloadPdfLocally}
            disabled={isDownloadingPdf}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm gap-1.5"
            title="Generiši i snimi PDF obrasca lokalno"
          >
            {isDownloadingPdf ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileDown className="h-4 w-4" />
            )}
            <span>{language === 'en' ? 'Download as PDF' : 'Preuzmi kao PDF'}</span>
          </Button>

          {/* Quick Preview Toggle — overlays interactive PDF viewer */}
          <Button
            size="sm"
            onClick={() => setShowQuickPreview(true)}
            className="bg-sky-600 hover:bg-sky-700 text-white font-medium shadow-sm gap-1.5"
            title="Brzi interaktivni pregled dokumenta bez preuzimanja"
          >
            <Eye className="h-4 w-4" />
            <span>Quick Preview</span>
          </Button>

          {/* Print Preview Modal Trigger */}
          <Button
            size="sm"
            variant="outline"
            className="border-blue-600 text-blue-700 hover:bg-blue-50 font-medium gap-1.5"
            onClick={() => setShowPrintPreview(true)}
          >
            <Eye className="h-4 w-4 text-blue-600" />
            <span>Print Preview</span>
          </Button>

          {/* Print-Friendly Mode Trigger */}
          <Button
            size="sm"
            variant="outline"
            className="border-slate-300 text-slate-800 hover:bg-slate-100 font-medium gap-1.5"
            onClick={handlePrint}
          >
            <FileText className="h-4 w-4 text-[#003D7A]" />
            <span>Print-Friendly ispis</span>
          </Button>

          {/* Reviews shortcut */}
          <Button
            size="sm"
            variant="outline"
            className="border-amber-300 text-amber-800 bg-amber-50/50 hover:bg-amber-100"
            onClick={() => setActiveTab('reviews')}
          >
            <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-500" />
            {language === 'en' ? 'Reviews' : 'Ocjene & Tačnost'}
          </Button>

          {/* Copy Link Button — allows users to quickly share a direct URL to the document */}
          <Button
            size="sm"
            variant="outline"
            className={`font-medium gap-1.5 transition-all ${
              linkCopied
                ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                : 'border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-[#003D7A]'
            }`}
            onClick={handleCopyDocumentLink}
            title="Kopiraj direktni URL ovog dokumenta za brzo dijeljenje"
          >
            {linkCopied ? (
              <>
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>{language === 'en' ? 'Link Copied!' : language === 'de' ? 'Link kopiert!' : language === 'tr' ? 'Bağlantı Kopyalandı!' : 'Link kopiran!'}</span>
              </>
            ) : (
              <>
                <Link2 className="h-4 w-4 text-indigo-600" />
                <span>{language === 'en' ? 'Copy Link' : language === 'de' ? 'Link kopieren' : language === 'tr' ? 'Bağlantıyı Kopyala' : 'Kopiraj link'}</span>
              </>
            )}
          </Button>

          {/* Share button — uses navigator.share() with file_url */}
          <Button
            size="sm"
            variant="outline"
            className="border-green-600 text-green-700 hover:bg-green-50"
            onClick={handleShare}
          >
            {copied ? (
              <>
                <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                {language === 'en' ? 'Copied!' : language === 'de' ? 'Kopiert!' : language === 'tr' ? 'Kopyalandı!' : 'Kopirano!'}
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 mr-1" />
                {language === 'en' ? 'Share' : language === 'de' ? 'Teilen' : language === 'tr' ? 'Paylaş' : 'Podijeli'}
              </>
            )}
          </Button>

          {/* Save for offline */}
          {hasAccess && !isCached && (
            <Button
              size="sm"
              variant="outline"
              className="border-blue-400 text-blue-600 hover:bg-blue-50"
              onClick={handleCacheForOffline}
              disabled={caching}
            >
              <CloudDownload className="h-4 w-4 mr-1" />
              {caching
                ? (language === 'en' ? 'Saving...' : 'Čuvanje...')
                : (language === 'en' ? 'Save offline' : 'Sačuvaj offline')}
            </Button>
          )}

          {isCached && (
            <Badge variant="outline" className="border-green-400 text-green-700 h-8 flex items-center">
              <WifiOff className="h-3 w-3 mr-1" />
              {language === 'en' ? 'Available offline' : 'Dostupno offline'}
            </Badge>
          )}

          {/* AI Form Filler Assistant */}
          {hasAccess && (
            <FormFillerAssistant
              formName={originalName}
              category={category}
              description={description}
            />
          )}

          {hasAccess && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => safeOpenExternal(fileUrl)}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              {language === 'en' ? 'Open original' : language === 'de' ? 'Original öffnen' : language === 'tr' ? 'Orijinali aç' : 'Otvori original'}
            </Button>
          )}

          {!hasAccess && (
            <Button
              size="sm"
              variant="default"
              className="bg-[#FFCD00] text-[#003D7A] hover:bg-[#e6b800] ml-auto"
              onClick={() => navigate('/subscription')}
            >
              {language === 'en' ? 'Subscribe to access' : language === 'de' ? 'Abonnieren für Zugang' : language === 'tr' ? 'Erişim için abone ol' : 'Pretplatite se za pristup'}
            </Button>
          )}
        </div>
      </div>

      {/* Main interactive content with Tabs - hidden on physical print */}
      <div className="flex-1 container px-4 py-6 no-print">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-xl grid-cols-4 mb-6">
            <TabsTrigger value="preview" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'Preview' : language === 'de' ? 'Vorschau' : language === 'tr' ? 'Önizleme' : 'Pregled'}</span>
              <span className="sm:hidden">Pregled</span>
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'Details' : language === 'de' ? 'Details' : language === 'tr' ? 'Detaylar' : 'Detalji'}</span>
              <span className="sm:hidden">Detalji</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
              <span className="hidden sm:inline">{language === 'en' ? 'Reviews' : 'Ocjene'}</span>
              <span className="sm:hidden">Ocjene</span>
            </TabsTrigger>
            <TabsTrigger value="translations" className="flex items-center gap-1">
              <Languages className="h-4 w-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'Translate' : language === 'de' ? 'Übersetzen' : language === 'tr' ? 'Çevir' : 'Prevedi'}</span>
              <span className="sm:hidden">Prevedi</span>
              {translations.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs h-5 w-5 p-0 flex items-center justify-center">
                  {translations.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Preview Tab — PDF.js Interactive Viewer */}
          <TabsContent value="preview">
            {hasAccess ? (
              <DocumentPdfViewer
                fileUrl={fileUrl}
                displayName={displayName}
                municipality={municipalityName}
                category={category}
                onDownload={handleDownload}
              />
            ) : (
              <Card className="text-center py-16">
                <CardContent>
                  <FileText className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {language === 'en' ? 'Preview requires subscription' : language === 'de' ? 'Vorschau erfordert Abonnement' : language === 'tr' ? 'Önizleme abonelik gerektirir' : 'Pregled zahtijeva pretplatu'}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {language === 'en'
                      ? 'Subscribe to view, download, and print this form.'
                      : language === 'de'
                        ? 'Abonnieren Sie, um dieses Formular anzuzeigen, herunterzuladen und zu drucken.'
                        : language === 'tr'
                          ? 'Bu formu görüntülemek, indirmek ve yazdırmak için abone olun.'
                          : 'Pretplatite se da biste pregledali, preuzeli i ispisali ovaj obrazac.'}
                  </p>
                  <Button
                    className="bg-[#003D7A] hover:bg-[#002A5A]"
                    onClick={() => navigate('/subscription')}
                  >
                    {language === 'en' ? 'View plans' : language === 'de' ? 'Pläne anzeigen' : language === 'tr' ? 'Planları görüntüle' : 'Pogledaj planove'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details">
            {/* Description (opis_original) */}
            {description && (
              <Card className="mb-4">
                <CardContent className="py-4">
                  <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                    <Pencil className="h-3 w-3" />
                    {language === 'en' ? 'Description' : language === 'de' ? 'Beschreibung' : language === 'tr' ? 'Açıklama' : 'Opis'}
                  </p>
                  <p className="text-gray-700">{description}</p>
                </CardContent>
              </Card>
            )}

            {/* Form metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card>
                <CardContent className="py-4">
                  <p className="text-sm text-gray-500 mb-1">
                    {language === 'en' ? 'Category' : language === 'de' ? 'Kategorie' : language === 'tr' ? 'Kategori' : 'Kategorija'}
                  </p>
                  <p className="font-medium text-gray-800">
                    {language === 'bs-Cyrl' ? latinToCyrillic(category) : category}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="py-4">
                  <p className="text-sm text-gray-500 mb-1">
                    {language === 'en' ? 'Municipality' : language === 'de' ? 'Gemeinde' : language === 'tr' ? 'Belediye' : 'Općina'}
                  </p>
                  <p className="font-medium text-gray-800">
                    {language === 'bs-Cyrl' ? latinToCyrillic(municipalityName) : municipalityName} {cantonShort && `(${cantonShort})`}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="py-4">
                  <p className="text-sm text-gray-500 mb-1">
                    {language === 'en' ? 'File size' : language === 'de' ? 'Dateigröße' : language === 'tr' ? 'Dosya boyutu' : 'Veličina'}
                  </p>
                  <p className="font-medium text-gray-800">
                    {sizeKB ? `${sizeKB} KB` : 'N/A'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Direct file URL */}
            <Card className="mb-4">
              <CardContent className="py-4">
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {language === 'en' ? 'Direct file link' : language === 'de' ? 'Direkter Dateilink' : language === 'tr' ? 'Doğrudan dosya bağlantısı' : 'Direktni link na fajl'}
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm text-gray-700 truncate">
                    {fileUrl}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyLink(fileUrl)}
                  >
                    {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Share link for app */}
            <Card className="mb-6">
              <CardContent className="py-4">
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                  <Share2 className="h-3 w-3" />
                  {language === 'en' ? 'Share this page' : language === 'de' ? 'Diese Seite teilen' : language === 'tr' ? 'Bu sayfayı paylaş' : 'Podijeli ovu stranicu'}
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm text-gray-700 truncate">
                    {`${window.location.origin}/form/${formId}`}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 shrink-0"
                    onClick={handleCopyDocumentLink}
                    title="Kopiraj direktni link do ovog obrasca"
                  >
                    {linkCopied ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-xs text-emerald-700 font-medium">Kopirano!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="h-4 w-4 text-[#003D7A]" />
                        <span className="text-xs font-medium">Kopiraj link</span>
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Embedded Star Ratings & Reviews inside Details */}
            <DocumentRatingSystem
              formId={formId || ''}
              formName={originalName}
              municipalityName={municipalityName}
            />
          </TabsContent>

          {/* Reviews & Ratings Tab */}
          <TabsContent value="reviews">
            <DocumentRatingSystem
              formId={formId || ''}
              formName={originalName}
              municipalityName={municipalityName}
            />
          </TabsContent>

          {/* Translations Tab */}
          <TabsContent value="translations">
            <Card>
              <CardContent className="py-6">
                <h3 className="text-lg font-semibold text-[#003D7A] mb-4 flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  {language === 'en' ? 'Available Translations' : language === 'de' ? 'Verfügbare Übersetzungen' : language === 'tr' ? 'Mevcut Çeviriler' : 'Dostupni prevodi'}
                </h3>

                {/* Original (BHS Latin) */}
                <div className="border rounded-lg p-4 mb-3 bg-blue-50 border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-[#003D7A] text-white">BHS Latin</Badge>
                    <span className="text-xs text-gray-500">(Original)</span>
                  </div>
                  <p className="font-medium text-gray-800">{originalName}</p>
                  {supabaseDoc?.opis_original && (
                    <p className="text-sm text-gray-600 mt-1">{supabaseDoc.opis_original}</p>
                  )}
                </div>

                {/* Cyrillic auto-conversion */}
                <div className="border rounded-lg p-4 mb-3 bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-purple-300 text-purple-700">BHS Ћирилица</Badge>
                    <span className="text-xs text-gray-500">(Auto-konverzija)</span>
                  </div>
                  <p className="font-medium text-gray-800">{latinToCyrillic(originalName)}</p>
                  {supabaseDoc?.opis_original && (
                    <p className="text-sm text-gray-600 mt-1">{latinToCyrillic(supabaseDoc.opis_original)}</p>
                  )}
                </div>

                {/* Stored translations */}
                {translations.length > 0 ? (
                  <div className="space-y-3">
                    {translations.map((t) => (
                      <div key={t.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">
                            {languageLabels[t.jezik] || t.jezik.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="font-medium text-gray-800">{t.naziv_preveden}</p>
                        {t.opis_preveden && (
                          <p className="text-sm text-gray-600 mt-1">{t.opis_preveden}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Languages className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">
                      {language === 'en'
                        ? 'No additional translations available yet. The Cyrillic version is auto-generated from the Latin original.'
                        : language === 'de'
                          ? 'Noch keine zusätzlichen Übersetzungen verfügbar. Die kyrillische Version wird automatisch aus dem lateinischen Original generiert.'
                          : language === 'tr'
                            ? 'Henüz ek çeviri mevcut değil. Kiril versiyonu Latin orijinalinden otomatik olarak oluşturulur.'
                            : 'Još nema dodatnih prevoda. Ćirilična verzija se automatski generira iz latiničnog originala.'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 5-Star Clarity & Accuracy Rating System with Aggregate Score */}
        <div id="ratings-clarity-accuracy-section" className="mt-8">
          <DocumentClarityAccuracyRating
            formId={formId || ''}
            formName={originalName}
            category={category}
            municipalityName={municipalityName}
            onRatingUpdated={(stats) => {
              setAggregateRatingInfo({
                average: stats.averageRating,
                count: stats.totalRatings,
              });
            }}
          />
        </div>

        {/* Sources & References Section — links to external official government websites & repositories */}
        <div className="mt-8">
          <DocumentSourcesReferences
            formId={formId || ''}
            formName={originalName}
            category={category}
            municipalityName={municipalityName}
            municipalitySlug={municipality?.slug}
            cantonShort={cantonShort}
            fileUrl={fileUrl}
            officialPortalUrl={municipality?.website || municipality?.officialUrl}
            formsRepositoryUrl={municipality?.officialUrl}
            issuingDepartment={
              formId?.startsWith('livno')
                ? 'Služba za graditeljstvo, prostorno uređenje i stambeno-komunalne poslove Grada Livna'
                : undefined
            }
          />
        </div>

        {/* Recommended Documents Section — Suggests 3-4 other forms based on category / municipality */}
        <div className="mt-8">
          <RecommendedDocuments
            currentFormId={formId || ''}
            category={category}
            municipalitySlug={municipality?.slug}
            municipalityName={municipalityName}
            onOpenPrintPreview={(recForm, recMun) => {
              setRecommendedPreviewForm({ form: recForm, municipality: recMun });
            }}
          />
        </div>

        {/* Report broken link section */}
        <div className="mt-8 flex justify-center">
          <ReportBrokenLink
            municipalityName={municipality?.name || supabaseDoc?.institucije?.naziv || ''}
            municipalitySlug={municipality?.slug}
            formName={originalName}
            formId={formId}
            brokenUrl={fileUrl}
          />
        </div>
      </div>

      {/* Official Form Content - Exclusively rendered when printing or saving as PDF */}
      <section
        id="document-printable-content"
        aria-label="Službeni obrazac za štampu"
        className="hidden print:block print:w-full print:m-0 print:p-8 bg-white text-black font-sans"
      >
        <div className="border-b-2 border-black pb-4 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-700">
                BOSNA I HERCEGOVINA • SLUŽBENI REGISTAR OBRAZACA
              </p>
              <h2 className="text-xl font-black uppercase text-black mt-1">
                {municipalityName ? municipalityName.toUpperCase() : 'NADLEŽNI ORGAN UPRAVE'}
                {cantonShort ? ` (${cantonShort})` : ''}
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Verifikovani administrativni obrazac za predaju na protokolu
              </p>
            </div>
            <div className="text-right text-xs">
              <span className="inline-block px-2.5 py-1 border border-black font-mono font-bold text-black">
                PF-{(formId || 'DOC').slice(0, 8).toUpperCase()}-2026
              </span>
              <p className="mt-1 text-slate-600">Datum: {new Date().toLocaleDateString('bs-BA')}</p>
            </div>
          </div>
        </div>

        <div className="text-center my-6">
          <h1 className="text-2xl font-bold uppercase tracking-wide text-black mb-2">
            {displayName}
          </h1>
          <p className="text-xs italic text-slate-700">
            Kategorija: {category} {sizeKB ? `• Veličina: ${sizeKB} KB` : ''}
          </p>
        </div>

        {description && (
          <div className="mb-6 p-4 border border-slate-400 bg-slate-50 rounded">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
              Opis i svrha postupka:
            </h3>
            <p className="text-xs text-slate-800 leading-relaxed">{description}</p>
          </div>
        )}

        <div className="mb-6 p-4 border border-slate-400 rounded">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
            1. Podaci o podnosiocu zahtjeva:
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="border-b border-slate-400 pb-1">
              <span className="text-[10px] text-slate-500 block">Ime i prezime:</span>
              <div className="h-5"></div>
            </div>
            <div className="border-b border-slate-400 pb-1">
              <span className="text-[10px] text-slate-500 block">JMBG:</span>
              <div className="h-5"></div>
            </div>
            <div className="border-b border-slate-400 pb-1">
              <span className="text-[10px] text-slate-500 block">Broj lične karte i organ izdavanja:</span>
              <div className="h-5"></div>
            </div>
            <div className="border-b border-slate-400 pb-1">
              <span className="text-[10px] text-slate-500 block">Adresa prebivališta (Općina/Grad/Ulica):</span>
              <div className="h-5"></div>
            </div>
            <div className="border-b border-slate-400 pb-1">
              <span className="text-[10px] text-slate-500 block">Kontakt telefon / E-mail:</span>
              <div className="h-5"></div>
            </div>
            <div className="border-b border-slate-400 pb-1">
              <span className="text-[10px] text-slate-500 block">Broj protokola (popunjava službenik):</span>
              <div className="h-5"></div>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 border border-slate-400 rounded bg-slate-50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
            2. Kontrolna lista potrebne dokumentacije:
          </h3>
          <ul className="text-xs text-slate-700 space-y-1.5">
            <li>[ ] Uredno popunjen i potpisan ovaj zahtjev</li>
            <li>[ ] Važeća lična karta / identifikacioni dokument na uvid</li>
            <li>[ ] Uplatnica administrativne takse (prema važećem cjenovniku)</li>
            <li>[ ] Prateća uvjerenja i dokazi predviđeni specifičnim procedurama</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-6 mt-6 border-t border-slate-400 text-xs">
          <div>
            <p className="font-semibold mb-6">Prijemni štambilj / Protokol:</p>
            <div className="border-2 border-dashed border-slate-400 h-20 flex items-center justify-center text-slate-400">
              M.P.
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold mb-6">Potpis podnosioca zahtjeva:</p>
            <div className="border-b-2 border-slate-700 w-48 ml-auto h-12"></div>
            <p className="text-[10px] text-slate-500 mt-1">Vlastoručni potpis</p>
          </div>
        </div>

        <footer className="mt-10 pt-4 border-t border-slate-300 text-[10px] text-slate-500 flex justify-between">
          <span>BH PapirFinder • www.papir-finder.com</span>
          <span>Službeni administrativni dokument BiH • Važeći format</span>
        </footer>
      </section>

      {/* Quick Preview Interactive PDF Viewer Overlay */}
      <QuickPreviewOverlay
        isOpen={showQuickPreview}
        onClose={() => setShowQuickPreview(false)}
        formId={formId || ''}
        displayName={displayName}
        originalName={originalName}
        category={category}
        municipalityName={municipalityName}
        cantonShort={cantonShort}
        sizeKB={sizeKB}
        fileUrl={fileUrl}
        onDirectPrint={handleDirectPrint}
      />

      {/* Print Preview Modal */}
      <PrintPreviewModal
        open={showPrintPreview}
        onOpenChange={setShowPrintPreview}
        formId={formId || ''}
        displayName={displayName}
        originalName={originalName}
        category={category}
        municipalityName={municipalityName}
        cantonShort={cantonShort}
        sizeKB={sizeKB}
        description={description}
        fileUrl={fileUrl}
      />

      {/* Print Preview Modal for Recommended Form */}
      {recommendedPreviewForm && (
        <PrintPreviewModal
          open={!!recommendedPreviewForm}
          onOpenChange={(open) => {
            if (!open) setRecommendedPreviewForm(null);
          }}
          formId={recommendedPreviewForm.form.id}
          displayName={recommendedPreviewForm.form.name}
          originalName={recommendedPreviewForm.form.name}
          category={recommendedPreviewForm.form.category}
          municipalityName={recommendedPreviewForm.municipality.name}
          cantonShort={recommendedPreviewForm.municipality.cantonShort}
          sizeKB={recommendedPreviewForm.form.sizeKB}
          fileUrl={recommendedPreviewForm.form.pdfUrl}
        />
      )}

      <Footer />
    </div>
  );
};

export default FormDetail;