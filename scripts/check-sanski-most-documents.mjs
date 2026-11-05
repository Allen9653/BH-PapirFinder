import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as cheerio from 'cheerio';

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIRECTORY = path.resolve(SCRIPT_DIRECTORY, '..');
const DATA_FILE = path.join(PROJECT_DIRECTORY, 'src', 'data', 'sanski-most-forms.ts');
const OFFICIAL_ORIGIN = 'https://sanskimost.gov.ba';
const DOCUMENT_EXTENSIONS = new Set([
  '.pdf',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
  '.odt',
  '.ods',
  '.rtf',
]);

function getTrackedAgriculturalDocuments(source) {
  const categoryStart = source.indexOf("naslov: 'Novčane podrške u poljoprivredi");
  if (categoryStart === -1) {
    throw new Error('Nije pronađena kategorija poljoprivrednih dokumenata u sanski-most-forms.ts.');
  }

  const categoryEnd = source.indexOf('\n    },', categoryStart);
  if (categoryEnd === -1) {
    throw new Error('Kraj kategorije poljoprivrednih dokumenata nije pronađen.');
  }

  const category = source.slice(categoryStart, categoryEnd);
  const sourceUrl = category.match(/izvorUrl:\s*'([^']+)'/)?.[1];
  if (!sourceUrl) {
    throw new Error('Izvorni URL poljoprivredne kategorije nije pronađen.');
  }

  const documents = [];
  const filePattern =
    /\{\s*id:\s*'([^']+)',\s*naziv:\s*'([^']+)',\s*tip:\s*'([^']+)',\s*url:\s*'([^']+)'\s*,?\s*\}/g;
  for (const match of category.matchAll(filePattern)) {
    documents.push({
      id: match[1],
      title: match[2],
      type: match[3],
      url: match[4],
      key: getDocumentKey(match[2], match[4]),
    });
  }

  if (documents.length === 0) {
    throw new Error('Nisu pronađeni dokumenti u kategoriji poljoprivrede.');
  }

  return { sourceUrl, documents };
}

function normalizeText(value) {
  return value
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function getDocumentKey(title, documentUrl) {
  const codeMatch = `${title} ${documentUrl}`.match(
    /(?:^|[^a-z0-9])([zi])[\s_-]?(\d{1,2})(?:[\s_-]?([ab]))?(?=$|[^a-z0-9])/i,
  );
  if (codeMatch) {
    return `${codeMatch[1]}-${codeMatch[2]}${codeMatch[3] ? `-${codeMatch[3]}` : ''}`.toUpperCase();
  }

  const filename = path.posix.basename(new URL(documentUrl).pathname);
  const withoutExtension = filename.replace(/\.[^.]+$/, '');
  return normalizeText(title || decodeURIComponent(withoutExtension));
}

function getDocumentTitle($, element, documentUrl) {
  const anchorText = $(element).text().trim();
  const title = $(element).attr('title')?.trim() || anchorText;
  if (title && title.length > 2 && !/^(download|preuzmi|ovdje)$/i.test(title)) {
    return title;
  }

  const filename = path.posix.basename(new URL(documentUrl).pathname);
  return decodeURIComponent(filename).replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
}

function getDocumentExtension(documentUrl) {
  return path.posix.extname(new URL(documentUrl).pathname).toLowerCase();
}

async function fetchPage(sourceUrl) {
  const parsedUrl = new URL(sourceUrl);
  if (
    parsedUrl.protocol !== 'https:' ||
    (parsedUrl.hostname !== 'sanskimost.gov.ba' &&
      !parsedUrl.hostname.endsWith('.sanskimost.gov.ba'))
  ) {
    throw new Error(`Odbijen je neočekivani izvorni domen: ${parsedUrl.hostname}`);
  }

  const response = await fetch(parsedUrl, {
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      'User-Agent': 'BH-PapirFinder-Document-Checker/1.0',
    },
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) {
    throw new Error(`Greška pri učitavanju ${sourceUrl}: HTTP ${response.status} ${response.statusText}`);
  }
  if (!response.headers.get('content-type')?.includes('text/html')) {
    throw new Error(`Izvorna stranica nije vratila HTML: ${response.headers.get('content-type') ?? 'nepoznat tip'}`);
  }

  const finalUrl = new URL(response.url);
  if (
    finalUrl.hostname !== 'sanskimost.gov.ba' &&
    !finalUrl.hostname.endsWith('.sanskimost.gov.ba')
  ) {
    throw new Error(`Preusmjerenje na neočekivani domen nije dozvoljeno: ${finalUrl.hostname}`);
  }

  return response.text();
}

function scrapeDocuments(html, pageUrl) {
  const $ = cheerio.load(html);
  const documents = new Map();

  $('a[href]').each((_, element) => {
    const rawUrl = $(element).attr('href');
    if (!rawUrl) return;

    let documentUrl;
    try {
      documentUrl = new URL(rawUrl, pageUrl);
    } catch {
      return;
    }

    if (
      !['http:', 'https:'].includes(documentUrl.protocol) ||
      !DOCUMENT_EXTENSIONS.has(getDocumentExtension(documentUrl.href))
    ) {
      return;
    }

    documentUrl.hash = '';
    const url = documentUrl.href;
    if (!documents.has(url)) {
      const title = getDocumentTitle($, element, url);
      documents.set(url, {
        title,
        url,
        key: getDocumentKey(title, url),
      });
    }
  });

  return [...documents.values()];
}

function compareDocuments(tracked, discovered) {
  const remainingDiscovered = new Set(discovered);
  const added = [];
  const changed = [];
  const missing = [];

  for (const current of tracked) {
    const exactMatch = discovered.find((document) => document.url === current.url);
    if (exactMatch) {
      remainingDiscovered.delete(exactMatch);
      remainingDiscovered.delete(exactMatch);
      continue;
    }

    const keyMatches = discovered.filter((document) => document.key === current.key);
    if (keyMatches.length === 1) {
      const replacement = keyMatches[0];
      remainingDiscovered.delete(replacement);
      changed.push({
        title: current.title,
        oldUrl: current.url,
        newUrl: replacement.url,
      });
      continue;
    }

    missing.push(current);
  }

  added.push(...remainingDiscovered);
  return { added, changed, missing };
}

function printReport(report, asJson) {
  if (asJson) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log(`Provjera dokumenata: ${report.sourceUrl}`);
  console.log(`Postojećih: ${report.trackedCount} | Pronađenih na stranici: ${report.discoveredCount}`);

  if (report.added.length === 0 && report.changed.length === 0 && report.missing.length === 0) {
    console.log('Nisu pronađene promjene.');
    return;
  }

  for (const document of report.added) {
    console.log(`NOVI DOKUMENT: ${document.title}\n  ${document.url}`);
  }
  for (const document of report.changed) {
    console.log(
      `PROMIJENJEN LINK: ${document.title}\n  Stari: ${document.oldUrl}\n  Novi:  ${document.newUrl}`,
    );
  }
  for (const document of report.missing) {
    console.log(`VIŠE NIJE PRONAĐEN: ${document.title}\n  ${document.url}`);
  }

  console.log(
    `Sažetak: ${report.added.length} novih, ${report.changed.length} promijenjenih linkova, ${report.missing.length} nedostupnih na izvornoj stranici.`,
  );
}

async function main() {
  const args = new Set(process.argv.slice(2));
  if (args.has('--help')) {
    console.log(
      'Upotreba: npm run check:sanski-most-documents [-- --json] [--fail-on-changes]\n' +
        'Skenira službenu stranicu za poljoprivredne podrške i upoređuje dokumente sa sanski-most-forms.ts.',
    );
    return;
  }

  const source = await readFile(DATA_FILE, 'utf8');
  const { sourceUrl, documents: tracked } = getTrackedAgriculturalDocuments(source);
  const html = await fetchPage(sourceUrl);
  const discovered = scrapeDocuments(html, sourceUrl);
  if (discovered.length === 0) {
    throw new Error('Na stranici nisu pronađeni dokumenti; provjera je prekinuta da ne bi prijavila lažna uklanjanja.');
  }

  const changes = compareDocuments(tracked, discovered);
  const report = {
    sourceUrl,
    checkedAt: new Date().toISOString(),
    trackedCount: tracked.length,
    discoveredCount: discovered.length,
    ...changes,
  };
  printReport(report, args.has('--json'));

  if (args.has('--fail-on-changes') && (changes.added.length || changes.changed.length || changes.missing.length)) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(`Provjera nije uspjela: ${error.message}`);
    process.exitCode = 1;
  });
}
