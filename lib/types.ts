// lib/types.ts

export interface Review {
  id: string;
  author: string;
  rating: number; // 1 to 5 stars
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  categorySlug: string; // references Category.slug
  description: string;
  ingredients: string[];
  images: string[]; // relative paths or cloud URLs
  reviews: Review[];
  stock: number;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Offer {
  id: string;
  code: string; // e.g., "SUMMER10"
  discountType: 'percentage' | 'fixed';
  value: number; // e.g., 10 for 10% or $10
  isActive: boolean;
  expiresAt?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string; // e.g., "/products/hydrating-hyaluronic-serum"
  order: number;
  isActive: boolean;
}

// Master schema for the JSON-file database
export interface DatabaseSchema {
  products: Product[];
  categories: Category[];
  offers: Offer[];
  heroSlides: HeroSlide[];
}

// lib/types.ts (Append to the end)

export interface ShowcaseVideo {
  id: string;
  title: string;
  badgeText: string; // e.g., "Product Demo" or "Ingredients"
  videoUrl: string; // Cloud URL or local path
  order: number;
  isActive: boolean;
}

// lib/types.ts (Append to the end)

export interface VideoReview {
  id: string;
  author: string;
  videoUrl: string;
  thumbnailUrl?: string;
  order: number;
  isActive: boolean;
}

export interface TextReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  isActive: boolean;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: string;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  fatherName: string;
  contactNumber: string;
  address: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentProofUrl?: string;
  status: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  adminNotes?: string;
}

// lib/db.ts (Append to the bottom)

export async function getVideoReviews(options?: { includeInactive?: boolean }): Promise<VideoReview[]> {
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
}

export async function getTextReviews(options?: { includeInactive?: boolean }): Promise<TextReview[]> {
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
}
