// ============================================================
// Enhanced Municipality Search for BH PapirFinder
// Prioritizes verified forms_url from seed data.
// Falls back to local database and Supabase.
// ============================================================

import { municipalitiesDatabase, MunicipalityData, searchMunicipalities as localSearch } from '@/data/municipalities-database';
import {
  findVerifiedDomain,
  findCantonalInstitutions,
  verifiedDomains,
  VerifiedMunicipality,
  CantonalInstitution,
} from '@/data/verified-domains';
import {
  SortOption,
  searchInstitutions,
  checkSupabaseConnection,
} from '@/lib/supabaseClient';

// ============================================================
// Unified search result type
// ============================================================

export interface UnifiedSearchResult {
  id: string;
  name: string;
  canton?: string;
  region?: string;
  entity: string;
  url: string;
  forms_url?: string;
  e_government_link?: string;
  description: string;
  categories: string[];
  trust_score: number;
  is_premium: boolean;
  source: 'verified' | 'supabase' | 'local';
  secure: boolean;
  physical_presence_required: boolean;
  cantonal_institutions?: CantonalInstitution[];
  komentar?: string;
}

// ============================================================
// Convert verified domain to unified result
// ============================================================

function verifiedToUnified(v: VerifiedMunicipality, cantonalInst: CantonalInstitution[]): UnifiedSearchResult {
  const id = `verified-${v.municipality_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;

  // Trust score: verified active with forms = 95, without forms = 60
  let trustScore = 70;
  if (v.forms_url && v.status === 'active') trustScore = 95;
  else if (v.status === 'active' && !v.physical_presence_required) trustScore = 75;
  else if (v.physical_presence_required) trustScore = 50;
  if (!v.secure) trustScore -= 10;

  return {
    id,
    name: v.municipality_name,
    canton: v.canton,
    region: undefined,
    entity: v.entity,
    url: v.forms_url || `https://${v.official_domain}`,
    forms_url: v.forms_url,
    e_government_link: v.e_government_link,
    description: v.komentar || buildDescription(v),
    categories: v.document_categories,
    trust_score: trustScore,
    is_premium: false,
    source: 'verified',
    secure: v.secure,
    physical_presence_required: v.physical_presence_required,
    cantonal_institutions: cantonalInst.length > 0 ? cantonalInst : undefined,
    komentar: v.komentar,
  };
}

function buildDescription(v: VerifiedMunicipality): string {
  if (v.physical_presence_required) {
    return 'Obrasci nisu dostupni online — potrebno lično prisustvo u općini.';
  }
  if (!v.secure) {
    return `Obrasci dostupni na ${v.official_domain} — napomena: SSL problemi na web stranici.`;
  }
  if (v.document_categories.length > 0) {
    return `Obrasci: ${v.document_categories.join(', ')}`;
  }
  return `Službena web stranica: ${v.official_domain}`;
}

// ============================================================
// Convert local database entry to unified result
// ============================================================

function localToUnified(m: MunicipalityData): UnifiedSearchResult {
  const mainUrl = m.urls[0]?.main || '';
  const description = m.urls.map(u => u.description).join('; ');

  return {
    id: m.id,
    name: m.name,
    canton: m.canton,
    region: m.region,
    entity: m.entity,
    url: mainUrl,
    forms_url: mainUrl,
    description,
    categories: m.categories,
    trust_score: 65,
    is_premium: false,
    source: 'local',
    secure: true,
    physical_presence_required: false,
    komentar: m.komentar,
  };
}

// ============================================================
// Sort results
// ============================================================

function sortResults(results: UnifiedSearchResult[], sort: SortOption): UnifiedSearchResult[] {
  return [...results].sort((a, b) => {
    switch (sort) {
      case 'trust_score_desc':
        return b.trust_score - a.trust_score;
      case 'trust_score_asc':
        return a.trust_score - b.trust_score;
      case 'name_asc':
        return a.name.localeCompare(b.name, 'bs');
      case 'name_desc':
        return b.name.localeCompare(a.name, 'bs');
      default:
        return b.trust_score - a.trust_score;
    }
  });
}

// ============================================================
// Deduplicate by name (prefer verified > supabase > local)
// ============================================================

function deduplicateResults(results: UnifiedSearchResult[]): UnifiedSearchResult[] {
  const seen = new Map<string, UnifiedSearchResult>();
  const sourcePriority: Record<string, number> = { verified: 3, supabase: 2, local: 1 };

  for (const r of results) {
    const key = r.name.toLowerCase().trim();
    const existing = seen.get(key);

    if (!existing || (sourcePriority[r.source] || 0) > (sourcePriority[existing.source] || 0)) {
      // Merge cantonal institutions if available
      if (existing?.cantonal_institutions && !r.cantonal_institutions) {
        r.cantonal_institutions = existing.cantonal_institutions;
      }
      seen.set(key, r);
    }
  }

  return Array.from(seen.values());
}

// ============================================================
// Main search function
// Priority: 1) Verified domains  2) Supabase  3) Local database
// ============================================================

export async function searchMunicipalities(
  query: string,
  sort: SortOption = 'trust_score_desc'
): Promise<UnifiedSearchResult[]> {
  if (!query || query.trim().length === 0) return [];

  const searchTerm = query.toLowerCase().trim();
  const allResults: UnifiedSearchResult[] = [];

  // ---- Step 1: Search verified domains (highest priority) ----
  const verifiedMatches = searchVerifiedDomainsInternal(searchTerm);
  allResults.push(...verifiedMatches);

  // ---- Step 2: Try Supabase ----
  try {
    const isAvailable = await checkSupabaseConnection();
    if (isAvailable) {
      const supabaseResults = await searchInstitutions(query, sort);
      for (const inst of supabaseResults) {
        allResults.push({
          id: `supabase-${inst.id}`,
          name: inst.name,
          canton: undefined,
          region: inst.region,
          entity: 'FBiH',
          url: inst.base_url,
          forms_url: inst.base_url,
          description: `${inst.category} — ${inst.region}`,
          categories: inst.category ? [inst.category] : [],
          trust_score: inst.trust_score,
          is_premium: inst.is_premium,
          source: 'supabase',
          secure: true,
          physical_presence_required: false,
        });
      }
    }
  } catch {
    // Supabase unavailable — continue with local
  }

  // ---- Step 3: Search local database ----
  const localResults = localSearch(searchTerm);
  for (const m of localResults) {
    allResults.push(localToUnified(m));
  }

  // ---- Deduplicate and sort ----
  const deduplicated = deduplicateResults(allResults);
  return sortResults(deduplicated, sort);
}

// ============================================================
// Search verified domains (internal)
// ============================================================

function searchVerifiedDomainsInternal(searchTerm: string): UnifiedSearchResult[] {
  const results: UnifiedSearchResult[] = [];

  for (const v of verifiedDomains) {
    const nameMatch = v.municipality_name.toLowerCase().includes(searchTerm);
    const cantonMatch = v.canton?.toLowerCase().includes(searchTerm);
    const domainMatch = v.official_domain.toLowerCase().includes(searchTerm);
    const categoryMatch = v.document_categories.some(
      (c: string) => c.toLowerCase().includes(searchTerm)
    );

    if (nameMatch || cantonMatch || domainMatch || categoryMatch) {
      const cantonalInst = findCantonalInstitutions(v.municipality_name);
      results.push(verifiedToUnified(v, cantonalInst));
    }
  }

  return results;
}

// ============================================================
// Get all municipalities (for browsing)
// ============================================================

export function getAllMunicipalities(): UnifiedSearchResult[] {
  const results: UnifiedSearchResult[] = [];

  for (const v of verifiedDomains) {
    const cantonalInst = findCantonalInstitutions(v.municipality_name);
    results.push(verifiedToUnified(v, cantonalInst));
  }

  // Add local database entries not in verified
  for (const m of municipalitiesDatabase) {
    const existing = results.find(r => r.name.toLowerCase() === m.name.toLowerCase());
    if (!existing) {
      results.push(localToUnified(m));
    }
  }

  return results;
}

// ============================================================
// Get municipalities by canton
// ============================================================

export function getMunicipalitiesByCanton(canton: string): UnifiedSearchResult[] {
  const results: UnifiedSearchResult[] = [];

  for (const v of verifiedDomains) {
    if (v.canton?.toLowerCase().includes(canton.toLowerCase())) {
      const cantonalInst = findCantonalInstitutions(v.municipality_name);
      results.push(verifiedToUnified(v, cantonalInst));
    }
  }

  return results;
}