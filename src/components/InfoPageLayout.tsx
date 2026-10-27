import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniversalBackButton from '@/components/UniversalBackButton';

interface InfoPageLayoutProps {
  icon: LucideIcon;
  title: string;
  intro?: string;
  children: ReactNode;
}

/** Zajednički okvir za informativne stranice (FAQ, impressum, kolačići, zakoni) */
export default function InfoPageLayout({ icon: Icon, title, intro, children }: InfoPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col text-slate-100 selection:bg-[#5df0a8]/30 selection:text-white">
      <Header />

      <section className="relative overflow-hidden pt-8 pb-10 px-4 border-b border-white/10 bg-[#070b1a]/85 backdrop-blur-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-gradient-to-tr from-[#5df0a8]/10 via-sky-500/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
        <div className="container px-4 max-w-5xl mx-auto relative z-10">
          <div className="flex items-center justify-between gap-4 mb-5">
            <UniversalBackButton variant="command" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/30">
              <span>ZVANIČNA DOKUMENTACIJA</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold flex items-center gap-3 text-white tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Icon className="h-5 w-5 text-[#5df0a8]" />
            </div>
            <span>{title}</span>
          </h1>
          {intro && <p className="text-slate-300 mt-3 text-sm sm:text-base max-w-3xl leading-relaxed">{intro}</p>}
        </div>
      </section>

      <main className="container px-4 max-w-5xl mx-auto py-10 space-y-6 flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
