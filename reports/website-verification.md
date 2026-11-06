# Provjera zvaničnih web stranica

Datum: 2026-10-11. Obuhvat: 142 općina/opština, gradova, kantona, entiteta i unosa Brčko distrikta.

Redoslijed izvora: `public.institutions.website_url` → `public.institutions.base_url` → `public.institucije.official_url` → zvanični registar vlada → statički imenik (korisnički izvori iz /workspace/uploads). Domen se prihvata samo ako stvarni HTTP zahtjev uspije (200, preusmjeravanje ili zaštita od botova 401/403/429/503). Nepotvrđeni unosi nemaju dugme.

| Status | Broj |
|---|---|
| ok | 79 |
| redirect | 27 |
| unverified | 36 |

| Vrsta | Naziv | Slug | Website | Status | HTTP | Konačni URL | Izvor | Napomena |
|---|---|---|---|---|---|---|---|---|
| municipality | Banovići | banovici | https://banovici.ba | ok | 200 | https://banovici.ba | public.institucije.official_url | nepotpun SSL lanac |
| municipality | Berkovići | berkovici | https://opstinaberkovici.com | ok | 200 | https://opstinaberkovici.com | public.institutions.website_url |  |
| municipality | Bileća | bileca | https://www.opstinabileca.ba | ok | 200 | https://www.opstinabileca.ba | public.institutions.website_url |  |
| municipality | Bosanska Krupa | bosanska-krupa | https://gradbosanskakrupa.ba | ok | 200 | https://gradbosanskakrupa.ba | public.institutions.website_url |  |
| municipality | Bosanski Petrovac | bosanski-petrovac | https://www.bosanskipetrovac.gov.ba | ok | 200 | https://www.bosanskipetrovac.gov.ba | public.institutions.website_url |  |
| canton | Bosansko-podrinjski kanton Goražde | bosansko-podrinjski-kanton-gorazde | https://bpkg.gov.ba | ok | 200 | https://bpkg.gov.ba | zvanični registar vlada |  |
| municipality | Breza | breza | https://breza.gov.ba | ok | 200 | https://breza.gov.ba | public.institutions.website_url |  |
| municipality | Brod | brod | https://opstina-brod.net | ok | 200 | https://opstina-brod.net | public.institucije.official_url |  |
| district | Brčko distrikt | brcko-distrikt | https://www.zzzbrcko.org | ok | 200 | https://www.zzzbrcko.org | statički imenik – obrasci |  |
| municipality | Bužim | buzim | https://opcinabuzim.ba | ok | 200 | https://opcinabuzim.ba | public.institutions.website_url |  |
| municipality | Centar | centar | https://centar.ba | ok | 200 | https://centar.ba | public.institucije.official_url |  |
| municipality | Donji Vakuf | donji-vakuf | https://donji-vakuf.ba | ok | 200 | https://donji-vakuf.ba | public.institutions.website_url |  |
| entity | Federacija Bosne i Hercegovine | federacija-bosne-i-hercegovine | https://fbihvlada.gov.ba | ok | 200 | https://fbihvlada.gov.ba | zvanični registar vlada |  |
| municipality | Gacko | gacko | https://gacko-rs.info | ok | 200 | https://gacko-rs.info | public.institutions.website_url |  |
| municipality | Glamoč | glamoc | https://www.opcinakupres.ba | ok | 200 | https://www.opcinakupres.ba | statički imenik (uploads) |  |
| municipality | Gornji Vakuf-Uskoplje | gornji-vakuf-uskoplje | https://gvu.ba | ok | 200 | https://gvu.ba | public.institutions.website_url |  |
| municipality | Grad | grad | https://www.mostar.ba | ok | 200 | https://www.mostar.ba | statički imenik (uploads) |  |
| municipality | Grad Bihać | bihac | https://www.bihac.org | ok | 200 | https://www.bihac.org | public.institutions.website_url |  |
| municipality | Grad Doboj | doboj | https://doboj.gov.ba | ok | 200 | https://doboj.gov.ba | public.institucije.official_url |  |
| municipality | Grad Istočno Sarajevo | istocno-sarajevo | https://gradistocnosarajevo.net | ok | 200 | https://gradistocnosarajevo.net | public.institucije.official_url |  |
| municipality | Grad Livno | livno | https://livno.ba | ok | 200 | https://livno.ba | public.institucije.official_url |  |
| municipality | Grad Ljubuški | ljubuski | https://ljubuski.ba | ok | 200 | https://ljubuski.ba | public.institucije.official_url |  |
| municipality | Grad Mostar | mostar | https://www.mostar.ba | ok | 200 | https://www.mostar.ba | public.institucije.official_url |  |
| municipality | Grad Sarajevo | sarajevo | https://www.sarajevo.ba | ok | 200 | https://www.sarajevo.ba | public.institucije.official_url |  |
| municipality | Grad Tuzla | tuzla | https://grad.tuzla.ba | ok | 200 | https://grad.tuzla.ba | public.institucije.official_url |  |
| municipality | Grad Široki Brijeg | siroki-brijeg | https://sirokibrijeg.ba | ok | 200 | https://sirokibrijeg.ba | statički imenik (uploads) |  |
| municipality | Grad Živinice | zivinice | https://gradzivinice.ba | ok | 200 | https://gradzivinice.ba | statički imenik (uploads) |  |
| municipality | Gradačac | gradacac | https://gradacac.ba | ok | 200 | https://gradacac.ba | public.institucije.official_url |  |
| municipality | Gradiška | gradiska | https://gradiska.org | ok | 200 | https://gradiska.org | public.institucije.official_url |  |
| municipality | Gračanica | gracanica | https://gracanica.gov.ba | ok | 200 | https://gracanica.gov.ba | public.institucije.official_url |  |
| municipality | Hadžići | hadzici | https://hadzici.ba | ok | 200 | https://hadzici.ba | statički imenik (uploads) |  |
| municipality | Ilidža | ilidza | https://opcinailidza.ba | ok | 200 | https://opcinailidza.ba | public.institutions.website_url |  |
| municipality | Ilijaš | ilijas | https://ilijas.ba | ok | 200 | https://ilijas.ba | statički imenik (uploads) |  |
| municipality | Istočna Ilidža | istocna-ilidza | https://istocnailidza.net | ok | 200 | https://istocnailidza.net | public.institucije.official_url |  |
| municipality | Jajce | jajce | https://opcina-jajce.ba | ok | 200 | https://opcina-jajce.ba | public.institutions.website_url |  |
| municipality | Kalesija | kalesija | https://kalesija.ba | ok | 200 | https://kalesija.ba | public.institucije.official_url |  |
| canton | Kanton 10 | kanton-10 | https://www.vladahbz.com | ok | 200 | https://www.vladahbz.com | zvanični registar vlada |  |
| canton | Kanton Sarajevo | kanton-sarajevo | https://vlada.ks.gov.ba | ok | 200 | https://vlada.ks.gov.ba | public.institutions.website_url |  |
| municipality | Kladanj | kladanj | https://kladanj.ba | ok | 200 | https://kladanj.ba | public.institucije.official_url |  |
| municipality | Ključ | kljuc | https://kljuc.ba | ok | 200 | https://kljuc.ba | public.institucije.official_url |  |
| municipality | Kreševo | kresevo | https://kresevo.ba | ok | 200 | https://kresevo.ba | public.institutions.website_url |  |
| municipality | Kupres | kupres | https://kupres.ba | ok | 200 | https://kupres.ba | statički imenik (uploads) |  |
| municipality | Laktaši | laktasi | https://laktasi.org | ok | 403 | https://laktasi.org | public.institucije.official_url | zaštita od botova |
| municipality | Ljubinje | ljubinje | https://opstinaljubinje.org | ok | 200 | https://opstinaljubinje.org | public.institutions.website_url |  |
| municipality | Lukavac | lukavac | https://lukavac.ba | ok | 200 | https://lukavac.ba | public.institucije.official_url |  |
| municipality | Modriča | modrica | https://modrica.ba | ok | 200 | https://modrica.ba | public.institucije.official_url |  |
| municipality | Nevesinje | nevesinje | https://opstinanevesinje.rs.ba | ok | 200 | https://opstinanevesinje.rs.ba | public.institutions.website_url |  |
| municipality | Novi Grad | novi-grad | https://www.opstina-novigrad.com | ok | 200 | https://www.opstina-novigrad.com | public.institutions.website_url |  |
| municipality | Novi Travnik | novi-travnik | https://ont.gov.ba | ok | 200 | https://ont.gov.ba | public.institutions.website_url |  |
| municipality | Novo Sarajevo | novo-sarajevo | https://novosarajevo.ba | ok | 200 | https://novosarajevo.ba | public.institutions.website_url |  |
| municipality | Odžak | odzak | https://odzak.ba | ok | 200 | https://odzak.ba | public.institutions.website_url |  |
| municipality | Olovo | olovo | https://olovo.gov.ba | ok | 200 | https://olovo.gov.ba | public.institutions.website_url |  |
| municipality | Općina Grude | grude | https://grude.ba | ok | 200 | https://grude.info/ | public.institucije.official_url | nepotpun SSL lanac |
| municipality | Opština Han Pijesak | han-pijesak | https://hanpijesak.org | ok | 200 | https://hanpijesak.org | public.institucije.official_url |  |
| municipality | Opština Novo Goražde | novo-gorazde | https://novogorazde.rs.ba | ok | 200 | https://novogorazde.rs.ba | public.institucije.official_url |  |
| municipality | Opština Rudo | rudo | https://opstinarudo.com | ok | 200 | https://opstinarudo.com | public.institutions.website_url |  |
| municipality | Orašje | orasje | https://orasje.ba | ok | 200 | https://orasje.ba | public.institucije.official_url |  |
| municipality | Osmaci | osmaci | https://osmaci.org | ok | 200 | https://osmaci.org | public.institucije.official_url |  |
| municipality | Oštra Luka | ostra-luka | https://www.opstinaostraluka.org | ok | 200 | https://www.opstinaostraluka.org | public.institutions.website_url |  |
| district | Policija Brčko Distrikta BiH | policija-brcko-distrikta-bih | https://policijabdbih.gov.ba | ok | 200 | https://policijabdbih.gov.ba | public.institucije.official_url |  |
| entity | Poreska uprava Republike Srpske | poreska-uprava-republike-srpske | https://www.poreskaupravars.org | ok | 200 | https://poreskaupravars.org/ | statički imenik (uploads) | nepotpun SSL lanac |
| entity | Porezna uprava Federacije BiH | porezna-uprava-federacije-bih | https://www.pufbih.ba | ok | 200 | https://www.pufbih.ba | statički imenik (uploads) |  |
| municipality | Prozor-Rama | prozor-rama | https://www.prozor-rama.org | ok | 200 | https://www.prozor-rama.org | public.institutions.website_url |  |
| municipality | Sanski Most | sanski-most | https://sanskimost.gov.ba | ok | 200 | https://sanskimost.gov.ba | public.institutions.website_url |  |
| canton | Srednjobosanski kanton | srednjobosanski-kanton | https://sbk-ksb.gov.ba | ok | 200 | https://sbk-ksb.gov.ba | public.institucije.official_url |  |
| municipality | Stari Grad | stari-grad | https://starigrad.ba | ok | 200 | https://starigrad.ba | public.institucije.official_url |  |
| municipality | Stolac | stolac | https://stolac.gov.ba | ok | 200 | https://stolac.gov.ba | public.institutions.website_url |  |
| canton | Tuzlanski kanton | tuzlanski-kanton | https://tk.gov.ba | ok | 200 | https://tk.gov.ba | public.institucije.official_url |  |
| canton | Unsko-sanski kanton | unsko-sanski-kanton | https://vladausk.ba | ok | 200 | https://vladausk.ba | zvanični registar vlada |  |
| municipality | Usora | usora | https://www.usora.com | ok | 200 | https://www.usora.com | public.institutions.website_url |  |
| municipality | Velika Kladuša | velika-kladusa | https://velikakladusa.gov.ba | ok | 200 | https://velikakladusa.gov.ba | public.institutions.website_url |  |
| municipality | Visoko | visoko | https://www.visoko.gov.ba | ok | 200 | https://www.visoko.gov.ba | public.institutions.website_url |  |
| canton | Zapadnohercegovački kanton | zapadnohercegovacki-kanton | https://www.vladazzh.com | ok | 200 | https://www.vladazzh.com | zvanični registar vlada |  |
| municipality | Zavidovići | zavidovici | https://zavidovici.ba | ok | 200 | https://zavidovici.ba | public.institutions.website_url |  |
| canton | Zeničko-dobojski kanton | zenicko-dobojski-kanton | https://zdk.ba | ok | 200 | https://zdk.ba | public.institucije.official_url |  |
| municipality | Čapljina | capljina | https://capljina.ba | ok | 200 | https://capljina.ba | public.institucije.official_url |  |
| municipality | Čitluk | citluk | https://citluk.ba | ok | 200 | https://citluk.ba | public.institucije.official_url |  |
| municipality | Šekovići | sekovici | https://sekovici.org | ok | 200 | https://sekovici.org | public.institucije.official_url |  |
| municipality | Žepče | zepce | https://zepce.ba | ok | 200 | https://zepce.ba | public.institucije.official_url |  |
| municipality | Bugojno | bugojno | https://www.opcina-bugojno.ba | redirect | 200 | https://opcina-bugojno.ba/ | public.institutions.website_url |  |
| municipality | Fojnica | fojnica | https://fojnica.ba | redirect | 200 | https://www.fojnica.ba/v3/ | public.institutions.website_url |  |
| municipality | Goražde | gorazde | https://www.gorazde.ba | redirect | 200 | https://gorazde.ba/ | public.institutions.website_url |  |
| municipality | Grad Banja Luka | banja-luka | https://banjaluka.rs.ba | redirect | 200 | https://www.banjaluka.rs.ba/ | public.institucije.official_url |  |
| municipality | Grad Bijeljina | bijeljina | https://bijeljina.org | redirect | 200 | https://www.bijeljina.org/ | public.institucije.official_url |  |
| municipality | Grad Prijedor | prijedor | https://www.prijedorgrad.org | redirect | 200 | https://www.prijedorgrad.org/sr-BA/ | public.institutions.website_url |  |
| municipality | Grad Trebinje | trebinje | https://www.trebinje.rs.ba | redirect | 200 | https://trebinje.rs.ba/ | public.institutions.website_url |  |
| canton | Hercegovačko-neretvanski kanton | hercegovacko-neretvanski-kanton | https://vlada.hnzk.ba | redirect | 200 | https://vlada.hnzk.ba/hr | zvanični registar vlada |  |
| municipality | Kakanj | kakanj | https://kakanj.gov.ba | redirect | 200 | https://kakanj.gov.ba/v5/ | public.institutions.website_url |  |
| municipality | Kiseljak | kiseljak | https://opcina-kiseljak.org | redirect | 200 | https://www.opcina-kiseljak.org/web/ | public.institutions.website_url |  |
| municipality | Konjic | konjic | https://www.konjic.ba | redirect | 200 | https://www.konjic.ba/ba/ | public.institutions.website_url |  |
| municipality | Maglaj | maglaj | https://maglaj.ba | redirect | 200 | https://maglaj.ba/ba/index.php | public.institutions.website_url |  |
| municipality | Neum | neum | https://www.neum.ba | redirect | 200 | https://neum.ba/ | public.institutions.website_url |  |
| municipality | Općina Posušje | posusje | https://posusje.ba | redirect | 200 | https://www.opcina-posusje.ba/ | public.institucije.official_url |  |
| municipality | Opština Foča | foca | https://opstinafoca.rs.ba | redirect | 200 | https://foca.rs.ba/ | public.institucije.official_url |  |
| municipality | Opština Sokolac | sokolac | https://opstinasokolac.net | redirect | 200 | https://www.opstinasokolac.net/ | public.institucije.official_url |  |
| canton | Posavski kanton | posavski-kanton | https://zupanijaposavska.ba | redirect | 200 | https://www.zupanijaposavska.ba/ | public.institucije.official_url |  |
| municipality | Republika Srpska | republika-srpska | https://www.vladars.rs | redirect | 200 | https://vladars.rs/sr-sp-cyrl/Pages/default.aspx | zvanični registar vlada |  |
| municipality | Srebrenik | srebrenik | https://srebrenik.ba | redirect | 200 | https://www.srebrenik.ba/ | public.institucije.official_url |  |
| municipality | Tešanj | tesanj | https://tesanj.ba | redirect | 200 | https://opcina-tesanj.ba/ | public.institucije.official_url |  |
| municipality | Tomislavgrad | tomislavgrad | https://tomislavgrad.ba | redirect | 200 | https://www.tomislavgrad.ba/ | public.institucije.official_url |  |
| municipality | Travnik | travnik | https://opcinatravnik.com.ba | redirect | 200 | https://opcinatravnik.com.ba/ba/ | public.institutions.website_url |  |
| municipality | Travnička regija | travnicka-regija | https://opcinatravnik.com.ba | redirect | 200 | https://opcinatravnik.com.ba/ba/ | statički imenik (uploads) |  |
| municipality | Vitez | vitez | https://vitez.info | redirect | 200 | https://www.vitez.info/ | public.institutions.website_url |  |
| municipality | Zenica | zenica | https://www.zenica.ba | redirect | 200 | https://zenica.ba/ | public.institutions.website_url |  |
| municipality | Zvornik | zvornik | https://opstina-zvornik.org | redirect | 200 | http://www.opstina-zvornik.org/ | public.institucije.official_url |  |
| municipality | Šamac | samac | https://opstinasamac.org | redirect | 200 | https://opstinasamac.org/sr-BA/ | public.institucije.official_url |  |
| municipality | Bosansko Grahovo | bosansko-grahovo | https://bosansko-grahovo.ba (nije potvrđeno) | unverified |  | https://bosansko-grahovo.ba | statički imenik (uploads) | <urlopen error [Errno -2] Name or service not known> |
| municipality | Brčko Distrikt BiH | brcko-distrikt-bih | https://bdcentral.net (nije potvrđeno) | unverified |  | https://bdcentral.net | public.institucije.official_url | <urlopen error timed out> |
| municipality | Busovača | busovaca | https://opcina-busovaca.com (nije potvrđeno) | unverified |  | https://opcina-busovaca.com | public.institutions.website_url | <urlopen error timed out> |
| municipality | Cazin | cazin | https://cazin.example (nije potvrđeno) | unverified |  | https://cazin.example | public.institutions.website_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Derventa | derventa | https://derventa.ba (nije potvrđeno) | unverified |  | https://derventa.ba | public.institucije.official_url | <urlopen error timed out> |
| municipality | Doboj Istok | doboj-istok | https://doboj-istok.example (nije potvrđeno) | unverified |  | https://doboj-istok.example | public.institutions.website_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Doboj-Jug | doboj-jug | https://doboj-jug.ba (nije potvrđeno) | unverified |  | https://doboj-jug.ba | public.institucije.official_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Domaljevac-Šamac | domaljevac-samac | https://domaljevac.example (nije potvrđeno) | unverified |  | https://domaljevac.example | public.institutions.website_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Dostupni obrasci: urbanizam, prijava prebivališta, uvjerenja. | dostupni-obrasci-urbanizam-prijava-prebivalista-uvjerenja | https://trnovo-rs.org (nije potvrđeno) | unverified |  | https://trnovo-rs.org | statički imenik (uploads) | <urlopen error [Errno -2] Name or service not known> |
| municipality | Drvar | drvar | https://drvar.ba (nije potvrđeno) | unverified |  | https://drvar.ba | public.institucije.official_url | <urlopen error [Errno -2] Name or service not known> |
| entity | Federalni zavod za penzijsko i invalidsko osiguranje | federalni-zavod-za-penzijsko-i-invalidsko-osiguranje | https://www.fzmiopio.ba (nije potvrđeno) | unverified |  | https://www.fzmiopio.ba | statički imenik (uploads) | <urlopen error timed out> |
| municipality | Foča-Ustikolina | foca-ustikolina | https://manual-access (nije potvrđeno) | unverified |  | https://manual-access | public.institutions.base_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Istočni Mostar | istocni-mostar | https://istocnimostar.org (nije potvrđeno) | unverified |  | https://istocnimostar.org | public.institucije.official_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Istočni Stari Grad | istocni-stari-grad | https://istocnistarigrad.org (nije potvrđeno) | unverified |  | https://istocnistarigrad.org | public.institutions.website_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Istočno Novo Sarajevo | istocno-novo-sarajevo | https://istocnonovosarajevo.rs.ba (nije potvrđeno) | unverified |  | https://istocnonovosarajevo.rs.ba | public.institucije.official_url | <urlopen error [Errno -5] No address associated with hostname> |
| municipality | Jablanica | jablanica | https://www.jablanica.ba (nije potvrđeno) | unverified |  | https://www.jablanica.ba | public.institutions.website_url | <urlopen error timed out> |
| municipality | Kneževo (Skender Vakuf) | knezevo | https://knezevo.example (nije potvrđeno) | unverified |  | https://knezevo.example | public.institutions.website_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Kotor Varoš | kotor-varos | https://kotorvaros.example (nije potvrđeno) | unverified |  | https://kotorvaros.example | public.institutions.website_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Kozarska Dubica | kozarska-dubica | https://kozarska-dubica.com (nije potvrđeno) | unverified |  | https://kozarska-dubica.com | public.institucije.official_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Lopare | lopare | https://lopare.rs.ba (nije potvrđeno) | unverified |  | https://lopare.rs.ba | public.institucije.official_url | <urlopen error [Errno -3] Temporary failure in name resolution> |
| municipality | Mrkonjić Grad | mrkonjic-grad | https://mrkonjic.example (nije potvrđeno) | unverified |  | https://mrkonjic.example | public.institutions.website_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Opština Pale | pale | https://opstinapale.org (nije potvrđeno) | unverified |  | https://opstinapale.org | public.institucije.official_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Opština Rogatica | rogatica | https://rogatica.example (nije potvrđeno) | unverified |  | https://rogatica.example | public.institutions.website_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Opština Čajniče | cajnice | https://cajnice.rs.ba (nije potvrđeno) | unverified |  | https://cajnice.rs.ba | public.institucije.official_url | <urlopen error [Errno -5] No address associated with hostname> |
| municipality | Pale-Prača | pale-praca | https://manual-access (nije potvrđeno) | unverified |  | https://manual-access | public.institutions.base_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Petrovo | petrovo | https://opstinapetrovo.org (nije potvrđeno) | unverified |  | https://opstinapetrovo.org | public.institutions.website_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Prnjavor | prnjavor | https://prnjavor.org (nije potvrđeno) | unverified |  | https://prnjavor.org | public.institucije.official_url | <urlopen error [Errno -5] No address associated with hostname> |
| municipality | Sapna | sapna | https://opcina-sapna.ba (nije potvrđeno) | unverified |  | https://opcina-sapna.ba | public.institucije.official_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Teočak | teocak | https://teocak.ba (nije potvrđeno) | unverified |  | https://teocak.ba | public.institucije.official_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Teslić | teslic | https://teslic.rs.ba (nije potvrđeno) | unverified |  | https://teslic.rs.ba | public.institucije.official_url | <urlopen error [Errno -3] Temporary failure in name resolution> |
| municipality | Trnovo (FBiH) | trnovo | https://trnovo-rs.org (nije potvrđeno) | unverified |  | https://trnovo-rs.org | public.institucije.official_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Ugljevik | ugljevik | https://ugljevik.rs.ba (nije potvrđeno) | unverified |  | https://ugljevik.rs.ba | public.institucije.official_url | <urlopen error [Errno -5] No address associated with hostname> |
| district | Vlada Brčko Distrikta BiH | vlada-brcko-distrikta-bih | https://www.bdcentral.net (nije potvrđeno) | unverified |  | https://www.bdcentral.net | public.institucije.official_url | <urlopen error timed out> |
| municipality | Vogošća | vogosca | https://vogosca.example (nije potvrđeno) | unverified |  | https://vogosca.example | public.institutions.website_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Vukosavlje | vukosavlje | https://vukosavlje.org (nije potvrđeno) | unverified |  | https://vukosavlje.org | public.institucije.official_url | <urlopen error [Errno -2] Name or service not known> |
| municipality | Čelić | celic | https://celic.ba (nije potvrđeno) | unverified |  | https://celic.ba | public.institucije.official_url | <urlopen error [Errno -2] Name or service not known> |
