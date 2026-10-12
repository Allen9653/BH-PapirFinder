// ============================================================
// Vijesti i zvanična obavještenja institucija u Bosni i Hercegovini
// Prvih 5 strukturiranih članaka sa tekstom, izvorima i kategorijama
// ============================================================

export interface InstitutionNewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string[];
  keyPoints: string[];
  institution: string;
  category: 'IDDEEA' | 'Porezna uprava' | 'E-Uprava' | 'Javna uprava' | 'Privreda';
  categoryLabel: string;
  date: string;
  readTime: string;
  imageUrl: string;
  sourceUrl: string;
  isImportant?: boolean;
}

export const INSTITUTION_NEWS: InstitutionNewsArticle[] = [
  {
    id: 'vijest-iddeea-digitalni-identitet',
    title: 'IDDEEA BiH: Aktivacija digitalnog identiteta i elektronskog potpisa za sve građane',
    summary: 'Agencija za identifikaciona dokumenta, evidenciju i razmjenu podataka BiH omogućila je besplatno izdavanje kvalifikovanog elektronskog potpisa za građane i dijasporu.',
    content: [
      'Agencija za identifikaciona dokumenta, evidenciju i razmjenu podataka Bosne i Hercegovine (IDDEEA BiH) uspješno je pokrenula nacionalni sistem za digitalno predstavljanje građana, čime je napravljen ključni iskorak u modernizaciji javne uprave u BiH.',
      'Svi građani koji posjeduju važeću biometrijsku ličnu kartu mogu aktivirati svoj digitalni identitet i dobiti besplatan kvalifikovani digitalni potpis. Ovaj potpis u potpunosti zamjenjuje fizički potpis na šalterima i ima jednaku pravnu snagu u skladu sa Zakonom o elektronskom potpisu BiH.',
      'Korištenjem ovog servisa građani mogu podnositi elektronske zahtjeve prema institucijama na svim nivoima vlasti, provjeravati statuse svojih dokumenata, pristupiti podacima iz CIPS evidencije i potpisivati pravne dokumente bez potrebe za odlaskom na općinske ili policijske šaltere.',
      'U narednoj fazi planirano je povezivanje svih općinskih matičnih službi i poreskih uprava kako bi se eliminisala potreba za dostavljanjem rodnih listova i uvjerenja o državljanstvu u papirnom obliku.'
    ],
    keyPoints: [
      'Besplatna aktivacija za sve nosioce biometrijskih ličnih karata',
      'Pravna jednakost digitalnog i svojeručnog potpisa u cijeloj BiH',
      'Direktna integracija sa CIPS bazom i općinskim evidencijama',
      'Značajna ušteda vremena za građane u zemlji i dijaspori'
    ],
    institution: 'IDDEEA BiH',
    category: 'IDDEEA',
    categoryLabel: 'Digitalni identitet',
    date: '10. Oktobar 2026',
    readTime: '3 min čitanja',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    sourceUrl: 'https://www.iddeea.gov.ba/',
    isImportant: true,
  },
  {
    id: 'vijest-pufbih-godisnje-prijave',
    title: 'Porezna uprava FBiH: Nove instrukcije i elektronska predaja obrazaca JS 3100 i GPD-1051',
    summary: 'Porezna uprava Federacije BiH objavila je ažurirane vodiče i digitalne obrasce za prijavu poreza na dohodak i prijave radnika u Jedinstveni sistem.',
    content: [
      'Porezna uprava Federacije Bosne i Hercegovine izdala je zvanične smjernice za poslodavce, samostalne privrednike i građane o obavezi i procedurama podnošenja godišnjih poreznih prijava.',
      'Poseban akcenat stavljen je na Jedinstveni sistem registracije, kontrole i naplate doprinosa (obrazac JS 3100 za zaposlene, JS 3110 za dobrovoljno osiguranje i JS 3120 za pripravnike i volontere). Poslodavcima je omogućena provjera i preuzimanje standardizovanih obrazaca.',
      'Također, građani koji ostvaruju dohodak iz dva ili više izvora, kao i oni koji ostvaruju prihode iz inostranstva (freelanceri i rad na daljinu), dužni su popuniti obrazac GPD-1051 uz pravo na priznavanje ličnog odbitka i troškova.',
      'Porezna uprava podsjeća da uredno popunjena dokumentacija sprečava zastoje u obradi i omogućava brži povrat preplaćenog poreza.'
    ],
    keyPoints: [
      'Obavezna primjena obrazaca JS 3100 pri svakoj prijavi, promjeni i odjavi radnika',
      'Pravilno evidentiranje poreskih olakšica na obrascu GPD-1051',
      'Digitalni unos smanjuje mogućnost greške u obračunu doprinosa',
      'Dostupnost formulara i šablona za sve kantone u FBiH'
    ],
    institution: 'Porezna uprava FBiH',
    category: 'Porezna uprava',
    categoryLabel: 'Porezi i doprinosi',
    date: '08. Oktobar 2026',
    readTime: '4 min čitanja',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    sourceUrl: 'https://www.pufbih.ba/',
    isImportant: true,
  },
  {
    id: 'vijest-adsbih-digitalni-konkursi',
    title: 'Agencija za državnu službu BiH: Pojednostavljena prijava na javne konkurse',
    summary: 'Uveden je novi standard elektronske prijave na konkurse u institucijama BiH, čime se ukida obaveza predaje ovjerenih diploma u prvoj fazi selekcije.',
    content: [
      'Agencija za državnu službu Bosne i Hercegovine (ADS BiH) implementirala je novu platformu koja kandidatima omogućava jednostavnije apliciranje na javne oglase i konkurse u državnim organima.',
      'U prvoj fazi prijave kandidati više nisu dužni dostavljati ovjerene kopije diploma, uvjerenja o državljanstvu niti rodne listove iz matičnih službi. Dovoljno je popuniti standardizovani elektronski obrazac i izjavu o ispunjavanju općih i posebnih uslova.',
      'Tek kandidati koji polože pismeni dio ispita i uđu u uži izbor bit će pozvani da prilože originalne ili ovjerene dokumente, što drastično smanjuje troškove ovjere i administrativne takse.',
      'Ova reforma ima za cilj privlačenje većeg broja mladih stručnjaka, kao i građana iz dijaspore koji žele doprinijeti razvoju institucija BiH.'
    ],
    keyPoints: [
      'Ukidanje skupih ovjera dokumenata prije prolaska inicijalnih testova',
      'Jedinstveni online prijavni obrazac za sve državne institucije',
      'Transparentniji sistem bodovanja i rangiranja kandidata',
      'Pristupačnost za kandidate iz svih dijelova Bosne i Hercegovine'
    ],
    institution: 'Agencija za državnu službu BiH',
    category: 'Javna uprava',
    categoryLabel: 'Zapošljavanje i uprava',
    date: '05. Oktobar 2026',
    readTime: '3 min čitanja',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    sourceUrl: 'https://www.ads.gov.ba/',
    isImportant: false,
  },
  {
    id: 'vijest-purs-elektronske-usluge',
    title: 'Poreska uprava RS: Novi obrasci PD 3100 i olakšano poslovanje samostalnih preduzetnika',
    summary: 'Poreska uprava Republike Srpske uvela je ažurirane obrasce za registraciju uplata doprinosa i prijavu osiguranika sa punom ćiriličnom podrškom.',
    content: [
      'Poreska uprava Republike Srpske nastavila je unapređenje svog informacionog sistema puštanjem u rad ažuriranih verzija obrazaca PD 3100, PD 3110 i PD 3120.',
      'Samostalni preduzetnici (SP), poljoprivrednici i nosioci slobodnih profesija sada mogu znatno brže evidentirati svoje obaveze po osnovu doprinosa za penzijsko i invalidsko osiguranje, zdravstveno osiguranje i osiguranje od nezaposlenosti.',
      'Svi obrasci dostupni su u službenom ćiriličnom formatu, prilagođeni digitalnoj obradi i standardima Poreske uprave RS.',
      'Iz Poreske uprave poručuju da je cilj nulte administrativne barijere za pokretanje biznisa i olakšavanje poslovanja mikro i malih preduzeća u svim opštinama Republike Srpske.'
    ],
    keyPoints: [
      'Ažurirani obrasci PD 3100, PD 3110 i PD 3120 u zvaničnoj formi',
      'Puna podrška za ćirilično pismo i automatsku obradu podataka',
      'Ubrzana procedura za registraciju samostalnih preduzetnika (SP)',
      'Direktna veza sa Fondom PIO RS i Fondom zdravstvenog osiguranja'
    ],
    institution: 'Poreska uprava RS',
    category: 'Privreda',
    categoryLabel: 'Preduzetništvo RS',
    date: '02. Oktobar 2026',
    readTime: '3 min čitanja',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    sourceUrl: 'https://www.poreskaupravars.org/',
    isImportant: false,
  },
  {
    id: 'vijest-ks-maticni-uredi-integracija',
    title: 'Kanton Sarajevo i Općine: Izdavanje izvoda iz matičnih knjiga bez teritorijalnog ograničenja',
    summary: 'Zahvaljujući centralizovanom sistemu matičnih knjiga, građani mogu preuzeti rodni list, vjenčani list ili uvjerenje o državljanstvu u bilo kojoj općini.',
    content: [
      'Općine Kantona Sarajevo (Stari Grad, Centar, Novo Sarajevo, Novi Grad, Ilidža, Vogošća, Hadžići, Ilijaš i Trnovo), u saradnji sa kantonalnim i federalnim organima, u potpunosti su uvezale matične evidencije.',
      'Građanin rođen u jednoj općini više ne mora putovati u matični ured mjesta rođenja, već izvod iz matične knjige rođenih (rodni list bez roka važenja), vjenčani list ili uvjerenje o državljanstvu može dobiti u bilo kojoj općinskoj službi ili putem e-uprava servisa.',
      'Projekat znatno rasterećuje općinske šaltere, posebno u ljetnim mjesecima kada dijaspora posjećuje domovinu radi regulisanja imovinskih i ličnih dokumenata.',
      'Također se radi na uvođenju elektronskog plaćanja općinskih administrativnih taksi direktno putem interneta.'
    ],
    keyPoints: [
      'Preuzimanje izvoda u bilo kojoj općini nezavisno od mjesta rođenja',
      'Rodni listovi trajne važnosti bez potrebe za vađenjem svakih 6 mjeseci',
      'Online naručivanje dokumenata putem e-uprava portala općina',
      'Direktna ušteda troškova prevoza i višesatnog čekanja na šalterima'
    ],
    institution: 'Vlada KS i Općine KS',
    category: 'E-Uprava',
    categoryLabel: 'Matični uredi i e-Servisi',
    date: '28. Septembar 2026',
    readTime: '3 min čitanja',
    imageUrl: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
    sourceUrl: 'https://vlada.ks.gov.ba/',
    isImportant: true,
  },
];
