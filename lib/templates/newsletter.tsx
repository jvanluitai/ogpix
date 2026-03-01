import { TemplateProps } from './types';

export function NewsletterTemplate({
  title,
  description,
  image,
  theme = 'dark',
  brand_color = '#6366f1',
  width = 1200,
  height = 630,
}: TemplateProps) {
  const isDark = theme === 'dark';
  const bg = isDark ? '#0a0908' : '#faf8f5';
  const textPrimary = isDark ? '#f5f0e8' : '#1a1510';
  const textSecondary = isDark ? '#908880' : '#605850';
  const textMuted = isDark ? '#504840' : '#a09890';
  const dividerColor = isDark ? '#2a2520' : '#ddd8d0';

  // Parse description: "Issue #N · Publication Name"
  const descParts = description ? description.split('·').map((s) => s.trim()) : [];
  const issueLabel = descParts[0] || '';
  const publication = descParts[1] || 'Newsletter';

  const baseR = parseInt(brand_color.slice(1, 3), 16);
  const baseG = parseInt(brand_color.slice(3, 5), 16);
  const baseB = parseInt(brand_color.slice(5, 7), 16);
  const warmAccent = `rgb(${Math.min(baseR + 30, 255)},${Math.max(baseG - 10, 0)},${Math.max(baseB - 30, 0)})`;

  return (
    <div
      style={{
        width,
        height,
        background: bg,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Georgia, "Times New Roman", serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top rule */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: brand_color,
        }}
      />

      {/* Background texture lines (decorative) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '40%',
          height: '100%',
          background: isDark
            ? `linear-gradient(to left, ${brand_color}08, transparent)`
            : `linear-gradient(to left, ${brand_color}05, transparent)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 80px 48px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Masthead */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 28,
            borderBottom: `1px solid ${dividerColor}`,
          }}
        >
          <div
            style={{
              color: brand_color,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'Inter, system-ui, sans-serif',
              display: 'flex',
            }}
          >
            {publication}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {issueLabel && (
              <div style={{ color: textMuted, fontSize: 14, display: 'flex' }}>
                {issueLabel}
              </div>
            )}
            {image && (
              <img
                src={image}
                width={40}
                height={40}
                style={{ borderRadius: '50%', objectFit: 'cover', display: 'flex' }}
                alt=""
              />
            )}
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Kicker label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 32,
                height: 3,
                background: warmAccent,
                display: 'flex',
              }}
            />
            <div
              style={{
                color: warmAccent,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontFamily: 'Inter, system-ui, sans-serif',
                display: 'flex',
              }}
            >
              Lead Story
            </div>
          </div>

          {/* Main headline */}
          <div
            style={{
              color: textPrimary,
              fontSize: title.length > 60 ? 44 : title.length > 40 ? 54 : 66,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              display: 'flex',
            }}
          >
            {title.length > 140 ? title.slice(0, 140) + '...' : title}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 24,
            borderTop: `1px solid ${dividerColor}`,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <div style={{ color: textMuted, fontSize: 14, display: 'flex' }}>
            ogpix.dev
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
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
