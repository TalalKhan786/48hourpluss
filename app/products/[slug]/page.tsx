import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { getProductBySlug, getAllProductSlugs } from "@/lib/products"
import { IngredientBreakdown } from "@/components/ingredient-breakdown"
import { PricingSection } from "@/components/pricing-section"
import { UsageInstructions } from "@/components/usage-instructions"

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.shortDescription,
  }
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="pt-24">
      <section className="py-12 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Image
              src={product.heroImage || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-2xl shadow-2xl mx-auto"
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h1>
              <p className="text-xl text-yellow-400 font-medium mb-4">{product.tagline}</p>
              <p className="text-gray-300 text-lg leading-relaxed">{product.shortDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <IngredientBreakdown />
      <PricingSection />
      <UsageInstructions />
    </div>
  )
}
