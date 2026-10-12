-- Uklanjanje duplikata u public.institucije (pokreće korisnik u Supabase SQL Editoru).
-- Normalizacija: mala slova, bez kvačica, bez prefiksa Općina/Opština/Grad/Kanton/Županija.
-- Briše SAMO zapis bez validnog https official_url koji ima par s validnim URL-om; dokumenti se prvo prebacuju.
-- Stanje 2026-10-11: 128 redova, 0 zapisa s praznim/nevažećim official_url.
-- Pronađene 3 grupe istog normalizovanog naziva: Zenica/Grad Zenica (stvarni duplikat, oba s validnim URL-om),
-- Novi Grad (KS) / Novi Grad (RS) i Grad Sarajevo / Kanton Sarajevo (različite institucije, ne diraju se).

-- 1) Pregled prije izmjena
WITH n AS (
  SELECT id, naziv, slug, official_url,
         regexp_replace(lower(translate(naziv, 'ČĆŽŠĐčćžšđ', 'CCZSDcczsd')), '^(opcina|opstina|grad|kanton|zupanija)\s+', '') AS norm,
         (official_url ~* '^https://[^/\s]+\.[^/\s]+') AS valid
  FROM public.institucije
)
SELECT n.*, (SELECT count(*) FROM public.dokumenti d WHERE d.institucija_id = n.id) AS dokumenti
FROM n WHERE norm IN (SELECT norm FROM n GROUP BY norm HAVING count(*) > 1)
ORDER BY norm, valid DESC;

-- 2) Spajanje (transakcija)
BEGIN;
CREATE TEMP TABLE _dedupe ON COMMIT DROP AS
WITH n AS (
  SELECT id, created_at,
         regexp_replace(lower(translate(naziv, 'ČĆŽŠĐčćžšđ', 'CCZSDcczsd')), '^(opcina|opstina|grad|kanton|zupanija)\s+', '') AS norm,
         (official_url ~* '^https://[^/\s]+\.[^/\s]+') AS valid
  FROM public.institucije
), keep AS (
  SELECT DISTINCT ON (norm) norm, id AS keep_id FROM n WHERE valid ORDER BY norm, created_at
)
SELECT n.id AS drop_id, k.keep_id FROM n JOIN keep k USING (norm) WHERE NOT n.valid AND n.id <> k.keep_id;

UPDATE public.dokumenti d SET institucija_id = x.keep_id FROM _dedupe x WHERE d.institucija_id = x.drop_id;
DELETE FROM public.institucije i USING _dedupe x WHERE i.id = x.drop_id;
SELECT count(*) AS obrisano FROM _dedupe;
COMMIT;

-- 3) Opcionalno: Zenica ima dva zapisa s validnim URL-om (zdk-zenica i grad-zenica), oba bez dokumenata.
-- Ako želite jedan zapis, otkomentarišite:
-- BEGIN;
-- UPDATE public.dokumenti SET institucija_id = (SELECT id FROM public.institucije WHERE slug = 'grad-zenica')
--   WHERE institucija_id = (SELECT id FROM public.institucije WHERE slug = 'zdk-zenica');
-- DELETE FROM public.institucije WHERE slug = 'zdk-zenica';
-- COMMIT;
