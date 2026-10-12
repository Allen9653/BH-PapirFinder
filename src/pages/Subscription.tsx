import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
} from 'lucide-react';
import { getUserAccount, upgradeToPaid } from '@/lib/trial';
import { activateProSubscription } from '@/lib/subscription';
import { config } from '@/lib/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
      monthlyPrice: '0',
      annualPrice: '0',
      annualTotal: '0',
      description: 'Za građane kojima je potrebna povremena pretraga i preuzimanje osnovnih obrazaca.',
      icon: <FileText className="h-6 w-6 text-slate-600" />,
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
      badgeColor: 'bg-emerald-500 text-white border-emerald-600',
      monthlyPrice: '9.90',
      annualPrice: '6.58',
      annualTotal: '79',
      popular: true,
      description: 'Potpuni paket za građane i preduzetnike koji žele uštedjeti sate čekanja na šalterima.',
      icon: <Sparkles className="h-6 w-6 text-emerald-600" />,
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
      badgeColor: 'bg-blue-600 text-white border-blue-700',
      monthlyPrice: '19.90',
      annualPrice: '12.42',
      annualTotal: '149',
      description: 'Specijalizovan za bh. dijasporu u Njemačkoj, Austriji, Švicarskoj, SAD i svijetu.',
      icon: <Globe className="h-6 w-6 text-blue-600" />,
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
      badgeColor: 'bg-indigo-600 text-white border-indigo-700',
      monthlyPrice: '39.90',
      annualPrice: '29.08',
      annualTotal: '349',
      description: 'Za knjigovodstvene agencije, advokatske kancelarije i preduzeća sa više zaposlenih.',
      icon: <Briefcase className="h-6 w-6 text-indigo-600" />,
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
    // Approximate BAM to EUR (1 EUR ~ 1.95583 BAM)
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
            const order = await actions.order.capture();
            const months = billingCycle === 'annual' ? 12 : 1;
            const expiry = new Date();
            expiry.setMonth(expiry.getMonth() + months);

            upgradeToPaid(plan.id, expiry.toISOString());
            if (userAccount?.email) {
              await activateProSubscription(userAccount.email, months);
            }

            setPaymentSuccess(true);
            setActivatedPlanName(plan.name);
          } catch (err) {
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

  const handleSelectFreemium = () => {
    navigate('/search');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="container px-4 max-w-6xl mx-auto">
          {/* Page Top Heading */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#003D7A]/10 text-[#003D7A] border border-[#003D7A]/20 mb-3">
              <Zap className="h-3.5 w-3.5 text-[#003D7A]" />
              Freemium & Premium Model za Građane i Privredu
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Odaberite paket prilagođen vašim potrebama
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-3">
              Koristite besplatni Freemium pristup za osnovne potrebe, ili pređite na Premium za automatsko popunjavanje obrazaca, neograničeni AI asistent i izbjegavanje šaltera.
            </p>

            {/* Billing Cycle Switcher */}
            <div className="inline-flex items-center bg-slate-200/80 p-1 rounded-full mt-6 shadow-inner">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-slate-900 shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mjesečno plaćanje
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  billingCycle === 'annual'
                    ? 'bg-[#003D7A] text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Godišnje
                <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                  Uštedite 35%
                </span>
              </button>
            </div>
          </div>

          {/* Success Banner */}
          {paymentSuccess && (
            <Alert className="mb-8 border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md">
              <Check className="h-5 w-5 text-emerald-600" />
              <AlertDescription className="text-sm font-medium">
                Čestitamo! Vaš paket <strong>{activatedPlanName}</strong> je uspješno aktiviran. Sada imate neograničen pristup svim funkcijama.
                <Button
                  size="sm"
                  onClick={() => navigate('/generator')}
                  className="ml-4 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Otvori Generator Obrazaca
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Error Banner */}
          {paymentError && (
            <Alert className="mb-8 border-red-500 bg-red-50 text-red-900">
              <X className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-sm font-medium">
                {paymentError}
              </AlertDescription>
            </Alert>
          )}

          {/* 4 Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {plans.map((plan) => {
              const priceDisplay = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

              return (
                <Card
                  key={plan.id}
                  className={`flex flex-col relative transition-all duration-300 ${
                    plan.popular
                      ? 'border-2 border-emerald-500 shadow-xl bg-white scale-[1.02] z-10 ring-4 ring-emerald-500/10'
                      : 'border border-slate-200 shadow-sm hover:shadow-md bg-white'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full shadow-sm border ${plan.badgeColor}`}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <CardHeader className="pt-7 pb-4 text-center border-b border-slate-100">
                    <div className="mx-auto mb-2 w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                      {plan.icon}
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500 min-h-[32px] mt-1">
                      {plan.description}
                    </CardDescription>

                    <div className="mt-4">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900">
                          {priceDisplay}
                        </span>
                        <span className="text-sm font-bold text-slate-600">
                          {plan.isFree ? '' : 'KM'}
                        </span>
                        <span className="text-xs text-slate-500">
                          {plan.isFree ? '' : '/ mj.'}
                        </span>
                      </div>
                      {!plan.isFree && billingCycle === 'annual' && (
                        <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                          Naplaćuje se {plan.annualTotal} KM godišnje
                        </p>
                      )}
                      {plan.isFree && (
                        <p className="text-[11px] text-slate-500 font-semibold mt-1">
                          Bez potrebe za unosom kartice
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                        Uključene mogućnosti:
                      </div>
                      <ul className="space-y-2.5 mb-6 text-xs text-slate-700">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                        {plan.notIncluded && plan.notIncluded.map((notFeat, idx) => (
                          <li key={`not-${idx}`} className="flex items-start gap-2 text-slate-400">
                            <X className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" />
                            <span className="line-through">{notFeat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      {plan.isFree ? (
                        <Button
                          variant="outline"
                          onClick={handleSelectFreemium}
                          className="w-full text-xs font-bold border-slate-300 text-slate-700 hover:bg-slate-50"
                        >
                          Nastavi Besplatno
                        </Button>
                      ) : selectedPlan === plan.id ? (
                        <div className="space-y-2">
                          <div id={`paypal-button-${plan.id}`} className="min-h-[44px]">
                            {!paypalLoaded && (
                              <p className="text-xs text-center text-slate-400">Učitavanje PayPal-a...</p>
                            )}
                          </div>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleInstantSimulateActivation(plan)}
                            disabled={activatingDirect}
                            className="w-full text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700"
                          >
                            {activatingDirect ? 'Aktivacija...' : '⚡ Testna / Instant aktivacija'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedPlan(null)}
                            className="w-full text-xs text-slate-500"
                          >
                            Otkaži odabir
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => setSelectedPlan(plan.id)}
                          className={`w-full text-xs font-bold ${
                            plan.popular
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                              : 'bg-[#003D7A] hover:bg-[#002D5A] text-white'
                          }`}
                        >
                          <CreditCard className="h-3.5 w-3.5 mr-1.5" />
                          Odaberi {plan.name}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* In-Depth Feature Comparison Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-16">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Detaljno poređenje: Freemium vs Premium
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Pregled mogućnosti po nivoima pretplate i servisima
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="p-3 font-bold text-slate-900 w-2/5">Funkcija / Mogućnost</th>
                    <th className="p-3 font-bold text-slate-700 text-center">Freemium</th>
                    <th className="p-3 font-bold text-emerald-700 text-center bg-emerald-50/50">Građanski PRO</th>
                    <th className="p-3 font-bold text-blue-700 text-center">Dijaspora VIP</th>
                    <th className="p-3 font-bold text-indigo-700 text-center">Poslovni PRO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-medium text-slate-800">Pretraga 160+ općina i institucija</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Da</td>
                    <td className="p-3 text-center text-emerald-600 font-bold bg-emerald-50/30">✓ Da</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Da</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Da</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-800">Preuzimanje javnih PDF obrazaca</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Da</td>
                    <td className="p-3 text-center text-emerald-600 font-bold bg-emerald-50/30">✓ Da</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Da</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Da</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-800">8 Poreskih generatora (JS 3100, PD 3100, MIP-1023)</td>
                    <td className="p-3 text-center text-slate-400">1 obrazac / mj.</td>
                    <td className="p-3 text-center text-emerald-600 font-bold bg-emerald-50/30">✓ Neograničeno</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Neograničeno</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Neograničeno</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-800">AI Form Filler sa provjerom JMBG i IBAN</td>
                    <td className="p-3 text-center text-slate-400">1 upit</td>
                    <td className="p-3 text-center text-emerald-600 font-bold bg-emerald-50/30">✓ Neograničeno</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Neograničeno</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Neograničeno</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-800">Smart Studio: Transliteracija Latinica ↔ Ćirilica</td>
                    <td className="p-3 text-center text-slate-400">1 tekst</td>
                    <td className="p-3 text-center text-emerald-600 font-bold bg-emerald-50/30">✓ Neograničeno</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Neograničeno</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Neograničeno</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-800">Prevod obrazaca na EN, DE i TR jezik</td>
                    <td className="p-3 text-center text-slate-300">✗</td>
                    <td className="p-3 text-center text-emerald-600 font-bold bg-emerald-50/30">✓ Da</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Da</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Da</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-800">Offline PWA keširanje dokumenata na telefonu</td>
                    <td className="p-3 text-center text-slate-300">✗</td>
                    <td className="p-3 text-center text-emerald-600 font-bold bg-emerald-50/30">✓ Da</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Da</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ Da</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-800">Specijalizovani vodiči za dijasporu (Državljanstvo, CIPS)</td>
                    <td className="p-3 text-center text-slate-300">✗</td>
                    <td className="p-3 text-center text-slate-400">Osnovno</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ VIP Vodiči</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✓ VIP Vodiči</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-800">Broj istovremenih korisnika</td>
                    <td className="p-3 text-center text-slate-600">1</td>
                    <td className="p-3 text-center text-slate-600 bg-emerald-50/30">1</td>
                    <td className="p-3 text-center text-slate-600">1</td>
                    <td className="p-3 text-center text-indigo-700 font-bold">Do 5 operatera</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-800">R1 Račun za pravna lica</td>
                    <td className="p-3 text-center text-slate-300">✗</td>
                    <td className="p-3 text-center text-slate-300 bg-emerald-50/30">✗</td>
                    <td className="p-3 text-center text-slate-300">✗</td>
                    <td className="p-3 text-center text-indigo-700 font-bold">✓ Da (R1 PDV)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Value / ROI Calculator & Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="border-slate-200 p-6 bg-gradient-to-br from-white to-blue-50/30 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Ušteda od 4 do 6 sati</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Umjesto višesatnog čekanja pred općinskim šalterima i ponovnog dolaska zbog pogrešno popunjenog obrasca, sve generišete i provjeravate od kuće za 3 minute.
              </p>
            </Card>

            <Card className="border-slate-200 p-6 bg-gradient-to-br from-white to-emerald-50/30 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Finansijska ušteda</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Izbjegnite troškove prevoza, parkinga i plaćanja posredničkih agencija za proste administrativne obrasce koji vas mogu koštati između 50 i 150 KM po predmetu.
              </p>
            </Card>

            <Card className="border-slate-200 p-6 bg-gradient-to-br from-white to-amber-50/30 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">100% Privatnost i JMBG Zaštita</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aplikacija koristi In-Memory arhitekturu. Vaš JMBG, lični podaci i podaci o radnicima obrađuju se lokalno u vašem pregledniku i ne pohranjuju se na udaljene servere.
              </p>
            </Card>
          </div>

          {/* FAQ section */}
          <div className="bg-slate-100/80 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#003D7A]" />
              Često postavljana pitanja o pretplati
            </h3>
            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <strong className="block text-slate-900 mb-1">Mogu li koristiti aplikaciju potpuno besplatno?</strong>
                Da! Freemium paket je trajno besplatan i omogućava pretragu svih 160+ općina u BiH i preuzimanje javnih obrazaca bez ikakvog unosa kartice.
              </div>
              <div>
                <strong className="block text-slate-900 mb-1">Mogu li otkazati pretplatu u bilo kojem trenutku?</strong>
                Apsolutno. Nema ugovorne obaveze. Možete otkazati pretplatu jednim klikom u vašem profilu ili putem PayPal računa.
              </div>
              <div>
                <strong className="block text-slate-900 mb-1">Koji načini plaćanja su podržani?</strong>
                Podržane su sve kreditne i debitne kartice (Visa, Mastercard, Maestro) putem zaštićenog PayPal gateway-a, kao i direktna uplata na račun za pravna lica (R1 faktura).
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Subscription;