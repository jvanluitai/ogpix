import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getApiKey, updatePlan, updatePlanByStripeCustomer } from '@/lib/db';

const STARTER_PRICE_ID = process.env.STRIPE_STARTER_PRICE_ID ?? '';
const PRO_PRICE_ID = process.env.STRIPE_PRO_PRICE_ID ?? '';

function getPlanFromPriceId(priceId: string): string {
  if (priceId === PRO_PRICE_ID) return 'pro';
  if (priceId === STARTER_PRICE_ID) return 'starter';
  return 'free';
}

export async function POST(request: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2026-02-25.clover' });

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const apiKeyValue = session.metadata?.api_key;
        const customerId = session.customer as string;

        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          const priceId = subscription.items.data[0]?.price.id ?? '';
          const plan = getPlanFromPriceId(priceId);

          if (apiKeyValue) {
            const apiKey = await getApiKey(apiKeyValue);
            if (apiKey) {
              await updatePlan(apiKey.key, plan, customerId);
            }
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const priceId = subscription.items.data[0]?.price.id ?? '';
        const plan = getPlanFromPriceId(priceId);
        const customerId = subscription.customer as string;
        await updatePlanByStripeCustomer(customerId, plan);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        await updatePlanByStripeCustomer(customerId, 'free');
        break;
      }

      default:
        // Unhandled event types — just acknowledge
        break;
    }
  } catch (err) {
    console.error('Webhook handler error:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
