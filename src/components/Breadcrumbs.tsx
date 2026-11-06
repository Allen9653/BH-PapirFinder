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

  if (segments[0] === 'search') {
    items.push({
      label: t('nav.search') || 'Pretraga obrazaca',
      icon: <Search className="h-3.5 w-3.5" />,
    });
  } else if (segments[0] === 'municipality' && segments[1]) {
    const muni = getMunicipalityBySlug(segments[1]);
    const muniName = muni ? muni.name : segments[1].replace(/-/g, ' ');

    items.push({
      label: 'Općine i gradovi',
      href: '/search',
      icon: <Building2 className="h-3.5 w-3.5" />,
    });
    items.push({
      label: muniName,
      icon: <Compass className="h-3.5 w-3.5" />,
    });
  } else if (segments[0] === 'institucija' && segments[1]) {
    items.push({
      label: 'Institucije',
      href: '/search',
      icon: <Building2 className="h-3.5 w-3.5" />,
    });
    items.push({
      label: decodeURIComponent(segments[1].replace(/-/g, ' ')),
    });
  } else if (segments[0] === 'form' && segments[1]) {
    const formRecord = getFormById(segments[1]);
    if (formRecord?.municipality) {
      items.push({
        label: formRecord.municipality.name,
        href: `/municipality/${formRecord.municipality.slug}`,
        icon: <Building2 className="h-3.5 w-3.5" />,
      });
    } else {
      items.push({
        label: t('nav.search') || 'Obrasci',
        href: '/search',
        icon: <FileText className="h-3.5 w-3.5" />,
      });
    }
    items.push({
      label: formRecord?.form?.name || 'Obrazac',
      icon: <FileText className="h-3.5 w-3.5" />,
    });
  } else if (segments[0] === 'generator') {
    items.push({
      label: t('nav.generator') || 'Generator dokumenata',
    });
  } else if (['subscription', 'pricing', 'pretplata'].includes(segments[0])) {
    items.push({
      label: t('nav.pricing') || 'Pretplata & Paketi',
    });
  } else if (segments[0] === 'faq') {
    items.push({
      label: 'Često postavljana pitanja (FAQ)',
    });
  } else if (segments[0] === 'guide') {
    items.push({
      label: 'Uputstvo za građane',
    });
  } else if (segments[0] === 'support') {
    items.push({
      label: 'Tehnička podrška',
    });
  } else if (segments[0] === 'zakoni') {
    items.push({
      label: 'Pravni propisi & Zakoni',
    });
  } else if (segments[0] === 'admin') {
    items.push({
      label: 'Administracija',
      href: '/admin',
    });
    if (segments[1] === 'dashboard') {
      items.push({ label: 'Nadzorna ploča' });
    } else if (segments[1] === 'documents') {
      items.push({ label: 'Upravljanje dokumentima' });
    } else if (segments[1] === 'reports') {
      items.push({ label: 'Izvještaji' });
    }
  } else if (segments[0] === 'profile') {
    items.push({
      label: 'Korisnički profil',
    });
  } else if (segments[0] === 'dashboard') {
    items.push({
      label: 'Korisnička kontrolna tabla',
    });
  } else {
    // Generic fallback for any other route
    items.push({
      label: segments[0].charAt(0).toUpperCase() + segments[0].slice(1),
    });
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`inline-flex flex-wrap items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-slate-300 ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={`${item.label}-${index}`}>
            {index > 0 && (
              <ChevronRight className="h-3.5 w-3.5 text-slate-500 shrink-0 mx-0.5" />
            )}
            {isLast || !item.href ? (
              <span className="inline-flex items-center gap-1.5 font-medium text-[#5df0a8] truncate max-w-[180px] sm:max-w-[320px]">
                {item.icon}
                <span className="truncate">{item.label}</span>
              </span>
            ) : (
              <Link
                to={item.href}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors truncate max-w-[150px] sm:max-w-[240px]"
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
