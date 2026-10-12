// IP Registration Service
// Tracks registration IP addresses for security and allows signups from different IPs
import { supabase } from './supabaseClient';

export interface RegistrationRecord {
  email: string;
  ipAddress: string;
  userAgent: string;
  registeredAt: string;
  country?: string;
  city?: string;
}

const REGISTRATION_IPS_KEY = 'bh_papirfinder_registration_ips';

/**
 * Get the user's current public IP address
 */
export async function getUserIP(): Promise<string> {
  try {
    // Use a free IP detection service
    const response = await fetch('https://api.ipify.org?format=json', {
      signal: AbortSignal.timeout(5000),
    });
    if (response.ok) {
      const data = await response.json();
      return data.ip || 'unknown';
    }
  } catch {
    // Try alternative service
    try {
      const response = await fetch('https://ipinfo.io/json', {
        signal: AbortSignal.timeout(5000),
      });
      if (response.ok) {
        const data = await response.json();
        return data.ip || 'unknown';
      }
    } catch {
      // Silent fail
    }
  }
  return 'unknown';
}

/**
 * Get IP geolocation info (country, city)
 */
export async function getIPGeolocation(ip: string): Promise<{ country?: string; city?: string }> {
  if (!ip || ip === 'unknown') return {};

  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`, {
      signal: AbortSignal.timeout(5000),
    });
    if (response.ok) {
      const data = await response.json();
      return {
        country: data.country || undefined,
        city: data.city || undefined,
      };
    }
  } catch {
    // Silent fail
  }
  return {};
}

/**
 * Record a registration with IP information
 * This allows tracking signups from different IPs for security
 */
export async function recordRegistrationIP(email: string): Promise<RegistrationRecord> {
  const ip = await getUserIP();
  const geo = await getIPGeolocation(ip);

  const record: RegistrationRecord = {
    email,
    ipAddress: ip,
    userAgent: navigator.userAgent,
    registeredAt: new Date().toISOString(),
    country: geo.country,
    city: geo.city,
  };

  // Store locally
  try {
    const existing = JSON.parse(localStorage.getItem(REGISTRATION_IPS_KEY) || '[]');
    existing.push(record);
    localStorage.setItem(REGISTRATION_IPS_KEY, JSON.stringify(existing.slice(-50)));
  } catch {
    // ignore
  }

  // Sync to Supabase (non-blocking)
  try {
    await supabase.from('registration_logs').insert({
      email: record.email,
      ip_address: record.ipAddress,
      user_agent: record.userAgent,
      country: record.country || null,
      city: record.city || null,
      registered_at: record.registeredAt,
    });
  } catch {
    // Silent fail
  }

  return record;
}

/**
 * Check if an IP has been used for too many registrations (rate limiting)
 * Returns true if the IP is allowed to register
 */
export async function checkIPRegistrationLimit(maxPerDay: number = 5): Promise<{ allowed: boolean; reason?: string }> {
  const ip = await getUserIP();

  if (ip === 'unknown') {
    // Can't verify IP, allow registration
    return { allowed: true };
  }

  // Check local records first
  try {
    const existing: RegistrationRecord[] = JSON.parse(localStorage.getItem(REGISTRATION_IPS_KEY) || '[]');
    const today = new Date().toISOString().split('T')[0];
    const todayRegistrations = existing.filter(
      (r) => r.ipAddress === ip && r.registeredAt.startsWith(today)
    );

    if (todayRegistrations.length >= maxPerDay) {
      return {
        allowed: false,
        reason: 'Previše registracija sa ove IP adrese danas. Pokušajte ponovo sutra.',
      };
    }
  } catch {
    // ignore
  }

  // Also check Supabase if available
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from('registration_logs')
      .select('id')
      .eq('ip_address', ip)
      .gte('registered_at', today.toISOString());

    if (!error && data && data.length >= maxPerDay) {
      return {
        allowed: false,
        reason: 'Previše registracija sa ove IP adrese danas. Pokušajte ponovo sutra.',
      };
    }
  } catch {
    // Silent fail — allow registration if can't verify
  }

  return { allowed: true };
}

/**
 * Get registration history for admin view
 */
export function getLocalRegistrationHistory(): RegistrationRecord[] {
  try {
    return JSON.parse(localStorage.getItem(REGISTRATION_IPS_KEY) || '[]');
  } catch {
    return [];
  }
}