# Requirements & Progress

## Requirements Overview
Fix 8 critical blockers identified in BH PapirFinder v64 analysis:
1. Secret API keys exposed in .env file (security)
2. PayPal payment uses localStorage instead of Supabase (business logic)
3. No /form/:id page for preview/fill/share/print (core feature)
4. Dual auth system not synchronized (auth)
5. Olovo PDFs use HTTP URLs causing mixed content (data)
6. MunicipalityForms.tsx only supports Olovo (scalability)
7. Translation API rate limited without fallback (reliability)
8. SubscriptionGuard imports from non-existent file (build blocker)

## User Stories
- As a user, I want my payment to persist across devices (Blocker #2)
- As a user, I want to preview/download/share/print forms in-app (Blocker #3)
- As a user, I want my login to work reliably across sessions (Blocker #4)
- As a user, I want PDF previews to load on HTTPS sites (Blocker #5)
- As a user, I want to browse forms from any municipality (Blocker #6)
- As a user, I want translations to work even under heavy load (Blocker #7)

## Task Breakdown
- [x] Blocker #8: Create src/lib/subscription.ts (missing file, build blocker)
- [x] Blocker #1: Remove secret keys from .env, keep only VITE_ prefixed vars
- [x] Blocker #5: Fix HTTP→HTTPS for all Olovo PDF URLs
- [x] Blocker #7: Add rate limit handling and fallback to translation.ts
- [x] Blocker #3: Create FormDetail.tsx page + /form/:formId route
- [x] Blocker #6: Generalize MunicipalityForms.tsx for all municipalities
- [x] Blocker #2: Connect PayPal onApprove to Supabase transactions table
- [x] Blocker #4: Synchronize access-control.ts with Supabase Auth session
- [x] Integrate Gračanica municipality forms (57 forms, 2 categories captured)
- [x] Supabase tables: SQL migration for institucije, dokumenti, dokumenti_prevodi
- [x] Service: institucije-service.ts (CRUD for institutions)
- [x] Service: dokumenti-service.ts (CRUD for documents + translations)
- [x] MunicipalityForms.tsx updated to fetch from Supabase with static fallback
- [x] FormDetail.tsx updated to load translations from Supabase
- [x] AdminDocuments.tsx page for managing documents/translations + route added
- [x] Enhanced MunicipalityForms with document cards (Preview, Download, Share, Edit, Print, Translate)
- [x] MunicipalityForms uses naziv_original, opis_original, and keywords for instant search
- [x] FormDetail with iframe preview (file_url), navigator.share() for Viber/WhatsApp, tabs (Preview/Details/Translations)
- [x] Latin-to-Cyrillic converter (cyrillic-converter.ts) for BHS auto-conversion
- [x] SQL migration updated with keywords column for fast filtering
- [x] AI Batch Translation Service (ai-translation-service.ts)
- [x] Admin Batch Translate UI on AdminDocuments page
- [x] AI Form Filler Assistant component (FormFillerAssistant.tsx)
- [x] AI Form Guidance Service (ai-form-guide-service.ts)
- [x] Service Worker PDF Caching (sw.js update)
- [x] Offline Cache Utility (offline-cache.ts)
- [x] Offline Badge Integration on MunicipalityForms and FormDetail
- [x] Broken Link Reporting feature (ReportBrokenLink component + broken-link-service.ts)
- [x] Login status verification fix (Login.tsx checks user_profiles for actual payment status instead of defaulting to 'paid')
- [x] User feedback on reporting feature (star rating + comment after submission)
- [x] Admin email alerts when broken link is reported (Supabase Edge Function + fallback)
- [x] Usage analytics tracking for report feature (dialog opens, submissions, conversion rate)
- [x] AdminReports page with reports management, analytics dashboard, and email alert configuration
- [x] Notification preferences page (/notifications/preferences) with customizable report update settings
- [x] IP-based registration support (signup from different IPs with rate limiting for abuse prevention)
- [x] Centralizirani i18n: src/locales (bs, bs-Cyrl, en, de, tr) + fallback lanac bs -> en -> ključ
- [x] LanguageContext: instantni re-render, localStorage perzistencija, cross-tab sync, html lang
- [x] Automatska bs-Latn -> bs-Cyrl transliteracija sa zaštitom brendova, e-mailova i URL-ova
- [x] Migracija starog koda sr-Cyrl -> bs-Cyrl u svim stranicama, servisima i komponentama
- [x] Header, Footer i oba selektora jezika prebačeni na centralni t() i zajednički registar jezika
- [x] Responsive dorada headera (lg breakpoint, truncate, mobilni meni) i footera
- [x] Provjera builda: tsc --noEmit, pnpm run lint i pnpm run build prolaze
- [x] Bosanski postavljen kao siguran podrazumijevani jezik (bez auto-preuzimanja jezika uređaja)
- [x] Početna stranica potpuno prevedena: hero, kategorije, najtraženiji obrasci, prednosti, koraci i CTA
- [x] Dodani ključevi home.*, category.* i popular.* u sva četiri rječnika (bs, en, de, tr)

## Progress Log
- 2026-10-11: Generator hibridni model: Preuzmi PDF/Štampaj klijentski (pdf-lib + FreeSans, Blob/objectURL, bez mreže); Podijeli link/E-mail (mailto) preko Edge funkcije handle-temp-doc (upload/delete, bucket temp_documents, token hash, signed URL 5h, purge pri uploadu); Obriši odmah; obavezni checkbox saglasnosti; auto-delete-5h.sql proširen (temp_doc_sessions + bucket). Funkcija NIJE deployana (nema access tokena), SQL nije primijenjen.
- 2026-10-11: FOOTER txt integrisan (Privacy in-memory/5h, Terms disclaimer, Impressum puni naziv); FAQ 9 pitanja, JSON-LD iz istih podataka; doc-retention.ts briše localStorage dokumente >5h (load + 5 min), PDF signed URL 5h; supabase/auto-delete-5h.sql (pg_cron */5 + Storage API preko Vault ključa) NIJE primijenjen; SERVER_PURGE_ACTIVE=false dok korisnik ne pokrene SQL. Porezna tvrdnja preformulisana (aplikacija ne generiše JS3000/MIP-1023/GPD-1051).
- 2026-10-11: Novi footer (4 kolone + legal traka, JIB/MBS, kontakt, bh-assistant.ba HTTPS 200); nove rute /faq (FAQPage JSON-LD), /impressum, /cookies (localStorage + ga-disable), /zakoni (7 službenih izvora); Privacy prepisana s tačnim opisom brisanja (nema 5-satnog procesa: odjava + brisanje localStorage, trajno brisanje na zahtjev); Organization JSON-LD; sitemap +5 ruta; i18n 5 jezika.
- 2026-10-11: Dugme web stranice čita isključivo institucije.official_url (officialUrl + safeHttpsUrl, bez fallbacka); institucije 128 redova, 0 null URL-ova, 3 grupe istog normalizovanog naziva (1 stvarni duplikat: Zenica); supabase/dedupe-institucije.sql (BEGIN/COMMIT, prebacuje dokumente); frontend spaja duplikate.
- 2026-10-11: Generator integrisan po korisnikovom kodu (kartice s ikonama, bs/sr_cyr/hr, kopiraj/preuzmi/podijeli/štampaj, gen.* i18n) + link u headeru, CTA na početnoj, stavka u dashboard sidebaru. Web linkovi: getOfficialWebsite/safeHttpsUrl, prioritet institutions.website_url->base_url->institucije.official_url->registar->statički; HTTP provjera 142: ok 79, redirect 27, nepotvrđeno 36 (bez dugmeta); SQL ažurira obje tabele (155 UPDATE); window.open sa noopener.
- 2026-10-11: Web linkovi: HTTP provjera 141 unosa (ok 68, redirect 21, nije verificirano 52) -> src/data/website-verification.ts ima prednost u imeniku; kantoni dobili domene vlada; Kakanj https://kakanj.gov.ba; dugmad su <a target=_blank rel=noopener noreferrer>, bez praznog href (inst.websiteUnavailable u 4 rječnika + bs-Cyrl); izvještaj /workspace/reports/website-verification.md; SQL supabase/fix-official-websites.sql (nije pokrenut).
- 2026-10-11: Konjic: konjic-forms.ts (4 HTML prospekti, external) u registru, web https://konjic.ba/, forms URL prospekti-sluzbi u svim statičkim izvorima; /institucija/konjic; SQL za Supabase u supabase/konjic-update.sql (nije pokrenut).
- 2026-10-11: Supabase klijent: VITE_SUPABASE_URL/ANON_KEY (anon, ref zdvqjjmpxifbltihffas) uz fallback; neispravan anon ključ u .env zamijenjen važećim. Nema service_role ključa ni DB lozinke u src/.env/dist. text_document_templates i dalje 401 (42501) jer nedostaje GRANT SELECT za anon/authenticated -> korisnik pokreće GRANT.
- 2026-10-11: GeneratorPage.tsx nije postojao -> kreiran /generator + text-templates-service.ts (supabase.from('text_document_templates').select('*')); 5 šablona, kolone title_bs/sr/hr, form_fields, template_text{bs,sr,hr}. RLS policy SELECT postoji, ali anon/authenticated nemaju GRANT -> korisnik treba pokrenuti GRANT SELECT.
- 2026-10-11: Supabase sync: live institucije (129 rows, new cols status/stabilnost/access_method/is_foreign/brand_link) merged at runtime into institution directory (autocomplete + /institucija/:slug, slug alias lookup); static fallback kept; schema snapshot in supabase/schema-snapshot-2026-10-11.sql. DB password not injected into shell -> RLS tables (dokumenti, user_profiles, transactions) not inspectable. user_activity code table vs DB user_activity_logs mismatch; broken_link_reports table missing.
- 2026-10-05: Registration email bug: Supabase /signup returns 500 'Error sending confirmation email' (custom SMTP broken, mailer_autoconfirm=false). App no longer shows false success; shows error + Resend button; emailRedirectTo set; resend on success screen. SMTP fix pending in Supabase dashboard.
- 2026-10-05: Jedinstveni imenik institucija (institution-directory.ts) spaja registar, verified-domains, municipalities-database, institutions-database i korisničku bazu URL-ova (166 unosa); /institucija/:slug sa web linkom, statusom (Aktivno/Šalter/Neaktivno/Nije verificirano) i karticama obrazaca; autocomplete (latinica/ćirilica, bez kvačica, općina/opština) na početnoj i u pretrazi; inst.* ključevi u 5 jezika; tsc, lint i build prolaze.
- 2025-11-19: Initial project setup with git
- 2026-01-07: Core features implemented (search, PayPal, trial mode, municipality DB, footer, security)
- 2026-01-09: Auth fixes, JSON parsing bugs, localStorage cleanup
- 2026-01-30: Language context, access control, debugging, analytics, route fixes, cache busting
- 2026-02-05: Browser cache update
- 2026-02-16: Supabase project connected
- 2026-03-04: PayPal integration, admin features, GDPR, footer/legal pages, trust score search
- 2026-03-06: Project status review
- 2026-04-02: Supabase integration complete, register page updated
- 2026-04-05: Admin login, PWA manifest, Apple iOS meta tags
- 2026-05-07: Atoms Cloud backend enabled, admin dashboard enhancements, AI chatbot + PDF filler, dynamic localization, Olovo forms integration (71 forms)
- 2026-05-11: 8 critical blockers analysis document created
- 2026-06-03: All 8 critical blockers resolved — subscription.ts created, .env cleaned, HTTPS verified, translation rate limiting added, FormDetail page + route added, MunicipalityForms generalized via registry, PayPal→Supabase recording implemented, access-control synced with Supabase Auth
- 2026-06-04: Gračanica municipality integrated — 57 forms across 2 categories (Služba za civilnu zaštitu: 4 forms, Služba za upravu: 53 forms) added to municipality registry. Total forms now: 128 (71 Olovo + 57 Gračanica)
- 2026-06-11: Supabase dokumenti integration complete — 3 tables (institucije, dokumenti, dokumenti_prevodi) with SQL migration, service layers, MunicipalityForms/FormDetail updated with Supabase+fallback, AdminDocuments page for CRUD + translations management
- 2026-06-11: AI features complete — Batch Translation Service with progress UI on AdminDocuments, FormFillerAssistant modal with step-by-step guidance, Service Worker PDF caching with offline-cache utility, offline badge on FormDetail page. Build passes.
- 2026-07-28: Major overhaul — Registration fix (removed hCaptcha blocker, lowered password to 8 chars, graceful Database error handling), GA4 event tracking (ga4-tracking.ts), User activity tracking (user-activity.ts), Subscription expiry notifications (subscription-notifications.ts + SubscriptionExpiryBanner), Profile page (/profile) with edit name/password/activity, Modernized UI (Index.tsx redesign with category filters, popular forms, municipality browser), Header modernized with profile link. Build passes.
- 2026-07-28: e-Citizen Hub / Korisnički Panel — Complete dashboard at /dashboard with: DashboardLayout (sidebar desktop + drawer mobile), SidebarNav, LanguageTransliterationSelector (5 languages real-time), DashboardHome (quick stats, search, AI assistant link, recent activity), SavedDocumentsTable (Supabase + localStorage fallback, preview/download/delete), SmartDocumentStudio (transliteration Lat↔Ćir + translation to EN/DE/TR with progress bar), Settings section (profile edit, default municipality, password change), Notifications section (expiry warnings). GA4 events integrated for studio actions. Build passes.
- 2026-07-28: e-Citizen Hub v2 — Expanded with: institutions-database.ts (IDDEEA, UIO BiH, MCP BiH, SPS BiH, PUFBiH, PURS, FZ PIO, Vlada BD, Policija BD, FIA, APIF, Katastar FBiH — 13 institutions, 40+ forms), search-normalization.ts (diacritics removal + synonym/alias mapping for CIPS/porez/firma/penzija/katastar/etc.), TranslatedPdfViewer.tsx (multi-language PDF preview with Google Docs viewer + HTTPS enforcement), locales/index.ts (full i18n for dashboard in bs/sr-Cyrl/en/de/tr — 80+ keys each), Dashboard instant institution search with live results, Header updated with "Moj panel" link to /dashboard. Render Grade: 5/5. Build passes.
- 2026-07-28: Freemium & e-Citizen PRO pretplatnički model — Full subscription.ts rewrite (Supabase user_profiles integration, tier calculation paid/trial/free, feature gating with FREE_TIER_LIMITS ai_assistant:1 + smart_studio:1, trackFeatureUsage with RPC increment_usage + localStorage fallback, activateProSubscription). UI components: SubscriptionBadge.tsx (green PRO/amber trial/blue upgrade button in Header), UpgradeModal.tsx (comparison Free vs PRO 9.90 KM/mj, dynamic trigger reasons, payment simulation + instant activation), CheckoutButton.tsx (payment flow with GA4 tracking). SmartDocumentStudio updated with feature gating (checks access before transliterate/translate, shows usage badge, triggers UpgradeModal on limit). Dashboard AI Assistant card with feature gating badge and limit enforcement. Build passes.
- 2026-07-28: SEO Optimization Complete — 10 high-quality markdown blog articles generated in /workspace/shadcn-ui/blog/ covering: Core Features (PWA, AI Assistant, Smart Document Studio, Multilingual Support), Use Cases (Lična karta/Pasoš, CIPS/Matični ured, Registracija obrta/firme, Nostrifikacija diplome), Municipality Guides (Olovo 71 forms, Gračanica 57 forms), Institution Guides (IDDEEA). Also: robots.txt updated with blog Allow + Sitemap reference, sitemap.xml created with 21 URLs (homepage, blog pages, search, municipalities, registration, legal). All content in Bosnian (bs) targeting BiH citizens and diaspora keywords.
- 2026-10-12: Ažurirana regija SARAJEVSKA, BPK Goražde, Istočno Sarajevo, Foča/Drina i Sarajevsko-Romanijska (25 opština/gradova sa direktnim e-uprava linkovima, zvaničnim domenima i obrascima). Kreiran sarajevo-region-forms.ts i ažurirani verified-domains.ts, website-verification.ts, uploaded-institutions.ts i municipality-registry.ts.
- 2026-10-12: Umjesto screenshot/sponzor sekcije kreiran interaktivni InstitutionNewsCarousel sa prvih 5 članaka iz institucija BiH (IDDEEA, Porezna uprava FBiH, ADS BiH, Poreska uprava RS, Kanton Sarajevo/Općine KS) uz filtere, autoplay, modalni čitač vijesti i dijeljenje.
- 2026-10-12: Definisana i kreirana Freemium (0 KM) i Premium ponuda (Građanski PRO 9.90 KM/mj, Dijaspora VIP 19.90 KM/mj, Poslovni PRO 39.90 KM/mj) sa billing switcherom, uporednom matricom, kalkulatorom uštede i PayPal/instant aktivacijom. Build i lint prolaze bez grešaka.
