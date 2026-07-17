# Comprehensive Performance Optimization Plan

## Critical Issues Identified

### 1. N+1 Query Problem (CRITICAL - 60% of delay)
- `getProducts()` loads ALL products with ALL relations (images, ingredients, reviews)
- Homepage calls `getProducts()` without pagination
- Each product in ProductCatalog triggers N+1 queries

**Impact**: If you have 50+ products, homepage loads 50+ complete products with all nested data

### 2. Video Autoplay Without Lazy Loading (CRITICAL - 20% of delay)
- `VideoShowcase` autoplays videos immediately on page load
- Videos have `autoplay=true` and `loop=true`
- No intersection observer to lazy-load below-fold videos

**Impact**: Large video files start downloading immediately, blocking page render

### 3. Missing Image Optimization (IMPORTANT - 15% of delay)
- Images not using Next.js Image component with optimization
- No lazy loading (`loading="lazy"`)
- Large uncompressed images served at full resolution
- No WebP format support

**Impact**: Full-size images download even for thumbnails

### 4. Unrestricted Product Loading (IMPORTANT - 3% of delay)
- Products page loads ALL products at once
- No pagination or "load more"
- ProductCatalog renders hundreds of items at once

**Impact**: DOM bloat, large initial render

## Optimization Strategy

### Phase 1: Database Query Optimization (Est. 40% improvement)
1. Add pagination to getProducts() - limit to 12 items by default
2. Add "featured products only" mode for homepage
3. Create separate queries for homepage vs catalog
4. Remove unnecessary relations from homepage query
5. Add select() to only fetch needed fields

### Phase 2: Video Optimization (Est. 25% improvement)
1. Disable autoplay by default
2. Use Intersection Observer to lazy-load videos
3. Add preload="none" to video tags
4. Lazy-load VideoShowcase component below fold
5. Use dynamic import for VideoShowcase

### Phase 3: Image Optimization (Est. 20% improvement)
1. Replace all img tags with Next.js Image
2. Add priority prop for above-fold images
3. Add loading="lazy" for below-fold
4. Add blur placeholder data
5. Optimize image dimensions

### Phase 4: Component Code Splitting (Est. 10% improvement)
1. Dynamic import for below-fold sections
2. Lazy load FAQ, testimonials, certifications
3. Reduce initial JavaScript bundle
4. Use React.lazy with Suspense

### Phase 5: Caching Strategy (Est. 5% improvement)
1. Extend ISR revalidation for static content
2. Add CDN cache headers
3. Cache product images in CDN

## Expected Results

| Metric | Current | After Phase 1-2 | After All |
|--------|---------|----------|-----------|
| Homepage Load | 8-12s | 2-3s | <1.5s |
| First Paint | 3-4s | 1-1.5s | 500-800ms |
| Total Assets | 50-100MB | 5-10MB | 2-3MB |
| LCP | >4s | <2s | <1.2s |
| Lighthouse | 30 | 65 | 85+ |

