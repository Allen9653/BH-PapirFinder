/**
 * BH PAPIRFINDER - REGISTAR I DEFINICIJE 8 PREMIUM JS OBRAZACA
 * (Jedinstveni sistem registracije, kontrole i naplate doprinosa za FBiH, RS i Brčko Distrikt)
 *
 * Pravno usklađeno sa:
 * 1. Porezna uprava Federacije BiH (Zakon o Jedinstvenom sistemu, Sl. novine FBiH 42/09, 109/12, 86/15, 30/16)
 * 2. Poreska uprava Republike Srpske (Zakon o doprinosima RS, Sl. glasnik RS 114/17, 112/19, 61/21, 119/21)
 * 3. Direkcija za finansije Brčko Distrikta BiH - Poreska uprava (Zakon o porezu na dohodak BD, Sl. glasnik BD 60/10, 15/12, 30/17)
 */

import { latinToCyrillic } from '../lib/cyrillic-converter';

export type EntityRegion = 'fbih' | 'rs' | 'bd';

export interface FormFieldDef {
  id: string;
  label: string;
  labelCyr?: string;
  placeholder?: string;
  type: 'text' | 'select' | 'date' | 'number' | 'textarea';
  options?: { value: string; label: string; labelCyr?: string }[];
  section: 'prijava' | 'poslodavac' | 'osiguranik' | 'zaposlenje' | 'obracun' | 'potpis';
  required?: boolean;
  validationRegex?: string;
  validationHelp?: string;
  defaultValue?: string;
}

export interface PremiumJsForm {
  id: string;
  code: string;
  title: string;
  titleCyr: string;
  subtitle: string;
  subtitleCyr: string;
  entity: EntityRegion;
  entityName: string;
  authority: string;
  authorityCyr: string;
  legalBasis: string;
  legalBasisCyr: string;
  archiveUrl: string;
  isPremium: boolean;
  fields: FormFieldDef[];
  generateText: (values: Record<string, string>, script: 'lat' | 'cyr') => string;
}

// Zajednička polja za vrstu prijave
const VRSTA_PRIJAVE_OPTIONS = [
  { value: '1', label: '1 - Prijava na osiguranje (početak rada)', labelCyr: '1 - Пријава на осигурање (почетак рада)' },
  { value: '2', label: '2 - Promjena podataka o osiguranju', labelCyr: '2 - Промјена података о осигурању' },
  { value: '3', label: '3 - Odjava sa osiguranja (prestanak rada)', labelCyr: '3 - Одјава са осигурања (престанак рада)' },
];

const RAZLOG_ODJAVE_OPTIONS = [
  { value: '01', label: '01 - Sporazumni prestanak radnog odnosa', labelCyr: '01 - Споразумни престанак радног односа' },
  { value: '02', label: '02 - Otkaz ugovora o radu od strane radnika', labelCyr: '02 - Отказ уговора о раду од стране радника' },
  { value: '03', label: '03 - Otkaz ugovora o radu od strane poslodavca', labelCyr: '03 - Отказ уговора о раду од стране послодавца' },
  { value: '04', label: '04 - Istek ugovora o radu na određeno vrijeme', labelCyr: '04 - Истек уговора о раду на одређено вријеме' },
  { value: '05', label: '05 - Odlazak u starosnu / invalidsku penziju', labelCyr: '05 - Одлазак у старосну / инвалидску пензију' },
  { value: '06', label: '06 - Stečaj ili likvidacija poslodavca', labelCyr: '06 - Стечај или ликвидација послодавца' },
  { value: '99', label: '99 - Ostali zakonski razlozi', labelCyr: '99 - Остали законски разлози' },
];

const STRUČNA_SPREMA_OPTIONS = [
  { value: 'NSS', label: '1 - NSS (Bez škole / nezavršena osnovna)', labelCyr: '1 - НСС (Без школе / незавршена основна)' },
  { value: 'OŠ', label: '2 - OŠ (Osnovna škola)', labelCyr: '2 - ОШ (Основна школа)' },
  { value: 'KV', label: '3 - KV / SSS III (Srednja stručna škola 3 god.)', labelCyr: '3 - КВ / ССС III (Средња стручна 3 год.)' },
  { value: 'SSS', label: '4 - SSS IV (Srednja škola 4 god.)', labelCyr: '4 - ССС IV (Средња школа 4 год.)' },
  { value: 'VKV', label: '5 - VKV / Specijalističko obrazovanje', labelCyr: '5 - ВКВ / Специјалистичко образовање' },
  { value: 'VŠS', label: '6 - VŠS (Viša škola / Bachelor 180 ECTS)', labelCyr: '6 - ВШС (Виша школа / Bachelor 180 ECTS)' },
  { value: 'VSS', label: '7 - VSS (Fakultet / Master 240-300 ECTS)', labelCyr: '7 - ВСС (Факултет / Master 240-300 ECTS)' },
  { value: 'MR_DR', label: '8 - Magisterij / Doktorat nauka (Dr)', labelCyr: '8 - Магистериј / Докторат наука (Др)' },
];

export const PREMIUM_JS_FORMS: PremiumJsForm[] = [
  // =========================================================================
  // 1. FBIH: JS 3100
  // =========================================================================
  {
    id: 'fbih-js-3100',
    code: 'JS 3100',
    title: 'Obrazac JS 3100 - Prijava / Promjena / Odjava osiguranja',
    titleCyr: 'Образац ЈС 3100 - Пријава / Промјена / Одјава осигурања',
    subtitle: 'Jedinstveni sistem registracije, kontrole i naplate doprinosa u Federaciji BiH',
    subtitleCyr: 'Јединствени систем регистрације, контроле и наплате доприноса у Федерацији БиХ',
    entity: 'fbih',
    entityName: 'Federacija BiH',
    authority: 'Porezna uprava Federacije Bosne i Hercegovine',
    authorityCyr: 'Порезна управа Федерације Босне и Херцеговине',
    legalBasis: 'Zakon o Jedinstvenom sistemu registracije, kontrole i naplate doprinosa ("Sl. novine FBiH", br. 42/09, 109/12, 86/15 i 30/16)',
    legalBasisCyr: 'Закон о Јединственом систему регистрације, контроле и наплате доприноса ("Сл. новине ФБиХ", бр. 42/09, 109/12, 86/15 и 30/16)',
    archiveUrl: 'https://archive.org/details/js-3100-prijava-promjena-odjava-osiguranja',
    isPremium: true,
    fields: [
      {
        id: 'vrsta_prijave',
        label: '1. Vrsta prijave',
        labelCyr: '1. Врста пријаве',
        type: 'select',
        options: VRSTA_PRIJAVE_OPTIONS,
        section: 'prijava',
        required: true,
        defaultValue: '1',
      },
      {
        id: 'poslodavac_jib',
        label: '2. JIB obveznika uplate doprinosa (poslodavca)',
        labelCyr: '2. ЈИБ обвезника уплате доприноса (послодавца)',
        placeholder: '13 cifara (npr. 4219296620005)',
        type: 'text',
        section: 'poslodavac',
        required: true,
        validationRegex: '^[0-9]{13}$',
        validationHelp: 'JIB mora sadržavati tačno 13 cifara',
      },
      {
        id: 'poslodavac_naziv',
        label: '3. Naziv firme / poslodavca',
        labelCyr: '3. Назив фирме / послодавца',
        placeholder: 'Puni pravni naziv društva ili obrta',
        type: 'text',
        section: 'poslodavac',
        required: true,
      },
      {
        id: 'poslodavac_adresa',
        label: '4. Adresa i sjedište poslodavca',
        labelCyr: '4. Адреса и сједиште послодавца',
        placeholder: 'Ulica i broj, Poštanski broj i Grad',
        type: 'text',
        section: 'poslodavac',
        required: true,
      },
      {
        id: 'poslodavac_opcina_sifra',
        label: '5. Šifra općine sjedišta poslodavca',
        labelCyr: '5. Шифра општине сједишта послодавца',
        placeholder: '3 cifre (npr. 095 za Zenicu, 077 za Sarajevo Centar)',
        type: 'text',
        section: 'poslodavac',
        required: true,
      },
      {
        id: 'osiguranik_jmbg',
        label: '6. JMBG osiguranika (radnika)',
        labelCyr: '6. ЈМБГ осигураника (радника)',
        placeholder: '13 cifara jedinstvenog matičnog broja',
        type: 'text',
        section: 'osiguranik',
        required: true,
        validationRegex: '^[0-9]{13}$',
        validationHelp: 'JMBG mora sadržavati tačno 13 cifara',
      },
      {
        id: 'osiguranik_prezime',
        label: '7. Prezime osiguranika',
        labelCyr: '7. Презиме осигураника',
        placeholder: 'Prezime',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'osiguranik_ime',
        label: '8. Ime osiguranika',
        labelCyr: '8. Име осигураника',
        placeholder: 'Ime',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'osiguranik_ime_roditelja',
        label: '9. Ime jednog roditelja',
        labelCyr: '9. Име једног родитеља',
        placeholder: 'Ime oca ili majke',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'osiguranik_adresa',
        label: '10. Adresa prebivališta osiguranika',
        labelCyr: '10. Адреса пребивалишта осигураника',
        placeholder: 'Ulica, broj, grad',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'osiguranik_opcina_sifra',
        label: '11. Šifra općine prebivališta osiguranika',
        labelCyr: '11. Шифра општине пребивалишта осигураника',
        placeholder: '3 cifre (prema šifarniku Porezne uprave)',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'osiguranik_strucna_sprema',
        label: '12. Stručna sprema',
        labelCyr: '12. Стручна спрема',
        type: 'select',
        options: STRUČNA_SPREMA_OPTIONS,
        section: 'osiguranik',
        required: true,
        defaultValue: 'SSS',
      },
      {
        id: 'datum_osiguranja',
        label: '13. Datum početka / promjene / prestanka osiguranja',
        labelCyr: '13. Датум почетка / промјене / престанка осигурања',
        placeholder: 'DD.MM.GGGG',
        type: 'date',
        section: 'zaposlenje',
        required: true,
      },
      {
        id: 'osnov_osiguranja',
        label: '14. Osnov osiguranja (šifra i opis)',
        labelCyr: '14. Основ осигурања (шифра и опис)',
        placeholder: 'npr. 01 - Radni odnos kod pravnog lica',
        type: 'text',
        section: 'zaposlenje',
        required: true,
        defaultValue: '01 - Radni odnos',
      },
      {
        id: 'radno_vrijeme_sati',
        label: '15. Sedmično radno vrijeme (u satima)',
        labelCyr: '15. Седмично радно вријеме (у сатима)',
        placeholder: '40 za puno radno vrijeme',
        type: 'number',
        section: 'zaposlenje',
        required: true,
        defaultValue: '40',
      },
      {
        id: 'radno_mjesto_naziv',
        label: '16. Naziv radnog mjesta / zanimanja',
        labelCyr: '16. Назив радног мјеста / занимања',
        placeholder: 'npr. Administrativni referent / Softverski inženjer',
        type: 'text',
        section: 'zaposlenje',
        required: true,
      },
      {
        id: 'razlog_odjave',
        label: '17. Razlog odjave (samo u slučaju odjave)',
        labelCyr: '17. Разлог одјаве (само у случају одјаве)',
        type: 'select',
        options: [{ value: '', label: '-- Nije odjava (prijava ili promjena) --', labelCyr: '-- Није одјава (пријава или промјена) --' }, ...RAZLOG_ODJAVE_OPTIONS],
        section: 'zaposlenje',
        required: false,
      },
      {
        id: 'mjesto_podnosenja',
        label: '18. Mjesto podnošenja prijave',
        labelCyr: '18. Мјесто подношења пријаве',
        placeholder: 'npr. Zenica, Sarajevo, Tuzla',
        type: 'text',
        section: 'potpis',
        required: true,
      },
      {
        id: 'datum_podnosenja',
        label: '19. Datum podnošenja',
        labelCyr: '19. Датум подношења',
        type: 'date',
        section: 'potpis',
        required: true,
      },
      {
        id: 'potpisnik_ime',
        label: '20. Ime i prezime odgovornog lica poslodavca',
        labelCyr: '20. Име и презиме одговорног лица послодавца',
        placeholder: 'Ovlašteni potpisnik / Direktor',
        type: 'text',
        section: 'potpis',
        required: true,
      },
    ],
    generateText: (v, script) => {
      const isCyr = script === 'cyr';
      const vrTxt = VRSTA_PRIJAVE_OPTIONS.find(o => o.value === v.vrsta_prijave);
      const vrStr = (isCyr ? vrTxt?.labelCyr : vrTxt?.label) || v.vrsta_prijave || '1';
      const sprTxt = STRUČNA_SPREMA_OPTIONS.find(o => o.value === v.osiguranik_strucna_sprema);
      const sprStr = (isCyr ? sprTxt?.labelCyr : sprTxt?.label) || v.osiguranik_strucna_sprema || 'SSS';
      const rzTxt = RAZLOG_ODJAVE_OPTIONS.find(o => o.value === v.razlog_odjave);
      const rzStr = v.razlog_odjave ? ((isCyr ? rzTxt?.labelCyr : rzTxt?.label) || v.razlog_odjave) : (isCyr ? 'Није примјењиво' : 'Nije primjenjivo');

      const raw = `BOSNA I HERCEGOVINA
FEDERACIJA BOSNE I HERCEGOVINE
POREZNA UPRAVA FEDERACIJE BOSNE I HERCEGOVINE
KANTONALNI POREZNI URED / POREZNA ISPOSTAVA

OBRAZAC JS 3100
PRIJAVA / PROMJENA / ODJAVA OSIGURANJA U JEDINSTVENI SISTEM
Pravni osnov: Zakon o Jedinstvenom sistemu registracije, kontrole i naplate doprinosa ("Sl. novine FBiH", br. 42/09, 109/12, 86/15 i 30/16)

================================================================================
I. STATUS OBRADE I VRSTA PRIJAVE:
Vrsta prijave: ${vrStr}
Datum podnošenja: ${v.datum_podnosenja || '—'}
Mjesto podnošenja: ${v.mjesto_podnosenja || '—'}

================================================================================
II. PODACI O OBVEZNIKU UPLATE DOPRINOSA (POSLODAVAC):
1. JIB poslodavca: ${v.poslodavac_jib || '—'}
2. Puni naziv: ${v.poslodavac_naziv || '—'}
3. Adresa i sjedište: ${v.poslodavac_adresa || '—'}
4. Šifra općine sjedišta: ${v.poslodavac_opcina_sifra || '—'}

================================================================================
III. PODACI O OSIGURANIKU (ZAPOSLENIK):
1. JMBG: ${v.osiguranik_jmbg || '—'}
2. Prezime: ${v.osiguranik_prezime || '—'}
3. Ime: ${v.osiguranik_ime || '—'}
4. Ime jednog roditelja: ${v.osiguranik_ime_roditelja || '—'}
5. Adresa prebivališta: ${v.osiguranik_adresa || '—'}
6. Šifra općine prebivališta: ${v.osiguranik_opcina_sifra || '—'}
7. Stručna sprema: ${sprStr}

================================================================================
IV. PODACI O OSIGURANJU I RADNOM ODNOSU:
1. Datum početka / promjene / prestanka: ${v.datum_osiguranja || '—'}
2. Osnov osiguranja: ${v.osnov_osiguranja || '01 - Radni odnos'}
3. Sedmično radno vrijeme: ${v.radno_vrijeme_sati || '40'} sati
4. Naziv radnog mjesta / poslova: ${v.radno_mjesto_naziv || '—'}
5. Razlog odjave (ukoliko se vrši odjava): ${rzStr}

================================================================================
V. IZJAVA I OVJERA PODNOSIOCA:
Pod punom materijalnom i krivičnom odgovornošću izjavljujem da su svi navedeni podaci
u ovoj prijavi tačni, vjerodostojni i usklađeni sa službenom dokumentacijom poslodavca
i zaključenim ugovorom o radu.

Odgovorno lice poslodavca: ${v.potpisnik_ime || '—'}

M.P. (Pečat poslodavca)                Potpis ovlaštenog lica: ___________________

--------------------------------------------------------------------------------
PRIJEMNI ŠTAMBILJ POREZNE UPRAVE FBIH:
Broj protokola: ________________________
Datum prijema:   ________________________
Potpis službenika: ______________________`;

      return isCyr ? latinToCyrillic(raw) : raw;
    },
  },

  // =========================================================================
  // 2. FBIH: JS 3110
  // =========================================================================
  {
    id: 'fbih-js-3110',
    code: 'JS 3110',
    title: 'Obrazac JS 3110 - Dobrovoljno penzijsko i zdravstveno osiguranje',
    titleCyr: 'Образац ЈС 3110 - Добровољно пензијско и здравствено осигурање',
    subtitle: 'Prijava / Promjena / Odjava individualnog dobrovoljnog osiguranja u FBiH',
    subtitleCyr: 'Пријава / Промјена / Одјава индивидуалног добровољног осигурања у ФБиХ',
    entity: 'fbih',
    entityName: 'Federacija BiH',
    authority: 'Porezna uprava Federacije Bosne i Hercegovine',
    authorityCyr: 'Порезна управа Федерације Босне и Херцеговине',
    legalBasis: 'Zakon o penzijskom i invalidskom osiguranju FBiH ("Sl. novine FBiH", br. 13/18 i 90/21) i Zakon o zdravstvenom osiguranju FBiH',
    legalBasisCyr: 'Закон о пензијском и инвалидском осигурању ФБиХ ("Сл. новине ФБиХ", бр. 13/18 и 90/21) и Закон о здравственом осигурању ФБиХ',
    archiveUrl: 'https://archive.org/details/js-3110-dobrovoljno-penzijsko-i-zdravstveno-osiguranje_202610',
    isPremium: true,
    fields: [
      {
        id: 'vrsta_prijave',
        label: '1. Vrsta prijave',
        labelCyr: '1. Врста пријаве',
        type: 'select',
        options: VRSTA_PRIJAVE_OPTIONS,
        section: 'prijava',
        required: true,
        defaultValue: '1',
      },
      {
        id: 'osiguranik_jmbg',
        label: '2. JMBG podnosioca',
        labelCyr: '2. ЈМБГ подносиоца',
        placeholder: '13 cifara',
        type: 'text',
        section: 'osiguranik',
        required: true,
        validationRegex: '^[0-9]{13}$',
      },
      {
        id: 'osiguranik_prezime',
        label: '3. Prezime',
        labelCyr: '3. Презиме',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'osiguranik_ime',
        label: '4. Ime',
        labelCyr: '4. Име',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'osiguranik_adresa',
        label: '5. Adresa prebivališta i kontakt telefon',
        labelCyr: '5. Адреса пребивалишта и контакт телефон',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'osiguranik_opcina_sifra',
        label: '6. Šifra općine prebivališta',
        labelCyr: '6. Шифра општине пребивалишта',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'vrsta_osiguranja',
        label: '7. Obim dobrovoljnog osiguranja',
        labelCyr: '7. Обим добровољног осигурања',
        type: 'select',
        options: [
          { value: 'PIO_ZO', label: 'Dobrovoljno penzijsko (PIO) i zdravstveno (ZO) osiguranje', labelCyr: 'Добровољно пензијско (ПИО) и здравствено (ЗО) осигурање' },
          { value: 'PIO', label: 'Samo dobrovoljno penzijsko osiguranje (PIO/MIO)', labelCyr: 'Само добровољно пензијско осигурање (ПИО/МИО)' },
          { value: 'ZO', label: 'Samo dobrovoljno zdravstveno osiguranje (ZO)', labelCyr: 'Само добровољно здравствено осигурање (ЗО)' },
        ],
        section: 'zaposlenje',
        required: true,
        defaultValue: 'PIO_ZO',
      },
      {
        id: 'osnovica_doprinosa',
        label: '8. Izabrana mjesečna osnovica za obračun (u BAM)',
        labelCyr: '8. Изабрана мјесечна основица за обрачун (у БАМ)',
        placeholder: 'Minimalna zakonska ili ugovorena osnovica',
        type: 'number',
        section: 'obracun',
        required: true,
        defaultValue: '750',
      },
      {
        id: 'datum_osiguranja',
        label: '9. Datum početka dobrovoljnog osiguranja',
        labelCyr: '9. Датум почетка добровољног осигурања',
        type: 'date',
        section: 'zaposlenje',
        required: true,
      },
      {
        id: 'mjesto_podnosenja',
        label: '10. Mjesto podnošenja',
        labelCyr: '10. Мјесто подношења',
        type: 'text',
        section: 'potpis',
        required: true,
      },
      {
        id: 'datum_podnosenja',
        label: '11. Datum podnošenja',
        labelCyr: '11. Датум подношења',
        type: 'date',
        section: 'potpis',
        required: true,
      },
    ],
    generateText: (v, script) => {
      const isCyr = script === 'cyr';
      const raw = `BOSNA I HERCEGOVINA
FEDERACIJA BOSNE I HERCEGOVINE
POREZNA UPRAVA FEDERACIJE BOSNE I HERCEGOVINE

OBRAZAC JS 3110
PRIJAVA / PROMJENA / ODJAVA DOBROVOLJNOG PENZIJSKOG I ZDRAVSTVENOG OSIGURANJA
Pravni osnov: Zakon o PIO FBiH ("Sl. novine FBiH", br. 13/18 i 90/21)

I. PODACI O PODNOSIOCU:
JMBG: ${v.osiguranik_jmbg || '—'}
Prezime i ime: ${v.osiguranik_prezime || '—'} ${v.osiguranik_ime || '—'}
Adresa prebivališta: ${v.osiguranik_adresa || '—'}
Šifra općine: ${v.osiguranik_opcina_sifra || '—'}

II. PODACI O DOBROVOLJNOM OSIGURANJU:
Obim osiguranja: ${v.vrsta_osiguranja || 'PIO i Zdravstveno osiguranje'}
Mjesečna osnovica za doprinose: ${v.osnovica_doprinosa || '750'} BAM
Datum početka osiguranja: ${v.datum_osiguranja || '—'}

III. SAGLASNOST I OBAVEZA UPLATE:
Obavezujem se da ću samostalno i redovno vršiti uplatu propisanih doprinosa
do 15. u mjesecu za prethodni mjesec na propisane račune javnih prihoda.

Mjesto i datum: ${v.mjesto_podnosenja || '—'}, ${v.datum_podnosenja || '—'}
Potpis osiguranika: ________________________________`;

      return isCyr ? latinToCyrillic(raw) : raw;
    },
  },

  // =========================================================================
  // 3. FBIH: JS 3120
  // =========================================================================
  {
    id: 'fbih-js-3120',
    code: 'JS 3120',
    title: 'Obrazac JS 3120 - Prijava lica osiguranih u određenim okolnostima',
    titleCyr: 'Образац ЈС 3120 - Пријава лица осигураних у одређеним околностима',
    subtitle: 'Osiguranje učenika/studenata na praksi, volontera i stručnog osposobljavanja u FBiH',
    subtitleCyr: 'Осигурање ученика/студената на пракси, волонтера и стручног оспособљавања у ФБиХ',
    entity: 'fbih',
    entityName: 'Federacija BiH',
    authority: 'Porezna uprava Federacije Bosne i Hercegovine',
    authorityCyr: 'Порезна управа Федерације Босне и Херцеговине',
    legalBasis: 'Zakon o PIO i Zakon o zdravstvenom osiguranju FBiH (nesreća na poslu i profesionalna oboljenja)',
    legalBasisCyr: 'Закон о ПИО и Закон о здравственом осигурању ФБиХ (несрећа на послу и професионална обољења)',
    archiveUrl: 'https://archive.org/details/js-3120-prijava-odjava-lica-osiguranih-u-odredjenim-okolnostima',
    isPremium: true,
    fields: [
      {
        id: 'vrsta_prijave',
        label: '1. Vrsta prijave',
        labelCyr: '1. Врста пријаве',
        type: 'select',
        options: VRSTA_PRIJAVE_OPTIONS,
        section: 'prijava',
        required: true,
        defaultValue: '1',
      },
      {
        id: 'organizator_jib',
        label: '2. JIB organizatora / poslodavca / obrazovne ustanove',
        labelCyr: '2. ЈИБ организатора / послодавца / образовне установе',
        placeholder: '13 cifara',
        type: 'text',
        section: 'poslodavac',
        required: true,
        validationRegex: '^[0-9]{13}$',
      },
      {
        id: 'organizator_naziv',
        label: '3. Naziv organizatora (škola, fakultet, pravno lice)',
        labelCyr: '3. Назив организатора (школа, факултет, правно лице)',
        type: 'text',
        section: 'poslodavac',
        required: true,
      },
      {
        id: 'osiguranik_jmbg',
        label: '4. JMBG učenika / studenta / volontera',
        labelCyr: '4. ЈМБГ ученика / студента / волонтера',
        type: 'text',
        section: 'osiguranik',
        required: true,
        validationRegex: '^[0-9]{13}$',
      },
      {
        id: 'osiguranik_ime_prezime',
        label: '5. Ime i prezime osiguranika',
        labelCyr: '5. Име и презиме осигураника',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'okolnost_vrsta',
        label: '6. Pravna okolnost osiguranja',
        labelCyr: '6. Правна околност осигурања',
        type: 'select',
        options: [
          { value: 'PRAKSA', label: 'Praktična nastava i ferijalna praksa učenika i studenata', labelCyr: 'Практична настава и феријална пракса ученика и студената' },
          { value: 'VOLONTIRANJE', label: 'Volonterski rad (Zakon o volontiranju FBiH)', labelCyr: 'Волонтерски рад (Закон о волонтирању ФБиХ)' },
          { value: 'STRUČNO_OSPOSOBLJAVANJE', label: 'Stručno osposobljavanje bez zasnivanja radnog odnosa', labelCyr: 'Стручно оспособљавање без заснивања радног односа' },
          { value: 'JAVNI_RADOVI', label: 'Učešće u javnim radovima i zaštiti/spašavanju', labelCyr: 'Учешће у јавним радовима и заштити/спашавању' },
        ],
        section: 'zaposlenje',
        required: true,
        defaultValue: 'PRAKSA',
      },
      {
        id: 'datum_pocetka',
        label: '7. Datum početka angažmana',
        labelCyr: '7. Датум почетка ангажмана',
        type: 'date',
        section: 'zaposlenje',
        required: true,
      },
      {
        id: 'datum_prestanka',
        label: '8. Datum prestanka angažmana',
        labelCyr: '8. Датум престанка ангажмана',
        type: 'date',
        section: 'zaposlenje',
        required: true,
      },
      {
        id: 'mjesto_podnosenja',
        label: '9. Mjesto i datum podnošenja',
        labelCyr: '9. Мјесто и датум подношења',
        type: 'text',
        section: 'potpis',
        required: true,
      },
    ],
    generateText: (v, script) => {
      const isCyr = script === 'cyr';
      const raw = `BOSNA I HERCEGOVINA
FEDERACIJA BOSNE I HERCEGOVINE
POREZNA UPRAVA FEDERACIJE BOSNE I HERCEGOVINE

OBRAZAC JS 3120
PRIJAVA / ODJAVA LICA OSIGURANIH U ODREĐENIM OKOLNOSTIMA
(Praksa, volontiranje, stručno osposobljavanje)

I. PODACI O ORGANIZATORU:
JIB: ${v.organizator_jib || '—'}
Naziv: ${v.organizator_naziv || '—'}

II. PODACI O OSIGURANIKU:
JMBG: ${v.osiguranik_jmbg || '—'}
Ime i prezime: ${v.osiguranik_ime_prezime || '—'}

III. OKOLNOSTI I PERIOD OSIGURANJA:
Okolnost: ${v.okolnost_vrsta || 'Praktična nastava učenika/studenata'}
Period: od ${v.datum_pocetka || '—'} do ${v.datum_prestanka || '—'}

Mjesto i datum: ${v.mjesto_podnosenja || '—'}
M.P.                                 Potpis ovlaštenog lica: ____________________`;

      return isCyr ? latinToCyrillic(raw) : raw;
    },
  },

  // =========================================================================
  // 4. RS BIH: PD 3100
  // =========================================================================
  {
    id: 'rs-pd-3100',
    code: 'PD 3100',
    title: 'Obrazac PD 3100 - Prijava / Promjena / Odjava uplate doprinosa RS',
    titleCyr: 'Образац ПД 3100 - Пријава / Промјена / Одјава уплате доприноса РС',
    subtitle: 'Jedinstveni sistem registracije, kontrole i naplate doprinosa Republike Srpske',
    subtitleCyr: 'Јединствени систем регистрације, контроле и наплате доприноса Републике Српске',
    entity: 'rs',
    entityName: 'Republika Srpska',
    authority: 'Poreska uprava Republike Srpske',
    authorityCyr: 'Пореска управа Републике Српске',
    legalBasis: 'Zakon o doprinosima RS ("Sl. glasnik RS", br. 114/17, 112/19, 61/21 i 119/21) i Pravilnik o Jedinstvenom sistemu registracije obveznika doprinosa',
    legalBasisCyr: 'Закон о доприносима РС ("Сл. гласник РС", бр. 114/17, 112/19, 61/21 и 119/21) и Правилник о Јединственом систему регистрације обвезника доприноса',
    archiveUrl: 'https://archive.org/details/pd-3100-prijava-odjava-uplate-doprinosa-rs-bi-h',
    isPremium: true,
    fields: [
      {
        id: 'vrsta_prijave',
        label: '1. Vrsta prijave',
        labelCyr: '1. Врста пријаве',
        type: 'select',
        options: VRSTA_PRIJAVE_OPTIONS,
        section: 'prijava',
        required: true,
        defaultValue: '1',
      },
      {
        id: 'uplatioc_jib',
        label: '2. JIB uplatioca doprinosa (poslodavca)',
        labelCyr: '2. ЈИБ уплатиоца доприноса (послодавца)',
        placeholder: '13 cifara (npr. 4400000000000)',
        type: 'text',
        section: 'poslodavac',
        required: true,
        validationRegex: '^[0-9]{13}$',
        validationHelp: 'JIB mora imati tačno 13 cifara',
      },
      {
        id: 'uplatioc_naziv',
        label: '3. Naziv poslodavca / preduzetnika',
        labelCyr: '3. Назив послодавца / предузетника',
        placeholder: 'Puni naziv pravnog lica ili SP',
        type: 'text',
        section: 'poslodavac',
        required: true,
      },
      {
        id: 'uplatioc_opstina_sifra',
        label: '4. Šifra opštine sjedišta poslodavca u RS',
        labelCyr: '4. Шифра општине сједишта послодавца у РС',
        placeholder: '3 cifre (npr. 002 za Banju Luku, 018 za Bijeljinu)',
        type: 'text',
        section: 'poslodavac',
        required: true,
      },
      {
        id: 'osiguranik_jmbg',
        label: '5. JMBG osiguranika',
        labelCyr: '5. ЈМБГ осигураника',
        placeholder: '13 cifara',
        type: 'text',
        section: 'osiguranik',
        required: true,
        validationRegex: '^[0-9]{13}$',
      },
      {
        id: 'osiguranik_prezime',
        label: '6. Prezime osiguranika',
        labelCyr: '6. Презиме осигураника',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'osiguranik_ime',
        label: '7. Ime osiguranika',
        labelCyr: '7. Име осигураника',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'osiguranik_ime_oca',
        label: '8. Ime oca / majke',
        labelCyr: '8. Име оца / мајке',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'osiguranik_prebivaliste',
        label: '9. Prebivalište i adresa',
        labelCyr: '9. Пребивалиште и адреса',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'osiguranik_opstina_sifra',
        label: '10. Šifra opštine prebivališta osiguranika',
        labelCyr: '10. Шифра општине пребивалишта осигураника',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'datum_pocetka_prestanka',
        label: '11. Datum početka / promjene / odjave',
        labelCyr: '11. Датум почетка / промјене / одјаве',
        type: 'date',
        section: 'zaposlenje',
        required: true,
      },
      {
        id: 'osnov_osiguranja',
        label: '12. Osnov osiguranja u RS',
        labelCyr: '12. Основ осигурања у РС',
        placeholder: '01 - Radni odnos kod pravnog lica',
        type: 'text',
        section: 'zaposlenje',
        required: true,
        defaultValue: '01 - Radni odnos',
      },
      {
        id: 'radno_vrijeme_sati',
        label: '13. Puno ili nepuno radno vrijeme (sati sedmično)',
        labelCyr: '13. Пуно или непуно радно вријеме (сати седмично)',
        type: 'number',
        section: 'zaposlenje',
        required: true,
        defaultValue: '40',
      },
      {
        id: 'zanimanje_naziv',
        label: '14. Naziv radnog mjesta / šifra zanimanja',
        labelCyr: '14. Назив радног мјеста / шифра занимања',
        type: 'text',
        section: 'zaposlenje',
        required: true,
      },
      {
        id: 'razlog_odjave',
        label: '15. Razlog odjave (samo kod odjave)',
        labelCyr: '15. Разлог одјаве (само код одјаве)',
        type: 'select',
        options: [{ value: '', label: '-- Nije odjava --', labelCyr: '-- Није одјава --' }, ...RAZLOG_ODJAVE_OPTIONS],
        section: 'zaposlenje',
      },
      {
        id: 'mjesto_datum',
        label: '16. Mjesto i datum ovjere',
        labelCyr: '16. Мјесто и датум овјере',
        type: 'text',
        section: 'potpis',
        required: true,
      },
      {
        id: 'odgovorno_lice',
        label: '17. Ime i prezime odgovornog lica',
        labelCyr: '17. Име и презиме одговорног лица',
        type: 'text',
        section: 'potpis',
        required: true,
      },
    ],
    generateText: (v, script) => {
      const isCyr = script === 'cyr';
      const vrTxt = VRSTA_PRIJAVE_OPTIONS.find(o => o.value === v.vrsta_prijave);
      const vrStr = (isCyr ? vrTxt?.labelCyr : vrTxt?.label) || v.vrsta_prijave || '1';

      const raw = `РЕПУБЛИКА СРПСКА
МИНИСТАРСТВО ФИНАНСИЈА
ПОРЕСКА УПРАВА РЕПУБЛИКЕ СРПСКЕ
ПОДРУЧНИ ЦЕНТАР / ИСПОСТАВА

ОБРАЗАЦ ПД 3100
ПРИЈАВА / ПРОМЈЕНА / ОДЈАВА УПЛАТЕ ДОПРИНОСА
Правни основ: Закон о доприносима Републике Српске ("Сл. гласник РС", бр. 114/17, 112/19, 61/21 и 119/21)

================================================================================
I. ПОДАЦИ О ПРИЈАВИ:
Врста пријаве: ${vrStr}

II. ПОДАЦИ О УПЛАТИОЦУ ДОПРИНОСА:
1. ЈИБ послодавца: ${v.uplatioc_jib || '—'}
2. Назив: ${v.uplatioc_naziv || '—'}
3. Шифра општине сједишта у РС: ${v.uplatioc_opstina_sifra || '—'}

III. ПОДАЦИ О ОСИГУРАНИКУ:
1. ЈМБГ: ${v.osiguranik_jmbg || '—'}
2. Презиме: ${v.osiguranik_prezime || '—'}
3. Име: ${v.osiguranik_ime || '—'}
4. Име оца/мајке: ${v.osiguranik_ime_oca || '—'}
5. Пребивалиште и адреса: ${v.osiguranik_prebivaliste || '—'}
6. Шифра општине пребивалишта: ${v.osiguranik_opstina_sifra || '—'}

IV. ПОДАЦИ О ОСИГУРАЊУ И РАДНОМ ВРИЈЕМЕНУ:
1. Датум почетка / промјене / одјаве: ${v.datum_pocetka_prestanka || '—'}
2. Основ осигурања: ${v.osnov_osiguranja || '01 - Радни однос'}
3. Седмично радно вријеме: ${v.radno_vrijeme_sati || '40'} сати
4. Назив радног мјеста: ${v.zanimanje_naziv || '—'}
5. Разлог одјаве: ${v.razlog_odjave || 'Није примјењиво'}

V. ОВЈЕРА И ПОТПИС:
Мјесто и датум: ${v.mjesto_datum || '—'}
Одговорно лице: ${v.odgovorno_lice || '—'}

М.П.                                 Потпис овлашћеног лица: ____________________

--------------------------------------------------------------------------------
ПРИЈЕМНИ ШТАМБИЉ ПОРЕСКЕ УПРАВЕ РЕПУБЛИКЕ СРПСКЕ:
Број протокола: _________________________
Датум пријема:   _________________________
Потпис службеника: _______________________`;

      return isCyr ? raw : raw; // Note: original is cyrillic by official RS standard, can be read in both
    },
  },

  // =========================================================================
  // 5. RS BIH: PD 3110
  // =========================================================================
  {
    id: 'rs-pd-3110',
    code: 'PD 3110',
    title: 'Obrazac PD 3110 - Prijava / Promjena / Odjava individualne uplate doprinosa RS',
    titleCyr: 'Образац ПД 3110 - Пријава / Промјена / Одјава индивидуалне уплате доприноса РС',
    subtitle: 'Samostalni preduzetnici, poljoprivrednici i samostalna zanimanja u RS',
    subtitleCyr: 'Самостални предузетници, пољопривредници и самостална занимања у РС',
    entity: 'rs',
    entityName: 'Republika Srpska',
    authority: 'Poreska uprava Republike Srpske',
    authorityCyr: 'Пореска управа Републике Српске',
    legalBasis: 'Zakon o doprinosima Republike Srpske',
    legalBasisCyr: 'Закон о доприносима Републике Српске',
    archiveUrl: 'https://archive.org/details/pd-3110-prijava-promjena-odjava-individualne-uplate-doprinosa-rs-bi-h',
    isPremium: true,
    fields: [
      {
        id: 'vrsta_prijave',
        label: '1. Vrsta prijave',
        labelCyr: '1. Врста пријаве',
        type: 'select',
        options: VRSTA_PRIJAVE_OPTIONS,
        section: 'prijava',
        required: true,
        defaultValue: '1',
      },
      {
        id: 'obveznik_jmbg',
        label: '2. JMBG nosioca osiguranja',
        labelCyr: '2. ЈМБГ носиоца осигурања',
        type: 'text',
        section: 'osiguranik',
        required: true,
        validationRegex: '^[0-9]{13}$',
      },
      {
        id: 'obveznik_ime_prezime',
        label: '3. Ime i prezime',
        labelCyr: '3. Име и презиме',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'djelatnost_vrsta',
        label: '4. Kategorija individualnog uplatioca u RS',
        labelCyr: '4. Категорија индивидуалног уплатиоца у РС',
        type: 'select',
        options: [
          { value: 'PREDUZETNIK', label: 'Samostalni preduzetnik (SP) - osnovna djelatnost', labelCyr: 'Самостални предузетник (СП) - основна дјелатност' },
          { value: 'POLJOPRIVREDNIK', label: 'Nosilac porodičnog poljoprivrednog gazdinstva', labelCyr: 'Носилац породичног пољопривредног газдинства' },
          { value: 'VJERSKI_SLUZBENIK', label: 'Vjerski službenik / vjerska zajednica', labelCyr: 'Вјерски службеник / вјерска заједница' },
          { value: 'DOBROVOLJNO', label: 'Lice van radnog odnosa (dobrovoljno osiguranje RS)', labelCyr: 'Лице ван радног односа (добровољно осигурање РС)' },
        ],
        section: 'zaposlenje',
        required: true,
        defaultValue: 'PREDUZETNIK',
      },
      {
        id: 'datum_pocetka',
        label: '5. Datum početka / promjene / prestanka',
        labelCyr: '5. Датум почетка / промјене / престанка',
        type: 'date',
        section: 'zaposlenje',
        required: true,
      },
      {
        id: 'osnovica_iznos',
        label: '6. Mjesečna osnovica za doprinose (u BAM)',
        labelCyr: '6. Мјесечна основица за доприносе (у БАМ)',
        type: 'number',
        section: 'obracun',
        required: true,
        defaultValue: '900',
      },
      {
        id: 'mjesto_datum',
        label: '7. Mjesto i datum podnošenja',
        labelCyr: '7. Мјесто и датум подношења',
        type: 'text',
        section: 'potpis',
        required: true,
      },
    ],
    generateText: (v, script) => {
      const isCyr = script === 'cyr';
      const raw = `РЕПУБЛИКА СРПСКА
ПОРЕСКА УПРАВА РЕПУБЛИКЕ СРПСКЕ

ОБРАЗАЦ ПД 3110
ПРИЈАВА / ПРОМЈЕНА / ОДЈАВА ИНДИВИДУАЛНЕ УПЛАТЕ ДОПРИНОСА
Правни основ: Закон о доприносима Републике Српске

I. ПОДАЦИ О ОБВЕЗНИКУ:
ЈМБГ: ${v.obveznik_jmbg || '—'}
Име и презиме: ${v.obveznik_ime_prezime || '—'}
Категорија: ${v.djelatnost_vrsta || 'Самостални предузетник'}

II. ОБРАЧУН ДОПРИНОСА:
Мјесечна основица: ${v.osnovica_iznos || '900'} БАМ
Датум почетка / промјене: ${v.datum_pocetka || '—'}

Мјесто и датум: ${v.mjesto_datum || '—'}
Потпис обвезника: ____________________________________`;

      return isCyr ? raw : raw;
    },
  },

  // =========================================================================
  // 6. RS BIH: PD 3120
  // =========================================================================
  {
    id: 'rs-pd-3120',
    code: 'PD 3120',
    title: 'Obrazac PD 3120 - Prijava uplate doprinosa u određenim okolnostima RS',
    titleCyr: 'Образац ПД 3120 - Пријава уплате доприноса у одређеним околностима РС',
    subtitle: 'Učenici/studenti na praksi i lica na prekvalifikaciji u Republici Srpskoj',
    subtitleCyr: 'Ученици/студенти на пракси и лица на преквалификацији у Републици Српској',
    entity: 'rs',
    entityName: 'Republika Srpska',
    authority: 'Poreska uprava Republike Srpske',
    authorityCyr: 'Пореска управа Републике Српске',
    legalBasis: 'Zakon o doprinosima RS i Zakon o PIO RS',
    legalBasisCyr: 'Закон о доприносима РС и Закон о ПИО РС',
    archiveUrl: 'https://archive.org/details/pd-3120-prijava-odjava-uplate-doprinosa-u-odredenim-okolnostima-rs-bi-h',
    isPremium: true,
    fields: [
      {
        id: 'organizator_jib',
        label: '1. JIB pravnog lica / obrazovne ustanove',
        labelCyr: '1. ЈИБ правног лица / образовне установе',
        type: 'text',
        section: 'poslodavac',
        required: true,
        validationRegex: '^[0-9]{13}$',
      },
      {
        id: 'organizator_naziv',
        label: '2. Naziv ustanove / preduzeća',
        labelCyr: '2. Назив установе / предузећа',
        type: 'text',
        section: 'poslodavac',
        required: true,
      },
      {
        id: 'osiguranik_jmbg',
        label: '3. JMBG učenika / studenta / lica na praksi',
        labelCyr: '3. ЈМБГ ученика / студента / лица на пракси',
        type: 'text',
        section: 'osiguranik',
        required: true,
        validationRegex: '^[0-9]{13}$',
      },
      {
        id: 'osiguranik_ime_prezime',
        label: '4. Ime i prezime osiguranika',
        labelCyr: '4. Име и презиме осигураника',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'okolnost_opis',
        label: '5. Okolnost osiguranja (praksa, volonterski rad)',
        labelCyr: '5. Околност осигурања (пракса, волонтерски рад)',
        type: 'text',
        section: 'zaposlenje',
        required: true,
        defaultValue: 'Praktična nastava i stručna praksa',
      },
      {
        id: 'period_trajanja',
        label: '6. Period trajanja prakse (od - do)',
        labelCyr: '6. Период трајања праксе (од - до)',
        type: 'text',
        section: 'zaposlenje',
        required: true,
      },
      {
        id: 'mjesto_datum',
        label: '7. Mjesto i datum',
        labelCyr: '7. Мјесто и датум',
        type: 'text',
        section: 'potpis',
        required: true,
      },
    ],
    generateText: (v, script) => {
      const isCyr = script === 'cyr';
      const raw = `РЕПУБЛИКА СРПСКА
ПОРЕСКА УПРАВА РЕПУБЛИКЕ СРПСКЕ

ОБРАЗАЦ ПД 3120
ПРИЈАВА / ОДЈАВА УПЛАТЕ ДОПРИНОСА У ОДРЕЂЕНИМ ОКОЛНОСТИМА

I. ПОДАЦИ О ОРГАНИЗАТОРУ ПРАКСЕ:
ЈИБ: ${v.organizator_jib || '—'}
Назив: ${v.organizator_naziv || '—'}

II. ПОДАЦИ О ОСИГУРАНИКУ:
ЈМБГ: ${v.osiguranik_jmbg || '—'}
Име и презиме: ${v.osiguranik_ime_prezime || '—'}

III. ОКОЛНОСТИ И ТРАЈАЊЕ:
Основ: ${v.okolnost_opis || 'Практична настава'}
Период: ${v.period_trajanja || '—'}

Мјесто и датум: ${v.mjesto_datum || '—'}
М.П.                                 Потпис: ____________________________`;

      return isCyr ? raw : raw;
    },
  },

  // =========================================================================
  // 7. BRČKO DISTRIKT: MIP-1023
  // =========================================================================
  {
    id: 'bd-mip-1023',
    code: 'MIP-1023',
    title: 'Obrazac MIP-1023 - Mjesečni izvještaj o platama i doprinosima Brčko Distrikt',
    titleCyr: 'Образац МИП-1023 - Мјесечни извјештај о платама и доприносима Брчко Дистрикт',
    subtitle: 'Porezi na dohodak i doprinosi poslodavca za zaposlenike u Brčko Distriktu BiH',
    subtitleCyr: 'Порези на доходак и доприноси послодавца за запосленике у Брчко Дистрикту БиХ',
    entity: 'bd',
    entityName: 'Brčko Distrikt BiH',
    authority: 'Direkcija za finansije Brčko Distrikta BiH - Poreska uprava',
    authorityCyr: 'Дирекција за финансије Брчко Дистрикта БиХ - Пореска управа',
    legalBasis: 'Zakon o porezu na dohodak Brčko Distrikta BiH ("Sl. glasnik BD", br. 60/10, 15/12 i 30/17)',
    legalBasisCyr: 'Закон о порезу на доходак Брчко Дистрикта БиХ ("Сл. гласник БД", бр. 60/10, 15/12 и 30/17)',
    archiveUrl: 'https://archive.org/details/mip-1023-distrikt-brcko',
    isPremium: true,
    fields: [
      {
        id: 'obracunski_period',
        label: '1. Poreski period (mjesec i godina)',
        labelCyr: '1. Порески период (мјесец и година)',
        placeholder: 'npr. 10/2026',
        type: 'text',
        section: 'prijava',
        required: true,
        defaultValue: '10/2026',
      },
      {
        id: 'poslodavac_jib',
        label: '2. JIB poslodavca / isplatioca',
        labelCyr: '2. ЈИБ послодавца / исплатиоца',
        placeholder: '13 cifara',
        type: 'text',
        section: 'poslodavac',
        required: true,
        validationRegex: '^[0-9]{13}$',
      },
      {
        id: 'poslodavac_naziv',
        label: '3. Puni naziv poslodavca',
        labelCyr: '3. Пуни назив послодавца',
        type: 'text',
        section: 'poslodavac',
        required: true,
      },
      {
        id: 'poslodavac_adresa',
        label: '4. Adresa u Brčko Distriktu',
        labelCyr: '4. Адреса у Брчко Дистрикту',
        type: 'text',
        section: 'poslodavac',
        required: true,
      },
      {
        id: 'zaposlenik_jmbg',
        label: '5. JMBG zaposlenika',
        labelCyr: '5. ЈМБГ запосленика',
        type: 'text',
        section: 'osiguranik',
        required: true,
        validationRegex: '^[0-9]{13}$',
      },
      {
        id: 'zaposlenik_ime_prezime',
        label: '6. Ime i prezime zaposlenika',
        labelCyr: '6. Име и презиме запосленика',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'pio_fond_izbor',
        label: '7. Izabrani entitetski fond PIO (specifičnost Brčko Distrikta)',
        labelCyr: '7. Изабрани ентитетски фонд ПИО (специфичност Брчко Дистрикта)',
        type: 'select',
        options: [
          { value: 'FOND_PIO_RS', label: '1 - Fond PIO Republike Srpske', labelCyr: '1 - Фонд ПИО Републике Српске' },
          { value: 'FZ_PIO_MIO_FBIH', label: '2 - Federalni zavod PIO/MIO Federacije BiH', labelCyr: '2 - Федерални завод ПИО/МИО Федерације БиХ' },
        ],
        section: 'zaposlenje',
        required: true,
        defaultValue: 'FOND_PIO_RS',
      },
      {
        id: 'bruto_plata',
        label: '8. Bruto iznos plate (BAM)',
        labelCyr: '8. Бруто износ плате (БАМ)',
        placeholder: 'npr. 1650.00',
        type: 'number',
        section: 'obracun',
        required: true,
        defaultValue: '1650.00',
      },
      {
        id: 'doprinos_pio',
        label: '9. Iznos doprinosa za PIO (BAM)',
        labelCyr: '9. Износ доприноса за ПИО (БАМ)',
        type: 'number',
        section: 'obracun',
        required: true,
        defaultValue: '305.25',
      },
      {
        id: 'doprinos_zdravstvo',
        label: '10. Iznos doprinosa za zdravstveno osiguranje BD (BAM)',
        labelCyr: '10. Износ доприноса за здравствено осигурање БД (БАМ)',
        type: 'number',
        section: 'obracun',
        required: true,
        defaultValue: '198.00',
      },
      {
        id: 'porez_na_dohodak',
        label: '11. Obračunati porez na dohodak (10%) (BAM)',
        labelCyr: '11. Обрачунати порез на доходак (10%) (БАМ)',
        type: 'number',
        section: 'obracun',
        required: true,
        defaultValue: '84.60',
      },
      {
        id: 'mjesto_datum',
        label: '12. Mjesto i datum podnošenja',
        labelCyr: '12. Мјесто и датум подношења',
        type: 'text',
        section: 'potpis',
        required: true,
        defaultValue: 'Brčko',
      },
      {
        id: 'odgovorno_lice',
        label: '13. Odgovorno lice / ovlašteni računovođa',
        labelCyr: '13. Одговорно лице / овлаштени рачуновођа',
        type: 'text',
        section: 'potpis',
        required: true,
      },
    ],
    generateText: (v, script) => {
      const isCyr = script === 'cyr';
      const fondLabel = v.pio_fond_izbor === 'FZ_PIO_MIO_FBIH'
        ? (isCyr ? 'Федерални завод ПИО/МИО ФБиХ' : 'Federalni zavod PIO/MIO FBiH')
        : (isCyr ? 'Фонд ПИО Републике Српске' : 'Fond PIO Republike Srpske');

      const raw = `BOSNA I HERCEGOVINA
BRČKO DISTRIKT BOSNE I HERCEGOVINE
DIREKCIJA ZA FINANSIJE - PORESKA UPRAVA BRČKO DISTRIKTA BiH

OBRAZAC MIP-1023
MJESEČNI IZVJEŠTAJ O ISPLAĆENIM PLATAMA, KORISTIMA I UPLAĆENIM DOPRINOSIMA
Za poreski period: ${v.obracunski_period || '10/2026'}
Pravni osnov: Zakon o porezu na dohodak Brčko Distrikta BiH ("Sl. glasnik BD", br. 60/10, 15/12 i 30/17)

================================================================================
I. PODACI O POSLODAVCU / ISPLATIOCU:
1. JIB poslodavca: ${v.poslodavac_jib || '—'}
2. Puni naziv: ${v.poslodavac_naziv || '—'}
3. Adresa u Brčko Distriktu: ${v.poslodavac_adresa || '—'}

================================================================================
II. ANALITIČKI PODACI O ZAPOSLENIKU:
1. JMBG zaposlenika: ${v.zaposlenik_jmbg || '—'}
2. Ime i prezime: ${v.zaposlenik_ime_prezime || '—'}
3. Opredijeljeni entitetski fond PIO: ${fondLabel}

================================================================================
III. OBRAČUNATI POREZI I DOPRINOSI:
1. Bruto osnovica: ${v.bruto_plata || '0.00'} BAM
2. Doprinos za PIO (entitetskom fondu): ${v.doprinos_pio || '0.00'} BAM
3. Doprinos za zdravstvo (Fond zdravstvenog osiguranja BD): ${v.doprinos_zdravstvo || '0.00'} BAM
4. Porez na dohodak (10%): ${v.porez_na_dohodak || '0.00'} BAM

================================================================================
IV. POTVRDA I OVJERA:
Izjavljujem da su iskazani podaci u potpunosti tačni i usklađeni sa stvarno
isplaćenim platama i uplaćenim obavezama na račune javnih prihoda Brčko Distrikta BiH.

Mjesto i datum: ${v.mjesto_datum || 'Brčko'}, ${new Date().toLocaleDateString('bs-BA')}
Odgovorno lice / Računovođa: ${v.odgovorno_lice || '—'}

M.P.                                 Potpis: ____________________________`;

      return isCyr ? latinToCyrillic(raw) : raw;
    },
  },

  // =========================================================================
  // 8. BRČKO DISTRIKT: JS-BD (MS Obrazac)
  // =========================================================================
  {
    id: 'bd-js-ms',
    code: 'JS-BD / MS',
    title: 'Obrazac JS-BD / MS - Prijava i odjava zaposlenika Brčko Distrikt',
    titleCyr: 'Образац ЈС-БД / МС - Пријава и одјава запосленика Брчко Дистрикт',
    subtitle: 'Standardizovani obrazac prijave radnika za poslodavce u Brčko Distriktu BiH',
    subtitleCyr: 'Стандардизовани образац пријаве радника за послодавце у Брчко Дистрикту БиХ',
    entity: 'bd',
    entityName: 'Brčko Distrikt BiH',
    authority: 'Direkcija za finansije Brčko Distrikta BiH i Fond zdravstvenog osiguranja BD',
    authorityCyr: 'Дирекција за финансије Брчко Дистрикта БиХ и Фонд здравственог осигурања БД',
    legalBasis: 'Zakon o radu Brčko Distrikta BiH i Sporazum o primjeni Jedinstvenog sistema osiguranja',
    legalBasisCyr: 'Закон о раду Брчко Дистрикта БиХ и Споразум о примјени Јединственог система осигурања',
    archiveUrl: 'https://archive.org/details/mip-1023-distrikt-brcko',
    isPremium: true,
    fields: [
      {
        id: 'vrsta_prijave',
        label: '1. Vrsta prijave',
        labelCyr: '1. Врста пријаве',
        type: 'select',
        options: VRSTA_PRIJAVE_OPTIONS,
        section: 'prijava',
        required: true,
        defaultValue: '1',
      },
      {
        id: 'poslodavac_jib',
        label: '2. JIB poslodavca u Brčko Distriktu',
        labelCyr: '2. ЈИБ послодавца у Брчко Дистрикту',
        type: 'text',
        section: 'poslodavac',
        required: true,
        validationRegex: '^[0-9]{13}$',
      },
      {
        id: 'poslodavac_naziv',
        label: '3. Naziv poslodavca',
        labelCyr: '3. Назив послодавца',
        type: 'text',
        section: 'poslodavac',
        required: true,
      },
      {
        id: 'osiguranik_jmbg',
        label: '4. JMBG radnika',
        labelCyr: '4. ЈМБГ радника',
        type: 'text',
        section: 'osiguranik',
        required: true,
        validationRegex: '^[0-9]{13}$',
      },
      {
        id: 'osiguranik_prezime_ime',
        label: '5. Prezime i ime radnika',
        labelCyr: '5. Презиме и име радника',
        type: 'text',
        section: 'osiguranik',
        required: true,
      },
      {
        id: 'pio_fond',
        label: '6. Izbor penzijskog fonda (PIO)',
        labelCyr: '6. Избор пензијског фонда (ПИО)',
        type: 'select',
        options: [
          { value: 'PIO_RS', label: 'Fond PIO Republike Srpske', labelCyr: 'Фонд ПИО Републике Српске' },
          { value: 'PIO_FBIH', label: 'Federalni zavod za penzijsko i invalidsko osiguranje (FBiH)', labelCyr: 'Федерални завод за пензијско и инвалидско осигурање (ФБиХ)' },
        ],
        section: 'zaposlenje',
        required: true,
        defaultValue: 'PIO_RS',
      },
      {
        id: 'datum_pocetka',
        label: '7. Datum početka / prestanka radnog odnosa',
        labelCyr: '7. Датум почетка / престанка радног односа',
        type: 'date',
        section: 'zaposlenje',
        required: true,
      },
      {
        id: 'radno_vrijeme',
        label: '8. Sedmični fond radnih sati',
        labelCyr: '8. Седмични фонд радних сати',
        type: 'number',
        section: 'zaposlenje',
        required: true,
        defaultValue: '40',
      },
      {
        id: 'naziv_posla',
        label: '9. Naziv radnog mjesta',
        labelCyr: '9. Назив радног мјеста',
        type: 'text',
        section: 'zaposlenje',
        required: true,
      },
      {
        id: 'mjesto_datum',
        label: '10. Mjesto i datum',
        labelCyr: '10. Мјесто и датум',
        type: 'text',
        section: 'potpis',
        required: true,
        defaultValue: 'Brčko Distrikt',
      },
      {
        id: 'odgovorno_lice',
        label: '11. Odgovorno lice',
        labelCyr: '11. Одговорно лице',
        type: 'text',
        section: 'potpis',
        required: true,
      },
    ],
    generateText: (v, script) => {
      const isCyr = script === 'cyr';
      const fondTxt = v.pio_fond === 'PIO_FBIH'
        ? (isCyr ? 'Федерални завод ПИО/МИО ФБиХ' : 'Federalni zavod PIO/MIO FBiH')
        : (isCyr ? 'Фонд ПИО Републике Српске' : 'Fond PIO Republike Srpske');

      const raw = `BOSNA I HERCEGOVINA
BRČKO DISTRIKT BOSNE I HERCEGOVINE
ODJELJENJE ZA STRUČNE I ADMINISTRATIVNE POSLOVE
FOND ZDRAVSTVENOG OSIGURANJA BRČKO DISTRIKTA BiH

OBRAZAC JS-BD / MS
PRIJAVA I EVIDENCIJA OSIGURANIKA U BRČKO DISTRIKTU BiH

I. POSLODAVAC:
JIB: ${v.poslodavac_jib || '—'}
Naziv: ${v.poslodavac_naziv || '—'}

II. OSIGURANIK:
JMBG: ${v.osiguranik_jmbg || '—'}
Prezime i ime: ${v.osiguranik_prezime_ime || '—'}

III. PARAMETRI ZAPOSLENJA I OSIGURANJA:
Izabrani fond PIO: ${fondTxt}
Fond zdravstva: Fond zdravstvenog osiguranja Brčko Distrikta BiH
Datum početka / prestanka: ${v.datum_pocetka || '—'}
Radno vrijeme: ${v.radno_vrijeme || '40'} sati sedmično
Radno mjesto: ${v.naziv_posla || '—'}

Mjesto i datum: ${v.mjesto_datum || 'Brčko'}, ${new Date().toLocaleDateString('bs-BA')}
Odgovorno lice: ${v.odgovorno_lice || '—'}

M.P.                                 Potpis: ____________________________`;

      return isCyr ? latinToCyrillic(raw) : raw;
    },
  },
];

/**
 * Validacija JMBG formata (13 cifara i provjera kontrolne cifre po modulu 11)
 */
export function validateJMBG(jmbg: string): { valid: boolean; message?: string } {
  if (!jmbg) return { valid: false, message: 'JMBG je obavezno polje.' };
  const clean = jmbg.trim();
  if (!/^\d{13}$/.test(clean)) {
    return { valid: false, message: 'JMBG mora sadržavati tačno 13 cifara.' };
  }

  // Modul 11 kontrolna cifra
  const a = clean.split('').map(Number);
  const sum =
    7 * (a[0] + a[6]) +
    6 * (a[1] + a[7]) +
    5 * (a[2] + a[8]) +
    4 * (a[3] + a[9]) +
    3 * (a[4] + a[10]) +
    2 * (a[5] + a[11]);

  const rem = sum % 11;
  let k = 11 - rem;
  if (k === 11) k = 0;

  if (k === 10 || k !== a[12]) {
    return { valid: false, message: 'Neispravan JMBG (kontrolna cifra se ne poklapa).' };
  }

  return { valid: true };
}

/**
 * Validacija JIB-a (13 cifara)
 */
export function validateJIB(jib: string): { valid: boolean; message?: string } {
  if (!jib) return { valid: false, message: 'JIB je obavezno polje.' };
  const clean = jib.trim();
  if (!/^\d{13}$/.test(clean)) {
    return { valid: false, message: 'JIB mora sadržavati tačno 13 cifara.' };
  }
  return { valid: true };
}
