import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getPortfolioContent, setPortfolioContent } from '@/lib/redis';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CONTENT_PATH = path.join(process.cwd(), 'data', 'content.json');

async function getContent() {
  const redisContent = await getPortfolioContent();
  if (redisContent) {
    return redisContent;
  }
  
  // Fallback to local file (used initially before first save, or locally)
  try {
    const raw = fs.readFileSync(CONTENT_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read local content.json:', err);
    return { admin: { password: 'admin' } }; // Basic fallback
  }
}

export async function GET() {
  try {
    const content = await getContent();
    // Don't expose admin password in public GET
    const { admin, ...publicContent } = content;
    return NextResponse.json(publicContent);
  } catch (err) {
    console.error('Error in GET /api/content:', err);
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { password, content } = body;

    // Verify admin password
    const current = await getContent();
    if (password !== current.admin?.password) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Preserve admin password in saved content
    const toSave = { ...content, admin: current.admin };

    const savedToRedis = await setPortfolioContent(toSave);
    if (!savedToRedis) {
      // Local fallback
      fs.writeFileSync(CONTENT_PATH, JSON.stringify(toSave, null, 2), 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error in POST /api/content:', err);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
