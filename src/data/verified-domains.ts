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
  canton?: string;
  region?: string;
  entity: 'FBiH' | 'RS' | 'BD';
  official_domain: string;
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
    forms_url: 'https://starigrad.ba/v2/e_uprava.php',
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
    official_domain: 'centar.ba',
    alternative_domain: 'opcina-centar.gov.ba',
    forms_url: 'https://centar.ba/e-uprava/obrasci',
    e_government_link: 'https://centar.ba/e-uprava/obrasci',
    document_categories: ['Privreda i obrt', 'Urbanizam', 'Deklaracije', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za registraciju samostalne djelatnosti (obrt)',
  },
  {
    municipality_name: 'Ilidža',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    official_domain: 'opcinailidza.ba',
    alternative_domain: 'ilidza.ba',
    forms_url: 'https://opcinailidza.ba/obrasci',
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
    forms_url: 'https://novigradsarajevo.ba/e-uprava',
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
    forms_url: 'https://novosarajevo.ba/e-uprava/obrasci/',
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
    official_domain: 'vogosca.ba',
    forms_url: 'https://vogosca.ba/e-uprava/obrasci/',
    document_categories: ['Građanska stanja', 'Naknade porodiljama', 'E-uprava', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za naknadu porodiljama / Građanska stanja (e-Uprava obrasci)',
  },
  {
    municipality_name: 'Hadžići',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    official_domain: 'hadzici.ba',
    forms_url: 'https://hadzici.ba/e-uprava',
    document_categories: ['Matični uredi', 'E-uprava', 'Građanska stanja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za izdavanje izvoda iz matičnih knjiga (e-Uprava)',
  },
  {
    municipality_name: 'Trnovo (FBiH)',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    official_domain: 'trnovo.ba',
    forms_url: 'https://trnovo.ba/dokumenti/obrasci/',
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
    forms_url: 'https://ilijas.ba/e-uprava/obrasci',
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
    official_domain: 'doboj-jug.ba',
    forms_url: 'https://doboj-jug.ba/pdf-formular-zzo-zdk/',
    document_categories: ['Zdravstvo'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zdravstveni obrasci ZZO ZDK',
  },
  {
    municipality_name: 'Kakanj',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    official_domain: 'kakanj.ba',
    forms_url: 'https://kakanj.ba/pdf-formular-zzo-zdk/',
    document_categories: ['Zdravstvo'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Maglaj',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    official_domain: 'maglaj.ba',
    forms_url: 'https://maglaj.ba/pdf-formular-zzo-zdk/',
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
    forms_url: 'https://zepce.ba/pdf-formular-zzo-zdk/',
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
    forms_url: 'https://tesanj.ba/pdf-formular-zzo-zdk/',
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
    forms_url: 'https://grad.tuzla.ba/category/gradtuzla/e-uprava/',
    e_government_link: 'https://grad.tuzla.ba/category/gradtuzla/e-uprava/',
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
    forms_url: 'https://kalesija.ba/e-formulari/',
    document_categories: ['E-formulari', 'Matični uredi', 'Urbanizam', 'Zdravstvo', 'Lokacijska informacija'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Digitalizovani e-formulari za različite usluge',
  },
  {
    municipality_name: 'Banovići',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'banovici.ba',
    forms_url: 'https://banovici.ba/obrasci/',
    document_categories: ['Urbanizam', 'Uvjerenja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Čelić',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'celic.ba',
    forms_url: 'https://celic.ba/obrasci/',
    document_categories: ['Socijalna zaštita', 'Uvjerenja', 'Građevinske dozvole'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Doboj Istok',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'doboj-istok.ba',
    forms_url: 'https://doboj-istok.ba/obrasci/',
    document_categories: ['Prijava prebivališta', 'Uvjerenja', 'Urbanizam'],
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
    document_categories: ['Urbanizam', 'Lokacijska informacija'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Gradačac',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'gradacac.ba',
    forms_url: 'https://gradacac.ba/obrasci/',
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
    forms_url: 'https://kladanj.ba/obrasci/',
    document_categories: ['Socijalna zaštita', 'Urbanizam', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Lukavac',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'lukavac.ba',
    forms_url: 'https://lukavac.ba/obrasci/',
    document_categories: ['Uvjerenja', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Sapna',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'opcina-sapna.ba',
    forms_url: 'https://opcina-sapna.ba/dokumenti/',
    document_categories: ['Uvjerenja', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Srebrenik',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'srebrenik.ba',
    forms_url: 'https://srebrenik.ba/obrasci/',
    document_categories: ['Urbanizam', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Teočak',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    official_domain: 'teocak.ba',
    forms_url: 'https://teocak.ba/obrasci/',
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
    official_domain: 'bosanska-krupa.ba',
    forms_url: 'https://bosanska-krupa.ba/obrasci/',
    document_categories: ['Urbanizam', 'Građevinske dozvole'],
    status: 'active',
    secure: false,
    physical_presence_required: false,
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
    official_domain: 'buzim.ba',
    forms_url: 'https://buzim.ba/obrasci/',
    document_categories: ['Prijava prebivališta', 'Uvjerenja', 'Socijalna zaštita'],
    status: 'active',
    secure: false,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Cazin',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    official_domain: 'cazin.ba',
    forms_url: 'https://cazin.ba/obrasci/',
    document_categories: ['Urbanizam', 'Matični uredi', 'Uvjerenja'],
    status: 'active',
    secure: false,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Ključ',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    official_domain: 'kljuc.ba',
    forms_url: 'https://kljuc.ba/obrasci/',
    document_categories: ['Urbanizam', 'Dozvole'],
    status: 'active',
    secure: false,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Sanski Most',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    official_domain: 'sanski-most.ba',
    forms_url: 'https://sanski-most.ba/obrasci/',
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
    forms_url: 'https://travnik.ba/obrasci/',
    document_categories: ['Urbanizam', 'Uvjerenja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Bugojno',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'www.bugojno.ba',
    alternative_domain: 'bugojno.ba',
    forms_url: 'https://www.bugojno.ba/obrasci/',
    document_categories: ['Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Stari unos opcina-bugojno.ba nekompletan; ispravna domena: www.bugojno.ba',
  },
  {
    municipality_name: 'Gornji Vakuf-Uskoplje',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'opcinagvu.ba',
    alternative_domain: 'gv-uskoplje.ba',
    forms_url: 'https://opcinagvu.ba/e-maticar/',
    document_categories: ['E-matičar', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Stara domena gvu.ba neaktivna; nova službena adresa: opcinagvu.ba. Online E-Matičar sistem.',
  },
  {
    municipality_name: 'Donji Vakuf',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'donjivakuf.ba',
    alternative_domain: 'donji-vakuf.ba',
    forms_url: 'https://donjivakuf.ba/obrasci/',
    document_categories: ['Urbanizam', 'Uvjerenja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Stara domena donji-vakuf.ba neaktivna; nova službena adresa: donjivakuf.ba',
  },
  {
    municipality_name: 'Novi Travnik',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'novi-travnik.ba',
    forms_url: 'https://novi-travnik.ba/obrasci/',
    document_categories: ['Uvjerenja', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Vitez',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'vitez.ba',
    forms_url: 'https://vitez.ba/obrasci/',
    document_categories: ['Urbanizam', 'Lokacijska informacija'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Busovača',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'busovaca.ba',
    forms_url: 'https://busovaca.ba/obrasci/',
    document_categories: ['Uvjerenja', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
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
    forms_url: 'https://kiseljak.ba/obrasci/',
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
    forms_url: 'https://kresevo.ba/obrasci/',
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
    official_domain: 'fojnica.ba',
    forms_url: 'https://fojnica.ba/obrasci/',
    document_categories: ['Urbanizam', 'Uvjerenja'],
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
    forms_url: 'https://www.mostar.ba/kategorija/sluzbeni-dokumenti/',
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
    forms_url: 'https://capljina.ba/obrasci/',
    document_categories: ['Urbanizam', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Čitluk',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    official_domain: 'citluk.ba',
    forms_url: 'https://citluk.ba/obrasci/',
    document_categories: ['Uvjerenja', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Jablanica',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    official_domain: 'jablanica.ba',
    forms_url: 'https://jablanica.ba/obrasci/',
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
    forms_url: 'https://neum.ba/obrasci/',
    document_categories: ['Uvjerenja', 'Urbanizam'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Prozor-Rama',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    official_domain: 'prozor-rama.ba',
    forms_url: 'https://prozor-rama.ba/obrasci/',
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
    forms_url: 'https://stolac.ba/obrasci/',
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
    forms_url: 'https://orasje.ba/obrasci/',
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
    forms_url: 'https://odzak.ba/obrasci/',
    document_categories: ['Urbanizam', 'Uvjerenja', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Domaljevac-Šamac',
    canton: 'Posavski kanton (PK)',
    entity: 'FBiH',
    official_domain: 'domaljevac-samac.ba',
    forms_url: undefined,
    document_categories: ['Protokol općine'],
    status: 'active',
    secure: true,
    physical_presence_required: true,
    komentar: 'Nema posebnu stranicu za obrasce, dostupno putem protokola općine',
  },

  // ============================================================
  // KANTON 10 — LIVANJSKI (K10 / HBŽ)
  // ============================================================
  {
    municipality_name: 'Grad Livno',
    canton: 'Kanton 10 (Livanjski)',
    entity: 'FBiH',
    official_domain: 'livno.ba',
    forms_url: 'https://livno.ba/obrasci/',
    document_categories: ['Urbanizam', 'Uvjerenja', 'Socijalna zaštita'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Dokumenti se šalju poštom nakon konfirmacije',
  },
  {
    municipality_name: 'Tomislavgrad',
    canton: 'Kanton 10 (Livanjski)',
    entity: 'FBiH',
    official_domain: 'tomislavgrad.ba',
    forms_url: 'https://tomislavgrad.ba/obrasci/',
    document_categories: ['Urbanizam', 'Uvjerenja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Drvar',
    canton: 'Kanton 10 (Livanjski)',
    entity: 'FBiH',
    official_domain: 'drvar.ba',
    forms_url: 'https://drvar.ba/obrasci/',
    document_categories: ['Pravno-imovinski', 'Socijalna zaštita', 'Porodiljske naknade'],
    status: 'active',
    secure: false,
    physical_presence_required: false,
    komentar: 'SSL problemi — website ne može pružiti sigurnu konekciju',
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
    forms_url: 'https://www.ljubuski.ba/zahtjevi-i-obrasci/',
    e_government_link: 'https://ljubuski.ba/gradska-uprava/',
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
    forms_url: 'https://www.grude.info/zahtjevi-i-obrasci/',
    document_categories: ['Urbanizam', 'Građevinske dozvole', 'Uvjerenja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
  },
  {
    municipality_name: 'Općina Posušje',
    canton: 'Zapadnohercegovački kanton (ZHK)',
    entity: 'FBiH',
    official_domain: 'opcina-posusje.ba',
    forms_url: 'https://www.opcina-posusje.ba/dokumenti/obrasci/',
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
    e_government_link: 'https://www.banjaluka.rs.ba/gradska-uprava/e-uprava/',
    document_categories: ['Urbanizam', 'Uvjerenja', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
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

  // ============================================================
  // BOSANSKO-PODRINJSKI KANTON GORAŽDE (BPK)
  // ============================================================
  {
    municipality_name: 'Grad Goražde',
    canton: 'Bosansko-podrinjski kanton (BPK)',
    entity: 'FBiH',
    official_domain: 'gorazde.ba',
    forms_url: 'https://gorazde.ba/gradska-uprava/e-uprava/',
    e_government_link: 'https://gorazde.ba/gradska-uprava/e-uprava/',
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
    forms_url: 'https://foca-ustikolina.ba/dokumenti/',
    document_categories: ['Komunalne takse', 'Takseni zahtjevi', 'Opća uprava'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Obrazac za prijavu komunalnih taksi i taksenih zahtjeva',
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
    forms_url: 'https://istocnailidza.net/dokumenti-i-obrasci/',
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
    forms_url: 'https://opstinains.net/usluge/obrasci/',
    document_categories: ['Lokacijski uslovi', 'Urbanizam', 'Usluge i obrasci', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Zahtjev za izdavanje lokacijskih uslova',
  },
  {
    municipality_name: 'Pale (RS)',
    region: 'Istočno Sarajevo regija',
    entity: 'RS',
    official_domain: 'pale.rs.ba',
    forms_url: 'https://pale.rs.ba/dokumenti-i-obrasci/',
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
    forms_url: 'https://trnovo-rs.com/dokumenti/',
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
    forms_url: 'https://opstinaisg.net/dokumenti/',
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
    forms_url: 'https://foca.rs.ba/usluge/obrasci/',
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
    forms_url: 'https://cajnice.rs.ba/dokumenti/',
    document_categories: ['Matične knjige', 'Opšta uprava', 'Građanska stanja'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
    komentar: 'Obrazac za naknadni upis u matične knjige',
  },
  {
    municipality_name: 'Rudo',
    region: 'Regija Foča / Drina',
    entity: 'RS',
    official_domain: 'opstinarudo.com',
    forms_url: 'https://opstinarudo.com/gradjevinske-dozvole/',
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
    forms_url: 'https://novogorazde.net/dokumenti/',
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
    forms_url: 'https://hanpijesak.org/dokumenti/',
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
    official_domain: 'rogatica.ba',
    forms_url: 'https://rogatica.ba/dokumenti/obrasci/',
    document_categories: ['Upotrebna dozvola', 'Komunalne takse', 'Urbanizam', 'Matični uredi'],
    status: 'active',
    secure: true,
    physical_presence_required: false,
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
  forms_url: string;
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
    forms_url: 'https://www.zzozedo.ba/index.php/layout/class-layout/obrasci',
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
    forms_url: 'https://zzohnk.ba/obrasci/',
    document_categories: ['Zdravstveno osiguranje', 'Ortopedska pomagala', 'Refundacija'],
    status: 'active',
  },
  // USK
  {
    institution_name: 'ZZO USK',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    official_domain: 'zzousk.ba',
    forms_url: 'https://zzousk.ba/obrasci/',
    document_categories: ['Refundacija', 'Prijava na osiguranje', 'Ortopedska pomagala'],
    status: 'active',
  },
  // SBK
  {
    institution_name: 'ZZO SBK',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    official_domain: 'zzosbk.ba',
    forms_url: 'https://zzosbk.ba/obrasci/',
    document_categories: ['Zdravstveno osiguranje', 'Refundacija', 'Ortopedska pomagala'],
    status: 'active',
  },
  // PK
  {
    institution_name: 'ZZO PK',
    canton: 'Posavski kanton (PK)',
    entity: 'FBiH',
    official_domain: 'zzopk.ba',
    forms_url: 'https://zzopk.ba/obrasci/',
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