// ============================================================
// Search Normalization & Synonym Mapping
// Handles diacritics removal, alias/synonym resolution,
// and institution-level search across BiH
// ============================================================

/**
 * Remove diacritical marks from BHS text
 * š→s, đ→dj, č→c, ć→c, ž→z
 */
export function removeDiacritics(text: string): string {
  if (!text) return '';
  return text
    .replace(/[šŠ]/g, (m) => (m === 'š' ? 's' : 'S'))
    .replace(/[đĐ]/g, (m) => (m === 'đ' ? 'dj' : 'Dj'))
    .replace(/[čČ]/g, (m) => (m === 'č' ? 'c' : 'C'))
    .replace(/[ćĆ]/g, (m) => (m === 'ć' ? 'c' : 'C'))
    .replace(/[žŽ]/g, (m) => (m === 'ž' ? 'z' : 'Z'));
}

/**
 * Normalize search query: lowercase + remove diacritics + trim
 */
export function normalizeQuery(query: string): string {
  return removeDiacritics(query.toLowerCase().trim());
}

/**
 * Synonym/Alias mapping for common search terms in BiH
 * Maps user search terms to institution categories or specific institutions
 */
export const searchSynonyms: Record<string, string[]> = {
  // CIPS / Lična dokumenta
  'cips': ['MUP', 'IDDEEA', 'osobna karta', 'lična karta', 'pasoš', 'putovnica', 'prebivalište', 'prijava boravišta'],
  'licna karta': ['MUP', 'IDDEEA', 'CIPS', 'osobna iskaznica'],
  'osobna karta': ['MUP', 'IDDEEA', 'CIPS', 'lična karta'],
  'pasos': ['MUP', 'IDDEEA', 'putovnica', 'putna isprava'],
  'putovnica': ['MUP', 'IDDEEA', 'pasoš', 'putna isprava'],
  'prebivaliste': ['MUP', 'CIPS', 'IDDEEA', 'prijava prebivališta', 'odjava prebivališta'],

  // Porezi i finansije
  'porez': ['PUFBiH', 'PURS', 'UIO', 'porezna uprava', 'porezna prijava', 'PDV'],
  'pdv': ['UIO', 'PUFBiH', 'PURS', 'porez na dodanu vrijednost'],
  'doprinosi': ['PUFBiH', 'PURS', 'doprinosi za zaposlene', 'socijalno osiguranje'],
  'porezna': ['PUFBiH', 'PURS', 'UIO', 'porezna uprava'],
  'carina': ['UIO', 'Uprava za indirektno oporezivanje', 'carinska prijava'],

  // Firma / Obrt / Poslovanje
  'firma': ['FIA', 'APIF', 'registracija firme', 'osnivanje društva', 'općinski registar'],
  'obrt': ['FIA', 'APIF', 'obrtnica', 'registracija obrta', 'općinski registar'],
  'preduzece': ['FIA', 'APIF', 'registracija preduzeća', 'osnivanje d.o.o.'],
  'doo': ['FIA', 'registracija d.o.o.', 'osnivanje društva'],
  'registracija firme': ['FIA', 'APIF', 'općinski sud', 'registar poslovnih subjekata'],

  // Penzija / MIO / PIO
  'penzija': ['FZ PIO', 'FZ MIO', 'penzijsko osiguranje', 'starosna penzija', 'invalidska penzija'],
  'pio': ['FZ PIO', 'penzijsko i invalidsko osiguranje'],
  'mio': ['FZ MIO', 'mirovinsko osiguranje'],
  'starosna penzija': ['FZ PIO', 'FZ MIO', 'penzijsko osiguranje'],

  // Nekretnine / Katastar
  'katastar': ['katastar', 'gruntovnica', 'zemljišne knjige', 'posjedovni list'],
  'gruntovnica': ['katastar', 'gruntovnica', 'zemljišne knjige', 'ZK izvadak'],
  'vlasnistvo': ['katastar', 'gruntovnica', 'posjedovni list', 'uknjižba'],
  'nekretnine': ['katastar', 'gruntovnica', 'kupoprodajni ugovor', 'porez na promet nekretnina'],

  // Državljanstvo / Dijaspora
  'drzavljanstvo': ['MCP BiH', 'državljanstvo BiH', 'uvjerenje o državljanstvu'],
  'dijaspora': ['MCP BiH', 'Služba za poslove sa strancima', 'konzulat', 'ambasada'],
  'stranci': ['Služba za poslove sa strancima', 'boravišna dozvola', 'radna dozvola'],
  'boravisna dozvola': ['Služba za poslove sa strancima', 'boravak stranaca'],

  // Brčko Distrikt
  'brcko': ['Brčko Distrikt', 'Vlada BD', 'Skupština BD', 'Policija BD'],
  'brcko distrikt': ['Vlada BD', 'Skupština BD', 'Policija BD', 'Pravosuđe BD'],

  // Građevina / Urbanizam
  'gradevinska dozvola': ['općina', 'urbanizam', 'građevinska dozvola', 'lokacijska informacija'],
  'urbanizam': ['općina', 'urbanistička saglasnost', 'građevinska dozvola'],

  // Matični ured
  'rodni list': ['matični ured', 'izvod iz matične knjige rođenih'],
  'vjenčani list': ['matični ured', 'izvod iz matične knjige vjenčanih'],
  'umrlica': ['matični ured', 'izvod iz matične knjige umrlih'],
  'maticni ured': ['rodni list', 'vjenčani list', 'umrlica', 'izvod'],
};

/**
 * Expand a search query with synonyms
 * Returns the original query + all synonym expansions
 */
export function expandQueryWithSynonyms(query: string): string[] {
  const normalized = normalizeQuery(query);
  const results: string[] = [query];

  // Check each synonym key
  for (const [key, expansions] of Object.entries(searchSynonyms)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      results.push(...expansions);
    }
  }

  return [...new Set(results)];
}

/**
 * Check if a document/institution matches the search query
 * Uses normalization and synonym expansion
 */
export function matchesNormalizedSearch(
  query: string,
  targets: string[]
): boolean {
  const normalizedQuery = normalizeQuery(query);
  const expandedTerms = expandQueryWithSynonyms(query);

  for (const target of targets) {
    const normalizedTarget = normalizeQuery(target);

    // Direct match
    if (normalizedTarget.includes(normalizedQuery)) return true;
    if (normalizedQuery.includes(normalizedTarget)) return true;

    // Synonym match
    for (const term of expandedTerms) {
      const normalizedTerm = normalizeQuery(term);
      if (normalizedTarget.includes(normalizedTerm)) return true;
    }
  }

  return false;
}