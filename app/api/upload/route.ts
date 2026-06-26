// app/api/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { put } from '@vercel/blob';

// Increase the Next.js body size limit to support uploading larger MP4 video files
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb', // Raised from 4MB to 50MB
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided in request' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    /* ==========================================================================
       OPTION 1: VERCEL BLOB CLOUD UPLOAD
       ========================================================================== */
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(file.name, file, { 
        access: 'public',
        contentType: file.type 
      });

      return NextResponse.json({ 
        success: true, 
        url: blob.url,
        provider: 'Vercel Blob' 
      }, { status: 201 });
    }

    /* ==========================================================================
       OPTION 2: LOCAL DISK UPLOAD
       ========================================================================== */
    const uploadDirectory = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDirectory, { recursive: true });

    const cleanFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const destinationPath = path.join(uploadDirectory, cleanFileName);

    await writeFile(destinationPath, buffer);
    const fileUrl = `/uploads/${cleanFileName}`;

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      provider: 'Local Storage Fallback'
    }, { status: 201 });

  } catch (error) {
    console.error("Image upload processing failure:", error);
    return NextResponse.json({ error: 'System failed to upload asset' }, { status: 500 });
  }
}