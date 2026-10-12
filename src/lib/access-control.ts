// Access control logic for BiH PapirFinder
// Synchronized with both localStorage (backward compat) and Supabase Auth
import { isAdminLoggedIn } from './auth';
import { getUserAccount, UserAccount } from './trial';
import { supabase } from './supabaseClient';

export interface AccessLevel {
  canViewFormNames: boolean;
  canViewFormUrls: boolean;
  isAdmin: boolean;
  hasSubscription: boolean;
}

// Cache for Supabase subscription check to avoid repeated queries
let supabaseSubscriptionCache: { status: string | null; expiresAt: string | null; checkedAt: number } | null = null;
const CACHE_TTL = 60 * 1000; // 1 minute cache

/**
 * Get the current user's access level (synchronous — uses localStorage + cache)
 */
export function getUserAccessLevel(): AccessLevel {
  const isAdmin = isAdminLoggedIn();

  if (isAdmin) {
    return {
      canViewFormNames: true,
      canViewFormUrls: true,
      isAdmin: true,
      hasSubscription: true,
    };
  }

  // Check localStorage first (backward compat)
  const userAccount = getUserAccount();
  const localSubscription = userAccount?.status === 'paid' ||
    (userAccount?.status === 'trial' && !isTrialExpired(userAccount));

  // Check Supabase cache
  const supabaseSub = checkSupabaseSubscriptionCache();

  // User has access if EITHER local or Supabase says they're subscribed
  const hasSubscription = localSubscription || supabaseSub;

  return {
    canViewFormNames: true, // All users can see form names
    canViewFormUrls: hasSubscription, // Only subscribed users can see URLs
    isAdmin: false,
    hasSubscription,
  };
}

/**
 * Check Supabase subscription from cache (non-blocking)
 */
function checkSupabaseSubscriptionCache(): boolean {
  if (!supabaseSubscriptionCache) return false;
  if (Date.now() - supabaseSubscriptionCache.checkedAt > CACHE_TTL) return false;

  if (supabaseSubscriptionCache.status === 'paid' && supabaseSubscriptionCache.expiresAt) {
    return new Date() < new Date(supabaseSubscriptionCache.expiresAt);
  }

  return false;
}

/**
 * Async: Refresh subscription status from Supabase Auth session
 * Call this on app load and after login to sync state
 */
export async function refreshSubscriptionFromSupabase(): Promise<void> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      supabaseSubscriptionCache = null;
      return;
    }

    // Check user_profiles table for subscription data
    const { data, error } = await supabase
      .from('user_profiles')
      .select('subscription_status, subscription_expires_at')
      .eq('user_id', session.user.id)
      .single();

    if (error || !data) {
      supabaseSubscriptionCache = null;
      return;
    }

    supabaseSubscriptionCache = {
      status: data.subscription_status,
      expiresAt: data.subscription_expires_at,
      checkedAt: Date.now(),
    };
  } catch {
    // Silently fail — localStorage is the fallback
    supabaseSubscriptionCache = null;
  }
}

/**
 * Check if trial has expired
 */
function isTrialExpired(account: UserAccount): boolean {
  if (!account.trialExpiryDate) return true;
  const now = new Date();
  const expiryDate = new Date(account.trialExpiryDate);
  return now >= expiryDate;
}

/**
 * Check if user can access URLs
 */
export function canAccessUrls(): boolean {
  const access = getUserAccessLevel();
  return access.canViewFormUrls;
}

/**
 * Check if user is admin
 */
export function isAdmin(): boolean {
  return isAdminLoggedIn();
}

/**
 * Get subscription status message
 */
export function getSubscriptionMessage(language: string = 'bs'): string {
  const access = getUserAccessLevel();

  if (access.isAdmin) {
    return language === 'en'
      ? 'Admin - Full Access'
      : 'Admin - Pun pristup';
  }

  if (access.hasSubscription) {
    return language === 'en'
      ? 'Subscribed - Full Access'
      : 'Pretplaćen - Pun pristup';
  }

  return language === 'en'
    ? 'Subscribe to access form URLs'
    : 'Pretplatite se za pristup URL-ovima obrazaca';
}

/**
 * Initialize access control — call on app startup
 * Syncs Supabase Auth state with local access control
 */
export async function initializeAccessControl(): Promise<void> {
  // Refresh subscription from Supabase in background
  refreshSubscriptionFromSupabase().catch(() => {
    // Silent fail — localStorage remains the fallback
  });

  // Listen for auth state changes to keep subscription in sync
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      refreshSubscriptionFromSupabase();
    } else {
      supabaseSubscriptionCache = null;
    }
  });
}