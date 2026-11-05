import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import SidebarNav from './SidebarNav';
import LanguageTransliterationSelector from './LanguageTransliterationSelector';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DashboardLayout = ({ children, activeSection, onSectionChange }: DashboardLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SidebarNav
                  activeSection={activeSection}
                  onSectionChange={(s) => { onSectionChange(s); setMobileOpen(false); }}
                />
              </SheetContent>
            </Sheet>

            <button onClick={() => navigate('/')} className="flex items-center gap-2">
              <img
                src="https://mgx-backend-cdn.metadl.com/generate/images/446618/2026-01-06/73ed421d-9866-448f-b32c-399d52a7ab76.png"
                alt="Logo"
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-[#003D7A] hidden sm:inline">
                BH PapirFinder
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <LanguageTransliterationSelector />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r bg-white flex-shrink-0">
          <SidebarNav activeSection={activeSection} onSectionChange={onSectionChange} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;