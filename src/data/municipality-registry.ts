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

// Unified form interface (extends OlovoForm pattern)
export interface MunicipalityForm {
  id: string;
  name: string;
  pdfUrl: string;
  category: string;
  sizeKB?: number;
  /** HTML stranica na službenom webu — otvara se u novom tabu, bez internog pregleda. */
  external?: boolean;
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
  officialUrl: 'https://gracanica.gov.ba/dokumenti/e-obrasci/',
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
    officialUrl: cfg.formsUrl || cfg.officialWebsite,
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