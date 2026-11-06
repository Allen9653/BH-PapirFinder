import { useParams } from 'react-router-dom';
import MunicipalityCrest from '@/components/MunicipalityCrest';
import { safeHttpsUrl } from '@/lib/institution-directory';
import { ExternalLink, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MunicipalityHeaderProps {
  municipality: {
    name: string;
    canton?: string;
    cantonShort?: string;
    entity?: string;
    website?: string;
    officialUrl?: string;
    website_url?: string;
    slug?: string;
    notice?: string;
    [key: string]: any;
  };
}

export default function MunicipalityHeader({
  municipality,
}: MunicipalityHeaderProps) {
  const officialUrl =
    municipality.website ||
    municipality.website_url ||
    municipality.officialUrl;

  return (
    <div className="bg-[#0b132b] text-white p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
      {/* Lijeva strana: Badges, Naziv, Kanton i Dugmad */}
      <div className="flex-1 space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="bg-slate-800 text-xs px-2.5 py-1 rounded-full font-medium">
            Općina / grad
          </span>
          <span className="bg-slate-800 text-xs px-2.5 py-1 rounded-full font-medium">
            {municipality.entity || 'FBiH'}
          </span>
          <span className="bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-full font-medium">
            Aktivno
          </span>
          <span className="bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-full font-medium">
            Verified domain
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-blue-400">
          {municipality.name}
        </h1>
        <p className="text-sm text-slate-400">
          {municipality.canton ||
            municipality.cantonShort ||
            'Zeničko-dobojski kanton (ZDK)'}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          {safeHttpsUrl(officialUrl) && (
            <Button
              asChild
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <a
                href={safeHttpsUrl(officialUrl)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
                Otvori službeni website
              </a>
            </Button>
          )}

          {safeHttpsUrl(municipality.officialUrl) &&
            municipality.officialUrl !== officialUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-slate-700 hover:bg-slate-800 text-slate-300"
              >
                <a
                  href={safeHttpsUrl(municipality.officialUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
                  Stranica s obrascima
                </a>
              </Button>
            )}
        </div>

        {municipality.notice && (
          <p className="max-w-3xl text-sm text-slate-300/90 break-words">
            {municipality.notice}
          </p>
        )}
      </div>

      {/* Desna strana: Grb općine unutar bijelog okvira */}
      <div className="bg-white p-3 rounded-xl shadow-lg flex-shrink-0 flex items-center justify-center w-32 h-32 md:w-36 md:h-36">
        <MunicipalityCrest name={municipality.name} size={120} showFallback />
      </div>
    </div>
  );
}

// Re-export za kompatibilnost ako se importuje kao { MunicipalityHeader }
export { MunicipalityHeader };
