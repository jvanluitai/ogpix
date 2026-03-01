import { TemplateProps } from './types';

export function AnnouncementTemplate({
  title,
  description,
  theme = 'dark',
  brand_color = '#6366f1',
  width = 1200,
  height = 630,
}: TemplateProps) {
  const isDark = theme === 'dark';
  const bg = isDark ? '#06060b' : '#ffffff';
  const textPrimary = isDark ? '#ffffff' : '#06060b';
  const textSecondary = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)';

  const baseR = parseInt(brand_color.slice(1, 3), 16);
  const baseG = parseInt(brand_color.slice(3, 5), 16);
  const baseB = parseInt(brand_color.slice(5, 7), 16);
  const glow = `rgba(${baseR},${baseG},${baseB},0.25)`;

  return (
    <div
      style={{
        width,
        height,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Concentric rings */}
      {[600, 480, 360, 240].map((size, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: size,
            height: size,
            borderRadius: '50%',
            border: `1px solid ${brand_color}${['18', '14', '10', '0c'][i]}`,
            display: 'flex',
          }}
        />
      ))}

      {/* Center glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glow} 0%, transparent 65%)`,
        }}
      />

      {/* Top-right star cluster decoration */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          right: 60,
          display: 'flex',
          gap: 20,
        }}
      >
        {[20, 12, 16].map((size, i) => (
          <div
            key={i}
            style={{
              width: size,
              height: size,
              borderRadius: '50%',
              background: `${brand_color}${['60', '30', '45'][i]}`,
              display: 'flex',
            }}
          />
        ))}
      </div>

      {/* Bottom-left decoration */}
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          left: 60,
          display: 'flex',
          gap: 16,
        }}
      >
        {[14, 20, 10].map((size, i) => (
          <div
            key={i}
            style={{
              width: size,
              height: size,
              borderRadius: '50%',
              background: `${brand_color}${['35', '55', '25'][i]}`,
              display: 'flex',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          padding: '0 120px',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        {/* Announcement badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: `${brand_color}18`,
            border: `1px solid ${brand_color}40`,
            borderRadius: 100,
            padding: '8px 24px',
          }}
        >
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
              color: brand_color,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Announcement
          </div>
        </div>

        {/* Main text */}
        <div
          style={{
            color: textPrimary,
            fontSize: title.length > 50 ? 52 : title.length > 30 ? 66 : 80,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.035em',
            display: 'flex',
            textAlign: 'center',
          }}
        >
          {title}
        </div>

        {/* Description */}
        {description && (
          <div
            style={{
              color: textSecondary,
              fontSize: 22,
              lineHeight: 1.5,
              display: 'flex',
              textAlign: 'center',
              maxWidth: 700,
            }}
          >
            {description.length > 120 ? description.slice(0, 120) + '...' : description}
          </div>
        )}

        {/* CTA-style label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 2,
              background: `${brand_color}50`,
              display: 'flex',
            }}
          />
          <div style={{ color: textSecondary, fontSize: 15, display: 'flex' }}>ogpix.dev</div>
          <div
            style={{
              width: 40,
              height: 2,
              background: `${brand_color}50`,
              display: 'flex',
            }}
          />
        </div>
      </div>
    </div>
  );
}
