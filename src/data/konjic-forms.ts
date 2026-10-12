import type { MunicipalityForm } from './municipality-registry';

const BASE = 'https://www.konjic.ba/ba/uprava/opcinske-sluzbe/prospekti-sluzbi';

/** Prospekti službi Općine Konjic (HTML stranice, otvaraju se na službenom webu). */
export const konjicForms: MunicipalityForm[] = [
  { id: 'konjic-283', name: 'Naknade u postupku izdavanja odobrenja za gradnju', pdfUrl: `${BASE}/283-naknade_za_dozvolu_za_gradnju_i_zone_konjic.html`, category: 'Urbanizam i građenje', external: true },
  { id: 'konjic-284', name: 'Odobrenje za građenje', pdfUrl: `${BASE}/284-odobrenje_za_gradnju.html`, category: 'Urbanizam i građenje', external: true },
  { id: 'konjic-287', name: 'Urbanistička suglasnost', pdfUrl: `${BASE}/287-urbanisticka_saglasnost.html`, category: 'Urbanizam i građenje', external: true },
  { id: 'konjic-310', name: 'Upotrebna dozvola', pdfUrl: `${BASE}/310-upotrebna_dozvola.html`, category: 'Urbanizam i građenje', external: true },
];
