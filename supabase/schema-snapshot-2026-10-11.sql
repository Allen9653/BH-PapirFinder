-- Snapshot of live Supabase schema (zdvqjjmpxifbltihffas), captured 2026-10-11 via REST (anon role).
-- Read-only reference; do NOT run against production. Columns of RLS-protected tables could not be read.
CREATE TABLE IF NOT EXISTS public.institucije (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  naziv text NOT NULL,
  slug text UNIQUE NOT NULL,
  kanton text,
  kanton_kratko text,          -- KS, TK, ZDK, ... ENTITET, DRZAVA, BD
  entitet text,                -- FBiH, RS, BD, BiH
  official_url text,
  created_at timestamptz DEFAULT now(),
  status text,                 -- NEW: e.g. 'Aktivno'
  stabilnost text,             -- NEW: e.g. 'Stabilno'
  access_method text,          -- NEW: e.g. 'Online obrasci'
  is_foreign boolean,          -- NEW
  brand_link text              -- NEW: e.g. https://bh-assistant.ba
);
-- Rows: 129 (FBiH 75, RS 46, BD 4, BiH 3, null 1)
-- dokumenti_prevodi: exists, readable, 0 rows
-- RLS-protected (anon denied): dokumenti, user_profiles, transactions, user_activity_logs, registration_logs, weekly_stats_report (view)
-- Not found: broken_link_reports, reports, user_activity, registration_ips
