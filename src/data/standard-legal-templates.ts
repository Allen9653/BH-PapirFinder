/**
 * Rezervni standardni pravni šabloni za Generator ako Supabase tabela nije dostupna
 */

import { TextDocumentTemplate } from '../lib/text-templates-service';

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
    created_at: new Date().toISOString(),
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
        legalBasis: 'Zaključen u skladu sa odredbama Zakona o obligacionim odnosima ("Sl. list RBiH", br. 2/92, 13/93 i 13/94)',
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
    created_at: new Date().toISOString(),
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
        legalBasis: 'Na osnovu člana 89-94. Zakona o obligacionim odnosima i Zakona o upravnom postupku',
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
    created_at: new Date().toISOString(),
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
        legalBasis: 'Na osnovu Zakona o slobodi pristupa informacijama u Bosni i Hercegovini',
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
    },
  },
];
