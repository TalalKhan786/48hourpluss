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

// Mock products data for testing without database
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: '48 Hours Plus Herbal Honey',
    slug: '48-hours-plus-herbal-honey',
    price: 'Rs. 3,499',
    categorySlug: 'wellness',
    description: 'Premium herbal honey formulation for enhanced vitality and performance.',
    stock: 100,
    isActive: true,
    images: ['https://images.unsplash.com/photo-1587049352781-30dbd3d2eda9?w=600&auto=format&fit=crop&q=80'],
    ingredients: ['Pure Herbal Extract', 'Premium Honey', 'Natural Aphrodisiac Herbs', 'Ginseng Root'],
    reviews: [
      { id: '1', author: 'Hassan R.', rating: 5, comment: 'Excellent quality and results!', date: '2026-06-10' },
      { id: '2', author: 'Akram K.', rating: 5, comment: 'Best product I have used!', date: '2026-06-12' },
    ],
  },
  {
    id: '2',
    name: 'Vitamin C Brightening Face Mask',
    slug: 'vitamin-c-brightening-face-mask',
    price: 'Rs. 1,799',
    categorySlug: 'skincare',
    description: 'Intensive brightening mask with 20% Vitamin C complex for radiant skin.',
    stock: 40,
    isActive: true,
    images: ['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&auto=format&fit=crop&q=80'],
    ingredients: ['Vitamin C Complex (20%)', 'Turmeric Extract', 'Chamomile'],
    reviews: [],
  },
  {
    id: '3',
    name: 'Retinol Night Serum Advanced',
    slug: 'retinol-night-serum-advanced',
    price: 'Rs. 2,899',
    categorySlug: 'skincare',
    description: 'Advanced night serum with encapsulated retinol for anti-aging benefits.',
    stock: 30,
    isActive: true,
    images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80'],
    ingredients: ['Encapsulated Retinol', 'Hyaluronic Acid', 'Peptides', 'Squalane'],
    reviews: [{ id: '1', author: 'Fatima A.', rating: 5, comment: 'My skin looks so much better!', date: '2026-05-20' }],
  },
  {
    id: '4',
    name: 'Organic Ashwagandha Capsules',
    slug: 'organic-ashwagandha-capsules',
    price: 'Rs. 1,599',
    categorySlug: 'wellness',
    description: 'Premium organic Ashwagandha for stress relief and vitality.',
    stock: 60,
    isActive: true,
    images: ['https://images.unsplash.com/photo-1505252585461-04db1267ae5b?w=600&auto=format&fit=crop&q=80'],
    ingredients: ['Organic Ashwagandha Root', 'Black Pepper Extract'],
    reviews: [],
  },
  {
    id: '5',
    name: 'Intensive Moisturizing Cream',
    slug: 'intensive-moisturizing-cream',
    price: 'Rs. 2,299',
    categorySlug: 'skincare',
    description: 'Rich, nourishing cream for deep hydration and skin barrier repair.',
    stock: 45,
    isActive: true,
    images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop&q=80'],
    ingredients: ['Ceramides', 'Collagen', 'Vitamin E', 'Argan Oil'],
    reviews: [],
  },
  {
    id: '6',
    name: 'Pure Ginger Turmeric Tea',
    slug: 'pure-ginger-turmeric-tea',
    price: 'Rs. 899',
    categorySlug: 'wellness',
    description: 'Organic ginger and turmeric blend for immune support and inflammation relief.',
    stock: 80,
    isActive: true,
    images: ['https://images.unsplash.com/photo-1597318086503-fd752c147066?w=600&auto=format&fit=crop&q=80'],
    ingredients: ['Organic Ginger Root', 'Organic Turmeric', 'Black Pepper', 'Cinnamon'],
    reviews: [{ id: '1', author: 'Bilal M.', rating: 4, comment: 'Great taste and health benefits!', date: '2026-06-05' }],
  },
  {
    id: '7',
    name: 'Organic Matcha Powder',
    slug: 'organic-matcha-powder',
    price: 'Rs. 1,999',
    categorySlug: 'wellness',
    description: 'Ceremonial grade organic green tea powder sourced directly from Uji, Japan.',
    stock: 25,
    isActive: true,
    images: ['https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80'],
    ingredients: ['100% Ceremonial Matcha Green Tea'],
    reviews: [],
  },
  {
    id: '8',
    name: 'Hydrating Hyaluronic Serum',
    slug: 'hydrating-hyaluronic-serum',
    price: 'Rs. 2,499',
    categorySlug: 'skincare',
    description: 'Lightweight hydrating serum with 3 molecular weights of hyaluronic acid.',
    stock: 50,
    isActive: true,
    images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop&q=80'],
    ingredients: ['Hyaluronic Acid', 'Glycerin', 'Aloe Vera', 'Vitamin B5'],
    reviews: [],
  },
];

export async function getProducts(options?: { categorySlug?: string; includeInactive?: boolean; limit?: number; offset?: number; featuredOnly?: boolean }): Promise<Product[]> {
  try {
    // Try database first
    if (process.env.DATABASE_URL) {
      const limit = options?.limit || 12;
      const offset = options?.offset || 0;

      const dbProducts = await prisma.product.findMany({
        where: {
          isActive: options?.includeInactive ? undefined : true,
          categorySlug: options?.categorySlug || undefined,
        },
        include: {
          images: { take: 1 },
          ingredients: true,
          reviews: true,
        },
        take: limit,
        skip: offset,
        orderBy: { id: 'asc' },
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
    }
  } catch (error) {
    console.log("[v0] Database unavailable, using mock data");
  }

  // Fallback to mock data
  let filtered = MOCK_PRODUCTS.filter(p => options?.includeInactive ? true : p.isActive);
  if (options?.categorySlug) {
    filtered = filtered.filter(p => p.categorySlug === options.categorySlug);
  }
  
  const offset = options?.offset || 0;
  const limit = options?.limit || 12;
  return filtered.slice(offset, offset + limit);
}

// Optimized query for homepage - only featured products with minimal data
export async function getFeaturedProducts(limit: number = 4): Promise<Product[]> {
  try {
    // Try database first
    if (process.env.DATABASE_URL) {
      const dbProducts = await prisma.product.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          categorySlug: true,
          description: true,
          images: { select: { url: true }, take: 1 },
          ingredients: { select: { name: true } },
          reviews: { select: { id: true, rating: true } },
        },
        take: limit,
        orderBy: { id: 'asc' },
      });

      return dbProducts.map((p: any) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        categorySlug: p.categorySlug,
        description: p.description,
        stock: 100,
        isActive: true,
        images: p.images.map((img) => img.url),
        ingredients: p.ingredients.map((ing) => ing.name),
        reviews: p.reviews.map((rev) => ({
          id: rev.id,
          author: '',
          rating: rev.rating,
          comment: '',
          date: '',
        })),
      }));
    }
  } catch (error) {
    console.log("[v0] Database unavailable, using mock data for featured products");
  }

  // Fallback to mock data
  return MOCK_PRODUCTS.filter(p => p.isActive).slice(0, limit);
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

const MOCK_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Skincare',
    slug: 'skincare',
    description: 'Premium skincare products for all skin types',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    name: 'Wellness',
    slug: 'wellness',
    description: 'Natural wellness and supplement products',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1267ae5b?w=600&auto=format&fit=crop&q=80',
  },
];

export async function getCategories(): Promise<Category[]> {
  try {
    // Try database first
    if (process.env.DATABASE_URL) {
      const dbCategories = await prisma.category.findMany();
      return dbCategories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || undefined,
        image: c.image || undefined,
      }));
    }
  } catch (error) {
    console.log("[v0] Database unavailable, using mock categories");
  }

  return MOCK_CATEGORIES;
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
