# OGPix - Dynamic OG Image Generation API

## What It Is
A SaaS API that generates dynamic Open Graph / social share images on-the-fly. Developers pass parameters via HTTP, get back a PNG. Simple.

## Tech Stack
- **Next.js 14** (App Router)
- **Tailwind CSS** for landing page
- **@vercel/og** (Satori + resvg-js) for image generation
- **better-sqlite3** for API keys + usage tracking (file-based, zero config)
- **Stripe Checkout** for payments (we'll use env vars for keys)

## MVP Features

### Landing Page (/)
- Hero: "Dynamic OG images via API. One request. Done."
- Live demo: enter a title + description, see preview
- Pricing cards (Free / Starter $9/mo / Pro $29/mo)
- "Get API Key" CTA → simple email signup form that generates key
- Code examples (curl, JS, Python)
- Clean, dark theme, modern SaaS look

### API Endpoints

#### POST /api/generate
Generate an image. Body params:
- `template`: "blog" | "product" | "social" | "minimal" | "gradient"
- `title`: string (required)
- `description`: string (optional)
- `image`: URL for avatar/logo (optional)
- `theme`: "light" | "dark" (default: dark)
- `brand_color`: hex color (optional, default: #6366f1)
- `width`: number (default: 1200)
- `height`: number (default: 630)

Headers: `Authorization: Bearer <api_key>`

Returns: image/png

#### GET /api/generate?template=blog&title=Hello+World...
Same as POST but via query params. Useful for direct <meta> tag embedding.

#### POST /api/keys
Create an API key. Body: `{ email: string }`
Returns: `{ api_key: string, plan: "free" }`

#### GET /api/usage
Check usage. Header: `Authorization: Bearer <api_key>`
Returns: `{ used: number, limit: number, plan: string }`

### Templates (5 built-in)
1. **blog** - Title + description + author avatar, gradient background
2. **product** - Product name + tagline + logo, clean layout
3. **social** - Big bold text, colorful gradient, perfect for Twitter/LinkedIn
4. **minimal** - Just the title, centered, elegant
5. **gradient** - Title on beautiful mesh gradient background

### Database Schema (SQLite)
```sql
CREATE TABLE api_keys (
  id INTEGER PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  plan TEXT DEFAULT 'free',
  stripe_customer_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usage (
  id INTEGER PRIMARY KEY,
  api_key_id INTEGER REFERENCES api_keys(id),
  month TEXT NOT NULL, -- '2026-03'
  count INTEGER DEFAULT 0,
  UNIQUE(api_key_id, month)
);
```

### Usage Limits
- free: 50/month
- starter: 1,000/month  
- pro: 10,000/month

### Stripe Integration
- Use Stripe Checkout for upgrades
- Webhook endpoint at /api/webhooks/stripe to handle checkout.session.completed
- Set plan in DB when payment succeeds
- Env vars: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_STARTER_PRICE_ID, STRIPE_PRO_PRICE_ID

## File Structure
```
ogpix/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Landing page
│   ├── api/
│   │   ├── generate/route.tsx  # Image generation endpoint
│   │   ├── keys/route.ts       # API key creation
│   │   ├── usage/route.ts      # Usage checking
│   │   └── webhooks/
│   │       └── stripe/route.ts # Stripe webhooks
│   └── globals.css
├── lib/
│   ├── db.ts                 # SQLite setup + queries
│   ├── templates/            # OG image templates
│   │   ├── blog.tsx
│   │   ├── product.tsx
│   │   ├── social.tsx
│   │   ├── minimal.tsx
│   │   └── gradient.tsx
│   └── usage.ts              # Usage tracking + limit checking
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
├── .env.example
└── README.md
```

## Design Notes
- Landing page should look premium — dark bg (#0a0a0a), purple/indigo accents (#6366f1)
- Use Inter font
- Make the live preview actually call the API and show the generated image
- Code examples should be copy-pasteable
- Mobile responsive

## Deployment
- Vercel (primary) — `vercel deploy`
- SQLite file stored in /tmp on Vercel (ephemeral) — for production, user would swap to Turso/PlanetScale
- For MVP, SQLite is fine — it works, it ships

## .env.example
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Build this COMPLETE and PRODUCTION-READY. Every file, every component, fully working.
When done, run: openclaw system event --text "Done: OGPix MVP complete — full Next.js app with 5 OG templates, landing page, API key auth, usage tracking, Stripe integration" --mode now
