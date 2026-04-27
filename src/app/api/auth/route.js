import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

const CONTENT_PATH = path.join(process.cwd(), 'data', 'content.json');

function getRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (url && token) {
    return new Redis({ url, token });
  }
  return null;
}

async function getContent() {
  const redis = getRedisClient();
  if (redis) {
    try {
      const kvContent = await redis.get('portfolio_content');
      if (kvContent) {
        return typeof kvContent === 'string' ? JSON.parse(kvContent) : kvContent;
      }
    } catch (e) {
      console.error('Error reading from Redis, falling back to local file:', e);
    }
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

    const redis = getRedisClient();
    if (redis) {
      await redis.set('portfolio_content', content);
    } else {
      fs.writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error changing password:', err);
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
  }
}
