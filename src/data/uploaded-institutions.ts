// Generisano iz korisničke baze "#B&H KORISNI URL" — ne uređivati ručno.
export interface UploadedInstitution { name: string; entity: string | null; canton: string | null; website?: string; formsUrl?: string | null; status: 'active' | 'counter' | 'inactive'; note: string; region: string }
export const uploadedInstitutions: UploadedInstitution[] = [
 {
  "name": "Goražde",
  "entity": "FBiH",
  "canton": "Bosansko-podrinjski kanton (BPK)",
  "website": "https://gorazde.ba/",
  "formsUrl": "https://gorazde.ba/sluzba-za-finansije-trezor-i-privredu-elektronski-obrasci/",
  "status": "active",
  "note": "Obrasci – urbanistička saglasnost, lokacijska informacija, izdavanje izvoda i uvjerenja",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Pale-Prača",
  "entity": "FBiH",
  "canton": "Bosansko-podrinjski kanton (BPK)",
  "website": "http://praca.ba/",
  "formsUrl": "http://praca.ba/",
  "status": "active",
  "note": "Zahtjevi i obrasci općinske službe Pale-Prača — stari HTTPS domen blokira upite, koristi se HTTP verziju",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Foča-Ustikolina",
  "entity": "FBiH",
  "canton": "Bosansko-podrinjski kanton (BPK)",
  "website": "https://foca-ustikolina.ba",
  "formsUrl": "https://foca-ustikolina.ba/wp-content/uploads/2022/10/ZAHTJEV_urbanistickaSaglasnost.pdf",
  "status": "active",
  "note": "Direktni PDF obrasci za urbanizam, vodne saglasnosti, javne površine i druge upravne postupke",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Ministarstvo za socijalnu politiku, zdravstvo BPK",
  "entity": "FBiH",
  "canton": "Bosansko-podrinjski kanton (BPK)",
  
  
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
  
  "status": "active",
  "note": "Zahtjev za izvod iz matične knjige rođenih/vjenčanih/umrlih (e-Uprava)",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Centar Sarajevo",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://www.centar.ba/",
  "formsUrl": "https://www.centar.ba/e-uprava/elektronski-formulari",
  "status": "active",
  "note": "E-Matičar omogućava online podnošenje zahtjeva i plaćanje karticom; elektronski formulari dostupni su na službenoj stranici Općine Centar Sarajevo.",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Općina Ilidža",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://www.opcinailidza.ba/",
  "formsUrl": "https://www.opcinailidza.ba/e-uprava",
  "status": "active",
  "note": "Zvanična web-stranica Općine Ilidža — stari obrazci link vratio HTTP 500, koristi se domaća stranica i e-uprava",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Novi Grad Sarajevo",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://novigradsarajevo.ba",
  
  "status": "active",
  "note": "Zahtjev za jednokratnu novčanu pomoć / Prijemni obrasci",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Novo Sarajevo",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://novosarajevo.ba",
  
  "status": "active",
  "note": "Zahtjev za ovjeru potpisa, rukopisa i prepisa",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Vogošća",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
   
  "status": "counter",
  "note": "Nema trenutno dostupnih online obrazaca; službenu web-stranicu treba potvrditi s Općinom.",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Hadžići",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://hadzici.ba",
 "status": "counter",
  "note": "Službena web-stranica je dostupna, ali e-Uprava obrasci trenutno nisu dostupni online.",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Trnovo (FBiH)",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://trnovo.ba",
  
  "status": "active",
  "note": "Zahtjev za odobrenje građenja i priključak",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Ilijaš",
  "entity": "FBiH",
  "canton": "Kanton Sarajevo (KS)",
  "website": "https://ilijas.ba",
  "formsUrl": "https://ilijas.ba/index.php/e-uprava",
  "status": "active",
  "note": "e-Uprava, eCitizen i eRegistar Općine Ilijaš.",
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
  "formsUrl": "https://istocnailidza.net/?page_id=255",
  "status": "active",
  "note": "Službeni obrasci Opštine Istočna Ilidža: stranice 255, 420, 307 i 222.",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Istočno Novo Sarajevo",
  "entity": "RS",
  "canton": "Istočno Sarajevo regija",
  "website": "https://opstinains.net/",
  
  "status": "active",
  "note": "Zahtjev za izdavanje lokacijskih uslova",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Pale (RS)",
  "entity": "RS",
  "canton": "Istočno Sarajevo regija",
  "website": "https://pale.rs.ba/",
  
  "status": "active",
  "note": "Obrazac za registraciju preduzetnika i promjenu podataka",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Trnovo (RS)",
  "entity": "RS",
  "canton": "Istočno Sarajevo regija",
  "website": "https://trnovo-rs.com/",
  
  "status": "active",
  "note": "Zahtjev za jednokratne pomoći i matični uredi",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Istočni Stari Grad",
  "entity": "RS",
  "canton": "Istočno Sarajevo regija",
  "website": "https://opstinaisg.net/",
  
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
  "formsUrl": "https://foca.rs.ba/",
  "status": "active",
  "note": "Ažurirana službena stranica i službeni dokumenti Opštine Foča.",
  "region": "Regija Foča / Drina"
},
 {
  "name": "Opština Čajniče",
  "entity": "RS",
  "canton": "Regija Foča / Drina",
  "website": "https://opstinacajnice.rs.ba/",
  "formsUrl": "https://opstinacajnice.rs.ba/%d0%be%d0%b1%d1%80%d0%b0%d1%81%d1%86%d0%b8-%d0%be%d0%bf%d1%88%d1%82%d0%b8%d0%bd%d0%b0-%d1%87%d0%b0%d1%98%d0%bd%d0%b8%d1%87%d0%b5/",
  "status": "active",
  "note": "Zahtjevi i obrasci za opštu upravu, privredu, društvene djelatnosti i prostorno-komunalne poslove.",
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
  
  "status": "active",
  "note": "Zahtjevi Odjeljenja za privredu i opštu upravu",
  "region": "Regija Foča / Drina"
},
 {
  "name": "Opština Han Pijesak",
  "entity": "RS",
  "canton": "Sarajevsko-Romanijska",
  "website": "https://hanpijesak.org/",
  "formsUrl": "https://hanpijesak.org/zahtjevi-i-obrasci/",
  "status": "active",
  "note": "Zahtjevi prijemne kancelarije i opšte uprave",
  "region": "Sarajevsko-Romanijska"
},
 {
  "name": "Opština Rogatica",
  "entity": "RS",
  "canton": "Sarajevsko-Romanijska",
  "status": "counter",
  "note": "Online obrasci i službena web-stranica trenutno nisu dostupni u provjeri; kontaktirati Opštinu Rogatica.",
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
  
  
  "status": "active",
  "note": "Dostupni obrasci: građevinske dozvole, urbanističke saglasnosti, matični uredi.",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Dostupni obrasci: urbanizam, prijava prebivališta, uvjerenja.",
  "entity": "RS",
  "canton": "Opština Trnovo (RS)",
  
  
  "status": "active",
  "note": "Dostupni obrasci: urbanizam, prijava prebivališta, uvjerenja.",
  "region": "SARAJEVSKA REGIJA"
 },
 {
  "name": "Grad",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  "website": "https://www.mostar.ba",
  
  "status": "active",
  "note": "Obrasci – urbanizam, uvjerenja, matični uredi, socijalna zaštita",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Općina Čapljina",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  "website": "https://capljina.ba/",
  "formsUrl": "https://capljina.ba/administrativni-postupci/",
  "status": "active",
  "note": "e-Registar Grada Čapljine sadrži administrativne postupke i pripadajuće obrasce.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Općina Čitluk",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  "website": "https://citluk.ba/",
  "formsUrl": "https://citluk.ba/zahtjevi/",
  "status": "active",
  "note": "Službena stranica s 83 zahtjeva i obrasca raspoređena u 11 kategorija.",
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
  "formsUrl": "https://neum.ba/eDokumenti/sluzba-za-stambeno-komunalne-poslove-izgradnju-i-razvoj/",
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
  
  
  "status": "active",
  "note": "Obrasci – zdravstveno osiguranje, refundacija putnih troškova, ortopedska pomagala",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Ministarstvo obrazovanja HNK",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  
  
  "status": "active",
  "note": "Obrasci – stipendije, nostrifikacija, prijava djece u školu",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Ministarstvo prostornog uređenja HNK",
  "entity": "FBiH",
  "canton": "Hercegovačko-neretvanski kanton (HNK)",
  
  
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
  "name": "Drvar",
  "entity": "FBiH",
  "canton": "Kanton 10 (Livanjski kanton)",
  "website": "https://www.opstinadrvar.net/",
  "formsUrl": "http://www.opstinadrvar.net/wp-content/uploads/2021/06/Zahtjev-ka-opstinskom-nacelniku.pdf",
  "status": "active",
  "note": "",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Drvar",
  "entity": "FBiH",
  "canton": "Kanton 10 (Livanjski kanton)",
  "website": "https://www.opstinadrvar.net/",
  "formsUrl": "http://www.opstinadrvar.net/wp-content/uploads/2021/06/Zahtjev-ka-opstinskom-nacelniku.pdf",
  "status": "active",
  "note": "Dostupni su PDF obrasci za opću upravu, socijalnu zaštitu, prostorno uređenje i imovinsko-pravne poslove.",
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
  
  "status": "active",
  "note": "Ministarstvo zdravstva, rada i socijalne skrbi K10",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Zavod zdravstvenog osiguranja K10",
  "entity": null,
  "canton": "Kanton 10 (Livanjski kanton)",
  "website": "https://www.zzohbz.ba/",
  "status": "counter",
  "note": "Službena stranica je dostupna, ali stranica s tiskanicama trenutno vraća grešku.",
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
  
  "status": "active",
  "note": "Obrasci – urbanističke saglasnosti, uvjerenja, matični uredi. Jedna od 4 lokalne jedinice ZHK sa online obrascima.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Grude",
  "entity": "FBiH",
  "canton": "Zapadnohercegovački kanton (ZHK)",
  "website": "https://www.grude.ba/",
  "formsUrl": "https://www.grude.ba/opcinska-uprava/opcinske-sluzbe/sluzba-za-opcu-upravu-branitelje-iz-domovinskog-rata-i-drustvene-djelatnosti/?search=&from=01.01.2000&to=31.12.2100#zahtjevi",
  "status": "active",
  "note": "Službena stranica s 23 zahtjeva i obrasca za matične evidencije, socijalnu i boračku zaštitu, obrazovanje i pristup informacijama.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Posušje",
  "entity": "FBiH",
  "canton": "Zapadnohercegovački kanton (ZHK)",
  "website": "https://www.opcina-posusje.ba/",
  
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
  
  
  "status": "active",
  "note": "Ministarstvo obrazovanja, znanosti, kulture i športa ZHK",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Ministarstvo prostornog uređenja, graditeljstva i zaštite okoliša ZHK",
  "entity": "FBiH",
  "canton": "Zapadnohercegovački kanton (ZHK)",
  "website": "https://www.vladazzh.gov.ba/",
  "formsUrl": "https://www.vladazzh.gov.ba/Dokumenti.aspx",
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
  "name": "Grad Trebinje",
  "entity": "RS",
  "canton": "Trebinje regija",
  "website": "https://trebinje.rs.ba/",
  
  "status": "active",
  "note": "Zvanična web stranica Grada Trebinja je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Bileća",
  "entity": "RS",
  "canton": null,
  "website": "https://www.opstinabileca.ba/",
  "formsUrl": "https://www.opstinabileca.ba/obrazci-gradjani/",
  "status": "active",
  "note": "Obrasci za građane, konkursi i kontakt podaci dostupni su na službenoj stranici Opštine Bileća.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Gacko",
  "entity": "RS",
  "canton": "Gacko regija",
  "website": "https://gacko-rs.info/",
  "formsUrl": "https://gacko-rs.info/obrasci/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Gacko je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Nevesinje",
  "entity": "RS",
  "canton": "Trebinje regija",
  "website": "https://opstinanevesinje.rs.ba/",
  
  "status": "active",
  "note": "Zvanična web stranica Opštine Nevesinje je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Istočni Mostar",
  "entity": "RS",
  "canton": null,
  "website": "",
  "formsUrl": null,
  "status": "counter",
  "note": "Prema ažuriranju, Opština Istočni Mostar nema službenu web-stranicu.",
  "region": "B&H MOSTARSKA REGIJA"
 },
 {
  "name": "Berkovići",
  "entity": null,
  "canton": null,
  "website": "https://opstinaberkovici.com/home/",
  "formsUrl": "https://opstinaberkovici.com/home/",
  "status": "active",
  "note": "Opština Berkovići trenutno ne nudi obrasce u digitalnom formatu. Zahtjevi i formulari preuzimaju se lično u Šalter sali / Pisarnici opštine.",
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
  "website": "https://gradbosanskakrupa.ba/",
  "formsUrl": "https://www.ecitizen.ba/bosanska_krupa/eServices",
  "status": "active",
  "note": "Grad Bosanska Krupa podržava online popunjavanje i podnošenje formulara direktno putem eCitizen platforme.",
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
  "website": "https://opcinabuzim.ba/",
  "formsUrl": null,
  "status": "active",
  "note": "Općina Bužim ne nudi online obrasce i formulare; upute i informacije dostupne su na stranicama nadležnih službi.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Cazin",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://gradcazin.gov.ba/",
  "formsUrl": "https://gradcazin.gov.ba/dokumenti",
  "status": "active",
  "note": "Službena arhiva dokumenata sadrži obrasce, javne nabavke i druge objave.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Ključ",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://opcina-kljuc.ba/",
  "formsUrl": "https://www.ecitizen.ba/kljuc/home",
  "status": "active",
  "note": "Dokumenti i elektronske usluge dostupni su putem eCitizen portala Općine Ključ.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Sanski Most",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://zzousk.ba/",
  
  "status": "active",
  "note": "Obrasci – izdavanje izvoda iz matičnih knjiga, urbanizam, lokacijska informacija. Većina web portala u USK nema sigurnu vezu. Sanski Most ima digitalizovane obrasce, ali je potrebno prilagoditi cookies.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Velika Kladuša",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://zzousk.ba/",
  
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
  
  "status": "active",
  "note": "Ministarstvo obrazovanja, nauke, kulture i sporta USK",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Ministarstvo za građenje, prostorno uređenje i zaštitu okoliša USK",
  "entity": "FBiH",
  "canton": "Unsko-sanski kanton (USK)",
  "website": "https://zzousk.ba/",
  
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
  "name": "Gradiška",
  "entity": "RS",
  "canton": "Banjalučka regija",
  "website": "https://www.gradgradiska.com/",
  "formsUrl": "https://www.gradgradiska.com/zahtjev-za-prijem-kod-gradonacelnika/",
  "status": "active",
  "note": "Službena stranica i ažurirani linkovi za prijem kod gradonačelnika te izvode iz matičnih knjiga.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Srbac",
  "entity": null,
  "canton": null,
  "website": "https://gradlaktasi.com/",
  "formsUrl": "https://gradlaktasi.com/",
  "status": "active",
  "note": "Zvanična web stranica Opštine Laktaši je aktivna i stabilna. Direktni linkovi za obrasce i zahtjeve vode na eCitizen platformu, što je uobičajena praksa i osigurava stabilan pristup. Nije potrebna posebna tražilica.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://gradprnjavor.com/novi-sajt-opstine-prnjavor/",
  
  "status": "active",
  "note": "Zvanična web stranica Opštine Prnjavor je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce i zahtjeve. Lako je pronaći potrebne dokumente. Nije potrebna posebna tražilica.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "formsUrl": "https://ecitizen.ba/srbac/eServices",
  "status": "active",
  "note": "Službena web-stranica nije potvrđena; obrasci su dostupni putem eCitizen platforme.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://www.ecitizen.ba/celinac/eServices",
  "formsUrl": "https://www.ecitizen.ba/tuzla/eServices/eServicesSubcategory/2",
  "status": "active",
  "note": "https://www.opstina-celinac.com/ (Zvanična web stranica Opštine Čelinac)",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Kotor Varoš",
  "entity": "RS",
  "canton": "Banjalučka regija",
  "website": "https://opstinakotorvaros.com/",
  "formsUrl": "https://opstinakotorvaros.com/zahtjevi/",
  "status": "active",
  "note": "Zahtjevi i obrasci dostupni su na službenoj web-stranici Opštine Kotor Varoš.",
  "region": "B&H BOSANSKA KRAJINA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  
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
  "name": "Šipovo",
  "entity": null,
  "canton": null,
  
  "formsUrl": null,
  "status": "counter",
  "note": "Dostupnost online obrazaca i službene web-stranice treba potvrditi s Opštinom Šipovo.",
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
  "formsUrl": "https://www.euprava.opstina-novigrad.com/drustvene-djelatnosti/",
  "status": "active",
  "note": "eUprava Opštine Novi Grad: društvene djelatnosti, eMatičar, eDijaspora, ePitanje, eStatus (provjera statusa zahtjeva) i brisanje zahtjeva — https://www.euprava.opstina-novigrad.com/drustvene-djelatnosti/ , https://www.euprava.opstina-novigrad.com/ematicar/ , https://www.euprava.opstina-novigrad.com/edijaspora/ , https://www.euprava.opstina-novigrad.com/epitanje/ , https://www.euprava.opstina-novigrad.com/estatus/ , https://www.euprava.opstina-novigrad.com/brisanje-zahtjeva/",
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
  
  "status": "active",
  "note": "Obrasci – urbanističke saglasnosti, izdavanje uvjerenja, matični uredi.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Domaljevac-Šamac",
  "entity": "FBiH",
  "canton": "Posavski kanton (PK)",
  "website": "https://domaljevac.ba/",
  "formsUrl": "https://domaljevac.ba/wp-content/uploads/2025/02/zahtjev-za-upravni-postupak.pdf",
  "status": "active",
  "note": "Direktni obrasci dostupni na službenoj stranici za upravne postupke, poljoprivredu i socijalnu zaštitu.",
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
  "note": "eCitizen usluge: https://www.ecitizen.ba/tuzla/eServices/eServicesSubcategory/2, /6, /26, /3, /7, /63 i /4.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Kalesija",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://kalesija.ba/",
  "formsUrl": "https://kalesija.ba/usluge/",
  "status": "active",
  "note": "Službena stranica s uslugama i obrascima; dostupno 10 obrazaca, uključujući matične i poljoprivredne obrasce.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Banovići",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://banovici.gov.ba/",
  "formsUrl": "https://banovici.gov.ba/zahtjevi/",
  "status": "active",
  "note": "Obrasci – zahtjev za urbanističku saglasnost, lokacijsku informaciju, uvjerenja.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Čelić",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://opcinacelic.ba/",
  "formsUrl": null,
  "status": "counter",
  "note": "Općina Čelić nema obrasce ni formulare za građane na web-stranici; građani ih mogu zatražiti u Općini.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Doboj Istok",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://opcinadobojistok.ba/",
  "formsUrl": "https://opcinadobojistok.ba/formulari-sluzbe-za-poduzetnistvo/",
  "status": "active",
  "note": "Elektronske usluge i brojni DOC obrasci za upravne postupke, poduzetništvo, poljoprivredu, saobraćaj i vodoprivredu.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Gračanica",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://gracanica.gov.ba/",
  "formsUrl": "https://gracanica.gov.ba/dokumenti/e-obrasci/",
  "status": "active",
  "note": "Službeni e-obrasci i E-Matičar: https://gracanica.gov.ba/sg-1-obrazac/, https://ematicar.gracanica.gov.ba/registracija/ i https://ematicar.gracanica.gov.ba/prijava/.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Gradačac",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://gradacac.ba/",
  "formsUrl": "https://esalter.gradacac.ba/",
  "status": "active",
  "note": "eŠalter, eStipendije, eCitizen i pristup podacima iz CIPS baze.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Kladanj",
  "entity": "FBiH",
  "canton": "Tuzlanski kanton (TK)",
  "website": "https://kladanj.ba/",
  "formsUrl": null,
  "status": "counter",
  "note": "Digitalni obrasci trenutno nisu dostupni na e-Servisu. Matični ured: rodni/vjenčani/umrli list i uvjerenje o državljanstvu podnose se lično u Šalter sali ili poštom (dijaspora). Poticaji, stipendije i javni pozivi u sekciji Zvanična obavještenja i konkursi; ugovori u sekciji Izvršenje ugovora. Predaja: protokol, Šalter sala (prizemlje), Kladanjske brigade br. 2, 75280 Kladanj, uz dokaz o uplati općinske takse ako je propisana.",
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
  
  
  "status": "active",
  "note": "",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Brčko distrikt",
  "entity": "BD",
  "canton": "Obrasci – zdravstveno osiguranje, refundacija, ortopedska pomagala. Brčko distrikt objedinjuje funkcije općine, grada i kantona. Svi obrasci su zakonito dostupni privatnim firmama za podršku građanima i strancima.",
  
  
  "status": "active",
  "note": "Odjeljenje za zdravstvo i ostale usluge Brčko",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Brčko distrikt",
  "entity": "BD",
  "canton": "Obrasci – stipendije, upis djece u školu, nostrifikacija. Brčko distrikt objedinjuje funkcije općine, grada i kantona. Svi obrasci su zakonito dostupni privatnim firmama za podršku građanima i strancima.",
  
  
  "status": "active",
  "note": "",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Brčko distrikt",
  "entity": "BD",
  "canton": "Obrasci – lokacijska informacija, urbanistička saglasnost, građevinske dozvole. Brčko distrikt objedinjuje funkcije općine, grada i kantona. Svi obrasci su zakonito dostupni privatnim firmama za podršku građanima i strancima.",
  
  
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
  "name": "Šamac",
  "entity": "RS",
  "canton": "Doboj regija",
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
  "formsUrl": "https://opstina-brod.net/%D0%B2%D0%B0%D0%B6%D0%BD%D0%B8-%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B8/#lat",
  "status": "active",
  "note": "Važni dokumenti Opštine Brod uključuju obrasce, uputstva i zahtjeve.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  
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
  
  "status": "active",
  "note": "Zvanična web stranica Opštine Petrovo je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce i zahtjeve. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Šamac",
  "entity": "RS",
  "canton": "Doboj regija",
  "website": "https://opstinasamac.org/",
  "formsUrl": "https://eregistarsamac.com/%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%B8-%D0%BF%D0%BE%D1%81%D1%82%D1%83%D0%BF%D1%86%D0%B8/",
  "status": "active",
  "note": "Elektronski registar administrativnih postupaka, zahtjeva za inspekcijski nadzor i uvjerenja.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  
  
  "status": "active",
  "note": "Zvanična web stranica Opštine Petrovo je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce i zahtjeve. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Grad Bijeljina",
  "entity": "RS",
  "canton": "Bijeljina regija",
  "status": "active",
  "note": "Dostupne stranice za matične izvode iz matičnih knjiga vjenčanih i umrlih te uvjerenja.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  
  
  "status": "active",
  "note": "Zvanična web stranica Opštine Ugljevik je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Lopare",
  "entity": "RS",
  "canton": null,
  "website": "https://opstinalopare.com/",
  "formsUrl": null,
  "status": "active",
  "note": "Službena web-stranica Opštine Lopare; obrasci su navedeni kao zasebni dokumenti u registru BH PapirFinder.",
  "region": "BIJELJINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://opstina-zvornik.org/",
  
  "status": "active",
  "note": "Zvanična web stranica Opštine Zvornik je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://sekovici.org/",
  
  "status": "active",
  "note": "Zvanična web stranica Opštine Šekovići je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce i zahtjeve. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  "website": "https://osmaci.org/",
  
  "status": "active",
  "note": "Zvanična web stranica Opštine Osmaci je aktivna i stabilna, sa jasno definisanim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni za upotrebu. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  
  
  "status": "active",
  "note": "Zvanična web stranica Opštine Pale je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": "Trnovo (RS)",
  
  
  "status": "active",
  "note": "Zvanična web stranica Opštine Trnovo (RS) je aktivna i stabilna, sa jasno označenim odjeljkom za obrasce. Obrasci su zakonski dozvoljeni. Nije potrebna posebna tražilica.",
  "region": "B&H POSAVINA REGIJA"
 },
 {
  "name": "Republika Srpska",
  "entity": null,
  "canton": null,
  
  
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
  "name": "Bugojno",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://opcina-bugojno.ba/",
  "formsUrl": "https://opcina-bugojno.ba/e-formulari/",
  "status": "active",
  "note": "Službena stranica i e-formulari za urbanizam, građevinske dozvole i matične urede.",
  "region": "B&H TRAVNIČKA REGIJA"
 },
 {
  "name": "Gornji Vakuf-Uskoplje",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://www.gvu.ba/",
  "formsUrl": "https://www.gvu.ba/e-maticar",
  "status": "active",
  "note": "E-Matičar omogućava online podnošenje zahtjeva za izdavanje i dostavu izvoda i uvjerenja iz matičnih knjiga; dostupni su i Registar dijaspore i eCitizen.",
  "region": "B&H TRAVNIČKA REGIJA"
 },
 {
  "name": "Donji Vakuf",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://donji-vakuf.ba/",
  "formsUrl": "https://donji-vakuf.ba/wp-content/uploads/2013/03/Formularzaprijemkodnacelnika.pdf",
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
  "website": "https://opcina-busovaca.com/",
  "formsUrl": "https://opcina-busovaca.com/dokumenti/",
  "status": "active",
  "note": "Javni dokumenti, planovi i obrasci dostupni su na zvaničnoj web stranici Općine Busovača.",
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
  "name": "Fojnica",
  "entity": "FBiH",
  "canton": "Srednjobosanski kanton (SBK)",
  "website": "https://www.fojnica.ba/v3/",
  "formsUrl": "https://www.fojnica.ba/v3/e-uprava/sluzba-za-opcu-upravu-obrasci",
  "status": "active",
  "note": "Službene stranice e-uprave i direktni obrasci za opću upravu, civilnu zaštitu, socijalnu i zdravstvenu zaštitu.",
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
  "note": "E-registar administrativnih postupaka, E-Matičar i E-servisi Grada Zenice: https://zenica.ba/e-registar-administrativnih-postupaka/ , https://zenica.ba/e-maticar/ , https://zenica.ba/#e-servisi",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Usora",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.usora.com/",
  
  "status": "active",
  "note": "Prepoznati zvanični URL za općinu Usora. Potrebna provjera dostupnosti specifičnih obrazaca.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Zenica",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.zzozedo.ba/",
  
  "status": "active",
  "note": "PDF formular ZZO ZDK – pokriva najčešće zdravstvene zahtjeve i administrativne forme.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Doboj-Jug",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.zzozedo.ba/",
  
  "status": "active",
  "note": "PDF formular ZZO ZDK – pokriva najčešće zdravstvene zahtjeve i administrativne forme.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Kakanj",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.zzozedo.ba/",
  
  "status": "active",
  "note": "PDF formular ZZO ZDK - Zahtjev za refundiranje troškova liječenja van ZDK.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Maglaj",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.zzozedo.ba/",
  
  "status": "active",
  "note": "PDF formular ZZO ZDK - Zahtjev za odobravanje ortopedskih pomagala.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Žepče",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.zzozedo.ba/",
  
  "status": "active",
  "note": "PDF formular ZZO ZDK - Zahtjev za izdavanje uvjerenja.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Tešanj",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.zzozedo.ba/",
  
  "status": "active",
  "note": "PDF formular ZZO ZDK – pokriva najčešće zdravstvene zahtjeve i administrativne forme.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Olovo",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.olovo.gov.ba/",
  
  "status": "active",
  "note": "Prepoznati zvanični URL za općinu Olovo. Bit će potrebna dodatna istraživanja za specifične obrasce na portalu.",
  "region": "B&H ZENIČKA REGIJA"
 },
 {
  "name": "Zavidovići",
  "entity": "FBiH",
  "canton": "Zeničko-dobojski kanton (ZDK)",
  "website": "https://www.zavidovici.ba/",
  
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
  
  "status": "active",
  "note": "Prepoznati zvanični URL za grad Visoko sa dostupnim obrascima.",
  "region": "B&H ZENIČKA REGIJA"
 }
];
