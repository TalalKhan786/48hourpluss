// app/api/products/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getProducts, saveProduct } from '@/lib/db';
import { Product } from '@/lib/types';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache'; // <-- Import Next.js cache revalidation utility [1]

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category') || undefined;
    const includeInactive = searchParams.get('inactive') === 'true';

    const products = await getProducts({ categorySlug, includeInactive });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.slug || !body.price || !body.categorySlug) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const newProduct: Product = {
      id: body.id || randomUUID(),
      name: body.name,
      slug: body.slug,
      price: body.price,
      categorySlug: body.categorySlug,
      description: body.description || '',
      ingredients: body.ingredients || [],
      images: body.images || [],
      reviews: body.reviews || [],
      stock: body.stock ?? 1,
      isActive: body.isActive ?? true
    };

    const saved = await saveProduct(newProduct);

    /* ==========================================================================
       ON-DEMAND CACHE CLEARING (PRODUCTS)
       Instantly purges the Edge CDN cache for your storefront views [1].
       ========================================================================== */
    revalidatePath('/'); // Purge homepage featured grid [1]
    revalidatePath('/products'); // Purge main product catalog list [1]
    revalidatePath('/products/[slug]', 'layout'); // Purge individual product specifications subpage [1]

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error("Save product API failure:", error);
    return NextResponse.json({ error: 'Failed to save product in database' }, { status: 500 });
  }
}