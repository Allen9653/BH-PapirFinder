import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Download, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPrompt = () => {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for beforeinstallprompt event (Android/Desktop)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Don't show if already dismissed
      try {
        const dismissed = localStorage.getItem('bh_papirfinder_install_dismissed');
        if (!dismissed) {
          setShowPrompt(true);
        }
      } catch (error) {
        console.error('Failed to check install prompt status:', error);
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    try {
      localStorage.setItem('bh_papirfinder_install_dismissed', 'true');
    } catch (error) {
      console.error('Failed to save install prompt dismissal:', error);
    }
  };

  if (!showPrompt && !isIOS) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="border-[#003D7A] shadow-lg">
        <CardHeader className="relative pb-3">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-6 w-6"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="flex items-center gap-2 text-[#003D7A]">
            <Smartphone className="h-5 w-5" />
            {isIOS ? 'Instalirajte aplikaciju' : t('appName')}
          </CardTitle>
          <CardDescription>
            {isIOS
              ? 'Dodajte BH PapirFinder na vaš početni ekran'
              : 'Instalirajte aplikaciju za brži pristup'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {isIOS ? (
            <div className="text-sm text-gray-700 space-y-2">
              <p>Za instalaciju na iOS:</p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Kliknite na dugme "Podijeli" (ikona sa strelicom)</li>
                <li>Skrolujte i izaberite "Dodaj na početni ekran"</li>
                <li>Kliknite "Dodaj"</li>
              </ol>
            </div>
          ) : (
            <>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Brži pristup</li>
                <li>✓ Offline funkcionalnost</li>
                <li>✓ Push notifikacije</li>
              </ul>
              <Button
                onClick={handleInstall}
                className="w-full bg-[#003D7A] hover:bg-[#002A5A]"
              >
                <Download className="h-4 w-4 mr-2" />
                Instaliraj aplikaciju
              </Button>
            </>
          )}
          
          <div className="pt-3 border-t text-xs text-gray-600">
            <p className="font-semibold mb-1">Dostupno i na:</p>
            <div className="flex gap-2">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#003D7A] hover:underline"
              >
                Google Play
              </a>
              <span>•</span>
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#003D7A] hover:underline"
              >
                App Store
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstallPrompt;