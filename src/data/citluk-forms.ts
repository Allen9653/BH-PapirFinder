import type { MunicipalityForm } from './municipality-registry';

export const CITLUK_OFFICIAL_URL = 'https://citluk.ba/';
export const CITLUK_FORMS_SOURCE_URL = 'https://citluk.ba/zahtjevi/';

const documentsByCategory = [
  {
    category: 'Urbanistička dozvola',
    documents: [
      ['Zahtjev za izdavanje urbanističke suglasnosti za legalizaciju nedovršene građevine', 'https://citluk.ba/storage/2025/09/Zahtjev-za-izdavanje-urbanisticke-suglasnosti-za-legalizaciju-nedovrsene-gradevine.docx'],
      ['Zahtjev za izdavanje urbanističke suglasnosti za dogradnju, nadogradnju, rekonstrukciju i promjenu namjene', 'https://citluk.ba/storage/2025/09/zahtjev-za-izdavanje-urbanisticke-suglasnosti-za-dogradnju-nadogradnju-rekonstrukciju-i-promjenu-namjene.docx'],
      ['Zahtjev za izdavanje urbanističke suglasnosti za privremenu građevinu', 'https://citluk.ba/storage/2025/09/zahtjev-za-izdavanje-urbanisticke-suglasnosti-za-privremenu-gradevinu.docx'],
      ['Zahtjev za izdavanje urbanističke suglasnosti', 'https://citluk.ba/storage/2025/09/zahtjev-za-izdavanje-urbanisticke-suglasnosti.docx'],
    ],
  },
  {
    category: 'Građevinska dozvola',
    documents: [
      ['Zahtjev za izdavanje odobrenja za dogradnju, nadogradnju, rekonstrukciju i promjenu namjene', 'https://citluk.ba/storage/2025/09/zahtjev-za-izdavanje-odobrenja-za-dogradnju-nadogradnju-rekonstrukciju-i-promjenu-namjene.docx'],
      ['Zahtjev za izdavanje odobrenja za gradnju za privremeni objekt', 'https://citluk.ba/storage/2025/09/zahtjev-za-izdavanje-odobrenja-za-gradnju-za-privremeni-objekt.docx'],
      ['Zahtjev za izdavanje odobrenja za gradnju', 'https://citluk.ba/storage/2025/09/zahtjev-za-izdavanje-odobrenja-za-gradnju.docx'],
    ],
  },
  {
    category: 'Uporabna dozvola',
    documents: [
      ['Zahtjev za tehnički pregled i izdavanje uporabne dozvole', 'https://citluk.ba/storage/2025/09/zahtjev-za-tehnicki-pregled-i-izdavanje-uporabne-dozvole.docx'],
      ['Zahtjev za izdavanje odobrenja za legalizaciju', 'https://citluk.ba/storage/2024/04/zahtjev-za-izdavanje-odobrenja-za-legalizaciju.docx'],
      ['Zahtjev za izdavanje odobrenja za legalizaciju za dogradnju, nadogradnju, rekonstukciju, promjenu namjene i odstupljenih radova', 'https://citluk.ba/storage/2024/04/zahtjev-za-izdavanje-odobrenja-za-legalizaciju-za-dogradnju-nadogradnju-rekonstukciju-promjenu-namjene-i-odstupljenih-radova.docx'],
      ['Zahtjev za izdavanje odobrenja za legalizaciju nedovršene bespravne građevine i nastavak izgradnje', 'https://citluk.ba/storage/2024/04/Zahtjev-za-izdavanje-odobrenja-za-legalizaciju-nedovrsene-bespravne-gradevine-i-nastavak-izgradnje.docx'],
    ],
  },
  {
    category: 'Ostali zahtjevi',
    documents: [
      ['Zahtjev za dodjelu općinskog zemljišta', 'https://citluk.ba/storage/2025/09/Zahtjev-za-dodjelu-opcinskog-zemljista.docx'],
      ['Zahtjev za dodjelu zemljišta iz općinskog vlasništva – legalizacija', 'https://citluk.ba/storage/2025/09/Zahtjev-za-dodjelu-zemljista-iz-opcinskog-vlasnistva-legalizacija.docx'],
      ['Zahtjev za etažiranje', 'https://citluk.ba/storage/2025/09/zahtjev-za-etaziranje.docx'],
      ['Zahtjev za ispravku – izmjenu', 'https://citluk.ba/storage/2025/09/zahtjev-za-ispravku-izmjenu.docx'],
      ['Zahtjev za izdavanja uvjerenja o vremenu izgradnje objekta (do 31.05.1974. god.)', 'https://citluk.ba/storage/2025/09/zahtjev-za-izdavanja-uvjerenja-o-vremenu-izgradnje-objekta-do-31.05.1974.-god..docx'],
      ['Zahtjev za izdavanje izvoda iz Regulacijskog plana Bare 1', 'https://citluk.ba/storage/2025/09/zahtjev-za-izdavanje-izvoda-iz-Regulacijskog-plana-Bare-1.docx'],
      ['Zahtjev za izdavanje odobrenja za uklanjanje građevine', 'https://citluk.ba/storage/2025/09/zahtjev-za-izdavanje-odobrenja-za-uklanjanje-gradevine.docx'],
      ['Zahtjev za izdavanje uvjerenja i izvoda iz Prostornog plana', 'https://citluk.ba/storage/2025/09/zahtjev-za-izdavanje-uvjerenja-i-izvoda-iz-Prostornog-plana.docx'],
      ['Zahtjev za izdavanje uvjerenja o vremenu izgradnje objekta (do travnja 1992. god.)', 'https://citluk.ba/storage/2025/09/zahtjev-za-izdavanje-uvjerenja-o-vremenu-izgradnje-objekta-do-travnja-1992.god_..docx'],
      ['Zahtjev za izdavanje uvjerenja', 'https://citluk.ba/storage/2025/09/Zahtjev-za-izdavanje-uvjerenja-1.docx'],
      ['Zahtjev za produženje važnosti rješenja', 'https://citluk.ba/storage/2025/09/zahtjev-za-produzenje-vaznosti-rjesenja.docx'],
      ['Zahtjev za zakup ostalog-gradskog građevnog zemljišta', 'https://citluk.ba/storage/2025/09/Zahtjev-za-zakup-ostalog-gradskog-gradevnog-zemljista.docx'],
      ['Zahtjev za ispravku greške', 'https://citluk.ba/storage/2025/09/Zahtjev-za-ispravku-greske.docx'],
      ['Zahtjev za izdavanje kopije katastarskog plana', 'https://citluk.ba/storage/2025/09/Zahtjev-za-izdavanje-kopije-katastarskog-plana.docx'],
      ['Zahtjev za izdavanje prijepisa posjedovnog lista', 'https://citluk.ba/storage/2025/09/Zahtjev-za-izdavanje-prijepisa-posjedovnog-lista.docx'],
      ['Zahtjev za izdavanje uvjerenja o posjedovnom stanju', 'https://citluk.ba/storage/2025/09/Zahtjev-za-izdavanje-uvjerenja-o-posjedovnom-stanju.docx'],
      ['Zahtjev za izdavanje uvjerenja', 'https://citluk.ba/storage/2025/09/Zahtjev-za-izdavanje-uvjerenja.docx'],
      ['Zahtjev za promjenu kulture zemljišta', 'https://citluk.ba/storage/2025/09/Zahtjev-za-promjenu-kulture-zemljista.docx'],
      ['Zahtjev za promjenu upisa posjedovnog stanja', 'https://citluk.ba/storage/2025/09/Zahtjev-za-promjenu-upisa-posjedovnog-stanja.docx'],
      ['Zahtjev za uplanjenje objekta', 'https://citluk.ba/storage/2025/09/Zahtjev-za-uplanjenje-objekta.docx'],
      ['Zahtjev za dodjelu općinskog zemljišta', 'https://citluk.ba/storage/2024/01/Zahtjev-za-dodjelu-općinskog-zemljišta.docx'],
      ['Zahtjev za dodjelu zemljišta iz općinskog vlasništva – legalizacija', 'https://citluk.ba/storage/2024/01/Zahtjev-za-dodjelu-zemljišta-iz-općinskog-vlasništva-legalizacija.docx'],
      ['Zahtjev za zakup ostalog-gradskog građevnog zemljišta', 'https://citluk.ba/storage/2024/01/Zahtjev-za-zakup-ostalog-gradskog-gradevnog-zemljišta.docx'],
    ],
  },
  {
    category: 'Izjave',
    documents: [
      ['Izjava o ispunjavanju općih i posebnih uvjeta u pogledu minimalne tehničke opremljenosti', 'https://citluk.ba/storage/2021/03/Izjava-o-ispunjavanj-opcih-i-posebnih-uvjeta-u-pogledu-minimalne-tehnicke-opremljenosti.pdf'],
      ['Izjava o ispunjavanju minimalnih tehničkih i drugih uvjeta za obavljanje obrtničkih i srodnih djelatnosti', 'https://citluk.ba/storage//2022/11/Izjava-o-ispunjavanju-minimalnih-i-drugih-tehnickih-uvjeta.pdf'],
      ['Izjava o odustajanju od svog zahtjeva za vođenje upravnog postupka', 'https://citluk.ba/storage/2021/03/Izjava-o-odustajanju-od-svog-zahtjeva-ua-vodenje-upravnog-postupka.pdf'],
      ['Obrazac PI', 'https://citluk.ba/storage/2025/07/IZJAVA-obrazac-PI.pdf'],
    ],
  },
  {
    category: 'Odobrenja',
    documents: [
      ['Zahtjev za izdavanje odobrenja za obavljanje trgovine na malo osobnim radom – trgovac pojedinac', 'https://citluk.ba/storage/2025/07/TRGOVINA-Zahtjev-za-osnivanje-T.-os.radom-–-trgo.pojedinac.pdf'],
      ['Zahtjev za izdavanje / zamjenu odobrenja za osnivanje i vođenje auto-škole', 'https://citluk.ba/storage/2025/07/PRIJEVOZ-Zahv-za-izdav.-zamjen.-odob-Auto-skola.pdf'],
      ['Zahtjev za izdavanje / zamjenu odobrenja za vršenje javnog prijevoza stvari cestovnom prijevozu', 'https://citluk.ba/storage/2025/07/PRIJEVOZ-Zahv-za-izdav.-zamjen.-odob-Autoprijevoz.pdf'],
      ['Zahtjev za zamjenu odobrenja za obrt / srodnu djelatnosti', 'https://citluk.ba/storage/2025/07/OBRT-Zahtjev-zamjenu-obrta.pdf'],
      ['Zahtjev za izdavanje odobrenja za obavljanje tradicionalnih i starih obrta', 'https://citluk.ba/storage/2025/07/OBRT-Zahtjev-za-tradicionalni-obrt.pdf'],
      ['Zahtjev za izdavanje odobrenja za obavljanje obrta / srodne djelatnosti', 'https://citluk.ba/storage/2025/07/OBRT-Zahtjev-za-obrt-osnovno-i-dopunsko-zanimanje.pdf'],
      ['Zahtjev za izdavanje odobrenja za obavljanje obrta / srodne djelatnosti kao dodatno zanimanje', 'https://citluk.ba/storage/2025/07/OBRT-Zahtjev-za-obrt-dodatno-zanimanje.pdf'],
      ['Zahtjev za izdavanje odobrenja za obavljanje obrta u izdvojenom prostoru', 'https://citluk.ba/storage/2025/07/OBRT-Zahtjev-za-obrt-izdvojeni-prostor.pdf'],
      ['Zahtjev za izdavanje/zamjenu odobrenja za vršenje javnog prijevoza osoba u slobodnom cestovnom prometu, taksi djelatnosti', 'https://citluk.ba/storage/2026/06/PRIJEVOZ-Zahtjev-za-TAXI-novi.pdf'],
      ['Zahtjev za izdavanje/zamjenu odobrenja za vršenje javnog prijevoza putnika u izvanlinijskom cestovnom prijevozu', 'https://citluk.ba/storage/2025/07/PRIJEVOZ-Zahv-za-izdav.-zamjen.-odob.-Autobus-za-izvanlinijski-prijevoz.pdf'],
      ['Zahtjev za izdavanje/zamjenu odobrenja za nastavak rada Ugostiteljskog objekta koji se ne kategorizira', 'https://citluk.ba/storage/2025/07/UG-Zahtjev-za-UO-odobrenje_zmajena_nastavak-koji-se-ne-kateg.pdf'],
      ['Zahtjev za izdavanje odobrenja za obavljanje mjenjačkih poslova', 'https://citluk.ba/storage/2025/07/OBRT-Zaht.-za-izdav.-Mjenjacnice-obrtnici-i-trgovci.pdf'],
      ['Zahtjev za izdavanje odobrenja za osnivanje i vođenje trgovačke radnje', 'https://citluk.ba/storage/2025/07/TRGOVINA-Zahtjev-za-osnivanje-trgovacke-radnje.pdf'],
      ['Zahtjev za izdavanje odobrenja za pružanje usluga turističkog vodiča', 'https://citluk.ba/storage/2025/07/UG.-TUR.DJ-Zaht.-za-izd.-Odobr.-za-pruz.-usl.-turisticki-vodic.pdf'],
      ['Zahtjev za izdavanje odobrenja za rad ugostiteljskih objekta za smještaj', 'https://citluk.ba/storage/2025/07/UG.-Zahtjev-za-rad-UO.-za-smjestaj-fiz.os_..pdf'],
      ['Zahtjev za izdavanje odobrenja za rad ugostiteljskih usluga u kućanstvu', 'https://citluk.ba/storage/2025/07/UG.-Zahtjev-za-rad-UO-u-kucanstvu.pdf'],
      ['Zahtjev za izdavanje odobrenja za vršenje prijevoza stvari za osobne potrebe', 'https://citluk.ba/storage/2025/07/PRIJEVOZ-Zahtjev-za-prijevoz-za-osobne-potrebe.pdf'],
      ['Zahtjev za zamjenu odobrenja za vođenje trgovačke radnje', 'https://citluk.ba/storage/2025/07/TRGOVINA-Zahtjev-za-zamjenu.pdf'],
    ],
  },
  {
    category: 'Prestanak rada',
    documents: [
      ['Zahtjev za trajan prestanak rada', 'https://citluk.ba/storage/2025/07/Zahtjev-za-trajan-prestanak-rada.pdf'],
      ['Zahtjev za privremeni prestanak obavljanja radnje-djelatnosti za vrijeme ratnog stanja', 'https://citluk.ba/storage/2025/07/Zahtjev-za-privremeni-prestanak-obavljanja-_____radnje-djelatnosti-za-vrijeme-ratnog-stanja.pdf'],
      ['Zahtjev za izdavanje Rješenja o trajnom prestanku obavljanja', 'https://citluk.ba/storage/2025/07/DOO-Zaht.-za-izdavanje-Rjesenja-o-trajnom-prestanku.pdf'],
      ['Zahtjev za trajan prestanak rada taksi djelatnosti', 'https://citluk.ba/storage/2025/07/Zahtjev-za-trajan-prestanak-rada-taxi.pdf'],
      ['Zahtjev za trajan prestanak rada radnje/djelatnosti radi utvrđivanja prijeratnog mirovinskog staža osiguranja', 'https://citluk.ba/storage/2025/07/Zahtjev-za-prestanak-rad-prijeratnog-staz..pdf'],
    ],
  },
  {
    category: 'Rješenja',
    documents: [
      ['Zahtjev za izdavanje Rješenja o privremenom obustavljanju obavljanja obrta / srodne djelatnosti', 'https://citluk.ba/storage/2025/07/OBRT-Privremena-obustava.pdf'],
      ['Zahtjev za izdavanje rješenja o ponovnom početku obavljanja obrta/srodne djelatnosti po isteku vremena privremene obustave obrta / srodne djelatnosti', 'https://citluk.ba/storage/2025/07/OBRT-Ponovno-Pokretanje-obrta.pdf'],
      ['Zahtjev za izdavanja rješenja o ispunjavanju uvjeta za poslovni prostor za obavljanje djelatnosti mjenjačnice', 'https://citluk.ba/storage/2025/07/DOO-zahtjev-za-izdavanje-RJ.o-ispunj.-min.-teh.-uvjeta-za-mjenjacnice.pdf'],
      ['Zahtjev za izdavanja Rješenja o ispunjavanju uvjeta za rad putničke agencije', 'https://citluk.ba/storage/2025/07/DOO-Zaht.-za-izdav-Rj.-za-rad-Putnicka-age..pdf'],
      ['Zahtjev za izdavanja rješenja o odobrenju za rad kategoriziranih ugostiteljskih objekata (pravna osoba)', 'https://citluk.ba/storage/2025/07/DOO-Zaht.-za-izdav-Rj.-za-rad-UO-se-kat.pdf'],
      ['Zahtjev za izdavanja rješenja o odobrenju za rad ugostiteljskih objekata koji se ne kategorizira (pravna osoba)', 'https://citluk.ba/storage/2025/07/DOO-Zaht.-za-izdav-Rj.-za-rad-UO-se-ne-kat..pdf'],
      ['Zahtjev za zamjenu Rješenja za rad ugostiteljskog objekta', 'https://citluk.ba/storage/2025/07/DOO-Zaht.-za-zamjenu-Rj.-za-rad-UO.pdf'],
      ['Zahtjev za izdavanje rješenja za taxi stajalište', 'https://citluk.ba/storage/2025/07/PRIJEVOZ-Zahtjev-za-TAXI-STAJALISTA.pdf'],
    ],
  },
  {
    category: 'Uvjerenja',
    documents: [
      ['Zahtjev za izdavanje uvjerenja o neobavljanju gospodarske djelatnosti', 'https://citluk.ba/storage/2025/07/UVJ.-o-neobavljanju.dj_.-fizicka.pdf'],
      ['Zahtjev za izdavanje uvjerenja o obavljanju/prestanku obavljanja gospodarske djelatnosti', 'https://citluk.ba/storage/2025/07/UVJ.-o-obavljanju-prestanku-obavljanju.dj_.-PJ.pdf'],
      ['Zahtjev za izdavanje uvjerenja o obavljanju gospodarske djelatnosti', 'https://citluk.ba/storage/2025/07/UVJ.-o-obavljanju.dj_.-fizicka.pdf'],
    ],
  },
  {
    category: 'Ostalo',
    documents: [
      ['Obavijest pravne osobe registrirane za obavljanje gospodarskih djelatnosti o datumu početka rada u poslovnom objektu za poslovnu jedinicu.', 'https://citluk.ba/storage/2025/07/OBAVJEST-za-GD-o-poc.rada-PJ.pdf'],
      ['Zahtjev za izdavanje Suglasnosti za obavljanje djelatnosti kockanja i klađenja', 'https://citluk.ba/storage/2025/07/Zahtjeva-za-izdavanje-suglasnosti-kockanje-i-kladenje.pdf'],
      ['Obavijest pravne osobe registrirane za obavljanje gospodarskih djelatnosti o datumu početka rada u poslovnom objektu', 'https://citluk.ba/storage/2025/07/OBAVJEST-za-GD-o-poc.rada_-1.pdf'],
      ['Obavijest pravne osobe registrirane za obavljanje gospodarskih djelatnosti o nastavku s radom u poslovnom objektu', 'https://citluk.ba/storage/2025/07/OBAVJEST-za-GD-o-nast..rada_.pdf'],
    ],
  },
  {
    category: 'Priznavanja',
    documents: [
      ['Zahtjev za priznavanje prava na mjesečnu novčani dodatak po osnovu Ratnog priznavanja odličja za članove obitelji preminulih nositelja', 'https://citluk.ba/storage/2021/03/Zahtjev-za-priznavanje-prava-na-mjesecnu-novcani-dodatak-po-osnovu-Ratnog-priznavanja-odlicja-za-clanove-obitelji-preminulih-nositelja.pdf'],
      ['Zahtjev za priznavanje prava na obiteljsku invalidninu za bračnog supružnika i djecu', 'https://citluk.ba/storage/2021/03/Zahtjev-za-priznavanje-prava-na-obiteljsku-invalidninu-za-bracnog-supruznika-i-djecu.pdf'],
      ['Zahtjev za priznavanje prava na obiteljsku invalidninu za roditelje poginulog umrlog, branitelja', 'https://citluk.ba/storage/2021/03/Zahtjev-za-priznavanje-prava-na-obiteljsku-invalidninu-za-roditelje-poginulog-umrlog-branitelja.pdf'],
      ['Zahtjev za izdavanje uvjerenja', 'https://citluk.ba/storage/2021/03/Zahtjev-za-izdavanje-uvjerenja.pdf'],
      ['Zahtjev za naknadu troškova sahrane RVI-a', 'https://citluk.ba/storage/2021/03/Zahtjev-za-naknadu-troskova-sahrane-RVI-a.pdf'],
      ['Zahtjev za odricanje prava na osobnu invalidninu', 'https://citluk.ba/storage/2021/03/Zahtjev-za-odricanje-prava-na-osobnu-invalidninu.pdf'],
      ['Zahtjev za pristup informacijama', 'https://citluk.ba/storage/2021/03/Zahtjev-za-pristup-informacijama.pdf'],
    ],
  },
] satisfies ReadonlyArray<{
  category: string;
  documents: ReadonlyArray<readonly [name: string, url: string]>;
}>;

export const citlukForms: MunicipalityForm[] = documentsByCategory.flatMap(
  ({ category, documents }, categoryIndex) =>
    documents.map(([name, pdfUrl], documentIndex) => ({
      id: `citluk-${categoryIndex + 1}-${documentIndex + 1}`,
      name,
      pdfUrl,
      category,
      external: true,
      fileType: pdfUrl.toLowerCase().endsWith('.pdf') ? 'pdf' : 'docx',
      sourceUrl: CITLUK_FORMS_SOURCE_URL,
    })),
);
