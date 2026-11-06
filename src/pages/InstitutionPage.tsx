import { useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getDirectoryEntry,
  hasNoListedMunicipalityDocuments,
  safeHttpsUrl,
  type DirectoryForm,
} from '@/lib/institution-directory';
import { useDirectoryVersion } from '@/hooks/use-directory-version';
import { getMunicipalityContactEmail } from '@/data/municipality-contact-emails';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  Building2,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Languages,
  Pencil,
  Printer,
  Save,
  Share2,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DocumentViewer from '@/components/DocumentViewer';
import OfficialDocumentPreview from '@/components/OfficialDocumentPreview';
import TagNavigation, { matchesTagFilter } from '@/components/TagNavigation';
import InstitutionAutocomplete from '@/components/InstitutionAutocomplete';
import MunicipalityEmailRequest from '@/components/MunicipalityEmailRequest';
import { saveDocumentLocally } from '@/lib/saved-documents';

export default function InstitutionPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const directoryVersion = useDirectoryVersion();

  const entry = useMemo(() => {
    if (!slug) return undefined;
    return getDirectoryEntry(slug);
  }, [slug]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  if (!entry) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Institucija nije pronađena</h1>
          <p className="text-muted-foreground mb-6">
            Tražena institucija ili općina ne postoji u bazi podataka.
          </p>
          <Button onClick={() => navigate('/')}>Nazad na pretragu</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const forms = entry.forms || [];
  const noDocuments = hasNoListedMunicipalityDocuments(entry);

  const filteredForms = useMemo(() => {
    return forms.filter((form) => {
      const matchesSearch =
        form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (form.description && form.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTag = selectedTag ? matchesTagFilter(form, selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [forms, searchTerm, selectedTag]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>
            ← Nazad
          </Button>
          <InstitutionAutocomplete />
        </div>

        <div className="bg-card border rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{entry.municipality || entry.name}</Badge>
                {entry.verified && (
                  <Badge variant="default" className="bg-emerald-600">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verifikovano
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold tracking-tight">{entry.name}</h1>
              {entry.address && (
                <p className="text-muted-foreground mt-1 flex items-center gap-1">
                  <Building2 className="w-4 h-4" /> {entry.address}
                </p>
              )}
            </div>

            {entry.website && (
              <div>
                <a
                  href={safeHttpsUrl(entry.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="gap-2">
                    Zvanična stranica <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>

        {noDocuments ? (
          <Card className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-1">Nema direktno unesenih dokumenata</h3>
            <p className="text-muted-foreground mb-4">
              Za ovu instituciju trenutno nisu uneseni standardizirani obrasci u bazu.
            </p>
            <MunicipalityEmailRequest municipalityName={entry.name} />
          </Card>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
              <Input
                placeholder="Pretraži obrasce i dokumente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
              <TagNavigation selectedTag={selectedTag} onSelectTag={setSelectedTag} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredForms.map((form, index) => (
                <Card key={index} className="flex flex-col justify-between">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">{form.title}</h3>
                    {form.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {form.description}
                      </p>
                    )}
                  </CardContent>
                  <div className="p-6 pt-0 flex items-center justify-between border-t mt-auto">
                    <span className="text-xs text-muted-foreground">Dokument</span>
                    {form.url && (
                      <a
                        href={safeHttpsUrl(form.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="sm" className="gap-1">
                          Preuzmi <Download className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
