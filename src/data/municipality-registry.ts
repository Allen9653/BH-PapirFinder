// ============================================================
// Municipality Registry — Central registry for all municipality form data
// Extensible: add new municipalities by importing their data files
// ============================================================

import { olovoForms, getOlovoCategories, OlovoForm } from './olovo-forms';
import { gracanicaForms, getGracanicaCategories, GracanicaForm } from './gracanica-forms';
import { konjicForms } from './konjic-forms';
import { dobojForms, getDobojCategories, DOBOJ_FORMS_PORTAL_URL } from './doboj-forms';
import { gorazdeForms, getGorazdeCategories, GORAZDE_E_UPRAVA_URL, GORAZDE_OFFICIAL_URL } from './gorazde-forms';
import { sarajevoRegionConfigs } from './sarajevo-region-forms';
import { livnoForms, getLivnoCategories, LIVNO_OFFICIAL_URL, LIVNO_FORMS_PORTAL_URL } from './livno-forms';
import { kakanjForms, getKakanjCategories, KAKANJ_OFFICIAL_URL, KAKANJ_FORMS_PORTAL_URL } from './kakanj-forms';
import { sanskiMostDocuments, sanskiMostForms, SANSKI_MOST_OFFICIAL_URL } from './sanski-most-forms';
import { bilecaDocuments, bilecaForms, BILECA_FORMS_SOURCE_URL, BILECA_OFFICIAL_URL } from './bileca-forms';
import {
  bosanskaKrupaDocuments,
  bosanskaKrupaForms,
  BOSANSKA_KRUPA_ECITIZEN_URL,
  BOSANSKA_KRUPA_OFFICIAL_URL,
} from './bosanska-krupa-forms';
import { brodDocuments, brodForms, BROD_DOCUMENTS_SOURCE_URL, BROD_OFFICIAL_URL } from './brod-forms';
import {
  busovacaDocuments,
  busovacaForms,
  BUSOVACA_DOCUMENTS_URL,
  BUSOVACA_OFFICIAL_URL,
} from './busovaca-forms';
import {
  cazinDocuments,
  cazinForms,
  CAZIN_DOCUMENTS_SOURCE_URL,
  CAZIN_OFFICIAL_URL,
} from './cazin-forms';
import {
  capljinaDocuments,
  capljinaForms,
  CAPLJINA_FORMS_SOURCE_URL,
  CAPLJINA_OFFICIAL_URL,
} from './capljina-forms';
import { updatedGovernmentFormSources } from './updated-government-forms';
import { fojnicaForms, FOJNICA_FORMS_URL, FOJNICA_OFFICIAL_URL } from './fojnica-forms';
import { kalesijaForms, KALESIJA_FORMS_PORTAL_URL, KALESIJA_OFFICIAL_URL } from './kalesija-forms';
import { grudeForms, GRUDE_FORMS_PORTAL_URL, GRUDE_OFFICIAL_URL } from './grude-forms';
import {
  gornjiVakufForms,
  GORNJI_VAKUF_E_MATICAR_URL,
  GORNJI_VAKUF_OFFICIAL_URL,
} from './gornji-vakuf-forms';
import { lopareForms, LOPARE_OFFICIAL_URL } from './lopare-forms';

// Unified form interface (extends OlovoForm pattern)
export interface MunicipalityForm {
  id: string;
  name: string;
  pdfUrl: string;
  category: string;
  sizeKB?: number;
  dateAdded?: string;
  /** HTML stranica na službenom webu — otvara se u novom tabu, bez internog pregleda. */
  external?: boolean;
  fileType?: 'pdf' | 'docx' | 'doc' | 'html';
  sourceUrl?: string;
}

export interface MunicipalityInfo {
  slug: string;
  name: string;
  canton: string;
  cantonShort: string;
  entity: string;
  website?: string;
  officialUrl: string;
  formsCount: number;
  forms: MunicipalityForm[];
  categories: string[];
  notice?: string;
}

// ============================================================
// Olovo municipality data
// ============================================================

const olovoInfo: MunicipalityInfo = {
  slug: 'olovo',
  name: 'Općina Olovo',
  canton: 'Zeničko-dobojski kanton',
  cantonShort: 'ZDK',
  entity: 'Federacija BiH',
  officialUrl: 'https://olovo.gov.ba/?lsvrdocumentcat=elektronski-formulari',
  formsCount: olovoForms.length,
  forms: olovoForms as MunicipalityForm[],
  categories: getOlovoCategories(),
};

// ============================================================
// Gračanica municipality data
// ============================================================

const gracanicaInfo: MunicipalityInfo = {
  slug: 'gracanica',
  name: 'Grad Gračanica',
  canton: 'Tuzlanski kanton',
  cantonShort: 'TK',
  entity: 'Federacija BiH',
  officialUrl: 'https://gracanica.gov.ba/',
  formsCount: gracanicaForms.length,
  forms: gracanicaForms as MunicipalityForm[],
  categories: getGracanicaCategories(),
};

// ============================================================
// Registry — all supported municipalities
// ============================================================

const municipalityRegistry: Map<string, MunicipalityInfo> = new Map();
municipalityRegistry.set('olovo', olovoInfo);
municipalityRegistry.set('gracanica', gracanicaInfo);

const fojnicaInfo: MunicipalityInfo = {
  slug: 'fojnica',
  name: 'Općina Fojnica',
  canton: 'Srednjobosanski kanton (SBK)',
  cantonShort: 'SBK',
  entity: 'Federacija BiH',
  website: FOJNICA_OFFICIAL_URL,
  officialUrl: FOJNICA_FORMS_URL,
  formsCount: fojnicaForms.length,
  forms: fojnicaForms,
  categories: Array.from(new Set(fojnicaForms.map(form => form.category))),
};
municipalityRegistry.set('fojnica', fojnicaInfo);

function getExternalFormName(url: string): string {
  const pathSegments = new URL(url).pathname.split('/').filter(Boolean);
  const fileName = pathSegments[pathSegments.length - 1] ?? 'obrazac';
  const decodedName = decodeURIComponent(fileName)
    .replace(/\.(pdf|docx?|html?)$/i, '')
    .replace(/([a-zčćžšđ])([A-ZČĆŽŠĐ])/g, '$1 $2')
    .replace(/[-_.]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return decodedName
    .split(' ')
    .map(word => `${word.charAt(0).toLocaleUpperCase('bs-BA')}${word.slice(1)}`)
    .join(' ');
}

for (const source of updatedGovernmentFormSources) {
  const forms: MunicipalityForm[] = source.urls.map((url, index) => {
    const extension = /\.([a-z0-9]+)$/i.exec(new URL(url).pathname)?.[1]?.toLowerCase();
    const fileType = extension === 'pdf' || extension === 'doc' || extension === 'docx' ? extension : 'html';

    return {
      id: `${source.slug}-updated-${index + 1}`,
      name: getExternalFormName(url),
      pdfUrl: url,
      category: source.categories[0] ?? 'Obrasci i zahtjevi',
      sourceUrl: source.formsUrl,
      fileType,
      external: true,
    };
  });

  municipalityRegistry.set(source.slug, {
    slug: source.slug,
    name: source.name,
    canton: source.canton,
    cantonShort: source.cantonShort,
    entity: source.entity,
    website: source.website,
    officialUrl: source.formsUrl,
    formsCount: forms.length,
    forms,
    categories: source.categories,
  });
}

municipalityRegistry.set('konjic', {
  slug: 'konjic',
  name: 'Općina Konjic',
  canton: 'Hercegovačko-neretvanski kanton (HNK)',
  cantonShort: 'HNK',
  entity: 'Federacija BiH',
  officialUrl: 'https://www.konjic.ba/ba/uprava/opcinske-sluzbe/prospekti-sluzbi.html',
  formsCount: konjicForms.length,
  forms: konjicForms,
  categories: Array.from(new Set(konjicForms.map(f => f.category))),
});

const kalesijaInfo: MunicipalityInfo = {
  slug: 'kalesija',
  name: 'Općina Kalesija',
  canton: 'Tuzlanski kanton',
  cantonShort: 'TK',
  entity: 'Federacija BiH',
  website: KALESIJA_OFFICIAL_URL,
  officialUrl: KALESIJA_FORMS_PORTAL_URL,
  formsCount: kalesijaForms.length,
  forms: kalesijaForms,
  categories: Array.from(new Set(kalesijaForms.map((form) => form.category))),
};
municipalityRegistry.set('kalesija', kalesijaInfo);

const grudeInfo: MunicipalityInfo = {
  slug: 'grude',
  name: 'Općina Grude',
  canton: 'Zapadnohercegovački kanton (ZHK)',
  cantonShort: 'ZHK',
  entity: 'Federacija BiH',
  website: GRUDE_OFFICIAL_URL,
  officialUrl: GRUDE_FORMS_PORTAL_URL,
  formsCount: grudeForms.length,
  forms: grudeForms,
  categories: Array.from(new Set(grudeForms.map((form) => form.category))),
};
municipalityRegistry.set('grude', grudeInfo);

const kljucInfo: MunicipalityInfo = {
  slug: 'kljuc',
  name: 'Općina Ključ',
  canton: 'Unsko-sanski kanton (USK)',
  cantonShort: 'USK',
  entity: 'Federacija BiH',
  website: 'https://opcina-kljuc.ba/',
  officialUrl: 'https://www.ecitizen.ba/kljuc/home',
  formsCount: 1,
  forms: [{
    id: 'kljuc-ecitizen',
    name: 'eCitizen – dostupni dokumenti i elektronske usluge Općine Ključ',
    pdfUrl: 'https://www.ecitizen.ba/kljuc/home',
    category: 'E-uprava',
    fileType: 'html',
    external: true,
  }],
  categories: ['E-uprava', 'Dokumenti'],
};
municipalityRegistry.set('kljuc', kljucInfo);

const lukavacInfo: MunicipalityInfo = {
  slug: 'lukavac',
  name: 'Općina Lukavac',
  canton: 'Tuzlanski kanton (TK)',
  cantonShort: 'TK',
  entity: 'Federacija BiH',
  website: 'https://lukavac.ba/',
  officialUrl: 'https://lukavac.ba/e-obrasci/',
  formsCount: 1,
  forms: [{
    id: 'lukavac-e-obrasci',
    name: 'e-Obrasci Općine Lukavac',
    pdfUrl: 'https://lukavac.ba/e-obrasci/',
    category: 'E-uprava',
    fileType: 'html',
    external: true,
  }],
  categories: ['E-uprava', 'Obrasci'],
};
municipalityRegistry.set('lukavac', lukavacInfo);

const kotorVarosInfo: MunicipalityInfo = {
  slug: 'kotor-varos',
  name: 'Opština Kotor Varoš',
  canton: 'Banjalučka regija',
  cantonShort: 'RS',
  entity: 'Republika Srpska',
  website: 'https://opstinakotorvaros.com/',
  officialUrl: 'https://opstinakotorvaros.com/zahtjevi/',
  formsCount: 1,
  forms: [{
    id: 'kotor-varos-zahtjevi',
    name: 'Zahtjevi – zvanična stranica s dostupnim obrascima',
    pdfUrl: 'https://opstinakotorvaros.com/zahtjevi/',
    category: 'Zahtjevi i obrasci',
    fileType: 'html',
    external: true,
  }],
  categories: ['Zahtjevi i obrasci'],
};
municipalityRegistry.set('kotor-varos', kotorVarosInfo);

const lopareInfo: MunicipalityInfo = {
  slug: 'lopare',
  name: 'Opština Lopare',
  canton: 'Bijeljina regija',
  cantonShort: 'RS',
  entity: 'Republika Srpska',
  website: LOPARE_OFFICIAL_URL,
  officialUrl: LOPARE_OFFICIAL_URL,
  formsCount: lopareForms.length,
  forms: lopareForms,
  categories: Array.from(new Set(lopareForms.map((form) => form.category))),
};
municipalityRegistry.set('lopare', lopareInfo);

const ljubinjeInfo: MunicipalityInfo = {
  slug: 'ljubinje',
  name: 'Opština Ljubinje',
  canton: 'Trebinje regija',
  cantonShort: 'RS',
  entity: 'Republika Srpska',
  website: 'https://opstinaljubinje.org/',
  officialUrl: 'https://opstinaljubinje.org/',
  formsCount: 0,
  forms: [],
  categories: [],
  notice: 'Službena web-stranica je aktivna, ali digitalni dokumenti trenutno nisu dostupni online.',
};
municipalityRegistry.set('ljubinje', ljubinjeInfo);

const gornjiVakufInfo: MunicipalityInfo = {
  slug: 'gornji-vakuf-uskoplje',
  name: 'Općina Gornji Vakuf-Uskoplje',
  canton: 'Srednjobosanski kanton (SBK)',
  cantonShort: 'SBK',
  entity: 'Federacija BiH',
  website: GORNJI_VAKUF_OFFICIAL_URL,
  officialUrl: GORNJI_VAKUF_E_MATICAR_URL,
  formsCount: gornjiVakufForms.length,
  forms: gornjiVakufForms,
  categories: Array.from(new Set(gornjiVakufForms.map((form) => form.category))),
  notice: 'E-Matičar omogućava online podnošenje zahtjeva za izdavanje i dostavu izvoda i uvjerenja.',
};
municipalityRegistry.set('gornji-vakuf-uskoplje', gornjiVakufInfo);
municipalityRegistry.set('gornji-vakuf', { ...gornjiVakufInfo, slug: 'gornji-vakuf' });

const kladanjInfo: MunicipalityInfo = {
  slug: 'kladanj',
  name: 'Općina Kladanj',
  canton: 'Tuzlanski kanton',
  cantonShort: 'TK',
  entity: 'Federacija BiH',
  website: 'https://kladanj.ba/',
  officialUrl: 'https://kladanj.ba/',
  formsCount: 0,
  forms: [],
  categories: [],
};
municipalityRegistry.set('kladanj', kladanjInfo);

const dobojInfo: MunicipalityInfo = {
  slug: 'doboj',
  name: 'Grad Doboj',
  canton: 'Doboj regija',
  cantonShort: 'RS',
  entity: 'Republika Srpska',
  website: 'https://doboj.gov.ba/',
  officialUrl: DOBOJ_FORMS_PORTAL_URL,
  formsCount: dobojForms.length,
  forms: dobojForms as MunicipalityForm[],
  categories: getDobojCategories(),
};
municipalityRegistry.set('doboj', dobojInfo);
municipalityRegistry.set('grad-doboj', { ...dobojInfo, slug: 'grad-doboj' });

const gorazdeInfo: MunicipalityInfo = {
  slug: 'gorazde',
  name: 'Grad Goražde',
  canton: 'Bosansko-podrinjski kanton (BPK)',
  cantonShort: 'BPK',
  entity: 'Federacija BiH',
  website: GORAZDE_OFFICIAL_URL,
  officialUrl: GORAZDE_E_UPRAVA_URL,
  formsCount: gorazdeForms.length,
  forms: gorazdeForms as MunicipalityForm[],
  categories: getGorazdeCategories(),
};
municipalityRegistry.set('gorazde', gorazdeInfo);
municipalityRegistry.set('grad-gorazde', { ...gorazdeInfo, slug: 'grad-gorazde' });

// ============================================================
// Regija SARAJEVSKA (Kanton Sarajevo, BPK Goražde, Istočno Sarajevo)
// ============================================================
for (const cfg of sarajevoRegionConfigs) {
  const info: MunicipalityInfo = {
    slug: cfg.slug,
    name: cfg.name,
    canton: cfg.region,
    cantonShort: cfg.regionShort,
    entity: cfg.entity,
    website: cfg.officialWebsite,
    officialUrl: cfg.formsUrl || cfg.officialWebsite || '',
    formsCount: cfg.forms.length,
    forms: cfg.forms,
    categories: cfg.categories,
  };
  municipalityRegistry.set(cfg.slug, info);
  for (const alias of cfg.aliases) {
    municipalityRegistry.set(alias, { ...info, slug: alias });
  }
}

// ============================================================
// Grad Livno (Kanton 10 / Hercegbosanska županija)
// ============================================================
const livnoInfo: MunicipalityInfo = {
  slug: 'livno',
  name: 'Grad Livno',
  canton: 'Kanton 10 (Hercegbosanska županija)',
  cantonShort: 'K10',
  entity: 'Federacija BiH',
  website: LIVNO_OFFICIAL_URL,
  officialUrl: LIVNO_FORMS_PORTAL_URL,
  formsCount: livnoForms.length + 2,
  forms: [
    ...livnoForms as MunicipalityForm[],
    {
      id: 'livno-maticni-ured-portal',
      name: 'Matični ured Grada Livna – informacije i obrasci',
      pdfUrl: 'https://livno.ba/za-gradane/maticni-ured/',
      category: 'Matični uredi',
      fileType: 'html',
      external: true,
    },
    {
      id: 'livno-dokumenti-i-obrasci-portal',
      name: 'Dokumenti i obrasci Grada Livna',
      pdfUrl: LIVNO_FORMS_PORTAL_URL,
      category: 'Dokumenti i obrasci',
      fileType: 'html',
      external: true,
    },
  ],
  categories: Array.from(new Set([...getLivnoCategories(), 'Dokumenti i obrasci'])),
};
municipalityRegistry.set('livno', livnoInfo);
municipalityRegistry.set('grad-livno', { ...livnoInfo, slug: 'grad-livno' });

// ============================================================
// Općina Kakanj (Zeničko-dobojski kanton - ZDK)
// ============================================================
const kakanjInfo: MunicipalityInfo = {
  slug: 'kakanj',
  name: 'Općina Kakanj',
  canton: 'Zeničko-dobojski kanton (ZDK)',
  cantonShort: 'ZDK',
  entity: 'Federacija BiH',
  website: KAKANJ_OFFICIAL_URL,
  officialUrl: KAKANJ_FORMS_PORTAL_URL,
  formsCount: kakanjForms.length,
  forms: kakanjForms as MunicipalityForm[],
  categories: getKakanjCategories(),
};
municipalityRegistry.set('kakanj', kakanjInfo);
municipalityRegistry.set('opcina-kakanj', { ...kakanjInfo, slug: 'opcina-kakanj' });

// Sanski Most objavljuje javne pozive i njihove priloge, a ne klasični katalog obrazaca.
const sanskiMostInfo: MunicipalityInfo = {
  slug: sanskiMostDocuments.id,
  name: sanskiMostDocuments.naziv,
  canton: sanskiMostDocuments.kanton,
  cantonShort: 'USK',
  entity: 'Federacija BiH',
  website: SANSKI_MOST_OFFICIAL_URL,
  officialUrl: SANSKI_MOST_OFFICIAL_URL,
  formsCount: sanskiMostForms.length,
  forms: sanskiMostForms,
  categories: Array.from(new Set(sanskiMostForms.map((form) => form.category))),
};
municipalityRegistry.set('sanski-most', sanskiMostInfo);

const bilecaInfo: MunicipalityInfo = {
  slug: bilecaDocuments.id,
  name: bilecaDocuments.name,
  canton: 'Trebinje regija',
  cantonShort: 'RS',
  entity: 'Republika Srpska',
  website: BILECA_OFFICIAL_URL,
  officialUrl: BILECA_FORMS_SOURCE_URL,
  formsCount: bilecaForms.length,
  forms: bilecaForms,
  categories: Array.from(new Set(bilecaForms.map((form) => form.category))),
};
municipalityRegistry.set('bileca', bilecaInfo);

const bosanskaKrupaInfo: MunicipalityInfo = {
  slug: bosanskaKrupaDocuments.id,
  name: bosanskaKrupaDocuments.name,
  canton: 'Unsko-sanski kanton',
  cantonShort: 'USK',
  entity: 'Federacija BiH',
  website: BOSANSKA_KRUPA_OFFICIAL_URL,
  officialUrl: BOSANSKA_KRUPA_ECITIZEN_URL,
  formsCount: bosanskaKrupaForms.length,
  forms: bosanskaKrupaForms,
  categories: Array.from(new Set(bosanskaKrupaForms.map((form) => form.category))),
  notice: bosanskaKrupaDocuments.notice,
};
municipalityRegistry.set('bosanska-krupa', bosanskaKrupaInfo);

const brodInfo: MunicipalityInfo = {
  slug: brodDocuments.id,
  name: brodDocuments.name,
  canton: 'Doboj regija',
  cantonShort: 'RS',
  entity: 'Republika Srpska',
  website: BROD_OFFICIAL_URL,
  officialUrl: BROD_DOCUMENTS_SOURCE_URL,
  formsCount: brodForms.length,
  forms: brodForms,
  categories: Array.from(new Set(brodForms.map((form) => form.category))),
  notice: brodDocuments.notice,
};
municipalityRegistry.set('brod', brodInfo);
municipalityRegistry.set('bosanski-brod', brodInfo);

const busovacaInfo: MunicipalityInfo = {
  slug: busovacaDocuments.id,
  name: busovacaDocuments.name,
  canton: 'Srednjobosanski kanton',
  cantonShort: 'SBK',
  entity: 'Federacija BiH',
  website: BUSOVACA_OFFICIAL_URL,
  officialUrl: BUSOVACA_DOCUMENTS_URL,
  formsCount: busovacaForms.length,
  forms: busovacaForms,
  categories: Array.from(new Set(busovacaForms.map((form) => form.category))),
  notice: busovacaDocuments.notice,
};
municipalityRegistry.set('busovaca', busovacaInfo);

const cazinInfo: MunicipalityInfo = {
  slug: cazinDocuments.id,
  name: cazinDocuments.name,
  canton: 'Unsko-sanski kanton',
  cantonShort: 'USK',
  entity: 'Federacija BiH',
  website: CAZIN_OFFICIAL_URL,
  officialUrl: CAZIN_DOCUMENTS_SOURCE_URL,
  formsCount: cazinForms.length,
  forms: cazinForms,
  categories: Array.from(new Set(cazinForms.map((form) => form.category))),
  notice: cazinDocuments.notice,
};
municipalityRegistry.set('cazin', cazinInfo);

const capljinaInfo: MunicipalityInfo = {
  slug: capljinaDocuments.id,
  name: capljinaDocuments.name,
  canton: 'Hercegovačko-neretvanski kanton',
  cantonShort: 'HNK',
  entity: 'Federacija BiH',
  website: CAPLJINA_OFFICIAL_URL,
  officialUrl: CAPLJINA_FORMS_SOURCE_URL,
  formsCount: capljinaForms.length,
  forms: capljinaForms,
  categories: Array.from(new Set(capljinaForms.map((form) => form.category))),
  notice: capljinaDocuments.notice,
};
municipalityRegistry.set('capljina', capljinaInfo);

// ============================================================
// Public API
// ============================================================

/**
 * Get municipality info by slug
 */
export function getMunicipalityBySlug(slug: string): MunicipalityInfo | null {
  return municipalityRegistry.get(slug.toLowerCase()) || null;
}

/**
 * Get all registered municipalities (deduplicated by primary canonical name)
 */
export function getAllMunicipalities(): MunicipalityInfo[] {
  const seen = new Set<string>();
  const list: MunicipalityInfo[] = [];
  for (const info of municipalityRegistry.values()) {
    if (!seen.has(info.name)) {
      seen.add(info.name);
      list.push(info);
    }
  }
  return list;
}

/**
 * Get all municipality slugs
 */
export function getAllMunicipalitySlugs(): string[] {
  return Array.from(municipalityRegistry.keys());
}

/**
 * Search forms across a specific municipality
 */
export function searchMunicipalityForms(slug: string, query: string): MunicipalityForm[] {
  const municipality = getMunicipalityBySlug(slug);
  if (!municipality || !query.trim()) return [];

  const searchTerm = query.toLowerCase().trim();
  return municipality.forms.filter(form => {
    const nameMatch = form.name.toLowerCase().includes(searchTerm);
    const categoryMatch = form.category.toLowerCase().includes(searchTerm);
    return nameMatch || categoryMatch;
  });
}

/**
 * Get forms by category within a municipality
 */
export function getFormsByCategory(slug: string, category: string): MunicipalityForm[] {
  const municipality = getMunicipalityBySlug(slug);
  if (!municipality) return [];
  return municipality.forms.filter(
    f => f.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get a specific form by ID across all municipalities
 */
export function getFormById(formId: string): { form: MunicipalityForm; municipality: MunicipalityInfo } | null {
  for (const municipality of municipalityRegistry.values()) {
    const form = municipality.forms.find(f => f.id === formId);
    if (form) {
      return { form, municipality };
    }
  }
  return null;
}

/**
 * Register a new municipality (for dynamic additions)
 */
export function registerMunicipality(info: MunicipalityInfo): void {
  municipalityRegistry.set(info.slug.toLowerCase(), info);
}

/**
 * Get total form count across all municipalities
 */
export function getTotalFormsCount(): number {
  let total = 0;
  for (const m of municipalityRegistry.values()) {
    total += m.formsCount;
  }
  return total;
}

/**
 * Returns the form's addition date or generates a stable deterministic date string (YYYY-MM-DD)
 */
export function getFormDateAdded(form: MunicipalityForm): string {
  if (form.dateAdded) return form.dateAdded;

  // Check if form URL contains year/month (e.g. /2016/12/)
  const match = form.pdfUrl?.match(/\/(\d{4})\/(\d{2})\//);
  if (match) {
    const year = match[1];
    const month = match[2];
    const num = parseInt(form.id.replace(/\D/g, '') || '1', 10);
    const day = String((num % 28) + 1).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Deterministic catalog date based on form id
  let hash = 0;
  for (let i = 0; i < form.id.length; i++) {
    hash = (hash * 31 + form.id.charCodeAt(i)) % 1000;
  }
  const monthsAgo = hash % 16;
  const d = new Date(2026, 4, 15);
  d.setMonth(d.getMonth() - monthsAgo);
  d.setDate((hash % 27) + 1);
  return d.toISOString().split('T')[0];
}