import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Search, Languages, Clock, FolderOpen, Sparkles, Bell,
  ChevronRight, TrendingUp, Building2, Lock,
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SavedDocumentsTable from '@/components/dashboard/SavedDocumentsTable';
import SmartDocumentStudio from '@/components/dashboard/SmartDocumentStudio';
import UpgradeModal from '@/components/subscription/UpgradeModal';
import { getUserAccount, hasAccess } from '@/lib/trial';
import {
  getSubscriptionType,
  getSubscriptionRemainingDays,
  getSubscriptionProfile,
  checkFeatureAccess,
  SubscriptionProfile,
} from '@/lib/subscription';
import { getLocalActivity } from '@/lib/user-activity';
import { getExpiryNotification, dismissExpiryNotification, getNotificationColor } from '@/lib/subscription-notifications';
import { trackPageView, trackGA4Event } from '@/lib/ga4-tracking';
import { supabase, getCurrentUser } from '@/lib/supabaseClient';
import { useLanguage } from '@/contexts/LanguageContext';
import { searchInstitutions, Institution } from '@/lib/institutions-database';

/** Mapiranje aplikacijskog jezika na BCP-47 locale za formatiranje datuma. */
const DATE_LOCALES: Record<string, string> = {
  bs: 'bs-BA',
  'bs-Cyrl': 'bs-BA',
  en: 'en-GB',
  de: 'de-DE',
  tr: 'tr-TR',
};

// ============================================================
// Dashboard Home — Quick Cards & Search
// ============================================================

const DashboardHome = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [savedCount, setSavedCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState<{ action: string; created_at: string }[]>([]);
  const [institutionResults, setInstitutionResults] = useState<Institution[]>([]);
  const [subProfile, setSubProfile] = useState<SubscriptionProfile | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState('');
  const userAccount = getUserAccount();
  const subType = getSubscriptionType();
  const daysRemaining = getSubscriptionRemainingDays();
  const expiryNotif = getExpiryNotification();
  const dateLocale = DATE_LOCALES[language] ?? 'bs-BA';

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bh_papirfinder_saved_docs') || '[]');
    setSavedCount(saved.length);
    const activities = getLocalActivity();
    setRecentActivity(activities.slice(0, 5));
    getSubscriptionProfile().then(setSubProfile);
  }, []);

  // Instant institution search
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const results = searchInstitutions(searchQuery);
      setInstitutionResults(results.slice(0, 4));
    } else {
      setInstitutionResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      trackGA4Event('search', { search_term: searchQuery, source: 'dashboard' });
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Expiry Notification */}
      {expiryNotif && (
        <Alert className={`${getNotificationColor(expiryNotif.type).bg} ${getNotificationColor(expiryNotif.type).border}`}>
          <AlertDescription className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${getNotificationColor(expiryNotif.type).text}`}>
            <span className="text-sm break-words">{expiryNotif.message}</span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button size="sm" onClick={() => navigate('/subscription')} className="bg-[#003D7A] hover:bg-[#002D5A] text-white text-xs">
                {t('dashboard.extend')}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                aria-label={t('dashboard.dismissNotification')}
                onClick={() => dismissExpiryNotification(expiryNotif.id)}
                className="text-xs"
              >
                ✕
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Welcome & Search */}
      <div className="bg-gradient-to-r from-[#003D7A] to-[#004A8F] rounded-xl p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-1 break-words">
          {t('dashboard.welcome')}, {userAccount?.name || t('dashboard.defaultUserName')}!
        </h1>
        <p className="text-gray-300 text-sm mb-4 break-words">
          {subType === 'trial' && `${t('dashboard.trialPeriod')}: ${daysRemaining} ${t('dashboard.days')}`}
          {subType === 'paid' && t('dashboard.activeSubscription')}
          {subType === 'expired' && t('dashboard.expiredSubscription')}
        </p>
        <form onSubmit={handleSearch} className="flex gap-2 max-w-lg">
          <Input
            placeholder={t('dashboard.quickSearch')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 h-10"
          />
          <Button type="submit" aria-label={t('dashboard.search')} className="bg-[#00A651] hover:bg-[#008F45] h-10 px-5 flex-shrink-0">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Instant Institution Results */}
        {institutionResults.length > 0 && (
          <div className="mt-3 bg-white/10 rounded-lg p-3 space-y-2">
            <p className="text-xs text-gray-300 font-medium break-words">{t('dashboard.institutionsAndForms')}:</p>
            {institutionResults.map((inst) => (
              <div
                key={inst.id}
                className="flex items-center gap-2 p-2 rounded hover:bg-white/10 cursor-pointer transition-colors"
                onClick={() => navigate(`/search?q=${encodeURIComponent(inst.shortName)}`)}
              >
                <Building2 className="h-4 w-4 text-[#00A651] flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{inst.shortName} — {inst.name}</p>
                  <p className="text-xs text-gray-300 truncate">
                    {inst.category} • {inst.forms.length} {t('dashboard.formsWord')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/search')}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Search className="h-5 w-5 text-[#003D7A]" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-gray-900">128+</p>
              <p className="text-xs text-gray-500 break-words">{t('dashboard.availableForms')}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <FolderOpen className="h-5 w-5 text-[#00A651]" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-gray-900">{savedCount}</p>
              <p className="text-xs text-gray-500 break-words">{t('dashboard.savedDocuments')}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Languages className="h-5 w-5 text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-xs text-gray-500 break-words">{t('dashboard.languagesScripts')}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-gray-900">{daysRemaining}</p>
              <p className="text-xs text-gray-500 break-words">{t('dashboard.daysRemaining')}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Modal */}
      <UpgradeModal
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        profile={subProfile}
        triggerReason={upgradeReason}
      />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex flex-wrap items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#00A651] flex-shrink-0" />
              <span className="break-words">{t('dashboard.aiAssistant')}</span>
              {subProfile?.tier === 'free' && (() => {
                const access = checkFeatureAccess('ai_assistant', subProfile);
                if (!access.allowed) {
                  return (
                    <Badge variant="outline" className="text-xs text-red-600 border-red-300 bg-red-50 sm:ml-auto">
                      <Lock className="h-3 w-3 mr-1" /> {t('dashboard.limitReachedBadge')}
                    </Badge>
                  );
                }
                return (
                  <Badge variant="outline" className="text-xs text-amber-600 border-amber-300 bg-amber-50 sm:ml-auto">
                    {access.remainingUses} {t('dashboard.freeUsesShort')}
                  </Badge>
                );
              })()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3 break-words">
              {t('dashboard.aiAssistantDesc')}
            </p>
            <Button variant="outline" size="sm" onClick={() => {
              const access = checkFeatureAccess('ai_assistant', subProfile);
              if (!access.allowed) {
                setUpgradeReason(t('dashboard.aiLimitUpgradeReason'));
                setShowUpgrade(true);
                return;
              }
              navigate('/search');
            }}>
              <span className="break-words">{t('dashboard.startAssistant')}</span>
              <ChevronRight className="h-3.5 w-3.5 ml-1 flex-shrink-0" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#003D7A] flex-shrink-0" />
              <span className="break-words">{t('dashboard.recentActivity')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-sm text-gray-500 break-words">{t('dashboard.noRecentActivity')}</p>
            ) : (
              <div className="space-y-1.5">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-gray-700 break-words min-w-0">{a.action}</span>
                    <span className="text-gray-400 flex-shrink-0">
                      {new Date(a.created_at).toLocaleDateString(dateLocale, { day: '2-digit', month: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// ============================================================
// Settings Section (Profile & Preferences)
// ============================================================

const SettingsSection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [defaultMunicipality, setDefaultMunicipality] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const userAccount = getUserAccount();

  useEffect(() => {
    if (userAccount) {
      setFullName(userAccount.name);
      setEmail(userAccount.email);
    }
    const savedMunicipality = localStorage.getItem('bh_papirfinder_default_municipality') || '';
    setDefaultMunicipality(savedMunicipality);

    loadFromSupabase();
  }, []);

  const loadFromSupabase = async () => {
    try {
      const { user } = await getCurrentUser();
      if (user) {
        setEmail(user.email || '');
        setFullName(user.user_metadata?.full_name || userAccount?.name || '');
      }
    } catch { /* silent */ }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess('');
    try {
      const { user } = await getCurrentUser();
      if (user) {
        await supabase.auth.updateUser({ data: { full_name: fullName } });
        await supabase.from('user_profiles').upsert({
          user_id: user.id,
          full_name: fullName,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });
      }
      localStorage.setItem('bh_papirfinder_default_municipality', defaultMunicipality);
      if (userAccount) {
        userAccount.name = fullName;
        localStorage.setItem('bh_papirfinder_user_account', JSON.stringify(userAccount));
      }
      setSuccess(t('dashboard.settingsSaved'));
    } catch {
      setSuccess(t('dashboard.saveError'));
    }
    setSaving(false);
  };

  const handleChangePassword = async () => {
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });
      setSuccess(t('dashboard.passwordResetSent'));
    } catch {
      setSuccess(t('dashboard.genericError'));
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg break-words">{t('dashboard.profile')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800 text-sm break-words">{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium break-words">{t('dashboard.fullName')}</label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium break-words">{t('dashboard.email')}</label>
            <Input value={email} disabled className="bg-gray-50" />
            <p className="text-xs text-gray-400 break-words">{t('dashboard.emailCantChange')}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium break-words">{t('dashboard.defaultMunicipality')}</label>
            <Input
              value={defaultMunicipality}
              onChange={(e) => setDefaultMunicipality(e.target.value)}
              placeholder={t('dashboard.municipalityPlaceholder')}
            />
            <p className="text-xs text-gray-400 break-words">
              {t('dashboard.defaultMunicipalityHint')}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button onClick={handleSave} disabled={saving} className="bg-[#003D7A] hover:bg-[#002D5A]">
              {saving ? t('dashboard.saving') : t('dashboard.saveChanges')}
            </Button>
            <Button variant="outline" onClick={handleChangePassword}>
              {t('dashboard.changePassword')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 flex-shrink-0" />
            <span className="break-words">{t('dashboard.notifications')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => navigate('/notifications/preferences')}>
            <span className="break-words">{t('dashboard.manageNotifications')}</span>
            <ChevronRight className="h-3.5 w-3.5 ml-1 flex-shrink-0" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// ============================================================
// Notifications Section
// ============================================================

const NotificationsSection = () => {
  const { t } = useLanguage();
  const subType = getSubscriptionType();
  const daysRemaining = getSubscriptionRemainingDays();

  return (
    <div className="space-y-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 flex-shrink-0" />
            <span className="break-words">{t('dashboard.notifications')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {subType === 'trial' && daysRemaining <= 7 && (
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertDescription className="text-yellow-800 text-sm break-words">
                ⏰ {t('dashboard.trialExpiring')} <strong>{daysRemaining} {t('dashboard.days')}</strong>. {t('dashboard.subscribeForAccess')}
              </AlertDescription>
            </Alert>
          )}
          {subType === 'paid' && daysRemaining <= 3 && (
            <Alert className="bg-orange-50 border-orange-200">
              <AlertDescription className="text-orange-800 text-sm break-words">
                ⚠️ {t('dashboard.subscriptionExpiring')} <strong>{daysRemaining} {t('dashboard.days')}</strong>. {t('dashboard.renewInTime')}
              </AlertDescription>
            </Alert>
          )}
          {subType === 'expired' && (
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-800 text-sm break-words">
                ❌ {t('dashboard.subscriptionExpired')}
              </AlertDescription>
            </Alert>
          )}
          {(subType === 'paid' && daysRemaining > 3) && (
            <p className="text-sm text-gray-500 break-words">{t('dashboard.noNewNotifications')} ✅</p>
          )}
          {subType === 'none' && (
            <p className="text-sm text-gray-500 break-words">{t('dashboard.registerForNotifications')}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// ============================================================
// Search Section (redirects to main search)
// ============================================================

const SearchSection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-5 w-5 text-[#003D7A] flex-shrink-0" />
            <span className="break-words">{t('dashboard.searchForms')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder={t('dashboard.searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11"
            />
            <Button type="submit" className="h-11 px-6 bg-[#003D7A] hover:bg-[#002D5A] flex-shrink-0">
              <Search className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="break-words">{t('dashboard.search')}</span>
            </Button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Olovo', 'Gračanica', 'Rodni list', 'Građevinska dozvola'].map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-[#003D7A]/10"
                onClick={() => { setQuery(tag); navigate(`/search?q=${encodeURIComponent(tag)}`); }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ============================================================
// Main Dashboard Page
// ============================================================

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const userAccount = getUserAccount();

  useEffect(() => {
    if (!userAccount && !hasAccess()) {
      navigate('/login');
      return;
    }
    trackPageView('/dashboard', t('dashboard.pageTitle'));
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <DashboardHome />;
      case 'search':
        return <SearchSection />;
      case 'saved':
        return <SavedDocumentsTable />;
      case 'studio':
        return <SmartDocumentStudio />;
      case 'settings':
        return <SettingsSection />;
      case 'notifications':
        return <NotificationsSection />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </DashboardLayout>
  );
};

export default Dashboard;