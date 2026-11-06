// Supabase Edge Function: verify-paypal-order
//
// Server-side verification of a PayPal order before a subscription upgrade.
// Called by the frontend (src/lib/payment.ts verifyPayment) after PayPal onApprove.
//
// Required secrets (set via `supabase secrets set`):
//   PAYPAL_CLIENT_ID
//   PAYPAL_CLIENT_SECRET
//   PAYPAL_API_BASE (optional; defaults to https://api-m.sandbox.paypal.com,
//                    set to https://api-m.paypal.com for production)
//
// The client sends: { order_id, plan_id, expected_amount, expected_currency }
// The function fetches the order from the PayPal Orders API with server-only
// credentials and confirms it is COMPLETED with matching amount and currency.
// The client can therefore never grant itself a subscription by tampering
// with onApprove data.

import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerifyRequest {
  order_id?: string;
  plan_id?: string;
  expected_amount?: number;
  expected_currency?: string;
}

async function getPayPalAccessToken(): Promise<string> {
  const clientId = Deno.env.get('PAYPAL_CLIENT_ID');
  const clientSecret = Deno.env.get('PAYPAL_CLIENT_SECRET');
  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials are not configured');
  }
  const base = Deno.env.get('PAYPAL_API_BASE') ?? 'https://api-m.sandbox.paypal.com';
  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) {
    throw new Error(`PayPal token request failed: HTTP ${res.status}`);
  }
  const json = await res.json();
  return json.access_token as string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as VerifyRequest;
    const orderId = body.order_id?.trim();
    const planId = body.plan_id?.trim();
    const expectedAmount = typeof body.expected_amount === 'number' ? body.expected_amount : NaN;
    const expectedCurrency = body.expected_currency?.toUpperCase().trim();

    if (!orderId || !planId || !Number.isFinite(expectedAmount) || !expectedCurrency) {
      return new Response(
        JSON.stringify({ verified: false, error: 'Missing or invalid verification parameters.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const base = Deno.env.get('PAYPAL_API_BASE') ?? 'https://api-m.sandbox.paypal.com';
    const token = await getPayPalAccessToken();

    const orderRes = await fetch(`${base}/v2/checkout/orders/${encodeURIComponent(orderId)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!orderRes.ok) {
      return new Response(
        JSON.stringify({ verified: false, error: `PayPal order lookup failed (HTTP ${orderRes.status}).` }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const order = await orderRes.json();
    const status = order?.status;
    const purchaseUnit = order?.purchase_units?.[0];
    const captureAmount = purchaseUnit?.payments?.captures?.[0]?.amount ?? purchaseUnit?.amount;
    const amountValue = Number(captureAmount?.value);
    const amountCurrency = String(captureAmount?.currency_code ?? '').toUpperCase();

    if (status !== 'COMPLETED') {
      return new Response(
        JSON.stringify({ verified: false, error: `PayPal order is not completed (status: ${status}).` }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (!Number.isFinite(amountValue) || Math.abs(amountValue - expectedAmount) > 0.01 || amountCurrency !== expectedCurrency) {
      return new Response(
        JSON.stringify({ verified: false, error: 'Payment amount or currency does not match the expected plan price.' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({ verified: true, order_id: orderId, plan_id: planId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('verify-paypal-order error:', err);
    return new Response(
      JSON.stringify({ verified: false, error: 'Payment verification failed unexpectedly.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
