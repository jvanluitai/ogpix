import { NextRequest, NextResponse } from 'next/server';
import { getApiKey } from '@/lib/db';
import { extractBearerToken, getUsageInfo } from '@/lib/usage';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const token = extractBearerToken(authHeader);

  if (!token) {
    return NextResponse.json(
      { error: 'Missing Authorization header. Use: Authorization: Bearer <api_key>' },
      { status: 401 }
    );
  }

  const apiKey = await getApiKey(token);
  if (!apiKey) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
  }

  const info = await getUsageInfo(apiKey);
  return NextResponse.json(info);
}
