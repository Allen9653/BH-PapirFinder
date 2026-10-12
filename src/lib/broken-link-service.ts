// Broken Link Reporting Service
// Stores reports in localStorage (with optional Supabase sync)
// Includes: user feedback, admin email alerts, usage analytics tracking
import { supabase } from './supabaseClient';

export interface BrokenLinkReport {
  id: string;
  municipalityName: string;
  municipalitySlug?: string;
  formName?: string;
  formId?: string;
  brokenUrl: string;
  reportedBy?: string;
  description?: string;
  status: 'pending' | 'reviewed' | 'fixed' | 'dismissed';
  createdAt: string;
  userFeedback?: ReportFeedback;
}

export interface ReportFeedback {
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  submittedAt: string;
}

export interface ReportAnalytics {
  totalReports: number;
  reportsThisWeek: number;
  reportsThisMonth: number;
  topMunicipalities: { name: string; count: number }[];
  averageFeedbackRating: number;
  feedbackCount: number;
  reportsByStatus: Record<string, number>;
  reportsByDay: { date: string; count: number }[];
}

const STORAGE_KEY = 'bh_papirfinder_broken_links';
const ANALYTICS_KEY = 'bh_papirfinder_report_analytics';
const ADMIN_EMAILS_KEY = 'bh_papirfinder_admin_alert_emails';

// Default admin emails for alerts
const DEFAULT_ADMIN_EMAILS = ['admin@bhpapirfinder.ba'];

/**
 * Get all broken link reports from localStorage
 */
export function getLocalReports(): BrokenLinkReport[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Get admin alert emails
 */
export function getAdminAlertEmails(): string[] {
  try {
    const stored = localStorage.getItem(ADMIN_EMAILS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_ADMIN_EMAILS;
  } catch {
    return DEFAULT_ADMIN_EMAILS;
  }
}

/**
 * Set admin alert emails
 */
export function setAdminAlertEmails(emails: string[]): void {
  localStorage.setItem(ADMIN_EMAILS_KEY, JSON.stringify(emails));
}

/**
 * Track report usage event
 */
function trackReportEvent(eventType: 'report_submitted' | 'report_dialog_opened' | 'feedback_submitted', metadata?: Record<string, string>): void {
  try {
    const analyticsRaw = localStorage.getItem(ANALYTICS_KEY);
    const analytics: Array<{ event: string; timestamp: string; metadata?: Record<string, string> }> = analyticsRaw ? JSON.parse(analyticsRaw) : [];

    analytics.push({
      event: eventType,
      timestamp: new Date().toISOString(),
      metadata,
    });

    // Keep only last 1000 events to avoid storage bloat
    if (analytics.length > 1000) {
      analytics.splice(0, analytics.length - 1000);
    }

    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
  } catch {
    // Silent fail
  }

  // Also try to log to Supabase analytics table (non-blocking)
  void Promise.resolve(supabase.from('report_analytics_events').insert({
    event_type: eventType,
    metadata: metadata || {},
    created_at: new Date().toISOString(),
  })).catch(() => { /* silent */ });
}

/**
 * Track when the report dialog is opened
 */
export function trackDialogOpened(context?: { municipalityName?: string; formId?: string }): void {
  trackReportEvent('report_dialog_opened', {
    municipality: context?.municipalityName || 'unknown',
    form_id: context?.formId || 'none',
  });
}

/**
 * Send admin email alert about a new broken link report
 * Uses Supabase Edge Function or fallback notification system
 */
async function sendAdminEmailAlert(report: BrokenLinkReport): Promise<void> {
  const adminEmails = getAdminAlertEmails();

  try {
    // Try Supabase Edge Function for email sending
    const { error } = await supabase.functions.invoke('send-admin-alert', {
      body: {
        to: adminEmails,
        subject: `[BH PapirFinder] Nova prijava neispravnog linka - ${report.municipalityName}`,
        reportId: report.id,
        municipalityName: report.municipalityName,
        formName: report.formName || 'N/A',
        brokenUrl: report.brokenUrl,
        description: report.description || 'Bez opisa',
        reportedBy: report.reportedBy || 'Anonimni korisnik',
        reportedAt: report.createdAt,
      },
    });

    if (error) {
      console.warn('Admin email alert via Edge Function failed:', error.message);
      // Fallback: store pending alert for next admin login
      storePendingAdminAlert(report);
    }
  } catch {
    // Fallback: store pending alert for next admin login
    storePendingAdminAlert(report);
  }
}

/**
 * Store pending admin alert (shown when admin logs in)
 */
function storePendingAdminAlert(report: BrokenLinkReport): void {
  try {
    const PENDING_KEY = 'bh_papirfinder_pending_admin_alerts';
    const pendingRaw = localStorage.getItem(PENDING_KEY);
    const pending: BrokenLinkReport[] = pendingRaw ? JSON.parse(pendingRaw) : [];
    pending.push(report);
    // Keep max 50 pending alerts
    if (pending.length > 50) pending.splice(0, pending.length - 50);
    localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  } catch {
    // Silent fail
  }
}

/**
 * Get and clear pending admin alerts
 */
export function getPendingAdminAlerts(): BrokenLinkReport[] {
  try {
    const PENDING_KEY = 'bh_papirfinder_pending_admin_alerts';
    const pendingRaw = localStorage.getItem(PENDING_KEY);
    const pending: BrokenLinkReport[] = pendingRaw ? JSON.parse(pendingRaw) : [];
    localStorage.removeItem(PENDING_KEY);
    return pending;
  } catch {
    return [];
  }
}

/**
 * Save a broken link report with email alert and tracking
 */
export async function reportBrokenLink(report: Omit<BrokenLinkReport, 'id' | 'status' | 'createdAt'>): Promise<{ success: boolean; error?: string }> {
  const newReport: BrokenLinkReport = {
    ...report,
    id: `blr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  // Save locally first
  const existing = getLocalReports();
  existing.push(newReport);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

  // Track the submission event
  trackReportEvent('report_submitted', {
    municipality: newReport.municipalityName,
    form_id: newReport.formId || 'none',
    has_email: newReport.reportedBy ? 'yes' : 'no',
  });

  // Try to sync to Supabase (non-blocking)
  try {
    await supabase.from('broken_link_reports').insert({
      municipality_name: newReport.municipalityName,
      municipality_slug: newReport.municipalitySlug || null,
      form_name: newReport.formName || null,
      form_id: newReport.formId || null,
      broken_url: newReport.brokenUrl,
      reported_by: newReport.reportedBy || null,
      description: newReport.description || null,
      status: 'pending',
    });
  } catch {
    // Silent fail — local storage is the primary store
  }

  // Send admin email alert (non-blocking)
  sendAdminEmailAlert(newReport).catch(() => { /* silent */ });

  return { success: true };
}

/**
 * Submit user feedback on the reporting experience
 */
export async function submitReportFeedback(
  reportId: string,
  feedback: Omit<ReportFeedback, 'submittedAt'>
): Promise<{ success: boolean }> {
  const feedbackData: ReportFeedback = {
    ...feedback,
    submittedAt: new Date().toISOString(),
  };

  // Update local report with feedback
  const reports = getLocalReports();
  const idx = reports.findIndex((r) => r.id === reportId);
  if (idx >= 0) {
    reports[idx].userFeedback = feedbackData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  }

  // Track feedback event
  trackReportEvent('feedback_submitted', {
    report_id: reportId,
    rating: feedbackData.rating.toString(),
  });

  // Sync to Supabase
  try {
    await supabase.from('report_feedback').insert({
      report_id: reportId,
      rating: feedbackData.rating,
      comment: feedbackData.comment || null,
      submitted_at: feedbackData.submittedAt,
    });
  } catch {
    // Silent fail
  }

  return { success: true };
}

/**
 * Get usage analytics for the reporting feature
 */
export function getReportAnalytics(): ReportAnalytics {
  const reports = getLocalReports();
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Reports this week/month
  const reportsThisWeek = reports.filter((r) => new Date(r.createdAt) >= weekAgo).length;
  const reportsThisMonth = reports.filter((r) => new Date(r.createdAt) >= monthAgo).length;

  // Top municipalities
  const municipalityCounts: Record<string, number> = {};
  for (const report of reports) {
    const name = report.municipalityName || 'Unknown';
    municipalityCounts[name] = (municipalityCounts[name] || 0) + 1;
  }
  const topMunicipalities = Object.entries(municipalityCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Average feedback rating
  const feedbacks = reports.filter((r) => r.userFeedback).map((r) => r.userFeedback!);
  const averageFeedbackRating = feedbacks.length > 0
    ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
    : 0;

  // Reports by status
  const reportsByStatus: Record<string, number> = {};
  for (const report of reports) {
    reportsByStatus[report.status] = (reportsByStatus[report.status] || 0) + 1;
  }

  // Reports by day (last 30 days)
  const reportsByDay: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = day.toISOString().split('T')[0];
    const count = reports.filter((r) => r.createdAt.startsWith(dateStr)).length;
    reportsByDay.push({ date: dateStr, count });
  }

  // Also get event-level analytics
  let analyticsEvents: Array<{ event: string; timestamp: string }> = [];
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    analyticsEvents = raw ? JSON.parse(raw) : [];
  } catch {
    // ignore
  }

  const dialogOpens = analyticsEvents.filter((e) => e.event === 'report_dialog_opened').length;
  const submissions = analyticsEvents.filter((e) => e.event === 'report_submitted').length;

  return {
    totalReports: reports.length,
    reportsThisWeek,
    reportsThisMonth,
    topMunicipalities,
    averageFeedbackRating: Math.round(averageFeedbackRating * 10) / 10,
    feedbackCount: feedbacks.length,
    reportsByStatus,
    reportsByDay,
    // Additional metrics accessible via the object
    ...({ dialogOpens, submissions, conversionRate: dialogOpens > 0 ? Math.round((submissions / dialogOpens) * 100) : 0 } as Record<string, number>),
  };
}

/**
 * Get all reports (for admin view)
 */
export async function getAllReports(): Promise<BrokenLinkReport[]> {
  try {
    const { data, error } = await supabase
      .from('broken_link_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return getLocalReports();
    }

    return data.map((row) => ({
      id: row.id?.toString() || `db_${row.created_at}`,
      municipalityName: row.municipality_name || '',
      municipalitySlug: row.municipality_slug || undefined,
      formName: row.form_name || undefined,
      formId: row.form_id || undefined,
      brokenUrl: row.broken_url || '',
      reportedBy: row.reported_by || undefined,
      description: row.description || undefined,
      status: row.status || 'pending',
      createdAt: row.created_at || new Date().toISOString(),
    }));
  } catch {
    return getLocalReports();
  }
}

/**
 * Update report status (admin only)
 */
export async function updateReportStatus(reportId: string, status: BrokenLinkReport['status']): Promise<boolean> {
  try {
    // Update in Supabase
    const { error } = await supabase
      .from('broken_link_reports')
      .update({ status })
      .eq('id', reportId);

    if (error) {
      // Fallback: update locally
      const reports = getLocalReports();
      const idx = reports.findIndex((r) => r.id === reportId);
      if (idx >= 0) {
        reports[idx].status = status;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
      }
    }

    return true;
  } catch {
    return false;
  }
}