import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FolderOpen,
  Languages,
  User,
  Search,
  LogOut,
  Home,
  Bell, Sparkles } from 'lucide-react';
import { logoutUser, getUserAccount } from '@/lib/trial';
import { useLanguage } from '@/contexts/LanguageContext';

interface SidebarNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

/** Navigacija panela — labeli se rješavaju kroz centralni t() prevodni ključ. */
const navItems = [
  { id: 'home', labelKey: 'dashboard.workDesk', icon: LayoutDashboard },
  { id: 'search', labelKey: 'dashboard.searchForms', icon: Search },
  { id: 'saved', labelKey: 'dashboard.myArchive', icon: FolderOpen },
  { id: 'studio', labelKey: 'dashboard.documentStudio', icon: Languages },
  { id: 'settings', labelKey: 'dashboard.profileSettings', icon: User },
  { id: 'notifications', labelKey: 'dashboard.notifications', icon: Bell },
];

const SidebarNav = ({ activeSection, onSectionChange }: SidebarNavProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const userAccount = getUserAccount();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full py-4">
      {/* User Info */}
      {userAccount && (
        <div className="px-4 pb-4 mb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#003D7A] to-[#00A651] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {userAccount.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{userAccount.name}</p>
              <p className="text-xs text-gray-500 truncate">{userAccount.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                isActive
                  ? 'bg-[#003D7A]/10 text-[#003D7A]'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-4.5 w-4.5 flex-shrink-0 ${isActive ? 'text-[#003D7A]' : 'text-gray-400'}`} />
              <span className="break-words min-w-0">{t(item.labelKey)}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="px-2 pt-4 border-t space-y-1">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-[#003D7A] hover:text-[#002A5A] h-auto py-2"
          onClick={() => navigate('/generator')}
        >
          <Sparkles className="h-4 w-4 mr-3 flex-shrink-0" />
          <span className="break-words text-left">{t('gen.homeTitle')}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-gray-600 hover:text-gray-900 h-auto py-2"
          onClick={() => navigate('/')}
        >
          <Home className="h-4 w-4 mr-3 flex-shrink-0" />
          <span className="break-words text-left">{t('dashboard.homePage')}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 h-auto py-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-3 flex-shrink-0" />
          <span className="break-words text-left">{t('dashboard.logout')}</span>
        </Button>
      </div>
    </div>
  );
};

export default SidebarNav;