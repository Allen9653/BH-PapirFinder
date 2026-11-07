import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Download,
  Printer,
  Share2,
  ExternalLink,
  FileText,
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
import PrintFriendlyFormView from '@/components/PrintFriendlyFormView';
import UniversalBackButton from '@/components/UniversalBackButton';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import DocumentPdfViewer from '@/components/DocumentPdfViewer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

export default function FormDetail() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { formId } = useParams<{ formId: string }>();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'preview';
  const [isPrintMode, setIsPrintMode] = useState(searchParams.get('mode') === 'print');
  const [showQuickPreview, setShowQuickPreview] = useState(false);
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
      // 1. Statički registar
      const staticResult = getFormById(formId);
      if (staticResult) {
        setForm(staticResult.form);
        setMunicipality(staticResult.municipality);
        setDataSource('static');
      }

      // 2. Supabase
      try {
        const doc = await getDokumentById(formId);
        if (doc) {
          setSupabaseDoc(doc);
          setDataSource('supabase');
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

  // Naziv sa uzimanjem u obzir title, name i naziv_original
  const displayName = (() => {
    if (dataSource === 'supabase' && supabaseDoc) {
      if (language === 'bs-Cyrl') {
        const prevod = translations.find((t) => t.jezik === 'bs_cyr');
        if (prevod) return prevod.naziv_preveden;
        return latinToCyrillic(supabaseDoc.naziv_original || '');
      }
      if (language !== 'bs') {
        const prevod = translations.find((t) => t.jezik === language);
        if (prevod) return prevod.naziv_preveden;
      }
      return supabaseDoc.naziv_original || '';
    }
    const rawName = form?.title || form?.name || '';
    if (language === 'bs-Cyrl' && rawName) {
      return latinToCyrillic(rawName);
    }
    return rawName;
  })();

  const originalName = (() => {
    if (dataSource === 'supabase' && supabaseDoc) return supabaseDoc.naziv_original || '';
    return form?.title || form?.name || '';
  })();

  const fileUrl = (() => {
    if (dataSource === 'supabase' && supabaseDoc) return supabaseDoc.file_url || '';
    return form?.pdfUrl || form?.url || '';
  })();

  const category = (() => {
    if (dataSource === 'supabase' && supabaseDoc) return supabaseDoc.kategorija || 'Ostalo';
    return form?.category || 'Dokument';
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
      return supabaseDoc.opis_original || '';
    }
    return form?.description || null;
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
        toast.success('Obrazac je preuzet kao PDF!');
      } else {
        toast.error('Greška pri generisanju PDF-a.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Došlo je do greške.');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleShare = async () => {
    if (!fileUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: displayName,
          text: `${displayName} — BH PapirFinder`,
          url: fileUrl,
        });
        return;
      } catch {}
    }
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
    navigator.clipboard.writeText(documentUrl).then(() => {
      setLinkCopied(true);
      toast.success('Direktni link je kopiran!');
      setTimeout(() => setLinkCopied(false), 2500);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3 animate-pulse" />
          <p className="text-muted-foreground">Učitavanje obrasca...</p>
        </div>
      </div>
    );
  }

  if (!form && !supabaseDoc) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Obrazac nije pronađen</h1>
          <p className="text-muted-foreground mb-6">Traženi dokument ili obrazac ne postoji u bazi.</p>
          <Button onClick={() => navigate('/')}>Nazad na početnu</Button>
        </main>
        <Footer />
      </div>
    );
  }

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ReadingProgressBar />
      <Header />

      <div className="border-b bg-card py-6">
        <div className="container max-w-5xl px-4 mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <UniversalBackButton variant="command" />
              <Breadcrumbs />
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleCopyDocumentLink}>
                {linkCopied ? <CheckCircle className="w-4 h-4 text-emerald-600 mr-1" /> : <Link2 className="w-4 h-4 mr-1" />}
                {linkCopied ? 'Kopirano!' : 'Kopiraj link'}
              </Button>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-2">{displayName}</h1>
          {displayName !== originalName && <p className="text-muted-foreground text-sm italic mb-2">{originalName}</p>}

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">{category}</Badge>
            <span className="text-muted-foreground text-sm">PDF • {sizeKB ? `${sizeKB} KB` : 'N/A'}</span>
            <Badge variant="outline">{municipalityName}</Badge>
            {dataSource === 'supabase' && (
              <Badge variant="outline" className="text-xs">
                <Database className="h-3 w-3 mr-1" /> Supabase
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Akcijska traka */}
      <div className="bg-card border-b sticky top-0 z-10 py-3">
        <div className="container max-w-5xl px-4 mx-auto flex flex-wrap gap-2 items-center">
          <Button size="sm" onClick={handleDownload} disabled={!hasAccess}>
            <Download className="h-4 w-4 mr-1" /> Preuzmi
          </Button>

          <Button size="sm" variant="outline" onClick={handleDirectPrint}>
            <Printer className="h-4 w-4 mr-1" /> Printaj
          </Button>

          <Button size="sm" variant="outline" onClick={handleDownloadPdfLocally} disabled={isDownloadingPdf}>
            {isDownloadingPdf ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <FileDown className="h-4 w-4 mr-1" />}
            Preuzmi PDF
          </Button>

          <Button size="sm" variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" /> {copied ? 'Kopirano!' : 'Podijeli'}
          </Button>
        </div>
      </div>

      <main className="flex-1 container max-w-5xl px-4 py-6 mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="preview">Pregled</TabsTrigger>
            <TabsTrigger value="details">Detalji</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <DocumentPdfViewer
              fileUrl={fileUrl}
              displayName={displayName}
              municipality={municipalityName}
              category={category}
              onDownload={handleDownload}
            />
          </TabsContent>

          <TabsContent value="details">
            {description && (
              <Card className="mb-4">
                <CardContent className="py-4">
                  <p className="text-sm font-semibold mb-1">Opis</p>
                  <p className="text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
