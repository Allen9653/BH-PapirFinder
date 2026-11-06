// Complete BiH Municipalities Database
// Data extracted from official government sources

import { kalesijaGuidanceLinks } from './kalesija-forms';
import { grudeForms, grudeGuidanceLinks, GRUDE_FORMS_PORTAL_URL, GRUDE_OFFICIAL_URL } from './grude-forms';
import {
  GORNJI_VAKUF_ECITIZEN_URL,
  GORNJI_VAKUF_E_MATICAR_URL,
  GORNJI_VAKUF_OFFICIAL_URL,
} from './gornji-vakuf-forms';

export interface MunicipalityData {
  id: string;
  name: string;
  canton?: string;
  region?: string;
  entity: 'FBiH' | 'RS' | 'BD';
  searchAliases?: string[];
  urls: {
    main?: string;
    forms?: string;
    description: string;
  }[];
  guidanceLinks?: {
    label: string;
    url: string;
  }[];
  address?: string;
  taxId?: string;
  treasuryAccount?: string;
  email?: string;
  phone?: string;
  workingHours?: string;
  categories: string[];
  komentar?: string;
}

export const municipalitiesDatabase: MunicipalityData[] = [
  // ========== FEDERACIJA BiH ==========
  
  // KANTON SARAJEVO (KS)
  {
    id: 'ks-stari-grad',
    name: 'Stari Grad Sarajevo',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://starigrad.ba/',
        description: 'Službeni portal Općine Stari Grad Sarajevo'
      },
      {
        forms: 'https://starigrad.ba/e-formulari/',
        description: 'e-Formulari Općine Stari Grad Sarajevo'
      },
      {
        main: 'https://starigrad.ba/javni-pozivi-konkursi-i-oglasi/',
        description: 'Javni pozivi, konkursi i oglasi'
      },
      {
        main: 'https://starigrad.ba/baza-podataka-nvo/',
        description: 'Baza podataka nevladinih organizacija'
      }
    ],
    categories: ['Matični uredi', 'E-uprava', 'Uvjerenja', 'Građanska stanja'],
    komentar: 'Zahtjev za izvod iz matične knjige rođenih/vjenčanih/umrlih'
  },
  {
    id: 'ks-centar',
    name: 'Centar Sarajevo',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://www.centar.ba/',
        description: 'Službeni portal Općine Centar Sarajevo'
      },
      {
        forms: 'https://www.centar.ba/e-uprava/elektronski-formulari',
        description: 'Elektronski formulari i dokumenti Općine Centar Sarajevo'
      }
    ],
    categories: ['E-Matičar', 'Inspekcijski obrasci', 'Poljoprivreda i podsticaji', 'Komunalni obrasci', 'Urbanizam i javni prihodi'],
    komentar: 'E-Matičar omogućava online podnošenje zahtjeva i plaćanje karticom; elektronski formulari dostupni su na službenoj stranici Općine.'
  },
  {
    id: 'ks-ilidza',
    name: 'Ilidža',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    urls: [
      
      {
        main: 'https://opcinailidza.ba/',
        description: 'Službeni portal Općine Ilidža'
      },
      {
        forms: 'https://opcinailidza.ba/e-formulari/',
        description: 'e-Formulari Općine Ilidža'
      }
    ],
    categories: ['Urbanizam', 'Lokacijska informacija', 'Matični uredi', 'Uvjerenja'],
    komentar: 'Zahtjev za izdavanje lokacijske informacije i urbanističkih uslova'
  },
  {
    id: 'ks-novi-grad',
    name: 'Novi Grad Sarajevo',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    urls: [
      
      {
        main: 'https://novigradsarajevo.ba/',
        description: 'Službeni portal Općine Novi Grad Sarajevo'
      },
      {
          forms: 'https://novigradsarajevo.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Socijalna zaštita', 'Matični uredi', 'E-uprava', 'Prijemni obrasci'],
    komentar: 'Zahtjev za jednokratnu novčanu pomoć / Prijemni obrasci'
  },
  {
    id: 'ks-novo-sarajevo',
    name: 'Novo Sarajevo',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    urls: [
      
      {
        main: 'https://novosarajevo.ba/',
        description: 'Službeni portal Općine Novo Sarajevo'
      },
      {
          forms: 'https://novosarajevo.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Ovjere i prepisi', 'Urbanizam', 'Matični uredi', 'Uvjerenja'],
    komentar: 'Zahtjev za ovjeru potpisa, rukopisa i prepisa'
  },
  {
    id: 'ks-vogosca',
    name: 'Vogošća',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://vogosca.ba/',
        description: 'Službena web-stranica Općine Vogošća'
      },
      {
        forms: 'https://vogosca.ba/obrasci',
        description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Građanska stanja', 'Naknade porodiljama', 'E-uprava', 'Matični uredi'],
    komentar: 'Zahtjev za naknadu porodiljama / Građanska stanja'
  },
  {
    id: 'ks-hadzici',
    name: 'Hadžići',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://hadzici.ba/',
        description: 'Službeni portal Općine Hadžići'
      },
      {
          forms: 'https://hadzici.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Matični uredi', 'Građanska stanja'],
    komentar: 'Zahtjev za izdavanje izvoda iz matičnih knjiga'
  },
  {
    id: 'ks-trnovo-fbih',
    name: 'Trnovo (FBiH)',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    urls: [
      
      {
        main: 'https://trnovo.ba/',
        description: 'Službeni portal Općine Trnovo FBiH'
      },
      {
          forms: 'https://trnovo.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam i građenje', 'Komunalni priključak', 'Matični uredi'],
    komentar: 'Zahtjev za odobrenje građenja i priključak'
  },
  {
    id: 'ks-ilijas',
    name: 'Ilijaš',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://ilijas.ba/index.php/e-uprava',
        forms: 'https://ilijas.ba/usluge/',
        description: 'Zahtjev za utvrđivanje prava na dopunske oblike zaštite'
      },
      {
        main: 'https://ilijas.ba/',
        description: 'Službeni portal Općine Ilijaš'
      }
    ],
    guidanceLinks: [
      { label: 'eCitizen – Općina Ilijaš', url: 'https://ecitizen.ba/ilijas/home' },
      { label: 'eRegistar Općine Ilijaš', url: 'https://eregistar.ilijas.ba/' }
    ],
    categories: ['Boračko-invalidska zaštita', 'Socijalna zaštita', 'E-uprava'],
    komentar: 'Zahtjev za utvrđivanje prava na dopunske oblike zaštite'
  },
  {
    id: 'grad-sarajevo',
    name: 'Grad Sarajevo',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://www.sarajevo.ba/bs/category/145/1',
        description: 'Obrasci – zahtjev za uvjerenja, urbanistička saglasnost, lokacijska informacija'
      },
      {
        main: 'https://www.sarajevo.ba/',
        description: 'Zvanični portal Grada Sarajeva'
      },
      {
          forms: 'https://www.sarajevo.ba/bs/category/145/1/e-uprava',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja', 'Lokacijska informacija'],
    komentar: 'Glavni grad - sveobuhvatni obrasci'
  },

  // Vlada Kantona Sarajevo (KS) — kantonalni nivo
  {
    id: 'ks-vlada',
    name: 'Vlada Kantona Sarajevo',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://vlada.ks.gov.ba/',
        description: 'Službena web-stranica Vlade Kantona Sarajevo'
      },
      {
        main: 'https://mf.ks.gov.ba/preuzimanja/zahtjevi-i-obrasci',
        forms: 'https://mf.ks.gov.ba/preuzimanja/zahtjevi-i-obrasci',
        description: 'Zahtjevi i obrasci Ministarstva finansija KS — praćenje realizacije ugovora, unos neplaniranih sredstava i drugi obrasci'
      }
    ],
    categories: ['Ministarstvo finansija', 'Ministarstvo kulture i sporta', 'Ministarstvo privrede', 'Ministarstvo saobraćaja', 'Ministarstvo unutrašnjih poslova', 'Ministarstvo za boračka pitanja', 'Ministarstvo zdravstva', 'Besplatna pravna pomoć', 'Inspekcijski poslovi'],
    komentar: 'Zahtjevi i obrasci Vlade KS dostupni su preko Ministarstva finansija (mf.ks.gov.ba) i nadležnih ministarstava, te Zavoda za besplatnu pravnu pomoć i Kantonalne uprave za inspekcijske poslove.'
  },

  // BOSANSKO-PODRINJSKI KANTON (BPK GORAŽDE)
  {
    id: 'bpk-gorazde',
    name: 'Grad Goražde',
    canton: 'Bosansko-podrinjski kanton (BPK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://gorazde.ba/',
        description: 'Službena web-stranica Grada Goražde',
        forms: 'https://gorazde.ba/gradska-uprava/'
      },
      {
        main: 'https://gorazde.ba/sluzba-za-prostorno-uredjenje-stambeno-komunalne-poslove-i-raseljena-lica-elektronski-obrasci/',
        forms: 'https://gorazde.ba/sluzba-za-finansije-trezor-i-privredu-elektronski-obrasci/',
        description: 'Elektronski obrasci Službe za prostorno uređenje, stambeno-komunalne poslove i raseljena lica'
      },
      {
        main: 'https://gorazde.ba/sluzba-za-inspekcijske-poslove-elektronski-obrasci/',
        description: 'Elektronski obrasci Službe za inspekcijske poslove'
      },
      {
        main: 'https://gorazde.ba/sluzba-za-geodetske-imovinsko-pravne-poslove-i-katastar-nekretnina/',
        description: 'Služba za geodetske, imovinsko-pravne poslove i katastar nekretnina'
      },
      {
        main: 'https://gorazde.ba/sluzba-za-finansije-trezor-i-privredu-elektronski-obrasci/',
        description: 'Služba za finansije, trezor i privredu - registracija obrta i podsticaji'
      },
      {
        main: 'https://gorazde.ba/sluzba-za-boracko-invalidsku-i-socijalnu-zastitu-elektronski-obrasci/',
        description: 'Služba za boračko-invalidsku i socijalnu zaštitu - dopunska prava boraca'
      },
      {
        main: 'https://gorazde.ba/sluzba-za-civilnu-zastitu-i-mjesne-zajednice-elektronski-obrasci/',
        description: 'Služba za civilnu zaštitu i mjesne zajednice'
      },
      {
        main: 'https://gorazde.ba/',
        description: 'Službeni portal Grada Goražda'
      }
    ],
    categories: ['Urbanizam i građenje', 'Inspekcijski poslovi', 'Katastar i nekretnine', 'Finansije i privreda', 'Boračka i socijalna zaštita'],
    komentar: 'Zahtjev za urbanističku saglasnost, inspekcijski nadzor, katastar i privreda'
  },
  {
    id: 'bpk-pale-praca',
    name: 'Pale-Prača',
    canton: 'Bosansko-podrinjski kanton (BPK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'http://praca.ba/',
        forms: 'http://praca.ba/',
        description: 'Zahtjevi i obrasci općinske službe'
      }
    ],
    categories: ['Opća uprava', 'Matični uredi', 'Uvjerenja'],
    komentar: 'Zahtjevi i obrasci općinske službe — stari HTTPS domen blokira upite, koristi se HTTP verziju'
  },
  {
    id: 'bpk-foca-ustikolina',
    name: 'Foča-Ustikolina',
    canton: 'Bosansko-podrinjski kanton (BPK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://foca-ustikolina.ba/',
        forms: 'https://foca-ustikolina.ba/wp-content/uploads/2022/10/ZAHTJEV_urbanistickaSaglasnost.pdf',
        description: 'Direktni PDF obrasci za urbanizam, vodne saglasnosti, javne površine i druge upravne postupke'
      },
      {
        main: 'https://foca-ustikolina.ba/',
        description: 'Službena stranica Općine Foča-Ustikolina'
      }
    ],
    categories: ['Urbanizam', 'Vodoprivreda', 'Komunalne takse', 'Socijalna zaštita', 'Civilna zaštita'],
    komentar: 'Direktni obrasci i službeni dokumenti Općine Foča-Ustikolina'
  },

  // ZENIČKO-DOBOJSKI KANTON (ZDK)
  {
    id: 'zdk-zenica',
    name: 'Zenica',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    urls: [
      
      {
        main: 'https://zenica.ba/e-registar-administrativnih-postupaka/',
        description: 'E-registar Administrativnih postupaka'
      },
      {
        main: 'https://zenica.ba/e-maticar/',
        forms: 'https://zenica.ba/e-maticar/',
        description: 'E-Matičar Grada Zenice'
      },
      {
        main: 'https://zenica.ba/#e-servisi',
        description: 'E-servisi Grada Zenice'
      }
    ],
    categories: ['Zdravstvo', 'E-uprava', 'Administrativni postupci'],
    komentar: 'Digitalizovani sistem sa e-servisom'
  },
  {
    id: 'zdk-doboj-jug',
    name: 'Doboj-Jug',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://dobojjug.ba/',
        forms: 'https://dobojjug.ba/pristup-informacijama/',
        description: 'Službena stranica i obrasci za pristup informacijama Općine Doboj-Jug'
      }
    ],
    categories: ['Pristup informacijama'],
    komentar: 'Službena stranica Općine Doboj-Jug i obrazac za pristup informacijama'
  },
  {
    id: 'zdk-kakanj',
    name: 'Općina Kakanj',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://kakanj.gov.ba/v5/e-obrasci/',
        forms: 'https://kakanj.gov.ba/v5/e-obrasci/',
        description: 'Službena stranica sa e-obrazcima Općine Kakanj — urbanizam, privreda, obrt, tehnički uslovi, ugostiteljstvo'
      },
      {
        main: 'http://kakanj.gov.ba/v4/wp-content/uploads/2017/03/ZAHTJEV-ZA-PROMJENU-INVESTITORA-OK-O-4.2.-38.pdf',
        description: 'Zahtjev za promjenu investitora (OK-O-4.2.-38)'
      },
      {
        main: 'http://kakanj.gov.ba/v4/wp-content/uploads/2014/08/Zahtjev-za-izdavanje-odobrenja-za-obavljanje-djelatnosti-tehni%C4%8Dki-uslovi-PRAVNA-LICA.pdf',
        description: 'Zahtjev za izdavanje odobrenja za obavljanje djelatnosti (tehnički uslovi) - Pravna lica'
      },
      {
        main: 'http://kakanj.gov.ba/v4/wp-content/uploads/2014/08/Zahtjev-za-izdavanje-odobrenja-za-obavljanje-djelatnosti-tehni%C4%8Dki-uslovi-FIZI%C4%8CKA-LICA-.pdf',
        description: 'Zahtjev za izdavanje odobrenja za obavljanje djelatnosti (tehnički uslovi) - Fizička lica'
      },
      {
        main: 'https://kakanj.gov.ba/v5/wp-content/uploads/2023/08/Zahtjev-za-osnivanje-obrta-srodne-djelatnost-1.pdf',
        description: 'Zahtjev za osnivanje obrta i srodne djelatnosti'
      },
      {
        main: 'http://kakanj.gov.ba/v4/isoobrasci/OBRASCI-SLU%8eBA%20ZA%20PRIVREDU,URBANIZAM%20I%20ZA%8aTITU%20OKOLINE/Zahtjev_za_izdavanje_odobrenja_o_osnivanju_ugostiteljske_radnje.pdf',
        description: 'Zahtjev za izdavanje odobrenja o osnivanju ugostiteljske radnje'
      },
      {
        main: 'http://kakanj.gov.ba/v4/isoobrasci/OBRASCI-SLU%8eBA%20ZA%20PRIVREDU,URBANIZAM%20I%20ZA%8aTITU%20OKOLINE/Zahtjev_za_izmjenu_rje%9aenja_o_osnivanju_radnje_ili_obavljanju_djelatnosti.pdf',
        description: 'Zahtjev za izmjenu rješenja o osnivanju radnje ili obavljanju djelatnosti'
      },
      {
        main: 'https://kakanj.gov.ba/',
        description: 'Službena web stranica Općine Kakanj'
      }
    ],
    categories: ['Urbanizam i građenje', 'Privreda i poslovanje', 'Privreda i obrt', 'Ugostiteljstvo', 'Samostalna djelatnost'],
    komentar: 'Službeni repozitorij elektronskih obrazaca Općine Kakanj: https://kakanj.gov.ba/v5/e-obrasci/'
  },
  {
    id: 'zdk-maglaj',
    name: 'Maglaj',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://www.maglaj.ba/',
        description: 'Službena web-stranica Općine Maglaj'
      },
      {
        forms: 'https://maglaj.ba/usluge/',
        description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Zdravstvo'],
    komentar: 'Zdravstveni obrasci ZZO ZDK'
  },
  {
    id: 'zdk-zepce',
    name: 'Žepče',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://zepce.ba/',
        description: 'Službena web-stranica Općine Žepče'
      },
      {
        forms: 'https://zepce.ba/obrasci',
        description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Zdravstvo'],
    komentar: 'Zdravstveni obrasci ZZO ZDK'
  },
  {
    id: 'zdk-tesanj',
    name: 'Tešanj',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    urls: [
      {
          main: 'https://opcina-tesanj.ba/',
          description: 'Službena web-stranica Tešanj',
        },
      {
          forms: 'https://opcina-tesanj.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Zdravstvo'],
    komentar: 'Zdravstveni obrasci ZZO ZDK'
  },
  {
    id: 'zdk-olovo',
    name: 'Olovo',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://olovo.gov.ba/?lsvrdocumentcat=elektronski-formulari',
        description: '71 elektronski formular — uvjerenja, urbanizam, građevinske dozvole, lokacijska informacija, samostalne djelatnosti, javni prijevoz, ugostiteljstvo'
      },
      {
          forms: 'https://olovo.gov.ba/?lsvrdocumentcat=elektronski-formulari/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Uvjerenja', 'Urbanizam', 'Građevinske dozvole', 'Lokacijska informacija', 'Samostalna djelatnost', 'Javni prijevoz', 'Ugostiteljstvo', 'Socijalna zaštita', 'Imovinsko-pravni', 'Katastar'],
    komentar: 'Najkompletnija općina u ZDK — 71 obrazac dostupan online u PDF formatu'
  },
  {
    id: 'grad-zenica',
    name: 'Grad Zenica',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://zenica.ba/e-registar-administrativnih-postupaka/',
        forms: 'https://zenica.ba/e-registar-administrativnih-postupaka/',
        description: 'E-registar administrativnih postupaka Grada Zenice'
      },
      {
        main: 'https://zenica.ba/e-maticar/',
        forms: 'https://zenica.ba/e-maticar/',
        description: 'E-Matičar Grada Zenice'
      },
      {
        main: 'https://zenica.ba/#e-servisi',
        description: 'E-servisi Grada Zenice'
      }
    ],
    categories: ['Urbanizam', 'Matični uredi', 'Uvjerenja', 'E-uprava'],
    komentar: 'Administrativni postupci, e-Matičar i e-servisi Grada Zenice'
  },

  // TUZLANSKI KANTON (TK)
  {
    id: 'grad-tuzla',
    name: 'Grad Tuzla',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://grad.tuzla.ba/',
        description: 'Službena web-stranica Grada Tuzla'
      },
      {
        main: 'https://www.ecitizen.ba/tuzla/home',
        forms: 'https://www.ecitizen.ba/tuzla/eServices',
        description: 'eCitizen – elektronske usluge Grada Tuzla'
      }
    ],
    guidanceLinks: [
      { label: 'ePortal – praćenje predmeta', url: 'https://eportal.tuzla.ba/Predmet' },
      { label: 'e-Matičar Grada Tuzle', url: 'https://grad.tuzla.ba/e-maticar/' },
      { label: 'e-Grunt', url: 'https://www.e-grunt.ba/' }
    ],
    categories: ['Opća uprava', 'Matični uredi', 'Uvjerenja'],
    komentar: 'Obrasci – zahtjev za uvjerenja, urbanizam, prijava boravka'
  },
  {
    id: 'tk-kalesija',
    name: 'Kalesija',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://kalesija.ba/usluge/',
        forms: 'https://kalesija.ba/usluge/',
        description: 'Usluge i obrasci Općine Kalesija'
      },
          ],
    guidanceLinks: kalesijaGuidanceLinks,
    categories: ['E-formulari', 'Matični uredi', 'Urbanizam', 'Zdravstvo'],
    komentar: 'Službena stranica s uslugama i obrascima; dostupno 10 obrazaca, uključujući matične i poljoprivredne obrasce.'
  },
  {
    id: 'tk-banovici',
    name: 'Banovići',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://banovici.gov.ba/zahtjevi/',
        forms: 'https://banovici.gov.ba/zahtjevi/',
        description: 'Zahtjevi i obrasci Općine Banovići'
      },
      {
        main: 'https://banovici.gov.ba/',
        description: 'Službena stranica Općine Banovići'
      }
    ],
    categories: ['Katastar', 'Urbanizam', 'Poljoprivreda', 'Matični uredi', 'Civilna zaštita', 'Uvjerenja'],
    komentar: 'Službena stranica s više od 77 zahtjeva za katastar, urbanizam, poljoprivredu, matične knjige i civilnu zaštitu.'
  },
  {
    id: 'tk-celic',
    name: 'Čelić',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://opcinacelic.ba/',
        forms: 'https://opcinacelic.ba/file/prijavni-obrazac-za-vjerske-zajednice-i-crkve/1117',
        description: 'Službena web-stranica Općine Čelić'
      },
      {
        main: 'https://opcinacelic.ba/file/odluka-o-uslovima-i-nacinu-za-ostvarivanje-prava-na-jednokratnu-novcanu-pomoc-majci-porodilji-novorodenog-djeteta/10',
        description: 'Odluka o uslovima i načinu za ostvarivanje prava na jednokratnu novčanu pomoć majci porodilji novorođenog djeteta'
      }
    ],
    guidanceLinks: [
      { label: 'Prijavni obrazac za vjerske zajednice i crkve', url: 'https://opcinacelic.ba/file/prijavni-obrazac-za-vjerske-zajednice-i-crkve/1117' },
      { label: 'Odluka o jednokratnoj novčanoj pomoći majci porodilji novorođenog djeteta', url: 'https://opcinacelic.ba/file/odluka-o-uslovima-i-nacinu-za-ostvarivanje-prava-na-jednokratnu-novcanu-pomoc-majci-porodilji-novorodenog-djeteta/10' }
    ],
    categories: ['Službeni glasnici', 'Upiti i dostava obrazaca'],
    komentar: 'Za razliku od pojedinih općina u BiH koje imaju potpuno integrisan sistem e-Matićara za naručivanje i dostavu izvoda na kućnu adresu (poput Općine Centar Sarajevo), web stranica Općine Čelić funkcioniše kao informativni portal i repozitorij dokumenata. Ukoliko trebate izvršiti ove prijave ili dobiti izvode u Općini Čelić, postupak je sljedeći: 1. Lični dolazak: sve prijave i preuzimanje izvoda (rodni list, vjencani list, umrli list) obavljaju se direktno u prostorijama općine. 2. Matični uredi: pored centralnog ureda u Čeliću, općina ima i područne matične urede. Možete ih kontaktirati telefonom za provjeru potrebne dokumentacije prije dolaska: Matični ured Čelić: +387 (0)35 668-680, Matični ured Vrašići: +387 (0)35 668-681, Matični ured Šibošnica: +387 (0)35 668-682, Matični ured Humci: +387 (0)35 668-683.'
  },
  {
    id: 'tk-doboj-istok',
    name: 'Doboj Istok',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://opcinadobojistok.ba/',
        forms: 'https://opcinadobojistok.ba/formulari-sluzbe-za-poduzetnistvo/',
        description: 'Službena stranica, e-uprava i obrasci za poduzetništvo; dostupni su i brojni DOC obrasci'
      }
    ],
    guidanceLinks: [
      {
        label: 'Biografija općinskog načelnika',
        url: 'https://opcinadobojistok.ba/opcina/opcinski-nacelnik/biografija/'
      },
      {
        label: 'Program rada općinskog načelnika',
        url: 'https://opcinadobojistok.ba/opcina/opcinski-nacelnik/program-rada/'
      },
      {
        label: 'Izvještaj o radu općinskog načelnika',
        url: 'https://opcinadobojistok.ba/opcina/opcinski-nacelnik/izvjestaj-o-radu/'
      },
      {
        label: 'Općinski vijećnici',
        url: 'https://opcinadobojistok.ba/opcina/opcinsko-vijece/opcinski-vijecnici/'
      },
      {
        label: 'Poslovnik o radu Općinskog vijeća',
        url: 'https://opcinadobojistok.ba/opcina/opcinsko-vijece/poslovnik-o-radu/'
      },
      {
        label: 'Program rada Općinskog vijeća',
        url: 'https://opcinadobojistok.ba/opcina/opcinsko-vijece/program-rada/'
      },
      {
        label: 'Dokumenti Općinskog vijeća',
        url: 'https://opcinadobojistok.ba/opcina/opcinsko-vijece/dokumenti-ov/'
      },
      {
        label: 'Služba za finansije i poduzetništvo',
        url: 'https://opcinadobojistok.ba/opcina/opcinske-sluzbe/finansije-i-poduzetnistvo/'
      },
      {
        label: 'Služba za prostorno uređenje',
        url: 'https://opcinadobojistok.ba/opcina/opcinske-sluzbe/prostorno-uredjenje/'
      },
      {
        label: 'Služba za društvene djelatnosti',
        url: 'https://opcinadobojistok.ba/opcina/opcinske-sluzbe/drustvene-djelatnosti/'
      },
      {
        label: 'Služba civilne zaštite',
        url: 'https://opcinadobojistok.ba/opcina/opcinske-sluzbe/civilna-zastita/'
      },
      {
        label: 'Elektronska oglasna tabla',
        url: 'https://opcinadobojistok.ba/elektronska-oglasna-tabla/'
      },
      {
        label: 'Kontakt Općine Doboj Istok',
        url: 'https://opcinadobojistok.ba/kontakt/'
      }
    ],
    categories: ['Administrativni postupci', 'Privreda i poduzetništvo', 'Poljoprivreda', 'Saobraćaj', 'Vodoprivreda'],
    komentar: 'Obrasci i elektronske usluge Općine Doboj Istok'
  },
  {
    id: 'tk-gracanica',
    name: 'Gračanica',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://gracanica.gov.ba/',
        description: 'Službena web-stranica Grada Gračanica'
      },
      {
        main: 'https://gracanica.gov.ba/dokumenti/e-obrasci/',
        forms: 'https://gracanica.gov.ba/dokumenti/e-obrasci/',
        description: 'Službeni e-obrasci Grada Gračanica'
      },
      {
        main: 'https://www.ecitizen.ba/gracanica/home',
        description: 'eCitizen – elektronske usluge Grada Gračanica'
      },
      {
        main: 'https://gracanica.gov.ba/dijaspora-gracanice/',
        description: 'Informacije za dijasporu Grada Gračanica'
      }
    ],
    guidanceLinks: [
      { label: 'eCitizen – elektronske usluge', url: 'https://www.ecitizen.ba/gracanica/home' },
      { label: 'Informacije za dijasporu', url: 'https://gracanica.gov.ba/dijaspora-gracanice/' }
    ],
    categories: ['Urbanizam', 'Lokacijska informacija'],
    komentar: 'Urbanistički obrasci i lokacijske informacije'
  },
  {
    id: 'tk-gradacac',
    name: 'Gradačac',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://gradacac.ba/',
        description: 'Službena web-stranica Grada Gradačac'
      },
      {
        main: 'https://esalter.gradacac.ba/',
        forms: 'https://esalter.gradacac.ba/',
        description: 'eŠalter Grada Gradačac'
      },
      {
        forms: 'https://gradacac.ba/dokumenti/',
        description: 'Dokumenti i obrasci Grada Gradačac'
      }
    ],
    guidanceLinks: [
      { label: 'eStipendije Grada Gradačac', url: 'https://gradacac.ba/vijesti/obrasci' },
      { label: 'eCitizen – Grad Gradačac', url: 'https://ecitizen.ba/gradacac/home' },
      { label: 'Pristup podacima iz CIPS baze', url: 'https://gradacac.ba/aktuelnosti/clanak/pristup-podacima-iz-cips-baze' }
    ],
    categories: ['Matični uredi', 'Uvjerenja', 'Urbanizam'],
    komentar: 'Izvodi, uvjerenja i lokacijske informacije'
  },
  {
    id: 'tk-kladanj',
    name: 'Kladanj',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://kladanj.ba/',
        description: 'Službena web-stranica Općine Kladanj — matični ured (rodni/vjenčani/umrli list, uvjerenje o državljanstvu podnosi se lično u Šalter sali ili poštom za dijasporu), poticaji i stipendije u sekciji Zvanična obavještenja i konkursi, finansijski dokumenti građana u sekciji Izvršenje ugovora. Predaja: Šalter sala (prizemlje), Kladanjske brigade br. 2, 75280 Kladanj, uz dokaz o uplati općinske takse.'
      },
      {
          forms: 'https://kladanj.ba/dokumenti/',
          description: 'Dokumenti i javni pozivi Općine Kladanj'
      }
    ],
    address: 'Kladanjske brigade br. 2, 75280 Kladanj',
    categories: ['Matični uredi', 'Poticaji', 'Javni pozivi', 'Urbanizam', 'Privreda', 'Boračko-invalidska zaštita', 'Imovinsko-pravni odnosi'],
    komentar: 'Općina koristi sistem fizičke šalter sale za predaju zahtjeva, dok se obrasci za matični ured, poticaje i javne pozive preuzimaju direktno kroz sekcije zvanične općinske stranice. Adresa protokola: Kladanjske brigade br. 2, 75280 Kladanj.'
  },
  {
    id: 'tk-lukavac',
    name: 'Lukavac',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://lukavac.ba/',
        description: 'Službena web-stranica Općine Lukavac'
      },
      {
        forms: 'https://lukavac.ba/dokumenti/',
        description: 'e-Obrasci Općine Lukavac'
      }
    ],
    categories: ['Uvjerenja', 'Urbanizam'],
    komentar: 'Uvjerenja i urbanistički obrasci'
  },
  {
    id: 'tk-sapna',
    name: 'Sapna',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
          main: 'http://www.opcinasapna.ba/',
          description: 'Službena web-stranica Sapna',
        },
      {
          forms: 'http://www.opcinasapna.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Uvjerenja', 'Urbanizam'],
    komentar: 'Uvjerenja i urbanistička dokumentacija'
  },
  {
    id: 'tk-srebrenik',
    name: 'Srebrenik',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://www.srebrenik.ba/',
        description: 'Službena web-stranica Općine Srebrenik'
      },
      {
        forms: 'https://www.srebrenik.ba/e-uprava/',
        description: 'e-Uprava i obrasci po nadležnim službama: prostorno uređenje i zaštita okoliša, civilna zaštita, boračko-invalidska zaštita i društvene djelatnosti, opća uprava i zajednički poslovi, poduzetništvo i lokalni razvoj, finansije i inspekcijski nadzor, geodetski i imovinsko-pravni poslovi, interna revizija'
      }
    ],
    categories: ['Prostorno uređenje', 'Civilna zaštita', 'Boračko-invalidska zaštita', 'Opća uprava', 'Poduzetništvo', 'Finansije', 'Katastar', 'Interna revizija'],
    komentar: 'e-Uprava s obrascima Službe za prostorno uređenje i zaštitu okolice, civilnu zaštitu, boračko-invalidsku zaštitu i društvene djelatnosti, opću upravu, poduzetništvo, finansije i inspekcijski nadzor, geodetske i imovinsko-pravne poslove te internu reviziju.'
  },
  {
    id: 'tk-teocak',
    name: 'Teočak',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
          main: 'https://teocak.gov.ba/',
          description: 'Službena web-stranica Teočak',
        },
      {
          forms: 'https://teocak.gov.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Uvjerenja', 'Zahtjevi građana'],
    komentar: 'Zahtjevi građana i uvjerenja'
  },

  // UNSKO-SANSKI KANTON (USK)
  {
    id: 'grad-bihac',
    name: 'Grad Bihać',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://www.bihac.org/dokumenti/21',
        description: 'Obrasci i zahtjevi, izjave, prijave – razni obrasci za urbanizam, matične knjige, uvjerenja, lokacijske informacije'
      },
      {
          forms: 'https://www.bihac.org/dokumenti/21/e-uprava',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Matični uredi', 'Uvjerenja', 'Lokacijska informacija'],
    komentar: 'Obrasci – urbanistička saglasnost, izdavanje uvjerenja'
  },
  {
    id: 'usk-bosanska-krupa',
    name: 'Bosanska Krupa',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://gradbosanskakrupa.ba/',
        description: 'Službena stranica Grada Bosanska Krupa'
      },
      {
        main: 'https://www.ecitizen.ba/bosanska_krupa/eServices',
        description: 'Online popunjavanje i podnošenje formulara putem eCitizen platforme'
      },
      {
          forms: 'https://gradbosanskakrupa.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Vodiči i zahtjevi', 'Online formulari'],
    komentar: 'Online popunjavanje i podnošenje formulara dostupno je putem eCitizen platforme.'
  },
  {
    id: 'usk-buzim',
    name: 'Bužim',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://opcinabuzim.ba/',
        description: 'Službena stranica Općine Bužim'
      },
      {
          forms: 'https://opcinabuzim.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    guidanceLinks: [
      {
        label: 'Služba za prostorno uređenje, geodetske i imovinsko-pravne poslove',
        url: 'https://opcinabuzim.ba/opcina/sluzba-za-prostorno-uredenje-geodetske-i-imovinsko-pravne-poslove/'
      },
      {
        label: 'Služba za budžet i finansije',
        url: 'https://opcinabuzim.ba/opcina/sluzba-za-budzet-i-finansije/'
      },
      {
        label: 'Služba za razvoj i poduzetništvo',
        url: 'https://opcinabuzim.ba/opcina/sluzba-za-razvoj-i-poduzetnistvo/'
      },
      {
        label: 'Služba za opću upravu i društvene djelatnosti',
        url: 'https://opcinabuzim.ba/opcina/sluzba-za-opcu-upravu-i-drustvene-djelatnosti/'
      },
      {
        label: 'Služba za civilnu zaštitu',
        url: 'https://opcinabuzim.ba/opcina/sluzba-za-civilnu-zastitu/'
      }
    ],
    categories: ['Upute za obrasce', 'Prostorno uređenje', 'Budžet i finansije', 'Razvoj i poduzetništvo', 'Opća uprava', 'Civilna zaštita'],
    komentar: 'Općina Bužim ne nudi online obrasce i formulare. Upute i informacije dostupne su na stranicama nadležnih službi.'
  },
  {
    id: 'usk-cazin',
    name: 'Cazin',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://gradcazin.gov.ba/',
        description: 'Službena stranica Grada Cazina'
      },
      {
        forms: 'https://gradcazin.gov.ba/dokumenti',
        description: 'Službena arhiva dokumenata Grada Cazina, uključujući obrasce i javne nabavke'
      }
    ],
    categories: ['Dokumenti', 'Javne nabavke', 'Obrasci', 'Službene novine'],
    komentar: 'Službena arhiva dokumenata sadrži obrasce, javne nabavke i druge objave. Dostupan je i odabrani katalog javnih nabavki iz 2021–2023.'
  },
  {
    id: 'usk-kljuc',
    name: 'Ključ',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://opcina-kljuc.ba/',
        description: 'Službena web-stranica Općine Ključ'
      },
      {
        forms: 'https://kljuc.ba/dokumenti/',
        description: 'eCitizen – dostupni dokumenti i elektronske usluge Općine Ključ'
      }
    ],
    categories: ['E-uprava', 'Dokumenti'],
    komentar: 'Dokumenti su dostupni putem eCitizen portala i podržavaju radnje koje portal nudi, uključujući uređivanje, dijeljenje, kopiranje, preuzimanje i spremanje.'
  },
  {
    id: 'usk-sanski-most',
    name: 'Sanski Most',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    urls: [
      {
          main: 'https://sanskimost.gov.ba/',
          description: 'Službena web-stranica Sanski Most',
        },
      {
          forms: 'https://sanskimost.gov.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Matični uredi', 'Urbanizam'],
    komentar: 'Matični uredi i urbanizam'
  },
  {
    id: 'usk-velika-kladusa',
    name: 'Velika Kladuša',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://velikakladusa.gov.ba/e-obrasci/',
        description: 'Obrasci – urbanistička saglasnost, zahtjev za izdavanje uvjerenja, matični uredi'
      },
      {
          forms: 'https://velikakladusa.gov.ba/e-obrasci/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja', 'Matični uredi'],
    komentar: 'Urbanistička saglasnost i matični uredi'
  },

  // SREDNJOBOSANSKI KANTON (SBK)
  {
    id: 'sbk-travnik',
    name: 'Travnik',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    urls: [
      {
          main: 'https://www.opcinatravnik.com.ba/',
          description: 'Službena web-stranica Travnik',
        },
      {
          forms: 'https://www.opcinatravnik.com.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja'],
    komentar: 'Urbanistička saglasnost i uvjerenja'
  },
  {
    id: 'sbk-bugojno',
    name: 'Bugojno',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://opcina-bugojno.ba/',
        forms: 'https://opcina-bugojno.ba/e-formulari/',
        description: 'Obrasci – urbanizam, građevinske dozvole, matični uredi'
      }
    ],
    categories: ['E-obrasci', 'Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    komentar: 'Urbanizam i građevinske dozvole'
  },
  {
    id: 'sbk-gornji-vakuf',
    name: 'Gornji Vakuf-Uskoplje',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    urls: [
      {
        main: GORNJI_VAKUF_OFFICIAL_URL,
        description: 'Službena web-stranica Općine Gornji Vakuf-Uskoplje'
      },
      {
        main: GORNJI_VAKUF_E_MATICAR_URL,
        forms: 'https://opcinagvu.ba/usluge/',
        description: 'E-Matičar omogućava online podnošenje zahtjeva za izdavanje i dostavu izvoda i uvjerenja'
      }
    ],
    guidanceLinks: [
      { label: 'Registar dijaspore', url: 'https://www.gvu.ba/registar-dijaspore' },
      { label: 'eCitizen – elektronske usluge Općine Gornji Vakuf-Uskoplje', url: GORNJI_VAKUF_ECITIZEN_URL },
      { label: 'eCitizen – pitanja vijećnika', url: 'https://ecitizen.ba/gornji_vakuf_uskoplje/questions/council-members-questions/council-member-question-list' },
      { label: 'eCitizen – prijava', url: 'https://ecitizen.ba/gornji_vakuf_uskoplje/login' }
    ],
    categories: ['E-Matičar', 'Matični ured', 'Dijaspora', 'E-uprava'],
    komentar: 'E-Matičar omogućava online podnošenje zahtjeva za izdavanje i dostavu izvoda i uvjerenja iz matičnih knjiga; dostupni su i Registar dijaspore i eCitizen.'
  },
  {
    id: 'sbk-donji-vakuf',
    name: 'Donji Vakuf',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://donji-vakuf.ba/',
        forms: 'https://donji-vakuf.ba/wp-content/uploads/2013/03/Formularzaprijemkodnacelnika.pdf',
        description: 'Obrasci – urbanističke saglasnosti, izdavanje uvjerenja'
      }
    ],
    categories: ['Opća uprava', 'E-matičar'],
    komentar: 'Obrazac za prijem kod načelnika i e-Matičar'
  },
  {
    id: 'sbk-novi-travnik',
    name: 'Novi Travnik',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://novitravnik.gov.ba/',
        description: 'Službena web-stranica Općine Novi Travnik'
      },
      {
        forms: 'https://eregistar.gnt.gov.ba/administrativni-postupci/',
        description: 'e-Registar administrativnih postupaka'
      },
      {
        main: 'https://novitravnik.gov.ba/index.php/novosti/oglasi-i-natjecaji',
        description: 'Oglasi i natječaji Općine Novi Travnik'
      }
    ],
    categories: ['Uvjerenja', 'Urbanizam', 'Administrativni postupci', 'Javni oglasi'],
    komentar: 'e-Registar administrativnih postupaka te oglasi i natječaji dostupni su na zvaničnim stranicama Općine.'
  },
  {
    id: 'sbk-vitez',
    name: 'Vitez',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    urls: [
      {
          main: 'https://vitez.ba/',
          description: 'Službena web-stranica Vitez',
        },
      {
          forms: 'https://vitez.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Lokacijska informacija'],
    komentar: 'Lokacijska informacija i urbanizam'
  },
  {
    id: 'sbk-busovaca',
    name: 'Busovača',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://opcina-busovaca.com/dokumenti/',
        description: 'Javni dokumenti, planovi i obrasci Općine Busovača'
      },
      {
        main: 'https://opcina-busovaca.com/',
        description: 'Zvanična web stranica Općine Busovača'
      },
      {
          forms: 'https://opcina-busovaca.com/dokumenti/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Budžet i finansije', 'Obrasci i zahtjevi', 'Javni pozivi i obavijesti', 'Planovi i odluke', 'Službeni dokumenti', 'Mjesne zajednice', 'Urbanizam i zemljište', 'Udruženja i sufinansiranje', 'Obrt i djelatnosti', 'Matični uredi', 'Privreda i prevoz'],
    komentar: 'Javni dokumenti, planovi i obrasci dostupni su na zvaničnoj web stranici Općine Busovača.'
  },
  {
    id: 'sbk-kiseljak',
    name: 'Kiseljak',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    urls: [
      {
          main: 'https://opcinakiseljak.org/',
          description: 'Službena web-stranica Kiseljak',
        },
      {
          forms: 'https://opcinakiseljak.org/obrasci/',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja'],
    komentar: 'Urbanistička saglasnost i uvjerenja'
  },
  {
    id: 'sbk-kresevo',
    name: 'Kreševo',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    urls: [
      {
          main: 'https://kresevo.ba/',
          description: 'Službena web-stranica Kreševo',
        },
      {
          forms: 'https://kresevo.ba/dokumenti/',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Uvjerenja', 'Urbanizam'],
    komentar: 'Dokumenti se dostavljaju preporučeno poštom'
  },
  {
    id: 'sbk-fojnica',
    name: 'Fojnica',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://www.fojnica.ba/v3/e-uprava/sluzba-za-opcu-upravu-obrasci',
        description: 'Obrasci Službe za opću upravu'
      },
      {
        forms: 'https://fojnica.ba/dokumenti/obrasci/',
        description: 'Dokumenti i obrasci Općine Fojnica'
      },
      {
        main: 'https://www.fojnica.ba/v3/',
        description: 'Službena web-stranica Općine Fojnica'
      },
      {
          forms: 'https://www.fojnica.ba/v3/e-uprava/sluzba-za-opcu-upravu-obrasci/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Opća uprava', 'Kabinet načelnika', 'Civilna zaštita', 'Društvene djelatnosti', 'Socijalna zaštita'],
    komentar: 'Službene stranice e-uprave i direktni obrasci Općine Fojnica'
  },

  // HERCEGOVAČKO-NERETVANSKI KANTON (HNK)
  {
    id: 'grad-mostar',
    name: 'Grad Mostar',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://csr-mostar.ba/zahtjevi-i-obrasci/',
        forms: 'https://csr-mostar.ba/zahtjevi-i-obrasci/',
        description: 'Zahtjevi i obrasci Centra za socijalni rad Grada Mostara'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja', 'Matični uredi', 'Socijalna zaštita'],
    komentar: 'Direktni obrasci Centra za socijalni rad Mostar za dječiji doplatak, porodiljske naknade, medicinsko vještačenje, zdravstveno osiguranje, jednokratnu pomoć i socijalnu zaštitu.'
  },
  {
    id: 'hnk-capljina',
    name: 'Čapljina',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://capljina.ba/',
        description: 'Službena stranica Grada Čapljine'
      },
      {
        forms: 'https://capljina.ba/administrativni-postupci/',
        description: 'e-Registar administrativnih postupaka, obrazaca, potrebne dokumentacije i taksi'
      },
      {
        main: 'https://capljina.ba/dokumenti/za-investitore/',
        description: 'Dokumenti za investitore'
      }
    ],
    categories: ['Poslovi gradonačelnika', 'Proračun i financije', 'Opća uprava i zajednički poslovi'],
    komentar: 'e-Registar Grada Čapljine sadrži administrativne postupke i pripadajuće obrasce.'
  },
  {
    id: 'hnk-citluk',
    name: 'Čitluk',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://citluk.ba/zahtjevi/',
        description: 'Zahtjevi, obrasci i dokumenti Općine Čitluk'
      },
      {
          forms: 'https://citluk.ba/zahtjevi/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanistička dozvola', 'Građevinska dozvola', 'Uporabna dozvola', 'Ostali zahtjevi', 'Izjave', 'Odobrenja', 'Prestanak rada', 'Rješenja', 'Uvjerenja', 'Ostalo', 'Priznavanja'],
    komentar: 'Službena stranica s 83 zahtjeva i obrasca raspoređena u 11 kategorija.'
  },
  {
    id: 'hnk-jablanica',
    name: 'Jablanica',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://www.jablanica.ba/',
        description: 'Službena web-stranica Općine Jablanica'
      },
      {
        main: 'https://www.jablanica.ba/ba/download-zona/obrasci-i-zahtjevi.html',
        forms: 'https://jablanica.ba/dokumenti/',
        description: 'Obrasci i zahtjevi Općine Jablanica'
      }
    ],
    categories: ['Uvjerenja', 'Urbanizam', 'Matični uredi'],
    komentar: 'Uvjerenja, urbanizam i matični uredi'
  },
  {
    id: 'hnk-konjic',
    name: 'Konjic',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://www.konjic.ba/ba/uprava/opcinske-sluzbe/prospekti-sluzbi.html',
        description: 'Obrasci – lokacijska informacija, građevinske dozvole, uvjerenja'
      },
      {
          forms: 'https://www.konjic.ba/ba/uprava/opcinske-sluzbe/prospekti-sluzbi.html/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Građevinske dozvole', 'Uvjerenja'],
    komentar: 'Lokacijska informacija i građevinske dozvole'
  },
  {
    id: 'hnk-neum',
    name: 'Neum',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    urls: [
      { main: 'https://neum.ba/', description: 'Službena web-stranica Općine Neum' },
      { forms: 'https://neum.ba/eDokumenti/sluzba-za-stambeno-komunalne-poslove-izgradnju-i-razvoj/', description: 'e-Dokumenti – stambeno-komunalni poslovi, izgradnja i razvoj' },
      { forms: 'https://neum.ba/eDokumenti/sluzba-za-imovinsko-pravne-poslove-i-katastar-nekretnina/', description: 'e-Dokumenti – imovinsko-pravni poslovi i katastar nekretnina' },
      { forms: 'https://neum.ba/eDokumenti/sluzba-za-financije-i-gospodarstvo/', description: 'e-Dokumenti – finansije i gospodarstvo' },
      { forms: 'https://neum.ba/eDokumenti/sluzba-za-graditeljstvo-i-prostorno-uredenje/', description: 'e-Dokumenti – graditeljstvo i prostorno uređenje' },
      { forms: 'https://neum.ba/eDokumenti/sluzba-za-opcu-upravu-i-drustvene-djelatnosti/', description: 'e-Dokumenti – opća uprava i društvene djelatnosti' },
      { forms: 'https://neum.ba/eDokumenti/sluzba-za-civilnu-zastitu-i-vatrogastvo/', description: 'e-Dokumenti – civilna zaštita i vatrogastvo' }
    ],
    categories: ['Uvjerenja', 'Urbanizam', 'Katastar', 'Finansije', 'Opća uprava', 'Civilna zaštita'],
    komentar: 'e-Dokumenti su organizovani po šest nadležnih općinskih službi.'
  },
  {
    id: 'hnk-prozor-rama',
    name: 'Prozor-Rama',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://prozor-rama.org/',
        description: 'Službena web-stranica Općine Prozor-Rama'
      },
      {
        main: 'https://prozor-rama.org/euprava/dokumenti/zahtjevi',
        forms: 'https://prozor-rama.org/euprava/dokumenti/zahtjevi',
        description: 'Zahtjevi — eUprava Općine Prozor-Rama'
      },
      {
        main: 'https://prozor-rama.org/files/download/7a824f32f319441',
        description: 'Zahtjev za upis činjenice sklapanja braka u matičnu knjigu vjenčanih'
      },
      {
        main: 'https://prozor-rama.org/files/download/45a24df3c836a20',
        description: 'Zahtjev za upis činjenice rođenja u matičnu knjigu rođenih'
      },
      {
        main: 'https://prozor-rama.org/files/download/c38dd5962afc8da',
        description: 'Zahtjev za upis činjenice smrti u matičnu knjigu umrlih'
      },
      {
        main: 'https://prozor-rama.org/files/download/f0690518cd86456',
        description: 'Prijava (zahtjev) za ispravku-promjenu podataka u matičnoj knjizi'
      },
      {
        main: 'https://prozor-rama.org/status-zahtjeva',
        description: 'Status zahtjeva — provjerite svoj zahtjev'
      }
    ],
    categories: ['Matični uredi', 'Urbanizam', 'E-uprava'],
    komentar: 'eUprava s elektronskim zahtjevima i provjerom statusa zahtjeva'
  },
  {
    id: 'hnk-stolac',
    name: 'Stolac',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    urls: [
      {
          main: 'https://stolac.gov.ba/',
          description: 'Službena web-stranica Stolac',
        },
      {
          forms: 'https://stolac.gov.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Uvjerenja', 'Urbanizam'],
    komentar: 'Uvjerenja i urbanistička dokumentacija'
  },

  // POSAVSKI KANTON (PK)
  {
    id: 'pk-orasje',
    name: 'Orašje',
    canton: 'Posavski kanton (PK)',
    entity: 'FBiH',
    urls: [
      {
          main: 'https://orasje.ba/',
          description: 'Službena web-stranica Orašje',
        },
      {
          forms: 'https://orasje.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Uvjerenja', 'Urbanizam'],
    komentar: 'Uvjerenja i urbanistička saglasnost'
  },
  {
    id: 'pk-odzak',
    name: 'Odžak',
    canton: 'Posavski kanton (PK)',
    entity: 'FBiH',
    urls: [
      {
          main: 'https://www.odzak.ba/',
          description: 'Službena web-stranica Odžak',
        },
      {
          forms: 'https://www.odzak.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja', 'Matični uredi'],
    komentar: 'Urbanističke saglasnosti i matični uredi'
  },
  {
    id: 'pk-domaljevac-samac',
    name: 'Domaljevac-Šamac',
    canton: 'Posavski kanton (PK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://domaljevac.ba/',
        forms: 'https://domaljevac.ba/wp-content/uploads/2025/02/zahtjev-za-upravni-postupak.pdf',
        description: 'Službena stranica i obrasci za upravne postupke, poljoprivredu i socijalnu zaštitu'
      }
    ],
    categories: ['Upravni postupci', 'Poljoprivreda', 'Socijalna zaštita', 'Boračka zaštita'],
    komentar: 'Direktni obrasci dostupni na službenoj stranici Općine Domaljevac-Šamac'
  },

  // KANTON 10 - LIVANJSKI (K10)
  {
    id: 'grad-livno',
    name: 'Grad Livno',
    canton: 'Kanton 10 (Livanjski)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://livno.ba/',
        forms: 'https://livno.ba/za-gradane/dokumenti-i-obrasci/',
        description: 'Službena stranica s obrascima Grada Livna – građevinarstvo, urbanizam, komunalije, obrt, matični uredi'
      },
      {
        forms: 'https://livno.ba/za-gradane/maticni-ured/',
        description: 'Matični ured Grada Livna'
      }
    ],
    categories: ['Graditeljstvo', 'Urbanizam', 'Komunalije', 'Obrt & Poduzetništvo', 'Opća uprava', 'Matični uredi', 'Boračka pitanja'],
    komentar: 'Službeni repozitorij elektronskih dokumenata i obrazaca: https://livno.ba/za-gradane/dokumenti-i-obrasci/'
  },
  {
    id: 'k10-tomislavgrad',
    name: 'Tomislavgrad',
    canton: 'Kanton 10 (Livanjski)',
    entity: 'FBiH',
    urls: [
      {
          main: 'https://www.tomislavgrad.gov.ba/',
          description: 'Službena web-stranica Tomislavgrad',
        },
      {
          forms: 'https://www.tomislavgrad.gov.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja'],
    komentar: 'Urbanističke saglasnosti i uvjerenja'
  },
  {
    id: 'k10-drvar',
    name: 'Drvar',
    canton: 'Kanton 10 (Livanjski)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://www.opstinadrvar.net/',
        forms: 'http://www.opstinadrvar.net/wp-content/uploads/2021/06/Zahtjev-ka-opstinskom-nacelniku.pdf',
        description: 'Obrazci, prijave, zahtjevi pravno imovinski, porodiljske naknade i ostalo u PDF i MSW'
      }
    ],
    categories: ['Pravno-imovinski', 'Socijalna zaštita'],
    komentar: 'Website može zahtijevati SSL konfiguraciju'
  },

  // ZAPADNOHERCEGOVAČKI KANTON (ZHK)
  {
    id: 'grad-siroki-brijeg',
    name: 'Grad Široki Brijeg',
    canton: 'Zapadnohercegovački kanton (ZHK)',
    entity: 'FBiH',
    urls: [
      {
          main: 'https://sirokibrijeg.ba/',
          description: 'Službena web-stranica Grad Široki Brijeg',
        },
      {
          forms: 'https://sirokibrijeg.ba/dokumenti/',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja'],
    komentar: 'Obrasci – lokacijska informacija, urbanizam, uvjerenja'
  },
  {
    id: 'grad-ljubuski',
    name: 'Grad Ljubuški',
    canton: 'Zapadnohercegovački kanton (ZHK)',
    entity: 'FBiH',
    urls: [
      {
          main: 'https://ljubuski.ba/',
          description: 'Službena web-stranica Grad Ljubuški',
        },
      {
          forms: 'https://ljubuski.ba/dokumenti/',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja', 'Matični uredi'],
    komentar: 'Obrasci – urbanističke saglasnosti, matični uredi, izdavanje uvjerenja'
  },
  {
    id: 'zhk-grude',
    name: 'Grude',
    canton: 'Zapadnohercegovački kanton (ZHK)',
    entity: 'FBiH',
    urls: [
      {
        main: GRUDE_OFFICIAL_URL,
        description: 'Službena web-stranica Općine Grude'
      },
      {
        main: GRUDE_FORMS_PORTAL_URL,
        forms: 'https://opcina-grude.info/obrasci/',
        description: 'Zahtjevi Službe za opću upravu, branitelje i društvene djelatnosti'
      }
    ],
    guidanceLinks: [
      ...grudeGuidanceLinks,
      { label: 'Služba za prostorno uređenje, imovinsko-pravne i katastarske poslove – zahtjevi', url: 'https://www.grude.ba/opcinska-uprava/opcinske-sluzbe/sluzba-za-prostorno-uredenje-imovinsko-pravne-i-katastarske-poslove/?search=&from=01.01.2000&to=31.12.2100#zahtjevi' },
      { label: 'Služba za gospodarstvo, financije, inspekcijske poslove i civilnu zaštitu – zahtjevi', url: 'https://www.grude.ba/opcinska-uprava/opcinske-sluzbe/sluzba-za-gospodarstvo-financije-inspekcijske-poslove-i-civilnu-zastitu/?search=&from=01.01.2000&to=31.12.2100#zahtjevi' }
    ],
    categories: Array.from(new Set(grudeForms.map((form) => form.category))),
    komentar: 'Službena stranica s 23 zahtjeva i obrasca za matične evidencije, socijalnu i boračku zaštitu, obrazovanje i pristup informacijama.'
  },
  {
    id: 'zhk-posusje',
    name: 'Posušje',
    canton: 'Zapadnohercegovački kanton (ZHK)',
    entity: 'FBiH',
    urls: [
      {
          main: 'https://www.posusje.ba/',
          description: 'Službena web-stranica Posušje',
        },
      {
          forms: 'https://www.posusje.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja'],
    komentar: 'Urbanizam i izdavanje uvjerenja'
  },

  // ========== REPUBLIKA SRPSKA ==========

  // RS #1 - BANJALUČKA REGIJA
  {
    id: 'grad-banja-luka',
    name: 'Grad Banja Luka',
    region: 'Banjalučka regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://banjaluka.rs.ba/obrasci/',
        description: 'Obrasci – urbanistička saglasnost, lokacijska informacija, uvjerenja o prebivalištu, matični uredi'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja', 'Matični uredi'],
    komentar: 'Obrasci – urbanistička saglasnost, lokacijska informacija, uvjerenja'
  },
  {
    id: 'rs-laktasi',
    name: 'Laktaši',
    region: 'Banjalučka regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://laktasi.net/',
        forms: 'https://laktasi.net/obrasci/',
        description: 'Zvanična web-stranica Grada Laktaši'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja', 'Prijava boravka'],
    komentar: 'Urbanizam i prijava boravka — domen promijenjen sa laktasi.org na gradlaktasi.com'
  },
  {
    id: 'rs-gradiska',
    name: 'Grad Gradiška',
    region: 'Banjalučka regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://www.gradgradiska.com/',
        description: 'Službena web-stranica Grada Gradiška'
      },
      {
        main: 'https://www.gradgradiska.com/zahtjev-za-prijem-kod-gradonacelnika/',
        forms: 'https://www.gradgradiska.com/zahtjev-za-prijem-kod-gradonacelnika/',
        description: 'Zahtjev za prijem kod gradonačelnika'
      },
      {
        forms: 'https://gradiska.org/dokumenti/',
        description: 'Dokumenti i obrasci Grada Gradiška'
      },
      {
        main: 'https://www.gradgradiska.com/izvod-iz-maticne-knjige-rodjenih-i-ili-uvjerenje-iz-knjige-drzavljana/',
        description: 'Izvod iz matične knjige rođenih i/ili uvjerenje iz knjige državljana'
      },
      {
        main: 'https://www.gradgradiska.com/izvodi-iz-maticnih-knjiga-i-upisi-u-mk/izvod-iz-maticne-knjige-vjencanih/',
        description: 'Izvod iz matične knjige vjenčanih'
      },
      {
        main: 'https://www.gradgradiska.com/izvodi-iz-maticnih-knjiga-i-upisi-u-mk/izvod-iz-maticne-knjige-umrlih/',
        description: 'Izvod iz matične knjige umrlih'
      }
    ],
    guidanceLinks: [
      { label: 'Izvod iz matične knjige rođenih i/ili uvjerenje iz knjige državljana', url: 'https://www.gradgradiska.com/izvod-iz-maticne-knjige-rodjenih-i-ili-uvjerenje-iz-knjige-drzavljana/' },
      { label: 'Izvod iz matične knjige vjenčanih', url: 'https://www.gradgradiska.com/izvodi-iz-maticnih-knjiga-i-upisi-u-mk/izvod-iz-maticne-knjige-vjencanih/' },
      { label: 'Izvod iz matične knjige umrlih', url: 'https://www.gradgradiska.com/izvodi-iz-maticnih-knjiga-i-upisi-u-mk/izvod-iz-maticne-knjige-umrlih/' }
    ],
    categories: ['Matični uredi', 'Urbanizam', 'Poljoprivreda', 'Boračko-invalidska zaštita'],
    komentar: 'Službena stranica i ažurirani obrasci Grada Gradiška'
  },
  {
    id: 'rs-prnjavor',
    name: 'Prnjavor',
    region: 'Banjalučka regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://prnjavor.ba/',
          description: 'Službena web-stranica Prnjavor',
        },
      {
          forms: 'https://prnjavor.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Prijava boravka', 'Matični uredi'],
    komentar: 'Urbanizam i matični uredi'
  },
  {
    id: 'rs-kotor-varos',
    name: 'Kotor Varoš',
    region: 'Banjalučka regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://opstinakotorvaros.com/',
        description: 'Službena web-stranica Opštine Kotor Varoš'
      },
      {
        forms: 'https://opstinakotorvaros.com/obrasci/',
        description: 'Zahtjevi – zvanična stranica s dostupnim obrascima i zahtjevima'
      }
    ],
    categories: ['Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    komentar: 'Lokacijska informacija i matični uredi'
  },
  {
    id: 'rs-knezevo',
    name: 'Kneževo (Skender Vakuf)',
    region: 'Banjalučka regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://opstinaknezevo.org/',
          description: 'Službena web-stranica Kneževo (Skender Vakuf)',
        },
      {
          forms: 'https://opstinaknezevo.org/obrasci/',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Poljoprivreda', 'Registracije'],
    komentar: 'Urbanizam i poljoprivreda'
  },
   {
    id: 'rs-srbac',
    name: 'Srbac',
    region: 'Banjalučka regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://srbac-rs.com/',
          description: 'Službena web-stranica Opštine Srbac',
        },
      {
          forms: 'https://invest.srbac-rs.com/wp-content/uploads/2026/09/%D0%97%D0%B0%D1%85%D1%82%D1%98%D0%B5%D0%B2-%D0%B7%D0%B0-%D0%B8%D0%B7%D0%B4%D0%B0%D0%B2%D0%B0%D1%9A%D0%B5-%D0%BE%D0%B4%D0%BE%D0%B1%D1%80%D0%B5%D1%9A%D0%B0-%D0%B7%D0%B0-%D0%B3%D1%80%D0%B0%D1%92%D0%B5%D1%9A%D0%B5.pdf',
          description: 'Zahtjev za izdavanje odobrenja za građenje'
      },
      {
          forms: 'https://invest.srbac-rs.com/wp-content/uploads/2026/09/%D0%97%D0%B0%D1%85%D1%82%D1%98%D0%B5%D0%B2-%D0%B7%D0%B0-%D0%B8%D0%B7%D0%B4%D0%B0%D0%B2%D0%B0%D1%9A%D0%B5-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B4%D0%B0-%D0%B8%D0%B7-%D0%BF%D1%80%D0%BE%D1%81%D1%82%D0%BE%D1%80%D0%BD%D0%BE-%D0%BF%D0%BB%D0%B0%D0%BD%D1%81%D0%BA%D0%B5-%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%98%D0%B5-1.pdf',
          description: 'Zahtjev za izdavanje izvod iz prostorno-planske dokumentacije'
      },
      {
          forms: 'https://invest.srbac-rs.com/wp-content/uploads/2021/11/6.-zahtjev-za-izdavanje-odobrenja-za-upotrebu-objekta.pdf',
          description: 'Zahtjev za izdavanje odobrenja za upotrebu objekta'
      },
      {
          forms: 'https://srbac-rs.com/%D0%BE%D0%B1%D1%80%D0%B0%D1%81%D1%86%D0%B8/',
          description: 'Obrasci Opštine Srbac'
      }
    ],
    categories: ['Građevinske dozvole', 'Upotrebna dozvola', 'Prostorno-planska dokumentacija'],
    komentar: 'Dokumenti i obrasci Opštine Srbac dostupni na službenoj web-stranici'
  },
  {
    id: 'rs-mrkonjic-grad',
    name: 'Mrkonjić Grad',
    region: 'Banjalučka regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://www.mrkonjic-grad.rs.ba/',
          description: 'Službena web-stranica Mrkonjić Grad',
        },
      {
          forms: 'https://www.mrkonjic-grad.rs.ba/lat/kategorije/1389/zahtjevi-obrasci',
          description: 'Zahtjevi-obrasci Opštine Mrkonjić Grad'
      },
      {
          forms: 'https://www.mrkonjic-grad.rs.ba/lat/kategorije/1469/-o---',
          description: 'Obrazaci Opštine Mrkonjić Grad'
      },
      {
          forms: 'https://cms.bitlab.host/api/data/92/documents/3027/predstavka-gra%C4%91ana-komunalna-policija-08-5.doc',
          description: 'Predstavka građana - komunalna policija'
      },
      {
          forms: 'https://cms.bitlab.host/api/data/92/documents/3752/Zahtjev%20za%20dodjelu%20sredstava%20za%20mlade%20bra%C4%8Dne%20parove%2004-86.docx',
          description: 'Zahtjev za dodjelu sredstava za mlade bračne parove 04-86'
      },
      {
          forms: 'https://www.mrkonjic-grad.rs.ba/lat/kategorije/1474/----',
          description: 'Obrazaci Opštine Mrkonjić Grad'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja', 'Komunalna policija', 'Mladi bračni parovi'],
    komentar: 'Obrasci Opštine Mrkonjić Grad dostupni na službenoj web-stranici'
  },
  {
    id: 'rs-novi-grad',
    name: 'Novi Grad (Bosanski Novi)',
    region: 'Banjalučka regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://opstina-novigrad.com/',
          description: 'Službena web-stranica Novi Grad (Bosanski Novi)',
        },
      {
          forms: 'https://opstina-novigrad.com/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja', 'Matični uredi'],
    komentar: 'Urbanizam i matični uredi'
  },

  // RS #2 - PRIJEDORSKA REGIJA
  {
    id: 'grad-prijedor',
    name: 'Grad Prijedor',
    region: 'Prijedorska regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://www.prijedorgrad.org/',
          description: 'Službena web-stranica Grad Prijedor',
        },
      {
          forms: 'https://www.prijedorgrad.org/obrasci/',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    komentar: 'Obrasci – urbanizam, građevinske dozvole, uvjerenja'
  },
  {
    id: 'rs-kozarska-dubica',
    name: 'Kozarska Dubica',
    region: 'Prijedorska regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://kozarkadubica.org/',
          description: 'Službena web-stranica Kozarska Dubica',
        },
      {
          forms: 'https://kozarkadubica.org/obrasci/',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Građevinske dozvole', 'Prijava prebivališta'],
    komentar: 'Urbanistička saglasnost i građevinske dozvole'
  },
  {
    id: 'rs-ostra-luka',
    name: 'Oštra Luka',
    region: 'Prijedorska regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://www.opstinaostraluka.org/',
          description: 'Službena web-stranica Oštra Luka',
        },
      {
          forms: 'https://www.opstinaostraluka.org/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Prijava prebivališta', 'Uvjerenja'],
    komentar: 'Urbanistička saglasnost i prijava prebivališta'
  },

  // RS #3 - DOBOJ REGIJA
  {
    id: 'grad-doboj',
    name: 'Grad Doboj',
    region: 'Doboj regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://doboj.gov.ba/dokumenti/%D0%B7%D0%B0%D1%85%D1%82%D1%98%D0%B5%D0%B2%D0%B8-%D0%B8-%D0%BE%D0%B1%D1%80%D0%B0%D1%81%D1%86%D0%B8/',
        description: 'Zvanični repozitorij – Zahtjevi i obrasci Grada Doboj (Privreda i SP, Prijemna kancelarija, Matični ured, Građanska stanja, Državljanstvo)'
      },
      {
        main: 'https://doboj.gov.ba/',
        description: 'Zvanični portal Grada Doboj'
      },
      {
          forms: 'https://doboj.gov.ba/dokumenti/%D0%B7%D0%B0%D1%85%D1%82%D1%98%D0%B5%D0%B2%D0%B8-%D0%B8-%D0%BE%D0%B1%D1%80%D0%B0%D1%81%D1%86%D0%B8/e-uprava',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Privreda i preduzetništvo', 'Matična služba i izvodi', 'Građanska stanja', 'Državljanstvo', 'Prijemna kancelarija i ovjere'],
    komentar: 'Službeni obrasci: SP 1, MKR/MKU/MKV, Prijavni obrazac za novorođeno dijete 2026, Državljanstvo BiH/RS, promjena imena'
  },
  {
    id: 'rs-teslic',
    name: 'Teslić',
    region: 'Doboj regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://teslic.com/',
          description: 'Službena web-stranica Teslić',
        },
      {
          forms: 'https://teslic.com/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    komentar: 'Urbanistička saglasnost i matični uredi'
  },
  {
    id: 'rs-modrica',
    name: 'Modriča',
    region: 'Doboj regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://modrica.ba/',
          description: 'Službena web-stranica Modriča',
        },
      {
          forms: 'https://modrica.ba/kategorija/usluge/obrasci/',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Prijava boravka', 'Uvjerenja'],
    komentar: 'Urbanizam i prijava boravka'
  },
  {
    id: 'rs-derventa',
    name: 'Grad Derventa',
    region: 'Doboj regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://derventa.ba/usluge/obrasci/',
        description: 'Obrasci – zahtjevi za uvjerenja, urbanističke saglasnosti, prijava prebivališta'
      }
    ],
    categories: ['Uvjerenja', 'Urbanizam', 'Prijava prebivališta'],
    komentar: 'Uvjerenja i urbanističke saglasnosti'
  },
  {
    id: 'rs-brod',
    name: 'Brod',
    searchAliases: ['Bosanski Brod'],
    region: 'Doboj regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://opstina-brod.net/%D0%B2%D0%B0%D0%B6%D0%BD%D0%B8-%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B8/#lat',
        description: 'Važni dokumenti, obrasci, uputstva i zahtjevi'
      },
      {
          forms: 'https://opstina-brod.net/%D0%B2%D0%B0%D0%B6%D0%BD%D0%B8-%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B8/#lat/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Pristup informacijama', 'Prijava korupcije', 'Zaštita ličnih podataka', 'Boračko-invalidska zaštita', 'Matični uredi', 'Državljanstvo', 'Urbanizam i prostorno uređenje', 'Privreda i preduzetništvo'],
    komentar: 'Dokumenti, obrasci i zahtjevi dostupni su na zvaničnoj stranici Opštine Brod.'
  },
  {
    id: 'rs-vukosavlje',
    name: 'Vukosavlje',
    region: 'Doboj regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://vukosavlje.gov.ba/ba/',
        description: 'Službena web-stranica Općine Vukosavlje — prijava prebivališta i matični uredi'
      },
      {
          forms: 'https://vukosavlje.gov.ba/ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Prijava prebivališta', 'Urbanizam', 'Matični uredi'],
    komentar: 'Prijava prebivališta i matični uredi'
  },
  {
    id: 'rs-petrovo',
    name: 'Petrovo',
    region: 'Doboj regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://petrovo.ba/',
          description: 'Službena web-stranica Petrovo',
        },
      {
          forms: 'https://petrovo.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja', 'Građevinske dozvole'],
    komentar: 'Urbanizam i građevinske dozvole'
  },
  {
    id: 'rs-samac',
    name: 'Šamac',
    region: 'Doboj regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://opstinasamac.org/',
        forms: 'https://eregistarsamac.com/%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%B8-%D0%BF%D0%BE%D1%81%D1%82%D1%83%D0%BF%D1%86%D0%B8/',
        description: 'Službena stranica Opštine Šamac i elektronski registar administrativnih postupaka'
      }
    ],
    categories: ['Administrativni postupci', 'Inspekcijski nadzor', 'Uvjerenja'],
    komentar: 'Elektronski registar administrativnih postupaka i zahtjeva'
  },

  // RS #4 - BIJELJINA REGIJA
  {
    id: 'grad-bijeljina',
    name: 'Grad Bijeljina',
    region: 'Bijeljina regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://www.gradbijeljina.org/sr/1649.izvod-iz-maticne-knjige-umrlih.html',
        description: 'Službeni online zahtjev Grada Bijeljina'
      },
      {
          forms: 'https://www.bijeljina.org/lat/kategorija/zahtjevi-i-obrasci.html',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Matični uredi', 'Uvjerenja', 'Građanska stanja'],
    komentar: 'Dostupne stranice za matične izvode iz matičnih knjiga vjenčanih i umrlih te uvjerenja'
  },
  {
    id: 'rs-ugljevik',
    name: 'Ugljevik',
    region: 'Bijeljina regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://opstinaugljevik.net/',
          description: 'Službena web-stranica Ugljevik',
        },
      {
          forms: 'https://opstinaugljevik.net/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Prijava prebivališta', 'Matični uredi'],
    komentar: 'Urbanistička saglasnost i matični uredi'
  },
  {
    id: 'rs-lopare',
    name: 'Lopare',
    region: 'Bijeljina regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://lopare.net/',
        description: 'Službena web-stranica Opštine Lopare',
      },
      {
          forms: 'https://lopare.net/zahtjevi-i-obrasci/',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam i građenje', 'Matični ured', 'Opća uprava', 'Boračka zaštita'],
    komentar: 'Direktni obrasci su dostupni kao PDF i DOC dokumenti na službenoj web-stranici Opštine Lopare.'
  },
  {
    id: 'rs-zvornik',
    name: 'Zvornik',
    region: 'Bijeljina regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://gradzvornik.org/',
          description: 'Službena web-stranica Zvornik',
        },
      {
          forms: 'https://gradzvornik.org/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Matični uredi', 'Prijava boravka'],
    komentar: 'Urbanizam i matični uredi'
  },
  {
    id: 'rs-sekovici',
    name: 'Šekovići',
    region: 'Bijeljina regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://sekovici.org/',
          description: 'Službena web-stranica Šekovići',
        },
      {
          forms: 'https://sekovici.org/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Matični uredi', 'Uvjerenja'],
    komentar: 'Urbanističke saglasnosti i matični uredi'
  },
  {
    id: 'rs-osmaci',
    name: 'Osmaci',
    region: 'Bijeljina regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://osmaci.org/',
          description: 'Službena web-stranica Osmaci',
        },
      {
          forms: 'https://osmaci.org/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Prijava prebivališta', 'Urbanizam', 'Matični uredi'],
    komentar: 'Prijava prebivališta i matični uredi'
  },

  // RS #5 - ISTOČNO SARAJEVO REGIJA
  {
    id: 'grad-istocno-sarajevo',
    name: 'Grad Istočno Sarajevo',
    region: 'Istočno Sarajevo regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://gradistocnosarajevo.net/dokumenti/',
        description: 'Zvanični obrasci i zahtjevi gradske uprave'
      },
      {
        main: 'https://gradistocnosarajevo.net/',
        description: 'Službeni portal Grada Istočno Sarajevo'
      },
      {
          forms: 'https://gradistocnosarajevo.net/dokumenti/e-uprava',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Gradska uprava', 'Zvanični obrasci', 'Zahtjevi', 'Matični uredi'],
    komentar: 'Zvanični obrasci i zahtjevi gradske uprave'
  },
  {
    id: 'rs-istocna-ilidza',
    name: 'Istočna Ilidža',
    region: 'Istočno Sarajevo regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://istocnailidza.net/',
        description: 'Službena web-stranica Opštine Istočna Ilidža'
      },
      {
        main: 'https://istocnailidza.net/?page_id=255',
        forms: 'https://istocnailidza.net/kategorija/dokumenti-i-obrasci/',
        description: 'Obrasci i zahtjevi – stranica 255'
      }
    ],
    guidanceLinks: [
      { label: 'Obrasci i zahtjevi – stranica 420', url: 'https://istocnailidza.net/?page_id=420' },
      { label: 'Obrasci i zahtjevi – stranica 307', url: 'https://istocnailidza.net/?page_id=307' },
      { label: 'Obrasci i zahtjevi – stranica 222', url: 'https://istocnailidza.net/?page_id=222' }
    ],
    categories: ['Preduzetništvo (SP)', 'Urbanizam', 'Matični uredi', 'Uvjerenja'],
    komentar: 'Zahtjev za registraciju preduzetničke djelatnosti (SP)'
  },
  {
    id: 'rs-istocno-novo-sarajevo',
    name: 'Istočno Novo Sarajevo',
    region: 'Istočno Sarajevo regija',
    entity: 'RS',
    urls: [
      
      {
        main: 'https://opstinains.net/',
        description: 'Službeni portal Opštine Istočno Novo Sarajevo'
      },
      {
        forms: 'https://opstinains.net/lat/maticne-sluzbe/',
        description: 'Informacije o matičnim službama'
      },
      {
        forms: 'https://opstinains.net/usluge/',
        description: 'Usluge i obrasci Opštine Istočno Novo Sarajevo'
      }
    ],
    categories: ['Matični uredi', 'Usluge i obrasci'],
    komentar: 'Opština ne nudi e-verzije dokumenata na sajtu; dokumenti se izdaju na usmeni zahtjev u prostorijama Opštinske uprave.'
  },
  {
    id: 'rs-pale',
    name: 'Pale (RS)',
    region: 'Istočno Sarajevo regija',
    entity: 'RS',
    urls: [
      
      {
        main: 'https://pale.rs.ba/',
        description: 'Službeni portal Opštine Pale RS'
      },
      {
          forms: 'https://pale.rs.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Preduzetništvo i privreda', 'Građevinske dozvole', 'Urbanizam', 'Matični uredi'],
    komentar: 'Obrazac za registraciju preduzetnika i promjenu podataka'
  },
  {
    id: 'rs-trnovo',
    name: 'Trnovo (RS)',
    region: 'Istočno Sarajevo regija',
    entity: 'RS',
    urls: [
      
      {
        main: 'https://trnovo-rs.com/',
        description: 'Službeni portal Opštine Trnovo RS'
      },
      {
          forms: 'https://trnovo-rs.com/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Jednokratne pomoći', 'Matični uredi', 'Socijalna zaštita', 'Urbanizam'],
    komentar: 'Zahtjev za jednokratne pomoći i matični uredi'
  },
  {
    id: 'rs-istocni-stari-grad',
    name: 'Istočni Stari Grad',
    region: 'Istočno Sarajevo regija',
    entity: 'RS',
    urls: [
      
      {
        main: 'https://opstinaisg.net/',
        description: 'Službeni portal Opštine Istočni Stari Grad'
      },
      {
          forms: 'https://opstinaisg.net/kategorija/dokumenti/',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Građansko stanje', 'Uvjerenja', 'Matični uredi', 'Urbanizam'],
    komentar: 'Zahtjev za izdavanje uvjerenja i obrazaca građanskog stanja'
  },
  {
    id: 'rs-sokolac',
    name: 'Sokolac',
    region: 'Istočno Sarajevo regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://opstinasokolac.net/obrasci/',
        description: 'Zahtjev za izdavanje ekološke dozvole / Urbanizam'
      },
      {
        main: 'https://opstinasokolac.net/',
        description: 'Službeni portal Opštine Sokolac'
      }
    ],
    categories: ['Ekološka dozvola', 'Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    komentar: 'Zahtjev za izdavanje ekološke dozvole / Urbanizam'
  },

  // RS #6 - TREBINJE REGIJA
  {
    id: 'grad-trebinje',
    name: 'Grad Trebinje',
    region: 'Trebinje regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://trebinje.rs.ba/',
          description: 'Službena web-stranica Grad Trebinje',
        },
      {
          forms: 'https://trebinje.rs.ba/kategorija/obrasci-i-zahtjevi/',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    komentar: 'Obrasci – urbanizam, lokacijska informacija, izdavanje uvjerenja'
  },
  {
    id: 'rs-bileca',
    name: 'Bileća',
    region: 'Trebinje regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://www.opstinabileca.ba/',
        forms: 'https://www.opstinabileca.ba/obrazci-gradjani/',
        description: 'Zahtjevi i obrasci Opštine Bileća'
      },
      {
        main: 'https://www.opstinabileca.ba/konkursi/',
        description: 'Javni konkursi i oglasi Opštine Bileća'
      },
      {
        main: 'https://www.opstinabileca.ba/contacts/',
        description: 'Kontakt podaci Opštine Bileća'
      }
    ],
    guidanceLinks: [
      { label: 'Kontakt podaci Opštine Bileća', url: 'https://www.opstinabileca.ba/contacts/' }
    ],
    categories: ['Opšta uprava', 'Boračko-invalidska zaštita'],
    komentar: 'Službeni zahtjevi dostupni na pojedinačnim stranicama Opštine Bileća'
  },
  {
    id: 'rs-gacko',
    name: 'Gacko',
    region: 'Trebinje regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://gacko-rs.info/obrasci/',
        description: 'Obrasci – urbanizam, građevinske dozvole, matični uredi'
      }
    ],
    categories: ['Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    komentar: 'Urbanizam i građevinske dozvole'
  },
  {
    id: 'rs-nevesinje',
    name: 'Nevesinje',
    region: 'Trebinje regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://opstinanevesinje.rs.ba/',
          description: 'Službena web-stranica Nevesinje',
        },
      {
          forms: 'https://opstinanevesinje.rs.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Matični uredi'],
    komentar: 'Urbanizam i matični uredi'
  },
  {
    id: 'rs-ljubinje',
    name: 'Ljubinje',
    region: 'Trebinje regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://opstinaljubinje.org/',
        description: 'Službena web-stranica Opštine Ljubinje',
      },
      {
          forms: 'https://opstinaljubinje.org/zahtjevi-i-obrasci/',
          description: 'Obrazaci i dokumenti'
      }
    ],
    address: 'Svetosavska 2, 88380 Ljubinje',
    taxId: '4401392570003',
    treasuryAccount: '5674338200000109 (Sberbank)',
    email: 'ljubinje@teol.net',
    phone: '+387 59 630-280',
    workingHours: '07:00–15:00; pauza 10:00–10:30',
    categories: [],
    komentar: 'Službena web-stranica je aktivna, ali digitalni dokumenti trenutno nisu dostupni online.'
  },
  {
    id: 'rs-berkovici',
    name: 'Berkovići',
    region: 'Trebinje regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://opstinaberkovici.com/home/',
        description: 'Službena stranica Opštine Berkovići; obrasci se preuzimaju lično u Šalter sali / Pisarnici opštine'
      },
      {
          forms: 'https://opstinaberkovici.com/home/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: [],
    komentar: 'Opština trenutno ne nudi obrasce u digitalnom formatu. Zahtjevi i formulari preuzimaju se lično u Šalter sali / Pisarnici opštine.'
  },
  {
    id: 'rs-istocni-mostar',
    name: 'Istočni Mostar',
    region: 'Trebinje regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://istocnimostar.gov.ba/',
        forms: 'https://istocnimostar.gov.ba/obrasci/',
        description: 'Službena web-stranica i obrasci Opštine Istočni Mostar'
      }
    ],
    categories: ['Opća uprava', 'Uvjerenja'],
    komentar: 'Službeni portal Opštine Istočni Mostar sa sekcijom za obrasce.'
  },

  // RS #7 - FOČA REGIJA
  {
    id: 'rs-foca',
    name: 'Foča',
    region: 'Foča regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://foca.rs.ba/',
        description: 'Službena web-stranica Opštine Foča'
      },
      {
          forms: 'https://foca.rs.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Usluge i obrasci', 'Službeni dokumenti', 'Javni pozivi'],
    komentar: 'Ažurirana službena web-stranica i dokumenti Opštine Foča'
  },
  {
    id: 'rs-cajnice',
    name: 'Čajniče',
    region: 'Foča regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://opstinacajnice.rs.ba/%d0%be%d0%b1%d1%80%d0%b0%d1%81%d1%86%d0%b8-%d0%be%d0%bf%d1%88%d1%82%d0%b8%d0%bd%d0%b0-%d1%87%d0%b0%d1%98%d0%bd%d0%b8%d1%87%d0%b5/',
        description: 'Zvanični obrasci Opštine Čajniče'
      },
      {
          forms: 'https://opstinacajnice.rs.ba/%d0%be%d0%b1%d1%80%d0%b0%d1%81%d1%86%d0%b8-%d0%be%d0%bf%d1%88%d1%82%d0%b8%d0%bd%d0%b0-%d1%87%d0%b0%d1%98%d0%bn%d0%b8%d1%87%d0%b5/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Opšta uprava', 'Privreda, finansije i društvene djelatnosti', 'Prostorno uređenje i stambeno-komunalni poslovi'],
    komentar: 'Zahtjevi i obrasci za opštu upravu, privredu, društvene djelatnosti i prostorno-komunalne poslove.'
  },
  {
    id: 'rs-rudo',
    name: 'Rudo',
    region: 'Foča regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://opstinarudo.com/',
        description: 'Službena web-stranica Opštine Rudo'
      },
      {
        main: 'https://opstinarudo.com/obrasci/',
        forms: 'https://opstinarudo.com/obrasci/',
        description: 'Zahtjevi i obrasci Opštine Rudo'
      }
    ],
    categories: ['Komunalna policija', 'Licenciranje autoprevoznika', 'Urbanizam', 'Boračko-invalidska zaštita', 'Matični uredi', 'Opšta uprava'],
    komentar: 'Zvanična stranica objavljuje zahtjeve i obrasce za komunalnu policiju, licenciranje prevoznika, urbanizam, boračko-invalidsku zaštitu i matične urede.'
  },
  {
    id: 'rs-novo-gorazde',
    name: 'Novo Goražde',
    region: 'Foča regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://novogorazde.net/',
          description: 'Službena web-stranica Novo Goražde',
        },
      {
          forms: 'https://novogorazde.net/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Prijava prebivališta', 'Matični uredi'],
    komentar: 'Urbanizam i matični uredi'
  },

  // RS #8 - SARAJEVO-ROMANIJSKA REGIJA
  {
    id: 'rs-han-pijesak',
    name: 'Han Pijesak',
    region: 'Sarajevo-romanijska regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://hanpijesak.org/',
        description: 'Službena web-stranica Opštine Han Pijesak'
      },
      {
        main: 'https://hanpijesak.org/zahtjevi-i-obrasci/',
        forms: 'https://hanpijesak.org/zahtjevi-i-obrasci/',
        description: 'Obrasci – urbanizam, matični uredi, prijava prebivališta'
      },
      {
        forms: 'https://hanpijesak.org/kategorija/obrasci-i-zahtjevi/',
        description: 'Kategorija obrasci i zahtjevi Opštine Han Pijesak'
      }
    ],
    categories: ['Urbanizam', 'Matični uredi', 'Prijava prebivališta'],
    komentar: 'Urbanizam i matični uredi'
  },
  {
    id: 'rs-rogatica',
    name: 'Rogatica',
    region: 'Sarajevo-romanijska regija',
    entity: 'RS',
    urls: [
      {
          main: 'https://rogatica.ba/',
          description: 'Službena web-stranica Rogatica',
        },
      {
          forms: 'https://rogatica.ba/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    komentar: 'Urbanističke saglasnosti i matični uredi'
  },

  // ========== BRČKO DISTRIKT ==========
  {
    id: 'brcko-distrikt',
    name: 'Brčko Distrikt BiH',
    entity: 'BD',
    urls: [
      {
        main: 'https://vlada.bdcentral.net/Home/',
        description: 'Obrasci – zahtjevi za uvjerenja, urbanistička saglasnost, lokacijska informacija, prijava boravka'
      },
      {
        main: 'https://bdcentral.net/javni-registar/',
        description: 'Obrasci – izvod iz matičnih knjiga, prijava prebivališta i boravišta, prijava rođenja'
      },
      {
        main: 'https://bdcentral.net/zdravstvo/',
        description: 'Obrasci – zdravstveno osiguranje, refundacija, ortopedska pomagala'
      },
      {
        main: 'https://bdcentral.net/obrazovanje/',
        description: 'Obrasci – stipendije, upis djece u školu, nostrifikacija'
      },
      {
        main: 'https://bdcentral.net/prostorno-planiranje/',
        description: 'Obrasci – lokacijska informacija, urbanistička saglasnost, građevinske dozvole'
      },
      {
          forms: 'https://vlada.bdcentral.net/Home/obrasci',
          description: 'Obrazaci i dokumenti'
      }
    ],
    categories: ['Urbanizam', 'Matični uredi', 'Zdravstvo', 'Obrazovanje', 'Građevinske dozvole'],
    komentar: 'Jedinstveni entitet - objedinjuje funkcije općine, grada i kantona'
  },
];

// Search function
export function searchMunicipalities(query: string): MunicipalityData[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  
  return municipalitiesDatabase.filter(mun => {
    const nameMatch = mun.name.toLowerCase().includes(searchTerm);
    const aliasMatch = mun.searchAliases?.some(alias => alias.toLowerCase().includes(searchTerm));
    const cantonMatch = mun.canton?.toLowerCase().includes(searchTerm);
    const regionMatch = mun.region?.toLowerCase().includes(searchTerm);
    const categoryMatch = mun.categories.some(cat => cat.toLowerCase().includes(searchTerm));
    
    return nameMatch || aliasMatch || cantonMatch || regionMatch || categoryMatch;
  });
}

// Get municipality by ID
export function getMunicipalityById(id: string): MunicipalityData | undefined {
  return municipalitiesDatabase.find(mun => mun.id === id);
}

// Get all cantons
export function getAllCantons(): string[] {
  const cantons = new Set<string>();
  municipalitiesDatabase.forEach(mun => {
    if (mun.canton) cantons.add(mun.canton);
  });
  return Array.from(cantons).sort();
}

// Get all regions (RS)
export function getAllRegions(): string[] {
  const regions = new Set<string>();
  municipalitiesDatabase.forEach(mun => {
    if (mun.region) regions.add(mun.region);
  });
  return Array.from(regions).sort();
}

// Get municipalities by entity
export function getMunicipalitiesByEntity(entity: 'FBiH' | 'RS' | 'BD'): MunicipalityData[] {
  return municipalitiesDatabase.filter(mun => mun.entity === entity);
}