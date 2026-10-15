import { createClient } from '@supabase/supabase-js';

// ============================================================
// Supabase Configuration & Environment Variables
// ============================================================

// Podržava Vite (import.meta.env) i standardni Node.js/Vercel (process.env)
const getEnvVar = (key: string): string => {
  if (typeof window !== 'undefined') {
    // Klijentsko okruženje (Vite / Next.js browser)
    // @ts-ignore
    return (window.__ENV?.[key]) || (import.meta?.env?.[key]) || '';
  }
  // Serversko / Build okruženje
  return (typeof process !== 'undefined' ? process.env[key] : '') || '';
};

// Dohvatanje URL-a i Anon ključa iz sigurnih okruženjskih varijabli
const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || getEnvVar('NEXT_PUBLIC_SUPABASE_URL') || getEnvVar('SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY') || getEnvVar('SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Upozorenje: Supabase URL ili Anon Key nisu pronađeni u environment varijablama. Aplikacija će koristiti lokalni fallback režim.'
  );
}

// Inicijalizacija Supabase klijenta sa sigurnim varijablama (prazni stringovi sprečavaju grešku pri inicijalizaciji ako fale varijable)
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder-key');

// ============================================================
// Table: app_7cd5641924_institutions
// ============================================================

export interface Institution {
  id: string;
  name: string;
  base_url: string;
  category: string;
  region: string;
  is_premium: boolean;
  trust_score: number;
  created_at: string;
  updated_at: string;
}

// ============================================================
// Table: app_7cd5641924_deployment_config
// ============================================================

export interface DeploymentConfig {
  id: string;
  platform: string;
  store_url: string;
  download_url: string;
  created_at: string;
  updated_at: string;
}

// ============================================================
// Table: search_logs (user-created in Supabase dashboard)
// Expected columns: id, user_id, query, results_count, created_at
// ============================================================

export interface SearchLog {
  id?: string;
  user_id: string | null;
  query: string;
  results_count: number;
  created_at?: string;
}

// ============================================================
// Sort options for trust_score
// ============================================================

export type SortOption = 'trust_score_desc' | 'trust_score_asc' | 'name_asc' | 'name_desc';

export function getSortLabel(sort: SortOption, language: string = 'bs'): string {
  const labels: Record<SortOption, Record<string, string>> = {
    trust_score_desc: { bs: 'Najviši trust score', en: 'Highest trust score' },
    trust_score_asc: { bs: 'Najniži trust score', en: 'Lowest trust score' },
    name_asc: { bs: 'Naziv (A-Z)', en: 'Name (A-Z)' },
    name_desc: { bs: 'Naziv (Z-A)', en: 'Name (Z-A)' },
  };
  return labels[sort]?.[language] || labels[sort]?.['bs'] || sort;
}

// ============================================================
// Supabase connection status tracker
// ============================================================

let supabaseAvailable: boolean | null = null;

export async function checkSupabaseConnection(): Promise<boolean> {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (supabaseAvailable !== null) return supabaseAvailable;

  try {
    const { error } = await supabase
      .from('app_7cd5641924_institutions')
      .select('id')
      .limit(1);

    supabaseAvailable = !error;
    return supabaseAvailable;
  } catch {
    supabaseAvailable = false;
    return false;
  }
}

export function resetConnectionCache(): void {
  supabaseAvailable = null;
}

// ============================================================
// Supabase Auth helpers
// ============================================================

/** Sign up a new user with email and password */
export async function signUpUser(email: string, password: string, fullName: string, captchaToken?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${window.location.origin}/login`,
      ...(captchaToken ? { captchaToken } : {}),
    },
  });
  return { data, error };
}

/** Resend the signup confirmation email */
export async function resendConfirmation(email: string) {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: { emailRedirectTo: `${window.location.origin}/login` },
  });
  return { error };
}

/** Sign in with email and password */
export async function signInUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

/** Sign out current user */
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/** Get current session */
export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
}

/** Get current user */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

/** Delete current user account (user-initiated) */
export async function deleteUserAccount() {
  const { error } = await supabase.auth.signOut();
  clearAllLocalData();
  return { error };
}

/** Listen for auth state changes */
export function onAuthStateChange(callback: (event: string, session: unknown) => void) {
  return supabase.auth.onAuthStateChange(callback);
}

// ============================================================
// Search Logs — Supabase CRUD
// ============================================================

export async function recordSearchLog(query: string, resultsCount: number): Promise<boolean> {
  try {
    const { user } = await getCurrentUser();
    const userId = user?.id || null;

    const { error } = await supabase
      .from('search_logs')
      .insert({
        user_id: userId,
        query: query.trim(),
        results_count: resultsCount,
      });

    if (error) {
      recordSearchLocally(query, resultsCount);
      return false;
    }

    return true;
  } catch {
    recordSearchLocally(query, resultsCount);
    return false;
  }
}

export async function clearSearchHistory(): Promise<{ success: boolean; message: string }> {
  try {
    const { user } = await getCurrentUser();

    if (!user) {
      clearLocalSearchHistory();
      return { success: true, message: 'Lokalna historija pretrage je obrisana.' };
    }

    const { error } = await supabase
      .from('search_logs')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      return { success: false, message: 'Greška pri brisanju historije. Pokušajte ponovo.' };
    }

    clearLocalSearchHistory();
    return { success: true, message: 'Historija pretrage je uspješno obrisana.' };
  } catch {
    return { success: false, message: 'Neočekivana greška. Pokušajte ponovo.' };
  }
}

export async function getSearchHistory(limit: number = 50): Promise<SearchLog[]> {
  try {
    const { user } = await getCurrentUser();

    if (!user) {
      return getLocalSearchHistory();
    }

    const { data, error } = await supabase
      .from('search_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      return getLocalSearchHistory();
    }

    return data || [];
  } catch {
    return getLocalSearchHistory();
  }
}

// ============================================================
// Analytics queries (for Admin Dashboard)
// ============================================================

export async function getTotalSearchCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('search_logs')
      .select('*', { count: 'exact', head: true });

    if (error) return 0;
    return count || 0;
  } catch {
    return 0;
  }
}

export async function getTopSearches(limit: number = 10): Promise<{ query: string; count: number; last_searched: string }[]> {
  try {
    const { data, error } = await supabase
      .from('search_logs')
      .select('query, created_at')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (error || !data) return [];

    const queryMap = new Map<string, { count: number; lastSearched: string }>();
    for (const row of data) {
      const q = row.query.toLowerCase().trim();
      const existing = queryMap.get(q);
      if (existing) {
        existing.count++;
        if (row.created_at > existing.lastSearched) {
          existing.lastSearched = row.created_at;
        }
      } else {
        queryMap.set(q, { count: 1, lastSearched: row.created_at });
      }
    }

    return Array.from(queryMap.entries())
      .map(([query, info]) => ({ query, count: info.count, last_searched: info.lastSearched }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  } catch {
    return [];
  }
}

export async function getDailySearchStats(days: number = 14): Promise<{ date: string; searches: number }[]> {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('search_logs')
      .select('created_at')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });

    if (error || !data) return [];

    const dateMap = new Map<string, number>();
    for (let i = days; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dateMap.set(d.toISOString().split('T')[0], 0);
    }

    for (const row of data) {
      const dateKey = row.created_at.split('T')[0];
      dateMap.set(dateKey, (dateMap.get(dateKey) || 0) + 1);
    }

    return Array.from(dateMap.entries())
      .map(([date, searches]) => ({ date, searches }))
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return [];
  }
}

export async function getRecentSearchActivity(limit: number = 20): Promise<SearchLog[]> {
  try {
    const { data, error } = await supabase
      .from('search_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

export async function getUniqueSearchUserCount(): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('search_logs')
      .select('user_id')
      .not('user_id', 'is', null);

    if (error || !data) return 0;
    const uniqueUsers = new Set(data.map(d => d.user_id));
    return uniqueUsers.size;
  } catch {
    return 0;
  }
}

// ============================================================
// Institution queries (Supabase)
// ============================================================

export async function searchInstitutions(query: string, sort: SortOption = 'trust_score_desc'): Promise<Institution[]> {
  if (!query.trim()) return [];

  const searchTerm = query.trim().toLowerCase();
  const sortConfig = getSortConfig(sort);

  const { data, error } = await supabase
    .from('app_7cd5641924_institutions')
    .select('*')
    .or(`name.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%,region.ilike.%${searchTerm}%`)
    .order(sortConfig.column, { ascending: sortConfig.ascending });

  if (error) return [];
  return data || [];
}

export async function getAllInstitutions(sort: SortOption = 'trust_score_desc'): Promise<Institution[]> {
  const sortConfig = getSortConfig(sort);

  const { data, error } = await supabase
    .from('app_7cd5641924_institutions')
    .select('*')
    .order(sortConfig.column, { ascending: sortConfig.ascending });

  if (error) return [];
  return data || [];
}

export async function getInstitutionsByRegion(region: string, sort: SortOption = 'trust_score_desc'): Promise<Institution[]> {
  const sortConfig = getSortConfig(sort);

  const { data, error } = await supabase
    .from('app_7cd5641924_institutions')
    .select('*')
    .ilike('region', `%${region}%`)
    .order(sortConfig.column, { ascending: sortConfig.ascending });

  if (error) return [];
  return data || [];
}

export async function getInstitutionsByCategory(category: string, sort: SortOption = 'trust_score_desc'): Promise<Institution[]> {
  const sortConfig = getSortConfig(sort);

  const { data, error } = await supabase
    .from('app_7cd5641924_institutions')
    .select('*')
    .ilike('category', `%${category}%`)
    .order(sortConfig.column, { ascending: sortConfig.ascending });

  if (error) return [];
  return data || [];
}

export async function getPremiumInstitutions(sort: SortOption = 'trust_score_desc'): Promise<Institution[]> {
  const sortConfig = getSortConfig(sort);

  const { data, error } = await supabase
    .from('app_7cd5641924_institutions')
    .select('*')
    .eq('is_premium', true)
    .order(sortConfig.column, { ascending: sortConfig.ascending });

  if (error) return [];
  return data || [];
}

export async function getInstitutionCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('app_7cd5641924_institutions')
      .select('*', { count: 'exact', head: true });

    if (error) return 0;
    return count || 0;
  } catch {
    return 0;
  }
}

// ============================================================
// Deployment config queries
// ============================================================

export async function getDeploymentConfigs(): Promise<DeploymentConfig[]> {
  const { data, error } = await supabase
    .from('app_7cd5641924_deployment_config')
    .select('*')
    .order('platform');

  if (error) return [];
  return data || [];
}

export async function getDeploymentConfigByPlatform(platform: string): Promise<DeploymentConfig | null> {
  const { data, error } = await supabase
    .from('app_7cd5641924_deployment_config')
    .select('*')
    .eq('platform', platform)
    .single();

  if (error) return null;
  return data;
}

// ============================================================
// Helper: Sort configuration
// ============================================================

function getSortConfig(sort: SortOption): { column: string; ascending: boolean } {
  switch (sort) {
    case 'trust_score_desc':
      return { column: 'trust_score', ascending: false };
    case 'trust_score_asc':
      return { column: 'trust_score', ascending: true };
    case 'name_asc':
      return { column: 'name', ascending: true };
    case 'name_desc':
      return { column: 'name', ascending: false };
    default:
      return { column: 'trust_score', ascending: false };
  }
}

// ============================================================
// Local storage fallbacks
// ============================================================

function recordSearchLocally(query: string, resultsCount: number): void {
  try {
    const searches = JSON.parse(localStorage.getItem('bh_papirfinder_searches') || '[]');
    searches.unshift({
      query,
      results_count: resultsCount,
      created_at: new Date().toISOString(),
    });
    localStorage.setItem('bh_papirfinder_searches', JSON.stringify(searches.slice(0, 50)));
  } catch {}
}

function clearLocalSearchHistory(): void {
  try {
    localStorage.removeItem('bh_papirfinder_searches');
  } catch {}
}

function getLocalSearchHistory(): SearchLog[] {
  try {
    const raw = localStorage.getItem('bh_papirfinder_searches');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((s: Record<string, unknown>, i: number) => ({
      id: String(i),
      user_id: null,
      query: String(s.query || ''),
      results_count: Number(s.results_count || s.resultsCount || 0),
      created_at: String(s.created_at || s.timestamp || ''),
    })) : [];
  } catch {
    return [];
  }
}

function clearAllLocalData(): void {
  const keysToRemove = [
    'bh_papirfinder_user_account',
    'bh_papirfinder_trial_start',
    'bh_papirfinder_user_logged_in',
    'bh_papirfinder_user_session',
    'bh_papirfinder_searches',
    'bh_papirfinder_language',
    'bh_papirfinder_admin',
    'bh_papirfinder_admin_email',
    'bh_papirfinder_sponsors',
    'bh_papirfinder_audit_log',
    'bh_papirfinder_storage_version',
  ];
  keysToRemove.forEach(key => {
    try { localStorage.removeItem(key); } catch {}
  });
}
