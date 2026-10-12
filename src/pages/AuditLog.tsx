import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Download, Trash2, Home, Filter } from 'lucide-react';
import { isAdminLoggedIn } from '@/lib/auth';
import { getAuditLog, clearAuditLog, exportAuditLog, filterAuditLogByCategory, type AuditLogEntry } from '@/lib/audit';

const AuditLog = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLogEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }
    loadLogs();
  }, [navigate]);

  const loadLogs = () => {
    const allLogs = getAuditLog();
    setLogs(allLogs);
    setFilteredLogs(allLogs);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredLogs(logs);
    } else {
      setFilteredLogs(filterAuditLogByCategory(category as AuditLogEntry['category']));
    }
  };

  const handleExport = () => {
    const json = exportAuditLog();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Da li ste sigurni da želite obrisati sve audit logove?')) {
      clearAuditLog();
      loadLogs();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sponsor': return 'bg-blue-100 text-blue-800';
      case 'subscription': return 'bg-green-100 text-green-800';
      case 'deployment': return 'bg-purple-100 text-purple-800';
      case 'security': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('bs-BA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#003D7A] flex items-center gap-2">
            <Shield className="h-8 w-8" />
            {t('auditLog')}
          </h1>
          <p className="text-gray-600 mt-2">Pregled svih admin akcija i sistemskih događaja</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin')}>
            <Home className="h-4 w-4 mr-2" />
            Admin Panel
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            <Home className="h-4 w-4 mr-2" />
            {t('home')}
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filteri i akcije</CardTitle>
          <CardDescription>
            Ukupno logova: {filteredLogs.length} / {logs.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Sve kategorije</SelectItem>
                  <SelectItem value="sponsor">Sponzori</SelectItem>
                  <SelectItem value="subscription">Pretplate</SelectItem>
                  <SelectItem value="deployment">Deployment</SelectItem>
                  <SelectItem value="security">Sigurnost</SelectItem>
                  <SelectItem value="other">Ostalo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Izvezi JSON
            </Button>

            <Button onClick={handleClear} variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Obriši sve
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filteredLogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              Nema audit logova za prikaz
            </CardContent>
          </Card>
        ) : (
          filteredLogs.map((log) => (
            <Card key={log.id} className="hover:shadow-md transition-shadow">
              <CardContent className="py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={getCategoryColor(log.category)}>
                        {log.category}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {formatDate(log.timestamp)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {log.adminEmail}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{log.action}</h4>
                    <p className="text-sm text-gray-600">{log.details}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AuditLog;