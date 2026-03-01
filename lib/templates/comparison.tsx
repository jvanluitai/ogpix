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
  const textPrimary = isDark ? '#ffffff' : '#0a0a14';
  const textSecondary = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)';
  const bg = isDark ? '#0a0a14' : '#fafafe';
  const leftLabel = title;
  const rightLabel = description || '???';

  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, system-ui, sans-serif',
        background: bg,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '36px 0 0 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
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
          <div style={{ color: textSecondary, fontSize: 14, fontWeight: 600, display: 'flex' }}>
            Comparison
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 48,
          padding: '0 60px',
        }}
      >
        {/* Left */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            flex: 1,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: `${brand_color}20`,
              border: `2px solid ${brand_color}50`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: brand_color,
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            A
          </div>
          <div
            style={{
              color: textPrimary,
              fontSize: leftLabel.length > 15 ? 36 : 48,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              display: 'flex',
              textAlign: 'center',
            }}
          >
            {leftLabel}
          </div>
        </div>

        {/* VS */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: 9999,
            background: isDark ? '#1a1a2e' : '#eeeef4',
            border: `2px solid ${isDark ? '#2a2a40' : '#d0d0de'}`,
          }}
        >
          <div
            style={{
              color: textSecondary,
              fontSize: 22,
              fontWeight: 900,
              display: 'flex',
            }}
          >
            VS
          </div>
        </div>

        {/* Right */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            flex: 1,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: 'rgba(168,85,247,0.15)',
              border: '2px solid rgba(168,85,247,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#a855f7',
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            B
          </div>
          <div
            style={{
              color: textPrimary,
              fontSize: rightLabel.length > 15 ? 36 : 48,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              display: 'flex',
              textAlign: 'center',
            }}
          >
            {rightLabel}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '0 0 32px 0',
        }}
      >
        <div style={{ color: textSecondary, fontSize: 13, display: 'flex' }}>ogpix.dev</div>
      </div>
    </div>
  );
}
