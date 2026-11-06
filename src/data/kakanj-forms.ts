// ============================================================
// Općina Kakanj — Službena Baza Obrazaca i Elektronskih Dokumenata
// Službena stranica: https://kakanj.gov.ba/
// Službena stranica s e-obrazcima: https://kakanj.gov.ba/v5/e-obrasci/
// Posljednje ažurirano: 2026-11-02
// ============================================================

import { latinToCyrillic } from '@/lib/cyrillic-converter';

export const KAKANJ_OFFICIAL_URL = 'https://kakanj.gov.ba/';
export const KAKANJ_FORMS_PORTAL_URL = 'https://kakanj.gov.ba/v5/e-obrasci/';

export interface KakanjDocumentItem {
  id: string;
  name: string;
  naziv: string; // Alias za BHS
  category: string;
  kategorija: string; // Alias za BHS
  sluzba: string;
  pdfUrl: string;
  url: string; // Alias za spec
  description: string;
  opis: string; // Alias za spec
  sizeKB: number;
  akcije: ('download' | 'edit' | 'share' | 'translate' | 'save' | 'print' | 'preview')[];
  keywords?: string;
}

export const kakanjForms: KakanjDocumentItem[] = [
  // ============================================================
  // Služba za privredu, urbanizam i zaštitu okoline
  // ============================================================
  {
    id: 'kakanj-promjena-investitora',
    name: 'Zahtjev za promjenu investitora (OK-O-4.2.-38)',
    naziv: 'Zahtjev za promjenu investitora (OK-O-4.2.-38)',
    category: 'Urbanizam i građenje',
    kategorija: 'Urbanizam i građenje',
    sluzba: 'Služba za privredu, urbanizam i zaštitu okoline',
    pdfUrl: 'http://kakanj.gov.ba/v4/wp-content/uploads/2017/03/ZAHTJEV-ZA-PROMJENU-INVESTITORA-OK-O-4.2.-38.pdf',
    url: 'http://kakanj.gov.ba/v4/wp-content/uploads/2017/03/ZAHTJEV-ZA-PROMJENU-INVESTITORA-OK-O-4.2.-38.pdf',
    description: 'Tko treba: Fizička i pravna lica, novi i postojeći investitori koji preuzimaju pravo građenja na objektu. Čemu služi: Za službenu izmjenu odobrenja za građenje i prenos prava investitora na novo lice u toku važenja građevinske dozvole na području Općine Kakanj.',
    opis: 'Tko treba: Fizička i pravna lica, novi i postojeći investitori koji preuzimaju pravo građenja na objektu. Čemu služi: Za službenu izmjenu odobrenja za građenje i prenos prava investitora na novo lice u toku važenja građevinske dozvole na području Općine Kakanj.',
    sizeKB: 74,
    akcije: ['download', 'edit', 'share', 'translate', 'save', 'print', 'preview'],
    keywords: 'promjena investitora gradnja dozvola kakanj urbanizam nekretnina građevinarstvo',
  },
  {
    id: 'kakanj-odobrenje-djelatnost-pravna-lica',
    name: 'Zahtjev za izdavanje odobrenja za obavljanje djelatnosti (tehnički uslovi) - Pravna lica',
    naziv: 'Zahtjev za izdavanje odobrenja za obavljanje djelatnosti (tehnički uslovi) - Pravna lica',
    category: 'Privreda i poslovanje',
    kategorija: 'Privreda i poslovanje',
    sluzba: 'Služba za privredu, urbanizam i zaštitu okoline',
    pdfUrl: 'http://kakanj.gov.ba/v4/wp-content/uploads/2014/08/Zahtjev-za-izdavanje-odobrenja-za-obavljanje-djelatnosti-tehni%C4%8Dki-uslovi-PRAVNA-LICA.pdf',
    url: 'http://kakanj.gov.ba/v4/wp-content/uploads/2014/08/Zahtjev-za-izdavanje-odobrenja-za-obavljanje-djelatnosti-tehni%C4%8Dki-uslovi-PRAVNA-LICA.pdf',
    description: 'Tko treba: Pravna lica (privredna društva, d.o.o., d.d.) koja registruju poslovne jedinice ili počinju obavljati privrednu djelatnost. Čemu služi: Zahtjev za utvrđivanje ispunjavanja propisanih minimalnih tehničkih i sanitarno-zdravstvenih uslova poslovnog prostora u Kaknju.',
    opis: 'Tko treba: Pravna lica (privredna društva, d.o.o., d.d.) koja registruju poslovne jedinice ili počinju obavljati privrednu djelatnost. Čemu služi: Zahtjev za utvrđivanje ispunjavanja propisanih minimalnih tehničkih i sanitarno-zdravstvenih uslova poslovnog prostora u Kaknju.',
    sizeKB: 82,
    akcije: ['download', 'edit', 'share', 'translate', 'save', 'print', 'preview'],
    keywords: 'tehnički uslovi pravna lica poslovanje preduzeće djelatnost kakanj privreda poslovni prostor',
  },
  {
    id: 'kakanj-odobrenje-djelatnost-fizicka-lica',
    name: 'Zahtjev za izdavanje odobrenja za obavljanje djelatnosti (tehnički uslovi) - Fizička lica',
    naziv: 'Zahtjev za izdavanje odobrenja za obavljanje djelatnosti (tehnički uslovi) - Fizička lica',
    category: 'Privreda i obrt',
    kategorija: 'Privreda i obrt',
    sluzba: 'Služba za privredu, urbanizam i zaštitu okoline',
    pdfUrl: 'http://kakanj.gov.ba/v4/wp-content/uploads/2014/08/Zahtjev-za-izdavanje-odobrenja-za-obavljanje-djelatnosti-tehni%C4%8Dki-uslovi-FIZI%C4%8CKA-LICA-.pdf',
    url: 'http://kakanj.gov.ba/v4/wp-content/uploads/2014/08/Zahtjev-za-izdavanje-odobrenja-za-obavljanje-djelatnosti-tehni%C4%8Dki-uslovi-FIZI%C4%8CKA-LICA-.pdf',
    description: 'Tko treba: Fizička lica, zanatlije i samostalni preduzetnici. Čemu služi: Izdavanje odobrenja nadležne općinske komisije o ispunjavanju minimalnih tehničkih uslova za obavljanje samostalne zanatske, trgovačke ili uslužne djelatnosti.',
    opis: 'Tko treba: Fizička lica, zanatlije i samostalni preduzetnici. Čemu služi: Izdavanje odobrenja nadležne općinske komisije o ispunjavanju minimalnih tehničkih uslova za obavljanje samostalne zanatske, trgovačke ili uslužne djelatnosti.',
    sizeKB: 78,
    akcije: ['download', 'edit', 'share', 'translate', 'save', 'print', 'preview'],
    keywords: 'tehnički uslovi fizička lica obrt samostalna djelatnost kakanj radnja prostor',
  },
  {
    id: 'kakanj-osnivanje-obrta-srodne-djelatnosti',
    name: 'Zahtjev za osnivanje obrta i srodne djelatnosti',
    naziv: 'Zahtjev za osnivanje obrta i srodne djelatnosti',
    category: 'Privreda i obrt',
    kategorija: 'Privreda i obrt',
    sluzba: 'Služba za privredu, urbanizam i zaštitu okoline',
    pdfUrl: 'https://kakanj.gov.ba/v5/wp-content/uploads/2023/08/Zahtjev-za-osnivanje-obrta-srodne-djelatnost-1.pdf',
    url: 'https://kakanj.gov.ba/v5/wp-content/uploads/2023/08/Zahtjev-za-osnivanje-obrta-srodne-djelatnost-1.pdf',
    description: 'Tko treba: Građani koji pokreću novu samostalnu privrednu djelatnost, zanat ili usluge na području Kaknja. Čemu služi: Registracija i izdavanje rješenja o osnivanju obrta u skladu sa Zakonom o obrtu i srodnim djelatnostima FBiH.',
    opis: 'Tko treba: Građani koji pokreću novu samostalnu privrednu djelatnost, zanat ili usluge na području Kaknja. Čemu služi: Registracija i izdavanje rješenja o osnivanju obrta u skladu sa Zakonom o obrtu i srodnim djelatnostima FBiH.',
    sizeKB: 96,
    akcije: ['download', 'edit', 'share', 'translate', 'save', 'print', 'preview'],
    keywords: 'osnivanje obrta registracija firma poduzetništvo kakanj obrtnik srodne djelatnosti',
  },
  {
    id: 'kakanj-osnivanje-ugostiteljske-radnje',
    name: 'Zahtjev za izdavanje odobrenja o osnivanju ugostiteljske radnje',
    naziv: 'Zahtjev za izdavanje odobrenja o osnivanju ugostiteljske radnje',
    category: 'Privreda i obrt',
    kategorija: 'Privreda i obrt',
    sluzba: 'Služba za privredu, urbanizam i zaštitu okoline',
    pdfUrl: 'http://kakanj.gov.ba/v4/isoobrasci/OBRASCI-SLU%8eBA%20ZA%20PRIVREDU,URBANIZAM%20I%20ZA%8aTITU%20OKOLINE/Zahtjev_za_izdavanje_odobrenja_o_osnivanju_ugostiteljske_radnje.pdf',
    url: 'http://kakanj.gov.ba/v4/isoobrasci/OBRASCI-SLU%8eBA%20ZA%20PRIVREDU,URBANIZAM%20I%20ZA%8aTITU%20OKOLINE/Zahtjev_za_izdavanje_odobrenja_o_osnivanju_ugostiteljske_radnje.pdf',
    description: 'Tko treba: Ugostitelji i privrednici koji otvaraju kafiće, restorane, objekte brze hrane ili bifee. Čemu služi: Za pribavljanje službenog odobrenja općinske službe za osnivanje i obavljanje ugostiteljske djelatnosti u određenoj kategoriji.',
    opis: 'Tko treba: Ugostitelji i privrednici koji otvaraju kafiće, restorane, objekte brze hrane ili bifee. Čemu služi: Za pribavljanje službenog odobrenja općinske službe za osnivanje i obavljanje ugostiteljske djelatnosti u određenoj kategoriji.',
    sizeKB: 84,
    akcije: ['download', 'edit', 'share', 'translate', 'save', 'print', 'preview'],
    keywords: 'ugostiteljstvo ugostiteljska radnja kafić restoran kakanj privreda odobrenje',
  },
  {
    id: 'kakanj-izmjena-rjesenja-radnje',
    name: 'Zahtjev za izmjenu rješenja o osnivanju radnje ili obavljanju djelatnosti',
    naziv: 'Zahtjev za izmjenu rješenja o osnivanju radnje ili obavljanju djelatnosti',
    category: 'Privreda i obrt',
    kategorija: 'Privreda i obrt',
    sluzba: 'Služba za privredu, urbanizam i zaštitu okoline',
    pdfUrl: 'http://kakanj.gov.ba/v4/isoobrasci/OBRASCI-SLU%8eBA%20ZA%20PRIVREDU,URBANIZAM%20I%20ZA%8aTITU%20OKOLINE/Zahtjev_za_izmjenu_rje%9aenja_o_osnivanju_radnje_ili_obavljanju_djelatnosti.pdf',
    url: 'http://kakanj.gov.ba/v4/isoobrasci/OBRASCI-SLU%8eBA%20ZA%20PRIVREDU,URBANIZAM%20I%20ZA%8aTITU%20OKOLINE/Zahtjev_za_izmjenu_rje%9aenja_o_osnivanju_radnje_ili_obavljanju_djelatnosti.pdf',
    description: 'Tko treba: Registrovani obrtnici i vlasnici radnji u Kaknju. Čemu služi: Za prijavu promjene sjedišta, naziva radnje, dopune ili izmjene šifre djelatnosti, ili promjene poslovođe/vlasnika.',
    opis: 'Tko treba: Registrovani obrtnici i vlasnici radnji u Kaknju. Čemu služi: Za prijavu promjene sjedišta, naziva radnje, dopune ili izmjene šifre djelatnosti, ili promjene poslovođe/vlasnika.',
    sizeKB: 79,
    akcije: ['download', 'edit', 'share', 'translate', 'save', 'print', 'preview'],
    keywords: 'izmjena rješenja obrt radnja djelatnost kakanj sjedište poslovođa privreda',
  },
];

/**
 * Get distinct categories for Kakanj
 */
export function getKakanjCategories(): string[] {
  const cats = new Set<string>();
  for (const form of kakanjForms) {
    cats.add(form.category);
  }
  return Array.from(cats).sort();
}

/**
 * Generiše čisti strukturirani JSON format prema zadatoj specifikaciji
 * s podrškom za transliteraciju (latinica / ćirilica) i višejezičnost.
 */
export function getKakanjStructuredJson(options?: {
  script?: 'latin' | 'cyrillic';
  department?: string;
  language?: string;
}) {
  const isCyrillic = options?.script === 'cyrillic';
  const selectedDept = options?.department;

  const docs = selectedDept
    ? kakanjForms.filter((f) => f.sluzba.toLowerCase().includes(selectedDept.toLowerCase()))
    : kakanjForms;

  const toScript = (text: string): string => {
    if (!isCyrillic) return text;
    return latinToCyrillic(text);
  };

  return {
    institucija: toScript('Općina Kakanj'),
    sluzba: toScript(
      selectedDept || 'Služba za privredu, urbanizam i zaštitu okoline'
    ),
    sluzbena_stranica: KAKANJ_OFFICIAL_URL,
    stranica_s_obrazcima: KAKANJ_FORMS_PORTAL_URL,
    kanton_zupanija: toScript('Zeničko-dobojski kanton (ZDK)'),
    entitet: toScript('Federacija Bosne i Hercegovine'),
    zadnje_azurirano: '2026-11-02',
    pismo: isCyrillic ? 'ćirilica' : 'latinica',
    ukupno_dokumenata: docs.length,
    dokumenti: docs.map((doc) => ({
      id: doc.id,
      naziv: toScript(doc.naziv),
      kategorija: toScript(doc.kategorija),
      sluzba: toScript(doc.sluzba),
      url: doc.url,
      opis: toScript(doc.opis),
      velicina_kb: doc.sizeKB,
      akcije: doc.akcije,
    })),
  };
}
