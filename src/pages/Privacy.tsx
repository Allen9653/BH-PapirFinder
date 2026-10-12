import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import InfoPageLayout from '@/components/InfoPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { SERVER_PURGE_ACTIVE } from '@/lib/doc-retention';

const SECTIONS = ['controller', 'data', 'purpose', 'storage', 'inMemory', 'retention', 'deletion', 'cookies', 'rights'];

const Privacy = () => {
  const { t } = useLanguage();
  return (
    <>
      <InfoPageLayout icon={ShieldCheck} title={t('privacy.title')} intro={t('privacy.intro')}>
        {SECTIONS.map(s => (
          <section key={s} className="bg-white rounded-xl border p-5 space-y-2">
            <h2 className="text-lg font-semibold text-[#003D7A]">{t(`privacy.${s}Title`)}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{t(`privacy.${s}`)}{s === 'retention' && SERVER_PURGE_ACTIVE ? ` ${t('retention.serverActive')}` : ''}</p>
          </section>
        ))}
        <p className="text-sm text-gray-600">
          <Link to="/delete-account" className="text-[#003D7A] underline">{t('privacy.deleteLink')}</Link>
          {' · '}
          <Link to="/cookies" className="text-[#003D7A] underline">{t('footer.cookies')}</Link>
        </p>
      </InfoPageLayout>
    </>
  );
};

export default Privacy;
