import { Scale, ExternalLink } from 'lucide-react';
import InfoPageLayout from '@/components/InfoPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { legalSources } from '@/data/legal-sources';

const LEVELS = ['BiH', 'FBiH', 'RS', 'BD'] as const;

export default function Laws() {
  const { t } = useLanguage();
  return (
    <InfoPageLayout icon={Scale} title={t('laws.title')} intro={t('laws.intro')}>
      {LEVELS.map(level => {
        const items = legalSources.filter(s => s.level === level);
        if (!items.length) return null;
        return (
          <section key={level} className="space-y-3">
            <h2 className="text-lg font-semibold text-[#003D7A]">{t(`laws.level.${level}`)}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {items.map(s => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl border p-4 hover:border-[#003D7A] transition">
                  <span className="font-semibold text-gray-900 flex items-center gap-2 break-words">
                    {s.name} <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                  </span>
                  <span className="text-sm text-gray-600 block mt-1">{t(s.descKey)}</span>
                  <span className="text-xs text-gray-400 break-all">{s.url.replace('https://', '')}</span>
                </a>
              ))}
            </div>
          </section>
        );
      })}
      <p className="text-sm text-gray-500">{t('laws.disclaimer')}</p>
    </InfoPageLayout>
  );
}
