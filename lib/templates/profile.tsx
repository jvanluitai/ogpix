import { TemplateProps } from './types';

export function ProfileTemplate({
  title,
  description,
  image,
  theme = 'dark',
  brand_color = '#6366f1',
  width = 1200,
  height = 630,
}: TemplateProps) {
  const isDark = theme === 'dark';
  const bg = isDark ? '#08090d' : '#f5f5f7';
  const textPrimary = isDark ? '#ffffff' : '#0a0a0f';
  const textSecondary = isDark ? '#a0a0b0' : '#555560';
  const textMuted = isDark ? '#50505a' : '#a0a0aa';

  // Parse description: "Job Title · Company"
  const descParts = description ? description.split('·').map((s) => s.trim()) : [];
  const jobTitle = descParts[0] || '';
  const company = descParts[1] || '';

  const baseR = parseInt(brand_color.slice(1, 3), 16);
  const baseG = parseInt(brand_color.slice(3, 5), 16);
  const baseB = parseInt(brand_color.slice(5, 7), 16);
  const accentDark = isDark
    ? `rgb(${Math.max(baseR - 40, 0)},${Math.max(baseG - 40, 0)},${Math.max(baseB - 10, 10)})`
    : `rgb(${Math.min(baseR + 30, 255)},${Math.min(baseG + 30, 255)},${Math.min(baseB + 60, 255)})`;

  return (
    <div
      style={{
        width,
        height,
        background: isDark
          ? `linear-gradient(145deg, #08090d 0%, ${accentDark}40 100%)`
          : `linear-gradient(145deg, #f5f5f7 0%, ${brand_color}15 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background orbs */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          right: -50,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${brand_color}20 0%, transparent 65%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -150,
          left: 100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${brand_color}15 0%, transparent 65%)`,
        }}
      />

      {/* Profile card */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 80,
          padding: '60px 80px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Avatar */}
        <div style={{ display: 'flex', flexShrink: 0 }}>
          {image ? (
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: '50%',
                border: `4px solid ${brand_color}60`,
                background: `${brand_color}20`,
                display: 'flex',
                overflow: 'hidden',
              }}
            >
              <img
                src={image}
                width={220}
                height={220}
                style={{ objectFit: 'cover', display: 'flex' }}
                alt=""
              />
            </div>
          ) : (
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${brand_color}40, ${brand_color}20)`,
                border: `4px solid ${brand_color}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  color: brand_color,
                  fontSize: 80,
                  fontWeight: 800,
                  display: 'flex',
                  opacity: 0.8,
                }}
              >
                {title.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Name */}
          <div
            style={{
              color: textPrimary,
              fontSize: title.length > 20 ? 56 : 72,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              display: 'flex',
            }}
          >
            {title}
          </div>

          {/* Job title */}
          {jobTitle && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  color: brand_color,
                  fontSize: 22,
                  fontWeight: 600,
                  display: 'flex',
                }}
              >
                {jobTitle}
              </div>
              {company && (
                <>
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: textMuted,
                      display: 'flex',
                    }}
                  />
                  <div
                    style={{
                      color: textSecondary,
                      fontSize: 22,
                      fontWeight: 500,
                      display: 'flex',
                    }}
                  >
                    {company}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Divider */}
          <div
            style={{
              width: 60,
              height: 3,
              borderRadius: 2,
              background: brand_color,
              display: 'flex',
            }}
          />

          {/* Footer label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                background: brand_color,
                display: 'flex',
              }}
            />
            <div style={{ color: textMuted, fontSize: 15, display: 'flex' }}>ogpix.dev</div>
          </div>
        </div>
      </div>
    </div>
  );
}
