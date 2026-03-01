# OGPix v2 — GitHub-Integrated OG Image System

## Vision
OG images as infrastructure, integrated into developer workflows. No design tools, no context switching. Configure once in your repo, get dynamic OG images on every deploy.

## What Makes This Different
- Bannerbear/htmlcsstoimage = visual editors for marketers
- OGPix = config-as-code for developers
- Nobody does ogpix.yml in your repo → auto-generated OG images on push

## Immediate Priority: Edge-Compatible Auth

Replace better-sqlite3 with Upstash Redis so auth/usage works on Vercel edge.

Redis schema:
- ogpix:key:{api_key} → JSON { email, plan, stripe_customer_id, created_at }
- ogpix:email:{email} → api_key string
- ogpix:usage:{api_key}:{YYYY-MM} → integer count (INCR)

## Week Plan

Day 1: Edge auth (Upstash Redis) + 5 more templates (10 total)
Day 2: GitHub Action for auto-generating OG images from ogpix.yml config
Day 3: Dashboard, docs site, visual template editor
Day 4: SEO pages (vs/bannerbear, vs/htmlcsstoimage), blog content
Day 5: Custom domain, Stripe products live, polish
Day 6: Launch (Product Hunt, HN, Reddit, Dev.to, Twitter)
Day 7: Iterate on feedback

## ogpix.yml Format
```yaml
version: 1
template: blog
theme: dark
brand_color: "#6366f1"

pages:
  - path: /blog/*
    template: blog
    title: "{{frontmatter.title}}"
    description: "{{frontmatter.description}}"
  - path: /docs/*
    template: docs
    title: "{{frontmatter.title}}"
  - path: /
    template: gradient
    title: "My Project"
```

## GitHub Action
```yaml
- uses: ogpix/generate-action@v1
  with:
    api-key: ${{ secrets.OGPIX_API_KEY }}
    config: ogpix.yml
    output-dir: public/og
```

## Pricing
- Free: 50 images/month, 3 templates
- Pro ($12/mo): 2,000 images/month, all templates, GitHub Action
- Team ($29/mo): 10,000 images/month, custom templates, GitHub App

## Success Metrics (Week 1)
- All templates working on production
- Auth/usage on edge runtime
- GitHub Action published
- At least 1 launch post live
- First 10 signups
- First paying customer (stretch)
