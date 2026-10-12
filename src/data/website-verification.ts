// Generisano skriptom za HTTP provjeru zvaničnih domena (2026-10-11). Ne uređivati ručno.
// Samo unosi s verified=true dobijaju dugme 'Posjeti web stranicu'.
export interface WebsiteCheck {
  url: string;
  check: 'ok' | 'redirect' | 'unverified' | 'missing';
  verified: boolean;
  source: string;
}

export const websiteVerification: Record<string, WebsiteCheck> = {
 "banovici": {
  "url": "https://banovici.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "berkovici": {
  "url": "https://opstinaberkovici.com",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "bileca": {
  "url": "https://www.opstinabileca.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "bosanska-krupa": {
  "url": "https://gradbosanskakrupa.ba",
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
 "brcko-distrikt-bih": {
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
  "url": "https://www.opcina-bugojno.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "busovaca": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institutions.website_url"
 },
 "buzim": {
  "url": "https://opcinabuzim.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "cazin": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institutions.website_url"
 },
 "centar": {
  "url": "https://centar.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "capljina": {
  "url": "https://capljina.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "celic": {
  "url": "",
  "check": "unverified",
  "verified": false,
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
  "url": "",
  "check": "unverified",
  "verified": false,
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
  "url": "https://fojnica.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institutions.website_url"
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
  "url": "https://www.gorazde.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "gornji-vakuf-uskoplje": {
  "url": "https://gvu.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
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
  "url": "https://bijeljina.org",
  "check": "redirect",
  "verified": true,
  "source": "public.institucije.official_url"
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
  "url": "https://gradiska.org",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
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
  "source": "zvanični registar vlada"
 },
 "ilidza": {
  "url": "https://opcinailidza.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "ilijas": {
  "url": "https://ilijas.ba",
  "check": "ok",
  "verified": true,
  "source": "statički imenik (uploads)"
 },
 "istocna-ilidza": {
  "url": "https://istocnailidza.net",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "istocni-mostar": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institucije.official_url"
 },
 "istocni-stari-grad": {
  "url": "https://opstinaisg.net",
  "check": "ok",
  "verified": true,
  "source": "zvanični portal opštine"
 },
 "istocno-novo-sarajevo": {
  "url": "https://opstinains.net",
  "check": "ok",
  "verified": true,
  "source": "zvanični portal opštine"
 },
 "jablanica": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institutions.website_url"
 },
 "jajce": {
  "url": "https://opcina-jajce.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "kakanj": {
  "url": "https://kakanj.gov.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "kalesija": {
  "url": "https://kalesija.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "kanton-10": {
  "url": "https://www.vladahbz.com",
  "check": "ok",
  "verified": true,
  "source": "zvanični registar vlada"
 },
 "kanton-sarajevo": {
  "url": "https://vlada.ks.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "kiseljak": {
  "url": "https://opcina-kiseljak.org",
  "check": "redirect",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "kladanj": {
  "url": "https://kladanj.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "kljuc": {
  "url": "https://kljuc.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "knezevo": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institutions.website_url"
 },
 "konjic": {
  "url": "https://www.konjic.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "kotor-varos": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institutions.website_url"
 },
 "kozarska-dubica": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institucije.official_url"
 },
 "kresevo": {
  "url": "https://kresevo.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "kupres": {
  "url": "https://kupres.ba",
  "check": "ok",
  "verified": true,
  "source": "statički imenik (uploads)"
 },
 "laktasi": {
  "url": "https://laktasi.org",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "lopare": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institucije.official_url"
 },
 "lukavac": {
  "url": "https://lukavac.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "ljubinje": {
  "url": "https://opstinaljubinje.org",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "maglaj": {
  "url": "https://maglaj.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "modrica": {
  "url": "https://modrica.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "mrkonjic-grad": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institutions.website_url"
 },
 "neum": {
  "url": "https://www.neum.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "nevesinje": {
  "url": "https://opstinanevesinje.rs.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "novi-grad": {
  "url": "https://www.opstina-novigrad.com",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "novi-grad-sarajevo": {
  "url": "https://novigradsarajevo.ba",
  "check": "ok",
  "verified": true,
  "source": "zvanični portal općine"
 },
 "novi-travnik": {
  "url": "https://ont.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "novo-sarajevo": {
  "url": "https://novosarajevo.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "odzak": {
  "url": "https://odzak.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "olovo": {
  "url": "https://olovo.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "grude": {
  "url": "https://grude.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "posusje": {
  "url": "https://posusje.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "cajnice": {
  "url": "https://opstinacajnice.rs.ba",
  "check": "ok",
  "verified": true,
  "source": "zvanični portal opštine"
 },
 "foca": {
  "url": "https://foca.rs.ba",
  "check": "ok",
  "verified": true,
  "source": "zvanični portal opštine"
 },
 "foca-rs": {
  "url": "https://foca.rs.ba",
  "check": "ok",
  "verified": true,
  "source": "zvanični portal opštine"
 },
 "han-pijesak": {
  "url": "https://hanpijesak.org",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "novo-gorazde": {
  "url": "https://novogorazde.rs.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "pale": {
  "url": "https://pale.rs.ba",
  "check": "ok",
  "verified": true,
  "source": "zvanični portal opštine"
 },
 "pale-rs": {
  "url": "https://pale.rs.ba",
  "check": "ok",
  "verified": true,
  "source": "zvanični portal opštine"
 },
 "rogatica": {
  "url": "https://rogatica.ba",
  "check": "ok",
  "verified": true,
  "source": "zvanični portal opštine"
 },
 "rudo": {
  "url": "https://opstinarudo.com",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "sokolac": {
  "url": "https://opstinasokolac.net",
  "check": "redirect",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "orasje": {
  "url": "https://orasje.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "osmaci": {
  "url": "https://osmaci.org",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "ostra-luka": {
  "url": "https://www.opstinaostraluka.org",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "pale-praca": {
  "url": "https://praca.ba",
  "check": "ok",
  "verified": true,
  "source": "zvanični portal općine"
 },
 "petrovo": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institutions.website_url"
 },
 "policija-brcko-distrikta-bih": {
  "url": "https://policijabdbih.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "poreska-uprava-republike-srpske": {
  "url": "https://www.poreskaupravars.org",
  "check": "ok",
  "verified": true,
  "source": "statički imenik (uploads)"
 },
 "porezna-uprava-federacije-bih": {
  "url": "https://www.pufbih.ba",
  "check": "ok",
  "verified": true,
  "source": "statički imenik (uploads)"
 },
 "posavski-kanton": {
  "url": "https://zupanijaposavska.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "prnjavor": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institucije.official_url"
 },
 "prozor-rama": {
  "url": "https://www.prozor-rama.org",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "republika-srpska": {
  "url": "https://www.vladars.rs",
  "check": "redirect",
  "verified": true,
  "source": "zvanični registar vlada"
 },
 "sanski-most": {
  "url": "https://sanskimost.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "sapna": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institucije.official_url"
 },
 "srebrenik": {
  "url": "https://srebrenik.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "srednjobosanski-kanton": {
  "url": "https://sbk-ksb.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "stari-grad": {
  "url": "https://starigrad.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "stolac": {
  "url": "https://stolac.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "samac": {
  "url": "https://opstinasamac.org",
  "check": "redirect",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "sekovici": {
  "url": "https://sekovici.org",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "teocak": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institucije.official_url"
 },
 "teslic": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institucije.official_url"
 },
 "tesanj": {
  "url": "https://tesanj.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "tomislavgrad": {
  "url": "https://tomislavgrad.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "travnicka-regija": {
  "url": "https://opcinatravnik.com.ba",
  "check": "redirect",
  "verified": true,
  "source": "statički imenik (uploads)"
 },
 "travnik": {
  "url": "https://opcinatravnik.com.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "trnovo": {
  "url": "https://trnovo.ba",
  "check": "ok",
  "verified": true,
  "source": "zvanični portal općine"
 },
 "trnovo-fbih": {
  "url": "https://trnovo.ba",
  "check": "ok",
  "verified": true,
  "source": "zvanični portal općine"
 },
 "trnovo-rs": {
  "url": "https://trnovo-rs.com",
  "check": "ok",
  "verified": true,
  "source": "zvanični portal opštine"
 },
 "tuzlanski-kanton": {
  "url": "https://tk.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "ugljevik": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institucije.official_url"
 },
 "unsko-sanski-kanton": {
  "url": "https://vladausk.ba",
  "check": "ok",
  "verified": true,
  "source": "zvanični registar vlada"
 },
 "usora": {
  "url": "https://www.usora.com",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "velika-kladusa": {
  "url": "https://velikakladusa.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "visoko": {
  "url": "https://www.visoko.gov.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "vitez": {
  "url": "https://vitez.info",
  "check": "redirect",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "vlada-brcko-distrikta-bih": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institucije.official_url"
 },
 "vogosca": {
  "url": "https://vogosca.ba",
  "check": "ok",
  "verified": true,
  "source": "zvanični portal općine"
 },
 "vukosavlje": {
  "url": "",
  "check": "unverified",
  "verified": false,
  "source": "public.institucije.official_url"
 },
 "zapadnohercegovacki-kanton": {
  "url": "https://www.vladazzh.com",
  "check": "ok",
  "verified": true,
  "source": "zvanični registar vlada"
 },
 "zavidovici": {
  "url": "https://zavidovici.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "zenica": {
  "url": "https://www.zenica.ba",
  "check": "redirect",
  "verified": true,
  "source": "public.institutions.website_url"
 },
 "zenicko-dobojski-kanton": {
  "url": "https://zdk.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "zvornik": {
  "url": "https://opstina-zvornik.org",
  "check": "redirect",
  "verified": true,
  "source": "public.institucije.official_url"
 },
 "zepce": {
  "url": "https://zepce.ba",
  "check": "ok",
  "verified": true,
  "source": "public.institucije.official_url"
 }
};
