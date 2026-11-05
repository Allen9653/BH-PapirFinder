import type { MunicipalityForm } from './municipality-registry';

export const GRUDE_OFFICIAL_URL = 'https://grude.info/';
export const GRUDE_FORMS_PORTAL_URL =
  'https://grude.info/opcinska-uprava/opcinske-sluzbe/sluzba-za-opcu-upravu-branitelje-iz-domovinskog-rata-i-drustvene-djelatnosti/?search=&from=01.01.2000&to=31.12.2100#';
export const GRUDE_REQUESTS_URL =
  'https://grude.info/opcinska-uprava/opcinske-sluzbe/sluzba-za-opcu-upravu-branitelje-iz-domovinskog-rata-i-drustvene-djelatnosti/?search=&from=01.01.2000&to=31.12.2100#zahtjevi';

const requestPage = 'https://grude.info/opcinska-uprava/opcinske-sluzbe/sluzba-za-opcu-upravu-branitelje-iz-domovinskog-rata-i-drustvene-djelatnosti/?search=&from=01.01.2000&to=31.12.2100';

const documentForm = (
  id: string,
  name: string,
  pdfUrl: string,
  category: string,
): MunicipalityForm => {
  const extension = /\.([a-z0-9]+)(?:[?#].*)?$/i.exec(pdfUrl)?.[1]?.toLowerCase();
  const fileType = extension === 'doc' || extension === 'docx' ? extension : 'pdf';

  return { id, name, pdfUrl, category, fileType, external: true };
};

export const grudeForms: MunicipalityForm[] = [
  {
    id: 'grude-zahtjevi',
    name: 'Zahtjevi',
    pdfUrl: GRUDE_FORMS_PORTAL_URL,
    category: 'Zahtjevi',
    fileType: 'html',
    external: true,
  },
  documentForm(
    'grude-prijevremeni-upis-djece-u-skolu',
    'Zahtjev za prijevremeni upis djece u školu',
    'https://grude.info/wp-content/uploads/2025/06/Zahtjev-za-prijevremeni-upis-djece-u-skolu.pdf',
    'Obrazovanje',
  ),
  documentForm(
    'grude-egzistencijalna-naknada-razvojaceni-branitelj-fbih',
    'Obrazac Zahtjeva za prava na novčanu egzistencijalnu naknadu razvojačenog branitelja FBIH',
    'https://grude.info/wp-content/uploads/2025/06/Zahtjev-za-priznavanje-prava-na-novcanu-egzistencijalnu-naknadu-razvojacenog-branitelja-FBiH-1.pdf',
    'Branitelji i socijalna zaštita',
  ),
  documentForm(
    'grude-upis-nacionalnosti-mkr-bih',
    'Obrazac Zahtjeva za upis činjenice nacionalnosti u MKR građana BiH',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-Zahtjeva-za-upis-cinjenice-nacionalnosti-u-MKR-gradana-BiH-za-maloljetno-dijete-1.pdf',
    'Matični ured',
  ),
  documentForm(
    'grude-upis-nacionalnosti-mkr-bih-maloljetno-dijete',
    'Obrazac Zahtjeva za upis činjenice nacionalnosti u MKR građana BiH za maloljetno dijete',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-Zahtjeva-za-upis-cinjenice-nacionalnosti-u-MKR-gradana-BiH-za-maloljetno-dijete.pdf',
    'Matični ured',
  ),
  documentForm(
    'grude-naknadni-upis-rodjenja-mkr-bih',
    'Obrazac Zahtjeva za naknadni upis činjenice rođenja u MKR građana BiH',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-Zahtjeva-za-naknadni-upis-cinjenice-rodenja-u-MKR-gradana-BiH.pdf',
    'Matični ured',
  ),
  documentForm(
    'grude-naknadni-upis-smrti-mku-bih',
    'Obrazac Zahtjeva za naknadni upis činjenice smrti u MKU građana BiH',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-Zahtjeva-za-naknadni-upis-cinjenice-smrti-u-MKU-gradana-BiH.pdf',
    'Matični ured',
  ),
  documentForm(
    'grude-sklapanje-braka-izvan-sluzbenih-prostorija',
    'Obrazac Zahtjeva za izdavanje odobrenja za sklapanje braka izvan službenih prostorija Općine Grude',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-Zahtjeva-za-izdavanje-odobrenja-za-sklapanje-braka-izvan-sluzbenih-prostorija-Opcine-Grude.pdf',
    'Matični ured',
  ),
  documentForm(
    'grude-naknadni-upis-rodjenja-drzavljanstvo',
    'Obrazac Zahtjeva za naknadni upis činjenice rođenja u MKR građana BiH s konstatacijom državljanstva BiH i FBiH',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-Zahtjeva-za-naknadni-upis-cinjenice-rodenja-u-MKR-gradana-BiH-s-konstatacijom-drzavljanstva-BiH-i-FBiH.pdf',
    'Matični ured',
  ),
  documentForm(
    'grude-ispravak-promjena-podataka-maticna-knjiga',
    'Obrazac Prijave (Zahtjev) za ispravak-promjenu podataka u matičnoj knjizi',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-Prijave-Zahtjev-za-ispravak-promjenu-podataka-u-maticnoj-knjizi.pdf',
    'Matični ured',
  ),
  documentForm(
    'grude-naknadni-upis-rodjenja-drzavljanstvo-porijeklo',
    'Obrazac Zahtjeva za naknadni upis činjenice rođenja u MKR građana BiH s konstatacijom državljanstva BiH i FBiH (po podrijetlu)',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-Zahtjeva-za-naknadni-upis-cinjenice-rodenja-u-MKR-gradana-BiH-s-konstatacijom-drzavljanstva-BiH-i-FBiH-po-podrijetlu.pdf',
    'Matični ured',
  ),
  {
    id: 'grude-izdavanje-izvatka-mk',
    name: 'Obrazac Zahtjeva za izdavanje izvatka u MK',
    pdfUrl: requestPage,
    category: 'Matični ured',
    fileType: 'html',
    external: true,
  },
  documentForm(
    'grude-upis-rodjenja-drzavljanstvo-bih-fbih',
    'Obrazac Zahtjeva za upis činjenice rođenja u matičnu knjigu rođenih s konstatacijom državljanstva BiH i FBiH',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-Zahtjeva-za-upis-cinjenice-rodenja-u-maticnu-knjigu-rodenih-s-konstatacijom-drzavljanstva-BiH-i-FBiH.pdf',
    'Matični ured',
  ),
  documentForm(
    'grude-egzistencijalna-naknada-zzh',
    'Obrazac Zahtjeva za egzistencijalnu naknadu ŽZH',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac_zahtjeva_za_egzistencijalnu_naknadu.docx',
    'Branitelji i socijalna zaštita',
  ),
  documentForm(
    'grude-jednokratna-novcana-pomoc',
    'Obrazac Zahtjeva za jednokratnu novčanu pomoć',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac_zahtjeva_za_jednokratnu_novanu_pomo_za_rjeavanje_drugih_socijalnih_potreba.docx',
    'Branitelji i socijalna zaštita',
  ),
  documentForm(
    'grude-obiteljska-invalidnina',
    'Obrazac Zahtjeva za priznavanje prava na obiteljsku invalidninu',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-za-priznavanje-obiteljske-invalidnine.pdf',
    'Branitelji i socijalna zaštita',
  ),
  documentForm(
    'grude-upis-sklapanja-braka-mkv',
    'Obrazac Zahtjeva za upis činjenice sklapanja braka u matičnu knjigu vjenčanih',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-Zahtjeva-za-upis-cinjenice-sklapanja-braka-u-maticnu-knjigu-vjencanih.pdf',
    'Matični ured',
  ),
  documentForm(
    'grude-upis-smrti-mku',
    'Obrazac Zahtjeva za upis činjenice smrti u matičnu knjigu umrlih',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-Zahtjeva-za-upis-cinjenice-smrti-u-maticnu-knjigu-umrlih-1.pdf',
    'Matični ured',
  ),
  documentForm(
    'grude-upis-vjencanja-mkv',
    'Obrazac Zahtjeva za upis vjenčanja u matičnu knjigu vjenčanih',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-Zahtjeva-za-upis-vjencanja-u-maticnu-knjigu-vjencanih.pdf',
    'Matični ured',
  ),
  documentForm(
    'grude-upis-podataka-mku',
    'Obrazac Prijave (Zahtjeva) za upis podataka u matičnu knjigu umrlih',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-Zahtjeva-za-upis-cinjenice-smrti-u-maticnu-knjigu-umrlih.pdf',
    'Matični ured',
  ),
  documentForm(
    'grude-upis-rodjenja-djeteta-mkr',
    'Obrazac Prijave (zahtjeva) za upis rođenja djeteta u matičnu knjigu rođenih',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-Prijave-zahtjeva-za-upis-rodenja-djeteta-u-maticnu-knjigu-rodenih.pdf',
    'Matični ured',
  ),
  documentForm(
    'grude-upis-drzavljanstva-mkr',
    'Obrazac Prijave (zahtjeva) za upis činjenice državljanstva u matičnu knjigu rođenih',
    'https://grude.info/wp-content/uploads/2025/06/Obrazac-Zahtjeva-za-izdavanje-izvatka-u-MK.pdf',
    'Matični ured',
  ),
  documentForm(
    'grude-pristup-informacijama',
    'Zahtjev za pristup informacijama',
    'https://grude.info/wp-content/uploads/2025/06/Zahtjev-za-pristup-informacijama.pdf',
    'Pristup informacijama',
  ),
];

export const grudeGuidanceLinks = grudeForms.map((form) => ({
  label: form.name,
  url: form.pdfUrl,
}));
