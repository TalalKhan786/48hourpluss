import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface RouteParams { params: Promise<{ id: string }> | { id: string } }

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    await prisma.videoReview.delete({ where: { id: resolvedParams.id } });
    return NextResponse.json({ success: true, message: 'Video review deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete video review' }, { status: 500 });
  }
}