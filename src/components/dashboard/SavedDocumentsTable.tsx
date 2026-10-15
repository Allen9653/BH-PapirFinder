import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Download, Trash2, FileText, FolderOpen } from 'lucide-react';
import { supabase, getCurrentUser } from '@/lib/supabaseClient';
import { trackGA4Event } from '@/lib/ga4-tracking';
import { useLanguage } from '@/contexts/LanguageContext';

interface SavedDocument {
  id: string;
  name: string;
  municipality: string;
  category: string;
  file_url: string;
  notes: string;
  saved_at: string;
}

/** Mapiranje aplikacijskog jezika na BCP-47 locale za formatiranje datuma. */
const DATE_LOCALES: Record<string, string> = {
  bs: 'bs-BA',
  'bs-Cyrl': 'bs-BA',
  en: 'en-GB',
  de: 'de-DE',
  tr: 'tr-TR',
};

const SavedDocumentsTable = () => {
  const { language, t } = useLanguage();
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const dateLocale = DATE_LOCALES[language] ?? 'bs-BA';

  useEffect(() => {
    loadSavedDocuments();
  }, []);

  const loadSavedDocuments = async () => {
    setLoading(true);
    try {
      const { user } = await getCurrentUser();
      if (!user) {
        const local = JSON.parse(localStorage.getItem('bh_papirfinder_saved_docs') || '[]');
        setDocuments(local);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('saved_documents')
        .select('*')
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false });

      if (error || !data) {
        const local = JSON.parse(localStorage.getItem('bh_papirfinder_saved_docs') || '[]');
        setDocuments(local);
      } else {
        setDocuments(data);
      }
    } catch {
      const local = JSON.parse(localStorage.getItem('bh_papirfinder_saved_docs') || '[]');
      setDocuments(local);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const { user } = await getCurrentUser();
      if (user) {
        await supabase.from('saved_documents').delete().eq('id', id);
      }
      const updated = documents.filter(d => d.id !== id);
      setDocuments(updated);
      localStorage.setItem('bh_papirfinder_saved_docs', JSON.stringify(updated));
    } catch {
      // silent
    }
  };

  const ALLOWED_HOSTS: string[] = []; // ACTION REQUIRED: Add your allowed hosts before merging

  function isSafeExternalUrl(url: string | null | undefined, allowedHosts: string[]): boolean {
    if (!url) return false;
    try {
      const parsed = new URL(String(url).replace(/[\t\n\r]/g, ''));
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
      return allowedHosts.some(function (h) {
        return parsed.hostname === h || parsed.hostname.endsWith('.' + h);
      });
    } catch (e) { return false; }
  }

  const handleDownload = (doc: SavedDocument) => {
    trackGA4Event('file_download', { file_name: doc.name, municipality: doc.municipality });
    if (isSafeExternalUrl(doc.file_url, ALLOWED_HOSTS)) {
      window.open(doc.file_url, '_blank', 'noopener,noreferrer');
    }
  };

  const filteredDocs = documents.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.municipality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-[#003D7A] flex-shrink-0" />
            <span className="break-words">{t('dashboard.myDigitalArchive')}</span>
          </CardTitle>
          <div className="relative w-full sm:w-64 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('dashboard.searchSaved')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003D7A]" />
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-2 break-words">{t('dashboard.noSavedDocs')}</p>
            <p className="text-sm text-gray-400 break-words">
              {t('dashboard.noSavedDocsHint')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="break-words">{t('dashboard.document')}</TableHead>
                  <TableHead className="hidden md:table-cell break-words">{t('dashboard.municipality')}</TableHead>
                  <TableHead className="hidden md:table-cell break-words">{t('dashboard.category')}</TableHead>
                  <TableHead className="hidden sm:table-cell break-words">{t('dashboard.date')}</TableHead>
                  <TableHead className="text-right break-words">{t('dashboard.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocs.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#003D7A] flex-shrink-0" />
                        <span className="font-medium text-sm line-clamp-2">{doc.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm text-gray-600 break-words">{doc.municipality}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="secondary" className="text-xs whitespace-normal text-left break-words">
                        {doc.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="text-xs text-gray-500">
                        {new Date(doc.saved_at).toLocaleDateString(dateLocale)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => window.open(doc.file_url, '_blank', 'noopener,noreferrer')}
                          title={t('dashboard.preview')}
                          aria-label={t('dashboard.preview')}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#00A651]"
                          onClick={() => handleDownload(doc)}
                          title={t('dashboard.download')}
                          aria-label={t('dashboard.download')}
                        >
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => handleDelete(doc.id)}
                          title={t('dashboard.deleteDoc')}
                          aria-label={t('dashboard.deleteDoc')}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedDocumentsTable;