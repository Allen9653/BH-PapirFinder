import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Search,
  CheckCircle,
  Download,
  Sparkles,
  ShieldCheck,
  Building2,
  FileText,
  Clock,
  ArrowRight,
  HelpCircle,
  Compass,
  AlertCircle,
  Printer,
  ChevronRight,
  Layers,
  MapPin,
  FileCheck,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniversalBackButton from '@/components/UniversalBackButton';

const WALKTHROUGH_STEPS = [
  {
    step: '01',
    title: 'Pretraga kroz Administrativni Radar',
    badge: 'Detekcija obrasca',
    desc: 'Unesite naziv dokumenta ili svrhu (npr. „prijava prebivališta", „građevinska dozvola", „uvjerenje o državljanstvu") ili odaberite vašu općinu.',
    tip: 'Radar automatski pretražuje sve baze u 10 kantona, RS i Brčko distriktu.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Smart Validacija & Popunjavanje',
    badge: 'In-Memory obrada',
    desc: 'Unesite tražene lične i predmetne podatke. Naš algoritam vrši validaciju JMBG-a, JIB-a i IBAN računa u realnom vremenu bez slanja na bazu.',
    tip: 'Podaci ostaju u vašem web pregledniku – garantovana 100% povjerljivost.',
    icon: Sparkles,
  },
  {
    step: '03',
    title: 'Izbor Pisma & Transliteracija',
    badge: 'Latinica ↔ Ćirilica',
    desc: 'Za nekoliko sekundi prebacite dokument između latinice i ćirilice ili prevedite dvojezične obrasce za inostranstvo i dijasporu.',
    tip: 'Poreska uprava RS prihvata isključivo ćirilične PD formulare, koji su ugrađeni u naš sistem.',
    icon: Layers,
  },
  {
    step: '04',
    title: 'Print Preview & Službena Predaja',
    badge: 'Spremno za šalter',
    desc: 'Pregledajte tačan prikaz na papiru (Print Preview), generišite verifikovan PDF sa bar-kod marginama i odštampajte spreman za ovjeru.',
    tip: 'Formati su 100% usklađeni sa službenim obrascima organa uprave u BiH.',
    icon: Printer,
  },
];

const MAZE_GUIDES = [
  {
    id: 'cips',
    title: 'CIPS prijava prebivališta i vađenje lične karte',
    duration: '1-3 dana',
    entity: 'IDDEEA / MUP',
    requirements: [
      'Zvanični PBA-3 zahtjev',
      'Dokaz o vlasništvu stana ili ovjeren ugovor o zakupu',
      'Izvod iz matične knjige rođenih (trajni)',
      'Uplata administrativne takse (18 KM za LK)',
    ],
    path: '/search?q=cips',
  },
  {
    id: 'obrt',
    title: 'Registracija obrta i otvaranje firme',
    duration: '3-7 dana',
    entity: 'Općinska služba za privredu',
    requirements: [
      'Zahtjev za odobrenje obavljanja djelatnosti',
      'Ljekarsko uvjerenje i dokaz o stručnoj spremi',
      'Ugovor o zakupu poslovnog prostora',
      'Prijava u Poreznu upravu (JS-3100 ili PD-3100)',
    ],
    path: '/generator',
  },
  {
    id: 'dijaspora',
    title: 'Nostrifikacija diploma i dokumenti za dijasporu',
    duration: '7-14 dana',
    entity: 'Federalno / Kantonalno ministarstvo obrazovanja',
    requirements: [
      'Original diploma ili ovjerena kopija',
      'Sudski prevod diplome i dodatka diplomi na službeni jezik BiH',
      'Dokaz o uplati republičke/kantonalne takse',
      'Izvod iz matične knjige rođenih i uvjerenje o državljanstvu',
    ],
    path: '/search?q=nostrifikacija',
  },
];

const Guide = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen flex flex-col text-slate-100 selection:bg-[#5df0a8]/30 selection:text-white">
      <Header />

      <main className="flex-1 py-10 px-4">
        <div className="container max-w-5xl mx-auto">
          {/* Top Bar with Universal Back Button */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <UniversalBackButton variant="command" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5df0a8]/10 border border-[#5df0a8]/30 text-xs font-mono text-[#5df0a8]">
              <Compass className="w-3.5 h-3.5" />
              <span>NAVIGACIJA KROZ BIROKRATSKI LABIRINT BIH</span>
            </div>
          </div>

          {/* Cinematic Hero */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Uputstvo za upotrebu & Vodič kroz proceduru
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Savladajte složenu administraciju Bosne i Hercegovine u 4 jednostavna koraka uz pomoć interaktivnog radara i automatskih generatora.
            </p>
          </div>

          {/* 1. VISUAL STEP-BY-STEP PROGRESS TRACKER (Interactive Walkthrough) */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-12 border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#5df0a8] uppercase tracking-wider block">
                  Interaktivni Vodič
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">Kako BH PapirFinder funkcioniše</h2>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                Korak {activeStep + 1} od {WALKTHROUGH_STEPS.length}
              </span>
            </div>

            {/* Stepper buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {WALKTHROUGH_STEPS.map((s, idx) => {
                const Icon = s.icon;
                const isActive = activeStep === idx;
                return (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`p-3.5 rounded-2xl text-left transition-all border ${
                      isActive
                        ? 'glass-panel-glow border-[#5df0a8]/60 bg-[#0e1c3d]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-[#5df0a8]">{s.step}</span>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#5df0a8]' : 'text-slate-400'}`} />
                    </div>
                    <div className="text-xs font-bold text-white truncate">{s.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Step Showcase */}
            {(() => {
              const current = WALKTHROUGH_STEPS[activeStep];
              const Icon = current.icon;
              return (
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#5df0a8]/20 text-[#5df0a8] border border-[#5df0a8]/30">
                        {current.badge}
                      </span>
                      <span className="text-xs text-slate-400">Preporučena procedura</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <Icon className="w-5 h-5 text-[#5df0a8]" />
                      <span>{current.title}</span>
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{current.desc}</p>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[#5df0a8] shrink-0" />
                      <span><strong>Savjet:</strong> {current.tip}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                    {activeStep < WALKTHROUGH_STEPS.length - 1 ? (
                      <Button
                        onClick={() => setActiveStep(activeStep + 1)}
                        className="bg-[#5df0a8] hover:bg-[#4be096] text-[#04060f] font-bold text-xs"
                      >
                        Sljedeći korak
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => navigate('/generator')}
                        className="bg-[#5df0a8] hover:bg-[#4be096] text-[#04060f] font-bold text-xs"
                      >
                        Isprobajte u Generatoru →
                      </Button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 2. SPECIFIČNI VODIČI ZA NAJČEŠĆE UPRAVNE POSTUPKE */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Rješavanje najčešćih birokratskih postupaka
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Kontrolne liste i potrebni dokumenti za nesmetan prolazak na šalterima.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {MAZE_GUIDES.map((maze) => (
                <div
                  key={maze.id}
                  className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-[#5df0a8]/40 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        {maze.entity}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {maze.duration}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-white mb-3 group-hover:text-[#5df0a8] transition-colors">
                      {maze.title}
                    </h3>

                    <div className="space-y-1.5 mb-6 text-xs text-slate-300">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        Obavezna dokumentacija:
                      </span>
                      {maze.requirements.map((req, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#5df0a8] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate(maze.path)}
                    variant="outline"
                    className="w-full text-xs border-white/10 bg-white/5 hover:bg-white/10 text-slate-200"
                  >
                    Pronađi potrebne obrasce →
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* 3. ZDK BESPLATAN PRISTUP BANNER */}
          <div className="glass-panel p-6 rounded-2xl mb-12 border-emerald-500/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/20">
                  <span>🟢 ZDK REGIONALNO PARTNERSTVO</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Besplatan puni pristup za građane Zeničko-dobojskog kantona
                </h3>
                <p className="text-xs text-slate-400 max-w-xl">
                  Građani općina Zenica, Tešanj, Visoko, Kakanj, Zavidovići, Žepče, Maglaj, Breza, Olovo, Vareš, Usora i Doboj Jug imaju puni pristup svim servisima bez naknade.
                </p>
              </div>

              <Button
                onClick={() => navigate('/municipality/zenica')}
                className="bg-[#5df0a8]/20 hover:bg-[#5df0a8]/30 text-[#5df0a8] border border-[#5df0a8]/40 text-xs shrink-0"
              >
                Pregledaj obrasce ZDK
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Guide;