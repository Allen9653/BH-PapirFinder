import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Bot,
  FileText,
  Upload,
  Copy,
  CheckCircle2,
  Download,
  Database,
  Calendar,
  Clock,
  Coins,
  ShieldCheck,
  Building2,
  FileCheck2,
  Loader2,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Eye,
  FileCode,
} from 'lucide-react';
import {
  extractDocumentMetadataWithGemini,
  ExtractedFormMetadata,
  fileToBase64,
} from '@/lib/gemini-metadata-extractor';
import { createDokument } from '@/lib/dokumenti-service';
import { Institucija } from '@/lib/institucije-service';
import { toast } from 'sonner';

interface AdminPdfMetadataExtractorProps {
  institucije: Institucija[];
  onDocumentSaved?: () => void;
  onBackToList?: () => void;
}

const SAMPLE_DOCUMENTS = [
  {
    title: 'Zahtjev za promjenu investitora (OK-O-4.2.-38)',
    municipality: 'Općina Kakanj',
    category: 'Urbanizam i građenje',
    url: 'http://kakanj.gov.ba/v4/wp-content/uploads/2017/03/ZAHTJEV-ZA-PROMJENU-INVESTITORA-OK-O-4.2.-38.pdf',
    notes: 'Služba za privredu, urbanizam i zaštitu okoline • Kakanj',
  },
  {
    title: 'Zahtjev za osnivanje obrta i srodne djelatnosti',
    municipality: 'Općina Kakanj',
    category: 'Privreda i obrt',
    url: 'https://kakanj.gov.ba/v5/wp-content/uploads/2023/08/Zahtjev-za-osnivanje-obrta-srodne-djelatnost-1.pdf',
    notes: 'Službena stranica e-obrazaca: https://kakanj.gov.ba/v5/e-obrasci/',
  },
  {
    title: 'Zahtjev za izdavanje građevne dozvole',
    municipality: 'Grad Livno',
    category: 'Graditeljstvo & Urbanizam',
    url: 'https://livno.ba/za-gradane/dokumenti-i-obrasci/',
    notes: 'Služba za graditeljstvo, prostorno uređenje i stambeno-komunalne poslove',
  },
  {
    title: 'Zahtjev za registraciju samostalne privredne djelatnosti - obrta',
    municipality: 'Grad Sarajevo - Stari Grad',
    category: 'Privreda i obrt',
    url: 'https://starigrad.ba/obrasci',
    notes: 'Služba za privredu i lokalni razvoj',
  },
  {
    title: 'Zahtjev za izdavanje uvjerenja o porodičnom stanju i kućnoj listi',
    municipality: 'Grad Banja Luka',
    category: 'Matični uredi i građanska stanja',
    url: 'https://banjaluka.rs.ba/odjeljenja/opsta-uprava',
    notes: 'Odjeljenje za opštu upravu i matične poslove',
  },
  {
    title: 'Zahtjev za jednokratnu novčanu pomoć i dječiji dodatak',
    municipality: 'Grad Mostar',
    category: 'Socijalna zaštita & Boračka pitanja',
    url: 'https://mostar.ba/dokumenti',
    notes: 'Odjel za društvene djelatnosti',
  },
];

export default function AdminPdfMetadataExtractor({
  institucije,
  onDocumentSaved,
  onBackToList,
}: AdminPdfMetadataExtractorProps) {
  const { language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [docName, setDocName] = useState('Zahtjev za izdavanje građevne dozvole');
  const [municipalityName, setMunicipalityName] = useState('Grad Livno');
  const [categoryName, setCategoryName] = useState('Graditeljstvo & Urbanizam');
  const [selectedInstId, setSelectedInstId] = useState<string>(institucije[0]?.id || '');

  // Extraction state
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState<string>('');
  const [result, setResult] = useState<ExtractedFormMetadata | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'fields' | 'schema'>('overview');
  const [isSavingToDb, setIsSavingToDb] = useState(false);

  // File selection handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        toast.error(
          language === 'en'
            ? 'Please upload a PDF file.'
            : 'Molimo učitajte PDF fajl (.pdf).'
        );
        return;
      }
      setSelectedFile(file);
      setDocName(file.name.replace(/\.pdf$/i, '').replace(/[-_]/g, ' '));
      try {
        const b64 = await fileToBase64(file);
        setFileBase64(b64);
        toast.success(`PDF "${file.name}" uspješno učitan (${Math.round(file.size / 1024)} KB).`);
      } catch (err) {
        console.error('Error reading file:', err);
        toast.error('Neuspjelo čitanje PDF datoteke.');
      }
    }
  };

  // Run AI Extraction
  const handleRunExtraction = async () => {
    setIsExtracting(true);
    setExtractionProgress(
      language === 'en'
        ? 'Reading document binary & initializing Gemini 3.8 Flash...'
        : 'Čitanje PDF strukture i inicijalizacija Gemini 3.8 Flash modela...'
    );

    try {
      const extracted = await extractDocumentMetadataWithGemini({
        file: selectedFile || undefined,
        base64Data: fileBase64 || undefined,
        documentName: docName,
        municipalityName: municipalityName,
        categoryName: categoryName,
      });

      setResult(extracted);
      toast.success(
        language === 'en'
          ? 'Metadata and form schema successfully extracted by Gemini!'
          : 'Metapodaci i JSON šema obrasca uspješno izvučeni putem Gemini AI!'
      );
    } catch (err) {
      console.error('Extraction error:', err);
      toast.error('Došlo je do greške pri ekstrakciji metapodataka.');
    } finally {
      setIsExtracting(false);
      setExtractionProgress('');
    }
  };

  // Copy JSON to clipboard
  const handleCopyJson = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopiedJson(true);
    toast.success('JSON šema kopirana u međuspremnik!');
    setTimeout(() => setCopiedJson(false), 2500);
  };

  // Download JSON file
  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-schema.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('JSON datoteka preuzeta.');
  };

  // Save directly to Supabase documents table
  const handleSaveToDatabase = async () => {
    if (!result) return;
    const instId = selectedInstId || institucije[0]?.id;
    if (!instId) {
      toast.error('Odaberite instituciju iz baze prije spremanja.');
      return;
    }

    setIsSavingToDb(true);
    try {
      const created = await createDokument({
        institucija_id: instId,
        naziv_original: result.title,
        opis_original: `${result.documentPurpose}\n\nRok važenja: ${result.expiryDateOrValidity}\nNadležna služba: ${result.responsibleAuthority}\nAdministrativna taksa: ${result.administrativeFeeKM} KM`,
        kategorija: result.category,
        file_url:
          selectedFile?.name
            ? `https://storage.papirfinder.ba/forms/${selectedFile.name}`
            : 'https://livno.ba/za-gradane/dokumenti-i-obrasci/',
        velicina_kb: selectedFile ? Math.round(selectedFile.size / 1024) : 120,
      });

      if (created) {
        toast.success(`Dokument "${result.title}" je uspješno spremljen u bazu dokumenata!`);
        if (onDocumentSaved) {
          onDocumentSaved();
        }
      } else {
        toast.info('Dokument pripremljen (Supabase konfiguracija u toku).');
      }
    } catch (err) {
      console.error('Error saving to DB:', err);
      toast.error('Greška pri spremanju u bazu.');
    } finally {
      setIsSavingToDb(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-xl shadow-md">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl text-[#003D7A] flex items-center gap-2">
                  <span>Gemini AI PDF Metadata & Schema Extractor</span>
                  <Badge className="bg-purple-600 text-white hover:bg-purple-700 text-xs font-mono">
                    gemini-3.8-flash
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm mt-0.5">
                  Automatska analiza PDF obrazaca bh. institucija: izvlačenje roka važenja, potrebnih priloga, svrhe dokumenta, taksi i kreiranje interaktivne JSON forme.
                </CardDescription>
              </div>
            </div>
            {onBackToList && (
              <Button variant="outline" size="sm" onClick={onBackToList} className="bg-white">
                Nazad na listu dokumenata
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Main Grid: Upload & Controls + Extracted Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input and Upload */}
        <div className="lg:col-span-5 space-y-5">
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <Upload className="h-4 w-4 text-purple-600" />
                <span>1. Učitavanje PDF obrasca ili odabir predloška</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Drag & Drop File Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-purple-300 hover:border-purple-500 bg-purple-50/40 hover:bg-purple-50 rounded-xl p-5 text-center cursor-pointer transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <FileText className="h-10 w-10 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-800">
                  {selectedFile ? selectedFile.name : 'Kliknite za odabir ili prevucite PDF obrazac'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedFile
                    ? `${(selectedFile.size / 1024).toFixed(1)} KB • PDF Dokument`
                    : 'Podržani formati: Službeni PDF formulari (.pdf)'}
                </p>
              </div>

              {/* Sample Templates */}
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-2">
                  Ili odaberite registrovani obrazac:
                </label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {SAMPLE_DOCUMENTS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setDocName(sample.title);
                        setMunicipalityName(sample.municipality);
                        setCategoryName(sample.category);
                        setSelectedFile(null);
                        setFileBase64(null);
                      }}
                      className="w-full text-left p-2.5 rounded-lg border border-gray-200 hover:border-purple-400 hover:bg-purple-50/50 transition-all text-xs group"
                    >
                      <div className="font-medium text-gray-900 group-hover:text-purple-800 line-clamp-1">
                        {sample.title}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 mt-0.5">
                        <span className="text-[11px] text-[#003D7A] font-semibold">{sample.municipality}</span>
                        <span>•</span>
                        <span className="text-[11px] text-gray-500">{sample.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual/Extracted Document Details Form */}
              <div className="pt-2 border-t border-gray-100 space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Naziv dokumenta / obrasca:
                  </label>
                  <Input
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    placeholder="Npr. Obrazac za građevinsku dozvolu"
                    className="text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Institucija / Grad:
                    </label>
                    <Input
                      value={municipalityName}
                      onChange={(e) => setMunicipalityName(e.target.value)}
                      placeholder="Grad Livno"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Kategorija:
                    </label>
                    <Input
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="Graditeljstvo"
                      className="text-sm"
                    />
                  </div>
                </div>

                {institucije.length > 0 && (
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Poveži sa bazom institucija:
                    </label>
                    <select
                      value={selectedInstId}
                      onChange={(e) => setSelectedInstId(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded-md p-2 bg-white"
                    >
                      {institucije.map((inst) => (
                        <option key={inst.id} value={inst.id}>
                          {inst.naziv} ({inst.kanton_kratko || inst.entitet || ''})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <Button
                onClick={handleRunExtraction}
                disabled={isExtracting || !docName.trim()}
                className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-[#003D7A] hover:from-purple-700 hover:to-[#002A5A] text-white py-5 shadow-sm font-medium"
              >
                {isExtracting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span>Ekstrakcija u toku...</span>
                  </>
                ) : (
                  <>
                    <Bot className="h-4 w-4 mr-2" />
                    <span>Pokreni AI Ekstrakciju Metapodataka</span>
                  </>
                )}
              </Button>

              {isExtracting && extractionProgress && (
                <p className="text-xs text-center text-purple-700 animate-pulse font-medium">
                  {extractionProgress}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Extracted Metadata & Interactive JSON Form */}
        <div className="lg:col-span-7 space-y-4">
          {!result && !isExtracting && (
            <Card className="border-dashed border-gray-300 text-center py-16 px-4 bg-gray-50/50">
              <Bot className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-gray-700 mb-1">
                Spreman za analizu obrasca
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Učitajte PDF dokument s obrascem ili odaberite primjer s lijeve strane, a zatim kliknite na &quot;Pokreni AI Ekstrakciju Metapodataka&quot;.
              </p>
            </Card>
          )}

          {isExtracting && (
            <Card className="border-purple-200 text-center py-16 px-4 bg-purple-50/30">
              <Loader2 className="h-10 w-10 text-purple-600 mx-auto mb-3 animate-spin" />
              <h3 className="text-base font-semibold text-purple-900 mb-1">
                Gemini 3.8 Flash obrađuje PDF formular...
              </h3>
              <p className="text-xs text-purple-700 max-w-md mx-auto">
                Analiziraju se rokovi važenja, administrativne takse, zakonski rokovi po ZUP-u BiH, popis obavezne dokumentacije i struktura polja.
              </p>
            </Card>
          )}

          {result && (
            <div className="space-y-4">
              {/* Header with Title and Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
                <div>
                  <h3 className="text-base font-bold text-gray-900">{result.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs text-[#003D7A] border-blue-200 bg-blue-50">
                      {result.municipality}
                    </Badge>
                    <Badge variant="outline" className="text-xs text-purple-700 border-purple-200 bg-purple-50">
                      {result.category}
                    </Badge>
                    <span className="text-[11px] text-gray-400">
                      AI model: {result.aiModelUsed}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyJson}
                    className="h-8 text-xs gap-1 border-gray-300"
                  >
                    {copiedJson ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Kopirano!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Kopiraj JSON</span>
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDownloadJson}
                    className="h-8 text-xs gap-1 border-gray-300"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Preuzmi .json</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveToDatabase}
                    disabled={isSavingToDb}
                    className="h-8 text-xs gap-1 bg-[#00A651] hover:bg-[#008f45] text-white"
                  >
                    {isSavingToDb ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Database className="h-3.5 w-3.5" />
                    )}
                    <span>Spremi u bazu</span>
                  </Button>
                </div>
              </div>

              {/* View Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 px-4 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
                    activeTab === 'overview'
                      ? 'border-[#003D7A] text-[#003D7A]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Pregled Metapodataka</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('fields')}
                  className={`pb-2 px-4 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
                    activeTab === 'fields'
                      ? 'border-[#003D7A] text-[#003D7A]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FileCheck2 className="h-3.5 w-3.5" />
                  <span>Interaktivna Forma ({result.fields?.length || 0} polja)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('schema')}
                  className={`pb-2 px-4 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
                    activeTab === 'schema'
                      ? 'border-[#003D7A] text-[#003D7A]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FileCode className="h-3.5 w-3.5" />
                  <span>Strukturirana JSON Šema</span>
                </button>
              </div>

              {/* TAB 1: OVERVIEW METADATA */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  {/* Grid of badges and key facts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Document Purpose */}
                    <div className="sm:col-span-2 p-3 bg-blue-50/70 border border-blue-200/70 rounded-xl">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#003D7A] mb-1">
                        <FileText className="h-4 w-4" />
                        <span>Svrha dokumenta i postupak:</span>
                      </div>
                      <p className="text-xs text-gray-800 leading-relaxed">
                        {result.documentPurpose}
                      </p>
                    </div>

                    {/* Expiry Date / Validity */}
                    <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
                        <Clock className="h-3.5 w-3.5 text-amber-700" />
                        <span>Rok važenja (Expiry / Validity):</span>
                      </div>
                      <p className="text-xs font-semibold text-gray-900">
                        {result.expiryDateOrValidity}
                      </p>
                      {result.submissionDeadline && (
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Rok za predaju: {result.submissionDeadline}
                        </p>
                      )}
                    </div>

                    {/* Fee & Payment */}
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-xl">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
                        <Coins className="h-3.5 w-3.5 text-emerald-700" />
                        <span>Administrativna taksa:</span>
                      </div>
                      <p className="text-xs font-bold text-emerald-700">
                        {result.administrativeFeeKM === 0
                          ? 'Besplatno (Bez takse)'
                          : `${result.administrativeFeeKM.toFixed(2)} KM`}
                      </p>
                      <p className="text-[11px] text-gray-600 mt-0.5">
                        {result.feePaymentInstructions || 'Uplata na račun budžeta općine'}
                      </p>
                    </div>

                    {/* Target Audience */}
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 mb-1">
                        <ShieldCheck className="h-3.5 w-3.5 text-gray-600" />
                        <span>Kome je namijenjeno:</span>
                      </div>
                      <p className="text-xs text-gray-700">
                        {result.targetAudience}
                      </p>
                    </div>

                    {/* Responsible Department & Legal Deadline */}
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 mb-1">
                        <Building2 className="h-3.5 w-3.5 text-gray-600" />
                        <span>Nadležni organ i rok rješavanja:</span>
                      </div>
                      <p className="text-xs text-gray-800 font-medium">
                        {result.responsibleAuthority}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Zakonski rok po ZUP-u: do {result.processingDeadlineDays} dana
                      </p>
                    </div>
                  </div>

                  {/* Required Attachments Checklist */}
                  <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2 mb-2.5">
                      <FileCheck2 className="h-4 w-4 text-[#00A651]" />
                      <span>Obavezni prilozi i dokumentacija ({result.requiredAttachments.length})</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {result.requiredAttachments.map((att, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-800">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#00A651] flex-shrink-0 mt-0.5" />
                          <span>{att}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 2: INTERACTIVE FORM FIELDS PREVIEW */}
              {activeTab === 'fields' && (
                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-700">
                      Pregled generisane online forme za građane:
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {result.fields?.length || 0} definisanih polja
                    </Badge>
                  </div>

                  <div className="space-y-3 pt-1">
                    {result.fields?.map((field) => (
                      <div key={field.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-medium text-gray-800 flex items-center gap-1">
                            <span>{field.label}</span>
                            {field.required && (
                              <span className="text-red-500 text-xs font-bold">*</span>
                            )}
                          </label>
                          <span className="text-[10px] text-gray-400 font-mono">
                            type: {field.type}
                          </span>
                        </div>

                        {field.type === 'select' && field.options ? (
                          <select className="w-full text-xs border border-gray-300 rounded-md p-2 bg-gray-50">
                            {field.options.map((opt, oIdx) => (
                              <option key={oIdx} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : field.type === 'textarea' ? (
                          <textarea
                            rows={2}
                            placeholder={field.placeholder || 'Unesite tekst...'}
                            className="w-full text-xs border border-gray-300 rounded-md p-2 bg-gray-50"
                          />
                        ) : field.type === 'checkbox' ? (
                          <div className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="text-xs text-gray-600">{field.helpText || field.label}</span>
                          </div>
                        ) : (
                          <Input
                            type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                            placeholder={field.placeholder || ''}
                            className="text-xs h-8 bg-gray-50"
                          />
                        )}

                        {field.helpText && (
                          <p className="text-[10px] text-gray-500">{field.helpText}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: RAW JSON SCHEMA */}
              {activeTab === 'schema' && (
                <div className="relative">
                  <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto max-h-[500px] leading-relaxed">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
