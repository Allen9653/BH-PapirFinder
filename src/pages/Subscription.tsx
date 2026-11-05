import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Check,
  X,
  Sparkles,
  Shield,
  Clock,
  Star,
  Building2,
  Globe,
  Briefcase,
  Users,
  CreditCard,
  ArrowRight,
  HelpCircle,
  FileText,
  Lock,
  Zap,
  TrendingUp,
  ShieldCheck,
  Radio,
  CheckCircle2,
} from 'lucide-react';
import { getUserAccount, upgradeToPaid } from '@/lib/trial';
import { activateProSubscription } from '@/lib/subscription';
import { config } from '@/lib/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniversalBackButton from '@/components/UniversalBackButton';

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: Record<string, unknown>) => { render: (selector: string) => void };
    };
  }
}

interface PlanDefinition {
  id: string;
  name: string;
  badge?: string;
  badgeColor?: string;
  monthlyPrice: string;
  annualPrice: string;
  annualTotal: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  isFree?: boolean;
  targetAudience: string;
  paypalAmountMonthly: string;
  paypalAmountAnnual: string;
}

const Subscription: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [activatedPlanName, setActivatedPlanName] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [activatingDirect, setActivatingDirect] = useState(false);
  const userAccount = getUserAccount();

  const plans: PlanDefinition[] = [
    {
      id: 'freemium',
      name: 'Freemium (Besplatno)',
      badge: 'Uvijek dostupno',
      badgeColor: 'bg-white/10 text-slate-300 border-white/10',
      monthlyPrice: '0',
      annualPrice: '0',
      annualTotal: '0',
      description: 'Za građane kojima je potrebna povremena pretraga i preuzimanje osnovnih obrazaca.',
      icon: <FileText className="h-6 w-6 text-slate-400" />,
      targetAudience: 'Svi građani Bosne i Hercegovine',
      isFree: true,
      paypalAmountMonthly: '0',
      paypalAmountAnnual: '0',
      features: [
        'Pretraga svih 160+ općina i institucija u BiH',
        'Preuzimanje javno dostupnih općinskih PDF obrazaca',
        'Uvid u verifikovane službene web domene i e-uprava linkove',
        '1 besplatno popunjavanje kroz AI asistenta mjesečno',
        '1 besplatna transliteracija Latinica ↔ Ćirilica',
        'Pregled aktuelnih vijesti i saopštenja institucija',
      ],
      notIncluded: [
        'Neograničeno popunjavanje 8 JS/PD/MIP obrazaca',
        'Neograničeni AI asistent za validaciju podataka',
        'Offline PWA rad bez interneta',
        'Prevod dokumenata na EN, DE i TR jezik',
        'Prioritetna korisnička podrška',
      ],
    },
    {
      id: 'gradjanski-pro',
      name: 'Građanski PRO',
      badge: 'Najpopularniji izbor',
      badgeColor: 'bg-[#5df0a8]/20 text-[#5df0a8] border-[#5df0a8]/40',
      monthlyPrice: '9.90',
      annualPrice: '6.58',
      annualTotal: '79',
      popular: true,
      description: 'Potpuni paket za građane i preduzetnike koji žele uštedjeti sate čekanja na šalterima.',
      icon: <Sparkles className="h-6 w-6 text-[#5df0a8]" />,
      targetAudience: 'Građani, vlasnici obrta i freelanceri',
      paypalAmountMonthly: '9.90',
      paypalAmountAnnual: '79.00',
      features: [
        'Sve iz Freemium paketa',
        'Neograničeno generisanje svih 8 JS/PD/MIP obrazaca (FBiH, RS, Brčko)',
        'Neograničen AI Form Filler sa validacijom JMBG, IBAN i adresa',
        'Smart Document Studio: Neograničena transliteracija i prevod',
        'Offline PWA pristup za preuzete dokumente',
        '100% In-Memory privatnost (bez snimanja JMBG-a na servere)',
        'Instant izvoz u PDF i TXT format spreman za štampu',
      ],
      notIncluded: [
        'Dvojezični ovjereni obrasci za inostranstvo',
        'Višekorisnički timski račun za knjigovođe',
      ],
    },
    {
      id: 'dijaspora-vip',
      name: 'Dijaspora VIP',
      badge: 'Za državljane u dijaspori',
      badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
      monthlyPrice: '19.90',
      annualPrice: '12.42',
      annualTotal: '149',
      description: 'Specijalizovan za bh. dijasporu u Njemačkoj, Austriji, Švicarskoj, SAD i svijetu.',
      icon: <Globe className="h-6 w-6 text-sky-400" />,
      targetAudience: 'Državljani BiH u dijaspori i povratnici',
      paypalAmountMonthly: '19.90',
      paypalAmountAnnual: '149.00',
      features: [
        'Sve iz Građanski PRO paketa',
        'Vodiči za pasoše, CIPS prijave i državljanstvo na daljinu',
        'Specijalizovani obrasci za nostrifikaciju diploma u BiH',
        'Dvojezični obrasci na njemačkom, engleskom i turskom jeziku',
        'Instrukcije za ovjeru punomoći i katastarske prenose',
        'Prioritetna WhatsApp i Email podrška u roku od 2 sata',
      ],
      notIncluded: [
        'Masovni import radnika za veća preduzeća',
      ],
    },
    {
      id: 'poslovni-pro',
      name: 'Poslovni / Knjigovodstvo',
      badge: 'Za firme i agencije',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      monthlyPrice: '39.90',
      annualPrice: '29.08',
      annualTotal: '349',
      description: 'Za knjigovodstvene agencije, advokatske kancelarije i preduzeća sa više zaposlenih.',
      icon: <Briefcase className="h-6 w-6 text-amber-400" />,
      targetAudience: 'Knjigovođe, pravnici i poslodavci',
      paypalAmountMonthly: '39.90',
      paypalAmountAnnual: '349.00',
      features: [
        'Sve iz Dijaspora VIP paketa',
        'Do 5 operatera / korisnika u sklopu jednog naloga',
        'Masovna (batch) prijava radnika JS-3100 i PD-3100',
        'Podrška za sva tri poreska sistema (FBiH, RS ćirilica, Brčko)',
        'R1 fiskalni račun za pravna lica u Bosni i Hercegovini',
        'Prioritetno ažuriranje izmjena zakonskih obrazaca',
        'Dedikovana podrška sa direktnim brojem telefona',
      ],
    },
  ];

  // Load PayPal SDK
  useEffect(() => {
    if (document.getElementById('paypal-sdk')) {
      setPaypalLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'paypal-sdk';
    script.src = `https://www.paypal.com/sdk/js?client-id=${config.paypalClientId}&currency=EUR&intent=capture`;
    script.async = true;
    script.onload = () => setPaypalLoaded(true);
    script.onerror = () => {
      console.error('Failed to load PayPal SDK');
      setPaypalLoaded(false);
    };
    document.body.appendChild(script);
  }, []);

  // Activate PayPal buttons when a paid plan is selected
  const renderPayPalButton = useCallback((plan: PlanDefinition) => {
    const containerId = `paypal-button-${plan.id}`;
    const container = document.getElementById(containerId);
    if (!container || !window.paypal) return;

    container.innerHTML = '';
    const rawAmount = billingCycle === 'annual' ? plan.paypalAmountAnnual : plan.paypalAmountMonthly;
    const eurAmount = (parseFloat(rawAmount) / 1.95583).toFixed(2);

    try {
      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 44,
        },
        createOrder: (_data: unknown, actions: { order: { create: (opts: Record<string, unknown>) => Promise<string> } }) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'EUR',
                  value: eurAmount,
                },
                description: `BH PapirFinder ${plan.name} (${billingCycle === 'annual' ? 'Godišnja pretplata' : 'Mjesečna pretplata'})`,
              },
            ],
          });
        },
        onApprove: async (_data: unknown, actions: { order: { capture: () => Promise<{ id: string }> } }) => {
          try {
            await actions.order.capture();
            const months = billingCycle === 'annual' ? 12 : 1;
            const expiry = new Date();
            expiry.setMonth(expiry.getMonth() + months);

            upgradeToPaid(plan.id, expiry.toISOString());
            if (userAccount?.email) {
              await activateProSubscription(userAccount.email, months);
            }

            setPaymentSuccess(true);
            setActivatedPlanName(plan.name);
          } catch {
            setPaymentError('Plaćanje nije uspjelo. Pokušajte ponovo.');
          }
        },
        onError: () => {
          setPaymentError('Došlo je do greške pri povezivanju sa PayPal-om.');
        },
      }).render(`#${containerId}`);
    } catch {
      // Handle render fail
    }
  }, [billingCycle, userAccount]);

  useEffect(() => {
    if (selectedPlan && paypalLoaded) {
      const plan = plans.find((p) => p.id === selectedPlan);
      if (plan && !plan.isFree) {
        setTimeout(() => renderPayPalButton(plan), 100);
      }
    }
  }, [selectedPlan, paypalLoaded, billingCycle, renderPayPalButton]);

  const handleInstantSimulateActivation = async (plan: PlanDefinition) => {
    setActivatingDirect(true);
    try {
      const months = billingCycle === 'annual' ? 12 : 1;
      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + months);

      upgradeToPaid(plan.id, expiry.toISOString());
      if (userAccount?.email) {
        await activateProSubscription(userAccount.email, months);
      }

      setPaymentSuccess(true);
      setActivatedPlanName(plan.name);
    } finally {
      setActivatingDirect(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-100 selection:bg-[#5df0a8]/30 selection:text-white">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          {/* Top Bar with Universal Back Button */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <UniversalBackButton variant="command" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5df0a8]/10 border border-[#5df0a8]/30 text-xs font-mono text-[#5df0a8]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>PREMIUM PLANOVI • BYPASS REDOVA</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Investirajte u svoje vrijeme.{' '}
              <span className="bg-gradient-to-r from-[#5df0a8] via-emerald-300 to-sky-400 bg-clip-text text-transparent">
                Zaobiđite šaltere.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
              Pristupite neograničenom automatskom popunjavanju, verifikovanim poreznim obrascima za FBiH, RS i Brčko, te višekorisničkim radnim tokovima.
            </p>

            {/* Billing Cycle Switcher */}
            <div className="inline-flex items-center bg-[#070b1a]/90 p-1.5 rounded-full mt-8 border border-white/10 shadow-xl backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-[#5df0a8] text-[#04060f] font-bold shadow-[0_0_15px_rgba(93,240,168,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Mjesečno plaćanje
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  billingCycle === 'annual'
                    ? 'bg-[#5df0a8] text-[#04060f] font-bold shadow-[0_0_15px_rgba(93,240,168,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Godišnje plaćanje</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Ušteda 33%
                </span>
              </button>
            </div>
          </div>

          {/* Payment Success Alert */}
          {paymentSuccess && (
            <div className="glass-panel-glow p-6 rounded-2xl mb-8 border-[#5df0a8] text-center max-w-xl mx-auto animate-in fade-in zoom-in-95">
              <CheckCircle2 className="w-12 h-12 text-[#5df0a8] mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">
                Čestitamo! Vaš paket &ldquo;{activatedPlanName}&rdquo; je aktiviran!
              </h3>
              <p className="text-slate-300 text-sm mb-6">
                Sve administrativne funkcije i neograničeno popunjavanje su odmah otključani za vaš račun.
              </p>
              <Button
                onClick={() => navigate('/generator')}
                className="bg-[#5df0a8] text-[#04060f] font-bold text-xs px-6"
              >
                Otvori Generator Obrazaca →
              </Button>
            </div>
          )}

          {paymentError && (
            <Alert className="mb-6 bg-rose-500/10 border-rose-500/30 text-rose-300 max-w-xl mx-auto">
              <AlertDescription>{paymentError}</AlertDescription>
            </Alert>
          )}

          {/* 4 Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {plans.map((plan) => {
              const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
              const isSelected = selectedPlan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-6 transition-all relative flex flex-col justify-between ${
                    plan.popular
                      ? 'glass-panel-glow border-[#5df0a8]/60 shadow-[0_0_35px_rgba(93,240,168,0.18)] scale-[1.02]'
                      : 'glass-panel hover:border-white/20'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#5df0a8] text-[#04060f] text-[10px] font-mono font-extrabold uppercase tracking-wider shadow-md">
                      PREPORUČENI PAKET
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        {plan.icon}
                      </div>
                      {plan.badge && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${plan.badgeColor}`}>
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mb-4 min-h-[36px]">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-6 pb-5 border-b border-white/10">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                          {price}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">KM / mjesečno</span>
                      </div>
                      {billingCycle === 'annual' && !plan.isFree && (
                        <span className="text-[11px] text-[#5df0a8] font-mono block mt-1">
                          Naplaćuje se godišnje ({plan.annualTotal} KM)
                        </span>
                      )}
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2.5 mb-6 text-xs text-slate-300">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-[#5df0a8] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                      {plan.notIncluded?.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-500">
                          <X className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action / Checkout Trigger */}
                  <div>
                    {plan.isFree ? (
                      <Button
                        variant="outline"
                        className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold"
                        onClick={() => navigate('/search')}
                      >
                        Nastavi sa Freemium pristupom
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <Button
                          onClick={() => setSelectedPlan(isSelected ? null : plan.id)}
                          className={`w-full text-xs font-bold transition-all ${
                            plan.popular
                              ? 'bg-[#5df0a8] hover:bg-[#4de69c] text-[#04060f] shadow-[0_0_15px_rgba(93,240,168,0.3)]'
                              : 'bg-white/10 hover:bg-white/15 text-white'
                          }`}
                        >
                          {isSelected ? 'Sakrij opcije plaćanja' : 'Odaberi ovaj paket'}
                        </Button>

                        {/* PayPal Container */}
                        {isSelected && (
                          <div className="p-3 rounded-xl bg-black/60 border border-white/10 mt-3 space-y-2">
                            <div id={`paypal-button-${plan.id}`} className="min-h-[44px]" />
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={activatingDirect}
                              onClick={() => handleInstantSimulateActivation(plan)}
                              className="w-full text-[11px] text-slate-400 hover:text-white"
                            >
                              {activatingDirect ? 'Aktivacija...' : 'Direktna aktivacija (Test & Demo mod)'}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Security & Guarantee Trust Banner */}
          <div className="glass-panel p-6 rounded-2xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs text-slate-300">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-6 h-6 text-[#5df0a8] mb-2" />
              <strong className="text-white text-sm">100% In-Memory Sigurnost</strong>
              <p className="text-slate-400 mt-1">Vaši lični podaci i JMBG ne pohranjuju se na baze podataka.</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-6 h-6 text-sky-400 mb-2" />
              <strong className="text-white text-sm">Bez ugovorne obaveze</strong>
              <p className="text-slate-400 mt-1">Otkazivanje pretplate jednim klikom u bilo kojem trenutku.</p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="w-6 h-6 text-amber-400 mb-2" />
              <strong className="text-white text-sm">Fiskalni R1 Račun</strong>
              <p className="text-slate-400 mt-1">Dostupan za sva pravna lica i obrte registrovane u BiH.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Subscription;