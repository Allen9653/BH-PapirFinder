import React, { useEffect, useState } from 'react';

interface ReadingProgressBarProps {
  /** Optional custom container selector or ref to measure instead of full document */
  targetId?: string;
  className?: string;
  showPercentageBadge?: boolean;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  targetId,
  className = '',
  showPercentageBadge = true,
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const calculateProgress = () => {
      let currentScroll = 0;
      let totalScroll = 0;

      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          const elementHeight = targetElement.offsetHeight;
          const viewportHeight = window.innerHeight;
          
          currentScroll = Math.max(0, window.scrollY - elementTop);
          totalScroll = Math.max(1, elementHeight - viewportHeight);
        }
      }

      if (!targetId || totalScroll <= 1) {
        // Fallback to standard document scroll
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        currentScroll = window.scrollY || document.documentElement.scrollTop;
        totalScroll = scrollHeight - clientHeight;
      }

      if (totalScroll <= 0) {
        setProgress(0);
        setIsVisible(false);
        return;
      }

      const calculated = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
      setProgress(calculated);
      setIsVisible(currentScroll > 40);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [targetId]);

  const rounded = Math.round(progress);

  return (
    <>
      {/* Top subtle reading progress bar */}
      <div
        role="progressbar"
        aria-label="Progres čitanja dokumenta"
        aria-valuenow={rounded}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`fixed top-0 left-0 right-0 h-1 md:h-1.5 z-50 pointer-events-none bg-slate-900/30 backdrop-blur-xs ${className}`}
      >
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-[#5df0a8] to-teal-300 shadow-[0_0_12px_rgba(93,240,168,0.7)] transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Subtle floating percentage badge when user scrolls */}
      {showPercentageBadge && isVisible && (
        <div
          aria-hidden="true"
          className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#070b1a]/90 text-slate-200 border border-[#5df0a8]/30 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-xs font-mono tracking-tight pointer-events-none transition-all duration-300 animate-in fade-in"
        >
          <span className="w-2 h-2 rounded-full bg-[#5df0a8] animate-pulse" />
          <span className="text-[#5df0a8] font-semibold">{rounded}%</span>
          <span className="text-slate-400">pregledano</span>
        </div>
      )}
    </>
  );
};

export default ReadingProgressBar;
