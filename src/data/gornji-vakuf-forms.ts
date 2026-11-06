import type { MunicipalityForm } from './municipality-registry';

export const GORNJI_VAKUF_OFFICIAL_URL = 'https://www.gvu.ba/';
export const GORNJI_VAKUF_E_MATICAR_URL = 'https://www.gvu.ba/e-maticar';
export const GORNJI_VAKUF_DIASPORA_URL = 'https://www.gvu.ba/registar-dijaspore';
export const GORNJI_VAKUF_ECITIZEN_URL = 'https://ecitizen.ba/gornji_vakuf_uskoplje/home';

const registerRequests = [
  'Matična knjiga rođenih',
  'Matična knjiga umrlih',
  'Matična knjiga vjenčanih',
  'Uvjerenje o slobodnom bračnom stanju',
  'Uvjerenje o državljanstvu',
];

export const gornjiVakufForms: MunicipalityForm[] = [
  {
    id: 'gornji-vakuf-e-maticar',
    name: 'E-Matičar – online podnošenje zahtjeva za izdavanje i dostavu izvoda i uvjerenja',
    pdfUrl: GORNJI_VAKUF_E_MATICAR_URL,
    category: 'E-Matičar',
    fileType: 'html',
    external: true,
  },
  ...registerRequests.map((name, index) => ({
    id: `gornji-vakuf-e-maticar-${index + 1}`,
    name,
    pdfUrl: GORNJI_VAKUF_E_MATICAR_URL,
    category: 'Matični ured',
    fileType: 'html' as const,
    external: true,
  })),
  {
    id: 'gornji-vakuf-registar-dijaspore',
    name: 'Registar dijaspore',
    pdfUrl: GORNJI_VAKUF_DIASPORA_URL,
    category: 'Dijaspora',
    fileType: 'html',
    external: true,
  },
  {
    id: 'gornji-vakuf-ecitizen',
    name: 'eCitizen – elektronske usluge Općine Gornji Vakuf-Uskoplje',
    pdfUrl: GORNJI_VAKUF_ECITIZEN_URL,
    category: 'E-uprava',
    fileType: 'html',
    external: true,
  },
];
