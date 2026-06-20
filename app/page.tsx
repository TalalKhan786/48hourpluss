import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { ProductShowcase } from "@/components/product-showcase"
import { VideoShowcase } from "@/components/video-showcase"
import { TestimonialsSection } from "@/components/testimonials-section"
import { HomeCtaSection } from "@/components/home-cta-section"

export const metadata: Metadata = {
  title: "48 Hours Plus Herbal Honey | Natural Male Enhancement",
}

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ProductShowcase />
      <VideoShowcase />
      <TestimonialsSection />
      <HomeCtaSection />
    </div>
  )
}
