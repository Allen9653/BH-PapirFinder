// ============================================================
// Općina Olovo — Complete Electronic Forms Database
// Source: https://olovo.gov.ba/?lsvrdocumentcat=elektronski-formulari
// Total: 71 forms across 4 pages
// Last updated: 2026-05-07
// ============================================================

export interface OlovoForm {
  id: string;
  name: string;
  pdfUrl: string;
  category: string;
  sizeKB?: number;
}

export const olovoForms: OlovoForm[] = [
  // ============================================================
  // PAGE 1 — Uvjerenja, Lokacijske informacije, Urbanizam
  // ============================================================
  
  
  {
    id: 'olovo-003',
    name: 'Zahtjev za izdavanje urbanističke saglasnosti',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-urbanisti%C4%8Dke-saglasnosti.pdf',
    category: 'Urbanizam',
    sizeKB: 55,
  },
  {
    id: 'olovo-004',
    name: 'Zahtjev za izdavanje upotrebne dozvole',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-upotrebne-dozvole.pdf',
    category: 'Građevinske dozvole',
    sizeKB: 52,
  },
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  // ============================================================
  // PAGE 2 — Građevinske dozvole, Imovinsko-pravni, Katastar
  // ============================================================
  
  
  
  
  
  
  
  {
    id: 'olovo-028',
    name: 'Zahtjev za legalizaciju bespravno izgrađenog objekta',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-legalizaciju-bespravno-izgra%C4%91enog-objekta.pdf',
    category: 'Urbanizam',
    sizeKB: 52,
  },
  
  
  
  
  
  
  
  
  
  
  
  

  // ============================================================
  // PAGE 3 — Odobrenja za rad, Djelatnosti, Prijevoz
  // ============================================================
  {
    id: 'olovo-041',
    name: 'Zahtjev za izdavanje prepisa rješenja',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-prepisa-rje%C5%A1enja.pdf',
    category: 'Uvjerenja',
    sizeKB: 27,
  },
  {
    id: 'olovo-042',
    name: 'Zahtjev za izdavanje odobrenja za rad podružnice (radnje)',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-za-rad-podru%C5%BEnice-radnje.pdf',
    category: 'Samostalna djelatnost',
    sizeKB: 52,
  },
  {
    id: 'olovo-043',
    name: 'Zahtjev za izdavanje odobrenja za rad podružnice',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-za-rad-podru%C5%BEnice.pdf',
    category: 'Samostalna djelatnost',
    sizeKB: 52,
  },
  {
    id: 'olovo-044',
    name: 'Zahtjev za izdavanje odobrenja za organiziranje javnog okupljanja',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-za-organiziranje-javnog-okupljanja.pdf',
    category: 'Javni red',
    sizeKB: 67,
  },
  {
    id: 'olovo-045',
    name: 'Zahtjev za izdavanje odobrenja za obavljanje samostalne djelatnosti',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-za-obavljanje-samostalne-djelatnosti.pdf',
    category: 'Samostalna djelatnost',
    sizeKB: 87,
  },
  {
    id: 'olovo-046',
    name: 'Zahtjev za izdavanje odobrenja za obavljanje domaće radinosti',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-za-obavljanje-doma%C4%87e-radinosti.pdf',
    category: 'Samostalna djelatnost',
    sizeKB: 58,
  },
  {
    id: 'olovo-047',
    name: 'Zahtjev za izdavanje odobrenja za obavljanje ugostiteljske djelatnosti',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-za-obavljanje-ugostiteljske-djelatnosti.pdf',
    category: 'Ugostiteljstvo',
    sizeKB: 53,
  },
  {
    id: 'olovo-048',
    name: 'Zahtjev za izdavanje odobrenja za javni prijevoz',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-za-javni-prijevoz.pdf',
    category: 'Javni prijevoz',
    sizeKB: 118,
  },
  {
    id: 'olovo-049',
    name: 'Zahtjev za izdavanje odobrenja o stalnom prestanku rada',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-o-stalnom-prestanku-rada.pdf',
    category: 'Samostalna djelatnost',
    sizeKB: 51,
  },
  {
    id: 'olovo-050',
    name: 'Zahtjev za izdavanje odobrenja o osnivanju trgovačke radnje',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-o-osnivanju-trgova%C4%8Dke-radnje.pdf',
    category: 'Samostalna djelatnost',
    sizeKB: 65,
  },
  {
    id: 'olovo-051',
    name: 'Zahtjev za izdavanje odobrenja o obavljanju uslužnih djelatnosti; intelektualne usluge, agencijske usluge i sl.',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-o-obavljanju-uslu%C5%BEnih-djelatnosti-intelektualne-usluge-agencijske-usluge-i-sl..pdf',
    category: 'Samostalna djelatnost',
    sizeKB: 58,
  },
  {
    id: 'olovo-052',
    name: 'Zahtjev za izdavanje odobrenja o obavljanju djelatnosti taksi prevoza osoba u cestovnom prometu',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-o-obavljanju-djelatnosti-taksi-prevoza-osoba-u-cestovnom-prometu.pdf',
    category: 'Javni prijevoz',
    sizeKB: 58,
  },
  {
    id: 'olovo-053',
    name: 'Zahtjev za izdavanje odobrenja o obavljanju djelatnosti prevoza stvari u cestovnom prometu',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-o-obavljanju-djelatnosti-prevoza-stvari-u-cestovnom-prometu.pdf',
    category: 'Javni prijevoz',
    sizeKB: 58,
  },
  {
    id: 'olovo-054',
    name: 'Zahtjev za ovjeru obrazaca/zahtjeva za kredit i administrativne zabrane',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ovjeru-obrazaca-zahtjeva-za-kredit-i-administrativne-zabrane.pdf',
    category: 'Ekonomski poslovi',
    sizeKB: 53,
  },
  {
    id: 'olovo-055',
    name: 'Zahtjev za izdavanje uvjerenja – primanja',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-uvjerenja-primanja.pdf',
    category: 'Uvjerenja',
    sizeKB: 53,
  },
  {
    id: 'olovo-056',
    name: 'Zahtjev za izdavanje uvjerenja – donacija',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-uvjerenja-donacija.pdf',
    category: 'Uvjerenja',
    sizeKB: 55,
  },
  {
    id: 'olovo-057',
    name: 'Zahtjev za utvrđivanje zemljišta za redovnu upotrebu objekta u zoni gradskog građevinskog zemljišta',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-utvr%C4%91ivanje-zemlji%C5%A1ta-za-redovnu-upotrebu-objekta-u-zoni-gradskog-gra%C4%91evinskog-zemlji%C5%A1ta.pdf',
    category: 'Urbanizam',
    sizeKB: 58,
  },
  {
    id: 'olovo-058',
    name: 'Zahtjev za ustanovljenje prava služnosti',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ustanovljenje-prava-slu%C5%BEnosti.pdf',
    category: 'Imovinsko-pravni',
    sizeKB: 52,
  },
  {
    id: 'olovo-059',
    name: 'Zahtjev za terensku prijavu',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-terensku-prijavu.pdf',
    category: 'Katastar',
    sizeKB: 53,
  },
  {
    id: 'olovo-060',
    name: 'Zahtjev za promjenu statusa zemljišta',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-promjenu-statusa-zemlji%C5%A1ta.pdf',
    category: 'Katastar',
    sizeKB: 50,
  },

  // ============================================================
  // PAGE 4 — Socijalna zaštita, Jednokratne pomoći, Ostalo
  // ============================================================
  
  
  
  
  
  
  
  
  
  
  
];

// ============================================================
// Helper functions
// ============================================================

/**
 * Get all unique categories from Olovo forms
 */
export function getOlovoCategories(): string[] {
  const categories = new Set<string>();
  olovoForms.forEach(form => categories.add(form.category));
  return Array.from(categories).sort();
}

/**
 * Search Olovo forms by name or category
 */
export function searchOlovoForms(query: string): OlovoForm[] {
  if (!query || query.trim().length === 0) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  return olovoForms.filter(form => {
    const nameMatch = form.name.toLowerCase().includes(searchTerm);
    const categoryMatch = form.category.toLowerCase().includes(searchTerm);
    return nameMatch || categoryMatch;
  });
}

/**
 * Get Olovo forms by category
 */
export function getOlovoFormsByCategory(category: string): OlovoForm[] {
  return olovoForms.filter(form => 
    form.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get a specific Olovo form by ID
 */
export function getOlovoFormById(id: string): OlovoForm | undefined {
  return olovoForms.find(form => form.id === id);
}