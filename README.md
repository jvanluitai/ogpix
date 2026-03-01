# OGPix

Dynamic OG image generation API. Generate beautiful social share images on-the-fly via a single HTTP request.

## Features

- 5 built-in templates: `blog`, `product`, `social`, `minimal`, `gradient`
- REST API returning 1200×630 PNG images
- API key auth with per-key usage tracking
- Free tier (50 images/mo), Starter ($9/mo, 1k), Pro ($29/mo, 10k)
- Stripe Checkout for paid plan upgrades
- SQLite storage (zero config for dev, swap to Turso for production)

## Quick Start

```bash
# Install dependencies
npm install

# Copy env file and fill in your values
cp .env.example .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## API Reference

### Generate an image

```bash
# POST (JSON body)
curl -X POST http://localhost:3000/api/generate \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"template":"blog","title":"Hello World","description":"My first post"}' \
  --output image.png

# GET (query params — useful for <meta> tags)
curl "http://localhost:3000/api/generate?template=blog&title=Hello+World&api_key=YOUR_KEY" \
  --output image.png
```

**Parameters:**

| Param | Type | Default | Description |
|---|---|---|---|
| `template` | string | `blog` | `blog` \| `product` \| `social` \| `minimal` \| `gradient` |
| `title` | string | required | Main heading text |
| `description` | string | — | Subtitle text |
| `image` | URL | — | Avatar or logo URL |
| `theme` | string | `dark` | `dark` \| `light` |
| `brand_color` | hex | `#6366f1` | Accent color |
| `width` | number | `1200` | Image width in px |
| `height` | number | `630` | Image height in px |

### Create an API key

```bash
curl -X POST http://localhost:3000/api/keys \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com"}'
# → {"api_key":"ogpix_...","plan":"free"}
```

### Check usage

```bash
curl http://localhost:3000/api/usage \
  -H "Authorization: Bearer YOUR_API_KEY"
# → {"used":12,"limit":50,"plan":"free"}
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_...`) |
| `STRIPE_STARTER_PRICE_ID` | Stripe price ID for Starter plan |
| `STRIPE_PRO_PRICE_ID` | Stripe price ID for Pro plan |
| `NEXT_PUBLIC_APP_URL` | Public URL of the app (no trailing slash) |

## Deployment

### Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy

# Set env vars in Vercel dashboard or via CLI
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add STRIPE_STARTER_PRICE_ID
vercel env add STRIPE_PRO_PRICE_ID
vercel env add NEXT_PUBLIC_APP_URL
```

The SQLite database is stored at `/tmp/ogpix.db` on Vercel (ephemeral — resets on cold start). For production persistence, replace `lib/db.ts` with [Turso](https://turso.tech) or another hosted SQLite.

### Stripe Webhook Setup

1. Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Forward webhooks locally: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
3. In production, add `https://yourdomain.com/api/webhooks/stripe` in the Stripe dashboard

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [@vercel/og](https://vercel.com/docs/functions/og-image-generation) — Satori + resvg for image generation
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — API key + usage storage
- [Stripe](https://stripe.com) — Payment processing
- [Tailwind CSS v4](https://tailwindcss.com) — Landing page styles
