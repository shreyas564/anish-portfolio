import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'data', 'content.json');

export async function POST(request) {
  try {
    const body = await request.json();
    const { password, newPassword } = body;

    const raw = fs.readFileSync(CONTENT_PATH, 'utf-8');
    const content = JSON.parse(raw);

    if (password !== content.admin?.password) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
    }

    content.admin.password = newPassword;
    fs.writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
  }
}
