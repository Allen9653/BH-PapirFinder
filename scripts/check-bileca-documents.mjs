import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PROJECT_DIRECTORY = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = path.join(PROJECT_DIRECTORY, 'src', 'data', 'bileca-forms.ts');
const OFFICIAL_ORIGIN = 'https://www.opstinabileca.ba';
const START_PAGES = [
  new URL('/obrazci-gradjani/', OFFICIAL_ORIGIN).href,
  new URL('/konkursi/', OFFICIAL_ORIGIN).href,
];
const FILE_EXTENSION = /\.(pdf|doc|docx|xls|xlsx|odt|ods|rtf)(?:$|[?#])/i;
const REQUEST_PAGE_PATH = /\/zahtjev-[^/]+\/?$/i;
const DEPARTMENT_PAGE_PATH = /\/(?:nacelnik-zahtjevi|zahtjevi-[^/]+|[^/]+-zahtjevi)\/?$/i;
const CYRILLIC_TO_LATIN = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', ђ: 'dj', е: 'e', ж: 'z', з: 'z',
  и: 'i', ј: 'j', к: 'k', л: 'l', љ: 'lj', м: 'm', н: 'n', њ: 'nj', о: 'o',
  п: 'p', р: 'r', с: 's', т: 't', ћ: 'c', у: 'u', ф: 'f', х: 'h', ц: 'c',
  ч: 'c', џ: 'dz', ш: 's',
};

function decodeHtml(value) {
  return value
    .replace(/&#x([0-9a-f]+);?/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);?/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#0*8211;/gi, '–')
    .replace(/&#0*8217;/gi, '’')
    .replace(/&#0*8220;/gi, '“')
    .replace(/&#0*8221;/gi, '”');
}

function normalizeText(value) {
  return [...decodeHtml(value).toLowerCase()]
    .map((character) => CYRILLIC_TO_LATIN[character] ?? character)
    .join('')
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function extractTrackedDocuments(source) {
  const documents = [];
  const entryPattern =
    /\{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*url:\s*'([^']+)',\s*category:\s*'([^']+)'\s*,?\s*\}/g;
  for (const match of source.matchAll(entryPattern)) {
    documents.push({
      id: match[1],
      title: match[2],
      url: match[3],
      category: match[4],
      key: normalizeText(match[2]),
    });
  }
  if (documents.length !== 17) {
    throw new Error(`Očekivano je 17 dokumenata u bileca-forms.ts, pronađeno ${documents.length}.`);
  }
  return documents;
}

function extractAnchors(html, pageUrl) {
  const anchors = [];
  const anchorPattern =
    /<a\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))[^>]*>([\s\S]*?)<\/a\s*>/gi;

  for (const match of html.matchAll(anchorPattern)) {
    const rawUrl = decodeHtml(match[1] ?? match[2] ?? match[3] ?? '').replace(/["']+$/, '');
    const title = decodeHtml(match[4].replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
    try {
      const url = new URL(rawUrl, pageUrl);
      if (!['http:', 'https:'].includes(url.protocol)) continue;
      url.hash = '';
      anchors.push({ title: title || url.pathname.split('/').filter(Boolean).pop() || url.hostname, url: url.href });
    } catch {
      continue;
    }
  }
  return anchors;
}

async function fetchPage(url) {
  const parsedUrl = new URL(url);
  if (
    parsedUrl.protocol !== 'https:' ||
    (parsedUrl.hostname !== new URL(OFFICIAL_ORIGIN).hostname &&
      !parsedUrl.hostname.endsWith(`.${new URL(OFFICIAL_ORIGIN).hostname}`))
  ) {
    throw new Error(`URL izvan zvaničnog domena nije dozvoljen: ${url}`);
  }

  const response = await fetch(parsedUrl, {
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      'User-Agent': 'BH-PapirFinder-Bileca-Document-Checker/1.0',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) {
    throw new Error(`Učitavanje stranice nije uspjelo: HTTP ${response.status} ${response.statusText} (${url})`);
  }

  const finalUrl = new URL(response.url);
  if (
    finalUrl.hostname !== new URL(OFFICIAL_ORIGIN).hostname &&
    !finalUrl.hostname.endsWith(`.${new URL(OFFICIAL_ORIGIN).hostname}`)
  ) {
    throw new Error(`Preusmjerenje izvan zvaničnog domena nije dozvoljeno: ${finalUrl.href}`);
  }
  return { html: await response.text(), finalUrl: finalUrl.href };
}

function isDocumentLink(anchor) {
  return FILE_EXTENSION.test(anchor.url) || REQUEST_PAGE_PATH.test(new URL(anchor.url).pathname);
}

function isDepartmentPage(anchor) {
  return DEPARTMENT_PAGE_PATH.test(new URL(anchor.url).pathname);
}

async function discoverDocuments() {
  const queue = START_PAGES.map((url) => ({ url, depth: 0 }));
  const visited = new Set();
  const documents = new Map();
  const maxPages = 30;

  while (queue.length > 0 && visited.size < maxPages) {
    const { url, depth } = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);

    const { html, finalUrl } = await fetchPage(url);
    for (const anchor of extractAnchors(html, finalUrl)) {
      const isOfficialHost = new URL(anchor.url).hostname === new URL(OFFICIAL_ORIGIN).hostname;
      const isFile = FILE_EXTENSION.test(anchor.url);
      if (isOfficialHost && isDocumentLink(anchor) && anchor.url !== finalUrl) {
        documents.set(anchor.url, {
          title: anchor.title,
          url: anchor.url,
          key: normalizeText(anchor.title),
        });
      }

      if (
        depth < 2 &&
        isOfficialHost &&
        !isFile &&
        isDepartmentPage(anchor) &&
        !visited.has(anchor.url)
      ) {
        queue.push({ url: anchor.url, depth: depth + 1 });
      }
    }
  }

  if (visited.size === 0 || documents.size === 0) {
    throw new Error('Nisu pronađeni dokumenti na službenim stranicama; poređenje je prekinuto.');
  }
  return { documents: [...documents.values()], scannedPages: [...visited] };
}

function compareDocuments(tracked, discovered) {
  const remaining = new Set(discovered);
  const added = [];
  const changed = [];
  const missing = [];

  for (const current of tracked) {
    const exactMatch = discovered.find((item) => item.url === current.url);
    if (exactMatch) {
      remaining.delete(exactMatch);
      continue;
    }

    const titleMatches = discovered.filter((item) => item.key === current.key);
    if (titleMatches.length === 1) {
      const replacement = titleMatches[0];
      remaining.delete(replacement);
      changed.push({ id: current.id, title: current.title, oldUrl: current.url, newUrl: replacement.url });
    } else {
      missing.push({ id: current.id, title: current.title, url: current.url });
    }
  }

  added.push(...remaining);
  return { added, changed, missing };
}

async function main() {
  if (process.argv.includes('--help')) {
    console.log(
      'Upotreba: npm run check:bileca-documents [-- --json]\n' +
        'Skenira zvanične stranice obrazaca i konkursa Opštine Bileća i poredi ih sa bileca-forms.ts.',
    );
    return;
  }

  const source = await readFile(DATA_FILE, 'utf8');
  const tracked = extractTrackedDocuments(source);
  const { documents: discovered, scannedPages } = await discoverDocuments();
  const changes = compareDocuments(tracked, discovered);
  const report = {
    source: OFFICIAL_ORIGIN,
    checkedAt: new Date().toISOString(),
    scannedPages,
    trackedCount: tracked.length,
    discoveredCount: discovered.length,
    ...changes,
  };

  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(`Provjereno stranica: ${scannedPages.length}; postojeći dokumenti: ${tracked.length}; pronađeno: ${discovered.length}.`);
    for (const item of changes.added) console.log(`[NOVO] ${item.title}\n  ${item.url}`);
    for (const item of changes.changed) {
      console.log(`[PROMIJENJEN LINK] ${item.title}\n  Stari: ${item.oldUrl}\n  Novi: ${item.newUrl}`);
    }
    for (const item of changes.missing) console.log(`[NEDOSTAJE NA SAJTU] ${item.title}\n  ${item.url}`);
    if (!changes.added.length && !changes.changed.length && !changes.missing.length) {
      console.log('Nisu pronađene promjene.');
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(`Provjera Bileća nije uspjela: ${error.message}`);
    process.exitCode = 1;
  });
}
