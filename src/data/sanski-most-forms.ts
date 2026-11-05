import type { MunicipalityForm } from './municipality-registry';

export const SANSKI_MOST_OFFICIAL_URL = 'https://sanskimost.gov.ba/';

const agricultureForms = [
  {
    id: 'poljoprivreda-z1-mlijecni-karton',
    naziv: 'Z-1 Mliječni karton',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Z-1-Mlijecni-karton.pdf',
  },
  {
    id: 'poljoprivreda-z2-dehelminitizacija',
    naziv: 'Z-2 Dehelminitizacija',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Z-2-Dehelminitizacija.pdf',
  },
  {
    id: 'poljoprivreda-z3-uzgoj-muznih-grla',
    naziv: 'Z-3 Uzgoj muznih grla',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Z-3-Uzgoj-muznih-grla-1.pdf',
  },
  {
    id: 'poljoprivreda-z4-maticenje-jagnjadi-ovaca',
    naziv: 'Z-4 Matičenje jagnjadi i ovaca',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Z-4-Maticenje-jagnjadi-i-ovaca.pdf',
  },
  {
    id: 'poljoprivreda-z5-vocarstvo-vinogradarstvo',
    naziv: 'Z-5 Voćarstvo i vinogradarstvo',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Z-5-%E2%80%93-Vocarstvo-i-vinogradarstvo.pdf',
  },
  {
    id: 'poljoprivreda-z6a-proizvodnja-zatvoreni-prostor',
    naziv: 'Z-6-a Proizvodnja u zatvorenom prostoru',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Z-6-a-Proizvodnja-zatvoreni-prostor.pdf',
  },
  {
    id: 'poljoprivreda-z6b-proizvodnja-otvoreni-prostor',
    naziv: 'Z-6-b Proizvodnja na otvorenom',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Z-6-b-Proizvodnja-na-otvorenom.pdf',
  },
  {
    id: 'poljoprivreda-z7-pcelarstvo',
    naziv: 'Z-7 Pčelarstvo',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Z-7-Pcelarstvo.pdf',
  },
  {
    id: 'poljoprivreda-z10-mladi-poljoprivrednici',
    naziv: 'Z-10 Mladi poljoprivrednici',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Z-10-Mladi-poljoprivrednici-1.pdf',
  },
  {
    id: 'poljoprivreda-z11-novoregistrovani-obrti',
    naziv: 'Z-11 Novoregistrovani obrti u poljoprivredi',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Z-11-Novoregistrovani-obrti-u-polj.pdf',
  },
  {
    id: 'poljoprivreda-z12-nadoknada-stete',
    naziv: 'Z-12 Nadoknada štete',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Z-12-Nadoknada-stete.pdf',
  },
  {
    id: 'poljoprivreda-z13-dan-poljoprivrede',
    naziv: 'Z-13 Dan poljoprivrede',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Z-13-Dan-poljoprivred.pdf',
  },
  {
    id: 'poljoprivreda-z14-hemijska-analiza',
    naziv: 'Z-14 Hemijska analiza',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Z-14-Hemiska-analiza.pdf',
  },
  {
    id: 'poljoprivreda-z15-slup-kancelarija',
    naziv: 'Z-15 SLUP – kancelarija',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Z-15-Slup%E2%80%93-kancelarija.pdf',
  },
  {
    id: 'poljoprivreda-i1-muzna-grla',
    naziv: 'Obrazac I-1 – muzna grla',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Obrazac-I-1-muzna-grla.pdf',
  },
  {
    id: 'poljoprivreda-i2-ovce',
    naziv: 'Obrazac I-2 – ovce',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Obrazac-I-2-ovce.pdf',
  },
  {
    id: 'poljoprivreda-i3-vocarstvo',
    naziv: 'Obrazac I-3 – voćarstvo',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Obrazac-I-3-vocarstvo.pdf',
  },
  {
    id: 'poljoprivreda-i4-povrce-otvoreno',
    naziv: 'Obrazac I-4 – proizvodnja povrća na otvorenom',
    tip: 'pdf',
    url: 'https://sanskimost.gov.ba/wp-content/uploads/2026/05/Obrazac-I-4-proizvodnja-povrca-na-otvorenom.pdf',
  },
] as const;

export const sanskiMostDocuments = {
  id: 'sanski-most',
  naziv: 'Općina Sanski Most',
  kanton: 'Unsko-sanski kanton (USK)',
  kategorijeDokumenata: [
    {
      naslov: 'Poljoprivreda',
      izvorUrl: SANSKI_MOST_OFFICIAL_URL,
      fajlovi: agricultureForms,
    },
  ],
} as const;

export const sanskiMostForms: MunicipalityForm[] =
  sanskiMostDocuments.kategorijeDokumenata.flatMap((category) =>
    category.fajlovi.map((file) => ({
      id: file.id,
      name: file.naziv,
      pdfUrl: file.url,
      category: category.naslov,
      external: true,
      fileType: file.tip,
      sourceUrl: category.izvorUrl,
    })),
  );
