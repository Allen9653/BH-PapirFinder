// Generisano iz korisničke baze "#B&H KORISNI URL" — ne uređivati ručno.
export interface UploadedInstitution { name: string; entity: string | null; canton: string | null; website: string; formsUrl: string | null; status: 'active' | 'counter' | 'inactive'; note: string; region: string }
export const uploadedInstitutions: UploadedInstitution[] = [
 {
  "name": "Goražde",
  "entity": "FBiH",
  "canton": "Bosansko-podrinjski kanton (BPK)",
  "website": "https://www.gorazde.ba",
  "formsUrl": "https://www.gorazde.ba/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Obrasci – urbanistička saglasnost, lokacijska informacija, izdavanje izvoda i uvjerenja",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Pale-Prača",
  "entity": "FBiH",
  "canton": "Bosansko-podrinjski kanton (BPK)",
  "website": "https://praca.ba/",
  "formsUrl": "https://praca.ba/?s=Obrazac",
  "status": "active",
  "note": "Zahtjevi i obrasci općinske službe Pale-Prača",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Foča-Ustikolina",
  "entity": "FBiH",
  "canton": "Bosansko-podrinjski kanton (BPK)",
  "website": "https://foca-ustikolina.ba",
  "formsUrl": "https://foca-ustikolina.ba/dokumenti/",
  "status": "active",
  "note": "Obrazac za prijavu komunalnih taksi i taksenih zahtjeva",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Ministarstvo za socijalnu politiku, zdravstvo BPK",
  "entity": "FBiH",
  "canton": "Bosansko-podrinjski kanton (BPK)",
  "website": "https://www.bpkg.gov.ba/ministarstva/zdravstvo",
  "formsUrl": "https://www.bpkg.gov.ba/ministarstva/zdravstvo",
  "status": "active",
  "note": "Ministarstvo za socijalnu politiku, zdravstvo BPK",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Ministarstvo za obrazovanje BPK",
  "entity": "FBiH",
  "canton": "Bosansko-podrinjski kanton (BPK)",
  "website": "https://www.bpkg.gov.ba/ministarstva/obrazovanje",
  "formsUrl": "https://www.bpkg.gov.ba/ministarstva/obrazovanje",
  "status": "active",
  "note": "Obrasci – stipendije, nostrifikacija, upisi u školu",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Ministarstvo za urbanizam BPK",
  "entity": "FBiH",
  "canton": "Bosansko-podrinjski kanton (BPK)",
  "website": "https://www.bpkg.gov.ba/ministarstva/urbanizam",
  "formsUrl": "https://www.bpkg.gov.ba/ministarstva/urbanizam",
  "status": "active",
  "note": "Obrasci – lokacijska informacija, urbanističke saglasnosti, okolišne dozvole",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Zavod zdravstvenog osiguranja BPK",
  "entity": "FBiH",
  "canton": "Bosansko-podrinjski kanton (BPK)",
  "website": "https://www.zzobpk.ba/",
  "formsUrl": "https://www.zzobpk.ba/",
  "status": "active",
  "note": "Obrasci – prijava na zdravstveno osiguranje, refundacija, ortopedska pomagala",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Stari Grad Sarajevo",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://starigrad.ba",
  "formsUrl": "https://starigrad.ba/v2/e_uprava.php",
  "status": "active",
  "note": "Zahtjev za izvod iz matične knjige rođenih/vjenčanih/umrlih (e-Uprava)",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Centar Sarajevo",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://centar.ba",
  "formsUrl": "https://centar.ba/e-uprava/obrasci",
  "status": "active",
  "note": "Zahtjev za registraciju samostalne djelatnosti (obrt)",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Općina Ilidža",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://opcinailidza.ba",
  "formsUrl": "https://opcinailidza.ba/obrasci",
  "status": "active",
  "note": "Zahtjev za izdavanje lokacijske informacije i urbanističkih uslova",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Novi Grad Sarajevo",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://novigradsarajevo.ba",
  "formsUrl": "https://novigradsarajevo.ba/e-uprava",
  "status": "active",
  "note": "Zahtjev za jednokratnu novčanu pomoć / Prijemni obrasci",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Novo Sarajevo",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://novosarajevo.ba",
  "formsUrl": "https://novosarajevo.ba/e-uprava/obrasci/",
  "status": "active",
  "note": "Zahtjev za ovjeru potpisa, rukopisa i prepisa",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Vogošća",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://vogosca.ba",
  "formsUrl": "https://vogosca.ba/e-uprava/obrasci/",
  "status": "active",
  "note": "Zahtjev za naknadu porodiljama / Građanska stanja",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Hadžići",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://hadzici.ba",
  "formsUrl": "https://hadzici.ba/e-uprava",
  "status": "active",
  "note": "Zahtjev za izdavanje izvoda iz matičnih knjiga",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Trnovo (FBiH)",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://trnovo.ba",
  "formsUrl": "https://trnovo.ba/dokumenti/obrasci/",
  "status": "active",
  "note": "Zahtjev za odobrenje građenja i priključak",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Ilijaš",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://ilijas.ba",
  "formsUrl": "https://ilijas.ba/e-uprava/obrasci",
  "status": "active",
  "note": "Zahtjev za utvrđivanje prava na dopunske oblike zaštite",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Grad Istočno Sarajevo",
  "entity": "RS",
  "canton": "Istočno Sarajevo regija",
  "website": "https://gradistocnosarajevo.net/",
  "formsUrl": "https://gradistocnosarajevo.net/dokumenti/",
  "status": "active",
  "note": "Zvanični obrasci i zahtjevi gradske uprave Istočno Sarajevo",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Istočna Ilidža",
  "entity": "RS",
  "canton": "Istočno Sarajevo regija",
  "website": "https://istocnailidza.net/",
  "formsUrl": "https://istocnailidza.net/dokumenti-i-obrasci/",
  "status": "active",
  "note": "Zahtjev za registraciju preduzetničke djelatnosti (SP)",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Istočno Novo Sarajevo",
  "entity": "RS",
  "canton": "Istočno Sarajevo regija",
  "website": "https://opstinains.net/",
  "formsUrl": "https://opstinains.net/usluge/obrasci/",
  "status": "active",
  "note": "Zahtjev za izdavanje lokacijskih uslova",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Pale (RS)",
  "entity": "RS",
  "canton": "Istočno Sarajevo regija",
  "website": "https://pale.rs.ba/",
  "formsUrl": "https://pale.rs.ba/dokumenti-i-obrasci/",
  "status": "active",
  "note": "Obrazac za registraciju preduzetnika i promjenu podataka",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Trnovo (RS)",
  "entity": "RS",
  "canton": "Istočno Sarajevo regija",
  "website": "https://trnovo-rs.com/",
  "formsUrl": "https://trnovo-rs.com/dokumenti/",
  "status": "active",
  "note": "Zahtjev za jednokratne pomoći i matični uredi",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Istočni Stari Grad",
  "entity": "RS",
  "canton": "Istočno Sarajevo regija",
  "website": "https://opstinaisg.net/",
  "formsUrl": "https://opstinaisg.net/dokumenti/",
  "status": "active",
  "note": "Zahtjev za izdavanje uvjerenja i obrazaca građanskog stanja",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Sokolac",
  "entity": "RS",
  "canton": "Istočno Sarajevo regija",
  "website": "https://opstinasokolac.net/",
  "formsUrl": "https://opstinasokolac.net/obrasci/",
  "status": "active",
  "note": "Zahtjev za izdavanje ekološke dozvole / Urbanizam",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Opština Foča (RS)",
  "entity": "RS",
  "canton": "Regija Foča / Drina",
  "website": "https://foca.rs.ba/",
  "formsUrl": "https://foca.rs.ba/usluge/obrasci/",
  "status": "active",
  "note": "Zahtjev za registraciju preduzetnika SP-1",
  "region": "Regija Foča / Drina"
},
 {
  "name": "Opština Čajniče",
  "entity": "RS",
  "canton": "Regija Foča / Drina",
  "website": "https://opstinacajnice.rs.ba/",
  "formsUrl": "https://cajnice.rs.ba/dokumenti/",
  "status": "active",
  "note": "Obrazac za naknadni upis u matične knjige",
  "region": "Regija Foča / Drina"
},
 {
  "name": "Opština Rudo",
  "entity": "RS",
  "canton": "Regija Foča / Drina",
  "website": "https://opstinarudo.com/",
  "formsUrl": "https://opstinarudo.com/gradjevinske-dozvole/",
  "status": "active",
  "note": "Zahtjev za podsticaje u poljoprivredi i registraciju SP",
  "region": "Regija Foča / Drina"
},
 {
  "name": "Opština Novo Goražde",
  "entity": "RS",
  "canton": "Regija Foča / Drina",
  "website": "https://novogorazde.rs.ba/",
  "formsUrl": "https://novogorazde.net/dokumenti/",
  "status": "active",
  "note": "Zahtjevi Odjeljenja za privredu i opštu upravu",
  "region": "Regija Foča / Drina"
},
 {
  "name": "Opština Han Pijesak",
  "entity": "RS",
  "canton": "Sarajevsko-Romanijska",
  "website": "https://hanpijesak.org/",
  "formsUrl": "https://hanpijesak.org/dokumenti/",
  "status": "active",
  "note": "Zahtjevi prijemne kancelarije i opšte uprave",
  "region": "Sarajevsko-Romanijska"
},
 {
  "name": "Opština Rogatica",
  "entity": "RS",
  "canton": "Sarajevsko-Romanijska",
  "website": "https://rogatica.ba/",
  "formsUrl": "https://rogatica.ba/dokumenti/obrasci/",
  "status": "active",
  "note": "Zahtjev za izdavanje upotrebe objekta i komunalne takse",
  "region": "Sarajevsko-Romanijska"
},
 {
  "name": "Opština Sokolac",
  "entity": "RS",
  "canton": null,
  "website": "https://opstinasokolac.net/",
  "formsUrl": "https://opstinasokolac.net/obrasci-i-zahtjevi/",
  "status": "active",
  "note": "Dostupni obrasci: urbanizam, građevinske dozvole, matični uredi.",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Opština Pale",
  "entity": "RS",
  "canton": null,
  "website": "https://opstinapale.org/",
  "formsUrl": "https://opstinapale.org/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Dostupni obrasci: građevinske dozvole, urbanističke saglasnosti, matični uredi.",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Dostupni obrasci: urbanizam, prijava prebivališta, uvjerenja.",
  "entity": "RS",
  "canton": "Opština Trnovo (RS)",
  "website": "https://trnovo-rs.org/",
  "formsUrl": "https://trnovo-rs.org/obrasci/",
  "status": "active",
  "note": "Dostupni obrasci: urbanizam, prijava prebivališta, uvjerenja.",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Grad",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  "website": "https://www.mostar.ba",
  "formsUrl": "https://www.mostar.ba/dokumenti-gradani/",
  "status": "active",
  "note": "Obrasci – urbanizam, uvjerenja, matični uredi, socijalna zaštita",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Općina Čapljina",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  "website": "https://eregistar.capljina.ba",
  "formsUrl": "https://eregistar.capljina.ba/administrativni-postupci/",
  "status": "active",
  "note": "Obrasci – lokacijska informacija, urbanistička saglasnost, izvod iz matičnih knjiga",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Općina Čitluk",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  "website": "https://citluk.ba",
  "formsUrl": "https://citluk.ba/zahtjevi/",
  "status": "active",
  "note": "Obrasci – izdavanje uvjerenja, urbanističke saglasnosti",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Općina Jablanica",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  "website": "https://www.jablanica.ba",
  "formsUrl": "https://www.jablanica.ba/ba/download-zona/obrasci-i-zahtjevi.html",
  "status": "active",
  "note": "Obrasci – zahtjev za uvjerenje, urbanizam, matični uredi",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Općina Konjic",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  "website": "https://konjic.ba/",
  "formsUrl": "https://www.konjic.ba/ba/uprava/opcinske-sluzbe/prospekti-sluzbi.html",
  "status": "active",
  "note": "Obrasci – lokacijska informacija, građevinske dozvole, uvjerenja",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Općina Neum",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  "website": "https://neum.ba",
  "formsUrl": "https://neum.ba/dokumenti/",
  "status": "active",
  "note": "Obrasci – zahtjev za uvjerenja, urbanistička dokumentacija",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Općina Prozor-Rama",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  "website": "https://prozor-rama.org",
  "formsUrl": "https://prozor-rama.org/euprava/dokumenti",
  "status": "active",
  "note": "Obrasci – zahtjev za izdavanje izvoda, urbanizam",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Općina Stolac",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  "website": "https://stolac.gov.ba",
  "formsUrl": "https://stolac.gov.ba/dokumenti/",
  "status": "active",
  "note": "Obrasci – zahtjevi za uvjerenja, urbanistička dokumentacija",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Ministarstvo zdravstva HNK",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  "website": "https://www.vlada-hnz-k.ba/ministarstva/ministarstvo-zdravstva-rada-i-socijalne-zastite",
  "formsUrl": "https://www.vlada-hnz-k.ba/ministarstva/ministarstvo-zdravstva-rada-i-socijalne-zastite",
  "status": "active",
  "note": "Obrasci – zdravstveno osiguranje, refundacija putnih troškova, ortopedska pomagala",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Ministarstvo obrazovanja HNK",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  "website": "https://www.vlada-hnz-k.ba/ministarstva/ministarstvo-prosvjete-znanosti-kulture-i-sporta",
  "formsUrl": "https://www.vlada-hnz-k.ba/ministarstva/ministarstvo-prosvjete-znanosti-kulture-i-sporta",
  "status": "active",
  "note": "Obrasci – stipendije, nostrifikacija, prijava djece u školu",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Ministarstvo prostornog uređenja HNK",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  "website": "https://www.vlada-hnz-k.ba/ministarstva/ministarstvo-prostornog-uredenja-gradjenja-i-zastite-okoline",
  "formsUrl": "https://www.vlada-hnz-k.ba/ministarstva/ministarstvo-prostornog-uredenja-gradjenja-i-zastite-okoline",
  "status": "active",
  "note": "Obrasci – lokacijska informacija, urbanističke saglasnosti, ekološke dozvole",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Zavod zdravstvenog osiguranja HNK",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  "website": "https://zzo.ba/",
  "formsUrl": "https://zzo.ba/",
  "status": "active",
  "note": "Obrasci – prijava na osiguranje, ortopedska pomagala, refundacija",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Livno",
  "entity": "FBiH",
  "canton": "Kanton 10 (Livanjski kanton)",
  "website": "https://livno.ba/",
  "formsUrl": "https://livno.ba/za-gradane/maticni-ured/",
  "status": "active",
  "note": "",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Grad",
  "entity": "FBiH",
  "canton": "Kanton/Županija",
  "website": "https://livno.ba/zahtjevi-i-obrasci",
  "formsUrl": null,
  "status": "active",
  "note": "",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Livno",
  "entity": "FBiH",
  "canton": "Kanton 10 (Livanjski kanton)",
  "website": "https://tomislavgrad.gov.ba/",
  "formsUrl": "https://tomislavgrad.gov.ba/obrasci/",
  "status": "active",
  "note": "",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Tomislavgrad",
  "entity": "FBiH",
  "canton": "Kanton 10 (Livanjski kanton)",
  "website": "https://www.opstinadrvar.net/",
  "formsUrl": "https://www.opstinadrvar.net/obrasci-zahtjeva/",
  "status": "active",
  "note": "",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Drvar",
  "entity": "FBiH",
  "canton": "Kanton 10 (Livanjski kanton)",
  "website": "https://www.bosanskograhovo.ba/",
  "formsUrl": null,
  "status": "active",
  "note": "Nema obrazaca za izdavanje ličnih dokumenata",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Bosansko Grahovo",
  "entity": "FBiH",
  "canton": "Kanton 10 (Livanjski kanton)",
  "website": "https://opstinaglamoc.ba/",
  "formsUrl": null,
  "status": "inactive",
  "note": "",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Glamoč",
  "entity": "FBiH",
  "canton": "Kanton 10 (Livanjski kanton)",
  "website": "https://www.opcinakupres.ba/",
  "formsUrl": "https://www.opcinakupres.ba/dokumenti",
  "status": "active",
  "note": "",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Kupres",
  "entity": "FBiH",
  "canton": "Kanton 10 (Livanjski kanton)",
  "website": "https://www.vladahbz.com/ministarstvo-rada-zdravstva-socijalne-skrbi-i-prognanih/",
  "formsUrl": "https://www.vladahbz.com/ministarstvo-rada-zdravstva-socijalne-skrbi-i-prognanih-dokumenti/",
  "status": "active",
  "note": "Ministarstvo zdravstva, rada i socijalne skrbi K10",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Zavod zdravstvenog osiguranja K10",
  "entity": null,
  "canton": "Kanton 10 (Livanjski kanton)",
  "website": "https://www.zzohbz.ba/",
  "formsUrl": "https://www.zzohbz.ba/dokumenti-3/tiskanice-zahtjevi-i-izjave/",
  "status": "active",
  "note": "",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Široki Brijeg",
  "entity": "FBiH",
  "canton": "Zapadnohercegovački kanton (ZHK)",
  "website": "https://www.sirokibrijeg.ba/",
  "formsUrl": "https://www.sirokibrijeg.ba/index.php/dokumenti/obrasci",
  "status": "active",
  "note": "Obrasci – urbanistička saglasnost, lokacijska informacija, izdavanje uvjerenja. Jedna od 4 lokalne jedinice ZHK sa online obrascima.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Ljubuški",
  "entity": "FBiH",
  "canton": "Zapadnohercegovački kanton (ZHK)",
  "website": "https://www.ljubuski.ba/",
  "formsUrl": "https://www.ljubuski.ba/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Obrasci – urbanističke saglasnosti, uvjerenja, matični uredi. Jedna od 4 lokalne jedinice ZHK sa online obrascima.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Grude",
  "entity": "FBiH",
  "canton": "Zapadnohercegovački kanton (ZHK)",
  "website": "https://www.grude.info/",
  "formsUrl": "https://www.grude.info/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Obrasci – urbanizam, građevinske dozvole, izdavanje uvjerenja. Jedna od 4 lokalne jedinice ZHK sa online obrascima.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Posušje",
  "entity": "FBiH",
  "canton": "Zapadnohercegovački kanton (ZHK)",
  "website": "https://www.opcina-posusje.ba/",
  "formsUrl": "https://www.opcina-posusje.ba/dokumenti/obrasci/",
  "status": "active",
  "note": "Obrasci – zahtjevi za urbanizam, izdavanje uvjerenja, lokacijske informacije. Jedna od 4 lokalne jedinice ZHK sa online obrascima.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Ministarstvo zdravstva, rada i socijalne skrbi ZHK",
  "entity": "FBiH",
  "canton": "Zapadnohercegovački kanton (ZHK)",
  "website": "https://www.zjz-zzh.ba/",
  "formsUrl": "https://www.zjz-zzh.ba/hr/pristup-informacijama.html",
  "status": "active",
  "note": "Ministarstvo zdravstva, rada i socijalne skrbi ZHK",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Ministarstvo obrazovanja, znanosti, kulture i športa ZHK",
  "entity": "FBiH",
  "canton": "Zapadnohercegovački kanton (ZHK)",
  "website": "https://www.vladazzh.com/ministarstva/obrazovanje-znanost-kultura-i-sport/",
  "formsUrl": "https://www.vladazzh.com/ministarstva/obrazovanje-znanost-kultura-i-sport/",
  "status": "active",
  "note": "Ministarstvo obrazovanja, znanosti, kulture i športa ZHK",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Ministarstvo prostornog uređenja, graditeljstva i zaštite okoliša ZHK",
  "entity": "FBiH",
  "canton": "Zapadnohercegovački kanton (ZHK)",
  "website": "https://www.vladazzh.com/",
  "formsUrl": "https://www.vladazzh.com/dokumenti.aspx",
  "status": "active",
  "note": "Ministarstvo prostornog uređenja, graditeljstva i zaštite okoliša ZHK",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Zavod zdravstvenog osiguranja ZHK",
  "entity": "FBiH",
  "canton": "Zapadnohercegovački kanton (ZHK)",
  "website": "https://zzozzh.com/",
  "formsUrl": "https://zzozzh.com/obrasci/",
  "status": "active",
  "note": "Obrasci – prijava zdravstvenog osiguranja, refundacije, ortopedska pomagala. Svi obrasci su zakonito dostupni privatnim firmama za podršku građanima i strancima.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://trebinje.rs.ba/",
  "formsUrl": "https://trebinje.rs.ba/obrasci-i-zahtjevi/",
  "status": "active",
  "note": "Zvanična web stranica Grada Trebinja je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://bileca.rs.ba/",
  "formsUrl": "https://bileca.rs.ba/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Bileća je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://gacko-rs.info/",
  "formsUrl": "https://gacko-rs.info/obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Gacko je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://opstinanevesinje.rs.ba/",
  "formsUrl": "https://opstinanevesinje.rs.ba/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Nevesinje je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://ljubinje.org/",
  "formsUrl": "https://ljubinje.org/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Ljubinje je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://berkovici.rs.ba/",
  "formsUrl": "https://berkovici.rs.ba/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Berkovići je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://istocnimostar.org/",
  "formsUrl": "https://istocnimostar.org/obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Istočni Mostar je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Bihać",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://zzousk.ba/",
  "formsUrl": "https://www.bihac.org/dokumenti/14",
  "status": "active",
  "note": "Obrasci i zahtjevi, izjave, prijave – razni obrasci za urbanizam, matične knjige, uvjerenja, lokacijske informacije. Većina web portala u USK nema sigurnu vezu. Bihać ima digitalizovane obrasce, ali je potrebno prilagodi",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Bosanska Krupa",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://zzousk.ba/",
  "formsUrl": "https://gradbosanskakrupa.ba/pristup-informacijama/",
  "status": "active",
  "note": "Obrasci – lokacijska informacija, urbanistička saglasnost, građevinske dozvole. Većina web portala u USK nema sigurnu vezu.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Bosanski Petrovac",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://zzousk.ba/",
  "formsUrl": "https://www.bosanskipetrovac.gov.ba/index.php/eupravalink",
  "status": "inactive",
  "note": "Nema direktnu stranicu za obrasce; koriste se u šalter sali, potrebno tražiti kod referenta. Većina web portala u USK nema sigurnu vezu.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Bužim",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://zzousk.ba/",
  "formsUrl": "https://opcinabuzim.ba/download/obrazac",
  "status": "active",
  "note": "Obrasci – prijava prebivališta, izdavanje uvjerenja, socijalna davanja. Većina web portala u USK nema sigurnu vezu.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Cazin",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://zzousk.ba/",
  "formsUrl": "https://gradcazin.gov.ba/search/node?keys=Obrazac",
  "status": "active",
  "note": "Obrasci – urbanizam, matični uredi, izdavanje izvoda i uvjerenja. Većina web portala u USK nema sigurnu vezu. Cazin ima digitalizovane obrasce, ali je potrebno prilagoditi cookies.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Ključ",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://zzousk.ba/",
  "formsUrl": "https://opcina-kljuc.ba/privreda/",
  "status": "active",
  "note": "Obrasci – prijave, zahtjevi za dozvole, urbanizam. Većina web portala u USK nema sigurnu vezu.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Sanski Most",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://zzousk.ba/",
  "formsUrl": "https://www.sanskimost.gov.ba/index.php/exploer/opcinske-sluzbe",
  "status": "active",
  "note": "Obrasci – izdavanje izvoda iz matičnih knjiga, urbanizam, lokacijska informacija. Većina web portala u USK nema sigurnu vezu. Sanski Most ima digitalizovane obrasce, ali je potrebno prilagoditi cookies.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Velika Kladuša",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://zzousk.ba/",
  "formsUrl": "https://velikakladusa.gov.ba/dokumenti-i-obrasci/",
  "status": "active",
  "note": "Obrasci – urbanistička saglasnost, zahtjev za izdavanje uvjerenja, matični uredi. Većina web portala u USK nema sigurnu vezu. Velika Kladuša ima digitalizovane obrasce, ali je potrebno prilagoditi cookies.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Ministarstvo zdravstva, rada i socijalne politike USK",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://zzousk.ba/",
  "formsUrl": "https://vladausk.ba/v4/preuzimanja",
  "status": "active",
  "note": "Ministarstvo zdravstva, rada i socijalne politike USK",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Ministarstvo obrazovanja, nauke, kulture i sporta USK",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://zzousk.ba/",
  "formsUrl": "https://www.vladausk.ba/ministarstva/ministarstvo-obrazovanja-nauke-kulture-i-sporta",
  "status": "active",
  "note": "Ministarstvo obrazovanja, nauke, kulture i sporta USK",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Ministarstvo za građenje, prostorno uređenje i zaštitu okoliša USK",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://zzousk.ba/",
  "formsUrl": "https://www.vladausk.ba/ministarstva/ministarstvo-za-gradjenje-prostorno-uredenje-i-zastitu-okoline",
  "status": "active",
  "note": "Ministarstvo za građenje, prostorno uređenje i zaštitu okoliša USK",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Zavod zdravstvenog osiguranja USK",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://zzousk.ba/",
  "formsUrl": "https://zzousk.ba/",
  "status": "active",
  "note": "Obrasci – zahtjevi za refundaciju, prijava na osiguranje, ortopedska pomagala.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://www.gradgradiska.com/",
  "formsUrl": "https://www.gradgradiska.com/izvodi-iz-maticnih-knjiga-i-upisi-u-mk/",
  "status": "active",
  "note": "Zvanična web stranica je aktivna i stabilna. Nudi direktne linkove za izvode iz matičnih knjiga i upise, te koristi eCitizen platformu za širi spektar e-usluga i obrazaca. Nije potrebna posebna tražilica.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://grad-laktasi.com/",
  "formsUrl": "https://ecitizen.ba/laktasi/eServices",
  "status": "active",
  "note": "Zvanična web stranica Opštine Laktaši je aktivna i stabilna. Direktni linkovi za obrasce i zahtjeve vode na eCitizen platformu, što je uobičajena praksa i osigurava stabilan pristup. Nije potrebna posebna tražilica.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://gradprnjavor.com/novi-sajt-opstine-prnjavor/",
  "formsUrl": "https://opstinaprnjavor.net/obrasci-i-zahtjevi/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Prnjavor je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce i zahtjeve. Lako je pronaći potrebne dokumente. Nije potrebna posebna tražilica.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://srbac-rs.com/",
  "formsUrl": "https://ecitizen.ba/srbac/eServices",
  "status": "active",
  "note": "Zvanična web stranica Opštine Srbac je aktivna. Obrasci su dostupni putem eCitizen platforme, što osigurava standardizovan i stabilan pristup. Nije potrebna posebna tražilica.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://www.ecitizen.ba/celinac/eServices",
  "formsUrl": null,
  "status": "active",
  "note": "https://www.opstina-celinac.com/ (Zvanična web stranica Opštine Čelinac)",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://opstinakotorvaros.com/%d0%bf%d0%be%d1%82%d1%80%d0%b5%d0%b1%d0%bd%d0%b8-%d0%be%d0%b1%d1%80%d0%b0%d1%81%d1%86%d0%b8-%d0%b7%d0%b0-%d0%b3%d1%80%d0%b0%d1%92%d0%b0%d0%bd%d0%b5/",
  "formsUrl": null,
  "status": "active",
  "note": "https://opstinakotorvaros.com/ (Zvanična web stranica Opštine Kotor Varoš)",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://opstinaknezevo.org/%d0%b7%d0%b0%d1%85%d1%82%d1%98%d0%b5%d0%b2%d0%b8-%d0%b8-%d0%be%d0%b1%d1%80%d0%b0%d1%81%d1%86%d0%b8/",
  "formsUrl": null,
  "status": "active",
  "note": "https://opstinaknezevo.org/ (Zvanična web stranica Opštine Kneževo)",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://opstinajezero.org/sr/opstinska-uprava/c295",
  "formsUrl": null,
  "status": "active",
  "note": "https://opstinajezero.org/ (Zvanična web stranica Opštine Jezero)",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://sipovo.org/zahtjevi-i-obrasci/",
  "formsUrl": null,
  "status": "active",
  "note": "https://sipovo.org/ (Zvanična web stranica Opštine Šipovo)",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://opstinaribnik.org/lat/kategorije/92/pristup-informacijama",
  "formsUrl": null,
  "status": "active",
  "note": "https://opstinaribnik.org/lat/ (Zvanična web stranica Opštine Ribnik)",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://www.banjaluka.rs.ba/",
  "formsUrl": "https://www.banjaluka.rs.ba/gradska-uprava/obrasci-i-zahtjevi/",
  "status": "active",
  "note": "Web stranica je izuzetno funkcionalna, sa jasnim navigacijom do obrasaca i zahtjeva. Svi obrasci su zakonski dozvoljeni za upotrebu privatnim firmama, građanima i strancima. Nije potrebna posebna tražilica.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://www.prijedorgrad.org/",
  "formsUrl": "https://www.prijedorgrad.org/",
  "status": "active",
  "note": "Zvanična web stranica Grada Prijedora je aktivna i stabilna. (Potrebno navigirati do sekcija poput \"Gradska uprava\" -> \"Dokumenti\" ili \"Usluge\")",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://www.opstina-novigrad.com/",
  "formsUrl": "https://opstina-novigrad.rs.ba/obrasci-i-zahtjevi/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Novi Grad je aktivna i stabilna. Postoji jasno označen odjeljak za obrasce i zahtjeve. Nije potrebna posebna tražilica.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://www.opstinaostraluka.org/",
  "formsUrl": "https://www.opstinaostraluka.org",
  "status": "active",
  "note": "Zvanična web stranica je aktivna i stabilna. Obrasci (urbanistička saglasnost, prijava prebivališta, uvjerenja) se nalaze na stranici, ali je potrebno pretraživati. Nije potrebna posebna tražilica.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://www.krupanauni.org/index.html",
  "formsUrl": null,
  "status": "active",
  "note": "Zvanična web stranica je aktivna. Ozbiljan nedostatak: Ne dopušta preuzimanje dokumenata/obrazaca za pravna i civilna lica. Za preuzimanje bilo kakve dokumentacije savjetuje se lična posjeta zgradi Opštine. Ovo čini onli",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Orašje",
  "entity": "FBiH",
  "canton": "Posavski kanton (PK)",
  "website": "https://orasje.ba/",
  "formsUrl": "https://orasje.ba/eObrasci/",
  "status": "active",
  "note": "Obrasci – zahtjev za uvjerenja, urbanistička saglasnost, lokacijska informacija.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Odžak",
  "entity": "FBiH",
  "canton": "Posavski kanton (PK)",
  "website": "https://odzak.ba/",
  "formsUrl": "https://odzak.ba/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Obrasci – urbanističke saglasnosti, izdavanje uvjerenja, matični uredi.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Domaljevac-Šamac",
  "entity": "FBiH",
  "canton": "Posavski kanton (PK)",
  "website": "https://domaljevac.ba/",
  "formsUrl": null,
  "status": "active",
  "note": "Nema posebnu stranicu za obrasce, dostupno putem protokola općine.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Ministarstvo zdravstva, rada i socijalne politike PK",
  "entity": "FBiH",
  "canton": "Posavski kanton (PK)",
  "website": "https://www.zupanijaposavska.ba/ministarstva/ministarstvo-zdravstva-rada-i-socijalne-politike/",
  "formsUrl": "https://www.zupanijaposavska.ba/ministarstva/ministarstvo-zdravstva-rada-i-socijalne-politike/",
  "status": "active",
  "note": "Ministarstvo zdravstva, rada i socijalne politike PK",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Ministarstvo prosvjete, znanosti, kulture i športa PK",
  "entity": "FBiH",
  "canton": "Posavski kanton (PK)",
  "website": "https://www.zupanijaposavska.ba/ministarstva/ministarstvo-prosvjete-znanosti-kulture-i-sporta/",
  "formsUrl": "https://www.zupanijaposavska.ba/ministarstva/ministarstvo-prosvjete-znanosti-kulture-i-sporta/",
  "status": "active",
  "note": "Ministarstvo prosvjete, znanosti, kulture i športa PK",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Ministarstvo prostornog uređenja, zaštite okoliša i returniranja PK",
  "entity": "FBiH",
  "canton": "Posavski kanton (PK)",
  "website": "https://www.zupanijaposavska.ba/",
  "formsUrl": "https://www.zupanijaposavska.ba/?s=Obrazac",
  "status": "active",
  "note": "Ministarstvo prostornog uređenja, zaštite okoliša i returniranja PK",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Zavod zdravstvenog osiguranja PK",
  "entity": "FBiH",
  "canton": "Posavski kanton (PK)",
  "website": "https://www.zzozp.ba/",
  "formsUrl": "https://www.zzozp.ba/index.php/dokumenti/prijavnice",
  "status": "active",
  "note": "Obrasci – prijava na zdravstveno osiguranje, refundacije, ortopedska pomagala.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Tuzla",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://grad.tuzla.ba/",
  "formsUrl": null,
  "status": "active",
  "note": "https://grad.tuzla.ba/obrasci-i-zahtjevi/  https://grad.tuzla.ba/category/gradtuzla/e-uprava/_Zahtjev-za-dostavljanje-izvoda-i-uvjerenja.pdf",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Kalesija",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://kalesija.ba/",
  "formsUrl": "https://kalesija.ba/e-usluge/",
  "status": "active",
  "note": "Elektronski formulari za: upis rođenja, prijava zdravstvenog osiguranja, punomoć, kućna lista, lokacijska informacija, uvjerenje iz urbanističkih odsjeka, regulacioni plan.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Banovići",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://banovici.gov.ba/",
  "formsUrl": "https://banovici.gov.ba/formulari/",
  "status": "active",
  "note": "Obrasci – zahtjev za urbanističku saglasnost, lokacijsku informaciju, uvjerenja.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Čelić",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://opcinacelic.ba/",
  "formsUrl": "https://opcinacelic.ba/novi-link-2",
  "status": "active",
  "note": "Obrasci – zahtjev za socijalnu pomoć, zahtjev za uvjerenja, građevinske dozvole.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Doboj Istok",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://opcinadobojistok.ba/",
  "formsUrl": "https://opcinadobojistok.ba/online-uvjerenja/",
  "status": "active",
  "note": "Obrasci – prijava prebivališta, izdavanje uvjerenja, zahtjevi prema urbanizmu. Opština Doboj Istok je jedna od rijetkih Općina u BiH koja je građanima omogućila naručivanje svih dokumenata iz udobnosti doma.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Gračanica",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://gracanica.gov.ba/",
  "formsUrl": "https://gracanica.gov.ba/?s=Obrazac&post_type=post",
  "status": "active",
  "note": "Obrasci – lokacijska informacija, urbanistička saglasnost, zahtjev za uvid u dokumente.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Gradačac",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://www.gradacac.ba/",
  "formsUrl": "https://www.gradacac.ba/naslovna/index.php/elektronski-zahtjevi",
  "status": "active",
  "note": "Obrasci – zahtjev za izdavanje izvoda, uvjerenja, lokacijska informacija.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Kladanj",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://kladanj.ba/",
  "formsUrl": "https://kladanj.ba/about-2.html",
  "status": "active",
  "note": "Obrasci – socijalna davanja, urbanizam, matični uredi.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Lukavac",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://lukavac.ba/",
  "formsUrl": "https://lukavac.ba/e-obrasci/",
  "status": "active",
  "note": "Obrasci – uvjerenja, lokacijska informacija, urbanizam.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Sapna",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://opcina-sapna.ba/",
  "formsUrl": "https://opcina-sapna.ba/dokumenti/",
  "status": "active",
  "note": "Obrasci – zahtjevi za uvjerenja, urbanistička dokumentacija.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Srebrenik",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://www.srebrenik.ba/",
  "formsUrl": "https://www.srebrenik.ba/e-uprava/",
  "status": "active",
  "note": "Obrasci – urbanistička saglasnost, lokacijska informacija, matični uredi.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Teočak",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://teocak.gov.ba/",
  "formsUrl": "https://teocak.gov.ba/?s=Obrazac",
  "status": "active",
  "note": "Obrasci – zahtjevi građana, izdavanje uvjerenja.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Zavod zdravstvenog osiguranja TK",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://zzotk.ba/",
  "formsUrl": "https://zzotk.ba/obrasci/",
  "status": "active",
  "note": "Zahtjevi za uputnice (CT, MR, rehabilitacija), podaci o ortopedskim pomagalima, prijava korupcije, e-legitimacija i dr.; povrat premija, izdavanje uvjerenja, turističko osiguranje, e-legitimacija i ostalo. Obrasci za zdr",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Ministarstvo pravosuđa i uprave TK",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://mpuzotk.gov.ba/",
  "formsUrl": "https://mpuzotk.gov.ba/",
  "status": "active",
  "note": "Registracija udruženja, promjene u registru, izdavanje izvoda.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Ministarstvo poljoprivrede, šumarstva i vodoprivrede TK",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://mpsvtk.gov.ba/",
  "formsUrl": "https://mpsvtk.gov.ba/",
  "status": "active",
  "note": "Ministarstvo poljoprivrede, šumarstva i vodoprivrede TK",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Ministarstvo prostornog uređenja i zaštite okoliša TK",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://tk.gov.ba/",
  "formsUrl": "https://tk.gov.ba/",
  "status": "active",
  "note": "Ministarstvo prostornog uređenja i zaštite okoliša TK",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Brčko distrikt",
  "entity": "BD",
  "canton": "Obrasci – zahtjevi za uvjerenja, urbanistička saglasnost, lokacijska informacija, prijava boravka. Brčko distrikt objedinjuje funkcije općine, grada i kantona. Svi obrasci su zakonito dostupni privatnim firmama za podršku građanima i strancima.",
  "website": "https://www.zzzbrcko.org/",
  "formsUrl": "https://www.zzzbrcko.org/",
  "status": "active",
  "note": "",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Brčko distrikt",
  "entity": "BD",
  "canton": "Obrasci – izvod iz matičnih knjiga, prijava prebivališta i boravišta, prijava rođenja. Brčko distrikt objedinjuje funkcije općine, grada i kantona. Svi obrasci su zakonito dostupni privatnim firmama za podršku građanima i strancima.",
  "website": "https://www.bdcentral.net/index.php/ba/odjeljenja/javni-registar",
  "formsUrl": "https://www.bdcentral.net/index.php/ba/odjeljenja/javni-registar",
  "status": "active",
  "note": "",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Brčko distrikt",
  "entity": "BD",
  "canton": "Obrasci – zdravstveno osiguranje, refundacija, ortopedska pomagala. Brčko distrikt objedinjuje funkcije općine, grada i kantona. Svi obrasci su zakonito dostupni privatnim firmama za podršku građanima i strancima.",
  "website": "https://www.bdcentral.net/index.php/ba/odjeljenja/zdravstvo-i-ostale-usluge",
  "formsUrl": "https://www.bdcentral.net/index.php/ba/odjeljenja/zdravstvo-i-ostale-usluge",
  "status": "active",
  "note": "Odjeljenje za zdravstvo i ostale usluge Brčko",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Brčko distrikt",
  "entity": "BD",
  "canton": "Obrasci – stipendije, upis djece u školu, nostrifikacija. Brčko distrikt objedinjuje funkcije općine, grada i kantona. Svi obrasci su zakonito dostupni privatnim firmama za podršku građanima i strancima.",
  "website": "https://www.bdcentral.net/index.php/ba/odjeljenja/obrazovanje",
  "formsUrl": "https://www.bdcentral.net/index.php/ba/odjeljenja/obrazovanje",
  "status": "active",
  "note": "",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Brčko distrikt",
  "entity": "BD",
  "canton": "Obrasci – lokacijska informacija, urbanistička saglasnost, građevinske dozvole. Brčko distrikt objedinjuje funkcije općine, grada i kantona. Svi obrasci su zakonito dostupni privatnim firmama za podršku građanima i strancima.",
  "website": "https://www.bdcentral.net/index.php/ba/odjeljenja/prostorno-planiranje",
  "formsUrl": "https://www.bdcentral.net/index.php/ba/odjeljenja/prostorno-planiranje",
  "status": "active",
  "note": "Odjeljenje za prostorno planiranje i imovinsko-pravne poslove Brčko",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Brčko distrikt",
  "entity": "BD",
  "canton": "Obrasci – prijava na zdravstveno osiguranje, refundacije, izdavanje zdravstvenih knjižica. Brčko distrikt objedinjuje funkcije općine, grada i kantona. Svi obrasci su zakonito dostupni privatnim firmama za podršku građanima i strancima.",
  "website": "https://fzobrcko.ba/",
  "formsUrl": "https://fzobrcko.ba/obrasci",
  "status": "active",
  "note": "",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://www.opstinateslic.com/",
  "formsUrl": "https://www.opstinateslic.com/?s=Obrazac&post_type%5B%5D",
  "status": "active",
  "note": "Zvanična web stranica Opštine Teslić je aktivna i stabilna. Jasno definisan odjeljak za obrasce i zahtjeve omogućava lagano preuzimanje. Svi obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://modrica.ba/",
  "formsUrl": "https://modrica.ba/usluge/obrasci/",
  "status": "active",
  "note": "Oficijelna web stranica Opštine Modriča je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://derventa.ba/",
  "formsUrl": "https://derventa.ba/usluge/obrasci/",
  "status": "active",
  "note": "Oficijelna web stranica Opštine Derventa je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://opstina-brod.net/",
  "formsUrl": "https://opstina-brod.net/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Brod je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce i zahtjeve. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://vukosavlje.org/",
  "formsUrl": "https://vukosavlje.gov.ba/ba/index.php/vazni-dokumenti",
  "status": "active",
  "note": "Zvanična web stranica Opštine Vukosavlje je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://petrovo.ba/",
  "formsUrl": "https://opstinapetrovo.org/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Petrovo je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce i zahtjeve. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://opstinasamac.org/",
  "formsUrl": "https://eregistarsamac.com/%D0%",
  "status": "active",
  "note": "Zvanična web stranica Opštine Šamac je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://opstinapetrovo.org/",
  "formsUrl": "https://opstinapetrovo.org/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Petrovo je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce i zahtjeve. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://bijeljina.org/",
  "formsUrl": "https://bijeljina.org/lat/zahtjevi-i-obrasci.html",
  "status": "active",
  "note": "Zvanična web stranica Grada Bijeljina je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce i zahtjeve. Svi obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://ugljevik.rs.ba/",
  "formsUrl": "https://ugljevik.rs.ba/usluge/obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Ugljevik je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://lopare.rs.ba/",
  "formsUrl": "https://lopare.rs.ba/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Lopare je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce i zahtjeve. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://opstina-zvornik.org/",
  "formsUrl": "https://opstina-zvornik.org/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Zvornik je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://sekovici.org/",
  "formsUrl": "https://sekovici.org/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Šekovići je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce i zahtjeve. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://osmaci.org/",
  "formsUrl": "https://osmaci.org/obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Osmaci je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://opstinapale.org/",
  "formsUrl": "https://opstinapale.org/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Pale je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": "Trnovo (RS)",
  "website": "https://trnovo-rs.org/",
  "formsUrl": "https://trnovo-rs.org/obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Trnovo (RS) je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://istocnistarigrad.org/",
  "formsUrl": "https://istocnistarigrad.org/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Istočni Stari Grad je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Travnička regija",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://opcinatravnik.com.ba/",
  "formsUrl": "https://opcinatravnik.com.ba/ba/e-zahtjevi-online-zahtjevi",
  "status": "active",
  "note": "Obrasci – urbanistička saglasnost, lokacijska informacija, izdavanje uvjerenja",
  "region": "B&H TRAVNIČKA REGIJA"
 },
 {
  "name": "Travnička regija",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://opcina-bugojno.ba",
  "formsUrl": null,
  "status": "active",
  "note": "Obrasci – urbanizam, građevinske dozvole, matični uredi",
  "region": "B&H TRAVNIČKA REGIJA"
 },
 {
  "name": "Travnička regija",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://gvu.ba",
  "formsUrl": null,
  "status": "active",
  "note": "E-Matičar omogućava online podnošenje zahtjeva za izdavanje i dostavu izvoda i uvjerenja",
  "region": "B&H TRAVNIČKA REGIJA"
 },
 {
  "name": "Travnička regija",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://donji-vakuf.ba",
  "formsUrl": "https://donji-vakuf.ba",
  "status": "active",
  "note": "Obrasci – urbanističke saglasnosti, izdavanje uvjerenja",
  "region": "B&H TRAVNIČKA REGIJA"
 },
 {
  "name": "Travnička regija",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://ont.gov.ba",
  "formsUrl": "https://ont.gov.ba",
  "status": "active",
  "note": "Obrasci – zahtjevi za uvjerenja, urbanistička dokumentacija",
  "region": "B&H TRAVNIČKA REGIJA"
 },
 {
  "name": "Travnička regija",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://vitez.ba",
  "formsUrl": "https://vitez.ba",
  "status": "active",
  "note": "Obrasci – lokacijska informacija, urbanizam",
  "region": "B&H TRAVNIČKA REGIJA"
 },
 {
  "name": "Travnička regija",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://opcina-busovaca.com",
  "formsUrl": "https://opcina-busovaca.com",
  "status": "active",
  "note": "Obrasci – zahtjevi za uvjerenja, urbanizam",
  "region": "B&H TRAVNIČKA REGIJA"
 },
 {
  "name": "Travnička regija",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://opcina-jajce.ba",
  "formsUrl": "https://opcina-jajce.ba",
  "status": "active",
  "note": "Website ne sadrži obrasce; zahtjevi isključivo lično u službama",
  "region": "B&H TRAVNIČKA REGIJA"
 },
 {
  "name": "Travnička regija",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://opcina-kiseljak.org",
  "formsUrl": "https://opcina-kiseljak.org",
  "status": "active",
  "note": "Obrasci – urbanistička saglasnost, izdavanje uvjerenja",
  "region": "B&H TRAVNIČKA REGIJA"
 },
 {
  "name": "Travnička regija",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://kresevo.ba",
  "formsUrl": "https://kresevo.ba",
  "status": "active",
  "note": "Obrasci – izdavanje uvjerenja, urbanizam; dostava poštom s uračunatom poštarinom",
  "region": "B&H TRAVNIČKA REGIJA"
 },
 {
  "name": "Travnička regija",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://fojnica.ba",
  "formsUrl": "https://fojnica.ba",
  "status": "active",
  "note": "Obrasci – urbanističke saglasnosti, izdavanje uvjerenja",
  "region": "B&H TRAVNIČKA REGIJA"
 },
 {
  "name": "Travnička regija",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://sbk-ksb.gov.ba",
  "formsUrl": "https://sbk-ksb.gov.ba",
  "status": "active",
  "note": "Obrasci – zdravstveno osiguranje, refundacije, ortopedska pomagala",
  "region": "B&H TRAVNIČKA REGIJA"
 },
 {
  "name": "Travnička regija",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://zzo-ksbsbk.com.ba",
  "formsUrl": "https://zzo-ksbsbk.com.ba",
  "status": "active",
  "note": "Obrasci – prijava na zdravstveno osiguranje, refundacije, ortopedska pomagala",
  "region": "B&H TRAVNIČKA REGIJA"
 },
 {
  "name": "Zenica",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://zenica.ba/",
  "formsUrl": "https://zenica.ba/e-registar-administrativnih-postupaka/",
  "status": "active",
  "note": "PDF formular E-registar Administrativnih postupaka i E-Servis, razni administrativni formulari i obrasci.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Usora",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.usora.com/",
  "formsUrl": "https://www.usora.com/dokumenti-i-obrasci/",
  "status": "active",
  "note": "Prepoznati zvanični URL za općinu Usora. Potrebna provjera dostupnosti specifičnih obrazaca.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Zenica",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.zzozedo.ba/",
  "formsUrl": "https://www.zzozedo.ba/index.php/layout/class-layout/obrasci",
  "status": "active",
  "note": "PDF formular ZZO ZDK – pokriva najčešće zdravstvene zahtjeve i administrativne forme.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Doboj-Jug",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.zzozedo.ba/",
  "formsUrl": "https://www.zzozedo.ba/index.php/layout/class-layout/obrasci",
  "status": "active",
  "note": "PDF formular ZZO ZDK – pokriva najčešće zdravstvene zahtjeve i administrativne forme.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Kakanj",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.zzozedo.ba/",
  "formsUrl": "https://www.zzozedo.ba/index.php/layout/class-layout/obrasci",
  "status": "active",
  "note": "PDF formular ZZO ZDK - Zahtjev za refundiranje troškova liječenja van ZDK.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Maglaj",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.zzozedo.ba/",
  "formsUrl": "https://www.zzozedo.ba/index.php/layout/class-layout/obrasci",
  "status": "active",
  "note": "PDF formular ZZO ZDK - Zahtjev za odobravanje ortopedskih pomagala.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Žepče",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.zzozedo.ba/",
  "formsUrl": "https://www.zzozedo.ba/index.php/layout/class-layout/obrasci",
  "status": "active",
  "note": "PDF formular ZZO ZDK - Zahtjev za izdavanje uvjerenja.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Tešanj",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.zzozedo.ba/",
  "formsUrl": "https://www.zzozedo.ba/index.php/layout/class-layout/obrasci",
  "status": "active",
  "note": "PDF formular ZZO ZDK – pokriva najčešće zdravstvene zahtjeve i administrativne forme.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Olovo",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.olovo.gov.ba/",
  "formsUrl": "https://www.olovo.gov.ba/dokumenti/",
  "status": "active",
  "note": "Prepoznati zvanični URL za općinu Olovo. Bit će potrebna dodatna istraživanja za specifične obrasce na portalu.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Zavidovići",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.zavidovici.ba/",
  "formsUrl": "https://www.zavidovici.ba/index.php/obrasci-zahtjevi",
  "status": "active",
  "note": "Prepoznati zvanični URL za općinu Zavidovići sa dostupnim obrascima/zahtjevima.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Breza",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://breza.gov.ba/",
  "formsUrl": "https://breza.gov.ba/kategorija/dokumenti/",
  "status": "active",
  "note": "Prepoznati zvanični URL za općinu Breza sa dostupnim dokumentima.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Visoko",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.visoko.gov.ba/",
  "formsUrl": "https://www.visoko.gov.ba/kategorija/obrasci/",
  "status": "active",
  "note": "Prepoznati zvanični URL za grad Visoko sa dostupnim obrascima.",
  "region": "B&H ZENIČKA REGIJA"
 }
];
