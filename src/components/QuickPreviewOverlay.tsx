import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Printer,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  FileText,
  ShieldCheck,
  Eye,
  Loader2,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { safeOpenExternal } from '@/lib/security';

interface QuickPreviewOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
  displayName: string;
  originalName: string;
  category: string;
  municipalityName?: string;
  cantonShort?: string;
  sizeKB?: number;
  fileUrl: string;
  onDirectPrint?: () => void;
}

export const QuickPreviewOverlay: React.FC<QuickPreviewOverlayProps> = ({
  isOpen,
  onClose,
  formId,
  displayName,
  originalName,
  category,
  municipalityName,
  cantonShort,
  sizeKB,
  fileUrl,
  onDirectPrint,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewerMode, setViewerMode] = useState<'google' | 'direct'>('google');
  const [isLoading, setIsLoading] = useState(true);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const googlePreviewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
    fileUrl,
  )}&embedded=true`;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 20, 200));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 20, 60));
  const handleResetZoom = () => setZoomLevel(100);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-preview-title"
      className="fixed inset-0 z-50 bg-[#04060f]/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-200"
    >
      {/* Top Interactive Toolbar */}
      <header className="h-16 px-4 sm:px-6 bg-[#070b1a] border-b border-white/10 flex items-center justify-between gap-4 shrink-0 shadow-lg">
        {/* Document Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#5df0a8]/10 border border-[#5df0a8]/30 flex items-center justify-center shrink-0">
            <Eye className="w-5 h-5 text-[#5df0a8]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#5df0a8]/20 text-[#5df0a8] font-bold">
                Quick Preview
              </span>
              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                {municipalityName} {cantonShort && `(${cantonShort})`}
              </span>
              <span className="text-[10px] font-mono text-slate-400 hidden md:inline">
                • {category}
              </span>
            </div>
            <h2
              id="quick-preview-title"
              className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md lg:max-w-xl"
              title={displayName}
            >
              {displayName}
            </h2>
          </div>
        </div>

        {/* Central Controls: Zoom & Mode */}
        <div className="hidden lg:flex items-center gap-2 bg-[#0b142d] px-3 py-1.5 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 60}
            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Smanji zoom"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="text-xs font-mono font-bold text-[#5df0a8] px-2 hover:underline"
            title="Resetuj zoom na 100%"
          >
            {zoomLevel}%
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 200}
            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Povećaj zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-white/10 mx-1" />

          {/* Mode toggle */}
          <div className="flex items-center gap-1 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setViewerMode('google')}
              className={`px-2 py-0.5 rounded transition-colors ${
                viewerMode === 'google'
                  ? 'bg-[#5df0a8] text-[#04060f] font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Google Preglednik
            </button>
            <button
              type="button"
              onClick={() => setViewerMode('direct')}
              className={`px-2 py-0.5 rounded transition-colors ${
                viewerMode === 'direct'
                  ? 'bg-[#5df0a8] text-[#04060f] font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Direktni PDF
            </button>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {onDirectPrint && (
            <Button
              size="sm"
              variant="outline"
              onClick={onDirectPrint}
              className="h-9 px-3 text-xs border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hidden sm:flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-slate-300" />
              <span>Print</span>
            </Button>
          )}

          <Button
            size="sm"
            onClick={() => safeOpenExternal(fileUrl)}
            className="h-9 px-3.5 text-xs bg-[#5df0a8] hover:bg-[#4be096] text-[#04060f] font-bold shadow-[0_0_12px_rgba(93,240,168,0.3)] hidden sm:flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Preuzmi PDF</span>
          </Button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors hidden md:block"
            title={isFullscreen ? 'Izađi iz punog ekrana' : 'Puni ekran'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Zatvori brzi pregled (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Interactive PDF Container */}
      <main className="flex-1 relative overflow-auto p-2 sm:p-4 md:p-6 flex items-center justify-center bg-[#03050c]">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#03050c]/80 z-20 pointer-events-none">
            <Loader2 className="w-8 h-8 text-[#5df0a8] animate-spin" />
            <p className="text-xs font-mono text-slate-400 tracking-wide">
              Učitavanje interaktivnog prikaza obrasca...
            </p>
          </div>
        )}

        <div
          className="transition-transform duration-150 ease-out shadow-2xl rounded-xl overflow-hidden bg-white w-full max-w-5xl h-full flex flex-col border border-white/10"
          style={{
            transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : undefined,
            transformOrigin: 'top center',
          }}
        >
          {viewerMode === 'google' ? (
            <iframe
              src={googlePreviewUrl}
              className="w-full h-full border-0"
              title={`Quick Preview: ${displayName}`}
              onLoad={() => setIsLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          ) : (
            <object
              data={fileUrl}
              type="application/pdf"
              className="w-full h-full border-0"
              onLoad={() => setIsLoading(false)}
            >
              <div className="p-8 text-center text-slate-800 flex flex-col items-center justify-center h-full">
                <FileText className="w-16 h-16 text-slate-400 mb-3" />
                <h3 className="text-lg font-bold">Direktni PDF Stream</h3>
                <p className="text-sm text-slate-600 mb-4 max-w-md">
                  Vaš preglednik podržava ugrađeni Google Docs prikaz ili možete preuzeti originalni dokument.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setViewerMode('google')}
                    className="bg-[#003D7A] text-white"
                  >
                    Otvori Google Preglednik
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => safeOpenExternal(fileUrl)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Preuzmi
                  </Button>
                </div>
              </div>
            </object>
          )}
        </div>
      </main>

      {/* Bottom Footer Info Bar */}
      <footer className="h-10 px-4 sm:px-6 bg-[#070b1a] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#5df0a8]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Službeni administrativni obrazac</span>
          </span>
          {sizeKB && <span>• {sizeKB} KB PDF</span>}
        </div>

        <div className="flex items-center gap-2">
          <span>Pritisnite <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">Esc</kbd> za izlaz</span>
        </div>
      </footer>
    </div>
  );
};

export default QuickPreviewOverlay;
