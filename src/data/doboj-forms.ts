// ============================================================
// Grad Doboj (Republika Srpska) — Službeni elektronski obrasci i formulari
// Službeni website: https://doboj.gov.ba/
// Zvanični repozitorij obrazaca: https://doboj.gov.ba/dokumenti/%D0%B7%D0%B0%D1%85%D1%82%D1%98%D0%B5%D0%B2%D0%B8-%D0%B8-%D0%BE%D0%B1%D1%80%D0%B0%D1%81%D1%86%D0%B8/
// ============================================================

export interface DobojForm {
  id: string;
  name: string;
  nameCyr?: string;
  pdfUrl: string;
  category: string;
  section: string;
  description?: string;
  external?: boolean;
  fileType?: 'pdf';
}

export const DOBOJ_OFFICIAL_URL = 'https://doboj.gov.ba/';
export const DOBOJ_FORMS_PORTAL_URL = 'https://doboj.gov.ba/kategorija-dokumenta/obrasci/';

export const dobojForms: DobojForm[] = [
  // ============================================================
  // Odjeljenje za privredu i društvene djelatnosti (Registracija preduzetnika)
  // ============================================================
  {
    id: 'doboj-001',
    name: 'Zahtjev za registraciju preduzetnika СП 1',
    nameCyr: 'Захтјев за регистрацију предузетника СП 1',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/dokumenti/obrasci-dokumenti/zahtjev-za-registraciju-preduzetnika-sp-1.pdf',
    category: 'Privreda i preduzetništvo',
    section: 'Odjeljenje za privredu i društvene djelatnosti',
    description: 'Službeni obrazac za osnivanje i registraciju samostalnog preduzetnika (SP) u Gradu Doboj.',
  },

  // ============================================================
  // Prijemna kancelarija
  // ============================================================
  {
    id: 'doboj-002',
    name: 'Zahtjev za izlazak na teren radi ovjere',
    nameCyr: 'Захтјев за излазак на терен ради овјере',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/dokumenti/obrasci-dokumenti/zahtjev-za-izlazak-na-teren-radi-ovjere.pdf',
    category: 'Prijemna kancelarija i ovjere',
    section: 'Prijemna kancelarija',
    description: 'Zahtjev za službeni izlazak ovlaštenog lica na teren radi ovjere potpisa ili dokumenata.',
  },
  {
    id: 'doboj-003',
    name: 'Zahtjev za razgledanje spisa (predmeta)',
    nameCyr: 'Захтјев за разгледање списа (предмета)',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/dokumenti/obrasci-dokumenti/zahtjev-za-razgedanje-spisa-predmeta.pdf',
    category: 'Prijemna kancelarija i ovjere',
    section: 'Prijemna kancelarija',
    description: 'Zahtjev stranke za uvid i razgledanje upravnog spisa i predmeta u Gradskoj upravi Doboj.',
  },

  // ============================================================
  // Matična kancelarija
  // ============================================================
  {
    id: 'doboj-004',
    name: 'Zahtjev za izdavanje izvoda iz MKR, MKU i MKV',
    nameCyr: 'Захтјев за издавање извода из МКР, МКУ и МКВ',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/dokumenti/obrasci-dokumenti/zahtjev-za-izdavanje-izvoda-iz-mkr-mku-mkv.pdf',
    category: 'Matična služba i izvodi',
    section: 'Matična kancelarija',
    description: 'Zahtjev za izdavanje rodnog lista (MKR), vjenčanog lista (MKV) i umrlog lista (MKU).',
  },
  {
    id: 'doboj-005',
    name: 'Zahtjev za odobrenje za izlazak matičara na teren',
    nameCyr: 'Захтјев за одобрење за излазак матичара на терен',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/dokumenti/obrasci-dokumenti/zahtjev-za-odobrenje-za-izlazak-maticara-na-teren.pdf',
    category: 'Matična služba i izvodi',
    section: 'Matična kancelarija',
    description: 'Zahtjev za zaključenje braka van službenih prostorija uz izlazak matičara na teren.',
  },
  {
    id: 'doboj-006',
    name: 'Zahtjev za sklapanje braka putem punomoći',
    nameCyr: 'Захтјев за склапање брака путем пуномоћи',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/dokumenti/obrasci-dokumenti/zahtjev-za-sklapanje-braka-putem-punomoci.pdf',
    category: 'Matična služba i izvodi',
    section: 'Matična kancelarija',
    description: 'Zahtjev za vjenčanje kada jedan od bračnih drugova nije u mogućnosti lično prisustvovati.',
  },

  // ============================================================
  // Građanska stanja
  // ============================================================
  {
    id: 'doboj-007',
    name: 'Prijavni obrazac za novorođeno dijete za 2026. godinu',
    nameCyr: 'Пријавни образац за новорођено дијете за 2026. годину',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/2026/09/Prijavni_obrazac_novorodjeno_dijete_2026.pdf',
    category: 'Građanska stanja i naknade',
    section: 'Građanska stanja',
    description: 'Zvanični prijavni obrazac Grada Doboj za novčanu pomoć / naknadu za novorođeno dijete u 2026. godini.',
  },
  {
    id: 'doboj-008',
    name: 'Zahtjev za državljanstvo BiH, RS (MCP Sarajevo)',
    nameCyr: 'Захтјев за држављанство БиХ, РС (МЦП Сарајево)',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/dokumenti/obrasci-dokumenti/zahtjev-za-drzavljanstvo-bih-rs-mcp-sarajevo.pdf',
    category: 'Državljanstvo i prebivalište',
    section: 'Građanska stanja',
    description: 'Zahtjev za sticanje ili prestanak državljanstva putem Ministarstva civilnih poslova BiH.',
  },
  {
    id: 'doboj-009',
    name: 'Zahtjev za državljanstvo BiH, RS',
    nameCyr: 'Захтјев за држављанство БиХ, РС',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/dokumenti/obrasci-dokumenti/zahtjev-za-drzavljanstvo-bih-rs.pdf',
    category: 'Državljanstvo i prebivalište',
    section: 'Građanska stanja',
    description: 'Uvjerenje i zahtjev za državljanstvo Bosne i Hercegovine i Republike Srpske.',
  },
  {
    id: 'doboj-010',
    name: 'Zahtjev za ispravku podataka u MK vjenčanih',
    nameCyr: 'Захтјев за исправку података у МК вјенчаних',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/dokumenti/obrasci-dokumenti/zahtjev-za-ispravku-podataka-u-mk-vjencanih.pdf',
    category: 'Matične evidencije i ispravke',
    section: 'Građanska stanja',
    description: 'Zahtjev za ispravku greške u podacima upisanim u matičnu knjigu vjenčanih.',
  },
  {
    id: 'doboj-011',
    name: 'Zahtjev za ispravku podataka u MK rođenih',
    nameCyr: 'Захтјев за исправку података у МК рођених',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/dokumenti/obrasci-dokumenti/zahtjev-za-ispravku-podataka-u-mk-rodjenih.pdf',
    category: 'Matične evidencije i ispravke',
    section: 'Građanska stanja',
    description: 'Zahtjev za ispravku imena, prezimena ili drugih podataka u matičnoj knjizi rođenih.',
  },
  {
    id: 'doboj-012',
    name: 'Zahtjev za ispravku podataka u MK umrlih',
    nameCyr: 'Захтјев за исправку података у МК умрлих',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/dokumenti/obrasci-dokumenti/zahtjev-za-ispravku-podataka-u-mk-umrlih.pdf',
    category: 'Matične evidencije i ispravke',
    section: 'Građanska stanja',
    description: 'Zahtjev za ispravku podataka u matičnoj knjizi umrlih.',
  },
  {
    id: 'doboj-013',
    name: 'Zahtjev za naknadni upis činjenice smrti',
    nameCyr: 'Захтјев за накнадни упис чињенице смрти',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/dokumenti/obrasci-dokumenti/zahtjev-za-naknadni-upis-cinjenice-smrti.pdf',
    category: 'Matične evidencije i ispravke',
    section: 'Građanska stanja',
    description: 'Zahtjev za naknadni upis u matičnu knjigu umrlih nakon proteka redovnog zakonskog roka.',
  },
  {
    id: 'doboj-014',
    name: 'Zahtjev za naknadni upis činjenice vjenčanja',
    nameCyr: 'Захтјев за накнадни упис чињенице вјенчања',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/dokumenti/obrasci-dokumenti/zahtjev-za-nakndani-upis-cinjenice-vjencanja.pdf',
    category: 'Matične evidencije i ispravke',
    section: 'Građanska stanja',
    description: 'Zahtjev za naknadni upis sklopljenog braka u matičnu knjigu vjenčanih (uključujući brakove zaključene u inostranstvu).',
  },
  {
    id: 'doboj-015',
    name: 'Zahtjev za naknadni upis činjenice rođenja',
    nameCyr: 'Захтјев за накнадни упис чињенице рођења',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/dokumenti/obrasci-dokumenti/zahtjev-za-nakndani-upis-cinjenice-rodjenja.pdf',
    category: 'Matične evidencije i ispravke',
    section: 'Građanska stanja',
    description: 'Zahtjev za naknadni upis rođenja djeteta ili lica u matičnu knjigu rođenih.',
  },
  {
    id: 'doboj-016',
    name: 'Zahtjev za promjenu imena',
    nameCyr: 'Захтјев за промјену имена',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/dokumenti/obrasci-dokumenti/zahtjev-za-promjenu-imena.pdf',
    category: 'Građanska stanja i naknade',
    section: 'Građanska stanja',
    description: 'Službeni zahtjev za promjenu ličnog imena ili prezimena pred nadležnim organom Grada Doboj.',
  },
  {
    id: 'doboj-017',
    name: 'Zahtjev za izvod iz plana',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/2026/10/zahtjev-za-izvod-iz-plana.pdf',
    category: 'Urbanizam i prostorno uređenje',
    section: 'Prostorno uređenje i građenje',
    external: true,
    fileType: 'pdf',
  },
  {
    id: 'doboj-018',
    name: 'Zahtjev za lokacijske uslove',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/2026/10/zahtjev-lokacijski-uslovi.pdf',
    category: 'Urbanizam i prostorno uređenje',
    section: 'Prostorno uređenje i građenje',
    external: true,
    fileType: 'pdf',
  },
  {
    id: 'doboj-019',
    name: 'Zahtjev za naknadne lokacijske uslove',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/2026/10/zahtjev-naknadni-lokacijski-uslovi.pdf',
    category: 'Urbanizam i prostorno uređenje',
    section: 'Prostorno uređenje i građenje',
    external: true,
    fileType: 'pdf',
  },
  {
    id: 'doboj-020',
    name: 'Zahtjev za građevinsku dozvolu',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/2026/10/zahtjev-gradjevinska-dozvola.pdf',
    category: 'Urbanizam i prostorno uređenje',
    section: 'Prostorno uređenje i građenje',
    external: true,
    fileType: 'pdf',
  },
  {
    id: 'doboj-021',
    name: 'Zahtjev za naknadnu građevinsku dozvolu',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/2026/10/zahtjev-naknadna-gradjevinska-dozvola.pdf',
    category: 'Urbanizam i prostorno uređenje',
    section: 'Prostorno uređenje i građenje',
    external: true,
    fileType: 'pdf',
  },
  {
    id: 'doboj-022',
    name: 'Zahtjev za naknadnu građevinsku i upotrebnu dozvolu',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/2026/10/zahtjev-naknadna-gradjevinska-i-upotrebna-dozvola.pdf',
    category: 'Urbanizam i prostorno uređenje',
    section: 'Prostorno uređenje i građenje',
    external: true,
    fileType: 'pdf',
  },
  {
    id: 'doboj-023',
    name: 'Zahtjev za upotrebnu dozvolu',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/2026/10/zahtjev-upotrebna-dozvola.pdf',
    category: 'Urbanizam i prostorno uređenje',
    section: 'Prostorno uređenje i građenje',
    external: true,
    fileType: 'pdf',
  },
  {
    id: 'doboj-024',
    name: 'Zahtjev za naknadno odobrenje za gradnju i upotrebu objekta',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/2026/10/zahtjev-naknadno-odobrenje-za-gradnju-i-upotrebu-objekta.pdf',
    category: 'Urbanizam i prostorno uređenje',
    section: 'Prostorno uređenje i građenje',
    external: true,
    fileType: 'pdf',
  },
  {
    id: 'doboj-025',
    name: 'Zahtjev za uklanjanje objekta',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/2026/10/zahtjev-uklanjanje-objekta.pdf',
    category: 'Urbanizam i prostorno uređenje',
    section: 'Prostorno uređenje i građenje',
    external: true,
    fileType: 'pdf',
  },
  {
    id: 'doboj-026',
    name: 'Zahtjev za utvrđivanje legalnosti objekta',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/2026/10/zahtjev-za-utvrdjivanje-legalnosti-objekta.pdf',
    category: 'Urbanizam i prostorno uređenje',
    section: 'Prostorno uređenje i građenje',
    external: true,
    fileType: 'pdf',
  },
  {
    id: 'doboj-027',
    name: 'Zahtjev za razgledanje spisa iz prostornog uređenja',
    pdfUrl: 'https://doboj.gov.ba/wp-content/uploads/2026/10/zahtjev-za-razgledanje-spisa-prostorno-uredjenje.pdf',
    category: 'Urbanizam i prostorno uređenje',
    section: 'Prostorno uređenje i građenje',
    external: true,
    fileType: 'pdf',
  },
];

export function getDobojCategories(): string[] {
  return Array.from(new Set(dobojForms.map(f => f.category)));
}

export function getDobojSections(): string[] {
  return Array.from(new Set(dobojForms.map(f => f.section)));
}
