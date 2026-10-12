import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, CheckCircle } from 'lucide-react';
import { activateProSubscription, SubscriptionProfile } from '@/lib/subscription';
import { trackGA4Event } from '@/lib/ga4-tracking';

interface CheckoutButtonProps {
  profile: SubscriptionProfile | null;
  onSuccess?: () => void;
  variant?: 'default' | 'compact';
  className?: string;
}

const CheckoutButton = ({ profile, onSuccess, variant = 'default', className = '' }: CheckoutButtonProps) => {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    if (!profile) return;
    setProcessing(true);

    trackGA4Event('begin_checkout', {
      item_name: 'e-Citizen PRO',
      price: '9.90',
      currency: 'BAM',
    });

    try {
      // Payment processing simulation
      // In production, this would integrate with PayPal/Stripe/local gateway
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Activate PRO subscription (1 month)
      const activated = await activateProSubscription(profile.userId, 1);

      if (activated) {
        setSuccess(true);
        trackGA4Event('purchase', {
          transaction_id: `txn_${Date.now()}`,
          item_name: 'e-Citizen PRO',
          value: '9.90',
          currency: 'BAM',
        });

        if (onSuccess) {
          setTimeout(onSuccess, 1500);
        } else {
          setTimeout(() => window.location.reload(), 2000);
        }
      }
    } catch {
      // Handle payment failure
      trackGA4Event('checkout_error', { error: 'payment_failed' });
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <Button
        className={`bg-emerald-500 hover:bg-emerald-600 text-white ${className}`}
        disabled
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        Pretplata aktivirana!
      </Button>
    );
  }

  if (variant === 'compact') {
    return (
      <Button
        size="sm"
        className={`bg-[#003D7A] hover:bg-[#002A5A] text-white ${className}`}
        onClick={handleCheckout}
        disabled={processing}
      >
        {processing ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <>
            <CreditCard className="h-3.5 w-3.5 mr-1.5" />
            9.90 KM/mj.
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      className={`bg-[#003D7A] hover:bg-[#002A5A] text-white font-medium ${className}`}
      onClick={handleCheckout}
      disabled={processing}
    >
      {processing ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Obrada plaćanja...
        </>
      ) : (
        <>
          <CreditCard className="h-4 w-4 mr-2" />
          Plati 9.90 KM/mjesečno
        </>
      )}
    </Button>
  );
};

export default CheckoutButton;