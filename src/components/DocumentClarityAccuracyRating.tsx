import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  getDocumentRatings,
  submitDocumentRating,
  hasUserRatedDocument,
  DocumentRatingStats,
} from '@/lib/document-ratings-service';
import { toast } from 'sonner';

interface DocumentClarityAccuracyRatingProps {
  formId: string;
  formName: string;
  category?: string;
  municipalityName?: string;
  className?: string;
  onRatingUpdated?: (stats: DocumentRatingStats) => void;
}

const CLARITY_LABELS: Record<number, string> = {
  1: 'Veoma nejasno i konfuzno',
  2: 'Teško razumljivo',
  3: 'Prihvatljivo jasna forma',
  4: 'Vrlo jasno i razumljivo',
  5: 'Kristalno jasno i pregledno',
};

const ACCURACY_LABELS: Record<number, string> = {
  1: 'Zastarjeli propisi / netačno',
  2: 'Djelimično tačni podaci',
  3: 'Uglavnom tačno',
  4: 'Ažurno i usklađeno',
  5: '100% važeće i tačno na šalteru',
};

export const DocumentClarityAccuracyRating: React.FC<DocumentClarityAccuracyRatingProps> = ({
  formId,
  formName,
  category,
  municipalityName,
  className = '',
  onRatingUpdated,
}) => {
  const [stats, setStats] = useState<DocumentRatingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [clarityRating, setClarityRating] = useState<number>(5);
  const [accuracyRating, setAccuracyRating] = useState<number>(5);
  const [hoverClarity, setHoverClarity] = useState<number | null>(null);
  const [hoverAccuracy, setHoverAccuracy] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<{ clarity: number; accuracy: number } | null>(null);

  useEffect(() => {
    loadStats();
    checkUserRated();
  }, [formId]);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await getDocumentRatings(formId, formName);
      setStats(data);
      if (onRatingUpdated) onRatingUpdated(data);
    } catch (err) {
      console.error('Greška pri učitavanju ocjena:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkUserRated = () => {
    const existing = hasUserRatedDocument(formId);
    if (existing !== null) {
      setHasRated(true);
      try {
        const savedRaw = localStorage.getItem(`bh_papirfinder_user_score_${formId}`);
        if (savedRaw) {
          setUserScore(JSON.parse(savedRaw));
        } else {
          setUserScore({ clarity: existing, accuracy: existing });
        }
      } catch {
        setUserScore({ clarity: existing, accuracy: existing });
      }
    } else {
      setHasRated(false);
      setUserScore(null);
    }
  };

  const handleSubmitRating = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (clarityRating < 1 || accuracyRating < 1) {
      toast.error('Molimo odaberite ocjenu za jasnoću i tačnost.');
      return;
    }

    setIsSubmitting(true);
    try {
      const overall = Math.round(((clarityRating + accuracyRating) / 2) * 10) / 10;
      const res = await submitDocumentRating({
        formId,
        formName,
        overallRating: Math.round(overall),
        qualityRating: clarityRating,
        accuracyRating: accuracyRating,
        authorName: 'Građanin',
        comment: `Ocjena jasnoće: ${clarityRating}/5, ocjena tačnosti: ${accuracyRating}/5`,
        verifiedSubmission: true,
      });

      if (res.success) {
        toast.success('Hvala vam! Vaša ocjena jasnoće i tačnosti je uspješno zabilježena.');
        setHasRated(true);
        const myScore = { clarity: clarityRating, accuracy: accuracyRating };
        setUserScore(myScore);
        try {
          localStorage.setItem(`bh_papirfinder_user_score_${formId}`, JSON.stringify(myScore));
        } catch {
          // ignore
        }
        await loadStats();
      }
    } catch (err) {
      console.error('Greška pri slanju ocjene:', err);
      toast.error('Nije uspjelo slanje ocjene.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStarSelector = (
    value: number,
    hoverValue: number | null,
    onHover: (n: number | null) => void,
    onSelect: (n: number) => void,
    labelId: string,
  ) => {
    const activeValue = hoverValue ?? value;
    return (
      <div className="flex items-center gap-1" role="radiogroup" aria-labelledby={labelId}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= activeValue;
          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={star === value}
              aria-label={`${star} zvjezdica`}
              onMouseEnter={() => onHover(star)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(star)}
              className="p-1 rounded transition-transform hover:scale-125 focus:outline-hidden focus:ring-2 focus:ring-[#5df0a8]/50"
            >
              <Star
                className={`w-6 h-6 transition-colors ${
                  isFilled
                    ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]'
                    : 'text-slate-600 hover:text-slate-400'
                }`}
              />
            </button>
          );
        })}
      </div>
    );
  };

  const aggregateScore = stats ? stats.averageRating.toFixed(1) : '5.0';
  const clarityAvg = stats ? stats.qualityAverage.toFixed(1) : '5.0';
  const accuracyAvg = stats ? stats.accuracyAverage.toFixed(1) : '5.0';
  const totalCount = stats ? stats.totalRatings : 0;

  return (
    <div
      className={`glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#070b1a]/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>5-STAR EVALUACIJA GRAĐANA</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Ocjena Jasnoće & Tačnosti Obrasca
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Uvid u stvarnu ažurnost propisa i razumljivost teksta na osnovu ocjena građana koji su predali ovaj obrazac.
          </p>
        </div>

        {/* Aggregate Score Card */}
        <div className="flex items-center gap-4 bg-[#0b142d]/80 px-5 py-3.5 rounded-2xl border border-amber-400/30 shadow-[0_0_20px_rgba(251,191,36,0.15)] shrink-0 w-full sm:w-auto justify-between sm:justify-start">
          <div className="text-center">
            <div className="text-3xl font-black text-amber-400 leading-none">
              {aggregateScore}
            </div>
            <div className="flex items-center justify-center gap-0.5 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= Math.round(Number(aggregateScore))
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
              {totalCount} {totalCount === 1 ? 'ocjena' : totalCount < 5 ? 'ocjene' : 'ocjena'}
            </span>
          </div>

          <div className="h-10 w-px bg-white/10" />

          <div className="space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400">Jasnoća:</span>
              <span className="text-[#5df0a8] font-bold">{clarityAvg} / 5.0</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400">Tačnost:</span>
              <span className="text-sky-400 font-bold">{accuracyAvg} / 5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Form or User's Recorded Score */}
      <div className="pt-6">
        {hasRated && userScore ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#5df0a8] shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Vaša ocjena je zabilježena i uračunata u prosjek
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Jasnoća: <strong className="text-amber-400">★ {userScore.clarity}/5</strong> • Tačnost propisa:{' '}
                  <strong className="text-amber-400">★ {userScore.accuracy}/5</strong>
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setHasRated(false)}
              className="h-8 text-xs border-white/20 text-slate-300 hover:text-white bg-white/5"
            >
              Promijeni ocjenu
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmitRating} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Jasnoća obrasca */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span id="clarity-label" className="text-sm font-semibold text-white">
                    1. Jasnoća i čitljivost
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {hoverClarity ?? clarityRating} / 5
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Koliko su upute razumljive i jednostavne za popunjavanje bez pravne pomoći?
                </p>
                <div className="pt-1">
                  {renderStarSelector(
                    clarityRating,
                    hoverClarity,
                    setHoverClarity,
                    setClarityRating,
                    'clarity-label',
                  )}
                </div>
                <p className="text-[11px] font-mono text-[#5df0a8] min-h-[16px]">
                  {CLARITY_LABELS[hoverClarity ?? clarityRating]}
                </p>
              </div>

              {/* 2. Tačnost propisa */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span id="accuracy-label" className="text-sm font-semibold text-white">
                    2. Tačnost i ažurnost propisa
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {hoverAccuracy ?? accuracyRating} / 5
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Da li su takse, prilozi i pravni osnovi usklađeni sa stvarnim šalterom?
                </p>
                <div className="pt-1">
                  {renderStarSelector(
                    accuracyRating,
                    hoverAccuracy,
                    setHoverAccuracy,
                    setAccuracyRating,
                    'accuracy-label',
                  )}
                </div>
                <p className="text-[11px] font-mono text-sky-400 min-h-[16px]">
                  {ACCURACY_LABELS[hoverAccuracy ?? accuracyRating]}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#5df0a8]" />
                <span>Ocjene su anonimne i direktno utiču na verifikaciju obrasca za 2026. godinu.</span>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto h-10 px-6 bg-[#5df0a8] hover:bg-[#4de69c] text-[#04060f] font-bold rounded-xl shadow-[0_0_15px_rgba(93,240,168,0.3)] shrink-0"
              >
                {isSubmitting ? 'Spremanje...' : 'Pošalji 5-Star ocjenu'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DocumentClarityAccuracyRating;
