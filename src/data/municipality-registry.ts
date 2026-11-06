import { matchesQuery } from '@/lib/search-match';

// Definicije tipova (ako već nisu definirane ovdje ili u drugom fajlu)
export interface MunicipalityForm {
  id: string;
  name: string;
  category: string;
  url?: string;
  pdfUrl?: string;
  sizeKB?: number;
  dateAdded?: string;
  [key: string]: any;
}

export interface MunicipalityInfo {
  slug: string;
  name: string;
  cantonShort?: string;
  canton?: string;
  forms: MunicipalityForm[];
  [key: string]: any;
}

// Ovdje pretpostavljamo da tvoja stvarna baza općina već postoji u projektu (npr. uvezena iz JSON-a ili definisana lokalno)
// Primjer mock/uvoza baze (prilagodi putanju ako je drugačija):
import municipalitiesData from './municipalities-raw-data'; // ili odakle već učitavaš podatke

export function getAllMunicipalities(): MunicipalityInfo[] {
  return municipalitiesData as MunicipalityInfo[];
}

export function getTotalFormsCount(): number {
  const all = getAllMunicipalities();
  return all.reduce((acc, m) => acc + (m.forms?.length || 0), 0);
}

export function getMunicipalityBySlug(slug: string): MunicipalityInfo | undefined {
  const all = getAllMunicipalities();
  return all.find((m) => m.slug === slug);
}

export function getFormDateAdded(form: MunicipalityForm): string {
  return form.dateAdded || 'N/A';
}

export function searchMunicipalityForms(slug: string, query: string): MunicipalityForm[] {
  const municipality = getMunicipalityBySlug(slug);
  if (!municipality || !query.trim()) return [];

  const place = `${municipality.name} ${municipality.cantonShort ?? ''} ${municipality.slug.replace(/-/g, ' ')}`;
  return municipality.forms.filter((form) =>
    matchesQuery(`${form.name} ${form.category} ${place}`, query),
  );
}
