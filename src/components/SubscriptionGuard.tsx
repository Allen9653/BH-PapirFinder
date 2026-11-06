import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSubscriptionActive } from '@/lib/subscription';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface SubscriptionGuardProps {
  children: React.ReactNode;
}

const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ children }) => {
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const active = isSubscriptionActive();
    setIsActive(active);
  }, []);

  if (!isActive) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-16">
        <Card className="border-red-200">
          <CardHeader>
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-6 w-6" />
              <CardTitle>{t('subscriptionExpired')}</CardTitle>
            </div>
            <CardDescription>{t('subscriptionExpired')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/subscription')} className="w-full">
              {t('subscribe')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default SubscriptionGuard;