import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, Plugin } from 'vite';
import * as cheerio from 'cheerio';

function apiCrawlerPlugin(): Plugin {
  return {
    name: 'api-crawler-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Secure Admin Authentication Endpoint
        if (req.url === '/api/admin/auth' && req.method === 'POST') {
          let rawBody = '';
          req.on('data', (chunk) => {
            rawBody += chunk;
          });
          req.on('end', () => {
            try {
              const body = JSON.parse(rawBody || '{}');
              const identifier = String(body.identifier || body.email || body.username || '').trim().toLowerCase();
              const password = String(body.password || '');

              const isIdentifierValid = identifier === 'yusufowych' || identifier === 'alenjusufovic@yahoo.com';
              const isPasswordValid = password === 'UmmaIsak2013#';

              res.setHeader('Content-Type', 'application/json');
              if (isIdentifierValid && isPasswordValid) {
                res.statusCode = 200;
                res.end(
                  JSON.stringify({
                    success: true,
                    user: {
                      username: 'yusufowych',
                      email: 'alenjusufovic@yahoo.com',
                      role: 'admin',
                    },
                    sessionToken: 'bh_sec_adm_' + Buffer.from(Date.now().toString()).toString('base64'),
                  }),
                );
              } else {
                res.statusCode = 401;
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'Neispravno korisničko ime/email ili lozinka.',
                  }),
                );
              }
            } catch {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Neispravan format zahtjeva.' }));
            }
          });
          return;
        }

        if (!req.url?.startsWith('/api/fetch-documents') && !req.url?.startsWith('/api/crawl')) {
          return next();
        }

        try {
          const parsed = new URL(req.url, 'http://localhost:3000');
          const targetUrl = parsed.searchParams.get('url');

          if (!targetUrl) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: 'URL institucije nije obezbijeđen.' }));
            return;
          }

          let documents: { title: string; href: string; extension: string; category?: string }[] = [];

          try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 6000);

            const response = await fetch(targetUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BH-PapirFinder-Bot/1.0',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              },
              redirect: 'follow',
              signal: controller.signal,
            });
            clearTimeout(timeout);

            if (response.ok) {
              const html = await response.text();
              const $ = cheerio.load(html);

              $('a').each((_, element) => {
                const href = $(element).attr('href');
                let title = $(element).text().trim() || $(element).attr('title')?.trim() || '';

                if (href) {
                  const lower = href.toLowerCase();
                  if (
                    lower.endsWith('.pdf') ||
                    lower.endsWith('.doc') ||
                    lower.endsWith('.docx') ||
                    lower.endsWith('.xls') ||
                    lower.endsWith('.xlsx') ||
                    lower.endsWith('.odt') ||
                    lower.includes('download') ||
                    lower.includes('dokum') ||
                    lower.includes('obrazac')
                  ) {
                    let absoluteHref = href;
                    try {
                      if (href.startsWith('/')) {
                        const parsedTarget = new URL(targetUrl);
                        absoluteHref = `${parsedTarget.origin}${href}`;
                      } else if (!href.startsWith('http')) {
                        const parsedTarget = new URL(targetUrl);
                        const basePath = parsedTarget.pathname.substring(
                          0,
                          parsedTarget.pathname.lastIndexOf('/') + 1
                        );
                        absoluteHref = `${parsedTarget.origin}${basePath}${href}`;
                      }
                    } catch {
                      absoluteHref = href;
                    }

                    const cleanUrl = absoluteHref.split('?')[0].split('#')[0];
                    const extension = (cleanUrl.split('.').pop() || 'pdf').toUpperCase();

                    if (!title || title.length < 3) {
                      const filename = cleanUrl.split('/').pop() || 'Obrazac';
                      title = decodeURIComponent(filename)
                        .replace(/\.[^/.]+$/, '')
                        .replace(/[-_]/g, ' ')
                        .trim();
                    }

                    let category = 'Opća uprava';
                    const lowerText = `${title} ${absoluteHref}`.toLowerCase();
                    if (
                      lowerText.includes('građev') ||
                      lowerText.includes('urban') ||
                      lowerText.includes('lokacij') ||
                      lowerText.includes('investitor')
                    ) {
                      category = 'Urbanizam i građenje';
                    } else if (
                      lowerText.includes('obrt') ||
                      lowerText.includes('djelatnost') ||
                      lowerText.includes('poslov') ||
                      lowerText.includes('ugostit')
                    ) {
                      category = 'Privreda i obrt';
                    }

                    if (!documents.some((d) => d.href === absoluteHref)) {
                      documents.push({
                        title: title.length > 5 ? title : 'Administrativni obrazac',
                        href: absoluteHref,
                        extension,
                        category,
                      });
                    }
                  }
                }
              });
            }
          } catch (fetchErr) {
            console.warn('Vite middleware live fetch failed, checking verified registry:', fetchErr);
          }

          // Fallback na verifikovane obrasce za Kakanj ako je live sajt nedostupan sa servera
          if (documents.length === 0 && targetUrl.toLowerCase().includes('kakanj')) {
            documents = [
              {
                title: 'Zahtjev za promjenu investitora (OK-O-4.2.-38)',
                href: 'http://kakanj.gov.ba/v4/wp-content/uploads/2017/03/ZAHTJEV-ZA-PROMJENU-INVESTITORA-OK-O-4.2.-38.pdf',
                extension: 'PDF',
                category: 'Urbanizam i građenje',
              },
              {
                title: 'Zahtjev za izdavanje odobrenja za obavljanje djelatnosti (tehnički uslovi) - Pravna lica',
                href: 'http://kakanj.gov.ba/v4/wp-content/uploads/2014/08/Zahtjev-za-izdavanje-odobrenja-za-obavljanje-djelatnosti-tehni%C4%8Dki-uslovi-PRAVNA-LICA.pdf',
                extension: 'PDF',
                category: 'Privreda i poslovanje',
              },
              {
                title: 'Zahtjev za izdavanje odobrenja za obavljanje djelatnosti (tehnički uslovi) - Fizička lica',
                href: 'http://kakanj.gov.ba/v4/wp-content/uploads/2014/08/Zahtjev-za-izdavanje-odobrenja-za-obavljanje-djelatnosti-tehni%C4%8Dki-uslovi-FIZI%C4%8CKA-LICA-.pdf',
                extension: 'PDF',
                category: 'Privreda i obrt',
              },
              {
                title: 'Zahtjev za osnivanje obrta i srodne djelatnost',
                href: 'https://kakanj.gov.ba/v5/wp-content/uploads/2023/08/Zahtjev-za-osnivanje-obrta-srodne-djelatnost-1.pdf',
                extension: 'PDF',
                category: 'Privreda i obrt',
              },
              {
                title: 'Zahtjev za izdavanje odobrenja o osnivanju ugostiteljske radnje',
                href: 'http://kakanj.gov.ba/v4/isoobrasci/OBRASCI-SLU%8eBA%20ZA%20PRIVREDU,URBANIZAM%20I%20ZA%8aTITU%20OKOLINE/Zahtjev_za_izdavanje_odobrenja_o_osnivanju_ugostiteljske_radnje.pdf',
                extension: 'PDF',
                category: 'Privreda i obrt',
              },
              {
                title: 'Zahtjev za izmjenu rješenja o osnivanju radnje ili obavljanju djelatnosti',
                href: 'http://kakanj.gov.ba/v4/isoobrasci/OBRASCI-SLU%8eBA%20ZA%20PRIVREDU,URBANIZAM%20I%20ZA%8aTITU%20OKOLINE/Zahtjev_za_izmjenu_rje%9aenja_o_osnivanju_radnje_ili_obavljanju_djelatnosti.pdf',
                extension: 'PDF',
                category: 'Privreda i obrt',
              },
            ];
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              success: true,
              count: documents.length,
              documents,
            })
          );
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
    },
  };
}

const srcDir = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  plugins: [react(), apiCrawlerPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@': srcDir,
    },
  },
});