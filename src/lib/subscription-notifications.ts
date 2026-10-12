// ============================================================
// Subscription Expiry Notification Service
// Notifies users when their subscription is about to expire
// ============================================================

import { getUserAccount } from './trial';
import { getSubscriptionRemainingDays, getSubscriptionType } from './subscription';

export interface ExpiryNotification {
  id: string;
  type: 'warning' | 'urgent' | 'expired';
  message: string;
  daysRemaining: number;
  dismissedAt?: string;
}

const DISMISSED_KEY = 'bh_papirfinder_expiry_dismissed';
const NOTIFICATION_THRESHOLDS = [7, 3, 1, 0]; // Days before expiry to notify

/**
 * Check if user should see an expiry notification
 */
export function getExpiryNotification(): ExpiryNotification | null {
  const account = getUserAccount();
  if (!account) return null;

  const subType = getSubscriptionType();
  if (subType === 'none') return null;

  const daysRemaining = getSubscriptionRemainingDays();

  // Check if notification was already dismissed today
  const dismissed = getDismissedNotifications();
  const today = new Date().toISOString().split('T')[0];

  if (subType === 'expired') {
    const dismissKey = `expired_${today}`;
    if (dismissed.includes(dismissKey)) return null;

    return {
      id: dismissKey,
      type: 'expired',
      message: getExpiredMessage(account.status),
      daysRemaining: 0,
    };
  }

  // Find the appropriate threshold
  for (const threshold of NOTIFICATION_THRESHOLDS) {
    if (daysRemaining <= threshold && daysRemaining >= 0) {
      const dismissKey = `${threshold}_${today}`;
      if (dismissed.includes(dismissKey)) continue;

      const type = threshold === 0 ? 'expired' : threshold <= 1 ? 'urgent' : 'warning';

      return {
        id: dismissKey,
        type,
        message: getExpiryMessage(daysRemaining, account.status),
        daysRemaining,
      };
    }
  }

  return null;
}

/**
 * Dismiss an expiry notification
 */
export function dismissExpiryNotification(notificationId: string): void {
  try {
    const dismissed = getDismissedNotifications();
    dismissed.push(notificationId);
    // Keep only last 30 entries
    if (dismissed.length > 30) dismissed.splice(0, dismissed.length - 30);
    localStorage.setItem(DISMISSED_KEY, JSON.stringify(dismissed));
  } catch {
    // ignore
  }
}

/**
 * Get dismissed notification IDs
 */
function getDismissedNotifications(): string[] {
  try {
    const raw = localStorage.getItem(DISMISSED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Get expiry message based on days remaining
 */
function getExpiryMessage(daysRemaining: number, status: string): string {
  const planType = status === 'trial' ? 'probni period' : 'pretplata';

  if (daysRemaining === 0) {
    return `Vaš ${planType} ističe danas! Produžite pretplatu da ne izgubite pristup.`;
  }
  if (daysRemaining === 1) {
    return `Vaš ${planType} ističe sutra! Produžite sada da zadržite pristup.`;
  }
  if (daysRemaining <= 3) {
    return `Vaš ${planType} ističe za ${daysRemaining} dana. Produžite pretplatu na vrijeme.`;
  }
  return `Vaš ${planType} ističe za ${daysRemaining} dana.`;
}

/**
 * Get expired message
 */
function getExpiredMessage(status: string): string {
  if (status === 'trial') {
    return 'Vaš besplatni probni period je istekao. Pretplatite se za nastavak korištenja.';
  }
  return 'Vaša pretplata je istekla. Obnovite pretplatu za nastavak pristupa.';
}

/**
 * Get notification color based on type
 */
export function getNotificationColor(type: ExpiryNotification['type']): {
  bg: string;
  border: string;
  text: string;
  icon: string;
} {
  switch (type) {
    case 'expired':
      return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: 'text-red-600' };
    case 'urgent':
      return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', icon: 'text-orange-600' };
    case 'warning':
      return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: 'text-yellow-600' };
  }
}