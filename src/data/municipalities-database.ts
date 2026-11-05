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
        forms: 'https://ilijas.ba/index.php/e-uprava',
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
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja', 'Lokacijska informacija'],
    komentar: 'Glavni grad - sveobuhvatni obrasci'
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
        description: 'Službena web-stranica Grada Goražde'
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
        main: 'https://praca.ba/?s=Obrazac',
        description: 'Zahtjevi i obrasci općinske službe'
      },
      {
        main: 'https://praca.ba/',
        description: 'Službena stranica Općine Pale-Prača'
      }
    ],
    categories: ['Opća uprava', 'Matični uredi', 'Uvjerenja'],
    komentar: 'Zahtjevi i obrasci općinske službe'
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
        description: 'Obrasci – urbanizam, matični uredi, izdavanje uvjerenja'
      }
    ],
    categories: ['Urbanizam', 'Matični uredi', 'Uvjerenja'],
    komentar: 'Sveobuhvatni gradski obrasci'
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
        main: 'https://www.ecitizen.ba/tuzla/eServices/eServicesSubcategory/2',
        forms: 'https://www.ecitizen.ba/tuzla/eServices/eServicesSubcategory/2',
        description: 'eCitizen – usluge Grada Tuzla, kategorija 2'
      }
    ],
    guidanceLinks: [
      { label: 'eCitizen – usluge Grada Tuzla, kategorija 6', url: 'https://www.ecitizen.ba/tuzla/eServices/eServicesSubcategory/6' },
      { label: 'eCitizen – usluge Grada Tuzla, kategorija 26', url: 'https://www.ecitizen.ba/tuzla/eServices/eServicesSubcategory/26' },
      { label: 'eCitizen – usluge Grada Tuzla, kategorija 3', url: 'https://www.ecitizen.ba/tuzla/eServices/eServicesSubcategory/3' },
      { label: 'eCitizen – usluge Grada Tuzla, kategorija 7', url: 'https://www.ecitizen.ba/tuzla/eServices/eServicesSubcategory/7' },
      { label: 'eCitizen – usluge Grada Tuzla, kategorija 63', url: 'https://www.ecitizen.ba/tuzla/eServices/eServicesSubcategory/63' },
      { label: 'eCitizen – usluge Grada Tuzla, kategorija 4', url: 'https://www.ecitizen.ba/tuzla/eServices/eServicesSubcategory/4' }
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
        description: 'Obrasci – zahtjev za urbanističku saglasnost, lokacijsku informaciju, uvjerenja'
      },
      {
        main: 'https://banovici.gov.ba/',
        description: 'Službena stranica Općine Banovići'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja'],
    komentar: 'Urbanistički obrasci i uvjerenja'
  },
  {
    id: 'tk-celic',
    name: 'Čelić',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://opcinacelic.ba/',
        description: 'Službena web-stranica Općine Čelić'
      }
    ],
    guidanceLinks: [
      
      
    ],
    categories: ['Službeni glasnici', 'Upiti i dostava obrazaca'],
    komentar: 'Poveznica za obrasce prenesena je iz dostavljenog dokumenta; građani ih mogu zatražiti i direktno u Općini.'
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
      }
    ],
    guidanceLinks: [
      { label: 'eStipendije Grada Gradačac', url: 'https://estipendije-gradacac.ba/' },
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
        description: 'Službena web-stranica Općine Kladanj; digitalni obrasci trenutno nisu dostupni online'
      }
    ],
    categories: [],
    komentar: 'Digitalni obrasci trenutno nisu dostupni na e-Servisu. Korisnik može pripremiti e-mail zahtjev Službi za opću upravu.'
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
        forms: 'https://lukavac.ba/e-obrasci/',
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
        main: 'https://srebrenik.ba/obrasci/',
        description: 'Obrasci – urbanistička saglasnost, lokacijska informacija, matični uredi'
      }
    ],
    categories: ['Urbanizam', 'Matični uredi'],
    komentar: 'Urbanistička saglasnost i matični uredi'
  },
  {
    id: 'tk-teocak',
    name: 'Teočak',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      
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
        forms: 'https://www.ecitizen.ba/kljuc/home',
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
        forms: GORNJI_VAKUF_E_MATICAR_URL,
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
      
    ],
    categories: ['Uvjerenja', 'Urbanizam'],
    komentar: 'Uvjerenja i urbanistička dokumentacija'
  },
  {
    id: 'sbk-vitez',
    name: 'Vitez',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    urls: [
      
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
        main: 'https://www.fojnica.ba/v3/',
        description: 'Službena web-stranica Općine Fojnica'
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
        main: 'https://www.mostar.ba/kategorija/sluzbeni-dokumenti/',
        description: 'Obrasci – urbanizam, uvjerenja, matični uredi, socijalna zaštita'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja', 'Matični uredi', 'Socijalna zaštita'],
    komentar: 'Obrasci – urbanizam, izdavanje uvjerenja, prijava boravka'
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
        forms: 'https://www.jablanica.ba/ba/download-zona/obrasci-i-zahtjevi.html',
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
      
    ],
    categories: ['Uvjerenja', 'Urbanizam'],
    komentar: 'Uvjerenja i urbanistička dokumentacija'
  },
  {
    id: 'hnk-prozor-rama',
    name: 'Prozor-Rama',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    urls: [
      
    ],
    categories: ['Matični uredi', 'Urbanizam'],
    komentar: 'Izdavanje izvoda i urbanizam'
  },
  {
    id: 'hnk-stolac',
    name: 'Stolac',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    urls: [
      
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
        forms: GRUDE_FORMS_PORTAL_URL,
        description: 'Zahtjevi Službe za opću upravu, branitelje i društvene djelatnosti'
      }
    ],
    guidanceLinks: [
      ...grudeGuidanceLinks,
      { label: 'Služba za prostorno uređenje, imovinsko-pravne i katastarske poslove – zahtjevi', url: 'https://grude.info/opcinska-uprava/opcinske-sluzbe/sluzba-za-prostorno-uredenje-imovinsko-pravne-i-katastarske-poslove/?search=&from=01.01.2000&to=31.12.2100#zahtjevi' },
      { label: 'Služba za gospodarstvo, financije, inspekcijske poslove i civilnu zaštitu – zahtjevi', url: 'https://grude.info/opcinska-uprava/opcinske-sluzbe/sluzba-za-gospodarstvo-financije-inspekcijske-poslove-i-civilnu-zastitu/?search=&from=01.01.2000&to=31.12.2100#zahtjevi' }
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
      
    ],
    categories: ['Urbanizam', 'Uvjerenja', 'Prijava boravka'],
    komentar: 'Urbanizam i prijava boravka'
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
        forms: 'https://opstinakotorvaros.com/zahtjevi/',
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
      
    ],
    categories: ['Urbanizam', 'Poljoprivreda', 'Registracije'],
    komentar: 'Urbanizam i poljoprivreda'
  },
  {
    id: 'rs-mrkonjic-grad',
    name: 'Mrkonjić Grad',
    region: 'Banjalučka regija',
    entity: 'RS',
    urls: [
      
    ],
    categories: ['Urbanizam', 'Uvjerenja'],
    komentar: 'Obrasci na dnu naslovne stranice'
  },
  {
    id: 'rs-novi-grad',
    name: 'Novi Grad (Bosanski Novi)',
    region: 'Banjalučka regija',
    entity: 'RS',
    urls: [
      
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
      
    ],
    categories: ['Urbanizam', 'Prijava boravka', 'Uvjerenja'],
    komentar: 'Urbanizam i prijava boravka'
  },
  {
    id: 'rs-derventa',
    name: 'Derventa',
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
        main: 'https://opstinalopare.com/',
        description: 'Službena web-stranica Opštine Lopare'
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
        forms: 'https://istocnailidza.net/?page_id=255',
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
      }
    ],
    categories: ['Lokacijski uslovi', 'Urbanizam', 'Usluge i obrasci', 'Matični uredi'],
    komentar: 'Zahtjev za izdavanje lokacijskih uslova'
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
        description: 'Službena web-stranica Opštine Ljubinje; digitalni dokumenti trenutno nisu dostupni online'
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
    urls: [],
    categories: [],
    komentar: 'Prema ažuriranju, Opština Istočni Mostar nema službenu web-stranicu.'
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
      
    ],
    categories: ['Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    komentar: 'Urbanizam i građevinske dozvole'
  },
  {
    id: 'rs-novo-gorazde',
    name: 'Novo Goražde',
    region: 'Foča regija',
    entity: 'RS',
    urls: [
      
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
        main: 'https://bdcentral.net/obrasci/',
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