import { getProducts, getCategories } from '@/lib/db';
import ProductCatalog from '@/components/ProductCatalog';

// Cache the catalog page on Vercel's Edge CDN and revalidate every 1 hour
export const revalidate = 3600;

export const metadata = {
  title: 'Product Catalog',
  description: 'Explore our catalog of premium ingredients and formulas.',
};

export default async function CatalogPage() {
  // Load first page of products for initial render
  const [products, categories] = await Promise.all([
    getProducts({ limit: 12, offset: 0 }),
    getCategories()
  ]);

  const categoryNames = categories.map((c) => c.name);

  return (
    <main className="container mx-auto px-4 pt-24 pb-12 min-h-screen">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Catalog</h1>
        <p className="text-lg text-gray-500">
          Discover high-quality, targeted formulations matching your physical routine.
        </p>
      </div>

      <ProductCatalog products={products} categories={categoryNames} />
    </main>
  );
}
