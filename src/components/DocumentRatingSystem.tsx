import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  getDocumentRatings,
  submitDocumentRating,
  hasUserRatedDocument,
  voteReviewHelpful,
  DocumentRatingStats,
  DocumentReview,
} from '@/lib/document-ratings-service';
import { toast } from 'sonner';

interface DocumentRatingSystemProps {
  formId: string;
  formName: string;
  municipalityName?: string;
  className?: string;
}

const RATING_LABELS: Record<number, string> = {
  1: '1 - Zastarjelo / Netačno',
  2: '2 - Djelomično tačno',
  3: '3 - Prihvatljivo',
  4: '4 - Vrlo dobro i ažurno',
  5: '5 - Odlično i potpuno tačno',
};

export const DocumentRatingSystem: React.FC<DocumentRatingSystemProps> = ({
  formId,
  formName,
  municipalityName,
  className = '',
}) => {
  const [stats, setStats] = useState<DocumentRatingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Form inputs
  const [overallRating, setOverallRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [qualityRating, setQualityRating] = useState<number>(5);
  const [accuracyRating, setAccuracyRating] = useState<number>(5);
  const [authorName, setAuthorName] = useState('');
  const [comment, setComment] = useState('');
  const [verifiedSubmission, setVerifiedSubmission] = useState(true);
  const [userAlreadyRated, setUserAlreadyRated] = useState<number | null>(null);

  useEffect(() => {
    loadRatings();
    const existing = hasUserRatedDocument(formId);
    setUserAlreadyRated(existing);
  }, [formId]);

  const loadRatings = async () => {
    setLoading(true);
    try {
      const data = await getDocumentRatings(formId, formName);
      setStats(data);
    } catch (err) {
      console.error('Failed to load ratings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (overallRating < 1 || overallRating > 5) {
      toast.error('Molimo odaberite ocjenu od 1 do 5 zvjezdica.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitDocumentRating({
        formId,
        formName,
        overallRating,
        qualityRating,
        accuracyRating,
        authorName: authorName.trim() || 'Građanin',
        comment: comment.trim(),
        verifiedSubmission,
      });

      if (res.success) {
        toast.success('Hvala vam na ocjeni! Vaša recenzija pomaže drugim građanima.');
        setUserAlreadyRated(overallRating);
        setShowReviewForm(false);
        setComment('');
        await loadRatings();
      }
    } catch {
      toast.error('Došlo je do greške pri spremanju ocjene. Pokušajte ponovo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHelpful = (review: DocumentReview) => {
    const updatedCount = voteReviewHelpful(formId, review.id);
    toast.success('Hvala na povratnoj informaciji!');
    setStats((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        reviews: prev.reviews.map((r) =>
          r.id === review.id ? { ...r, helpfulCount: updatedCount } : r
        ),
      };
    });
  };

  if (loading || !stats) {
    return (
      <Card className={`border-slate-200 ${className}`}>
        <CardContent className="py-8 text-center text-slate-500">
          <div className="flex justify-center mb-2">
            <Star className="h-6 w-6 text-amber-400 animate-pulse" />
          </div>
          <p className="text-sm">Učitavanje ocjena i recenzija obrasca...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-slate-200 shadow-sm overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-slate-50 to-amber-50/40 border-b pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold text-[#003D7A] flex items-center gap-2">
              <Star className="h-5 w-5 fill-amber-400 text-amber-500" />
              Ocjene i tačnost obrasca
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-slate-600">
              Provjerene recenzije građana i pravnika o tačnosti i prihvatljivosti ovog dokumenta
            </CardDescription>
          </div>

          {!showReviewForm && (
            <Button
              size="sm"
              onClick={() => setShowReviewForm(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium shadow-sm gap-1.5 self-start sm:self-auto"
            >
              <Sparkles className="h-4 w-4" />
              {userAlreadyRated ? 'Ažuriraj ocjenu' : 'Ocijeni ovaj obrazac'}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Rating Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Big Score Box */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-amber-50/50 rounded-xl border border-amber-200/60 text-center">
            <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {stats.averageRating}
            </div>
            <div className="flex items-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(stats.averageRating)
                      ? 'fill-amber-400 text-amber-500'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium text-slate-600">
              Na osnovu {stats.totalRatings} {stats.totalRatings === 1 ? 'recenzije' : 'recenzija'}
            </span>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verifikovano za 2026. godinu</span>
            </div>
          </div>

          {/* Sub-criteria & Star Distribution */}
          <div className="md:col-span-8 space-y-4">
            {/* Sub criteria */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-700">Čitljivost i format</span>
                  <span className="text-xs font-bold text-amber-700">{stats.qualityAverage} / 5</span>
                </div>
                <Progress value={(stats.qualityAverage / 5) * 100} className="h-2 bg-slate-200" />
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-700">Tačnost propisa i taksi</span>
                  <span className="text-xs font-bold text-emerald-700">{stats.accuracyAverage} / 5</span>
                </div>
                <Progress value={(stats.accuracyAverage / 5) * 100} className="h-2 bg-slate-200" />
              </div>
            </div>

            {/* Distribution bars */}
            <div className="space-y-1.5">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = stats.distribution[stars as 1 | 2 | 3 | 4 | 5] || 0;
                const percent = stats.totalRatings > 0 ? (count / stats.totalRatings) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-2 text-xs">
                    <span className="w-8 text-slate-600 font-medium text-right">{stars} ★</span>
                    <Progress value={percent} className="h-1.5 flex-1 bg-slate-100" />
                    <span className="w-8 text-slate-400 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interactive Rating Submission Form */}
        {showReviewForm && (
          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-5 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-4 animate-in fade-in duration-200"
          >
            <div className="flex justify-between items-center border-b border-amber-200/60 pb-2">
              <h4 className="font-semibold text-sm text-[#003D7A] flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Vaša ocjena i iskustvo s ovim obrascem
              </h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowReviewForm(false)}
                className="h-7 text-xs text-slate-500 hover:text-slate-800"
              >
                Odustani
              </Button>
            </div>

            {/* Star selector */}
            <div>
              <Label className="text-xs font-semibold text-slate-700 block mb-1">
                Ukupna ocjena obrasca:
              </Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hoverRating || overallRating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setOverallRating(star)}
                      className="p-1 hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          active
                            ? 'fill-amber-400 text-amber-500 drop-shadow-sm'
                            : 'text-slate-300 hover:text-amber-200'
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-xs text-slate-600 font-medium ml-3">
                  {RATING_LABELS[hoverRating || overallRating]}
                </span>
              </div>
            </div>

            {/* Detailed Sub-ratings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <Label className="text-xs text-slate-600 mb-1 block">
                  Kvalitet i čitljivost PDF-a (1-5):
                </Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setQualityRating(val)}
                      className={`px-3 py-1 text-xs rounded border transition-colors ${
                        qualityRating === val
                          ? 'bg-[#003D7A] text-white border-[#003D7A] font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {val} ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-xs text-slate-600 mb-1 block">
                  Tačnost podataka i taksi (1-5):
                </Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAccuracyRating(val)}
                      className={`px-3 py-1 text-xs rounded border transition-colors ${
                        accuracyRating === val
                          ? 'bg-[#00A651] text-white border-[#00A651] font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {val} ★
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Author name & comments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="author-name" className="text-xs text-slate-600">
                  Vaše ime ili grad (opcionalno)
                </Label>
                <Input
                  id="author-name"
                  placeholder="npr. Građanin iz Zenice ili Anonimno"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="h-9 text-xs bg-white"
                  maxLength={50}
                />
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id="verified-sub"
                  checked={verifiedSubmission}
                  onCheckedChange={(checked) => setVerifiedSubmission(Boolean(checked))}
                />
                <label
                  htmlFor="verified-sub"
                  className="text-xs text-slate-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Obrazac je uspješno prihvaćen na šalteru
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="comment-text" className="text-xs text-slate-600">
                Vaš komentar ili savjet za druge građane (npr. iznos takse, potrebni prilozi)
              </Label>
              <Textarea
                id="comment-text"
                placeholder="Podijelite savjet o proceduri: koliko se čeka, koja taksa se plaća, da li traže rodni list..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                className="text-xs bg-white"
                maxLength={500}
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#003D7A] hover:bg-[#002A5A] text-white text-xs h-9 px-4 gap-1.5"
              >
                <Send className="h-3.5 w-3.5" />
                {isSubmitting ? 'Spremanje...' : 'Objavi ocjenu i recenziju'}
              </Button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-3 pt-2">
          <h4 className="font-semibold text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" />
            Nedavne recenzije građana ({stats.reviews.length})
          </h4>

          {stats.reviews.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 text-center">
              Budite prvi koji će ocijeniti ovaj obrazac!
            </p>
          ) : (
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {stats.reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-3 bg-slate-50 hover:bg-slate-100/70 transition-colors rounded-lg border border-slate-200/70 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{review.authorName}</span>
                      {review.verifiedSubmission && (
                        <Badge
                          variant="outline"
                          className="bg-emerald-50 text-emerald-700 border-emerald-300 text-[10px] py-0 px-1.5 flex items-center gap-1"
                        >
                          <CheckCircle className="h-2.5 w-2.5" />
                          Prihvaćeno na šalteru
                        </Badge>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {new Date(review.createdAt).toLocaleDateString('bs-BA')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3.5 w-3.5 ${
                          star <= review.overallRating
                            ? 'fill-amber-400 text-amber-500'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                    <span className="text-[11px] text-slate-500 ml-1">
                      (Kvalitet: {review.qualityRating}/5 • Tačnost: {review.accuracyRating}/5)
                    </span>
                  </div>

                  {review.comment && (
                    <p className="text-slate-700 text-xs leading-relaxed mt-1">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  )}

                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => handleHelpful(review)}
                      className="text-[11px] text-slate-500 hover:text-[#003D7A] flex items-center gap-1 transition-colors"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      Korisno ({review.helpfulCount || 0})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentRatingSystem;
