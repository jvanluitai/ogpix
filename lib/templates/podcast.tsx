import { TemplateProps } from './types';

const WAVE_HEIGHTS = [22, 38, 55, 42, 70, 58, 30, 75, 48, 35, 62, 80, 44, 58, 32, 68, 50, 40, 65, 45, 78, 52, 36, 48, 60, 34, 55, 42, 70, 38];

export function PodcastTemplate({
  title,
  description,
  image,
  theme = 'dark',
  brand_color = '#6366f1',
  width = 1200,
  height = 630,
}: TemplateProps) {
  const isDark = theme === 'dark';
  const bg = isDark ? '#070709' : '#fafafa';
  const textPrimary = isDark ? '#ffffff' : '#070709';
  const textSecondary = isDark ? '#909099' : '#606068';
  const textMuted = isDark ? '#404048' : '#b0b0b8';

  // Parse description: "Episode N · Show Name"
  const descParts = description ? description.split('·').map((s) => s.trim()) : [];
  const episodeLabel = descParts[0] || 'New Episode';
  const showName = descParts[1] || '';

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
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          bottom: -100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${brand_color}18 0%, transparent 70%)`,
        }}
      />

      {/* Top gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${brand_color}, ${brand_color}60)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 80px 40px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top: episode badge + show name */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                background: brand_color,
                borderRadius: 8,
                padding: '7px 18px',
                color: '#ffffff',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.03em',
                display: 'flex',
              }}
            >
              {episodeLabel}
            </div>
            {showName && (
              <div style={{ color: textSecondary, fontSize: 16, fontWeight: 500, display: 'flex' }}>
                {showName}
              </div>
            )}
          </div>
          {image && (
            <img
              src={image}
              width={56}
              height={56}
              style={{ borderRadius: 12, objectFit: 'cover', display: 'flex' }}
              alt=""
            />
          )}
        </div>

        {/* Middle: Mic icon + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
          {/* Mic decoration */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: `${brand_color}18`,
              border: `2px solid ${brand_color}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                background: brand_color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ color: '#ffffff', fontSize: 20, fontWeight: 900, display: 'flex' }}>
                ♪
              </div>
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              color: textPrimary,
              fontSize: title.length > 60 ? 38 : title.length > 40 ? 46 : 56,
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.025em',
              display: 'flex',
            }}
          >
            {title.length > 120 ? title.slice(0, 120) + '...' : title}
          </div>
        </div>

        {/* Bottom: waveform + domain */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          {/* Waveform */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5 }}>
            {WAVE_HEIGHTS.map((h, i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: h * 0.9,
                  borderRadius: 4,
                  background:
                    i < 10
                      ? brand_color
                      : i < 18
                      ? `${brand_color}90`
                      : `${brand_color}35`,
                  display: 'flex',
                }}
              />
            ))}
          </div>

          {/* Footer */}
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
            <div style={{ color: textMuted, fontSize: 14, display: 'flex' }}>ogpix.dev</div>
          </div>
        </div>
      </div>
    </div>
  );
}
