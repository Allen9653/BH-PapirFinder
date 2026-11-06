import { Building2 } from 'lucide-react';
import InfoPageLayout from '@/components/InfoPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Impressum() {
  const { t } = useLanguage();
  const rows: [string, React.ReactNode][] = [
    [t('imp.company'), 'B&H Assistant d.o.o. za savjetovanje i usluge Zenica'],
    [t('imp.shortName'), 'B&H Assistant d.o.o.'],
    [t('imp.address'), 'Bulevar Ezhera Eze Arnautovića 8, 72000 Zenica, Bosna i Hercegovina'],
    ['JIB', '4219296620005'],
    ['MBS', '43-01-0177-25'],
    [t('imp.email'), <a key="m" href="mailto:info@bh-assistant.ba" className="text-[#003D7A] underline">info@bh-assistant.ba</a>],
    [t('imp.phone'), <a key="p" href="tel:+38762580207" className="text-[#003D7A] underline">+387 62 580 207</a>],
    [t('imp.web'), <a key="w" href="https://www.bh-assistant.ba" target="_blank" rel="noopener noreferrer" className="text-[#003D7A] underline">www.bh-assistant.ba</a>],
  ];
  return (
    <InfoPageLayout icon={Building2} title={t('imp.title')} intro={t('imp.intro')}>
      <dl className="bg-white rounded-xl border divide-y">
        {rows.map(([k, v]) => (
          <div key={k} className="grid sm:grid-cols-3 gap-1 p-4">
            <dt className="font-semibold text-gray-900">{k}</dt>
            <dd className="sm:col-span-2 text-gray-700 break-words">{v}</dd>
          </div>
        ))}
      </dl>
      <section className="bg-white rounded-xl border p-5 space-y-2">
        <h2 className="text-lg font-semibold text-[#003D7A]">{t('imp.aboutTitle')}</h2>
        <p className="text-gray-700 leading-relaxed">{t('imp.about')}</p>
        <p className="text-sm text-gray-500">{t('imp.disclaimer')}</p>
      </section>
    </InfoPageLayout>
  );
}
