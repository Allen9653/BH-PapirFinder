import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import Footer from '@/components/Footer';

interface InfoPageLayoutProps {
  icon: LucideIcon;
  title: string;
  intro?: string;
  children: ReactNode;
}

/** Zajednički okvir za informativne stranice (FAQ, impressum, kolačići, zakoni). */
export default function InfoPageLayout({ icon: Icon, title, intro, children }: InfoPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <section className="bg-gradient-to-br from-[#003D7A] to-[#00A651] text-white py-12">
        <div className="container px-4 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3 break-words">
            <Icon className="h-8 w-8 flex-shrink-0" /> {title}
          </h1>
          {intro && <p className="text-gray-100 mt-3 break-words">{intro}</p>}
        </div>
      </section>
      <div className="container px-4 max-w-4xl py-10 space-y-6 flex-1">{children}</div>
      <Footer />
    </div>
  );
}
