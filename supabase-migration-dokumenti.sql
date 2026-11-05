-- ============================================================
-- BH PapirFinder — Database Migration: Documents & Translations
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. Tabela za institucije (općine, gradovi, kantoni)
CREATE TABLE IF NOT EXISTS institucije (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    naziv VARCHAR(255) NOT NULL,           -- npr. "Općina Olovo", "Grad Gračanica"
    slug VARCHAR(100) UNIQUE NOT NULL,     -- npr. "olovo", "gracanica"
    kanton VARCHAR(150),                   -- npr. "Zeničko-dobojski kanton"
    kanton_kratko VARCHAR(10),             -- npr. "ZDK"
    entitet VARCHAR(50),                   -- npr. "Federacija BiH", "Republika Srpska"
    official_url TEXT,                     -- Službena web stranica
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Tabela za dokumente/formulare
CREATE TABLE IF NOT EXISTS dokumenti (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    institucija_id UUID REFERENCES institucije(id) ON DELETE CASCADE,
    naziv_original VARCHAR(255) NOT NULL,  -- Originalni naziv dokumenta (BHS Latin)
    opis_original TEXT,                    -- Opis dokumenta (BHS Latin)
    kategorija VARCHAR(100),               -- npr. Graditeljstvo, Poreska, Izvodi
    file_url TEXT NOT NULL,                -- Izvorno mjesto dokumenta na sajtu opštine
    storage_path TEXT,                     -- Ako odlučiš da keširaš fajl u svoj Supabase Storage
    velicina_kb INTEGER,                   -- Veličina fajla u KB
    keywords TEXT,                         -- Ključne riječi za brzu pretragu (comma-separated)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Tabela za prevode (da ne opterećujemo glavnu tabelu)
CREATE TABLE IF NOT EXISTS dokumenti_prevodi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    dokument_id UUID REFERENCES dokumenti(id) ON DELETE CASCADE,
    jezik VARCHAR(10) NOT NULL,            -- 'en', 'de', 'tr', 'bs_cyr'
    naziv_preveden VARCHAR(255) NOT NULL,
    opis_preveden TEXT,
    UNIQUE(dokument_id, jezik)
);

-- ============================================================
-- Indexes for performance
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_dokumenti_institucija ON dokumenti(institucija_id);
CREATE INDEX IF NOT EXISTS idx_dokumenti_kategorija ON dokumenti(kategorija);
CREATE INDEX IF NOT EXISTS idx_dokumenti_keywords ON dokumenti USING gin(to_tsvector('simple', COALESCE(keywords, '')));
CREATE INDEX IF NOT EXISTS idx_dokumenti_prevodi_dokument ON dokumenti_prevodi(dokument_id);
CREATE INDEX IF NOT EXISTS idx_dokumenti_prevodi_jezik ON dokumenti_prevodi(jezik);
CREATE INDEX IF NOT EXISTS idx_institucije_slug ON institucije(slug);

-- ============================================================
-- Row Level Security (RLS) — Public read, authenticated write
-- ============================================================

ALTER TABLE institucije ENABLE ROW LEVEL SECURITY;
ALTER TABLE dokumenti ENABLE ROW LEVEL SECURITY;
ALTER TABLE dokumenti_prevodi ENABLE ROW LEVEL SECURITY;

-- Public can read all institutions and documents
CREATE POLICY "Public read institucije" ON institucije
    FOR SELECT USING (true);

CREATE POLICY "Public read dokumenti" ON dokumenti
    FOR SELECT USING (true);

CREATE POLICY "Public read dokumenti_prevodi" ON dokumenti_prevodi
    FOR SELECT USING (true);

-- Only authenticated users can insert/update/delete
CREATE POLICY "Auth insert institucije" ON institucije
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth update institucije" ON institucije
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth delete institucije" ON institucije
    FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert dokumenti" ON dokumenti
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth update dokumenti" ON dokumenti
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth delete dokumenti" ON dokumenti
    FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert dokumenti_prevodi" ON dokumenti_prevodi
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth update dokumenti_prevodi" ON dokumenti_prevodi
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth delete dokumenti_prevodi" ON dokumenti_prevodi
    FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================================
-- Seed data: Insert existing municipalities
-- ============================================================

INSERT INTO institucije (naziv, slug, kanton, kanton_kratko, entitet, official_url)
VALUES
    ('Općina Olovo', 'olovo', 'Zeničko-dobojski kanton', 'ZDK', 'Federacija BiH', 'https://olovo.gov.ba/?lsvrdocumentcat=elektronski-formulari'),
    ('Grad Gračanica', 'gracanica', 'Tuzlanski kanton', 'TK', 'Federacija BiH', 'https://gracanica.gov.ba/dokumenti/e-obrasci/')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Migration for existing tables: Add keywords column if missing
-- ============================================================

-- Run this if you already have the dokumenti table without keywords:
-- ALTER TABLE dokumenti ADD COLUMN IF NOT EXISTS keywords TEXT;