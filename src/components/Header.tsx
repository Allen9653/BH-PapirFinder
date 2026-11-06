import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Shield, Home, LogOut, User, Search, Sparkles, HelpCircle, BookOpen, Headset, Sparkle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { isAdminLoggedIn } from '@/lib/auth';
import { getUserAccount, logoutUser } from '@/lib/trial';
import SubscriptionBadge from '@/components/subscription/SubscriptionBadge';
import { SUPPORTED_LANGUAGES, type Language } from '@/locales';
import UniversalBackButton from '@/components/UniversalBackButton';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = isAdminLoggedIn();
  const userAccount = getUserAccount();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const isCurrent = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const NavLinks = () => (
    <>
      <Link
        to="/"
        className={`text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${
          isCurrent('/')
            ? 'text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/30 shadow-[0_0_12px_rgba(93,240,168,0.2)]'
            : 'text-slate-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <Home className="h-3.5 w-3.5 flex-shrink-0" />
        <span className="truncate">{t('nav.home')}</span>
      </Link>
      <Link
        to="/search"
        className={`text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${
          isCurrent('/search')
            ? 'text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/30 shadow-[0_0_12px_rgba(93,240,168,0.2)]'
            : 'text-slate-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <Search className="h-3.5 w-3.5 flex-shrink-0" />
        <span className="truncate">{t('nav.search')}</span>
      </Link>
      <Link
        to="/generator"
        className={`text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${
          isCurrent('/generator')
            ? 'text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/30 shadow-[0_0_12px_rgba(93,240,168,0.2)]'
            : 'text-slate-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <Sparkles className="h-3.5 w-3.5 flex-shrink-0 text-[#5df0a8]" />
        <span className="truncate">{t('nav.generator')}</span>
      </Link>
      <Link
        to="/subscription"
        className={`text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${
          isCurrent('/subscription')
            ? 'text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/30 shadow-[0_0_12px_rgba(93,240,168,0.2)]'
            : 'text-slate-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <Sparkle className="h-3.5 w-3.5 flex-shrink-0 text-amber-400" />
        <span className="truncate">{t('nav.subscription')}</span>
      </Link>
      <Link
        to="/faq"
        className={`text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${
          isCurrent('/faq')
            ? 'text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/30 shadow-[0_0_12px_rgba(93,240,168,0.2)]'
            : 'text-slate-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <HelpCircle className="h-3.5 w-3.5 flex-shrink-0" />
        <span className="truncate">FAQ</span>
      </Link>
      <Link
        to="/guide"
        className={`text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${
          isCurrent('/guide')
            ? 'text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/30 shadow-[0_0_12px_rgba(93,240,168,0.2)]'
            : 'text-slate-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <BookOpen className="h-3.5 w-3.5 flex-shrink-0" />
        <span className="truncate">{t('nav.guide')}</span>
      </Link>
      <Link
        to="/support"
        className={`text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${
          isCurrent('/support')
            ? 'text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/30 shadow-[0_0_12px_rgba(93,240,168,0.2)]'
            : 'text-slate-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <Headset className="h-3.5 w-3.5 flex-shrink-0" />
        <span className="truncate">{t('nav.support')}</span>
      </Link>
      {isAdmin && (
        <Link
          to="/admin"
          className={`text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${
            isCurrent('/admin')
              ? 'text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/30 shadow-[0_0_12px_rgba(93,240,168,0.2)]'
              : 'text-amber-400 hover:text-amber-300 hover:bg-white/5'
          }`}
        >
          <Shield className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">{t('nav.admin')}</span>
        </Link>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#04060f]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="container flex h-16 items-center justify-between gap-3 px-4 mx-auto max-w-7xl">
        {/* Left: Brand + Universal Back Button */}
        <div className="flex items-center gap-3 min-w-0">
          <Link to="/" className="flex items-center gap-2.5 min-w-0 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#0c1a3b] to-[#040817] border border-[#5df0a8]/40 shadow-[0_0_15px_rgba(93,240,168,0.2)] group-hover:border-[#5df0a8] transition-colors">
              <img
                src="https://mgx-backend-cdn.metadl.com/generate/images/446618/2026-01-06/73ed421d-9866-448f-b32c-399d52a7ab76.png"
                alt="BH PapirFinder"
                className="h-6 w-6 object-contain"
              />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#5df0a8] animate-ping" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                BH PapirFinder
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#5df0a8]/20 text-[#5df0a8] border border-[#5df0a8]/30">
                  2.0
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider">
                ADMINISTRATIVE RADAR
              </span>
            </div>
          </Link>

          {/* Universal Back Button for easy return anywhere in the app */}
          {location.pathname !== '/' && (
            <div className="ml-1 pl-2 border-l border-white/10 hidden sm:block">
              <UniversalBackButton variant="pill" />
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1.5 min-w-0">
          <NavLinks />
        </nav>

        {/* Right Section: Language, Account, Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Mobile Back Button */}
          {location.pathname !== '/' && (
            <div className="sm:hidden">
              <UniversalBackButton variant="minimal" />
            </div>
          )}

          {/* User Account / Auth Actions */}
          {userAccount ? (
            <div className="hidden md:flex items-center gap-2">
              <SubscriptionBadge />
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="h-8 text-xs border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white"
              >
                <User className="h-3 w-3 mr-1 flex-shrink-0 text-[#5df0a8]" />
                <span className="truncate">{t('nav.dashboard')}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="h-8 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
              >
                <LogOut className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{t('nav.logout')}</span>
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/login')}
                className="h-8 text-xs text-slate-300 hover:text-white hover:bg-white/5"
              >
                {t('nav.login')}
              </Button>
              <Button
                size="sm"
                onClick={() => navigate('/register')}
                className="h-8 text-xs bg-[#5df0a8] hover:bg-[#4be096] text-[#04060f] font-semibold shadow-[0_0_15px_rgba(93,240,168,0.35)]"
              >
                {t('nav.register')}
              </Button>
            </div>
          )}

          {/* Language Selector in Glass Style */}
          <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
            <SelectTrigger
              className="w-[100px] sm:w-[130px] h-8 text-xs bg-white/5 border-white/10 text-slate-200 hover:border-white/20 focus:ring-[#5df0a8]/50"
              aria-label={t('nav.language')}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0b1226] border-white/10 text-slate-200">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem
                  key={lang.code}
                  value={lang.code}
                  className="focus:bg-[#14234b] focus:text-[#5df0a8]"
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span className="truncate">{lang.shortName}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Mobile Menu Sheet */}
          <Sheet>
            <SheetTrigger asChild className="xl:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-slate-300 hover:text-white hover:bg-white/5"
                aria-label={t('nav.openMenu')}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] max-w-sm bg-[#070b1a]/95 backdrop-blur-2xl border-white/10 text-slate-200 overflow-y-auto"
            >
              <div className="flex items-center justify-between mt-2 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#5df0a8]/10 border border-[#5df0a8]/30 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#5df0a8]" />
                  </div>
                  <span className="font-bold text-white text-sm">BH PapirFinder</span>
                </div>
                {location.pathname !== '/' && (
                  <UniversalBackButton variant="minimal" />
                )}
              </div>

              <nav className="flex flex-col gap-2">
                <NavLinks />
                {userAccount ? (
                  <div className="border-t border-white/10 pt-4 mt-4 space-y-3">
                    <p className="text-xs text-slate-400 break-words">
                      {t('nav.loggedInAs')}: <strong className="text-white">{userAccount.name}</strong>
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/dashboard')}
                      className="w-full justify-start bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
                    >
                      <User className="h-4 w-4 mr-2 text-[#5df0a8]" />
                      {t('nav.dashboard')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="w-full justify-start text-rose-400 border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('nav.logout')}
                    </Button>
                  </div>
                ) : (
                  <div className="border-t border-white/10 pt-4 mt-4 space-y-2">
                    <Button
                      size="sm"
                      onClick={() => navigate('/login')}
                      className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
                      variant="outline"
                    >
                      {t('nav.login')}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => navigate('/register')}
                      className="w-full bg-[#5df0a8] hover:bg-[#4be096] text-[#04060f] font-semibold"
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