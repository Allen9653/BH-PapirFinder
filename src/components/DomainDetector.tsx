import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Globe,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Shield,
  ExternalLink,
  Loader2,
  ChevronDown,
  ChevronUp,
  Zap,
  Tag,
  BadgeCheck,
} from 'lucide-react';
import {
  detectMunicipalityDomain,
  DomainDetectionResult,
  DomainCheckResult,
  getRankBadgeColor,
  getRankDescription,
} from '@/lib/domain-detector';
import { findVerifiedDomain } from '@/data/verified-domains';

interface DomainDetectorProps {
  municipalityName: string;
  onUrlFound?: (url: string) => void;
  compact?: boolean;
}

const ALLOWED_HOSTS: string[] = []; // ACTION REQUIRED: Add your allowed hosts before merging

function isSafeExternalUrl(url: string, allowedHosts: string[]): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(String(url).replace(/[\t\n\r]/g, ''));
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    return allowedHosts.some(function (h) {
      return parsed.hostname === h || parsed.hostname.endsWith('.' + h);
    });
  } catch (e) {
    return false;
  }
}

const DomainDetector = ({ municipalityName, onUrlFound, compact = false }: DomainDetectorProps) => {
  const [result, setResult] = useState<DomainDetectionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState('');

  // Check if we have verified data immediately (no network needed)
  const verifiedData = findVerifiedDomain(municipalityName);

  const handleDetect = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const detection = await detectMunicipalityDomain(municipalityName, {
        maxConcurrent: 4,
        timeoutMs: 8000,
        scanKeywords: true,
      });
      setResult(detection);

      if (detection.bestUrl && onUrlFound) {
        onUrlFound(detection.bestUrl);
      }
    } catch (err) {
      console.error('Domain detection error:', err);
      setError('Greška pri detekciji domena. Pokušajte ponovo.');
    } finally {
      setLoading(false);
    }
  };

  const renderResultRow = (check: DomainCheckResult, index: number) => (
    <div
      key={index}
      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
        check.isActive
          ? check.isVerified
            ? 'bg-purple-50 border-purple-200 hover:bg-purple-100'
            : 'bg-green-50 border-green-200 hover:bg-green-100'
          : 'bg-gray-50 border-gray-200 opacity-60'
      }`}
    >
      {/* Status icon */}
      <div className="flex-shrink-0">
        {check.isVerified && check.isActive ? (
          <BadgeCheck className="h-5 w-5 text-purple-600" />
        ) : check.isActive ? (
          <CheckCircle2 className="h-5 w-5 text-green-600" />
        ) : (
          <XCircle className="h-5 w-5 text-gray-400" />
        )}
      </div>

      {/* URL and details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-sm truncate max-w-[300px]" title={check.url}>
            {check.url}
          </span>
          <Badge className={`text-xs ${getRankBadgeColor(check.rank)}`}>
            {check.isVerified ? '✓ Verificiran' : `Rank ${check.rank}`}
          </Badge>
          {check.hasPriorityPath && (
            <Badge variant="outline" className="text-xs border-amber-400 text-amber-700">
              <Tag className="h-3 w-3 mr-1" />
              Prioritet
            </Badge>
          )}
        </div>

        {/* Matched keywords */}
        {check.hasOfficialKeywords && check.matchedKeywords.length > 0 && (
          <div className="flex items-center gap-1 mt-1 flex-wrap">
            <Shield className="h-3 w-3 text-green-600" />
            <span className="text-xs text-green-700">
              Ključne riječi: {check.matchedKeywords.slice(0, 3).join(', ')}
              {check.matchedKeywords.length > 3 && ` +${check.matchedKeywords.length - 3}`}
            </span>
          </div>
        )}

        {/* Error for inactive */}
        {!check.isActive && check.error && (
          <span className="text-xs text-gray-400 mt-1 block">{check.error}</span>
        )}
      </div>

      {/* Response time */}
      <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
        <Clock className="h-3 w-3" />
        {check.responseTimeMs}ms
      </div>

      {/* Visit button */}
      {check.isActive && (
        <Button
          size="sm"
          variant="ghost"
          className="flex-shrink-0 text-green-700 hover:text-green-900 hover:bg-green-100"
          onClick={() => {
            if (isSafeExternalUrl(check.url, ALLOWED_HOSTS)) {
              window.open(check.url, '_blank', 'noopener,noreferrer');
            }
          }}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      )}
    </div>
  );

  // Compact mode
  if (compact) {
    return (
      <div className="space-y-2">
        {/* Show verified data immediately */}
        {verifiedData && verifiedData.status === 'active' && (
          <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg border border-purple-200">
            <BadgeCheck className="h-4 w-4 text-purple-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-purple-700">Verificiran:</span>
              <a
                href={verifiedData.e_government_link || `https://${verifiedData.official_domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-800 hover:underline font-medium block truncate"
              >
                {verifiedData.official_domain}
              </a>
            </div>
          </div>
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={handleDetect}
          disabled={loading}
          className="border-[#003D7A] text-[#003D7A] hover:bg-[#003D7A] hover:text-white"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Provjera...
            </>
          ) : (
            <>
              <Globe className="h-4 w-4 mr-2" />
              Detektuj sve domene
            </>
          )}
        </Button>

        {result && result.bestUrl && !verifiedData && (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <a
              href={result.bestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#003D7A] hover:underline font-medium truncate"
            >
              {result.bestUrl}
            </a>
          </div>
        )}

        {result && !result.bestUrl && !verifiedData && (
          <span className="text-sm text-gray-500">Nijedan aktivan domen nije pronađen</span>
        )}
      </div>
    );
  }

  // Full mode
  return (
    <Card className="border-[#003D7A]/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-[#003D7A] flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Detekcija domena: {municipalityName}
        </CardTitle>
        <CardDescription>
          Automatska provjera dostupnosti službenih web stranica
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Verified data banner */}
        {verifiedData && verifiedData.status === 'active' && (
          <Alert className="bg-purple-50 border-purple-300">
            <AlertDescription>
              <div className="flex items-start gap-3">
                <BadgeCheck className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-purple-800 mb-1">Verificirani podaci:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-purple-600">Službeni domen:</span>{' '}
                      <a
                        href={`https://${verifiedData.official_domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-800 font-mono hover:underline"
                      >
                        {verifiedData.official_domain}
                      </a>
                    </div>
                    {verifiedData.alternative_domain && (
                      <div>
                        <span className="text-purple-600">Alternativni:</span>{' '}
                        <a
                          href={`https://${verifiedData.alternative_domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-800 font-mono hover:underline"
                        >
                          {verifiedData.alternative_domain}
                        </a>
                      </div>
                    )}
                    <div className="sm:col-span-2">
                      <span className="text-purple-600">E-uprava:</span>{' '}
                      <a
                        href={verifiedData.e_government_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-800 font-mono hover:underline"
                      >
                        {verifiedData.e_government_link}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Trigger button */}
        {!result && !loading && (
          <Button
            onClick={handleDetect}
            className="bg-[#003D7A] hover:bg-[#002A5A]"
          >
            <Search className="h-4 w-4 mr-2" />
            Pokreni detekciju svih domena
          </Button>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-3 py-4">
            <Loader2 className="h-6 w-6 animate-spin text-[#003D7A]" />
            <div>
              <p className="font-medium text-gray-700">Provjeravam domene...</p>
              <p className="text-sm text-gray-500">
                Testiram verificirane, .gov.ba, .ba, subdomene i ostale varijacije
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-blue-700">{result.totalChecked}</p>
                <p className="text-xs text-blue-600">Provjereno</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-700">{result.totalActive}</p>
                <p className="text-xs text-green-600">Aktivnih</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-purple-700">
                  {result.allResults.filter(r => r.isVerified && r.isActive).length}
                </p>
                <p className="text-xs text-purple-600">Verificiranih</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-amber-700">
                  {result.allResults.filter(r => r.hasOfficialKeywords).length}
                </p>
                <p className="text-xs text-amber-600">Sa ključnim riječima</p>
              </div>
            </div>

            {/* Best URL */}
            {result.bestUrl ? (
              <Alert className="bg-green-50 border-green-300">
                <AlertDescription className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-800">Najbolji rezultat:</p>
                      <a
                        href={result.bestUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-700 hover:underline font-mono text-sm break-all"
                      >
                        {result.bestUrl}
                      </a>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => window.open(result.bestUrl!, '_blank', 'noopener,noreferrer')}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Posjeti
                  </Button>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-amber-50 border-amber-300">
                <AlertDescription className="text-amber-800">
                  Nijedan aktivan domen nije pronađen za &quot;{municipalityName}&quot;.
                  Moguće je da stranica koristi nestandardni domen.
                </AlertDescription>
              </Alert>
            )}

            {/* Rank legend */}
            <div className="flex flex-wrap gap-2 text-xs">
              {[0, 1, 2, 3, 4].map(rank => (
                <span key={rank} className="flex items-center gap-1">
                  <span className={`inline-block w-3 h-3 rounded ${getRankBadgeColor(rank)}`} />
                  {getRankDescription(rank)}
                </span>
              ))}
            </div>

            {/* Active results */}
            {result.totalActive > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700 text-sm">
                  Aktivni domeni ({result.totalActive}):
                </h4>
                {result.allResults
                  .filter(r => r.isActive)
                  .map((check, idx) => renderResultRow(check, idx))}
              </div>
            )}

            {/* Show all toggle */}
            {result.totalChecked > result.totalActive && (
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAll(!showAll)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showAll ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Sakrij neaktivne ({result.totalChecked - result.totalActive})
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Prikaži sve ({result.totalChecked - result.totalActive} neaktivnih)
                    </>
                  )}
                </Button>

                {showAll && (
                  <div className="space-y-2 mt-2">
                    {result.allResults
                      .filter(r => !r.isActive)
                      .map((check, idx) => renderResultRow(check, idx))}
                  </div>
                )}
              </div>
            )}

            {/* Re-run button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleDetect}
              disabled={loading}
              className="border-[#003D7A] text-[#003D7A]"
            >
              <Search className="h-4 w-4 mr-2" />
              Ponovi provjeru
            </Button>

            {/* Timestamp */}
            <p className="text-xs text-gray-400">
              Provjereno: {new Date(result.checkedAt).toLocaleString('bs-BA')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DomainDetector;