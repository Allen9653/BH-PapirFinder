import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CornerUpLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface UniversalBackButtonProps {
  fallbackPath?: string;
  className?: string;
  variant?: 'pill' | 'minimal' | 'command';
  label?: string;
  showShortcut?: boolean;
}

export const UniversalBackButton: React.FC<UniversalBackButtonProps> = ({
  fallbackPath = '/',
  className = '',
  variant = 'pill',
  label,
  showShortcut = true,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  // Localized default label
  const defaultLabel = (() => {
    switch (language) {
      case 'en':
        return 'Back';
      case 'de':
        return 'Zurück';
      case 'tr':
        return 'Geri';
      default:
        return 'Nazad';
    }
  })();

  const displayLabel = label || defaultLabel;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  // Keyboard shortcut: Esc or Alt+ArrowLeft to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'Escape' || (e.altKey && e.key === 'ArrowLeft')) {
        e.preventDefault();
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, fallbackPath]);

  // Don't show redundant back button on root if not needed
  if (location.pathname === '/' && !className.includes('force-show')) {
    return null;
  }

  if (variant === 'minimal') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleBack}
            type="button"
            className={`inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-[#5df0a8] transition-colors focus:outline-none ${className}`}
            aria-label={`${displayLabel} (Esc)`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{displayLabel}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-[#0b1226] text-slate-200 border border-white/10 text-xs">
          {displayLabel} <kbd className="ml-1 px-1 py-0.5 text-[10px] bg-white/10 rounded">Esc</kbd>
        </TooltipContent>
      </Tooltip>
    );
  }

  if (variant === 'command') {
    return (
      <button
        onClick={handleBack}
        type="button"
        className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0b1226]/80 hover:bg-[#121c3d] border border-white/10 hover:border-[#5df0a8]/50 text-slate-300 hover:text-white transition-all backdrop-blur-md shadow-sm ${className}`}
        aria-label={`${displayLabel} (Esc)`}
      >
        <div className="w-5 h-5 rounded-md bg-white/5 group-hover:bg-[#5df0a8]/20 flex items-center justify-center transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 text-[#5df0a8]" />
        </div>
        <span className="text-xs font-medium">{displayLabel}</span>
        {showShortcut && (
          <span className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 rounded border border-white/5">
            Esc
          </span>
        )}
      </button>
    );
  }

  // Default 'pill' variant
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleBack}
          type="button"
          variant="outline"
          size="sm"
          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium bg-[#0b1226]/85 hover:bg-[#132047] text-slate-200 hover:text-[#5df0a8] border border-white/10 hover:border-[#5df0a8]/40 shadow-[0_2px_12px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all hover:shadow-[0_0_15px_rgba(93,240,168,0.25)] focus-visible:ring-1 focus-visible:ring-[#5df0a8] ${className}`}
          aria-label={`${displayLabel} (Esc)`}
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>{displayLabel}</span>
          {showShortcut && (
            <span className="hidden sm:inline-flex items-center text-[10px] text-slate-400 font-mono bg-white/5 px-1 rounded ml-0.5">
              Esc
            </span>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="bg-[#0b1226] text-slate-200 border border-white/10 text-xs">
        {displayLabel} <kbd className="ml-1 px-1 py-0.5 text-[10px] bg-white/10 rounded">Esc</kbd> ili <kbd className="px-1 py-0.5 text-[10px] bg-white/10 rounded">Alt+←</kbd>
      </TooltipContent>
    </Tooltip>
  );
};

export default UniversalBackButton;
