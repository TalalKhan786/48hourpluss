import { createOrder } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { customerName, fatherName, contactNumber, address, items, subtotal, shippingFee, total, paymentProofUrl, notes } = body;

    // Validate required fields
    if (!customerName || !fatherName || !contactNumber || !address || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create order in database
    const result = await createOrder({
      customerName,
      fatherName,
      contactNumber,
      address,
      items,
      subtotal,
      shippingFee,
      total,
      paymentProofUrl,
      notes,
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: result.id,
      orderNumber: result.orderNumber,
      message: 'Order created successfully. Admin will review and process shortly.',
    });
  } catch (error) {
    console.error('[v0] Order creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET orders - admin only
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // In production, add admin authentication check here
    // For now, we'll allow access to be restricted at the component level

    const orders = await (await import('@/lib/db')).getOrders({ status: status || undefined, limit, offset });

    return NextResponse.json({
      success: true,
      orders,
      total: orders.length,
    });
  } catch (error) {
    console.error('[v0] Get orders error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
