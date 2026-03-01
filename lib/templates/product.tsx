import { TemplateProps } from './types';

export function ProductTemplate({
  title,
  description,
  image,
  theme = 'dark',
  brand_color = '#6366f1',
  width = 1200,
  height = 630,
}: TemplateProps) {
  const isDark = theme === 'dark';
  const bg = isDark ? '#09090b' : '#fafafa';
  const cardBg = isDark ? '#18181b' : '#ffffff';
  const textPrimary = isDark ? '#ffffff' : '#09090b';
  const textSecondary = isDark ? '#71717a' : '#52525b';
  const borderColor = isDark ? '#27272a' : '#e4e4e7';

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
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${borderColor} 1px, transparent 1px), linear-gradient(90deg, ${borderColor} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          opacity: 0.4,
        }}
      />

      {/* Center glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${brand_color}15 0%, transparent 70%)`,
        }}
      />

      {/* Product card */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 24,
          padding: '52px 64px',
          maxWidth: 760,
          width: '80%',
          position: 'relative',
          zIndex: 1,
          boxShadow: isDark
            ? `0 0 60px ${brand_color}15, 0 24px 48px rgba(0,0,0,0.4)`
            : `0 24px 48px rgba(0,0,0,0.08)`,
        }}
      >
        {/* Logo / image */}
        {image ? (
          <img
            src={image}
            width={80}
            height={80}
            style={{
              borderRadius: 16,
              objectFit: 'contain',
              marginBottom: 24,
              display: 'flex',
            }}
            alt=""
          />
        ) : (
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: `linear-gradient(135deg, ${brand_color}, ${brand_color}90)`,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                background: 'rgba(255,255,255,0.9)',
                borderRadius: 8,
                display: 'flex',
              }}
            />
          </div>
        )}

        {/* Product name */}
        <div
          style={{
            color: textPrimary,
            fontSize: title.length > 30 ? 40 : 52,
            fontWeight: 800,
            textAlign: 'center',
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            marginBottom: 16,
            display: 'flex',
          }}
        >
          {title}
        </div>

        {/* Tagline */}
        {description && (
          <div
            style={{
              color: textSecondary,
              fontSize: 20,
              textAlign: 'center',
              lineHeight: 1.5,
              maxWidth: 520,
              marginBottom: 32,
              display: 'flex',
            }}
          >
            {description.length > 100 ? description.slice(0, 100) + '...' : description}
          </div>
        )}

        {/* CTA button */}
        <div
          style={{
            background: brand_color,
            color: '#ffffff',
            borderRadius: 12,
            padding: '12px 32px',
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '0.01em',
            display: 'flex',
          }}
        >
          Get Started →
        </div>
      </div>

      {/* Bottom OGPix mark */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          right: 32,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          color: textSecondary,
          fontSize: 13,
          opacity: 0.5,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 3,
            background: brand_color,
            display: 'flex',
          }}
        />
        OGPix
      </div>
    </div>
  );
}
