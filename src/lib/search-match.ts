// src/lib/search-match.ts
const strip = (v: string) =>
  v.toLowerCase().replace(/đ/g, 'd').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const words = (v: string) => strip(v).split(/[^a-z0-9]+/).filter(Boolean);

const STOP = new Set(['o', 'u', 'i', 'a', 's', 'k', 'na', 'za', 'od', 'do', 'iz', 'po', 'sa', 'se', 'kod', 'ili']);

const stem = (w: string) => w.replace(/(ima|ama|ovi|evi|ski|sko|ska|om|em|og|ih|im|oj|uh|u|a|e|i|o)$/, '') || w;

const wordMatches = (hay: string, q: string) => {
  if (hay === q || hay.startsWith(q) || q.startsWith(hay)) return true;
  const a = stem(hay);
  const b = stem(q);
  if (a === b) return true;
  return a.length >= 4 && b.length >= 4 && a.slice(0, 4) === b.slice(0, 4);
};

/** true ako se svaka riječ iz `query` pojavljuje u `text` — bilo koji padež, kvačice nebitne. */
export function matchesQuery(text: string, query: string): boolean {
  const all = words(query);
  const q = all.filter((w) => !STOP.has(w));
  const needles = q.length ? q : all;
  if (!needles.length) return false;
  const hay = words(text);
  return needles.every((n) => hay.some((h) => wordMatches(h, n)));
}
