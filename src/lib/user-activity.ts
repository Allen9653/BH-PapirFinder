// ============================================================
// User Activity Tracking Service
// Tracks user actions for analytics and insights
// ============================================================

import { supabase, getCurrentUser } from './supabaseClient';

export interface UserActivity {
  id?: string;
  user_id: string | null;
  action: string;
  details: Record<string, string>;
  page?: string;
  created_at: string;
}

const LOCAL_ACTIVITY_KEY = 'bh_papirfinder_user_activity';
const MAX_LOCAL_ENTRIES = 200;

/**
 * Track a user activity event
 * Stores locally and syncs to Supabase when available
 */
export function trackUserActivity(
  action: string,
  details: Record<string, string> = {},
  page?: string
): void {
  const entry = {
    action,
    details,
    page: page || (typeof window !== 'undefined' ? window.location.pathname : ''),
    created_at: new Date().toISOString(),
  };

  // Store locally
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_ACTIVITY_KEY) || '[]');
    existing.unshift(entry);
    if (existing.length > MAX_LOCAL_ENTRIES) {
      existing.splice(MAX_LOCAL_ENTRIES);
    }
    localStorage.setItem(LOCAL_ACTIVITY_KEY, JSON.stringify(existing));
  } catch {
    // ignore
  }

  // Sync to Supabase (non-blocking)
  syncActivityToSupabase(entry).catch(() => { /* silent */ });
}

/**
 * Sync a single activity entry to Supabase
 */
async function syncActivityToSupabase(entry: {
  action: string;
  details: Record<string, string>;
  page?: string;
  created_at: string;
}): Promise<void> {
  try {
    const { user } = await getCurrentUser();
    await supabase.from('user_activity').insert({
      user_id: user?.id || null,
      action: entry.action,
      details: entry.details,
      page: entry.page || null,
      created_at: entry.created_at,
    });
  } catch {
    // Silent fail — localStorage is the fallback
  }
}

/**
 * Get local activity history
 */
export function getLocalActivity(): UserActivity[] {
  try {
    const raw = localStorage.getItem(LOCAL_ACTIVITY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Get activity from Supabase for the current user
 */
export async function getUserActivityFromSupabase(limit: number = 50): Promise<UserActivity[]> {
  try {
    const { user } = await getCurrentUser();
    if (!user) return getLocalActivity();

    const { data, error } = await supabase
      .from('user_activity')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error || !data) return getLocalActivity();
    return data;
  } catch {
    return getLocalActivity();
  }
}

/**
 * Track page view
 */
export function trackPageView(pageName: string): void {
  trackUserActivity('page_view', { page_name: pageName });
}

/**
 * Track search
 */
export function trackSearch(query: string, resultsCount: number): void {
  trackUserActivity('search', { query, results_count: String(resultsCount) });
}

/**
 * Track form view
 */
export function trackFormView(formName: string, municipality: string): void {
  trackUserActivity('form_view', { form_name: formName, municipality });
}

/**
 * Track subscription event
 */
export function trackSubscriptionEvent(event: string, plan?: string): void {
  trackUserActivity('subscription', { event, plan: plan || '' });
}

/**
 * Get activity summary for admin dashboard
 */
export async function getActivitySummary(): Promise<{
  totalActions: number;
  todayActions: number;
  topActions: { action: string; count: number }[];
  recentUsers: number;
}> {
  const activities = getLocalActivity();
  const today = new Date().toISOString().split('T')[0];
  const todayActivities = activities.filter(a => a.created_at.startsWith(today));

  // Count actions
  const actionCounts: Record<string, number> = {};
  for (const a of activities) {
    actionCounts[a.action] = (actionCounts[a.action] || 0) + 1;
  }

  const topActions = Object.entries(actionCounts)
    .map(([action, count]) => ({ action, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalActions: activities.length,
    todayActions: todayActivities.length,
    topActions,
    recentUsers: 0, // Would need Supabase query
  };
}