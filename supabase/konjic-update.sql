-- Konjic: update institution + add 4 service prospectuses (idempotent). Run in Supabase SQL Editor.
UPDATE public.institucije
SET official_url = 'https://www.konjic.ba/ba/uprava/opcinske-sluzbe/prospekti-sluzbi.html',
    status = 'Aktivno', stabilnost = 'Stabilno', access_method = 'Online obrasci'
WHERE slug = 'hnk-konjic';

INSERT INTO public.dokumenti (institucija_id, naziv_original, kategorija, file_url, file_type)
SELECT i.id, v.naziv, 'Urbanizam i građenje', v.url, 'html'
FROM public.institucije i
CROSS JOIN (VALUES
  ('Naknade u postupku izdavanja odobrenja za gradnju', 'https://www.konjic.ba/ba/uprava/opcinske-sluzbe/prospekti-sluzbi/283-naknade_za_dozvolu_za_gradnju_i_zone_konjic.html'),
  ('Odobrenje za građenje', 'https://www.konjic.ba/ba/uprava/opcinske-sluzbe/prospekti-sluzbi/284-odobrenje_za_gradnju.html'),
  ('Urbanistička suglasnost', 'https://www.konjic.ba/ba/uprava/opcinske-sluzbe/prospekti-sluzbi/287-urbanisticka_saglasnost.html'),
  ('Upotrebna dozvola', 'https://www.konjic.ba/ba/uprava/opcinske-sluzbe/prospekti-sluzbi/310-upotrebna_dozvola.html')
) AS v(naziv, url)
WHERE i.slug = 'hnk-konjic'
  AND NOT EXISTS (SELECT 1 FROM public.dokumenti d WHERE d.file_url = v.url);
