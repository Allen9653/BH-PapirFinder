import { useEffect, useState } from 'react';
import {
  crestFileName,
  crestExists,
  getMunicipalityCrestUrl,
} from '@/lib/municipality-crests';

export interface MunicipalityCrestProps {
  /** Naziv opštine/grada, npr. "Bosanska Krupa", "Zenica", "Opština Mrkonjić Grad" */
  name: string;
  /** Širina slike u px (default 48) */
  size?: number;
  className?: string;
  /** Alt tekst (default je naziv) */
  alt?: string;
  /** Da li prikazati placeholder kad slika ne postoji (default true) */
  showFallback?: boolean;
}

function InitialsFallback({ name, size }: { name: string; size: number }) {
  const initials = name
    .trim()
    .replace(/^(grad|opština|opcina|opstina|municipality|city)\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <span
      aria-hidden="true"
      title={`Grb nije dostupan za: ${name}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.4),
      }}
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground font-semibold select-none"
    >
      {initials || '?'}
    </span>
  );
}

export default function MunicipalityCrest({
  name,
  size = 48,
  className = '',
  alt,
  showFallback = true,
}: MunicipalityCrestProps) {
  const [error, setError] = useState(false);
  const [exists, setExists] = useState<boolean | null>(null);

  const src = getMunicipalityCrestUrl(name);

  useEffect(() => {
    let cancelled = false;
    setError(false);
    setExists(null);

    crestExists(name).then((ok) => {
      if (!cancelled) setExists(ok);
    });

    return () => {
      cancelled = true;
    };
  }, [name]);

  if (!src || exists === false) {
    return showFallback ? <InitialsFallback name={name} size={size} /> : null;
  }

  // Držimo layout stabilnim dok čekamo HEAD provjeru (samo ako je poznato da ne postoji fallback)
  if (exists === null) {
    return showFallback ? <InitialsFallback name={name} size={size} /> : null;
  }

  if (error) {
    return showFallback ? <InitialsFallback name={name} size={size} /> : null;
  }

  return (
    <img
      src={src}
      alt={alt ?? `Grb: ${name}`}
      title={name}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setError(true)}
      style={{ width: size, height: size }}
      className={`shrink-0 rounded-full object-contain bg-background ${className}`}
    />
  );
}

// Re-export helper for convenience
export { crestFileName };
