import { TemplateProps } from './types';

export function ChangelogTemplate({
  title,
  description,
  theme = 'dark',
  brand_color = '#6366f1',
  width = 1200,
  height = 630,
}: TemplateProps) {
  const accent = brand_color;
  const bg = '#050809';
  const cardBg = '#0d1117';
  const textPrimary = '#e6edf3';
  const textSecondary = '#7d8590';
  const textMuted = '#484f58';

  return (
    <div
      style={{
        width,
        height,
        background: bg,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${accent}, ${accent}50, transparent)`,
        }}
      />

      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: -80,
          left: -80,
          width: 450,
          height: 450,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -120,
          right: 300,
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}10 0%, transparent 70%)`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              background: `${accent}18`,
              border: `1px solid ${accent}40`,
              borderRadius: 6,
              padding: '5px 14px',
              color: accent,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Changelog
          </div>
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: accent,
              display: 'flex',
            }}
          />
          <div style={{ color: textMuted, fontSize: 14, display: 'flex' }}>
            Release Notes
          </div>
        </div>

        {/* Title + description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              color: accent,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: '0.05em',
              display: 'flex',
            }}
          >
            {'>'} New Release
          </div>
          <div
            style={{
              color: textPrimary,
              fontSize: title.length > 50 ? 44 : title.length > 30 ? 54 : 64,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              display: 'flex',
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                color: textSecondary,
                fontSize: 20,
                lineHeight: 1.6,
                display: 'flex',
              }}
            >
              {description.length > 110 ? description.slice(0, 110) + '...' : description}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                border: `1.5px solid ${textMuted}`,
                display: 'flex',
              }}
            />
            <div style={{ color: textMuted, fontSize: 14, display: 'flex' }}>
              ogpix.dev
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                background: accent,
                display: 'flex',
              }}
            />
            <div style={{ color: textMuted, fontSize: 13, display: 'flex' }}>
              OGPix
            </div>
          </div>
        </div>
      </div>

      {/* Right side: terminal window */}
      <div
        style={{
          position: 'absolute',
          right: 72,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 300,
          height: 210,
          border: `1px solid ${accent}25`,
          borderRadius: 12,
          background: cardBg,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: 36,
            background: `${accent}0c`,
            borderBottom: `1px solid ${accent}20`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: '#ff5f57',
              display: 'flex',
            }}
          />
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: '#febc2e',
              display: 'flex',
            }}
          />
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: '#28c840',
              display: 'flex',
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 20px',
            gap: 12,
          }}
        >
          {[
            { sym: '+', color: accent, text: 'New features added' },
            { sym: '~', color: '#f97316', text: 'Performance improved' },
            { sym: '-', color: '#ef4444', text: 'Bugs resolved' },
            { sym: '+', color: accent, text: 'Docs updated' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ color: row.color, fontSize: 13, fontWeight: 700, display: 'flex' }}>
                {row.sym}
              </div>
              <div style={{ color: textSecondary, fontSize: 13, display: 'flex' }}>
                {row.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
