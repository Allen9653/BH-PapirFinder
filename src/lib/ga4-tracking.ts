// ============================================================
// Google Analytics 4 Event Tracking
// Measurement ID: G-NHKDTRR0KB
// ============================================================

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Send a custom event to Google Analytics 4
 */
export function trackGA4Event(
  eventName: string,
  params: Record<string, string | number | boolean> = {}
): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

// ============================================================
// Predefined Events for BH PapirFinder
// ============================================================

/** Track when a user searches for forms */
export function trackSearchEvent(query: string, resultsCount: number): void {
  trackGA4Event('search', {
    search_term: query,
    results_count: resultsCount,
  });
}

/** Track when a user downloads a PDF */
export function trackPdfDownload(formName: string, municipality: string): void {
  trackGA4Event('file_download', {
    file_name: formName,
    municipality: municipality,
    file_extension: 'pdf',
  });
}

/** Track when a user reports a broken link */
export function trackBrokenLinkReport(municipality: string, formName: string): void {
  trackGA4Event('broken_link_report', {
    municipality: municipality,
    form_name: formName,
  });
}

/** Track when AI assistant is launched */
export function trackAIAssistantLaunch(formName: string): void {
  trackGA4Event('ai_assistant_launch', {
    form_name: formName,
  });
}

/** Track user registration */
export function trackRegistration(method: string): void {
  trackGA4Event('sign_up', {
    method: method,
  });
}

/** Track user login */
export function trackLogin(method: string): void {
  trackGA4Event('login', {
    method: method,
  });
}

/** Track subscription purchase */
export function trackSubscriptionPurchase(planId: string, value: number): void {
  trackGA4Event('purchase', {
    currency: 'BAM',
    value: value,
    items: planId,
  });
}

/** Track page view (for SPA navigation) */
export function trackPageView(pagePath: string, pageTitle: string): void {
  trackGA4Event('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
}

/** Track form view */
export function trackFormView(formName: string, municipality: string): void {
  trackGA4Event('view_item', {
    item_name: formName,
    item_category: municipality,
  });
}

/** Track subscription expiry warning shown */
export function trackExpiryWarning(daysRemaining: number): void {
  trackGA4Event('subscription_expiry_warning', {
    days_remaining: daysRemaining,
  });
}