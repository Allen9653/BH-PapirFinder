// ============================================================
// Domain Detection & Verification for BH PapirFinder
// Generates URL variations, checks availability, validates
// official keywords, and returns priority-ranked results.
//
// Uses verified domains as priority lookup before automated detection.
// ============================================================

import { findVerifiedDomain, VerifiedMunicipality } from '@/data/verified-domains';

// Official keywords that indicate a legitimate government page
const OFFICIAL_KEYWORDS = [
  'gradska uprava',
  'općinsko vijeće',
  'opcinsko vijece',
  'službene novine',
  'sluzbene novine',
  'elektronski šalter',
  'elektronski salter',
  'administracija',
  'e-uprava',
  'matični ured',
  'maticni ured',
  'urbanizam',
  'javna uprava',
  'skupština',
  'skupstina',
  'načelnik',
  'nacelnik',
  'gradonačelnik',
  'gradonacelnik',
];

// Priority keywords in URL path or title that boost ranking
const PRIORITY_PATH_KEYWORDS = ['opcina', 'općina', 'grad', 'uprava', 'vlada'];

// ============================================================
// Types
// ============================================================

export interface DomainCheckResult {
  url: string;
  isActive: boolean;
  rank: number; // 1 = highest priority
  rankLabel: string;
  hasOfficialKeywords: boolean;
  matchedKeywords: string[];
  hasPriorityPath: boolean;
  responseTimeMs: number;
  isVerified: boolean; // From verified-domains database
  error?: string;
}

export interface DomainDetectionResult {
  municipality: string;
  bestUrl: string | null;
  verifiedData: VerifiedMunicipality | null;
  allResults: DomainCheckResult[];
  checkedAt: string;
  totalChecked: number;
  totalActive: number;
}

// ============================================================
// Normalize municipality name for URL generation
// Handles Bosnian special characters: č→c, ć→c, š→s, ž→z, đ→dj
// ============================================================

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/č/g, 'c')
    .replace(/ć/g, 'c')
    .replace(/š/g, 's')
    .replace(/ž/g, 'z')
    .replace(/đ/g, 'dj')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// ============================================================
// Generate URL variations for a municipality
// Includes verified domains at top priority
// ============================================================

export function generateUrlVariations(
  municipalityName: string,
  verified: VerifiedMunicipality | null
): { url: string; rank: number; rankLabel: string; isVerified: boolean }[] {
  const normalized = normalizeName(municipalityName);
  const noHyphens = normalized.replace(/-/g, '');

  const variations: { url: string; rank: number; rankLabel: string; isVerified: boolean }[] = [];

  // ---- Verified domains first (Rank 0 = highest) ----
  if (verified && verified.status === 'active') {
    variations.push({
      url: `https://${verified.official_domain}`,
      rank: 0,
      rankLabel: 'Rank 0 — Verificiran',
      isVerified: true,
    });

    if (verified.alternative_domain) {
      variations.push({
        url: `https://${verified.alternative_domain}`,
        rank: 0,
        rankLabel: 'Rank 0 — Verificiran (alt)',
        isVerified: true,
      });
    }

    if (verified.e_government_link) {
      variations.push({
        url: verified.e_government_link,
        rank: 0,
        rankLabel: 'Rank 0 — E-uprava (verificiran)',
        isVerified: true,
      });
    }
  }

  // ---- Rank 1: .gov.ba domains ----
  variations.push(
    { url: `https://${normalized}.gov.ba`, rank: 1, rankLabel: 'Rank 1 — .gov.ba', isVerified: false },
    { url: `https://www.${normalized}.gov.ba`, rank: 1, rankLabel: 'Rank 1 — www.gov.ba', isVerified: false },
  );

  if (normalized !== noHyphens) {
    variations.push(
      { url: `https://${noHyphens}.gov.ba`, rank: 1, rankLabel: 'Rank 1 — .gov.ba (no hyphen)', isVerified: false },
    );
  }

  // ---- Rank 2: .ba domains ----
  variations.push(
    { url: `https://${normalized}.ba`, rank: 2, rankLabel: 'Rank 2 — .ba', isVerified: false },
    { url: `https://www.${normalized}.ba`, rank: 2, rankLabel: 'Rank 2 — www.ba', isVerified: false },
    { url: `https://opcina-${normalized}.ba`, rank: 2, rankLabel: 'Rank 2 — opcina-.ba', isVerified: false },
    { url: `https://opcina${normalized}.ba`, rank: 2, rankLabel: 'Rank 2 — opcina.ba', isVerified: false },
    { url: `https://grad-${normalized}.ba`, rank: 2, rankLabel: 'Rank 2 — grad-.ba', isVerified: false },
    { url: `https://grad${normalized}.ba`, rank: 2, rankLabel: 'Rank 2 — grad.ba', isVerified: false },
    { url: `https://grad.${normalized}.ba`, rank: 2, rankLabel: 'Rank 2 — grad.subdomain.ba', isVerified: false },
    { url: `https://${normalized}.rs.ba`, rank: 2, rankLabel: 'Rank 2 — .rs.ba', isVerified: false },
  );

  if (normalized !== noHyphens) {
    variations.push(
      { url: `https://${noHyphens}.ba`, rank: 2, rankLabel: 'Rank 2 — .ba (no hyphen)', isVerified: false },
    );
  }

  // ---- Rank 3: Subdomains ----
  variations.push(
    { url: `https://e-uprava.${normalized}.ba`, rank: 3, rankLabel: 'Rank 3 — e-uprava subdomain', isVerified: false },
    { url: `https://e-servis.${normalized}.ba`, rank: 3, rankLabel: 'Rank 3 — e-servis subdomain', isVerified: false },
    { url: `https://euprava.${normalized}.ba`, rank: 3, rankLabel: 'Rank 3 — euprava subdomain', isVerified: false },
    { url: `https://portal.${normalized}.ba`, rank: 3, rankLabel: 'Rank 3 — portal subdomain', isVerified: false },
  );

  // ---- Rank 4: Other TLDs ----
  variations.push(
    { url: `https://${normalized}.org`, rank: 4, rankLabel: 'Rank 4 — .org', isVerified: false },
    { url: `https://opcina-${normalized}.org`, rank: 4, rankLabel: 'Rank 4 — opcina-.org', isVerified: false },
  );

  // Deduplicate by URL
  const seen = new Set<string>();
  return variations.filter(v => {
    const key = v.url.replace(/\/$/, '').toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ============================================================
// Check if a URL is active (HEAD request with timeout)
// ============================================================

async function checkUrlAvailability(url: string, timeoutMs: number = 8000): Promise<{
  isActive: boolean;
  responseTimeMs: number;
  error?: string;
}> {
  const startTime = performance.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    // Try with cors mode first
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'cors',
        signal: controller.signal,
        redirect: 'follow',
      });
      clearTimeout(timeoutId);
      const elapsed = Math.round(performance.now() - startTime);

      if (response.ok || response.status === 301 || response.status === 302) {
        return { isActive: true, responseTimeMs: elapsed };
      }
      return { isActive: false, responseTimeMs: elapsed, error: `HTTP ${response.status}` };
    } catch {
      clearTimeout(timeoutId);

      // CORS blocked — try no-cors mode (opaque response = site exists)
      const controller2 = new AbortController();
      const timeoutId2 = setTimeout(() => controller2.abort(), timeoutMs);

      try {
        const response = await fetch(url, {
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller2.signal,
          redirect: 'follow',
        });
        clearTimeout(timeoutId2);
        const elapsed = Math.round(performance.now() - startTime);

        if (response.type === 'opaque' || response.ok) {
          return { isActive: true, responseTimeMs: elapsed };
        }
        return { isActive: false, responseTimeMs: elapsed, error: 'No response' };
      } catch (err2) {
        clearTimeout(timeoutId2);
        const elapsed = Math.round(performance.now() - startTime);
        const errorMsg = err2 instanceof Error ? err2.message : 'Unknown error';
        return { isActive: false, responseTimeMs: elapsed, error: errorMsg };
      }
    }
  } catch (err) {
    const elapsed = Math.round(performance.now() - startTime);
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return { isActive: false, responseTimeMs: elapsed, error: errorMsg };
  }
}

// ============================================================
// Check URL path for priority keywords
// ============================================================

function checkPriorityPath(url: string): boolean {
  const urlLower = url.toLowerCase();
  return PRIORITY_PATH_KEYWORDS.some(kw => urlLower.includes(kw));
}

// ============================================================
// Scan page content for official keywords (CORS-dependent)
// ============================================================

async function scanForOfficialKeywords(url: string, timeoutMs: number = 10000): Promise<{
  hasKeywords: boolean;
  matchedKeywords: string[];
}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'Accept': 'text/html' },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return { hasKeywords: false, matchedKeywords: [] };
    }

    const html = await response.text();
    const htmlLower = html.toLowerCase();

    const titleMatch = htmlLower.match(/<title[^>]*>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : '';

    const metaMatch = htmlLower.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/);
    const metaDesc = metaMatch ? metaMatch[1] : '';

    const searchableText = `${title} ${metaDesc} ${htmlLower.substring(0, 5000)}`;

    const matchedKeywords = OFFICIAL_KEYWORDS.filter(kw =>
      searchableText.includes(kw.toLowerCase())
    );

    return {
      hasKeywords: matchedKeywords.length > 0,
      matchedKeywords,
    };
  } catch {
    return { hasKeywords: false, matchedKeywords: [] };
  }
}

// ============================================================
// Calculate final score for sorting (lower = better)
// ============================================================

function calculateFinalScore(result: DomainCheckResult): number {
  let score = result.rank * 100;

  // Verified domains get massive bonus
  if (result.isVerified) {
    score -= 200;
  }

  if (result.hasOfficialKeywords) {
    score -= 50;
  }

  if (result.hasPriorityPath) {
    score -= 25;
  }

  if (result.responseTimeMs < 2000) {
    score -= 10;
  }

  return score;
}

// ============================================================
// Main: Detect and rank domains for a municipality
// ============================================================

export async function detectMunicipalityDomain(
  municipalityName: string,
  options: {
    maxConcurrent?: number;
    timeoutMs?: number;
    scanKeywords?: boolean;
  } = {}
): Promise<DomainDetectionResult> {
  const {
    maxConcurrent = 5,
    timeoutMs = 8000,
    scanKeywords = true,
  } = options;

  // Step 1: Check verified domains database
  const verified = findVerifiedDomain(municipalityName);

  // Step 2: Generate URL variations (verified ones included at top)
  const variations = generateUrlVariations(municipalityName, verified);
  const allResults: DomainCheckResult[] = [];

  // Step 3: Process in batches
  for (let i = 0; i < variations.length; i += maxConcurrent) {
    const batch = variations.slice(i, i + maxConcurrent);

    const batchResults = await Promise.all(
      batch.map(async (variation) => {
        const availability = await checkUrlAvailability(variation.url, timeoutMs);

        let hasOfficialKeywords = false;
        let matchedKeywords: string[] = [];

        if (availability.isActive && scanKeywords) {
          const keywordResult = await scanForOfficialKeywords(variation.url, timeoutMs);
          hasOfficialKeywords = keywordResult.hasKeywords;
          matchedKeywords = keywordResult.matchedKeywords;
        }

        const hasPriorityPath = checkPriorityPath(variation.url);

        const result: DomainCheckResult = {
          url: variation.url,
          isActive: availability.isActive,
          rank: variation.rank,
          rankLabel: variation.rankLabel,
          hasOfficialKeywords,
          matchedKeywords,
          hasPriorityPath,
          responseTimeMs: availability.responseTimeMs,
          isVerified: variation.isVerified,
          error: availability.error,
        };

        return result;
      })
    );

    allResults.push(...batchResults);
  }

  // Step 4: Sort results
  const sortedResults = allResults.sort((a, b) => {
    // Verified active first
    if (a.isVerified && a.isActive && !(b.isVerified && b.isActive)) return -1;
    if (b.isVerified && b.isActive && !(a.isVerified && a.isActive)) return 1;

    // Active first
    if (a.isActive && !b.isActive) return -1;
    if (!a.isActive && b.isActive) return 1;

    // Among active, sort by score
    if (a.isActive && b.isActive) {
      return calculateFinalScore(a) - calculateFinalScore(b);
    }

    return a.rank - b.rank;
  });

  const activeResults = sortedResults.filter(r => r.isActive);
  const bestUrl = activeResults.length > 0 ? activeResults[0].url : null;

  return {
    municipality: municipalityName,
    bestUrl,
    verifiedData: verified,
    allResults: sortedResults,
    checkedAt: new Date().toISOString(),
    totalChecked: allResults.length,
    totalActive: activeResults.length,
  };
}

// ============================================================
// Quick check: Verify a single URL
// ============================================================

export async function quickCheckUrl(url: string): Promise<DomainCheckResult> {
  const availability = await checkUrlAvailability(url);
  const keywordResult = await scanForOfficialKeywords(url);
  const hasPriorityPath = checkPriorityPath(url);

  const isGovBa = url.includes('.gov.ba');
  const isBa = url.endsWith('.ba') || url.includes('.ba/');
  const isSubdomain = url.includes('e-uprava.') || url.includes('e-servis.') || url.includes('portal.');

  let rank = 4;
  let rankLabel = 'Rank 4 — Other';
  if (isGovBa) { rank = 1; rankLabel = 'Rank 1 — .gov.ba'; }
  else if (isBa) { rank = 2; rankLabel = 'Rank 2 — .ba'; }
  else if (isSubdomain) { rank = 3; rankLabel = 'Rank 3 — Subdomain'; }

  return {
    url,
    isActive: availability.isActive,
    rank,
    rankLabel,
    hasOfficialKeywords: keywordResult.hasKeywords,
    matchedKeywords: keywordResult.matchedKeywords,
    hasPriorityPath,
    responseTimeMs: availability.responseTimeMs,
    isVerified: false,
    error: availability.error,
  };
}

// ============================================================
// UI helpers
// ============================================================

export function getRankBadgeColor(rank: number): string {
  switch (rank) {
    case 0: return 'bg-purple-600 text-white';
    case 1: return 'bg-green-600 text-white';
    case 2: return 'bg-blue-600 text-white';
    case 3: return 'bg-amber-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
}

export function getRankDescription(rank: number, language: string = 'bs'): string {
  const descriptions: Record<number, Record<string, string>> = {
    0: { bs: 'Verificiran — Potvrđen službeni portal', en: 'Verified — Confirmed official portal' },
    1: { bs: '.gov.ba — Službeni vladini portal', en: '.gov.ba — Official government portal' },
    2: { bs: '.ba — Službeni domen', en: '.ba — Official domain' },
    3: { bs: 'Subdomen (e-uprava, portal)', en: 'Subdomain (e-government, portal)' },
    4: { bs: 'Ostali domeni', en: 'Other domains' },
  };
  return descriptions[rank]?.[language] || descriptions[rank]?.['bs'] || 'Nepoznat rang';
}