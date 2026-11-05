BH PapirFinder - Progressive Web App
Overview
BH PapirFinder is the first Bosnian multilingual digital tool created by B&H Assistant d.o.o. that helps individuals and organizations quickly find free government forms and documents in Bosnia and Herzegovina.

Mission Statement
BH PapirFinder is built with good intentions - not to financially exploit users, but to help overcome administrative barriers in Bosnia and Herzegovina's complex bureaucratic structure. Subscription fees are symbolic and used solely to maintain and expand the app's functionality.

Technology Stack
Frontend: React + TypeScript + Vite
UI Framework: shadcn/ui + Tailwind CSS
State Management: React Context API
Routing: React Router
Payment Integration: PayPal SDK
PWA: Service Worker + Web App Manifest
Cross-Platform Installation
PWA Installation (All Platforms)
From Website (www.bh-assistant.ba):

Visit the website
Click "Install App" button in the prompt
Follow browser-specific installation steps
Android Devices:

Chrome/Edge: Click "Add to Home Screen" from menu
Or download from Google Play Store (when published)
iOS Devices:

Safari: Tap Share button → "Add to Home Screen"
Or download from Apple App Store (when published)
Desktop:

Chrome/Edge/Safari: Click install icon in address bar
Or use "Install BH PapirFinder" from browser menu
Store Distribution
Google Play: ba.bh_assistant.papirfinder
Apple App Store: Coming soon
Web: www.bh-assistant.ba
Platform Deployment:

Features
Free Trial: 10 days after installation
Region-Based Access: Free access for ZDK (Zenica-Doboj Canton), paid for other regions
Multilingual Support: Bosnian (Latin), Serbian (Cyrillic), English, Turkish, German
Subscription Plans:
10 BAM for 5 days
50 BAM for 30 days
60 BAM for 12 months
Document Features: Download, translate, share, print
Admin Panel: Manage sponsors and application content
PWA Support: Installable, offline-capable, push notifications
Homepage Return: Always-visible button to return to homepage
Installation
Requires Node.js 22.12.0 or newer.

The Supabase client uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
from `.env.local` when provided; project defaults are included. The publishable
key is browser-visible, so enable Row Level Security and appropriate policies
for exposed tables. Never put Supabase secret/service-role keys in frontend
configuration.

### Kalesija forms preview

After deploying the updated build, open
`https://bhpapirfinder.ba/municipality/kalesija` to test Općina Kalesija's forms.
For local testing, run `npm run dev` and open
`http://localhost:3000/municipality/kalesija`. For a temporary online preview,
run `npm run build`, then `npm run preview:host`, and in a second terminal run
`npx --yes localtunnel --port 4173`; open the HTTPS URL printed by LocalTunnel
and add `/municipality/kalesija`.

Admin access uses Supabase Auth and requires the signed-in user's server-managed
`app_metadata.role` to be `admin`. Create/invite the account in Supabase Auth,
then assign that app metadata from a trusted Supabase admin interface or server.
The admin login accepts an email address, not a username. Client-side route checks
are not a replacement for Row Level Security: secure every admin-readable or
admin-writable table with policies that check the verified JWT app metadata.
Never store an admin password or Supabase secret key in this frontend project.

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check Sanski Most agricultural documents against the official website
npm run check:sanski-most-documents

# Check Bileća applications and public competitions against the official website
npm run check:bileca-documents

# Validate institution and document links in the application data
npm run validate:links

# Expose production preview on the local network (port 4173)
npm run preview:host

Open http://localhost:4173 on this computer. To create a temporary public URL,
leave the preview server running and run this in a second terminal:

npx --yes localtunnel --port 4173

Open the HTTPS URL printed by LocalTunnel. The URL is temporary and changes
between sessions. Stop either process with Ctrl+C.

The Sanski Most document checker reports new files, changed URLs, and documents
no longer listed on the source page. Use `npm run check:sanski-most-documents -- --json`
for JSON output, or add `--fail-on-changes` to return a non-zero exit code when
differences are found. It reports changes only; update the application data
manually after reviewing the official source.

The Bileća checker scans the official applications and public competitions pages
and reports new, changed, or no longer listed links. Use
`npm run check:bileca-documents -- --json` for JSON output. Review its findings
before updating the app's static data.

The link validator checks the URLs in `src/data/` and municipality/institution
database files in `src/lib/`. It prints the HTTP result and source file/line for
each URL, writes invalid links grouped by institution to
`izvjestaj-neispravni-linkovi.json` in the project root, and exits with status 1
if any URL does not return HTTP 200. You can also run it directly with
`node scripts/validate-links.js --concurrency=8`.

Project Structure
src/
├── components/        # Reusable UI components
│   ├── ui/           # shadcn/ui components
│   ├── Header.tsx    # Navigation header with homepage button
│   ├── Footer.tsx    # Site footer
│   ├── InstallPrompt.tsx # PWA installation prompt
│   └── SponsorCarousel.tsx
├── contexts/         # React contexts
│   └── LanguageContext.tsx
├── lib/             # Utilities and configurations
│   ├── config.ts    # App configuration & API keys
│   ├── payment.ts   # Payment integration
│   ├── auth.ts      # Authentication logic
│   ├── regions.ts   # Region-based access control
│   ├── i18n.ts      # Translations
│   └── subscription.ts # Subscription & trial management
├── pages/           # Page components
│   ├── Index.tsx    # Homepage
│   ├── SearchResults.tsx
│   ├── Subscription.tsx
│   ├── Terms.tsx
│   ├── Guide.tsx
│   ├── Support.tsx
│   ├── Privacy.tsx
│   └── Admin.tsx    # Admin panel with deployment functions
└── App.tsx          # Root component
User Experience
Navigation
Homepage Return Button: Always visible in top-left corner
Multilingual labels (Početna/Почетна/Home/Startseite/Ana Sayfa)
Accessible on all pages including admin panel
Maintains session state when navigating
Subscription Flow
Free trial: 10 days after installation
User selects plan and enters email
PayPal payment processing
Backend generates login code
Login code sent via email
User profile unlocked with features:
Preview of active official websites
List of active URLs with descriptions
Download forms/documents
Translate to: Turkish, English, German, Latin, Cyrillic
Share URLs
Print documents
PayPal Integration Workflow
Frontend (PWA)
User enters email and selects subscription plan
PayPal button rendered using VITE_PAYPAL_CLIENT_ID
User completes payment through PayPal modal
Backend (To Be Implemented)
PayPal sends webhook with transaction details
Backend validates webhook using PAYPAL_SECRET
Backend generates unique login code
Backend sends login code to user's email
User receives access to premium features
Deployment Guide
Deploy to www.bh-assistant.ba
Build the application: pnpm run build
Upload dist/ folder to web server
Configure HTTPS and domain
Set environment variables
Enable service worker
Publish to Google Play
Use Trusted Web Activity (TWA) or PWA Builder
Generate signed APK/AAB
Upload to Google Play Console
Configure app listing and screenshots
Submit for review
Publish to Apple App Store
Use PWA Builder or native wrapper
Generate iOS app bundle
Upload to App Store Connect
Configure app metadata
Submit for review
Future Vision
The goal is to evolve BH PapirFinder into a comprehensive multilingual tool that allows every user to find all free forms and documents from all levels of government online, while remaining:

Fast and efficient
Affordable (symbolic fees)
Stress-free to use
Legally compliant
Cross-platform accessible
Contact & Support
Email: info@bh-assistant.ba
Website: www.bh-assistant.ba
Company: B&H Assistant d.o.o., Zenica 72000, BiH
License
Sva prava zadržana od strane vlasnika aplikacije B&H Assistant d.o.o. All rights reserved by B&H Assistant d.o.o.

Contributing
This is a private project owned by B&H Assistant d.o.o. For inquiries, contact info@bh-assistant.ba.

Compliance & Transparency
BH PapirFinder respects user rights and operates transparently in accordance with BiH laws. We are committed to:

Protecting user privacy
Secure payment processing
Automatic data deletion
Legal compliance
Affordable pricing
Quality service
Cross-platform accessibility
