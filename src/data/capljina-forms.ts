import type { MunicipalityForm } from './municipality-registry';

export const CAPLJINA_OFFICIAL_URL = 'https://capljina.ba/';
export const CAPLJINA_FORMS_SOURCE_URL = 'https://capljina.ba/administrativni-postupci/';

export const capljinaDocuments = {
  id: 'capljina',
  name: 'Grad Čapljina',
  officialWebsite: CAPLJINA_OFFICIAL_URL,
  formsSourceUrl: CAPLJINA_FORMS_SOURCE_URL,
  hasStandardFormsPage: true,
  notice: 'Elektronski registar sadrži opis administrativnih postupaka, potrebne dokumentacije, taksi i obrazaca.',
  documents: [
    {
      id: 'capljina-01-01',
      title: '01.01 Procjena vrijednosti nekretnine',
      url: 'https://capljina.ba/registar/01-01-procjena-vrijednosti-nekretnine/',
      category: 'Poslovi gradonačelnika',
    },
    {
      id: 'capljina-01-02',
      title: '01.02 Suglasnost za korištenje naziva Općine',
      url: 'https://capljina.ba/registar/01-02-suglasnost-za-koristenje-naziva-opcine/',
      category: 'Poslovi gradonačelnika',
    },
    {
      id: 'capljina-01-03',
      title: '01.03 Potvrda o uspješno realiziranom ugovoru',
      url: 'https://capljina.ba/registar/01-03-potvrda-o-uspjesno-realiziranom-ugovoru/',
      category: 'Poslovi gradonačelnika',
    },
    {
      id: 'capljina-01-04',
      title: '01.04 Uvjerenje o izmirenim obvezama prema Općini',
      url: 'https://capljina.ba/registar/01-04-uvjerenje-o-izmirenim-obvezama-prema-opcini/',
      category: 'Proračun i financije',
    },
    {
      id: 'capljina-01-05',
      title: '01.05 Povrat pogrešno ili više uplaćenih javnih prihoda na račun Općine',
      url: 'https://capljina.ba/registar/01-05-povrat-pogresno-vise-uplacenih-javnih-prihoda-na-racun-opcine/',
      category: 'Proračun i financije',
    },
    {
      id: 'capljina-02-01',
      title: '02.01 Upis rođenja djeteta u matičnu knjigu rođenih',
      url: 'https://capljina.ba/registar/02-01-upis-rodenja-djeteta-u-maticnu-knjigu-rodenih/',
      category: 'Opća uprava i zajednički poslovi',
    },
    {
      id: 'capljina-02-02',
      title: '02.02 Upis činjenice državljanstva djeteta u matičnu knjigu rođenih',
      url: 'https://capljina.ba/registar/02-02-upis-cinjenice-drzavljanstva-djeteta-u-maticnu-knjigu-rodenih/',
      category: 'Opća uprava i zajednički poslovi',
    },
    {
      id: 'capljina-02-03',
      title: '02.03 Prijava zaključenja braka',
      url: 'https://capljina.ba/registar/02-03-prijava-zakljucenja-braka/',
      category: 'Opća uprava i zajednički poslovi',
    },
    {
      id: 'capljina-02-04',
      title: '02.04 Upis činjenice smrti u matičnu knjigu umrlih',
      url: 'https://capljina.ba/registar/02-04-upis-cinjenice-smrti-u-maticnu-knjigu-umrlih/',
      category: 'Opća uprava i zajednički poslovi',
    },
  ],
} as const;

export const capljinaForms: MunicipalityForm[] = capljinaDocuments.documents.map((document) => ({
  id: document.id,
  name: document.title,
  pdfUrl: document.url,
  category: document.category,
  external: true,
  fileType: 'html',
  sourceUrl: CAPLJINA_FORMS_SOURCE_URL,
}));
