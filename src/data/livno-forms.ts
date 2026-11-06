// ============================================================
// Grad Livno — Službena Baza Obrazaca i Elektronskih Dokumenata
// Službena stranica: https://livno.ba/
// Službeni repozitorij obrazaca: https://livno.ba/za-gradane/dokumenti-i-obrasci/
// Posljednje ažurirano: 2026-11-02
// ============================================================

import { latinToCyrillic } from '@/lib/cyrillic-converter';

export const LIVNO_OFFICIAL_URL = 'https://livno.ba/';
export const LIVNO_FORMS_PORTAL_URL = 'https://livno.ba/za-gradane/dokumenti-i-obrasci/';

export interface LivnoDocumentItem {
  id: string;
  name: string;
  naziv: string; // Alias za BHS
  category: string;
  kategorija: string; // Alias za BHS
  sluzba: string;
  pdfUrl: string;
  url: string; // Alias za spec
  description: string;
  opis: string; // Alias za spec
  sizeKB: number;
  akcije: ('download' | 'edit' | 'share' | 'translate' | 'save' | 'print' | 'preview')[];
  keywords?: string;
}

export const livnoForms: LivnoDocumentItem[] = [
  // ============================================================
  // Služba za graditeljstvo, prostorno uređenje i stambeno-komunalne poslove
  // ============================================================
  
  
  
  
  

  // ============================================================
  // Služba za gospodarstvo, inspekcijske poslove i katastar
  // ============================================================
  
  
  

  // ============================================================
  // Služba za opću upravu i društvene djelatnosti
  // ============================================================
  
  
  
  

  // ============================================================
  // Služba za branitelje / boračka pitanja
  // ============================================================
  
  
];

export function getLivnoCategories(): string[] {
  return Array.from(new Set(livnoForms.map((f) => f.category)));
}

/**
 * Vraća standardiziranu, čistu JSON strukturu za profil korisnika i API integraciju
 * prema korisničkoj specifikaciji, uz podršku za transliteraciju u ćirilicu i višejezični prijevod.
 */
export function getLivnoStructuredJson(options?: {
  script?: 'latin' | 'cyrillic';
  department?: string;
  language?: string;
}) {
  const isCyrillic = options?.script === 'cyrillic';
  const selectedDept = options?.department;

  const docs = selectedDept
    ? livnoForms.filter((f) => f.sluzba.toLowerCase().includes(selectedDept.toLowerCase()))
    : livnoForms;

  const toScript = (text: string): string => {
    if (!isCyrillic) return text;
    return latinToCyrillic(text);
  };

  return {
    institucija: toScript('Grad Livno'),
    sluzba: toScript(
      selectedDept || 'Služba za graditeljstvo, prostorno uređenje i stambeno-komunalne poslove'
    ),
    sluzbena_stranica: LIVNO_OFFICIAL_URL,
    stranica_s_obrazcima: LIVNO_FORMS_PORTAL_URL,
    kanton_zupanija: toScript('Kanton 10 (Hercegbosanska županija)'),
    entitet: toScript('Federacija Bosne i Hercegovine'),
    zadnje_azurirano: '2026-11-02',
    pismo: isCyrillic ? 'ćirilica' : 'latinica',
    ukupno_dokumenata: docs.length,
    dokumenti: docs.map((doc) => ({
      id: doc.id,
      naziv: toScript(doc.naziv),
      kategorija: toScript(doc.kategorija),
      sluzba: toScript(doc.sluzba),
      url: doc.url,
      opis: toScript(doc.opis),
      velicina_kb: doc.sizeKB,
      akcije: doc.akcije,
    })),
  };
}
