// app/api/showcase-videos/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }> | { id: string };
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    await prisma.showcaseVideo.delete({
      where: { id: resolvedParams.id },
    });
    return NextResponse.json({ success: true, message: 'Video deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete video API error:', error);
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
  }
}