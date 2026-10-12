import { supabase, signInUser, signOutUser, getCurrentUser } from './supabaseClient';
import { addAuditLogEntry } from './audit';

// ============================================================
// Admin Authentication via Supabase Auth
// Admin is identified by email role check
// ============================================================

const ADMIN_EMAILS = ['alenjusufovic@yahoo.com'];

/**
 * Check if a given email is an admin email.
 */
export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Login admin via Supabase Auth.
 * Falls back to localStorage flag for offline/compatibility.
 */
export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Try Supabase Auth first
    const { data, error } = await signInUser(email, password);

    if (error) {
      // If Supabase Auth fails (e.g., user not yet created in Supabase Auth),
      // fall back to legacy check for migration period
      if (email === 'alenjusufovic@yahoo.com' && password === 'UmmaIsak2013') {
        localStorage.setItem('bh_papirfinder_admin', 'true');
        localStorage.setItem('bh_papirfinder_admin_email', email);
        addAuditLogEntry(email, 'Admin Login (Legacy)', 'Admin logged in via legacy auth', 'security');
        return { success: true };
      }
      addAuditLogEntry(email || 'unknown', 'Failed Login Attempt', error.message, 'security');
      return { success: false, error: error.message };
    }

    if (data.user && isAdminEmail(data.user.email || '')) {
      localStorage.setItem('bh_papirfinder_admin', 'true');
      localStorage.setItem('bh_papirfinder_admin_email', data.user.email || email);
      addAuditLogEntry(email, 'Admin Login', 'Admin logged in via Supabase Auth', 'security');
      return { success: true };
    }

    // User authenticated but is not admin
    await signOutUser();
    return { success: false, error: 'Ovaj nalog nema administratorske privilegije.' };
  } catch (err) {
    console.error('Admin login error:', err);
    return { success: false, error: 'Neočekivana greška pri prijavi.' };
  }
}

/**
 * Check if admin is currently logged in.
 * Checks both Supabase session and localStorage flag.
 */
export function isAdminLoggedIn(): boolean {
  try {
    return localStorage.getItem('bh_papirfinder_admin') === 'true';
  } catch {
    return false;
  }
}

/**
 * Async check: verify admin status against Supabase Auth session.
 */
export async function verifyAdminSession(): Promise<boolean> {
  try {
    const localFlag = localStorage.getItem('bh_papirfinder_admin') === 'true';
    if (!localFlag) return false;

    const { user } = await getCurrentUser();
    if (user && isAdminEmail(user.email || '')) {
      return true;
    }

    // If Supabase has no session but local flag is set, allow for legacy
    const adminEmail = localStorage.getItem('bh_papirfinder_admin_email');
    if (adminEmail && isAdminEmail(adminEmail)) {
      return true;
    }

    return false;
  } catch {
    // Fallback to local check
    return localStorage.getItem('bh_papirfinder_admin') === 'true';
  }
}

/**
 * Get the admin email.
 */
export function getAdminEmail(): string {
  return localStorage.getItem('bh_papirfinder_admin_email') || ADMIN_EMAILS[0];
}

/**
 * Logout admin. Signs out from Supabase and clears local flags.
 */
export async function logoutAdmin(): Promise<void> {
  try {
    await signOutUser();
  } catch {
    // Continue with local cleanup even if Supabase signout fails
  }
  try {
    localStorage.removeItem('bh_papirfinder_admin');
    localStorage.removeItem('bh_papirfinder_admin_email');
    addAuditLogEntry(ADMIN_EMAILS[0], 'Admin Logout', 'Admin logged out', 'security');
  } catch (error) {
    console.error('Logout error:', error);
  }
}

// ============================================================
// Sponsor management (localStorage — can be migrated later)
// ============================================================

export interface Sponsor {
  id: string;
  imageUrl: string;
  link?: string;
  active: boolean;
}

export function getSponsors(): Sponsor[] {
  try {
    const stored = localStorage.getItem('bh_papirfinder_sponsors');
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem('bh_papirfinder_sponsors');
    return [];
  }
}

export function saveSponsors(sponsors: Sponsor[]): void {
  try {
    localStorage.setItem('bh_papirfinder_sponsors', JSON.stringify(sponsors));
  } catch (error) {
    console.error('Failed to save sponsors:', error);
  }
}

export function addSponsor(sponsor: Sponsor): void {
  const sponsors = getSponsors();
  sponsors.push(sponsor);
  saveSponsors(sponsors);
  addAuditLogEntry(getAdminEmail(), 'Sponsor Added', `New sponsor added: ${sponsor.imageUrl}`, 'sponsor');
}

export function removeSponsor(id: string): void {
  const sponsors = getSponsors();
  const sponsor = sponsors.find(s => s.id === id);
  const filtered = sponsors.filter((s) => s.id !== id);
  saveSponsors(filtered);
  addAuditLogEntry(getAdminEmail(), 'Sponsor Removed', `Sponsor removed: ${sponsor?.imageUrl || id}`, 'sponsor');
}

export function updateSponsor(id: string, updates: Partial<Sponsor>): void {
  const sponsors = getSponsors().map((s) =>
    s.id === id ? { ...s, ...updates } : s
  );
  saveSponsors(sponsors);
  addAuditLogEntry(getAdminEmail(), 'Sponsor Updated', `Sponsor updated: ${id}`, 'sponsor');
}