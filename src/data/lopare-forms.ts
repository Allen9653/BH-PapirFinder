import type { MunicipalityForm } from './municipality-registry';

export const LOPARE_OFFICIAL_URL = 'https://opstinalopare.com/';

const formGroups = [
  {
    category: 'Urbanizam i građenje',
    urls: [
      'https://opstinalopare.com/wp-content/uploads/2025/12/Zahtjev-o-provjeri-uskladjenosti-temelja.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/12/Zahtjev-za-iskolcavanje-objekta.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/12/Zahtjev-za-izdavanje-ekoloske-dozvole.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/12/Zahtjev-za-izdavanje-gradjevinske-dozvole.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/12/Zahtjev-za-izdavanje-izvoda-iz-regulacionog-plana.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/12/Zahtjev-za-izdavanje-lokacijskih-uslova.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/12/Zahtjev-za-izdavanje-misljenja.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/12/Zahtjev-za-izdavanje-putne-saglasnosti.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/12/Zahtjev-za-izdavanje-uvjerenja-o-cjelovitosti.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/12/Zahtjev-za-obracun-rente-i-naknade.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/12/Zahtjev-za-tehnicki-pregled-i-izdavanje-upotrebne-dozvole.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/12/Zahtjev-za-zapremanje-javne-povrsine.pdf',
    ],
  },
  {
    category: 'Matični ured',
    urls: [
      'https://opstinalopare.com/wp-content/uploads/2025/07/01.-Promjena-entitetskog-drzavljanstva.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/02.-Zahtjev-za-naknadni-upis-podataka-o-drzavljanstvu-BiH-i-RS.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/03.-Zahtjev-za-naknadni-upis-u-MKR-sa-drzavljanstvom.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/04.-Zahtjev-za-ispravku-greske-u-MK.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/05.-Zahtjev-za-naknadni-upis-u-MKU.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/06.-Zahtjev-za-sklapanje-braka-po-punomocniku.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/07.-Zahtjev-za-naknadni-upis-u-MKR.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/08.-Zahtjev-za-promjenu-licnog-imena.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/09.-Zahtjev-za-ovjeru-izvan-sluzbenih-prostorija.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/10.-Zahtjev-za-izdavanje-prepisa-iz-arhive.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/11.-Zahtjev-za-naknadni-upis-u-MKV.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/12.-Zahtjev-za-ponistenje-duplog-upisa.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/13.-Zahtjev-za-obavljanje-vjencanja-izvan-sluzbenih-prostorija.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/14.-Zahtjev-za-sticanje-drzavljanstva-dvojno-Srbija_507799098.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/15.-Zahtjev-za-sticanje-drzavljanstva-dvojnog-Hrvatska_159327193.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/16.-Zahtjev-za-sticanje-drzavljanstva-i-izdavanje-garancije_168079515.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/17.-Zahtjev-za-sticanje-drzavljanstva-po-clanu-38-i-39-Zakona_167405182.pdf',
    ],
  },
  {
    category: 'Opća uprava',
    urls: [
      'https://opstinalopare.com/wp-content/uploads/2025/07/PRIJAVA-NA-INTERNI-KONKURS-ZA-ORGANE-JLS_142460802.doc',
      'https://opstinalopare.com/wp-content/uploads/2025/07/PRIJAVA-NA-JAVNI-KONKURS-ZA-ORGANE-JLS_145585978.doc',
      'https://opstinalopare.com/wp-content/uploads/2025/07/Obrazac_Zahtjev_za_pristup_informacijama.pdf',
    ],
  },
  {
    category: 'Boračka zaštita',
    urls: [
      'https://opstinalopare.com/wp-content/uploads/2025/07/01.-Zahtjev-za-utvrdjivanje-statusa-clana-porodice-poginulog-borca-i-priznavanje-prava-na-porodicnu-invalidninu.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/02.-Zahtjev-za-odobravanje-jednokratne-novcane-pomoci-komisiji.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/03.-Zahtjev-za-ostvarivanje-prava-na-rehabilitaciju-odnosno-banjsko-klimatsko-lijecenje.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/04.-Zahtjev-za-utvrdjivanje-statusa-clana-porodice-umrlog-RVI-i-priznanje-prava-na-porodicnu-invalidninu-po-osnovu-umrlog-RVI.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/05.-Zahtjev-za-utvrdjivanje-statusa-clana-porodice-poginulog-umrlog-borca-po-osnovu-poginulog-umrlog-borca-VRS.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/06.-Zahtjev-za-utvrdjivanje-svojstva-RVI-i-priznavanje-prava-na-licnu-invalidninu-po-osnovu-ranjavanja-povredjivanja-bolesti.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/07.-Zahtjev-za-obnovu-postupka-tj.-utvrdjivanje-novog-procenta-vojnog-invaliditeta.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/08.-Zahtjev-za-ponavljanje-postupka-za-ocjenu-invalidnosti-po-osnovu-pogorsanja-zdravstvenog-stanja.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/09.-Zahtjev-za-priznavanje-prava-na-licnu-invalidninu-CZR.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/10.-Zahtjev-za-priznavanje-prava-na-licnu-invalidninu.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/11.-Zahtjev-za-ostvarivanje-prava-na-zdravstvenu-zastitu.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/12.-Zahtjev-za-isplatu-neisplacenih-invalidnina.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/13.-Zahtjev-za-isplatu-zaostalih-licnih-primanja-invalidnina.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/14.-Zahtjev-za-izdavanje-uvjerenja.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/15.-Zahtjev-za-izdavanje-uvjerenja.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/16.-Zahtjev-za-priznavanje-prava-na-novcanu-nadoknadu-porodici-odlikovanog-borca.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/17.-Zahtjev-za-priznavanje-prava-na-novcanu-nadoknadu-koja-se-dodjeljuje-borcima-odlikovanim-najvecim-odlikovanjem-za-vojne-zasluge-u-oruzanoj-borbi.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/18.-Zahtjev-za-preseljenje-spisa-u-predmetu-licne-porodicne-invalidnine.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/19.-Zahtjev-za-preseljenje-spisa-u-predmetu-ostvarivanja-prava-na-boracki-dodatak.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/20.-Zahtjev-za-preseljenje-spisa-u-predmetu-utvrdjivnja-statusa-borca.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/21.-Zahtjev-za-preseljenje-spisa-u-predmetu-CZR.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/22.-Zahtjev-za-ostvarivanje-prava-na-boracki-dodatak.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/23.-Zahtjev-za-izdavanje-uvjerenja-o-neisplacenim-zaostalim-licnim-primanjima.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/24.-Zahtjev-za-dodjelu-gradjevinskog-materijala.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/25.-Prvostepenoj-stambenoj-komisiji-za-realizaciju-programa-potpunog-stambenog-zbrinjavanja-por.poginulih-boraca-i-RVI-Republike-Srpske.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/26.-Najava-promjene-u-ostvarivanju-prava-porodicne-licne-invalidnine.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/27.-Zahtjev-za-kategorizaciju.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/28.-Najava-promjene-u-ostvarivanju-prava-boracki-dodatak.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/29.-Zahtjev-za-isplatu-zaostalih-licnih-primanja-invalidnina.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/30.-Zahtjev-za-izdavanje-uvjerenja-o-neisplacenom-borackom-dodatku.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/31.-Zahtjev-za-priznavanje-prava-na-novcanu-naknadu-odlikovanim-borcima.pdf',
      'https://opstinalopare.com/wp-content/uploads/2025/07/32.-Zahtjev-za-isplatu-neisplacenih-primanja-CZR.pdf',
    ],
  },
];

function getFileType(url: string): 'pdf' | 'doc' | 'docx' {
  const extension = /\.([a-z0-9]+)$/i.exec(new URL(url).pathname)?.[1]?.toLowerCase();
  return extension === 'doc' || extension === 'docx' ? extension : 'pdf';
}

function getFormName(url: string): string {
  const fileName = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? 'Zahtjev');
  const name = fileName
    .replace(/\.(pdf|docx?)$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const readableName = name === name.toLocaleUpperCase('bs-BA')
    ? name.toLocaleLowerCase('bs-BA')
    : name;
  return readableName.charAt(0).toLocaleUpperCase('bs-BA') + readableName.slice(1);
}

export const lopareForms: MunicipalityForm[] = formGroups.flatMap(({ category, urls }) =>
  urls.map((url, index) => ({
    id: `lopare-${category.toLocaleLowerCase('bs-BA').replace(/[^a-z0-9]+/g, '-')}-${index + 1}`,
    name: getFormName(url),
    pdfUrl: url,
    category,
    fileType: getFileType(url),
    sourceUrl: LOPARE_OFFICIAL_URL,
    external: true,
  })),
);
