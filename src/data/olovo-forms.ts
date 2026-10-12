// ============================================================
// Općina Olovo — Complete Electronic Forms Database
// Source: https://olovo.gov.ba/?lsvrdocumentcat=elektronski-formulari
// Total: 71 forms across 4 pages
// Last updated: 2026-05-07
// ============================================================

export interface OlovoForm {
  id: string;
  name: string;
  pdfUrl: string;
  category: string;
  sizeKB?: number;
}

export const olovoForms: OlovoForm[] = [
  // ============================================================
  // PAGE 1 — Uvjerenja, Lokacijske informacije, Urbanizam
  // ============================================================
  {
    id: 'olovo-001',
    name: 'Zahtjev za izdavanje uvjerenja o činjenicama o kojima se vodi službena evidencija',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-uvjerenja-o-%C4%8Dinjenicama-o-kojima-se-vodi-slu%C5%BEbena-evidencija.pdf',
    category: 'Uvjerenja',
    sizeKB: 53,
  },
  {
    id: 'olovo-002',
    name: 'Zahtjev za izdavanje uvjerenja o činjenicama o kojima se ne vodi službena evidencija',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-uvjerenja-o-%C4%8Dinjenicama-o-kojima-se-ne-vodi-slu%C5%BEbena-evidencija.pdf',
    category: 'Uvjerenja',
    sizeKB: 53,
  },
  {
    id: 'olovo-003',
    name: 'Zahtjev za izdavanje urbanističke saglasnosti',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-urbanisti%C4%8Dke-saglasnosti.pdf',
    category: 'Urbanizam',
    sizeKB: 55,
  },
  {
    id: 'olovo-004',
    name: 'Zahtjev za izdavanje upotrebne dozvole',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-upotrebne-dozvole.pdf',
    category: 'Građevinske dozvole',
    sizeKB: 52,
  },
  {
    id: 'olovo-005',
    name: 'Zahtjev za izdavanje rješenja o utvrđivanju prava vlasništva',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-rje%C5%A1enja-o-utvr%C4%91ivanju-prava-vlasni%C5%A1tva.pdf',
    category: 'Imovinsko-pravni',
    sizeKB: 52,
  },
  {
    id: 'olovo-006',
    name: 'Zahtjev za izdavanje rješenja o izvedenom stanju objekta',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-rje%C5%A1enja-o-izvedenom-stanju-objekta.pdf',
    category: 'Urbanizam',
    sizeKB: 52,
  },
  {
    id: 'olovo-007',
    name: 'Zahtjev za izdavanje rješenja o dodjeli gradskog građevinskog zemljišta',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-rje%C5%A1enja-o-dodjeli-gradskog-gra%C4%91evinskog-zemlji%C5%A1ta.pdf',
    category: 'Urbanizam',
    sizeKB: 52,
  },
  {
    id: 'olovo-008',
    name: 'Zahtjev za izdavanje lokacijske informacije',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-lokacijske-informacije.pdf',
    category: 'Lokacijska informacija',
    sizeKB: 52,
  },
  {
    id: 'olovo-009',
    name: 'Zahtjev za izdavanje jednokratne novčane pomoći',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-jednokratne-nov%C4%8Dane-pomo%C4%87i.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 52,
  },
  {
    id: 'olovo-010',
    name: 'Zahtjev za izdavanje građevinske dozvole',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-gra%C4%91evinske-dozvole.pdf',
    category: 'Građevinske dozvole',
    sizeKB: 55,
  },
  {
    id: 'olovo-011',
    name: 'Zahtjev za izdavanje ekološke dozvole',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-ekolo%C5%A1ke-dozvole.pdf',
    category: 'Urbanizam',
    sizeKB: 52,
  },
  {
    id: 'olovo-012',
    name: 'Zahtjev za izdavanje dozvole za gradnju za objekte privremenog karaktera',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-dozvole-za-gradnju-za-objekte-privremenog-karaktera.pdf',
    category: 'Građevinske dozvole',
    sizeKB: 52,
  },
  {
    id: 'olovo-013',
    name: 'Zahtjev za naknadu umjesto plaće ženi-majci u radnom odnosu',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-naknadu-umjesto-pla%C4%87e-%C5%BEeni-majci-u-radnom-odnosu.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-014',
    name: 'Zahtjev za naknadu umjesto plaće ženi-majci u radnom odnosu za blizance',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-naknadu-umjesto-pla%C4%87e-%C5%BEeni-majci-u-radnom-odnosu-za-blizance.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-015',
    name: 'Zahtjev za novčanu pomoć ženi-majci koja nije u radnom odnosu',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-nov%C4%8Danu-pomo%C4%87-%C5%BEeni-majci-koja-nije-u-radnom-odnosu.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-016',
    name: 'Zahtjev za novčanu pomoć ženi-majci koja nije u radnom odnosu za blizance',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-nov%C4%8Danu-pomo%C4%87-%C5%BEeni-majci-koja-nije-u-radnom-odnosu-za-blizance.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-017',
    name: 'Zahtjev za ostvarivanje prava na dječiji dodatak',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ostvarivanje-prava-na-dje%C4%8Diji-dodatak.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-018',
    name: 'Zahtjev za ostvarivanje prava na pomoć u prehrani djeteta do šest mjeseci',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ostvarivanje-prava-na-pomo%C4%87-u-prehrani-djeteta-do-%C5%A1est-mjeseci.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-019',
    name: 'Zahtjev za ostvarivanje prava na stalnu novčanu pomoć',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ostvarivanje-prava-na-stalnu-nov%C4%8Danu-pomo%C4%87.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-020',
    name: 'Zahtjev za ostvarivanje prava na dodatak za njegu i pomoć od strane drugog lica',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ostvarivanje-prava-na-dodatak-za-njegu-i-pomo%C4%87-od-strane-drugog-lica.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },

  // ============================================================
  // PAGE 2 — Građevinske dozvole, Imovinsko-pravni, Katastar
  // ============================================================
  {
    id: 'olovo-021',
    name: 'Zahtjev za pokretanje postupka eksproprijacije',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-pokretanje-postupka-eksproprijacije.pdf',
    category: 'Imovinsko-pravni',
    sizeKB: 52,
  },
  {
    id: 'olovo-022',
    name: 'Zahtjev za pokretanje postupka deeksproprijacije',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-pokretanje-postupka-deeksproprijacije.pdf',
    category: 'Imovinsko-pravni',
    sizeKB: 52,
  },
  {
    id: 'olovo-023',
    name: 'Zahtjev za pokretanje postupka uzurpacije',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-pokretanje-postupka-uzurpacije.pdf',
    category: 'Imovinsko-pravni',
    sizeKB: 52,
  },
  {
    id: 'olovo-024',
    name: 'Zahtjev za pokretanje postupka arondacije',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-pokretanje-postupka-arondacije.pdf',
    category: 'Imovinsko-pravni',
    sizeKB: 52,
  },
  {
    id: 'olovo-025',
    name: 'Zahtjev za pokretanje postupka komasacije',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-pokretanje-postupka-komasacije.pdf',
    category: 'Imovinsko-pravni',
    sizeKB: 52,
  },
  {
    id: 'olovo-026',
    name: 'Zahtjev za obnovu premjera',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-obnovu-premjera.pdf',
    category: 'Katastar',
    sizeKB: 52,
  },
  {
    id: 'olovo-027',
    name: 'Zahtjev za održavanje premjera',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-odr%C5%BEavanje-premjera.pdf',
    category: 'Katastar',
    sizeKB: 52,
  },
  {
    id: 'olovo-028',
    name: 'Zahtjev za legalizaciju bespravno izgrađenog objekta',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-legalizaciju-bespravno-izgra%C4%91enog-objekta.pdf',
    category: 'Urbanizam',
    sizeKB: 52,
  },
  {
    id: 'olovo-029',
    name: 'Zahtjev za korištenje javne površine',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-kori%C5%A1tenje-javne-povr%C5%A1ine.pdf',
    category: 'Urbanizam',
    sizeKB: 52,
  },
  {
    id: 'olovo-030',
    name: 'Zahtjev za izdavanje prepisa katastarskog plana',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-prepisa-katastarskog-plana.pdf',
    category: 'Katastar',
    sizeKB: 27,
  },
  {
    id: 'olovo-031',
    name: 'Zahtjev za izdavanje kopije katastarskog plana',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-kopije-katastarskog-plana.pdf',
    category: 'Katastar',
    sizeKB: 27,
  },
  {
    id: 'olovo-032',
    name: 'Zahtjev za izdavanje posjedovnog lista',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-posjedovnog-lista.pdf',
    category: 'Katastar',
    sizeKB: 27,
  },
  {
    id: 'olovo-033',
    name: 'Zahtjev za identifikaciju parcele',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-identifikaciju-parcele.pdf',
    category: 'Katastar',
    sizeKB: 27,
  },
  {
    id: 'olovo-034',
    name: 'Zahtjev za cijepanje parcele',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-cijepanje-parcele.pdf',
    category: 'Katastar',
    sizeKB: 27,
  },
  {
    id: 'olovo-035',
    name: 'Zahtjev za spajanje parcele',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-spajanje-parcele.pdf',
    category: 'Katastar',
    sizeKB: 27,
  },
  {
    id: 'olovo-036',
    name: 'Zahtjev za promjenu kulture',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-promjenu-kulture.pdf',
    category: 'Katastar',
    sizeKB: 27,
  },
  {
    id: 'olovo-037',
    name: 'Zahtjev za upis objekta',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-upis-objekta.pdf',
    category: 'Katastar',
    sizeKB: 27,
  },
  {
    id: 'olovo-038',
    name: 'Zahtjev za provođenje promjena u katastru',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-provo%C4%91enje-promjena-u-katastru.pdf',
    category: 'Katastar',
    sizeKB: 27,
  },
  {
    id: 'olovo-039',
    name: 'Zahtjev za uvid u katastarsku dokumentaciju',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-uvid-u-katastarsku-dokumentaciju.pdf',
    category: 'Katastar',
    sizeKB: 27,
  },
  {
    id: 'olovo-040',
    name: 'Zahtjev za izdavanje prepisa posjedovnog lista',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-prepisa-posjedovnog-lista.pdf',
    category: 'Katastar',
    sizeKB: 27,
  },

  // ============================================================
  // PAGE 3 — Odobrenja za rad, Djelatnosti, Prijevoz
  // ============================================================
  {
    id: 'olovo-041',
    name: 'Zahtjev za izdavanje prepisa rješenja',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-prepisa-rje%C5%A1enja.pdf',
    category: 'Uvjerenja',
    sizeKB: 27,
  },
  {
    id: 'olovo-042',
    name: 'Zahtjev za izdavanje odobrenja za rad podružnice (radnje)',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-za-rad-podru%C5%BEnice-radnje.pdf',
    category: 'Samostalna djelatnost',
    sizeKB: 52,
  },
  {
    id: 'olovo-043',
    name: 'Zahtjev za izdavanje odobrenja za rad podružnice',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-za-rad-podru%C5%BEnice.pdf',
    category: 'Samostalna djelatnost',
    sizeKB: 52,
  },
  {
    id: 'olovo-044',
    name: 'Zahtjev za izdavanje odobrenja za organiziranje javnog okupljanja',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-za-organiziranje-javnog-okupljanja.pdf',
    category: 'Javni red',
    sizeKB: 67,
  },
  {
    id: 'olovo-045',
    name: 'Zahtjev za izdavanje odobrenja za obavljanje samostalne djelatnosti',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-za-obavljanje-samostalne-djelatnosti.pdf',
    category: 'Samostalna djelatnost',
    sizeKB: 87,
  },
  {
    id: 'olovo-046',
    name: 'Zahtjev za izdavanje odobrenja za obavljanje domaće radinosti',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-za-obavljanje-doma%C4%87e-radinosti.pdf',
    category: 'Samostalna djelatnost',
    sizeKB: 58,
  },
  {
    id: 'olovo-047',
    name: 'Zahtjev za izdavanje odobrenja za obavljanje ugostiteljske djelatnosti',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-za-obavljanje-ugostiteljske-djelatnosti.pdf',
    category: 'Ugostiteljstvo',
    sizeKB: 53,
  },
  {
    id: 'olovo-048',
    name: 'Zahtjev za izdavanje odobrenja za javni prijevoz',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-za-javni-prijevoz.pdf',
    category: 'Javni prijevoz',
    sizeKB: 118,
  },
  {
    id: 'olovo-049',
    name: 'Zahtjev za izdavanje odobrenja o stalnom prestanku rada',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-o-stalnom-prestanku-rada.pdf',
    category: 'Samostalna djelatnost',
    sizeKB: 51,
  },
  {
    id: 'olovo-050',
    name: 'Zahtjev za izdavanje odobrenja o osnivanju trgovačke radnje',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-o-osnivanju-trgova%C4%8Dke-radnje.pdf',
    category: 'Samostalna djelatnost',
    sizeKB: 65,
  },
  {
    id: 'olovo-051',
    name: 'Zahtjev za izdavanje odobrenja o obavljanju uslužnih djelatnosti; intelektualne usluge, agencijske usluge i sl.',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-o-obavljanju-uslu%C5%BEnih-djelatnosti-intelektualne-usluge-agencijske-usluge-i-sl..pdf',
    category: 'Samostalna djelatnost',
    sizeKB: 58,
  },
  {
    id: 'olovo-052',
    name: 'Zahtjev za izdavanje odobrenja o obavljanju djelatnosti taksi prevoza osoba u cestovnom prometu',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-o-obavljanju-djelatnosti-taksi-prevoza-osoba-u-cestovnom-prometu.pdf',
    category: 'Javni prijevoz',
    sizeKB: 58,
  },
  {
    id: 'olovo-053',
    name: 'Zahtjev za izdavanje odobrenja o obavljanju djelatnosti prevoza stvari u cestovnom prometu',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-odobrenja-o-obavljanju-djelatnosti-prevoza-stvari-u-cestovnom-prometu.pdf',
    category: 'Javni prijevoz',
    sizeKB: 58,
  },
  {
    id: 'olovo-054',
    name: 'Zahtjev za ovjeru obrazaca/zahtjeva za kredit i administrativne zabrane',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ovjeru-obrazaca-zahtjeva-za-kredit-i-administrativne-zabrane.pdf',
    category: 'Ekonomski poslovi',
    sizeKB: 53,
  },
  {
    id: 'olovo-055',
    name: 'Zahtjev za izdavanje uvjerenja – primanja',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-uvjerenja-primanja.pdf',
    category: 'Uvjerenja',
    sizeKB: 53,
  },
  {
    id: 'olovo-056',
    name: 'Zahtjev za izdavanje uvjerenja – donacija',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-izdavanje-uvjerenja-donacija.pdf',
    category: 'Uvjerenja',
    sizeKB: 55,
  },
  {
    id: 'olovo-057',
    name: 'Zahtjev za utvrđivanje zemljišta za redovnu upotrebu objekta u zoni gradskog građevinskog zemljišta',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-utvr%C4%91ivanje-zemlji%C5%A1ta-za-redovnu-upotrebu-objekta-u-zoni-gradskog-gra%C4%91evinskog-zemlji%C5%A1ta.pdf',
    category: 'Urbanizam',
    sizeKB: 58,
  },
  {
    id: 'olovo-058',
    name: 'Zahtjev za ustanovljenje prava služnosti',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ustanovljenje-prava-slu%C5%BEnosti.pdf',
    category: 'Imovinsko-pravni',
    sizeKB: 52,
  },
  {
    id: 'olovo-059',
    name: 'Zahtjev za terensku prijavu',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-terensku-prijavu.pdf',
    category: 'Katastar',
    sizeKB: 53,
  },
  {
    id: 'olovo-060',
    name: 'Zahtjev za promjenu statusa zemljišta',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-promjenu-statusa-zemlji%C5%A1ta.pdf',
    category: 'Katastar',
    sizeKB: 50,
  },

  // ============================================================
  // PAGE 4 — Socijalna zaštita, Jednokratne pomoći, Ostalo
  // ============================================================
  {
    id: 'olovo-061',
    name: 'Zahtjev za ostvarivanje prava na ortopedska i druga pomagala',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ostvarivanje-prava-na-ortopedska-i-druga-pomagala.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-062',
    name: 'Zahtjev za ostvarivanje prava na osposobljavanje za život i rad',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ostvarivanje-prava-na-osposobljavanje-za-%C5%BEivot-i-rad.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-063',
    name: 'Zahtjev za ostvarivanje prava na smještaj u drugu porodicu',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ostvarivanje-prava-na-smje%C5%A1taj-u-drugu-porodicu.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-064',
    name: 'Zahtjev za ostvarivanje prava na smještaj u ustanovu socijalne zaštite',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ostvarivanje-prava-na-smje%C5%A1taj-u-ustanovu-socijalne-za%C5%A1tite.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-065',
    name: 'Zahtjev za ostvarivanje prava na pomoć i njegu u kući',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ostvarivanje-prava-na-pomo%C4%87-i-njegu-u-ku%C4%87i.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-066',
    name: 'Zahtjev za ostvarivanje prava na jednokratnu novčanu pomoć',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ostvarivanje-prava-na-jednokratnu-nov%C4%8Danu-pomo%C4%87.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-067',
    name: 'Zahtjev za ostvarivanje prava na subvenciju troškova boravka djece u predškolskim ustanovama',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ostvarivanje-prava-na-subvenciju-tro%C5%A1kova-boravka-djece-u-pred%C5%A1kolskim-ustanovama.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-068',
    name: 'Zahtjev za ostvarivanje prava na zdravstvenu zaštitu',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ostvarivanje-prava-na-zdravstvenu-za%C5%A1titu.pdf',
    category: 'Zdravstvo',
    sizeKB: 58,
  },
  {
    id: 'olovo-069',
    name: 'Zahtjev za ostvarivanje prava na pogrebne troškove',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ostvarivanje-prava-na-pogrebne-tro%C5%A1kove.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-070',
    name: 'Zahtjev za ostvarivanje prava na privremeni smještaj u prihvatilište',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ostvarivanje-prava-na-privremeni-smje%C5%A1taj-u-prihvatili%C5%A1te.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
  {
    id: 'olovo-071',
    name: 'Zahtjev za ostvarivanje prava na besplatnu pravnu pomoć',
    pdfUrl: 'https://olovo.gov.ba/wp-content/uploads/2016/12/Zahtjev-za-ostvarivanje-prava-na-besplatnu-pravnu-pomo%C4%87.pdf',
    category: 'Socijalna zaštita',
    sizeKB: 58,
  },
];

// ============================================================
// Helper functions
// ============================================================

/**
 * Get all unique categories from Olovo forms
 */
export function getOlovoCategories(): string[] {
  const categories = new Set<string>();
  olovoForms.forEach(form => categories.add(form.category));
  return Array.from(categories).sort();
}

/**
 * Search Olovo forms by name or category
 */
export function searchOlovoForms(query: string): OlovoForm[] {
  if (!query || query.trim().length === 0) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  return olovoForms.filter(form => {
    const nameMatch = form.name.toLowerCase().includes(searchTerm);
    const categoryMatch = form.category.toLowerCase().includes(searchTerm);
    return nameMatch || categoryMatch;
  });
}

/**
 * Get Olovo forms by category
 */
export function getOlovoFormsByCategory(category: string): OlovoForm[] {
  return olovoForms.filter(form => 
    form.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get a specific Olovo form by ID
 */
export function getOlovoFormById(id: string): OlovoForm | undefined {
  return olovoForms.find(form => form.id === id);
}