import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  MapPin,
  Globe,
  Building2,
  Headset,
  Radio,
  ShieldCheck,
  Clock,
  Send,
  CheckCircle2,
  Phone,
  MessageSquare,
  HelpCircle,
  FileQuestion,
  Lock,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniversalBackButton from '@/components/UniversalBackButton';
import { useToast } from '@/hooks/use-toast';

const Support = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('obrazac_pomoc');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({
        title: 'Popunite sva polja',
        description: 'Molimo unesite vaše ime, email adresu i opis upita.',
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate instant dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: 'Upit uspješno poslan',
        description: 'Naš tim će vam odgovoriti u najkraćem roku na navedeni email.',
      });
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-100 selection:bg-[#5df0a8]/30 selection:text-white">
      <Header />

      <main className="flex-1 py-10 px-4">
        <div className="container max-w-5xl mx-auto">
          {/* Top Bar with Universal Back Button */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <UniversalBackButton variant="command" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5df0a8]/10 border border-[#5df0a8]/30 text-xs font-mono text-[#5df0a8]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>LIVE KORISNIČKI PORTAL • 24/7 PRIJEM UPITA</span>
            </div>
          </div>

          {/* Hero Heading & Live Status Indicator */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            {/* Live Operational Status Indicator */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0b162f] border border-[#5df0a8]/40 shadow-[0_0_20px_rgba(93,240,168,0.15)] mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5df0a8] animate-ping" />
              <span className="text-xs font-semibold text-[#5df0a8]">
                Svi administrativni servisi operativni
              </span>
              <span className="text-[11px] text-slate-400 border-l border-white/10 pl-2">
                Prosječno vrijeme odgovora &lt; 15 min
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
              Kako vam možemo pomoći danas?
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Trebate pomoć oko pronalaska obrasca, popunjavanja ili imate specifično birokratsko pitanje? Naš tim u Zenici i podrška za dijasporu su vam na raspolaganju.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
            {/* Left 7 cols: Secure Message Dispatch Interface */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#5df0a8]/10 border border-[#5df0a8]/30 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-[#5df0a8]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">Direktni upit za podršku</h3>
                      <p className="text-xs text-slate-400">Sigurna 256-bitna TLS enkripcija poruke</p>
                    </div>
                  </div>
                  <Lock className="w-4 h-4 text-slate-500" />
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <CheckCircle2 className="w-14 h-14 text-[#5df0a8] mx-auto animate-in zoom-in-75 duration-300" />
                    <h4 className="text-xl font-bold text-white">Upit uspješno zaprimljen</h4>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Zahvaljujemo se na kontaktu. Naš tim je evidentirao vaš upit pod prioritetnim brojem tiketa i poslat će detaljan odgovor na <span className="text-[#5df0a8] font-mono">{email}</span>.
                    </p>
                    <Button
                      onClick={() => {
                        setSubmitted(false);
                        setMessage('');
                      }}
                      variant="outline"
                      className="border-white/10 text-slate-300 text-xs mt-4"
                    >
                      Pošalji novi upit
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                          Vaše ime i prezime
                        </label>
                        <Input
                          type="text"
                          required
                          placeholder="Npr. Amir Hodžić"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="glass-input h-11 text-xs sm:text-sm rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                          Email adresa za odgovor
                        </label>
                        <Input
                          type="email"
                          required
                          placeholder="primjer@domena.ba"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="glass-input h-11 text-xs sm:text-sm rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Kategorija administrativnog upita
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="glass-input w-full h-11 px-3 text-xs sm:text-sm rounded-xl bg-[#0b142d] border border-white/10 text-white"
                      >
                        <option value="obrazac_pomoc">Pomoć oko pronalaska ili popunjavanja obrasca</option>
                        <option value="porezna_uprava">Porezna uprava FBiH / RS / Brčko (JS & PD)</option>
                        <option value="dijaspora_inostranstvo">Dijaspora: Nostrifikacija, CIPS & Pasoš</option>
                        <option value="pretplata_racun">Pitanje o pretplati ili R1 fiskalnom računu</option>
                        <option value="tehnicki_problem">Prijedlog nove općine ili prijava linka</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Detaljan opis pitanja ili potrebnog dokumenta
                      </label>
                      <Textarea
                        required
                        rows={5}
                        placeholder="Napišite naziv općine, vrstu postupka i detalje..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="glass-input text-xs sm:text-sm rounded-xl"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 bg-[#5df0a8] hover:bg-[#4be096] text-[#04060f] font-bold text-xs sm:text-sm rounded-xl shadow-[0_0_20px_rgba(93,240,168,0.3)] flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Slanje upita...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Pošalji upit timu za podršku</span>
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Right 5 cols: Corporate Reliability & Fast Contact Info */}
            <div className="lg:col-span-5 space-y-4">
              {/* Corporate Card */}
              <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#5df0a8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">B&amp;H Assistant d.o.o.</h4>
                    <p className="text-xs text-slate-400">Verifikovani nosilac platforme</p>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#5df0a8] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Sjedište:</strong>
                      <span>Zenica 72 000, Bosna i Hercegovina</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-[#5df0a8] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Službeni email:</strong>
                      <a href="mailto:info@bh-assistant.ba" className="text-[#5df0a8] hover:underline font-mono">
                        info@bh-assistant.ba
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-[#5df0a8] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Zvanični portal:</strong>
                      <span className="font-mono text-slate-300">www.bh-assistant.ba</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enterprise Guarantee SLA Card */}
              <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#5df0a8]" />
                  <span>Garancija pouzdanosti i privatnosti</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Svi upiti se obrađuju u skladu sa Zakonom o zaštiti ličnih podataka BiH. Vaši podaci se ne dijele sa trećim stranama.
                </p>
                <div className="pt-2 flex items-center gap-3 text-xs">
                  <Link to="/faq" className="text-[#5df0a8] hover:underline font-semibold flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" /> Pogledajte FAQ
                  </Link>
                  <span className="text-slate-600">•</span>
                  <Link to="/terms" className="text-slate-400 hover:text-white">
                    Uslovi korištenja
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;