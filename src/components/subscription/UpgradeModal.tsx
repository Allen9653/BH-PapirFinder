import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Crown, Check, X, Sparkles, Shield, Languages, FileText,
  Zap, Loader2,
} from 'lucide-react';
import { SubscriptionProfile, activateProSubscription } from '@/lib/subscription';
import { trackGA4Event } from '@/lib/ga4-tracking';
import { useLanguage } from '@/contexts/LanguageContext';

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  profile: SubscriptionProfile | null;
  triggerReason?: string;
}

const UpgradeModal = ({ open, onClose, profile, triggerReason }: UpgradeModalProps) => {
  const { t } = useLanguage();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpgrade = async () => {
    if (!profile) return;
    setProcessing(true);
    trackGA4Event('begin_checkout', { item_name: 'e-Citizen PRO', price: '9.90 KM' });

    try {
      // Simulate payment processing (replace with real PayPal/Stripe integration)
      await new Promise(resolve => setTimeout(resolve, 2000));

      await activateProSubscription(profile.userId, 1);

      setSuccess(true);
      trackGA4Event('purchase', { item_name: 'e-Citizen PRO', value: '9.90', currency: 'BAM' });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch {
      // Handle error
    } finally {
      setProcessing(false);
    }
  };

  const freeFeatures = [
    { key: 'pro.featSearch', included: true },
    { key: 'pro.featDownload', included: true },
    { key: 'pro.featAiLimited', included: true, limited: true },
    { key: 'pro.featStudioLimited', included: true, limited: true },
    { key: 'pro.featAiUnlimited', included: false },
    { key: 'pro.featStudioUnlimited', included: false },
    { key: 'pro.featPriority', included: false },
  ];

  const proFeatures = [
    'pro.featSearch',
    'pro.featDownload',
    'pro.featAiUnlimited',
    'pro.featStudioUnlimited',
    'pro.featTranslate',
    'pro.featTranslit',
    'pro.featPriority',
  ];

  if (success) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <Crown className="h-8 w-8 text-emerald-600" />
            </div>
            <DialogTitle className="text-xl sm:text-2xl text-emerald-700 break-words">
              {t('pro.welcomeTitle')}
            </DialogTitle>
            <DialogDescription className="text-gray-600 break-words">
              {t('pro.welcomeDesc')}
            </DialogDescription>
            <Badge className="bg-emerald-500 text-white px-4 py-1.5 whitespace-normal text-center">
              <Crown className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="break-words">{t('pro.activeBadge')}</span>
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-[#003D7A] flex items-start gap-2">
            <Sparkles className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <span className="break-words text-left">{t('pro.upgradeTitle')}</span>
          </DialogTitle>
          {triggerReason && (
            <DialogDescription className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2 break-words">
              ⚡ {triggerReason}
            </DialogDescription>
          )}
          {!triggerReason && (
            <DialogDescription className="break-words">
              {t('pro.upgradeDesc')}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Free Plan */}
          <Card className="border-gray-200">
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700 break-words">{t('pro.freePlan')}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">0</span>
                  <span className="text-gray-500 ml-1 break-words">{t('pro.perMonth')}</span>
                </div>
              </div>
              <ul className="space-y-2.5">
                {freeFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    {f.included ? (
                      <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${f.limited ? 'text-amber-500' : 'text-emerald-500'}`} />
                    ) : (
                      <X className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-300" />
                    )}
                    <span className={`break-words ${f.included ? 'text-gray-700' : 'text-gray-400'}`}>
                      {t(f.key)}
                    </span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full mt-6 h-auto py-2" disabled>
                <span className="break-words">{t('pro.currentPlan')}</span>
              </Button>
            </CardContent>
          </Card>

          {/* PRO Plan */}
          <Card className="border-[#003D7A] border-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#003D7A] text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
              {t('pro.recommended')}
            </div>
            <CardContent className="pt-8">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-[#003D7A] flex flex-wrap items-center justify-center gap-1.5">
                  <Crown className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  <span className="break-words">{t('pro.proName')}</span>
                </h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-[#003D7A]">9.90</span>
                  <span className="text-gray-500 ml-1 break-words">{t('pro.perMonth')}</span>
                </div>
              </div>
              <ul className="space-y-2.5">
                {proFeatures.map((key, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                    <span className="text-gray-700 break-words">{t(key)}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full mt-6 bg-[#003D7A] hover:bg-[#002A5A] text-white font-medium h-auto py-2"
                onClick={handleUpgrade}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin flex-shrink-0" />
                    <span className="break-words">{t('pro.processing')}</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="break-words">{t('pro.upgradeCta')}</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Shield className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="break-words">{t('pro.securePayment')}</span>
          </span>
          <span className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="break-words">{t('pro.cancelAnytime')}</span>
          </span>
          <span className="flex items-center gap-1">
            <Languages className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="break-words">{t('pro.bhsSupport')}</span>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;