// Complete BiH Municipalities Database
// Data extracted from official government sources

export interface MunicipalityData {
  id: string;
  name: string;
  canton?: string;
  region?: string;
  entity: 'FBiH' | 'RS' | 'BD';
  urls: {
    main?: string;
    forms?: string;
    description: string;
  }[];
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
        main: 'https://starigrad.ba/v2/e_uprava.php',
        description: 'Zahtjev za izvod iz matične knjige rođenih/vjenčanih/umrlih, e-Uprava'
      },
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
        main: 'https://centar.ba/e-uprava/obrasci',
        description: 'Zahtjev za registraciju samostalne djelatnosti (obrt), obrasci službi'
      },
      {
        main: 'https://centar.ba/',
        description: 'Službeni portal Općine Centar Sarajevo'
      }
    ],
    categories: ['Privreda i obrt', 'Urbanizam', 'E-uprava', 'Matični uredi'],
    komentar: 'Zahtjev za registraciju samostalne djelatnosti (obrt)'
  },
  {
    id: 'ks-ilidza',
    name: 'Ilidža',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://opcinailidza.ba/obrasci',
        description: 'Zahtjev za izdavanje lokacijske informacije i urbanističkih uslova'
      },
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
        main: 'https://novigradsarajevo.ba/e-uprava',
        description: 'Zahtjev za jednokratnu novčanu pomoć / Prijemni obrasci e-Uprava'
      },
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
        main: 'https://novosarajevo.ba/e-uprava/obrasci/',
        description: 'Zahtjev za ovjeru potpisa, rukopisa i prepisa, obrasci službi'
      },
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
      {
        main: 'https://vogosca.ba/e-uprava/obrasci/',
        description: 'Zahtjev za naknadu porodiljama / Građanska stanja'
      },
      {
        main: 'https://vogosca.ba/',
        description: 'Službeni portal Općine Vogošća'
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
        main: 'https://hadzici.ba/e-uprava',
        description: 'Zahtjev za izdavanje izvoda iz matičnih knjiga, e-Uprava'
      },
      {
        main: 'https://hadzici.ba/',
        description: 'Službeni portal Općine Hadžići'
      }
    ],
    categories: ['Matični uredi', 'E-uprava', 'Građanska stanja'],
    komentar: 'Zahtjev za izdavanje izvoda iz matičnih knjiga'
  },
  {
    id: 'ks-trnovo-fbih',
    name: 'Trnovo (FBiH)',
    canton: 'Kanton Sarajevo (KS)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://trnovo.ba/dokumenti/obrasci/',
        description: 'Zahtjev za odobrenje građenja i priključak'
      },
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
        main: 'https://ilijas.ba/e-uprava/obrasci',
        description: 'Zahtjev za utvrđivanje prava na dopunske oblike zaštite'
      },
      {
        main: 'https://ilijas.ba/',
        description: 'Službeni portal Općine Ilijaš'
      }
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
        main: 'https://gorazde.ba/gradska-uprava/e-uprava/',
        description: 'Zahtjev za izdavanje urbanističke saglasnosti / Građevinske dozvole, e-Uprava'
      },
      {
        main: 'https://gorazde.ba/wp-content/uploads/2023/06/Zahtjev-za-inspekcijski-nadzor.pdf',
        description: 'Zahtjev za inspekcijski nadzor (komunalni, građevinski i tržišni poslovi)'
      },
      {
        main: 'https://gorazde.ba/sluzba-ne-poslove-i-katastar-nekretnina/',
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
        main: 'https://foca-ustikolina.ba/dokumenti/',
        description: 'Obrazac za prijavu komunalnih taksi i taksenih zahtjeva'
      },
      {
        main: 'https://foca-ustikolina.ba/',
        description: 'Službena stranica Općine Foča-Ustikolina'
      }
    ],
    categories: ['Komunalne takse', 'Uvjerenja', 'Opća uprava'],
    komentar: 'Obrazac za prijavu komunalnih taksi i taksenih zahtjeva'
  },

  // ZENIČKO-DOBOJSKI KANTON (ZDK)
  {
    id: 'zdk-zenica',
    name: 'Zenica',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://zenica.ba/pdf-formular-zzo-zdk/',
        description: 'PDF formular ZZO ZDK'
      },
      {
        main: 'https://zenica.ba/e-registar-administrativnih-postupaka/',
        description: 'E-registar Administrativnih postupaka'
      },
      {
        main: 'https://zenica.ba/e-servis/',
        description: 'E-Servis PDF razni administrativni formulari i obrazci'
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
        main: 'https://doboj-jug.ba/pdf-formular-zzo-zdk/',
        description: 'PDF formular ZZO ZDK'
      }
    ],
    categories: ['Zdravstvo'],
    komentar: 'Zdravstveni obrasci ZZO ZDK'
  },
  {
    id: 'zdk-kakanj',
    name: 'Kakanj',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://kakanj.ba/pdf-formular-zzo-zdk/',
        description: 'PDF formular ZZO ZDK'
      }
    ],
    categories: ['Zdravstvo'],
    komentar: 'Zdravstveni obrasci ZZO ZDK'
  },
  {
    id: 'zdk-maglaj',
    name: 'Maglaj',
    canton: 'Zeničko-dobojski kanton (ZDK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://maglaj.ba/pdf-formular-zzo-zdk/',
        description: 'PDF formular ZZO ZDK'
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
        main: 'https://zepce.ba/pdf-formular-zzo-zdk/',
        description: 'PDF formular ZZO ZDK'
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
        main: 'https://tesanj.ba/pdf-formular-zzo-zdk/',
        description: 'PDF formular ZZO ZDK'
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
        main: 'https://grad.tuzla.ba/category/gradtuzla/e-uprava/',
        description: 'Razni administrativni formulari za građane iz područja opće uprave'
      },
      {
        main: 'https://grad.tuzla.ba/formular-izvod-maticne-knjige/',
        description: 'Formular za izvod iz matičnih knjiga'
      }
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
        main: 'https://kalesija.ba/e-formulari/',
        description: 'Elektronski formulari za: upis rođenja, prijava zdravstvenog osiguranja, punomoć, kućna lista'
      },
      {
        main: 'https://kalesija.ba/lokacijska-informacija/',
        description: 'Lokacijska informacija'
      },
      {
        main: 'https://kalesija.ba/uvjerenje-urbanizam/',
        description: 'Uvjerenje iz urbanističkih odsjeka'
      }
    ],
    categories: ['E-formulari', 'Matični uredi', 'Urbanizam', 'Zdravstvo'],
    komentar: 'Digitalizovani e-formulari za različite usluge'
  },
  {
    id: 'tk-banovici',
    name: 'Banovići',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://banovici.ba/obrasci/',
        description: 'Obrasci – zahtjev za urbanističku saglasnost, lokacijsku informaciju, uvjerenja'
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
        main: 'https://celic.ba/obrasci/',
        description: 'Obrasci – zahtjev za socijalnu pomoć, zahtjev za uvjerenja, građevinske dozvole'
      }
    ],
    categories: ['Socijalna zaštita', 'Uvjerenja', 'Građevinske dozvole'],
    komentar: 'Obrasci za socijalnu pomoć i građevinske dozvole'
  },
  {
    id: 'tk-doboj-istok',
    name: 'Doboj Istok',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://doboj-istok.ba/obrasci/',
        description: 'Obrasci – prijava prebivališta, izdavanje uvjerenja, zahtjevi prema urbanizmu'
      }
    ],
    categories: ['Prijava prebivališta', 'Uvjerenja', 'Urbanizam'],
    komentar: 'Jedna od rijetkih općina sa mogućnošću online naručivanja dokumenata'
  },
  {
    id: 'tk-gracanica',
    name: 'Gračanica',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://gracanica.gov.ba/dokumenti/e-obrasci/',
        description: 'Obrasci – lokacijska informacija, urbanistička saglasnost, zahtjev za uvid u dokumente'
      }
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
        main: 'https://gradacac.ba/obrasci/',
        description: 'Obrasci – zahtjev za izdavanje izvoda, uvjerenja, lokacijska informacija'
      }
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
        main: 'https://kladanj.ba/obrasci/',
        description: 'Obrasci – socijalna davanja, urbanizam, matični uredi'
      }
    ],
    categories: ['Socijalna zaštita', 'Urbanizam', 'Matični uredi'],
    komentar: 'Socijalna davanja i matični uredi'
  },
  {
    id: 'tk-lukavac',
    name: 'Lukavac',
    canton: 'Tuzlanski kanton (TK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://lukavac.ba/obrasci/',
        description: 'Obrasci – uvjerenja, lokacijska informacija, urbanizam'
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
        main: 'https://opcina-sapna.ba/dokumenti/',
        description: 'Obrasci – zahtjevi za uvjerenja, urbanistička dokumentacija'
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
      {
        main: 'https://teocak.ba/obrasci/',
        description: 'Obrasci – zahtjevi građana, izdavanje uvjerenja'
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
        main: 'https://bosanska-krupa.ba/obrasci/',
        description: 'Obrasci – lokacijska informacija, urbanistička saglasnost, građevinske dozvole'
      }
    ],
    categories: ['Urbanizam', 'Građevinske dozvole'],
    komentar: 'Urbanistička saglasnost i građevinske dozvole'
  },
  {
    id: 'usk-buzim',
    name: 'Bužim',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://buzim.ba/obrasci/',
        description: 'Obrasci – prijava prebivališta, izdavanje uvjerenja, socijalna davanja'
      }
    ],
    categories: ['Prijava prebivališta', 'Uvjerenja', 'Socijalna zaštita'],
    komentar: 'Prijava prebivališta i socijalna davanja'
  },
  {
    id: 'usk-cazin',
    name: 'Cazin',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://cazin.ba/obrasci/',
        description: 'Obrasci – urbanizam, matični uredi, izdavanje izvoda i uvjerenja'
      }
    ],
    categories: ['Urbanizam', 'Matični uredi', 'Uvjerenja'],
    komentar: 'Urbanizam, matični uredi i uvjerenja'
  },
  {
    id: 'usk-kljuc',
    name: 'Ključ',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://kljuc.ba/obrasci/',
        description: 'Obrasci – prijave, zahtjevi za dozvole, urbanizam'
      }
    ],
    categories: ['Urbanizam', 'Dozvole'],
    komentar: 'Prijave i zahtjevi za dozvole'
  },
  {
    id: 'usk-sanski-most',
    name: 'Sanski Most',
    canton: 'Unsko-sanski kanton (USK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://sanski-most.ba/obrasci/',
        description: 'Obrasci – izdavanje izvoda iz matičnih knjiga, urbanizam, lokacijska informacija'
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
        main: 'https://travnik.ba/obrasci/',
        description: 'Obrasci – urbanistička saglasnost, lokacijska informacija, izdavanje uvjerenja'
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
        main: 'https://bugojno.ba/obrasci/',
        description: 'Obrasci – urbanizam, građevinske dozvole, matični uredi'
      }
    ],
    categories: ['Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    komentar: 'Urbanizam i građevinske dozvole'
  },
  {
    id: 'sbk-gornji-vakuf',
    name: 'Gornji Vakuf-Uskoplje',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://gv-uskoplje.ba/e-maticar/',
        description: 'E-Matičar omogućava online podnošenje zahtjeva za izdavanje i dostavu izvoda i uvjerenja'
      }
    ],
    categories: ['E-matičar', 'Matični uredi'],
    komentar: 'Online E-Matičar sistem'
  },
  {
    id: 'sbk-donji-vakuf',
    name: 'Donji Vakuf',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://donji-vakuf.ba/obrasci/',
        description: 'Obrasci – urbanističke saglasnosti, izdavanje uvjerenja'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja'],
    komentar: 'Urbanističke saglasnosti i uvjerenja'
  },
  {
    id: 'sbk-novi-travnik',
    name: 'Novi Travnik',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://novi-travnik.ba/obrasci/',
        description: 'Obrasci – zahtjevi za uvjerenja, urbanistička dokumentacija'
      }
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
      {
        main: 'https://vitez.ba/obrasci/',
        description: 'Obrasci – lokacijska informacija, urbanizam'
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
        main: 'https://busovaca.ba/obrasci/',
        description: 'Obrasci – zahtjevi za uvjerenja, urbanizam'
      }
    ],
    categories: ['Uvjerenja', 'Urbanizam'],
    komentar: 'Zahtjevi za uvjerenja i urbanizam'
  },
  {
    id: 'sbk-kiseljak',
    name: 'Kiseljak',
    canton: 'Srednjobosanski kanton (SBK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://kiseljak.ba/obrasci/',
        description: 'Obrasci – urbanistička saglasnost, izdavanje uvjerenja'
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
        main: 'https://kresevo.ba/obrasci/',
        description: 'Obrasci – izdavanje uvjerenja, urbanizam. Dokumenti se dostavljaju poštom.'
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
        main: 'https://fojnica.ba/obrasci/',
        description: 'Obrasci – urbanističke saglasnosti, izdavanje uvjerenja'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja'],
    komentar: 'Urbanističke saglasnosti i uvjerenja'
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
        main: 'https://capljina.ba/obrasci/',
        description: 'Obrasci – lokacijska informacija, urbanistička saglasnost, izvod iz matičnih knjiga'
      }
    ],
    categories: ['Urbanizam', 'Matični uredi'],
    komentar: 'Lokacijska informacija i matični uredi'
  },
  {
    id: 'hnk-citluk',
    name: 'Čitluk',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://citluk.ba/obrasci/',
        description: 'Obrasci – izdavanje uvjerenja, urbanističke saglasnosti'
      }
    ],
    categories: ['Uvjerenja', 'Urbanizam'],
    komentar: 'Uvjerenja i urbanističke saglasnosti'
  },
  {
    id: 'hnk-jablanica',
    name: 'Jablanica',
    canton: 'Hercegovačko-neretvanski kanton (HNK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://jablanica.ba/obrasci/',
        description: 'Obrasci – zahtjev za uvjerenje, urbanizam, matični uredi'
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
      {
        main: 'https://neum.ba/obrasci/',
        description: 'Obrasci – zahtjev za uvjerenja, urbanistička dokumentacija'
      }
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
      {
        main: 'https://prozor-rama.ba/obrasci/',
        description: 'Obrasci – zahtjev za izdavanje izvoda, urbanizam'
      }
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
      {
        main: 'https://stolac.ba/obrasci/',
        description: 'Obrasci – zahtjevi za uvjerenja, urbanistička dokumentacija'
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
        main: 'https://orasje.ba/obrasci/',
        description: 'Obrasci – zahtjev za uvjerenja, urbanistička saglasnost, lokacijska informacija'
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
        main: 'https://odzak.ba/obrasci/',
        description: 'Obrasci – urbanističke saglasnosti, izdavanje uvjerenja, matični uredi'
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
        main: 'https://domaljevac-samac.ba/',
        description: 'Nema posebnu stranicu za obrasce, dostupno putem protokola općine'
      }
    ],
    categories: ['Protokol općine'],
    komentar: 'Obrasci dostupni putem protokola općine'
  },

  // KANTON 10 - LIVANJSKI (K10)
  {
    id: 'grad-livno',
    name: 'Grad Livno',
    canton: 'Kanton 10 (Livanjski)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://livno.ba/obrasci/',
        description: 'Obrasci i zahtjevi – urbanizam, lokacijska informacija, izdavanje uvjerenja, socijalna pomoć'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja', 'Socijalna zaštita'],
    komentar: 'Dokumenti se šalju poštom nakon konfirmacije'
  },
  {
    id: 'k10-tomislavgrad',
    name: 'Tomislavgrad',
    canton: 'Kanton 10 (Livanjski)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://tomislavgrad.ba/obrasci/',
        description: 'Obrasci – urbanističke saglasnosti, lokacijska informacija, zahtjevi za uvjerenja'
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
        main: 'https://drvar.ba/obrasci/',
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
        main: 'https://siroki-brijeg.ba/obrasci/',
        description: 'Obrasci – urbanistička saglasnost, lokacijska informacija, izdavanje uvjerenja'
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
        main: 'https://ljubuski.ba/obrasci/',
        description: 'Obrasci – urbanističke saglasnosti, uvjerenja, matični uredi'
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
        main: 'https://grude.ba/obrasci/',
        description: 'Obrasci – urbanizam, građevinske dozvole, izdavanje uvjerenja'
      }
    ],
    categories: ['Urbanizam', 'Građevinske dozvole', 'Uvjerenja'],
    komentar: 'Urbanizam i građevinske dozvole'
  },
  {
    id: 'zhk-posusje',
    name: 'Posušje',
    canton: 'Zapadnohercegovački kanton (ZHK)',
    entity: 'FBiH',
    urls: [
      {
        main: 'https://posusje.ba/obrasci/',
        description: 'Obrasci – zahtjevi za urbanizam, izdavanje uvjerenja, lokacijske informacije'
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
        main: 'https://laktasi.org/obrasci/',
        description: 'Obrasci – urbanizam, zahtjev za uvjerenje o državljanstvu, prijava boravka'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja', 'Prijava boravka'],
    komentar: 'Urbanizam i prijava boravka'
  },
  {
    id: 'rs-gradiska',
    name: 'Gradiška',
    region: 'Banjalučka regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://gradiska.org/obrasci/',
        description: 'Obrasci za poljoprivredu, privredu, boračko invalidska zaštita, prostorno uređenje. Zahtjevi za izvode iz matičnih knjiga.'
      }
    ],
    categories: ['Matični uredi', 'Urbanizam', 'Poljoprivreda', 'Boračko-invalidska zaštita'],
    komentar: 'Širok spektar obrazaca uključujući matične knjige'
  },
  {
    id: 'rs-prnjavor',
    name: 'Prnjavor',
    region: 'Banjalučka regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://prnjavor.org/obrasci/',
        description: 'Obrasci – urbanizam, prijava boravka, uvjerenja iz matičnih knjiga'
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
        main: 'https://kotor-varos.com/obrasci/',
        description: 'Obrasci – lokacijska informacija, građevinske dozvole, matični uredi, rodni list'
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
        main: 'https://knezevo.org/obrasci/',
        description: 'Obrasci – urbanizam, zahtjevi za dozvole iz domena poljoprivrede, registracije obrta'
      }
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
      {
        main: 'https://mrkonjicgrad.org/obrasci/',
        description: 'Obrasci – urbanističke saglasnosti, izdavanje uvjerenja'
      }
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
      {
        main: 'https://novi-grad.org/obrasci/',
        description: 'Obrasci – urbanizam, uvjerenja, matični uredi, rodni list, smrtni list'
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
        main: 'https://prijedor.org/obrasci/',
        description: 'Obrasci – urbanizam, građevinske dozvole, uvjerenja o prebivalištu, matični uredi'
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
        main: 'https://kozarska-dubica.com/obrasci/',
        description: 'Obrasci – urbanistička saglasnost, građevinske dozvole, prijava prebivališta'
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
        main: 'https://ostra-luka.org/obrasci/',
        description: 'Obrasci – urbanistička saglasnost, prijava prebivališta, uvjerenja'
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
        main: 'https://teslic.rs.ba/zahtjevi-i-obrasci/',
        description: 'Obrasci – urbanistička saglasnost, građevinske dozvole, uvjerenja iz matičnih knjiga'
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
        main: 'https://modrica.ba/usluge/obrasci/',
        description: 'Obrasci – urbanizam, prijava boravka, uvjerenja o prebivalištu'
      }
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
    region: 'Doboj regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://opstina-brod.net/zahtjevi-i-obrasci/',
        description: 'Obrasci – urbanizam, prijava boravka, uvjerenja iz matičnih knjiga'
      }
    ],
    categories: ['Urbanizam', 'Prijava boravka', 'Matični uredi'],
    komentar: 'Urbanizam i matični uredi'
  },
  {
    id: 'rs-vukosavlje',
    name: 'Vukosavlje',
    region: 'Doboj regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://vukosavlje.org/obrasci/',
        description: 'Obrasci – prijava prebivališta, urbanizam, matični uredi'
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
        main: 'https://opstinapetrovo.org/zahtjevi-i-obrasci/',
        description: 'Obrasci – urbanizam, uvjerenja o prebivalištu, građevinske dozvole'
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
        main: 'https://opstinasamac.org/obrasci/',
        description: 'Obrasci – urbanizam, matični uredi, prijava boravka'
      }
    ],
    categories: ['Urbanizam', 'Matični uredi', 'Prijava boravka'],
    komentar: 'Urbanizam i matični uredi'
  },

  // RS #4 - BIJELJINA REGIJA
  {
    id: 'grad-bijeljina',
    name: 'Grad Bijeljina',
    region: 'Bijeljina regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://bijeljina.org/lat/zahtjevi-i-obrasci.html',
        description: 'Obrasci – urbanizam, lokacijska informacija, građevinske dozvole, matični uredi'
      }
    ],
    categories: ['Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    komentar: 'Obrasci – urbanističke saglasnosti, uvjerenja, matični uredi'
  },
  {
    id: 'rs-ugljevik',
    name: 'Ugljevik',
    region: 'Bijeljina regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://ugljevik.rs.ba/usluge/obrasci/',
        description: 'Obrasci – urbanistička saglasnost, prijava prebivališta, uvjerenja iz matičnih knjiga'
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
        main: 'https://lopare.rs.ba/zahtjevi-i-obrasci/',
        description: 'Obrasci – lokacijska informacija, urbanizam, uvjerenja o prebivalištu'
      }
    ],
    categories: ['Urbanizam', 'Uvjerenja'],
    komentar: 'Lokacijska informacija i uvjerenja'
  },
  {
    id: 'rs-zvornik',
    name: 'Zvornik',
    region: 'Bijeljina regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://opstina-zvornik.org/zahtjevi-i-obrasci/',
        description: 'Obrasci – urbanizam, matični uredi, prijava boravka'
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
        main: 'https://sekovici.org/zahtjevi-i-obrasci/',
        description: 'Obrasci – urbanističke saglasnosti, matični uredi, uvjerenja o prebivalištu'
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
        main: 'https://osmaci.org/obrasci/',
        description: 'Obrasci – prijava prebivališta, urbanizam, matični uredi'
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
        main: 'https://istocnailidza.net/dokumenti-i-obrasci/',
        description: 'Zahtjev za registraciju preduzetničke djelatnosti (SP), dokumenti i obrasci'
      },
      {
        main: 'https://istocnailidza.net/',
        description: 'Službeni portal Opštine Istočna Ilidža'
      }
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
        main: 'https://opstinains.net/usluge/obrasci/',
        description: 'Zahtjev za izdavanje lokacijskih uslova, usluge i obrasci'
      },
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
        main: 'https://pale.rs.ba/dokumenti-i-obrasci/',
        description: 'Obrazac za registraciju preduzetnika i promjenu podataka, dokumenti i obrasci'
      },
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
        main: 'https://trnovo-rs.com/dokumenti/',
        description: 'Zahtjev za jednokratne pomoći i matični uredi, opštinski dokumenti'
      },
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
        main: 'https://opstinaisg.net/dokumenti/',
        description: 'Zahtjev za izdavanje uvjerenja i obrazaca građanskog stanja'
      },
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
      {
        main: 'https://trebinje.rs.ba/obrasci-i-zahtjevi/',
        description: 'Obrasci – urbanizam, građevinske dozvole, lokacijska informacija, matični uredi'
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
        main: 'https://bileca.rs.ba/zahtjevi-i-obrasci/',
        description: 'Obrasci – urbanistička saglasnost, matični uredi, prijava prebivališta'
      }
    ],
    categories: ['Urbanizam', 'Matični uredi', 'Prijava prebivališta'],
    komentar: 'Urbanistička saglasnost i matični uredi'
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
        main: 'https://opstinanevesinje.rs.ba/zahtjevi-i-obrasci/',
        description: 'Obrasci – urbanizam, lokacijska informacija, uvjerenja iz matičnih knjiga'
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
        main: 'https://ljubinje.org/zahtjevi-i-obrasci/',
        description: 'Obrasci – urbanizam, prijava prebivališta, matični uredi'
      }
    ],
    categories: ['Urbanizam', 'Prijava prebivališta', 'Matični uredi'],
    komentar: 'Urbanizam i matični uredi'
  },
  {
    id: 'rs-berkovici',
    name: 'Berkovići',
    region: 'Trebinje regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://berkovici.rs.ba/zahtjevi-i-obrasci/',
        description: 'Obrasci – urbanizam, matični uredi, građevinske dozvole'
      }
    ],
    categories: ['Urbanizam', 'Matični uredi', 'Građevinske dozvole'],
    komentar: 'Urbanizam i matični uredi'
  },
  {
    id: 'rs-istocni-mostar',
    name: 'Istočni Mostar',
    region: 'Trebinje regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://istocnimostar.org/obrasci/',
        description: 'Obrasci – prijava prebivališta, matični uredi, urbanizam'
      }
    ],
    categories: ['Prijava prebivališta', 'Matični uredi', 'Urbanizam'],
    komentar: 'Prijava prebivališta i matični uredi'
  },

  // RS #7 - FOČA REGIJA
  {
    id: 'rs-foca',
    name: 'Foča',
    region: 'Foča regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://opstinafoca.rs.ba/zahtjevi-i-obrasci/',
        description: 'Obrasci – urbanizam, lokacijska informacija, građevinske dozvole, matični uredi'
      }
    ],
    categories: ['Urbanizam', 'Građevinske dozvole', 'Matični uredi'],
    komentar: 'Urbanizam i matični uredi'
  },
  {
    id: 'rs-cajnice',
    name: 'Čajniče',
    region: 'Foča regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://cajnice.rs.ba/obrasci/',
        description: 'Obrasci – urbanizam, matični uredi, prijava prebivališta'
      }
    ],
    categories: ['Urbanizam', 'Matični uredi', 'Prijava prebivališta'],
    komentar: 'Urbanizam i matični uredi'
  },
  {
    id: 'rs-rudo',
    name: 'Rudo',
    region: 'Foča regija',
    entity: 'RS',
    urls: [
      {
        main: 'https://rudo.rs.ba/zahtjevi-i-obrasci/',
        description: 'Obrasci – urbanizam, građevinske dozvole, matični uredi'
      }
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
      {
        main: 'https://novogorazde.rs.ba/zahtjevi-i-obrasci/',
        description: 'Obrasci – urbanizam, prijava prebivališta, matični uredi'
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
        main: 'https://hanpijesak.org/obrasci-i-zahtjevi/',
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
      {
        main: 'https://rogatica.rs.ba/zahtjevi-i-obrasci/',
        description: 'Obrasci – urbanističke saglasnosti, građevinske dozvole, matični uredi'
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
    const cantonMatch = mun.canton?.toLowerCase().includes(searchTerm);
    const regionMatch = mun.region?.toLowerCase().includes(searchTerm);
    const categoryMatch = mun.categories.some(cat => cat.toLowerCase().includes(searchTerm));
    
    return nameMatch || cantonMatch || regionMatch || categoryMatch;
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