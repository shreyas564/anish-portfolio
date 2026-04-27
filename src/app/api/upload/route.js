import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { kv } from '@vercel/kv';
import { put } from '@vercel/blob';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function getAdminPassword() {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const kvContent = await kv.get('portfolio_content');
      if (kvContent && kvContent.admin?.password) {
        return kvContent.admin.password;
      }
    } catch (e) {
      console.error('Error reading from KV, falling back to local file:', e);
    }
  }
  
  const contentPath = path.join(process.cwd(), 'data', 'content.json');
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
  return content.admin?.password;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const category = formData.get('category') || 'general';
    const password = formData.get('password');

    // Verify password
    const adminPassword = await getAdminPassword();
    if (password !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileName = `${timestamp}_${originalName}`;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Upload to Vercel Blob
      const blob = await put(`${category}/${fileName}`, file, {
        access: 'public',
      });
      return NextResponse.json({ success: true, url: blob.url, fileName });
    } else {
      // Local Fallback
      ensureDir(UPLOAD_DIR);
      const categoryDir = path.join(UPLOAD_DIR, category);
      ensureDir(categoryDir);
      
      const filePath = path.join(categoryDir, fileName);
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${category}/${fileName}`;
      return NextResponse.json({ success: true, url: publicUrl, fileName });
    }
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
