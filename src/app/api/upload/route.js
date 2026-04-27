import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export async function POST(request) {
  try {
    ensureDir(UPLOAD_DIR);

    const formData = await request.formData();
    const file = formData.get('file');
    const category = formData.get('category') || 'general';
    const password = formData.get('password');

    // Verify password
    const contentPath = path.join(process.cwd(), 'data', 'content.json');
    const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
    if (password !== content.admin?.password) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Create category subdirectory
    const categoryDir = path.join(UPLOAD_DIR, category);
    ensureDir(categoryDir);

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileName = `${timestamp}_${originalName}`;
    const filePath = path.join(categoryDir, fileName);

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filePath, buffer);

    // Return public URL
    const publicUrl = `/uploads/${category}/${fileName}`;
    return NextResponse.json({ success: true, url: publicUrl, fileName });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
