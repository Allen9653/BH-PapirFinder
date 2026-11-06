// ============================================================
// Regija SARAJEVSKA (Kanton Sarajevo, BPK Goražde, Istočno Sarajevo)
// Zvanični elektronski obrasci, formulari i e-uprava servisi
// ============================================================

import { MunicipalityForm } from './municipality-registry';
import { citlukForms, CITLUK_FORMS_SOURCE_URL, CITLUK_OFFICIAL_URL } from './citluk-forms';

const CENTAR_E_MATICAR_URL = 'https://www.centar.ba/e-uprava/e-maticar';

export interface SarajevoRegionMunicipalityConfig {
  slug: string;
  aliases: string[];
  name: string;
  nameCyr?: string;
  region: string;
  regionShort: string;
  entity: 'Federacija BiH' | 'Republika Srpska';
  officialWebsite?: string;
  formsUrl?: string;
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
  formsUrl: 'https://gorazde.ba/sluzba-za-finansije-trezor-i-privredu-elektronski-obrasci/',
  categories: ['Urbanizam i građenje', 'Inspekcijski poslovi', 'Katastar i nekretnine', 'Finansije i privreda', 'Boračka i socijalna zaštita'],
  forms: [
    {
      id: 'bpk-gorazde-001',
      name: 'Zahtjev za izdavanje urbanističke saglasnosti / Građevinske dozvole',
      pdfUrl: 'https://gorazde.ba/sluzba-za-prostorno-uredjenje-stambeno-komunalne-poslove-i-raseljena-lica-elektronski-obrasci/',
      category: 'Urbanizam i građenje',
      external: true,
    },
    {
      id: 'bpk-gorazde-002',
      name: 'Zahtjev za inspekcijski nadzor (komunalni, građevinski i tržišni)',
      pdfUrl: 'https://gorazde.ba/sluzba-za-inspekcijske-poslove-elektronski-obrasci/',
      category: 'Inspekcijski poslovi',
      external: true,
    },
    {
      id: 'bpk-gorazde-003',
      name: 'Elektronski obrasci Službe za katastar nekretnina i imovinsko-pravne poslove',
      pdfUrl: 'https://gorazde.ba/sluzba-za-geodetske-imovinsko-pravne-poslove-i-katastar-nekretnina/',
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
    {
      id: 'bpk-gorazde-006',
      name: 'Elektronski obrasci Službe za civilnu zaštitu i mjesne zajednice',
      pdfUrl: 'https://gorazde.ba/sluzba-za-civilnu-zastitu-i-mjesne-zajednice-elektronski-obrasci/',
      category: 'Civilna zaštita',
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
  officialWebsite: 'http://praca.ba/',
  formsUrl: 'http://praca.ba/',
  categories: ['Opća uprava', 'Zahtjevi i obrasci', 'Matični uredi'],
  forms: [
    {
      id: 'bpk-praca-001',
      name: 'Zahtjevi i obrasci općinske službe Pale-Prača',
      pdfUrl: 'http://praca.ba/',
      category: 'Zahtjevi i obrasci',
      external: true,
    },
    {
      id: 'bpk-praca-002',
      name: 'Zahtjev za izdavanje izvoda iz matičnih knjiga i uvjerenja',
      pdfUrl: 'http://praca.ba/',
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
  formsUrl: 'https://foca-ustikolina.ba/wp-content/uploads/2022/10/ZAHTJEV_urbanistickaSaglasnost.pdf',
  categories: ['Komunalne takse', 'Takseni zahtjevi', 'Opća uprava'],
  forms: [
    {
      id: 'bpk-ustikolina-001',
      name: 'Zahtjev za izdavanje urbanističke saglasnosti',
      pdfUrl: 'https://foca-ustikolina.ba/wp-content/uploads/2022/10/ZAHTJEV_urbanistickaSaglasnost.pdf',
      category: 'Urbanizam i prostorno uređenje',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'bpk-ustikolina-002',
      name: 'Zahtjev za izdavanje odobrenja za građenje',
      pdfUrl: 'https://foca-ustikolina.ba/wp-content/uploads/2022/10/ZAHTJEV_ZA_IZDAVANJE_ODOBRENJA_ZA_GRADNJU.pdf',
      category: 'Urbanizam i prostorno uređenje',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'bpk-ustikolina-003',
      name: 'Zahtjev za izdavanje prethodne vodne saglasnosti',
      pdfUrl: 'https://foca-ustikolina.ba/wp-content/uploads/2022/10/Zahtjev_Izdavanje_prethodne_vodne_saglasnosti.pdf',
      category: 'Vodoprivreda',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'bpk-ustikolina-004',
      name: 'Zahtjev za odobrenje za upotrebu individualnog objekta',
      pdfUrl: 'https://foca-ustikolina.ba/wp-content/uploads/2022/10/ZAHTJEV_ZA_IZDAVANJE_ODOBRENJA_ZA_UPOTREBU_OBJEKTA-_INDIVIDUALNI_OBJEKTI.pdf',
      category: 'Urbanizam i prostorno uređenje',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'bpk-ustikolina-005',
      name: 'Zahtjev za izdavanje upotrebne dozvole',
      pdfUrl: 'https://foca-ustikolina.ba/wp-content/uploads/2022/10/ZAHTJEV_ZA_IZDAVANJE_UPOTREBNE_DOZVOLE.pdf',
      category: 'Urbanizam i prostorno uređenje',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'bpk-ustikolina-006',
      name: 'Zahtjev za privremeno priključenje na električnu mrežu',
      pdfUrl: 'https://foca-ustikolina.ba/wp-content/uploads/2022/10/ZahtjevPrivremenoPrikljucenjeNaElMrezu.pdf',
      category: 'Komunalne usluge',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'bpk-ustikolina-007',
      name: 'Zahtjev za privremeno korištenje javne površine',
      pdfUrl: 'https://foca-ustikolina.ba/wp-content/uploads/2022/10/ZahtjevPrivremeno_koriStenjejavnePovrSine.pdf',
      category: 'Komunalne takse',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'bpk-ustikolina-008',
      name: 'Zahtjev za oglašavanje putem LED ekrana',
      pdfUrl: 'https://foca-ustikolina.ba/wp-content/uploads/2024/09/ZAHTJEV-ZA-OGLASAVANJE-PUTEM-LED-EKRANA.pdf',
      category: 'Komunalne takse',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'bpk-ustikolina-009',
      name: 'Obrazac za civilnu zaštitu',
      pdfUrl: 'https://foca-ustikolina.ba/wp-content/uploads/2022/10/OBRAZAC_PR_S_CIVILNAZASTITA.pdf',
      category: 'Civilna zaštita',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'bpk-ustikolina-010',
      name: 'Zahtjev za jednokratnu pomoć',
      pdfUrl: 'https://foca-ustikolina.ba/wp-content/uploads/2023/02/ZAHTJEV_jednoKratna.pdf',
      category: 'Socijalna zaštita',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'bpk-ustikolina-011',
      name: 'Izvještaj o dugu i garancijama (juli 2026)',
      pdfUrl: 'https://foca-ustikolina.ba/wp-content/uploads/2026/07/IZVJESTAJ-O-DUGU-I-GARANCIJAMA.pdf',
      category: 'Finansijski izvještaji',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'bpk-ustikolina-012',
      name: 'Izvještaj o dugu i garancijama (maj 2026)',
      pdfUrl: 'https://foca-ustikolina.ba/wp-content/uploads/2026/05/izvjestaj-o-dugu-i-garancijama.pdf',
      category: 'Finansijski izvještaji',
      external: true,
      fileType: 'pdf',
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
  formsUrl: 'https://starigrad.ba/e-formulari/',
  
  categories: ['Matični uredi', 'E-uprava', 'Građanska stanja', 'Urbanizam i građenje', 'Punomoći i izjave', 'Javni pozivi', 'Nevladine organizacije'],
  forms: [
    
    
    
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
  officialWebsite: 'https://www.centar.ba/',
  formsUrl: 'https://www.centar.ba/e-uprava/elektronski-formulari',
  categories: ['E-Matičar', 'Inspekcijski obrasci', 'Poljoprivreda i podsticaji', 'Komunalni obrasci', 'Urbanizam i javni prihodi'],
  forms: [
    {
      id: 'ks-centar-ematicar-001',
      name: 'E-Matičar: Izvod iz matične knjige rođenih (4,00 KM)',
      pdfUrl: CENTAR_E_MATICAR_URL,
      category: 'E-Matičar',
      external: true,
      fileType: 'html',
      sourceUrl: CENTAR_E_MATICAR_URL,
    },
    {
      id: 'ks-centar-ematicar-002',
      name: 'E-Matičar: Izvod iz matične knjige umrlih (4,00 KM)',
      pdfUrl: CENTAR_E_MATICAR_URL,
      category: 'E-Matičar',
      external: true,
      fileType: 'html',
      sourceUrl: CENTAR_E_MATICAR_URL,
    },
    {
      id: 'ks-centar-ematicar-003',
      name: 'E-Matičar: Izvod iz matične knjige vjenčanih (4,00 KM)',
      pdfUrl: CENTAR_E_MATICAR_URL,
      category: 'E-Matičar',
      external: true,
      fileType: 'html',
      sourceUrl: CENTAR_E_MATICAR_URL,
    },
    {
      id: 'ks-centar-ematicar-004',
      name: 'E-Matičar: Uvjerenje o slobodnom bračnom stanju (6,00 KM)',
      pdfUrl: CENTAR_E_MATICAR_URL,
      category: 'E-Matičar',
      external: true,
      fileType: 'html',
      sourceUrl: CENTAR_E_MATICAR_URL,
    },
    {
      id: 'ks-centar-ematicar-005',
      name: 'E-Matičar: Uvjerenje o državljanstvu (4,00 KM)',
      pdfUrl: CENTAR_E_MATICAR_URL,
      category: 'E-Matičar',
      external: true,
      fileType: 'html',
      sourceUrl: CENTAR_E_MATICAR_URL,
    },
    {
      id: 'ks-centar-ematicar-006',
      name: 'E-Matičar: Uvjerenje o svim činjenicama upisanim u matičnu knjigu rođenih (6,00 KM)',
      pdfUrl: CENTAR_E_MATICAR_URL,
      category: 'E-Matičar',
      external: true,
      fileType: 'html',
      sourceUrl: CENTAR_E_MATICAR_URL,
    },
    {
      id: 'ks-centar-ematicar-007',
      name: 'E-Matičar: Uvjerenje da lice nije upisano u matične knjige Općine Centar Sarajevo (6,00 KM)',
      pdfUrl: CENTAR_E_MATICAR_URL,
      category: 'E-Matičar',
      external: true,
      fileType: 'html',
      sourceUrl: CENTAR_E_MATICAR_URL,
    },
    {
      id: 'ks-centar-2026-001',
      name: 'Obrazac [INS-02] Inspekcijski nadzor',
      pdfUrl: 'https://www.centar.ba/upload/modules/documents/2026/587e11634e96ae484752c50add35692a.pdf',
      category: 'Inspekcijski obrasci',
      external: true,
      fileType: 'pdf',
      sourceUrl: 'https://www.centar.ba/e-uprava/elektronski-formulari',
    },
    {
      id: 'ks-centar-2026-002',
      name: 'Obrazac [INS-01] Utvrđivanje fizičkog stanja objekta-građevine',
      pdfUrl: 'https://www.centar.ba/upload/modules/documents/2026/80e2a7ad07917c4250e975b406c75295.pdf',
      category: 'Inspekcijski obrasci',
      external: true,
      fileType: 'pdf',
      sourceUrl: 'https://www.centar.ba/e-uprava/elektronski-formulari',
    },
    {
      id: 'ks-centar-2026-003',
      name: 'Obrazac [PRI-31] Novčani podsticaj za kupovinu stočne hrane',
      pdfUrl: 'https://www.centar.ba/upload/modules/documents/2026/cf26f342ecb16ebaf6bfd50eb67da7a7.pdf',
      category: 'Poljoprivreda i podsticaji',
      external: true,
      fileType: 'pdf',
      sourceUrl: 'https://www.centar.ba/e-uprava/elektronski-formulari',
    },
    {
      id: 'ks-centar-2026-004',
      name: 'Obrazac [KOM-09] Saglasnost na lokaciju objekta/instalacija u cestovnom i zaštitnom cestovnom pojasu',
      pdfUrl: 'https://www.centar.ba/upload/modules/documents/2026/ee1a3f7050c6869be245d6091ce9a4f6.pdf',
      category: 'Komunalni obrasci',
      external: true,
      fileType: 'pdf',
      sourceUrl: 'https://www.centar.ba/e-uprava/elektronski-formulari',
    },
    {
      id: 'ks-centar-2026-005',
      name: 'Obrazac [KOM-16] Izmjena ili produženje vodnog akta',
      pdfUrl: 'https://www.centar.ba/upload/modules/documents/2026/a6aec9f0821f260204237764cbc10d16.pdf',
      category: 'Komunalni obrasci',
      external: true,
      fileType: 'pdf',
      sourceUrl: 'https://www.centar.ba/e-uprava/elektronski-formulari',
    },
    {
      id: 'ks-centar-2026-006',
      name: 'Obrazac [KOM-15] Izdavanje vodne dozvole',
      pdfUrl: 'https://www.centar.ba/upload/modules/documents/2026/6826075a015a1bb0c3b5318d6571e0e3.pdf',
      category: 'Komunalni obrasci',
      external: true,
      fileType: 'pdf',
      sourceUrl: 'https://www.centar.ba/e-uprava/elektronski-formulari',
    },
    {
      id: 'ks-centar-2026-007',
      name: 'Obrazac [KOM-14] Izdavanje vodne saglasnosti',
      pdfUrl: 'https://www.centar.ba/upload/modules/documents/2026/e79a2502a473240e762ac63eb6f604a8.pdf',
      category: 'Komunalni obrasci',
      external: true,
      fileType: 'pdf',
      sourceUrl: 'https://www.centar.ba/e-uprava/elektronski-formulari',
    },
    {
      id: 'ks-centar-2026-008',
      name: 'Obrazac [URB-19] Povrat više ili pogrešno uplaćenih javnih prihoda',
      pdfUrl: 'https://www.centar.ba/upload/modules/documents/2026/6836877302a947d907405a99233aba23.pdf',
      category: 'Urbanizam i javni prihodi',
      external: true,
      fileType: 'pdf',
      sourceUrl: 'https://www.centar.ba/e-uprava/elektronski-formulari',
    },
    {
      id: 'ks-centar-2026-009',
      name: 'Obrazac [KOM-13] Izdavanje prethodne vodne saglasnosti',
      pdfUrl: 'https://www.centar.ba/upload/modules/documents/2026/5c395c5d12cfe3638b04c55610a308a0.pdf',
      category: 'Komunalni obrasci',
      external: true,
      fileType: 'pdf',
      sourceUrl: 'https://www.centar.ba/e-uprava/elektronski-formulari',
    },
    {
      id: 'ks-centar-2026-010',
      name: 'Obrazac [KOM-04] Privremeno korištenje javne površine',
      pdfUrl: 'https://www.centar.ba/upload/modules/documents/2026/dac45103cd5b5b26a7814a0e880ceaed.pdf',
      category: 'Komunalni obrasci',
      external: true,
      fileType: 'pdf',
      sourceUrl: 'https://www.centar.ba/e-uprava/elektronski-formulari',
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
  
  categories: ['Urbanizam i lokacija', 'Matični uredi', 'Privreda i finansije', 'Imovinsko-pravni poslovi'],
  forms: [
    
    
    
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
  
  categories: ['Socijalna zaštita', 'E-uprava', 'Matični uredi', 'Prebivalište i CIPS', 'Urbanizam'],
  forms: [
    
    
    
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
  
  categories: ['Ovjere i prepisi', 'E-uprava', 'Matični uredi', 'Urbanizam i građenje', 'Privreda'],
  forms: [
    
    
    
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
  
  categories: ['Građanska stanja', 'Naknade porodiljama', 'Socijalna zaštita', 'Urbanizam', 'E-uprava'],
  forms: [
    
    
    
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
  categories: ['Matični uredi', 'Građanska stanja', 'Urbanizam i imovina'],
  forms: [],
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
  
  categories: ['Urbanizam i građenje', 'Komunalni priključak', 'Matični uredi', 'Dokumenti i obrasci'],
  forms: [
    
    
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
  formsUrl: 'https://ilijas.ba/index.php/e-uprava',
  categories: ['Boračko-invalidska zaštita', 'Dopunski oblici zaštite', 'E-uprava', 'Matični uredi', 'Urbanizam'],
  forms: [
    {
      id: 'ks-ilijas-001',
      name: 'Zahtjev za utvrđivanje prava na dopunske oblike zaštite',
      pdfUrl: 'https://ilijas.ba/index.php/e-uprava',
      category: 'Dopunski oblici zaštite',
      external: true,
    },
    {
      id: 'ks-ilijas-002',
      name: 'Obrasci Službe za društvene djelatnosti i boračko-invalidsku zaštitu',
      pdfUrl: 'https://ilijas.ba/index.php/e-uprava',
      category: 'Boračko-invalidska zaštita',
      external: true,
    },
    {
      id: 'ks-ilijas-003',
      name: 'Obrasci Službe za prostorno uređenje i stambeno-komunalne poslove',
      pdfUrl: 'https://ilijas.ba/index.php/e-uprava',
      category: 'Urbanizam',
      external: true,
    },
    {
      id: 'ks-ilijas-004',
      name: 'eCitizen – Općina Ilijaš',
      pdfUrl: 'https://ecitizen.ba/ilijas/home',
      category: 'E-uprava',
      external: true,
    },
    {
      id: 'ks-ilijas-005',
      name: 'eRegistar Općine Ilijaš',
      pdfUrl: 'https://eregistar.ilijas.ba/',
      category: 'E-uprava',
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
  formsUrl: 'https://istocnailidza.net/?page_id=255',
  categories: ['Preduzetništvo (SP)', 'Urbanizam i lokacijski uslovi', 'Matični uredi', 'Uvjerenja'],
  forms: [
    {
      id: 'is-ilidza-001',
      name: 'Zahtjev za registraciju preduzetničke djelatnosti (SP)',
      pdfUrl: 'https://istocnailidza.net/?page_id=255',
      category: 'Preduzetništvo (SP)',
      external: true,
    },
    {
      id: 'is-ilidza-002',
      name: 'Zahtjev za izdavanje lokacijskih uslova i građevinske dozvole',
      pdfUrl: 'https://istocnailidza.net/?page_id=420',
      category: 'Urbanizam i lokacijski uslovi',
      external: true,
    },
    {
      id: 'is-ilidza-003',
      name: 'Zahtjev za izvod iz matične knjige rođenih, vjenčanih i umrlih',
      pdfUrl: 'https://istocnailidza.net/?page_id=307',
      category: 'Matični uredi',
      external: true,
    },
    {
      id: 'is-ilidza-004',
      name: 'Obrasci i zahtjevi Opštine Istočna Ilidža – stranica 222',
      pdfUrl: 'https://istocnailidza.net/?page_id=222',
      category: 'Uvjerenja',
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
  
  categories: ['Lokacijski uslovi', 'Urbanizam', 'Usluge i obrasci', 'Matični uredi', 'Privreda'],
  forms: [
    
    
    
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
  
  categories: ['Preduzetništvo i privreda', 'Građevinske dozvole', 'Urbanizam', 'Matični uredi'],
  forms: [
    
    
    
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
  
  categories: ['Jednokratne pomoći', 'Matični uredi', 'Socijalna zaštita', 'Opštinski dokumenti'],
  forms: [
    
    
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
  
  categories: ['Građansko stanje', 'Uvjerenja', 'Matični uredi', 'Urbanizam'],
  forms: [
    
    
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
  formsUrl: 'https://foca.rs.ba/',
  categories: ['Preduzetništvo SP', 'Usluge i obrasci', 'Urbanizam', 'Matični uredi', 'Javni pozivi'],
  forms: [
    {
      id: 'drina-foca-001',
      name: 'Zahtjev za registraciju preduzetnika SP-1',
      pdfUrl: 'https://foca.rs.ba/',
      category: 'Preduzetništvo SP',
      external: true,
    },
    {
      id: 'drina-foca-002',
      name: 'Zvanični obrasci i usluge opštinske uprave Foča',
      pdfUrl: 'https://foca.rs.ba/',
      category: 'Usluge i obrasci',
      external: true,
    },
    {
      id: 'drina-foca-003',
      name: 'Nacrt Statuta Grada Foča (juni 2026)',
      pdfUrl: 'https://foca.rs.ba/wp-content/uploads/2026/06/%D0%9D%D0%B0%D1%86%D1%80%D1%82-%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%82%D0%B0-%D0%93%D1%80%D0%B0%D0%B4%D0%B0-%D0%A4%D0%BE%D1%87%D0%B0.pdf',
      category: 'Službeni dokumenti',
      external: true,
      fileType: 'pdf',
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
  formsUrl: 'https://opstinacajnice.rs.ba/%d0%be%d0%b1%d1%80%d0%b0%d1%81%d1%86%d0%b8-%d0%be%d0%bf%d1%88%d1%82%d0%b8%d0%bd%d0%b0-%d1%87%d0%b0%d1%98%d0%bd%d0%b8%d1%87%d0%b5/',
  categories: ['Opšta uprava', 'Privreda, finansije i društvene djelatnosti', 'Prostorno uređenje i stambeno-komunalni poslovi'],
  forms: [
    {
      id: 'drina-cajnice-001',
      name: 'Prijava na javni konkurs za organe jedinice lokalne samouprave',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2025/09/%D0%9E%D0%B1%D1%80%D0%B0%D0%B7%D0%B0%D1%86-%D0%BF%D1%80%D0%B8%D1%98%D0%B0%D0%B2%D0%B0-%D0%BD%D0%B0-%D1%98%D0%B0%D0%B2%D0%BD%D0%B8-%D0%BA%D0%BE%D0%BD%D0%BA%D1%83%D1%80%D1%81-%D0%BE%D0%BF%D1%88%D1%82%D0%B8%D0%BD%D0%B0-1.pdf',
      category: 'Opšta uprava',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-002',
      name: 'Zahtjev za pristup informacijama',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2024/08/%D0%97%D0%B0%D1%85%D1%82%D1%98%D0%B5%D0%B2_%D0%B7%D0%B0_%D0%BF%D1%80%D0%B8%D1%81%D1%82%D1%83%D0%BF_%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D1%98%D0%B0%D0%BC%D0%B0_2023.pdf',
      category: 'Opšta uprava',
      external: true,
      fileType: 'pdf',
    },
    
    {
      id: 'drina-cajnice-004',
      name: 'Obrazac zahtjeva za izdavanje, upis ili promjenu radne knjižice',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2025/08/%D0%9E%D0%B1%D1%80%D0%B0%D0%B7%D0%B0%D1%86-%D0%B7%D0%B0%D1%85%D1%82%D1%98%D0%B5%D0%B2%D0%B0-%D0%B7%D0%B0-%D1%80%D0%B0%D0%B4%D1%9A%D1%83-%D0%BA%D1%9A%D0%B8%D0%B6%D0%B8%D1%86%D1%83.pdf',
      category: 'Opšta uprava',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-005',
      name: 'Zahtjev za produženje radnog vremena ugostiteljskog objekta',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2025/07/Zahtjev-za-produzenje-radnog-vremena.pdf',
      category: 'Privreda, finansije i društvene djelatnosti',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-006',
      name: 'Zahtjev za isplatu jednokratne novčane pomoći za novorođeno dijete',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2024/08/%D0%97%D0%90%D0%A5%D0%A2%D0%88%D0%95%D0%92_%D0%97%D0%90_%D0%9D%D0%9E%D0%92%D0%9E%D0%A0%D0%9E%D0%82%D0%95%D0%9D%D0%95_%D0%91%D0%95%D0%91%D0%95.pdf',
      category: 'Privreda, finansije i društvene djelatnosti',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-007',
      name: 'Zahtjev za novčanu pomoć porodicama sa petoro i više djece',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2024/08/%D0%97%D0%90%D0%A5%D0%A2%D0%88%D0%95%D0%92_%D0%97%D0%90_5_%D0%98_%D0%92%D0%98%D0%A8%D0%95_%D0%94%D0%88%D0%95%D0%A6%D0%95.pdf',
      category: 'Privreda, finansije i društvene djelatnosti',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-008',
      name: 'Zahtjev za izlazak komunalne policije',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2025/08/%D0%97%D0%B0%D1%85%D1%82%D1%98e%D0%B2-%D0%B7%D0%B0-%D0%B8%D0%B7%D0%BB%D0%B0%D0%B7%D0%B0%D0%BA-%D0%BA%D0%BE%D0%BC%D1%83%D0%BD%D0%B0%D0%BB%D0%BDe-%D0%BF%D0%BE%D0%BB%D0%B8%D1%86%D0%B8%D1%98e.pdf',
      category: 'Prostorno uređenje i stambeno-komunalni poslovi',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-009',
      name: 'Zahtjev za izlazak urbanističko-građevinskog inspektora',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2025/08/%D0%97%D0%B0%D1%85%D1%82%D1%98e%D0%B2-%D0%B7%D0%B0-%D0%B8%D0%B7%D0%BB%D0%B0%D0%B7%D0%B0%D0%BA-%D1%83%D1%80%D0%B1%D0%B0%D0%BD%D0%B8%D1%81%D1%82%D0%B8%D1%87%D0%BA%D0%BE-%D0%B3%D1%80%D0%B0%D1%92e%D0%B2%D0%B8%D0%BD%D1%81%D0%BA%D0%BE%D0%B3-%D0%B8%D0%BD%D1%81%D0%Bfe%D0%BA%D1%82%D0%BE%D1%80%D0%B0.pdf',
      category: 'Prostorno uređenje i stambeno-komunalni poslovi',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-010',
      name: 'Zahtjev za izlazak inspektora za drumski saobraćaj',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2025/08/%D0%97%D0%B0%D1%85%D1%82%D1%98e%D0%B2-%D0%B7%D0%B0-%D0%B8%D0%B7%D0%BB%D0%B0%D0%B7%D0%B0%D0%BA-%D0%B8%D0%BD%D1%81%D0%BF%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B7%D0%B0-%D0%B4%D1%80%D1%83%D0%BC%D1%81%D0%BA%D0%B8-%D1%81%D0%B0%D0%BE%D0%B1%D1%80%D0%B0%D1%9B%D0%B0%D1%98.pdf',
      category: 'Prostorno uređenje i stambeno-komunalni poslovi',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-011',
      name: 'Zahtjev za izlazak poljoprivrednog i ekološkog inspektora',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2025/08/%D0%97%D0%B0%D1%85%D1%82%D1%98e%D0%B2-%D0%B7%D0%B0-%D0%B8%D0%B7%D0%BB%D0%B0%D0%B7%D0%B0%D0%BA-%D0%BF%D0%BE%D1%99%D0%BE%D0%BF%D1%80%D0%B8%D0%B2%D1%80%D0%B5%D0%B4%D0%BD%D0%B8-%D0%B8-%D0%B5%D0%BA%D0%BE%D0%BB%D0%BE%D1%88%D0%BA%D0%B8-%D0%B8%D0%BD%D1%81%D0%BF%D0%B5%D0%BA%D1%82%D0%BE%D1%80.pdf',
      category: 'Prostorno uređenje i stambeno-komunalni poslovi',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-012',
      name: 'Zahtjev za privremeno zauzimanje javne površine',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2025/09/Zahtjev-za-zauzimanje-javne-povrsine.pdf',
      category: 'Prostorno uređenje i stambeno-komunalni poslovi',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-013',
      name: 'Zahtjev za prekopavanje javne površine',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2026/09/%D0%97%D0%B0%D1%85%D1%82%D1%98%D0%B5%D0%B2-%D0%B7%D0%B0-%D0%BF%D1%80%D0%B5%D0%BA%D0%BE%D0%BF%D0%B0%D0%B2%D0%B0%D1%9A%D0%B5-%D1%98%D0%B0%D0%B2%D0%BD%D0%B5-%D0%BF%D0%BE%D0%B2%D1%80%D1%88%D0%B8%D0%BD%D0%B5-.pdf',
      category: 'Prostorno uređenje i stambeno-komunalni poslovi',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-014',
      name: 'Zahtjev za izdavanje izvoda iz Regulacionog plana',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2026/09/%D0%97%D0%B0%D1%85%D1%82%D1%98%D0%B5%D0%B2-%D0%B7%D0%B0-%D0%B8%D0%B7%D0%B4%D0%B0%D0%B2%D0%B0%D1%9A%D0%B5-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B4%D0%B0-%D0%B8%D0%B7-%D0%A0%D0%B5%D0%B3%D1%83%D0%BB%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BE%D0%B3-%D0%BF%D0%BB%D0%B0%D0%BD%D0%B0.pdf',
      category: 'Prostorno uređenje i stambeno-komunalni poslovi',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-015',
      name: 'Zahtjev za izdavanje lokacijskih uslova',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2026/10/%D0%97%D0%B0%D1%85%D1%82%D1%98%D0%B5%D0%B2-%D0%B7%D0%B0-%D0%BB%D0%BE%D0%BA.%D1%83%D1%81%D0%BB%D0%BE%D0%B2%D0%B5.pdf',
      category: 'Prostorno uređenje i stambeno-komunalni poslovi',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-016',
      name: 'Zahtjev za građevinsku dozvolu',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2026/09/%D0%97%D0%B0%D1%85%D1%82%D1%98%D0%B5%D0%B2-%D0%B7%D0%B0-%D0%B3%D1%80%D0%B0%D1%92%D0%B5%D0%B2%D0%B8%D1%81%D0%BD%D0%BA%D1%83-%D0%B4%D0%BE%D0%B7%D0%B2%D0%BE%D0%BB%D1%83.pdf',
      category: 'Prostorno uređenje i stambeno-komunalni poslovi',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-017',
      name: 'Zahtjev za upotrebnu dozvolu',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2026/09/%D0%97%D0%B0%D1%85%D1%82%D1%98%D0%B5%D0%B2-%D0%B7%D0%B0-%D1%83%D0%BF%D0%BE%D1%82%D1%80%D0%B5%D0%B1%D0%BD%D1%83-%D0%B4%D0%BE%D0%B7%D0%B2%D0%BE%D0%BB%D1%83-.pdf',
      category: 'Prostorno uređenje i stambeno-komunalni poslovi',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-018',
      name: 'Zahtjev za legalizaciju bespravno izgrađenog objekta',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2025/09/%D0%97%D0%B0%D1%85%D1%82%D1%98%D0%B5%D0%B2-%D0%B7%D0%B0-%D0%BB%D0%B5%D0%B3%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%98%D1%83-%D0%BE%D0%B1%D1%98%D0%B5%D0%BA%D1%82%D0%B0.pdf',
      category: 'Prostorno uređenje i stambeno-komunalni poslovi',
      external: true,
      fileType: 'pdf',
    },
    {
      id: 'drina-cajnice-019',
      name: 'Zahtjev za ekshumaciju i prenos umrlog lica',
      pdfUrl: 'https://opstinacajnice.rs.ba/wp-content/uploads/2025/09/%D0%97%D0%B0%D1%85%D1%82%D1%98%D0%B5%D0%B2-%D0%B7%D0%B0-%D0%95%D0%BA%D1%81%D1%85%D1%83%D0%BC%D0%B0%D1%86%D0%B8%D1%98%D1%83-%D0%BF%D1%80%D0%B5%D0%BD%D0%BE%D1%81-%D1%83%D0%BC%D1%80%D0%BB%D0%BE%D0%B3-%D0%BB%D0%B8%D1%86%D0%B0.pdf',
      category: 'Opšta uprava',
      external: true,
      fileType: 'pdf',
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
  
  categories: ['Privreda', 'Opšta uprava', 'Matični uredi'],
  forms: [
    
    
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
  formsUrl: 'https://hanpijesak.org/zahtjevi-i-obrasci/',
  categories: ['Prijemna kancelarija', 'Opšta uprava', 'Matični uredi', 'Urbanizam'],
  forms: [
    {
      id: 'rom-hp-001',
      name: 'Zahtjevi prijemne kancelarije i opšte uprave',
      pdfUrl: 'https://hanpijesak.org/zahtjevi-i-obrasci/',
      category: 'Prijemna kancelarija',
      external: true,
    },
    {
      id: 'rom-hp-002',
      name: 'Dokumenti i uvjerenja opštine Han Pijesak',
      pdfUrl: 'https://hanpijesak.org/zahtjevi-i-obrasci/',
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
  categories: ['Upotrebna dozvola', 'Komunalne takse', 'Urbanizam', 'Matični uredi'],
  forms: [],
};

export const citlukConfig: SarajevoRegionMunicipalityConfig = {
  slug: 'citluk',
  aliases: ['opcina-citluk'],
  name: 'Općina Čitluk',
  region: 'Hercegovačko-neretvanski kanton (HNK)',
  regionShort: 'HNK',
  entity: 'Federacija BiH',
  officialWebsite: CITLUK_OFFICIAL_URL,
  formsUrl: CITLUK_FORMS_SOURCE_URL,
  categories: Array.from(new Set(citlukForms.map((form) => form.category))),
  forms: citlukForms,
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
  citlukConfig,
];
