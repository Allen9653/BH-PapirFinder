import React, { useRef, useState } from 'react';
import {
  Printer,
  Download,
  X,
  FileText,
  Building2,
  QrCode,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { exportElementToPdf } from '@/lib/pdf-export-service';
import { toast } from 'sonner';

interface PrintPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formId: string;
  displayName: string;
  originalName: string;
  category: string;
  municipalityName: string;
  cantonShort?: string;
  sizeKB?: number;
  description?: string | null;
  fileUrl?: string;
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  open,
  onOpenChange,
  formId,
  displayName,
  originalName,
  category,
  municipalityName,
  cantonShort,
  sizeKB,
  description,
  fileUrl,
}) => {
  const paperRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number>(100);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const currentDate = new Date().toLocaleDateString('bs-BA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const verificationCode = `PF-${(formId || 'DOC').slice(0, 8).toUpperCase()}-2026`;
  const onlineUrl = `https://www.papir-finder.com/form/${formId}`;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!paperRef.current) return;
    setIsExportingPdf(true);
    try {
      const success = await exportElementToPdf(paperRef.current, {
        formName: displayName,
        municipalityName,
        category,
        description: description || undefined,
      });

      if (success) {
        toast.success('PDF dokument je uspješno generisan i preuzet!');
      } else {
        toast.error('Došlo je do greške pri preuzimanju PDF-a.');
      }
    } catch (err) {
      console.error('PDF export error:', err);
      toast.error('Došlo je do greške pri generisanju PDF-a.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[96vw] max-h-[92vh] h-[92vh] p-0 flex flex-col bg-slate-900 border-slate-700 text-white overflow-hidden shadow-2xl">
        {/* Modal Header & Control Toolbar */}
        <DialogHeader className="p-3 sm:p-4 bg-slate-950 border-b border-slate-800 flex flex-row items-center justify-between space-y-0 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 bg-blue-600/20 text-blue-400 rounded-lg shrink-0">
              <Printer className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-sm sm:text-base font-bold text-white truncate flex items-center gap-2">
                <span>Print Preview</span>
                <Badge variant="outline" className="border-blue-500/40 text-blue-300 text-[10px] hidden sm:inline-flex">
                  A4 format (210 × 297 mm)
                </Badge>
              </DialogTitle>
              <p className="text-xs text-slate-400 truncate hidden sm:block">
                Prikaz izgleda dokumenta na papiru prije štampe ili preuzimanja
              </p>
            </div>
          </div>

          {/* Action buttons in toolbar */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Zoom controls */}
            <div className="hidden md:flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs text-slate-300">
              <button
                type="button"
                onClick={() => setZoom((prev) => Math.max(70, prev - 10))}
                className="p-1.5 hover:bg-slate-800 rounded hover:text-white transition-colors"
                title="Smanji zoom"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center font-mono text-[11px]">{zoom}%</span>
              <button
                type="button"
                onClick={() => setZoom((prev) => Math.min(140, prev + 10))}
                className="p-1.5 hover:bg-slate-800 rounded hover:text-white transition-colors"
                title="Povećaj zoom"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Download as PDF via jspdf/html2canvas */}
            <Button
              size="sm"
              variant="outline"
              disabled={isExportingPdf}
              onClick={handleDownloadPdf}
              className="bg-emerald-600 hover:bg-emerald-700 text-white border-none text-xs font-semibold h-8 gap-1.5 shadow-sm"
            >
              {isExportingPdf ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span className="hidden sm:inline">Generisanje...</span>
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  <span>Preuzmi PDF</span>
                </>
              )}
            </Button>

            {/* Print button */}
            <Button
              size="sm"
              onClick={handlePrint}
              className="bg-[#003D7A] hover:bg-[#002A5A] text-white text-xs font-semibold h-8 gap-1.5 shadow-sm"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Isprintaj</span>
            </Button>
          </div>
        </DialogHeader>

        {/* Paper Preview Scrollable Canvas Area */}
        <div className="flex-1 bg-slate-900/90 overflow-y-auto p-4 sm:p-8 flex justify-center items-start">
          <div
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease-out',
            }}
            className="w-full max-w-[210mm] my-0"
          >
            {/* The Actual Simulated A4 Paper */}
            <div
              ref={paperRef}
              id="printable-a4-sheet"
              className="bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-sm border border-slate-300 min-h-[297mm] flex flex-col justify-between font-sans leading-relaxed"
            >
              <div>
                {/* Official BiH Header */}
                <header className="border-b-2 border-slate-900 pb-4 mb-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                        BOSNA I HERCEGOVINA • SLUŽBENI REGISTAR OBRAZACA
                      </p>
                      <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase mt-0.5">
                        {municipalityName ? municipalityName.toUpperCase() : 'NADLEŽNI ORGAN UPRAVE'}
                        {cantonShort ? ` (${cantonShort})` : ''}
                      </h2>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Verifikovani administrativni obrazac i kontrolni listić za predaju na šalteru
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block px-2 py-0.5 bg-slate-100 border border-slate-300 text-[10px] font-mono font-bold text-slate-800 rounded">
                        KOD: {verificationCode}
                      </span>
                      <p className="text-[10px] text-slate-500 mt-1">Datum: {currentDate}</p>
                    </div>
                  </div>
                </header>

                {/* Form Title & Category */}
                <section className="mb-5">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#003D7A] uppercase mb-1">
                    <FileText className="h-3.5 w-3.5" />
                    <span>Kategorija: {category || 'Opći zahtjevi i obrasci'}</span>
                  </div>

                  <h1 className="text-lg sm:text-xl font-black text-slate-950 leading-snug">
                    {displayName}
                  </h1>

                  {originalName && originalName !== displayName && (
                    <p className="text-xs text-slate-500 italic mt-0.5">Originalni naziv: {originalName}</p>
                  )}

                  {description && (
                    <div className="mt-3 p-3 bg-slate-50 border-l-4 border-[#003D7A] text-xs text-slate-700 leading-relaxed rounded-r">
                      <strong>Svrha i opis:</strong> {description}
                    </div>
                  )}
                </section>

                {/* Specification Table */}
                <section className="mb-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 border-b border-slate-200 pb-1">
                    1. Administrativna specifikacija
                  </h3>
                  <table className="w-full text-xs border border-slate-300">
                    <tbody>
                      <tr className="border-b border-slate-200">
                        <td className="w-1/3 p-2 font-bold bg-slate-50 text-slate-700">Nadležna služba:</td>
                        <td className="p-2 text-slate-900">{municipalityName} • Prijemni šalter / Protokol</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="w-1/3 p-2 font-bold bg-slate-50 text-slate-700">Format i veličina:</td>
                        <td className="p-2 text-slate-900">PDF Dokument • {sizeKB ? `${sizeKB} KB` : 'Standard'}</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="w-1/3 p-2 font-bold bg-slate-50 text-slate-700">Pravni status:</td>
                        <td className="p-2 text-slate-900 font-semibold text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          Važeći službeni formular za 2026. godinu
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1/3 p-2 font-bold bg-slate-50 text-slate-700">Verifikacija izvora:</td>
                        <td className="p-2 text-slate-900 font-mono text-[10px] truncate max-w-xs">
                          {fileUrl || onlineUrl}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>

                {/* Checklist Section */}
                <section className="mb-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 border-b border-slate-200 pb-1 flex items-center justify-between">
                    <span>2. Kontrolna lista potrebne dokumentacije (označite prije odlaska na šalter)</span>
                    <span className="text-[10px] font-normal text-slate-500">Ček-lista za građane</span>
                  </h3>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-start gap-2.5 p-2 border border-slate-200 rounded">
                      <span className="w-4 h-4 border-2 border-slate-700 rounded-sm shrink-0 mt-0.5" />
                      <div>
                        <strong>Uredno popunjen i potpisan zahtjev/obrazac</strong>
                        <p className="text-slate-500 text-[10px]">Popuniti čitko hemijskom olovkom plave ili crne boje.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2 border border-slate-200 rounded">
                      <span className="w-4 h-4 border-2 border-slate-700 rounded-sm shrink-0 mt-0.5" />
                      <div>
                        <strong>Lična karta podnosioca zahtjeva (na uvid)</strong>
                        <p className="text-slate-500 text-[10px]">Ili pasoš / boravišna dozvola za strane državljane.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2 border border-slate-200 rounded">
                      <span className="w-4 h-4 border-2 border-slate-700 rounded-sm shrink-0 mt-0.5" />
                      <div>
                        <strong>PBA-3 Obrazac (CIPS prijava prebivališta)</strong>
                        <p className="text-slate-500 text-[10px]">Ne stariji od 6 mjeseci, osim ukoliko služba ima elektronski uvid.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2 border border-slate-200 rounded">
                      <span className="w-4 h-4 border-2 border-slate-700 rounded-sm shrink-0 mt-0.5" />
                      <div>
                        <strong>Dokaz o uplati općinske administrativne takse</strong>
                        <p className="text-slate-500 text-[10px]">Uplatnica ili taksena marka u skladu sa općinskom odlukom o administrativnim taksama.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2 border border-slate-200 rounded">
                      <span className="w-4 h-4 border-2 border-slate-700 rounded-sm shrink-0 mt-0.5" />
                      <div>
                        <strong>Dodatna prateća dokumentacija navedena u obrascu</strong>
                        <p className="text-slate-500 text-[10px]">Uvjerenja, saglasnosti, izjave svjedoka ili izvod iz matične knjige (ukoliko se traži).</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Protocol and Signature Block */}
                <section className="mb-4 border border-slate-300 rounded p-3 bg-slate-50/50">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 border-b border-slate-200 pb-1">
                    3. Protokol predaje i ovjera
                  </h3>

                  <div className="grid grid-cols-2 gap-6 text-xs pt-1">
                    <div>
                      <p className="text-slate-500 text-[10px] mb-6">Podaci i potpis podnosioca zahtjeva:</p>
                      <div className="border-b border-slate-700 pb-0.5 mb-3">
                        <span className="text-[10px] text-slate-400">Ime i prezime: _____________________________</span>
                      </div>
                      <div className="border-b border-slate-700 pb-0.5 mb-4">
                        <span className="text-[10px] text-slate-400">JMBG / Broj LK: ___________________________</span>
                      </div>
                      <div className="border-t border-dashed border-slate-400 pt-1 text-center text-[10px] text-slate-500">
                        (Vlastoručni potpis podnosioca)
                      </div>
                    </div>

                    <div className="border-l border-slate-300 pl-4">
                      <p className="text-slate-500 text-[10px] mb-1">Popunjava ovlašteni službenik protokola:</p>
                      <div className="h-20 border border-dashed border-slate-400 rounded flex flex-col justify-between p-2 text-center text-[10px] text-slate-400">
                        <span>PRIJEMNI ŠTAMBILJ / PROTOKOL</span>
                        <span>Broj protokola: __________________</span>
                        <span>Datum prijema: ____.____.2026. god.</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sheet Footer */}
              <footer className="border-t-2 border-slate-900 pt-3 flex items-center justify-between gap-4 text-[9px] text-slate-500 mt-6">
                <div>
                  <p className="font-bold text-slate-700">BH PAPIRFINDER • www.papir-finder.com</p>
                  <p>Najveći centralizovani registar administrativnih obrazaca u Bosni i Hercegovini.</p>
                  <p className="mt-0.5">Online verifikacija: {onlineUrl}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 text-slate-700">
                  <QrCode className="h-8 w-8 text-slate-800" />
                  <div className="text-[8px] leading-tight font-mono">
                    <span>ONLINE VERIFIKACIJA</span><br />
                    <span>{verificationCode}</span>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrintPreviewModal;
