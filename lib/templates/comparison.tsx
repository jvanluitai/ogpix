import { TemplateProps } from './types';

export function ComparisonTemplate({
  title,
  description,
  theme = 'dark',
  brand_color = '#6366f1',
  width = 1200,
  height = 630,
}: TemplateProps) {
  const isDark = theme === 'dark';

  const baseR = parseInt(brand_color.slice(1, 3), 16);
  const baseG = parseInt(brand_color.slice(3, 5), 16);
  const baseB = parseInt(brand_color.slice(5, 7), 16);

  // Left side uses brand_color, right side uses a complementary shade
  const rightColor = `rgb(${Math.min(baseR + 60, 255)},${Math.max(baseG - 20, 0)},${Math.min(baseB + 80, 255)})`;

  const leftBg = isDark
    ? `linear-gradient(135deg, #080810 0%, ${brand_color}25 100%)`
    : `linear-gradient(135deg, #f8f8ff 0%, ${brand_color}18 100%)`;
  const rightBg = isDark
    ? `linear-gradient(135deg, ${rightColor}20 0%, #100810 100%)`
    : `linear-gradient(135deg, ${rightColor}12 0%, #f8f4ff 100%)`;

  const textPrimary = isDark ? '#ffffff' : '#0a0a14';
  const textSecondary = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)';

  const leftLabel = title;
  const rightLabel = description || '???';

  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left panel */}
      <div
        style={{
          flex: 1,
          background: leftBg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 40px',
          position: 'relative',
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${brand_color}20 0%, transparent 70%)`,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: `${brand_color}25`,
              border: `2px solid ${brand_color}50`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ color: brand_color, fontSize: 32, fontWeight: 900, display: 'flex' }}>
              A
            </div>
          </div>

          <div
            style={{
              color: textPrimary,
              fontSize: leftLabel.length > 12 ? 42 : leftLabel.length > 8 ? 54 : 68,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              textAlign: 'center',
              display: 'flex',
            }}
          >
            {leftLabel}
          </div>

          <div
            style={{
              background: brand_color,
              borderRadius: 6,
              padding: '4px 14px',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Option A
          </div>
        </div>
      </div>

      {/* VS badge — centered absolutely */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: isDark ? '#0d0d18' : '#ffffff',
          border: `3px solid ${isDark ? '#1e1e30' : '#e0e0ee'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 40px rgba(0,0,0,0.4)`,
        }}
      >
        <div
          style={{
            color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)',
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            display: 'flex',
          }}
        >
          VS
        </div>
      </div>

      {/* Right panel */}
      <div
        style={{
          flex: 1,
          background: rightBg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 40px',
          position: 'relative',
          borderLeft: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${rightColor}15 0%, transparent 70%)`,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: `${rightColor}20`,
              border: `2px solid ${rightColor}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ color: rightColor, fontSize: 32, fontWeight: 900, display: 'flex' }}>
              B
            </div>
          </div>

          <div
            style={{
              color: textPrimary,
              fontSize: rightLabel.length > 12 ? 42 : rightLabel.length > 8 ? 54 : 68,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              textAlign: 'center',
              display: 'flex',
            }}
          >
            {rightLabel}
          </div>

          <div
            style={{
              background: rightColor,
              borderRadius: 6,
              padding: '4px 14px',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Option B
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          zIndex: 5,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 3,
            background: brand_color,
            display: 'flex',
          }}
        />
        <div style={{ color: textSecondary, fontSize: 13, display: 'flex' }}>OGPix</div>
      </div>
    </div>
  );
}
