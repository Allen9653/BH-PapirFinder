import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Globe,
  FileText,
  Building2,
  Calendar,
  Lock,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { safeHttpsUrl, getOfficialWebsite } from '@/lib/institution-directory';
import { safeOpenExternal } from '@/lib/security';
import ReportBrokenLink from '@/components/ReportBrokenLink';

interface DocumentSourcesReferencesProps {
  formId: string;
  formName: string;
  category: string;
  municipalityName: string;
  municipalitySlug?: string;
  cantonShort?: string;
  fileUrl: string;
  officialPortalUrl?: string;
  formsRepositoryUrl?: string;
  issuingDepartment?: string;
  lastVerifiedDate?: string;
}

export const DocumentSourcesReferences: React.FC<DocumentSourcesReferencesProps> = ({
  formId,
  formName,
  category,
  municipalityName,
  municipalitySlug,
  cantonShort,
  fileUrl,
  officialPortalUrl,
  formsRepositoryUrl,
  issuingDepartment,
  lastVerifiedDate = '01.11.2026',
}) => {
  const { language } = useLanguage();
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Compute clean hostnames and fallback URLs
  const cleanMunicipalityName = municipalityName.replace(/^(Općina|Opština|Grad)\s+/, '');
  
  // Resolve official portal URL
  const resolvedPortalUrl =
    officialPortalUrl ||
    getOfficialWebsite(cleanMunicipalityName) ||
    (municipalitySlug === 'livno' || municipalitySlug === 'grad-livno'
      ? 'https://livno.ba/'
      : municipalitySlug === 'kakanj' || municipalitySlug === 'opcina-kakanj'
        ? 'https://kakanj.gov.ba/'
        : undefined);

  // Resolve official forms repository URL
  const resolvedFormsUrl =
    formsRepositoryUrl ||
    (municipalitySlug === 'livno' || municipalitySlug === 'grad-livno'
      ? 'https://livno.ba/za-gradane/dokumenti-i-obrasci/'
      : municipalitySlug === 'kakanj' || municipalitySlug === 'opcina-kakanj'
        ? 'https://kakanj.gov.ba/v5/e-obrasci/'
        : undefined);

  const getDomainFromUrl = (url?: string): string => {
    if (!url) return '';
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  return (
    <section
      id="sources-references-section"
      aria-label="Izvori i službene reference dokumenta"
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden"
    >
      {/* Header bar */}
      <div className="bg-gradient-to-r from-[#003D7A]/5 via-emerald-500/5 to-[#00A651]/5 border-b border-slate-200/80 px-5 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#003D7A]/10 text-[#003D7A] flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#003D7A]">
                  {language === 'en'
                    ? 'Sources & Official Government References'
                    : language === 'de'
                    ? 'Quellen & Offizielle Behördenreferenzen'
                    : language === 'tr'
                    ? 'Kaynaklar ve Resmi Devlet Referansları'
                    : 'Izvori & Službene Vladine Reference'}
                </h3>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-[10px] font-semibold gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  <span>Verifikovano</span>
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'en'
                  ? 'Direct hyperlinks to official institutional host portals and repositories in Bosnia and Herzegovina.'
                  : 'Direktne poveznice na službene web portale institucija i repozitorije obrazaca u BiH.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Ažurirano: {lastVerifiedDate}</span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Source Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* 1. Official Government Web Portal */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#003D7A]" />
                  <span>Službeni Web Portal Institucije</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> HTTPS Zaštićeno
                </span>
              </div>
              <h4 className="font-semibold text-slate-800 text-sm mb-1">
                {municipalityName} {cantonShort ? `(${cantonShort})` : ''}
              </h4>
              <p className="text-xs text-slate-600 mb-3 break-all font-mono">
                {resolvedPortalUrl ? resolvedPortalUrl : 'Službeni portal lokalne samouprave'}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
              {resolvedPortalUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs gap-1 border-slate-300 text-[#003D7A] hover:bg-white"
                  onClick={() => safeOpenExternal(resolvedPortalUrl)}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Posjeti portal</span>
                </Button>
              )}
              {resolvedPortalUrl && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2 text-xs text-slate-600 hover:text-slate-900"
                  onClick={() => handleCopy(resolvedPortalUrl)}
                  title="Kopiraj URL portala"
                >
                  {copiedUrl === resolvedPortalUrl ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* 2. Official Forms Repository Page */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#00A651]" />
                  <span>Stranica s Obrascima / Repozitorij</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  e-Uprava
                </span>
              </div>
              <h4 className="font-semibold text-slate-800 text-sm mb-1">
                {municipalitySlug === 'livno' || municipalitySlug === 'grad-livno'
                  ? 'Stranica s obrazcima: Grad Livno'
                  : `Repozitorij e-obrazaca: ${cleanMunicipalityName}`}
              </h4>
              <p className="text-xs text-slate-600 mb-3 break-all font-mono">
                {resolvedFormsUrl
                  ? resolvedFormsUrl
                  : 'Službeni katalog elektronskih formulara i zahtjeva'}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
              {resolvedFormsUrl && (
                <Button
                  size="sm"
                  className="h-8 text-xs gap-1 bg-[#00A651] hover:bg-[#008f45] text-white"
                  onClick={() => safeOpenExternal(resolvedFormsUrl)}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Otvori repozitorij</span>
                </Button>
              )}
              {resolvedFormsUrl && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2 text-xs text-slate-600 hover:text-slate-900"
                  onClick={() => handleCopy(resolvedFormsUrl)}
                  title="Kopiraj URL repozitorija"
                >
                  {copiedUrl === resolvedFormsUrl ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Direct Original Document Link Bar */}
        <div className="p-3.5 rounded-xl border border-emerald-200/80 bg-emerald-50/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Direktni Hostovani Link Izvornog Obrasca:</span>
              </span>
              <p className="font-mono text-xs text-slate-700 break-all bg-white px-2.5 py-1.5 rounded border border-emerald-200">
                {fileUrl}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                onClick={() => handleCopy(fileUrl)}
              >
                {copiedUrl === fileUrl ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                    <span>Kopirano!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    <span>Kopiraj link</span>
                  </>
                )}
              </Button>

              <Button
                size="sm"
                className="h-8 text-xs bg-[#003D7A] hover:bg-[#002A5A] text-white"
                onClick={() => safeOpenExternal(fileUrl)}
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1" />
                <span>Otvori izvor</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Institutional Authority & Legal Guarantee Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Nadležni organ uprave:{' '}
              <strong className="text-slate-800">
                {issuingDepartment || `${municipalityName} • Služba za upravu i građanska stanja`}
              </strong>
            </span>
          </div>

          <ReportBrokenLink
            municipalityName={municipalityName}
            municipalitySlug={municipalitySlug}
            formName={formName}
            formId={formId}
            brokenUrl={fileUrl}
            trigger={
              <button
                type="button"
                className="text-[11px] text-slate-500 hover:text-amber-700 hover:underline flex items-center gap-1 self-start sm:self-center"
              >
                <span>Prijavi izmjenu ili zastarjeli izvor</span>
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default DocumentSourcesReferences;
