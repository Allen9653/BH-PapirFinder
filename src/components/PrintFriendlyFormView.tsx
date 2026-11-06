import React from 'react';
import { Printer, ArrowLeft, CheckSquare, FileText, QrCode, Shield, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PrintFriendlyFormViewProps {
  formId: string;
  displayName: string;
  originalName: string;
  category: string;
  municipalityName: string;
  cantonShort?: string;
  sizeKB?: number;
  description?: string | null;
  fileUrl?: string;
  onExit: () => void;
}

export const PrintFriendlyFormView: React.FC<PrintFriendlyFormViewProps> = ({
  formId,
  displayName,
  originalName,
  category,
  municipalityName,
  cantonShort,
  sizeKB,
  description,
  fileUrl,
  onExit,
}) => {
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

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 print:p-0 print:bg-white text-slate-900 font-sans">
      {/* Non-printable Control Header */}
      <div className="max-w-4xl mx-auto mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onExit}
            className="border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Nazad na interaktivni pregled
          </Button>
          <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline">
            Print-friendly izgled • Format prilagođen za standardni A4 list
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrint}
            className="bg-[#003D7A] hover:bg-[#002A5A] text-white shadow-sm font-semibold gap-2"
          >
            <Printer className="h-4 w-4" />
            Isprintaj dokument (A4)
          </Button>
        </div>
      </div>

      {/* Printable Sheet (Simulates Standard A4 Paper) */}
      <article className="max-w-4xl mx-auto bg-white p-8 sm:p-12 border border-slate-300 print:border-none shadow-md print:shadow-none print:p-0 text-slate-900">
        {/* Official Header */}
        <header className="border-b-2 border-slate-900 pb-4 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
                BOSNA I HERCEGOVINA • SLUŽBENI REGISTAR OBRAZACA
              </p>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase mt-0.5">
                {municipalityName ? municipalityName.toUpperCase() : 'NADLEŽNI ORGAN UPRAVE'}
                {cantonShort ? ` (${cantonShort})` : ''}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Verifikovani administrativni obrazac i kontrolni listić za predaju na šalteru
              </p>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="inline-block px-2.5 py-1 bg-slate-100 border border-slate-300 text-[11px] font-mono font-bold text-slate-800 rounded">
                KOD: {verificationCode}
              </span>
              <p className="text-[10px] text-slate-500 mt-1">Datum: {currentDate}</p>
            </div>
          </div>
        </header>

        {/* Title Section */}
        <section className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#003D7A] uppercase mb-1">
            <FileText className="h-4 w-4" />
            <span>Kategorija: {category || 'Opći zahtjevi i obrasci'}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-950 leading-snug">
            {displayName}
          </h1>

          {originalName && originalName !== displayName && (
            <p className="text-xs text-slate-500 italic mt-1">Originalni naziv: {originalName}</p>
          )}

          {description && (
            <div className="mt-3 p-3 bg-slate-50 border-l-4 border-[#003D7A] text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>Svrha i opis:</strong> {description}
            </div>
          )}
        </section>

        {/* Specification & Authority Table */}
        <section className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 border-b border-slate-200 pb-1">
            1. Osnovni administrativni podaci
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
                <td className="p-2 text-slate-900 font-semibold text-emerald-800">
                  Važeći službeni formular za 2026. godinu
                </td>
              </tr>
              <tr>
                <td className="w-1/3 p-2 font-bold bg-slate-50 text-slate-700">Verifikacija izvora:</td>
                <td className="p-2 text-slate-900 font-mono text-[11px] truncate max-w-xs">
                  {fileUrl || onlineUrl}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Checklist of Required Documents */}
        <section className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 border-b border-slate-200 pb-1 flex items-center justify-between">
            <span>2. Kontrolna lista potrebne dokumentacije (označite prije odlaska na šalter)</span>
            <span className="text-[10px] font-normal text-slate-500">Ček-lista za građane</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2.5 p-2 border border-slate-200 rounded">
              <span className="w-4 h-4 border-2 border-slate-700 rounded-sm flex-shrink-0 mt-0.5" />
              <div>
                <strong>Uredno popunjen i potpisan zahtjev/obrazac</strong>
                <p className="text-slate-500 text-[11px]">Popuniti čitko hemijskom olovkom plave ili crne boje.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 border border-slate-200 rounded">
              <span className="w-4 h-4 border-2 border-slate-700 rounded-sm flex-shrink-0 mt-0.5" />
              <div>
                <strong>Lična karta podnosioca zahtjeva (na uvid)</strong>
                <p className="text-slate-500 text-[11px]">Ili pasoš / boravišna dozvola za strane državljane.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 border border-slate-200 rounded">
              <span className="w-4 h-4 border-2 border-slate-700 rounded-sm flex-shrink-0 mt-0.5" />
              <div>
                <strong>PBA-3 Obrazac (CIPS prijava prebivališta)</strong>
                <p className="text-slate-500 text-[11px]">Ne stariji od 6 mjeseci, osim ukoliko služba ima elektronski uvid.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 border border-slate-200 rounded">
              <span className="w-4 h-4 border-2 border-slate-700 rounded-sm flex-shrink-0 mt-0.5" />
              <div>
                <strong>Dokaz o uplati općinske administrativne takse</strong>
                <p className="text-slate-500 text-[11px]">Uplatnica ili taksena marka u skladu sa općinskom odlukom o administrativnim taksama.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 border border-slate-200 rounded">
              <span className="w-4 h-4 border-2 border-slate-700 rounded-sm flex-shrink-0 mt-0.5" />
              <div>
                <strong>Dodatna prateća dokumentacija navedena u obrascu</strong>
                <p className="text-slate-500 text-[11px]">Uvjerenja, saglasnosti, izjave svjedoka ili izvod iz matične knjige (ukoliko se traži).</p>
              </div>
            </div>
          </div>
        </section>

        {/* Submission & Signature Protocol Block */}
        <section className="mb-6 border border-slate-300 rounded p-4 bg-slate-50/50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 border-b border-slate-200 pb-1">
            3. Protokol predaje i ovjera
          </h3>

          <div className="grid grid-cols-2 gap-8 text-xs pt-2">
            <div>
              <p className="text-slate-500 text-[11px] mb-8">Podaci i potpis podnosioca zahtjeva:</p>
              <div className="border-b border-slate-700 pb-1">
                <span className="text-[10px] text-slate-400">Ime i prezime: _____________________________</span>
              </div>
              <div className="border-b border-slate-700 pb-1 mt-4">
                <span className="text-[10px] text-slate-400">JMBG / Broj LK: ___________________________</span>
              </div>
              <div className="mt-6 border-t border-dashed border-slate-400 pt-1 text-center text-[10px] text-slate-500">
                (Vlastoručni potpis podnosioca)
              </div>
            </div>

            <div className="border-l border-slate-300 pl-6">
              <p className="text-slate-500 text-[11px] mb-2">Popunjava ovlašteni službenik protokola:</p>
              <div className="h-24 border border-dashed border-slate-400 rounded flex flex-col justify-between p-2 text-center text-[10px] text-slate-400">
                <span>PRIJEMNI ŠTAMBILJ / PROTOKOL</span>
                <span>Broj protokola: __________________</span>
                <span>Datum prijema: ____.____.2026. god.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Footer & QR */}
        <footer className="border-t-2 border-slate-900 pt-4 flex items-center justify-between gap-4 text-[10px] text-slate-500">
          <div>
            <p className="font-bold text-slate-700">BH PAPIRFINDER • www.papir-finder.com</p>
            <p>Najveći centralizovani registar administrativnih obrazaca u Bosni i Hercegovini.</p>
            <p className="mt-0.5">Za preuzimanje direktnog originalnog PDF fajla skenirajte QR ili posjetite: {onlineUrl}</p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 text-slate-700">
            <QrCode className="h-10 w-10 text-slate-800" />
            <div className="text-[9px] leading-tight font-mono">
              <span>ONLINE VERIFIKACIJA</span><br />
              <span>{verificationCode}</span>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default PrintFriendlyFormView;
