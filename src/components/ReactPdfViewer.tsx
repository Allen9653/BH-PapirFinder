import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Minimize2,
  Printer,
  Download,
  ExternalLink,
  AlertTriangle,
  Loader2,
  FileText,
  RefreshCw,
  Eye,
  Check,
  Copy,
  Layers,
} from 'lucide-react';
import { toast } from 'sonner';

// Configure PDF.js worker safely using public unpkg CDN matching pdfjs version
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

export interface ReactPdfViewerProps {
  fileUrl: string;
  displayName: string;
  category?: string;
  municipality?: string;
  fileSizeKB?: number;
  onDownload?: () => void;
  onClose?: () => void;
  className?: string;
  initialScale?: number;
}

type ViewerMode = 'react-pdf' | 'gview' | 'embed';

export default function ReactPdfViewer({
  fileUrl,
  displayName,
  category,
  municipality,
  fileSizeKB,
  onDownload,
  onClose,
  className = '',
  initialScale = 1.0,
}: ReactPdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(initialScale);
  const [rotation, setRotation] = useState<number>(0);
  const [pageWidth, setPageWidth] = useState<number | undefined>(undefined);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewerMode, setViewerMode] = useState<ViewerMode>('react-pdf');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [pdfLoadError, setPdfLoadError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const viewerWrapperRef = useRef<HTMLDivElement>(null);

  // Auto-fit to container width on mount and resize
  const updateContainerWidth = useCallback(() => {
    if (containerRef.current) {
      const containerW = containerRef.current.clientWidth - 48; // padding
      if (containerW > 300) {
        setPageWidth(Math.min(containerW, 900));
      }
    }
  }, []);

  useEffect(() => {
    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, [updateContainerWidth]);

  // Reset page when URL changes
  useEffect(() => {
    setPageNumber(1);
    setPdfLoadError(null);
  }, [fileUrl]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (numPages && pageNumber < numPages) {
          e.preventDefault();
          setPageNumber((p) => p + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (pageNumber > 1) {
          e.preventDefault();
          setPageNumber((p) => p - 1);
        }
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setScale((s) => Math.min(s + 0.15, 2.5));
      } else if (e.key === '-') {
        e.preventDefault();
        setScale((s) => Math.max(s - 0.15, 0.5));
      } else if (e.key === '0') {
        e.preventDefault();
        setScale(1.0);
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setRotation((r) => (r + 90) % 360);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [numPages, pageNumber]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPdfLoadError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.warn('React-PDF load error:', error);
    // Many BiH municipal web servers block cross-origin requests (CORS)
    const isCors = error.message?.toLowerCase().includes('failed to fetch') ||
      error.message?.toLowerCase().includes('network') ||
      error.message?.toLowerCase().includes('cors');

    if (isCors) {
      setPdfLoadError(
        'Server institucije ograničava direktan pristup dokumentu unutar preglednika (CORS). Možete koristiti ugrađeni Google Docs prikaz ili preuzeti originalni dokument.'
      );
    } else {
      setPdfLoadError(error.message || 'Neuspjelo učitavanje PDF dokumenta.');
    }
  }

  const handlePrint = () => {
    if (viewerMode === 'react-pdf') {
      window.print();
    } else {
      const printWindow = window.open(fileUrl, '_blank');
      printWindow?.focus();
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
      return;
    }
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = displayName.endsWith('.pdf') ? displayName : `${displayName}.pdf`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('Pokrenuto preuzimanje dokumenta.');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fileUrl);
      setIsCopied(true);
      toast.success('Link dokumenta kopiran u međuspremnik!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error('Nije uspjelo kopiranje linka.');
    }
  };

  const googleDocsViewerUrl = `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(fileUrl)}`;

  return (
    <div
      ref={viewerWrapperRef}
      className={`flex flex-col bg-slate-900 border border-slate-700/80 rounded-xl overflow-hidden shadow-2xl transition-all duration-200 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'w-full'
      } ${className}`}
    >
      {/* Top Controls Header Bar */}
      <div className="bg-slate-950/90 backdrop-blur border-b border-slate-800 px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 z-10 shrink-0">
        {/* Document Info */}
        <div className="flex items-center gap-2 min-w-0 mr-2">
          <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {displayName}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              {municipality && (
                <span className="truncate max-w-[120px] font-medium text-slate-300">
                  {municipality}
                </span>
              )}
              {category && (
                <>
                  <span className="text-slate-600">•</span>
                  <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-slate-700 text-slate-300">
                    {category}
                  </Badge>
                </>
              )}
              {fileSizeKB && (
                <>
                  <span className="text-slate-600">•</span>
                  <span>{Math.round(fileSizeKB)} KB</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
          <button
            type="button"
            onClick={() => {
              setViewerMode('react-pdf');
              setPdfLoadError(null);
            }}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 font-medium ${
              viewerMode === 'react-pdf'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Izvorni react-pdf preglednik"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">React PDF</span>
          </button>
          <button
            type="button"
            onClick={() => setViewerMode('gview')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 font-medium ${
              viewerMode === 'gview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Google Docs ugrađeni preglednik (zaobilazi CORS restrikcije)"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Google Docs</span>
          </button>
          <button
            type="button"
            onClick={() => setViewerMode('embed')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 font-medium ${
              viewerMode === 'embed'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Preglednik ugrađen u web preglednik (Object/Embed)"
          >
            <span className="hidden sm:inline">Ugrađeni</span>
            <span className="sm:hidden">Embed</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 ml-auto">
          {viewerMode === 'react-pdf' && !pdfLoadError && (
            <>
              {/* Page navigation */}
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs mr-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
                  disabled={pageNumber <= 1}
                  className="h-7 w-7 text-slate-300 hover:text-white disabled:opacity-30"
                  title="Prethodna stranica (Strelica lijevo)"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Button>
                <span className="px-2 text-xs font-mono text-slate-300 select-none">
                  {pageNumber} / {numPages || '...'}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setPageNumber((p) => (numPages ? Math.min(p + 1, numPages) : p + 1))}
                  disabled={Boolean(numPages && pageNumber >= numPages)}
                  className="h-7 w-7 text-slate-300 hover:text-white disabled:opacity-30"
                  title="Sljedeća stranica (Strelica desno)"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Zoom controls */}
              <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setScale((s) => Math.max(s - 0.15, 0.5))}
                  className="h-7 w-7 text-slate-300 hover:text-white"
                  title="Umanji prikaz (-)"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </Button>
                <button
                  type="button"
                  onClick={() => setScale(1.0)}
                  className="px-1.5 text-[11px] font-mono text-slate-300 hover:text-white"
                  title="Resetuj zum (100%)"
                >
                  {Math.round(scale * 100)}%
                </button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setScale((s) => Math.min(s + 0.15, 2.5))}
                  className="h-7 w-7 text-slate-300 hover:text-white"
                  title="Povećaj prikaz (+)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Rotate */}
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="h-8 w-8 text-slate-300 hover:text-white hidden sm:flex"
                title="Rotiraj za 90° (R)"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </Button>
            </>
          )}

          {/* Print */}
          <Button
            size="icon"
            variant="ghost"
            onClick={handlePrint}
            className="h-8 w-8 text-slate-300 hover:text-white hidden sm:flex"
            title="Štampaj dokument"
          >
            <Printer className="w-3.5 h-3.5" />
          </Button>

          {/* Copy link */}
          <Button
            size="icon"
            variant="ghost"
            onClick={handleCopyLink}
            className="h-8 w-8 text-slate-300 hover:text-white hidden sm:flex"
            title="Kopiraj link dokumenta"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </Button>

          {/* Open original external */}
          <Button
            size="icon"
            variant="ghost"
            asChild
            className="h-8 w-8 text-slate-300 hover:text-white"
            title="Otvori originalni dokument u novom tabu"
          >
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>

          {/* Download button */}
          <Button
            size="sm"
            onClick={handleDownload}
            className="h-8 px-3 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preuzmi PDF</span>
          </Button>

          {/* Fullscreen toggle */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsFullscreen((f) => !f)}
            className="h-8 w-8 text-slate-300 hover:text-white hidden md:flex"
            title={isFullscreen ? 'Izađi iz punog ekrana' : 'Puni ekran'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </Button>

          {/* Close button if provided */}
          {onClose && (
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-red-500/20"
              title="Zatvori preglednik"
            >
              ✕
            </Button>
          )}
        </div>
      </div>

      {/* Main Document Content Canvas Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-slate-950 p-4 sm:p-6 flex items-start justify-center min-h-[500px] max-h-[78vh]"
      >
        {viewerMode === 'react-pdf' && (
          <div className="flex flex-col items-center w-full">
            {pdfLoadError ? (
              <div className="max-w-md p-6 bg-slate-900 border border-amber-500/30 rounded-xl text-center my-8 shadow-xl">
                <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                <h4 className="text-base font-semibold text-white mb-2">
                  Ograničen direktan prikaz
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {pdfLoadError}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button
                    size="sm"
                    onClick={() => {
                      setViewerMode('gview');
                      setPdfLoadError(null);
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs"
                  >
                    <Layers className="w-3.5 h-3.5 mr-1.5" />
                    Prikaži preko Google Docs
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDownload}
                    className="border-slate-700 text-slate-200 text-xs"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    Preuzmi direktno
                  </Button>
                </div>
              </div>
            ) : (
              <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex flex-col items-center justify-center p-12 text-slate-400 gap-3 my-12">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    <p className="text-sm font-medium">Učitavanje dokumenta putem react-pdf...</p>
                  </div>
                }
                error={
                  <div className="p-6 text-center text-slate-400">
                    <p className="text-sm">Dokument se ne može direktno prikazati.</p>
                  </div>
                }
                className="flex flex-col items-center shadow-2xl transition-transform duration-150"
              >
                <div
                  className="rounded-lg overflow-hidden shadow-2xl bg-white border border-slate-700/50"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: 'transform 0.2s ease-in-out',
                  }}
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    width={pageWidth}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    loading={
                      <div className="w-[600px] h-[800px] bg-slate-900/50 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                      </div>
                    }
                  />
                </div>
              </Document>
            )}

            {/* Bottom Floating Quick Navigator for React-PDF */}
            {numPages && numPages > 1 && !pdfLoadError && (
              <div className="sticky bottom-3 mt-4 bg-slate-900/95 backdrop-blur border border-slate-700 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl z-10 text-xs text-slate-300">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setPageNumber(1)}
                  disabled={pageNumber <= 1}
                  className="h-6 w-6 text-slate-300 hover:text-white disabled:opacity-30"
                  title="Prva stranica"
                >
                  «
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
                  disabled={pageNumber <= 1}
                  className="h-6 w-6 text-slate-300 hover:text-white disabled:opacity-30"
                  title="Prethodna stranica"
                >
                  ‹
                </Button>
                <span className="px-2 font-mono">
                  Stranica <span className="text-white font-bold">{pageNumber}</span> od {numPages}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
                  disabled={pageNumber >= numPages}
                  className="h-6 w-6 text-slate-300 hover:text-white disabled:opacity-30"
                  title="Sljedeća stranica"
                >
                  ›
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setPageNumber(numPages)}
                  disabled={pageNumber >= numPages}
                  className="h-6 w-6 text-slate-300 hover:text-white disabled:opacity-30"
                  title="Zadnja stranica"
                >
                  »
                </Button>
              </div>
            )}
          </div>
        )}

        {viewerMode === 'gview' && (
          <div className="w-full h-full min-h-[600px] flex flex-col rounded-lg overflow-hidden border border-slate-800 bg-white">
            <iframe
              src={googleDocsViewerUrl}
              className="w-full h-full min-h-[600px] border-0"
              title={`Google Docs Preview: ${displayName}`}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
        )}

        {viewerMode === 'embed' && (
          <div className="w-full h-full min-h-[600px] flex flex-col rounded-lg overflow-hidden border border-slate-800 bg-white">
            <object
              data={fileUrl}
              type="application/pdf"
              className="w-full h-full min-h-[600px] border-0"
            >
              <div className="p-8 text-center text-slate-800 flex flex-col items-center justify-center h-full">
                <FileText className="w-12 h-12 text-slate-400 mb-2" />
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  Ugrađeni preglednik nije dostupan
                </h4>
                <p className="text-xs text-slate-600 mb-4 max-w-sm">
                  Vaš preglednik ne podržava direktni prikaz ovog formata. Možete preći na React PDF ili preuzeti fajl.
                </p>
                <Button
                  size="sm"
                  onClick={handleDownload}
                  className="bg-blue-600 hover:bg-blue-500 text-white"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Preuzmi originalni dokument
                </Button>
              </div>
            </object>
          </div>
        )}
      </div>

      {/* Footer Info & Instructions */}
      <div className="bg-slate-950 border-t border-slate-800/80 px-4 py-2 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Interaktivni preglednik dokumenata (react-pdf)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-slate-500">
            Prečice: <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300">←</kbd> <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300">→</kbd> stranice, <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300">+</kbd> <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300">-</kbd> zum, <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300">R</kbd> rotacija
          </span>
          <Button
            size="sm"
            variant="link"
            asChild
            className="h-auto p-0 text-[11px] text-blue-400 hover:text-blue-300"
          >
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              Otvori u punom prozoru ↗
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
