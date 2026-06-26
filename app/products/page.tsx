// app/products/page.tsx

import { getProducts, getCategories } from '@/lib/db';
import ProductCatalog from '@/components/ProductCatalog';

// Cache the catalog page on Vercel's Edge CDN and revalidate every 1 hour [1]
export const revalidate = 3600;

export const metadata = {
  title: 'Product Catalog',
  description: 'Explore our catalog of premium ingredients and formulas.',
};

export default async function CatalogPage() {
  /* 
     PERFORMANCE OPTIMIZATION: PARALLEL CONCURRENT FETCHING
     Instead of sequential waits, execute both Supabase queries in parallel.
     This instantly cuts your initial database wait time in half [1]!
  */
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  const categoryNames = categories.map((c) => c.name);

  return (
    /* 
       ALIGNED SYMMETRICAL CONTAINER:
       Standardized to 'container mx-auto px-4' and changed 'py-12' to 'pt-24' 
       to align with your navbar and permanently eliminate horizontal white-line leaks [2].
    */
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