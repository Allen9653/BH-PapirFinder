export interface UpdatedGovernmentFormSource {
  slug: string;
  name: string;
  canton: string;
  cantonShort: string;
  entity: string;
  website?: string;
  formsUrl?: string;
  categories: string[];
  urls: string[];
}

export const updatedGovernmentFormSources: UpdatedGovernmentFormSource[] = [
  {
    slug: 'bijeljina',
    name: 'Grad Bijeljina',
    canton: 'Bijeljina regija',
    cantonShort: 'RS',
    entity: 'Republika Srpska',
    categories: ['Matični uredi', 'Uvjerenja', 'Građanska stanja'],
    urls: [
      'https://www.gradbijeljina.org/sr/1649.izvod-iz-maticne-knjige-umrlih.html',
      'https://www.gradbijeljina.org/sr/1648.izvod-iz-maticne-knjige-vjencanih.html',
      'https://www.gradbijeljina.org/sr/1650.izdavanje-uvjerenja-iz-knjige-drzavljana.html',
      'https://www.gradbijeljina.org/sr/1896.zahtjev-za-prijem-kod-gradonacelnika.html',
    ],
  },
  {
    slug: 'bugojno',
    name: 'Bugojno',
    canton: 'Srednjobosanski kanton',
    cantonShort: 'SBK',
    entity: 'Federacija BiH',
    website: 'https://opcina-bugojno.ba/',
    formsUrl: 'https://opcina-bugojno.ba/e-formulari/',
    categories: ['E-obrasci', 'Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    urls: ['https://opcina-bugojno.ba/e-formulari/'],
  },
  {
    slug: 'doboj-istok',
    name: 'Doboj Istok',
    canton: 'Tuzlanski kanton',
    cantonShort: 'TK',
    entity: 'Federacija BiH',
    website: 'https://opcinadobojistok.ba/',
    formsUrl: 'https://opcinadobojistok.ba/formulari-sluzbe-za-poduzetnistvo/',
    categories: ['Administrativni postupci', 'Privreda i poduzetništvo', 'Poljoprivreda', 'Saobraćaj', 'Vodoprivreda'],
    urls: [
      'https://opcinadobojistok.ba/e-uprava',
      'https://opcinadobojistok.ba/formulari-sluzbe-za-poduzetnistvo/#',
      'https://opcinadobojistok.ba/wp-content/uploads/2019/03/obrazac-pristupa-informaciji.docx',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/odjava-rada-pj.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/odjava-rada-pvp.doc',
      
      
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/ovjera-TKM.doc',
      
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/Poljoprivredna-saglasnost.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/poljoprivredni-obrt.doc',
      
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/prevoz-stvari.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/prevoz-taxi.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/prevoz-tereta.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/prevoz-za-vp.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/privremeni-prestanak-rada.doc',
      
      
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/registracija-traktora1.doc',
      
      
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/trgovina.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/ugostiteljstvo.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/upis-i-promjena-podataka-u-RPG.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/uvjerenje-7.doc',
      
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/uvjerenje-za-poljoprivrednu-saglasnost.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/vodoprivredna-dozvola.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/vodoprivredna-saglasnost.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/zahtjev-za-potvrda-za-RPG.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/zamjena-autoprevoznici.doc',
      
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/zamjena-obrt.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/zamjena-poljoprivredni-obrt.doc',
      
      
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/mtu-ugostiteljstvo.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/registracija-traktora.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/zanatstvo.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/doo-mtu-ugostiteljstvo.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/doo-pj.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/ispunjenost-uslova-inspekcije.doc',
      
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/mtu-samostalne-radnje.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/obavjest.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/odbijen-zahtjev.doc',
      'https://opcinadobojistok.ba/wp-content/uploads/2018/12/odjava-rada.doc',
    ],
  },
  {
    slug: 'doboj-jug',
    name: 'Doboj-Jug',
    canton: 'Zeničko-dobojski kanton',
    cantonShort: 'ZDK',
    entity: 'Federacija BiH',
    website: 'https://dobojjug.ba/',
    formsUrl: 'https://dobojjug.ba/pristup-informacijama/',
    categories: ['Pristup informacijama'],
    urls: ['https://dobojjug.ba/pristup-informacijama/'],
  },
  {
    slug: 'domaljevac-samac',
    name: 'Domaljevac-Šamac',
    canton: 'Posavski kanton',
    cantonShort: 'PK',
    entity: 'Federacija BiH',
    website: 'https://domaljevac.ba/',
    formsUrl: 'https://domaljevac.ba/wp-content/uploads/2025/02/zahtjev-za-upravni-postupak.pdf',
    categories: ['Upravni postupci', 'Poljoprivreda', 'Socijalna zaštita', 'Boračka zaštita'],
    urls: [
      'https://domaljevac.ba/wp-content/uploads/2025/02/zahtjev-za-upravni-postupak.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/4.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/14a.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/3-1.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/14b.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/2.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/14.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/14-1.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Zahtjev-za-osnivanje-obrta-srodne-djelatnosti-H.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Izjava-o-ispunjavanju-minimalnih-i-drugih-tehnickih-uslova-1.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Obrazac-PI.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Zahtjev-za-upis-u-RPG-i-RG.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Zahtjev-za-upis-u-RPG-i-RK-pravne-osobe-i-obrtnici.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Zahtjev-za-upis-promjena-ili-brisanje-clanova-u-RPG-1.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Zahtjev-za-prijavu-promjene-podataka.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Upis-vrste-i-brojnog-stanja-stocnog-fonda.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Izjava-o-tocnosti-podataka.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Izjava-nositelja-OPG.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Obrazac-za-upis-brisanje-podataka-u-Reg-pcelara.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Obrazac-za-promjenu-podataka-u-Reg-pcelara.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Zahtjev-za-odobrenje-za-smjestaj-pokretnog-pcelinjaka.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Izjava-o-davanju-zemljista-na-korisenje-bez-naknade-1.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Obrazac-RL-Registar-laboratorija-za-kontrolu-kvaliteta-poljoprivrednog-sjemena.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Obrazac-Z-2-za-otkupljivace-hr.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Zahtjev-za-izdavanje-uvjerenja.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Zahtjev-za-zdrastveno-osiguranje.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Zahtjev-za-utvrdivanje-novog-postotka-invaliditeta.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/ZAHJTEV-ZA-ODLICJA.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/ZAHJTEV-ZA-ODLICJA-OBITELJI-UMRLIH.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Zahtjev-za-priznavanje-prava-na-obiteljsku-invalidninu.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/OBRASCI-EGZ.FED_.-NOVI_1.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/OBRASCI-EGZ.FED_.-NOVI_2.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/OBRASCI-EGZ.FED_.-NOVI_3.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Obrazac-zahtjeva-za-priznavanje-prava-na-egzistencijalnu-naknadu-supruznike-po-zupanijskom-zakonu.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Obrazac-zahtjeva-za-priznavanje-prava-na-egzistensijalnu-nakndu-po-zupanijskom-zakonu-1.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Izjava-za-produzetak-zdravstvenog-osiguranja.pdf',
      'https://domaljevac.ba/wp-content/uploads/2025/02/Izjava-korisnika-prava-o-identifikaciji.pdf',
    ],
  },
  {
    slug: 'donji-vakuf',
    name: 'Donji Vakuf',
    canton: 'Srednjobosanski kanton',
    cantonShort: 'SBK',
    entity: 'Federacija BiH',
    website: 'https://donji-vakuf.ba/',
    formsUrl: 'https://donji-vakuf.ba/wp-content/uploads/2013/03/Formularzaprijemkodnacelnika.pdf',
    categories: ['Opća uprava', 'E-matičar', 'Budžet i finansije'],
    urls: [
      'https://donji-vakuf.ba/wp-content/uploads/2013/03/Formularzaprijemkodnacelnika.pdf',
      'https://donji-vakuf.ba/2026/11/02/zahtjev-budzetskim-korisnicima-za-budzetska-sredstva-opcine-donji-vakuf-za-2027-godine/',
      'https://donji-vakuf.ba/2019/05/20/e-maticar/',
    ],
  },
  {
    slug: 'drvar',
    name: 'Drvar',
    canton: 'Kanton 10',
    cantonShort: 'K10',
    entity: 'Federacija BiH',
    website: 'https://www.opstinadrvar.net/',
    formsUrl: 'http://www.opstinadrvar.net/wp-content/uploads/2021/06/Zahtjev-ka-opstinskom-nacelniku.pdf',
    categories: ['Opća uprava', 'Socijalna zaštita', 'Prostorno uređenje', 'Imovinsko-pravni poslovi'],
    urls: [
      'http://www.opstinadrvar.net/wp-content/uploads/2021/06/Zahtjev-ka-opstinskom-nacelniku.pdf',
      'http://www.opstinadrvar.net/wp-content/uploads/2021/06/Zahtjev-za-dodjelu-vanredne-novcane-pomoci.pdf',
      'http://www.opstinadrvar.net/wp-content/uploads/2021/06/Zahtjev-za-izdavanje-lokacijske-dozvole.pdf',
      'http://www.opstinadrvar.net/wp-content/uploads/2021/06/Zahjev-imovinsko-pravnoji-geodetskoj-sluzbi.pdf',
      'http://www.opstinadrvar.net/wp-content/uploads/2021/06/Zahtjev-za-porodisljku-naknadu.pdf',
      'http://www.opstinadrvar.net/wp-content/uploads/2021/06/Zahtjev-za-priznavanja-prava-na-licnu-invalidninu.pdf',
    ],
  },
  {
    slug: 'samac',
    name: 'Šamac',
    canton: 'Doboj regija',
    cantonShort: 'RS',
    entity: 'Republika Srpska',
    website: 'https://opstinasamac.org/',
    formsUrl: 'https://eregistarsamac.com/%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%B8-%D0%BF%D0%BE%D1%81%D1%82%D1%83%D0%BF%D1%86%D0%B8/',
    categories: ['Administrativni postupci', 'Inspekcijski nadzor', 'Uvjerenja'],
    urls: [
      'https://eregistarsamac.com/%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%B8-%D0%BF%D0%BE%D1%81%D1%82%D1%83%D0%BF%D1%86%D0%B8/',
      'https://eregistarsamac.com/%D1%80%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D0%B0%D1%80/10-04-%d0%b7%d0%b0%d1%85%d1%82%d1%98%d0%b5%d0%b2-%d0%b7%d0%b0-%d0%b8%d0%bd%d1%81%d0%bf%d0%b5%d0%ba%d1%86%d0%b8%d1%98%d1%81%d0%ba%d0%b8-%d0%bd%d0%b0%d0%b4%d0%b7%d0%be%d1%80/',
      'https://eregistarsamac.com/%D1%80%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D0%B0%D1%80/06-28-%d1%83%d0%b2%d1%98%d0%b5%d1%80%d0%b5%d1%9a%d0%b0-%d0%b8%d0%b7-%d1%81%d0%bb%d1%83%d0%b6%d0%b1%d0%b5%d0%bd%d0%b5-%d0%b5%d0%b2%d0%b8%d0%b4%d0%b5%d0%bd%d1%86%d0%b8%d1%98%d0%b5/',
    ],
  },
];
