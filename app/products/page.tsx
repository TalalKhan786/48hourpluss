import type { Metadata } from "next"
import { ProductGallery } from "@/components/product-gallery"

export const metadata: Metadata = {
  title: "Shop Products",
  description: "Browse 48 Hours Plus Herbal Honey — premium Turkish formula, lab-tested and certified.",
}

export default function ProductsPage() {
  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Our <span className="text-yellow-400">Products</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          More products are on the way — here's what we currently offer.
        </p>
      </div>
      <ProductGallery />
    </div>
  )
}
