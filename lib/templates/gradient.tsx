import { TemplateProps } from './types';

export function GradientTemplate({
  title,
  description,
  image,
  theme = 'dark',
  brand_color = '#6366f1',
  width = 1200,
  height = 630,
}: TemplateProps) {
  const isDark = theme === 'dark';
  const textPrimary = '#ffffff';
  const textSecondary = 'rgba(255,255,255,0.75)';

  // Mesh gradient colors derived from brand_color
  const baseR = parseInt(brand_color.slice(1, 3), 16);
  const baseG = parseInt(brand_color.slice(3, 5), 16);
  const baseB = parseInt(brand_color.slice(5, 7), 16);

  const dark1 = isDark
    ? `rgb(${Math.max(baseR - 60, 0)},${Math.max(baseG - 60, 0)},${Math.max(baseB - 20, 10)})`
    : `rgb(${Math.min(baseR + 40, 255)},${Math.min(baseG + 40, 255)},${Math.min(baseB + 40, 255)})`;
  const mid = brand_color;
  const accent = `rgb(${Math.min(baseR + 80, 255)},${Math.max(baseG - 20, 0)},${Math.min(baseB + 60, 255)})`;

  return (
    <div
      style={{
        width,
        height,
        background: isDark
          ? `linear-gradient(135deg, #080810 0%, ${dark1} 40%, ${mid} 70%, ${accent} 100%)`
          : `linear-gradient(135deg, ${mid} 0%, ${accent} 60%, #ffffff 100%)`,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Mesh blobs */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          right: -100,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -150,
          left: '30%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: -100,
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)`,
        }}
      />

      {/* Glassmorphism card */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '0 80px',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 32,
            padding: '48px 60px',
            maxWidth: image ? '58%' : '72%',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Category badge */}
          <div
            style={{
              display: 'flex',
              width: 'fit-content',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 100,
              padding: '4px 16px',
              color: 'rgba(255,255,255,0.9)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Featured
          </div>

          <div
            style={{
              color: textPrimary,
              fontSize: title.length > 50 ? 42 : title.length > 35 ? 52 : 62,
              fontWeight: 800,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
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
              {description.length > 100 ? description.slice(0, 100) + '...' : description}
            </div>
          )}

          {/* Divider */}
          <div
            style={{
              width: 48,
              height: 3,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.5)',
              display: 'flex',
            }}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.8)',
                display: 'flex',
              }}
            />
            <div
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: '0.02em',
                display: 'flex',
              }}
            >
              ogpix.dev
            </div>
          </div>
        </div>
      </div>

      {/* Right side image */}
      {image && (
        <div
          style={{
            position: 'absolute',
            right: 80,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
          }}
        >
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: 32,
              background: 'rgba(255,255,255,0.12)',
              border: '2px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              src={image}
              width={260}
              height={260}
              style={{
                borderRadius: 28,
                objectFit: 'cover',
                display: 'flex',
              }}
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
}
