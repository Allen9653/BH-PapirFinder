import type { MunicipalityForm } from './municipality-registry';

export interface DocumentItem {
  id: string;
  title: string;
  url: string;
  category: string;
}

export const BOSANSKA_KRUPA_OFFICIAL_URL = 'https://gradbosanskakrupa.ba/';
export const BOSANSKA_KRUPA_ECITIZEN_URL =
  'https://www.ecitizen.ba/bosanska_krupa/eServices';

export const bosanskaKrupaDocuments = {
  id: 'bosanska-krupa',
  name: 'Grad Bosanska Krupa',
  officialWebsite: BOSANSKA_KRUPA_OFFICIAL_URL,
  formsSourceUrl: BOSANSKA_KRUPA_ECITIZEN_URL,
  hasStandardFormsPage: true,
  notice:
    'Grad Bosanska Krupa podržava online popunjavanje i podnošenje formulara direktno putem eCitizen platforme.',
  documents: [
    {
      id: 'bosanska_krupa-1',
      title: 'Zahtjev za pristup informacijama',
      url: 'https://gradbosanskakrupa.ba/wp-content/uploads/delightful-downloads/2023/03/Zahtjev-za-pristup-informacijama.pdf',
      category: 'Vodiči i zahtjevi',
    },
    {
      id: 'bosanska_krupa-2',
      title: 'Vodič za pristup informacijama',
      url: 'https://gradbosanskakrupa.ba/wp-content/uploads/delightful-downloads/2017/12/VODI%C4%8C-ZA-PRISTUP-INFORMACIJAMA.pdf',
      category: 'Vodiči i zahtjevi',
    },
    {
      id: 'bosanska_krupa-3',
      title: 'Uputstvo o načinu podnošenja i rješavanja pritužbi',
      url: 'https://gradbosanskakrupa.ba/wp-content/uploads/delightful-downloads/2018/01/Uputstvo-o-nacinu-podnosenja-i-rjesavanja-prituzbi.pdf',
      category: 'Vodiči i zahtjevi',
    },
  ],
} as const;

export const bosanskaKrupaForms: MunicipalityForm[] = bosanskaKrupaDocuments.documents.map(
  (document) => ({
    id: document.id,
    name: document.title,
    pdfUrl: document.url,
    category: document.category,
    external: true,
    fileType: 'pdf',
    sourceUrl: bosanskaKrupaDocuments.formsSourceUrl,
  }),
);
