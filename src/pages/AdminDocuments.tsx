import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  FileText,
  Building2,
  Languages,
  Save,
  X,
  Search,
  Database,
  AlertCircle,
  Bot,
  Loader2,
  CheckCircle2,
  BarChart3,
} from 'lucide-react';
import {
  getAllInstitucije,
  createInstitucija,
  deleteInstitucija,
  Institucija,
} from '@/lib/institucije-service';
import {
  getAllDokumenti,
  createDokument,
  updateDokument,
  deleteDokument,
  getPrevodiForDokument,
  upsertPrevod,
  deletePrevod,
  DokumentWithInstitucija,
  DokumentPrevod,
} from '@/lib/dokumenti-service';
import {
  runBatchTranslation,
  getTranslationCoverage,
  TranslationProgress,
  BatchTranslationResult,
} from '@/lib/ai-translation-service';
import Footer from '@/components/Footer';

type ViewMode = 'list' | 'add-doc' | 'edit-doc' | 'add-inst' | 'translations' | 'batch-translate';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'bs_cyr', label: 'Ћирилица' },
];

const AdminDocuments = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Data state
  const [institucije, setInstitucije] = useState<Institucija[]>([]);
  const [dokumenti, setDokumenti] = useState<DokumentWithInstitucija[]>([]);
  const [translations, setTranslations] = useState<DokumentPrevod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // UI state
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedDoc, setSelectedDoc] = useState<DokumentWithInstitucija | null>(null);
  const [saving, setSaving] = useState(false);

  // Batch translation state
  const [batchProgress, setBatchProgress] = useState<TranslationProgress | null>(null);
  const [batchResult, setBatchResult] = useState<BatchTranslationResult | null>(null);
  const [coverageStats, setCoverageStats] = useState<{
    totalDocuments: number;
    fullyTranslated: number;
    partiallyTranslated: number;
    untranslated: number;
    coveragePercent: number;
  } | null>(null);

  // Form state for new/edit document
  const [docForm, setDocForm] = useState({
    institucija_id: '',
    naziv_original: '',
    opis_original: '',
    kategorija: '',
    file_url: '',
    velicina_kb: '',
  });

  // Form state for new institution
  const [instForm, setInstForm] = useState({
    naziv: '',
    slug: '',
    kanton: '',
    kanton_kratko: '',
    entitet: 'Federacija BiH',
    official_url: '',
  });

  // Translation form state
  const [prevodForms, setPrevodForms] = useState<Record<string, { naziv: string; opis: string }>>({});

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [instData, docData] = await Promise.all([
        getAllInstitucije(),
        getAllDokumenti(),
      ]);
      setInstitucije(instData);
      setDokumenti(docData);
    } catch (err) {
      setError('Greška pri učitavanju podataka. Provjerite da su tabele kreirane u Supabase.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter documents
  const filteredDokumenti = dokumenti.filter((doc) => {
    if (!searchQuery.trim()) return true;
    const term = searchQuery.toLowerCase();
    return (
      doc.naziv_original.toLowerCase().includes(term) ||
      doc.kategorija?.toLowerCase().includes(term) ||
      doc.institucije?.naziv.toLowerCase().includes(term)
    );
  });

  // ============================================================
  // Document CRUD handlers
  // ============================================================

  const handleAddDocument = () => {
    setDocForm({
      institucija_id: institucije[0]?.id || '',
      naziv_original: '',
      opis_original: '',
      kategorija: '',
      file_url: '',
      velicina_kb: '',
    });
    setSelectedDoc(null);
    setViewMode('add-doc');
  };

  const handleEditDocument = (doc: DokumentWithInstitucija) => {
    setDocForm({
      institucija_id: doc.institucija_id,
      naziv_original: doc.naziv_original,
      opis_original: doc.opis_original || '',
      kategorija: doc.kategorija || '',
      file_url: doc.file_url,
      velicina_kb: doc.velicina_kb?.toString() || '',
    });
    setSelectedDoc(doc);
    setViewMode('edit-doc');
  };

  const handleSaveDocument = async () => {
    setSaving(true);
    setError(null);

    const payload = {
      institucija_id: docForm.institucija_id,
      naziv_original: docForm.naziv_original.trim(),
      opis_original: docForm.opis_original.trim() || undefined,
      kategorija: docForm.kategorija.trim() || undefined,
      file_url: docForm.file_url.trim(),
      velicina_kb: docForm.velicina_kb ? parseInt(docForm.velicina_kb) : undefined,
    };

    if (!payload.naziv_original || !payload.file_url || !payload.institucija_id) {
      setError('Naziv, URL fajla i institucija su obavezna polja.');
      setSaving(false);
      return;
    }

    if (selectedDoc) {
      // Update
      const { error: updateError } = await updateDokument(selectedDoc.id, {
        naziv_original: payload.naziv_original,
        opis_original: payload.opis_original,
        kategorija: payload.kategorija,
        file_url: payload.file_url,
        velicina_kb: payload.velicina_kb,
      });
      if (updateError) {
        setError(updateError);
        setSaving(false);
        return;
      }
    } else {
      // Create
      const { error: createError } = await createDokument(payload);
      if (createError) {
        setError(createError);
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    setViewMode('list');
    await loadData();
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm(language === 'en' ? 'Delete this document?' : 'Obrisati ovaj dokument?')) return;

    const { error: delError } = await deleteDokument(id);
    if (delError) {
      setError(delError);
      return;
    }
    await loadData();
  };

  // ============================================================
  // Institution CRUD handlers
  // ============================================================

  const handleAddInstitution = () => {
    setInstForm({
      naziv: '',
      slug: '',
      kanton: '',
      kanton_kratko: '',
      entitet: 'Federacija BiH',
      official_url: '',
    });
    setViewMode('add-inst');
  };

  const handleSaveInstitution = async () => {
    setSaving(true);
    setError(null);

    if (!instForm.naziv.trim() || !instForm.slug.trim()) {
      setError('Naziv i slug su obavezna polja.');
      setSaving(false);
      return;
    }

    const { error: createError } = await createInstitucija({
      naziv: instForm.naziv.trim(),
      slug: instForm.slug.trim().toLowerCase(),
      kanton: instForm.kanton.trim() || undefined,
      kanton_kratko: instForm.kanton_kratko.trim() || undefined,
      entitet: instForm.entitet.trim() || undefined,
      official_url: instForm.official_url.trim() || undefined,
    });

    if (createError) {
      setError(createError);
      setSaving(false);
      return;
    }

    setSaving(false);
    setViewMode('list');
    await loadData();
  };

  const handleDeleteInstitution = async (id: string) => {
    if (!confirm(language === 'en'
      ? 'Delete this institution? All its documents will also be deleted.'
      : 'Obrisati ovu instituciju? Svi njeni dokumenti će također biti obrisani.')) return;

    const { error: delError } = await deleteInstitucija(id);
    if (delError) {
      setError(delError);
      return;
    }
    await loadData();
  };

  // ============================================================
  // Translation handlers
  // ============================================================

  const handleManageTranslations = async (doc: DokumentWithInstitucija) => {
    setSelectedDoc(doc);
    const prevodi = await getPrevodiForDokument(doc.id);
    setTranslations(prevodi);

    // Initialize form state
    const forms: Record<string, { naziv: string; opis: string }> = {};
    for (const lang of LANGUAGES) {
      const existing = prevodi.find((p) => p.jezik === lang.code);
      forms[lang.code] = {
        naziv: existing?.naziv_preveden || '',
        opis: existing?.opis_preveden || '',
      };
    }
    setPrevodForms(forms);
    setViewMode('translations');
  };

  const handleSaveTranslations = async () => {
    if (!selectedDoc) return;
    setSaving(true);
    setError(null);

    for (const lang of LANGUAGES) {
      const form = prevodForms[lang.code];
      if (form.naziv.trim()) {
        const { error: upsertError } = await upsertPrevod({
          dokument_id: selectedDoc.id,
          jezik: lang.code,
          naziv_preveden: form.naziv.trim(),
          opis_preveden: form.opis.trim() || undefined,
        });
        if (upsertError) {
          setError(`Greška za ${lang.label}: ${upsertError}`);
          setSaving(false);
          return;
        }
      } else {
        // If name is empty, remove translation if it existed
        const existing = translations.find((t) => t.jezik === lang.code);
        if (existing) {
          await deletePrevod(existing.id);
        }
      }
    }

    setSaving(false);
    setViewMode('list');
  };

  // ============================================================
  // Batch Translation handlers
  // ============================================================

  const handleOpenBatchTranslate = async () => {
    setBatchProgress(null);
    setBatchResult(null);
    setCoverageStats(null);
    setViewMode('batch-translate');

    // Load coverage stats
    const stats = await getTranslationCoverage();
    setCoverageStats(stats);
  };

  const handleStartBatchTranslation = useCallback(async () => {
    setBatchResult(null);
    setBatchProgress({
      total: 0,
      completed: 0,
      failed: 0,
      currentDocument: '',
      status: 'running',
      errors: [],
    });

    const result = await runBatchTranslation((progress) => {
      setBatchProgress({ ...progress });
    });

    setBatchResult(result);
    setBatchProgress(null);

    // Refresh coverage stats
    const stats = await getTranslationCoverage();
    setCoverageStats(stats);
  }, []);

  // ============================================================
  // Render
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Database className="h-12 w-12 text-[#003D7A] mx-auto mb-3 animate-pulse" />
          <p className="text-gray-600">Učitavanje...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003D7A] to-[#00A651] text-white py-6">
        <div className="container px-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-3"
            onClick={() => navigate('/admin/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Back to Dashboard' : 'Nazad na Dashboard'}
          </Button>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Database className="h-7 w-7" />
            {language === 'en' ? 'Document Management' : 'Upravljanje dokumentima'}
          </h1>
          <p className="text-white/80 mt-1">
            {language === 'en'
              ? `${dokumenti.length} documents across ${institucije.length} institutions`
              : `${dokumenti.length} dokumenata u ${institucije.length} institucija`}
          </p>
        </div>
      </div>

      <div className="container px-4 py-6 flex-1">
        {/* Error display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-medium">Greška</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={() => setError(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* LIST VIEW */}
        {viewMode === 'list' && (
          <>
            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button
                className="bg-[#003D7A] hover:bg-[#002A5A]"
                onClick={handleAddDocument}
              >
                <Plus className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Add Document' : 'Dodaj dokument'}
              </Button>
              <Button variant="outline" onClick={handleAddInstitution}>
                <Building2 className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Add Institution' : 'Dodaj instituciju'}
              </Button>
              <Button
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
                onClick={handleOpenBatchTranslate}
              >
                <Bot className="h-4 w-4 mr-2" />
                {language === 'en' ? 'AI Batch Translate' : 'AI Batch prevod'}
              </Button>
            </div>

            {/* Institutions overview */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {language === 'en' ? 'Institutions' : 'Institucije'} ({institucije.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {institucije.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    {language === 'en'
                      ? 'No institutions found. Create the tables first using the SQL migration.'
                      : 'Nema institucija. Prvo kreirajte tabele koristeći SQL migraciju.'}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {institucije.map((inst) => (
                      <div key={inst.id} className="flex items-center gap-1">
                        <Badge variant="outline" className="py-1.5">
                          {inst.naziv} ({inst.kanton_kratko || inst.entitet || ''})
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteInstitution(inst.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={language === 'en' ? 'Search documents...' : 'Pretraži dokumente...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Documents list */}
            <div className="space-y-3">
              {filteredDokumenti.length === 0 ? (
                <Card className="text-center py-8">
                  <CardContent>
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">
                      {dokumenti.length === 0
                        ? (language === 'en'
                          ? 'No documents yet. Add your first document above.'
                          : 'Nema dokumenata. Dodajte prvi dokument iznad.')
                        : (language === 'en' ? 'No matching documents.' : 'Nema rezultata.')}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredDokumenti.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="py-4 px-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 text-sm">
                            {doc.naziv_original}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {doc.kategorija && (
                              <Badge variant="outline" className="text-xs">
                                {doc.kategorija}
                              </Badge>
                            )}
                            {doc.institucije && (
                              <Badge variant="secondary" className="text-xs">
                                <Building2 className="h-3 w-3 mr-1" />
                                {doc.institucije.naziv}
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500">
                              {doc.velicina_kb ? `${doc.velicina_kb} KB` : ''}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleManageTranslations(doc)}
                            title={language === 'en' ? 'Translations' : 'Prevodi'}
                          >
                            <Languages className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditDocument(doc)}
                            title={language === 'en' ? 'Edit' : 'Uredi'}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteDocument(doc.id)}
                            title={language === 'en' ? 'Delete' : 'Obriši'}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </>
        )}

        {/* ADD/EDIT DOCUMENT VIEW */}
        {(viewMode === 'add-doc' || viewMode === 'edit-doc') && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {viewMode === 'add-doc'
                  ? (language === 'en' ? 'Add Document' : 'Dodaj dokument')
                  : (language === 'en' ? 'Edit Document' : 'Uredi dokument')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Institution select */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  {language === 'en' ? 'Institution *' : 'Institucija *'}
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={docForm.institucija_id}
                  onChange={(e) => setDocForm({ ...docForm, institucija_id: e.target.value })}
                >
                  <option value="">-- {language === 'en' ? 'Select' : 'Odaberi'} --</option>
                  {institucije.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.naziv} ({inst.kanton_kratko || ''})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  {language === 'en' ? 'Name (original) *' : 'Naziv (original) *'}
                </label>
                <Input
                  value={docForm.naziv_original}
                  onChange={(e) => setDocForm({ ...docForm, naziv_original: e.target.value })}
                  placeholder="npr. Zahtjev za izdavanje uvjerenja o državljanstvu"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  {language === 'en' ? 'Description' : 'Opis'}
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm min-h-[80px]"
                  value={docForm.opis_original}
                  onChange={(e) => setDocForm({ ...docForm, opis_original: e.target.value })}
                  placeholder={language === 'en' ? 'Optional description...' : 'Opcionalni opis...'}
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  {language === 'en' ? 'Category' : 'Kategorija'}
                </label>
                <Input
                  value={docForm.kategorija}
                  onChange={(e) => setDocForm({ ...docForm, kategorija: e.target.value })}
                  placeholder="npr. Matični ured, Urbanizam, Poreska"
                />
              </div>

              {/* File URL */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  {language === 'en' ? 'File URL *' : 'URL fajla *'}
                </label>
                <Input
                  value={docForm.file_url}
                  onChange={(e) => setDocForm({ ...docForm, file_url: e.target.value })}
                  placeholder="https://example.gov.ba/forms/document.pdf"
                />
              </div>

              {/* Size */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  {language === 'en' ? 'File size (KB)' : 'Veličina fajla (KB)'}
                </label>
                <Input
                  type="number"
                  value={docForm.velicina_kb}
                  onChange={(e) => setDocForm({ ...docForm, velicina_kb: e.target.value })}
                  placeholder="150"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  className="bg-[#003D7A] hover:bg-[#002A5A]"
                  onClick={handleSaveDocument}
                  disabled={saving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving
                    ? (language === 'en' ? 'Saving...' : 'Čuvanje...')
                    : (language === 'en' ? 'Save' : 'Sačuvaj')}
                </Button>
                <Button variant="outline" onClick={() => setViewMode('list')}>
                  <X className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Cancel' : 'Otkaži'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ADD INSTITUTION VIEW */}
        {viewMode === 'add-inst' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {language === 'en' ? 'Add Institution' : 'Dodaj instituciju'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  {language === 'en' ? 'Name *' : 'Naziv *'}
                </label>
                <Input
                  value={instForm.naziv}
                  onChange={(e) => setInstForm({ ...instForm, naziv: e.target.value })}
                  placeholder="npr. Općina Živinice"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Slug *
                </label>
                <Input
                  value={instForm.slug}
                  onChange={(e) => setInstForm({ ...instForm, slug: e.target.value.toLowerCase() })}
                  placeholder="npr. zivinice"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'en' ? 'Canton' : 'Kanton'}
                  </label>
                  <Input
                    value={instForm.kanton}
                    onChange={(e) => setInstForm({ ...instForm, kanton: e.target.value })}
                    placeholder="npr. Tuzlanski kanton"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {language === 'en' ? 'Canton (short)' : 'Kanton (kratko)'}
                  </label>
                  <Input
                    value={instForm.kanton_kratko}
                    onChange={(e) => setInstForm({ ...instForm, kanton_kratko: e.target.value })}
                    placeholder="npr. TK"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  {language === 'en' ? 'Entity' : 'Entitet'}
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={instForm.entitet}
                  onChange={(e) => setInstForm({ ...instForm, entitet: e.target.value })}
                >
                  <option value="Federacija BiH">Federacija BiH</option>
                  <option value="Republika Srpska">Republika Srpska</option>
                  <option value="Brčko Distrikt">Brčko Distrikt</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  {language === 'en' ? 'Official URL' : 'Službeni URL'}
                </label>
                <Input
                  value={instForm.official_url}
                  onChange={(e) => setInstForm({ ...instForm, official_url: e.target.value })}
                  placeholder="https://example.gov.ba"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  className="bg-[#003D7A] hover:bg-[#002A5A]"
                  onClick={handleSaveInstitution}
                  disabled={saving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving
                    ? (language === 'en' ? 'Saving...' : 'Čuvanje...')
                    : (language === 'en' ? 'Save' : 'Sačuvaj')}
                </Button>
                <Button variant="outline" onClick={() => setViewMode('list')}>
                  <X className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Cancel' : 'Otkaži'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TRANSLATIONS VIEW */}
        {viewMode === 'translations' && selectedDoc && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                {language === 'en' ? 'Manage Translations' : 'Upravljanje prevodima'}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {selectedDoc.naziv_original}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {LANGUAGES.map((lang) => (
                <div key={lang.code} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Badge variant="outline">{lang.code.toUpperCase()}</Badge>
                    {lang.label}
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        {language === 'en' ? 'Translated name' : 'Prevedeni naziv'}
                      </label>
                      <Input
                        value={prevodForms[lang.code]?.naziv || ''}
                        onChange={(e) =>
                          setPrevodForms({
                            ...prevodForms,
                            [lang.code]: {
                              ...prevodForms[lang.code],
                              naziv: e.target.value,
                            },
                          })
                        }
                        placeholder={`${selectedDoc.naziv_original} (${lang.label})`}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        {language === 'en' ? 'Translated description' : 'Prevedeni opis'}
                      </label>
                      <textarea
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm min-h-[60px]"
                        value={prevodForms[lang.code]?.opis || ''}
                        onChange={(e) =>
                          setPrevodForms({
                            ...prevodForms,
                            [lang.code]: {
                              ...prevodForms[lang.code],
                              opis: e.target.value,
                            },
                          })
                        }
                        placeholder={language === 'en' ? 'Optional...' : 'Opcionalno...'}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-4">
                <Button
                  className="bg-[#003D7A] hover:bg-[#002A5A]"
                  onClick={handleSaveTranslations}
                  disabled={saving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving
                    ? (language === 'en' ? 'Saving...' : 'Čuvanje...')
                    : (language === 'en' ? 'Save all translations' : 'Sačuvaj sve prevode')}
                </Button>
                <Button variant="outline" onClick={() => setViewMode('list')}>
                  <X className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Cancel' : 'Otkaži'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* BATCH TRANSLATE VIEW */}
        {viewMode === 'batch-translate' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-600" />
                {language === 'en' ? 'AI Batch Translation' : 'AI Batch prevod'}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'en'
                  ? 'Automatically translate all documents into English, German, and Turkish using AI.'
                  : 'Automatski prevedite sve dokumente na engleski, njemački i turski koristeći AI.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Coverage stats */}
              {coverageStats && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    {language === 'en' ? 'Translation Coverage' : 'Pokrivenost prevodima'}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#003D7A]">{coverageStats.totalDocuments}</p>
                      <p className="text-xs text-gray-500">
                        {language === 'en' ? 'Total' : 'Ukupno'}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{coverageStats.fullyTranslated}</p>
                      <p className="text-xs text-gray-500">
                        {language === 'en' ? 'Fully translated' : 'Potpuno prevedeno'}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-600">{coverageStats.partiallyTranslated}</p>
                      <p className="text-xs text-gray-500">
                        {language === 'en' ? 'Partial' : 'Djelimično'}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">{coverageStats.untranslated}</p>
                      <p className="text-xs text-gray-500">
                        {language === 'en' ? 'Untranslated' : 'Neprevedeno'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">
                        {language === 'en' ? 'Coverage' : 'Pokrivenost'}
                      </span>
                      <span className="font-medium">{coverageStats.coveragePercent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#003D7A] to-[#00A651] h-2 rounded-full transition-all"
                        style={{ width: `${coverageStats.coveragePercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Progress display */}
              {batchProgress && batchProgress.status === 'running' && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Loader2 className="h-5 w-5 text-purple-600 animate-spin" />
                    <span className="font-medium text-purple-800">
                      {language === 'en' ? 'Translating...' : 'Prevođenje...'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        {batchProgress.completed + batchProgress.failed}/{batchProgress.total}
                      </span>
                      <span>
                        {batchProgress.total > 0
                          ? Math.round(((batchProgress.completed + batchProgress.failed) / batchProgress.total) * 100)
                          : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-purple-100 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${batchProgress.total > 0 ? ((batchProgress.completed + batchProgress.failed) / batchProgress.total) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    {batchProgress.currentDocument && (
                      <p className="text-xs text-gray-500 truncate">
                        📄 {batchProgress.currentDocument}...
                      </p>
                    )}
                    {batchProgress.failed > 0 && (
                      <p className="text-xs text-red-600">
                        ⚠️ {batchProgress.failed} {language === 'en' ? 'failed' : 'neuspješno'}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Result display */}
              {batchResult && (
                <div className={`rounded-lg p-4 border ${batchResult.errors.length > 0 ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className={`h-5 w-5 ${batchResult.errors.length > 0 ? 'text-amber-600' : 'text-green-600'}`} />
                    <span className="font-medium">
                      {language === 'en' ? 'Batch Translation Complete' : 'Batch prevod završen'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">{language === 'en' ? 'Documents processed' : 'Obrađeno dokumenata'}</p>
                      <p className="font-medium">{batchResult.totalDocuments}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">{language === 'en' ? 'Documents translated' : 'Prevedeno dokumenata'}</p>
                      <p className="font-medium text-green-700">{batchResult.translatedDocuments}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">{language === 'en' ? 'Translations created' : 'Kreirano prevoda'}</p>
                      <p className="font-medium text-[#003D7A]">{batchResult.translationsCreated}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    ⏱ {Math.round(batchResult.duration / 1000)}s
                  </p>
                  {batchResult.errors.length > 0 && (
                    <div className="mt-3 max-h-32 overflow-y-auto">
                      <p className="text-xs font-medium text-red-700 mb-1">
                        {language === 'en' ? 'Errors:' : 'Greške:'}
                      </p>
                      {batchResult.errors.slice(0, 10).map((err, i) => (
                        <p key={i} className="text-xs text-red-600">• {err}</p>
                      ))}
                      {batchResult.errors.length > 10 && (
                        <p className="text-xs text-red-500 mt-1">
                          ...+{batchResult.errors.length - 10} {language === 'en' ? 'more' : 'više'}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  onClick={handleStartBatchTranslation}
                  disabled={batchProgress?.status === 'running'}
                >
                  {batchProgress?.status === 'running' ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {language === 'en' ? 'Translating...' : 'Prevođenje...'}
                    </>
                  ) : (
                    <>
                      <Bot className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Start Batch Translation' : 'Pokreni batch prevod'}
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setViewMode('list')}
                  disabled={batchProgress?.status === 'running'}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Back' : 'Nazad'}
                </Button>
              </div>

              {/* Info note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                  ℹ️ {language === 'en'
                    ? 'The batch translation uses the MyMemory API to translate document names and descriptions. Only documents missing translations will be processed. Rate limiting is applied to avoid API restrictions (~500 requests/day).'
                    : 'Batch prevod koristi MyMemory API za prevođenje naziva i opisa dokumenata. Samo dokumenti kojima nedostaju prevodi će biti obrađeni. Primjenjuje se ograničenje brzine da se izbjegnu API restrikcije (~500 zahtjeva/dan).'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminDocuments;