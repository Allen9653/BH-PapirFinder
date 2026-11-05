// ============================================================
// AI Form Filler Assistant
// Modal component that provides step-by-step form filling guidance
// With Freemium feature gating (3 free uses, unlimited for PRO/Trial)
// ============================================================

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Bot,
  CheckCircle2,
  Clock,
  FileText,
  Lightbulb,
  ListChecks,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Lock,
  Crown,
  Zap,
} from 'lucide-react';
import { generateFormGuide, FormGuide } from '@/lib/ai-form-guide-service';
import {
  getSubscriptionProfile,
  checkFeatureAccess,
  trackFeatureUsage,
  SubscriptionProfile,
} from '@/lib/subscription';
import UpgradeModal from '@/components/subscription/UpgradeModal';

interface FormFillerAssistantProps {
  formName: string;
  category: string;
  description: string | null;
}

const FormFillerAssistant = ({ formName, category, description }: FormFillerAssistantProps) => {
  const { language } = useLanguage();
  const [guide, setGuide] = useState<FormGuide | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<SubscriptionProfile | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const p = await getSubscriptionProfile();
    setProfile(p);
    if (p) {
      const access = checkFeatureAccess('ai_assistant', p);
      setIsBlocked(!access.allowed);
    }
  };

  useEffect(() => {
    if (isOpen && !isBlocked) {
      handleGenerateGuide();
    }
  }, [isOpen]);

  const handleGenerateGuide = async () => {
    // Check access before generating
    const access = checkFeatureAccess('ai_assistant', profile);
    if (!access.allowed) {
      setIsBlocked(true);
      return;
    }

    const generatedGuide = generateFormGuide(formName, category, description, language);
    setGuide(generatedGuide);
    setExpandedStep(0);
    setCompletedSteps(new Set());

    // Track usage for free tier
    if (profile && profile.tier === 'free') {
      await trackFeatureUsage(profile.userId, 'ai_assistant');
      // Refresh profile to update counts
      const updatedProfile = await getSubscriptionProfile();
      setProfile(updatedProfile);
      if (updatedProfile) {
        const newAccess = checkFeatureAccess('ai_assistant', updatedProfile);
        setIsBlocked(!newAccess.allowed);
      }
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (open && isBlocked) {
      setShowUpgrade(true);
      return;
    }
    setIsOpen(open);
  };

  const toggleStep = (stepNumber: number) => {
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
  };

  const markStepComplete = (stepNumber: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepNumber)) {
        next.delete(stepNumber);
      } else {
        next.add(stepNumber);
      }
      return next;
    });
  };

  const progressPercent = guide
    ? Math.round((completedSteps.size / guide.steps.length) * 100)
    : 0;

  // Calculate remaining uses for badge
  const getUsageBadge = () => {
    if (!profile) return null;
    if (profile.tier === 'paid' || profile.tier === 'trial') {
      return (
        <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-300 text-xs">
          <Crown className="h-3 w-3 mr-1" />
          PRO Neograničeno
        </Badge>
      );
    }
    // Free tier
    const used = profile.aiUsageCount;
    const max = 3;
    const remaining = Math.max(0, max - used);
    if (remaining === 0) {
      return (
        <Badge variant="outline" className="text-xs text-red-600 border-red-300 bg-red-50">
          <Lock className="h-3 w-3 mr-1" />
          Preostalo upita: 0/3
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-xs text-amber-600 border-amber-300 bg-amber-50">
        Preostalo upita: {remaining}/3
      </Badge>
    );
  };

  // Localized labels
  const uiLabels = {
    bs: {
      title: 'AI Pomoćnik za popunjavanje',
      buttonLabel: 'Pomoć pri popunjavanju',
      requiredDocs: 'Potrebna dokumentacija',
      importantNotes: 'Važne napomene',
      estimatedTime: 'Procijenjeno vrijeme',
      progress: 'Napredak',
      markDone: 'Označi kao završeno',
      markUndone: 'Poništi',
      allDone: 'Svi koraci su završeni! Vaš obrazac je spreman za predaju.',
    },
    en: {
      title: 'AI Form Filling Assistant',
      buttonLabel: 'Help me fill this',
      requiredDocs: 'Required Documents',
      importantNotes: 'Important Notes',
      estimatedTime: 'Estimated Time',
      progress: 'Progress',
      markDone: 'Mark as done',
      markUndone: 'Undo',
      allDone: 'All steps completed! Your form is ready for submission.',
    },
    de: {
      title: 'KI-Ausfüllhilfe',
      buttonLabel: 'Hilfe beim Ausfüllen',
      requiredDocs: 'Erforderliche Dokumente',
      importantNotes: 'Wichtige Hinweise',
      estimatedTime: 'Geschätzte Zeit',
      progress: 'Fortschritt',
      markDone: 'Als erledigt markieren',
      markUndone: 'Rückgängig',
      allDone: 'Alle Schritte abgeschlossen! Ihr Formular ist bereit zur Einreichung.',
    },
    tr: {
      title: 'AI Form Doldurma Asistanı',
      buttonLabel: 'Doldurmama yardım et',
      requiredDocs: 'Gerekli Belgeler',
      importantNotes: 'Önemli Notlar',
      estimatedTime: 'Tahmini Süre',
      progress: 'İlerleme',
      markDone: 'Tamamlandı olarak işaretle',
      markUndone: 'Geri al',
      allDone: 'Tüm adımlar tamamlandı! Formunuz gönderime hazır.',
    },
  };

  const l = uiLabels[language as keyof typeof uiLabels] || uiLabels.bs;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
          >
            <Bot className="h-4 w-4 mr-1" />
            {l.buttonLabel}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#003D7A]">
              <Bot className="h-5 w-5" />
              {l.title}
            </DialogTitle>
            {/* Usage Badge in header */}
            <div className="mt-2">
              {getUsageBadge()}
            </div>
          </DialogHeader>

          {/* Blocked state — show upgrade card */}
          {isBlocked && (
            <div className="py-6">
              <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
                    <Lock className="h-7 w-7 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Besplatni AI limit iskorišten
                  </h3>
                  <p className="text-sm text-gray-600 max-w-sm mx-auto">
                    Iskoristili ste sva 3 besplatna AI upita. Nadogradite na e-Citizen PRO
                    za neograničen pristup AI Asistentu i svim premium funkcijama.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Badge variant="outline" className="text-red-600 border-red-300">
                      Upiti: 3/3 iskorišteno
                    </Badge>
                  </div>
                  <Button
                    className="bg-[#003D7A] hover:bg-[#002A5A] text-white font-medium px-6"
                    onClick={() => {
                      setIsOpen(false);
                      setShowUpgrade(true);
                    }}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Nadogradi na e-Citizen PRO — 9.90 KM/mj.
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Normal guide content */}
          {!isBlocked && guide && (
            <div className="space-y-4 mt-2">
              {/* Progress bar */}
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {l.progress}: {completedSteps.size}/{guide.steps.length}
                  </span>
                  <span className="text-sm text-gray-500">{progressPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                {progressPercent === 100 && (
                  <p className="text-sm text-green-700 mt-2 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    {l.allDone}
                  </p>
                )}
              </div>

              {/* Estimated time */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{l.estimatedTime}: {guide.estimatedTime}</span>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                {guide.steps.map((step) => {
                  const isExpanded = expandedStep === step.stepNumber;
                  const isCompleted = completedSteps.has(step.stepNumber);

                  return (
                    <Card
                      key={step.stepNumber}
                      className={`transition-all duration-200 ${
                        isCompleted
                          ? 'border-green-300 bg-green-50/50'
                          : 'border-gray-200 hover:border-[#003D7A]/30'
                      }`}
                    >
                      <CardContent className="p-3">
                        {/* Step header */}
                        <button
                          className="w-full flex items-center gap-3 text-left"
                          onClick={() => toggleStep(step.stepNumber)}
                        >
                          <div
                            className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                              isCompleted
                                ? 'bg-green-500 text-white'
                                : 'bg-[#003D7A] text-white'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              step.stepNumber
                            )}
                          </div>
                          <span
                            className={`flex-1 font-medium text-sm ${
                              isCompleted ? 'text-green-700 line-through' : 'text-gray-800'
                            }`}
                          >
                            {step.title}
                          </span>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          )}
                        </button>

                        {/* Step details */}
                        {isExpanded && (
                          <div className="mt-3 ml-10 space-y-2">
                            <p className="text-sm text-gray-600">{step.description}</p>
                            {step.tip && (
                              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-md p-2">
                                <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-amber-800">{step.tip}</p>
                              </div>
                            )}
                            <Button
                              size="sm"
                              variant={isCompleted ? 'outline' : 'default'}
                              className={
                                isCompleted
                                  ? 'border-green-300 text-green-700 hover:bg-green-50'
                                  : 'bg-[#003D7A] hover:bg-[#002A5A]'
                              }
                              onClick={() => markStepComplete(step.stepNumber)}
                            >
                              {isCompleted ? (
                                <>
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  {l.markUndone}
                                </>
                              ) : (
                                l.markDone
                              )}
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Required documents */}
              <Card className="border-blue-200 bg-blue-50/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-[#003D7A] mb-2 flex items-center gap-2">
                    <ListChecks className="h-4 w-4" />
                    {l.requiredDocs}
                  </h4>
                  <ul className="space-y-1">
                    {guide.requiredDocuments.map((doc, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                        <FileText className="h-3 w-3 text-blue-500 flex-shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Important notes */}
              <Card className="border-amber-200 bg-amber-50/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    {l.importantNotes}
                  </h4>
                  <ul className="space-y-1">
                    {guide.importantNotes.map((note, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <Badge variant="outline" className="text-xs px-1 py-0 mt-0.5 flex-shrink-0 border-amber-300">
                          !
                        </Badge>
                        {note}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Upgrade Modal */}
      <UpgradeModal
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        profile={profile}
        triggerReason="Iskorišten besplatni AI limit (3/3 upita). Nadogradite na e-Citizen PRO za neograničen pristup."
      />
    </>
  );
};

export default FormFillerAssistant;