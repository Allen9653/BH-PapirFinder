import { matchesQuery } from '@/lib/search-match';

// Primjer kako funkcije moraju biti eksportovane:
export function getAllMunicipalities() {
  // ...
}

export function getTotalFormsCount() {
  // ...
}

export function getMunicipalityBySlug(slug: string) {
  // ...
}

export function getFormDateAdded(form: any) {
  // ...
}

export function searchMunicipalityForms(slug: string, query: string): MunicipalityForm[] {
  const municipality = getMunicipalityBySlug(slug);
  if (!municipality || !query.trim()) return [];

  const place = `${municipality.name} ${municipality.cantonShort ?? ''} ${municipality.slug.replace(/-/g, ' ')}`;
  return municipality.forms.filter((form) =>
    matchesQuery(`${form.name} ${form.category} ${place}`, query),
  );
}
