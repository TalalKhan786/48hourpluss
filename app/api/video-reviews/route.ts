import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const db = await prisma.videoReview.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(db, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve video reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.author || !body.videoUrl) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }
    const id = body.id || randomUUID();
    const saved = await prisma.videoReview.upsert({
      where: { id },
      update: {
        author: body.author,
        videoUrl: body.videoUrl,
        thumbnailUrl: body.thumbnailUrl || null,
        order: Number(body.order) || 0,
        isActive: body.isActive ?? true,
      },
      create: {
        id,
        author: body.author,
        videoUrl: body.videoUrl,
        thumbnailUrl: body.thumbnailUrl || null,
        order: Number(body.order) || 0,
        isActive: body.isActive ?? true,
      },
    });
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save video review' }, { status: 500 });
  }
}