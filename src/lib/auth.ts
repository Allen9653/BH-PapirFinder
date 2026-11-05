import { supabase, signInUser, signOutUser, getCurrentUser } from './supabaseClient';
import { addAuditLogEntry } from './audit';
import type { User } from '@supabase/supabase-js';

let verifiedAdminEmail: string | null = null;

function isAdminUser(user: User | null | undefined): user is User {
  return user?.app_metadata?.role === 'admin';
}

/**
 * Login admin via Supabase Auth.
 * Admin access requires the server-managed Supabase app_metadata role.
 */
export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const trimmedEmail = email.trim().toLowerCase();
    const { data, error } = await signInUser(trimmedEmail, password);

    if (error) {
      addAuditLogEntry(trimmedEmail, 'Failed Admin Login Attempt', error.message, 'security');
      return { success: false, error: 'Neispravna lozinka ili email adresa.' };
    }

    if (isAdminUser(data.user)) {
      verifiedAdminEmail = data.user.email ?? trimmedEmail;
      addAuditLogEntry(trimmedEmail, 'Admin Login', 'Admin logged in via Supabase Auth', 'security');
      return { success: true };
    }

    // User authenticated but is not an authorized admin
    await signOutUser();
    addAuditLogEntry(trimmedEmail, 'Unauthorized Admin Login Attempt', 'Supabase app_metadata role is not admin', 'security');
    return { success: false, error: 'Ovaj nalog nema administratorske privilegije.' };
  } catch (err) {
    console.error('Admin login error:', err);
    return { success: false, error: 'Neočekivana greška pri prijavi.' };
  }
}

/**
 * Check if admin is currently logged in.
 * Uses only the in-memory state set after server-verified Supabase authentication.
 */
export function isAdminLoggedIn(): boolean {
  return verifiedAdminEmail !== null;
}

/**
 * Async check: verify the current Supabase Auth user and server-managed admin role.
 */
export async function verifyAdminSession(): Promise<boolean> {
  try {
    const { user } = await getCurrentUser();
    if (isAdminUser(user)) {
      verifiedAdminEmail = user.email ?? null;
      return true;
    }

    verifiedAdminEmail = null;
    return false;
  } catch {
    verifiedAdminEmail = null;
    return false;
  }
}

/**
 * Get the admin email.
 */
export function getAdminEmail(): string {
  return verifiedAdminEmail ?? '';
}

/**
 * Logout admin and clear the verified in-memory admin session.
 */
export async function logoutAdmin(): Promise<void> {
  const adminEmail = verifiedAdminEmail;
  verifiedAdminEmail = null;
  try {
    await signOutUser();
  } catch {
    // Continue with local cleanup even if Supabase signout fails
  }
  try {
    addAuditLogEntry(adminEmail || 'unknown', 'Admin Logout', 'Admin logged out', 'security');
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