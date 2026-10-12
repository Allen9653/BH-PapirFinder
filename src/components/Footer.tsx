import { Link } from 'react-router-dom';
import { ExternalLink, Mail, MapPin, Phone, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const linkCls = 'text-gray-400 hover:text-white transition-colors break-words';

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const nav = [
    { to: '/', label: t('footer.home') },
    { to: '/generator', label: t('footer.generator') },
    { to: '/zakoni', label: t('footer.laws') },
    { to: '/subscription', label: t('footer.pricing') },
    { to: '/faq', label: t('footer.faq') },
  ];
  const legal = [
    { to: '/privacy', label: t('footer.privacyPolicy') },
    { to: '/terms', label: t('footer.terms') },
    { to: '/impressum', label: t('footer.impressum') },
    { to: '/cookies', label: t('footer.cookies') },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3 text-sm">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#003D7A] to-[#00A651] flex items-center justify-center flex-shrink-0">
                <FileText className="h-4 w-4 text-[#FFCD00]" />
              </span>
              <span className="font-black text-white tracking-tight">BH PAPIRFINDER</span>
            </Link>
            <p className="text-gray-400 leading-relaxed break-words">{t('footer.seoDesc')}</p>
            <p className="text-gray-400 break-words">{t('footer.ownershipFull')}</p>
            <dl className="text-xs text-gray-500 space-y-1">
              <div className="flex gap-1"><dt className="font-semibold">JIB:</dt><dd>4219296620005</dd></div>
              <div className="flex gap-1"><dt className="font-semibold">MBS:</dt><dd>43-01-0177-25</dd></div>
            </dl>
          </div>

          <nav aria-label={t('footer.quickNav')}>
            <h4 className="font-semibold text-white mb-3 break-words">{t('footer.quickNav')}</h4>
            <ul className="space-y-2 text-sm">
              {nav.map(l => (
                <li key={l.to}><Link to={l.to} className={linkCls}>{l.label}</Link></li>
              ))}
              <li><a href="/blog/" className={linkCls}>{t('footer.blog')}</a></li>
            </ul>
          </nav>

          <nav aria-label={t('footer.legal')}>
            <h4 className="font-semibold text-white mb-3 break-words">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm">
              {legal.map(l => (
                <li key={l.to}><Link to={l.to} className={linkCls}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <address className="not-italic space-y-2 text-sm">
            <h4 className="font-semibold text-white mb-3 break-words">{t('footer.contact')}</h4>
            <p className="flex items-start gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-gray-500" />
              <span className="break-words">Bulevar Ezhera Eze Arnautovića 8, 72000 Zenica, BiH</span>
            </p>
            <p className="flex items-start gap-2">
              <Mail className="h-4 w-4 flex-shrink-0 mt-0.5 text-gray-500" />
              <a href="mailto:info@bh-assistant.ba" className="text-[#4DA3FF] hover:text-white break-all">info@bh-assistant.ba</a>
            </p>
            <p className="flex items-start gap-2">
              <Phone className="h-4 w-4 flex-shrink-0 mt-0.5 text-gray-500" />
              <a href="tel:+38762580207" className="text-[#4DA3FF] hover:text-white">+387 62 580 207</a>
            </p>
            <p className="flex items-start gap-2">
              <ExternalLink className="h-4 w-4 flex-shrink-0 mt-0.5 text-gray-500" />
              <span className="break-words">
                {t('footer.officialSite')}:{' '}
                <a href="https://www.bh-assistant.ba" target="_blank" rel="noopener noreferrer" className="text-[#4DA3FF] hover:text-white">
                  B&H Assistant d.o.o.
                </a>
              </span>
            </p>
          </address>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span className="text-center md:text-left break-words">© {year} B&H Assistant d.o.o. {t('footer.rights')}</span>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {legal.map(l => (
              <li key={l.to}><Link to={l.to} className="hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
