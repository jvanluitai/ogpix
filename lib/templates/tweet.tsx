import { TemplateProps } from './types';

export function TweetTemplate({
  title,
  description,
  image,
  theme = 'dark',
  brand_color = '#6366f1',
  width = 1200,
  height = 630,
}: TemplateProps) {
  const isDark = theme === 'dark';
  const bg = isDark ? '#0d0f12' : '#ffffff';
  const cardBg = isDark ? '#16191e' : '#f7f7f8';
  const textPrimary = isDark ? '#e7e9ea' : '#0f1419';
  const textSecondary = isDark ? '#71767b' : '#536471';
  const borderColor = isDark ? '#2f3336' : '#eff3f4';

  // Parse author info from description (e.g. "Name · @handle")
  const authorParts = description ? description.split('·').map((s) => s.trim()) : [];
  const authorName = authorParts[0] || 'Anonymous';
  const authorHandle = authorParts[1] || '';

  return (
    <div
      style={{
        width,
        height,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${brand_color}10 0%, transparent 60%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -150,
          left: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${brand_color}08 0%, transparent 60%)`,
        }}
      />

      {/* Tweet card */}
      <div
        style={{
          width: 900,
          background: cardBg,
          borderRadius: 24,
          border: `1px solid ${borderColor}`,
          padding: '56px 64px',
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Large decorative quote mark */}
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 48,
            fontSize: 140,
            lineHeight: 1,
            color: brand_color,
            opacity: 0.2,
            fontWeight: 900,
            display: 'flex',
          }}
        >
          "
        </div>

        {/* Quote text */}
        <div
          style={{
            color: textPrimary,
            fontSize: title.length > 140 ? 28 : title.length > 80 ? 34 : 40,
            fontWeight: 600,
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
            display: 'flex',
            paddingTop: 16,
            zIndex: 1,
          }}
        >
          {title.length > 200 ? title.slice(0, 200) + '...' : title}
        </div>

        {/* Author */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {image ? (
            <img
              src={image}
              width={52}
              height={52}
              style={{ borderRadius: '50%', objectFit: 'cover', display: 'flex' }}
              alt=""
            />
          ) : (
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: `${brand_color}30`,
                border: `2px solid ${brand_color}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ color: brand_color, fontSize: 20, fontWeight: 700, display: 'flex' }}>
                {authorName.charAt(0).toUpperCase()}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div
              style={{
                color: textPrimary,
                fontSize: 18,
                fontWeight: 700,
                display: 'flex',
              }}
            >
              {authorName}
            </div>
            {authorHandle && (
              <div style={{ color: textSecondary, fontSize: 16, display: 'flex' }}>
                {authorHandle}
              </div>
            )}
          </div>

          {/* Twitter/X bird mark */}
          <div
            style={{
              marginLeft: 'auto',
              color: brand_color,
              fontSize: 28,
              fontWeight: 900,
              display: 'flex',
              opacity: 0.7,
            }}
          >
            ✕
          </div>
        </div>
      </div>
    </div>
  );
}
