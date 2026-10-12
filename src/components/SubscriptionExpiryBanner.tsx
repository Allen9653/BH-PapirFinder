import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { X, AlertTriangle, Clock } from 'lucide-react';
import {
  getExpiryNotification,
  dismissExpiryNotification,
  getNotificationColor,
  ExpiryNotification,
} from '@/lib/subscription-notifications';
import { useLanguage } from '@/contexts/LanguageContext';

const SubscriptionExpiryBanner = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [notification, setNotification] = useState<ExpiryNotification | null>(null);

  useEffect(() => {
    const notif = getExpiryNotification();
    setNotification(notif);
  }, []);

  const handleDismiss = () => {
    if (notification) {
      dismissExpiryNotification(notification.id);
      setNotification(null);
    }
  };

  if (!notification) return null;

  const colors = getNotificationColor(notification.type);
  const IconComponent = notification.type === 'expired' ? AlertTriangle : Clock;

  return (
    <div className={`${colors.bg} border-b ${colors.border}`}>
      <div className="container px-4 py-3">
        <Alert className={`${colors.bg} ${colors.border} border`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
            <div className="flex items-start gap-2 min-w-0">
              <IconComponent className={`h-4 w-4 flex-shrink-0 mt-0.5 ${colors.icon}`} />
              <AlertDescription className={`${colors.text} break-words`}>
                {notification.message}
              </AlertDescription>
            </div>
            <div className="flex items-center gap-2 sm:ml-4 flex-shrink-0">
              <Button
                size="sm"
                onClick={() => navigate('/subscription')}
                className="bg-[#003D7A] hover:bg-[#002D5A] text-white text-xs h-auto py-1.5"
              >
                <span className="break-words">
                  {notification.type === 'expired' ? t('pro.renew') : t('pro.extend')}
                </span>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                aria-label={t('dashboard.dismissNotification')}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default SubscriptionExpiryBanner;