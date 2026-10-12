import { Link, useNavigate } from 'react-router-dom';
import { Menu, Shield, Home, LogOut, User, Search, Sparkles, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { isAdminLoggedIn } from '@/lib/auth';
import { getUserAccount, logoutUser } from '@/lib/trial';
import SubscriptionBadge from '@/components/subscription/SubscriptionBadge';
import { SUPPORTED_LANGUAGES, type Language } from '@/locales';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const isAdmin = isAdminLoggedIn();
  const userAccount = getUserAccount();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const NavLinks = () => (
    <>
      <Link
        to="/"
        className="text-sm font-medium hover:text-[#003D7A] transition-colors flex items-center gap-1"
      >
        <Home className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">{t('nav.home')}</span>
      </Link>
      <Link
        to="/search"
        className="text-sm font-medium hover:text-[#003D7A] transition-colors flex items-center gap-1"
      >
        <Search className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">{t('nav.search')}</span>
      </Link>
      <Link
        to="/generator"
        className="text-sm font-medium hover:text-[#003D7A] transition-colors flex items-center gap-1"
      >
        <Sparkles className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">{t('nav.generator')}</span>
      </Link>
      <Link to="/subscription" className="text-sm font-medium hover:text-[#003D7A] transition-colors">
        <span className="truncate">{t('nav.subscription')}</span>
      </Link>
      <Link to="/faq" className="text-sm font-medium hover:text-[#003D7A] transition-colors flex items-center gap-1">
        <HelpCircle className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">FAQ</span>
      </Link>
      <Link to="/guide" className="text-sm font-medium hover:text-[#003D7A] transition-colors">
        <span className="truncate">{t('nav.guide')}</span>
      </Link>
      <Link to="/support" className="text-sm font-medium hover:text-[#003D7A] transition-colors">
        <span className="truncate">{t('nav.support')}</span>
      </Link>
      {isAdmin && (
        <Link
          to="/admin"
          className="text-sm font-medium hover:text-[#003D7A] transition-colors flex items-center gap-1"
        >
          <Shield className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{t('nav.admin')}</span>
        </Link>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between gap-2 px-4">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <img
            src="https://mgx-backend-cdn.metadl.com/generate/images/446618/2026-01-06/73ed421d-9866-448f-b32c-399d52a7ab76.png"
            alt="BH PapirFinder"
            className="h-9 w-9 flex-shrink-0"
          />
          <span className="text-lg font-bold text-[#003D7A] hidden sm:inline truncate">
            {t('appName')}
          </span>
        </Link>

        {/* Desktop navigacija */}
        <nav className="hidden lg:flex items-center gap-5 min-w-0">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          {/* Status korisnika */}
          {userAccount ? (
            <div className="hidden lg:flex items-center gap-2">
              <SubscriptionBadge />
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-xs border-[#003D7A]/30 hover:bg-[#003D7A]/10 text-[#003D7A]"
              >
                <User className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{t('nav.dashboard')}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-xs text-gray-500 hover:text-red-600"
              >
                <LogOut className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{t('nav.logout')}</span>
              </Button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="text-xs">
                {t('nav.login')}
              </Button>
              <Button
                size="sm"
                onClick={() => navigate('/register')}
                className="text-xs bg-[#00A651] hover:bg-[#008F45] text-white"
              >
                {t('nav.register')}
              </Button>
            </div>
          )}

          {/* Globalni izbor jezika / pisma */}
          <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
            <SelectTrigger
              className="w-[110px] sm:w-[150px] h-9 text-xs"
              aria-label={t('nav.language')}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span className="truncate">{lang.shortName}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Mobilni meni */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label={t('nav.openMenu')}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm overflow-y-auto">
              <nav className="flex flex-col gap-4 mt-8">
                <NavLinks />
                {userAccount ? (
                  <div className="border-t pt-4 space-y-3">
                    <p className="text-sm text-gray-600 break-words">
                      {t('nav.loggedInAs')}: <strong>{userAccount.name}</strong>
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/dashboard')}
                      className="w-full"
                    >
                      <User className="h-4 w-4 mr-2 flex-shrink-0" />
                      {t('nav.dashboard')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/profile')}
                      className="w-full"
                    >
                      <User className="h-4 w-4 mr-2 flex-shrink-0" />
                      {t('nav.myProfile')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="w-full text-red-600 border-red-200"
                    >
                      <LogOut className="h-4 w-4 mr-2 flex-shrink-0" />
                      {t('nav.logout')}
                    </Button>
                  </div>
                ) : (
                  <div className="border-t pt-4 space-y-3">
                    <Button
                      size="sm"
                      onClick={() => navigate('/login')}
                      className="w-full"
                      variant="outline"
                    >
                      {t('nav.login')}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => navigate('/register')}
                      className="w-full bg-[#00A651] hover:bg-[#008F45] text-white"
                    >
                      {t('nav.registerFree')}
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;