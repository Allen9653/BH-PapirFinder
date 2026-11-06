import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PdfExportOptions {
  fileName?: string;
  formName?: string;
  municipalityName?: string;
  category?: string;
  description?: string;
}

/**
 * Exports an HTML element to a high-quality A4 PDF using html2canvas and jsPDF.
 * Fallbacks to text-based jsPDF rendering if canvas capture fails.
 */
export async function exportElementToPdf(
  element: HTMLElement,
  options: PdfExportOptions = {}
): Promise<boolean> {
  const defaultName = options.fileName || `${(options.formName || 'Obrazac').replace(/[^a-zA-Z0-9čćžšđČĆŽŠĐ\s-]/g, '').trim().replace(/\s+/g, '_')}_BiH.pdf`;

  try {
    // Render element to canvas with high DPI scale
    const canvas = await html2canvas(element, {
      scale: 2, // 2x resolution for sharp text on print
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // Standard A4 dimensions in mm
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Subsequent pages if document height exceeds single A4
    while (heightLeft > 5) {
      position = position - pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    pdf.save(defaultName);
    return true;
  } catch (err) {
    console.warn('[PDF Export] Canvas export failed, attempting direct text fallback:', err);
    return exportDirectFallbackPdf(options);
  }
}

/**
 * Fallback direct PDF generator in case the DOM element has sandboxed iframes or cross-origin issues
 */
export function exportDirectFallbackPdf(options: PdfExportOptions): boolean {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const margin = 15;
    let y = 20;

    // Header banner
    pdf.setFillColor(0, 61, 122); // #003D7A
    pdf.rect(0, 0, 210, 14, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.text('BOSNA I HERCEGOVINA - BH PAPIRFINDER - SLUŽBENI REGISTAR OBRAZACA', margin, 9);

    // Body
    pdf.setTextColor(20, 20, 20);
    pdf.setFontSize(16);
    y += 10;
    pdf.text(options.municipalityName ? options.municipalityName.toUpperCase() : 'NADLEŽNI ORGAN UPRAVE', margin, y);

    y += 8;
    pdf.setFontSize(14);
    pdf.setTextColor(0, 61, 122);
    const formTitleLines = pdf.splitTextToSize(options.formName || 'Službeni administrativni obrazac', 180);
    pdf.text(formTitleLines, margin, y);
    y += formTitleLines.length * 7;

    pdf.setFontSize(10);
    pdf.setTextColor(80, 80, 80);
    pdf.text(`Kategorija: ${options.category || 'Opći obrasci'} | Datum: ${new Date().toLocaleDateString('bs-BA')}`, margin, y);
    y += 8;

    // Divider line
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, y, 195, y);
    y += 8;

    if (options.description) {
      pdf.setFontSize(10);
      pdf.setTextColor(40, 40, 40);
      const descLines = pdf.splitTextToSize(`Svrha i opis: ${options.description}`, 180);
      pdf.text(descLines, margin, y);
      y += descLines.length * 5 + 6;
    }

    // Required checklist box
    pdf.setFillColor(248, 250, 252);
    pdf.rect(margin, y, 180, 45, 'F');
    pdf.rect(margin, y, 180, 45, 'S');

    pdf.setFontSize(10);
    pdf.setTextColor(0, 61, 122);
    pdf.text('Kontrolna lista potrebne dokumentacije za predaju na šalteru:', margin + 4, y + 7);

    pdf.setFontSize(9);
    pdf.setTextColor(50, 50, 50);
    pdf.text('[ ] Uredno popunjen i potpisan ovaj zahtjev/obrazac', margin + 4, y + 14);
    pdf.text('[ ] Lična karta / identifikacioni dokument podnosioca na uvid', margin + 4, y + 20);
    pdf.text('[ ] CIPS prijava prebivališta (PBA-3 obrazac)', margin + 4, y + 26);
    pdf.text('[ ] Dokaz o uplati općinske administrativne takse (uplatnica)', margin + 4, y + 32);
    pdf.text('[ ] Dodatni specifični prilozi navedeni u tekstu obrasca', margin + 4, y + 38);

    y += 55;

    // Protocol signature section
    pdf.rect(margin, y, 85, 35, 'S');
    pdf.rect(margin + 95, y, 85, 35, 'S');

    pdf.text('Potpis podnosioca zahtjeva:', margin + 4, y + 6);
    pdf.text('Ime i prezime: ____________________', margin + 4, y + 15);
    pdf.text('JMBG: ____________________________', margin + 4, y + 23);
    pdf.text('Potpis: ___________________________', margin + 4, y + 31);

    pdf.text('Prijemni štambilj / Protokol:', margin + 99, y + 6);
    pdf.text('Broj protokola: ___________________', margin + 99, y + 15);
    pdf.text(`Datum prijema: __.__.${new Date().getFullYear()}. god.`, margin + 99, y + 23);

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(120, 120, 120);
    pdf.text('Generisano putem portala BH PapirFinder • www.papir-finder.com • Važeći format', margin, 285);

    const defaultName = options.fileName || `${(options.formName || 'Obrazac').replace(/[^a-zA-Z0-9]/g, '_')}_BiH.pdf`;
    pdf.save(defaultName);
    return true;
  } catch (err) {
    console.error('[PDF Export] Direct fallback failed:', err);
    return false;
  }
}
