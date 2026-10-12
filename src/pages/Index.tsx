import { useState, useEffect } from 'react';
import InstitutionAutocomplete from '@/components/InstitutionAutocomplete';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  UserPlus,
  Globe,
  FileText,
  Clock,
  Gift,
  Building2,
  ChevronRight,
  Download,
  Wifi,
  WifiOff,
  Sparkles,
  ShieldCheck,
  Scale,
  FileCheck2,
  Landmark,
  ArrowRight,
} from 'lucide-react';
import { getUserAccount, getTrialStatus, isTrialExpired, hasAccess } from '@/lib/trial';
import { getAllMunicipalities, getTotalFormsCount } from '@/data/municipality-registry';
import { trackSearchEvent } from '@/lib/ga4-tracking';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InstitutionNewsCarousel from '@/components/InstitutionNewsCarousel';

/** Kategorije za brzo filtriranje — labele se prevode preko `category.*` ključeva. */
const QUICK_CATEGORIES = [
  { id: 'all', labelKey: 'category.all', icon: '📋' },
  { id: 'maticni', labelKey: 'category.maticni', icon: '📝' },
  { id: 'cips', labelKey: 'category.cips', icon: '🪪' },
  { id: 'urbanizam', labelKey: 'category.urbanizam', icon: '🏗️' },
  { id: 'obrt', labelKey: 'category.obrt', icon: '🏪' },
  { id: 'socijalna', labelKey: 'category.socijalna', icon: '🤝' },
];

/**
 * Najtraženiji obrasci.
 * `nameKey` se koristi za prikaz, a `searchTerm` (bosanski original) za pretragu,
 * jer je baza obrazaca indeksirana na bosanskom jeziku.
 */
const POPULAR_FORMS = [
  {
    nameKey: 'popular.birthCertificate',
    searchTerm: 'Izvod iz matične knjige rođenih',
    categoryKey: 'category.maticni',
    online: true,
  },
  {
    nameKey: 'popular.citizenship',
    searchTerm: 'Uvjerenje o državljanstvu',
    categoryKey: 'category.maticni',
    online: true,
  },
  {
    nameKey: 'popular.idCard',
    searchTerm: 'Zahtjev za ličnu kartu',
    categoryKey: 'category.cipsShort',
    online: false,
  },
  {
    nameKey: 'popular.buildingPermit',
    searchTerm: 'Zahtjev za građevinsku dozvolu',
    categoryKey: 'category.urbanizamShort',
    online: true,
  },
  {
    nameKey: 'popular.businessRegistration',
    searchTerm: 'Prijava obrta',
    categoryKey: 'category.privreda',
    online: true,
  },
  {
    nameKey: 'popular.childBenefit',
    searchTerm: 'Zahtjev za dječiji dodatak',
    categoryKey: 'category.socijalna',
    online: true,
  },
];

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userAccount, setUserAccount] = useState(getUserAccount());
  const [trialStatus, setTrialStatus] = useState(getTrialStatus());

  const municipalities = getAllMunicipalities();
  const totalForms = getTotalFormsCount();

  useEffect(() => {
    setUserAccount(getUserAccount());
    setTrialStatus(getTrialStatus());
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasAccess()) {
      navigate(isTrialExpired() ? '/subscription' : '/register');
      return;
    }

    if (searchQuery.trim()) {
      trackSearchEvent(searchQuery.trim(), 0);
      const categoryParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : '';
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}${categoryParam}`);
    }
  };

  const features = [
    {
      icon: <Search className="h-7 w-7 text-[#003D7A]" />,
      title: t('home.featureSearchTitle'),
      description: t('home.featureSearchDesc'),
    },
    {
      icon: <Globe className="h-7 w-7 text-[#00A651]" />,
      title: t('home.featureLanguagesTitle'),
      description: t('home.featureLanguagesDesc'),
    },
    {
      icon: <FileText className="h-7 w-7 text-[#003D7A]" />,
      title: t('home.featureFormsTitle', { count: totalForms }),
      description: t('home.featureFormsDesc', { count: municipalities.length }),
    },
    {
      icon: <Sparkles className="h-7 w-7 text-[#00A651]" />,
      title: t('home.featureAiTitle'),
      description: t('home.featureAiDesc'),
    },
  ];

  const steps = [
    { step: '1', title: t('home.stepRegisterTitle'), desc: t('home.stepRegisterDesc') },
    { step: '2', title: t('home.stepSearchTitle'), desc: t('home.stepSearchDesc') },
    { step: '3', title: t('home.stepDownloadTitle'), desc: t('home.stepDownloadDesc') },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero — fokus na pretragu */}
      <section className="bg-gradient-to-br from-[#003D7A] via-[#004A8F] to-[#00A651] text-white py-14 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight break-words">
              {t('home.heroTitle')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-200 break-words">
              {t('home.heroSubtitle')}
            </p>

            {/* Status korisnika */}
            <div className="mb-6">
              {userAccount ? (
                <Badge className="bg-white/20 text-white border border-white/30 text-sm px-4 py-1.5">
                  {userAccount.status === 'trial'
                    ? `✨ ${t('home.trialActiveBadge', { days: trialStatus?.daysRemaining ?? 0 })}`
                    : `✓ ${t('home.subscriptionActiveBadge')}`}
                </Badge>
              ) : (
                <Badge
                  className="bg-white/20 text-white border border-white/30 text-sm px-4 py-1.5 cursor-pointer hover:bg-white/30"
                  onClick={() => navigate('/register')}
                >
                  <Gift className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                  {t('home.freeTrialBadge')}
                </Badge>
              )}
            </div>

            {/* Brzi filteri kategorija */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {QUICK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-white text-[#003D7A] shadow-md'
                      : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                  }`}
                >
                  <span className="mr-1">{cat.icon}</span>
                  {t(cat.labelKey)}
                </button>
              ))}
            </div>

          <div className="max-w-2xl mx-auto mb-3"><InstitutionAutocomplete /></div>
            {/* Pretraga */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-xl p-1.5 shadow-2xl">
                <Input
                  type="text"
                  placeholder={t('home.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-12 text-base bg-transparent border-0 focus-visible:ring-0 text-gray-900 placeholder:text-gray-400"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-6 bg-[#003D7A] hover:bg-[#002D5A] rounded-lg"
                >
                  <Search className="h-5 w-5 mr-2 flex-shrink-0" />
                  {t('home.searchButton')}
                </Button>
              </div>
            </form>

            {/* Statistika */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-8 text-sm text-gray-300">
              <span>
                <strong className="text-white">{totalForms}</strong> {t('home.statFormsShort')}
              </span>
              <span>
                <strong className="text-white">{municipalities.length}</strong>{' '}
                {t('home.statMunicipalitiesShort')}
              </span>
              <span>
                <strong className="text-white">5</strong> {t('home.statLanguagesShort')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* NOVO: 8 Premium JS Obrazaca Showcase */}
      <section className="py-12 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
                  <Landmark className="w-3.5 h-3.5" /> Službena Poreska Administracija BiH
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  8 Zvaničnih JS / PD / MIP Obrazaca za BiH
                </h2>
                <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                  Automatsko popunjavanje prijava radnika i obračuna za sva 3 poreska sistema u BiH:
                  Porezna uprava FBiH, Poreska uprava RS (uz punu ćiriličnu podršku) i Poreska uprava Brčko Distrikta.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link to="/generator">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg">
                    Otvori Generator
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
                <Link to="/faq">
                  <Button variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800 text-xs">
                    Česta Pitanja (FAQ)
                  </Button>
                </Link>
              </div>
            </div>

            {/* 3 Entity Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* FBiH Card */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-blue-900/60 shadow-lg hover:border-blue-700 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-800">
                    Federacija BiH
                  </span>
                  <span className="text-xs text-slate-400 font-medium">3 Obrasca</span>
                </div>
                <h3 className="font-bold text-base text-white mb-2">Porezna uprava FBiH</h3>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <strong>JS 3100</strong> – Prijava/promjena/odjava radnika
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <strong>JS 3110</strong> – Dobrovoljno PIO i ZO osiguranje
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <strong>JS 3120</strong> – Učenici/studenti na praksi i volonteri
                  </li>
                </ul>
              </div>

              {/* RS Card */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-rose-900/60 shadow-lg hover:border-rose-700 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-900/60 text-rose-300 border border-rose-800">
                    Republika Srpska
                  </span>
                  <span className="text-xs text-slate-400 font-medium">3 Obrasca (Ћирилица)</span>
                </div>
                <h3 className="font-bold text-base text-white mb-2">Пореска управа РС</h3>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <strong>PD 3100</strong> – Пријава/одјава уплате доприноса
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <strong>PD 3110</strong> – Индивидуална уплата (СП, пољопривреда)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <strong>PD 3120</strong> – Околности праксе и стручног усавршавања
                  </li>
                </ul>
              </div>

              {/* Brčko Card */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-amber-900/60 shadow-lg hover:border-amber-700 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-800">
                    Brčko Distrikt BiH
                  </span>
                  <span className="text-xs text-slate-400 font-medium">2 Obrasca</span>
                </div>
                <h3 className="font-bold text-base text-white mb-2">Poreska uprava BD</h3>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <strong>MIP-1023</strong> – Mjesečni izvještaj o platama i porezima
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <strong>JS-BD / MS</strong> – Prijava radnika (fond PIO RS ili FBiH)
                  </li>
                  <li className="text-[11px] text-amber-300/80 pt-1">
                    ✓ Odabir entitetskog PIO fonda
                  </li>
                </ul>
              </div>
            </div>

            {/* In-Memory & Legal Security Note */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  <strong>100% In-Memory obrada:</strong> Vaši JMBG i podaci o radnicima ne snimaju se na servere. Instant PDF i TXT generisanje.
                </span>
              </div>
              <Link to="/faq" className="text-cyan-400 hover:underline font-semibold shrink-0">
                Saznajte više u FAQ →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Najtraženiji obrasci */}
      <section className="py-10 bg-white border-b">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#003D7A] break-words">
                📌 {t('home.popularForms')}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/search')}
                className="text-[#003D7A]"
              >
                {t('home.viewAll')} →
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {POPULAR_FORMS.map((form) => (
                <Card
                  key={form.nameKey}
                  className="cursor-pointer hover:shadow-md hover:border-[#003D7A]/30 transition-all group"
                  onClick={() => navigate(`/search?q=${encodeURIComponent(form.searchTerm)}`)}
                >
                  <CardContent className="p-4 flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-900 group-hover:text-[#003D7A] transition-colors line-clamp-2">
                        {t(form.nameKey)}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          {t(form.categoryKey)}
                        </Badge>
                        {form.online ? (
                          <span className="flex items-center gap-0.5 text-[10px] text-green-600">
                            <Wifi className="h-3 w-3 flex-shrink-0" /> {t('forms.statusOnline')}
                          </span>
                        ) : (
                          <span className="flex items-center gap-0.5 text-[10px] text-orange-600">
                            <WifiOff className="h-3 w-3 flex-shrink-0" /> {t('forms.accessCounter')}
                          </span>
                        )}
                      </div>
                    </div>
                    <Download className="h-4 w-4 text-gray-300 group-hover:text-[#00A651] transition-colors flex-shrink-0 mt-1" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pregled općina */}
      <section className="py-10 bg-slate-950 text-white">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                <Sparkles className="h-4 w-4" /> {t('nav.generator')}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold break-words">{t('gen.homeTitle')}</h2>
              <p className="text-slate-300 mt-2 break-words">{t('gen.homeDesc')}</p>
            </div>
            <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:brightness-110 flex-shrink-0">
              <Link to="/generator">{t('gen.homeCta')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#003D7A] mb-2 break-words">
                {t('home.browseMunicipalities')}
              </h2>
              <p className="text-gray-600 break-words">{t('home.browseMunicipalitiesDesc')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {municipalities.map((municipality) => (
                <Card
                  key={municipality.slug}
                  className="cursor-pointer hover:shadow-md hover:border-[#003D7A]/30 transition-all group"
                  onClick={() => navigate(`/municipality/${municipality.slug}`)}
                >
                  <CardContent className="p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#003D7A] to-[#00A651] flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-4 w-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm text-gray-900 group-hover:text-[#003D7A] transition-colors truncate">
                          {municipality.name}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">
                          {municipality.cantonShort} • {municipality.entity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge
                        variant="secondary"
                        className="bg-[#003D7A]/10 text-[#003D7A] text-xs font-semibold"
                      >
                        {municipality.formsCount}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#003D7A] transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 italic break-words">
                🚧 {t('home.moreMunicipalitiesSoon')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prednosti */}
      <section className="py-14 bg-white">
        <div className="container px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-10 text-[#003D7A] break-words">
            {t('home.whyTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="text-center border-0 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-3">{feature.icon}</div>
                  <CardTitle className="text-base break-words">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 break-words">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Kako funkcioniše */}
      <section className="py-14 bg-gray-50">
        <div className="container px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-10 text-[#003D7A] break-words">
            {t('home.howItWorks')}
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#003D7A] text-white text-xl font-bold flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 break-words">{item.title}</h3>
                <p className="text-sm text-gray-600 break-words">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vijesti i obavještenja iz institucija u BiH */}
      <InstitutionNewsCarousel />

      {/* Poziv na akciju */}
      {!userAccount && (
        <section className="py-14 bg-gradient-to-r from-[#003D7A] to-[#00A651] text-white">
          <div className="container px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 break-words">
              {t('home.ctaReady')}
            </h2>
            <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto text-gray-200 break-words">
              {t('home.ctaReadyDesc')}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                className="bg-white text-[#003D7A] hover:bg-gray-100 px-8"
                onClick={() => navigate('/register')}
              >
                <UserPlus className="h-5 w-5 mr-2 flex-shrink-0" />
                {t('home.ctaRegisterFree')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="!bg-transparent text-white border-2 border-white hover:!bg-transparent px-8"
                onClick={() => navigate('/subscription')}
              >
                <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
                {t('home.ctaViewPlans')}
              </Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Index;