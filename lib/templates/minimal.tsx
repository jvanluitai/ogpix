import { TemplateProps } from './types';

export function MinimalTemplate({
  title,
  description,
  image,
  theme = 'dark',
  brand_color = '#6366f1',
  width = 1200,
  height = 630,
}: TemplateProps) {
  const isDark = theme === 'dark';
  const bg = isDark ? '#0a0a0a' : '#ffffff';
  const textPrimary = isDark ? '#ffffff' : '#000000';
  const textSecondary = isDark ? '#525252' : '#a3a3a3';
  const lineColor = isDark ? '#1f1f1f' : '#f0f0f0';

  return (
    <div
      style={{
        width,
        height,
        background: bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle corner marks */}
      <div style={{ position: 'absolute', top: 40, left: 40, width: 20, height: 20, borderTop: `2px solid ${brand_color}`, borderLeft: `2px solid ${brand_color}`, display: 'flex' }} />
      <div style={{ position: 'absolute', top: 40, right: 40, width: 20, height: 20, borderTop: `2px solid ${brand_color}`, borderRight: `2px solid ${brand_color}`, display: 'flex' }} />
      <div style={{ position: 'absolute', bottom: 40, left: 40, width: 20, height: 20, borderBottom: `2px solid ${brand_color}`, borderLeft: `2px solid ${brand_color}`, display: 'flex' }} />
      <div style={{ position: 'absolute', bottom: 40, right: 40, width: 20, height: 20, borderBottom: `2px solid ${brand_color}`, borderRight: `2px solid ${brand_color}`, display: 'flex' }} />

      {/* Horizontal lines */}
      <div style={{ position: 'absolute', top: '50%', left: 80, width: '100%', height: 1, background: lineColor, transform: 'translateY(-80px)', display: 'flex' }} />
      <div style={{ position: 'absolute', top: '50%', left: 80, width: '100%', height: 1, background: lineColor, transform: 'translateY(80px)', display: 'flex' }} />

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 120px',
          gap: 20,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {image && (
          <img
            src={image}
            width={64}
            height={64}
            style={{
              borderRadius: 12,
              objectFit: 'cover',
              marginBottom: 8,
              display: 'flex',
            }}
            alt=""
          />
        )}

        {/* Accent dot */}
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: brand_color,
            display: 'flex',
          }}
        />

        <div
          style={{
            color: textPrimary,
            fontSize: title.length > 60 ? 44 : title.length > 40 ? 54 : 68,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            display: 'flex',
            textAlign: 'center',
          }}
        >
          {title}
        </div>

        {description && (
          <div
            style={{
              color: textSecondary,
              fontSize: 20,
              letterSpacing: '0.01em',
              lineHeight: 1.6,
              maxWidth: 600,
              display: 'flex',
              textAlign: 'center',
            }}
          >
            {description.length > 120 ? description.slice(0, 120) + '...' : description}
          </div>
        )}
      </div>

      {/* Bottom domain */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: brand_color,
            display: 'flex',
          }}
        />
        <div
          style={{
            color: textSecondary,
            fontSize: 14,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          ogpix.dev
        </div>
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: brand_color,
            display: 'flex',
          }}
        />
      </div>
    </div>
  );
}
