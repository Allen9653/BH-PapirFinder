// ============================================================
// BH-PapirFinder — Next.js App Router API Route
// Lokacija u Next.js projektu: app/api/crawl/route.ts
// Poziv rute: GET /api/crawl?url=https://kakanj.gov.ba/v5/e-obrasci/
// ============================================================

import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export interface CrawledDocument {
  title: string;
  href: string;
  extension: string;
  category?: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json(
      { success: false, error: 'URL institucije nije obezbijeđen (parametar ?url= je obavezan).' },
      { status: 400 }
    );
  }

  try {
    // 1. Validacija URL protokola
    let validUrl: URL;
    try {
      validUrl = new URL(targetUrl);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Navedeni URL nije u ispravnom formatu.' },
        { status: 400 }
      );
    }

    // 2. Fetchovanje stranice opštine / grada
    const response = await fetch(validUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BH-PapirFinder-Bot/1.0 (+https://papir-finder.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'bs,hr,sr,en-US,en;q=0.9',
      },
      // Dozvoli praćenje preusmjeravanja
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`Greška pri pristupu stranici: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const documents: CrawledDocument[] = [];

    // 3. Pronalaženje svih linkova koji vode ka obrascima i dokumentima (.pdf, .doc, .docx, .xls, .xlsx, .odt)
    $('a').each((_, element) => {
      const href = $(element).attr('href');
      let title = $(element).text().trim() || $(element).attr('title')?.trim() || '';

      if (href) {
        const lowerHref = href.toLowerCase();
        const hasDocExtension =
          lowerHref.endsWith('.pdf') ||
          lowerHref.endsWith('.doc') ||
          lowerHref.endsWith('.docx') ||
          lowerHref.endsWith('.xls') ||
          lowerHref.endsWith('.xlsx') ||
          lowerHref.endsWith('.odt') ||
          lowerHref.includes('.pdf?') ||
          lowerHref.includes('download') ||
          lowerHref.includes('dokum') ||
          lowerHref.includes('obrazac');

        if (hasDocExtension) {
          // Normalizacija relativnih URL-ova
          let absoluteHref = href;
          try {
            if (href.startsWith('/')) {
              absoluteHref = `${validUrl.origin}${href}`;
            } else if (!href.startsWith('http://') && !href.startsWith('https://')) {
              const basePath = validUrl.pathname.substring(0, validUrl.pathname.lastIndexOf('/') + 1);
              absoluteHref = `${validUrl.origin}${basePath}${href}`;
            }
          } catch {
            absoluteHref = href;
          }

          // Izdvajanje ekstenzije
          const cleanUrl = absoluteHref.split('?')[0].split('#')[0];
          const extension = cleanUrl.split('.').pop() || 'PDF';

          // Pametno čišćenje naslova ukoliko je tekst prazan
          if (!title || title.length < 3) {
            const filename = cleanUrl.split('/').pop() || 'Obrazac';
            title = decodeURIComponent(filename)
              .replace(/\.[^/.]+$/, '')
              .replace(/[-_]/g, ' ')
              .trim();
          }

          // Automatska detekcija kategorije prema ključnim riječima
          let category = 'Opća uprava';
          const lowerText = `${title} ${absoluteHref}`.toLowerCase();
          if (lowerText.includes('građev') || lowerText.includes('gradjev') || lowerText.includes('urban') || lowerText.includes('lokacij') || lowerText.includes('investitor')) {
            category = 'Urbanizam i građenje';
          } else if (lowerText.includes('obrt') || lowerText.includes('djelatnost') || lowerText.includes('poslov') || lowerText.includes('ugostit')) {
            category = 'Privreda i obrt';
          } else if (lowerText.includes('matic') || lowerText.includes('matič') || lowerText.includes('rodn') || lowerText.includes('izvod') || lowerText.includes('vjencan')) {
            category = 'Matični uredi';
          } else if (lowerText.includes('borac') || lowerText.includes('branit') || lowerText.includes('socij') || lowerText.includes('pomoc')) {
            category = 'Boračka i socijalna zaštita';
          }

          // Izbjegavanje duplikata
          if (!documents.some((doc) => doc.href === absoluteHref)) {
            documents.push({
              title: title.length > 3 ? title : 'Službeni administrativni obrazac',
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
      targetUrl: validUrl.toString(),
      count: documents.length,
      timestamp: new Date().toISOString(),
      documents,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Nepoznata greška pri skeniranju portala.',
      },
      { status: 500 }
    );
  }
}
