// ============================================================
// Expanded Institutions Database for BiH
// Covers: Entity/State, Brčko Distrikt, Agencies, Business Registration
// ============================================================

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  level: 'state' | 'entity' | 'canton' | 'municipality' | 'district' | 'agency';
  category: string;
  description: string;
  website?: string;
  keywords: string[];
  forms: InstitutionForm[];
}

export interface InstitutionForm {
  id: string;
  name: string;
  description: string;
  category: string;
  fileUrl?: string;
  keywords: string[];
}

// ============================================================
// STATE-LEVEL INSTITUTIONS
// ============================================================

export const stateInstitutions: Institution[] = [
  {
    id: 'iddeea',
    name: 'Agencija za identifikacijske dokumente, evidenciju i razmjenu podataka BiH',
    shortName: 'IDDEEA',
    level: 'state',
    category: 'Identifikacijski dokumenti',
    description: 'Izdavanje ličnih karata, pasoša, vozačkih dozvola i CIPS evidencija',
    website: 'https://www.iddeea.gov.ba',
    keywords: ['CIPS', 'lična karta', 'osobna karta', 'pasoš', 'putovnica', 'vozačka dozvola', 'prebivalište', 'boravište', 'IDDEEA'],
    forms: [
      { id: 'iddeea-1', name: 'Zahtjev za izdavanje lične karte', description: 'Obrazac za prvu ličnu kartu ili zamjenu', category: 'Lični dokumenti', keywords: ['lična karta', 'osobna iskaznica', 'ID'] },
      { id: 'iddeea-2', name: 'Zahtjev za izdavanje pasoša', description: 'Obrazac za izdavanje putne isprave', category: 'Putne isprave', keywords: ['pasoš', 'putovnica', 'putovanje'] },
      { id: 'iddeea-3', name: 'Zahtjev za prijavu prebivališta', description: 'Prijava/odjava prebivališta u CIPS sistemu', category: 'Prebivalište', keywords: ['prebivalište', 'CIPS', 'adresa', 'prijava'] },
      { id: 'iddeea-4', name: 'Zahtjev za izdavanje vozačke dozvole', description: 'Obrazac za novu ili zamjenu vozačke dozvole', category: 'Vozačka dozvola', keywords: ['vozačka', 'dozvola', 'auto'] },
    ],
  },
  {
    id: 'uio-bih',
    name: 'Uprava za indirektno oporezivanje BiH',
    shortName: 'UIO BiH',
    level: 'state',
    category: 'Porezi i carina',
    description: 'PDV, carine, akcize i indirektni porezi na državnom nivou',
    website: 'https://www.uino.gov.ba',
    keywords: ['UIO', 'PDV', 'carina', 'akcize', 'indirektni porez', 'uvoz', 'izvoz', 'carinska prijava'],
    forms: [
      { id: 'uio-1', name: 'PDV prijava (mjesečna)', description: 'Mjesečna prijava poreza na dodanu vrijednost', category: 'PDV', keywords: ['PDV', 'porez', 'mjesečna prijava'] },
      { id: 'uio-2', name: 'Zahtjev za registraciju PDV obveznika', description: 'Registracija u sistem PDV-a', category: 'PDV', keywords: ['PDV registracija', 'obveznik'] },
      { id: 'uio-3', name: 'Carinska deklaracija', description: 'Obrazac za uvoz/izvoz robe', category: 'Carina', keywords: ['carina', 'uvoz', 'izvoz', 'deklaracija'] },
      { id: 'uio-4', name: 'Zahtjev za povrat PDV-a', description: 'Povrat preplaćenog PDV-a', category: 'PDV', keywords: ['povrat', 'PDV', 'refundacija'] },
    ],
  },
  {
    id: 'mcp-bih',
    name: 'Ministarstvo civilnih poslova BiH',
    shortName: 'MCP BiH',
    level: 'state',
    category: 'Državljanstvo i diplome',
    description: 'Državljanstvo BiH, nostrifikacija diploma, matične knjige',
    website: 'https://www.mcp.gov.ba',
    keywords: ['državljanstvo', 'MCP', 'nostrifikacija', 'diploma', 'apostille', 'matične knjige', 'dijaspora'],
    forms: [
      { id: 'mcp-1', name: 'Zahtjev za sticanje državljanstva BiH', description: 'Obrazac za sticanje/vraćanje državljanstva', category: 'Državljanstvo', keywords: ['državljanstvo', 'sticanje', 'naturalizacija'] },
      { id: 'mcp-2', name: 'Zahtjev za uvjerenje o državljanstvu', description: 'Izdavanje uvjerenja o državljanstvu BiH', category: 'Državljanstvo', keywords: ['uvjerenje', 'državljanstvo', 'potvrda'] },
      { id: 'mcp-3', name: 'Zahtjev za nostrifikaciju diplome', description: 'Priznavanje inostrane diplome u BiH', category: 'Obrazovanje', keywords: ['nostrifikacija', 'diploma', 'priznavanje', 'inostrana'] },
      { id: 'mcp-4', name: 'Zahtjev za apostille', description: 'Ovjera dokumenata za upotrebu u inostranstvu', category: 'Ovjere', keywords: ['apostille', 'ovjera', 'inostranstvo', 'Haška konvencija'] },
    ],
  },
  {
    id: 'sps-bih',
    name: 'Služba za poslove sa strancima BiH',
    shortName: 'SPS BiH',
    level: 'state',
    category: 'Stranci i azil',
    description: 'Boravišne i radne dozvole za strane državljane, azil',
    website: 'https://www.sps.gov.ba',
    keywords: ['stranci', 'boravišna dozvola', 'radna dozvola', 'azil', 'viza', 'privremeni boravak', 'stalni boravak'],
    forms: [
      { id: 'sps-1', name: 'Zahtjev za privremeni boravak', description: 'Odobrenje privremenog boravka za strance', category: 'Boravak', keywords: ['privremeni boravak', 'stranac', 'dozvola'] },
      { id: 'sps-2', name: 'Zahtjev za radnu dozvolu', description: 'Dozvola za zapošljavanje stranih državljana', category: 'Rad', keywords: ['radna dozvola', 'zapošljavanje', 'stranac'] },
      { id: 'sps-3', name: 'Zahtjev za stalni boravak', description: 'Odobrenje stalnog boravka u BiH', category: 'Boravak', keywords: ['stalni boravak', 'stranac', 'trajno'] },
      { id: 'sps-4', name: 'Zahtjev za azil', description: 'Podnošenje zahtjeva za međunarodnu zaštitu', category: 'Azil', keywords: ['azil', 'izbjeglica', 'zaštita', 'međunarodna'] },
    ],
  },
];

// ============================================================
// ENTITY-LEVEL INSTITUTIONS (FBiH / RS)
// ============================================================

export const entityInstitutions: Institution[] = [
  {
    id: 'pufbih',
    name: 'Porezna uprava Federacije BiH',
    shortName: 'PUFBiH',
    level: 'entity',
    category: 'Porezi',
    description: 'Direktni porezi, doprinosi, porezne prijave u FBiH',
    website: 'https://www.pufbih.ba',
    keywords: ['PUFBiH', 'porez', 'porezna uprava', 'doprinos', 'porezna prijava', 'godišnja prijava', 'porez na dohodak'],
    forms: [
      { id: 'puf-1', name: 'Godišnja porezna prijava (GPD-1051)', description: 'Godišnja prijava poreza na dohodak', category: 'Porez na dohodak', keywords: ['godišnja prijava', 'dohodak', 'GPD-1051'] },
      { id: 'puf-2', name: 'Mjesečna prijava doprinosa (MIP-1023)', description: 'Mjesečna prijava doprinosa za zaposlene', category: 'Doprinosi', keywords: ['doprinosi', 'MIP', 'zaposleni', 'mjesečna'] },
      { id: 'puf-3', name: 'Zahtjev za porezno uvjerenje', description: 'Uvjerenje o izmirenim poreznim obavezama', category: 'Uvjerenja', keywords: ['porezno uvjerenje', 'izmirene obaveze'] },
      { id: 'puf-4', name: 'Prijava za registraciju poreznog obveznika', description: 'Registracija novog poreznog obveznika', category: 'Registracija', keywords: ['registracija', 'porezni obveznik', 'JIB'] },
    ],
  },
  {
    id: 'purs',
    name: 'Poreska uprava Republike Srpske',
    shortName: 'PURS',
    level: 'entity',
    category: 'Porezi',
    description: 'Direktni porezi, doprinosi i porezne prijave u RS',
    website: 'https://www.poreskaupravars.org',
    keywords: ['PURS', 'porez', 'poreska uprava', 'Republika Srpska', 'doprinos', 'porezna prijava'],
    forms: [
      { id: 'purs-1', name: 'Godišnja poreska prijava poreza na dohodak', description: 'Godišnja prijava u RS', category: 'Porez na dohodak', keywords: ['godišnja prijava', 'dohodak', 'RS'] },
      { id: 'purs-2', name: 'Prijava za registraciju poreskog obveznika', description: 'Registracija u RS poreskom sistemu', category: 'Registracija', keywords: ['registracija', 'poreski obveznik', 'JIB'] },
      { id: 'purs-3', name: 'Zahtjev za poresko uvjerenje', description: 'Uvjerenje o izmirenim obavezama u RS', category: 'Uvjerenja', keywords: ['poresko uvjerenje', 'RS'] },
    ],
  },
  {
    id: 'fzpio',
    name: 'Federalni zavod za penzijsko i invalidsko osiguranje',
    shortName: 'FZ PIO',
    level: 'entity',
    category: 'Penzije i osiguranje',
    description: 'Penzijsko osiguranje, starosne i invalidske penzije u FBiH',
    website: 'https://www.fzmiopio.ba',
    keywords: ['PIO', 'MIO', 'penzija', 'starosna penzija', 'invalidska penzija', 'penzijsko osiguranje', 'staž'],
    forms: [
      { id: 'fzpio-1', name: 'Zahtjev za starosnu penziju', description: 'Ostvarivanje prava na starosnu penziju', category: 'Penzije', keywords: ['starosna penzija', 'odlazak u penziju'] },
      { id: 'fzpio-2', name: 'Zahtjev za invalidsku penziju', description: 'Ostvarivanje prava na invalidsku penziju', category: 'Penzije', keywords: ['invalidska penzija', 'invaliditet'] },
      { id: 'fzpio-3', name: 'Zahtjev za porodičnu penziju', description: 'Penzija za članove porodice umrlog osiguranika', category: 'Penzije', keywords: ['porodična penzija', 'nasljedna'] },
      { id: 'fzpio-4', name: 'Uvjerenje o stažu osiguranja', description: 'Potvrda o godinama staža', category: 'Uvjerenja', keywords: ['staž', 'uvjerenje', 'radni staž'] },
    ],
  },
];

// ============================================================
// BRČKO DISTRIKT
// ============================================================

const brckoPoliceFormLinks: Array<[string, string, string, string]> = [
  ['pbd-01', 'Obrazac prijave nestanka putne isprave', 'Lične isprave', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jop/Prijava-nestanka-putne-isprave.pdf'],
  ['pbd-02', 'Zahtjev za davanje podataka iz prekršajne evidencije', 'Prekršajna evidencija', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jop/Zahtjev-za-davanje-podataka-iz-PE-lat.pdf'],
  ['pbd-03', 'Zahtjev za izdavanje uvjerenja o nekažnjavanju', 'Uvjerenja', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jkp/Obrazac-za-uvjerenje-latinica-novo.pdf'],
  ['pbd-04', 'Zahtjev za izdavanje službene zabilješke', 'Uvjerenja', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jsp/ZAHTJEV-izdavanje-sl-zabiljeske-lat.pdf'],
  ['pbd-05', 'Zahtjev za rasknjižavanje kazne', 'Prekršajna evidencija', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jsp/Zahtjev-za-rasknjizavanje-kazne-lat.pdf'],
  ['pbd-06', 'Zahtjev za izdavanje odobrenja za obavljanje prometa na malo sa pirotehničkim sredstvima', 'Pirotehnika', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-obavljanje-prometa-na-malo-pirotehnika26.pdf'],
  ['pbd-07', 'Zahtjev za izdavanje odobrenja za nabavku pirotehničkih sredstava', 'Pirotehnika', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-odobrenja-nabavku-pirotehnickih-sredstava-u-objektu26.pdf'],
  ['pbd-08', 'Zahtjev za izdavanje odobrenja za izvođenje vatrometa', 'Pirotehnika', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-izdavanje-odobrenja-izvodenje-vatrometa26.pdf'],
  ['pbd-09', 'Zahtjev za pohađanje obuke za sticanje certifikata za obavljanje poslova privatne detektivske djelatnosti', 'Agencije za zaštitu', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-certifikat-detektiv26.pdf'],
  ['pbd-10', 'Zahtjev za izdavanje ovlaštenja za obavljanje poslova fizičke - tehničke zaštite', 'Agencije za zaštitu', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Ovlastenje-za-rad-zastita26.pdf'],
  ['pbd-11', 'Zahtjev za izdavanje legitimacije-iskaznice pripadniku obezbjeđenja', 'Agencije za zaštitu', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Obrazac-legitimacija-obezbjedjenje26.pdf'],
  ['pbd-12', 'Zahtjev za izdavanje odobrenja za rad Agencije', 'Agencije za zaštitu', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-odobrenje-za-rad-Agencije26.pdf'],
  ['pbd-13', 'Zahtjev za pregled poslovnih prostorija Agencije radi utvrđivanja propisanih uslova', 'Agencije za zaštitu', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Obrazac-sjediste-agencije26.pdf'],
  ['pbd-14', 'Zahtjev za posebno odobrenje za pratnju i osiguranje transporta novca i vrijednosnih predmeta', 'Agencije za zaštitu', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Obrazac-transport-novca26.pdf'],
  ['pbd-15', 'Zahtjev za odobrenje za prikupljanje dobrovoljnih priloga', 'Javni red', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-prikupljanje-priloga26.pdf'],
  ['pbd-16', 'Zahtjev za odobrenje za prikupljanje dobrovoljnih priloga (organizacija)', 'Javni red', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-prikupljanje-priloga-organizacija26.pdf'],
  ['pbd-17', 'Zahtjev za odobrenje kretanja teretnih vozila', 'Saobraćaj', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-kretanje-teretnih-vozila26.pdf'],
  ['pbd-18', 'Zahtjev za odobrenje privremene zabrane saobraćaja', 'Saobraćaj', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-privremena-zabrana-saobracaja26.pdf'],
  ['pbd-19', 'Zahtjev za odobrenje privremene zabrane saobraćaja (priredba i takmičenje)', 'Saobraćaj', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-zabrana-saobracaja-priredba-takmicenje26.pdf'],
  ['pbd-20', 'Zahtjev za odobrenje za nabavku oružja', 'Oružje', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-nabavka-oruzja26.pdf'],
  ['pbd-21', 'Zahtjev za odobrenje za nabavku municije', 'Oružje', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-nabavka-municije26.pdf'],
  ['pbd-22', 'Zahtjev za odobrenje nošenja ličnog naoružanja', 'Oružje', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-odobrenje-nosenje-naoruzanja26.pdf'],
  ['pbd-23', 'Zahtjev za dozvolu nošenja ličnog naoružanja', 'Oružje', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-dozvola-nosenje-naoruzanja26.pdf'],
  ['pbd-24', 'Zahtjev za produženje oružnog lista', 'Oružje', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-produzenje-oruznoglista26.pdf'],
  ['pbd-25', 'Zahtjev za registraciju oružja i izdavanje oružnog lista', 'Oružje', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-registracija-izdavanje-oruznoglista26.pdf'],
  ['pbd-26', 'Zahtjev za zamjenu oštećenog ili izgubljenog oružnog lista i preregistraciju', 'Oružje', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-zamjena-oruznoglista-preregistracija26.pdf'],
  ['pbd-27', 'Zahtjev za zamjenu ili produženje važenja oružnog lista', 'Oružje', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/jafk/Zahtjev-zamjena-oruznoglista26.pdf'],
  ['pbd-28', 'Zahtjev za izdavanje potvrde', 'Potvrde', 'https://policijabdbih.gov.ba/images/dokumenti/obrasci/okc/ZAHTJEV-za-izdavanje-potvrde-lat.pdf'],
];

export const brckoInstitutions: Institution[] = [
  {
    id: 'vlada-bd',
    name: 'Vlada Brčko Distrikta BiH',
    shortName: 'Vlada BD',
    level: 'district',
    category: 'Uprava',
    description: 'Izvršna vlast Brčko Distrikta BiH',
    website: 'https://www.bdcentral.net',
    keywords: ['Brčko', 'Brčko Distrikt', 'Vlada BD', 'uprava', 'administracija'],
    forms: [
      { id: 'bd-1', name: 'Zahtjev za izdavanje uvjerenja', description: 'Opći zahtjev za uvjerenja iz evidencija BD', category: 'Uvjerenja', keywords: ['uvjerenje', 'Brčko'] },
      { id: 'bd-2', name: 'Zahtjev za građevinsku dozvolu BD', description: 'Građevinska dozvola u Brčko Distriktu', category: 'Urbanizam', keywords: ['građevinska dozvola', 'Brčko', 'urbanizam'] },
    ],
  },
  {
    id: 'policija-bd',
    name: 'Policija Brčko Distrikta BiH',
    shortName: 'Policija BD',
    level: 'district',
    category: 'Sigurnost',
    description: 'Policijske usluge i prijave u Brčko Distriktu',
    website: 'https://policijabdbih.gov.ba',
    keywords: ['policija', 'Brčko', 'prijava', 'sigurnost', 'saobraćaj'],
    forms: brckoPoliceFormLinks.map(([id, name, category, fileUrl]) => ({
      id,
      name,
      description: name,
      category,
      fileUrl,
      keywords: ['policija', 'Brčko', name.toLocaleLowerCase('bs-BA')],
    })),
  },
  {
    id: 'skupstina-brcko',
    name: 'Skupština Brčko distrikta BiH',
    shortName: 'Skupština BD',
    level: 'district',
    category: 'Javna uprava',
    description: 'Službene informacije, važni dokumenti i javni konkursi Skupštine Brčko distrikta BiH',
    website: 'https://skupstinabd.ba/index.php/sr/',
    keywords: ['Skupština Brčko', 'važni dokumenti', 'javni konkursi', 'pristup informacijama'],
    forms: [
      { id: 'skupstina-bd-documents', name: 'Važni dokumenti', description: 'Važni dokumenti Skupštine Brčko distrikta BiH', category: 'Dokumenti', fileUrl: 'https://skupstinabd.ba/index.php/ba/vazni-dokumenti.html', keywords: ['dokumenti', 'akti', 'Skupština BD'] },
      { id: 'skupstina-bd-contests', name: 'Javni konkursi', description: 'Javni konkursi Skupštine Brčko distrikta BiH', category: 'Javni konkursi', fileUrl: 'https://skupstinabd.ba/index.php/ba/javni-konkursi.html', keywords: ['javni konkurs', 'oglas', 'zapošljavanje'] },
      { id: 'skupstina-bd-info-access', name: 'Pristup informacijama', description: 'Informacije o pristupu informacijama Skupštine Brčko distrikta BiH', category: 'Pristup informacijama', fileUrl: 'https://skupstinabd.ba/index.php/ba/pristup-informacijama/linkovi.html', keywords: ['pristup informacijama', 'informacije', 'zahtjev'] },
    ],
  },
];

// ============================================================
// AGENCIES & BUSINESS REGISTRATION
// ============================================================

export const agencyInstitutions: Institution[] = [
  {
    id: 'fia',
    name: 'Finansijsko-informatička agencija',
    shortName: 'FIA',
    level: 'agency',
    category: 'Registracija poslovanja',
    description: 'Registar poslovnih subjekata, finansijski izvještaji u FBiH',
    website: 'https://www.fia.ba',
    keywords: ['FIA', 'registracija firme', 'finansijski izvještaj', 'bilans', 'registar', 'poslovanje', 'firma', 'obrt', 'd.o.o.'],
    forms: [
      { id: 'fia-1', name: 'Prijava za upis u registar poslovnih subjekata', description: 'Registracija novog poslovnog subjekta', category: 'Registracija', keywords: ['registracija', 'firma', 'upis', 'osnivanje'] },
      { id: 'fia-2', name: 'Godišnji finansijski izvještaj', description: 'Predaja godišnjeg finansijskog izvještaja', category: 'Finansije', keywords: ['finansijski izvještaj', 'bilans', 'godišnji'] },
      { id: 'fia-3', name: 'Zahtjev za izvod iz registra', description: 'Izvod iz registra poslovnih subjekata', category: 'Izvodi', keywords: ['izvod', 'registar', 'aktuelni'] },
    ],
  },
  {
    id: 'apif',
    name: 'Agencija za posredničke, informatičke i finansijske usluge',
    shortName: 'APIF',
    level: 'agency',
    category: 'Registracija poslovanja',
    description: 'Registar poslovnih subjekata i finansijski izvještaji u RS',
    
    keywords: ['APIF', 'registracija firme', 'Republika Srpska', 'registar', 'poslovanje', 'firma', 'preduzeće'],
    forms: [
      { id: 'apif-1', name: 'Prijava za registraciju preduzeća u RS', description: 'Registracija poslovnog subjekta u RS', category: 'Registracija', keywords: ['registracija', 'preduzeće', 'RS'] },
      { id: 'apif-2', name: 'Godišnji finansijski izvještaj (RS)', description: 'Predaja finansijskog izvještaja u RS', category: 'Finansije', keywords: ['finansijski izvještaj', 'RS', 'bilans'] },
    ],
  },
  {
    id: 'katastar-fbih',
    name: 'Federalna uprava za geodetske i imovinsko-pravne poslove',
    shortName: 'Katastar FBiH',
    level: 'agency',
    category: 'Nekretnine i zemljište',
    description: 'Katastar, gruntovnica, zemljišne knjige u FBiH',
    website: 'https://www.fgu.com.ba',
    keywords: ['katastar', 'gruntovnica', 'zemljišne knjige', 'posjedovni list', 'ZK izvadak', 'nekretnine', 'uknjižba'],
    forms: [
      { id: 'kat-1', name: 'Zahtjev za izdavanje posjedovnog lista', description: 'Izvadak iz katastra nekretnina', category: 'Katastar', keywords: ['posjedovni list', 'katastar', 'vlasništvo'] },
      { id: 'kat-2', name: 'Zahtjev za ZK izvadak', description: 'Izvadak iz zemljišnih knjiga (gruntovnice)', category: 'Gruntovnica', keywords: ['ZK izvadak', 'gruntovnica', 'zemljišne knjige'] },
      { id: 'kat-3', name: 'Zahtjev za uknjižbu prava vlasništva', description: 'Upis prava vlasništva u zemljišne knjige', category: 'Uknjižba', keywords: ['uknjižba', 'vlasništvo', 'upis'] },
    ],
  },
];

// ============================================================
// ALL INSTITUTIONS COMBINED
// ============================================================

export const allInstitutions: Institution[] = [
  ...stateInstitutions,
  ...entityInstitutions,
  ...brckoInstitutions,
  ...agencyInstitutions,
];

/**
 * Search institutions by query (uses normalization)
 */
export function searchInstitutions(query: string): Institution[] {
  if (!query || query.trim().length < 2) return [];

  // Inline normalization to avoid circular imports
  const removeDiacriticsInline = (text: string): string => {
    return text
      .replace(/[šŠ]/g, (m) => (m === 'š' ? 's' : 'S'))
      .replace(/[đĐ]/g, (m) => (m === 'đ' ? 'dj' : 'Dj'))
      .replace(/[čČ]/g, (m) => (m === 'č' ? 'c' : 'C'))
      .replace(/[ćĆ]/g, (m) => (m === 'ć' ? 'c' : 'C'))
      .replace(/[žŽ]/g, (m) => (m === 'ž' ? 'z' : 'Z'));
  };

  const norm = (text: string) => removeDiacriticsInline(text.toLowerCase().trim());
  const normalized = norm(query);

  return allInstitutions.filter((inst) => {
    const targets = [
      inst.name,
      inst.shortName,
      inst.category,
      inst.description,
      ...inst.keywords,
    ];

    for (const target of targets) {
      const normalizedTarget = norm(target);
      if (normalizedTarget.includes(normalized)) return true;
      if (normalized.includes(normalizedTarget) && normalizedTarget.length > 2) return true;
    }

    // Check forms
    for (const form of inst.forms) {
      const formTargets = [form.name, form.description, ...form.keywords];
      for (const ft of formTargets) {
        if (norm(ft).includes(normalized)) return true;
      }
    }

    return false;
  });
}