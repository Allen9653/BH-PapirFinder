// ============================================================
// AI Form Guidance Service
// Generates contextual form-filling instructions based on document metadata
// Uses category-based templates for common BiH government form types
// ============================================================

export interface FormGuideStep {
  stepNumber: number;
  title: string;
  description: string;
  tip?: string;
}

export interface FormGuide {
  formName: string;
  introduction: string;
  steps: FormGuideStep[];
  requiredDocuments: string[];
  importantNotes: string[];
  estimatedTime: string;
}

// ============================================================
// Language-specific labels
// ============================================================

interface LangLabels {
  introduction: string;
  requiredDocs: string;
  importantNotes: string;
  estimatedTime: string;
  minutes: string;
  step: string;
  tip: string;
  personalData: string;
  personalDataDesc: string;
  personalDataTip: string;
  address: string;
  addressDesc: string;
  contactInfo: string;
  contactInfoDesc: string;
  purpose: string;
  purposeDesc: string;
  signature: string;
  signatureDesc: string;
  signatureTip: string;
  idCard: string;
  birthCert: string;
  residenceCert: string;
  taxNumber: string;
  fee: string;
  feeNote: string;
  deadlineNote: string;
  originalNote: string;
  propertyData: string;
  propertyDataDesc: string;
  familyData: string;
  familyDataDesc: string;
  extractType: string;
  extractTypeDesc: string;
  taxData: string;
  taxDataDesc: string;
}

const labels: Record<string, LangLabels> = {
  bs: {
    introduction: 'Vodič za popunjavanje obrasca',
    requiredDocs: 'Potrebna dokumentacija',
    importantNotes: 'Važne napomene',
    estimatedTime: 'Procijenjeno vrijeme',
    minutes: 'minuta',
    step: 'Korak',
    tip: 'Savjet',
    personalData: 'Lični podaci',
    personalDataDesc: 'Unesite vaše ime, prezime, JMBG (jedinstveni matični broj građana), datum i mjesto rođenja.',
    personalDataTip: 'JMBG se sastoji od 13 cifara. Provjerite tačnost svakog broja.',
    address: 'Adresa prebivališta',
    addressDesc: 'Unesite vašu trenutnu adresu — ulica, broj, poštanski broj, grad/općina.',
    contactInfo: 'Kontakt podaci',
    contactInfoDesc: 'Unesite broj telefona i email adresu za kontakt.',
    purpose: 'Svrha zahtjeva',
    purposeDesc: 'Navedite razlog podnošenja zahtjeva ili obrazca.',
    signature: 'Potpis i datum',
    signatureDesc: 'Potpišite obrazac i upišite datum podnošenja.',
    signatureTip: 'Potpis mora odgovarati potpisu na ličnoj karti.',
    idCard: 'Lična karta (kopija)',
    birthCert: 'Izvod iz matične knjige rođenih',
    residenceCert: 'Uvjerenje o prebivalištu',
    taxNumber: 'Porezni broj / ID broj',
    fee: 'Administrativna taksa',
    feeNote: 'Provjerite iznos administrativne takse za vaš zahtjev na šalteru općine.',
    deadlineNote: 'Rok za obradu zahtjeva je obično 15-30 radnih dana.',
    originalNote: 'Dostavite originale ili ovjerene kopije dokumenata.',
    propertyData: 'Podaci o nekretnini',
    propertyDataDesc: 'Unesite podatke o lokaciji nekretnine — katastarska općina, broj parcele, adresa.',
    familyData: 'Podaci o porodici',
    familyDataDesc: 'Navedite podatke o članovima domaćinstva, prihodima i socijalnom statusu.',
    extractType: 'Vrsta izvoda',
    extractTypeDesc: 'Navedite vrstu izvoda koji vam je potreban (rodni list, vjenčani list, uvjerenje o državljanstvu).',
    taxData: 'Porezni podaci',
    taxDataDesc: 'Unesite vaš porezni identifikacioni broj (JIB) i podatke o poreskom obvezniku.',
  },
  en: {
    introduction: 'Form filling guide',
    requiredDocs: 'Required documents',
    importantNotes: 'Important notes',
    estimatedTime: 'Estimated time',
    minutes: 'minutes',
    step: 'Step',
    tip: 'Tip',
    personalData: 'Personal information',
    personalDataDesc: 'Enter your full name, JMBG (unique citizen number), date and place of birth.',
    personalDataTip: 'JMBG consists of 13 digits. Double-check each number for accuracy.',
    address: 'Residential address',
    addressDesc: 'Enter your current address — street, number, postal code, city/municipality.',
    contactInfo: 'Contact information',
    contactInfoDesc: 'Enter your phone number and email address.',
    purpose: 'Purpose of request',
    purposeDesc: 'State the reason for submitting this form or request.',
    signature: 'Signature and date',
    signatureDesc: 'Sign the form and write the submission date.',
    signatureTip: 'Your signature must match the one on your ID card.',
    idCard: 'ID card (copy)',
    birthCert: 'Birth certificate extract',
    residenceCert: 'Residence certificate',
    taxNumber: 'Tax number / ID number',
    fee: 'Administrative fee',
    feeNote: 'Check the administrative fee amount at the municipality counter.',
    deadlineNote: 'Processing time is usually 15-30 working days.',
    originalNote: 'Provide originals or certified copies of documents.',
    propertyData: 'Property information',
    propertyDataDesc: 'Enter the property location details — cadastral municipality, parcel number, address.',
    familyData: 'Family information',
    familyDataDesc: 'Provide details about household members, income, and social status.',
    extractType: 'Extract type',
    extractTypeDesc: 'Specify the type of extract you need (birth certificate, marriage certificate, citizenship certificate).',
    taxData: 'Tax information',
    taxDataDesc: 'Enter your tax identification number (JIB) and taxpayer details.',
  },
  de: {
    introduction: 'Ausfüllhilfe für das Formular',
    requiredDocs: 'Erforderliche Dokumente',
    importantNotes: 'Wichtige Hinweise',
    estimatedTime: 'Geschätzte Zeit',
    minutes: 'Minuten',
    step: 'Schritt',
    tip: 'Tipp',
    personalData: 'Persönliche Daten',
    personalDataDesc: 'Geben Sie Ihren vollständigen Namen, JMBG (Bürgeridentifikationsnummer), Geburtsdatum und -ort ein.',
    personalDataTip: 'Die JMBG besteht aus 13 Ziffern. Überprüfen Sie jede Ziffer.',
    address: 'Wohnadresse',
    addressDesc: 'Geben Sie Ihre aktuelle Adresse ein — Straße, Hausnummer, Postleitzahl, Stadt/Gemeinde.',
    contactInfo: 'Kontaktdaten',
    contactInfoDesc: 'Geben Sie Ihre Telefonnummer und E-Mail-Adresse ein.',
    purpose: 'Zweck des Antrags',
    purposeDesc: 'Geben Sie den Grund für die Einreichung dieses Formulars an.',
    signature: 'Unterschrift und Datum',
    signatureDesc: 'Unterschreiben Sie das Formular und tragen Sie das Einreichungsdatum ein.',
    signatureTip: 'Ihre Unterschrift muss mit der auf Ihrem Ausweis übereinstimmen.',
    idCard: 'Personalausweis (Kopie)',
    birthCert: 'Geburtsurkunde',
    residenceCert: 'Meldebestätigung',
    taxNumber: 'Steuernummer / ID-Nummer',
    fee: 'Verwaltungsgebühr',
    feeNote: 'Erkundigen Sie sich nach der Verwaltungsgebühr am Gemeindeschalter.',
    deadlineNote: 'Die Bearbeitungszeit beträgt in der Regel 15-30 Werktage.',
    originalNote: 'Legen Sie Originale oder beglaubigte Kopien vor.',
    propertyData: 'Immobiliendaten',
    propertyDataDesc: 'Geben Sie die Standortdaten der Immobilie ein — Katastergemeinde, Parzellennummer, Adresse.',
    familyData: 'Familiendaten',
    familyDataDesc: 'Geben Sie Angaben zu Haushaltsmitgliedern, Einkommen und Sozialstatus an.',
    extractType: 'Art des Auszugs',
    extractTypeDesc: 'Geben Sie die Art des benötigten Auszugs an (Geburtsurkunde, Heiratsurkunde, Staatsbürgerschaftsnachweis).',
    taxData: 'Steuerdaten',
    taxDataDesc: 'Geben Sie Ihre Steueridentifikationsnummer (JIB) und Steuerzahlerdaten ein.',
  },
  tr: {
    introduction: 'Form doldurma kılavuzu',
    requiredDocs: 'Gerekli belgeler',
    importantNotes: 'Önemli notlar',
    estimatedTime: 'Tahmini süre',
    minutes: 'dakika',
    step: 'Adım',
    tip: 'İpucu',
    personalData: 'Kişisel bilgiler',
    personalDataDesc: 'Tam adınızı, JMBG (vatandaş kimlik numarası), doğum tarihi ve yerini girin.',
    personalDataTip: 'JMBG 13 rakamdan oluşur. Her rakamı doğrulayın.',
    address: 'İkamet adresi',
    addressDesc: 'Mevcut adresinizi girin — sokak, numara, posta kodu, şehir/belediye.',
    contactInfo: 'İletişim bilgileri',
    contactInfoDesc: 'Telefon numaranızı ve e-posta adresinizi girin.',
    purpose: 'Başvuru amacı',
    purposeDesc: 'Bu formu gönderme nedeninizi belirtin.',
    signature: 'İmza ve tarih',
    signatureDesc: 'Formu imzalayın ve gönderim tarihini yazın.',
    signatureTip: 'İmzanız kimlik kartınızdaki ile eşleşmelidir.',
    idCard: 'Kimlik kartı (kopya)',
    birthCert: 'Doğum belgesi',
    residenceCert: 'İkamet belgesi',
    taxNumber: 'Vergi numarası / Kimlik numarası',
    fee: 'İdari ücret',
    feeNote: 'Belediye gişesinde idari ücret tutarını kontrol edin.',
    deadlineNote: 'İşlem süresi genellikle 15-30 iş günüdür.',
    originalNote: 'Belgelerin asıllarını veya onaylı kopyalarını sunun.',
    propertyData: 'Mülk bilgileri',
    propertyDataDesc: 'Mülk konum bilgilerini girin — kadastro belediyesi, parsel numarası, adres.',
    familyData: 'Aile bilgileri',
    familyDataDesc: 'Hane halkı üyeleri, gelir ve sosyal durum hakkında bilgi verin.',
    extractType: 'Belge türü',
    extractTypeDesc: 'İhtiyacınız olan belge türünü belirtin (doğum belgesi, evlilik belgesi, vatandaşlık belgesi).',
    taxData: 'Vergi bilgileri',
    taxDataDesc: 'Vergi kimlik numaranızı (JIB) ve vergi mükellefi bilgilerinizi girin.',
  },
};

// ============================================================
// Category-based form templates
// ============================================================

type CategoryKey =
  | 'maticni_ured'
  | 'urbanizam'
  | 'socijalna_zastita'
  | 'civilna_zastita'
  | 'opca_uprava'
  | 'finansije'
  | 'default';

// Map common category names to template keys
function getCategoryKey(category: string): CategoryKey {
  const lower = category.toLowerCase();

  if (lower.includes('matičn') || lower.includes('maticn') || lower.includes('rođen') || lower.includes('rodjen') || lower.includes('vjenčan') || lower.includes('vjenc')) {
    return 'maticni_ured';
  }
  if (lower.includes('urban') || lower.includes('građev') || lower.includes('gradjev') || lower.includes('prostorn') || lower.includes('gradnj')) {
    return 'urbanizam';
  }
  if (lower.includes('socijal') || lower.includes('zaštit') || lower.includes('zastit') || lower.includes('dječj') || lower.includes('djecj') || lower.includes('porodič') || lower.includes('porodic')) {
    return 'socijalna_zastita';
  }
  if (lower.includes('civiln') || lower.includes('vatrogasn') || lower.includes('spašavan') || lower.includes('spasavan')) {
    return 'civilna_zastita';
  }
  if (lower.includes('financ') || lower.includes('porez') || lower.includes('taks') || lower.includes('budžet') || lower.includes('budzet')) {
    return 'finansije';
  }
  if (lower.includes('uprav') || lower.includes('služb') || lower.includes('sluzb') || lower.includes('općin') || lower.includes('opcin')) {
    return 'opca_uprava';
  }

  return 'default';
}

// ============================================================
// Generate form guide
// ============================================================

/**
 * Generate a step-by-step guide for filling a specific form.
 * Uses the form's category and name to provide contextual guidance.
 */
export function generateFormGuide(
  formName: string,
  category: string,
  _description: string | null,
  language: string = 'bs'
): FormGuide {
  const lang = language in labels ? language : 'bs';
  const l = labels[lang];
  const categoryKey = getCategoryKey(category);

  const baseSteps = getBaseSteps(l);
  const categorySteps = getCategorySpecificSteps(categoryKey, l);
  const allSteps = [...baseSteps, ...categorySteps].map((step, index) => ({
    ...step,
    stepNumber: index + 1,
  }));

  const requiredDocs = getRequiredDocuments(categoryKey, l);
  const importantNotes = getImportantNotes(l);
  const estimatedTime = getEstimatedTime(categoryKey, l);

  return {
    formName,
    introduction: `${l.introduction}: ${formName}`,
    steps: allSteps,
    requiredDocuments: requiredDocs,
    importantNotes,
    estimatedTime,
  };
}

// ============================================================
// Step generators
// ============================================================

function getBaseSteps(l: LangLabels): Omit<FormGuideStep, 'stepNumber'>[] {
  return [
    {
      title: l.personalData,
      description: l.personalDataDesc,
      tip: l.personalDataTip,
    },
    {
      title: l.address,
      description: l.addressDesc,
    },
    {
      title: l.contactInfo,
      description: l.contactInfoDesc,
    },
  ];
}

function getCategorySpecificSteps(
  categoryKey: CategoryKey,
  l: LangLabels
): Omit<FormGuideStep, 'stepNumber'>[] {
  const steps: Omit<FormGuideStep, 'stepNumber'>[] = [];

  switch (categoryKey) {
    case 'maticni_ured':
      steps.push({
        title: l.extractType,
        description: l.extractTypeDesc,
      });
      break;
    case 'urbanizam':
      steps.push({
        title: l.propertyData,
        description: l.propertyDataDesc,
      });
      break;
    case 'socijalna_zastita':
      steps.push({
        title: l.familyData,
        description: l.familyDataDesc,
      });
      break;
    case 'civilna_zastita':
      steps.push({
        title: l.purpose,
        description: l.purposeDesc,
      });
      break;
    case 'finansije':
      steps.push({
        title: l.taxData,
        description: l.taxDataDesc,
      });
      break;
    default:
      steps.push({
        title: l.purpose,
        description: l.purposeDesc,
      });
  }

  // Always end with signature
  steps.push({
    title: l.signature,
    description: l.signatureDesc,
    tip: l.signatureTip,
  });

  return steps;
}

function getRequiredDocuments(categoryKey: CategoryKey, l: LangLabels): string[] {
  const baseDocs = [l.idCard];

  switch (categoryKey) {
    case 'maticni_ured':
      return [...baseDocs, l.birthCert, l.residenceCert, l.fee];
    case 'urbanizam':
      return [...baseDocs, l.residenceCert, l.taxNumber, l.fee];
    case 'socijalna_zastita':
      return [...baseDocs, l.birthCert, l.residenceCert];
    case 'civilna_zastita':
      return [...baseDocs, l.residenceCert, l.fee];
    case 'finansije':
      return [...baseDocs, l.taxNumber, l.fee];
    default:
      return [...baseDocs, l.residenceCert, l.fee];
  }
}

function getImportantNotes(l: LangLabels): string[] {
  return [l.feeNote, l.deadlineNote, l.originalNote];
}

function getEstimatedTime(categoryKey: CategoryKey, l: LangLabels): string {
  const times: Record<CategoryKey, number> = {
    maticni_ured: 10,
    urbanizam: 20,
    socijalna_zastita: 15,
    civilna_zastita: 10,
    finansije: 15,
    opca_uprava: 10,
    default: 10,
  };

  return `${times[categoryKey]} ${l.minutes}`;
}