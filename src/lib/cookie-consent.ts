export const COOKIE_CONSENT_KEY = 'bh_papirfinder_cookie_consent';
export const GA_ID = 'G-NHKDTRR0KB';

export type CookieConsent = { analytics: boolean; decidedAt: string };

export function getCookieConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    return raw ? (JSON.parse(raw) as CookieConsent) : null;
  } catch {
    return null;
  }
}

/** Sprema izbor i odmah uključuje/isključuje Google Analytics (ga-disable zastavica). */
export function setCookieConsent(analytics: boolean): CookieConsent {
  const value = { analytics, decidedAt: new Date().toISOString() };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(value));
  if (GA_ID) (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !analytics;
  return value;
}
