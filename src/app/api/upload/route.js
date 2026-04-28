import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getPortfolioContent } from '@/lib/redis';
import { put } from '@vercel/blob';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function getAdminPassword() {
  const redisContent = await getPortfolioContent();
  if (redisContent && redisContent.admin?.password) {
    return redisContent.admin.password;
  }
  
  try {
    const contentPath = path.join(process.cwd(), 'data', 'content.json');
    const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
    return content.admin?.password;
  } catch (err) {
    console.error('Failed to read local content.json:', err);
    return null;
  }
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
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      return NextResponse.json({ success: true, url: blob.url, fileName });
    } else {
      if (process.env.VERCEL) {
        return NextResponse.json({ error: 'Vercel Blob Storage is not configured. File uploads require BLOB_READ_WRITE_TOKEN environment variable.' }, { status: 500 });
      }

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
    return NextResponse.json({ error: 'Upload failed: ' + err.message }, { status: 500 });
  }
}
