import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIRECTORY = path.resolve(SCRIPT_DIRECTORY, '..');
const SOURCE_DIRECTORY = path.join(PROJECT_DIRECTORY, 'src');
const REPORT_FILE = path.join(PROJECT_DIRECTORY, 'invalid-urls-report.json');
const DATABASE_FILE_PATTERN = /(?:institutions|municipalities).*database.*\.ts$/i;
const URL_PATTERN = /https?:\/\/[^\s"'`<>]+/g;
const DEFAULT_CONCURRENCY = 12;
const DEFAULT_TIMEOUT_MS = 10000;
const DATA_ARRAYS_TO_CHECK = {
  'municipalities-database.ts': [
    { arrayName: 'municipalitiesDatabase', keyName: 'id', labelKey: 'name' },
    { arrayName: 'municipalitiesDatabase', keyName: 'name', labelKey: 'name' },
  ],
  'verified-domains.ts': [{ arrayName: 'verifiedDomains', keyName: 'municipality_name', labelKey: 'municipality_name' }],
  'uploaded-institutions.ts': [{ arrayName: 'uploadedInstitutions', keyName: 'website', labelKey: 'name' }],
};

function cleanUrl(value) {
  const candidate = value.replace(/[),.;\]}]+$/g, '');
  if (candidate.includes('${')) return null;

  try {
    const url = new URL(candidate);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    return url.href;
  } catch {
    return null;
  }
}

async function findSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findSourceFiles(entryPath)));
    } else if (entry.isFile() && /\.(?:ts|tsx|js|mjs|json)$/i.test(entry.name)) {
      files.push(entryPath);
    }
  }

  return files;
}

async function getSourceFiles() {
  const dataFiles = await findSourceFiles(path.join(SOURCE_DIRECTORY, 'data'));
  const libFiles = (await findSourceFiles(path.join(SOURCE_DIRECTORY, 'lib'))).filter((file) =>
    DATABASE_FILE_PATTERN.test(path.basename(file)),
  );
  return [...dataFiles, ...libFiles];
}

function getInstitutionName(contents, matchIndex, file) {
  const filename = path.basename(file).replace(/\.[^.]+$/, '');
  const context = contents.slice(Math.max(0, matchIndex - 5000), matchIndex);

  if (filename === 'sanski-most-forms') return 'Općina Sanski Most';

  if (filename === 'municipalities-database' || filename === 'uploaded-institutions') {
    const names = [...context.matchAll(/(?:\bname|"name")\s*:\s*['"`]([^'"`]+)['"`]/g)];
    if (names.length > 0) return names[names.length - 1][1];
  }

  if (filename === 'institutions-database' || filename === 'verified-domains') {
    const shortNames = [...context.matchAll(/(?:\bshortName|"shortName")\s*:\s*['"`]([^'"`]+)['"`]/g)];
    if (shortNames.length > 0) return shortNames[shortNames.length - 1][1];

    const names = [...context.matchAll(/(?:\bmunicipality_name|"municipality_name"|\bname|"name")\s*:\s*['"`]([^'"`]+)['"`]/g)];
    if (names.length > 0) return names[names.length - 1][1];
  }

  if (filename === 'website-verification') {
    const keys = [...context.matchAll(/["']([^"']+)["']\s*:\s*\{/g)];
    if (keys.length > 0) {
      return keys[keys.length - 1][1]
        .split(/[-_]+/)
        .map(word => word.charAt(0).toLocaleUpperCase('bs-BA') + word.slice(1))
        .join(' ');
    }
  }

  const words = filename
    .replace(/-forms$|-database$|-enhanced$/, '')
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toLocaleUpperCase('bs-BA') + word.slice(1));
  return words.length > 0 ? words.join(' ') : 'Nepoznata institucija';
}

async function collectLinks(files) {
  const links = new Map();
  const malformedUrls = [];

  for (const file of files) {
    const contents = await readFile(file, 'utf8');
    for (const match of contents.matchAll(URL_PATTERN)) {
      const line = contents.slice(0, match.index).split('\n').length;
      const relativePath = path.relative(PROJECT_DIRECTORY, file);
      const candidate = match[0].replace(/[),.;\]}]+$/g, '');
      if (candidate.includes('${')) continue;
      const url = cleanUrl(match[0]);
      if (!url || /%(?![0-9a-f]{2})/i.test(candidate)) {
        malformedUrls.push({
          value: candidate,
          institution: getInstitutionName(contents, match.index, file),
          source: `${relativePath}:${line}`,
        });
        continue;
      }

      const occurrences = links.get(url) ?? [];
      occurrences.push({
        institution: getInstitutionName(contents, match.index, file),
        source: `${relativePath}:${line}`,
      });
      links.set(url, occurrences);
    }
  }

  return { links, malformedUrls };
}

function getErrorMessage(error) {
  const cause = error.cause;
  if (cause?.code) return `${cause.code}: ${cause.message ?? error.message}`;
  if (error.name === 'TimeoutError' || error.name === 'AbortError') return 'Timeout';
  return error.message || String(error);
}

async function checkUrl(url, timeoutMs) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'BH-PapirFinder-Link-Validator/1.0',
      },
      signal: AbortSignal.timeout(timeoutMs),
    });

    await response.body?.cancel().catch(() => {});
    return {
      ok: response.ok,
      status: `HTTP ${response.status}${response.statusText ? ` ${response.statusText}` : ''}`,
      finalUrl: response.url !== url ? response.url : undefined,
      contentType: response.headers.get('content-type') ?? undefined,
    };
  } catch (error) {
    return { ok: false, status: getErrorMessage(error) };
  }
}

function getPropertyValue(object, key) {
  for (const property of object.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
      ? property.name.text
      : undefined;
    if (name !== key) continue;
    if (ts.isStringLiteral(property.initializer) || ts.isNoSubstitutionTemplateLiteral(property.initializer)) {
      return property.initializer.text;
    }
  }
  return undefined;
}

function normalizeRecordKey(value) {
  if (/^https?:\/\//i.test(value)) {
    try {
      const url = new URL(value);
      return `${url.hostname.replace(/^www\./i, '').toLowerCase()}${url.pathname.replace(/\/+$/, '')}${url.search}`;
    } catch {
      // Fall through to text normalization so malformed values can still be compared.
    }
  }
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('bs-BA')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

async function inspectSource(files) {
  const syntaxErrors = [];
  const duplicateRecords = [];
  for (const file of files) {
    const contents = await readFile(file, 'utf8');

    if (file.endsWith('.json')) {
      try {
        JSON.parse(contents);
      } catch (error) {
        syntaxErrors.push({
          file: path.relative(PROJECT_DIRECTORY, file),
          error: error.message,
        });
      }
      continue;
    }
    if (!file.endsWith('.ts') && !file.endsWith('.tsx')) continue;

    const sourceFile = ts.createSourceFile(file, contents, ts.ScriptTarget.Latest, true);
    for (const diagnostic of sourceFile.parseDiagnostics) {
      const location = diagnostic.file?.getLineAndCharacterOfPosition(diagnostic.start ?? 0);
      syntaxErrors.push({
        file: path.relative(PROJECT_DIRECTORY, file),
        line: location ? location.line + 1 : undefined,
        error: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
      });
    }

    const declarations = sourceFile.statements
      .filter(ts.isVariableStatement)
      .flatMap(statement => statement.declarationList.declarations);
    for (const declaration of declarations) {
      if (!ts.isIdentifier(declaration.name) || !ts.isArrayLiteralExpression(declaration.initializer)) continue;
      const checks = DATA_ARRAYS_TO_CHECK[path.basename(file)] ?? [];
      for (const check of checks.filter(item => item.arrayName === declaration.name.text)) {
        const values = new Map();
        for (const element of declaration.initializer.elements) {
          if (!ts.isObjectLiteralExpression(element)) continue;
          const value = getPropertyValue(element, check.keyName);
          if (!value) continue;
          const normalized = normalizeRecordKey(value);
          const location = sourceFile.getLineAndCharacterOfPosition(element.getStart(sourceFile));
          const occurrence = {
            value,
            label: check.labelKey ? getPropertyValue(element, check.labelKey) : undefined,
            source: `${path.relative(PROJECT_DIRECTORY, file)}:${location.line + 1}`,
          };
          const previous = values.get(normalized) ?? [];
          previous.push(occurrence);
          values.set(normalized, previous);
        }
        for (const occurrences of values.values()) {
          if (occurrences.length > 1) {
            duplicateRecords.push({
              file: path.relative(PROJECT_DIRECTORY, file),
              field: check.keyName,
              value: occurrences[0].value,
              occurrences,
            });
          }
        }
      }
    }
  }

  return { syntaxErrors, duplicateRecords };
}

async function mapWithConcurrency(items, concurrency, callback) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const index = nextIndex++;
      if (index >= items.length) return;
      results[index] = await callback(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  return results;
}

async function main() {
  const args = new Set(process.argv.slice(2));
  if (args.has('--help')) {
    console.log(
      'Upotreba: node scripts/validate-links.js [--concurrency=12] [--timeout=10000] [--no-network]\n' +
        'Provjerava sintaksu, duplirane zapise i URL adrese u src/data te bazama institucija/općina u src/lib.\n' +
        '--no-network pokreće samo statičku provjeru; izvještaj se zapisuje u invalid-urls-report.json.',
    );
    return;
  }

  const noNetwork = args.has('--no-network');
  const concurrencyArg = process.argv.find((arg) => arg.startsWith('--concurrency='));
  const timeoutArg = process.argv.find((arg) => arg.startsWith('--timeout='));
  const concurrency = concurrencyArg
    ? Number(concurrencyArg.slice('--concurrency='.length))
    : DEFAULT_CONCURRENCY;
  const timeoutMs = timeoutArg ? Number(timeoutArg.slice('--timeout='.length)) : DEFAULT_TIMEOUT_MS;

  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 50) {
    throw new Error('--concurrency mora biti cijeli broj od 1 do 50.');
  }
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1000) {
    throw new Error('--timeout mora biti cijeli broj od najmanje 1000 ms.');
  }

  const files = await getSourceFiles();
  const { syntaxErrors, duplicateRecords } = await inspectSource(files);
  const { links, malformedUrls } = await collectLinks(files);
  const urls = [...links.keys()];
  if (!noNetwork && urls.length === 0) {
    throw new Error('Nijedna HTTP(S) adresa nije pronađena u datotekama s podacima.');
  }

  const duplicateUrls = urls
    .map(url => ({ url, occurrences: links.get(url) }))
    .filter(({ occurrences }) => occurrences.length > 1)
    .map(({ url, occurrences }) => ({ url, occurrences }));
  const duplicateUrlsWithinFile = duplicateUrls
    .map(({ url, occurrences }) => ({
      url,
      occurrences: occurrences.filter((occurrence, index) =>
        occurrences.findIndex(candidate => candidate.source.split(':')[0] === occurrence.source.split(':')[0]) !== index,
      ),
    }))
    .filter(({ occurrences }) => occurrences.length > 0);
  const results = noNetwork
    ? []
    : await mapWithConcurrency(urls, concurrency, async (url, index) => {
        const result = await checkUrl(url, timeoutMs);
        if ((index + 1) % 100 === 0 || index + 1 === urls.length) {
          console.log(`HTTP-ovi provjereni: ${index + 1}/${urls.length}`);
        }
        return result;
      });

  let validCount = 0;
  let errorCount = 0;
  const errorsByInstitution = new Map();
  if (!noNetwork) {
    for (let index = 0; index < urls.length; index++) {
      const url = urls[index];
      const result = results[index];
      const occurrences = links.get(url);
      if (result.ok) {
        validCount++;
      } else {
        errorCount++;
        console.error(`[GREŠKA] ${result.status} ${url}`);
        for (const institution of new Set(occurrences.map((occurrence) => occurrence.institution))) {
          const institutionErrors = errorsByInstitution.get(institution) ?? [];
          institutionErrors.push({
            url,
            error: result.status,
            finalUrl: result.finalUrl,
            contentType: result.contentType,
            sources: occurrences
              .filter((occurrence) => occurrence.institution === institution)
              .map(occurrence => occurrence.source),
          });
          errorsByInstitution.set(institution, institutionErrors);
        }
      }
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    filesScanned: files.length,
    uniqueUrls: urls.length,
    networkCheckPerformed: !noNetwork,
    validUrls: validCount,
    totalInvalidUrls: errorCount,
    invalidUrls: noNetwork
      ? []
      : urls.flatMap((url, index) => {
          const result = results[index];
          return result.ok ? [] : [{
            url,
            error: result.status,
            finalUrl: result.finalUrl,
            contentType: result.contentType,
            occurrences: links.get(url),
          }];
        }),
    duplicateUrlCount: duplicateUrls.length,
    duplicateUrlWithinFileCount: duplicateUrlsWithinFile.length,
    duplicateUrlsWithinFile: duplicateUrlsWithinFile.map(({ url, occurrences }) => ({
      url,
      occurrences: occurrences.map(occurrence => ({
        institution: occurrence.institution,
        source: occurrence.source,
      })),
    })),
    duplicateUrls: duplicateUrls.map(({ url, occurrences }) => ({
      url,
      occurrences: occurrences.map(occurrence => ({
        institution: occurrence.institution,
        source: occurrence.source,
      })),
    })),
    duplicateRecords,
    malformedUrlCount: malformedUrls.length,
    malformedUrls,
    syntaxErrors,
    institutions: [...errorsByInstitution.entries()]
      .sort(([left], [right]) => left.localeCompare(right, 'bs'))
      .map(([name, invalidLinks]) => ({ name, invalidLinks })),
  };
  await writeFile(REPORT_FILE, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  console.log(`\nSkenirano fajlova: ${files.length}`);
  console.log(`URL-ovi koji se ponavljaju kroz baze/fajlove: ${duplicateUrls.length}`);
  console.log(`URL-ovi ponovljeni unutar istog fajla: ${duplicateUrlsWithinFile.length}`);
  console.log(`Potencijalni duplirani zapisi općina: ${duplicateRecords.length}`);
  console.log(`Neispravni URL zapisi: ${malformedUrls.length}`);
  console.log(`Sintaksne greške: ${syntaxErrors.length}`);
  if (!noNetwork) {
    console.log(`Završeno: ${validCount} ispravnih, ${errorCount} HTTP/Fetch grešaka od ${urls.length} jedinstvenih URL-ova.`);
  }
  console.log(`Izvještaj: ${path.basename(REPORT_FILE)}`);
  if (errorCount > 0 || duplicateRecords.length > 0 || malformedUrls.length > 0 || syntaxErrors.length > 0) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(`Validacija nije uspjela: ${error.message}`);
    process.exitCode = 1;
  });
}
