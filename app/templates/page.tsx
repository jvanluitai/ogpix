import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Template Gallery — OGPix',
  description: 'Browse all 15 OG image templates. Pick one and start generating.',
};

interface TemplateCard {
  name: string;
  label: string;
  tagline: string;
  title: string;
  description?: string;
  brand_color?: string;
  theme?: 'light' | 'dark';
}

const TEMPLATES: TemplateCard[] = [
  {
    name: 'blog',
    label: 'Blog',
    tagline: 'Classic blog post card with author avatar',
    title: 'How I Built a 10x Faster API',
    description: 'A deep dive into edge caching, cold start elimination, and global deployments.',
    brand_color: '#6366f1',
  },
  {
    name: 'product',
    label: 'Product',
    tagline: 'Product showcase with CTA',
    title: 'OGPix',
    description: 'Dynamic OG images in milliseconds',
    brand_color: '#8b5cf6',
  },
  {
    name: 'social',
    label: 'Social',
    tagline: 'Bold gradient social share card',
    title: 'Ship faster with dynamic OG images',
    description: 'One API. Infinite impressions.',
    brand_color: '#ec4899',
  },
  {
    name: 'minimal',
    label: 'Minimal',
    tagline: 'Clean and distraction-free',
    title: 'Less is more.',
    description: 'A minimal approach to open graph images.',
    brand_color: '#14b8a6',
  },
  {
    name: 'gradient',
    label: 'Gradient',
    tagline: 'Glassmorphic mesh gradient design',
    title: 'Beautiful by default',
    description: 'Stunning visuals without the design work.',
    brand_color: '#f59e0b',
  },
  {
    name: 'changelog',
    label: 'Changelog',
    tagline: 'Terminal-styled release notes',
    title: 'v2.4.0 — Edge Runtime',
    description: 'Zero cold starts, global edge deployments, 10x faster.',
    brand_color: '#22c55e',
  },
  {
    name: 'docs',
    label: 'Docs',
    tagline: 'Documentation page with breadcrumb',
    title: 'ImageResponse API',
    description: 'app/api/generate',
    brand_color: '#3b82f6',
  },
  {
    name: 'tweet',
    label: 'Tweet',
    tagline: 'Quote card with large quotation marks',
    title: 'Building in public is the best growth strategy. Ship daily, learn faster.',
    description: 'Jeremy Van Luit · @jeremyvl',
    brand_color: '#1d9bf0',
  },
  {
    name: 'profile',
    label: 'Profile',
    tagline: 'Personal profile card',
    title: 'Sarah Chen',
    description: 'Staff Engineer · Vercel',
    brand_color: '#a855f7',
  },
  {
    name: 'event',
    label: 'Event',
    tagline: 'Bold event announcement',
    title: 'Next.js Conf 2025',
    description: 'October 24, 2025 · San Francisco',
    brand_color: '#f97316',
  },
  {
    name: 'podcast',
    label: 'Podcast',
    tagline: 'Episode card with waveform',
    title: 'The Future of Edge Computing',
    description: 'Episode 42 · The Stack Podcast',
    brand_color: '#8b5cf6',
  },
  {
    name: 'pricing',
    label: 'Pricing',
    tagline: 'SaaS pricing plan card',
    title: 'Pro Plan',
    description: '$49/month · Unlimited images · Custom branding · API access',
    brand_color: '#10b981',
  },
  {
    name: 'newsletter',
    label: 'Newsletter',
    tagline: 'Newspaper-style headline card',
    title: 'The Great AI Reshuffling of 2025',
    description: 'Issue #142 · Frontend Weekly',
    brand_color: '#dc2626',
  },
  {
    name: 'comparison',
    label: 'Comparison',
    tagline: 'Split-screen VS layout',
    title: 'React',
    description: 'Svelte',
    brand_color: '#06b6d4',
  },
  {
    name: 'announcement',
    label: 'Announcement',
    tagline: 'Big bold launch announcement',
    title: 'OGPix 2.0 is Here',
    description: '10x faster. 15 templates. One API.',
    brand_color: '#f43f5e',
  },
];

function buildPreviewUrl(t: TemplateCard): string {
  const params = new URLSearchParams({
    template: t.name,
    title: t.title,
    demo: '1',
  });
  if (t.description) params.set('description', t.description);
  if (t.brand_color) params.set('brand_color', t.brand_color);
  if (t.theme) params.set('theme', t.theme);
  return `/api/generate?${params.toString()}`;
}

export default function TemplateGalleryPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#09090b',
        color: '#fafafa',
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '64px 40px',
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1100, margin: '0 auto 64px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#6366f120',
            border: '1px solid #6366f140',
            borderRadius: 100,
            padding: '4px 16px',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#6366f1',
            }}
          />
          <span style={{ color: '#6366f1', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em' }}>
            15 TEMPLATES
          </span>
        </div>

        <h1
          style={{
            fontSize: 52,
            fontWeight: 900,
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
            color: '#ffffff',
          }}
        >
          Template Gallery
        </h1>
        <p style={{ fontSize: 20, color: '#a1a1aa', margin: 0, maxWidth: 560 }}>
          Choose a template and start generating OG images in seconds. All templates support{' '}
          <code style={{ color: '#6366f1', fontFamily: 'monospace' }}>brand_color</code> and{' '}
          <code style={{ color: '#6366f1', fontFamily: 'monospace' }}>theme</code> customization.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 32,
        }}
      >
        {TEMPLATES.map((t) => (
          <div
            key={t.name}
            style={{
              background: '#18181b',
              border: '1px solid #27272a',
              borderRadius: 16,
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}
          >
            {/* Preview image */}
            <div
              style={{
                background: '#0a0a0c',
                borderBottom: '1px solid #27272a',
                overflow: 'hidden',
                lineHeight: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={buildPreviewUrl(t)}
                alt={`${t.label} template preview`}
                width={1200}
                height={630}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>

            {/* Card info */}
            <div style={{ padding: '20px 24px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#fafafa',
                  }}
                >
                  {t.label}
                </span>
                <code
                  style={{
                    fontSize: 12,
                    color: '#71717a',
                    background: '#27272a',
                    borderRadius: 4,
                    padding: '2px 8px',
                    fontFamily: 'monospace',
                  }}
                >
                  {t.name}
                </code>
              </div>
              <p style={{ fontSize: 14, color: '#71717a', margin: 0 }}>{t.tagline}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          maxWidth: 1100,
          margin: '80px auto 0',
          borderTop: '1px solid #27272a',
          paddingTop: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ color: '#52525b', fontSize: 14 }}>ogpix.dev</span>
        <a
          href="/api/generate?template=blog&title=My+Post&demo=1"
          style={{ color: '#6366f1', fontSize: 14, textDecoration: 'none' }}
        >
          Try the API →
        </a>
      </div>
    </main>
  );
}
