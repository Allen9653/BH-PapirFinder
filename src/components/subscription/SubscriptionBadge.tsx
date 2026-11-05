import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Clock, Zap } from 'lucide-react';
import {
  getSubscriptionProfile,
  SubscriptionProfile,
  getTrialRemainingDays,
} from '@/lib/subscription';
import UpgradeModal from './UpgradeModal';
import { useLanguage } from '@/contexts/LanguageContext';

const SubscriptionBadge = () => {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<SubscriptionProfile | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const p = await getSubscriptionProfile();
      setProfile(p);
    } catch {
      // Silently handle
    } finally {
      setLoading(false);
    }
  };

  if (loading || !profile) return null;

  const { tier } = profile;

  if (tier === 'paid') {
    return (
      <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-3 py-1 cursor-default whitespace-nowrap">
        <Crown className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
        {t('pro.proName')}
      </Badge>
    );
  }

  if (tier === 'trial') {
    const daysLeft = getTrialRemainingDays(profile);
    return (
      <>
        <Badge
          className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-3 py-1 cursor-pointer max-w-[180px] whitespace-normal text-center"
          onClick={() => setShowUpgrade(true)}
        >
          <Clock className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
          <span className="break-words">{t('pro.trialBadge', { days: daysLeft })}</span>
        </Badge>
        <UpgradeModal
          open={showUpgrade}
          onClose={() => setShowUpgrade(false)}
          profile={profile}
        />
      </>
    );
  }

  // Free tier
  return (
    <>
      <Button
        size="sm"
        className="bg-[#003D7A] hover:bg-[#002A5A] text-white font-medium px-3 h-auto py-1.5 text-xs max-w-[180px]"
        onClick={() => setShowUpgrade(true)}
      >
        <Zap className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
        <span className="break-words text-left">{t('pro.upgradeShort')}</span>
      </Button>
      <UpgradeModal
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        profile={profile}
      />
    </>
  );
};

export default SubscriptionBadge;