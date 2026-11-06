// Generisano skriptom za HTTP provjeru zvaničnih domena (2026-10-11). Ne uređivati ručno.
// Samo unosi s verified=true dobijaju dugme 'Posjeti web stranicu'.
export interface WebsiteCheck {
  url?: string;
  check: 'ok' | 'redirect' | 'unverified' | 'missing';
  verified: boolean;
  source: string;
}

export const websiteVerification: Record<string, WebsiteCheck> = {
 "banovici": {
  "url": "https://banovici.gov.ba/",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "berkovici": {
  "url": "https://opstinaberkovici.com/home/",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "bileca": {
  "url": "https://www.opstinabileca.ba/",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "bosanska-krupa": {
  "url": "https://gradbosanskakrupa.ba/",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "bosanski-petrovac": {
  "url": "https://www.bosanskipetrovac.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "bosansko-grahovo": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "statički imenik (uploads)"
 },
 "bosansko-podrinjski-kanton-gorazde": {
  "url": "https://bpkg.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "zvanični registar vlada"
 },
  "brcko-distrikt": {
   "url": "",
   "check": "unverified",
   "verified": false,
   "source": "public.institucije.official_url"
  },
 "breza": {
  "url": "https://breza.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "brod": {
  "url": "https://opstina-brod.net",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "bugojno": {
  "url": "https://opcina-bugojno.ba/",
  "check": "unverified",
  "verified": false,
  "source": "korisnički dokument (HTTP provjera nije obavljena)"
 },
 "busovaca": {
  "url": "https://opcina-busovaca.com/",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "buzim": {
  "url": "https://opcinabuzim.ba/",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "cazin": {
  "url": "https://gradcazin.gov.ba/",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "centar": {
  "url": "https://www.centar.ba/",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "capljina": {
  "url": "https://capljina.ba/",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "celic": {
  "url": "https://opcinacelic.ba/",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "citluk": {
  "url": "https://citluk.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "derventa": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institucije.official_url"
 },
 "doboj-istok": {
  "url": "https://opcinadobojistok.ba/",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "doboj-jug": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institucije.official_url"
 },
 "domaljevac-samac": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institutions.website_url"
 },
 "donji-vakuf": {
  "url": "https://donji-vakuf.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "dostupni-obrasci-urbanizam-prijava-prebivalista-uvjerenja": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "statički imenik (uploads)"
 },
 "drvar": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institucije.official_url"
 },
 "federacija-bosne-i-hercegovine": {
  "url": "https://fbihvlada.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "zvanični registar vlada"
 },
 "federalni-zavod-za-penzijsko-i-invalidsko-osiguranje": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "statički imenik (uploads)"
 },
 "foca-ustikolina": {
  "url": "https://foca-ustikolina.ba",
  "check": "ok",
  "verified": true,
  "source": "zvanični registar općina"
 },
 "fojnica": {
  "url": "https://www.fojnica.ba/v3/",
  "check": "unverified",
  "verified": false,
  "source": "user-provided update"
 },
 "gacko": {
  "url": "https://gacko-rs.info",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "glamoc": {
  "url": "https://www.opcinakupres.ba",
  "check": "ok",
  "verified": true,
  "source": "statički imenik (uploads)"
 },
 "gorazde": {
  "url": "https://gorazde.ba/",
  "check": "redirect",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "gornji-vakuf-uskoplje": {
  "url": "https://www.gvu.ba/",
  "check": "unverified",
  "verified": false,
  "source": "user-provided update"
 },
 "gracanica": {
  "url": "https://gracanica.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "grad": {
  "url": "https://www.mostar.ba",
  "check": "ok",
  "verified": true,
  "source": "statički imenik (uploads)"
 },
 "banja-luka": {
  "url": "https://banjaluka.rs.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "bihac": {
  "url": "https://www.bihac.org",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "bijeljina": {
  "check": "unverified",
  "verified": false,
  "source": "korisnički dokument (HTTP provjera nije obavljena)"
 },
 "doboj": {
  "url": "https://doboj.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "istocno-sarajevo": {
  "url": "https://gradistocnosarajevo.net",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "livno": {
  "url": "https://livno.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "ljubuski": {
  "url": "https://ljubuski.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "mostar": {
  "url": "https://www.mostar.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "prijedor": {
  "url": "https://www.prijedorgrad.org",
  "check": "redirect",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "sarajevo": {
  "url": "https://www.sarajevo.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "siroki-brijeg": {
  "url": "https://sirokibrijeg.ba",
  "check": "ok",
  "verified": true,
  "source": "statički imenik (uploads)"
 },
 "trebinje": {
  "url": "https://www.trebinje.rs.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "tuzla": {
  "url": "https://grad.tuzla.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "zivinice": {
  "url": "https://gradzivinice.ba",
  "check": "ok",
  "verified": true,
  "source": "statički imenik (uploads)"
 },
 "gradacac": {
  "url": "https://gradacac.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "gradiska": {
  "url": "https://www.gradgradiska.com/",
  "check": "unverified",
  "verified": false,
  "source": "user-provided update"
 },
 "hadzici": {
  "url": "https://hadzici.ba",
  "check": "ok",
  "verified": true,
  "source": "statički imenik (uploads)"
 },
 "hercegovacko-neretvanski-kanton": {
  "url": "https://vlada.hnzk.ba",
  "check": "redirect",
  "verified": true,
