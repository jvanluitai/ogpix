import { TemplateProps } from './types';

export function BlogTemplate({
  title,
  description,
  image,
  theme = 'dark',
  brand_color = '#6366f1',
  width = 1200,
  height = 630,
}: TemplateProps) {
  const isDark = theme === 'dark';
  const bg = isDark ? '#0f0f13' : '#ffffff';
  const textPrimary = isDark ? '#ffffff' : '#0f0f13';
  const textSecondary = isDark ? '#a1a1aa' : '#52525b';

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
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Gradient orb top-left */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          left: -80,
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${brand_color}30 0%, transparent 70%)`,
        }}
      />
      {/* Gradient orb bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: -100,
          right: -60,
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${brand_color}20 0%, transparent 70%)`,
        }}
      />

      {/* Top accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${brand_color}, ${brand_color}80)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 72px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Blog label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              background: `${brand_color}20`,
              border: `1px solid ${brand_color}50`,
              borderRadius: 8,
              padding: '6px 16px',
              color: brand_color,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Blog Post
          </div>
        </div>

        {/* Title + Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              color: textPrimary,
              fontSize: title.length > 50 ? 44 : 56,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                color: textSecondary,
                fontSize: 22,
                lineHeight: 1.5,
                maxWidth: image ? '65%' : '80%',
                display: 'flex',
              }}
            >
              {description.length > 120 ? description.slice(0, 120) + '...' : description}
            </div>
          )}
        </div>

        {/* Footer: avatar + domain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {image && (
              <img
                src={image}
                width={48}
                height={48}
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `2px solid ${brand_color}60`,
                }}
                alt=""
              />
            )}
            <div
              style={{
                color: textSecondary,
                fontSize: 18,
                fontWeight: 500,
                display: 'flex',
              }}
            >
              ogpix.dev
            </div>
          </div>

          {/* OGPix watermark */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: textSecondary,
              fontSize: 14,
              opacity: 0.6,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                background: brand_color,
                display: 'flex',
              }}
            />
            OGPix
          </div>
        </div>
      </div>

      {/* Right side image */}
      {image && (
        <div
          style={{
            position: 'absolute',
            right: 72,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
          }}
        >
          <img
            src={image}
            width={200}
            height={200}
            style={{
              borderRadius: 20,
              objectFit: 'cover',
              border: `3px solid ${brand_color}40`,
            }}
            alt=""
          />
        </div>
      )}
    </div>
  );
}
