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
    const durationDays = PLAN_DURATIONS[planId] || 30;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + durationDays);
    const expiryIso = expiryDate.toISOString();

    // Get current Supabase user (if logged in via Supabase Auth)
    const { user } = await getCurrentUser();
    const userId = user?.id || null;

    // Record transaction in Supabase
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
      // Still update locally even if Supabase write fails
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
        console.error('Failed to update user profile in Supabase:', profileError.message);
      }
    }

    // Always update localStorage as fallback
    upgradeToPaid(planId, expiryIso);

    return {
      success: true,
      transactionId: orderId,
    };
  } catch (err) {
    console.error('Unexpected error recording payment:', err);
    // Fallback: at minimum update localStorage
    const durationDays = PLAN_DURATIONS[planId] || 30;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + durationDays);
    upgradeToPaid(planId, expiryDate.toISOString());

    return {
      success: true,
      transactionId: orderId,
      error: 'Payment recorded locally only (Supabase unavailable)',
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

// Frontend payment verification — called after PayPal onApprove
export async function verifyPayment(
  orderId: string,
  planId: string,
  amount: number,
  currency: string,
  email: string
): Promise<PaymentResult> {
  // Record the payment to Supabase and update subscription
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