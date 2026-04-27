import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'data', 'content.json');

function getContent() {
  const raw = fs.readFileSync(CONTENT_PATH, 'utf-8');
  return JSON.parse(raw);
}

export async function GET() {
  try {
    const content = getContent();
    // Don't expose admin password in public GET
    const { admin, ...publicContent } = content;
    return NextResponse.json(publicContent);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { password, content } = body;

    // Verify admin password
    const current = getContent();
    if (password !== current.admin?.password) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Preserve admin password in saved content
    const toSave = { ...content, admin: current.admin };
    fs.writeFileSync(CONTENT_PATH, JSON.stringify(toSave, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
