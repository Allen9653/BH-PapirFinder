import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Import storage cleanup to run before app initialization
import './lib/storage-cleanup';
import { startDocRetention } from './lib/doc-retention';

startDocRetention();
import { getCookieConsent, GA_ID } from './lib/cookie-consent';

if (getCookieConsent()?.analytics === false) {
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
}

createRoot(document.getElementById('root')!).render(<App />);