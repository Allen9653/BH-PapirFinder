import type { MunicipalityForm } from './municipality-registry';

export const KALESIJA_OFFICIAL_URL = 'https://kalesija.ba/';
export const KALESIJA_FORMS_PORTAL_URL = 'https://kalesija.ba/usluge/';

export const kalesijaForms: MunicipalityForm[] = [
  {
    id: 'kalesija-strategija-izmjene-dopune',
    name: 'Obrazac za dostavu izmjena i dopuna strategije',
    pdfUrl: 'https://kalesija.ba/documents/obrazac-za-dostavu-izmjena-i-dopuna-strategije/',
    category: 'Privreda i lokalni razvoj',
    fileType: 'html',
    external: true,
  },
  {
    id: 'kalesija-upis-vjencanja-14b',
    name: 'Zahtjev za upis vjenčanja u matičnu knjigu vjenčanih – obrazac broj 14b',
    pdfUrl: 'https://kalesija.ba/documents/zahtjev-za-upis-vjencanja-u-maticnu-knjigu-vjencanih-obrazac-broj-14b/',
    category: 'Matični ured',
    fileType: 'html',
    external: true,
  },
  {
    id: 'kalesija-upis-rodjenja-djeteta-14',
    name: 'Zahtjev za upis rođenja djeteta u matičnu knjigu rođenih – obrazac br 14',
    pdfUrl: 'https://kalesija.ba/documents/zahtjev-za-upis-rodjenja-djeteta-u-maticnu-knjigu-rodjenih-obrazac-br-14/',
    category: 'Matični ured',
    fileType: 'html',
    external: true,
  },
  {
    id: 'kalesija-upis-podataka-umrlih-14a',
    name: 'Zahtjev za upis podataka u matičnu knjigu umrlih – obrazac 14a',
    pdfUrl: 'https://kalesija.ba/documents/zahtjev-za-upis-podataka-u-maticnu-knjigu-umrlih-obrazac-14a/',
    category: 'Matični ured',
    fileType: 'html',
    external: true,
  },
  {
    id: 'kalesija-upis-cinjenice-smrti-4',
    name: 'Zahtjev za upis činjenice smrti u matičnu knjigu umrlih – obrazac 4',
    pdfUrl: 'https://kalesija.ba/documents/zahtjev-za-upis-cinjenice-smrti-u-maticnu-knjigu-umrlih-obrazac-4/',
    category: 'Matični ured',
    fileType: 'html',
    external: true,
  },
  {
    id: 'kalesija-sklapanje-braka-3',
    name: 'Zahtjev za upis činjenice sklapanja braka u matičnu knjigu vjenčanih obrazac br.3',
    pdfUrl: 'https://kalesija.ba/documents/zahtjev-za-upis-cinjenice-sklapanja-braka-u-maticnu-knjigu-vjencanih-obrazac-br-3/',
    category: 'Matični ured',
    fileType: 'html',
    external: true,
  },
  {
    id: 'kalesija-rodjenje-drzavljanstvo-bih-fbih-2',
    name: 'Zahtjev za upis činjenice rođenja u matičnu knjigu rođenih s konstatacijom državljanstva BiH i FBiH – obrazac 2',
    pdfUrl: 'https://kalesija.ba/documents/zahtjev-za-upis-cinjenice-rodjenja-u-maticnu-knjigu-rodjenih-s-konstatacijom-drzavljanstva-bih-i-fbih-obrazac-2/',
    category: 'Matični ured',
    fileType: 'html',
    external: true,
  },
  {
    id: 'kalesija-drzavljanstvo-14-1',
    name: 'Zahtjev za upis činjenice državljanstva u matičnu knjigu rođenih – obrazac 14-1',
    pdfUrl: 'https://kalesija.ba/documents/zahtjev-za-upis-cinjenice-drzavljanstva-u-maticnu-knjigu-rodjenih-obrazac-14-1/',
    category: 'Matični ured',
    fileType: 'html',
    external: true,
  },
  {
    id: 'kalesija-plan-proizvodnje',
    name: 'Obrazac prijava plana proizvodnje',
    pdfUrl: 'https://kalesija.ba/documents/obrazac-prijava-plana-proizvodnje/',
    category: 'Poljoprivreda',
    fileType: 'html',
    external: true,
  },
  {
    id: 'kalesija-sg-3',
    name: 'Obrazac SG-3',
    pdfUrl: 'https://kalesija.ba/wp-content/uploads/Obrazac_SG-3.pdf',
    sourceUrl: 'https://kalesija.ba/documents/obrazac-sg-3/',
    category: 'Poljoprivreda',
    fileType: 'pdf',
    external: true,
  },
];

export const kalesijaGuidanceLinks = kalesijaForms.map((form) => ({
  label: form.name,
  url: form.sourceUrl ?? form.pdfUrl,
}));
