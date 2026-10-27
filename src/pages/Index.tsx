import { useState, useEffect, useMemo } from 'react';
import InstitutionAutocomplete from '@/components/InstitutionAutocomplete';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Printer,
  Zap,
  X,
  Radar,
  Radio,
  Compass,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { getUserAccount, getTrialStatus, isTrialExpired, hasAccess } from '@/lib/trial';
import { getAllMunicipalities, getTotalFormsCount, MunicipalityForm, MunicipalityInfo } from '@/data/municipality-registry';
import { trackSearchEvent } from '@/lib/ga4-tracking';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InstitutionNewsCarousel from '@/components/InstitutionNewsCarousel';
import PrintPreviewModal from '@/components/PrintPreviewModal';
import RecentSearches from '@/components/RecentSearches';
import { useRecentSearches } from '@/hooks/use-recent-searches';

/** Kategorije za brzo filtriranje */
const QUICK_CATEGORIES = [
  { id: 'all', labelKey: 'category.all', icon: '📋' },
  { id: 'maticni', labelKey: 'category.maticni', icon: '📝' },
  { id: 'cips', labelKey: 'category.cips', icon: '🪪' },
  { id: 'urbanizam', labelKey: 'category.urbanizam', icon: '🏗️' },
  { id: 'obrt', labelKey: 'category.obrt', icon: '🏪' },
  { id: 'socijalna', labelKey: 'category.socijalna', icon: '🤝' },
];

/** Najtraženiji obrasci */
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
  const [previewForm, setPreviewForm] = useState<{
    form: MunicipalityForm;
    municipality: MunicipalityInfo;
  } | null>(null);

  const municipalities = getAllMunicipalities();
  const totalForms = getTotalFormsCount();
  const {
    searches: recentSearches,
    addSearch,
    removeSearch,
    clearAll: clearRecentSearches,
  } = useRecentSearches();

  useEffect(() => {
    setUserAccount(getUserAccount());
    setTrialStatus(getTrialStatus());
  }, []);

  /** Real-time live filtering of all available documents */
  const liveMatchingForms = useMemo(() => {
    if (!searchQuery.trim() && selectedCategory === 'all') return [];

    const term = searchQuery.toLowerCase().trim();
    const results: { form: MunicipalityForm; municipality: MunicipalityInfo }[] = [];

    for (const m of municipalities) {
      for (const f of m.forms) {
        const matchesCategory =
          selectedCategory === 'all' ||
          f.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          (selectedCategory === 'maticni' &&
            (f.category.toLowerCase().includes('matič') ||
              f.name.toLowerCase().includes('izvod') ||
              f.name.toLowerCase().includes('uvjerenj'))) ||
          (selectedCategory === 'cips' &&
            (f.category.toLowerCase().includes('cips') ||
              f.name.toLowerCase().includes('prebival') ||
              f.name.toLowerCase().includes('kart'))) ||
          (selectedCategory === 'urbanizam' &&
            (f.category.toLowerCase().includes('urban') ||
              f.name.toLowerCase().includes('gradnj') ||
              f.name.toLowerCase().includes('dozvol'))) ||
          (selectedCategory === 'obrt' &&
            (f.category.toLowerCase().includes('obrt') ||
              f.category.toLowerCase().includes('privred') ||
              f.name.toLowerCase().includes('firm'))) ||
          (selectedCategory === 'socijalna' &&
            (f.category.toLowerCase().includes('socij') ||
              f.name.toLowerCase().includes('dodatak') ||
              f.name.toLowerCase().includes('pomoc')));

        if (!matchesCategory) continue;

        if (!term) {
          results.push({ form: f, municipality: m });
        } else {
          const matchesName = f.name.toLowerCase().includes(term);
          const matchesCat = f.category.toLowerCase().includes(term);
          const matchesMuni = m.name.toLowerCase().includes(term);
          if (matchesName || matchesCat || matchesMuni) {
            results.push({ form: f, municipality: m });
          }
        }
      }
    }

    return results;
  }, [searchQuery, selectedCategory, municipalities]);

  const filteredPopularForms = useMemo(() => {
    if (!searchQuery.trim() && selectedCategory === 'all') return POPULAR_FORMS;
    const term = searchQuery.toLowerCase().trim();
    return POPULAR_FORMS.filter((pf) => {
      const matchesText =
        !term ||
        t(pf.nameKey).toLowerCase().includes(term) ||
        pf.searchTerm.toLowerCase().includes(term);
      const matchesCat = selectedCategory === 'all' || pf.categoryKey.toLowerCase().includes(selectedCategory);
      return matchesText && matchesCat;
    });
  }, [searchQuery, selectedCategory, t]);

  const filteredMunicipalities = useMemo(() => {
    if (!searchQuery.trim()) return municipalities;
    const term = searchQuery.toLowerCase().trim();
    return municipalities.filter((m) =>
      m.name.toLowerCase().includes(term) ||
      m.canton.toLowerCase().includes(term) ||
      m.cantonShort.toLowerCase().includes(term) ||
      m.forms.some((f) => f.name.toLowerCase().includes(term))
    );
  }, [searchQuery, municipalities]);

  const handleSearch = (e?: React.FormEvent, overrideTerm?: string) => {
    if (e) e.preventDefault();

    if (!hasAccess()) {
      navigate(isTrialExpired() ? '/subscription' : '/register');
      return;
    }

    const termToSearch = (overrideTerm !== undefined ? overrideTerm : searchQuery).trim();

    if (termToSearch) {
      addSearch(termToSearch);
      trackSearchEvent(termToSearch, liveMatchingForms.length);
      const categoryParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : '';
      navigate(`/search?q=${encodeURIComponent(termToSearch)}${categoryParam}`);
    }
  };

  const handleSelectRecentSearch = (term: string) => {
    setSearchQuery(term);
    addSearch(term);
  };

  const features = [
    {
      icon: <Radar className="h-6 w-6 text-[#5df0a8]" />,
      title: 'Administrativni Radar',
      description: 'Trenutna pretraga preko 30 općina, 10 kantona, Brčko distrikta i oba entiteta.',
    },
    {
      icon: <Globe className="h-6 w-6 text-sky-400" />,
      title: '5 Jezika & Dva Pisma',
      description: 'Zvanični obrasci dostupni na bosanskom, engleskom, njemačkom, turskom, na latinici i ćirilici.',
    },
    {
      icon: <FileCheck2 className="h-6 w-6 text-[#5df0a8]" />,
      title: `${totalForms}+ Verifikovanih Obrazaca`,
      description: '100% usklađeni sa važećim zakonskim propisima i spremni za trenutnu štampu ili predaju.',
    },
    {
      icon: <Sparkles className="h-6 w-6 text-amber-400" />,
      title: 'AI Smart Studio',
      description: 'Automatska validacija JMBG/JIB brojeva, transliteracija i pametno popunjavanje.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col text-slate-100 selection:bg-[#5df0a8]/30 selection:text-white">
      <Header />

      {/* 1. CINEMATIC HERO SECTION WITH DEEP ATMOSPHERIC BACKDROP */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        {/* Glow radial highlights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#5df0a8]/10 via-[#0e6ba8]/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="container px-4 max-w-5xl mx-auto relative z-10 text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6 shadow-[0_0_20px_rgba(93,240,168,0.15)] animate-in fade-in duration-700">
            <span className="w-2 h-2 rounded-full bg-[#5df0a8] animate-ping" />
            <span className="text-[11px] font-mono tracking-widest text-[#5df0a8] uppercase">
              BH PAPIRFINDER • ADMINISTRATIVNI RADAR
            </span>
          </div>

          {/* Immersive Main Typography */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.12]">
            Pronađite svaki obrazac.{' '}
            <span className="bg-gradient-to-r from-[#5df0a8] via-emerald-300 to-sky-400 bg-clip-text text-transparent">
              Bez čekanja u redu.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Jedinstvena platforma za pretragu, popunjavanje i preuzimanje službenih administrativnih i općinskih dokumenata u Bosni i Hercegovini.
          </p>

          {/* User Account / Trial Status Indicator */}
          <div className="mb-6 flex justify-center">
            {userAccount ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5df0a8]/10 border border-[#5df0a8]/30 text-xs font-semibold text-[#5df0a8]">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                {userAccount.status === 'trial'
                  ? `Probni period aktivan: preostalo ${trialStatus?.daysRemaining ?? 0} dana`
                  : 'Pretplata aktivna • Neograničen pristup'}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors"
              >
                <Gift className="w-3.5 h-3.5 text-[#5df0a8]" />
                <span>Besplatan pristup za nove korisnike • Registrujte se</span>
                <ChevronRight className="w-3 h-3 text-[#5df0a8]" />
              </button>
            )}
          </div>

          {/* Quick Access Pill Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {QUICK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all backdrop-blur-md ${
                  selectedCategory === cat.id
                    ? 'bg-[#5df0a8] text-[#04060f] font-bold shadow-[0_0_15px_rgba(93,240,168,0.4)] scale-105'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <span className="mr-1.5">{cat.icon}</span>
                {t(cat.labelKey)}
              </button>
            ))}
          </div>

          {/* Auto Complete Institution Dropdown */}
          <div className="max-w-2xl mx-auto mb-3">
            <InstitutionAutocomplete />
          </div>

          {/* FLOATING GLASSMORPHYSIC SEARCH COMMAND CENTER (INSTITUTIONAL RADAR) */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#5df0a8]/30 via-sky-500/20 to-emerald-400/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500 pointer-events-none" />

            <form onSubmit={handleSearch} className="relative">
              <div className="flex flex-col sm:flex-row gap-2 bg-[#070b1a]/85 border border-white/15 backdrop-blur-2xl rounded-2xl p-2 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                <div className="flex-1 relative flex items-center pl-3">
                  <Search className="w-5 h-5 text-[#5df0a8] mr-2 shrink-0" />
                  <Input
                    type="text"
                    placeholder="Npr. CIPS prijava, rodni list, građevinska dozvola, obrt..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 h-12 text-sm sm:text-base bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-slate-400 pr-8"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-slate-400 hover:text-white p-1"
                      title="Očisti pretragu"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-6 bg-[#5df0a8] hover:bg-[#4de69c] text-[#04060f] font-bold rounded-xl shadow-[0_0_20px_rgba(93,240,168,0.35)] shrink-0 transition-transform active:scale-95"
                >
                  <Radar className="h-4 w-4 mr-2 text-[#04060f]" />
                  Pretraži Radar
                </Button>
              </div>

              {/* REAL-TIME LIVE SEARCH RESULTS PANEL */}
              {searchQuery.trim().length > 0 && (
                <div className="mt-3 bg-[#070b1c]/95 border border-[#5df0a8]/30 backdrop-blur-2xl rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.8)] overflow-hidden text-left z-30 relative animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white/5 px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-[#5df0a8] fill-[#5df0a8]" />
                      <span className="text-xs font-semibold text-slate-200">
                        Radar detektovao: {liveMatchingForms.length} {liveMatchingForms.length === 1 ? 'obrazac' : 'obrazaca'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span>Zatvori</span>
                    </button>
                  </div>

                  {liveMatchingForms.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 text-sm">
                      <p>Nema obrazaca koji direktno odgovaraju upitu &ldquo;{searchQuery}&rdquo;.</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3 border-[#5df0a8]/50 text-[#5df0a8] bg-[#5df0a8]/10 hover:bg-[#5df0a8]/20"
                        onClick={() => handleSearch()}
                      >
                        Pretraži cjelokupnu bazu &rarr;
                      </Button>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5 max-h-80 overflow-y-auto">
                      {liveMatchingForms.slice(0, 6).map(({ form, municipality }) => (
                        <div
                          key={`${municipality.slug}-${form.id}`}
                          className="p-3.5 hover:bg-[#101b3d]/70 transition-colors flex items-center justify-between gap-3 group"
                        >
                          <div
                            className="flex-1 min-w-0 cursor-pointer"
                            onClick={() => navigate(`/form/${form.id}`)}
                          >
                            <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#5df0a8] transition-colors truncate">
                              {form.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                                {form.category}
                              </span>
                              <span className="text-[11px] text-slate-400 truncate">
                                {municipality.name} ({municipality.cantonShort})
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 px-2.5 text-xs text-slate-300 hover:text-[#5df0a8] hover:bg-white/5"
                              onClick={() => setPreviewForm({ form, municipality })}
                              title="Print Preview na papiru"
                            >
                              <Printer className="h-3.5 w-3.5 mr-1" />
                              <span className="hidden sm:inline">Print Preview</span>
                            </Button>

                            <Button
                              size="sm"
                              className="h-8 px-3 text-xs bg-[#5df0a8]/20 hover:bg-[#5df0a8]/30 text-[#5df0a8] border border-[#5df0a8]/40"
                              onClick={() => navigate(`/form/${form.id}`)}
                            >
                              Otvori
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {liveMatchingForms.length > 6 && (
                    <div className="p-2.5 bg-black/40 border-t border-white/10 text-center">
                      <button
                        type="button"
                        onClick={() => handleSearch()}
                        className="text-xs font-semibold text-[#5df0a8] hover:underline"
                      >
                        Prikaži svih {liveMatchingForms.length} rezultata u Search Konzoli &rarr;
                      </button>
                    </div>
                  )}
                </div>
              )}
            </form>

            {/* Nedavne pretrage */}
            <div className="mt-3">
              <RecentSearches
                searches={recentSearches}
                onSelectSearch={handleSelectRecentSearch}
                onRemoveSearch={removeSearch}
                onClearAll={clearRecentSearches}
              />
            </div>
          </div>

          {/* REAL-TIME STATISTICS COUNTER BANNER */}
          <div className="mt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="glass-panel p-4 rounded-xl text-center border-white/10 hover:border-[#5df0a8]/30 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#5df0a8] font-mono">
                {totalForms}+
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                Verifikovanih Obrazaca
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl text-center border-white/10 hover:border-[#5df0a8]/30 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {municipalities.length}+
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                Općina & Centara
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl text-center border-white/10 hover:border-[#5df0a8]/30 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                5
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                Jezika & Dva Pisma
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl text-center border-white/10 hover:border-[#5df0a8]/30 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono">
                100%
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                Usklađeni Izvori
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ZVANIČNI POREZNI & UPRAVNI OBASCI SHOWCASE (Ascend Glass Styling) */}
      <section className="py-14 relative z-10 border-y border-white/10">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-amber-400 bg-amber-400/10 border border-amber-400/30 mb-2">
                <Landmark className="w-3.5 h-3.5" /> PORESKA & UPRAVNA INFRASTRUKTURA BIH
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Zvanični JS / PD / MIP Obrasci za BiH
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Direktno popunjavanje, automatski izračuni i validacija za sva 3 poreska sistema u BiH:
                Porezna uprava FBiH, Poreska uprava RS (uz ćiriličnu podršku) i Poreska uprava Brčko Distrikta.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link to="/generator">
                <Button className="bg-[#5df0a8] hover:bg-[#4ae098] text-[#04060f] font-bold text-xs shadow-[0_0_15px_rgba(93,240,168,0.3)]">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Otvori Generator
                </Button>
              </Link>
              <Link to="/faq">
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-xs">
                  Česta Pitanja (FAQ)
                </Button>
              </Link>
            </div>
          </div>

          {/* 3 Entity Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* FBiH Card */}
            <div className="glass-panel p-5 rounded-2xl hover:border-sky-500/40 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  Federacija BiH
                </span>
                <span className="text-xs text-slate-400">3 Obrasca</span>
              </div>
              <h3 className="font-bold text-base text-white mb-2 group-hover:text-sky-300 transition-colors">
                Porezna uprava FBiH
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <strong>JS 3100</strong> – Prijava/promjena/odjava radnika
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <strong>JS 3110</strong> – Dobrovoljno PIO i ZO osiguranje
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <strong>JS 3120</strong> – Učenici i volonteri na praksi
                </li>
              </ul>
            </div>

            {/* RS Card */}
            <div className="glass-panel p-5 rounded-2xl hover:border-rose-500/40 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  Republika Srpska (Ћирилица)
                </span>
                <span className="text-xs text-slate-400">3 Obrasca</span>
              </div>
              <h3 className="font-bold text-base text-white mb-2 group-hover:text-rose-300 transition-colors">
                Пореска управа РС
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <strong>PD 3100</strong> – Пријава/одјава уплате доприноса
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <strong>PD 3110</strong> – Индивидуална уплата (СП, пољопривреда)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <strong>PD 3120</strong> – Околности праксе и стручног усавршавања
                </li>
              </ul>
            </div>

            {/* Brčko Card */}
            <div className="glass-panel p-5 rounded-2xl hover:border-amber-500/40 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Brčko Distrikt BiH
                </span>
                <span className="text-xs text-slate-400">2 Obrasca</span>
              </div>
              <h3 className="font-bold text-base text-white mb-2 group-hover:text-amber-300 transition-colors">
                Poreska uprava BD
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <strong>MIP-1023</strong> – Mjesečni izvještaj o porezima
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <strong>JS-BD / MS</strong> – Prijava radnika (fondovi PIO)
                </li>
              </ul>
            </div>
          </div>

          {/* In-Memory Guarantee */}
          <div className="glass-panel p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#5df0a8] shrink-0" />
              <span>
                <strong>100% In-Memory Sigurnost:</strong> Vaši JMBG i privatni podaci ne snimaju se na servere. Instant klijentsko PDF generisanje.
              </span>
            </div>
            <Link to="/faq" className="text-[#5df0a8] hover:underline font-semibold shrink-0">
              Saznajte više o zaštiti podataka →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. NAJTRAŽENIJI OBRASCI (Glass Cards) */}
      <section className="py-14 relative z-10">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#5df0a8]" />
                {t('home.popularForms')}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Najčešće preuzimani administrativni formulari</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/search')}
              className="text-[#5df0a8] hover:text-[#5df0a8] hover:bg-white/5"
            >
              {t('home.viewAll')} →
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredPopularForms.length > 0 ? (
              filteredPopularForms.map((form) => (
                <div
                  key={form.nameKey}
                  className="glass-panel p-4 rounded-xl cursor-pointer hover:border-[#5df0a8]/40 hover:bg-[#0c1633] transition-all group"
                  onClick={() => navigate(`/search?q=${encodeURIComponent(form.searchTerm)}`)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-white group-hover:text-[#5df0a8] transition-colors line-clamp-2">
                        {t(form.nameKey)}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                          {t(form.categoryKey)}
                        </span>
                        {form.online ? (
                          <span className="flex items-center gap-1 text-[10px] text-[#5df0a8] font-medium">
                            <Wifi className="h-3 w-3" /> Online dostupan
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] text-amber-400 font-medium">
                            <WifiOff className="h-3 w-3" /> Na šalteru
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#5df0a8]/20 flex items-center justify-center shrink-0 transition-colors">
                      <Download className="h-4 w-4 text-slate-400 group-hover:text-[#5df0a8]" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-sm text-slate-400 glass-panel rounded-xl">
                Nema najtraženijih obrazaca koji odgovaraju pretrazi &ldquo;{searchQuery}&rdquo;.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. PREGLED OPĆINA & KANTONA (Radar Grid) */}
      <section className="py-14 border-t border-white/10 relative z-10">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/30 mb-2">
              <Building2 className="w-3.5 h-3.5" /> LOKALNA ADMINISTRACIJA
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {t('home.browseMunicipalities')}
            </h2>
            <p className="text-slate-400 text-sm">
              Pristupite bazama podataka obrazaca po općinama i gradovima Bosne i Hercegovine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredMunicipalities.slice(0, 15).map((municipality) => (
              <div
                key={municipality.slug}
                className="glass-panel p-3.5 rounded-xl cursor-pointer hover:border-[#5df0a8]/40 hover:bg-[#0c1633] transition-all group flex items-center justify-between gap-3"
                onClick={() => navigate(`/municipality/${municipality.slug}`)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0c1a3b] to-[#040817] border border-[#5df0a8]/30 flex items-center justify-center shrink-0 group-hover:border-[#5df0a8] transition-colors">
                    <Building2 className="h-4 w-4 text-[#5df0a8]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-white group-hover:text-[#5df0a8] transition-colors truncate">
                      {municipality.name}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">
                      {municipality.cantonShort} • {municipality.entity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#5df0a8]/10 text-[#5df0a8] border border-[#5df0a8]/20">
                    {municipality.formsCount}
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/search">
              <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 text-xs">
                Pregledaj sve općine u BiH ({municipalities.length}) →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PREDNOSTI PLATFORME (Ascend Features) */}
      <section className="py-14 border-t border-white/10 relative z-10">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="text-center mb-10 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Zašto BH PapirFinder?
            </h2>
            <p className="text-slate-400 text-sm">
              Projektovano za brzo, precizno i bezbjedno rješavanje administrativnih obaveza u BiH.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border-white/10 hover:border-[#5df0a8]/40 transition-all text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-base text-white mb-2">{feature.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INSTITUTION NEWS CAROUSEL */}
      <InstitutionNewsCarousel />

      {/* 7. POZIV NA AKCIJU */}
      {!userAccount && (
        <section className="py-16 relative z-10 border-t border-white/10">
          <div className="container px-4 max-w-4xl mx-auto text-center">
            <div className="glass-panel-glow p-8 sm:p-12 rounded-3xl">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
                Spremni za administrativno rasterećenje?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                Pridružite se hiljadama građana i kompanija u BiH i dijaspori koji štede sate čekanja na šalterima.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  size="lg"
                  className="bg-[#5df0a8] hover:bg-[#4ae098] text-[#04060f] font-bold px-8 shadow-[0_0_20px_rgba(93,240,168,0.4)]"
                  onClick={() => navigate('/register')}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Započnite besplatan probni period
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/15 bg-white/5 hover:bg-white/10 text-white px-6"
                  onClick={() => navigate('/subscription')}
                >
                  <Clock className="h-4 w-4 mr-2 text-[#5df0a8]" />
                  Pogledajte planove pretplate
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Modal za Print Preview obrazaca */}
      {previewForm && (
        <PrintPreviewModal
          open={!!previewForm}
          onOpenChange={(open) => {
            if (!open) setPreviewForm(null);
          }}
          formId={previewForm.form.id}
          displayName={previewForm.form.name}
          originalName={previewForm.form.name}
          category={previewForm.form.category}
          municipalityName={previewForm.municipality.name}
          cantonShort={previewForm.municipality.cantonShort}
          sizeKB={previewForm.form.sizeKB}
          fileUrl={previewForm.form.pdfUrl}
        />
      )}

      <Footer />
    </div>
  );
};

export default Index;