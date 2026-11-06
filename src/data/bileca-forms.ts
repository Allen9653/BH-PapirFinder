import type { MunicipalityForm } from './municipality-registry';

export interface DocumentItem {
  id: string;
  title: string;
  url: string;
  category: string;
}

export const BILECA_OFFICIAL_URL = 'https://www.opstinabileca.ba/';
export const BILECA_FORMS_SOURCE_URL = 'https://www.opstinabileca.ba/obrazci-gradjani/';
export const BILECA_CONTESTS_SOURCE_URL = 'https://www.opstinabileca.ba/konkursi/';
export const BILECA_CONTACTS_URL = 'https://www.opstinabileca.ba/contacts/';

export const bilecaDocuments = {
  id: 'bileca',
  name: 'Opština Bileća',
  officialWebsite: BILECA_OFFICIAL_URL,
  formsSourceUrl: BILECA_FORMS_SOURCE_URL,
  hasStandardFormsPage: true,
  documents: [
    {
      id: 'bileca-obrazci-gradjani',
      title: 'Obrasci za građane Opštine Bileća',
      url: BILECA_FORMS_SOURCE_URL,
      category: 'Obrasci za građane',
    },
    {
      id: 'bileca-konkursi',
      title: 'Konkursi i javni oglasi Opštine Bileća',
      url: BILECA_CONTESTS_SOURCE_URL,
      category: 'Konkursi',
    },
    {
      id: 'bileca-kontakti',
      title: 'Kontakt podaci Opštine Bileća',
      url: BILECA_CONTACTS_URL,
      category: 'Kontakti',
    },
    {
      id: 'konkurs_01',
      title: '12.10.2026. – Javni konkurs za prijem službenika i namještenika',
      url: 'https://www.opstinabileca.ba/wp-content/uploads/2026/10/%D0%9A%D0%9E%D0%9D%D0%9A%D0%A3%D0%A0%D0%A1-%D0%A1%D0%9B%D0%A3%D0%96%D0%91%D0%95%D0%9D%D0%98%D0%A6%D0%98-%D0%98-%D0%9D%D0%90%D0%9C%D0%88%D0%95%D0%A8%D0%A2%D0%95%D0%9D%D0%98%D0%A6%D0%981.pdf',
      category: 'Konkursi',
    },
    {
      id: 'konkurs_02',
      title: '12.10.2026. – Javni konkurs za prijem pripravnika',
      url: 'https://www.opstinabileca.ba/wp-content/uploads/2026/10/%D0%9A%D0%BE%D0%BD%D0%BA%D1%83%D1%80%D1%81-%D0%B7%D0%B0-%D0%BF%D1%80%D0%B8%D1%98%D0%B5%D0%BC-%D0%BF%D1%80%D0%B8%D0%BF%D1%80%D0%B0%D0%B2%D0%BD%D0%B8%D0%BA%D0%B0.pdf',
      category: 'Konkursi',
    },
    {
      id: 'konkurs_03',
      title: '9.10.2026. – Javni konkurs za prijem pripravnika',
      url: 'https://www.opstinabileca.ba/wp-content/uploads/2026/10/%D0%88%D0%B0%D0%B2%D0%BD%D0%B8-%D0%BA%D0%BE%D0%BD%D0%BA%D1%83%D1%80%D1%81-%D0%B7%D0%B0-%D0%BF%D1%80%D0%B8%D1%98%D0%B5%D0%BC-%D0%BF%D1%80%D0%B8%D0%BF%D1%80%D0%B0%D0%B2%D0%BD%D0%B8%D0%BA%D0%B0-1.pdf',
      category: 'Konkursi',
    },
    {
      id: 'konkurs_04',
      title: '7.9.2026. – Javni konkurs za prijem pripravnika',
      url: 'https://www.opstinabileca.ba/wp-content/uploads/2026/09/%D0%9A%D0%BE%D0%BD%D0%BA%D1%83%D1%80%D1%81-%D0%B7%D0%B0-%D0%BF%D1%80%D0%B8%D1%98%D0%B5%D0%BC-%D0%BF%D1%80%D0%B8%D0%BF%D1%80%D0%B0%D0%B2%D0%BD%D0%B8%D0%BA%D0%B0.pdf',
      category: 'Konkursi',
    },
  ],
} as const;

export const bilecaForms: MunicipalityForm[] = bilecaDocuments.documents.map((document) => ({
  id: document.id,
  name: document.title,
  pdfUrl: document.url,
  category: document.category,
  external: true,
  fileType: new URL(document.url).pathname.toLowerCase().endsWith('.pdf') ? 'pdf' : 'html',
  sourceUrl:
    document.category === 'Konkursi'
      ? BILECA_CONTESTS_SOURCE_URL
      : document.category === 'Kontakti'
        ? BILECA_CONTACTS_URL
        : bilecaDocuments.formsSourceUrl,
}));
