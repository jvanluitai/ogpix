import { TemplateProps } from './types';

export function DocsTemplate({
  title,
  description,
  theme = 'dark',
  brand_color = '#6366f1',
  width = 1200,
  height = 630,
}: TemplateProps) {
  const isDark = theme === 'dark';
  const bg = isDark ? '#0c0d10' : '#f8f9fa';
  const sidebarBg = isDark ? '#111318' : '#f0f0f5';
  const textPrimary = isDark ? '#f0f4ff' : '#0c0d10';
  const textSecondary = isDark ? '#8b90a0' : '#555a6a';
  const textMuted = isDark ? '#4a5060' : '#9099b0';
  const borderColor = isDark ? '#1e2030' : '#e0e2ea';
  const sidebarWidth = 240;

  const breadcrumbs = description ? description.split('/').filter(Boolean) : ['docs'];

  return (
    <div
      style={{
        width,
        height,
        background: bg,
        display: 'flex',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left sidebar */}
      <div
        style={{
          width: sidebarWidth,
          height,
          background: sidebarBg,
          borderRight: `1px solid ${borderColor}`,
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 20px',
          gap: 6,
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: brand_color,
              display: 'flex',
            }}
          />
          <div style={{ color: textPrimary, fontSize: 15, fontWeight: 700, display: 'flex' }}>
            Docs
          </div>
        </div>

        {/* Nav items */}
        {['Getting Started', 'API Reference', 'Templates', 'Authentication', 'Webhooks', 'Examples'].map(
          (item, i) => (
            <div
              key={i}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                background: i === 2 ? `${brand_color}20` : 'transparent',
                color: i === 2 ? brand_color : textMuted,
                fontSize: 13,
                fontWeight: i === 2 ? 600 : 400,
                display: 'flex',
                borderLeft: i === 2 ? `2px solid ${brand_color}` : '2px solid transparent',
              }}
            >
              {item}
            </div>
          )
        )}
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '48px 64px',
          position: 'relative',
        }}
      >
        {/* Top accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${brand_color}, ${brand_color}40, transparent)`,
          }}
        />

        {/* Breadcrumb */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 36,
          }}
        >
          {breadcrumbs.map((crumb, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && (
                <div style={{ color: textMuted, fontSize: 14, display: 'flex' }}>/</div>
              )}
              <div
                style={{
                  color: i === breadcrumbs.length - 1 ? textSecondary : textMuted,
                  fontSize: 14,
                  fontWeight: i === breadcrumbs.length - 1 ? 500 : 400,
                  display: 'flex',
                  fontFamily: 'ui-monospace, monospace',
                }}
              >
                {crumb}
              </div>
            </div>
          ))}
        </div>

        {/* Title */}
        <div
          style={{
            color: textPrimary,
            fontSize: title.length > 45 ? 46 : title.length > 30 ? 58 : 70,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            display: 'flex',
            marginBottom: 24,
          }}
        >
          {title}
        </div>

        {/* Decorative code line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 20px',
            background: isDark ? '#0a0b0e' : '#e8eaf0',
            borderRadius: 8,
            border: `1px solid ${borderColor}`,
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          <div style={{ color: brand_color, fontSize: 13, display: 'flex' }}>$</div>
          <div style={{ color: textSecondary, fontSize: 13, display: 'flex' }}>
            GET /api/generate?template=docs&title=...
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            left: 64,
            right: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ color: textMuted, fontSize: 14, display: 'flex' }}>ogpix.dev/docs</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                background: brand_color,
                display: 'flex',
              }}
            />
            <div style={{ color: textMuted, fontSize: 13, display: 'flex' }}>OGPix</div>
          </div>
        </div>
      </div>
    </div>
  );
}
