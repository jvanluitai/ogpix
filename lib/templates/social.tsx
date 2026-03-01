import { TemplateProps } from './types';

export function SocialTemplate({
  title,
  description,
  image,
  theme = 'dark',
  brand_color = '#6366f1',
  width = 1200,
  height = 630,
}: TemplateProps) {
  const isDark = theme === 'dark';

  // Create vibrant gradient colors from brand_color
  const h = hexToHsl(brand_color);
  const color1 = brand_color;
  const color2 = hslToHex((h.h + 40) % 360, Math.min(h.s + 10, 100), Math.max(h.l - 10, 20));
  const color3 = hslToHex((h.h - 40 + 360) % 360, Math.min(h.s + 5, 100), Math.max(h.l + 5, 30));

  return (
    <div
      style={{
        width,
        height,
        background: `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Noise overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'rgba(0,0,0,0.2)'
            : 'rgba(255,255,255,0.1)',
        }}
      />

      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -80,
          left: -80,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '10%',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }}
      />

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 80px',
          position: 'relative',
          zIndex: 1,
          gap: 24,
        }}
      >
        {image && (
          <img
            src={image}
            width={96}
            height={96}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid rgba(255,255,255,0.4)',
              display: 'flex',
            }}
            alt=""
          />
        )}

        <div
          style={{
            color: '#ffffff',
            fontSize: title.length > 60 ? 46 : title.length > 40 ? 54 : 68,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            display: 'flex',
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {description && (
          <div
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 24,
              lineHeight: 1.5,
              maxWidth: 700,
              fontWeight: 400,
              display: 'flex',
              textAlign: 'center',
            }}
          >
            {description.length > 100 ? description.slice(0, 100) + '...' : description}
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          background: 'rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
        }}
      >
        <div
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 15,
            fontWeight: 500,
            display: 'flex',
          }}
        >
          ogpix.dev
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: 'rgba(255,255,255,0.5)',
            fontSize: 13,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: 'rgba(255,255,255,0.6)',
              display: 'flex',
            }}
          />
          OGPix
        </div>
      </div>
    </div>
  );
}

// Helpers for color math
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}
