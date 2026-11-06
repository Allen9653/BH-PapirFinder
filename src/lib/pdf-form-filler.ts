import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// ============================================================
// PDF Form Filler Service — Using pdf-lib
// ============================================================

/**
 * Field mapping configuration for PDF forms
 * Defines where each data field should be placed on the PDF
 */
export interface PdfFieldMapping {
  fieldName: string;
  page: number; // 0-indexed page number
  x: number; // X coordinate from bottom-left
  y: number; // Y coordinate from bottom-left
  fontSize?: number;
  maxWidth?: number;
}

/**
 * User data to fill into the PDF
 */
export interface FormData {
  firstName?: string;
  lastName?: string;
  fatherName?: string;
  address?: string;
  jmbg?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  municipality?: string;
  purpose?: string;
  date?: string;
}

/**
 * Standard BH form field mappings
 * These coordinates are based on common BiH government form layouts
 */
export const STANDARD_FORM_MAPPINGS: Record<string, PdfFieldMapping[]> = {
  // Izvod iz matične knjige rođenih (Birth Certificate Extract)
  birth_certificate: [
    { fieldName: 'firstName', page: 0, x: 200, y: 620, fontSize: 11 },
    { fieldName: 'lastName', page: 0, x: 200, y: 595, fontSize: 11 },
    { fieldName: 'fatherName', page: 0, x: 200, y: 570, fontSize: 11 },
    { fieldName: 'dateOfBirth', page: 0, x: 200, y: 545, fontSize: 11 },
    { fieldName: 'placeOfBirth', page: 0, x: 200, y: 520, fontSize: 11 },
    { fieldName: 'jmbg', page: 0, x: 200, y: 495, fontSize: 11 },
    { fieldName: 'address', page: 0, x: 200, y: 470, fontSize: 11 },
    { fieldName: 'purpose', page: 0, x: 200, y: 420, fontSize: 11 },
    { fieldName: 'date', page: 0, x: 400, y: 350, fontSize: 10 },
  ],

  // Uvjerenje o državljanstvu (Citizenship Certificate)
  citizenship: [
    { fieldName: 'firstName', page: 0, x: 220, y: 600, fontSize: 11 },
    { fieldName: 'lastName', page: 0, x: 220, y: 575, fontSize: 11 },
    { fieldName: 'fatherName', page: 0, x: 220, y: 550, fontSize: 11 },
    { fieldName: 'jmbg', page: 0, x: 220, y: 525, fontSize: 11 },
    { fieldName: 'address', page: 0, x: 220, y: 500, fontSize: 11 },
    { fieldName: 'municipality', page: 0, x: 220, y: 475, fontSize: 11 },
    { fieldName: 'purpose', page: 0, x: 220, y: 425, fontSize: 11 },
    { fieldName: 'date', page: 0, x: 400, y: 360, fontSize: 10 },
  ],

  // Zahtjev za izdavanje lične karte (ID Card Request)
  id_card: [
    { fieldName: 'firstName', page: 0, x: 200, y: 640, fontSize: 11 },
    { fieldName: 'lastName', page: 0, x: 200, y: 615, fontSize: 11 },
    { fieldName: 'fatherName', page: 0, x: 200, y: 590, fontSize: 11 },
    { fieldName: 'dateOfBirth', page: 0, x: 200, y: 565, fontSize: 11 },
    { fieldName: 'jmbg', page: 0, x: 200, y: 540, fontSize: 11 },
    { fieldName: 'address', page: 0, x: 200, y: 515, fontSize: 11 },
    { fieldName: 'municipality', page: 0, x: 200, y: 490, fontSize: 11 },
    { fieldName: 'date', page: 0, x: 400, y: 380, fontSize: 10 },
  ],

  // Generic form (default fallback)
  generic: [
    { fieldName: 'firstName', page: 0, x: 200, y: 650, fontSize: 11 },
    { fieldName: 'lastName', page: 0, x: 200, y: 625, fontSize: 11 },
    { fieldName: 'fatherName', page: 0, x: 200, y: 600, fontSize: 11 },
    { fieldName: 'jmbg', page: 0, x: 200, y: 575, fontSize: 11 },
    { fieldName: 'address', page: 0, x: 200, y: 550, fontSize: 11 },
    { fieldName: 'purpose', page: 0, x: 200, y: 500, fontSize: 11 },
    { fieldName: 'date', page: 0, x: 400, y: 420, fontSize: 10 },
  ],
};

/**
 * Create a new blank PDF form with standard BH government form layout
 * Used when no template PDF is available
 */
export async function createBlankForm(formType: string, title?: string): Promise<PDFDocument> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { height } = page.getSize();

  // Header
  page.drawText('BOSNA I HERCEGOVINA', {
    x: 180,
    y: height - 50,
    size: 12,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  // Form title
  const formTitle = title || getFormTitle(formType);
  page.drawText(formTitle, {
    x: 150,
    y: height - 90,
    size: 14,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  // Field labels
  const labels = [
    { text: 'Ime:', y: height - 150 },
    { text: 'Prezime:', y: height - 175 },
    { text: 'Ime oca:', y: height - 200 },
    { text: 'JMBG:', y: height - 225 },
    { text: 'Adresa:', y: height - 250 },
    { text: 'Svrha:', y: height - 300 },
    { text: 'Datum:', y: height - 370 },
  ];

  for (const label of labels) {
    page.drawText(label.text, {
      x: 70,
      y: label.y,
      size: 11,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Draw underline for field
    page.drawLine({
      start: { x: 200, y: label.y - 2 },
      end: { x: 500, y: label.y - 2 },
      thickness: 0.5,
      color: rgb(0.7, 0.7, 0.7),
    });
  }

  // Footer
  page.drawText('Potpis podnosioca: ___________________', {
    x: 300,
    y: 100,
    size: 10,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });

  return pdfDoc;
}

/**
 * Fill a PDF document with user data based on field mappings
 */
export async function fillPdfForm(
  formData: FormData,
  formType: string = 'generic',
  existingPdfBytes?: Uint8Array
): Promise<Uint8Array> {
  let pdfDoc: PDFDocument;

  if (existingPdfBytes) {
    // Load existing PDF template
    pdfDoc = await PDFDocument.load(existingPdfBytes);
  } else {
    // Create a new blank form
    pdfDoc = await createBlankForm(formType);
  }

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const mappings = STANDARD_FORM_MAPPINGS[formType] || STANDARD_FORM_MAPPINGS['generic'];

  // Add current date if not provided
  const dataWithDate: FormData = {
    ...formData,
    date: formData.date || new Date().toLocaleDateString('bs-BA'),
  };

  // Fill each field
  for (const mapping of mappings) {
    const value = dataWithDate[mapping.fieldName as keyof FormData];
    if (!value) continue;

    const pages = pdfDoc.getPages();
    const page = pages[mapping.page];
    if (!page) continue;

    page.drawText(String(value), {
      x: mapping.x,
      y: mapping.y,
      size: mapping.fontSize || 11,
      font,
      color: rgb(0, 0, 0.6),
      maxWidth: mapping.maxWidth || 280,
    });
  }

  // Save and return the filled PDF as bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

/**
 * Fill a PDF that has AcroForm fields (interactive form fields)
 */
export async function fillPdfAcroForm(
  formData: FormData,
  pdfBytes: Uint8Array
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  // Map our data fields to common PDF form field names
  const fieldNameMap: Record<string, string[]> = {
    firstName: ['ime', 'first_name', 'firstName', 'Ime'],
    lastName: ['prezime', 'last_name', 'lastName', 'Prezime'],
    fatherName: ['ime_oca', 'father_name', 'fatherName', 'ImeOca'],
    jmbg: ['jmbg', 'JMBG', 'maticni_broj', 'MaticniBroj'],
    address: ['adresa', 'address', 'Address', 'Adresa'],
    purpose: ['svrha', 'purpose', 'Purpose', 'Svrha'],
    dateOfBirth: ['datum_rodjenja', 'date_of_birth', 'DatumRodjenja'],
    municipality: ['opcina', 'municipality', 'Opcina'],
  };

  for (const [dataKey, possibleFieldNames] of Object.entries(fieldNameMap)) {
    const value = formData[dataKey as keyof FormData];
    if (!value) continue;

    for (const fieldName of possibleFieldNames) {
      try {
        const field = form.getTextField(fieldName);
        if (field) {
          field.setText(String(value));
          break;
        }
      } catch {
        // Field not found, try next name
        continue;
      }
    }
  }

  // Flatten form to make it non-editable
  form.flatten();

  return await pdfDoc.save();
}

/**
 * Get form title based on form type
 */
function getFormTitle(formType: string): string {
  const titles: Record<string, string> = {
    birth_certificate: 'ZAHTJEV ZA IZVOD IZ MATIČNE KNJIGE ROĐENIH',
    citizenship: 'ZAHTJEV ZA UVJERENJE O DRŽAVLJANSTVU',
    id_card: 'ZAHTJEV ZA IZDAVANJE LIČNE KARTE',
    generic: 'ZAHTJEV',
  };
  return titles[formType] || titles['generic'];
}

/**
 * Detect form type from user input text
 */
export function detectFormType(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes('rodni') || lower.includes('rođen') || lower.includes('birth')) {
    return 'birth_certificate';
  }
  if (lower.includes('državljan') || lower.includes('citizenship') || lower.includes('vatandaş')) {
    return 'citizenship';
  }
  if (lower.includes('lična karta') || lower.includes('osobna') || lower.includes('id card') || lower.includes('kimlik')) {
    return 'id_card';
  }

  return 'generic';
}