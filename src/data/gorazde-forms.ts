// ============================================================
// Grad Goražde (Bosansko-podrinjski kanton Goražde - BPK)
// Službeni website: https://gorazde.ba/
// Obrasci Službe za finansije: https://gorazde.ba/sluzba-za-finansije-trezor-i-privredu-elektronski-obrasci/
// ============================================================

export interface GorazdeForm {
  id: string;
  name: string;
  pdfUrl: string;
  category: string;
  section: string;
  description?: string;
}

export const GORAZDE_OFFICIAL_URL = 'https://gorazde.ba/';
export const GORAZDE_E_UPRAVA_URL = 'https://gorazde.ba/gradska-uprava/';

export const gorazdeForms: GorazdeForm[] = [
  {
    id: 'gorazde-001',
    name: 'Zahtjev za izdavanje urbanističke saglasnosti i građevinske dozvole',
    pdfUrl: 'https://gorazde.ba/gradska-uprava/',
    category: 'Urbanizam i građenje',
    section: 'Služba za prostorno uređenje, stambeno-komunalne poslove i raseljena lica',
    description: 'Postupak izdavanja urbanističke saglasnosti, odobrenja za građenje i upotrebne dozvole.',
  },
  {
    id: 'gorazde-002',
    name: 'Zahtjev za inspekcijski nadzor',
    pdfUrl: 'https://gorazde.ba/sluzba-za-inspekcijske-poslove-elektronski-obrasci/',
    category: 'Inspekcijski poslovi',
    section: 'Služba za inspekcijske poslove Grada Goražda',
    description: 'Prijavni obrazac za pokretanje inspekcijskog nadzora u oblasti komunalnih, građevinskih i tržišnih poslova.',
  },
  {
    id: 'gorazde-003',
    name: 'Elektronski obrasci Službe za imovinsko-pravne poslove i katastar nekretnina',
    pdfUrl: 'https://gorazde.ba/sluzba-za-imovinsko-pravne-poslove/',
    category: 'Katastar i nekretnine',
    section: 'Služba za geodetske, imovinsko-pravne poslove i katastar',
    description: 'Kopije katastarskog plana, posjedovni listovi, uvođenje u posjed i parcelacija nekretnina.',
  },
  {
    id: 'gorazde-004',
    name: 'Elektronski obrasci Službe za finansije, trezor i privredu',
    pdfUrl: 'https://gorazde.ba/sluzba-za-finansije-trezor-i-privredu-elektronski-obrasci/',
    category: 'Finansije i privreda',
    section: 'Služba za finansije, trezor i privredu',
    description: 'Registracija obrta, podsticaji u privredi, komunalne takse i oslobađanje od naknada.',
  },
  {
    id: 'gorazde-005',
    name: 'Elektronski obrasci Službe za boračko-invalidsku i socijalnu zaštitu',
    pdfUrl: 'https://gorazde.ba/sluzba-za-boracko-invalidsku-i-socijalnu-zastitu-elektronski-obrasci/',
    category: 'Boračka i socijalna zaštita',
    section: 'Služba za boračko-invalidsku i socijalnu zaštitu',
    description: 'Dopunska prava boraca, jednokratne socijalne pomoći, dječiji dodatak i naknade porodiljama.',
  },
  {
    id: 'gorazde-006',
    name: 'Elektronski obrasci Službe za civilnu zaštitu i mjesne zajednice',
    pdfUrl: 'https://gorazde.ba/sluzba-za-civilnu-zastitu-i-mjesne-zajednice-elektronski-obrasci/',
    category: 'Civilna zaštita',
    section: 'Služba za civilnu zaštitu i mjesne zajednice',
  },
];

export function getGorazdeCategories(): string[] {
  return Array.from(new Set(gorazdeForms.map(f => f.category)));
}
