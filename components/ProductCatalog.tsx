// components/ProductCatalog.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Star, ShoppingCart } from 'lucide-react';
import { useCart } from './CartProvider';

interface ProductCatalogProps {
  products: Product[];
  categories: string[];
}

export default function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handleCheckoutAdd = (product: Product) => {
    addToCart(product);
  };

  const formatPrice = (priceStr: string) => {
    if (!priceStr) return 'Rs. 0';
    if (priceStr.includes('Rs') || priceStr.includes('PKR')) return priceStr;
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? priceStr : `Rs. ${num.toLocaleString('en-US')}`;
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categorySlug === selectedCategory)
    : products;

  return (
    <div className="space-y-8">
      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            selectedCategory === null
              ? 'bg-yellow-500 text-black font-semibold'
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category.toLowerCase())}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              selectedCategory === category.toLowerCase()
                ? 'bg-yellow-500 text-black font-semibold'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const reviewsCount = product.reviews.length;
            const averageRating = reviewsCount > 0 
              ? Math.round(product.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewsCount) 
              : 5;

            return (
              <div 
                key={product.id} 
                className="group relative flex flex-col justify-between border border-border rounded-3xl bg-card text-card-foreground p-4 hover:border-yellow-500/30 hover:shadow-xl dark:hover:shadow-yellow-500/[0.01] transition-all duration-500 hover:-translate-y-1.5"
              >
                <div>
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted border border-border">
                    <Image
                      src={product.images[0] || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80'}
                      alt={product.name}
                      fill
                      className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="mt-4 space-y-1 text-left">
                    <span className="text-[10px] text-yellow-600 dark:text-yellow-500 font-semibold uppercase tracking-wider block">
                      {product.categorySlug}
                    </span>
                    <h4 className="text-sm sm:text-md font-bold text-foreground line-clamp-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                      <Link href={`/products/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h4>

                    {/* Star Rating Indicator */}
                    <div className="flex items-center gap-1 pt-0.5">
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < averageRating ? 'fill-amber-400 text-amber-400' : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium ml-1">
                        ({reviewsCount})
                      </span>
                    </div>

                    <p className="text-md font-extrabold text-yellow-600 dark:text-yellow-400 font-serif pt-1">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>

                {/* Add to Cart button */}
                <div className="mt-4 pt-3 border-t border-border flex flex-col gap-2">
                  <Button
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      handleCheckoutAdd(product);
                    }}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart
                  </Button>
                  
                  <Link href={`/products/${product.slug}`} className="text-center text-[10px] text-muted-foreground hover:text-yellow-500 transition-colors font-medium">
                    View Specs &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}