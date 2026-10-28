import { supabase } from './supabaseClient';
import { FALLBACK_STANDARD_TEMPLATES } from '../data/standard-legal-templates';

export type TemplateLang = 'bs' | 'sr_cyr' | 'hr';

export interface TemplateField {
  id: string;
  type: 'text' | 'textarea';
  label: string;
  required?: boolean;
}

export interface TemplateText {
  title: string;
  body: string;
  legal_basis?: string;
  legalBasis?: string;
}

export interface TextDocumentTemplate {
  id: string;
  slug: string;
  title_bs: string;
  title_sr: string;
  title_hr: string;
  category: string | null;
  description_bs: string | null;
  icon_name: string | null;
  form_fields: TemplateField[];
  template_text: Partial<Record<TemplateLang, TemplateText>>;
  created_at: string | null;
}

export interface TemplatesResult {
  data: TextDocumentTemplate[];
  error: string | null;
}

const TEMPLATES_LOCAL_CACHE_KEY = 'bh_text_document_templates_v2';

/**
 * Učitava šablone iz Supabase tabele text_document_templates sa robusnim
 * offline keširanjem i lokalnim fallbackom bez prekida rada i bez konzolnih grešaka.
 */
export async function fetchTextTemplates(): Promise<TemplatesResult> {
  // 1. Pročitaj lokalni keš ako postoji
  let cached: TextDocumentTemplate[] | null = null;
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(TEMPLATES_LOCAL_CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          cached = parsed;
        }
      }
    } catch {
      // Ignoriši grešku čitanja lokalnog keša
    }
  }

  // 2. Ako je uređaj u offline režimu, odmah vrati keširane ili standardne šablone
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    const fallbackList = cached && cached.length > 0 ? cached : FALLBACK_STANDARD_TEMPLATES;
    return { data: fallbackList, error: null };
  }

  // 3. Pokušaj dohvatiti iz baze podataka uz kratak timeout (3s) za stabilnost
  try {
    const queryPromise = supabase
      .from('text_document_templates')
      .select('*')
      .order('created_at', { ascending: true });

    const timeoutPromise = new Promise<{ data: null; error: { message: string } }>((resolve) => {
      setTimeout(() => resolve({ data: null, error: { message: 'Timeout' } }), 3000);
    });

    const result = await Promise.race([queryPromise, timeoutPromise]);
    const { data, error } = result;

    if (error || !data || (Array.isArray(data) && data.length === 0)) {
      // Baza nije dostupna ili nema redova -> tihi fallback bez console.error
      const fallbackList = cached && cached.length > 0 ? cached : FALLBACK_STANDARD_TEMPLATES;
      return { data: fallbackList, error: null };
    }

    const rows = (data ?? []) as TextDocumentTemplate[];
    if (rows.length > 0 && typeof window !== 'undefined') {
      try {
        localStorage.setItem(TEMPLATES_LOCAL_CACHE_KEY, JSON.stringify(rows));
      } catch {
        // Ignoriši eventualno prekoračenje kvote
      }
    }
    return { data: rows, error: null };
  } catch {
    // Mrežna ili konekciona greška -> vrati fallback
    const fallbackList = cached && cached.length > 0 ? cached : FALLBACK_STANDARD_TEMPLATES;
    return { data: fallbackList, error: null };
  }
}

export function templateTitle(t: TextDocumentTemplate, lang: TemplateLang): string {
  if (lang === 'sr_cyr') return t.title_sr || t.title_bs;
  if (lang === 'hr') return t.title_hr || t.title_bs;
  return t.title_bs || t.title_sr || t.title_hr || '';
}

/** Popunjava {{polje}} vrijednostima; prazna polja ostaju vidljiva kao [polje]. */
export function renderTemplate(
  text: TemplateText | undefined,
  values: Record<string, string>,
  fields: TemplateField[]
): string {
  if (!text) return '';
  const fill = (s = '') =>
    s.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) => {
      const v = values[key]?.trim();
      return v || `[${fields.find((f) => f.id === key)?.label ?? key}]`;
    });
  const legal = text.legal_basis || text.legalBasis || '';
  return [fill(text.title), fill(legal), fill(text.body)].filter(Boolean).join('\n\n');
}
