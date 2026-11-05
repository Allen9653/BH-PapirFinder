import { useState, type FormEvent } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { latinToCyrillic } from '@/lib/cyrillic-converter';
import type { Language } from '@/locales';
import { AlertTriangle, Mail } from 'lucide-react';

const RECIPIENT = 'opcina.kladanj@bih.net.ba';
const DOCUMENT_OPTIONS = [
  ['Rodni list / izvod iz matične knjige rođenih', 'Birth certificate / birth register extract', 'Geburtsurkunde / Auszug aus dem Geburtenregister', 'Doğum belgesi / doğum kayıt örneği'],
  ['Uvjerenje o državljanstvu', 'Certificate of citizenship', 'Staatsangehörigkeitsbescheinigung', 'Vatandaşlık belgesi'],
  ['Vjenčani list / izvod iz matične knjige vjenčanih', 'Marriage certificate / marriage register extract', 'Heiratsurkunde / Auszug aus dem Eheregister', 'Evlilik belgesi / evlilik kayıt örneği'],
  ['Uvjerenje o prebivalištu', 'Residence certificate', 'Meldebescheinigung', 'İkamet belgesi'],
  ['Obrazac za općinsku službu', 'Municipal service form', 'Formular für eine Gemeindeverwaltung', 'Belediye hizmet formu'],
] as const;

const COPY = {
  bs: {
    title: 'Dokumenti nisu dostupni online',
    description: 'Općina Kladanj trenutno nema učitane digitalne obrasce na svom e-Servisu.',
    explanation: 'Ne morate ići u općinu samo da biste zatražili obrazac. BH PapirFinder može pripremiti zvanični e-mail zahtjev Službi za opću upravu Općine Kladanj. Zahtjev možete podnijeti pozivajući se na važeće propise; općina će odgovoriti u skladu s primjenjivim pravilima.',
    stepsTitle: 'Pripremite e-mail zahtjev u 3 koraka:',
    steps: [
      'Odaberite dokument ili obrazac koji trebate.',
      'Unesite ime, prezime, telefon i e-mail za odgovor.',
      'Kliknite dugme. Otvorit će se vaš e-mail program s pripremljenom porukom za opcina.kladanj@bih.net.ba.',
    ],
    document: 'Dokument ili obrazac koji trebate',
    choose: 'Odaberite dokument ili unesite naziv',
    other: 'Drugi dokument ili obrazac',
    documentOptions: DOCUMENT_OPTIONS.map(([bs]) => bs),
    firstName: 'Ime',
    lastName: 'Prezime',
    phone: 'Kontakt telefon',
    replyEmail: 'E-mail za odgovor',
    button: 'Generiši e-mail zahtjev',
    mailNote: 'Poruka se ne šalje automatski. Pregledajte je i pritisnite „Pošalji“ u svom e-mail programu.',
    subject: 'Zahtjev za dostavu obrasca/informacije putem aplikacije BH PapirFinder',
    greeting: 'Poštovani,',
    request: 'Obraćam vam se sa zahtjevom za dostavu obrasca/dokumenta: ',
    unavailable: 'Budući da navedeni dokument trenutno nije dostupan za preuzimanje na zvaničnoj web stranici i e-servisima Općine Kladanj, molim vas da mi ga, ako je moguće, dostavite u elektronskoj formi (PDF ili Word) kao odgovor na ovaj e-mail ili da me uputite na odgovarajući postupak. Zahtjev podnosim pozivajući se na važeće propise o pristupu informacijama i upravnom postupku.',
    applicant: 'Podaci o podnosiocu zahtjeva:',
    fullName: 'Ime i prezime',
    phoneLine: 'Kontakt telefon',
    emailLine: 'E-mail za odgovor',
    thanks: 'Unaprijed hvala na saradnji i doprinosu digitalizaciji javnih usluga.',
    signoff: 'Srdačan pozdrav,',
    generated: '(Zahtjev generisan putem platforme BH PapirFinder)',
  },
  en: {
    title: 'Documents not available online',
    description: 'The Municipality of Kladanj currently has no digital forms uploaded to its e-Service.',
    explanation: 'You do not need to visit the municipality just to request a form. BH PapirFinder can prepare an official email request to the Kladanj Municipality General Administration Service. You may submit a request under applicable rules; the municipality will respond according to the procedures that apply.',
    stepsTitle: 'Prepare an email request in 3 steps:',
    steps: [
      'Select the document or form you need.',
      'Enter your first name, last name, phone number, and reply email.',
      'Click the button. Your email app will open with a prepared message to opcina.kladanj@bih.net.ba.',
    ],
    document: 'Document or form needed',
    choose: 'Select a document or enter its name',
    other: 'Other document or form',
    documentOptions: DOCUMENT_OPTIONS.map(([, en]) => en),
    firstName: 'First name',
    lastName: 'Last name',
    phone: 'Phone number',
    replyEmail: 'Reply email',
    button: 'Prepare email request',
    mailNote: 'The message is not sent automatically. Review it and press “Send” in your email app.',
    subject: 'Request for document/information via the BH PapirFinder app',
    greeting: 'Dear Sir/Madam,',
    request: 'I am contacting you to request the following form/document: ',
    unavailable: 'As this document is currently unavailable for download from the Municipality of Kladanj’s official website and e-services, please provide it in digital format (PDF or Word) by replying to this email, if possible, or advise me of the appropriate procedure. This request is made with reference to the applicable freedom-of-information and administrative-procedure rules.',
    applicant: 'Applicant details:',
    fullName: 'Full name',
    phoneLine: 'Phone number',
    emailLine: 'Reply email',
    thanks: 'Thank you for your cooperation and contribution to the digitalization of public services.',
    signoff: 'Kind regards,',
    generated: '(Request prepared via the BH PapirFinder platform)',
  },
  de: {
    title: 'Dokumente online nicht verfügbar',
    description: 'Die Gemeinde Kladanj hat derzeit keine digitalen Formulare in ihrem E-Service hochgeladen.',
    explanation: 'Sie müssen nicht persönlich zur Gemeinde gehen, nur um ein Formular anzufordern. BH PapirFinder kann eine offizielle E-Mail-Anfrage an die Allgemeine Verwaltung der Gemeinde Kladanj vorbereiten. Sie können eine Anfrage nach den geltenden Vorschriften stellen; die Gemeinde antwortet gemäß den anwendbaren Verfahren.',
    stepsTitle: 'E-Mail-Anfrage in 3 Schritten vorbereiten:',
    steps: [
      'Wählen Sie das benötigte Dokument oder Formular aus.',
      'Geben Sie Vorname, Nachname, Telefonnummer und Antwort-E-Mail ein.',
      'Klicken Sie auf die Schaltfläche. Ihr E-Mail-Programm öffnet eine vorbereitete Nachricht an opcina.kladanj@bih.net.ba.',
    ],
    document: 'Benötigtes Dokument oder Formular',
    choose: 'Dokument auswählen oder Namen eingeben',
    other: 'Anderes Dokument oder Formular',
    documentOptions: DOCUMENT_OPTIONS.map(([, , de]) => de),
    firstName: 'Vorname',
    lastName: 'Nachname',
    phone: 'Telefonnummer',
    replyEmail: 'E-Mail für die Antwort',
    button: 'E-Mail-Anfrage vorbereiten',
    mailNote: 'Die Nachricht wird nicht automatisch gesendet. Prüfen Sie sie und klicken Sie in Ihrem E-Mail-Programm auf „Senden“.',
    subject: 'Anfrage zur Bereitstellung eines Dokuments/einer Information über BH PapirFinder',
    greeting: 'Sehr geehrte Damen und Herren,',
    request: 'Ich bitte um Zusendung des folgenden Formulars/Dokuments: ',
    unavailable: 'Da dieses Dokument derzeit nicht auf der offiziellen Website und den E-Services der Gemeinde Kladanj zum Download verfügbar ist, bitte ich Sie, es mir nach Möglichkeit als PDF oder Word-Datei per Antwort auf diese E-Mail zuzusenden oder mich über das zuständige Verfahren zu informieren. Ich beziehe mich dabei auf die geltenden Vorschriften zum Informationszugang und Verwaltungsverfahren.',
    applicant: 'Angaben zur antragstellenden Person:',
    fullName: 'Vor- und Nachname',
    phoneLine: 'Telefonnummer',
    emailLine: 'E-Mail für die Antwort',
    thanks: 'Vielen Dank für Ihre Zusammenarbeit und Ihren Beitrag zur Digitalisierung öffentlicher Dienstleistungen.',
    signoff: 'Mit freundlichen Grüßen,',
    generated: '(Anfrage über die BH PapirFinder-Plattform vorbereitet)',
  },
  tr: {
    title: 'Belgeler çevrimiçi olarak mevcut değil',
    description: 'Kladanj Belediyesi’nin e-Hizmet sisteminde şu anda yüklü dijital form bulunmamaktadır.',
    explanation: 'Sadece bir form istemek için belediyeye şahsen gitmeniz gerekmez. BH PapirFinder, Kladanj Belediyesi Genel İdare Servisi’ne resmi bir e-posta talebi hazırlayabilir. Talebinizi geçerli kurallara göre iletebilirsiniz; belediye uygulanabilir prosedürlere göre yanıt verecektir.',
    stepsTitle: 'E-posta talebini 3 adımda hazırlayın:',
    steps: [
      'İhtiyacınız olan belgeyi veya formu seçin.',
      'Adınızı, soyadınızı, telefon numaranızı ve yanıt e-postanızı girin.',
      'Düğmeye tıklayın. E-posta uygulamanız opcina.kladanj@bih.net.ba adresine hazırlanmış bir mesajla açılır.',
    ],
    document: 'İstenen belge veya form',
    choose: 'Belge seçin veya adını yazın',
    other: 'Başka bir belge veya form',
    documentOptions: DOCUMENT_OPTIONS.map(([, , , tr]) => tr),
    firstName: 'Ad',
    lastName: 'Soyad',
    phone: 'Telefon numarası',
    replyEmail: 'Yanıt e-postası',
    button: 'E-posta talebini hazırla',
    mailNote: 'Mesaj otomatik olarak gönderilmez. E-posta uygulamanızda gözden geçirip “Gönder” düğmesine basın.',
    subject: 'BH PapirFinder uygulaması üzerinden belge/bilgi talebi',
    greeting: 'Sayın Yetkili,',
    request: 'Aşağıdaki formun/belgenin tarafıma iletilmesini talep ediyorum: ',
    unavailable: 'Bu belge şu anda Kladanj Belediyesi’nin resmi web sitesinde ve e-hizmetlerinde indirilebilir olmadığından, mümkünse PDF veya Word biçiminde bu e-postaya yanıt olarak gönderilmesini ya da izlemem gereken prosedür hakkında bilgi verilmesini rica ederim. Talebim, bilgi edinme ve idari prosedürlerle ilgili yürürlükteki kurallara dayanmaktadır.',
    applicant: 'Başvuru sahibi bilgileri:',
    fullName: 'Adı ve soyadı',
    phoneLine: 'Telefon numarası',
    emailLine: 'Yanıt e-postası',
    thanks: 'İş birliğiniz ve kamu hizmetlerinin dijitalleşmesine katkınız için teşekkür ederim.',
    signoff: 'Saygılarımla,',
    generated: '(Talep BH PapirFinder platformu üzerinden hazırlanmıştır)',
  },
} as const;

function localize(value: string, language: Language): string {
  if (language !== 'bs-Cyrl') return value;
  const protectedTokens: string[] = [];
  const tokenPattern = /BH PapirFinder|opcina\.kladanj@bih\.net\.ba/gi;
  const protectedValue = value.replace(tokenPattern, (token) => {
    protectedTokens.push(token);
    return `\uE000${protectedTokens.length - 1}\uE000`;
  });
  return latinToCyrillic(protectedValue).replace(/\uE000(\d+)\uE000/g, (_match, index: string) => protectedTokens[Number(index)]);
}

export default function KladanjRequestNotice({ language }: { language: Language }) {
  const [documentName, setDocumentName] = useState('');
  const [customDocument, setCustomDocument] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const copy = COPY[language === 'bs-Cyrl' ? 'bs' : language];
  const display = (text: string) => localize(text, language);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestedDocument = (documentName === '__other__' ? customDocument : documentName).trim();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    if (!requestedDocument || !fullName || !phone.trim() || !replyEmail.trim()) return;

    const subject = display(copy.subject);
    const body = [
      display(copy.greeting),
      '',
      `${display(copy.request)}**${requestedDocument}**.`,
      '',
      display(copy.unavailable),
      '',
      display(copy.applicant),
      `- ${display(copy.fullName)}: ${fullName}`,
      `- ${display(copy.phoneLine)}: ${phone.trim()}`,
      `- ${display(copy.emailLine)}: ${replyEmail.trim()}`,
      '',
      display(copy.thanks),
      '',
      display(copy.signoff),
      `**${fullName}**`,
      '',
      display(copy.generated),
    ].join('\n');

    window.location.assign(`mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <Alert className="mb-6 border-amber-300 bg-amber-50 text-amber-950">
      <AlertTriangle className="h-5 w-5 text-amber-700" />
      <AlertTitle className="text-base font-bold">{display(copy.title)}</AlertTitle>
      <AlertDescription className="mt-2 space-y-4 text-amber-950">
        <p className="font-semibold">{display(copy.description)}</p>
        <p>{display(copy.explanation)}</p>
        <div>
          <p className="font-semibold">{display(copy.stepsTitle)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-5">
            {copy.steps.map((step) => <li key={step}>{display(step)}</li>)}
          </ol>
        </div>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="kladanj-document">{display(copy.document)}</Label>
            <select
              id="kladanj-document"
              required
              value={documentName}
              onChange={(event) => setDocumentName(event.target.value)}
              className="flex h-10 w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-sm text-gray-900"
            >
              <option value="">{display(copy.choose)}</option>
              {copy.documentOptions.map((option) => (
                <option key={option} value={option}>{display(option)}</option>
              ))}
              <option value="__other__">{display(copy.other)}</option>
            </select>
          </div>
          {documentName === '__other__' && (
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="kladanj-custom-document">{display(copy.other)}</Label>
              <Input
                id="kladanj-custom-document"
                required
                value={customDocument}
                onChange={(event) => setCustomDocument(event.target.value)}
                className="bg-white text-gray-900"
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="kladanj-first-name">{display(copy.firstName)}</Label>
            <Input id="kladanj-first-name" required autoComplete="given-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} className="bg-white text-gray-900" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="kladanj-last-name">{display(copy.lastName)}</Label>
            <Input id="kladanj-last-name" required autoComplete="family-name" value={lastName} onChange={(event) => setLastName(event.target.value)} className="bg-white text-gray-900" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="kladanj-phone">{display(copy.phone)}</Label>
            <Input id="kladanj-phone" required type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="bg-white text-gray-900" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="kladanj-reply-email">{display(copy.replyEmail)}</Label>
            <Input id="kladanj-reply-email" required type="email" autoComplete="email" value={replyEmail} onChange={(event) => setReplyEmail(event.target.value)} className="bg-white text-gray-900" />
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
