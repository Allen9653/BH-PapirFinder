// ============================================================
// Grad Gračanica — Electronic Forms Database
// Source: https://gracanica.gov.ba/dokumenti/e-obrasci/
// Total: 57 forms across 5 categories (Categories 1 & 2 fully captured)
// Last updated: 2026-06-04
// ============================================================

export interface GracanicaForm {
  id: string;
  name: string;
  pdfUrl: string;
  category: string;
  sizeKB?: number;
}

export const gracanicaForms: GracanicaForm[] = [
  // ============================================================
  // CATEGORY 1 — Služba za civilnu zaštitu (4 forms)
  // ============================================================
  {
    id: 'gracanica-001',
    name: 'Zahtjev za prijavu i uklanjanje neeksplodiranog ubojnog sredstva (NUS-a)',
    pdfUrl: 'https://gracanica.gov.ba/download/3-zahtjev-za-prijavu-i-preuzimanje-uklanjanje-nus-a-pdf/',
    category: 'Služba za civilnu zaštitu',
    sizeKB: 54,
  },
  {
    id: 'gracanica-002',
    name: 'Zahtjev za stručno mišljenje o utvrđivanju rizika o postojanju mina / izrada projekta deminiranja / tehničkog izviđanja / trajnog obilježavanja',
    pdfUrl: 'https://gracanica.gov.ba/download/4-zahtjev-za-kandidovanje-rizicnih-lokaliteta-od-mina-za-izradu-projekata-deminiranja-tehnickog-izvidjanja-i-trajnog-obiljezavanja-pdf/',
    category: 'Služba za civilnu zaštitu',
    sizeKB: 57,
  },
  {
    id: 'gracanica-003',
    name: 'Opći zahtjev Službe za civilnu zaštitu',
    pdfUrl: 'https://gracanica.gov.ba/download/1-opci-zahtjev-sluzba-za-cz-pdf/',
    category: 'Služba za civilnu zaštitu',
    sizeKB: 45,
  },
  {
    id: 'gracanica-004',
    name: 'Zahtjev za prijavu štete od prirodnih i drugih nesreća',
    pdfUrl: 'https://gracanica.gov.ba/download/2-zahtjev-za-prijavu-stete-od-prirodnih-i-drugih-nesreca-pdf/',
    category: 'Služba za civilnu zaštitu',
    sizeKB: 79,
  },

  // ============================================================
  // CATEGORY 2 — Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove (53 forms)
  // ============================================================
  {
    id: 'gracanica-005',
    name: 'Zahtjev za izdavanje izvoda iz matične knjige rođenih',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-izvoda-iz-maticne-knjige-rodjenih/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-006',
    name: 'Zahtjev za izdavanje izvoda iz matične knjige vjenčanih',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-izvoda-iz-maticne-knjige-vjencanih/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-007',
    name: 'Zahtjev za izdavanje izvoda iz matične knjige umrlih',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-izvoda-iz-maticne-knjige-umrlih/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-008',
    name: 'Zahtjev za izdavanje uvjerenja o državljanstvu',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-uvjerenja-o-drzavljanstvu/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-009',
    name: 'Zahtjev za izdavanje uvjerenja iz matične knjige rođenih',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-uvjerenja-iz-maticne-knjige-rodjenih/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-010',
    name: 'Zahtjev za izdavanje uvjerenja iz matične knjige vjenčanih',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-uvjerenja-iz-maticne-knjige-vjencanih/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-011',
    name: 'Zahtjev za izdavanje uvjerenja iz matične knjige umrlih',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-uvjerenja-iz-maticne-knjige-umrlih/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-012',
    name: 'Zahtjev za upis u matičnu knjigu rođenih',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-upis-u-maticnu-knjigu-rodjenih/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-013',
    name: 'Zahtjev za upis u matičnu knjigu umrlih',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-upis-u-maticnu-knjigu-umrlih/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-014',
    name: 'Zahtjev za ispravku podataka u matičnoj knjizi rođenih',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ispravku-podataka-u-maticnoj-knjizi-rodjenih/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-015',
    name: 'Zahtjev za ispravku podataka u matičnoj knjizi vjenčanih',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ispravku-podataka-u-maticnoj-knjizi-vjencanih/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-016',
    name: 'Zahtjev za ispravku podataka u matičnoj knjizi umrlih',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ispravku-podataka-u-maticnoj-knjizi-umrlih/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-017',
    name: 'Zahtjev za naknadni upis u matičnu knjigu rođenih',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-naknadni-upis-u-maticnu-knjigu-rodjenih/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-018',
    name: 'Zahtjev za naknadni upis u matičnu knjigu umrlih',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-naknadni-upis-u-maticnu-knjigu-umrlih/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-019',
    name: 'Zahtjev za promjenu ličnog imena',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-promjenu-licnog-imena/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-020',
    name: 'Zahtjev za sklapanje braka',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-sklapanje-braka/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-021',
    name: 'Zahtjev za prijavu prebivališta/boravišta',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-prijavu-prebivalista-boravista/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-022',
    name: 'Zahtjev za odjavu prebivališta/boravišta',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-odjavu-prebivalista-boravista/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-023',
    name: 'Zahtjev za izdavanje uvjerenja o prebivalištu/boravištu',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-uvjerenja-o-prebivalistu-boravistu/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-024',
    name: 'Zahtjev za izdavanje uvjerenja o kretanju',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-uvjerenja-o-kretanju/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-025',
    name: 'Zahtjev za ovjeru potpisa, rukopisa i prepisa',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ovjeru-potpisa-rukopisa-i-prepisa/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-026',
    name: 'Zahtjev za izdavanje uvjerenja o nekažnjavanju',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-uvjerenja-o-nekaznjavanju/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-027',
    name: 'Zahtjev za izdavanje uvjerenja da se ne vodi krivični postupak',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-uvjerenja-da-se-ne-vodi-krivicni-postupak/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-028',
    name: 'Zahtjev za izdavanje uvjerenja o porodičnom stanju',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-uvjerenja-o-porodicnom-stanju/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-029',
    name: 'Zahtjev za izdavanje uvjerenja o slobodnom bračnom stanju',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-uvjerenja-o-slobodnom-bracnom-stanju/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-030',
    name: 'Zahtjev za izdavanje uvjerenja o životu',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-uvjerenja-o-zivotu/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-031',
    name: 'Zahtjev za ostvarivanje prava na dječiji dodatak',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ostvarivanje-prava-na-djeciji-dodatak/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-032',
    name: 'Zahtjev za ostvarivanje prava na stalnu novčanu pomoć',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ostvarivanje-prava-na-stalnu-novcanu-pomoc/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-033',
    name: 'Zahtjev za ostvarivanje prava na jednokratnu novčanu pomoć',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ostvarivanje-prava-na-jednokratnu-novcanu-pomoc/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-034',
    name: 'Zahtjev za ostvarivanje prava na dodatak za njegu i pomoć od strane drugog lica',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ostvarivanje-prava-na-dodatak-za-njegu-i-pomoc-od-strane-drugog-lica/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-035',
    name: 'Zahtjev za ostvarivanje prava na naknadu umjesto plaće ženi-majci u radnom odnosu',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ostvarivanje-prava-na-naknadu-umjesto-place-zeni-majci-u-radnom-odnosu/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-036',
    name: 'Zahtjev za ostvarivanje prava na novčanu pomoć ženi-majci koja nije u radnom odnosu',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ostvarivanje-prava-na-novcanu-pomoc-zeni-majci-koja-nije-u-radnom-odnosu/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-037',
    name: 'Zahtjev za ostvarivanje prava na smještaj u ustanovu socijalne zaštite',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ostvarivanje-prava-na-smjestaj-u-ustanovu-socijalne-zastite/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-038',
    name: 'Zahtjev za ostvarivanje prava na zdravstvenu zaštitu',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ostvarivanje-prava-na-zdravstvenu-zastitu/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-039',
    name: 'Zahtjev za utvrđivanje statusa borca',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-utvrdivanje-statusa-borca/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-040',
    name: 'Zahtjev za utvrđivanje statusa člana porodice šehida/poginulog borca',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-utvrdivanje-statusa-clana-porodice-sehida-poginulog-borca/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-041',
    name: 'Zahtjev za utvrđivanje statusa ratnog vojnog invalida',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-utvrdivanje-statusa-ratnog-vojnog-invalida/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-042',
    name: 'Zahtjev za ostvarivanje prava na ličnu invalidninu',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ostvarivanje-prava-na-licnu-invalidninu/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-043',
    name: 'Zahtjev za ostvarivanje prava na porodičnu invalidninu',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ostvarivanje-prava-na-porodicnu-invalidninu/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-044',
    name: 'Zahtjev za ostvarivanje prava na ortopedski dodatak',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ostvarivanje-prava-na-ortopedski-dodatak/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-045',
    name: 'Zahtjev za ostvarivanje prava na mjesečni borački dodatak',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ostvarivanje-prava-na-mjesecni-boracki-dodatak/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-046',
    name: 'Zahtjev za ostvarivanje prava na egzistencijalnu naknadu',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ostvarivanje-prava-na-egzistencijalnu-naknadu/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-047',
    name: 'Zahtjev za ostvarivanje prava na troškove dženaze/sahrane',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ostvarivanje-prava-na-troskove-dzenaze-sahrane/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-048',
    name: 'Zahtjev za ostvarivanje prava na banjsko-klimatsko liječenje',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-ostvarivanje-prava-na-banjsko-klimatsko-lijecenje/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-049',
    name: 'Zahtjev za izdavanje legitimacije ratnog vojnog invalida',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-legitimacije-ratnog-vojnog-invalida/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-050',
    name: 'Zahtjev za izdavanje legitimacije člana porodice šehida/poginulog borca',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-legitimacije-clana-porodice-sehida-poginulog-borca/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-051',
    name: 'Zahtjev za izdavanje uvjerenja o pripadnosti Oružanim snagama',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-uvjerenja-o-pripadnosti-oruzanim-snagama/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-052',
    name: 'Zahtjev za izdavanje uvjerenja o okolnostima pogibije/ranjavanja/nestanka',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-uvjerenja-o-okolnostima-pogibije-ranjavanja-nestanka/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-053',
    name: 'Opći zahtjev Službe za upravu',
    pdfUrl: 'https://gracanica.gov.ba/download/opci-zahtjev-sluzbe-za-upravu/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-054',
    name: 'Zahtjev za izdavanje uvjerenja o činjenicama o kojima se vodi službena evidencija',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-uvjerenja-o-cinjenicama-o-kojima-se-vodi-sluzbena-evidencija/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-055',
    name: 'Zahtjev za izdavanje uvjerenja o činjenicama o kojima se ne vodi službena evidencija',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-izdavanje-uvjerenja-o-cinjenicama-o-kojima-se-ne-vodi-sluzbena-evidencija/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-056',
    name: 'Zahtjev za pristup informacijama',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-pristup-informacijama/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
  {
    id: 'gracanica-057',
    name: 'Zahtjev za upis u birački spisak',
    pdfUrl: 'https://gracanica.gov.ba/download/zahtjev-za-upis-u-biracki-spisak/',
    category: 'Služba za upravu, društvene djelatnosti, boračko-invalidsku zaštitu i zajedničke poslove',
    sizeKB: 50,
  },
];

// ============================================================
// Helper functions
// ============================================================

/**
 * Get all unique categories from Gračanica forms
 */
export function getGracanicaCategories(): string[] {
  const categories = new Set<string>();
  gracanicaForms.forEach(form => categories.add(form.category));
  return Array.from(categories).sort();
}

/**
 * Search Gračanica forms by name or category
 */
export function searchGracanicaForms(query: string): GracanicaForm[] {
  if (!query || query.trim().length === 0) return [];

  const searchTerm = query.toLowerCase().trim();

  return gracanicaForms.filter(form => {
    const nameMatch = form.name.toLowerCase().includes(searchTerm);
    const categoryMatch = form.category.toLowerCase().includes(searchTerm);
    return nameMatch || categoryMatch;
  });
}

/**
 * Get Gračanica forms by category
 */
export function getGracanicaFormsByCategory(category: string): GracanicaForm[] {
  return gracanicaForms.filter(form =>
    form.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get a specific Gračanica form by ID
 */
export function getGracanicaFormById(id: string): GracanicaForm | undefined {
  return gracanicaForms.find(form => form.id === id);
}