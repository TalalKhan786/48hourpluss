import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { ProductShowcase } from "@/components/product-showcase"
import { VideoShowcase } from "@/components/video-showcase"
import { TestimonialsSection } from "@/components/testimonials-section"
import { HomeCtaSection } from "@/components/home-cta-section"

// IMPORT TRUST & VALUE SECTIONS
import { CertificationsSection } from "@/components/certifications-section"
import { IngredientBreakdown } from "@/components/ingredient-breakdown"
import { UsageInstructions } from "@/components/usage-instructions"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"

import { getHeroSlides, getProducts, getShowcaseVideos } from "@/lib/db"

// Enable Incremental Static Regeneration: Cache the page on the Edge and update once every 1 hour
export const revalidate = 3600; 

export const metadata: Metadata = {
  title: "48 Hours Plus Herbal Honey | Natural Male Enhancement",
}

export default async function HomePage() {
  const [slides, products, videos] = await Promise.all([
    getHeroSlides(),
    getProducts(),
    getShowcaseVideos()
  ]);

  return (
    <div className="space-y-0 bg-black text-white min-h-screen">
      {/* 1. HERO CAROUSEL */}
      <HeroSection slides={slides} />

      {/* 3. PRODUCT SHOWCASE */}
      <ProductShowcase products={products} videos={videos} />

      {/* 4. INGREDIENT BREAKDOWN */}
      <IngredientBreakdown />

      {/* 5. CINEMATIC VIDEO THEATER */}
      <VideoShowcase videos={videos} />

      {/* 10. CLOSING CTA */}
      <HomeCtaSection />
    </div>
  )
}
