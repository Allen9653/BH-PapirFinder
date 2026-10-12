// ============================================================
// Regija SARAJEVSKA (Kanton Sarajevo, BPK Goražde, Istočno Sarajevo)
// Zvanični elektronski obrasci, formulari i e-uprava servisi
// ============================================================

import { MunicipalityForm } from './municipality-registry';

export interface SarajevoRegionMunicipalityConfig {
  slug: string;
  aliases: string[];
  name: string;
  nameCyr?: string;
  region: string;
  regionShort: string;
  entity: 'Federacija BiH' | 'Republika Srpska';
  officialWebsite: string;
  formsUrl: string;
  forms: MunicipalityForm[];
  categories: string[];
}

// ============================================================
// 1. BPK GORAŽDE
// ============================================================

export const gorazdeConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'gorazde',
  aliases: ['grad-gorazde', 'opcina-gorazde'],
  name: 'Grad Goražde',
  nameCyr: 'Град Горажде',
  region: 'BPK Goražde',
  regionShort: 'BPK',
  entity: 'Federacija BiH',
  officialWebsite: 'https://gorazde.ba/',
  formsUrl: 'https://gorazde.ba/gradska-uprava/e-uprava/',
  categories: ['Urbanizam i građenje', 'Inspekcijski poslovi', 'Katastar i nekretnine', 'Finansije i privreda', 'Boračka i socijalna zaštita'],
  forms: [
    {
      id: 'bpk-gorazde-001',
      name: 'Zahtjev za izdavanje urbanističke saglasnosti / Građevinske dozvole',
      pdfUrl: 'https://gorazde.ba/gradska-uprava/e-uprava/',
      category: 'Urbanizam i građenje',
      external: true,
    },
    {
      id: 'bpk-gorazde-002',
      name: 'Zahtjev za inspekcijski nadzor (komunalni, građevinski i tržišni)',
      pdfUrl: 'https://gorazde.ba/wp-content/uploads/2023/06/Zahtjev-za-inspekcijski-nadzor.pdf',
      category: 'Inspekcijski poslovi',
      external: true,
    },
    {
      id: 'bpk-gorazde-003',
      name: 'Elektronski obrasci Službe za katastar nekretnina i imovinsko-pravne poslove',
      pdfUrl: 'https://gorazde.ba/sluzba-ne-poslove-i-katastar-nekretnina/',
      category: 'Katastar i nekretnine',
      external: true,
    },
    {
      id: 'bpk-gorazde-004',
      name: 'Elektronski obrasci Službe za finansije, trezor i privredu (registracija obrta)',
      pdfUrl: 'https://gorazde.ba/sluzba-za-finansije-trezor-i-privredu-elektronski-obrasci/',
      category: 'Finansije i privreda',
      external: true,
    },
    {
      id: 'bpk-gorazde-005',
      name: 'Elektronski obrasci Službe za boračko-invalidsku i socijalnu zaštitu',
      pdfUrl: 'https://gorazde.ba/sluzba-za-boracko-invalidsku-i-socijalnu-zastitu-elektronski-obrasci/',
      category: 'Boračka i socijalna zaštita',
      external: true,
    },
  ],
};

export const palePracaConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'pale-praca',
  aliases: ['praca', 'opcina-pale-praca'],
  name: 'Općina Pale-Prača',
  nameCyr: 'Опћина Пале-Прача',
  region: 'BPK Goražde',
  regionShort: 'BPK',
  entity: 'Federacija BiH',
  officialWebsite: 'https://praca.ba/',
  formsUrl: 'https://praca.ba/?s=Obrazac',
  categories: ['Opća uprava', 'Zahtjevi i obrasci', 'Matični uredi'],
  forms: [
    {
      id: 'bpk-praca-001',
      name: 'Zahtjevi i obrasci općinske službe Pale-Prača',
      pdfUrl: 'https://praca.ba/?s=Obrazac',
      category: 'Zahtjevi i obrasci',
      external: true,
    },
    {
      id: 'bpk-praca-002',
      name: 'Zahtjev za izdavanje izvoda iz matičnih knjiga i uvjerenja',
      pdfUrl: 'https://praca.ba/?s=Obrazac',
      category: 'Matični uredi',
      external: true,
    },
  ],
};

export const focaUstikolinaConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'foca-ustikolina',
  aliases: ['ustikolina', 'opcina-foca-ustikolina'],
  name: 'Općina Foča-Ustikolina',
  nameCyr: 'Опћина Фоча-Устиколина',
  region: 'BPK Goražde',
  regionShort: 'BPK',
  entity: 'Federacija BiH',
  officialWebsite: 'https://foca-ustikolina.ba/',
  formsUrl: 'https://foca-ustikolina.ba/dokumenti/',
  categories: ['Komunalne takse', 'Takseni zahtjevi', 'Opća uprava'],
  forms: [
    {
      id: 'bpk-ustikolina-001',
      name: 'Obrazac za prijavu komunalnih taksi i taksenih zahtjeva',
      pdfUrl: 'https://foca-ustikolina.ba/dokumenti/',
      category: 'Komunalne takse',
      external: true,
    },
    {
      id: 'bpk-ustikolina-002',
      name: 'Službeni dokumenti i upravni obrasci Općine Foča-Ustikolina',
      pdfUrl: 'https://foca-ustikolina.ba/dokumenti/',
      category: 'Opća uprava',
      external: true,
    },
  ],
};

// ============================================================
// 2. KANTON SARAJEVO (KS)
// ============================================================

export const stariGradSarajevoConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'stari-grad-sarajevo',
  aliases: ['stari-grad', 'opcina-stari-grad', 'stari-grad-sa'],
  name: 'Općina Stari Grad Sarajevo',
  nameCyr: 'Опћина Стари Град Сарајево',
  region: 'Kanton Sarajevo',
  regionShort: 'KS',
  entity: 'Federacija BiH',
  officialWebsite: 'https://starigrad.ba/',
  formsUrl: 'https://starigrad.ba/v2/e_uprava.php',
  categories: ['Matični uredi', 'E-uprava', 'Građanska stanja', 'Urbanizam i građenje', 'Punomoći i izjave'],
  forms: [
    {
      id: 'ks-stari-grad-001',
      name: 'Zahtjev za izvod iz matične knjige rođenih/vjenčanih/umrlih (e-Uprava)',
      pdfUrl: 'https://starigrad.ba/v2/e_uprava.php',
      category: 'Matični uredi',
      external: true,
    },
    {
      id: 'ks-stari-grad-002',
      name: 'Obrazac za punomoć i izjava o zajedničkom domaćinstvu',
      pdfUrl: 'https://starigrad.ba/v2/e_uprava.php',
      category: 'Punomoći i izjave',
      external: true,
    },
    {
      id: 'ks-stari-grad-003',
      name: 'Zahtjev za urbanističku saglasnost i građevinsku dozvolu',
      pdfUrl: 'https://starigrad.ba/v2/e_uprava.php',
      category: 'Urbanizam i građenje',
      external: true,
    },
  ],
};

export const centarSarajevoConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'centar-sarajevo',
  aliases: ['centar', 'opcina-centar', 'sarajevo-centar'],
  name: 'Općina Centar Sarajevo',
  nameCyr: 'Опћина Центар Сарајево',
  region: 'Kanton Sarajevo',
  regionShort: 'KS',
  entity: 'Federacija BiH',
  officialWebsite: 'https://centar.ba/',
  formsUrl: 'https://centar.ba/e-uprava/obrasci',
  categories: ['Privreda i obrt', 'E-uprava', 'Urbanizam i građenje', 'Matični uredi', 'Deklaracije'],
  forms: [
    {
      id: 'ks-centar-001',
      name: 'Zahtjev za registraciju samostalne djelatnosti (obrt)',
      pdfUrl: 'https://centar.ba/e-uprava/obrasci',
      category: 'Privreda i obrt',
      external: true,
    },
    {
      id: 'ks-centar-002',
      name: 'Formular deklaracije OPC-01.1 (Izjava o podacima)',
      pdfUrl: 'https://centar.ba/e-uprava/obrasci',
      category: 'Deklaracije',
      external: true,
    },
    {
      id: 'ks-centar-003',
      name: 'Zahtjevi i obrasci Službe za prostorno uređenje i komunalne poslove',
      pdfUrl: 'https://centar.ba/e-uprava/obrasci',
      category: 'Urbanizam i građenje',
      external: true,
    },
  ],
};

export const ilidzaConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'ilidza',
  aliases: ['opcina-ilidza'],
  name: 'Općina Ilidža',
  nameCyr: 'Опћина Илиџа',
  region: 'Kanton Sarajevo',
  regionShort: 'KS',
  entity: 'Federacija BiH',
  officialWebsite: 'https://opcinailidza.ba/',
  formsUrl: 'https://opcinailidza.ba/obrasci',
  categories: ['Urbanizam i lokacija', 'Matični uredi', 'Privreda i finansije', 'Imovinsko-pravni poslovi'],
  forms: [
    {
      id: 'ks-ilidza-001',
      name: 'Zahtjev za izdavanje lokacijske informacije i urbanističkih uslova',
      pdfUrl: 'https://opcinailidza.ba/obrasci',
      category: 'Urbanizam i lokacija',
      external: true,
    },
    {
      id: 'ks-ilidza-002',
      name: 'Obrasci Službe za opću upravu i matične poslove Ilidža',
      pdfUrl: 'https://opcinailidza.ba/obrasci',
      category: 'Matični uredi',
      external: true,
    },
    {
      id: 'ks-ilidza-003',
      name: 'Zahtjev za izdavanje odobrenja za građenje i upotrebu objekta',
      pdfUrl: 'https://opcinailidza.ba/obrasci',
      category: 'Urbanizam i lokacija',
      external: true,
    },
  ],
};

export const noviGradSarajevoConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'novi-grad-sarajevo',
  aliases: ['novi-grad', 'opcina-novi-grad', 'novi-grad-sa'],
  name: 'Općina Novi Grad Sarajevo',
  nameCyr: 'Опћина Нови Град Сарајево',
  region: 'Kanton Sarajevo',
  regionShort: 'KS',
  entity: 'Federacija BiH',
  officialWebsite: 'https://novigradsarajevo.ba/',
  formsUrl: 'https://novigradsarajevo.ba/e-uprava',
  categories: ['Socijalna zaštita', 'E-uprava', 'Matični uredi', 'Prebivalište i CIPS', 'Urbanizam'],
  forms: [
    {
      id: 'ks-novi-grad-001',
      name: 'Zahtjev za jednokratnu novčanu pomoć / Prijemni obrasci',
      pdfUrl: 'https://novigradsarajevo.ba/e-uprava',
      category: 'Socijalna zaštita',
      external: true,
    },
    {
      id: 'ks-novi-grad-002',
      name: 'Obrasci za prijavu prebivališta i izdavanje ličnih dokumenata',
      pdfUrl: 'https://novigradsarajevo.ba/e-uprava',
      category: 'Prebivalište i CIPS',
      external: true,
    },
    {
      id: 'ks-novi-grad-003',
      name: 'Prijemni obrasci za urbanizam, stambene i imovinske poslove',
      pdfUrl: 'https://novigradsarajevo.ba/e-uprava',
      category: 'Urbanizam',
      external: true,
    },
  ],
};

export const novoSarajevoConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'novo-sarajevo',
  aliases: ['opcina-novo-sarajevo'],
  name: 'Općina Novo Sarajevo',
  nameCyr: 'Опћина Ново Сарајево',
  region: 'Kanton Sarajevo',
  regionShort: 'KS',
  entity: 'Federacija BiH',
  officialWebsite: 'https://novosarajevo.ba/',
  formsUrl: 'https://novosarajevo.ba/e-uprava/obrasci/',
  categories: ['Ovjere i prepisi', 'E-uprava', 'Matični uredi', 'Urbanizam i građenje', 'Privreda'],
  forms: [
    {
      id: 'ks-novo-sarajevo-001',
      name: 'Zahtjev za ovjeru potpisa, rukopisa i prepisa',
      pdfUrl: 'https://novosarajevo.ba/e-uprava/obrasci/',
      category: 'Ovjere i prepisi',
      external: true,
    },
    {
      id: 'ks-novo-sarajevo-002',
      name: 'Obrasci Službe za prostorno uređenje i urbanizam Novo Sarajevo',
      pdfUrl: 'https://novosarajevo.ba/e-uprava/obrasci/',
      category: 'Urbanizam i građenje',
      external: true,
    },
    {
      id: 'ks-novo-sarajevo-003',
      name: 'Zahtjev za izdavanje uvjerenja o činjenicama iz matičnih knjiga',
      pdfUrl: 'https://novosarajevo.ba/e-uprava/obrasci/',
      category: 'Matični uredi',
      external: true,
    },
  ],
};

export const vogoscaConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'vogosca',
  aliases: ['opcina-vogosca'],
  name: 'Općina Vogošća',
  nameCyr: 'Опћина Вогошћа',
  region: 'Kanton Sarajevo',
  regionShort: 'KS',
  entity: 'Federacija BiH',
  officialWebsite: 'https://vogosca.ba/',
  formsUrl: 'https://vogosca.ba/e-uprava/obrasci/',
  categories: ['Građanska stanja', 'Naknade porodiljama', 'Socijalna zaštita', 'Urbanizam', 'E-uprava'],
  forms: [
    {
      id: 'ks-vogosca-001',
      name: 'Zahtjev za naknadu porodiljama / Građanska stanja',
      pdfUrl: 'https://vogosca.ba/e-uprava/obrasci/',
      category: 'Naknade porodiljama',
      external: true,
    },
    {
      id: 'ks-vogosca-002',
      name: 'Zahtjevi i formulari Službe za opću upravu Općine Vogošća',
      pdfUrl: 'https://vogosca.ba/e-uprava/obrasci/',
      category: 'Građanska stanja',
      external: true,
    },
    {
      id: 'ks-vogosca-003',
      name: 'Obrasci za urbanističke i komunalne saglasnosti',
      pdfUrl: 'https://vogosca.ba/e-uprava/obrasci/',
      category: 'Urbanizam',
      external: true,
    },
  ],
};

export const hadziciConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'hadzici',
  aliases: ['opcina-hadzici'],
  name: 'Općina Hadžići',
  nameCyr: 'Опћина Хаџићи',
  region: 'Kanton Sarajevo',
  regionShort: 'KS',
  entity: 'Federacija BiH',
  officialWebsite: 'https://hadzici.ba/',
  formsUrl: 'https://hadzici.ba/e-uprava',
  categories: ['Matični uredi', 'E-uprava', 'Građanska stanja', 'Urbanizam i imovina'],
  forms: [
    {
      id: 'ks-hadzici-001',
      name: 'Zahtjev za izdavanje izvoda iz matičnih knjiga (e-Uprava)',
      pdfUrl: 'https://hadzici.ba/e-uprava',
      category: 'Matični uredi',
      external: true,
    },
    {
      id: 'ks-hadzici-002',
      name: 'Zahtjev za uvjerenje o državljanstvu i slobodnom bračnom stanju',
      pdfUrl: 'https://hadzici.ba/e-uprava',
      category: 'Građanska stanja',
      external: true,
    },
  ],
};

export const trnovoFBiHConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'trnovo-fbih',
  aliases: ['trnovo', 'opcina-trnovo', 'trnovo-sa'],
  name: 'Općina Trnovo (FBiH)',
  nameCyr: 'Опћина Трново (ФБиХ)',
  region: 'Kanton Sarajevo',
  regionShort: 'KS',
  entity: 'Federacija BiH',
  officialWebsite: 'https://trnovo.ba/',
  formsUrl: 'https://trnovo.ba/dokumenti/obrasci/',
  categories: ['Urbanizam i građenje', 'Komunalni priključak', 'Matični uredi', 'Dokumenti i obrasci'],
  forms: [
    {
      id: 'ks-trnovo-001',
      name: 'Zahtjev za odobrenje građenja i komunalni priključak',
      pdfUrl: 'https://trnovo.ba/dokumenti/obrasci/',
      category: 'Urbanizam i građenje',
      external: true,
    },
    {
      id: 'ks-trnovo-002',
      name: 'Službeni obrasci i formulari Općine Trnovo FBiH',
      pdfUrl: 'https://trnovo.ba/dokumenti/obrasci/',
      category: 'Dokumenti i obrasci',
      external: true,
    },
  ],
};

export const ilijasConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'ilijas',
  aliases: ['opcina-ilijas'],
  name: 'Općina Ilijaš',
  nameCyr: 'Опћина Илијаш',
  region: 'Kanton Sarajevo',
  regionShort: 'KS',
  entity: 'Federacija BiH',
  officialWebsite: 'https://ilijas.ba/',
  formsUrl: 'https://ilijas.ba/e-uprava/obrasci',
  categories: ['Boračko-invalidska zaštita', 'Dopunski oblici zaštite', 'E-uprava', 'Matični uredi', 'Urbanizam'],
  forms: [
    {
      id: 'ks-ilijas-001',
      name: 'Zahtjev za utvrđivanje prava na dopunske oblike zaštite',
      pdfUrl: 'https://ilijas.ba/e-uprava/obrasci',
      category: 'Dopunski oblici zaštite',
      external: true,
    },
    {
      id: 'ks-ilijas-002',
      name: 'Obrasci Službe za društvene djelatnosti i boračko-invalidsku zaštitu',
      pdfUrl: 'https://ilijas.ba/e-uprava/obrasci',
      category: 'Boračko-invalidska zaštita',
      external: true,
    },
    {
      id: 'ks-ilijas-003',
      name: 'Obrasci Službe za prostorno uređenje i stambeno-komunalne poslove',
      pdfUrl: 'https://ilijas.ba/e-uprava/obrasci',
      category: 'Urbanizam',
      external: true,
    },
  ],
};

export const gradSarajevoConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'grad-sarajevo',
  aliases: ['sarajevo', 'gradska-uprava-sarajevo'],
  name: 'Grad Sarajevo',
  nameCyr: 'Град Сарајево',
  region: 'Kanton Sarajevo',
  regionShort: 'KS',
  entity: 'Federacija BiH',
  officialWebsite: 'https://www.sarajevo.ba/',
  formsUrl: 'https://www.sarajevo.ba/bs/category/145/1',
  categories: ['Urbanistička saglasnost', 'Uvjerenja', 'Lokacijska informacija', 'Gradska uprava'],
  forms: [
    {
      id: 'ks-grad-sarajevo-001',
      name: 'Zahtjev za uvjerenja, urbanistička saglasnost i lokacijska informacija',
      pdfUrl: 'https://www.sarajevo.ba/bs/category/145/1',
      category: 'Urbanistička saglasnost',
      external: true,
    },
  ],
};

// ============================================================
// 3. ISTOČNO SARAJEVO (RS)
// ============================================================

export const gradIstocnoSarajevoConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'grad-istocno-sarajevo',
  aliases: ['istocno-sarajevo', 'grad-istocno-sa'],
  name: 'Grad Istočno Sarajevo',
  nameCyr: 'Град Источно Сарајево',
  region: 'Istočno Sarajevo',
  regionShort: 'IS',
  entity: 'Republika Srpska',
  officialWebsite: 'https://gradistocnosarajevo.net/',
  formsUrl: 'https://gradistocnosarajevo.net/dokumenti/',
  categories: ['Gradska uprava', 'Zvanični obrasci', 'Zahtjevi', 'Matični uredi'],
  forms: [
    {
      id: 'is-grad-001',
      name: 'Zvanični obrasci i zahtjevi gradske uprave Istočno Sarajevo',
      pdfUrl: 'https://gradistocnosarajevo.net/dokumenti/',
      category: 'Zvanični obrasci',
      external: true,
    },
    {
      id: 'is-grad-002',
      name: 'Zahtjevi Odjeljenja za privredu i društvene djelatnosti Grada',
      pdfUrl: 'https://gradistocnosarajevo.net/dokumenti/',
      category: 'Zahtjevi',
      external: true,
    },
  ],
};

export const istocnaIlidzaConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'istocna-ilidza',
  aliases: ['opstina-istocna-ilidza'],
  name: 'Opština Istočna Ilidža',
  nameCyr: 'Општина Источна Илиџа',
  region: 'Istočno Sarajevo',
  regionShort: 'IS',
  entity: 'Republika Srpska',
  officialWebsite: 'https://istocnailidza.net/',
  formsUrl: 'https://istocnailidza.net/dokumenti-i-obrasci/',
  categories: ['Preduzetništvo (SP)', 'Urbanizam i lokacijski uslovi', 'Matični uredi', 'Uvjerenja'],
  forms: [
    {
      id: 'is-ilidza-001',
      name: 'Zahtjev za registraciju preduzetničke djelatnosti (SP)',
      pdfUrl: 'https://istocnailidza.net/dokumenti-i-obrasci/',
      category: 'Preduzetništvo (SP)',
      external: true,
    },
    {
      id: 'is-ilidza-002',
      name: 'Zahtjev za izdavanje lokacijskih uslova i građevinske dozvole',
      pdfUrl: 'https://istocnailidza.net/dokumenti-i-obrasci/',
      category: 'Urbanizam i lokacijski uslovi',
      external: true,
    },
    {
      id: 'is-ilidza-003',
      name: 'Zahtjev za izvod iz matične knjige rođenih, vjenčanih i umrlih',
      pdfUrl: 'https://istocnailidza.net/dokumenti-i-obrasci/',
      category: 'Matični uredi',
      external: true,
    },
  ],
};

export const istocnoNovoSarajevoConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'istocno-novo-sarajevo',
  aliases: ['opstina-istocno-novo-sarajevo', 'ins'],
  name: 'Opština Istočno Novo Sarajevo',
  nameCyr: 'Општина Источно Ново Сарајево',
  region: 'Istočno Sarajevo',
  regionShort: 'IS',
  entity: 'Republika Srpska',
  officialWebsite: 'https://opstinains.net/',
  formsUrl: 'https://opstinains.net/usluge/obrasci/',
  categories: ['Lokacijski uslovi', 'Urbanizam', 'Usluge i obrasci', 'Matični uredi', 'Privreda'],
  forms: [
    {
      id: 'is-ins-001',
      name: 'Zahtjev za izdavanje lokacijskih uslova',
      pdfUrl: 'https://opstinains.net/usluge/obrasci/',
      category: 'Lokacijski uslovi',
      external: true,
    },
    {
      id: 'is-ins-002',
      name: 'Obrasci Odjeljenja za prostorno uređenje i stambeno-komunalne poslove',
      pdfUrl: 'https://opstinains.net/usluge/obrasci/',
      category: 'Urbanizam',
      external: true,
    },
    {
      id: 'is-ins-003',
      name: 'Zahtjev za registraciju samostalnog preduzetnika (SP)',
      pdfUrl: 'https://opstinains.net/usluge/obrasci/',
      category: 'Privreda',
      external: true,
    },
  ],
};

export const paleRSConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'pale',
  aliases: ['opstina-pale', 'pale-rs'],
  name: 'Opština Pale (RS)',
  nameCyr: 'Општина Пале (РС)',
  region: 'Istočno Sarajevo',
  regionShort: 'IS',
  entity: 'Republika Srpska',
  officialWebsite: 'https://pale.rs.ba/',
  formsUrl: 'https://pale.rs.ba/dokumenti-i-obrasci/',
  categories: ['Preduzetništvo i privreda', 'Građevinske dozvole', 'Urbanizam', 'Matični uredi'],
  forms: [
    {
      id: 'is-pale-001',
      name: 'Obrazac za registraciju preduzetnika i promjenu podataka',
      pdfUrl: 'https://pale.rs.ba/dokumenti-i-obrasci/',
      category: 'Preduzetništvo i privreda',
      external: true,
    },
    {
      id: 'is-pale-002',
      name: 'Zahtjev za izdavanje građevinske i upotrebne dozvole',
      pdfUrl: 'https://pale.rs.ba/dokumenti-i-obrasci/',
      category: 'Građevinske dozvole',
      external: true,
    },
    {
      id: 'is-pale-003',
      name: 'Zahtjevi za izvode iz matične službe Opštine Pale',
      pdfUrl: 'https://pale.rs.ba/dokumenti-i-obrasci/',
      category: 'Matični uredi',
      external: true,
    },
  ],
};

export const trnovoRSConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'trnovo-rs',
  aliases: ['opstina-trnovo-rs'],
  name: 'Opština Trnovo (RS)',
  nameCyr: 'Општина Трново (РС)',
  region: 'Istočno Sarajevo',
  regionShort: 'IS',
  entity: 'Republika Srpska',
  officialWebsite: 'https://trnovo-rs.com/',
  formsUrl: 'https://trnovo-rs.com/dokumenti/',
  categories: ['Jednokratne pomoći', 'Matični uredi', 'Socijalna zaštita', 'Opštinski dokumenti'],
  forms: [
    {
      id: 'is-trnovo-001',
      name: 'Zahtjev za jednokratne pomoći i socijalna davanja',
      pdfUrl: 'https://trnovo-rs.com/dokumenti/',
      category: 'Jednokratne pomoći',
      external: true,
    },
    {
      id: 'is-trnovo-002',
      name: 'Zahtjev za izdavanje uvjerenja i izvoda matične službe',
      pdfUrl: 'https://trnovo-rs.com/dokumenti/',
      category: 'Matični uredi',
      external: true,
    },
  ],
};

export const istocniStariGradConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'istocni-stari-grad',
  aliases: ['opstina-istocni-stari-grad', 'isg'],
  name: 'Opština Istočni Stari Grad',
  nameCyr: 'Општина Источни Стари Град',
  region: 'Istočno Sarajevo',
  regionShort: 'IS',
  entity: 'Republika Srpska',
  officialWebsite: 'https://opstinaisg.net/',
  formsUrl: 'https://opstinaisg.net/dokumenti/',
  categories: ['Građansko stanje', 'Uvjerenja', 'Matični uredi', 'Urbanizam'],
  forms: [
    {
      id: 'is-isg-001',
      name: 'Zahtjev za izdavanje uvjerenja i obrazaca građanskog stanja',
      pdfUrl: 'https://opstinaisg.net/dokumenti/',
      category: 'Građansko stanje',
      external: true,
    },
    {
      id: 'is-isg-002',
      name: 'Dokumenti i obrasci opštinske uprave Istočni Stari Grad',
      pdfUrl: 'https://opstinaisg.net/dokumenti/',
      category: 'Uvjerenja',
      external: true,
    },
  ],
};

export const sokolacConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'sokolac',
  aliases: ['opstina-sokolac'],
  name: 'Opština Sokolac',
  nameCyr: 'Општина Соколац',
  region: 'Istočno Sarajevo',
  regionShort: 'IS',
  entity: 'Republika Srpska',
  officialWebsite: 'https://opstinasokolac.net/',
  formsUrl: 'https://opstinasokolac.net/obrasci/',
  categories: ['Ekološka dozvola', 'Urbanizam', 'Građevinske dozvole', 'Matični uredi', 'Privreda'],
  forms: [
    {
      id: 'is-sokolac-001',
      name: 'Zahtjev za izdavanje ekološke dozvole / Urbanizam',
      pdfUrl: 'https://opstinasokolac.net/obrasci/',
      category: 'Ekološka dozvola',
      external: true,
    },
    {
      id: 'is-sokolac-002',
      name: 'Zahtjev za građevinsku dozvolu i lokacijske uslove',
      pdfUrl: 'https://opstinasokolac.net/obrasci/',
      category: 'Urbanizam',
      external: true,
    },
    {
      id: 'is-sokolac-003',
      name: 'Obrasci matične službe i prijava preduzetnika',
      pdfUrl: 'https://opstinasokolac.net/obrasci/',
      category: 'Matični uredi',
      external: true,
    },
  ],
};

// ============================================================
// 4. REGIJA FOČA / DRINA
// ============================================================

export const focaRSConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'foca-rs',
  aliases: ['foca', 'opstina-foca'],
  name: 'Opština Foča (RS)',
  nameCyr: 'Општина Фоча (РС)',
  region: 'Regija Foča / Drina',
  regionShort: 'Foča/Drina',
  entity: 'Republika Srpska',
  officialWebsite: 'https://foca.rs.ba/',
  formsUrl: 'https://foca.rs.ba/usluge/obrasci/',
  categories: ['Preduzetništvo SP', 'Usluge i obrasci', 'Urbanizam', 'Matični uredi'],
  forms: [
    {
      id: 'drina-foca-001',
      name: 'Zahtjev za registraciju preduzetnika SP-1',
      pdfUrl: 'https://foca.rs.ba/usluge/obrasci/',
      category: 'Preduzetništvo SP',
      external: true,
    },
    {
      id: 'drina-foca-002',
      name: 'Zvanični obrasci i usluge opštinske uprave Foča',
      pdfUrl: 'https://foca.rs.ba/usluge/obrasci/',
      category: 'Usluge i obrasci',
      external: true,
    },
  ],
};

export const cajniceConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'cajnice',
  aliases: ['opstina-cajnice'],
  name: 'Opština Čajniče',
  nameCyr: 'Општина Чајниче',
  region: 'Regija Foča / Drina',
  regionShort: 'Foča/Drina',
  entity: 'Republika Srpska',
  officialWebsite: 'https://opstinacajnice.rs.ba/',
  formsUrl: 'https://cajnice.rs.ba/dokumenti/',
  categories: ['Matične knjige', 'Opšta uprava', 'Građanska stanja'],
  forms: [
    {
      id: 'drina-cajnice-001',
      name: 'Obrazac za naknadni upis u matične knjige',
      pdfUrl: 'https://cajnice.rs.ba/dokumenti/',
      category: 'Matične knjige',
      external: true,
    },
    {
      id: 'drina-cajnice-002',
      name: 'Zvanični dokumenti i zahtjevi opštinske uprave Čajniče',
      pdfUrl: 'https://cajnice.rs.ba/dokumenti/',
      category: 'Opšta uprava',
      external: true,
    },
  ],
};

export const rudoConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'rudo',
  aliases: ['opstina-rudo'],
  name: 'Opština Rudo',
  nameCyr: 'Општина Рудо',
  region: 'Regija Foča / Drina',
  regionShort: 'Foča/Drina',
  entity: 'Republika Srpska',
  officialWebsite: 'https://opstinarudo.com/',
  formsUrl: 'https://opstinarudo.com/gradjevinske-dozvole/',
  categories: ['Poljoprivreda', 'Preduzetništvo SP', 'Građevinske dozvole', 'Opšta uprava'],
  forms: [
    {
      id: 'drina-rudo-001',
      name: 'Zahtjev za podsticaje u poljoprivredi i registraciju SP',
      pdfUrl: 'https://opstinarudo.com/gradjevinske-dozvole/',
      category: 'Poljoprivreda',
      external: true,
    },
    {
      id: 'drina-rudo-002',
      name: 'Zahtjev za građevinske dozvole i urbanističku saglasnost',
      pdfUrl: 'https://opstinarudo.com/gradjevinske-dozvole/',
      category: 'Građevinske dozvole',
      external: true,
    },
  ],
};

export const novoGorazdeConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'novo-gorazde',
  aliases: ['opstina-novo-gorazde'],
  name: 'Opština Novo Goražde',
  nameCyr: 'Општина Ново Горажде',
  region: 'Regija Foča / Drina',
  regionShort: 'Foča/Drina',
  entity: 'Republika Srpska',
  officialWebsite: 'https://novogorazde.rs.ba/',
  formsUrl: 'https://novogorazde.net/dokumenti/',
  categories: ['Privreda', 'Opšta uprava', 'Matični uredi'],
  forms: [
    {
      id: 'drina-ng-001',
      name: 'Zahtjevi Odjeljenja za privredu i opštu upravu',
      pdfUrl: 'https://novogorazde.net/dokumenti/',
      category: 'Privreda',
      external: true,
    },
    {
      id: 'drina-ng-002',
      name: 'Zvanični dokumenti i obrasci prijemne kancelarije',
      pdfUrl: 'https://novogorazde.net/dokumenti/',
      category: 'Opšta uprava',
      external: true,
    },
  ],
};

// ============================================================
// 5. SARAJEVSKO-ROMANIJSKA REGIJA
// ============================================================

export const hanPijesakConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'han-pijesak',
  aliases: ['opstina-han-pijesak'],
  name: 'Opština Han Pijesak',
  nameCyr: 'Општина Хан Пијесак',
  region: 'Sarajevsko-Romanijska',
  regionShort: 'Romanija',
  entity: 'Republika Srpska',
  officialWebsite: 'https://hanpijesak.org/',
  formsUrl: 'https://hanpijesak.org/dokumenti/',
  categories: ['Prijemna kancelarija', 'Opšta uprava', 'Matični uredi', 'Urbanizam'],
  forms: [
    {
      id: 'rom-hp-001',
      name: 'Zahtjevi prijemne kancelarije i opšte uprave',
      pdfUrl: 'https://hanpijesak.org/dokumenti/',
      category: 'Prijemna kancelarija',
      external: true,
    },
    {
      id: 'rom-hp-002',
      name: 'Dokumenti i uvjerenja opštine Han Pijesak',
      pdfUrl: 'https://hanpijesak.org/dokumenti/',
      category: 'Opšta uprava',
      external: true,
    },
  ],
};

export const rogaticaConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'rogatica',
  aliases: ['opstina-rogatica'],
  name: 'Opština Rogatica',
  nameCyr: 'Општина Рогатица',
  region: 'Sarajevsko-Romanijska',
  regionShort: 'Romanija',
  entity: 'Republika Srpska',
  officialWebsite: 'https://rogatica.ba/',
  formsUrl: 'https://rogatica.ba/dokumenti/obrasci/',
  categories: ['Upotrebna dozvola', 'Komunalne takse', 'Urbanizam', 'Matični uredi'],
  forms: [
    {
      id: 'rom-rogatica-001',
      name: 'Zahtjev za izdavanje upotrebe objekta i komunalne takse',
      pdfUrl: 'https://rogatica.ba/dokumenti/obrasci/',
      category: 'Upotrebna dozvola',
      external: true,
    },
    {
      id: 'rom-rogatica-002',
      name: 'Obrasci Odjeljenja za prostorno uređenje i stambeno-komunalne poslove',
      pdfUrl: 'https://rogatica.ba/dokumenti/obrasci/',
      category: 'Urbanizam',
      external: true,
    },
  ],
};

// ============================================================
// Kolekcija svih konfiguracija regija (Sarajevo, BPK, IS, Foča/Drina, Romanija)
// ============================================================

export const sarajevoRegionConfigs: SarajevoRegionMunicipalityConfig[] = [
  // BPK Goražde
  gorazdeConfig,
  palePracaConfig,
  focaUstikolinaConfig,
  // Kanton Sarajevo
  stariGradSarajevoConfig,
  centarSarajevoConfig,
  ilidzaConfig,
  noviGradSarajevoConfig,
  novoSarajevoConfig,
  vogoscaConfig,
  hadziciConfig,
  trnovoFBiHConfig,
  ilijasConfig,
  gradSarajevoConfig,
  // Istočno Sarajevo
  gradIstocnoSarajevoConfig,
  istocnaIlidzaConfig,
  istocnoNovoSarajevoConfig,
  paleRSConfig,
  trnovoRSConfig,
  istocniStariGradConfig,
  sokolacConfig,
  // Regija Foča / Drina
  focaRSConfig,
  cajniceConfig,
  rudoConfig,
  novoGorazdeConfig,
  // Sarajevsko-Romanijska
  hanPijesakConfig,
  rogaticaConfig,
];
