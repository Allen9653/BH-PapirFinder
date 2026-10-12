// ============================================================
// Dokumenti (Documents/Forms) Service
// CRUD operations for dokumenti + dokumenti_prevodi Supabase tables
// ============================================================

import { supabase } from './supabaseClient';

// ============================================================
// Types
// ============================================================

export interface Dokument {
  id: string;
  institucija_id: string;
  naziv_original: string;
  opis_original: string | null;
  kategorija: string | null;
  file_url: string;
  storage_path: string | null;
  velicina_kb: number | null;
  keywords: string | null;
  created_at: string;
}

export interface DokumentWithInstitucija extends Dokument {
  institucije?: {
    id: string;
    naziv: string;
    slug: string;
    kanton: string | null;
    kanton_kratko: string | null;
    entitet: string | null;
  } | null;
}

export interface DokumentPrevod {
  id: string;
  dokument_id: string;
  jezik: string;
  naziv_preveden: string;
  opis_preveden: string | null;
}

export interface DokumentInsert {
  institucija_id: string;
  naziv_original: string;
  opis_original?: string;
  kategorija?: string;
  file_url: string;
  storage_path?: string;
  velicina_kb?: number;
  keywords?: string;
}

export interface DokumentUpdate {
  naziv_original?: string;
  opis_original?: string;
  kategorija?: string;
  file_url?: string;
  storage_path?: string;
  velicina_kb?: number;
  keywords?: string;
}

export interface PrevodInsert {
  dokument_id: string;
  jezik: string;
  naziv_preveden: string;
  opis_preveden?: string;
}

// ============================================================
// Document CRUD
// ============================================================

/** Fetch all documents (with optional institution join) */
export async function getAllDokumenti(): Promise<DokumentWithInstitucija[]> {
  const { data, error } = await supabase
    .from('dokumenti')
    .select(`
      *,
      institucije (id, naziv, slug, kanton, kanton_kratko, entitet)
    `)
    .order('naziv_original', { ascending: true });

  if (error) {
    console.error('Error fetching dokumenti:', error.message);
    return [];
  }
  return data || [];
}

/** Fetch documents by institution ID */
export async function getDokumentiByInstitucija(
  institucijaId: string
): Promise<Dokument[]> {
  const { data, error } = await supabase
    .from('dokumenti')
    .select('*')
    .eq('institucija_id', institucijaId)
    .order('kategorija', { ascending: true })
    .order('naziv_original', { ascending: true });

  if (error) {
    console.error('Error fetching dokumenti by institucija:', error.message);
    return [];
  }
  return data || [];
}

/** Fetch documents by institution slug (joins institucije table) */
export async function getDokumentiBySlug(
  slug: string
): Promise<DokumentWithInstitucija[]> {
  const { data, error } = await supabase
    .from('dokumenti')
    .select(`
      *,
      institucije!inner (id, naziv, slug, kanton, kanton_kratko, entitet)
    `)
    .eq('institucije.slug', slug.toLowerCase())
    .order('kategorija', { ascending: true })
    .order('naziv_original', { ascending: true });

  if (error) {
    console.error('Error fetching dokumenti by slug:', error.message);
    return [];
  }
  return data || [];
}

/** Get a single document by ID (with institution) */
export async function getDokumentById(
  id: string
): Promise<DokumentWithInstitucija | null> {
  const { data, error } = await supabase
    .from('dokumenti')
    .select(`
      *,
      institucije (id, naziv, slug, kanton, kanton_kratko, entitet)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching dokument by ID:', error.message);
    return null;
  }
  return data;
}

/** Search documents by name, category, or keywords */
export async function searchDokumenti(
  query: string,
  institucijaId?: string
): Promise<DokumentWithInstitucija[]> {
  if (!query.trim()) return [];

  const searchTerm = query.trim().toLowerCase();

  let queryBuilder = supabase
    .from('dokumenti')
    .select(`
      *,
      institucije (id, naziv, slug, kanton, kanton_kratko, entitet)
    `)
    .or(`naziv_original.ilike.%${searchTerm}%,kategorija.ilike.%${searchTerm}%,opis_original.ilike.%${searchTerm}%,keywords.ilike.%${searchTerm}%`);

  if (institucijaId) {
    queryBuilder = queryBuilder.eq('institucija_id', institucijaId);
  }

  const { data, error } = await queryBuilder
    .order('naziv_original', { ascending: true })
    .limit(50);

  if (error) {
    console.error('Error searching dokumenti:', error.message);
    return [];
  }
  return data || [];
}

/** Get documents by category */
export async function getDokumentiByKategorija(
  kategorija: string,
  institucijaId?: string
): Promise<Dokument[]> {
  let queryBuilder = supabase
    .from('dokumenti')
    .select('*')
    .ilike('kategorija', kategorija);

  if (institucijaId) {
    queryBuilder = queryBuilder.eq('institucija_id', institucijaId);
  }

  const { data, error } = await queryBuilder
    .order('naziv_original', { ascending: true });

  if (error) {
    console.error('Error fetching dokumenti by kategorija:', error.message);
    return [];
  }
  return data || [];
}

/** Get unique categories for an institution */
export async function getKategorije(institucijaId?: string): Promise<string[]> {
  let queryBuilder = supabase
    .from('dokumenti')
    .select('kategorija');

  if (institucijaId) {
    queryBuilder = queryBuilder.eq('institucija_id', institucijaId);
  }

  const { data, error } = await queryBuilder;

  if (error) {
    console.error('Error fetching kategorije:', error.message);
    return [];
  }

  const uniqueCategories = new Set<string>();
  for (const row of data || []) {
    if (row.kategorija) {
      uniqueCategories.add(row.kategorija);
    }
  }
  return Array.from(uniqueCategories).sort();
}

/** Create a new document */
export async function createDokument(
  dokument: DokumentInsert
): Promise<{ data: Dokument | null; error: string | null }> {
  const { data, error } = await supabase
    .from('dokumenti')
    .insert(dokument)
    .select()
    .single();

  if (error) {
    console.error('Error creating dokument:', error.message);
    return { data: null, error: error.message };
  }
  return { data, error: null };
}

/** Update a document */
export async function updateDokument(
  id: string,
  updates: DokumentUpdate
): Promise<{ data: Dokument | null; error: string | null }> {
  const { data, error } = await supabase
    .from('dokumenti')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating dokument:', error.message);
    return { data: null, error: error.message };
  }
  return { data, error: null };
}

/** Delete a document (cascades to translations) */
export async function deleteDokument(
  id: string
): Promise<{ success: boolean; error: string | null }> {
  const { error } = await supabase
    .from('dokumenti')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting dokument:', error.message);
    return { success: false, error: error.message };
  }
  return { success: true, error: null };
}

/** Get document count (optionally by institution) */
export async function getDokumentiCount(institucijaId?: string): Promise<number> {
  let queryBuilder = supabase
    .from('dokumenti')
    .select('*', { count: 'exact', head: true });

  if (institucijaId) {
    queryBuilder = queryBuilder.eq('institucija_id', institucijaId);
  }

  const { count, error } = await queryBuilder;

  if (error) {
    console.error('Error counting dokumenti:', error.message);
    return 0;
  }
  return count || 0;
}

// ============================================================
// Translation CRUD
// ============================================================

/** Get translations for a document */
export async function getPrevodiForDokument(
  dokumentId: string
): Promise<DokumentPrevod[]> {
  const { data, error } = await supabase
    .from('dokumenti_prevodi')
    .select('*')
    .eq('dokument_id', dokumentId)
    .order('jezik', { ascending: true });

  if (error) {
    console.error('Error fetching prevodi:', error.message);
    return [];
  }
  return data || [];
}

/** Get translation for a specific document and language */
export async function getPrevodForDokument(
  dokumentId: string,
  jezik: string
): Promise<DokumentPrevod | null> {
  const { data, error } = await supabase
    .from('dokumenti_prevodi')
    .select('*')
    .eq('dokument_id', dokumentId)
    .eq('jezik', jezik)
    .single();

  if (error) {
    // Not found is expected for languages without translations
    if (error.code !== 'PGRST116') {
      console.error('Error fetching prevod:', error.message);
    }
    return null;
  }
  return data;
}

/** Upsert a translation (insert or update on conflict) */
export async function upsertPrevod(
  prevod: PrevodInsert
): Promise<{ data: DokumentPrevod | null; error: string | null }> {
  const { data, error } = await supabase
    .from('dokumenti_prevodi')
    .upsert(prevod, { onConflict: 'dokument_id,jezik' })
    .select()
    .single();

  if (error) {
    console.error('Error upserting prevod:', error.message);
    return { data: null, error: error.message };
  }
  return { data, error: null };
}

/** Delete a translation */
export async function deletePrevod(
  id: string
): Promise<{ success: boolean; error: string | null }> {
  const { error } = await supabase
    .from('dokumenti_prevodi')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting prevod:', error.message);
    return { success: false, error: error.message };
  }
  return { success: true, error: null };
}

/** Delete all translations for a document */
export async function deleteAllPrevodiForDokument(
  dokumentId: string
): Promise<{ success: boolean; error: string | null }> {
  const { error } = await supabase
    .from('dokumenti_prevodi')
    .delete()
    .eq('dokument_id', dokumentId);

  if (error) {
    console.error('Error deleting all prevodi:', error.message);
    return { success: false, error: error.message };
  }
  return { success: true, error: null };
}

/** Batch insert translations for a document */
export async function batchInsertPrevodi(
  prevodi: PrevodInsert[]
): Promise<{ success: boolean; error: string | null }> {
  if (prevodi.length === 0) return { success: true, error: null };

  const { error } = await supabase
    .from('dokumenti_prevodi')
    .upsert(prevodi, { onConflict: 'dokument_id,jezik' });

  if (error) {
    console.error('Error batch inserting prevodi:', error.message);
    return { success: false, error: error.message };
  }
  return { success: true, error: null };
}

// ============================================================
// Helper: Get translated document name
// ============================================================

/** Get the document name in the specified language (falls back to original) */
export async function getTranslatedDokumentName(
  dokument: Dokument,
  jezik: string
): Promise<string> {
  // Bosnian is the original language
  if (jezik === 'bs' || !jezik) return dokument.naziv_original;

  const prevod = await getPrevodForDokument(dokument.id, jezik);
  return prevod?.naziv_preveden || dokument.naziv_original;
}