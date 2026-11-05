const OFFICIAL_EMAILS_BY_SLUG: Record<string, string> = {
  kladanj: 'opcina.kladanj@bih.net.ba',
  ljubinje: 'ljubinje@teol.net',
};

export function getMunicipalityContactEmail(slug: string): string {
  return OFFICIAL_EMAILS_BY_SLUG[slug.toLowerCase().trim()] ?? '';
}
