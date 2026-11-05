// ============================================================
// Verified Municipality Domains & Forms for BH PapirFinder
// Consolidated from official canton documents and JSON seed data.
// Covers all 10 FBiH Cantons + RS regions + Brčko Distrikt.
//
// Fields:
//   municipality_name  — Official name
//   canton / region    — Canton (FBiH) or Region (RS)
//   entity             — FBiH | RS | BD
//   official_domain    — Primary domain
//   alternative_domain — Secondary domain (if any)
//   forms_url          — Direct link to forms/obrasci page
//   e_government_link  — E-uprava / e-government portal link
//   document_categories — Types of documents available
//   status             — active | changed | broken
//   secure             — false if SSL issues detected
//   physical_presence_required — true if no online forms
//   komentar           — Additional notes
// ============================================================

export interface VerifiedMunicipality {
  municipality_name: string;
  searchAliases?: string[];
  canton?: string;
  region?: string;
  entity: 'FBiH' | 'RS' | 'BD';
  official_domain?: string;
  alternative_domain?: string;
  forms_url?: string;
  e_government_link?: string;
  document_categories: string[];
  status: 'active' | 'changed' | 'broken';
  secure: boolean;
  physical_presence_required: boolean;
  komentar?: string;
}

export const verifiedDomains: VerifiedMunicipality[] = [
  // ============================================================
  // KANTON SARAJEVO (KS)
  // ============================================================
  {
    municipality_name: 'Stari Grad Sarajevo',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    official_domain: 'starigrad.ba',
    forms_url: 'https://starigrad.ba/e-formulari/',
    e_government_link: 'https://starigrad.ba/e-formulari/',
    document_categories: ['Matični uredi', 'E-uprava', 'Uvjerenja', 'Punomoć', 'Zajedničko domaćinstvo'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za izvod iz matične knjige rođenih/vjenčanih/umrlih (e-Uprava)',
  },
  {
    municipality_name: 'Centar Sarajevo',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    official_domain: 'www.centar.ba',
    alternative_domain: 'opcina-centar.gov.ba',
    forms_url: 'https://www.centar.ba/e-uprava/elektronski-formulari',
    e_government_link: 'https://www.centar.ba/e-uprava/elektronski-formulari',
    document_categories: ['E-Matičar', 'Inspekcijski obrasci', 'Poljoprivreda i podsticaji', 'Komunalni obrasci', 'Urbanizam i javni prihodi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'E-Matičar omogućava online podnošenje zahtjeva i plaćanje karticom; elektronski formulari dostupni su na službenoj stranici Općine Centar Sarajevo.',
  },
  {
    municipality_name: 'Ilidža',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    official_domain: 'opcinailidza.ba',
    alternative_domain: 'ilidza.ba',
    forms_url: 'https://opcinailidza.ba/e-formulari/',
    document_categories: ['Urbanizam i lokacija', 'Matični uredi', 'Uvjerenja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za izdavanje lokacijske informacije i urbanističkih uslova',
  },
  {
    municipality_name: 'Novi Grad Sarajevo',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    official_domain: 'novigradsarajevo.ba',
    alternative_domain: 'novigradsa.ba',
    
    document_categories: ['Socijalna zaštita', 'Matični uredi', 'Prijava prebivališta', 'Lični dokumenti'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za jednokratnu novčanu pomoć / Prijemni obrasci e-Uprava',
  },
  {
    municipality_name: 'Novo Sarajevo',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    official_domain: 'novosarajevo.ba',
    alternative_domain: 'opcinanovosarajevo.ba',
    
    document_categories: ['Ovjere i prepisi', 'Urbanizam', 'Matični uredi', 'Uvjerenja', 'Pravna lica'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za ovjeru potpisa, rukopisa i prepisa, obrasci službi',
  },
  {
    municipality_name: 'Vogošća',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    
    
    document_categories: ['Građanska stanja', 'Naknade porodiljama', 'Matični uredi'],
    status: 'broken',
    secure: true,
    physical_presence_required: true,
    komentar: 'Službena stranica i online obrasci trenutno nisu dostupni u provjeri.',
  },
  {
    municipality_name: 'Hadžići',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    official_domain: 'hadzici.ba',
    document_categories: ['Matični uredi', 'Građanska stanja'],
    status: 'active',
    secure: true,
    physical_presence_required: true,
    komentar: 'Službena stranica je dostupna, ali e-Uprava obrasci trenutno nisu dostupni online.',
  },
  {
    municipality_name: 'Trnovo (FBiH)',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    official_domain: 'trnovo.ba',
    
    document_categories: ['Urbanizam i građenje', 'Komunalni priključak', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za odobrenje građenja i priključak',
  },
  {
    municipality_name: 'Ilijaš',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    official_domain: 'ilijas.ba',
    forms_url: 'https://ilijas.ba/index.php/e-uprava',
    document_categories: ['Boračko-invalidska zaštita', 'Socijalna zaštita', 'E-uprava', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za utvrđivanje prava na dopunske oblike zaštite',
  },
  {
    municipality_name: 'Grad Sarajevo',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    official_domain: 'www.sarajevo.ba',
    alternative_domain: 'sarajevo.ba',
    forms_url: 'https://www.sarajevo.ba/bs/category/145/1',
    document_categories: ['Urbanizam', 'Uvjerenja', 'Lokacijska informacija'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Obrasci – zahtjev za uvjerenja, urbanistička saglasnost, lokacijska informacija',
  },

  // ============================================================
  // ZENIČKO-DOBOJSKI KANTON (ZDK)
  // ============================================================
  {
    municipality_name: 'Zenica',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    official_domain: 'zenica.ba',
    alternative_domain: 'gradzenica.gov.ba',
    forms_url: 'https://zenica.ba/e-registar-administrativnih-postupaka/',
    e_government_link: 'https://zenica.ba/e-registar-administrativnih-postupaka/',
    document_categories: ['E-registar', 'Administrativni postupci', 'Zdravstvo', 'E-uprava', 'Formulari'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Digitalizovani sistem sa e-servisom i e-registrom',
  },
  {
    municipality_name: 'Doboj-Jug',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    official_domain: 'dobojjug.ba',
    forms_url: 'https://dobojjug.ba/pristup-informacijama/',
    document_categories: ['Pristup informacijama'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Službena stranica i obrazac za pristup informacijama',
  },
  {
    municipality_name: 'Općina Kakanj',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    official_domain: 'kakanj.gov.ba',
    alternative_domain: 'kakanj.ba',
    forms_url: 'https://kakanj.gov.ba/v5/e-obrasci/',
    e_government_link: 'https://kakanj.gov.ba/v5/e-obrasci/',
    document_categories: ['Urbanizam i građenje', 'Privreda i poslovanje', 'Privreda i obrt', 'Ugostiteljstvo', 'Samostalna djelatnost'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Službena stranica s e-obrazcima: https://kakanj.gov.ba/v5/e-obrasci/ — dostupni PDF obrasci za promjenu investitora, minimalne tehničke uslove, osnivanje obrta i ugostiteljskih radnji.',
  },
  {
    municipality_name: 'Maglaj',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    official_domain: 'maglaj.ba',
    
    document_categories: ['Zdravstvo'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Žepče',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    official_domain: 'zepce.ba',
    
    document_categories: ['Zdravstvo'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Tešanj',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    official_domain: 'tesanj.ba',
    
    document_categories: ['Zdravstvo'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Olovo',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    official_domain: 'olovo.gov.ba',
    forms_url: 'https://olovo.gov.ba/?lsvrdocumentcat=elektronski-formulari',
    document_categories: ['Uvjerenja', 'Urbanizam', 'Građevinske dozvole', 'Lokacijska informacija', 'Samostalna djelatnost', 'Javni prijevoz', 'Ugostiteljstvo', 'Socijalna zaštita', 'Imovinsko-pravni', 'Katastar', 'Ekonomski poslovi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: '71 elektronski formular dostupan online — najkompletnija općina u ZDK po broju obrazaca',
  },
  {
    municipality_name: 'Usora',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    official_domain: 'usora.ba',
    alternative_domain: 'www.usora.com',
    forms_url: undefined,
    document_categories: [],
    status: 'active',
    secure: true,
    physical_presence_required: true,
    komentar: 'Stara domena www.usora.com (HTTP) zastarjela i nestabilna; nova službena adresa: usora.ba. Nema online obrasce.',
  },

  // ============================================================
  // TUZLANSKI KANTON (TK)
  // ============================================================
  {
    municipality_name: 'Grad Tuzla',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'grad.tuzla.ba',
    alternative_domain: 'tuzla.ba',
    forms_url: 'https://www.ecitizen.ba/tuzla/home',
    e_government_link: 'https://eportal.tuzla.ba/Predmet',
    document_categories: ['Opća uprava', 'Matični uredi', 'Uvjerenja', 'Socijalna pomoć'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Razni administrativni formulari, izvod iz matičnih knjiga',
  },
  {
    municipality_name: 'Kalesija',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'kalesija.ba',
    forms_url: 'https://kalesija.ba/usluge/',
    document_categories: ['Usluge i obrasci', 'Matični ured', 'Poljoprivreda', 'Privreda i lokalni razvoj', 'Urbanizam', 'Zdravstvo', 'Lokacijska informacija'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Službena stranica s uslugama i obrascima; dostupno 10 obrazaca, uključujući matične i poljoprivredne obrasce.',
  },
  {
    municipality_name: 'Banovići',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'banovici.gov.ba',
    forms_url: 'https://banovici.gov.ba/zahtjevi/',
    document_categories: ['Katastar', 'Urbanizam', 'Poljoprivreda', 'Matični uredi', 'Civilna zaštita', 'Uvjerenja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Čelić',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'opcinacelic.ba',
    document_categories: ['Službeni glasnici', 'Upiti i dostava obrazaca'],
    status: 'active',
    secure: true,
    physical_presence_required: true,
    komentar: 'Nema centralne stranice s online obrascima; za konkretan obrazac obratite se nadležnoj općinskoj službi.'
  },
  {
    municipality_name: 'Doboj Istok',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'opcinadobojistok.ba',
    forms_url: 'https://opcinadobojistok.ba/formulari-sluzbe-za-poduzetnistvo/',
    document_categories: ['Administrativni postupci', 'Privreda i poduzetništvo', 'Poljoprivreda', 'Saobraćaj', 'Vodoprivreda'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Jedna od rijetkih općina sa mogućnošću online naručivanja dokumenata',
  },
  {
    municipality_name: 'Gračanica',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'gracanica.gov.ba',
    forms_url: 'https://gracanica.gov.ba/dokumenti/e-obrasci/',
    document_categories: ['E-uprava', 'Obrasci', 'Dijaspora'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Službeni e-obrasci, eCitizen portal i informacije za dijasporu.',
  },
  {
    municipality_name: 'Gradačac',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'gradacac.ba',
    forms_url: 'https://esalter.gradacac.ba/',
    document_categories: ['Matični uredi', 'Uvjerenja', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Kladanj',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'kladanj.ba',
    forms_url: undefined,
    document_categories: ['Matični uredi', 'Poticaji', 'Javni pozivi', 'Urbanizam', 'Privreda', 'Boračko-invalidska zaštita'],
    status: 'active',
    secure: true,
    physical_presence_required: true,
    komentar: 'Zahtjevi se predaju u fizičkoj šalter sali; obrasci za matični ured, poticaje i javne pozive preuzimaju se sa zvanične stranice. Protokol: Kladanjske brigade br. 2, 75280 Kladanj.',
  },
  {
    municipality_name: 'Lukavac',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'lukavac.ba',
    forms_url: 'https://lukavac.ba/e-obrasci/',
    document_categories: ['E-uprava', 'Obrasci'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Sapna',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'opcina-sapna.ba',
    
    document_categories: ['Uvjerenja', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Srebrenik',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'www.srebrenik.ba',
    forms_url: 'https://srebrenik.ba/e-uprava/',
    document_categories: ['Prostorno uređenje', 'Civilna zaštita', 'Boračko-invalidska zaštita', 'Opća uprava', 'Poduzetništvo', 'Finansije', 'Katastar', 'Interna revizija'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Teočak',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'teocak.ba',
    
    document_categories: ['Uvjerenja', 'Zahtjevi građana'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Grad Živinice',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'gradzivinice.ba',
    forms_url: 'https://gradzivinice.ba/obrasci-salter-sale/',
    document_categories: ['Obrasci šalter sale', 'Matični uredi', 'Uvjerenja', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Obrasci šalter sale — formulari za građane dostupni online',
  },

  // ============================================================
  // UNSKO-SANSKI KANTON (USK)
  // ============================================================
  {
    municipality_name: 'Grad Bihać',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    official_domain: 'www.bihac.org',
    forms_url: 'https://www.bihac.org/dokumenti/21',
    document_categories: ['Urbanizam', 'Matični uredi', 'Uvjerenja', 'Lokacijska informacija'],
    status: 'active',
    secure: false,
    physical_presence_required: false,
    komentar: 'SSL problemi na USK portalima — potrebno prilagoditi cookies',
  },
  {
    municipality_name: 'Bosanska Krupa',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    official_domain: 'gradbosanskakrupa.ba',
    forms_url: 'https://www.ecitizen.ba/bosanska_krupa/eServices',
    e_government_link: 'https://www.ecitizen.ba/bosanska_krupa/eServices',
    document_categories: ['Vodiči i zahtjevi', 'Online formulari'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Online popunjavanje i podnošenje formulara putem eCitizen platforme.',
  },
  {
    municipality_name: 'Bosanski Petrovac',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    official_domain: 'www.bosanskipetrovac.gov.ba',
    alternative_domain: 'bosanski-petrovac.ba',
    forms_url: undefined,
    document_categories: [],
    status: 'active',
    secure: true,
    physical_presence_required: true,
    komentar: 'Stara domena bosanski-petrovac.ba neaktivna; nova službena adresa: www.bosanskipetrovac.gov.ba. Nema direktnu stranicu za obrasce.',
  },
  {
    municipality_name: 'Bužim',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    official_domain: 'opcinabuzim.ba',
    document_categories: ['Upute za obrasce', 'Prostorno uređenje', 'Budžet i finansije', 'Razvoj i poduzetništvo', 'Opća uprava', 'Civilna zaštita'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Općina ne nudi online obrasce; upute i informacije dostupne su na stranicama nadležnih službi.',
  },
  {
    municipality_name: 'Cazin',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    official_domain: 'gradcazin.gov.ba',
    forms_url: 'https://gradcazin.gov.ba/dokumenti',
    document_categories: ['Dokumenti', 'Javne nabavke', 'Obrasci', 'Službene novine'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Službena arhiva dokumenata sadrži obrasce, javne nabavke i druge objave.',
  },
  {
    municipality_name: 'Ključ',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    official_domain: 'opcina-kljuc.ba',
    forms_url: 'https://www.ecitizen.ba/kljuc/home',
    document_categories: ['E-uprava', 'Dokumenti'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Sanski Most',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    official_domain: 'sanski-most.ba',
    
    document_categories: ['Matični uredi', 'Urbanizam'],
    status: 'active',
    secure: false,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Velika Kladuša',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    official_domain: 'velikakladusa.gov.ba',
    forms_url: 'https://velikakladusa.gov.ba/e-obrasci/',
    document_categories: ['Urbanizam', 'Uvjerenja', 'Matični uredi'],
    status: 'active',
    secure: false,
    physical_presence_required: false,
  },

  // ============================================================
  // SREDNJOBOSANSKI KANTON (SBK)
  // ============================================================
  {
    municipality_name: 'Travnik',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'travnik.ba',
    
    document_categories: ['Urbanizam', 'Uvjerenja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Bugojno',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'opcina-bugojno.ba',
    forms_url: 'https://opcina-bugojno.ba/e-formulari/',
    document_categories: ['Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Službena stranica i e-formulari Općine Bugojno',
  },
  {
    municipality_name: 'Gornji Vakuf-Uskoplje',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'www.gvu.ba',
    alternative_domain: 'ecitizen.ba',
    forms_url: 'https://www.gvu.ba/e-maticar',
    e_government_link: 'https://ecitizen.ba/gornji_vakuf_uskoplje/home',
    document_categories: ['E-Matičar', 'Matični ured', 'Dijaspora', 'E-uprava'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'E-Matičar omogućava online podnošenje zahtjeva za izdavanje i dostavu izvoda i uvjerenja iz matičnih knjiga; dostupni su i Registar dijaspore i eCitizen.',
  },
  {
    municipality_name: 'Donji Vakuf',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'donji-vakuf.ba',
    forms_url: 'https://donji-vakuf.ba/',
    document_categories: ['Opća uprava', 'E-matičar'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Službena stranica donji-vakuf.ba; dostupan je obrazac za prijem kod načelnika i e-Matičar',
  },
  {
    municipality_name: 'Novi Travnik',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'novitravnik.gov.ba',
    forms_url: 'https://eregistar.gnt.gov.ba/administrativni-postupci/',
    document_categories: ['Uvjerenja', 'Urbanizam', 'Administrativni postupci', 'Javni oglasi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Vitez',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'vitez.ba',
    
    document_categories: ['Urbanizam', 'Lokacijska informacija'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Busovača',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'opcina-busovaca.com',
    forms_url: 'https://opcina-busovaca.com/dokumenti/',
    document_categories: ['Budžet i finansije', 'Obrasci i zahtjevi', 'Javni pozivi i obavijesti', 'Planovi i odluke', 'Službeni dokumenti', 'Mjesne zajednice', 'Urbanizam i zemljište', 'Udruženja i sufinansiranje', 'Obrt i djelatnosti', 'Matični uredi', 'Privreda i prevoz'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zvanični portal Općine Busovača sa javnim dokumentima, planovima i obrascima.',
  },
  {
    municipality_name: 'Jajce',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'jajce.ba',
    forms_url: undefined,
    document_categories: [],
    status: 'active',
    secure: true,
    physical_presence_required: true,
    komentar: 'Website ne sadrži obrasce — potrebno lično u službe općine',
  },
  {
    municipality_name: 'Kiseljak',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'kiseljak.ba',
    
    document_categories: ['Urbanizam', 'Uvjerenja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Kreševo',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'kresevo.ba',
    
    document_categories: ['Uvjerenja', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Dokumenti se dostavljaju preporučeno poštom',
  },
  {
    municipality_name: 'Fojnica',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'www.fojnica.ba',
    forms_url: 'https://www.fojnica.ba/v3/e-uprava/sluzba-za-opcu-upravu-obrasci',
    document_categories: ['Opća uprava', 'Civilna zaštita', 'Društvene djelatnosti', 'Socijalna zaštita'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },

  // ============================================================
  // HERCEGOVAČKO-NERETVANSKI KANTON (HNK)
  // ============================================================
  {
    municipality_name: 'Grad Mostar',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    official_domain: 'www.mostar.ba',
    alternative_domain: 'mostar.ba',
    forms_url: 'https://csr-mostar.ba/zahtjevi-i-obrasci/',
    e_government_link: 'https://www.mostar.ba/gradska-uprava/',
    document_categories: ['Urbanizam', 'Uvjerenja', 'Matični uredi', 'Socijalna zaštita', 'Organizacija i pravni poslovi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Stari .rar link za Odjel za organizaciju i pravne poslove zastarjeo; aktuelni formulari na glavnoj domeni www.mostar.ba',
  },
  {
    municipality_name: 'Čapljina',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    official_domain: 'capljina.ba',
    forms_url: 'https://capljina.ba/administrativni-postupci/',
    document_categories: ['Poslovi gradonačelnika', 'Proračun i financije', 'Opća uprava i zajednički poslovi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'e-Registar Grada Čapljine sadrži administrativne postupke i pripadajuće obrasce.',
  },
  {
    municipality_name: 'Čitluk',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    official_domain: 'citluk.ba',
    forms_url: 'https://citluk.ba/zahtjevi/',
    document_categories: ['Urbanistička dozvola', 'Građevinska dozvola', 'Uporabna dozvola', 'Ostali zahtjevi', 'Izjave', 'Odobrenja', 'Prestanak rada', 'Rješenja', 'Uvjerenja', 'Ostalo', 'Priznavanja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Jablanica',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    official_domain: 'jablanica.ba',
    forms_url: 'https://www.jablanica.ba/ba/download-zona/obrasci-i-zahtjevi.html',
    document_categories: ['Uvjerenja', 'Urbanizam', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Konjic',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    official_domain: 'konjic.ba',
    forms_url: 'https://www.konjic.ba/ba/uprava/opcinske-sluzbe/prospekti-sluzbi.html',
    document_categories: ['Urbanizam', 'Građevinske dozvole', 'Uvjerenja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Neum',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    official_domain: 'neum.ba',
    forms_url: 'https://neum.ba/eDokumenti/sluzba-za-stambeno-komunalne-poslove-izgradnju-i-razvoj/',
    document_categories: ['Uvjerenja', 'Urbanizam', 'Katastar', 'Finansije', 'Opća uprava', 'Civilna zaštita'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Prozor-Rama',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    official_domain: 'prozor-rama.ba',
    
    document_categories: ['Matični uredi', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Stolac',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    official_domain: 'stolac.ba',
    
    document_categories: ['Uvjerenja', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },

  // ============================================================
  // POSAVSKI KANTON (PK)
  // ============================================================
  {
    municipality_name: 'Orašje',
    canton: 'Posavski kanton (PK)',
    entity: 'FBiH',
    official_domain: 'orasje.ba',
    
    document_categories: ['Uvjerenja', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Odžak',
    canton: 'Posavski kanton (PK)',
    entity: 'FBiH',
    official_domain: 'odzak.ba',
    
    document_categories: ['Urbanizam', 'Uvjerenja', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Domaljevac-Šamac',
    canton: 'Posavski kanton (PK)',
    entity: 'FBiH',
    official_domain: 'domaljevac.ba',
    forms_url: 'https://domaljevac.ba/wp-content/uploads/2025/02/zahtjev-za-upravni-postupak.pdf',
    document_categories: ['Upravni postupci', 'Poljoprivreda', 'Socijalna zaštita', 'Boračka zaštita'],
    status: 'active',
    secure: true,
    physical_presence_required: true,
    komentar: 'Direktni obrasci dostupni na službenoj stranici Općine Domaljevac-Šamac',
  },

  // ============================================================
  // KANTON 10 — LIVANJSKI (K10 / HBŽ)
  // ============================================================
  {
    municipality_name: 'Grad Livno',
    canton: 'Kanton 10 (Livanjski / Hercegbosanska županija)',
    entity: 'FBiH',
    official_domain: 'livno.ba',
    forms_url: 'https://livno.ba/za-gradane/dokumenti-i-obrasci/',
    document_categories: ['Graditeljstvo', 'Urbanizam', 'Komunalije', 'Obrt & Poduzetništvo', 'Opća uprava', 'Matični uredi', 'Boračka pitanja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Službeni repozitorij elektronskih dokumenata i obrazaca Grada Livna: https://livno.ba/za-gradane/dokumenti-i-obrasci/',
  },
  {
    municipality_name: 'Tomislavgrad',
    canton: 'Kanton 10 (Livanjski)',
    entity: 'FBiH',
    official_domain: 'tomislavgrad.ba',
    
    document_categories: ['Urbanizam', 'Uvjerenja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Drvar',
    canton: 'Kanton 10 (Livanjski)',
    entity: 'FBiH',
    official_domain: 'www.opstinadrvar.net',
    forms_url: 'http://www.opstinadrvar.net/wp-content/uploads/2021/06/Zahtjev-ka-opstinskom-nacelniku.pdf',
    document_categories: ['Pravno-imovinski', 'Socijalna zaštita', 'Porodiljske naknade'],
    status: 'active',
    secure: false,
    physical_presence_required: false,
    komentar: 'Službena stranica Opštine Drvar i šest direktnih PDF obrazaca',
  },
  {
    municipality_name: 'Bosansko Grahovo',
    canton: 'Kanton 10 (Livanjski)',
    entity: 'FBiH',
    official_domain: 'bosansko-grahovo.ba',
    forms_url: undefined,
    document_categories: [],
    status: 'active',
    secure: true,
    physical_presence_required: true,
    komentar: 'Samo javni pozivi i konkursi — nema obrazaca za lična dokumenta',
  },
  {
    municipality_name: 'Glamoč',
    canton: 'Kanton 10 (Livanjski)',
    entity: 'FBiH',
    official_domain: 'glamoc.ba',
    forms_url: undefined,
    document_categories: [],
    status: 'active',
    secure: true,
    physical_presence_required: true,
    komentar: 'Nema aktivnu online sekciju za obrasce — kontaktirati općinu',
  },
  {
    municipality_name: 'Kupres',
    canton: 'Kanton 10 (Livanjski)',
    entity: 'FBiH',
    official_domain: 'kupres.ba',
    forms_url: undefined,
    document_categories: [],
    status: 'active',
    secure: true,
    physical_presence_required: true,
    komentar: 'Nema direktne obrasce — informacije putem službenog kontakt centra',
  },

  // ============================================================
  // ZAPADNOHERCEGOVAČKI KANTON (ZHK)
  // ============================================================
  {
    municipality_name: 'Grad Široki Brijeg',
    canton: 'Zapadnohercegovački kanton (ZHK)',
    entity: 'FBiH',
    official_domain: 'sirokibrijeg.ba',
    forms_url: 'https://www.sirokibrijeg.ba/index.php/dokumenti/obrasci',
    document_categories: ['Urbanizam', 'Lokacijska informacija', 'Uvjerenja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Grad Ljubuški',
    canton: 'Zapadnohercegovački kanton (ZHK)',
    entity: 'FBiH',
    official_domain: 'ljubuski.ba',
    alternative_domain: 'grad-ljubuski.ba',
    
    
    document_categories: ['Urbanizam', 'Uvjerenja', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Općina Grude',
    canton: 'Zapadnohercegovački kanton (ZHK)',
    entity: 'FBiH',
    official_domain: 'grude.info',
    forms_url: 'https://grude.info/opcinska-uprava/opcinske-sluzbe/sluzba-za-opcu-upravu-branitelje-iz-domovinskog-rata-i-drustvene-djelatnosti/?search=&from=01.01.2000&to=31.12.2100#',
    document_categories: ['Zahtjevi', 'Matični ured', 'Branitelji i socijalna zaštita', 'Obrazovanje', 'Pristup informacijama'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Službena stranica s 23 zahtjeva i obrasca za matične evidencije, socijalnu i boračku zaštitu, obrazovanje i pristup informacijama.',
  },
  {
    municipality_name: 'Općina Posušje',
    canton: 'Zapadnohercegovački kanton (ZHK)',
    entity: 'FBiH',
    official_domain: 'opcina-posusje.ba',
    
    document_categories: ['Urbanizam', 'Uvjerenja', 'Lokacijske informacije'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },

  // ============================================================
  // REPUBLIKA SRPSKA — BANJALUČKA I DOBOJSKA REGIJA
  // ============================================================
  {
    municipality_name: 'Grad Banja Luka',
    region: 'Banjalučka regija',
    entity: 'RS',
    official_domain: 'banjaluka.rs.ba',
    alternative_domain: 'banjaluka.ba',
    forms_url: 'https://banjaluka.rs.ba/obrasci/',
    
    document_categories: ['Urbanizam', 'Uvjerenja', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Grad Gradiška',
    region: 'Banjalučka regija',
    entity: 'RS',
    official_domain: 'www.gradgradiska.com',
    forms_url: 'https://www.gradgradiska.com/zahtjev-za-prijem-kod-gradonacelnika/',
    document_categories: ['Matični uredi', 'Zahtjevi i obrasci'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Službena web-stranica i ažurirani obrasci Grada Gradiška.',
  },
  {
    municipality_name: 'Grad Doboj',
    region: 'Doboj regija',
    entity: 'RS',
    official_domain: 'doboj.gov.ba',
    forms_url: 'https://doboj.gov.ba/dokumenti/%D0%B7%D0%B0%D1%85%D1%82%D1%98%D0%B5%D0%B2%D0%B8-%D0%B8-%D0%BE%D0%B1%D1%80%D0%B0%D1%81%D1%86%D0%B8/',
    document_categories: ['Privreda i preduzetništvo', 'Matična služba i izvodi', 'Građanska stanja', 'Državljanstvo', 'Prijemna kancelarija i ovjere'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Službeni portal: doboj.gov.ba. Direktni obrasci: SP-1, MKR/MKU/MKV, novorođenčad 2026, državljanstvo.',
  },
  {
    municipality_name: 'Brod',
    searchAliases: ['Bosanski Brod'],
    region: 'Doboj regija',
    entity: 'RS',
    official_domain: 'opstina-brod.net',
    forms_url: 'https://opstina-brod.net/%D0%B2%D0%B0%D0%B6%D0%BD%D0%B8-%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B8/#lat',
    document_categories: ['Pristup informacijama', 'Prijava korupcije', 'Zaštita ličnih podataka', 'Obrasci i zahtjevi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Aktivna stranica sa važnim dokumentima, obrascima i zahtjevima.',
  },
  {
    municipality_name: 'Opština Bileća',
    region: 'Trebinje regija',
    entity: 'RS',
    official_domain: 'www.opstinabileca.ba',
    forms_url: 'https://www.opstinabileca.ba/obrazci-gradjani/',
    document_categories: ['Opšta uprava', 'Boračko-invalidska zaštita', 'Konkursi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Službeni zahtjevi i aktuelni konkursi na web-stranici Opštine Bileća.',
  },

  // ============================================================
  // BOSANSKO-PODRINJSKI KANTON GORAŽDE (BPK)
  // ============================================================
  {
    municipality_name: 'Grad Goražde',
    canton: 'Bosansko-podrinjski kanton (BPK)',
    entity: 'FBiH',
    official_domain: 'gorazde.ba',
    forms_url: 'https://gorazde.ba/sluzba-za-finansije-trezor-i-privredu-elektronski-obrasci/',
    e_government_link: 'https://gorazde.ba/sluzba-za-finansije-trezor-i-privredu-elektronski-obrasci/',
    document_categories: ['Urbanizam i građenje', 'Inspekcijski poslovi', 'Katastar i nekretnine', 'Finansije i privreda', 'Boračka i socijalna zaštita'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za izdavanje urbanističke saglasnosti / Građevinske dozvole',
  },
  {
    municipality_name: 'Općina Pale-Prača',
    canton: 'Bosansko-podrinjski kanton (BPK)',
    entity: 'FBiH',
    official_domain: 'praca.ba',
    forms_url: 'https://praca.ba/?s=Obrazac',
    document_categories: ['Opća uprava', 'Matični uredi', 'Uvjerenja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjevi i obrasci općinske službe Pale-Prača',
  },
  {
    municipality_name: 'Općina Foča-Ustikolina',
    canton: 'Bosansko-podrinjski kanton (BPK)',
    entity: 'FBiH',
    official_domain: 'foca-ustikolina.ba',
    forms_url: 'https://foca-ustikolina.ba/wp-content/uploads/2022/10/ZAHTJEV_urbanistickaSaglasnost.pdf',
    document_categories: ['Urbanizam', 'Vodoprivreda', 'Komunalne takse', 'Socijalna zaštita', 'Civilna zaštita'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Direktni obrasci i službeni dokumenti Općine Foča-Ustikolina',
  },

  // ============================================================
  // REPUBLIKA SRPSKA — ISTOČNO SARAJEVO REGIJA
  // ============================================================
  {
    municipality_name: 'Grad Istočno Sarajevo',
    region: 'Istočno Sarajevo regija',
    entity: 'RS',
    official_domain: 'gradistocnosarajevo.net',
    forms_url: 'https://gradistocnosarajevo.net/dokumenti/',
    document_categories: ['Gradska uprava', 'Zvanični obrasci', 'Zahtjevi', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zvanični obrasci i zahtjevi gradske uprave',
  },
  {
    municipality_name: 'Istočna Ilidža',
    region: 'Istočno Sarajevo regija',
    entity: 'RS',
    official_domain: 'istocnailidza.net',
    forms_url: 'https://istocnailidza.net/?page_id=255',
    document_categories: ['Preduzetništvo (SP)', 'Urbanizam', 'Matični uredi', 'Uvjerenja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za registraciju preduzetničke djelatnosti (SP)',
  },
  {
    municipality_name: 'Istočno Novo Sarajevo',
    region: 'Istočno Sarajevo regija',
    entity: 'RS',
    official_domain: 'opstinains.net',
    forms_url: 'https://opstinains.net/lat/maticne-sluzbe/',
    document_categories: ['Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: true,
    komentar: 'Opština ne nudi e-verzije dokumenata preko sajta; dokumenti se izdaju na usmeni zahtjev u prostorijama Opštinske uprave.',
  },
  {
    municipality_name: 'Pale (RS)',
    region: 'Istočno Sarajevo regija',
    entity: 'RS',
    official_domain: 'pale.rs.ba',
    
    document_categories: ['Preduzetništvo i privreda', 'Građevinske dozvole', 'Urbanizam', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Obrazac za registraciju preduzetnika i promjenu podataka',
  },
  {
    municipality_name: 'Trnovo (RS)',
    region: 'Istočno Sarajevo regija',
    entity: 'RS',
    official_domain: 'trnovo-rs.com',
    
    document_categories: ['Jednokratne pomoći', 'Matični uredi', 'Socijalna zaštita', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za jednokratne pomoći i matični uredi',
  },
  {
    municipality_name: 'Istočni Stari Grad',
    region: 'Istočno Sarajevo regija',
    entity: 'RS',
    official_domain: 'opstinaisg.net',
    
    document_categories: ['Građansko stanje', 'Uvjerenja', 'Matični uredi', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za izdavanje uvjerenja i obrazaca građanskog stanja',
  },
  {
    municipality_name: 'Sokolac',
    region: 'Istočno Sarajevo regija',
    entity: 'RS',
    official_domain: 'opstinasokolac.net',
    forms_url: 'https://opstinasokolac.net/obrasci/',
    document_categories: ['Ekološka dozvola', 'Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za izdavanje ekološke dozvole / Urbanizam',
  },

  // ============================================================
  // REGIJA FOČA / DRINA (RS)
  // ============================================================
  {
    municipality_name: 'Foča (RS)',
    region: 'Regija Foča / Drina',
    entity: 'RS',
    official_domain: 'foca.rs.ba',
    forms_url: 'https://foca.rs.ba/',
    document_categories: ['Preduzetništvo SP', 'Urbanizam', 'Matični uredi', 'Usluge i obrasci'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za registraciju preduzetnika SP-1',
  },
  {
    municipality_name: 'Čajniče',
    region: 'Regija Foča / Drina',
    entity: 'RS',
    official_domain: 'opstinacajnice.rs.ba',
    forms_url: 'https://opstinacajnice.rs.ba/%d0%be%d0%b1%d1%80%d0%b0%d1%81%d1%86%d0%b8-%d0%be%d0%bf%d1%88%d1%82%d0%b8%d0%bd%d0%b0-%d1%87%d0%b0%d1%98%d0%bd%d0%b8%d1%87%d0%b5/',
    document_categories: ['Opšta uprava', 'Privreda, finansije i društvene djelatnosti', 'Prostorno uređenje i stambeno-komunalni poslovi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjevi i obrasci za opštu upravu, privredu, društvene djelatnosti i prostorno-komunalne poslove.',
  },
  {
    municipality_name: 'Rudo',
    region: 'Regija Foča / Drina',
    entity: 'RS',
    official_domain: 'opstinarudo.com',
    forms_url: 'https://opstinarudo.com/obrasci/',
    document_categories: ['Poljoprivreda', 'Preduzetništvo SP', 'Građevinske dozvole', 'Opšta uprava'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za podsticaje u poljoprivredi i registraciju SP',
  },
  {
    municipality_name: 'Novo Goražde',
    region: 'Regija Foča / Drina',
    entity: 'RS',
    official_domain: 'novogorazde.rs.ba',
    
    document_categories: ['Privreda', 'Opšta uprava', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjevi Odjeljenja za privredu i opštu upravu',
  },

  // ============================================================
  // SARAJEVSKO-ROMANIJSKA REGIJA (RS)
  // ============================================================
  {
    municipality_name: 'Han Pijesak',
    region: 'Sarajevsko-Romanijska',
    entity: 'RS',
    official_domain: 'hanpijesak.org',
    forms_url: 'https://hanpijesak.org/zahtjevi-i-obrasci/',
    document_categories: ['Prijemna kancelarija', 'Opšta uprava', 'Matični uredi', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjevi prijemne kancelarije i opšte uprave',
  },
  {
    municipality_name: 'Rogatica',
    region: 'Sarajevsko-Romanijska',
    entity: 'RS',
    
    document_categories: ['Upotrebna dozvola', 'Komunalne takse', 'Urbanizam', 'Matični uredi'],
    status: 'broken',
    secure: true,
    physical_presence_required: true,
    komentar: 'Zahtjev za izdavanje upotrebe objekta i komunalne takse',
  },

  // ============================================================
  // BRČKO DISTRIKT
  // ============================================================
  {
    municipality_name: 'Brčko Distrikt BiH',
    entity: 'BD',
    official_domain: 'bdcentral.net',
    forms_url: 'https://bdcentral.net/obrasci/',
    document_categories: ['Urbanizam', 'Matični uredi', 'Zdravstvo', 'Obrazovanje', 'Građevinske dozvole'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Jedinstveni entitet - objedinjuje funkcije općine, grada i kantona',
  },
];

// ============================================================
// Cantonal-level institutions (ZZO, Ministarstva)
// ============================================================

export interface CantonalInstitution {
  institution_name: string;
  canton: string;
  entity: 'FBiH' | 'RS' | 'BD';
  official_domain: string;
  forms_url?: string;
  document_categories: string[];
  covers_municipalities?: string[];
  status: 'active' | 'changed' | 'broken';
  komentar?: string;
}

export const cantonalInstitutions: CantonalInstitution[] = [
  // ZDK
  {
    institution_name: 'ZZO ZDK',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    official_domain: 'zzozedo.ba',
    
    document_categories: ['Zdravstveni obrasci', 'Refundacija troškova', 'Ortopedska pomagala'],
    covers_municipalities: ['Zenica', 'Doboj-Jug', 'Kakanj', 'Maglaj', 'Žepče', 'Tešanj', 'Olovo', 'Usora'],
    status: 'active',
  },
  // ZHK
  {
    institution_name: 'ZZO ZHK',
    canton: 'Zapadnohercegovački kanton (ZHK)',
    entity: 'FBiH',
    official_domain: 'zzozzh.com',
    forms_url: 'https://zzozzh.com/obrasci/',
    document_categories: ['Zdravstveno osiguranje', 'Refundacije', 'Ortopedska pomagala'],
    covers_municipalities: ['Široki Brijeg', 'Ljubuški', 'Grude', 'Posušje'],
    status: 'active',
  },
  // TK
  {
    institution_name: 'ZZO TK',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'zzotk.ba',
    forms_url: 'https://zzotk.ba/obrasci/',
    document_categories: ['Zdravstveno osiguranje', 'Refundacija', 'Ortopedska pomagala', 'E-legitimacija'],
    covers_municipalities: ['Tuzla', 'Kalesija', 'Banovići', 'Lukavac', 'Srebrenik', 'Gračanica', 'Gradačac', 'Živinice'],
    status: 'active',
  },
  // HNK
  {
    institution_name: 'ZZO HNK',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    official_domain: 'zzohnk.ba',
    
    document_categories: ['Zdravstveno osiguranje', 'Ortopedska pomagala', 'Refundacija'],
    status: 'active',
  },
  // USK
  {
    institution_name: 'ZZO USK',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    official_domain: 'zzousk.ba',
    
    document_categories: ['Refundacija', 'Prijava na osiguranje', 'Ortopedska pomagala'],
    status: 'active',
  },
  // SBK
  {
    institution_name: 'ZZO SBK',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'zzosbk.ba',
    
    document_categories: ['Zdravstveno osiguranje', 'Refundacija', 'Ortopedska pomagala'],
    status: 'active',
  },
  // PK
  {
    institution_name: 'ZZO PK',
    canton: 'Posavski kanton (PK)',
    entity: 'FBiH',
    official_domain: 'zzopk.ba',
    
    document_categories: ['Zdravstveno osiguranje', 'Refundacije', 'Ortopedska pomagala'],
    status: 'active',
  },
];

// ============================================================
// Lookup helpers
// ============================================================

function normalizeLookup(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/č/g, 'c')
    .replace(/ć/g, 'c')
    .replace(/š/g, 's')
    .replace(/ž/g, 'z')
    .replace(/đ/g, 'dj')
    .replace(/grad\s+/g, '')
    .replace(/općina\s+/g, '')
    .replace(/opcina\s+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Find a verified domain entry by municipality name.
 */
export function findVerifiedDomain(municipalityName: string): VerifiedMunicipality | null {
  const searchName = normalizeLookup(municipalityName);

  return verifiedDomains.find(v => {
    const vName = normalizeLookup(v.municipality_name);
    return vName === searchName || vName.includes(searchName) || searchName.includes(vName);
  }) || null;
}

/**
 * Find cantonal institutions relevant to a municipality.
 */
export function findCantonalInstitutions(municipalityName: string): CantonalInstitution[] {
  const searchName = normalizeLookup(municipalityName);

  // First check if municipality is directly covered
  const directMatch = cantonalInstitutions.filter(inst =>
    inst.covers_municipalities?.some(m => normalizeLookup(m) === searchName)
  );

  if (directMatch.length > 0) return directMatch;

  // Fallback: match by canton
  const municipality = findVerifiedDomain(municipalityName);
  if (municipality?.canton) {
    return cantonalInstitutions.filter(inst => inst.canton === municipality.canton);
  }

  return [];
}

/**
 * Get all active verified domains.
 */
export function getActiveVerifiedDomains(): VerifiedMunicipality[] {
  return verifiedDomains.filter(v => v.status === 'active');
}

/**
 * Check if a municipality has a verified domain.
 */
export function hasVerifiedDomain(municipalityName: string): boolean {
  return findVerifiedDomain(municipalityName) !== null;
}

/**
 * Get the best URL for a verified municipality.
 * Priority: forms_url > e_government_link > official_domain
 */
export function getVerifiedBestUrl(municipalityName: string): string | null {
  const verified = findVerifiedDomain(municipalityName);
  if (!verified || verified.status === 'broken') return null;

  if (verified.forms_url) return verified.forms_url;
  if (verified.e_government_link) return verified.e_government_link;
  return `https://${verified.official_domain}`;
}

/**
 * Get canton coverage report.
 */
export function getCantonCoverageReport(): {
  canton: string;
  totalMunicipalities: number;
  withForms: number;
  withoutForms: number;
  insecure: number;
  physicalOnly: number;
}[] {
  const cantons = new Map<string, VerifiedMunicipality[]>();

  for (const m of verifiedDomains) {
    if (m.canton) {
      const list = cantons.get(m.canton) || [];
      list.push(m);
      cantons.set(m.canton, list);
    }
  }

  return Array.from(cantons.entries()).map(([canton, municipalities]) => ({
    canton,
    totalMunicipalities: municipalities.length,
    withForms: municipalities.filter(m => m.forms_url).length,
    withoutForms: municipalities.filter(m => !m.forms_url).length,
    insecure: municipalities.filter(m => !m.secure).length,
    physicalOnly: municipalities.filter(m => m.physical_presence_required).length,
  }));
}