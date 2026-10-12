const CACHE_NAME = 'bh-papirfinder-v2';
const PDF_CACHE_NAME = 'bh-papirfinder-pdfs-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
];

// PDF file extensions and content types to identify PDF requests
const PDF_PATTERNS = ['.pdf', '.PDF'];
const PDF_CONTENT_TYPES = ['application/pdf'];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const validCaches = [CACHE_NAME, PDF_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!validCaches.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Check if a URL is a PDF
function isPdfRequest(url) {
  const pathname = new URL(url).pathname.toLowerCase();
  return PDF_PATTERNS.some((ext) => pathname.endsWith(ext));
}

// Fetch event - serve from cache, fallback to network
// PDFs are cached in a separate cache for offline access
self.addEventListener('fetch', (event) => {
  const requestUrl = event.request.url;

  // Handle PDF requests with cache-first strategy
  if (isPdfRequest(requestUrl)) {
    event.respondWith(handlePdfRequest(event.request));
    return;
  }

  // Handle regular requests with network-first, cache-fallback strategy
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});

// Handle PDF requests: cache-first, then network (and cache on success)
async function handlePdfRequest(request) {
  // 1. Try PDF cache first
  const pdfCache = await caches.open(PDF_CACHE_NAME);
  const cachedResponse = await pdfCache.match(request);

  if (cachedResponse) {
    // Return cached PDF (available offline)
    return cachedResponse;
  }

  // 2. Fetch from network
  try {
    const networkResponse = await fetch(request.clone());

    if (networkResponse && networkResponse.ok) {
      // Cache the PDF for offline use
      const responseToCache = networkResponse.clone();
      pdfCache.put(request, responseToCache);
      return networkResponse;
    }

    // If response is opaque (cross-origin), still cache it
    if (networkResponse && networkResponse.type === 'opaque') {
      pdfCache.put(request, networkResponse.clone());
      return networkResponse;
    }

    return networkResponse;
  } catch (error) {
    // Network failed and no cache — return offline message
    return new Response(
      'PDF nije dostupan offline. Molimo se povežite na internet.',
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      }
    );
  }
}

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_PDF') {
    const url = event.data.url;
    if (url) {
      caches.open(PDF_CACHE_NAME).then(async (cache) => {
        try {
          const response = await fetch(url, { mode: 'cors' });
          if (response.ok) {
            await cache.put(url, response);
          } else {
            // Try no-cors for cross-origin PDFs
            const opaqueResponse = await fetch(url, { mode: 'no-cors' });
            await cache.put(url, opaqueResponse);
          }
        } catch (err) {
          console.warn('[SW] Failed to cache PDF:', url, err);
        }
      });
    }
  }

  if (event.data && event.data.type === 'CLEAR_PDF_CACHE') {
    caches.delete(PDF_CACHE_NAME).then(() => {
      console.log('[SW] PDF cache cleared');
    });
  }

  if (event.data && event.data.type === 'GET_CACHE_STATUS') {
    caches.open(PDF_CACHE_NAME).then(async (cache) => {
      const keys = await cache.keys();
      const urls = keys.map((req) => req.url);
      // Send back to the requesting client
      if (event.source) {
        event.source.postMessage({
          type: 'CACHE_STATUS_RESPONSE',
          cachedUrls: urls,
          count: urls.length,
        });
      }
    });
  }
});