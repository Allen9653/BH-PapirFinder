import type { MunicipalityForm } from './municipality-registry';

export const CAZIN_OFFICIAL_URL = 'https://gradcazin.gov.ba/';
export const CAZIN_DOCUMENTS_SOURCE_URL = 'https://gradcazin.gov.ba/dokumenti';
export const CAZIN_PUBLIC_PROCUREMENT_URL =
  'https://gradcazin.gov.ba/dokumenti?title=&field_godina_value=&field_kategorija_za_download_target_id=4';

export const cazinDocuments = {
  id: 'cazin',
  name: 'Grad Cazin',
  officialWebsite: CAZIN_OFFICIAL_URL,
  formsSourceUrl: CAZIN_DOCUMENTS_SOURCE_URL,
  hasStandardFormsPage: false,
  notice: 'Dokumenti iz oblasti javnih nabavki dostupni su za pregled i preuzimanje. Za kompletnu i ažurnu arhivu posjetite službenu stranicu dokumenata Grada Cazina.',
  documents: [
    {
      id: 'cazin-1',
      title: 'Odluka o odabiru najpovoljnije ponude – uređenje Društvenog doma u MZ Liskovac',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2023/Odluka%20o%20odabiru%20najpovoljnije%20ponude%20ureenju%20Drutvenog%20doma%20u%20MZ%20Liskovac.pdf',
      category: 'Javne nabavke 2023',
    },
    {
      id: 'cazin-2',
      title: 'Odluka o odabiru najpovoljnije ponude – adaptacija prostorija FK Krajina',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2023/Odluka%20o%20odabiru%20najpovoljnije%20ponude%20adaptacije%20prostorija%20FK%20Krajina.pdf',
      category: 'Javne nabavke 2023',
    },
    {
      id: 'cazin-3',
      title: 'Odluka o odabiru najpovoljnijeg ponuđača – nabavka vatrogasnog navalnog vozila',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2023/Oddluka%20o%20odabiru%20najpovoljnijeg%20ponuaa%20nabavku%20vatrogasnog%20navalnog%20vozila.pdf',
      category: 'Javne nabavke 2023',
    },
    {
      id: 'cazin-4',
      title: 'Odluka o odabiru najpovoljnije ponude – ugradnja stolarije na zgradi MZ Krivaja',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2023/Odluka%20o%20odabiru%20najpovoljnije%20ponude%20e-aukcija%20ugradnje%20stolarije%20na%20zgradi%20MZ%20Krivaja.pdf',
      category: 'Javne nabavke 2023',
    },
    {
      id: 'cazin-5',
      title: 'Odluka o odabiru najpovoljnije ponude – nabavka ozvučenja za potrebe džemata Polja',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2023/Odluka%20o%20odabiru%20najpovoljnije%20ponude%20%20za%20nabavku%20%20roba%20%20ozvuenja%20za%20potrebe%20demata%20Polja.pdf',
      category: 'Javne nabavke 2023',
    },
    {
      id: 'cazin-6',
      title: 'Model konkurentskog zahtjeva za dostavu ponuda – ugostiteljske usluge 2022',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2022/I%20Model%20konkurentskog%20zahtjeva%20za%20dostavu%20ponuda%202022.pdf',
      category: 'Javne nabavke 2022',
    },
    {
      id: 'cazin-7',
      title: 'Plan javnih nabavki Komunalno-stambenog fonda za 2022. godinu',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2022/Plan%20javnih%20nabavki%20Kom.Stambeni%20Fond%20za%202022.pdf',
      category: 'Javne nabavke 2022',
    },
    {
      id: 'cazin-8',
      title: 'Model konkurentskog zahtjeva za dostavu ponuda 2022',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2022/Model%20konkurentskog%20zahtjeva%20za%20dostavu%20ponuda%202022.pdf',
      category: 'Javne nabavke 2022',
    },
    {
      id: 'cazin-9',
      title: 'Zahtjev za dostavu ponuda – usluge noćenja',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2022/Zainteresirani%20ponuai%20-%20ponuda%20usluge%20noenja.pdf',
      category: 'Javne nabavke 2022',
    },
    {
      id: 'cazin-10',
      title: 'Model konkurentskog zahtjeva za dostavu ponuda – ugostiteljske usluge',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2022/Zainteresirani%20ponuai%20-Model%20konkurentskog%20zahtjeva%20za%20dostavu%20ponuda.pdf',
      category: 'Javne nabavke 2022',
    },
    {
      id: 'cazin-11',
      title: 'Plan javnih nabavki za 2022. godinu',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/plan%20javnih%20nabavki-2022-1.pdf',
      category: 'Javne nabavke 2022',
    },
    {
      id: 'cazin-12',
      title: 'Odluka o odabiru najpovoljnije ponude – Slatina',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2021/Odluka_o_odabiru_najpovoljnije_ponude_Dodjela_drugorangiranom_Slatina.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-13',
      title: 'Odluka o poništenju postupka – Ostrožac na Uni',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2021/Odluka_o_ponistenju_postupka_Ostrozac_na_Uni.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-14',
      title: 'Odluka o odabiru najpovoljnijeg ponuđača – džamija Vilenjača',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/odluka%20o%20odabiru%20najpovoljnijeg%20ponuaa-damija%20vilenjaa.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-15',
      title: 'Odluka o odabiru najpovoljnijeg ponuđača – maske',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/odluka%20o%20odabiru%20najpovoljnijeg%20ponuaa-maske2.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-16',
      title: 'Odluka o odabiru najpovoljnijeg ponuđača – Ratkovac, saobraćaj i priključak',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/odluka%20o%20odabiru%20najpovoljnijeg%20ponuaa-ratkovac-saob.i%20prikljuak.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-17',
      title: 'Odluka o poništenju postupka – skladište',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/odluka%20o%20ponitenju%20postupka-skladite.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-18',
      title: 'Odluka o odabiru najpovoljnije ponude – drugorangirani ponuđač za pelet',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2021/Odluka_o_odabiru_najpovoljnije_ponude_Drugorangirani_pelet.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-19',
      title: 'Odluka o poništenju postupka – paketi pomoći',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2021/Odluka_o_ponistenju_postupka_paketi_pomoci.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-20',
      title: 'Odluka o odabiru najpovoljnijeg ponuđača – dezinfekcija biračkih mjesta',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/odluka%20o%20odabiru%20najpovoljnijeg%20ponuaa-dezinfekcija%20birakih%20mjesta.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-21',
      title: 'Odluka o odabiru najpovoljnijeg ponuđača – mihrab',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/odluka%20o%20odabiru%20najpovoljnijeg%20ponuaa-mihrab.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-22',
      title: 'Odluka o odabiru najpovoljnijeg ponuđača – revizija Stovrela',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/odluka%20o%20odabiru%20najpovoljnijeg%20ponuaa-revizija%20stovrela.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-23',
      title: 'Odluka o poništenju postupka – staza',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/odluka%20o%20ponitenju%20postupka-staza.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-24',
      title: 'Odluka o odabiru najpovoljnije ponude – dvorana i RTV',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2021/Odluka_o_odabiru_najpovoljnije_ponude_Dvorana_i_RTV.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-25',
      title: 'Odluka o poništenju postupka – saobraćajnica PZ Ratkovac',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2021/Odluka_o_ponistenju_postupka_saobracajnica_PZ_Ratkovac.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-26',
      title: 'Odluka o odabiru najpovoljnijeg ponuđača – dezinfekcijska sredstva',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/odluka%20o%20odabiru%20najpovoljnijeg%20ponuaa-dezinfekcijska%20sredstva.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-27',
      title: 'Odluka o odabiru najpovoljnijeg ponuđača – mlin Tržac',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/odluka%20o%20odabiru%20najpovoljnijeg%20ponuaa-mlin%20trac.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-28',
      title: 'Odluka o odabiru najpovoljnije ponude – sanacija javne česme',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/odluka%20o%20odabiru%20najpovoljnijeg%20ponuaa-sanacija%20javne%20esme.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-29',
      title: 'Odluka o odabiru najpovoljnije ponude – izmještanje dalekovoda',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2021/Odluka_o_odabiru_najpovoljnije_ponude_Izmjestanje_dalekovoda.pdf',
      category: 'Javne nabavke 2021',
    },
    {
      id: 'cazin-30',
      title: 'Odluka o poništenju postupka – svlačionice NK Gomila',
      url: 'https://gradcazin.gov.ba/sites/default/files/dokumenti/Javne_nabavke/Javne_nabavke_2021/Odluka_o_ponistenju_postupka_svlacionice_NK_Gomila.pdf',
      category: 'Javne nabavke 2021',
    },
  ],
} as const;

export const cazinForms: MunicipalityForm[] = cazinDocuments.documents.map((document) => ({
  id: document.id,
  name: document.title,
  pdfUrl: document.url,
  category: document.category,
  external: true,
  fileType: 'pdf',
  sourceUrl: CAZIN_PUBLIC_PROCUREMENT_URL,
}));
