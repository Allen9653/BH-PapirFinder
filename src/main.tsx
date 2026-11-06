import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Import storage cleanup to run before app initialization
import './lib/storage-cleanup';
import { startDocRetention } from './lib/doc-retention';
import { verifyAdminSession } from './lib/auth';

// Re-verify the admin session (Supabase Auth + server-managed role) on app
// bootstrap. The admin state in src/lib/auth.ts is module memory only and is
// lost on page reload; calling verifyAdminSession here restores it from the
// authenticated Supabase session so any isAdminLoggedIn() check downstream
// reflects the real session. All isAdminLoggedIn() consumers should rely on
// this bootstrap call having run (it is awaited-free but starts immediately).
void verifyAdminSession();

startDocRetention();
import { getCookieConsent, GA_ID } from './lib/cookie-consent';

if (getCookieConsent()?.analytics === false) {
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
}

createRoot(document.getElementById('root')!).render(<App />);