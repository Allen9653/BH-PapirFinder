import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FileText,
  Download,
  RefreshCw,
  ExternalLink,
  Eye,
  CheckCircle2,
  Copy,
  AlertCircle,
  Building2,
  Sparkles,
  Search,
} from 'lucide-react';
import { crawlMunicipalWebsite, ScrapedDocument } from '@/lib/web-crawler-service';
import QuickPreviewOverlay from '@/components/QuickPreviewOverlay';
import { toast } from 'sonner';

export interface DocumentItem {
  title: string;
  href: string;
  extension: string;
  category?: string;
  sizeKB?: number;
}

interface InstitutionDocumentsProps {
  institutionUrl: string;
  institutionName: string;
  autoFetch?: boolean;
  className?: string;
}

export default function InstitutionDocuments({
  institutionUrl,
  institutionName,
  autoFetch = true,
  className = '',
}: InstitutionDocumentsProps) {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [filterQuery, setFilterQuery] = useState('');

  const fetchLiveDocuments = useCallback(async () => {
    if (!institutionUrl) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Pokušaj poziva lokalne/Next.js API rute
      let documentsFound: DocumentItem[] = [];
      let success = false;

      try {
        const res = await fetch(`/api/fetch-documents?url=${encodeURIComponent(institutionUrl)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.documents) && data.documents.length > 0) {
            documentsFound = data.documents;
            success = true;
          }
        }
      } catch (apiErr) {
        console.warn('Lokalni /api/fetch-documents poziv nije dostupan, koristim in-app crawler servis:', apiErr);
      }

      // 2. Fallback na integrisani in-app crawler servis (podržava Kakanj, Livno, Olovo i live DOM parsiranje)
      if (!success) {
        const crawlResult = await crawlMunicipalWebsite(institutionUrl);
        if (crawlResult.success && crawlResult.documents.length > 0) {
          documentsFound = crawlResult.documents.map((d: ScrapedDocument) => ({
            title: d.title,
            href: d.href,
            extension: d.extension,
            category: d.category,
            sizeKB: d.sizeKB,
          }));
          success = true;
        } else if (crawlResult.error) {
          setError(crawlResult.error);
        }
      }

      if (success) {
        setDocs(documentsFound);
        setLastFetched(new Date());
        toast.success(`Uspješno pronađeno ${documentsFound.length} obrazaca za ${institutionName}!`);
      } else if (!error) {
        setError('Nisu pronađeni dostupni obrasci na navedenom linku.');
      }
    } catch (err: unknown) {
      console.error('Greška pri dohvatanju dokumenata:', err);
      const msg = err instanceof Error ? err.message : 'Došlo je do greške pri skeniranju stranice.';
      setError(msg);
      toast.error('Neuspjelo skeniranje stranice institucije.');
    } finally {
      setLoading(false);
    }
  }, [institutionUrl, institutionName, error]);

  // Automatsko skeniranje pri učitavanju
  useEffect(() => {
    if (autoFetch && institutionUrl) {
      fetchLiveDocuments();
    }
  }, [institutionUrl, autoFetch, fetchLiveDocuments]);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
    toast.success('Direktna poveznica dokumenta je kopirana!');
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const filteredDocs = docs.filter((d) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      (d.category && d.category.toLowerCase().includes(q)) ||
      d.extension.toLowerCase().includes(q)
    );
  });

  return (
    <div className={`p-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm ${className}`}>
      {/* Zaglavlje sekcije */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#003D7A]/10 text-[#003D7A]">
              <Building2 className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Dokumenti i obrasci za: <span className="text-[#003D7A]">{institutionName}</span>
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-mono break-all flex items-center gap-1.5">
            <span>Izvor:</span>
            <a
              href={institutionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:underline inline-flex items-center gap-0.5"
            >
              <span>{institutionUrl}</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </p>
        </div>

        <Button
          onClick={fetchLiveDocuments}
          disabled={loading}
          className="px-4 py-2 bg-[#003D7A] hover:bg-[#002A5A] text-white text-xs font-semibold rounded-xl shadow-xs transition-all gap-2 shrink-0 self-start sm:self-auto"
        >
          {loading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Skeniranje stranice u toku...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Osvježi i učitaj sve obrasce direktno</span>
            </>
          )}
        </Button>
      </div>

      {/* Tražilica unutar pronađenih obrazaca */}
      {docs.length > 0 && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filtriraj pronađene obrasce..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#003D7A]"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium shrink-0">
            Prikazano: <strong className="text-slate-800">{filteredDocs.length}</strong> od {docs.length} dokumenata
            {lastFetched && ` • Skenirano u ${lastFetched.toLocaleTimeString()}`}
          </span>
        </div>
      )}

      {/* Prikaz greške */}
      {error && docs.length === 0 && !loading && (
        <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Napomena o pristupu repozitoriju:</p>
            <p className="mt-0.5 text-amber-800">{error}</p>
            <p className="mt-2 text-[11px] text-amber-700">
              Možete otvoriti službeni repozitorij direktno putem linka:{' '}
              <a
                href={institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold hover:text-amber-950"
              >
                {institutionUrl}
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Loading state skeleton */}
      {loading && docs.length === 0 && (
        <div className="mt-6 py-8 text-center text-slate-500 space-y-2">
          <RefreshCw className="w-6 h-6 animate-spin text-[#003D7A] mx-auto" />
          <p className="text-xs font-medium">Analiziram službenu stranicu institucije i izdvajam linkove obrazaca...</p>
        </div>
      )}

      {/* Lista pronađenih dokumenata */}
      {filteredDocs.length > 0 && (
        <ul className="mt-4 divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden bg-slate-50/30">
          {filteredDocs.map((doc, idx) => (
            <li
              key={idx}
              className="p-3 sm:px-4 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className="text-[10px] font-mono font-bold bg-white text-[#003D7A] border-blue-200 uppercase px-1.5 py-0.5"
                  >
                    {doc.extension || 'PDF'}
                  </Badge>
                  {doc.category && (
                    <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5">
                      {doc.category}
                    </Badge>
                  )}
                  {doc.sizeKB && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      {doc.sizeKB} KB
                    </span>
                  )}
                </div>

                <p className="font-semibold text-xs sm:text-sm text-slate-800 leading-snug">
                  {doc.title}
                </p>
                <p className="text-[11px] text-slate-400 font-mono truncate max-w-md">
                  {doc.href}
                </p>
              </div>

              {/* Akcije: Preuzmi, Pregled, Kopiraj */}
              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPreviewDoc(doc)}
                  className="h-8 text-xs gap-1 border-slate-200 text-slate-700 hover:text-[#003D7A] hover:bg-slate-100"
                  title="Brzi pregled dokumenta"
                >
                  <Eye className="w-3.5 h-3.5 text-sky-600" />
                  <span className="hidden sm:inline">Pregled</span>
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(doc.href)}
                  className="h-8 w-8 p-0 border-slate-200 text-slate-600 hover:text-slate-900"
                  title="Kopiraj direktni link obrasca"
                >
                  {copiedLink === doc.href ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>

                <Button
                  asChild
                  size="sm"
                  className="h-8 px-3.5 bg-[#00A651] hover:bg-[#008f45] text-white text-xs font-semibold rounded-lg shadow-2xs gap-1.5"
                >
                  <a href={doc.href} target="_blank" rel="noopener noreferrer">
                    <Download className="w-3.5 h-3.5" />
                    <span>Preuzmi</span>
                  </a>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Quick Preview Modal Overlay */}
      {previewDoc && (
        <QuickPreviewOverlay
          form={{
            id: `doc-${encodeURIComponent(previewDoc.title).slice(0, 16)}`,
            name: previewDoc.title,
            pdfUrl: previewDoc.href,
            category: previewDoc.category || 'Opća uprava',
            sizeKB: previewDoc.sizeKB,
          }}
          municipality={{
            slug: 'institucija',
            name: institutionName,
            canton: 'BiH',
            cantonShort: 'BiH',
            entity: 'BiH',
            officialUrl: institutionUrl,
            formsCount: docs.length,
            forms: docs.map((d, i) => ({
              id: `doc-${i}`,
              name: d.title,
              pdfUrl: d.href,
              category: d.category || 'Opća uprava',
              sizeKB: d.sizeKB,
            })),
            categories: Array.from(new Set(docs.map((d) => d.category || 'Opća uprava'))),
          }}
          isOpen={!!previewDoc}
          onClose={() => setPreviewDoc(null)}
        />
      )}
    </div>
  );
}

export { InstitutionDocuments };
