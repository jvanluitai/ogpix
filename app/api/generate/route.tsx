import { ImageResponse } from '@vercel/og';
import { NextRequest, NextResponse } from 'next/server';
import { extractBearerToken, checkAndIncrementUsage } from '@/lib/usage';
import {
  BlogTemplate,
  ProductTemplate,
  SocialTemplate,
  MinimalTemplate,
  GradientTemplate,
} from '@/lib/templates';

export const runtime = 'nodejs';

const TEMPLATES = {
  blog: BlogTemplate,
  product: ProductTemplate,
  social: SocialTemplate,
  minimal: MinimalTemplate,
  gradient: GradientTemplate,
} as const;

type TemplateName = keyof typeof TEMPLATES;

interface GenerateParams {
  template: TemplateName;
  title: string;
  description?: string;
  image?: string;
  theme?: 'light' | 'dark';
  brand_color?: string;
  width?: number;
  height?: number;
}

function parseParams(data: Record<string, string | undefined>): GenerateParams | { error: string } {
  const title = data.title?.trim();
  if (!title) return { error: 'title is required' };

  const templateName = (data.template ?? 'blog') as TemplateName;
  if (!TEMPLATES[templateName]) {
    return { error: `template must be one of: ${Object.keys(TEMPLATES).join(', ')}` };
  }

  const width = data.width ? parseInt(data.width, 10) : 1200;
  const height = data.height ? parseInt(data.height, 10) : 630;

  if (isNaN(width) || width < 100 || width > 2400) return { error: 'width must be 100–2400' };
  if (isNaN(height) || height < 100 || height > 1260) return { error: 'height must be 100–1260' };

  const theme = data.theme === 'light' ? 'light' : 'dark';

  const brand_color = data.brand_color
    ? /^#[0-9a-fA-F]{6}$/.test(data.brand_color)
      ? data.brand_color
      : '#6366f1'
    : '#6366f1';

  return {
    template: templateName,
    title,
    description: data.description?.trim(),
    image: data.image?.trim(),
    theme,
    brand_color,
    width,
    height,
  };
}

async function handleRequest(request: NextRequest, bodyData?: Record<string, string>) {
  // Allow demo previews without auth
  const isDemo = request.nextUrl.searchParams.get("demo") === "1";
  
  let plan = 'free';
  if (!isDemo) {
    // Auth check
    const authHeader = request.headers.get('Authorization');
    const token = extractBearerToken(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'Missing Authorization header. Use: Authorization: Bearer <api_key>' },
        { status: 401 }
      );
    }

    const authResult = checkAndIncrementUsage(token);
    if (!authResult.ok) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }
    plan = authResult.apiKey!.plan;
  }

  // Parse params (from body or query string)
  const queryData: Record<string, string | undefined> = {};
  request.nextUrl.searchParams.forEach((value, key) => {
    queryData[key] = value;
  });

  const data = { ...queryData, ...bodyData };
  const params = parseParams(data);
  if ('error' in params) {
    return NextResponse.json({ error: params.error }, { status: 400 });
  }

  const { template, ...props } = params;
  const Template = TEMPLATES[template];

  try {
    const imageResponse = new ImageResponse(
      <Template {...props} />,
      {
        width: params.width,
        height: params.height,
      }
    );

    // Add cache headers
    const response = new Response(imageResponse.body, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-OGPix-Plan': plan,
      },
    });

    return response;
  } catch (err) {
    console.error('Image generation error:', err);
    return NextResponse.json({ error: 'Image generation failed' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  let bodyData: Record<string, string> = {};
  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      const body = await request.json();
      for (const [k, v] of Object.entries(body)) {
        if (typeof v === 'string' || typeof v === 'number') {
          bodyData[k] = String(v);
        }
      }
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await request.text();
      const params = new URLSearchParams(text);
      params.forEach((value, key) => {
        bodyData[key] = value;
      });
    }
  } catch {
    // ignore parse errors, fall back to query params
  }

  return handleRequest(request, bodyData);
}
