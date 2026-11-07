import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink, Search, FileText, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getMunicipalityBySlug, searchMunicipalityForms } from '@/data/municipality-registry';

export function InstitutionPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState('');

  const municipality = useMemo(() => {
    if (!slug) return undefined;
    return getMunicipalityBySlug(slug);
  }, [slug]);

  const filteredForms = useMemo(() => {
    if (!slug) return [];
    if (!searchQuery.trim()) {
      return municipality?.forms || [];
    }
    return searchMunicipalityForms(slug, searchQuery);
  }, [slug, municipality, searchQuery]);

  if (!municipality) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <Building2 className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Općina nije pronađena</h1>
        <p className="text-muted-foreground mb-6">Tražena općina ili institucija ne postoji u registru.</p>
        <Button asChild>
          <Link to="/">Nazad na početnu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      {/* Header */}
      <header className="border-b bg-card py-6 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Nazad
            </Link>
          </Button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{municipality.name}</h1>
              {municipality.cantonShort && (
                <p className="text-muted-foreground mt-1">Kanton: {municipality.cantonShort}</p>
              )}
            </div>
            {municipality.officialUrl && (
              <Button variant="outline" asChild>
                <a href={municipality.officialUrl} target="_blank" rel="noopener noreferrer">
                  Službena stranica
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 mt-8">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Pretraži obrasce i dokumente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Forms Grid */}
        {filteredForms.length === 0 ? (
          <div className="text-center py-16 border rounded-lg bg-card/50">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Nema pronađenih dokumenata</h3>
            <p className="text-sm text-muted-foreground mt-1">Pokušajte promijeniti pojam za pretragu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredForms.map((form, index) => (
              <Card key={form?.id || index} className="flex flex-col justify-between">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {form?.name || form?.title || 'Naziv nije dostupan'}
                  </h3>
                  {form?.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {form.description}
                    </p>
                  )}
                  {form?.category && (
                    <span className="inline-block text-xs bg-muted text-muted-foreground px-2 py-1 rounded mb-4">
                      {form.category}
                    </span>
                  )}
                </CardContent>
                <div className="px-6 pb-6 pt-0 flex items-center justify-between gap-2">
                  {form?.pdfUrl && (
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a href={form.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Preuzmi PDF
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
