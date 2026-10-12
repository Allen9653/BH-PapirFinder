import { useState, useMemo, useEffect } from 'react';
import {
  HelpCircle,
  Search,
  ShieldCheck,
  Scale,
  Wrench,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import InfoPageLayout from '@/components/InfoPageLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface FAQItem {
  id: string;
  category: 'legal' | 'security' | 'technical';
  categoryLabel: string;
  categoryIcon: typeof Scale;
  question: string;
  answer: string;
  badge: string;
}

const FAQ_DATA: FAQItem[] = [
  // Kategorija 1: O platformi i pravnoj valjanosti
  {
    id: 'legal-1',
    category: 'legal',
    categoryLabel: 'O platformi i pravnoj valjanosti',
    categoryIcon: Scale,
    badge: 'Pravni status',
    question: 'Da li je BH PAPIRFINDER zvanična aplikacija Porezne uprave?',
    answer:
      'Ne. BH PAPIRFINDER je nezavisna privatna softverska platforma u vlasništvu kompanije B&H Assistant d.o.o. Zenica. Naš cilj je tehničko olakšavanje, automatizacija i ispravno popunjavanje komplikovanih administrativnih obrazaca. Nismo povezani sa poreznim upravama niti drugim državnim institucijama u BiH.',
  },
  {
    id: 'legal-2',
    category: 'legal',
    categoryLabel: 'O platformi i pravnoj valjanosti',
    categoryIcon: Scale,
    badge: 'Prihvatanje na šalteru',
    question: 'Da li porezne uprave u BiH prihvataju obrasce generisane kroz vašu aplikaciju?',
    answer:
      'Da. Svi porezni i upravni obrasci (poput JS3000/JS3100, MIP-1023, GPD-1051) generišu se u stopostotnom vizuelnom i tehničkom skladu sa službenim i važećim formularima koje propisuju Porezna uprava FBiH, Porezna uprava RS i Porezna uprava Brčko distrikta. Generisani PDF dokument je spreman za štampu, potpis, pečat i predaju na šalteru.',
  },
  {
    id: 'legal-3',
    category: 'legal',
    categoryLabel: 'O platformi i pravnoj valjanosti',
    categoryIcon: Scale,
    badge: 'Jezici i pisma',
    question: 'Mogu li generisati porezne obrasce na ćirilici ili latinici?',
    answer:
      'Da. BH PAPIRFINDER u potpunosti poštuje ustavnu ravnopravnost jezika i pisama u Bosni i Hercegovini. Prije generisanja bilo kojeg dokumenta, možete izabrati bosanski, hrvatski ili srpski jezik, kao i pismo (latinicu ili ćirilicu) na kojem će obrazac biti pripremljen.',
  },

  // Kategorija 2: Sigurnost podataka i privatnost
  {
    id: 'sec-1',
    category: 'security',
    categoryLabel: 'Sigurnost podataka i privatnost',
    categoryIcon: ShieldCheck,
    badge: 'Client-Side obrada',
    question: 'Gdje se spašavaju moji lični podaci i JMBG nakon što ispunim obrazac?',
    answer:
      'Vaša privatnost je naš prioritet. Ukoliko obrazac preuzimate direktno na ekranu (Instant Download), podaci se procesiraju unutar memorije Vašeg uređaja (Client-Side / In-Memory) i uopšte se ne snimaju na naše servere. Ukoliko koristite opciju "Podijeli" ili "Pošalji na e-mail", dokument se privremeno pohranjuje u naš enkriptovani Supabase oblak.',
  },
  {
    id: 'sec-2',
    category: 'security',
    categoryLabel: 'Sigurnost podataka i privatnost',
    categoryIcon: ShieldCheck,
    badge: 'Protokol 5 sati',
    question: 'Šta se dešava nakon isteka 5 sati od kreiranja dokumenta?',
    answer:
      'Naš sistem posjeduje strogi bezbjednosni protokol koji putem automatizovane skripte trajno, nepovratno i potpuno briše sve privremeno sačuvane dokumente tačno 5 sati nakon njihovog generisanja. Nakon ovog roka, linkovi za dijeljenje prestaju važiti, a podaci više ne postoje na našoj platformi.',
  },
  {
    id: 'sec-3',
    category: 'security',
    categoryLabel: 'Sigurnost podataka i privatnost',
    categoryIcon: ShieldCheck,
    badge: 'Instant brisanje',
    question: 'Mogu li samostalno obrisati generisani dokument prije isteka 5 sati?',
    answer:
      'Naravno. Unutar sekcije za upravljanje generisanim linkom dostupna je opcija "Obriši odmah". Klikom na ovo dugme, dokument se trenutno briše sa našeg storage-a bez čekanja isteka regularnog roka od 5 sati.',
  },

  // Kategorija 3: Tehnička uputstva
  {
    id: 'tech-1',
    category: 'technical',
    categoryLabel: 'Tehnička uputstva (SEO optimizovano)',
    categoryIcon: Wrench,
    badge: 'Vodič za JS obrazac',
    question: 'Kako ispravno ispuniti i predati JS3000 / JS3100 obrazac (Prijava/Odjava radnika)?',
    answer:
      'Za ispravno popunjavanje JS3000/JS3100 obrasca na našem generatoru, potrebno je da pripremite osnovne podatke o obvezniku uplate doprinosa (firme) i osiguraniku (radniku) – uključujući JMBG, adresu, šifru općine i šifru zanimanja. Nakon što generator spoji podatke u službenu formu, preuzmite PDF, odštampajte ga u potrebnom broju primjeraka i predajte nadležnoj ispostavi Porezne uprave u zakonskom roku od 7 dana od dana početka rada.',
  },
  {
    id: 'tech-2',
    category: 'technical',
    categoryLabel: 'Tehnička uputstva (SEO optimizovano)',
    categoryIcon: Wrench,
    badge: 'PDF formati',
    question: 'Zašto moj računar ili telefon ne mogu da otvore preuzeti obrazac?',
    answer:
      'Svi dokumenti na platformi BH PAPIRFINDER se generišu u univerzalnom PDF formatu. Kako biste ih otvorili, potrebno je da na svom uređaju imate instaliran bilo koji besplatan čitač PDF dokumenata (npr. Adobe Acrobat Reader, Google Chrome, ili fabrički preglednik na pametnim telefonima).',
  },
  {
    id: 'tech-3',
    category: 'technical',
    categoryLabel: 'Tehnička uputstva (SEO optimizovano)',
    categoryIcon: Wrench,
    badge: 'Freemium vs Premium',
    question: 'Da li se generisanje i preuzimanje dokumenata naplaćuje?',
    answer:
      'BH PAPIRFINDER nudi kombinovani (Freemium/Premium) model korištenja. Osnovni porezni i administrativni obrasci su dostupni potpuno besplatno za instant popunjavanje i preuzimanje. Napredne opcije, kao što su grupno generisanje obrazaca iz Excel/CSV datoteka i dugoročni paketi za knjigovodstvene agencije, podliježu naplati u skladu sa našim zvaničnim Cjenovnikom.',
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'legal' | 'security' | 'technical'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Schema.org Structured Data
  useEffect(() => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'faq-jsonld';
    el.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_DATA.map(x => ({
        '@type': 'Question',
        name: x.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: x.answer,
        },
      })),
    });
    document.getElementById('faq-jsonld')?.remove();
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <InfoPageLayout
      icon={HelpCircle}
      title="Česta Pitanja (FAQ) – BH PAPIRFINDER"
      intro="Sve informacije o pravnoj valjanosti, sigurnosti ličnih podataka (In-Memory obrada i automatsko brisanje nakon 5 sati), radu generatora i modelima pristupa za FBiH, Republiku Srpsku i Brčko Distrikt."
    >
      <div className="space-y-8">
        {/* Search & Filter Bar */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <Sparkles className="w-3.5 h-3.5" /> Baza znanja i propisa
                </span>
                <h2 className="text-xl md:text-2xl font-bold mt-2">Kako vam možemo pomoći?</h2>
                <p className="text-sm text-blue-200">
                  Pretražite bazu odgovora o popunjavanju JS obrazaca, pravnoj valjanosti i sigurnosti.
                </p>
              </div>
              <div className="w-full md:w-80 relative">
                <Search className="w-4 h-4 absolute left-3 top-3.5 text-blue-300" />
                <Input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Pretraži pitanja ili pojam..."
                  className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-blue-300/70 focus:bg-white/20 transition-all rounded-xl"
                />
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Sva pitanja ({FAQ_DATA.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('legal')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === 'legal'
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                O platformi i pravnoj valjanosti (3)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('security')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === 'security'
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Sigurnost podataka i privatnost (3)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('technical')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === 'technical'
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                Tehnička uputstva (3)
              </button>
            </div>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">100% Zvanični Formati</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Obrasci za FBiH, RS i Brčko usklađeni sa propisima nadležnih poreznih uprava.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Privatnost i 5h Pravilo</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                In-memory klijentska obrada; privremeni linkovi se trajno brišu nakon 5 sati.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Latinica i Ćirilica</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Puna ravnopravnost pisama uz podršku za zvanične obrasce Poreske uprave RS.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 md:p-6 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 font-medium">Nema rezultata za odabrani pojam pretrage.</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Poništi pretragu
              </Button>
            </div>
          ) : (
            <Accordion type="multiple" defaultValue={['legal-1', 'legal-2', 'sec-1', 'tech-1']} className="space-y-3">
              {filteredItems.map(item => {
                const Icon = item.categoryIcon;
                return (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border border-slate-100 rounded-xl px-4 py-1 data-[state=open]:bg-slate-50/60 transition-colors"
                  >
                    <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-900 text-sm md:text-base py-3">
                      <div className="flex items-center gap-3 pr-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-[10px] py-0 px-2 font-medium bg-slate-100 text-slate-700">
                              {item.badge}
                            </Badge>
                          </div>
                          <span>{item.question}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 text-sm leading-relaxed pl-11 pt-1 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>

        {/* Call to action: Generator & 8 JS Forms */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Isprobajte u praksi
            </span>
            <h3 className="text-lg md:text-xl font-bold text-slate-900">
              Generišite zvanične JS obrasce za prijavu radnika u nekoliko klikova
            </h3>
            <p className="text-sm text-slate-600 max-w-xl">
              Isprobajte centralni generator za FBiH (JS 3100, 3110, 3120), Republiku Srpsku (PD 3100, 3110, 3120 sa ćiriličnim ispisom) i Brčko Distrikt (MIP-1023 i JS-BD).
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/generator">
              <Button className="bg-[#003D7A] hover:bg-[#002B5C] text-white shadow-md flex items-center gap-2">
                Otvori Generator
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/subscription">
              <Button variant="outline" className="border-blue-300 text-blue-900 hover:bg-blue-100/50">
                Pregled Paketa
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
}
