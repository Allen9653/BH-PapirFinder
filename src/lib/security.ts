/**
 * Security utilities for BH PapirFinder / Papir-Finder.com
 * Provides URL sanitization, safe external link opening, origin validation,
 * and protection against XSS and open redirect vulnerabilities.
 */

// Allowed URI protocols
const ALLOWED_PROTOCOLS = ['https:', 'http:'];

/**
 * Validates and sanitizes an external URL.
 * Only allows HTTP and HTTPS protocols. Rejects javascript:, data:, file:, etc.
 */
export function sanitizeExternalUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    // If it's a relative URL within the same origin, allow it
    if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
      return trimmed;
    }

    const parsed = new URL(trimmed, window.location.origin);
    if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) {
      console.warn(`[Security] Blocked unsafe URL protocol: ${parsed.protocol}`);
      return null;
    }

    // Strip forbidden characters or control codes
    return parsed.href;
  } catch {
    console.warn(`[Security] Invalid URL format rejected: ${trimmed.slice(0, 50)}`);
    return null;
  }
}

/**
 * Safely opens an external URL in a new browser tab with rel="noopener noreferrer"
 * preventing reverse tab-nabbing and protocol-based XSS attacks.
 */
export function safeOpenExternal(url: string | null | undefined, target: string = '_blank'): boolean {
  const safeUrl = sanitizeExternalUrl(url);
  if (!safeUrl) return false;

  const newWindow = window.open(safeUrl, target, 'noopener,noreferrer');
  if (newWindow) {
    newWindow.opener = null;
    return true;
  }
  return false;
}

/**
 * Validates that an origin or host is recognized as legitimate
 */
export function isAllowedHost(hostname: string): boolean {
  const allowedHosts = [
    'papir-finder.com',
    'www.papir-finder.com',
    'bh-papirfinder.ba',
    'www.bh-papirfinder.ba',
    'bhpapirfinder.ba',
    'www.bhpapirfinder.ba',
    'localhost',
    '127.0.0.1',
  ];

  const lower = hostname.toLowerCase();

  // Direct match
  if (allowedHosts.includes(lower)) return true;

  // Vercel deployment and preview URLs (*.vercel.app)
  if (lower.endsWith('.vercel.app')) return true;

  // Google Cloud preview run URLs
  if (lower.endsWith('.run.app')) return true;

  // Same host as current window
  if (typeof window !== 'undefined' && lower === window.location.hostname.toLowerCase()) {
    return true;
  }

  return false;
}

/**
 * Sanitize text to prevent HTML injection in dynamic titles or logs
 */
export function sanitizeText(input: string | null | undefined, maxLength: number = 500): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}
