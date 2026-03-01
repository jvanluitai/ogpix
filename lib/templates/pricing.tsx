import { TemplateProps } from './types';

export function PricingTemplate({
  title,
  description,
  theme = 'dark',
  brand_color = '#6366f1',
  width = 1200,
  height = 630,
}: TemplateProps) {
  const isDark = theme === 'dark';
  const bg = isDark ? '#07080c' : '#f6f7fb';
  const cardBg = isDark ? '#0e1018' : '#ffffff';
  const textPrimary = isDark ? '#f0f0ff' : '#07080c';
  const textSecondary = isDark ? '#8888a0' : '#55556a';
  const borderColor = isDark ? '#1c1d28' : '#e4e5f0';

  // Parse description: "$49/month · Feature 1 · Feature 2 · Feature 3"
  const descParts = description ? description.split('·').map((s) => s.trim()) : [];
  const price = descParts[0] || '';
  const features = descParts.slice(1).filter(Boolean);

  const baseR = parseInt(brand_color.slice(1, 3), 16);
  const baseG = parseInt(brand_color.slice(3, 5), 16);
  const baseB = parseInt(brand_color.slice(5, 7), 16);
  const glowColor = `rgba(${baseR},${baseG},${baseB},0.15)`;

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
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 65%)`,
        }}
      />

      {/* Pricing card */}
      <div
        style={{
          width: 900,
          background: cardBg,
          borderRadius: 28,
          border: `2px solid ${brand_color}40`,
          padding: '56px 64px',
          display: 'flex',
          gap: 64,
          position: 'relative',
          zIndex: 1,
          boxShadow: `0 0 80px ${glowColor}`,
        }}
      >
        {/* Left: plan name + price */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            flex: 1,
          }}
        >
          {/* Plan name badge */}
          <div
            style={{
              background: `${brand_color}18`,
              border: `1px solid ${brand_color}40`,
              borderRadius: 8,
              padding: '6px 16px',
              color: brand_color,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            {title}
          </div>

          {/* Price */}
          {price && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div
                style={{
                  color: textPrimary,
                  fontSize: 72,
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  display: 'flex',
                }}
              >
                {price.split('/')[0]}
              </div>
              {price.includes('/') && (
                <div style={{ color: textSecondary, fontSize: 18, display: 'flex' }}>
                  {'/' + price.split('/').slice(1).join('/')}
                </div>
              )}
            </div>
          )}

          {/* CTA button */}
          <div
            style={{
              background: brand_color,
              borderRadius: 10,
              padding: '14px 32px',
              color: '#ffffff',
              fontSize: 17,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex' }}>Get Started</div>
            <div style={{ display: 'flex' }}>→</div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            background: borderColor,
            display: 'flex',
            flexShrink: 0,
          }}
        />

        {/* Right: features */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div style={{ color: textSecondary, fontSize: 14, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex' }}>
            Includes
          </div>
          {(features.length > 0
            ? features.slice(0, 5)
            : ['Everything in Free', 'Unlimited requests', 'Priority support']
          ).map((feat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: `${brand_color}20`,
                  border: `1.5px solid ${brand_color}50`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <div style={{ color: brand_color, fontSize: 12, fontWeight: 700, display: 'flex' }}>✓</div>
              </div>
              <div style={{ color: textPrimary, fontSize: 17, fontWeight: 500, display: 'flex' }}>
                {feat}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom mark */}
      <div
        style={{
          position: 'absolute',
          bottom: 28,
          right: 40,
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
            opacity: 0.6,
          }}
        />
        <div style={{ color: textSecondary, fontSize: 13, opacity: 0.6, display: 'flex' }}>
          OGPix
        </div>
      </div>
    </div>
  );
}
