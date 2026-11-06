// Gračanica’s currently verified online services and official document portals.

export const GRACANICA_OFFICIAL_URL = 'https://gracanica.gov.ba/';
export const GRACANICA_FORMS_URL = 'https://gracanica.gov.ba/dokumenti/e-obrasci/';
export const GRACANICA_DIASPORA_URL = 'https://gracanica.gov.ba/dijaspora-gracanice/';
export const GRACANICA_ECITIZEN_URL = 'https://www.ecitizen.ba/gracanica/home';

export interface GracanicaForm {
  id: string;
  name: string;
  pdfUrl: string;
  category: string;
  sizeKB?: number;
  external: true;
  fileType: 'html';
}

export const gracanicaForms: GracanicaForm[] = [
  {
    id: 'gracanica-ecitizen',
    name: 'eCitizen – elektronske usluge Grada Gračanica',
    pdfUrl: GRACANICA_ECITIZEN_URL,
    category: 'E-uprava',
    external: true,
    fileType: 'html',
  },
  {
    id: 'gracanica-e-obrasci',
    name: 'e-Obrasci Grada Gračanica',
    pdfUrl: GRACANICA_FORMS_URL,
    category: 'Obrasci',
    external: true,
    fileType: 'html',
  },
  {
    id: 'gracanica-diaspora',
    name: 'Informacije za dijasporu Grada Gračanica',
    pdfUrl: GRACANICA_DIASPORA_URL,
    category: 'Dijaspora',
    external: true,
    fileType: 'html',
  },
];

export function getGracanicaCategories(): string[] {
  return Array.from(new Set(gracanicaForms.map(form => form.category))).sort();
}

export function searchGracanicaForms(query: string): GracanicaForm[] {
  if (!query.trim()) return [];
  const searchTerm = query.toLocaleLowerCase('bs-BA').trim();
  return gracanicaForms.filter(form =>
    form.name.toLocaleLowerCase('bs-BA').includes(searchTerm) ||
    form.category.toLocaleLowerCase('bs-BA').includes(searchTerm),
  );
}

export function getGracanicaFormsByCategory(category: string): GracanicaForm[] {
  return gracanicaForms.filter(
    form => form.category.toLocaleLowerCase('bs-BA') === category.toLocaleLowerCase('bs-BA'),
  );
}

export function getGracanicaFormById(id: string): GracanicaForm | undefined {
  return gracanicaForms.find(form => form.id === id);
}
