// ============================================================
// Jedinstveni imenik institucija BiH: općine/opštine, gradovi,
// kantoni/županije, Brčko distrikt, entitetske i državne institucije.
// Spaja: municipality-registry, verified-domains, municipalities-database,
// institutions-database i korisničku bazu "#B&H KORISNI URL".
// ============================================================

import { verifiedDomains, cantonalInstitutions } from '@/data/verified-domains';
import { municipalitiesDatabase } from '@/data/municipalities-database';
import { allInstitutions } from '@/lib/institutions-database';
import { getAllMunicipalities } from '@/data/municipality-registry';
import { uploadedInstitutions } from '@/data/uploaded-institutions';
import { cyrillicToLatin } from '@/lib/cyrillic-converter';
import { websiteVerification } from '@/data/website-verification';

export type DirectoryKind = 'municipality' | 'canton' | 'entity' | 'district' | 'state' | 'institution';
export type DirectoryStatus = 'active' | 'counter' | 'inactive' | 'unverified';

export interface DirectoryForm {
  id: string;
  name: string;
  category: string;
  url?: string;
  /** Postoji interna stranica /form/:id (pregled, uređivanje, prevod). */
  internal: boolean;
}

export interface DirectoryEntry {
  slug: string;
  name: string;
  kind: DirectoryKind;
  entity?: string;
  canton?: string;
  website?: string;
  /** Jedini izvor dugmeta 'Posjeti web stranicu': public.institucije.official_url (validan https). */
  officialUrl?: string;
  formsUrl?: string;
  status: DirectoryStatus;
  verified: boolean;
  note?: string;
  categories: string[];
  forms: DirectoryForm[];
  aliases: string[];
}

const PREFIXES = /^(opcina|opstina|općina|opština|grad|kanton|zupanija|županija|op[cć]ina|gradska uprava)\s+/;

/** Normalizacija: ćirilica → latinica, bez kvačica, mala slova, bez prefiksa. */
export function normalizeName(text: string): string {
  return cyrillicToLatin(text)
    .toLowerCase()
    .replace(/đ/g, 'dj')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\(.*?\)/g, ' ')
    .replace(/[^a-z0-9 -]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(PREFIXES, '')
    .trim();
}

export function slugify(text: string): string {
  return normalizeName(text).replace(/[\s-]+/g, '-');
}

/** Normalizuje URL: trim, dodaje https://, http -> https; vraća undefined za prazno/nevažeće. */
export const toHttps = (url?: string | null): string | undefined => {
  if (!url) return undefined;
  const u = url.trim();
  if (!/^https?:\/\//i.test(u)) return /\.[a-z]{2,}/i.test(u) ? `https://${u}` : undefined;
  return u.replace(/^http:\/\//i, 'https://');
};

const entityLabel = (e?: string | null): string | undefined => {
  if (!e) return undefined;
  if (/fbih|federacija/i.test(e)) return 'FBiH';
  if (/rs|republika/i.test(e)) return 'RS';
  if (/bd|brčko|brcko/i.test(e)) return 'BD';
  return e;
};

/** Deset kantona FBiH — službeni domeni preuzeti samo iz postojećih baza. */
const CANTONS: { name: string; short: string; aliases: string[] }[] = [
  { name: 'Unsko-sanski kanton', short: 'USK', aliases: ['usk', 'kanton 1'] },
  { name: 'Posavski kanton', short: 'PK', aliases: ['zupanija posavska', 'kanton 2'] },
  { name: 'Tuzlanski kanton', short: 'TK', aliases: ['tk', 'kanton 3'] },
  { name: 'Zeničko-dobojski kanton', short: 'ZDK', aliases: ['zdk', 'kanton 4'] },
  { name: 'Bosansko-podrinjski kanton Goražde', short: 'BPK', aliases: ['bpk', 'kanton 5'] },
  { name: 'Srednjobosanski kanton', short: 'SBK', aliases: ['sbk', 'kssb', 'kanton 6'] },
  { name: 'Hercegovačko-neretvanski kanton', short: 'HNK', aliases: ['hnk', 'hnz', 'kanton 7'] },
  { name: 'Zapadnohercegovački kanton', short: 'ZHK', aliases: ['zhk', 'zzh', 'zupanija zapadnohercegovacka', 'kanton 8'] },
  { name: 'Kanton Sarajevo', short: 'KS', aliases: ['ks', 'kanton 9', 'sarajevski kanton'] },
  { name: 'Kanton 10', short: 'K10', aliases: ['livanjski kanton', 'hercegbosanska zupanija', 'k10'] },
];

let cache: DirectoryEntry[] | null = null;

function upsert(map: Map<string, DirectoryEntry>, e: Partial<DirectoryEntry> & { name: string; kind: DirectoryKind }) {
  const key = e.slug ?? slugify(e.name);
  if (!key) return;
  const prev = map.get(key);
  if (!prev) {
    map.set(key, {
      slug: key,
      status: 'unverified',
      verified: false,
      categories: [],
      forms: [],
      aliases: [],
      ...e,
    } as DirectoryEntry);
    return;
  }
  // Popuni samo prazna polja; obrasci i kategorije se spajaju.
  prev.website ||= e.website;
  prev.officialUrl ||= e.officialUrl;
  prev.formsUrl ||= e.formsUrl;
  prev.entity ||= e.entity;
  prev.canton ||= e.canton;
  prev.note ||= e.note;
  if (e.verified) prev.verified = true;
  if (prev.status === 'unverified' && e.status) prev.status = e.status;
  prev.categories = Array.from(new Set([...prev.categories, ...(e.categories ?? [])]));
  const ids = new Set(prev.forms.map(f => f.id));
  prev.forms.push(...(e.forms ?? []).filter(f => !ids.has(f.id)));
  prev.aliases = Array.from(new Set([...prev.aliases, ...(e.aliases ?? [])]));
}

function build(): DirectoryEntry[] {
  const map = new Map<string, DirectoryEntry>();

  // 1. Općine s punom bazom obrazaca (Olovo, Gračanica, Sarajevo...)
  for (const m of getAllMunicipalities()) {
    upsert(map, {
      slug: m.slug,
      name: m.name.replace(/^(Općina|Opština|Grad)\s+/, ''),
      kind: 'municipality',
      entity: entityLabel(m.entity),
      canton: m.canton,
      website: m.website || (m.slug === 'konjic' ? 'https://konjic.ba/' : toHttps(new URL(m.officialUrl).origin)),
      formsUrl: toHttps(m.officialUrl),
      status: 'active',
      verified: true,
      aliases: [m.slug, m.slug.replace(/-/g, ' ')],
      categories: m.categories,
      forms: m.forms.map(f => ({ id: f.id, name: f.name, category: f.category, url: toHttps(f.pdfUrl), internal: !f.external })),
    });
  }

  // 2. Verificirani domeni
  for (const v of verifiedDomains) {
    upsert(map, {
      name: v.municipality_name,
      kind: 'municipality',
      entity: v.entity,
      canton: v.canton ?? v.region,
      website: toHttps(v.official_domain),
      formsUrl: toHttps(v.forms_url),
      status: v.status === 'broken' ? 'inactive' : v.physical_presence_required && !v.forms_url ? 'counter' : 'active',
      verified: v.status !== 'broken',
      note: v.komentar,
      categories: v.document_categories,
    });
  }

  // 3. Kantonalne institucije
  for (const c of cantonalInstitutions) {
    upsert(map, {
      name: c.institution_name,
      kind: 'institution',
      entity: c.entity,
      canton: c.canton,
      website: toHttps(c.official_domain),
      formsUrl: toHttps(c.forms_url),
      status: c.status === 'broken' ? 'inactive' : 'active',
      verified: c.status !== 'broken',
      note: c.komentar,
      categories: c.document_categories,
    });
  }

  // 4. Državne, entitetske, Brčko i agencije (s obrascima)
  for (const i of allInstitutions) {
    const kind: DirectoryKind =
      i.level === 'state' ? 'state' : i.level === 'district' ? 'district' : i.level === 'entity' ? 'entity' : 'institution';
    upsert(map, {
      name: i.name,
      kind,
      website: toHttps(i.website),
      status: i.website ? 'active' : 'unverified',
      verified: Boolean(i.website),
      note: i.description,
      categories: Array.from(new Set(i.forms.map(f => f.category))),
      aliases: [i.shortName, ...i.keywords],
      forms: i.forms.map(f => ({ id: `${i.id}-${f.id}`, name: f.name, category: f.category, url: toHttps(f.fileUrl), internal: false })),
    });
  }

  // 5. Korisnička baza URL-ova
  for (const u of uploadedInstitutions) {
    const isMunicipality = !/ministarstv|zavod|uprava|agencij|fond|direkcij|služb|sluzb|zzo|vlada|policij|sud/i.test(u.name);
    upsert(map, {
      name: u.name,
      kind: /brčko|brcko/i.test(u.name) ? 'district' : isMunicipality ? 'municipality' : 'institution',
      entity: entityLabel(u.entity),
      canton: u.canton ?? undefined,
      website: toHttps(u.website),
      formsUrl: toHttps(u.formsUrl),
      status: u.status,
      verified: u.status !== 'inactive',
      note: u.note,
    });
  }

  // 6. Šira baza općina (143+ JLS)
  for (const m of municipalitiesDatabase) {
    const url = m.urls.find(x => x.forms || x.main);
    upsert(map, {
      name: m.name,
      kind: 'municipality',
      entity: m.entity,
      canton: m.canton ?? m.region,
      website: toHttps(url?.main),
      formsUrl: toHttps(url?.forms),
      status: url?.main ? 'active' : 'unverified',
      verified: Boolean(url?.main),
      note: m.komentar,
      categories: m.categories,
    });
  }

  // 7. Kantoni / županije — domen samo ako postoji u bazi
  for (const c of CANTONS) {
    const govEntry = Array.from(map.values()).find(
      e => e.kind === 'institution' && e.canton && normalizeName(e.canton).includes(normalizeName(c.short)) && /vlada/i.test(e.name),
    );
    upsert(map, {
      slug: /^kanton /i.test(c.name) ? `kanton-${slugify(c.name)}` : slugify(c.name),
      name: c.name,
      kind: 'canton',
      entity: 'FBiH',
      canton: `${c.name} (${c.short})`,
      website: govEntry?.website,
      status: govEntry?.website ? 'active' : 'unverified',
      verified: Boolean(govEntry?.website),
      aliases: [c.short, ...c.aliases],
    });
  }

  // 8. Entiteti i Brčko distrikt
  upsert(map, { name: 'Federacija Bosne i Hercegovine', kind: 'entity', entity: 'FBiH', aliases: ['fbih', 'federacija'] });
  upsert(map, { name: 'Republika Srpska', kind: 'entity', entity: 'RS', aliases: ['rs', 'republika srpska'] });
  upsert(map, { name: 'Brčko distrikt BiH', kind: 'district', entity: 'BD', aliases: ['brcko', 'bd', 'brcko distrikt'] });

  // 9. Supabase tabela institucije (uživo)
  mergeRemote(map);

  // 10. HTTP-verificirani zvanični domeni imaju prednost
  for (const e of map.values()) {
    const v = websiteVerification[e.slug];
    if (v && v.verified && v.url) {
      const verifiedUrl = safeHttpsUrl(v.url);
      if (verifiedUrl) {
        e.website = verifiedUrl;
        e.officialUrl ||= verifiedUrl;
        e.verified = true;
        if (e.status === 'unverified') e.status = 'active';
      }
    } else if (e.website) {
      const validWeb = safeHttpsUrl(e.website);
      if (validWeb) {
        e.officialUrl ||= validWeb;
        e.verified = true;
      }
    }
  }

  // Ako nema online obrazaca, a postoji web — status "Šalter"
  for (const e of map.values()) {
    if (e.status === 'active' && !e.formsUrl && e.forms.length === 0) e.status = 'counter';
  }

  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, 'bs'));
}

interface SupabaseInstitucija {
  naziv: string;
  slug: string;
  kanton: string | null;
  kanton_kratko: string | null;
  entitet: string | null;
  official_url: string | null;
  status?: string | null;
  access_method?: string | null;
}

let remoteRows: SupabaseInstitucija[] = [];
export type { SupabaseInstitucija };
let remotePromise: Promise<void> | null = null;
const listeners = new Set<() => void>();
let version = 0;

function mergeRemote(map: Map<string, DirectoryEntry>) {
  for (const r of remoteRows) {
    const counter = /šalter|salter|lično|licno/i.test(r.access_method ?? '');
    const inactive = /neaktiv|inactive/i.test(r.status ?? '');
    const url = toHttps(r.official_url);
    const level = (r.kanton_kratko ?? '').toUpperCase();
    upsert(map, {
      slug: /^kanton\s/i.test(r.naziv) ? `kanton-${slugify(r.naziv)}` : r.naziv.includes('(') ? r.slug : undefined,
      officialUrl: safeHttpsUrl(r.official_url),
      name: r.naziv,
      kind: level === 'DRZAVA' ? 'state' : level === 'BD' ? 'district' : 'municipality',
      entity: entityLabel(r.entitet),
      canton: r.kanton ?? undefined,
      website: url ? new URL(url).origin : undefined,
      formsUrl: url,
      status: inactive ? 'inactive' : counter ? 'counter' : 'active',
      verified: !inactive && Boolean(url),
      aliases: [r.slug.replace(/-/g, ' ')],
    });
  }
}

/** Učitava tabelu institucije iz Supabase-a i spaja je s imenikom (statički podaci ostaju fallback). */
export function loadRemoteInstitutions(): Promise<void> {
  if (!remotePromise) {
    remotePromise = import('./supabaseClient')
      .then(({ supabase }) =>
        supabase
          .from('institucije')
          .select('naziv,slug,kanton,kanton_kratko,entitet,official_url,status,access_method'),
      )
      .then(({ data, error }) => {
        if (error || !data?.length) return;
        applyRemoteInstitutions(data as SupabaseInstitucija[]);
      })
      .catch(err => console.warn('institucije fetch failed:', err));
  }
  return remotePromise;
}

/** Postavlja redove iz public.institucije i osvježava imenik. */
export function applyRemoteInstitutions(rows: SupabaseInstitucija[]): void {
  remoteRows = rows;
  cache = null;
  version += 1;
  listeners.forEach(l => l());
}

export function subscribeDirectory(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const getDirectoryVersion = () => version;

export function getDirectory(): DirectoryEntry[] {
  if (!cache) cache = build();
  return cache;
}

export function getDirectoryEntry(slug: string): DirectoryEntry | undefined {
  const dir = getDirectory();
  const normalized = slug.toLowerCase().trim();
  const unhyphenated = normalized.replace(/-/g, ' ');
  return dir.find(e => e.slug === normalized)
    ?? dir.find(e => e.aliases.includes(normalized) || e.aliases.includes(unhyphenated))
    ?? dir.find(e => slugify(e.name) === normalized);
}

/** Pretraga: kvačice, ćirilica, prefiksi (općina/opština/grad/kanton/županija) i skraćenice. */
export function searchDirectory(query: string, limit = 8): DirectoryEntry[] {
  const q = normalizeName(query);
  if (q.length < 2) return [];
  const scored: { e: DirectoryEntry; s: number }[] = [];
  const wantsCanton = /kanton|k[aа]нтон|[zž]upanij|жупаниј/i.test(query);
  for (const e of getDirectory()) {
    const names = [e.name, ...e.aliases].map(normalizeName);
    let s = 0;
    for (const n of names) {
      if (n === q) s = Math.max(s, 100);
      else if (n.startsWith(q)) s = Math.max(s, 80);
      else if (n.split(' ').some(w => w.startsWith(q))) s = Math.max(s, 60);
      else if (n.includes(q)) s = Math.max(s, 40);
    }
    if (s) scored.push({ e, s: s + (e.verified ? 5 : 0) + Math.min(e.forms.length, 5) + (wantsCanton && e.kind === 'canton' ? 50 : 0) });
  }
  return scored.sort((a, b) => b.s - a.s).slice(0, limit).map(x => x.e);
}


/** Vraća URL samo ako je validan https:// link (new URL + protocol https:); ništa ne dopunjava. */
export function safeHttpsUrl(url?: string | null): string | undefined {
  if (!url || !url.trim()) return undefined;
  try {
    const u = new URL(url.trim());
    return u.protocol === 'https:' && u.hostname.includes('.') ? u.href : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Jedini izvor dugmeta 'Posjeti web stranicu': public.institucije.official_url.
 * Vraća URL samo ako je validan https:// link; inače undefined (dugme se ne renderuje).
 * Statički podaci i druge tabele se za ovo dugme ne koriste.
 */
export function getOfficialWebsite(name: string): string | undefined {
  const entry = searchDirectory(name, 1)[0];
  if (!entry || normalizeName(entry.name) !== normalizeName(name)) return undefined;
  return entry.officialUrl;
}
