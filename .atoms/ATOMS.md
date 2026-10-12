# Project Context

## Project Overview
BH PapirFinder is a multilingual Progressive Web Application (PWA) by B&H Assistant d.o.o. that helps users in Bosnia and Herzegovina navigate official government websites and access essential administrative forms/documents. Features include user authentication, advanced search with trust scores, subscription management (PayPal), AI chatbot for form assistance, and a growing database of municipality forms (currently Olovo with 71 forms, Živinice integration ongoing).

## Key Decisions
| Date | Decision | By | Rationale |
|------|----------|-----|-----------|
| 2025-11-19 | Initial project setup with React + Vite + shadcn/ui | Team | Modern stack for PWA development |
| 2026-01-07 | PayPal integration for subscriptions | Team | Primary payment method in BiH market |
| 2026-01-07 | localStorage-based trial/auth system | Team | Quick MVP for user management |
| 2026-02-16 | Supabase connected as backend | Team | Scalable auth and database |
| 2026-03-04 | Trust score system for search results | Team | Help users identify reliable sources |
| 2026-04-02 | Supabase Auth integration alongside localStorage | Team | More robust authentication |
| 2026-05-07 | Olovo forms integration (71 forms) | Team | First municipality with full form database |
| 2026-05-07 | AI Chatbot + PDF form filler | Team | Assist users in filling forms |
| 2026-05-11 | 8 critical blockers identified for v64 | Analysis | Security, auth, payment, and data issues need resolution |

## Constraints
- Supabase project ID: zdvqjjmpxifbltihffas
- Tech stack: React + TypeScript + Vite + shadcn/ui + Tailwind + Supabase
- PayPal Client ID exposed via VITE_ prefix (safe for frontend)
- Secret keys (API_SECRET_KEY, PAYPAL_SECRET) must NOT be in frontend .env
- Translation API: MyMemory (free tier, 500 req/day limit)
- Olovo PDF URLs use HTTP (mixed content issue on HTTPS deployment)
- MunicipalityForms.tsx currently hardcoded for Olovo only
- No /form/:id route exists yet (no preview/fill/share/print)
- Dual auth system: localStorage (trial.ts) + Supabase Auth (not synchronized)
- subscription.ts file is missing (imported by SubscriptionGuard but doesn't exist)
- Color scheme: BiH national colors — #003D7A (blue), #00A651 (green), #FFCD00 (gold)
- Target audience: BiH citizens needing government forms
- Deployment domain: bhpapirfinder.ba