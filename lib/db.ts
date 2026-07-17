// lib/db.ts - Mock implementation for development
import { Product, Category, Offer, HeroSlide, ShowcaseVideo, VideoReview, TextReview } from './types';

// Mock data for development
const mockProducts: Product[] = [
  {
    id: '1',
    name: '48 Hours Plus Herbal Honey',
    slug: '48-hours-plus',
    price: 49.99,
    categorySlug: 'supplements',
    description: 'Premium herbal honey blend for natural male enhancement',
    stock: 100,
    isActive: true,
    images: ['/images/product-1.png'],
    ingredients: ['Honey', 'Ginseng', 'Tribulus'],
    reviews: [],
  },
];

const mockHeroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Natural Male Enhancement',
    subtitle: 'Premium Herbal Honey Blend',
    imageUrl: '/images/hero-1.png',
    linkUrl: '#products',
    order: 1,
    isActive: true,
  },
];

const mockShowcaseVideos: ShowcaseVideo[] = [
  {
    id: '1',
    title: 'Product Overview',
    badgeText: 'Featured',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    order: 1,
    isActive: true,
  },
];

export async function getProducts(options?: { categorySlug?: string; includeInactive?: boolean }): Promise<Product[]> {
  return mockProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return mockProducts.find(p => p.slug === slug);
}

export async function saveProduct(product: Product): Promise<Product> {
  return product;
}

export async function getCategories(): Promise<Category[]> {
  return [];
}

export async function saveCategory(category: Category): Promise<Category> {
  return category;
}

export async function getOffers(): Promise<Offer[]> {
  return [];
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return mockHeroSlides;
}

export async function getShowcaseVideos(): Promise<ShowcaseVideo[]> {
  return mockShowcaseVideos;
}

export async function getVideoReviews(options?: { includeInactive?: boolean }): Promise<VideoReview[]> {
  return [];
}

export async function getTextReviews(options?: { includeInactive?: boolean }): Promise<TextReview[]> {
  return [];
}
