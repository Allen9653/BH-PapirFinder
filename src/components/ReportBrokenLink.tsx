import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertTriangle, CheckCircle, Flag, Star, Bell } from 'lucide-react';
import { reportBrokenLink, submitReportFeedback, trackDialogOpened } from '@/lib/broken-link-service';

interface ReportBrokenLinkProps {
  municipalityName?: string;
  municipalitySlug?: string;
  formName?: string;
  formId?: string;
  brokenUrl?: string;
  trigger?: React.ReactNode;
}

const ReportBrokenLink = ({
  municipalityName = '',
  municipalitySlug,
  formName,
  formId,
  brokenUrl = '',
  trigger,
}: ReportBrokenLinkProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(brokenUrl);
  const [municipality, setMunicipality] = useState(municipalityName);
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastReportId, setLastReportId] = useState('');
  const [error, setError] = useState('');

  // Feedback state
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<number>(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Track dialog open
  useEffect(() => {
    if (open) {
      trackDialogOpened({ municipalityName, formId });
    }
  }, [open, municipalityName, formId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim() && !municipality.trim()) {
      setError('Molimo unesite URL ili naziv općine.');
      return;
    }

    setSubmitting(true);

    const result = await reportBrokenLink({
      municipalityName: municipality,
      municipalitySlug,
      formName,
      formId,
      brokenUrl: url,
      reportedBy: email || undefined,
      description: description || undefined,
    });

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      // Generate a report ID for feedback tracking
      setLastReportId(`blr_${Date.now()}`);
      // Show feedback prompt after a short delay
      setTimeout(() => {
        setShowFeedback(true);
      }, 1500);
    } else {
      setError(result.error || 'Greška pri slanju prijave.');
    }
  };

  const handleFeedbackSubmit = async () => {
    if (feedbackRating === 0) return;

    await submitReportFeedback(lastReportId, {
      rating: feedbackRating as 1 | 2 | 3 | 4 | 5,
      comment: feedbackComment || undefined,
    });

    setFeedbackSubmitted(true);

    // Close dialog after feedback
    setTimeout(() => {
      setOpen(false);
      resetForm();
    }, 1500);
  };

  const handleSkipFeedback = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTimeout(() => {
      setSubmitted(false);
      setShowFeedback(false);
      setFeedbackRating(0);
      setFeedbackComment('');
      setFeedbackSubmitted(false);
      setUrl(brokenUrl);
      setMunicipality(municipalityName);
      setDescription('');
      setEmail('');
      setLastReportId('');
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="text-orange-600 border-orange-300 hover:bg-orange-50">
            <Flag className="h-4 w-4 mr-1" />
            Prijavi neispravan link
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#003D7A]">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Prijavi neispravan link
          </DialogTitle>
          <DialogDescription>
            Pomozite nam da poboljšamo bazu podataka prijavom neispravnog linka ili nedostupnog dokumenta.
          </DialogDescription>
        </DialogHeader>

        {/* Feedback submitted confirmation */}
        {feedbackSubmitted ? (
          <div className="py-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-lg font-medium text-green-700">Hvala na povratnoj informaciji!</p>
            <p className="text-sm text-gray-500 mt-1">
              Vaše mišljenje nam pomaže da poboljšamo uslugu.
            </p>
          </div>
        ) : showFeedback ? (
          /* Feedback form after successful report */
          <div className="py-4 space-y-4">
            <div className="text-center">
              <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
              <p className="text-base font-medium text-green-700">Prijava uspješno poslana!</p>
              <p className="text-sm text-gray-500 mt-2">
                Kako biste ocijenili iskustvo prijavljivanja?
              </p>
            </div>

            {/* Star rating */}
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFeedbackRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= feedbackRating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {feedbackRating > 0 && (
              <p className="text-center text-sm text-gray-600">
                {feedbackRating === 1 && 'Loše'}
                {feedbackRating === 2 && 'Može bolje'}
                {feedbackRating === 3 && 'Solidno'}
                {feedbackRating === 4 && 'Dobro'}
                {feedbackRating === 5 && 'Odlično!'}
              </p>
            )}

            {/* Optional comment */}
            <div className="space-y-2">
              <Label htmlFor="feedback-comment">Komentar (opciono)</Label>
              <Textarea
                id="feedback-comment"
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                placeholder="Kako možemo poboljšati ovaj proces?"
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleSkipFeedback}
                className="flex-1"
              >
                Preskoči
              </Button>
              <Button
                type="button"
                className="flex-1 bg-[#003D7A] hover:bg-[#002A5A]"
                disabled={feedbackRating === 0}
                onClick={handleFeedbackSubmit}
              >
                Pošalji ocjenu
              </Button>
            </div>
          </div>
        ) : submitted ? (
          <div className="py-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-lg font-medium text-green-700">Hvala na prijavi!</p>
            <p className="text-sm text-gray-500 mt-1">
              Vaša prijava je zabilježena i bit će pregledana.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Administrator će biti obaviješten putem email-a.
            </p>
            <Button
              variant="link"
              size="sm"
              className="mt-3 text-[#003D7A]"
              onClick={() => {
                setOpen(false);
                resetForm();
                navigate('/notifications/preferences');
              }}
            >
              <Bell className="h-3 w-3 mr-1" />
              Postavke obavještenja
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="report-municipality">Općina / Institucija</Label>
              <Input
                id="report-municipality"
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                placeholder="Npr. Općina Olovo, Grad Tuzla..."
              />
            </div>

            {formName && (
              <div className="space-y-2">
                <Label>Obrazac</Label>
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{formName}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="report-url">Neispravan URL</Label>
              <Input
                id="report-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-description">Opis problema (opciono)</Label>
              <Textarea
                id="report-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Npr. stranica vraća 404, PDF se ne otvara, link vodi na pogrešnu stranicu..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-email">Vaš email (opciono)</Label>
              <Input
                id="report-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vas@email.com"
              />
              <p className="text-xs text-gray-400">
                Ostavite email ako želite da vas obavijestimo kada link bude ispravljen.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                Otkaži
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#003D7A] hover:bg-[#002A5A]"
                disabled={submitting}
              >
                {submitting ? 'Slanje...' : 'Pošalji prijavu'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReportBrokenLink;