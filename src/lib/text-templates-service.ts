import { supabase } from './supabaseClient';

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

/** Učitava sve šablone iz tabele text_document_templates. */
export async function fetchTextTemplates(): Promise<TemplatesResult> {
  const { data, error } = await supabase
    .from('text_document_templates')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) {
    console.error('text_document_templates:', error.message);
    return { data: [], error: error.message };
  }
  const rows = (data ?? []) as TextDocumentTemplate[];
  return { data: rows, error: null };
}

export function templateTitle(t: TextDocumentTemplate, lang: TemplateLang): string {
  return (lang === 'sr_cyr' ? t.title_sr : lang === 'hr' ? t.title_hr : t.title_bs) || t.title_bs;
}

/** Popunjava {{polje}} vrijednostima; prazna polja ostaju vidljiva kao [polje]. */
export function renderTemplate(text: TemplateText | undefined, values: Record<string, string>, fields: TemplateField[]): string {
  if (!text) return '';
  const fill = (s = '') =>
    s.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) => {
      const v = values[key]?.trim();
      return v || `[${fields.find(f => f.id === key)?.label ?? key}]`;
    });
  return [fill(text.title), fill(text.legal_basis), fill(text.body)].filter(Boolean).join('\n\n');
}
