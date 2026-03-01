import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getApiKey } from '@/lib/db';
import { extractBearerToken } from '@/lib/usage';

const PRICE_IDS: Record<string, string> = {
  starter: process.env.STRIPE_STARTER_PRICE_ID ?? '',
  pro: process.env.STRIPE_PRO_PRICE_ID ?? '',
};

export async function POST(request: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2026-02-25.clover' });

  let plan: string | undefined;
  let apiKeyValue: string | undefined;

  try {
    const body = await request.json();
    plan = body.plan;
    apiKeyValue = body.api_key;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!plan || !PRICE_IDS[plan]) {
    return NextResponse.json(
      { error: 'plan must be one of: starter, pro' },
      { status: 400 }
    );
  }

  if (!apiKeyValue) {
    const token = extractBearerToken(request.headers.get('Authorization'));
    apiKeyValue = token ?? undefined;
  }

  if (!apiKeyValue) {
    return NextResponse.json({ error: 'API key required' }, { status: 400 });
  }

  const apiKey = await getApiKey(apiKeyValue);
  if (!apiKey) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: PRICE_IDS[plan], quantity: 1 }],
      customer_email: apiKey.email,
      metadata: { api_key: apiKeyValue },
      success_url: `${appUrl}/?upgraded=true`,
      cancel_url: `${appUrl}/#pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Checkout session error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
