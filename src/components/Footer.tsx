import { Link } from 'react-router-dom';
import { ExternalLink, Mail, MapPin, Phone, FileText, Sparkles, Radar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const linkCls = 'text-slate-400 hover:text-[#5df0a8] transition-colors break-words text-xs';

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const nav = [
    { to: '/', label: t('footer.home') },
    { to: '/search', label: 'Administrativni Radar' },
    { to: '/generator', label: t('footer.generator') },
    { to: '/zakoni', label: t('footer.laws') },
    { to: '/subscription', label: t('footer.pricing') },
    { to: '/faq', label: t('footer.faq') },
    { to: '/guide', label: 'Uputstvo & Vodič' },
    { to: '/support', label: 'Korisnička Podrška' },
  ];
  const legal = [
    { to: '/privacy', label: t('footer.privacyPolicy') },
    { to: '/terms', label: t('footer.terms') },
    { to: '/impressum', label: t('footer.impressum') },
    { to: '/cookies', label: t('footer.cookies') },
  ];

  return (
    <footer className="bg-[#04060f]/90 border-t border-white/10 text-slate-300 backdrop-blur-2xl mt-auto relative z-10">
      <div className="container max-w-7xl px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3 text-xs">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0c1a3b] to-[#040817] border border-[#5df0a8]/40 flex items-center justify-center flex-shrink-0 group-hover:border-[#5df0a8] transition-colors">
                <Radar className="h-4 w-4 text-[#5df0a8]" />
              </div>
              <span className="font-extrabold text-white tracking-tight text-sm">
                BH PAPIRFINDER <span className="text-[#5df0a8]">2.0</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed break-words">{t('footer.seoDesc')}</p>
            <p className="text-slate-400 break-words">{t('footer.ownershipFull')}</p>
            <dl className="text-[11px] text-slate-500 space-y-1 font-mono pt-1">
              <div className="flex gap-1.5"><dt className="text-slate-400">JIB:</dt><dd>4219296620005</dd></div>
              <div className="flex gap-1.5"><dt className="text-slate-400">MBS:</dt><dd>43-01-0177-25</dd></div>
            </dl>
          </div>

          <nav aria-label={t('footer.quickNav')}>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3 break-words">
              {t('footer.quickNav')}
            </h4>
            <ul className="space-y-2">
              {nav.map(l => (
                <li key={l.to}><Link to={l.to} className={linkCls}>{l.label}</Link></li>
              ))}
              <li><a href="/blog/" className={linkCls}>{t('footer.blog')}</a></li>
            </ul>
          </nav>

          <nav aria-label={t('footer.legal')}>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3 break-words">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2">
              {legal.map(l => (
                <li key={l.to}><Link to={l.to} className={linkCls}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <address className="not-italic space-y-2.5 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 break-words">
              {t('footer.contact')}
            </h4>
            <p className="flex items-start gap-2 text-slate-400">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-[#5df0a8]" />
              <span>Bulevar Ezhera Eze Arnautovića 8, 72000 Zenica, BiH</span>
            </p>
            <p className="flex items-start gap-2 text-slate-400">
              <Mail className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-[#5df0a8]" />
              <a href="mailto:info@bh-assistant.ba" className="text-slate-300 hover:text-[#5df0a8] font-mono">
                info@bh-assistant.ba
              </a>
            </p>
            <p className="flex items-start gap-2 text-slate-400">
              <Phone className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-[#5df0a8]" />
              <a href="tel:+38762580207" className="text-slate-300 hover:text-[#5df0a8] font-mono">
                +387 62 580 207
              </a>
            </p>
            <p className="flex items-start gap-2 text-slate-400 pt-1">
              <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-[#5df0a8]" />
              <span>
                {t('footer.officialSite')}:{' '}
                <a
                  href="https://www.bh-assistant.ba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5df0a8] hover:underline"
                >
                  B&amp;H Assistant d.o.o.
                </a>
              </span>
            </p>
          </address>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span className="text-center md:text-left break-words">
            © {year} B&amp;H Assistant d.o.o. {t('footer.rights')} • www.papir-finder.com
          </span>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {legal.map(l => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-slate-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
