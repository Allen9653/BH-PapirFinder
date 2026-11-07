import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight, FileText, Building2, Search, Compass } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getMunicipalityBySlug, getFormById } from '@/data/municipality-registry';

export interface BreadcrumbCustomItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  customItems?: BreadcrumbCustomItem[];
  className?: string;
  showHomeIcon?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  customItems,
  className = '',
  showHomeIcon = true,
}) => {
  const location = useLocation();
  const { language, t } = useLanguage();

  // If custom items are provided, render them directly
  if (customItems && customItems.length > 0) {
    return (
      <nav
        aria-label="Breadcrumb"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-slate-300 ${className}`}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-slate-400 hover:text-[#5df0a8] transition-colors"
          title={t('nav.home') || 'Početna'}
        >
          {showHomeIcon && <Home className="h-3.5 w-3.5" />}
          <span>{t('nav.home') || 'Početna'}</span>
        </Link>
        {customItems.map((item, index) => {
          const isLast = index === customItems.length - 1 || item.active;
          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <ChevronRight className="h-3.5 w-3.5 text-slate-500 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-[#5df0a8] truncate max-w-[200px] sm:max-w-[320px]">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="text-slate-400 hover:text-white transition-colors truncate max-w-[150px] sm:max-w-[240px]"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    );
  }

  // Automatically construct breadcrumb trail from pathname
  const pathname = location.pathname;
  if (pathname === '/' || pathname === '') {
    return null; // Don't show breadcrumbs on homepage
  }

  const segments = pathname.split('/').filter(Boolean);
  const items: Array<{ label: string; href?: string; icon?: React.ReactNode }> = [];

  // Home root
  items.push({
    label: t('nav.home') || 'Početna',
    href: '/',
    icon: <Home className="h-3.5 w-3.5" />,
  });

  // Dynamic route parsing based on segments
  if (segments[0] === 'search') {
    items.push({ label: 'Pretraga', href: '/search' });
  } else if (segments[0] === 'institution' || segments[0] === 'municipality') {
    items.push({ label: 'Institucije i općine', href: '/#municipalities' });
    if (segments[1]) {
      const municipality = getMunicipalityBySlug(segments[1]);
      items.push({
        label: municipality?.name || segments[1],
        href: `/institution/${segments[1]}`,
      });
    }
  } else if (segments[0] === 'form' || segments[0] === 'dokument') {
    items.push({ label: 'Dokumenti', href: '/#documents' });
    if (segments[1]) {
      // Sigurno dohvatanje obrasca sa opcionalnim lančanjem da spriječimo undefined greške
      const formResult = getFormById(segments[1]);
      const formName = formResult?.form?.title || formResult?.form?.name || 'Detalji obrasca';
      items.push({ label: formName });
    }
  } else {
    // Fallback za ostale rute
    segments.forEach((segment, idx) => {
      const href = '/' + segments.slice(0, idx + 1).join('/');
      const formattedLabel = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      items.push({ label: formattedLabel, href: idx < segments.length - 1 ? href : undefined });
    });
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-slate-300 ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={`${item.label}-${index}`}>
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-500 shrink-0" />}
            {isLast || !item.href ? (
              <span className="font-semibold text-[#5df0a8] truncate max-w-[200px] sm:max-w-[320px] inline-flex items-center gap-1.5">
                {item.icon}
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="text-slate-400 hover:text-white transition-colors truncate max-w-[150px] sm:max-w-[240px] inline-flex items-center gap-1.5"
              >
                {item.icon}
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
