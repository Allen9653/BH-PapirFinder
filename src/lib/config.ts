// Frontend configuration - Safe to use in client-side code
export const config = {
  // Publishable API key - Safe to expose
  publishableKey: import.meta.env.VITE_PUBLISHABLE_API_KEY || 'pk_ZvqlTZazSwqwI0tZ8yXabg',
  
  // PayPal Client ID - Safe to expose (frontend only)
  paypalClientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'AUBHyLJ_m-7_0LTkvsYVdr5cUpqpAumhuNkuM5NrAaWEHN-4sXII1zls_-T2Q1WIk_4K8S1AXbdiCuS5',
  
  // PayPal account
  paypalAccount: 'alenjusufovic@yahoo.com',
  
  // Allowed domains for API requests
  allowedDomains: [
    'bh-papirfinder.ba',
    'www.bh-papirfinder.ba',
    'localhost',
    '127.0.0.1',
  ],
  
  // Subscription plans
  subscriptionPlans: {
    trial: {
      days: 10,
      price: 0,
    },
    plan5days: {
      days: 5,
      price: 10,
      currency: 'BAM',
    },
    plan30days: {
      days: 30,
      price: 50,
      currency: 'BAM',
    },
    plan12months: {
      days: 365,
      price: 60,
      currency: 'BAM',
    },
  },
};

// Validate that we're running on an allowed domain
export function validateDomain(): boolean {
  if (typeof window === 'undefined') return true; // Server-side
  
  const hostname = window.location.hostname;
  return config.allowedDomains.some(domain => 
    hostname === domain || hostname.endsWith(`.${domain}`)
  );
}

// Get API headers with publishable key
export function getApiHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'X-API-Key': config.publishableKey,
    'X-Domain': typeof window !== 'undefined' ? window.location.hostname : '',
  };
}