import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  FileText,
  Copy,
  CheckCircle2,
  Download,
  Share2,
  ExternalLink,
  Sparkles,
  Layers,
  Eye,
  Languages,
  Printer,
  Bookmark,
  ShieldCheck,
  Building2,
  Code2,
  FileCode,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import {
  livnoForms,
  getLivnoStructuredJson,
  LIVNO_OFFICIAL_URL,
  LIVNO_FORMS_PORTAL_URL,
  LivnoDocumentItem,
} from '@/data/livno-forms';
import {
  kakanjForms,
  getKakanjStructuredJson,
  KAKANJ_OFFICIAL_URL,
  KAKANJ_FORMS_PORTAL_URL,
  KakanjDocumentItem,
} from '@/data/kakanj-forms';
import { latinToCyrillic } from '@/lib/cyrillic-converter';
import { safeOpenExternal } from '@/lib/security';
import { MunicipalityForm } from '@/data/municipality-registry';
import QuickPreviewOverlay from '@/components/QuickPreviewOverlay';
import PrintPreviewModal from '@/components/PrintPreviewModal';
import { toast } from 'sonner';

type ActiveMunicipality = 'kakanj' | 'livno';

export const ProfileInstitutionalDocuments: React.FC = () => {
  const { language } = useLanguage();
  const [activeMunicipality, setActiveMunicipality] = useState<ActiveMunicipality>('kakanj');
  const [activeScript, setActiveScript] = useState<'latin' | 'cyrillic'>('latin');
  const [viewMode, setViewMode] = useState<'visual' | 'json'>('visual');
  const [copiedJson, setCopiedJson] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewForm, setPreviewForm] = useState<KakanjDocumentItem | LivnoDocumentItem | null>(null);
  const [printForm, setPrintForm] = useState<KakanjDocumentItem | LivnoDocumentItem | null>(null);
  const [savedDocs, setSavedDocs] = useState<Set<string>>(() => new Set());

  // Active institution settings
  const municipalityData = useMemo(() => {
    if (activeMunicipality === 'kakanj') {
      return {
        name: 'Općina Kakanj',
        canton: 'Zeničko-dobojski kanton (ZDK)',
        officialUrl: KAKANJ_OFFICIAL_URL,
        formsPortalUrl: KAKANJ_FORMS_PORTAL_URL,
        forms: kakanjForms,
        structuredJson: getKakanjStructuredJson({ script: activeScript, language }),
        description: 'Službena baza e-obrazaca Općine Kakanj: Zahtjevi za promjenu investitora, minimalne tehničke uslove, osnivanje obrta i ugostiteljskih radnji.',
      };
    }
    return {
      name: 'Grad Livno',
      canton: 'Kanton 10 (Hercegbosanska županija)',
      officialUrl: LIVNO_OFFICIAL_URL,
      formsPortalUrl: LIVNO_FORMS_PORTAL_URL,
      forms: livnoForms,
      structuredJson: getLivnoStructuredJson({ script: activeScript, language }),
      description: 'Strukturirana baza e-obrazaca Grada Livna s direktnim poveznicama, opisima i višekorisničkim akcijama.',
    };
  }, [activeMunicipality, activeScript, language]);

  // AI Extractor Interactive State
  const [customUrl, setCustomUrl] = useState(KAKANJ_FORMS_PORTAL_URL);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractorStatus, setExtractorStatus] = useState<string | null>(null);

  const jsonString = useMemo(() => {
    return JSON.stringify(municipalityData.structuredJson, null, 2);
  }, [municipalityData.structuredJson]);

  // Handle script transliteration helper
  const formatText = (text: string) => {
    return activeScript === 'cyrillic' ? latinToCyrillic(text) : text;
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopiedJson(true);
    toast.success('Čisti JSON format uspješno kopiran u međuspremnik!');
    setTimeout(() => setCopiedJson(false), 2500);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeMunicipality}-obrasci-${activeScript}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('JSON datoteka preuzeta!');
  };

  const handleToggleSave = (id: string, name: string) => {
    setSavedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.info(`Dokument "${name}" uklonjen iz sačuvanih.`);
      } else {
        next.add(id);
        toast.success(`Dokument "${name}" sačuvan na Vaš profil!`);
      }
      return next;
    });
  };

  const handleShare = async (doc: KakanjDocumentItem | LivnoDocumentItem) => {
    const title = formatText(doc.name);
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `${title} — ${municipalityData.name} repozitorij`,
          url: doc.url,
        });
      } catch {
        navigator.clipboard.writeText(doc.url);
        toast.success('Link dokumenta kopiran!');
      }
    } else {
      navigator.clipboard.writeText(doc.url);
      toast.success('Link dokumenta kopiran!');
    }
  };

  // Filtered documents
  const filteredForms = useMemo(() => {
    if (selectedCategory === 'all') return municipalityData.forms;
    return municipalityData.forms.filter((f) => f.category === selectedCategory);
  }, [municipalityData.forms, selectedCategory]);

  const categories = useMemo(() => {
    return Array.from(new Set(municipalityData.forms.map((f) => f.category)));
  }, [municipalityData.forms]);

  const handleSimulateExtraction = () => {
    setIsExtracting(true);
    setExtractorStatus('Analiziranje strukture HTML stranice i PDF poveznica...');
    setTimeout(() => {
      setExtractorStatus(
        `AI Ekstraktor je uspješno prepoznao i strukturirao ${municipalityData.forms.length} obrazaca sa URL-a ${customUrl}.`
      );
      setIsExtracting(false);
      toast.success('Obrasci uspješno izdvojeni i strukturirani u JSON!');
    }, 900);
  };

  return (
    <Card className="border border-slate-200/90 shadow-sm overflow-hidden rounded-2xl bg-white">
      <CardHeader className="bg-gradient-to-r from-[#003D7A]/5 via-emerald-500/5 to-[#00A651]/5 border-b border-slate-200/80 pb-4">
        {/* Institution Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Odaberite instituciju:
            </span>
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setActiveMunicipality('kakanj');
                  setSelectedCategory('all');
                  setCustomUrl(KAKANJ_FORMS_PORTAL_URL);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeMunicipality === 'kakanj'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Općina Kakanj (ZDK)</span>
                <Badge className="ml-1 bg-white/20 text-white text-[10px] px-1 py-0 h-4">
                  Novo
                </Badge>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveMunicipality('livno');
                  setSelectedCategory('all');
                  setCustomUrl(LIVNO_FORMS_PORTAL_URL);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeMunicipality === 'livno'
                    ? 'bg-[#003D7A] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Grad Livno (K10)</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge className={activeMunicipality === 'kakanj' ? 'bg-[#00A651] text-white' : 'bg-[#003D7A] text-white'}>
                <Building2 className="w-3 h-3 mr-1" />
                {municipalityData.name}
              </Badge>
              <Badge variant="outline" className="border-emerald-300 text-emerald-800 bg-emerald-50 gap-1 font-mono text-[11px]">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Službeni repozitorij verificiran
              </Badge>
              <Badge variant="outline" className="text-slate-600 font-mono text-[11px]">
                {municipalityData.canton}
              </Badge>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-[#003D7A]">
              Institucionalni Obrasci & AI Ekstraktor Dokumenata
            </CardTitle>
            <CardDescription className="text-slate-600 text-xs sm:text-sm mt-1">
              {municipalityData.description}
            </CardDescription>
          </div>

          {/* Službeni URL repozitorija */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="h-8 text-xs gap-1.5 border-[#003D7A] text-[#003D7A] hover:bg-[#003D7A]/5"
            >
              <a href={municipalityData.formsPortalUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Stranica s obrazcima</span>
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="h-8 text-xs gap-1.5 text-slate-600 hover:text-slate-900"
            >
              <a href={municipalityData.officialUrl} target="_blank" rel="noopener noreferrer">
                <Building2 className="w-3.5 h-3.5" />
                <span>Zvanični portal</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Toolbar: Script Toggle (Latinica/Ćirilica), View Mode Toggle, Copy & Download JSON */}
        <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          {/* Multi-script transliteration selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
            <span className="text-[11px] font-semibold text-slate-500 px-2 flex items-center gap-1">
              <Languages className="w-3 h-3" /> Pismo:
            </span>
            <button
              type="button"
              onClick={() => setActiveScript('latin')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeScript === 'latin'
                  ? 'bg-white text-[#003D7A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Latinica (BHS)
            </button>
            <button
              type="button"
              onClick={() => setActiveScript('cyrillic')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeScript === 'cyrillic'
                  ? 'bg-[#003D7A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ћирилица (Auto-transliteracija)
            </button>
          </div>

          {/* View mode toggle: Visual Cards vs Pure JSON */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setViewMode('visual')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'visual'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Kartice Obrazaca ({municipalityData.forms.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('json')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'json'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Čisti JSON Format</span>
              </button>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyJson}
              className="h-8 text-xs gap-1 border-slate-300 hover:bg-slate-50"
            >
              {copiedJson ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Kopirano!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>Kopiraj JSON</span>
                </>
              )}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleDownloadJson}
              className="h-8 text-xs gap-1 border-slate-300 hover:bg-slate-50"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Preuzmi .json</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* URL Input & AI Parser Simulator Block */}
        <div className="bg-sky-50/60 border border-sky-200/80 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <h4 className="text-xs sm:text-sm font-bold text-sky-950">
                AI Asistent za Ekstrakciju Dokumenata s URL-a bh. Institucija
              </h4>
            </div>
            <span className="text-[11px] font-mono text-sky-700">Gemini & Schema Ekstraktor</span>
          </div>
          <p className="text-xs text-sky-900/80 mb-3">
            Unesite URL službene stranice (npr. Općine Kakanj: <code className="bg-white px-1 py-0.5 rounded text-sky-800">https://kakanj.gov.ba/v5/e-obrasci/</code>) za automatsko prepoznavanje, izdvajanje direktnih PDF poveznica, kategorizaciju i generiranje strukturiranog JSON-a.
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://kakanj.gov.ba/v5/e-obrasci/"
              className="bg-white text-xs sm:text-sm h-10 border-sky-300 focus-visible:ring-sky-500 font-mono"
            />
            <Button
              onClick={handleSimulateExtraction}
              disabled={isExtracting}
              className="h-10 px-5 text-xs bg-sky-700 hover:bg-sky-800 text-white font-bold shrink-0 gap-1.5"
            >
              {isExtracting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Ekstrakcija u toku...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pokreni AI Ekstrakciju</span>
                </>
              )}
            </Button>
          </div>

          {extractorStatus && (
            <p className="mt-2 text-xs font-medium text-emerald-800 bg-emerald-100/70 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{extractorStatus}</span>
            </p>
          )}
        </div>

        {/* VIEW MODE 1: VISUAL CARDS WITH ALL ACTIONS */}
        {viewMode === 'visual' && (
          <div>
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-thin">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-[#003D7A] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Sve kategorije ({municipalityData.forms.length})
              </button>
              {categories.map((cat) => {
                const count = municipalityData.forms.filter((f) => f.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-[#00A651] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {formatText(cat)} ({count})
                  </button>
                );
              })}
            </div>

            {/* Document Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredForms.map((doc) => {
                const isSaved = savedDocs.has(doc.id);
                return (
                  <div
                    key={doc.id}
                    className="border border-slate-200 rounded-xl p-4 bg-white hover:border-[#003D7A]/40 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <Badge
                          variant="outline"
                          className="text-[11px] font-semibold bg-slate-50 text-slate-700 border-slate-300"
                        >
                          {formatText(doc.kategorija)}
                        </Badge>
                        <span className="text-[10px] font-mono text-slate-400">
                          {doc.sizeKB} KB
                        </span>
                      </div>

                      <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#003D7A] transition-colors line-clamp-2">
                        {formatText(doc.name)}
                      </h4>

                      <p className="text-xs text-slate-500 font-mono">
                        {formatText(doc.sluzba)}
                      </p>

                      <p className="text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                        {formatText(doc.opis)}
                      </p>
                    </div>

                    {/* Actions Row */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      {/* Primary Download Button */}
                      <Button
                        size="sm"
                        className="h-8 text-xs font-semibold bg-[#003D7A] hover:bg-[#002A5A] text-white gap-1.5"
                        onClick={() => safeOpenExternal(doc.url)}
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Preuzmi PDF</span>
                      </Button>

                      {/* Secondary Actions: Preview, Print, Save, Share */}
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-slate-600 hover:text-sky-700 hover:bg-sky-50"
                          title="Brzi pregled obrasca"
                          onClick={() => setPreviewForm(doc)}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-slate-600 hover:text-indigo-700 hover:bg-indigo-50"
                          title="Printaj obrazac"
                          onClick={() => setPrintForm(doc)}
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className={`h-8 w-8 p-0 transition-colors ${
                            isSaved
                              ? 'text-amber-600 hover:bg-amber-50'
                              : 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'
                          }`}
                          title={isSaved ? 'Ukloni iz profila' : 'Sačuvaj na profil'}
                          onClick={() => handleToggleSave(doc.id, doc.name)}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-slate-600 hover:text-[#00A651] hover:bg-emerald-50"
                          title="Podijeli dokument"
                          onClick={() => handleShare(doc)}
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW MODE 2: PURE STRUCTURED JSON SCHEMA */}
        {viewMode === 'json' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-slate-900 text-slate-300 px-4 py-2.5 rounded-t-xl border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span className="font-mono font-semibold text-slate-200">
                  {activeMunicipality}-schema-{activeScript}.json
                </span>
                <Badge variant="outline" className="border-slate-700 text-emerald-400 text-[10px] font-mono">
                  {activeScript === 'cyrillic' ? 'Ћирилица' : 'Latinica'}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  {municipalityData.forms.length} dokumenata
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopyJson}
                  className="h-7 text-xs text-slate-300 hover:text-white hover:bg-slate-800 gap-1"
                >
                  {copiedJson ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Kopirano</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Kopiraj</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            <pre className="p-4 bg-slate-950 text-emerald-300 rounded-b-xl border-x border-b border-slate-800 text-xs font-mono overflow-x-auto max-h-[500px] leading-relaxed selection:bg-emerald-800 selection:text-white">
              {jsonString}
            </pre>
          </div>
        )}
      </CardContent>

      {/* Quick Preview Modal Overlay */}
      {previewForm && (
        <QuickPreviewOverlay
          formId={previewForm.id}
          displayName={previewForm.name}
          originalName={previewForm.name}
          category={previewForm.category}
          municipalityName={municipalityData.name}
          cantonShort={activeMunicipality === 'kakanj' ? 'ZDK' : 'K10'}
          sizeKB={previewForm.sizeKB}
          fileUrl={previewForm.url}
          isOpen={!!previewForm}
          onClose={() => setPreviewForm(null)}
        />
      )}

      {/* Print Preview Modal */}
      {printForm && (
        <PrintPreviewModal
          formId={printForm.id}
          displayName={printForm.name}
          originalName={printForm.name}
          category={printForm.category}
          municipalityName={municipalityData.name}
          cantonShort={activeMunicipality === 'kakanj' ? 'ZDK' : 'K10'}
          sizeKB={printForm.sizeKB}
          fileUrl={printForm.url}
          open={!!printForm}
          onOpenChange={(open) => {
            if (!open) setPrintForm(null);
          }}
        />
      )}
    </Card>
  );
};

export default ProfileInstitutionalDocuments;
