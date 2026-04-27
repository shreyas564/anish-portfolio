import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getPortfolioContent, setPortfolioContent } from '@/lib/redis';

const CONTENT_PATH = path.join(process.cwd(), 'data', 'content.json');

async function getContent() {
  const redisContent = await getPortfolioContent();
  if (redisContent) {
    return redisContent;
  }
  
  const raw = fs.readFileSync(CONTENT_PATH, 'utf-8');
  return JSON.parse(raw);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { password, newPassword } = body;

    const content = await getContent();

    if (password !== content.admin?.password) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
    }

    content.admin.password = newPassword;

    const savedToRedis = await setPortfolioContent(content);
    if (!savedToRedis) {
      fs.writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error changing password:', err);
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
  }
}
