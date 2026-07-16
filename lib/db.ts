// lib/db.ts (Overwrite the top connection block)

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { Product, Category, Offer, HeroSlide, ShowcaseVideo, VideoReview, TextReview, Order, OrderItem } from './types';

/* 
   PORT-BLOCKING COMPLIANT INITIALIZATION:
   Connect strictly via DATABASE_URL (Port 6543) [1.1].
   This routes the connection through standard SSL, bypassing any residential ISP port-5432 blocks [1.1].
*/
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Initialize PrismaClient with the PostgreSQL driver adapter
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

/* ==========================================================================
   PRODUCTS CRUD (PRISMA IMPLEMENTATION)
   ========================================================================== */
// ... keep all other functions (getProducts, saveProduct, etc.) exactly the same below

export async function getProducts(options?: { categorySlug?: string; includeInactive?: boolean }): Promise<Product[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      where: {
        isActive: options?.includeInactive ? undefined : true,
        categorySlug: options?.categorySlug || undefined,
      },
      include: {
        images: true,
        ingredients: true,
        reviews: true,
      },
    });

    return dbProducts.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      categorySlug: p.categorySlug,
      description: p.description,
      stock: p.stock,
      isActive: p.isActive,
      images: p.images.map((img) => img.url),
      ingredients: p.ingredients.map((ing) => ing.name),
      reviews: p.reviews.map((rev) => ({
        id: rev.id,
        author: rev.author,
        rating: rev.rating,
        comment: rev.comment,
        date: rev.date,
      })),
    }));
  } catch (error) {
    console.error("[v0] Database connection error in getProducts:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const p = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: true,
        ingredients: true,
        reviews: true,
      },
    });

    if (!p) return undefined;

    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      categorySlug: p.categorySlug,
      description: p.description,
      stock: p.stock,
      isActive: p.isActive,
      images: p.images.map((img) => img.url),
      ingredients: p.ingredients.map((ing) => ing.name),
      reviews: p.reviews.map((rev) => ({
        id: rev.id,
        author: rev.author,
        rating: rev.rating,
        comment: rev.comment,
        date: rev.date,
      })),
    };
  } catch (error) {
    console.error("[v0] Database connection error in getProductBySlug:", error);
    return undefined;
  }
}

export async function saveProduct(product: Product): Promise<Product> {
  try {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        price: product.price,
        categorySlug: product.categorySlug,
        description: product.description,
        stock: product.stock,
        isActive: product.isActive,
        images: {
          deleteMany: {},
          create: product.images.map((url) => ({ url })),
        },
        ingredients: {
          deleteMany: {},
          create: product.ingredients.map((name) => ({ name })),
        },
      },
      create: {
        name: product.name,
        slug: product.slug,
        price: product.price,
        categorySlug: product.categorySlug,
        description: product.description,
        stock: product.stock,
        isActive: product.isActive,
        images: {
          create: product.images.map((url) => ({ url })),
        },
        ingredients: {
          create: product.ingredients.map((name) => ({ name })),
        },
      },
    });

    return product;
  } catch (error) {
    console.error("[v0] Database connection error in saveProduct:", error);
    return product;
  }
}

/* ==========================================================================
   CATEGORIES CRUD (PRISMA IMPLEMENTATION)
   ========================================================================== */

export async function getCategories(): Promise<Category[]> {
  try {
    const dbCategories = await prisma.category.findMany();
    return dbCategories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || undefined,
      image: c.image || undefined,
    }));
  } catch (error) {
    console.error("[v0] Database connection error in getCategories:", error);
    return [];
  }
}

export async function saveCategory(category: Category): Promise<Category> {
  try {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description || null,
        image: category.image || null,
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description || null,
        image: category.image || null,
      },
    });

    return category;
  } catch (error) {
    console.error("[v0] Database connection error in saveCategory:", error);
    return category;
  }
}

/* ==========================================================================
   OFFERS CRUD (PRISMA IMPLEMENTATION)
   ========================================================================== */

export async function getOffers(): Promise<Offer[]> {
  try {
    const dbOffers = await prisma.offer.findMany();
    return dbOffers.map((o) => ({
      id: o.id,
      code: o.code,
      discountType: o.discountType as 'percentage' | 'fixed',
      value: o.value,
      isActive: o.isActive,
      expiresAt: o.expiresAt || undefined,
    }));
  } catch (error) {
    console.error("[v0] Database connection error in getOffers:", error);
    return [];
  }
}

/* ==========================================================================
   HERO SLIDES CRUD (PRISMA IMPLEMENTATION)
   ========================================================================== */

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const dbSlides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    return dbSlides.map((s) => ({
      id: s.id,
      title: s.title,
      subtitle: s.subtitle || undefined,
      imageUrl: s.imageUrl,
      linkUrl: s.linkUrl || undefined,
      order: s.order,
      isActive: s.isActive,
    }));
  } catch (error) {
    console.error("[v0] Database connection error in getHeroSlides:", error);
    return [];
  }
}

/* ==========================================================================
   SHOWCASE VIDEOS CRUD (PRISMA IMPLEMENTATION)
   ========================================================================== */

export async function getShowcaseVideos(): Promise<ShowcaseVideo[]> {
  try {
    const dbVideos = await prisma.showcaseVideo.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    return dbVideos.map((v) => ({
      id: v.id,
      title: v.title,
      badgeText: v.badgeText,
      videoUrl: v.videoUrl,
      order: v.order,
      isActive: v.isActive,
    }));
  } catch (error) {
    console.error("[v0] Database connection error in getShowcaseVideos:", error);
    return [];
  }
}

/* ==========================================================================
   CUSTOMER TESTIMONIAL REVIEWS CRUD (PRISMA IMPLEMENTATION)
   ========================================================================== */

export async function getVideoReviews(options?: { includeInactive?: boolean }): Promise<VideoReview[]> {
  try {
    const db = await prisma.videoReview.findMany({
      where: options?.includeInactive ? undefined : { isActive: true },
      orderBy: { order: 'asc' },
    });
    return db.map((v) => ({
      id: v.id,
      author: v.author,
      videoUrl: v.videoUrl,
      thumbnailUrl: v.thumbnailUrl || undefined,
      order: v.order,
      isActive: v.isActive,
    }));
  } catch (error) {
    console.error("[v0] Database connection error in getVideoReviews:", error);
    return [];
  }
}

export async function getTextReviews(options?: { includeInactive?: boolean }): Promise<TextReview[]> {
  try {
    const db = await prisma.textReview.findMany({
      where: options?.includeInactive ? undefined : { isActive: true },
      orderBy: { date: 'desc' },
    });
    return db.map((t) => ({
      id: t.id,
      author: t.author,
      rating: t.rating,
      comment: t.comment,
      date: t.date,
      isActive: t.isActive,
    }));
  } catch (error) {
    console.error("[v0] Database connection error in getTextReviews:", error);
    return [];
  }
}

// Order Management Functions
export async function createOrder(data: {
  customerName: string;
  fatherName: string;
  contactNumber: string;
  address: string;
  items: Array<{ productId: string; productName: string; quantity: number; price: string }>;
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentProofUrl?: string;
  notes?: string;
}): Promise<{ id: string; orderNumber: string } | null> {
  try {
    const order = await prisma.order.create({
      data: {
        customerName: data.customerName,
        fatherName: data.fatherName,
        contactNumber: data.contactNumber,
        address: data.address,
        subtotal: data.subtotal,
        shippingFee: data.shippingFee,
        total: data.total,
        paymentProofUrl: data.paymentProofUrl,
        notes: data.notes,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            subtotal: parseFloat(item.price.replace(/[^0-9]/g, '')) * item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    return {
      id: order.id,
      orderNumber: order.orderNumber,
    };
  } catch (error) {
    console.error("[v0] Error creating order:", error);
    return null;
  }
}

export async function getOrderById(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
    return order;
  } catch (error) {
    console.error("[v0] Error fetching order:", error);
    return null;
  }
}

export async function getOrders(options?: { status?: string; limit?: number; offset?: number }) {
  try {
    const orders = await prisma.order.findMany({
      where: options?.status ? { status: options.status } : undefined,
      include: { items: true },
      orderBy: { createdAt: 'desc' },
      take: options?.limit || 50,
      skip: options?.offset || 0,
    });
    return orders;
  } catch (error) {
    console.error("[v0] Error fetching orders:", error);
    return [];
  }
}

export async function updateOrderStatus(orderId: string, status: string, adminNotes?: string) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        adminNotes: adminNotes || undefined,
        updatedAt: new Date(),
      },
    });
    return order;
  } catch (error) {
    console.error("[v0] Error updating order status:", error);
    return null;
  }
}
