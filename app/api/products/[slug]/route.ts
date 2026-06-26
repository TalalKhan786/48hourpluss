// app/api/products/[slug]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug, prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache'; // <-- Import Next.js cache revalidation utility [1]

interface RouteParams {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const product = await getProductBySlug(resolvedParams.slug);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal system error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    
    await prisma.product.delete({
      where: { slug: resolvedParams.slug },
    });

    /* ==========================================================================
       ON-DEMAND CACHE CLEARING (PRODUCT DELETION)
       Instantly removes deleted items from storefront CDN caches [1].
       ========================================================================== */
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath('/products/[slug]', 'layout');

    return NextResponse.json({ success: true, message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete product API error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}