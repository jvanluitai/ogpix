import { TemplateProps } from './types';

export function EventTemplate({
  title,
  description,
  image,
  theme = 'dark',
  brand_color = '#6366f1',
  width = 1200,
  height = 630,
}: TemplateProps) {
  const isDark = theme === 'dark';
  const bg = isDark ? '#06060a' : '#ffffff';
  const textPrimary = isDark ? '#ffffff' : '#06060a';
  const textSecondary = isDark ? '#a0a0b8' : '#555568';

  // Parse description: "Date · Location"
  const descParts = description ? description.split('·').map((s) => s.trim()) : [];
  const eventDate = descParts[0] || '';
  const eventLocation = descParts[1] || '';

  const baseR = parseInt(brand_color.slice(1, 3), 16);
  const baseG = parseInt(brand_color.slice(3, 5), 16);
  const baseB = parseInt(brand_color.slice(5, 7), 16);
  const complementColor = `rgb(${Math.min(baseR + 80, 255)},${Math.max(baseG - 30, 0)},${Math.min(baseB + 50, 255)})`;

  return (
    <div
      style={{
        width,
        height,
        background: bg,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bold diagonal accent background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '45%',
          height: '100%',
          background: isDark
            ? `linear-gradient(135deg, ${brand_color}25 0%, ${brand_color}08 100%)`
            : `linear-gradient(135deg, ${brand_color}15 0%, ${brand_color}05 100%)`,
          display: 'flex',
        }}
      />

      {/* Large decorative circle */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 500,
          height: 500,
          borderRadius: '50%',
          border: `2px solid ${brand_color}20`,
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 380,
          height: 380,
          borderRadius: '50%',
          border: `2px solid ${brand_color}15`,
          display: 'flex',
        }}
      />

      {/* Bottom glow */}
      <div
        style={{
          position: 'absolute',
          bottom: -80,
          left: '10%',
          width: 600,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${brand_color}20 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 80px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top: Event label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              background: brand_color,
              borderRadius: 6,
              padding: '6px 18px',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Event
          </div>
          {image && (
            <img
              src={image}
              width={36}
              height={36}
              style={{ borderRadius: 8, objectFit: 'cover', display: 'flex' }}
              alt=""
            />
          )}
        </div>

        {/* Center: Event name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              color: textPrimary,
              fontSize: title.length > 40 ? 52 : title.length > 25 ? 66 : 80,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              display: 'flex',
            }}
          >
            {title}
          </div>

          {/* Date + Location pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {eventDate && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: isDark ? '#1a1a2a' : '#f0f0f8',
                  borderRadius: 8,
                  padding: '10px 20px',
                  border: `1px solid ${brand_color}30`,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: brand_color,
                    display: 'flex',
                  }}
                />
                <div
                  style={{
                    color: textSecondary,
                    fontSize: 18,
                    fontWeight: 600,
                    display: 'flex',
                  }}
                >
                  {eventDate}
                </div>
              </div>
            )}
            {eventLocation && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: isDark ? '#1a1a2a' : '#f0f0f8',
                  borderRadius: 8,
                  padding: '10px 20px',
                  border: `1px solid ${brand_color}20`,
                }}
              >
                <div
                  style={{
                    color: complementColor,
                    fontSize: 18,
                    fontWeight: 600,
                    display: 'flex',
                  }}
                >
                  ◎
                </div>
                <div
                  style={{
                    color: textSecondary,
                    fontSize: 18,
                    fontWeight: 600,
                    display: 'flex',
                  }}
                >
                  {eventLocation}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ color: textSecondary, fontSize: 15, display: 'flex' }}>
            ogpix.dev
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
            <div style={{ color: textSecondary, fontSize: 13, display: 'flex' }}>OGPix</div>
          </div>
        </div>
      </div>
    </div>
  );
}
