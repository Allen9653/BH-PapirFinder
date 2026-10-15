import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InstitutionAutocomplete from '@/components/InstitutionAutocomplete';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  ExternalLink, Eye, Download, Share2, Pencil, Printer, Languages, FileText, ShieldCheck, AlertTriangle, Building2,
} from 'lucide-react';
import { getDirectoryEntry, DirectoryForm, safeHttpsUrl } from '@/lib/institution-directory';
import { useDirectoryVersion } from '@/hooks/use-directory-version';
import { useLanguage } from '@/contexts/LanguageContext';

const STATUS_STYLE: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  counter: 'bg-amber-100 text-amber-800',
  inactive: 'bg-red-100 text-red-800',
  unverified: 'bg-gray-100 text-gray-700',
};

const InstitutionPage = () => {
  const { slug = '' } = useParams();
  const { t } = useLanguage();
  const dirVersion = useDirectoryVersion();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const entry = useMemo(() => getDirectoryEntry(slug), [slug, dirVersion]);
  const [filter, setFilter] = useState('');

  const forms = useMemo(() => {
    if (!entry) return [];
    const q = filter.toLowerCase();
    return entry.forms.filter(f => !q || f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q));
  }, [entry, filter]);

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

            {entry.forms.length === 0 ? (
              <Card><CardContent className="py-10 text-center space-y-3">
                <Badge className={STATUS_STYLE.counter}>{t('inst.status.counter')}</Badge>
                <p className="text-gray-600 break-words">{t('inst.noOnlineForms')}</p>
                {safeHttpsUrl(entry.formsUrl) && (
                  <Button variant="outline" onClick={() => openUrl(safeHttpsUrl(entry.formsUrl))}>
                    <ExternalLink className="h-4 w-4 mr-2" />{t('inst.openWebsite')}
                  </Button>
                )}
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
                          <Badge variant="secondary" className="mt-1 text-xs whitespace-normal">{f.category}</Badge>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {f.internal ? (
                          <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                            <Link to={`/form/${f.id}`}><Eye className="h-3.5 w-3.5 mr-1" />{t('inst.preview')}</Link>
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="h-8 text-xs" disabled={!f.url} onClick={() => openUrl(f.url)}>
                            <Eye className="h-3.5 w-3.5 mr-1" />{t('inst.preview')}
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="h-8 text-xs text-[#00A651]" disabled={!f.url} onClick={() => openUrl(f.url)}>
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
      <Footer />
    </div>
  );
};

export default InstitutionPage;
