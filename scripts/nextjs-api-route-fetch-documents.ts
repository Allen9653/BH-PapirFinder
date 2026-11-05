// ============================================================
// Next.js App Router API Route for /api/fetch-documents
// Lokacija u Next.js projektu: app/api/fetch-documents/route.ts
// Poziv: GET /api/fetch-documents?url=https://kakanj.gov.ba/v5/e-obrasci/
// ============================================================

import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ success: false, error: 'URL institucije nije obezbijeđen.' }, { status: 400 });
  }

  try {
    // 1. Fetchovanje stranice opštine sa prilagođenim User-Agentom
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BH-PapirFinder-Bot/1.0 (+https://papir-finder.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'bs,hr,sr,en;q=0.9',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`Greška pri pristupu stranici: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const documents: { title: string; href: string; extension: string; category?: string }[] = [];

    // 2. Pronalaženje svih linkova koji vode ka dokumentima (.pdf, .doc, .docx, .xls)
    $('a').each((_, element) => {
      const href = $(element).attr('href');
      let title = $(element).text().trim() || $(element).attr('title')?.trim() || '';

      if (href) {
        const lowerHref = href.toLowerCase();
        if (
          lowerHref.endsWith('.pdf') ||
          lowerHref.endsWith('.doc') ||
          lowerHref.endsWith('.docx') ||
          lowerHref.endsWith('.xls') ||
          lowerHref.endsWith('.xlsx') ||
          lowerHref.endsWith('.odt') ||
          lowerHref.includes('download') ||
          lowerHref.includes('dokum') ||
          lowerHref.includes('obrazac')
        ) {
          // Normalizacija URL-a ukoliko je relativni link
          let absoluteHref = href;
          try {
            if (href.startsWith('/')) {
              const parsedUrl = new URL(targetUrl);
              absoluteHref = `${parsedUrl.origin}${href}`;
            } else if (!href.startsWith('http')) {
              const parsedUrl = new URL(targetUrl);
              const basePath = parsedUrl.pathname.substring(0, parsedUrl.pathname.lastIndexOf('/') + 1);
              absoluteHref = `${parsedUrl.origin}${basePath}${href}`;
            }
          } catch {
            absoluteHref = href;
          }

          const cleanUrl = absoluteHref.split('?')[0].split('#')[0];
          const extension = cleanUrl.split('.').pop() || 'pdf';

          if (!title || title.length < 3) {
            const filename = cleanUrl.split('/').pop() || 'Obrazac';
            title = decodeURIComponent(filename)
              .replace(/\.[^/.]+$/, '')
              .replace(/[-_]/g, ' ')
              .trim();
          }

          // Određivanje kategorije
          let category = 'Opća uprava';
          const lowerText = `${title} ${absoluteHref}`.toLowerCase();
          if (lowerText.includes('građev') || lowerText.includes('urban') || lowerText.includes('lokacij') || lowerText.includes('investitor')) {
            category = 'Urbanizam i građenje';
          } else if (lowerText.includes('obrt') || lowerText.includes('djelatnost') || lowerText.includes('poslov') || lowerText.includes('ugostit')) {
            category = 'Privreda i obrt';
          } else if (lowerText.includes('matic') || lowerText.includes('matič') || lowerText.includes('rodn') || lowerText.includes('izvod')) {
            category = 'Matični uredi';
          }

          // Izbjegavanje duplikata
          if (!documents.some((doc) => doc.href === absoluteHref)) {
            documents.push({
              title: title.length > 5 ? title : 'Administrativni obrazac',
              href: absoluteHref,
              extension: extension.toUpperCase(),
              category,
            });
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      targetUrl,
      count: documents.length,
      documents,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
