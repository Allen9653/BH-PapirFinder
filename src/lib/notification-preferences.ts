// Notification Preferences Service
// Allows users to customize how they receive updates about their broken link reports
import { supabase } from './supabaseClient';

export interface NotificationPreferences {
  userId?: string;
  email: string;
  // Report update notifications
  reportStatusChanged: boolean;    // When report status changes (fixed, reviewed, dismissed)
  reportResolved: boolean;         // When a reported link is fixed
  weeklyDigest: boolean;           // Weekly summary of all report activity
  // Communication preferences
  emailNotifications: boolean;     // Receive email notifications
  pushNotifications: boolean;      // Browser push notifications
  inAppNotifications: boolean;     // In-app notification badge/toast
  // Frequency
  notificationFrequency: 'instant' | 'daily' | 'weekly';
  // Language preference for notifications
  notificationLanguage: 'bs' | 'en' | 'de' | 'tr';
  updatedAt: string;
}

const PREFS_STORAGE_KEY = 'bh_papirfinder_notification_prefs';

const DEFAULT_PREFERENCES: Omit<NotificationPreferences, 'userId' | 'email' | 'updatedAt'> = {
  reportStatusChanged: true,
  reportResolved: true,
  weeklyDigest: false,
  emailNotifications: true,
  pushNotifications: false,
  inAppNotifications: true,
  notificationFrequency: 'instant',
  notificationLanguage: 'bs',
};

/**
 * Get notification preferences for the current user
 */
export function getNotificationPreferences(): NotificationPreferences {
  try {
    const stored = localStorage.getItem(PREFS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }

  return {
    ...DEFAULT_PREFERENCES,
    email: '',
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Save notification preferences locally and sync to Supabase
 */
export async function saveNotificationPreferences(
  prefs: Partial<NotificationPreferences>
): Promise<{ success: boolean; error?: string }> {
  try {
    const current = getNotificationPreferences();
    const updated: NotificationPreferences = {
      ...current,
      ...prefs,
      updatedAt: new Date().toISOString(),
    };

    // Save locally
    localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(updated));

    // Sync to Supabase (non-blocking)
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('notification_preferences').upsert({
          user_id: user.id,
          email: updated.email || user.email,
          report_status_changed: updated.reportStatusChanged,
          report_resolved: updated.reportResolved,
          weekly_digest: updated.weeklyDigest,
          email_notifications: updated.emailNotifications,
          push_notifications: updated.pushNotifications,
          in_app_notifications: updated.inAppNotifications,
          notification_frequency: updated.notificationFrequency,
          notification_language: updated.notificationLanguage,
          updated_at: updated.updatedAt,
        }, { onConflict: 'user_id' });
      }
    } catch {
      // Silent fail — localStorage is primary
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

/**
 * Load preferences from Supabase (for logged-in users)
 */
export async function loadPreferencesFromSupabase(): Promise<NotificationPreferences | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error || !data) return null;

    const prefs: NotificationPreferences = {
      userId: data.user_id,
      email: data.email || user.email || '',
      reportStatusChanged: data.report_status_changed ?? true,
      reportResolved: data.report_resolved ?? true,
      weeklyDigest: data.weekly_digest ?? false,
      emailNotifications: data.email_notifications ?? true,
      pushNotifications: data.push_notifications ?? false,
      inAppNotifications: data.in_app_notifications ?? true,
      notificationFrequency: data.notification_frequency || 'instant',
      notificationLanguage: data.notification_language || 'bs',
      updatedAt: data.updated_at || new Date().toISOString(),
    };

    // Update local storage
    localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));

    return prefs;
  } catch {
    return null;
  }
}

/**
 * Check if user wants a specific notification type
 */
export function shouldNotify(type: 'reportStatusChanged' | 'reportResolved' | 'weeklyDigest'): boolean {
  const prefs = getNotificationPreferences();
  return prefs[type] === true;
}

/**
 * Request browser push notification permission
 */
export async function requestPushPermission(): Promise<'granted' | 'denied' | 'default'> {
  if (!('Notification' in window)) {
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  const permission = await Notification.requestPermission();
  return permission;
}

/**
 * Show an in-app notification (browser notification if permitted)
 */
export function showInAppNotification(title: string, body: string): void {
  const prefs = getNotificationPreferences();

  if (prefs.pushNotifications && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
    });
  }
}

/**
 * Get unread in-app notifications count
 */
export function getUnreadNotificationCount(): number {
  try {
    const raw = localStorage.getItem('bh_papirfinder_unread_notifications');
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

/**
 * Increment unread notification count
 */
export function incrementUnreadCount(): void {
  const current = getUnreadNotificationCount();
  localStorage.setItem('bh_papirfinder_unread_notifications', String(current + 1));
}

/**
 * Clear unread notification count
 */
export function clearUnreadCount(): void {
  localStorage.setItem('bh_papirfinder_unread_notifications', '0');
}