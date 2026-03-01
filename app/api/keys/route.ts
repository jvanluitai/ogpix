import { NextRequest, NextResponse } from 'next/server';
import { createApiKey, getApiKeyByEmail } from '@/lib/db';

export async function POST(request: NextRequest) {
  let email: string | undefined;

  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      const body = await request.json();
      email = body.email;
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await request.text();
      const params = new URLSearchParams(text);
      email = params.get('email') ?? undefined;
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'email is required' }, { status: 400 });
  }

  email = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  try {
    // Return existing key if email already registered
    const existing = getApiKeyByEmail(email);
    if (existing) {
      return NextResponse.json({
        api_key: existing.key,
        plan: existing.plan,
        message: 'Existing API key returned',
      });
    }

    const apiKey = createApiKey(email);
    return NextResponse.json(
      {
        api_key: apiKey.key,
        plan: apiKey.plan,
        message: 'API key created successfully',
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Key creation error:', err);
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 });
  }
}
