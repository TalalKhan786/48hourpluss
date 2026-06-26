import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const db = await prisma.textReview.findMany({ orderBy: { date: 'desc' } });
    return NextResponse.json(db, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve text reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.author || !body.comment) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }
    const id = body.id || randomUUID();
    const saved = await prisma.textReview.upsert({
      where: { id },
      update: {
        author: body.author,
        rating: Number(body.rating) || 5,
        comment: body.comment,
        date: body.date || new Date().toISOString().split('T')[0],
        isActive: body.isActive ?? true,
      },
      create: {
        id,
        author: body.author,
        rating: Number(body.rating) || 5,
        comment: body.comment,
        date: body.date || new Date().toISOString().split('T')[0],
        isActive: body.isActive ?? true,
      },
    });
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save text review' }, { status: 500 });
  }
}