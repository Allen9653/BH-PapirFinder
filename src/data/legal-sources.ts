/** Službeni pravni izvori (HTTP provjereni) — aplikacija ne objavljuje tekstove zakona, samo upućuje na službene izvore. */
export interface LegalSource {
  name: string;
  url: string;
  level: 'BiH' | 'FBiH' | 'RS' | 'BD';
  descKey: string;
}

export const legalSources: LegalSource[] = [
  { name: 'Službeni list BiH', url: 'https://www.sluzbenilist.ba', level: 'BiH', descKey: 'laws.src.sluzbenilist' },
  { name: 'Parlamentarna skupština BiH', url: 'https://www.parlament.ba', level: 'BiH', descKey: 'laws.src.parlament' },
  { name: 'Vlada Federacije BiH', url: 'https://fbihvlada.gov.ba', level: 'FBiH', descKey: 'laws.src.fbihvlada' },
  { name: 'Parlament Federacije BiH', url: 'https://parlamentfbih.gov.ba', level: 'FBiH', descKey: 'laws.src.parlamentfbih' },
  { name: 'Službeni glasnik Republike Srpske', url: 'https://www.slglasnik.org', level: 'RS', descKey: 'laws.src.slglasnik' },
  { name: 'Narodna skupština Republike Srpske', url: 'https://www.narodnaskupstinars.net', level: 'RS', descKey: 'laws.src.nsrs' },
  { name: 'Skupština Brčko distrikta BiH', url: 'https://skupstinabd.ba', level: 'BD', descKey: 'laws.src.skupstinabd' },
];
