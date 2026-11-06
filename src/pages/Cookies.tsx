import { useState } from 'react';
import { Cookie, CheckCircle2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import InfoPageLayout from '@/components/InfoPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCookieConsent, setCookieConsent } from '@/lib/cookie-consent';

export default function Cookies() {
  const { t } = useLanguage();
  const [analytics, setAnalytics] = useState(() => getCookieConsent()?.analytics ?? true);
  const [saved, setSaved] = useState(false);

  const rows = [
    { name: t('cookies.essential'), desc: t('cookies.essentialDesc'), keys: 'bh_papirfinder_language, bh_papirfinder_user_session, sb-*-auth-token' },
    { name: t('cookies.analytics'), desc: t('cookies.analyticsDesc'), keys: '_ga, _ga_*' },
  ];

  return (
    <InfoPageLayout icon={Cookie} title={t('cookies.title')} intro={t('cookies.intro')}>
      <div className="bg-white rounded-xl border divide-y">
        {rows.map(r => (
          <div key={r.name} className="p-4 space-y-1">
            <h2 className="font-semibold text-[#003D7A]">{r.name}</h2>
            <p className="text-gray-700 text-sm">{r.desc}</p>
            <p className="text-xs text-gray-500 break-all">{r.keys}</p>
          </div>
        ))}
      </div>
      <section className="bg-white rounded-xl border p-5 space-y-4" aria-labelledby="cookie-settings">
        <h2 id="cookie-settings" className="text-lg font-semibold text-[#003D7A]">{t('cookies.settings')}</h2>
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-700">{t('cookies.essential')} — {t('cookies.alwaysOn')}</span>
          <Switch checked disabled aria-label={t('cookies.essential')} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="analytics-switch" className="text-gray-700">{t('cookies.analytics')}</label>
          <Switch id="analytics-switch" checked={analytics} onCheckedChange={v => { setAnalytics(v); setSaved(false); }} />
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Button className="bg-[#003D7A] text-white hover:bg-[#002A5A]" onClick={() => { setCookieConsent(analytics); setSaved(true); }}>
            {t('cookies.save')}
          </Button>
          {saved && <span className="text-sm text-[#00A651] flex items-center gap-1"><CheckCircle2 className="h-4 w-4" />{t('cookies.saved')}</span>}
        </div>
      </section>
    </InfoPageLayout>
  );
}
