import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, ExternalLink, Loader2, Globe } from 'lucide-react';
import { SupportedLanguage } from '@/lib/translation';
import { trackGA4Event } from '@/lib/ga4-tracking';
import { useLanguage } from '@/contexts/LanguageContext';

interface TranslatedPdfViewerProps {
  documentName: string;
  originalUrl: string;
  translatedUrls?: Record<string, string>;
  onTranslateRequest?: (targetLang: SupportedLanguage) => Promise<string>;
}

/** Naziv jezika prevoda prikazan u badge-u (nazivi jezika ostaju u originalu). */
const TRANSLATION_LABELS: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  tr: 'Türkçe',
};

const TranslatedPdfViewer = ({
  documentName,
  originalUrl,
  translatedUrls = {},
  onTranslateRequest,
}: TranslatedPdfViewerProps) => {
  const { t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<'original' | SupportedLanguage>('original');
  const [translating, setTranslating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const currentUrl = selectedLang === 'original'
    ? originalUrl
    : (translatedUrls[selectedLang] || generatedUrl || '');

  const handleTranslate = async (lang: SupportedLanguage) => {
    if (translatedUrls[lang]) {
      setSelectedLang(lang);
      return;
    }

    if (!onTranslateRequest) {
      setSelectedLang(lang);
      return;
    }

    setTranslating(true);
    try {
      const url = await onTranslateRequest(lang);
      setGeneratedUrl(url);
      setSelectedLang(lang);
      trackGA4Event('pdf_translation', { document: documentName, target_language: lang });
    } catch {
      // silent
    }
    setTranslating(false);
  };

  const handleDownload = () => {
    if (currentUrl) {
      trackGA4Event('file_download', { file_name: documentName, language: selectedLang });
      window.open(currentUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Ensure HTTPS
  const secureUrl = currentUrl?.replace(/^http:\/\//i, 'https://') || '';
  const previewUrl = secureUrl
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(secureUrl)}&embedded=true`
    : '';

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-base flex items-center gap-2 min-w-0">
            <FileText className="h-4 w-4 text-[#003D7A] flex-shrink-0" />
            <span className="line-clamp-2 break-words">{documentName}</span>
          </CardTitle>

          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            <Select
              value={selectedLang}
              onValueChange={(v) => {
                if (v === 'original') setSelectedLang('original');
                else handleTranslate(v as SupportedLanguage);
              }}
            >
              <SelectTrigger className="w-[150px] h-8 text-xs">
                <Globe className="h-3 w-3 mr-1 flex-shrink-0" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="original">🇧🇦 {t('pdfViewer.original')}</SelectItem>
                <SelectItem value="en">🇬🇧 English</SelectItem>
                <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                <SelectItem value="tr">🇹🇷 Türkçe</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={handleDownload}
              disabled={!currentUrl}
            >
              <Download className="h-3 w-3 mr-1 flex-shrink-0" />
              PDF
            </Button>
          </div>
        </div>

        {selectedLang !== 'original' && (
          <Badge variant="secondary" className="w-fit text-xs mt-1 whitespace-normal text-left break-words">
            {t('pdfViewer.translationLabel')}: {TRANSLATION_LABELS[selectedLang] ?? selectedLang}
          </Badge>
        )}
      </CardHeader>

      <CardContent>
        {translating ? (
          <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-lg px-4 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#003D7A] mb-3" />
            <p className="text-sm text-gray-600 break-words">{t('pdfViewer.generating')}</p>
            <p className="text-xs text-gray-400 mt-1 break-words">{t('pdfViewer.generatingHint')}</p>
          </div>
        ) : previewUrl ? (
          <div className="relative">
            <iframe
              src={previewUrl}
              className="w-full h-[500px] border rounded-lg"
              title={`PDF: ${documentName}`}
            />
            <div className="absolute bottom-2 right-2">
              <Button
                variant="secondary"
                size="sm"
                className="text-xs shadow-md h-auto py-1.5"
                onClick={() => window.open(secureUrl, '_blank', 'noopener,noreferrer')}
              >
                <ExternalLink className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="break-words">{t('pdfViewer.openNewTab')}</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] bg-gray-50 rounded-lg px-4 text-center">
            <FileText className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-sm text-gray-500 break-words">{t('pdfViewer.notAvailable')}</p>
            <p className="text-xs text-gray-400 mt-1 break-words">{t('pdfViewer.notAvailableHint')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TranslatedPdfViewer;