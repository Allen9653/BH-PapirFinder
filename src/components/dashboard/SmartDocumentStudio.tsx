import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Languages, ArrowRightLeft, Copy, CheckCircle, Loader2, Lock } from 'lucide-react';
import { latinToCyrillic, cyrillicToLatin, isCyrillic } from '@/lib/cyrillic-converter';
import { translateText, SupportedLanguage } from '@/lib/translation';
import { trackGA4Event } from '@/lib/ga4-tracking';
import {
  getSubscriptionProfile,
  checkFeatureAccess,
  trackFeatureUsage,
  SubscriptionProfile,
} from '@/lib/subscription';
import UpgradeModal from '@/components/subscription/UpgradeModal';
import { useLanguage } from '@/contexts/LanguageContext';

/** Prevodni ključ za naziv ciljnog jezika prevoda. */
const TARGET_LANG_KEYS: Record<SupportedLanguage, string> = {
  en: 'dashboard.langEnglish',
  de: 'dashboard.langGerman',
  tr: 'dashboard.langTurkish',
} as Record<SupportedLanguage, string>;

const SmartDocumentStudio = () => {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [transliterating, setTransliterating] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [targetLang, setTargetLang] = useState<SupportedLanguage>('en');
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState<SubscriptionProfile | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const p = await getSubscriptionProfile();
    setProfile(p);
  };

  const canUseStudio = (): boolean => {
    const access = checkFeatureAccess('smart_studio', profile);
    if (!access.allowed) {
      if (access.reason === 'limit_reached') {
        setUpgradeReason(t('dashboard.studioLimitReason'));
      } else {
        setUpgradeReason(t('dashboard.studioLoginUpgrade'));
      }
      setShowUpgrade(true);
      return false;
    }
    return true;
  };

  const handleTransliterate = async () => {
    if (!inputText.trim()) return;
    if (!canUseStudio()) return;

    setTransliterating(true);
    setProgress(30);

    setTimeout(async () => {
      const result = isCyrillic(inputText)
        ? cyrillicToLatin(inputText)
        : latinToCyrillic(inputText);
      setOutputText(result);
      setProgress(100);
      setTransliterating(false);

      // Track usage for free tier
      if (profile && profile.tier === 'free') {
        await trackFeatureUsage(profile.userId, 'smart_studio');
        await loadProfile();
      }

      trackGA4Event('transliteration', {
        direction: isCyrillic(inputText) ? 'cyrillic_to_latin' : 'latin_to_cyrillic',
        text_length: String(inputText.length),
      });
    }, 300);
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    if (!canUseStudio()) return;

    setTranslating(true);
    setProgress(20);

    try {
      const sentences = inputText.split(/(?<=[.!?])\s+/);
      let translated = '';

      for (let i = 0; i < sentences.length; i++) {
        const result = await translateText(sentences[i], targetLang);
        translated += (i > 0 ? ' ' : '') + result;
        setProgress(Math.round(((i + 1) / sentences.length) * 90));
      }

      setOutputText(translated);
      setProgress(100);

      if (profile && profile.tier === 'free') {
        await trackFeatureUsage(profile.userId, 'smart_studio');
        await loadProfile();
      }

      trackGA4Event('document_translation', {
        target_language: targetLang,
        text_length: String(inputText.length),
      });
    } catch {
      setOutputText(t('dashboard.translateError'));
    } finally {
      setTranslating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    setInputText(outputText);
    setOutputText('');
  };

  // Show remaining uses badge for free tier
  const renderUsageBadge = () => {
    if (!profile || profile.tier !== 'free') return null;
    const access = checkFeatureAccess('smart_studio', profile);
    if (access.remainingUses !== undefined && access.remainingUses > 0) {
      return (
        <Badge variant="outline" className="text-xs text-amber-600 border-amber-300 bg-amber-50 whitespace-normal text-left">
          <Lock className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="break-words">{access.remainingUses} {t('dashboard.freeUsesRemaining')}</span>
        </Badge>
      );
    }
    if (!access.allowed) {
      return (
        <Badge
          variant="outline"
          className="text-xs text-red-600 border-red-300 bg-red-50 cursor-pointer whitespace-normal text-left"
          onClick={() => {
            setUpgradeReason(t('dashboard.studioLimitShort'));
            setShowUpgrade(true);
          }}
        >
          <Lock className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="break-words">{t('dashboard.limitUsedUpgrade')}</span>
        </Badge>
      );
    }
    return null;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-[#003D7A] flex-shrink-0" />
              <span className="break-words">{t('dashboard.smartStudio')}</span>
            </CardTitle>
            {renderUsageBadge()}
          </div>
          <CardDescription className="break-words">
            {t('dashboard.smartStudioDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transliterate" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 h-auto">
              <TabsTrigger value="transliterate" className="whitespace-normal break-words py-2">
                {t('dashboard.transliteration')}
              </TabsTrigger>
              <TabsTrigger value="translate" className="whitespace-normal break-words py-2">
                {t('dashboard.translation')}
              </TabsTrigger>
            </TabsList>

            {/* Transliteration Tab */}
            <TabsContent value="transliterate" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="text-xs whitespace-normal text-left break-words">
                      {t('dashboard.inputText')}
                    </Badge>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {inputText.length} {t('dashboard.characters')}
                    </span>
                  </div>
                  <Textarea
                    placeholder={t('dashboard.enterTextTranslit')}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="text-xs whitespace-normal text-left break-words">
                      {t('dashboard.result')}
                    </Badge>
                    {outputText && (
                      <Button variant="ghost" size="sm" className="h-6 text-xs flex-shrink-0" onClick={handleCopy}>
                        {copied ? <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> : <Copy className="h-3 w-3 mr-1" />}
                        {copied ? t('dashboard.copied') : t('dashboard.copy')}
                      </Button>
                    )}
                  </div>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder={t('dashboard.resultPlaceholder')}
                    className="min-h-[200px] resize-none bg-gray-50"
                  />
                </div>
              </div>

              {transliterating && (
                <Progress value={progress} className="h-2" />
              )}

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={handleTransliterate}
                  disabled={!inputText.trim() || transliterating}
                  className="bg-[#003D7A] hover:bg-[#002D5A] h-auto py-2"
                >
                  {transliterating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin flex-shrink-0" />
                  ) : (
                    <ArrowRightLeft className="h-4 w-4 mr-2 flex-shrink-0" />
                  )}
                  <span className="break-words text-left">
                    {isCyrillic(inputText) ? t('dashboard.cyrToLat') : t('dashboard.latToCyr')}
                  </span>
                </Button>
                {outputText && (
                  <Button variant="outline" size="sm" onClick={handleSwap} className="h-auto py-2">
                    <ArrowRightLeft className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                    <span className="break-words text-left">{t('dashboard.swap')}</span>
                  </Button>
                )}
              </div>
            </TabsContent>

            {/* Translation Tab */}
            <TabsContent value="translate" className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <Badge variant="outline" className="whitespace-normal text-left break-words">
                  {t('dashboard.sourceBosnian')}
                </Badge>
                <Select value={targetLang} onValueChange={(v) => setTargetLang(v as SupportedLanguage)}>
                  <SelectTrigger className="w-[160px] h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">🇬🇧 English</SelectItem>
                    <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                    <SelectItem value="tr">🇹🇷 Türkçe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs whitespace-normal text-left break-words">
                    {t('dashboard.originalText')}
                  </Badge>
                  <Textarea
                    placeholder={t('dashboard.enterTextTranslate')}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="text-xs whitespace-normal text-left break-words">
                      {t('dashboard.translationResult')}
                    </Badge>
                    {outputText && (
                      <Button variant="ghost" size="sm" className="h-6 text-xs flex-shrink-0" onClick={handleCopy}>
                        {copied ? <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> : <Copy className="h-3 w-3 mr-1" />}
                        {copied ? t('dashboard.copied') : t('dashboard.copy')}
                      </Button>
                    )}
                  </div>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder={t('dashboard.translationPlaceholder')}
                    className="min-h-[200px] resize-none bg-gray-50"
                  />
                </div>
              </div>

              {translating && (
                <Progress value={progress} className="h-2" />
              )}

              <Button
                onClick={handleTranslate}
                disabled={!inputText.trim() || translating}
                className="bg-[#003D7A] hover:bg-[#002D5A] h-auto py-2"
              >
                {translating ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin flex-shrink-0" />
                ) : (
                  <Languages className="h-4 w-4 mr-2 flex-shrink-0" />
                )}
                <span className="break-words text-left">
                  {t('dashboard.translateTo', { lang: t(TARGET_LANG_KEYS[targetLang]) })}
                </span>
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <UpgradeModal
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        profile={profile}
        triggerReason={upgradeReason}
      />
    </>
  );
};

export default SmartDocumentStudio;