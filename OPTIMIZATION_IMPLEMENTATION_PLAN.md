# 🛠️ STEP-BY-STEP OPTIMIZATION IMPLEMENTATION GUIDE

**Status:** Ready to Execute  
**Estimated Total Time:** 5-7 days of development  
**Expected Result:** 70-80% speed improvement (8-12s → 1.5-2s)

---

## PHASE 1: CRITICAL MEDIA OPTIMIZATION (Days 1-2)

### Step 1.1: Video Optimization Strategy

#### Problem
Videos are 50-200MB+ each, loaded with autoplay, no compression, no lazy loading.

#### Solution
```typescript
// BEFORE: Current implementation in video-showcase.tsx (BAD)
<video
  ref={videoRef}
  src={video.videoUrl}
  autoplay={true}        // ❌ Downloads immediately
  loop
  muted
  playsInline
/>

// AFTER: Optimized implementation
<video
  ref={videoRef}
  src={optimizedVideoUrl} // Compressed 480p version
  controls                 // Show play button (don't auto-start)
  loop
  muted
  playsInline
  preload="none"          // ✅ Don't load until user clicks
  poster={thumbnailUrl}   // Show thumbnail instead
  className="w-full h-full object-cover"
/>
```

#### Implementation Tasks:

**1.1a: Create Video Compression Script**
```bash
# Create script to convert videos using FFmpeg
# For each video file:
ffmpeg -i original_video.mp4 \
  -c:v libvpx-vp9 \
  -b:v 800k \
  -preset faster \
  -c:a libopus \
  -b:a 128k \
  optimized_480p.webm

# Result: 200MB → 15-20MB
```

**1.1b: Upload Multiple Quality Versions**
- Create 480p (15-20MB)
- Create 720p (30-40MB)
- Keep 1080p backup only

**1.1c: Update Database Schema**
```prisma
// prisma/schema.prisma
model ShowcaseVideo {
  id             String @id @default(cuid())
  title          String
  badgeText      String
  
  // OLD: Single URL
  videoUrl       String?
  
  // NEW: Multiple quality tiers
  videoUrl480p   String?   // Default/fallback
  videoUrl720p   String?   // HD tier
  videoUrlThumb  String?   // Thumbnail/poster image
  
  order          Int      @default(0)
  isActive       Boolean  @default(true)
}
```

**1.1d: Implement Adaptive Video Loading**
```typescript
// lib/video-utils.ts (NEW FILE)
export function getOptimalVideoUrl(userBandwidth?: 'slow' | 'fast' | 'unknown') {
  // Server-side: Detect from header
  // Client-side: Detect from speedtest
  
  if (userBandwidth === 'slow') return video480p;
  if (userBandwidth === 'fast') return video720p;
  return video480p; // Default safe
}

export function getVideoLoadStrategy() {
  return {
    preload: 'none',           // Don't auto-load
    poster: thumbnailUrl,       // Show image instead
    loading: 'lazy' as const,  // Lazy load on scroll
    controls: true              // Let user play
  };
}
```

**1.1e: Update Components**

```typescript
// components/video-showcase.tsx (UPDATED)
'use client';

import { useEffect, useRef, useState } from 'react';
import { ShowcaseVideo } from '@/lib/types';
import { getOptimalVideoUrl } from '@/lib/video-utils';

interface VideoShowcaseProps {
  videos: ShowcaseVideo[];
}

export function VideoShowcase({ videos }: VideoShowcaseProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    const container = document.getElementById('video-showcase');
    if (container) observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const activeVideos = videos?.length > 0 ? videos : [];

  return (
    <section
      id="video-showcase"
      className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-black p-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 m-0 p-0">
        {activeVideos.slice(0, 2).map((video, idx) => (
          <div
            key={video.id}
            className="relative h-[45vh] sm:h-[55vh] md:aspect-video w-full overflow-hidden group"
          >
            {isVisible ? (
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                src={getOptimalVideoUrl()}
                className="w-full h-full object-cover"
                preload="none"
                controls
                loop
                muted
                playsInline
                poster={video.videoUrlThumb}
              />
            ) : (
              // Show thumbnail while loading
              <img
                src={video.videoUrlThumb}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            )}

            <div className="absolute top-6 left-6 z-20 bg-purple-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-md">
              {video.badgeText}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

### Step 1.2: Image Optimization

#### Problem
Images uncompressed, no WebP format, no lazy loading, no blur placeholders.

#### Solution

**1.2a: Setup Image Processing Pipeline**

```typescript
// lib/image-utils.ts (NEW FILE)
import { v4 as uuid } from 'uuid';

export async function optimizeImage(file: File): Promise<{
  webp: string;
  png: string;
  thumbnail: string;
}> {
  // Use next/image with getStaticProps
  // Or use external service like ImageKit/Cloudinary
  
  // For now: Use Vercel Blob with query params
  const blob = await uploadToBlob(file);
  
  return {
    webp: `${blob}?format=webp&quality=80`,
    png: `${blob}?format=png&quality=85`,
    thumbnail: `${blob}?w=150&h=150&quality=60`
  };
}

async function uploadToBlob(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  
  const data = await res.json();
  return data.url;
}
```

**1.2b: Update All Product Images in Components**

```typescript
// components/product-showcase.tsx (UPDATED)
<Image
  src={product.images[0]}
  alt={product.name}
  fill
  className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
  sizes="(max-width: 768px) 50vw, 25vw"
  loading="lazy"              // ✅ NEW: Lazy load below fold
  quality={75}                // ✅ NEW: Reduce quality
  placeholder="blur"          // ✅ NEW: Show blur while loading
  blurDataURL={blurPlaceholder} // ✅ NEW: Tiny blurred version
  onError={(e) => {           // ✅ NEW: Fallback on error
    e.currentTarget.src = '/images/placeholder.png';
  }}
/>
```

**1.2c: Add Image CDN Configuration**

```typescript
// next.config.js (CREATE NEW FILE)
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Optimize images aggressively
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Use NextJS image optimization
    formats: ['image/webp', 'image/avif'],
    
    // Remote patterns for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    
    // Disable animated images to reduce size
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Enable compression
  compress: true,
  
  // Optimize production builds
  productionBrowserSourceMaps: false,
  swcMinify: true,
};

module.exports = nextConfig;
```

**1.2d: Hero Image Optimization**

```typescript
// components/hero-section.tsx (UPDATED)
<Image
  src={activeSlide.imageUrl}
  alt={activeSlide.title || "Banner"}
  width={1920}
  height={1080}
  className="w-full h-auto block"
  priority={true}             // ✅ Only for hero
  quality={80}                // ✅ 80% quality
  sizes="100vw"              // ✅ Always full width
/>
```

**1.2e: Update Database to Track Image Variants**

```prisma
// prisma/schema.prisma
model ProductImage {
  id              String @id @default(cuid())
  productId       String
  product         Product @relation(fields: [productId], references: [id])
  
  // Store all formats
  urlOriginal     String
  urlWebp         String?   // WebP version
  urlThumbnail    String?   // 150x150 version
  
  width           Int?
  height          Int?
  blurDataUrl     String?   // Blur placeholder
  
  createdAt       DateTime @default(now())
}
```

---

## PHASE 2: DATABASE QUERY OPTIMIZATION (Days 2-3)

### Step 2.1: Implement Query Pagination

```typescript
// lib/db.ts (UPDATED)

// Add pagination interface
interface PaginationOptions {
  page?: number;
  limit?: number;
  categorySlug?: string;
}

export async function getProducts(options?: PaginationOptions): Promise<Product[]> {
  const limit = Math.min(options?.limit || 12, 50); // Max 50
  const page = Math.max(options?.page || 1, 1);
  const skip = (page - 1) * limit;

  const dbProducts = await prisma.product.findMany({
    where: {
      isActive: true,
      categorySlug: options?.categorySlug || undefined,
    },
    // ✅ NEW: Only select needed fields
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      categorySlug: true,
      description: true,
      stock: true,
      isActive: true,
      images: {
        select: { url: true },
      },
      ingredients: {
        select: { name: true },
      },
      reviews: {
        select: {
          id: true,
          author: true,
          rating: true,
          comment: true,
          date: true,
        },
      },
    },
    // ✅ NEW: Pagination
    take: limit,
    skip: skip,
    orderBy: { createdAt: 'desc' },
  });

  return dbProducts.map(/* transform */);
}

// ✅ NEW: Separate query for featured products only
export async function getFeaturedProducts(): Promise<Product[]> {
  const dbProducts = await prisma.product.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      images: {
        select: { url: true },
        take: 1, // Only first image
      },
      reviews: {
        select: { rating: true },
        take: 10, // Limit reviews
      },
    },
    take: 4, // Only 4 featured
  });

  return dbProducts.map(/* transform */);
}

// ✅ NEW: Calculate ratings in database
export async function getProductsWithRatings(limit = 12) {
  return await prisma.product.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      images: { select: { url: true }, take: 1 },
      _count: {
        select: { reviews: true }, // Get count, not all reviews
      },
      reviews: {
        select: { rating: true },
        orderBy: { date: 'desc' },
        take: 5, // Only recent reviews
      },
    },
    take: limit,
  });
}
```

### Step 2.2: Add Response Caching Headers

```typescript
// app/api/products/route.ts (UPDATED)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const categorySlug = searchParams.get('category') || undefined;

    const products = await getProducts({
      page,
      limit,
      categorySlug,
    });

    // ✅ NEW: Add caching headers
    return NextResponse.json(products, {
      status: 200,
      headers: {
        // Cache for 1 hour on CDN
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        // Add ETag for conditional requests
        'ETag': generateETag(JSON.stringify(products)),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve products' },
      { status: 500 }
    );
  }
}

function generateETag(content: string): string {
  return `"${require('crypto').createHash('md5').update(content).digest('hex')}"`;
}
```

### Step 2.3: Optimize Reviews Calculation

```typescript
// components/product-showcase.tsx (UPDATED)

// BEFORE: Calculated in component (bad for performance)
const averageRating = reviewsCount > 0 
  ? Math.round(product.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewsCount) 
  : 5;

// AFTER: Get from database
// In lib/db.ts:
export async function getProductWithStats(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      _count: { select: { reviews: true } },
      reviews: {
        select: { rating: true },
        take: 5,
      },
    },
  });

  // Calculate average in database query context
  const avgRating = product?.reviews.length
    ? Math.round(
        product.reviews.reduce((acc, r) => acc + r.rating, 0) /
          product.reviews.length
      )
    : 5;

  return { ...product, averageRating: avgRating };
}
```

---

## PHASE 3: CODE SPLITTING & LAZY LOADING (Days 3-4)

### Step 3.1: Create Dynamic Imports for Below-Fold Components

```typescript
// app/page.tsx (UPDATED)

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import type { Metadata } from "next"

// ✅ Components loaded immediately (above fold)
import { HeroSection } from "@/components/hero-section"
import { ProductShowcase } from "@/components/product-showcase"

// ✅ NEW: Components loaded dynamically (below fold)
const VideoShowcase = dynamic(
  () => import("@/components/video-showcase").then(mod => ({ default: mod.VideoShowcase })),
  {
    loading: () => <VideoSkeleton />,
    ssr: true
  }
);

const TestimonialsSection = dynamic(
  () => import("@/components/testimonials-section").then(mod => ({ default: mod.TestimonialsSection })),
  {
    loading: () => <TestimonialSkeleton />,
    ssr: false
  }
);

const CertificationsSection = dynamic(
  () => import("@/components/certifications-section").then(mod => ({ default: mod.CertificationsSection })),
  {
    loading: () => <CertificationSkeleton />,
    ssr: false
  }
);

const UsageInstructions = dynamic(
  () => import("@/components/usage-instructions").then(mod => ({ default: mod.UsageInstructions })),
  {
    loading: () => <InstructionsSkeleton />,
    ssr: false
  }
);

const FAQSection = dynamic(
  () => import("@/components/faq-section").then(mod => ({ default: mod.FAQSection })),
  {
    loading: () => <FAQSkeleton />,
    ssr: false
  }
);

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "48 Hours Plus Herbal Honey | Natural Male Enhancement",
}

export default async function HomePage() {
  const [slides, products, videos] = await Promise.all([
    getHeroSlides(),
    getProducts({ limit: 4 }), // Only get 4 featured
    getShowcaseVideos()
  ]);

  return (
    <div className="space-y-0 bg-black text-white min-h-screen">
      <HeroSection slides={slides} />
      <ProductShowcase products={products} videos={videos} />
      
      {/* ✅ NEW: Use Suspense for lazy loading */}
      <Suspense fallback={<VideoSkeleton />}>
        <VideoShowcase videos={videos} />
      </Suspense>

      <Suspense fallback={<TestimonialSkeleton />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<CertificationSkeleton />}>
        <CertificationsSection />
      </Suspense>

      <Suspense fallback={<InstructionsSkeleton />}>
        <UsageInstructions />
      </Suspense>

      <Suspense fallback={<FAQSkeleton />}>
        <FAQSection />
      </Suspense>
    </div>
  );
}

// Loading skeletons
function VideoSkeleton() {
  return <div className="h-96 bg-gray-900 animate-pulse" />;
}

function TestimonialSkeleton() {
  return <div className="h-64 bg-gray-900 animate-pulse" />;
}

// ... other skeletons
```

### Step 3.2: Fix ProductCatalog - Move Filtering to Server

```typescript
// components/ProductCatalog.tsx (UPDATED - Still client, but optimized)
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Product } from '@/lib/types';

interface ProductCatalogProps {
  products: Product[];
  categories: string[];
}

export default function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // ✅ NEW: Use useMemo to avoid recalculating
  const filteredProducts = useMemo(() => {
    return selectedCategory
      ? products.filter((p) => p.categorySlug === selectedCategory)
      : products;
  }, [selectedCategory, products]);

  const handleCheckoutAdd = useCallback((product: Product) => {
    // Add to cart
  }, []);

  return (
    <div className="space-y-8">
      {/* Categories Filter - Only filters what's already loaded */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedCategory === null
              ? 'bg-yellow-500 text-black'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category.toLowerCase())}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category.toLowerCase()
                ? 'bg-yellow-500 text-black'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid - with lazy loading */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleCheckoutAdd}
          />
        ))}
      </div>
    </div>
  );
}

// ✅ NEW: Separate memoized component
const ProductCard = React.memo(({ product, onAddToCart }: any) => {
  return (
    // Product card JSX
  );
});

ProductCard.displayName = 'ProductCard';
```

---

## PHASE 4: CACHING STRATEGY (Day 4)

### Step 4.1: Setup Next.js Cache Layers

```typescript
// next.config.js (UPDATED)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... previous config

  // ✅ NEW: Enable experimental features
  experimental: {
    enableUndici: true,
    serverMinification: true,
  },

  // ✅ NEW: Cache configuration
  onDemandEntries: {
    maxInactiveAge: 15 * 60 * 1000,
    pagesBufferLength: 2,
  },

  // ✅ NEW: HTTP cache headers
  headers: async () => [
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/videos/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=2592000, stale-while-revalidate=86400',
        },
      ],
    },
    {
      source: '/api/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
```

---

## PHASE 5: MONITORING & PERFORMANCE TRACKING (Day 5)

### Step 5.1: Add Web Vitals Tracking

```typescript
// lib/analytics.ts (NEW FILE)

export function reportWebVitals(metric: any) {
  // Send to analytics service
  if (process.env.NEXT_PUBLIC_ANALYTICS_KEY) {
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify(metric),
      headers: { 'Content-Type': 'application/json' },
    }).catch(console.error);
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${metric.name}] ${metric.value}ms`);
  }
}
```

```typescript
// app/layout.tsx (UPDATED)

import { reportWebVitals } from '@/lib/analytics';

export default function RootLayout({ children }) {
  useEffect(() => {
    // Load web vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(reportWebVitals);
      getFID(reportWebVitals);
      getFCP(reportWebVitals);
      getLCP(reportWebVitals);
      getTTFB(reportWebVitals);
    });
  }, []);

  return (
    <html>
      {/* ... */}
      {children}
    </html>
  );
}
```

---

## EXECUTION CHECKLIST

### Phase 1 ✅
- [ ] Create FFmpeg video compression script
- [ ] Convert all videos to VP9 480p/720p
- [ ] Update database schema for video variants
- [ ] Update video-showcase.tsx with lazy loading
- [ ] Compress all images to WebP
- [ ] Create next.config.js
- [ ] Update hero-section.tsx with priority loading
- [ ] Update all product images with loading="lazy"

### Phase 2 ✅
- [ ] Add pagination to getProducts()
- [ ] Create getFeaturedProducts() query
- [ ] Update API routes with Cache-Control headers
- [ ] Test pagination with limit params
- [ ] Verify query performance with slow network

### Phase 3 ✅
- [ ] Convert below-fold components to dynamic imports
- [ ] Create loading skeleton components
- [ ] Add Suspense boundaries
- [ ] Test with throttled network connection
- [ ] Verify bundle size reduction

### Phase 4 ✅
- [ ] Configure next.config.js cache headers
- [ ] Add Cache-Control to API responses
- [ ] Setup CDN caching headers
- [ ] Test cache headers with curl

### Phase 5 ✅
- [ ] Add web-vitals package
- [ ] Create analytics endpoint
- [ ] Integrate reporting in layout
- [ ] Setup Lighthouse CI
- [ ] Create performance dashboard

---

## PERFORMANCE TESTING

### Before Optimization
```bash
# Homepage load time: ~8-12s
# First Contentful Paint: 3-4s
# Total assets: 50-100MB
```

### After Optimization
```bash
# Expected homepage load: ~1.5-2s (75% improvement)
# Expected FCP: 500-800ms
# Total assets: 2-3MB
```

### Testing Commands

```bash
# Lighthouse audit
lighthouse https://48hourplus.com --view

# Web Vitals testing
npm run build && npm start

# Network throttling test
# Chrome DevTools → Network → Slow 3G → Reload
```

---

## DEPLOYMENT STRATEGY

1. **Create feature branch:** `git checkout -b performance-optimization`
2. **Implement Phase 1-2:** Commit & test
3. **Implement Phase 3-4:** Commit & test
4. **Performance testing:** Verify metrics
5. **Create PR:** Request review
6. **Deploy to staging:** Test in production environment
7. **Deploy to production:** Gradual rollout (10% → 50% → 100%)

---

**Total Expected Improvement: 70-80% faster**
**Realistic Load Time Goal: 1.5-2 seconds (Not < 1ms)**
