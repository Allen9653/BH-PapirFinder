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
import { gornjiVakufForms, GORNJI_VAKUF_E_MATICAR_URL, GORNJI_VAKUF_OFFICIAL_URL } from './gornji-vakuf-forms';
import { lopareForms, LOPARE_OFFICIAL_URL } from './lopare-forms';
import { matchesQuery } from '@/lib/search-match';

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
}

// ...

export function searchMunicipalityForms(slug: string, query: string): MunicipalityForm[] {
  const municipality = getMunicipalityBySlug(slug);
  if (!municipality || !query.trim()) return [];

  const place = `${municipality.name} ${municipality.cantonShort ?? ''} ${municipality.slug.replace(/-/g, ' ')}`;
  return municipality.forms.filter((form) =>
    matchesQuery(`${form.name} ${form.category} ${place}`, query),
  );
}
