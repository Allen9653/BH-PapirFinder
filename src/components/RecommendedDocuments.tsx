import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, MapPin, Tag, ArrowRight, Printer, Download, Sparkles, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  getAllMunicipalities,
  MunicipalityForm,
  MunicipalityInfo,
} from '@/data/municipality-registry';
import { safeOpenExternal } from '@/lib/security';

interface RecommendedDocumentsProps {
  currentFormId: string;
  category: string;
  municipalitySlug?: string;
  municipalityName?: string;
  onOpenPrintPreview?: (form: MunicipalityForm, municipality: MunicipalityInfo) => void;
  className?: string;
}

interface ScoredForm {
  form: MunicipalityForm;
  municipality: MunicipalityInfo;
  score: number;
  reason: string;
}

export const RecommendedDocuments: React.FC<RecommendedDocumentsProps> = ({
  currentFormId,
  category,
  municipalitySlug,
  municipalityName,
  onOpenPrintPreview,
  className = '',
}) => {
  const navigate = useNavigate();

  const recommended = useMemo<ScoredForm[]>(() => {
    const allMunicipalities = getAllMunicipalities();
    const scored: ScoredForm[] = [];
    const normalizedCat = (category || '').toLowerCase().trim();
    const currentSlug = (municipalitySlug || '').toLowerCase().trim();

    // Extract keywords from category (e.g. "građevinske", "dozvole", "matični", "urbanizam")
    const catWords = normalizedCat
      .split(/[\s,/]+/)
      .filter((w) => w.length > 3);

    for (const mun of allMunicipalities) {
      const isSameMunicipality = mun.slug.toLowerCase() === currentSlug;

      for (const form of mun.forms) {
        if (form.id === currentFormId) continue;

        const formCat = (form.category || '').toLowerCase().trim();
        const formName = form.name.toLowerCase();
        let score = 0;
        let reason = '';

        const isExactCat = formCat === normalizedCat;
        const isCatMatch =
          isExactCat ||
          catWords.some((w) => formCat.includes(w) || formName.includes(w));

        if (isSameMunicipality && isExactCat) {
          score = 100;
          reason = `Ista općina & ista kategorija (${form.category})`;
        } else if (isExactCat) {
          score = 80;
          reason = `Ista kategorija: ${form.category}`;
        } else if (isSameMunicipality && isCatMatch) {
          score = 70;
          reason = `Ista općina & srodna oblast`;
        } else if (isCatMatch) {
          score = 60;
          reason = `Srodna administrativna oblast`;
        } else if (isSameMunicipality) {
          score = 50;
          reason = `Ista općina (${mun.name})`;
        }

        if (score > 0) {
          scored.push({
            form,
            municipality: mun,
            score,
            reason,
          });
        }
      }
    }

    // Sort descending by score, then take top 4
    scored.sort((a, b) => b.score - a.score);

    const uniqueForms: ScoredForm[] = [];
    const seenIds = new Set<string>();

    for (const item of scored) {
      if (!seenIds.has(item.form.id)) {
        seenIds.add(item.form.id);
        uniqueForms.push(item);
        if (uniqueForms.length >= 4) break;
      }
    }

    // If still less than 3, fallback to other top municipal forms
    if (uniqueForms.length < 3) {
      for (const mun of allMunicipalities) {
        for (const form of mun.forms) {
          if (form.id !== currentFormId && !seenIds.has(form.id)) {
            seenIds.add(form.id);
            uniqueForms.push({
              form,
              municipality: mun,
              score: 20,
              reason: `Popularan administrativni obrazac`,
            });
            if (uniqueForms.length >= 4) break;
          }
        }
        if (uniqueForms.length >= 4) break;
      }
    }

    return uniqueForms.slice(0, 4);
  }, [currentFormId, category, municipalitySlug]);

  if (recommended.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Preporučeni dokumenti i povezani obrasci"
      className={`glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#070b1a]/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#5df0a8] bg-[#5df0a8]/10 border border-[#5df0a8]/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>POVEZANA DOKUMENTACIJA</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Preporučeni Dokumenti & Povezani Obrasci
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Predloženi obrasci na osnovu kategorije{' '}
            <strong className="text-slate-200">&ldquo;{category}&rdquo;</strong>
            {municipalityName ? (
              <>
                {' '}i nadležne jedinice{' '}
                <strong className="text-slate-200">&ldquo;{municipalityName}&rdquo;</strong>.
              </>
            ) : (
              '.'
            )}
          </p>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 self-start sm:self-center">
          {recommended.length} preporuke
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommended.map(({ form, municipality, reason }) => (
          <div
            key={`${municipality.slug}-${form.id}`}
            className="group p-5 rounded-xl bg-[#0b142d]/70 hover:bg-[#0c1836] border border-white/10 hover:border-[#5df0a8]/40 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Reason badge & tags */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#5df0a8]/10 text-[#5df0a8] border border-[#5df0a8]/20 flex items-center gap-1">
                  <Tag className="w-2.5 h-2.5" />
                  <span>{reason}</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" />
                  <span>
                    {municipality.name} ({municipality.cantonShort})
                  </span>
                </span>
                {form.sizeKB && (
                  <span className="text-[10px] font-mono text-slate-400">
                    {form.sizeKB} KB PDF
                  </span>
                )}
              </div>

              {/* Title */}
              <h4
                onClick={() => {
                  navigate(`/form/${form.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-sm sm:text-base font-semibold text-white group-hover:text-[#5df0a8] transition-colors cursor-pointer line-clamp-2 mt-1"
                title={form.name}
              >
                {form.name}
              </h4>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-white/5">
              <div className="flex items-center gap-1.5">
                {onOpenPrintPreview && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2 text-xs text-slate-300 hover:text-[#5df0a8] hover:bg-white/5"
                    onClick={() => onOpenPrintPreview(form, municipality)}
                    title="Print Preview na papiru"
                  >
                    <Printer className="w-3.5 h-3.5 sm:mr-1" />
                    <span className="hidden sm:inline">Print</span>
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2 text-xs text-slate-300 hover:text-[#5df0a8] hover:bg-white/5"
                  onClick={() => safeOpenExternal(form.pdfUrl)}
                  title="Preuzmi zvanični PDF"
                >
                  <Download className="w-3.5 h-3.5 sm:mr-1" />
                  <span className="hidden sm:inline">Preuzmi</span>
                </Button>
              </div>

              <Button
                size="sm"
                className="h-8 px-3.5 text-xs bg-[#5df0a8] hover:bg-[#4be096] text-[#04060f] font-bold rounded-lg shadow-[0_0_12px_rgba(93,240,168,0.25)] flex items-center gap-1"
                onClick={() => {
                  navigate(`/form/${form.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>Pregledaj</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedDocuments;
