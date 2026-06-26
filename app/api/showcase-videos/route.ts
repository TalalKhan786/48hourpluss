// app/api/showcase-videos/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const dbVideos = await prisma.showcaseVideo.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(dbVideos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve videos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.videoUrl || !body.badgeText) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const videoId = body.id || randomUUID();

    const savedVideo = await prisma.showcaseVideo.upsert({
      where: { id: videoId },
      update: {
        title: body.title,
        badgeText: body.badgeText,
        videoUrl: body.videoUrl,
        order: Number(body.order) || 0,
        isActive: body.isActive ?? true,
      },
      create: {
        id: videoId,
        title: body.title,
        badgeText: body.badgeText,
        videoUrl: body.videoUrl,
        order: Number(body.order) || 0,
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json(savedVideo, { status: 201 });
  } catch (error) {
    console.error('Save video API error:', error);
    return NextResponse.json({ error: 'Failed to save video record' }, { status: 500 });
  }
}