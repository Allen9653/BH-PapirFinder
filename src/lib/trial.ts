// Trial Mode Management
// User accounts are now managed via Supabase Auth
// Trial/subscription status tracked locally + can be extended to Supabase

import { recordSearchLog } from './supabaseClient';

export interface TrialStatus {
  isActive: boolean;
  startDate: string;
  expiryDate: string;
  daysRemaining: number;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  loginCode?: string;
  status: 'trial' | 'paid' | 'expired';
  trialStartDate?: string;
  trialExpiryDate?: string;
  paidExpiryDate?: string;
  createdAt: string;
}

const TRIAL_DAYS = 10;

// Generate a simple login code
function generateLoginCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Register new user and start trial (localStorage-based, for backward compat)
export function registerUser(name: string, email: string): { success: boolean; message?: string; loginCode?: string } {
  const existingAccount = getUserAccount();
  if (existingAccount && existingAccount.email === email) {
    return { success: false, message: 'Korisnik sa ovim email-om već postoji.' };
  }

  const now = new Date();
  const expiryDate = new Date(now.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);
  const loginCode = generateLoginCode();

  const account: UserAccount = {
    id: Date.now().toString(),
    name,
    email,
    loginCode,
    status: 'trial',
    trialStartDate: now.toISOString(),
    trialExpiryDate: expiryDate.toISOString(),
    createdAt: now.toISOString(),
  };

  localStorage.setItem('bh_papirfinder_user_account', JSON.stringify(account));
  localStorage.setItem('bh_papirfinder_trial_start', now.toISOString());
  localStorage.setItem('bh_papirfinder_user_logged_in', 'true');

  return { success: true, loginCode };
}

// Login user with email and login code (localStorage-based)
export function loginUser(email: string, loginCode: string): boolean {
  const account = getUserAccount();

  if (!account) return false;

  if (account.email === email && account.loginCode === loginCode) {
    localStorage.setItem('bh_papirfinder_user_logged_in', 'true');
    return true;
  }

  return false;
}

// Initialize trial for new user (legacy function)
export function startTrial(email: string, name: string): UserAccount {
  const now = new Date();
  const expiryDate = new Date(now.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);

  const account: UserAccount = {
    id: Date.now().toString(),
    name,
    email,
    loginCode: generateLoginCode(),
    status: 'trial',
    trialStartDate: now.toISOString(),
    trialExpiryDate: expiryDate.toISOString(),
    createdAt: now.toISOString(),
  };

  localStorage.setItem('bh_papirfinder_user_account', JSON.stringify(account));
  localStorage.setItem('bh_papirfinder_trial_start', now.toISOString());

  return account;
}

// Get current user account
export function getUserAccount(): UserAccount | null {
  const stored = localStorage.getItem('bh_papirfinder_user_account');
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

// Check trial status
export function getTrialStatus(): TrialStatus | null {
  const account = getUserAccount();
  if (!account || !account.trialStartDate || !account.trialExpiryDate) {
    return null;
  }

  const now = new Date();
  const expiryDate = new Date(account.trialExpiryDate);
  const daysRemaining = Math.max(0, Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  return {
    isActive: now < expiryDate,
    startDate: account.trialStartDate,
    expiryDate: account.trialExpiryDate,
    daysRemaining,
  };
}

// Check if user has access (trial or paid)
export function hasAccess(): boolean {
  const account = getUserAccount();
  if (!account) return false;

  if (account.status === 'paid') {
    if (account.paidExpiryDate) {
      const now = new Date();
      const expiryDate = new Date(account.paidExpiryDate);
      return now < expiryDate;
    }
    return true;
  }

  if (account.status === 'trial') {
    const trialStatus = getTrialStatus();
    return trialStatus ? trialStatus.isActive : false;
  }

  return false;
}

// Update account to paid status
export function upgradeToPaid(planId: string, expiryDate: string): void {
  const account = getUserAccount();
  if (!account) return;

  account.status = 'paid';
  account.paidExpiryDate = expiryDate;

  localStorage.setItem('bh_papirfinder_user_account', JSON.stringify(account));
}

// Check if trial has expired
export function isTrialExpired(): boolean {
  const account = getUserAccount();
  if (!account || account.status !== 'trial') return false;

  const trialStatus = getTrialStatus();
  return trialStatus ? !trialStatus.isActive : true;
}

// Get remaining days (trial or paid)
export function getRemainingDays(): number {
  const account = getUserAccount();
  if (!account) return 0;

  if (account.status === 'trial') {
    const trialStatus = getTrialStatus();
    return trialStatus ? trialStatus.daysRemaining : 0;
  }

  if (account.status === 'paid' && account.paidExpiryDate) {
    const now = new Date();
    const expiryDate = new Date(account.paidExpiryDate);
    return Math.max(0, Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  }

  return 0;
}

// Record search — writes to Supabase search_logs with localStorage fallback
export function recordSearch(query: string, resultsCount: number): void {
  // Fire and forget — async write to Supabase
  recordSearchLog(query, resultsCount).catch(err => {
    console.error('Failed to record search to Supabase:', err);
  });
}

// Logout user
export function logoutUser(): void {
  localStorage.removeItem('bh_papirfinder_user_account');
  localStorage.removeItem('bh_papirfinder_trial_start');
  localStorage.removeItem('bh_papirfinder_user_logged_in');
}

// Check if user is logged in
export function isUserLoggedIn(): boolean {
  return getUserAccount() !== null;
}