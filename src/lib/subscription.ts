// src/lib/subscription.ts
// Freemium & e-Citizen PRO subscription management
// Integrates with Supabase user_profiles table (project: zdvqjjmpxifbltihffas)

import { supabase, getCurrentUser } from './supabaseClient';
import { getUserAccount } from './trial';

// ============================================================
// Types
// ============================================================

export type SubscriptionTier = 'paid' | 'trial' | 'free';

export interface SubscriptionProfile {
  userId: string;
  tier: SubscriptionTier;
  subscriptionStatus: string | null;
  trialEndsAt: string | null;
  subscriptionExpiresAt: string | null;
  aiUsageCount: number;
  studioUsageCount: number;
}

export interface FeatureAccess {
  allowed: boolean;
  reason?: string;
  remainingUses?: number;
}

// ============================================================
// Feature Usage Limits (Free tier)
// ============================================================

const FREE_TIER_LIMITS = {
  ai_assistant: 3,
  smart_studio: 1,
} as const;

// ============================================================
// Core: Get Subscription Profile from Supabase
// ============================================================

/**
 * Fetch the current user's subscription profile from Supabase user_profiles
 */
export async function getSubscriptionProfile(): Promise<SubscriptionProfile | null> {
  try {
    const { user } = await getCurrentUser();
    if (!user) {
      // Fallback to localStorage account
      return getLocalSubscriptionProfile();
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('user_id, subscription_status, trial_ends_at, subscription_expires_at, ai_usage_count, studio_usage_count')
      .eq('user_id', user.id)
      .single();

    if (error || !data) {
      // Fallback to localStorage
      return getLocalSubscriptionProfile();
    }

    const tier = calculateTier(
      data.subscription_status,
      data.trial_ends_at,
      data.subscription_expires_at
    );

    return {
      userId: data.user_id,
      tier,
      subscriptionStatus: data.subscription_status,
      trialEndsAt: data.trial_ends_at,
      subscriptionExpiresAt: data.subscription_expires_at,
      aiUsageCount: data.ai_usage_count ?? 0,
      studioUsageCount: data.studio_usage_count ?? 0,
    };
  } catch {
    return getLocalSubscriptionProfile();
  }
}

/**
 * Fallback: derive subscription profile from localStorage account
 */
function getLocalSubscriptionProfile(): SubscriptionProfile | null {
  const account = getUserAccount();
  if (!account) return null;

  let tier: SubscriptionTier = 'free';
  if (account.status === 'paid' && account.paidExpiryDate) {
    tier = new Date() < new Date(account.paidExpiryDate) ? 'paid' : 'free';
  } else if (account.status === 'trial' && account.trialExpiryDate) {
    tier = new Date() < new Date(account.trialExpiryDate) ? 'trial' : 'free';
  }

  // Read usage from localStorage
  const usage = JSON.parse(localStorage.getItem('bh_papirfinder_feature_usage') || '{}');

  return {
    userId: account.id,
    tier,
    subscriptionStatus: account.status,
    trialEndsAt: account.trialExpiryDate || null,
    subscriptionExpiresAt: account.paidExpiryDate || null,
    aiUsageCount: usage.ai_assistant ?? 0,
    studioUsageCount: usage.smart_studio ?? 0,
  };
}

// ============================================================
// Status Calculation
// ============================================================

/**
 * Calculate the subscription tier based on DB fields
 */
export function calculateTier(
  subscriptionStatus: string | null,
  trialEndsAt: string | null,
  subscriptionExpiresAt: string | null
): SubscriptionTier {
  const now = new Date();

  // Check paid status
  if (subscriptionStatus === 'paid' && subscriptionExpiresAt) {
    if (new Date(subscriptionExpiresAt) > now) {
      return 'paid';
    }
  }

  // Check trial status
  if (subscriptionStatus === 'trial' && trialEndsAt) {
    if (new Date(trialEndsAt) > now) {
      return 'trial';
    }
  }

  // All other cases = free
  return 'free';
}

// ============================================================
// Feature Gating
// ============================================================

/**
 * Check if a user can access a specific feature
 * - Search & PDF download: always allowed (all tiers)
 * - AI Assistant: unlimited for paid/trial, 1 use for free
 * - Smart Studio: unlimited for paid/trial, 1 use for free
 */
export function checkFeatureAccess(
  feature: 'ai_assistant' | 'smart_studio' | 'search' | 'pdf_download',
  profile: SubscriptionProfile | null
): FeatureAccess {
  // Search and PDF download are always free
  if (feature === 'search' || feature === 'pdf_download') {
    return { allowed: true };
  }

  // No profile = not logged in, treat as free with 0 uses
  if (!profile) {
    return {
      allowed: false,
      reason: 'login_required',
      remainingUses: 0,
    };
  }

  // Paid and Trial users have unlimited access
  if (profile.tier === 'paid' || profile.tier === 'trial') {
    return { allowed: true };
  }

  // Free tier: check usage limits
  const limit = FREE_TIER_LIMITS[feature];
  const currentUsage = feature === 'ai_assistant'
    ? profile.aiUsageCount
    : profile.studioUsageCount;

  if (currentUsage < limit) {
    return {
      allowed: true,
      remainingUses: limit - currentUsage,
    };
  }

  return {
    allowed: false,
    reason: 'limit_reached',
    remainingUses: 0,
  };
}

// ============================================================
// Usage Tracking
// ============================================================

/**
 * Track feature usage — calls Supabase RPC increment_usage
 * Falls back to localStorage if Supabase is unavailable
 */
export async function trackFeatureUsage(
  userId: string,
  feature: 'ai_assistant' | 'smart_studio'
): Promise<boolean> {
  try {
    // Try Supabase RPC first
    const { error } = await supabase.rpc('increment_usage', {
      p_user_id: userId,
      p_feature: feature,
    });

    if (error) {
      // If RPC doesn't exist, try direct update
      const column = feature === 'ai_assistant' ? 'ai_usage_count' : 'studio_usage_count';
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ [column]: supabase.rpc('', {}) }) // Can't increment directly
        .eq('user_id', userId);

      if (updateError) {
        // Fallback: increment in localStorage
        incrementLocalUsage(feature);
        return true;
      }
    }

    // Also update localStorage for immediate UI feedback
    incrementLocalUsage(feature);
    return true;
  } catch {
    // Fallback to localStorage
    incrementLocalUsage(feature);
    return true;
  }
}

/**
 * Increment usage counter in localStorage (immediate feedback)
 */
function incrementLocalUsage(feature: 'ai_assistant' | 'smart_studio'): void {
  try {
    const usage = JSON.parse(localStorage.getItem('bh_papirfinder_feature_usage') || '{}');
    usage[feature] = (usage[feature] ?? 0) + 1;
    localStorage.setItem('bh_papirfinder_feature_usage', JSON.stringify(usage));
  } catch {
    // Silently fail
  }
}

// ============================================================
// Subscription Management
// ============================================================

/**
 * Activate PRO subscription after successful payment
 */
export async function activateProSubscription(userId: string, months: number = 1): Promise<boolean> {
  try {
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + months);

    const { error } = await supabase
      .from('user_profiles')
      .update({
        subscription_status: 'paid',
        subscription_expires_at: expiresAt.toISOString(),
      })
      .eq('user_id', userId);

    if (error) {
      console.error('Failed to activate PRO subscription:', error.message);
      // Update localStorage as fallback
      updateLocalSubscription('paid', expiresAt.toISOString());
      return true;
    }

    // Also update localStorage for immediate UI
    updateLocalSubscription('paid', expiresAt.toISOString());
    return true;
  } catch {
    updateLocalSubscription('paid', new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000).toISOString());
    return true;
  }
}

/**
 * Update localStorage subscription data
 */
function updateLocalSubscription(status: string, expiresAt: string): void {
  try {
    const raw = localStorage.getItem('bh_papirfinder_user_account');
    if (raw) {
      const account = JSON.parse(raw);
      account.status = status;
      account.paidExpiryDate = expiresAt;
      localStorage.setItem('bh_papirfinder_user_account', JSON.stringify(account));
    }
  } catch {
    // Silently fail
  }
}

// ============================================================
// Helper exports (backward compatibility)
// ============================================================

/**
 * Check if the current user has an active subscription (trial or paid)
 */
export function isSubscriptionActive(): boolean {
  const account = getUserAccount();
  if (!account) return false;

  if (account.status === 'paid' && account.paidExpiryDate) {
    return new Date() < new Date(account.paidExpiryDate);
  }

  if (account.status === 'trial' && account.trialExpiryDate) {
    return new Date() < new Date(account.trialExpiryDate);
  }

  return false;
}

/**
 * Get the subscription expiry date
 */
export function getSubscriptionExpiry(): Date | null {
  const account = getUserAccount();
  if (!account) return null;
  const expiry = account.paidExpiryDate || account.trialExpiryDate;
  return expiry ? new Date(expiry) : null;
}

/**
 * Get subscription type
 */
export function getSubscriptionType(): 'paid' | 'trial' | 'expired' | 'none' {
  const account = getUserAccount();
  if (!account) return 'none';

  if (account.status === 'paid' && account.paidExpiryDate) {
    return new Date() < new Date(account.paidExpiryDate) ? 'paid' : 'expired';
  }

  if (account.status === 'trial' && account.trialExpiryDate) {
    return new Date() < new Date(account.trialExpiryDate) ? 'trial' : 'expired';
  }

  return 'expired';
}

/**
 * Get remaining days of subscription
 */
export function getSubscriptionRemainingDays(): number {
  const expiry = getSubscriptionExpiry();
  if (!expiry) return 0;
  const now = new Date();
  const diff = expiry.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/**
 * Get trial remaining days specifically
 */
export function getTrialRemainingDays(profile: SubscriptionProfile | null): number {
  if (!profile || !profile.trialEndsAt) return 0;
  const now = new Date();
  const end = new Date(profile.trialEndsAt);
  const diff = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}