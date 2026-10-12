import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdminLoggedIn } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft, Flag, BarChart3, Mail, Star, TrendingUp,
  CheckCircle, Clock, XCircle, AlertTriangle, Plus, Trash2, Save,
  Eye, RefreshCw
} from 'lucide-react';
import {
  getAllReports,
  updateReportStatus,
  getReportAnalytics,
  getAdminAlertEmails,
  setAdminAlertEmails,
  getPendingAdminAlerts,
  type BrokenLinkReport,
  type ReportAnalytics,
} from '@/lib/broken-link-service';

const AdminReports = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('reports');

  // Reports state
  const [reports, setReports] = useState<BrokenLinkReport[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Analytics state
  const [analytics, setAnalytics] = useState<ReportAnalytics | null>(null);

  // Email alerts state
  const [alertEmails, setAlertEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [emailSaved, setEmailSaved] = useState(false);

  // Pending alerts
  const [pendingAlerts, setPendingAlerts] = useState<BrokenLinkReport[]>([]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [fetchedReports, fetchedAnalytics] = await Promise.all([
        getAllReports(),
        Promise.resolve(getReportAnalytics()),
      ]);
      setReports(fetchedReports);
      setAnalytics(fetchedAnalytics);
      setAlertEmails(getAdminAlertEmails());
      setPendingAlerts(getPendingAdminAlerts());
    } catch (err) {
      console.error('Failed to load reports data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const adminLoggedIn = isAdminLoggedIn();
    setIsAuthenticated(adminLoggedIn);
    if (!adminLoggedIn) {
      navigate('/admin');
      return;
    }
    loadData();
  }, [navigate, loadData]);

  const handleStatusChange = async (reportId: string, newStatus: BrokenLinkReport['status']) => {
    const success = await updateReportStatus(reportId, newStatus);
    if (success) {
      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r))
      );
    }
  };

  const handleAddEmail = () => {
    if (!newEmail.trim() || !newEmail.includes('@')) return;
    const updated = [...alertEmails, newEmail.trim()];
    setAlertEmails(updated);
    setAdminAlertEmails(updated);
    setNewEmail('');
    setEmailSaved(true);
    setTimeout(() => setEmailSaved(false), 2000);
  };

  const handleRemoveEmail = (email: string) => {
    const updated = alertEmails.filter((e) => e !== email);
    setAlertEmails(updated);
    setAdminAlertEmails(updated);
  };

  const filteredReports = statusFilter === 'all'
    ? reports
    : reports.filter((r) => r.status === statusFilter);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('bs-BA', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="h-3 w-3 mr-1" />Na čekanju</Badge>;
      case 'reviewed':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Eye className="h-3 w-3 mr-1" />Pregledano</Badge>;
      case 'fixed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Ispravljeno</Badge>;
      case 'dismissed':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100"><XCircle className="h-3 w-3 mr-1" />Odbačeno</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!isAuthenticated) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Flag className="h-12 w-12 text-orange-500 mx-auto animate-pulse mb-4" />
          <p className="text-gray-600">Učitavanje prijava...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003D7A] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Flag className="h-6 w-6 text-orange-300" />
            <div>
              <h1 className="text-xl font-bold">Prijave neispravnih linkova</h1>
              <p className="text-sm text-blue-200">Upravljanje, analitika i email obavještenja</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={loadData}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Osvježi
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={() => navigate('/admin/dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Pending Alerts Banner */}
        {pendingAlerts.length > 0 && (
          <Alert className="mb-6 bg-orange-50 border-orange-200">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>{pendingAlerts.length} nova prijava</strong> od zadnje prijave. Email obavještenje nije uspjelo — pregledajte prijave ispod.
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-white shadow-sm">
            <TabsTrigger value="reports" className="gap-2">
              <Flag className="h-4 w-4" />
              Prijave ({reports.length})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analitika
            </TabsTrigger>
            <TabsTrigger value="emails" className="gap-2">
              <Mail className="h-4 w-4" />
              Email obavještenja
            </TabsTrigger>
          </TabsList>

          {/* REPORTS TAB */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Flag className="h-5 w-5 text-orange-500" />
                      Sve prijave neispravnih linkova
                    </CardTitle>
                    <CardDescription>
                      Pregledajte i upravljajte prijavama korisnika
                    </CardDescription>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter po statusu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Sve prijave</SelectItem>
                      <SelectItem value="pending">Na čekanju</SelectItem>
                      <SelectItem value="reviewed">Pregledano</SelectItem>
                      <SelectItem value="fixed">Ispravljeno</SelectItem>
                      <SelectItem value="dismissed">Odbačeno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {filteredReports.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Datum</TableHead>
                          <TableHead>Općina</TableHead>
                          <TableHead>Obrazac</TableHead>
                          <TableHead>URL</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Prijavio</TableHead>
                          <TableHead>Ocjena</TableHead>
                          <TableHead>Akcija</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredReports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell className="whitespace-nowrap text-sm">
                              {formatDate(report.createdAt)}
                            </TableCell>
                            <TableCell className="font-medium text-sm">
                              {report.municipalityName}
                            </TableCell>
                            <TableCell className="text-sm max-w-[150px] truncate" title={report.formName}>
                              {report.formName || '-'}
                            </TableCell>
                            <TableCell className="text-xs max-w-[200px] truncate">
                              <a
                                href={report.brokenUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {report.brokenUrl}
                              </a>
                            </TableCell>
                            <TableCell>{getStatusBadge(report.status)}</TableCell>
                            <TableCell className="text-sm text-gray-500">
                              {report.reportedBy || 'Anoniman'}
                            </TableCell>
                            <TableCell>
                              {report.userFeedback ? (
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                                  <span className="text-sm">{report.userFeedback.rating}/5</span>
                                </div>
                              ) : (
                                <span className="text-xs text-gray-400">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Select
                                value={report.status}
                                onValueChange={(val) => handleStatusChange(report.id, val as BrokenLinkReport['status'])}
                              >
                                <SelectTrigger className="w-32 h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Na čekanju</SelectItem>
                                  <SelectItem value="reviewed">Pregledano</SelectItem>
                                  <SelectItem value="fixed">Ispravljeno</SelectItem>
                                  <SelectItem value="dismissed">Odbačeno</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
                    <p className="text-gray-500">
                      {statusFilter === 'all'
                        ? 'Nema prijava neispravnih linkova.'
                        : `Nema prijava sa statusom "${statusFilter}".`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ANALYTICS TAB */}
          <TabsContent value="analytics">
            {analytics && (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Ukupno prijava</CardDescription>
                      <CardTitle className="text-3xl flex items-center gap-2">
                        <Flag className="h-6 w-6 text-orange-500" />
                        {analytics.totalReports}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">Od početka praćenja</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Ova sedmica</CardDescription>
                      <CardTitle className="text-3xl flex items-center gap-2">
                        <TrendingUp className="h-6 w-6 text-blue-500" />
                        {analytics.reportsThisWeek}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">Zadnjih 7 dana</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Ovaj mjesec</CardDescription>
                      <CardTitle className="text-3xl flex items-center gap-2">
                        <BarChart3 className="h-6 w-6 text-purple-500" />
                        {analytics.reportsThisMonth}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">Zadnjih 30 dana</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Prosječna ocjena</CardDescription>
                      <CardTitle className="text-3xl flex items-center gap-2">
                        <Star className="h-6 w-6 text-yellow-400" />
                        {analytics.averageFeedbackRating > 0 ? analytics.averageFeedbackRating : '-'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        {analytics.feedbackCount} korisničkih ocjena
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Usage Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Conversion Rate */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Konverzija prijava</CardTitle>
                      <CardDescription>
                        Koliko korisnika koji otvore dijalog zaista pošalju prijavu
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Otvaranja dijaloga</span>
                          <span className="font-bold text-lg">
                            {(analytics as ReportAnalytics & { dialogOpens?: number }).dialogOpens || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Poslane prijave</span>
                          <span className="font-bold text-lg">
                            {(analytics as ReportAnalytics & { submissions?: number }).submissions || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-t pt-3">
                          <span className="text-sm font-medium text-gray-700">Stopa konverzije</span>
                          <Badge className="bg-[#003D7A] text-white">
                            {(analytics as ReportAnalytics & { conversionRate?: number }).conversionRate || 0}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Status Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Distribucija po statusu</CardTitle>
                      <CardDescription>Trenutni status svih prijava</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(analytics.reportsByStatus).map(([status, count]) => (
                          <div key={status} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getStatusBadge(status)}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{count}</span>
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-[#003D7A] h-2 rounded-full"
                                  style={{
                                    width: `${analytics.totalReports > 0 ? (count / analytics.totalReports) * 100 : 0}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        {Object.keys(analytics.reportsByStatus).length === 0 && (
                          <p className="text-center text-gray-400 py-4">Nema podataka</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Top Municipalities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Općine s najviše prijava</CardTitle>
                    <CardDescription>
                      Općine čiji linkovi se najčešće prijavljuju kao neispravni
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {analytics.topMunicipalities.length > 0 ? (
                      <div className="space-y-3">
                        {analytics.topMunicipalities.map((muni, idx) => (
                          <div key={muni.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-bold text-[#003D7A]">#{idx + 1}</span>
                              <span className="font-medium">{muni.name}</span>
                            </div>
                            <Badge variant="outline">{muni.count} prijava</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-400 py-6">Nema dovoljno podataka za prikaz</p>
                    )}
                  </CardContent>
                </Card>

                {/* Daily Reports Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Prijave po danima (zadnjih 30 dana)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analytics.reportsByDay.some((d) => d.count > 0) ? (
                      <div className="flex items-end gap-1 h-32">
                        {analytics.reportsByDay.map((day, i) => {
                          const maxCount = Math.max(...analytics.reportsByDay.map((d) => d.count), 1);
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                              {day.count > 0 && (
                                <span className="text-[9px] text-gray-500">{day.count}</span>
                              )}
                              <div
                                className="w-full bg-orange-400 rounded-t transition-all hover:bg-orange-500"
                                style={{
                                  height: `${day.count > 0 ? (day.count / maxCount) * 100 : 2}%`,
                                  minHeight: '2px',
                                }}
                                title={`${day.date}: ${day.count} prijava`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-center text-gray-400 py-8">Nema prijava u zadnjih 30 dana</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* EMAIL ALERTS TAB */}
          <TabsContent value="emails">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-500" />
                    Email obavještenja za administratore
                  </CardTitle>
                  <CardDescription>
                    Kada korisnik prijavi neispravan link, email obavještenje se šalje na donje adrese.
                    Obavještenje sadrži detalje prijave (općina, URL, opis problema).
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Current emails */}
                  <div className="space-y-2">
                    <Label>Aktivne email adrese za obavještenja:</Label>
                    {alertEmails.length > 0 ? (
                      <div className="space-y-2">
                        {alertEmails.map((email) => (
                          <div key={email} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span className="font-mono text-sm">{email}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleRemoveEmail(email)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic">Nema konfiguriranih email adresa</p>
                    )}
                  </div>

                  {/* Add new email */}
                  <div className="flex gap-2 items-end">
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="new-alert-email">Dodaj novu email adresu</Label>
                      <Input
                        id="new-alert-email"
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="admin@primjer.ba"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddEmail();
                          }
                        }}
                      />
                    </div>
                    <Button onClick={handleAddEmail} className="bg-[#003D7A] hover:bg-[#002A5A]">
                      <Plus className="h-4 w-4 mr-1" />
                      Dodaj
                    </Button>
                  </div>

                  {emailSaved && (
                    <Alert className="bg-green-50 border-green-200">
                      <Save className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Email lista uspješno ažurirana!
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* How it works */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Kako funkcioniše sistem obavještenja</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-orange-600">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Korisnik prijavi neispravan link</p>
                        <p className="text-sm text-gray-500">Putem dugmeta &quot;Prijavi neispravan link&quot; na stranici obrasca</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-blue-600">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Sistem šalje email obavještenje</p>
                        <p className="text-sm text-gray-500">Na sve konfigurirane adrese putem Supabase Edge Function</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-green-600">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Administrator pregleda i rješava prijavu</p>
                        <p className="text-sm text-gray-500">Promijeni status na &quot;Pregledano&quot;, &quot;Ispravljeno&quot; ili &quot;Odbačeno&quot;</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-yellow-600">4</span>
                      </div>
                      <div>
                        <p className="font-medium">Korisnik daje povratnu informaciju</p>
                        <p className="text-sm text-gray-500">Ocjenjuje iskustvo prijavljivanja (1-5 zvjezdica) i ostavlja komentar</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fallback info */}
              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription className="text-blue-800">
                  <strong>Napomena:</strong> Ako Edge Function za slanje emaila nije dostupna, prijave se čuvaju lokalno
                  i prikazuju kao &quot;pending alerts&quot; kada se administrator prijavi na dashboard.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminReports;