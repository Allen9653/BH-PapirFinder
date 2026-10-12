import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Copy,
  FileCheck2,
  Gift,
  Printer,
  Receipt,
  RefreshCw,
  SearchCheck,
  Share2,
  Sparkles,
  Stamp,
  Download,
  Mail,
  Trash2,
  Loader2,
  ExternalLink,
  ShieldCheck,
  FileText,
  Clock,
  Layers,
  Check,
  Landmark,
  BadgeAlert,
  Info,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { buildPdf, pdfBlob } from '@/lib/client-pdf';
import { deleteTempDoc, TempDocSession, uploadTempDoc } from '@/lib/temp-doc-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  fetchTextTemplates,
  renderTemplate,
  templateTitle,
  TemplateLang,
  TextDocumentTemplate,
} from '@/lib/text-templates-service';
import {
  PREMIUM_JS_FORMS,
  PremiumJsForm,
  EntityRegion,
  validateJMBG,
  validateJIB,
} from '@/data/premium-js-forms';
import { FALLBACK_STANDARD_TEMPLATES } from '@/data/standard-legal-templates';

type GeneratorMode = 'premium_js' | 'general_templates';
type ScriptType = 'lat' | 'cyr';

export default function GeneratorPage() {
  const { t } = useLanguage();
  const { toast } = useToast();

  // Mode: 8 Premium JS Forms vs General Legal Templates
  const [mode, setMode] = useState<GeneratorMode>('premium_js');

  // Script selection (Latinica vs Ćirilica)
  const [script, setScript] = useState<ScriptType>('lat');

  // Entity filter for JS forms: all | fbih | rs | bd
  const [entityFilter, setEntityFilter] = useState<'all' | EntityRegion>('all');

  // Selected JS form
  const [selectedJsId, setSelectedJsId] = useState<string>('fbih-js-3100');

  // General templates state
  const [templates, setTemplates] = useState<TextDocumentTemplate[]>([]);
  const [generalLoading, setGeneralLoading] = useState(false);
  const [selectedGeneralId, setSelectedGeneralId] = useState<string>('ugovor-o-zakupu-stana');
  const [generalLang, setGeneralLang] = useState<TemplateLang>('bs');

  // Form input values
  const [values, setValues] = useState<Record<string, string>>({});

  // UI state
  const [copied, setCopied] = useState(false);
  const [consent, setConsent] = useState(false);
  const [session, setSession] = useState<TempDocSession | null>(null);
  const [busy, setBusy] = useState<'download_pdf' | 'download_txt' | 'print' | 'share' | 'email' | 'delete' | null>(null);
  const [notice, setNotice] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  // Load general templates (with fallback)
  useEffect(() => {
    let isMounted = true;
    async function loadGen() {
      setGeneralLoading(true);
      try {
        const res = await fetchTextTemplates();
        if (isMounted) {
          if (res.data && res.data.length > 0) {
            setTemplates(res.data);
            setSelectedGeneralId(res.data[0].id);
          } else {
            setTemplates(FALLBACK_STANDARD_TEMPLATES);
            setSelectedGeneralId(FALLBACK_STANDARD_TEMPLATES[0].id);
          }
        }
      } catch {
        if (isMounted) {
          setTemplates(FALLBACK_STANDARD_TEMPLATES);
          setSelectedGeneralId(FALLBACK_STANDARD_TEMPLATES[0].id);
        }
      } finally {
        if (isMounted) setGeneralLoading(false);
      }
    }
    void loadGen();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered JS forms
  const filteredJsForms = useMemo(() => {
    if (entityFilter === 'all') return PREMIUM_JS_FORMS;
    return PREMIUM_JS_FORMS.filter(f => f.entity === entityFilter);
  }, [entityFilter]);

  const activeJsForm: PremiumJsForm | undefined = useMemo(() => {
    return PREMIUM_JS_FORMS.find(f => f.id === selectedJsId) ?? PREMIUM_JS_FORMS[0];
  }, [selectedJsId]);

  const activeGeneralTemplate: TextDocumentTemplate | undefined = useMemo(() => {
    return templates.find(t => t.id === selectedGeneralId) ?? templates[0];
  }, [templates, selectedGeneralId]);

  // Set default values when active JS form changes
  useEffect(() => {
    if (mode === 'premium_js' && activeJsForm) {
      const initial: Record<string, string> = {};
      activeJsForm.fields.forEach(f => {
        if (f.defaultValue) initial[f.id] = f.defaultValue;
      });
      // Set today's date for signature fields if present
      const today = new Date().toISOString().split('T')[0];
      if (activeJsForm.fields.some(f => f.id === 'datum_podnosenja')) {
        initial['datum_podnosenja'] = today;
      }
      setValues(initial);
      setSession(null);
    }
  }, [selectedJsId, mode]);

  // Handle input change
  const handleInputChange = (id: string, val: string) => {
    setValues(prev => ({ ...prev, [id]: val }));
  };

  // Validation checks for JS Form
  const validationErrors = useMemo(() => {
    if (mode !== 'premium_js' || !activeJsForm) return [];
    const errors: string[] = [];

    // Required fields check
    activeJsForm.fields.forEach(f => {
      if (f.required && !values[f.id]?.trim()) {
        errors.push(`${f.label} je obavezno polje.`);
      }
    });

    // JMBG validation
    const jmbgVal = values['osiguranik_jmbg'] || values['zaposlenik_jmbg'] || values['obveznik_jmbg'];
    if (jmbgVal && jmbgVal.trim()) {
      const jmbgCheck = validateJMBG(jmbgVal);
      if (!jmbgCheck.valid) {
        errors.push(`JMBG osiguranika: ${jmbgCheck.message}`);
      }
    }

    // JIB validation
    const jibVal = values['poslodavac_jib'] || values['uplatioc_jib'] || values['organizator_jib'];
    if (jibVal && jibVal.trim()) {
      const jibCheck = validateJIB(jibVal);
      if (!jibCheck.valid) {
        errors.push(`JIB obveznika/poslodavca: ${jibCheck.message}`);
      }
    }

    return errors;
  }, [mode, activeJsForm, values]);

  // Output generated text
  const outputText = useMemo(() => {
    if (mode === 'premium_js' && activeJsForm) {
      return activeJsForm.generateText(values, script);
    }
    if (mode === 'general_templates' && activeGeneralTemplate) {
      const tLang = generalLang;
      const textDef = activeGeneralTemplate.template_text[tLang] ?? activeGeneralTemplate.template_text.bs;
      return renderTemplate(textDef, values, activeGeneralTemplate.form_fields);
    }
    return '';
  }, [mode, activeJsForm, activeGeneralTemplate, values, script, generalLang]);

  // Document metadata title & filename
  const currentDocTitle = useMemo(() => {
    if (mode === 'premium_js' && activeJsForm) {
      return script === 'cyr' ? activeJsForm.titleCyr : activeJsForm.title;
    }
    if (mode === 'general_templates' && activeGeneralTemplate) {
      return templateTitle(activeGeneralTemplate, generalLang);
    }
    return 'BH_PapirFinder_Dokument';
  }, [mode, activeJsForm, activeGeneralTemplate, script, generalLang]);

  const baseFileName = useMemo(() => {
    if (mode === 'premium_js' && activeJsForm) {
      return activeJsForm.code.replace(/\s+/g, '_').toLowerCase();
    }
    if (mode === 'general_templates' && activeGeneralTemplate) {
      return activeGeneralTemplate.slug;
    }
    return 'dokument';
  }, [mode, activeJsForm, activeGeneralTemplate]);

  // Clipboard copy
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      toast({
        title: 'Kopirano u međuspremnik',
        description: 'Tekst obrasca je uspješno spreman za lijepljenje (Paste).',
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast({
        title: 'Greška pri kopiranju',
        description: 'Dozvolite pristup međuspremniku u vašem pregledniku.',
        variant: 'destructive',
      });
    }
  };

  // Download TXT
  const handleDownloadTxt = () => {
    setBusy('download_txt');
    try {
      const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${baseFileName}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast({
        title: 'TXT Datoteka preuzeta',
        description: `${baseFileName}.txt je sačuvan na vaš uređaj.`,
      });
    } catch (err) {
      setNotice({ kind: 'error', text: `Greška pri preuzimanju TXT: ${String(err)}` });
    } finally {
      setBusy(null);
    }
  };

  // Download PDF
  const handleDownloadPdf = async () => {
    setBusy('download_pdf');
    setNotice(null);
    try {
      const pdfBytes = await buildPdf(outputText, currentDocTitle);
      const blob = pdfBlob(pdfBytes);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${baseFileName}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      toast({
        title: 'PDF Obrazac preuzet',
        description: `${baseFileName}.pdf je spreman za štampu i ovjeru.`,
      });
    } catch (e) {
      setNotice({ kind: 'error', text: `Greška pri generisanju PDF dokumenta: ${String(e)}` });
    } finally {
      setBusy(null);
    }
  };

  // In-Memory Print PDF
  const handlePrintPdf = async () => {
    setBusy('print');
    setNotice(null);
    try {
      const pdfBytes = await buildPdf(outputText, currentDocTitle);
      const blob = pdfBlob(pdfBytes);
      const url = URL.createObjectURL(blob);
      const frame = document.createElement('iframe');
      frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0';
      frame.src = url;
      frame.onload = () => {
        frame.contentWindow?.focus();
        frame.contentWindow?.print();
        setTimeout(() => {
          frame.remove();
          URL.revokeObjectURL(url);
        }, 60000);
      };
      document.body.appendChild(frame);
    } catch (e) {
      setNotice({ kind: 'error', text: `Štampanje nije uspjelo: ${String(e)}` });
    } finally {
      setBusy(null);
    }
  };

  // Share session via temp storage (5h retention)
  const ensureSession = async (): Promise<TempDocSession> => {
    if (session) return session;
    const pdfBytes = await buildPdf(outputText, currentDocTitle);
    const created = await uploadTempDoc(pdfBytes, `${baseFileName}.pdf`);
    setSession(created);
    return created;
  };

  const handleShareLink = async () => {
    if (!consent) {
      setNotice({
        kind: 'error',
        text: 'Označite saglasnost za privremeno čuvanje (do 5 sati) prije dijeljenja linka.',
      });
      return;
    }
    setBusy('share');
    setNotice(null);
    try {
      const s = await ensureSession();
      if (navigator.share) {
        try {
          await navigator.share({ title: currentDocTitle, url: s.signed_url });
        } catch {
          // User closed share dialog
        }
      } else {
        await navigator.clipboard.writeText(s.signed_url);
        setNotice({
          kind: 'ok',
          text: 'Privremeni link (važi tačno 5 sati) je kopiran u vaš međuspremnik!',
        });
      }
    } catch (e) {
      setNotice({ kind: 'error', text: `Dijeljenje nije uspjelo: ${String(e)}` });
    } finally {
      setBusy(null);
    }
  };

  // Erase immediately
  const handleEraseNow = async () => {
    if (!session) return;
    setBusy('delete');
    setNotice(null);
    try {
      await deleteTempDoc(session.session_token);
      setSession(null);
      setNotice({ kind: 'ok', text: 'Dokument je trajno i trenutno obrisan sa servera!' });
      toast({
        title: 'Trajno obrisano',
        description: 'Privremeni fajl i link su uništeni bez čekanja 5 sati.',
      });
    } catch (e) {
      setNotice({ kind: 'error', text: `Brisanje nije uspjelo: ${String(e)}` });
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-10 px-4 border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/10 to-indigo-600/15 blur-[130px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/80 text-xs font-semibold text-cyan-300 mb-4 shadow-sm">
            <Landmark className="w-4 h-4 text-amber-400" />
            <span>Pravni Dokumentacioni Centar Bosne i Hercegovine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Centralni Generator Zvaničnih Obrazaca BiH
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto mb-6">
            Digitalizacija, popunjavanje i generisanje službenih poreznih i radnih obrazaca za sve tri pravne teritorije:
            <strong className="text-cyan-300"> Federaciju BiH (FBiH)</strong>,
            <strong className="text-amber-300"> Republiku Srpsku (RS - ćirilica/latinica)</strong> i
            <strong className="text-emerald-300"> Brčko Distrikt BiH</strong>.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-xl bg-slate-950/90 border border-slate-800 shadow-xl max-w-xl mx-auto">
            <button
              type="button"
              onClick={() => setMode('premium_js')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                mode === 'premium_js'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-amber-300" />
              <span>8 Premium JS Obrazaca (BiH)</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30">
                PRO
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMode('general_templates')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                mode === 'general_templates'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4 text-cyan-300" />
              <span>Opšti Pravni Šabloni</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Notice alert */}
        {notice && (
          <div
            className={`mb-6 p-4 rounded-xl border flex items-center justify-between gap-3 ${
              notice.kind === 'ok'
                ? 'bg-emerald-950/60 border-emerald-700/80 text-emerald-200'
                : 'bg-red-950/60 border-red-700/80 text-red-200'
            }`}
          >
            <div className="flex items-center gap-2 text-sm">
              {notice.kind === 'ok' ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />}
              <span>{notice.text}</span>
            </div>
            <button type="button" onClick={() => setNotice(null)} className="text-xs underline opacity-80 hover:opacity-100">
              Zatvori
            </button>
          </div>
        )}

        {/* =========================================================================
            MODE 1: 8 PREMIUM JS OBRAZACA (FBiH, RS, Brčko)
            ========================================================================= */}
        {mode === 'premium_js' && (
          <div className="space-y-6">
            {/* Entity Filter & Script Selector Bar */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Entity Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-blue-400" /> Jurisdikcija:
                </span>
                <button
                  type="button"
                  onClick={() => setEntityFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    entityFilter === 'all'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  Sve teritorije (8)
                </button>
                <button
                  type="button"
                  onClick={() => setEntityFilter('fbih')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    entityFilter === 'fbih'
                      ? 'bg-blue-700 text-white shadow-sm ring-1 ring-blue-400'
                      : 'bg-slate-900 text-blue-300 hover:bg-slate-800 border border-blue-900/60'
                  }`}
                >
                  Federacija BiH (3)
                </button>
                <button
                  type="button"
                  onClick={() => setEntityFilter('rs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    entityFilter === 'rs'
                      ? 'bg-rose-700 text-white shadow-sm ring-1 ring-rose-400'
                      : 'bg-slate-900 text-rose-300 hover:bg-slate-800 border border-rose-900/60'
                  }`}
                >
                  Republika Srpska (3)
                </button>
                <button
                  type="button"
                  onClick={() => setEntityFilter('bd')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    entityFilter === 'bd'
                      ? 'bg-amber-600 text-slate-950 shadow-sm ring-1 ring-amber-300'
                      : 'bg-slate-900 text-amber-300 hover:bg-slate-800 border border-amber-900/60'
                  }`}
                >
                  Brčko Distrikt (2)
                </button>
              </div>

              {/* Script (Pismo) Selection */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <span className="text-xs font-medium text-slate-400">Pismo dokumenta:</span>
                <div className="inline-flex p-1 rounded-lg bg-slate-900 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setScript('lat')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      script === 'lat' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Latinica
                  </button>
                  <button
                    type="button"
                    onClick={() => setScript('cyr')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      script === 'cyr' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Ћирилица
                  </button>
                </div>
              </div>
            </div>

            {/* Form Selection Cards Carousel/Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredJsForms.map(f => {
                const isSelected = f.id === selectedJsId;
                const badgeColor =
                  f.entity === 'fbih'
                    ? 'bg-blue-900/50 text-blue-300 border-blue-700/70'
                    : f.entity === 'rs'
                    ? 'bg-rose-900/50 text-rose-300 border-rose-700/70'
                    : 'bg-amber-900/50 text-amber-300 border-amber-700/70';

                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedJsId(f.id)}
                    className={`text-left p-4 rounded-xl border transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-400 shadow-lg ring-1 ring-cyan-400'
                        : 'bg-slate-950/60 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/70'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-sm text-cyan-400 tracking-wider">
                          {f.code}
                        </span>
                        <Badge variant="outline" className={`text-[10px] font-bold px-2 py-0.5 ${badgeColor}`}>
                          {f.entityName}
                        </Badge>
                      </div>

                      <h4 className="text-xs font-bold text-white line-clamp-2 mb-1.5">
                        {script === 'cyr' ? f.titleCyr : f.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {script === 'cyr' ? f.subtitleCyr : f.subtitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                      <span className="truncate max-w-[140px]">{f.authority}</span>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-cyan-400 font-bold">
                          <Check className="w-3.5 h-3.5" /> Izabran
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Form Editor & Live Preview 2-Column Layout */}
            {activeJsForm && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* LEFT: Input Form Fields (7 cols) */}
                <div className="lg:col-span-7 space-y-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
                  {/* Header info of active form */}
                  <div className="border-b border-slate-800 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded bg-blue-600/30 text-cyan-300 font-black text-xs border border-blue-500/40">
                          {activeJsForm.code}
                        </span>
                        <Badge className="bg-amber-400/20 text-amber-300 border-amber-400/30 text-[10px]">
                          PREMIUM JS OBRAZAC
                        </Badge>
                      </div>
                      <a
                        href={activeJsForm.archiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-cyan-300 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Službeni original (archive.org)
                      </a>
                    </div>

                    <h2 className="text-lg md:text-xl font-bold text-white">
                      {script === 'cyr' ? activeJsForm.titleCyr : activeJsForm.title}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Nadležni organ: <strong className="text-slate-300">{activeJsForm.authority}</strong>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 italic">
                      Pravni osnov: {activeJsForm.legalBasis}
                    </p>
                  </div>

                  {/* Validation warnings if any */}
                  {validationErrors.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/70 text-amber-200 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-300">
                        <BadgeAlert className="w-4 h-4 shrink-0" />
                        <span>Provjera unesenih administrativnih podataka:</span>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 pl-1 opacity-90">
                        {validationErrors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Dynamic Fields List */}
                  <div className="space-y-4">
                    {activeJsForm.fields.map(field => {
                      const fLabel = script === 'cyr' && field.labelCyr ? field.labelCyr : field.label;
                      const val = values[field.id] || '';

                      return (
                        <div key={field.id} className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={field.id} className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                              <span>{fLabel}</span>
                              {field.required && <span className="text-red-400">*</span>}
                            </Label>
                            {field.id.includes('jmbg') && (
                              <span className="text-[10px] text-slate-400">13 cifara (modul 11)</span>
                            )}
                            {field.id.includes('jib') && (
                              <span className="text-[10px] text-slate-400">13 cifara (pravno lice)</span>
                            )}
                          </div>

                          {field.type === 'select' ? (
                            <select
                              id={field.id}
                              value={val}
                              onChange={e => handleInputChange(field.id, e.target.value)}
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                              {field.options?.map(opt => (
                                <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                                  {script === 'cyr' && opt.labelCyr ? opt.labelCyr : opt.label}
                                </option>
                              ))}
                            </select>
                          ) : field.type === 'textarea' ? (
                            <Textarea
                              id={field.id}
                              value={val}
                              onChange={e => handleInputChange(field.id, e.target.value)}
                              placeholder={field.placeholder}
                              rows={3}
                              className="bg-slate-900 border-slate-700 text-white text-xs md:text-sm rounded-xl focus:ring-cyan-500"
                            />
                          ) : (
                            <Input
                              id={field.id}
                              type={field.type}
                              value={val}
                              onChange={e => handleInputChange(field.id, e.target.value)}
                              placeholder={field.placeholder}
                              className="bg-slate-900 border-slate-700 text-white text-xs md:text-sm rounded-xl focus:ring-cyan-500"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT: Live Preview & Document Actions (5 cols) */}
                <div className="lg:col-span-5 space-y-5 sticky top-6">
                  {/* Preview Box */}
                  <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl flex flex-col h-full">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 text-cyan-400" />
                        <h3 className="font-bold text-sm text-white">Live Preview Obrasca</h3>
                      </div>
                      <Badge variant="outline" className="text-[10px] text-cyan-300 border-cyan-800/80">
                        {script === 'cyr' ? 'Ћирилица' : 'Latinica'}
                      </Badge>
                    </div>

                    {/* Preformatted text viewport */}
                    <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-3.5 max-h-[460px] overflow-y-auto font-mono text-[11px] text-slate-200 whitespace-pre-wrap leading-relaxed shadow-inner">
                      {outputText}
                    </div>

                    {/* Export Actions Panel */}
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          onClick={handleDownloadPdf}
                          disabled={busy !== null}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md rounded-xl py-2.5"
                        >
                          {busy === 'download_pdf' ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                          ) : (
                            <Download className="w-3.5 h-3.5 mr-1.5" />
                          )}
                          Preuzmi PDF
                        </Button>

                        <Button
                          type="button"
                          onClick={handleDownloadTxt}
                          disabled={busy !== null}
                          variant="outline"
                          className="w-full border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs rounded-xl py-2.5"
                        >
                          {busy === 'download_txt' ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                          ) : (
                            <FileText className="w-3.5 h-3.5 mr-1.5" />
                          )}
                          Preuzmi TXT
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          onClick={handleCopy}
                          variant="secondary"
                          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl"
                        >
                          {copied ? (
                            <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 mr-1.5" />
                          )}
                          {copied ? 'Kopirano!' : 'Kopiraj tekst'}
                        </Button>

                        <Button
                          type="button"
                          onClick={handlePrintPdf}
                          disabled={busy !== null}
                          variant="secondary"
                          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl"
                        >
                          {busy === 'print' ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                          ) : (
                            <Printer className="w-3.5 h-3.5 mr-1.5" />
                          )}
                          Štampaj
                        </Button>
                      </div>

                      {/* 5-Hour Temporary Sharing & Consent */}
                      <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                        <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-400">
                          <Checkbox
                            checked={consent}
                            onCheckedChange={v => setConsent(Boolean(v))}
                            className="mt-0.5"
                          />
                          <span>
                            Saglasan/na sam sa privremenim čuvanjem (do 5 sati) samo ako izaberem dijeljenje linka.
                            Preuzimanje i štampa rade 100% u memoriji preglednika bez servera.
                          </span>
                        </label>

                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            onClick={handleShareLink}
                            disabled={!consent || busy !== null}
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs border-blue-900 bg-blue-950/40 text-blue-200 hover:bg-blue-900/50 rounded-xl"
                          >
                            {busy === 'share' ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                            ) : (
                              <Share2 className="w-3.5 h-3.5 mr-1.5" />
                            )}
                            Podijeli (5h link)
                          </Button>

                          {session && (
                            <Button
                              type="button"
                              onClick={handleEraseNow}
                              disabled={busy !== null}
                              variant="destructive"
                              size="sm"
                              className="text-xs rounded-xl"
                            >
                              {busy === 'delete' ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="w-3.5 h-3.5" />
                              )}
                              Obriši odmah
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security badge & Freemium notice */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>Sigurnost ličnih podataka (GDPR i BiH Zakon)</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Svi podaci uneseni u JS obrasce (uključujući JMBG i JIB) obrađuju se isključivo unutar radne memorije
                      Vašeg uređaja (Client-Side). Ne čuvaju se u trajnim bazama i spremni su za predaju na šalteru porezne uprave.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            MODE 2: OPŠTI PRAVNI ŠABLONI (Ugovori, punomoći, pristup informacijama)
            ========================================================================= */}
        {mode === 'general_templates' && (
          <div className="space-y-6">
            {/* Template selector carousel */}
            <div>
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
                Izaberite pravni šablon:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {templates.map(tpl => {
                  const isSelected = tpl.id === selectedGeneralId;
                  return (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => {
                        setSelectedGeneralId(tpl.id);
                        setValues({});
                      }}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-slate-800 border-cyan-400 shadow-md ring-1 ring-cyan-400'
                          : 'bg-slate-950/70 border-slate-800 hover:bg-slate-900'
                      }`}
                    >
                      <h4 className="font-bold text-sm text-white mb-1">
                        {templateTitle(tpl, generalLang)}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {tpl.description_bs || 'Pravni šablon usklađen sa Zakonom o obligacionim odnosima.'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* General Template Editor */}
            {activeGeneralTemplate && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-4 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-white">
                      {templateTitle(activeGeneralTemplate, generalLang)}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Popunite polja ispod; dokument se automatski ažurira u pregledu.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    {activeGeneralTemplate.form_fields.map(f => (
                      <div key={f.id} className="space-y-1">
                        <Label htmlFor={`gen-${f.id}`} className="text-xs font-semibold text-slate-200">
                          {f.label} {f.required && <span className="text-red-400">*</span>}
                        </Label>
                        {f.type === 'textarea' ? (
                          <Textarea
                            id={`gen-${f.id}`}
                            value={values[f.id] || ''}
                            onChange={e => handleInputChange(f.id, e.target.value)}
                            rows={3}
                            className="bg-slate-900 border-slate-700 text-white text-xs rounded-xl"
                          />
                        ) : (
                          <Input
                            id={`gen-${f.id}`}
                            type="text"
                            value={values[f.id] || ''}
                            onChange={e => handleInputChange(f.id, e.target.value)}
                            className="bg-slate-900 border-slate-700 text-white text-xs rounded-xl"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Preview */}
                <div className="lg:col-span-5 space-y-4 sticky top-6">
                  <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                      <h4 className="font-bold text-sm text-white">Pregled Teksta</h4>
                      <Badge variant="outline" className="text-[10px] text-cyan-300 border-cyan-800">
                        {currentDocTitle}
                      </Badge>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 max-h-[400px] overflow-y-auto font-mono text-[11px] text-slate-200 whitespace-pre-wrap leading-relaxed">
                      {outputText}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          onClick={handleDownloadPdf}
                          disabled={busy !== null}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl"
                        >
                          <Download className="w-3.5 h-3.5 mr-1.5" />
                          Preuzmi PDF
                        </Button>
                        <Button
                          type="button"
                          onClick={handleDownloadTxt}
                          disabled={busy !== null}
                          variant="outline"
                          className="w-full border-slate-700 bg-slate-900 text-slate-200 font-semibold text-xs rounded-xl"
                        >
                          <FileText className="w-3.5 h-3.5 mr-1.5" />
                          Preuzmi TXT
                        </Button>
                      </div>

                      <Button
                        type="button"
                        onClick={handleCopy}
                        variant="secondary"
                        className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                        {copied ? 'Kopirano!' : 'Kopiraj tekst'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
