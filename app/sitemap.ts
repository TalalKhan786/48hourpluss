// app/sitemap.ts

import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Replace with your actual production domain when you deploy
  const baseUrl = 'https://48hoursplus.com'; 

  // 1. Define your static, customer-facing pages
  const staticPages = [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}/products`, lastModified: new Date() },
    { url: `${baseUrl}/certificates`, lastModified: new Date() },
    { url: `${baseUrl}/reviews`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];

  try {
    // 2. Query all active products from Supabase [1]
    const products = await getProducts();
    
    // 3. Dynamically map products to sitemap endpoints
    const productPages = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(),
    }));

    return [...staticPages, ...productPages];
  } catch (error) {
    console.error('Failed to generate dynamic sitemap:', error);
    return staticPages; // Fallback to static pages if database is unavailable
  }
}