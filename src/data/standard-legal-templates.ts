/**
 * Standardni pravni šabloni za Generator (dostupni i u offline režimu)
 */

import type { TextDocumentTemplate } from '../lib/text-templates-service';

export const FALLBACK_STANDARD_TEMPLATES: TextDocumentTemplate[] = [
  {
    id: 'ugovor-o-zakupu-stana',
    slug: 'ugovor-o-zakupu',
    title_bs: 'Ugovor o zakupu stana / poslovnog prostora',
    title_sr: 'Уговор о закупу стана / пословног простора',
    title_hr: 'Ugovor o najmu stana / poslovnog prostora',
    category: 'Građansko pravo',
    description_bs: 'Standardni ugovor o zakupu nekretnine sa pravima, obavezama, depozitom i otkaznim rokom prema Zakonu o obligacionim odnosima.',
    icon_name: 'Building2',
    created_at: '2026-01-01T00:00:00.000Z',
    form_fields: [
      { id: 'zakupodavac', type: 'text', label: 'Ime i prezime / Naziv zakupodavca', required: true },
      { id: 'zakupodavac_jmbg', type: 'text', label: 'JMBG / JIB zakupodavca', required: true },
      { id: 'zakupac', type: 'text', label: 'Ime i prezime / Naziv zakupca', required: true },
      { id: 'zakupac_jmbg', type: 'text', label: 'JMBG / JIB zakupca', required: true },
      { id: 'adresa_nekretnine', type: 'text', label: 'Adresa i opis nekretnine', required: true },
      { id: 'iznos_zakupnine', type: 'text', label: 'Iznos mjesečne zakupnine (u BAM)', required: true },
      { id: 'dan_uplate', type: 'text', label: 'Rok uplate u mjesecu (npr. do 5. u mjesecu)', required: true },
      { id: 'trajanje_ugovora', type: 'text', label: 'Trajanje zakupa (npr. 1 godina / neodređeno)', required: true },
      { id: 'otkazni_rok', type: 'text', label: 'Otkazni rok (npr. 30 dana)', required: true },
      { id: 'mjesto_datum', type: 'text', label: 'Mjesto i datum zaključenja', required: true },
    ],
    template_text: {
      bs: {
        title: 'UGOVOR O ZAKUPU STANA / NEKRETNINE',
        legal_basis: 'Zaključen u skladu sa odredbama Zakona o obligacionim odnosima ("Sl. list RBiH", br. 2/92, 13/93 i 13/94)',
        body: `Član 1. UGOVORNE STRANE
Zakupodavac: {{zakupodavac}}, JMBG/JIB: {{zakupodavac_jmbg}}
Zakupac: {{zakupac}}, JMBG/JIB: {{zakupac_jmbg}}

Član 2. PREDMET UGOVORA
Zakupodavac daje, a Zakupac prima u zakup nekretninu koja se nalazi na adresi:
{{adresa_nekretnine}}, u viđenom stanju za potrebe stanovanja / obavljanja poslovanja.

Član 3. ZAKUPNINA I REŽIJSKI TROŠKOVI
Mjesečna zakupnina iznosi {{iznos_zakupnine}} BAM (konvertibilnih maraka).
Zakupac se obavezuje zakupninu plaćati {{dan_uplate}}.
Pored zakupnine, Zakupac snosi sve redovne režijske troškove (struja, voda, grijanje, internet).

Član 4. TRAJANJE I OTKAZ
Ugovor se zaključuje na period: {{trajanje_ugovora}}.
Svaka ugovorna strana može otkazati ovaj ugovor uz otkazni rok od {{otkazni_rok}}.

Zaključeno u {{mjesto_datum}} u 2 (dva) istovjetna primjerka.

ZAKUPODAVAC: _________________________       ZAKUPAC: _________________________`,
      },
      sr_cyr: {
        title: 'УГОВОР О ЗАКУПУ СТАНА / НЕПОКРЕТНОСТИ',
        legal_basis: 'Закључен у складу са одредбама Закона о облигационим односима',
        body: `Члан 1. УГОВОРНЕ СТРАНЕ
Закуподавац: {{zakupodavac}}, ЈМБГ/ЈИБ: {{zakupodavac_jmbg}}
Закупац: {{zakupac}}, ЈМБГ/ЈИБ: {{zakupac_jmbg}}

Члан 2. ПРЕДМЕТ УГОВОРА
Закуподавац даје, а Закупац прима у закуп непокретност која се налази на адреси:
{{adresa_nekretnine}}, у виђеном стању.

Члан 3. ЗАКУПНИНА И ТРОШКОВИ
Мјесечна закупнина износи {{iznos_zakupnine}} БАМ.
Закупац се обавезује плаћати закупнину {{dan_uplate}}.

Члан 4. ТРАЈАЊЕ И ОТКАЗНИ РОК
Уговор се закључује на период: {{trajanje_ugovora}}.
Отказни рок износи {{otkazni_rok}}.

Закључено у {{mjesto_datum}} у два истовјетна примјерка.

ЗАКУПОДАВАЦ: _________________________       ЗАКУПАЦ: _________________________`,
      },
      hr: {
        title: 'UGOVOR O NAJMU STANA / POSLOVNOG PROSTORA',
        legal_basis: 'Sklopljen sukladno odredbama Zakona o obveznim odnosima',
        body: `Članak 1. UGOVORNE STRANE
Najmodavac: {{zakupodavac}}, JMBG/OIB: {{zakupodavac_jmbg}}
Najmoprimac: {{zakupac}}, JMBG/OIB: {{zakupac_jmbg}}

Članak 2. PREDMET UGOVORA
Najmodavac daje, a Najmoprimac prima u najam prostor na adresi:
{{adresa_nekretnine}}, u viđenom stanju.

Članak 3. NAJAMNINA I REŽIJSKI TROŠKOVI
Mjesečna najamnina iznosi {{iznos_zakupnine}} KM.
Najmoprimac plaća najamninu {{dan_uplate}}.

Članak 4. TRAJANJE I OTKAZ
Ugovor se sklapa na razdoblje: {{trajanje_ugovora}}.
Otkazni rok iznosi {{otkazni_rok}}.

Sklopljeno u {{mjesto_datum}} u 2 (dva) istovjetna primjerka.

NAJMODAVAC: _________________________       NAJMOPRIMAC: _________________________`,
      },
    },
  },
  {
    id: 'opsta-punomoc',
    slug: 'opsta-punomoc',
    title_bs: 'Opšta punomoć za zastupanje pred organima uprave',
    title_sr: 'Општа пуномоћ за заступање пред органима управе',
    title_hr: 'Opća punomoć za zastupanje pred tijelima uprave',
    category: 'Upravno pravo',
    description_bs: 'Pravna punomoć za predaju i preuzimanje dokumenata, podnošenje zahtjeva i zastupanje pred općinskim i kantonalnim organima.',
    icon_name: 'Stamp',
    created_at: '2026-01-01T00:00:00.000Z',
    form_fields: [
      { id: 'vlastodavac', type: 'text', label: 'Ime i prezime vlastodavca (ko daje punomoć)', required: true },
      { id: 'vlastodavac_jmbg', type: 'text', label: 'JMBG vlastodavca', required: true },
      { id: 'vlastodavac_adresa', type: 'text', label: 'Adresa i prebivalište vlastodavca', required: true },
      { id: 'punomocnik', type: 'text', label: 'Ime i prezime punomoćnika (kome se daje)', required: true },
      { id: 'punomocnik_jmbg', type: 'text', label: 'JMBG punomoćnika', required: true },
      { id: 'obim_ovlastenja', type: 'textarea', label: 'Obim poslova i ovlaštenja', required: true },
      { id: 'mjesto_datum', type: 'text', label: 'Mjesto i datum', required: true },
    ],
    template_text: {
      bs: {
        title: 'P U N O M O Ć',
        legal_basis: 'Na osnovu člana 89-94. Zakona o obligacionim odnosima i Zakona o upravnom postupku',
        body: `Ja, {{vlastodavac}}, sa prebivalištem na adresi {{vlastodavac_adresa}}, JMBG: {{vlastodavac_jmbg}},

OVLAŠĆUJEM:

{{punomocnik}}, JMBG: {{punomocnik_jmbg}},
da u moje ime i za moj račun može preduzimati sljedeće pravne i upravne radnje:

{{obim_ovlastenja}}

Ova punomoć važi do njenog opoziva ili okončanja navedenih poslova.

U {{mjesto_datum}}

DAVALAC PUNOMOĆI:
__________________________________
(Potpis vlastodavca)`,
      },
      sr_cyr: {
        title: 'П У Н О М О Ћ',
        legal_basis: 'На основу одредби Закона о облигационим односима и Закона о управном поступку',
        body: `Ја, {{vlastodavac}}, са пребивалиштем на адреси {{vlastodavac_adresa}}, ЈМБГ: {{vlastodavac_jmbg}},

ОВЛАШЋУЈЕМ:

{{punomocnik}}, ЈМБГ: {{punomocnik_jmbg}},
да у моје име и за мој рачун може предузимати сљедеће правне и управне радње:

{{obim_ovlastenja}}

Ова пуномоћ важи до њеног опозива или окончања наведених послова.

У {{mjesto_datum}}

ДАВАЛАЦ ПУНОМОЋИ:
__________________________________
(Потпис властодавца)`,
      },
      hr: {
        title: 'P U N O M O Ć',
        legal_basis: 'Na temelju odredbi Zakona o obveznim odnosima i Zakona o općem upravnom postupku',
        body: `Ja, {{vlastodavac}}, s prebivalištem na adresi {{vlastodavac_adresa}}, JMBG: {{vlastodavac_jmbg}},

OVLAŠĆUJEM:

{{punomocnik}}, JMBG: {{punomocnik_jmbg}},
da u moje ime i za moj račun može poduzimati sljedeće pravne i upravne radnje:

{{obim_ovlastenja}}

Ova punomoć vrijedi do njezina opoziva ili dovršetka navedenih poslova.

U {{mjesto_datum}}

DAVATELJ PUNOMOĆI:
__________________________________
(Potpis vlastodavca)`,
      },
    },
  },
  {
    id: 'zahtjev-pristup-informacijama',
    slug: 'zahtjev-pristup-informacijama',
    title_bs: 'Zahtjev za slobodan pristup informacijama',
    title_sr: 'Захтјев за слободан приступ информацијама',
    title_hr: 'Zahtjev za slobodan pristup informacijama',
    category: 'Upravni postupak',
    description_bs: 'Zvanični zahtjev na osnovu Zakona o slobodi pristupa informacijama u BiH / FBiH / RS.',
    icon_name: 'SearchCheck',
    created_at: '2026-01-01T00:00:00.000Z',
    form_fields: [
      { id: 'organ_naziv', type: 'text', label: 'Naziv javnog organa / institucije', required: true },
      { id: 'podnosilac', type: 'text', label: 'Ime i prezime / Naziv podnosioca', required: true },
      { id: 'podnosilac_adresa', type: 'text', label: 'Adresa podnosioca i kontakt telefon', required: true },
      { id: 'opis_informacije', type: 'textarea', label: 'Opis traženih informacija i dokumenata', required: true },
      { id: 'nacin_dostave', type: 'text', label: 'Način dostave (npr. e-mailom ili poštom)', required: true },
      { id: 'mjesto_datum', type: 'text', label: 'Mjesto i datum', required: true },
    ],
    template_text: {
      bs: {
        title: 'ZAHTJEV ZA SLOBODAN PRISTUP INFORMACIJAMA',
        legal_basis: 'Na osnovu Zakona o slobodi pristupa informacijama u Bosni i Hercegovini',
        body: `PREDMET: Zahtjev za pristup informacijama

Organu javne vlasti: {{organ_naziv}}

Podnosilac zahtjeva: {{podnosilac}}
Adresa: {{podnosilac_adresa}}

Molim Vas da mi u zakonskom roku od 15 dana omogućite pristup sljedećim informacijama odnosno dostavite kopije dokumenata:

{{opis_informacije}}

Tražene informacije molim dostaviti na sljedeći način: {{nacin_dostave}}.

U {{mjesto_datum}}

Podnosilac zahtjeva:
__________________________________`,
      },
      sr_cyr: {
        title: 'ЗАХТЈЕВ ЗА СЛОБОДАН ПРИСТУП ИНФОРМАЦИЈАМА',
        legal_basis: 'На основу Закона о слободи приступа информацијама у Босни и Херцеговини',
        body: `ПРЕДМЕТ: Захтјев за приступ информацијама

Органу јавне власти: {{organ_naziv}}

Подносилац захтјева: {{podnosilac}}
Адреса: {{podnosilac_adresa}}

Молим Вас да ми у законском року од 15 дана омогућите приступ сљедећим информацијама односно доставите копије докумената:

{{opis_informacije}}

Тражене информације молим доставити на сљедећи начин: {{nacin_dostave}}.

У {{mjesto_datum}}

Подносилац захтјева:
__________________________________`,
      },
      hr: {
        title: 'ZAHTJEV ZA SLOBODAN PRISTUP INFORMACIJAMA',
        legal_basis: 'Na temelju Zakona o slobodi pristupa informacijama u Bosni i Hercegovini',
        body: `PREDMET: Zahtjev za pristup informacijama

Tijelu javne vlasti: {{organ_naziv}}

Podnositelj zahtjeva: {{podnosilac}}
Adresa: {{podnosilac_adresa}}

Molim Vas da mi u zakonskom roku od 15 dana omogućite pristup sljedećim informacijama odnosno dostavite preslike dokumenata:

{{opis_informacije}}

Tražene informacije molim dostaviti na sljedeći način: {{nacin_dostave}}.

U {{mjesto_datum}}

Podnositelj zahtjeva:
__________________________________`,
      },
    },
  },
  {
    id: 'zahtjev-izdavanje-uvjerenja',
    slug: 'zahtjev-izdavanje-uvjerenja',
    title_bs: 'Zahtjev za izdavanje uvjerenja iz službene evidencije',
    title_sr: 'Захтјев за издавање увјерења из службене евиденције',
    title_hr: 'Zahtjev za izdavanje uvjerenja iz službene evidencije',
    category: 'Upravni postupak',
    description_bs: 'Univerzalni zahtjev za izdavanje uvjerenja o činjenicama o kojima organ vodi službenu evidenciju (čl. 169 ZUP BiH / FBiH / RS).',
    icon_name: 'FileCheck2',
    created_at: '2026-01-01T00:00:00.000Z',
    form_fields: [
      { id: 'organ_naziv', type: 'text', label: 'Nadležni organ / općinska služba', required: true },
      { id: 'podnosilac', type: 'text', label: 'Ime i prezime podnosioca', required: true },
      { id: 'podnosilac_jmbg', type: 'text', label: 'JMBG podnosioca', required: true },
      { id: 'podnosilac_adresa', type: 'text', label: 'Adresa i kontakt telefon', required: true },
      { id: 'svrha_uvjerenja', type: 'text', label: 'Svrha u koju će uvjerenje služiti', required: true },
      { id: 'mjesto_datum', type: 'text', label: 'Mjesto i datum', required: true },
    ],
    template_text: {
      bs: {
        title: 'ZAHTJEV ZA IZDAVANJE UVJERENJA',
        legal_basis: 'Na osnovu člana 169. Zakona o upravnom postupku',
        body: `PREDMET: Zahtjev za izdavanje uvjerenja o činjenicama iz službene evidencije

Nadležnom organu: {{organ_naziv}}

Podnosilac zahtjeva: {{podnosilac}}
JMBG: {{podnosilac_jmbg}}
Adresa stanovanja: {{podnosilac_adresa}}

Obraćam se naslovu sa zahtjevom da mi se izda zvanično uvjerenje o činjenicama o kojima ovaj organ vodi službenu evidenciju.

Navedeno uvjerenje mi je potrebno u svrhu:
{{svrha_uvjerenja}}, te se u druge svrhe ne može upotrijebiti.

U {{mjesto_datum}}

Podnosilac zahtjeva:
__________________________________`,
      },
      sr_cyr: {
        title: 'ЗАХТЈЕВ ЗА ИЗДАВАЊЕ УВЈЕРЕЊА',
        legal_basis: 'На основу одредби Закона о општем управном поступку',
        body: `ПРЕДМЕТ: Захтјев за издавање увјерења о чињеницама из службене евиденције

Надлежном органу: {{organ_naziv}}

Подносилац захтјева: {{podnosilac}}
ЈМБГ: {{podnosilac_jmbg}}
Адреса становања: {{podnosilac_adresa}}

Обраћам се наслову са захтјевом да ми се изда званично увјерење о чињеницама о којима овај орган води службену евиденцију.

Наведено увјерење ми је потребно у сврху:
{{svrha_uvjerenja}}, те се у друге сврхе не може употријебити.

У {{mjesto_datum}}

Подносилац захтјева:
__________________________________`,
      },
      hr: {
        title: 'ZAHTJEV ZA IZDAVANJE UVJERENJA',
        legal_basis: 'Na temelju odredbi Zakona o upravnom postupku',
        body: `PREDMET: Zahtjev za izdavanje uvjerenja o činjenicama iz službene evidencije

Nadležnom tijelu: {{organ_naziv}}

Podnositelj zahtjeva: {{podnosilac}}
JMBG: {{podnosilac_jmbg}}
Adresa stanovanja: {{podnosilac_adresa}}

Obraćam se naslovu sa zahtjevom da mi se izda službeno uvjerenje o činjenicama o kojima ovo tijelo vodi službenu evidenciju.

Navedeno uvjerenje mi je potrebno u svrhu:
{{svrha_uvjerenja}}, te se u druge svrhe ne može upotrijebiti.

U {{mjesto_datum}}

Podnositelj zahtjeva:
__________________________________`,
      },
    },
  },
  {
    id: 'zalba-upravni-postupak',
    slug: 'zalba-upravni-postupak',
    title_bs: 'Žalba na prvostepeno rješenje organa uprave',
    title_sr: 'Жалба на првостепено рјешење органа управе',
    title_hr: 'Žalba na prvostupanjsko rješenje tijela uprave',
    category: 'Upravno pravo',
    description_bs: 'Pravovremena žalba drugostepenom organu protiv prvostepenog upravnog akta ili rješenja općinske službe.',
    icon_name: 'ShieldCheck',
    created_at: '2026-01-01T00:00:00.000Z',
    form_fields: [
      { id: 'prvostepeni_organ', type: 'text', label: 'Prvostepeni organ (donosilac rješenja)', required: true },
      { id: 'broj_rjesenja', type: 'text', label: 'Broj i datum pobijanog rješenja', required: true },
      { id: 'podnosilac_zalbe', type: 'text', label: 'Ime i prezime / Naziv žalioca', required: true },
      { id: 'podnosilac_jmbg', type: 'text', label: 'JMBG žalioca', required: true },
      { id: 'razlozi_zalbe', type: 'textarea', label: 'Razlozi žalbe i obrazloženje nepravilnosti', required: true },
      { id: 'prijedlog_odluke', type: 'text', label: 'Prijedlog (poništenje, preinaka ili vraćanje na ponovni postupak)', required: true },
      { id: 'mjesto_datum', type: 'text', label: 'Mjesto i datum podnošenja', required: true },
    ],
    template_text: {
      bs: {
        title: 'Ž A L B A',
        legal_basis: 'Uložena u skladu sa odredbama Zakona o upravnom postupku',
        body: `PREDMET: Žalba na rješenje broj: {{broj_rjesenja}}

DRUGOSTEPENOM ORGANU
putem prvostepenog organa: {{prvostepeni_organ}}

ŽALILAC: {{podnosilac_zalbe}}, JMBG: {{podnosilac_jmbg}}

Pravovremeno izjavljujem žalbu na rješenje prvostepenog organa broj {{broj_rjesenja}}, iz sljedećih razloga:

{{razlozi_zalbe}}

PRIJEDLOG:
Predlažem da drugostepeni organ uvaži ovu žalbu i donese odluku o:
{{prijedlog_odluke}}.

U {{mjesto_datum}}

ŽALILAC:
__________________________________`,
      },
      sr_cyr: {
        title: 'Ж А Л Б А',
        legal_basis: 'Уложена у складу са одредбама Закона о управном поступку',
        body: `ПРЕДМЕТ: Жалба на рјешење број: {{broj_rjesenja}}

ДРУГОСТЕПЕНОМ ОРГАНУ
путем првостепеног органа: {{prvostepeni_organ}}

ЖАЛИЛАЦ: {{podnosilac_zalbe}}, ЈМБГ: {{podnosilac_jmbg}}

Правовремено изјављујем жалбу на рјешење првостепеног органа број {{broj_rjesenja}}, из сљедећих разлога:

{{razlozi_zalbe}}

ПРИЈЕДЛОГ:
Предлажем да другостепени орган уважи ову жалбу и донесе одлуку о:
{{prijedlog_odluke}}.

У {{mjesto_datum}}

ЖАЛИЛАЦ:
__________________________________`,
      },
      hr: {
        title: 'Ž A L B A',
        legal_basis: 'Podnesena sukladno odredbama Zakona o općem upravnom postupku',
        body: `PREDMET: Žalba na rješenje broj: {{broj_rjesenja}}

DRUGOSTUPANJSKOM TIJELU
putem prvostupanjskog tijela: {{prvostepeni_organ}}

ŽALITELJ: {{podnosilac_zalbe}}, JMBG: {{podnosilac_jmbg}}

Pravodobno podnosim žalbu na rješenje prvostupanjskog tijela broj {{broj_rjesenja}}, iz sljedećih razloga:

{{razlozi_zalbe}}

PRIJEDLOG:
Predlažem da drugostupanjsko tijelo uvaži ovu žalbu i donese odluku o:
{{prijedlog_odluke}}.

U {{mjesto_datum}}

ŽALITELJ:
__________________________________`,
      },
    },
  },
];
