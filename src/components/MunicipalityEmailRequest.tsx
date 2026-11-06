import { useState, type FormEvent } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { latinToCyrillic } from '@/lib/cyrillic-converter';
import ljubinjeEmailCopy from '@/data/ljubinje-email-copy.json';
import { safeHttpsUrl } from '@/lib/institution-directory';
import type { Language } from '@/locales';
import { AlertTriangle, ExternalLink, Mail } from 'lucide-react';

const COPY = {
  bs: {
    title: 'Dokumenti nisu navedeni u BH PapirFinderu',
    description: 'Trenutno nemamo pojedinačno navedene digitalne obrasce ili dokumente za {municipality}.',
    portal: 'Prije slanja zahtjeva provjerite službenu stranicu ili e-servis — možda sadrže dokumente koji još nisu navedeni u BH PapirFinderu.',
    openPortal: 'Provjeri službeni portal',
    stepsTitle: 'Pripremite zahtjev u 3 koraka:',
    steps: [
      'Navedite dokument ili obrazac koji trebate.',
      'Unesite svoje ime i e-mail za odgovor; telefon je opcionalan.',
      'Unesite službeni e-mail općine ako nije već poznat i generišite poruku.',
    ],
    document: 'Koji dokument ili obrazac trebate?',
    name: 'Ime i prezime',
    email: 'Vaš e-mail za odgovor',
    phone: 'Kontakt telefon (opcionalno)',
    recipient: 'Službeni e-mail općine',
    recipientHint: 'Nije pronađen u podacima aplikacije. Unesite adresu sa službene stranice.',
    button: 'Generiši e-mail zahtjev',
    mailNote: 'Poruka se ne šalje automatski. Pregledajte je i pritisnite „Pošalji“ u svom e-mail programu.',
    subject: 'Zahtjev za dostavu obrasca/informacije putem aplikacije BH PapirFinder',
    greeting: 'Poštovani,',
    request: 'Molim vas za dostavu sljedećeg obrasca/dokumenta: {document}.',
    unavailable: 'Dokument trenutno nije pojedinačno naveden u BH PapirFinderu. Molim vas da mi ga, ako je dostupan, dostavite elektronskim putem ili me uputite na odgovarajući obrazac i postupak.',
    applicant: 'Podaci o podnosiocu zahtjeva:',
    phoneLine: 'Kontakt telefon',
    emailLine: 'E-mail za odgovor',
    thanks: 'Unaprijed hvala na pomoći.',
    signoff: 'Srdačan pozdrav,',
    generated: '(Zahtjev pripremljen putem platforme BH PapirFinder)',
  },
  en: {
    title: 'Documents are not listed in BH PapirFinder',
    description: 'No individual digital forms or documents are currently listed for {municipality}.',
    portal: 'Before sending a request, check the official website or e-service; it may contain documents not yet listed in BH PapirFinder.',
    openPortal: 'Check official portal',
    stepsTitle: 'Prepare a request in 3 steps:',
    steps: [
      'Describe the document or form you need.',
      'Enter your name and reply email; phone is optional.',
      'Enter the municipality’s official email if it is not already known, then prepare the message.',
    ],
    document: 'What document or form do you need?',
    name: 'Full name',
    email: 'Your reply email',
    phone: 'Phone number (optional)',
    recipient: 'Municipality’s official email',
    recipientHint: 'Not found in the app data. Enter an address from the official website.',
    button: 'Prepare email request',
    mailNote: 'The message is not sent automatically. Review it and press “Send” in your email app.',
    subject: 'Request for a form/information via the BH PapirFinder app',
    greeting: 'Dear Sir/Madam,',
    request: 'Please provide the following form/document: {document}.',
    unavailable: 'This document is not currently listed individually in BH PapirFinder. If available, please send it electronically or direct me to the appropriate form and procedure.',
    applicant: 'Applicant details:',
    phoneLine: 'Phone number',
    emailLine: 'Reply email',
    thanks: 'Thank you in advance for your assistance.',
    signoff: 'Kind regards,',
    generated: '(Request prepared via the BH PapirFinder platform)',
  },
  de: {
    title: 'Dokumente sind bei BH PapirFinder nicht aufgeführt',
    description: 'Für {municipality} sind derzeit keine einzelnen digitalen Formulare oder Dokumente aufgeführt.',
    portal: 'Prüfen Sie vor dem Versand die offizielle Website oder den E-Service. Dort können Dokumente verfügbar sein, die bei BH PapirFinder noch nicht aufgeführt sind.',
    openPortal: 'Offizielles Portal prüfen',
    stepsTitle: 'Anfrage in 3 Schritten vorbereiten:',
    steps: [
      'Beschreiben Sie das benötigte Dokument oder Formular.',
      'Geben Sie Ihren Namen und Ihre Antwort-E-Mail ein; die Telefonnummer ist optional.',
      'Geben Sie die offizielle E-Mail-Adresse der Gemeinde ein, falls sie noch nicht bekannt ist, und erstellen Sie die Nachricht.',
    ],
    document: 'Welches Dokument oder Formular benötigen Sie?',
    name: 'Vor- und Nachname',
    email: 'Ihre Antwort-E-Mail',
    phone: 'Telefonnummer (optional)',
    recipient: 'Offizielle E-Mail der Gemeinde',
    recipientHint: 'In den App-Daten nicht gefunden. Bitte eine Adresse von der offiziellen Website eingeben.',
    button: 'E-Mail-Anfrage vorbereiten',
    mailNote: 'Die Nachricht wird nicht automatisch gesendet. Prüfen Sie sie und klicken Sie in Ihrem E-Mail-Programm auf „Senden“.',
    subject: 'Anfrage zu einem Formular/einer Information über BH PapirFinder',
    greeting: 'Sehr geehrte Damen und Herren,',
    request: 'Bitte senden Sie mir das folgende Formular/Dokument: {document}.',
    unavailable: 'Dieses Dokument ist derzeit bei BH PapirFinder nicht einzeln aufgeführt. Falls verfügbar, senden Sie es mir bitte elektronisch oder teilen Sie mir das passende Formular und Verfahren mit.',
    applicant: 'Angaben zur antragstellenden Person:',
    phoneLine: 'Telefonnummer',
    emailLine: 'Antwort-E-Mail',
    thanks: 'Vielen Dank im Voraus für Ihre Hilfe.',
    signoff: 'Mit freundlichen Grüßen,',
    generated: '(Anfrage über die BH PapirFinder-Plattform vorbereitet)',
  },
  tr: {
    title: 'Belgeler BH PapirFinder’da listelenmiyor',
    description: '{municipality} için şu anda ayrı dijital form veya belge listelenmemiştir.',
    portal: 'Talep göndermeden önce resmi web sitesini veya e-Hizmet sistemini kontrol edin; BH PapirFinder’da henüz listelenmeyen belgeler orada bulunabilir.',
    openPortal: 'Resmi portalı kontrol et',
    stepsTitle: 'Talebi 3 adımda hazırlayın:',
    steps: [
      'İhtiyacınız olan belgeyi veya formu açıklayın.',
      'Adınızı ve yanıt e-postanızı girin; telefon isteğe bağlıdır.',
      'Henüz bilinmiyorsa belediyenin resmi e-posta adresini girin ve mesajı hazırlayın.',
    ],
    document: 'Hangi belge veya forma ihtiyacınız var?',
    name: 'Ad ve soyad',
    email: 'Yanıt e-postanız',
    phone: 'Telefon numarası (isteğe bağlı)',
    recipient: 'Belediyenin resmi e-postası',
    recipientHint: 'Uygulama verilerinde bulunamadı. Resmi web sitesindeki bir adresi girin.',
    button: 'E-posta talebini hazırla',
    mailNote: 'Mesaj otomatik gönderilmez. E-posta uygulamanızda gözden geçirip “Gönder” düğmesine basın.',
    subject: 'BH PapirFinder üzerinden form/bilgi talebi',
    greeting: 'Sayın Yetkili,',
    request: 'Aşağıdaki formun/belgenin tarafıma iletilmesini rica ederim: {document}.',
    unavailable: 'Bu belge şu anda BH PapirFinder’da ayrı olarak listelenmemektedir. Mevcutsa elektronik ortamda göndermenizi veya uygun form ve prosedür hakkında bilgi vermenizi rica ederim.',
    applicant: 'Başvuru sahibi bilgileri:',
    phoneLine: 'Telefon numarası',
    emailLine: 'Yanıt e-postası',
    thanks: 'Yardımınız için şimdiden teşekkür ederim.',
    signoff: 'Saygılarımla,',
    generated: '(Talep BH PapirFinder platformu üzerinden hazırlanmıştır)',
  },
} as const;

function localize(text: string, language: Language): string {
  if (language !== 'bs-Cyrl') return text;
  const protectedTokens: string[] = [];
  const value = text.replace(/BH PapirFinder|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, (token) => {
    protectedTokens.push(token);
    return `\uE000${protectedTokens.length - 1}\uE000`;
  });
  return latinToCyrillic(value).replace(/\uE000(\d+)\uE000/g, (_match, index: string) => protectedTokens[Number(index)]);
}

interface MunicipalityEmailRequestProps {
  municipalitySlug?: string;
  municipalityName: string;
  municipalityEmail?: string;
  municipalityContact?: {
    address?: string;
    taxId?: string;
    treasuryAccount?: string;
    phone?: string;
    workingHours?: string;
  };
  formsUrl?: string;
  language: Language;
}

export default function MunicipalityEmailRequest({
  municipalitySlug,
  municipalityName,
  municipalityEmail,
  municipalityContact,
  formsUrl,
  language,
}: MunicipalityEmailRequestProps) {
  const [document, setDocument] = useState('');
  const [name, setName] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [recipient, setRecipient] = useState(municipalityEmail ?? '');
  const copy = COPY[language === 'bs-Cyrl' ? 'bs' : language];
  const ljubinjeCopy = municipalitySlug === 'ljubinje' ? ljubinjeEmailCopy[language] : undefined;
  const display = (text: string) => localize(text, language);
  const safeFormsUrl = safeHttpsUrl(formsUrl);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = recipient.trim();
    if (!target || !document.trim() || !name.trim() || !replyEmail.trim()) return;

    const subject = ljubinjeCopy?.subject ?? display(copy.subject);
    const body = [
      display(copy.greeting),
      '',
      display(copy.request).replace('{document}', document.trim()),
      '',
      display(copy.unavailable),
      '',
      display(copy.applicant),
      `- ${display(copy.name)}: ${name.trim()}`,
      ...(phone.trim() ? [`- ${display(copy.phoneLine)}: ${phone.trim()}`] : []),
      `- ${display(copy.emailLine)}: ${replyEmail.trim()}`,
      '',
      display(copy.thanks),
      '',
      display(copy.signoff),
      `**${name.trim()}**`,
      '',
      display(copy.generated),
    ].join('\n');

    window.location.assign(`mailto:${encodeURIComponent(target)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <Alert className="mb-6 border-amber-300 bg-amber-50 text-amber-950">
      <AlertTriangle className="h-5 w-5 text-amber-700" />
      <AlertTitle className="text-base font-bold">{ljubinjeCopy?.alert ?? display(copy.title)}</AlertTitle>
      <AlertDescription className="mt-2 space-y-4 text-amber-950">
      {!ljubinjeCopy && (
        <p className="font-semibold">{display(copy.description).replace('{municipality}', municipalityName)}</p>
      )}
      {ljubinjeCopy && municipalityContact && (
        <div className="rounded-md border border-amber-200 bg-white/70 p-3 text-sm">
          <p className="mb-2 font-semibold">{ljubinjeCopy.contact.title}</p>
          <dl className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
            {municipalityContact.address && (
              <div><dt className="inline font-medium">{ljubinjeCopy.contact.address}: </dt><dd className="inline">{display(municipalityContact.address)}</dd></div>
            )}
            {municipalityContact.taxId && (
              <div><dt className="inline font-medium">{ljubinjeCopy.contact.taxId}: </dt><dd className="inline">{municipalityContact.taxId}</dd></div>
            )}
            {municipalityContact.treasuryAccount && (
              <div><dt className="inline font-medium">{ljubinjeCopy.contact.treasuryAccount}: </dt><dd className="inline">{display(municipalityContact.treasuryAccount)}</dd></div>
            )}
            {municipalityEmail && (
              <div><dt className="inline font-medium">{ljubinjeCopy.contact.email}: </dt><dd className="inline"><a className="underline" href={`mailto:${municipalityEmail}`}>{municipalityEmail}</a></dd></div>
            )}
            {municipalityContact.phone && (
              <div><dt className="inline font-medium">{ljubinjeCopy.contact.phone}: </dt><dd className="inline"><a className="underline" href={`tel:${municipalityContact.phone}`}>{municipalityContact.phone}</a></dd></div>
            )}
            {municipalityContact.workingHours && (
              <div><dt className="inline font-medium">{ljubinjeCopy.contact.workingHours}: </dt><dd className="inline">{display(municipalityContact.workingHours)}</dd></div>
            )}
          </dl>
        </div>
      )}
        <p>{display(copy.portal)}</p>
        {safeFormsUrl && (
          <Button asChild size="sm" variant="outline" className="border-amber-500 bg-white text-amber-950">
            <a href={safeFormsUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              {display(copy.openPortal)}
            </a>
          </Button>
        )}
        <div>
          <p className="font-semibold">{display(copy.stepsTitle)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-5">
            {(ljubinjeCopy?.steps ?? copy.steps).map((step) => (
              <li key={step}>{ljubinjeCopy ? step : display(step)}</li>
            ))}
          </ol>
        </div>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="municipality-request-document">{display(copy.document)}</Label>
            <Input id="municipality-request-document" required value={document} onChange={(event) => setDocument(event.target.value)} className="bg-white text-gray-900" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="municipality-request-recipient">{display(copy.recipient)}</Label>
            <Input
              id="municipality-request-recipient"
              required
              type="email"
              autoComplete="off"
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
              className="bg-white text-gray-900"
            />
            {!municipalityEmail && <p className="text-xs text-amber-900">{display(copy.recipientHint)}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="municipality-request-name">{display(copy.name)}</Label>
            <Input id="municipality-request-name" required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="bg-white text-gray-900" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="municipality-request-email">{display(copy.email)}</Label>
            <Input id="municipality-request-email" required type="email" autoComplete="email" value={replyEmail} onChange={(event) => setReplyEmail(event.target.value)} className="bg-white text-gray-900" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="municipality-request-phone">{display(copy.phone)}</Label>
            <Input id="municipality-request-phone" type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="bg-white text-gray-900" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Button type="submit" className="bg-[#003D7A] hover:bg-[#002A5A]">
              <Mail className="mr-2 h-4 w-4" />
              {display(copy.button)}
            </Button>
            <p className="text-xs text-amber-900">{display(copy.mailNote)}</p>
          </div>
        </form>
      </AlertDescription>
    </Alert>
  );
}
