import { supabase, signInUser, signOutUser, getCurrentUser } from './supabaseClient';
import { addAuditLogEntry } from './audit';

// ============================================================
// Admin Authentication & Configuration via Environment Variables
// ============================================================

// Čitanje admin email adresa iz okruženjskih varijabli (podijeljenih zarezom)
const getAdminEmailsFromEnv = (): string[] => {
  const envVar = 
    (typeof window !== 'undefined' ? (window as any).__ENV?.VITE_ADMIN_EMAILS || (import.meta as any)?.env?.VITE_ADMIN_EMAILS) : 
    (typeof process !== 'undefined' ? process.env.VITE_ADMIN_EMAILS || process.env.ADMIN_EMAILS : '');

  if (!envVar) return [];
  return envVar.split(',').map((email: string) => email.trim().toLowerCase()).filter(Boolean);
};

// Fallback na prazan niz ako varijable nisu postavljene (sprečava curenje privatnih podataka u kod)
const ADMIN_EMAILS: string[] = getAdminEmailsFromEnv();

/**
 * Check if a given email is an admin email.
 */
export function isAdminEmail(email: string): boolean {
  if (!email) return false;
  // Ako u .env fajlu nisu definisani admini, nijedan email nema automatski admin prava
  if (ADMIN_EMAILS.length === 0) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Login admin via Supabase Auth.
 */
export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Sigurnosna provjera prije slanja zahtjeva
    if (!isAdminEmail(email)) {
      return { success: false, error: 'Ovaj nalog nema administratorske privilegije.' };
    }

    const { data, error } = await signInUser(email, password);

    if (error) {
      addAuditLogEntry(email || 'unknown', 'Failed Login Attempt', error.message, 'security');
      return { success: false, error: error.message };
    }

    if (data.user && isAdminEmail(data.user.email || '')) {
      localStorage.setItem('bh_papirfinder_admin', 'true');
      localStorage.setItem('bh_papirfinder_admin_email', data.user.email || email);
      addAuditLogEntry(email, 'Admin Login', 'Admin logged in via Supabase Auth', 'security');
      return { success: true };
    }

    // Korisnik je autentifikovan ali nije admin
    await signOutUser();
    return { success: false, error: 'Ovaj nalog nema administratorske privilegije.' };
  } catch (err) {
    console.error('Admin login error:', err);
    return { success: false, error: 'Neočekivana greška pri prijavi.' };
  }
}

/**
 * Check if admin is currently logged in.
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

    const adminEmail = localStorage.getItem('bh_papirfinder_admin_email');
    if (adminEmail && isAdminEmail(adminEmail)) {
      return true;
    }

    return false;
  } catch {
    return localStorage.getItem('bh_papirfinder_admin') === 'true';
  }
}

/**
 * Get the admin email.
 */
export function getAdminEmail(): string {
  return localStorage.getItem('bh_papirfinder_admin_email') || ADMIN_EMAILS[0] || 'admin@bh-papirfinder.ba';
}

/**
 * Logout admin. Signs out from Supabase and clears local flags.
 */
export async function logoutAdmin(): Promise<void> {
  const currentAdmin = getAdminEmail();
  try {
    await signOutUser();
  } catch {
    // Nastavi sa čišćenjem lokalnih podataka čak i ako Supabase odjava ne uspije
  }
  try {
    localStorage.removeItem('bh_papirfinder_admin');
    localStorage.removeItem('bh_papirfinder_admin_email');
    addAuditLogEntry(currentAdmin, 'Admin Logout', 'Admin logged out', 'security');
  } catch (error) {
    console.error('Logout error:', error);
  }
}

// ============================================================
// Sponsor management (localStorage)
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
