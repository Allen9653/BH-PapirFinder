import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InstitutionAutocomplete from '@/components/InstitutionAutocomplete';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  ExternalLink, Eye, Download, Share2, Pencil, Printer, Languages, FileText, ShieldCheck, AlertTriangle, Building2, Tag, Save,
} from 'lucide-react';
import {
  getDirectoryEntry,
  hasNoListedMunicipalityDocuments,
  DirectoryForm,
  safeHttpsUrl,
} from '@/lib/institution-directory';
import { useDirectoryVersion } from '@/hooks/use-directory-version';
import { useLanguage } from '@/contexts/LanguageContext';
import TagNavigation, { matchesTagFilter } from '@/components/TagNavigation';
import { saveDocumentLocally } from '@/lib/saved-documents';
import OfficialDocumentPreview from '@/components/OfficialDocumentPreview';
import MunicipalityEmailRequest from '@/components/MunicipalityEmailRequest';
import { getMunicipalityContactEmail } from '@/data/municipality-contact-emails';

const STATUS_STYLE: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  counter: 'bg-amber-100 text-amber-800',
  inactive: 'bg-red-100 text-red-800',
  unverified: 'bg-gray-100 text-gray-700',
};

const InstitutionPage = () => {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const dirVersion = useDirectoryVersion();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const entry = useMemo(() => getDirectoryEntry(slug), [slug, dirVersion]);
  const [filter, setFilter] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [previewForm, setPreviewForm] = useState<DirectoryForm | null>(null);

  const forms = useMemo(() => {
    if (!entry) return [];
    let list = entry.forms;
    if (filter.trim()) {
      const q = filter.toLowerCase();
      list = list.filter(f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q));
    }
    if (selectedTag) {
      list = list.filter(f => matchesTagFilter(f, selectedTag));
    }
    return list;
  }, [entry, filter, selectedTag]);

  const openUrl = (url?: string) => {
    const safeUrl = safeHttpsUrl(url);
    return safeUrl && window.open(safeUrl, '_blank', 'noopener,noreferrer');
  };

  const share = async (f: DirectoryForm) => {
    const url = f.internal ? `${window.location.origin}/form/${f.id}` : f.url || window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: f.name, url }); } catch { /* otkazano */ }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success(t('inst.linkCopied'));
    }
  };

  const print = (f: DirectoryForm) => {
    const w = f.url ? window.open(f.url, '_blank', 'noopener,noreferrer') : null;
    if (w) setTimeout(() => { try { w.print(); } catch { /* cross-origin */ } }, 1500);
  };

  const save = (f: DirectoryForm) => {
    if (!f.url) return;
    try {
      const saved = saveDocumentLocally({
        id: f.id,
        name: f.name,
        municipality: entry?.name || '',
        category: f.category,
        file_url: f.url,
        notes: f.sourceUrl ? `Izvor: ${f.sourceUrl}` : '',
      });
      toast.success(saved ? t('inst.savedToArchive') : t('inst.alreadySaved'));
    } catch (error) {
      console.error('Document save failed:', error);
      toast.error(t('inst.saveFailed'));
    }
  };

  const translateUrl = (f: DirectoryForm) =>
    f.internal ? `/form/${f.id}?tab=translations` : f.url ? `https://translate.google.com/translate?sl=bs&tl=en&u=${encodeURIComponent(f.url)}` : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 sm:py-10 max-w-5xl">
        <div className="mb-6"><InstitutionAutocomplete /></div>

        {!entry ? (
          <Card><CardContent className="py-12 text-center">
            <Building2 className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 break-words">{t('inst.notFound')}</p>
            <Link to="/" className="text-[#003D7A] underline text-sm mt-2 inline-block">{t('inst.backHome')}</Link>
          </CardContent></Card>
        ) : (
          <>
            <Card className="mb-6 border-t-4 border-t-[#003D7A]">
              <CardContent className="pt-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{t(`inst.kind.${entry.kind}`)}</Badge>
                  {entry.entity && <Badge variant="outline">{entry.entity}</Badge>}
                  <Badge className={`${STATUS_STYLE[entry.status]} hover:${STATUS_STYLE[entry.status]}`}>{t(`inst.status.${entry.status}`)}</Badge>
                  {entry.verified
                    ? <Badge className="bg-[#00A651] text-white hover:bg-[#00A651]"><ShieldCheck className="h-3 w-3 mr-1" />{t('inst.verified')}</Badge>
                    : <Badge variant="secondary"><AlertTriangle className="h-3 w-3 mr-1" />{t('inst.notVerified')}</Badge>}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#003D7A] break-words">{entry.name}</h1>
                {entry.canton && <p className="text-sm text-gray-600 break-words">{entry.canton}</p>}
                {entry.note && <p className="text-sm text-gray-700 break-words">{entry.note}</p>}
                <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                  {(entry.officialUrl || (entry.verified && entry.website)) ? (
                    <Button asChild className="bg-[#003D7A] hover:bg-[#002A5A] text-white h-auto py-2">
                      <a href={entry.officialUrl || entry.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="break-words">{t('inst.openWebsite')}</span>
                      </a>
                    </Button>
                  ) : null}
                  {entry.formsUrl && (
                    <Button asChild variant="outline" className="h-auto py-2 !bg-transparent border-[#003D7A] text-[#003D7A] hover:bg-[#003D7A]/5">
                      <a href={entry.formsUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="break-words">{t('inst.openFormsPage')}</span>
                      </a>
                    </Button>
                  )}
                </div>
                {entry.guidanceLinks && entry.guidanceLinks.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-gray-800">Dodatne službene poveznice</h2>
                    <div className="flex flex-wrap gap-2">
                      {entry.guidanceLinks.map(link => (
                        <Button key={link.url} asChild variant="outline" className="h-auto py-2">
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="break-words">{link.label}</span>
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                {(entry.officialUrl || entry.website) && (
                  <p className="text-xs text-gray-500 break-all">{entry.officialUrl || entry.website}</p>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 break-words">
                {t('inst.formsTitle', { count: entry.forms.length })}
              </h2>
              {entry.forms.length > 0 && (
                <Input value={filter} onChange={e => setFilter(e.target.value)} placeholder={t('inst.filterForms')} className="sm:w-64" />
              )}
            </div>

            {entry.forms.length > 0 && (
              <div className="mb-5 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                <TagNavigation
                  forms={entry.forms}
                  activeTag={selectedTag}
                  onSelectTag={setSelectedTag}
                  theme="light"
                  totalCount={entry.forms.length}
                />
              </div>
            )}

            {entry.forms.length === 0 ? (
              <>
                {hasNoListedMunicipalityDocuments(entry) && (
                  <MunicipalityEmailRequest
                    municipalitySlug={entry.slug}
                    municipalityName={entry.name}
                    municipalityEmail={entry.email || getMunicipalityContactEmail(entry.slug)}
                    municipalityContact={entry}
                    formsUrl={entry.formsUrl || entry.website}
                    language={language}
                  />
                )}
                <Card><CardContent className="py-10 text-center space-y-3">
                <Badge className={STATUS_STYLE.counter}>{t('inst.status.counter')}</Badge>
                <p className="text-gray-600 break-words">{t('inst.noOnlineForms')}</p>
                {safeHttpsUrl(entry.formsUrl) && (
                  <Button variant="outline" onClick={() => openUrl(safeHttpsUrl(entry.formsUrl))}>
                    <ExternalLink className="h-4 w-4 mr-2" />{t('inst.openWebsite')}
                  </Button>
                )}
                </CardContent></Card>
              </>
            ) : forms.length === 0 ? (
              <Card><CardContent className="py-10 text-center space-y-2">
                <p className="text-gray-600 font-medium">Nema obrazaca za odabrani tag &ldquo;{selectedTag}&rdquo;.</p>
                <Button size="sm" variant="outline" onClick={() => setSelectedTag(null)}>
                  Prikaži sve obrasce
                </Button>
              </CardContent></Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {forms.map(f => (
                  <Card key={f.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-5 space-y-3">
                      <div className="flex items-start gap-2">
                        <FileText className="h-5 w-5 text-[#003D7A] flex-shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="font-medium text-sm text-gray-900 break-words">{f.name}</p>
                          <button
                            type="button"
                            onClick={() => setSelectedTag(selectedTag === f.category ? null : f.category)}
                            className={`mt-1 text-xs px-2 py-0.5 rounded font-medium transition-colors inline-flex items-center gap-1 cursor-pointer ${
                              selectedTag === f.category
                                ? 'bg-[#00A651] text-white shadow-xs'
                                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                            }`}
                            title={`Filtriraj po: ${f.category}`}
                          >
                            <Tag className="w-2.5 h-2.5" />
                            <span>{f.category}</span>
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {f.internal ? (
                          <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                            <Link to={`/form/${f.id}`}><Eye className="h-3.5 w-3.5 mr-1" />{t('inst.preview')}</Link>
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="h-8 text-xs" disabled={!f.url} onClick={() => setPreviewForm(f)}>
                            <Eye className="h-3.5 w-3.5 mr-1" />{t('inst.preview')}
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs text-[#00A651]"
                          disabled={!f.url}
                          onClick={() => {
                            if (!f.url) return;
                            const link = document.createElement('a');
                            link.href = f.url;
                            link.download = '';
                            link.target = '_blank';
                            link.rel = 'noopener noreferrer';
                            link.click();
                          }}
                        >
                          <Download className="h-3.5 w-3.5 mr-1" />{t('inst.download')}
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => share(f)}>
                          <Share2 className="h-3.5 w-3.5 mr-1" />{t('inst.share')}
                        </Button>
                        {f.internal && (
                          <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                            <Link to={`/form/${f.id}`}><Pencil className="h-3.5 w-3.5 mr-1" />{t('inst.edit')}</Link>
                          </Button>
                        )}
                        {!f.internal && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs"
                            onClick={() => {
                              if (f.editable) {
                                navigate(`/form/${f.id}`);
                              } else if (f.url) {
                                openUrl(f.url);
                                toast.info(t('inst.downloadToEdit'));
                              }
                            }}
                          >
                            <Pencil className="h-3.5 w-3.5 mr-1" />{t('inst.edit')}
                          </Button>
                        )}
                        {f.sourceUrl && (
                          <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                            <a href={f.sourceUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3.5 w-3.5 mr-1" />{t('inst.officialSource')}
                            </a>
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => save(f)}>
                          <Save className="h-3.5 w-3.5 mr-1" />{t('inst.save')}
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-xs" disabled={!f.url} onClick={() => print(f)}>
                          <Printer className="h-3.5 w-3.5 mr-1" />{t('inst.print')}
                        </Button>
                        {translateUrl(f) && (
                          f.internal ? (
                            <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                              <Link to={translateUrl(f)!}><Languages className="h-3.5 w-3.5 mr-1" />{t('inst.translate')}</Link>
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => openUrl(translateUrl(f))}>
                              <Languages className="h-3.5 w-3.5 mr-1" />{t('inst.translate')}
                            </Button>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      {previewForm?.url && (
        <OfficialDocumentPreview
          open={!!previewForm}
          onOpenChange={(open) => {
            if (!open) setPreviewForm(null);
          }}
          title={previewForm.name}
          url={previewForm.url}
          fileType={previewForm.fileType}
          category={previewForm.category}
          municipality={institution?.name}
        />
      )}
      <Footer />
    </div>
  );
};

export default InstitutionPage;
