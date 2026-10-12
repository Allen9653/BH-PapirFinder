import React, { useState, useEffect, useRef } from 'react';
import {
  Newspaper,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Clock,
  Building2,
  Share2,
  Check,
  Sparkles,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { INSTITUTION_NEWS, InstitutionNewsArticle } from '@/data/institution-news';

export const InstitutionNewsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<InstitutionNewsArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Sve');
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const categories = ['Sve', 'IDDEEA', 'Porezna uprava', 'E-Uprava', 'Javna uprava', 'Privreda'];

  const filteredNews = selectedCategory === 'Sve'
    ? INSTITUTION_NEWS
    : INSTITUTION_NEWS.filter(article => article.category === selectedCategory);

  // Auto-scroll logic (every 5 seconds when not paused)
  useEffect(() => {
    if (isPaused || filteredNews.length <= 1) return;

    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredNews.length);
    }, 5000);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isPaused, filteredNews.length, currentIndex]);

  // Reset index if category filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const handlePrev = () => {
    if (filteredNews.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredNews.length) % filteredNews.length);
  };

  const handleNext = () => {
    if (filteredNews.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredNews.length);
  };

  const handleShare = async (article: InstitutionNewsArticle) => {
    const shareData = {
      title: article.title,
      text: `${article.title} - ${article.institution}`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(`${article.title}\n${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-y border-slate-200">
      <div className="container px-4 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#003D7A] border border-blue-200 mb-2">
              <Newspaper className="w-3.5 h-3.5 text-[#003D7A]" />
              Zvanična Saopštenja & Propisi
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Vijesti i obavještenja institucija u BiH
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Pratite najnovije odluke, uvođenje novih elektronskih usluga, rokove za predaju obrazaca i reformske korake javne uprave.
            </p>
          </div>

          {/* Category Filter Chips & Carousel Nav Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="h-9 w-9 rounded-full border-slate-300 hover:bg-slate-100 text-slate-700 shadow-sm"
                aria-label="Prethodna vijest"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="h-9 w-9 rounded-full border-slate-300 hover:bg-slate-100 text-slate-700 shadow-sm"
                aria-label="Sljedeća vijest"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6 pb-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#003D7A] text-white shadow'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {filteredNews.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
              Nema vijesti u odabranoj kategoriji.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Desktop displays 3 visible cards starting from currentIndex; Mobile displays current card */}
              {[0, 1, 2].map((offset) => {
                const itemIndex = (currentIndex + offset) % filteredNews.length;
                const article = filteredNews[itemIndex];
                const isMobileVisible = offset === 0;

                return (
                  <Card
                    key={`${article.id}-${offset}`}
                    className={`overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-[#003D7A]/40 transition-all duration-300 flex flex-col bg-white group cursor-pointer ${
                      !isMobileVisible ? 'hidden md:flex' : 'flex'
                    }`}
                    onClick={() => setSelectedArticle(article)}
                  >
                    {/* Image Header with Institution Badge */}
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <Badge className="bg-[#003D7A] text-white hover:bg-[#003D7A] text-[11px] font-semibold shadow">
                          <Building2 className="w-3 h-3 mr-1" />
                          {article.institution}
                        </Badge>
                        {article.isImportant && (
                          <Badge className="bg-amber-500 text-white hover:bg-amber-500 text-[11px] font-semibold shadow">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Važno
                          </Badge>
                        )}
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="flex items-center gap-1 opacity-90">
                          <Clock className="w-3.5 h-3.5" />
                          {article.date}
                        </span>
                        <span className="opacity-90">{article.readTime}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <CardContent className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-semibold text-[#00A651] mb-1.5">
                          {article.categoryLabel}
                        </div>
                        <h3 className="font-bold text-base text-slate-900 group-hover:text-[#003D7A] transition-colors line-clamp-2 mb-2 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="inline-flex items-center text-xs font-semibold text-[#003D7A] group-hover:translate-x-0.5 transition-transform">
                          Pročitaj saopštenje
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Klik za detalje
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Pagination Indicators */}
          <div className="flex justify-center items-center gap-1.5 mt-6">
            {filteredNews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx
                    ? 'w-6 bg-[#003D7A]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Idi na članak ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full Article Reader Dialog */}
      <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
        {selectedArticle && (
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-3 border-b">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge className="bg-[#003D7A] text-white">
                  <Building2 className="w-3 h-3 mr-1" />
                  {selectedArticle.institution}
                </Badge>
                <Badge variant="outline" className="border-slate-300 text-slate-700">
                  {selectedArticle.categoryLabel}
                </Badge>
                <span className="text-xs text-slate-500 flex items-center gap-1 ml-auto">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedArticle.date} • {selectedArticle.readTime}
                </span>
              </div>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {selectedArticle.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-600 pt-1">
                Zvanično saopštenje i smjernice za građane, preduzetnike i dijasporu
              </DialogDescription>
            </DialogHeader>

            {/* Article Image Banner */}
            <div className="relative h-56 rounded-xl overflow-hidden my-2">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                Izvor: {selectedArticle.institution}
              </div>
            </div>

            {/* Key Highlights Box */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 my-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#003D7A] mb-2 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5" />
                Ključne tačke za građane:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-800">
                {selectedArticle.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#00A651] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Body Paragraphs */}
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed py-2">
              {selectedArticle.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Footer with Actions */}
            <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare(selectedArticle)}
                className="w-full sm:w-auto text-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1.5 text-green-600" />
                    Link kopiran!
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 mr-1.5" />
                    Podijeli saopštenje
                  </>
                )}
              </Button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={selectedArticle.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="sm"
                    className="w-full bg-[#003D7A] hover:bg-[#002B56] text-white text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                    Posjeti zvaničnu stranicu ({selectedArticle.institution})
                  </Button>
                </a>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default InstitutionNewsCarousel;
