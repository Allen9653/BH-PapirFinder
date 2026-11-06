import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Printer,
  Maximize2,
  Minimize2,
  FileText,
  Eye,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { safeOpenExternal } from '@/lib/security';
import ReactPdfViewer from '@/components/ReactPdfViewer';

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
  displayName,
  category,
  municipalityName,
  cantonShort,
  sizeKB,
  fileUrl,
  onDirectPrint,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewerMode, setViewerMode] = useState<'react-pdf' | 'google' | 'direct'>('react-pdf');

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

        {/* Central Controls: Mode switcher */}
        <div className="hidden sm:flex items-center gap-1 bg-[#0b142d] px-2 py-1 rounded-xl border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setViewerMode('react-pdf')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-medium flex items-center gap-1.5 ${
              viewerMode === 'react-pdf'
                ? 'bg-[#5df0a8] text-[#04060f] font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>React PDF</span>
          </button>
          <button
            type="button"
            onClick={() => setViewerMode('google')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-medium flex items-center gap-1.5 ${
              viewerMode === 'google'
                ? 'bg-[#5df0a8] text-[#04060f] font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Google Docs</span>
          </button>
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
        {viewerMode === 'react-pdf' ? (
          <div className="w-full max-w-5xl h-full flex flex-col">
            <ReactPdfViewer
              fileUrl={fileUrl}
              displayName={displayName}
              category={category}
              municipality={municipalityName}
              fileSizeKB={sizeKB}
              onClose={onClose}
              className="h-full"
            />
          </div>
        ) : (
          <div className="shadow-2xl rounded-xl overflow-hidden bg-white w-full max-w-5xl h-full flex flex-col border border-white/10">
            <iframe
              src={googlePreviewUrl}
              className="w-full h-full border-0"
              title={`Quick Preview: ${displayName}`}
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        )}
      </main>

      {/* Bottom Footer Info Bar */}
      <footer className="h-10 px-4 sm:px-6 bg-[#070b1a] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Verificiran administrativni dokument (react-pdf)
          </span>
          {sizeKB && <span>{Math.round(sizeKB)} KB</span>}
        </div>
        <div className="flex items-center gap-2">
          <span>Pritisnite ESC za izlaz</span>
        </div>
      </footer>
    </div>
  );
};

export default QuickPreviewOverlay;
