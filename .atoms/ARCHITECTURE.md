# Architecture Design

## System Overview
BH PapirFinder is a React SPA (PWA) with Supabase backend. The frontend handles search, form display, subscription management, and multilingual UI. Supabase provides auth, database (PostgreSQL), and file storage. PayPal SDK handles payments client-side. The app uses a trust-score-based search system across 143+ BiH municipalities.

## Tech Stack
- Frontend: React 18 + TypeScript + Vite
- UI: shadcn/ui + Tailwind CSS + Radix UI primitives
- State: React Context API (Language, Auth)
- Routing: React Router v6
- Backend: Supabase (Auth, PostgreSQL, Storage)
- Payments: PayPal JavaScript SDK
- PWA: Service Worker + Web App Manifest
- Translation: MyMemory API (free tier)
- PDF: pdf-lib for form filling
- Search: Custom enhanced search with transliteration support

## Module Design
| Module | Responsibility | Key Files |
|--------|---------------|-----------|
| Search | Municipality/form search with trust scores | src/lib/municipalities-database-enhanced.ts, src/pages/SearchResults.tsx |
| Auth | User registration, login, session management | src/lib/trial.ts, src/lib/auth.ts, src/lib/supabaseClient.ts |
| Subscription | Trial/paid plan management, PayPal checkout | src/pages/Subscription.tsx, src/lib/payment.ts |
| Access Control | Gate features based on subscription status | src/lib/access-control.ts |
| Forms Database | Municipality form data and display | src/data/olovo-forms.ts, src/pages/MunicipalityForms.tsx |
| Translation | Multilingual support (BS/EN/DE/TR) | src/lib/translation.ts, src/lib/translation-cache.ts, src/contexts/LanguageContext.tsx |
| AI Chatbot | Form filling assistance via chat | src/components/AIChatbot.tsx, src/lib/chatbot-service.ts, src/lib/pdf-form-filler.ts |
| Admin | Dashboard, user management, analytics | src/pages/Admin.tsx, src/pages/AdminDashboard.tsx |
| Domain Detection | Verify institution URLs | src/lib/domain-detector.ts, src/data/verified-domains.ts |
| PWA | Offline support, installability | public/manifest.json, public/sw.js |

## Tech Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Auth provider | Supabase Auth + localStorage fallback | Supabase for persistence, localStorage for backward compat |
| Payment | PayPal SDK (client-side) | Most accessible payment method in BiH |
| Search | Client-side enhanced search | No server round-trip, instant results |
| Forms data | Static TypeScript files | Fast loading, no API dependency for form metadata |
| Translation | MyMemory free API | No API key required, sufficient for MVP |
| PDF preview | Google Docs Viewer embed | Free, handles most PDF formats |

## File Tree Plan
```
shadcn-ui/
├── src/
│   ├── App.tsx                    # Router + providers
│   ├── pages/
│   │   ├── Index.tsx              # Homepage with search
│   │   ├── SearchResults.tsx      # Search results display
│   │   ├── MunicipalityForms.tsx  # Municipality form listing
│   │   ├── FormDetail.tsx         # [NEW] Form preview/download/share/print
│   │   ├── Subscription.tsx       # PayPal payment plans
│   │   ├── Login.tsx              # User login
│   │   ├── Register.tsx           # User registration
│   │   ├── Admin.tsx              # Admin login
│   │   ├── AdminDashboard.tsx     # Admin analytics
│   │   └── ...                    # Guide, Terms, Privacy, Support, etc.
│   ├── components/
│   │   ├── AIChatbot.tsx          # Floating AI assistant
│   │   ├── Footer.tsx             # Site footer
│   │   ├── ErrorBoundary.tsx      # Error handling
│   │   └── ...                    # UI components
│   ├── lib/
│   │   ├── subscription.ts       # [NEW] Subscription status checker
│   │   ├── access-control.ts     # Feature gating
│   │   ├── trial.ts              # Trial/account management
│   │   ├── auth.ts               # Admin auth
│   │   ├── supabaseClient.ts     # Supabase client
│   │   ├── translation.ts        # Translation with rate limiting
│   │   ├── municipalities-database-enhanced.ts # Search engine
│   │   └── ...                    # Other utilities
│   ├── data/
│   │   ├── olovo-forms.ts        # Olovo municipality forms (71)
│   │   └── verified-domains.ts   # Verified institution domains (1114 lines)
│   └── contexts/
│       └── LanguageContext.tsx    # i18n provider
├── public/
│   ├── manifest.json             # PWA manifest
│   └── sw.js                     # Service worker
├── .env                          # Environment variables (VITE_ only!)
└── package.json                  # Dependencies
```

## Implementation Guide
### Blocker Resolution Order (Priority):
1. **#8 subscription.ts** — Unblocks build (missing import)
2. **#1 .env cleanup** — Security fix (remove secrets)
3. **#5 HTTP→HTTPS** — Data fix (mixed content)
4. **#7 Translation rate limit** — Reliability fix
5. **#3 FormDetail page** — Core feature addition
6. **#6 Generalize MunicipalityForms** — Scalability
7. **#2 PayPal→Supabase** — Business logic (requires Supabase table)
8. **#4 Auth sync** — Full auth migration (most complex)

### Key Patterns:
- All subscription checks go through `src/lib/subscription.ts`
- Access control uses `getUserAccessLevel()` from `src/lib/access-control.ts`
- Form data files follow the pattern in `src/data/olovo-forms.ts`
- All routes defined in `src/App.tsx`
- Supabase client initialized in `src/lib/supabaseClient.ts`
## Live Supabase Data (2026-10-11)
- `institucije` is fetched at runtime by `loadRemoteInstitutions()` in `src/lib/institution-directory.ts` and merged with the static registries; `useDirectoryVersion` re-renders consumers. Schema snapshot: `supabase/schema-snapshot-2026-10-11.sql`.

## Official Website Source (2026-10-11, final)
- Button "Posjeti web stranicu" uses ONLY `public.institucije.official_url` (loaded live via `loadRemoteInstitutions`), stored as `DirectoryEntry.officialUrl` and validated by `safeHttpsUrl()` (new URL, protocol https:). Missing/invalid => button not rendered.
- `getOfficialWebsite(name)` in `src/lib/institution-directory.ts` is used by SearchResults, InstitutionPage and MunicipalityForms. Static data and `public.institutions` are no longer used for this button (static data only for offline list/forms).
- Duplicates: directory merges entries by normalized name; DB cleanup script `supabase/dedupe-institucije.sql`.
- Generator: `/generator` reads `text_document_templates` via supabase-js anon key; languages bs / sr_cyr / hr.
