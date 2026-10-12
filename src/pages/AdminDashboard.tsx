import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdminLoggedIn, logoutAdmin, getAdminEmail } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Shield, LogOut, Users, Search, TrendingUp,
  Activity, BarChart3, ArrowLeft, RefreshCw, Loader2, Wifi, WifiOff, Database, Trash2,
  Settings, FileText, CreditCard, Eye, Globe, Lock, ClipboardList, Flag
} from 'lucide-react';
import {
  getTotalSearchCount,
  getTopSearches,
  getDailySearchStats,
  getRecentSearchActivity,
  getUniqueSearchUserCount,
  getInstitutionCount,
  clearSearchHistory,
  type SearchLog,
} from '@/lib/supabaseClient';
import {
  getMockOverview,
  getMockDailyStats,
  getMockTopSearches,
} from '@/lib/mock-analytics';

interface DashboardOverview {
  totalSearches: number;
  uniqueUsers: number;
  institutionCount: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'online' | 'offline' | 'mock'>('connecting');
  const [activeTab, setActiveTab] = useState('overview');

  const [overview, setOverview] = useState<DashboardOverview>({
    totalSearches: 0, uniqueUsers: 0, institutionCount: 0,
  });
  const [dailyStats, setDailyStats] = useState<{ date: string; searches: number }[]>([]);
  const [topSearches, setTopSearches] = useState<{ query: string; count: number; last_searched: string }[]>([]);
  const [recentActivity, setRecentActivity] = useState<SearchLog[]>([]);
  const [searchFilter, setSearchFilter] = useState('');

  const loadRealData = useCallback(async () => {
    try {
      setConnectionStatus('connecting');

      const [totalSearches, uniqueUsers, institutionCount, daily, top, recent] = await Promise.all([
        getTotalSearchCount(),
        getUniqueSearchUserCount(),
        getInstitutionCount(),
        getDailySearchStats(14),
        getTopSearches(15),
        getRecentSearchActivity(30),
      ]);

      const hasRealData = totalSearches > 0 || daily.length > 0 || top.length > 0;

      if (hasRealData) {
        setOverview({ totalSearches, uniqueUsers, institutionCount });
        setDailyStats(daily);
        setTopSearches(top);
        setRecentActivity(recent);
        setConnectionStatus('online');
      } else {
        const mockOverview = getMockOverview();
        setOverview({
          totalSearches: mockOverview.totalSearches,
          uniqueUsers: mockOverview.totalUsers,
          institutionCount: 0,
        });
        setDailyStats(getMockDailyStats().map(d => ({ date: d.date, searches: d.searches })));
        setTopSearches(getMockTopSearches().map(s => ({ query: s.query, count: s.count, last_searched: s.lastSearched })));
        setRecentActivity([]);
        setConnectionStatus('mock');
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      const mockOverview = getMockOverview();
      setOverview({
        totalSearches: mockOverview.totalSearches,
        uniqueUsers: mockOverview.totalUsers,
        institutionCount: 0,
      });
      setDailyStats(getMockDailyStats().map(d => ({ date: d.date, searches: d.searches })));
      setTopSearches(getMockTopSearches().map(s => ({ query: s.query, count: s.count, last_searched: s.lastSearched })));
      setRecentActivity([]);
      setConnectionStatus('offline');
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const adminLoggedIn = isAdminLoggedIn();
        setIsAuthenticated(adminLoggedIn);

        if (!adminLoggedIn) {
          setIsLoading(false);
          navigate('/admin');
          return;
        }

        await loadRealData();
      } catch (error) {
        console.error('Admin auth check failed:', error);
        setConnectionStatus('offline');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, loadRealData]);

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/');
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await loadRealData();
    setIsLoading(false);
  };

  const handleClearSearchHistory = async () => {
    if (!window.confirm('Da li ste sigurni da želite obrisati SVU historiju pretrage?')) return;
    const result = await clearSearchHistory();
    alert(result.message);
    if (result.success) {
      await loadRealData();
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleTimeString('bs-BA', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  const filteredTopSearches = searchFilter
    ? topSearches.filter(s => s.query.toLowerCase().includes(searchFilter.toLowerCase()))
    : topSearches;

  const maxSearches = dailyStats.length > 0 ? Math.max(...dailyStats.map(d => d.searches), 1) : 1;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-6">
          <Shield className="h-16 w-16 text-[#003D7A] mx-auto animate-pulse" />
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Povezivanje sa bazom podataka...
            </h2>
            <p className="text-gray-400">Molimo sačekajte.</p>
          </div>
          <Loader2 className="h-8 w-8 text-[#00A651] mx-auto animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003D7A] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6" />
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-blue-200">BH PapirFinder — {getAdminEmail()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {connectionStatus === 'online' && (
              <Badge className="bg-green-500 text-white hover:bg-green-500">
                <Wifi className="h-3 w-3 mr-1" />
                Supabase Online
              </Badge>
            )}
            {connectionStatus === 'mock' && (
              <Badge className="bg-yellow-500 text-black hover:bg-yellow-500">
                <WifiOff className="h-3 w-3 mr-1" />
                Mock Data
              </Badge>
            )}
            {connectionStatus === 'offline' && (
              <Badge className="bg-red-500 text-white hover:bg-red-500">
                <WifiOff className="h-3 w-3 mr-1" />
                Offline
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Osvježi
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Početna
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Odjava
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Admin Status Banner */}
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertDescription className="text-green-800 flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <strong>Admin nalog aktivan:</strong> {getAdminEmail()} — Pun pristup svim funkcijama besplatno.
          </AlertDescription>
        </Alert>

        {connectionStatus === 'mock' && (
          <Alert className="mb-6 bg-yellow-50 border-yellow-200">
            <AlertDescription className="text-yellow-800">
              <strong>⚠️ Mock Mode:</strong> Nema podataka u search_logs tabeli.
              Kada korisnici počnu pretraživati, podaci će se automatski pojaviti ovdje.
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-white shadow-sm flex-wrap">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Pregled
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Activity className="h-4 w-4" />
              Aktivnost
            </TabsTrigger>
            <TabsTrigger value="searches" className="gap-2">
              <Search className="h-4 w-4" />
              Pretrage
            </TabsTrigger>
            <TabsTrigger value="operations" className="gap-2">
              <Settings className="h-4 w-4" />
              Operacije
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Korisnici
            </TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Ukupno pretraga</CardDescription>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <Search className="h-6 w-6 text-purple-500" />
                    {overview.totalSearches.toLocaleString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Database className="h-3 w-3" />
                    {connectionStatus === 'online' ? 'Iz Supabase search_logs' : 'Mock podaci'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Jedinstveni korisnici</CardDescription>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <Users className="h-6 w-6 text-[#003D7A]" />
                    {overview.uniqueUsers}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Korisnici koji su pretraživali</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Institucije u bazi</CardDescription>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-[#00A651]" />
                    {overview.institutionCount}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">app_7cd5641924_institutions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Admin status</CardDescription>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Shield className="h-6 w-6 text-green-600" />
                    Aktivan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Sve funkcije besplatno</p>
                </CardContent>
              </Card>
            </div>

            {/* Daily Search Chart */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Dnevne pretrage (zadnjih 14 dana)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dailyStats.length > 0 ? (
                  <div className="flex items-end gap-2 h-48">
                    {dailyStats.map((day, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs text-gray-500">{day.searches}</span>
                        <div
                          className="w-full bg-[#003D7A] rounded-t transition-all hover:bg-[#00A651]"
                          style={{ height: `${(day.searches / maxSearches) * 100}%`, minHeight: '4px' }}
                          title={`${day.date}: ${day.searches} pretraga`}
                        />
                        <span className="text-[10px] text-gray-400 -rotate-45 origin-top-left whitespace-nowrap">
                          {day.date.slice(5)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400 py-8">Nema podataka za prikaz</p>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Nedavne pretrage
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('activity')}>
                    Pogledaj sve
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivity.slice(0, 5).map((entry, idx) => (
                      <div key={entry.id || idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-blue-100 text-blue-800">
                            Pretraga
                          </Badge>
                          <div>
                            <p className="text-sm font-medium">&quot;{entry.query}&quot;</p>
                            <p className="text-xs text-gray-500">{entry.results_count} rezultata</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">
                          {entry.created_at ? formatTime(entry.created_at) : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400 py-4">Nema nedavnih pretraga</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ACTIVITY TAB */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Sve pretrage ({recentActivity.length})
                  </CardTitle>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleClearSearchHistory}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Obriši historiju
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vrijeme</TableHead>
                        <TableHead>Upit</TableHead>
                        <TableHead className="text-right">Rezultati</TableHead>
                        <TableHead>Korisnik ID</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentActivity.map((entry, idx) => (
                        <TableRow key={entry.id || idx}>
                          <TableCell className="whitespace-nowrap">
                            <div>
                              <p className="text-sm">{entry.created_at ? formatDate(entry.created_at) : '-'}</p>
                              <p className="text-xs text-gray-400">{entry.created_at ? formatTime(entry.created_at) : ''}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{entry.query}</TableCell>
                          <TableCell className="text-right">{entry.results_count}</TableCell>
                          <TableCell className="text-xs text-gray-400 font-mono">
                            {entry.user_id ? entry.user_id.slice(0, 8) + '...' : 'Anoniman'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-gray-400 py-8">
                    Nema zabilježenih pretraga. Kada korisnici počnu pretraživati, podaci će se pojaviti ovdje.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEARCHES TAB */}
          <TabsContent value="searches">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Top pretrage
                    </CardTitle>
                    <CardDescription>
                      Najpopularnije pretrage korisnika
                    </CardDescription>
                  </div>
                  <Input
                    placeholder="Filtriraj pretrage..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-64"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {filteredTopSearches.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Upit</TableHead>
                        <TableHead className="text-right">Broj pretraga</TableHead>
                        <TableHead>Zadnja pretraga</TableHead>
                        <TableHead>Popularnost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTopSearches.map((search, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-bold text-[#003D7A]">{index + 1}</TableCell>
                          <TableCell className="font-medium">{search.query}</TableCell>
                          <TableCell className="text-right">{search.count}</TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {formatDate(search.last_searched)} {formatTime(search.last_searched)}
                          </TableCell>
                          <TableCell>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-[#003D7A] h-2.5 rounded-full transition-all"
                                style={{ width: `${filteredTopSearches[0]?.count ? (search.count / filteredTopSearches[0].count) * 100 : 0}%` }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-gray-400 py-8">
                    {searchFilter ? 'Nema rezultata za ovaj filter' : 'Nema zabilježenih pretraga'}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* OPERATIONS TAB */}
          <TabsContent value="operations">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Sistemski status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Supabase baza podataka</span>
                    <Badge className={connectionStatus === 'online' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}>
                      {connectionStatus === 'online' ? 'Online' : connectionStatus === 'mock' ? 'Mock' : 'Offline'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">PayPal integracija</span>
                    <Badge className="bg-green-500 text-white">Konfigurisano</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">PWA Service Worker</span>
                    <Badge className="bg-green-500 text-white">Aktivan</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Višejezična podrška</span>
                    <Badge className="bg-blue-500 text-white">5 jezika</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Domain detekcija</span>
                    <Badge className="bg-green-500 text-white">Aktivna</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Brze akcije
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => navigate('/admin/reports')}
                  >
                    <Flag className="h-4 w-4" />
                    Prijave neispravnih linkova
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => navigate('/audit-log')}
                  >
                    <ClipboardList className="h-4 w-4" />
                    Pregled audit logova
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => navigate('/subscription')}
                  >
                    <CreditCard className="h-4 w-4" />
                    Upravljanje pretplatama
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => navigate('/search')}
                  >
                    <Eye className="h-4 w-4" />
                    Pregled pretrage (korisničko iskustvo)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => navigate('/guide')}
                  >
                    <FileText className="h-4 w-4" />
                    Korisničko uputstvo
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={handleRefresh}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Osvježi sve podatke
                  </Button>
                </CardContent>
              </Card>

              {/* Admin Privileges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Admin privilegije
                  </CardTitle>
                  <CardDescription>
                    Vaš nalog ima pun pristup svim funkcijama
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Pregled svih korisničkih pretraga
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Pristup svim URL-ovima obrazaca (besplatno)
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Upravljanje sponzorima
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Brisanje historije pretrage
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Pregled audit logova
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Upravljanje pretplatama i korisnicima
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Deployment na sve platforme
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Pregled sistemskog statusa
                  </div>
                </CardContent>
              </Card>

              {/* Deployment Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Deployment informacije
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Web</span>
                    <span className="text-sm font-mono text-[#003D7A]">www.bh-assistant.ba</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Google Play</span>
                    <span className="text-sm font-mono text-[#003D7A]">ba.bh_assistant.papirfinder</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Apple App Store</span>
                    <Badge variant="outline">Uskoro</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Supabase projekt</span>
                    <span className="text-sm font-mono text-gray-500">zdvqjjmpxifbltihffas</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* USERS TAB */}
          <TabsContent value="users">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Pregled korisnika
                  </CardTitle>
                  <CardDescription>
                    Korisnici koji su registrovani i koristili BH PapirFinder
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <p className="text-3xl font-bold text-[#003D7A]">{overview.uniqueUsers}</p>
                      <p className="text-sm text-gray-600">Aktivni korisnici</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <p className="text-3xl font-bold text-green-700">1</p>
                      <p className="text-sm text-gray-600">Admin nalozi</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg text-center">
                      <p className="text-3xl font-bold text-purple-700">{overview.totalSearches}</p>
                      <p className="text-sm text-gray-600">Ukupno pretraga</p>
                    </div>
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertDescription className="text-blue-800">
                      <strong>Admin nalog:</strong> alenjusufovic@yahoo.com — Pun pristup, sve funkcije besplatno, uvid u sve operacije.
                    </AlertDescription>
                  </Alert>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Korisničke aktivnosti (iz search_logs)</h3>
                    {recentActivity.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Korisnik ID</TableHead>
                            <TableHead>Zadnja pretraga</TableHead>
                            <TableHead>Upit</TableHead>
                            <TableHead className="text-right">Rezultati</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentActivity.slice(0, 20).map((entry, idx) => (
                            <TableRow key={entry.id || idx}>
                              <TableCell className="font-mono text-xs">
                                {entry.user_id ? entry.user_id.slice(0, 12) + '...' : 'Anoniman'}
                              </TableCell>
                              <TableCell className="text-sm">
                                {entry.created_at ? `${formatDate(entry.created_at)} ${formatTime(entry.created_at)}` : '-'}
                              </TableCell>
                              <TableCell className="font-medium">{entry.query}</TableCell>
                              <TableCell className="text-right">{entry.results_count}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-center text-gray-400 py-8">
                        Nema korisničkih aktivnosti za prikaz. Podaci će se pojaviti kada korisnici počnu pretraživati.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Subscription Plans Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Planovi pretplate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-bold text-lg">10 BAM</h4>
                      <p className="text-sm text-gray-600">5 dana pristupa</p>
                      <Badge variant="outline" className="mt-2">Osnovna</Badge>
                    </div>
                    <div className="p-4 border rounded-lg border-[#003D7A]">
                      <h4 className="font-bold text-lg text-[#003D7A]">50 BAM</h4>
                      <p className="text-sm text-gray-600">30 dana pristupa</p>
                      <Badge className="mt-2 bg-[#003D7A]">Popularna</Badge>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-bold text-lg">60 BAM</h4>
                      <p className="text-sm text-gray-600">12 mjeseci pristupa</p>
                      <Badge variant="outline" className="mt-2">Godišnja</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;