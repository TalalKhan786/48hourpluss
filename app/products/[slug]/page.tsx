// app/products/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getProducts } from '@/lib/db';
import ImageGallery from '@/components/ImageGallery';
import AddToCartButton from '@/components/AddToCartButton';
import { MessageCircle, Star, ArrowLeft } from 'lucide-react';

const WHATSAPP_NUMBER = "923194405935"; // Your WhatsApp number

// Cache the product details page on the Edge and update every 1 hour [1]
export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  return {
    title: product ? `${product.name} | Details` : 'Product Not Found',
    description: product?.description || 'View detailed product specifications.',
  };
}

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Price formatting helper
  const formatPrice = (priceStr: string) => {
    if (!priceStr) return 'Rs. 0';
    if (priceStr.includes('Rs') || priceStr.includes('PKR')) return priceStr;
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? priceStr : `Rs. ${num.toLocaleString('en-US')}`;
  };

  const cleanNumericPrice = product.price.replace(/[^0-9]/g, '');

  // Calculate star rating average
  const reviewsCount = product.reviews.length;
  const averageRating = reviewsCount > 0 
    ? Math.round(product.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewsCount) 
    : 5;

  // Pre-filled single-item fallback WhatsApp link
  const textMessage = `Hello! I would like to order: *${product.name}* \nPrice: *${formatPrice(product.price)}*.\n\nPlease confirm availability and payment options.`;
  const encodedText = encodeURIComponent(textMessage);
  const whatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

  /* ==========================================================================
     DYNAMIC E-COMMERCE JSON-LD SCHEMA GENERATION
     Prepares rich metadata for search engines to index pricing, stock, and ratings [1].
     ========================================================================== */
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description || "Premium certified natural formulation.",
    "sku": `SKU-${product.slug.toUpperCase()}`,
    "brand": {
      "@type": "Brand",
      "name": "48 Hours Plus"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://48hoursplus.com/products/${product.slug}`, // Update with your domain
      "priceCurrency": "PKR",
      "price": cleanNumericPrice || "0",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "priceValidUntil": "2027-12-31"
    },
    // Only append ratings metadata if verified reviews exist [1]
    ...(reviewsCount > 0 ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": averageRating.toString(),
        "reviewCount": reviewsCount.toString()
      },
      "review": product.reviews.map((rev) => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": rev.rating.toString(),
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": rev.author
        },
        "reviewBody": rev.comment,
        "datePublished": rev.date
      }))
    } : {})
  };

  return (
    <main className="min-h-screen bg-transparent text-zinc-100 py-12 pt-24 container mx-auto px-4 transition-colors duration-300 ease-in-out">
      
      {/* 
         DYNAMIC JSON-LD SCHEMA SCRIPT TAG:
         Injects your compiled structured object directly into the page's HTML body [1].
         Search engines read this directly to construct Google Search Rich Snippets [1].
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav className="mb-8">
        <Link href="/products" className="text-sm font-semibold text-yellow-600 hover:text-yellow-500 flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>
      </nav>

      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
        <div className="lg:col-span-6">
          <ImageGallery images={product.images} altText={product.name} />
        </div>

        <div className="lg:col-span-6 mt-10 lg:mt-0 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-yellow-500 uppercase tracking-widest block">
              {product.categorySlug}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100 font-serif leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-1.5 pt-1">
              <div className="flex items-center text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < averageRating ? 'fill-amber-400 text-amber-400' : 'text-zinc-850'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-zinc-400 font-medium ml-1">
                ({reviewsCount} Customer {reviewsCount === 1 ? 'Review' : 'Reviews'})
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="sr-only">Description</h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light whitespace-pre-line">
              {product.description || 'No description provided for this dynamic formulation.'}
            </p>
          </div>

          {/* Dynamic Ingredients list */}
          {product.ingredients.length > 0 && (
            <div className="border-t border-zinc-900 pt-6">
              <h3 className="text-sm font-semibold text-zinc-100">Key Ingredients</h3>
              <div className="mt-4">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 list-disc pl-5 text-xs sm:text-sm text-zinc-400">
                  {product.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="pl-1">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Checkout Controls */}
          <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-baseline justify-between border-b border-zinc-900 pb-4">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Special Offer Price</span>
              <p className="text-3xl tracking-tight text-yellow-400 font-bold font-serif">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Interactive Add to Cart selector */}
            <AddToCartButton product={product} />

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-zinc-900"></div>
              <span className="flex-shrink mx-4 text-zinc-500 text-[10px] uppercase tracking-widest font-semibold">or buy instantly</span>
              <div className="flex-grow border-t border-zinc-900"></div>
            </div>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-md border border-emerald-600/30 bg-emerald-600/10 px-8 py-4 text-base font-semibold text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all duration-300 hover:scale-[1.02] shadow-sm"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Instant Order via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="mt-20 border-t border-zinc-900 pt-12 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-zinc-100 font-serif mb-6 flex items-center gap-2">
          <span>💬</span> Customer Feedback
        </h2>
        <div className="space-y-6 divide-y divide-zinc-900">
          {product.reviews.length === 0 ? (
            <p className="text-sm text-zinc-500">No reviews yet. Be the first to leave feedback on your purchase!</p>
          ) : (
            product.reviews.map((review) => (
              <div key={review.id} className="pt-6 first:pt-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">{review.author}</p>
                    <p className="text-xs text-zinc-500">{review.date}</p>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${i < review.rating ? 'text-amber-400' : 'text-zinc-800'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 text-sm italic text-zinc-300 leading-relaxed font-light">
                  &ldquo;{review.comment}&rdquo;
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}