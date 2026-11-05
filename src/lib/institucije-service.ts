// ============================================================
// Institucije (Institutions/Municipalities) Service
// CRUD operations for the institucije Supabase table
// ============================================================

import { supabase } from './supabaseClient';

// ============================================================
// Types
// ============================================================

export interface Institucija {
  id: string;
  naziv: string;
  slug: string;
  kanton: string | null;
  kanton_kratko: string | null;
  entitet: string | null;
  official_url: string | null;
  created_at: string;
  status?: string | null;
  stabilnost?: string | null;
  access_method?: string | null;
  is_foreign?: boolean | null;
  brand_link?: string | null;
}

export interface InstitucijaInsert {
  naziv: string;
  slug: string;
  kanton?: string;
  kanton_kratko?: string;
  entitet?: string;
  official_url?: string;
}

export interface InstitucijaUpdate {
  naziv?: string;
  slug?: string;
  kanton?: string;
  kanton_kratko?: string;
  entitet?: string;
  official_url?: string;
}

// ============================================================
// CRUD Operations
// ============================================================

/** Fetch all institutions */
export async function getAllInstitucije(): Promise<Institucija[]> {
  const { data, error } = await supabase
    .from('institucije')
    .select('*')
    .order('naziv', { ascending: true });

  if (error) {
    console.error('Error fetching institucije:', error.message);
    return [];
  }
  return data || [];
}

/** Get institution by ID */
export async function getInstitucijaById(id: string): Promise<Institucija | null> {
  const { data, error } = await supabase
    .from('institucije')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching institucija by ID:', error.message);
    return null;
  }
  return data;
}

/** Get institution by slug */
export async function getInstitucijaBySlug(slug: string): Promise<Institucija | null> {
  const { data, error } = await supabase
    .from('institucije')
    .select('*')
    .eq('slug', slug.toLowerCase())
    .single();

  if (error) {
    console.error('Error fetching institucija by slug:', error.message);
    return null;
  }
  return data;
}

/** Search institutions by name or kanton */
export async function searchInstitucije(query: string): Promise<Institucija[]> {
  if (!query.trim()) return [];

  const searchTerm = query.trim().toLowerCase();

  const { data, error } = await supabase
    .from('institucije')
    .select('*')
    .or(`naziv.ilike.%${searchTerm}%,kanton.ilike.%${searchTerm}%,slug.ilike.%${searchTerm}%`)
    .order('naziv', { ascending: true });

  if (error) {
    console.error('Error searching institucije:', error.message);
    return [];
  }
  return data || [];
}

/** Create a new institution */
export async function createInstitucija(
  institucija: InstitucijaInsert
): Promise<{ data: Institucija | null; error: string | null }> {
  const { data, error } = await supabase
    .from('institucije')
    .insert({
      ...institucija,
      slug: institucija.slug.toLowerCase(),
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating institucija:', error.message);
    return { data: null, error: error.message };
  }
  return { data, error: null };
}

/** Update an institution */
export async function updateInstitucija(
  id: string,
  updates: InstitucijaUpdate
): Promise<{ data: Institucija | null; error: string | null }> {
  const { data, error } = await supabase
    .from('institucije')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating institucija:', error.message);
    return { data: null, error: error.message };
  }
  return { data, error: null };
}

/** Delete an institution (cascades to dokumenti) */
export async function deleteInstitucija(
  id: string
): Promise<{ success: boolean; error: string | null }> {
  const { error } = await supabase
    .from('institucije')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting institucija:', error.message);
    return { success: false, error: error.message };
  }
  return { success: true, error: null };
}

/** Get institution count */
export async function getInstitucijeCount(): Promise<number> {
  const { count, error } = await supabase
    .from('institucije')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error counting institucije:', error.message);
    return 0;
  }
  return count || 0;
}