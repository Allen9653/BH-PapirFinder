import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
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
  RefreshCw,
  ExternalLink,
  AlertCircle,
  Loader2,
  FileText,
  Monitor,
  Eye,
  Check,
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure pdfjs-dist worker safely
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
    // Use worker matching installed version or public CDN fallback
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;
  }
}

interface DocumentPdfViewerProps {
  fileUrl: string;
  displayName: string;
  category?: string;
  municipality?: string;
  onDownload?: () => void;
  className?: string;
}

type ViewerMode = 'canvas' | 'embed' | 'gview';

export default function DocumentPdfViewer({
  fileUrl,
  displayName,
  category,
  municipality,
  onDownload,
  className = '',
}: DocumentPdfViewerProps) {
  const { language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // PDF.js State
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.25);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState<boolean>(false);

  // View modes: 'canvas' (PDF.js direct), 'gview' (Google Docs viewer for CORS bypass), 'embed' (Native PDF embed)
  const [viewerMode, setViewerMode] = useState<ViewerMode>('canvas');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Cancellation token for active render task
  const renderTaskRef = useRef<{ cancel: () => void; promise: Promise<unknown> } | null>(null);

  // Load PDF Document via PDF.js
  const loadPdf = useCallback(async () => {
    if (!fileUrl) {
      setErrorMessage(
        language === 'en'
          ? 'No document URL provided.'
          : 'Nije specificiran URL dokumenta.'
      );
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Configure loading task with credentials and range requests
      const loadingTask = pdfjsLib.getDocument({
        url: fileUrl,
        withCredentials: false,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/cmaps/',
        cMapPacked: true,
      });

      const doc = await loadingTask.promise;
      setPdfDoc(doc);
      setTotalPages(doc.numPages);
      setCurrentPage(1);
      setViewerMode('canvas');
      setIsLoading(false);
    } catch (err: unknown) {
      console.warn('PDF.js canvas rendering failed (often due to remote CORS policy):', err);
      // Automatically fall back to Google Docs / Native Embed Viewer if CORS blocked
      setViewerMode('gview');
      setIsLoading(false);
      setErrorMessage(
        'Vanjski server općine ograničava direktno čitanje binarnih podataka (CORS). Prikazujem dokument putem sigurnog preglednika.'
      );
    }
  }, [fileUrl, language]);

  useEffect(() => {
    loadPdf();
    return () => {
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, [loadPdf]);

  // Render Current Page on Canvas
  const renderPage = useCallback(
    async (pageNumber: number) => {
      if (!pdfDoc || !canvasRef.current || viewerMode !== 'canvas') return;

      setIsRendering(true);

      // Cancel ongoing render if any
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // ignore
        }
      }

      try {
        const page = await pdfDoc.getPage(pageNumber);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const viewport = page.getViewport({ scale, rotation });

        // Adjust for device pixel ratio for super-crisp rendering
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        context.setTransform(dpr, 0, 0, dpr, 0, 0);

        const renderContext = {
          canvas,
          canvasContext: context,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;
        await renderTask.promise;
      } catch (err: unknown) {
        if ((err as { name?: string })?.name !== 'RenderingCancelledException') {
          console.error('Error rendering page:', err);
        }
      } finally {
        setIsRendering(false);
      }
    },
    [pdfDoc, scale, rotation, viewerMode]
  );

  useEffect(() => {
    if (pdfDoc && viewerMode === 'canvas') {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, scale, rotation, viewerMode, renderPage]);

  // Pagination Handlers
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Zoom Handlers
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3.0));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setScale(1.0);
  const handleFitWidth = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 48;
      // standard A4 width is approx 595pt
      const newScale = Math.max(0.6, Math.min(containerWidth / 600, 2.0));
      setScale(Number(newScale.toFixed(2)));
    }
  };

  // Rotation Handler
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Direct Print
  const handlePrint = () => {
    if (viewerMode === 'canvas' && canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${displayName} - Print</title>
              <style>
                @page { size: auto; margin: 10mm; }
                body { margin: 0; padding: 0; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
              </style>
            </head>
            <body>
              <img src="${dataUrl}" onload="window.print(); window.close();" />
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } else {
      window.open(fileUrl, '_blank');
    }
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Google Viewer URL for CORS-safe viewing
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    fileUrl
  )}&embedded=true`;

  return (
    <div
      ref={containerRef}
      className={`bg-slate-900 rounded-xl border border-slate-700 shadow-xl overflow-hidden flex flex-col ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[75vh]'
      } ${className}`}
    >
      {/* Top Controls Toolbar */}
      <div className="bg-slate-800 text-slate-200 px-4 py-2.5 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 flex-shrink-0 select-none">
        {/* Left: Document info & mode switcher */}
        <div className="flex items-center gap-2.5">
          <FileText className="h-4 w-4 text-sky-400 flex-shrink-0" />
          <div className="max-w-[240px] sm:max-w-xs truncate text-xs font-semibold text-white">
            {displayName}
          </div>
          {municipality && (
            <Badge variant="outline" className="hidden md:inline-flex text-[10px] text-sky-300 border-sky-600 bg-sky-950/50">
              {municipality}
            </Badge>
          )}

          {/* Engine Mode Switcher */}
          <div className="hidden sm:flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-700 text-[11px]">
            <button
              type="button"
              onClick={() => {
                setViewerMode('canvas');
                if (!pdfDoc) loadPdf();
              }}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                viewerMode === 'canvas'
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Renderiraj direktno u canvasu pomoću PDF.js"
            >
              PDF.js Canvas
            </button>
            <button
              type="button"
              onClick={() => setViewerMode('gview')}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                viewerMode === 'gview'
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Siguran preglednik za servere sa CORS restrikcijama"
            >
              Google Docs Viewer
            </button>
            <button
              type="button"
              onClick={() => setViewerMode('embed')}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                viewerMode === 'embed'
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Izvorni preglednik preglednika (Native)"
            >
              Native
            </button>
          </div>
        </div>

        {/* Center: Page Controls (for canvas mode) */}
        {viewerMode === 'canvas' && totalPages > 0 && (
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-700">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage <= 1 || isRendering}
              className="h-6 w-6 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
              title="Prethodna stranica"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs font-mono text-slate-300 px-1">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages || isRendering}
              className="h-6 w-6 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
              title="Sljedeća stranica"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Right: Zoom, Rotate, Print, Download, Fullscreen */}
        <div className="flex items-center gap-1">
          {viewerMode === 'canvas' && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
                className="h-7 w-7 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
                title="Smanji (Zoom Out)"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </Button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="text-[11px] font-mono text-slate-300 px-1 hover:text-white"
                title="Poništi zoom (100%)"
              >
                {Math.round(scale * 100)}%
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                disabled={scale >= 3.0}
                className="h-7 w-7 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
                title="Povećaj (Zoom In)"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFitWidth}
                className="h-7 px-2 text-[11px] text-slate-300 hover:text-white hover:bg-slate-700"
                title="Prilagodi širini ekrana"
              >
                Fit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRotate}
                className="h-7 w-7 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
                title="Rotiraj za 90°"
              >
                <RotateCw className="h-3.5 w-3.5" />
              </Button>
            </>
          )}

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrint}
            className="h-7 w-7 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
            title="Isprintaj dokument"
          >
            <Printer className="h-3.5 w-3.5" />
          </Button>

          {onDownload ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDownload}
              className="h-7 w-7 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
              title="Preuzmi PDF"
            >
              <Download className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <a
              href={fileUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="h-7 w-7 inline-flex items-center justify-center rounded-md text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Otvori / Preuzmi PDF"
            >
              <Download className="h-3.5 w-3.5" />
            </a>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="h-7 w-7 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
            title={isFullscreen ? 'Izađi iz cijelog ekrana' : 'Cijeli ekran'}
          >
            {isFullscreen ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      </div>

      {/* Info Notice when CORS fallback is active */}
      {errorMessage && viewerMode !== 'canvas' && (
        <div className="bg-amber-950/80 border-b border-amber-800 text-amber-200 px-4 py-1.5 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setViewerMode('canvas')}
            className="text-[11px] underline hover:text-white ml-2 flex-shrink-0"
          >
            Pokušaj PDF.js ponovo
          </button>
        </div>
      )}

      {/* Main Document Content Area */}
      <div className="flex-1 bg-slate-950 overflow-auto flex items-center justify-center p-4 relative">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="text-center text-slate-400 space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-sky-500 mx-auto" />
            <p className="text-xs">Učitavanje PDF dokumenta...</p>
          </div>
        )}

        {/* MODE 1: PDF.js Canvas Rendering */}
        {viewerMode === 'canvas' && !isLoading && (
          <div className="relative shadow-2xl transition-transform duration-150">
            {isRendering && (
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center z-10 rounded">
                <Loader2 className="h-6 w-6 text-sky-400 animate-spin" />
              </div>
            )}
            <canvas
              ref={canvasRef}
              className="rounded bg-white max-w-full shadow-lg block"
            />
          </div>
        )}

        {/* MODE 2: Google Docs Viewer for CORS-Safe Fallback */}
        {viewerMode === 'gview' && (
          <div className="w-full h-full bg-white rounded-lg overflow-hidden flex flex-col">
            <iframe
              src={googleViewerUrl}
              className="w-full h-full border-0"
              title={`${displayName} - PDF Preview`}
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        )}

        {/* MODE 3: Native Object / Embed Viewer */}
        {viewerMode === 'embed' && (
          <div className="w-full h-full bg-slate-800 rounded-lg overflow-hidden flex flex-col">
            <object
              data={fileUrl}
              type="application/pdf"
              className="w-full h-full border-0"
            >
              <div className="flex flex-col items-center justify-center h-full p-6 text-center text-slate-300">
                <FileText className="h-12 w-12 text-slate-500 mb-2" />
                <p className="text-sm font-medium mb-1">
                  Izvorni PDF preglednik nije podržan u ovom pregledniku.
                </p>
                <p className="text-xs text-slate-400 mb-4 max-w-md">
                  Možete preuzeti dokument ili koristiti Google Docs preglednik.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setViewerMode('gview')}
                    className="bg-sky-600 hover:bg-sky-700 text-white text-xs"
                  >
                    Otvori u Google Viewer-u
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(fileUrl, '_blank')}
                    className="text-xs"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Otvori u novom tabu
                  </Button>
                </div>
              </div>
            </object>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-1.5 text-[11px] text-slate-400 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          <span>Direktan pregled bez potrebe za preuzimanjem</span>
        </div>
        <div className="flex items-center gap-3">
          <span>
            Prikaz: {viewerMode === 'canvas' ? 'PDF.js Canvas' : viewerMode === 'gview' ? 'Google Docs Viewer' : 'Native Object'}
          </span>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 inline-flex items-center gap-1"
          >
            <span>Izvorni URL</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
