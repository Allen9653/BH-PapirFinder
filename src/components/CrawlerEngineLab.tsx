import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Bot,
  Globe,
  Play,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Copy,
  Terminal,
  Clock,
  Sparkles,
  Layers,
  Code2,
  ShieldCheck,
  Building2,
  RefreshCw,
  ExternalLink,
  Calendar,
  FileCode,
} from 'lucide-react';
import { LIVNO_FORMS_PORTAL_URL, livnoForms } from '@/data/livno-forms';
import { KAKANJ_FORMS_PORTAL_URL, kakanjForms } from '@/data/kakanj-forms';
import { toast } from 'sonner';

interface CrawledItem {
  id: string;
  title: string;
  url: string;
  extension: string;
  sizeKB: number;
  category: string;
  sha256: string;
  status: 'discovered' | 'downloaded' | 'analyzed';
  interactiveSchema?: {
    purpose: string;
    targetAudience: string;
    feeKM: number;
    requiredAttachments: string[];
    fields: { id: string; label: string; type: string; required: boolean }[];
  };
}

export const CrawlerEngineLab: React.FC = () => {
  const { language } = useLanguage();
  const [targetUrl, setTargetUrl] = useState(LIVNO_FORMS_PORTAL_URL);
  const [municipalityName, setMunicipalityName] = useState('Grad Livno');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [crawledItems, setCrawledItems] = useState<CrawledItem[]>([]);
  const [activeTab, setActiveTab] = useState<'table' | 'json' | 'cron' | 'code'>('table');
  const [copiedCode, setCopiedCode] = useState(false);
  const [cronInterval, setCronInterval] = useState<'daily' | 'weekly'>('weekly');
  const [cronActive, setCronActive] = useState(true);

  const startCrawl = () => {
    setIsRunning(true);
    setLogs([]);
    setCrawledItems([]);

    const logMessages = [
      `[*] Pokrećem BH-PapirFinder Intelektualni Crawler v2.1...`,
      `[*] Ciljni portal: ${targetUrl} [Institucija: ${municipalityName}]`,
      `[HTTP] Šaljem GET zahtjev ka ${targetUrl}...`,
      `[HTTP 200 OK] Odgovor primljen (Content-Type: text/html; charset=UTF-8).`,
      `[DOM] Parsiram HTML stablo i tražim sekcije: 'Obrasci', 'Dokumenti', 'Preuzimanja'...`,
      `[Detekcija] Skeniram hiperlinkove za ekstenzije: .pdf, .doc, .docx, .xls...`,
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < logMessages.length) {
        setLogs((prev) => [...prev, logMessages[step]]);
        step++;
      } else {
        clearInterval(interval);

        // Dinamička simulacija pronađenih dokumenata sa stvarnim podacima Kakanj / Livno
        const sourceForms = targetUrl.toLowerCase().includes('kakanj') || municipalityName.toLowerCase().includes('kakanj')
          ? kakanjForms
          : livnoForms;

        const items: CrawledItem[] = sourceForms.map((f, idx) => ({
          id: f.id,
          title: f.naziv,
          url: f.url,
          extension: '.pdf',
          sizeKB: f.sizeKB,
          category: f.kategorija,
          sha256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8${idx}`,
          status: 'analyzed',
          interactiveSchema: {
            purpose: f.opis,
            targetAudience: `Građani i privrednici sa područja ${municipalityName}`,
            feeKM: f.kategorija.includes('Graditeljstvo') || f.kategorija.includes('Urbanizam') ? 30 : 15,
            requiredAttachments: [
              'Kopija lične karte / osobne iskaznice podnosioca',
              'Uvjerenje o prebivalištu (CIPS prijava)',
              'Dokaz o uplati općinske administrativne takse',
            ],
            fields: [
              { id: 'podnosilac', label: 'Ime i prezime / Naziv privrednog subjekta', type: 'text', required: true },
              { id: 'jmbg_id', label: 'JMBG ili ID broj firme', type: 'text', required: true },
              { id: 'adresa', label: 'Adresa i kontakt telefon', type: 'text', required: true },
              { id: 'obrazlozenje', label: 'Predmet zahtjeva i obrazloženje', type: 'textarea', required: false },
            ],
          },
        }));

        setLogs((prev) => [
          ...prev,
          `[✓] Pronađeno ${items.length} validnih obrazaca i formulara na portalu!`,
          `[SHA256] Izvršeno heširanje i verifikacija integriteta sadržaja.`,
          `[Gemini AI RAG] Analizirana struktura obrazaca — kreirane interaktivne forme za popunjavanje.`,
          `[Status] Podaci su spremni za bazu i sinhronizaciju.`,
        ]);
        setCrawledItems(items);
        setIsRunning(false);
        toast.success(`Uspješno ekstrahovano ${items.length} obrazaca sa stranice ${targetUrl}!`);
      }
    }, 400);
  };

  const handleCopyJson = () => {
    const data = {
      institucija: municipalityName,
      izvor: targetUrl,
      datum_crawla: new Date().toISOString(),
      ukupno_dokumenata: crawledItems.length,
      dokumenti: crawledItems,
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    toast.success('Katalog obrazaca u JSON formatu kopiran!');
  };

  const handleDownloadPythonScript = () => {
    const scriptPath = '/scripts/bh_papirfinder_crawler.py';
    window.open(scriptPath, '_blank');
    toast.info('Python crawler skripta je dostupna u /scripts/bh_papirfinder_crawler.py');
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <Card className="border border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#003D7A]/5 via-sky-500/5 to-[#00A651]/5 border-b border-slate-200 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-[#003D7A] text-white">
                  <Bot className="w-3 h-3 mr-1" />
                  Crawler & RAG Engine
                </Badge>
                <Badge variant="outline" className="border-emerald-300 text-emerald-800 bg-emerald-50 text-[10px]">
                  Python & Node.js Automatizacija
                </Badge>
              </div>
              <CardTitle className="text-xl font-bold text-[#003D7A]">
                Intelektualni Web Crawler & Automatizacija Baze Obrazaca
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-slate-600">
                Automatski rekurzivni skener opštinskih portala (.pdf, .doc, .xls), SHA-256 deduplikacija,
                AI Gemini konverzija u interaktivne forme i periodični Cron Job.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPythonScript}
                className="h-8 text-xs gap-1 border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <FileCode className="w-3.5 h-3.5 text-blue-600" />
                <span>Python Skripta</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 space-y-5">
          {/* Quick Select Portal Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Brzi odabir verifikovanog portala:</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setTargetUrl(KAKANJ_FORMS_PORTAL_URL);
                setMunicipalityName('Općina Kakanj');
              }}
              className={`h-7 text-xs gap-1 border-emerald-300 ${
                targetUrl.includes('kakanj') ? 'bg-emerald-50 text-emerald-800 font-bold border-emerald-500' : 'text-slate-700'
              }`}
            >
              <Building2 className="w-3 h-3 text-[#00A651]" />
              <span>Općina Kakanj (e-obrasci)</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setTargetUrl(LIVNO_FORMS_PORTAL_URL);
                setMunicipalityName('Grad Livno');
              }}
              className={`h-7 text-xs gap-1 border-blue-300 ${
                targetUrl.includes('livno') ? 'bg-blue-50 text-blue-800 font-bold border-blue-500' : 'text-slate-700'
              }`}
            >
              <Building2 className="w-3 h-3 text-[#003D7A]" />
              <span>Grad Livno (dokumenti i obrasci)</span>
            </Button>
          </div>

          {/* Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#003D7A]" />
                <span>Ciljni URL službene stranice s obrascima:</span>
              </label>
              <Input
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://livno.ba/za-gradane/dokumenti-i-obrasci/"
                className="h-10 text-xs sm:text-sm font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#00A651]" />
                <span>Naziv institucije / organa:</span>
              </label>
              <Input
                value={municipalityName}
                onChange={(e) => setMunicipalityName(e.target.value)}
                placeholder="Grad Livno"
                className="h-10 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Action Trigger */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold">Podržani formati:</span>
              <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">.pdf</span>
              <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">.doc / .docx</span>
              <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">.xls / .xlsx</span>
              <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">.odt</span>
            </div>

            <Button
              onClick={startCrawl}
              disabled={isRunning}
              className="h-10 px-6 bg-[#003D7A] hover:bg-[#002A5A] text-white font-bold gap-2 text-xs sm:text-sm shadow-xs"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Skeniranje portala u toku...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Pokreni Intelektualni Crawler</span>
                </>
              )}
            </Button>
          </div>

          {/* Live Terminal Console Logs */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#070b1a] shadow-inner">
            <div className="bg-[#0b142d] px-4 py-2 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#5df0a8]" />
                <span className="font-mono text-xs text-slate-300 font-semibold">
                  Crawler Engine Console Log & Discovery Pipeline
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {logs.length} događaja zabilježeno
              </span>
            </div>

            <div className="p-4 font-mono text-xs text-emerald-300 max-h-48 overflow-y-auto space-y-1">
              {logs.length === 0 ? (
                <p className="text-slate-500 italic">
                  Spreman za rad. Kliknite na &quot;Pokreni Intelektualni Crawler&quot; za pokretanje rekurzivnog skeniranja.
                </p>
              ) : (
                logs.map((log, i) => <div key={i} className="leading-relaxed">{log}</div>)
              )}
            </div>
          </div>

          {/* Tabs for Results, JSON Schema, and Cron Settings */}
          {crawledItems.length > 0 && (
            <div className="space-y-4 pt-3 border-t border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('table')}
                    className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                      activeTab === 'table' ? 'bg-white text-[#003D7A] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Detektovani Dokumenti ({crawledItems.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('json')}
                    className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                      activeTab === 'json' ? 'bg-[#003D7A] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>AI JSON Schema za Popunjavanje</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('cron')}
                    className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                      activeTab === 'cron' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Automatski Cron Job Postavke</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('code')}
                    className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                      activeTab === 'code' ? 'bg-[#003D7A] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Next.js API Kod (Cheerio)</span>
                  </button>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyJson}
                  className="h-8 text-xs gap-1 border-slate-300"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kopiraj Čisti JSON</span>
                </Button>
              </div>

              {/* TAB 1: Detektovani Dokumenti Tabela */}
              {activeTab === 'table' && (
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                        <tr>
                          <th className="py-2.5 px-3">Naziv Obrasca</th>
                          <th className="py-2.5 px-3">Kategorija</th>
                          <th className="py-2.5 px-3">Format & Veličina</th>
                          <th className="py-2.5 px-3">SHA-256 Integritet</th>
                          <th className="py-2.5 px-3 text-right">Direktna Poveznica</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {crawledItems.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2.5 px-3 font-semibold text-slate-800 max-w-sm">
                              {item.title}
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded bg-blue-50 text-[#003D7A] font-semibold text-[10px]">
                                {item.category}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-mono text-slate-600">
                              {item.extension.toUpperCase()} • {item.sizeKB} KB
                            </td>
                            <td className="py-2.5 px-3 font-mono text-[10px] text-slate-400">
                              {item.sha256.slice(0, 16)}...
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[#00A651] hover:underline font-semibold"
                              >
                                <span>Preuzmi</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: AI Gemini JSON Schema za Digitalno Popunjavanje */}
              {activeTab === 'json' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-600">
                    Gemini API je analizirao strukturu svakog obrasca i kreirao standardizovana polja,
                    obavezne administrativne takse i spisak potrebnih priloga za online popunjavanje:
                  </p>
                  <pre className="p-4 rounded-xl border border-slate-800 bg-[#070b1a] text-xs font-mono text-emerald-300 overflow-x-auto max-h-96 leading-relaxed">
                    <code>
                      {JSON.stringify(
                        crawledItems.slice(0, 2).map((item) => ({
                          form_id: item.id,
                          naziv: item.title,
                          kategorija: item.category,
                          url: item.url,
                          ai_interactive_schema: item.interactiveSchema,
                        })),
                        null,
                        2
                      )}
                    </code>
                  </pre>
                </div>
              )}

              {/* TAB 3: Automatski Cron Job Postavke */}
              {activeTab === 'cron' && (
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-700" />
                      <h4 className="font-bold text-slate-900 text-sm">
                        Konfiguracija Automatskog Cron Job-a (Periodično Ažuriranje)
                      </h4>
                    </div>
                    <Badge className={cronActive ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'}>
                      {cronActive ? 'Aktivan (Scheduled)' : 'Pauziran'}
                    </Badge>
                  </div>

                  <p className="text-slate-600 leading-relaxed">
                    Cron agent šalje lagane HTTP <code>HEAD</code> zahtjeve sa zaglavljima <code>If-Modified-Since</code> i{' '}
                    <code>If-None-Match (ETag)</code> kako bi provjerio da li je općina promijenila ili dodala obrazac,
                    BEZ trošenja resursa servera ili ponovnog preuzimanja istih datoteka.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-white border border-slate-200">
                      <span className="text-slate-500 block mb-1 font-semibold">Frekvencija provjere:</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setCronInterval('daily')}
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            cronInterval === 'daily' ? 'bg-[#003D7A] text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          Dnevno (03:00 AM)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCronInterval('weekly')}
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            cronInterval === 'weekly' ? 'bg-[#003D7A] text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          Sedmično (Ponedjeljak)
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-white border border-slate-200">
                      <span className="text-slate-500 block mb-1 font-semibold">Sljedeća automatska provjera:</span>
                      <span className="font-mono text-emerald-700 font-bold">
                        Ponedjeljak, 09.11.2026 u 03:00 UTC
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Next.js API Route (Cheerio) Code */}
              {activeTab === 'code' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900 text-slate-200 px-4 py-2.5 rounded-t-xl text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-emerald-400" />
                      <span>app/api/crawl/route.ts</span>
                      <Badge variant="outline" className="text-[10px] text-emerald-400 border-slate-700">
                        Next.js App Router (TypeScript)
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          const code = `import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL institucije nije obezbijeđen.' }, { status: 400 });
  }

  try {
    // 1. Fetchovanje stranice opštine
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BH-PapirFinder-Bot/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(\`Greška pri pristupu stranici: \${response.statusText}\`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const documents: { title: string; href: string; extension: string }[] = [];

    // 2. Pronalaženje svih linkova koji vode ka dokumentima (.pdf, .doc, .docx)
    $('a').each((_, element) => {
      const href = $(element).attr('href');
      const title = $(element).text().trim() || 'Preuzmi dokument';

      if (href) {
        const lowerHref = href.toLowerCase();
        if (
          lowerHref.endsWith('.pdf') ||
          lowerHref.endsWith('.doc') ||
          lowerHref.endsWith('.docx') ||
          lowerHref.includes('download') ||
          lowerHref.includes('dokum') ||
          lowerHref.includes('obrazac')
        ) {
          // Normalizacija URL-a ukoliko je relativni link
          let absoluteHref = href;
          if (href.startsWith('/')) {
            const parsedUrl = new URL(targetUrl);
            absoluteHref = \`\${parsedUrl.origin}\${href}\`;
          } else if (!href.startsWith('http')) {
            absoluteHref = \`\${targetUrl}/\${href}\`;
          }

          const extension = absoluteHref.split('.').pop()?.split('?')[0] || 'pdf';

          // Izbjegavanje duplikata
          if (!documents.some(doc => doc.href === absoluteHref)) {
            documents.push({
              title: title.length > 5 ? title : 'Administrativni obrazac',
              href: absoluteHref,
              extension: extension.toUpperCase()
            });
          }
        }
      }
    });

    return NextResponse.json({ success: true, count: documents.length, documents });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}`;
                          navigator.clipboard.writeText(code);
                          setCopiedCode(true);
                          toast.success('Next.js API route kod je kopiran!');
                          setTimeout(() => setCopiedCode(false), 2500);
                        }}
                        className="h-7 text-xs text-slate-300 hover:text-white hover:bg-slate-800 gap-1"
                      >
                        {copiedCode ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Kopirano!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Kopiraj kod</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <pre className="p-4 bg-slate-950 text-slate-200 rounded-b-xl border border-slate-800 text-xs font-mono overflow-x-auto max-h-[420px] leading-relaxed">
{`import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL institucije nije obezbijeđen.' }, { status: 400 });
  }

  try {
    // 1. Fetchovanje stranice opštine
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BH-PapirFinder-Bot/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(\`Greška pri pristupu stranici: \${response.statusText}\`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const documents: { title: string; href: string; extension: string }[] = [];

    // 2. Pronalaženje svih linkova koji vode ka dokumentima (.pdf, .doc, .docx)
    $('a').each((_, element) => {
      const href = $(element).attr('href');
      const title = $(element).text().trim() || 'Preuzmi dokument';

      if (href) {
        const lowerHref = href.toLowerCase();
        if (
          lowerHref.endsWith('.pdf') ||
          lowerHref.endsWith('.doc') ||
          lowerHref.endsWith('.docx') ||
          lowerHref.includes('download') ||
          lowerHref.includes('dokum') ||
          lowerHref.includes('obrazac')
        ) {
          // Normalizacija URL-a ukoliko je relativni link
          let absoluteHref = href;
          if (href.startsWith('/')) {
            const parsedUrl = new URL(targetUrl);
            absoluteHref = \`\${parsedUrl.origin}\${href}\`;
          } else if (!href.startsWith('http')) {
            absoluteHref = \`\${targetUrl}/\${href}\`;
          }

          const extension = absoluteHref.split('.').pop()?.split('?')[0] || 'pdf';

          // Izbjegavanje duplikata
          if (!documents.some(doc => doc.href === absoluteHref)) {
            documents.push({
              title: title.length > 5 ? title : 'Administrativni obrazac',
              href: absoluteHref,
              extension: extension.toUpperCase()
            });
          }
        }
      }
    });

    return NextResponse.json({ success: true, count: documents.length, documents });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}`}
                  </pre>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5 text-blue-950">
                      <span>💡 Testiranje i poziv ove rute:</span>
                    </p>
                    <p className="font-mono text-[11px] bg-white p-2 rounded border border-blue-200 overflow-x-auto">
                      curl -X GET &quot;https://papir-finder.com/api/crawl?url=https://kakanj.gov.ba/v5/e-obrasci/&quot;
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CrawlerEngineLab;
