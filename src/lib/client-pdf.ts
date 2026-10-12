import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

/** Font s latinicom (č, ć, đ, š, ž) i ćirilicom; učitava se sa vlastitog domena, bez sadržaja dokumenta. */
let fontPromise: Promise<ArrayBuffer> | null = null;
const loadFont = () =>
  (fontPromise ??= fetch('/fonts/FreeSans.ttf').then(r => {
    if (!r.ok) throw new Error(`Font: HTTP ${r.status}`);
    return r.arrayBuffer();
  }));

const A4: [number, number] = [595.28, 841.89];

/** Generiše PDF isključivo u memoriji preglednika (nema mrežnog prenosa sadržaja). */
export async function buildPdf(text: string, title: string, fontBytes?: ArrayBuffer): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const font = await doc.embedFont(fontBytes ?? (await loadFont()), { subset: true });
  doc.setTitle(title);
  doc.setCreator('BH PapirFinder');
  doc.setProducer('BH PapirFinder');

  const size = 11;
  const lineHeight = 15;
  const margin = 56;
  const maxWidth = A4[0] - 2 * margin;

  const lines: string[] = [];
  for (const para of text.split('\n')) {
    if (!para.trim()) {
      lines.push('');
      continue;
    }
    let cur = '';
    for (const word of para.split(/\s+/)) {
      const next = cur ? `${cur} ${word}` : word;
      if (cur && font.widthOfTextAtSize(next, size) > maxWidth) {
        lines.push(cur);
        cur = word;
      } else {
        cur = next;
      }
    }
    lines.push(cur);
  }

  let page = doc.addPage(A4);
  let y = A4[1] - margin;
  for (const line of lines) {
    if (y < margin) {
      page = doc.addPage(A4);
      y = A4[1] - margin;
    }
    if (line) page.drawText(line, { x: margin, y, size, font, color: rgb(0, 0, 0) });
    y -= lineHeight;
  }
  return doc.save();
}

export const pdfBlob = (bytes: Uint8Array) => new Blob([bytes as BlobPart], { type: 'application/pdf' });

export function toBase64(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}
