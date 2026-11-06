import { config } from './config';
import { supabase, getCurrentUser } from './supabaseClient';
import { upgradeToPaid } from './trial';

export interface PaymentIntent {
  planId: 'plan5days' | 'plan30days' | 'plan12months';
  amount: number;
  currency: string;
  email: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

// Plan duration mapping (in days)
const PLAN_DURATIONS: Record<string, number> = {
  plan5days: 5,
  plan30days: 30,
  plan12months: 365,
};

/**
 * Get the duration in days for a known plan, or null for unknown plans.
 * Unknown planIds are rejected rather than silently defaulted.
 */
function getPlanDurationDays(planId: string): number {
  const days = PLAN_DURATIONS[planId];
  if (typeof days !== 'number') {
    throw new Error(`Unknown planId: ${planId}`);
  }
  return days;
}

/**
 * Record a successful PayPal payment to Supabase transactions table
 * and update the user's subscription status both locally and in Supabase
 */
export async function recordPaymentToSupabase(
  orderId: string,
  planId: string,
  amount: number,
  currency: string,
  email: string
): Promise<PaymentResult> {
  try {
    const durationDays = getPlanDurationDays(planId);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + durationDays);
    const expiryIso = expiryDate.toISOString();

    // Get current Supabase user (if logged in via Supabase Auth)
    const { user } = await getCurrentUser();
    const userId = user?.id || null;

    // Record transaction in Supabase — this must succeed for a verified payment record
    const { error: txError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        order_id: orderId,
        plan_id: planId,
        amount,
        currency,
        email,
        status: 'completed',
        expires_at: expiryIso,
        created_at: new Date().toISOString(),
      });

    if (txError) {
      console.error('Failed to record transaction to Supabase:', txError.message);
      // Do not upgrade the subscription without a persisted transaction record.
      // Keep the user on the free tier so they can retry the payment.
      return {
        success: false,
        transactionId: orderId,
        error: 'Payment could not be recorded. Please try again — you have not been charged twice.',
      };
    }

    // Update user subscription in Supabase user_profiles (if user is authenticated)
    if (userId) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          subscription_status: 'paid',
          subscription_plan: planId,
          subscription_expires_at: expiryIso,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      if (profileError) {
        // Transaction exists, but the profile update failed. Treat as partial
        // success: the payment is recorded, but warn that profile sync failed.
        console.error('Failed to update user profile in Supabase:', profileError.message);
        upgradeToPaid(planId, expiryIso);
        return {
          success: true,
          transactionId: orderId,
          error: 'Payment recorded, but profile sync failed. Please contact support if access is not granted.',
        };
      }
    }

    // Update localStorage for immediate UI feedback
    upgradeToPaid(planId, expiryIso);

    return {
      success: true,
      transactionId: orderId,
    };
  } catch (err) {
    console.error('Unexpected error recording payment:', err);
    // Do not grant paid access when the recording flow fails unexpectedly.
    return {
      success: false,
      transactionId: orderId,
      error: 'Payment recording failed. Please try again or contact support.',
    };
  }
}

// Frontend payment initialization
export async function initializePayment(intent: PaymentIntent): Promise<string> {
  console.log('Initializing payment with publishable key:', config.publishableKey);
  console.log('Payment intent:', intent);

  // In production, this should call a backend endpoint to create a PayPal order
  // For now, PayPal SDK handles order creation client-side
  return 'PAYPAL_ORDER';
}

/**
 * Verify a PayPal order server-side via the verify-paypal-order Supabase
 * Edge Function before recording the payment. The Edge Function calls the
 * PayPal Orders API with server-only credentials and confirms the order is
 * COMPLETED with the expected amount and currency. Clients can never grant
 * themselves a subscription by tampering with onApprove data.
 */
async function verifyPayPalOrderServerSide(
  orderId: string,
  planId: string,
  amount: number,
  currency: string
): Promise<{ verified: boolean; error?: string }> {
  const { data, error } = await supabase.functions.invoke('verify-paypal-order', {
    body: {
      order_id: orderId,
      plan_id: planId,
      expected_amount: amount,
      expected_currency: currency,
    },
  });

  if (error) {
    console.error('PayPal order verification request failed:', error.message);
    return { verified: false, error: 'Payment verification is currently unavailable. Please try again.' };
  }

  if (!data?.verified) {
    console.error('PayPal order verification rejected:', data?.error || 'not verified');
    return { verified: false, error: data?.error || 'Payment could not be verified with PayPal.' };
  }

  return { verified: true };
}

// Frontend payment verification — called after PayPal onApprove
export async function verifyPayment(
  orderId: string,
  planId: string,
  amount: number,
  currency: string,
  email: string
): Promise<PaymentResult> {
  // Step 1: verify the order with PayPal server-side before recording anything.
  const verification = await verifyPayPalOrderServerSide(orderId, planId, amount, currency);
  if (!verification.verified) {
    return {
      success: false,
      transactionId: orderId,
      error: verification.error || 'Payment could not be verified with PayPal.',
    };
  }

  // Step 2: record the verified payment to Supabase and update subscription
  return recordPaymentToSupabase(orderId, planId, amount, currency, email);
}

// PayPal SDK configuration
export function getPayPalConfig() {
  return {
    'client-id': config.paypalClientId,
    currency: 'EUR',
    intent: 'capture',
  };
}