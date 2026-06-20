// Minimal product data to support routing for now.
// This will be replaced by the full Product/Category data model
// (and eventually a database) in a later roadmap step — see ROADMAP.md.

export interface Product {
  slug: string
  name: string
  tagline: string
  shortDescription: string
  heroImage: string
}

export const products: Product[] = [
  {
    slug: "48-hours-plus-herbal-honey",
    name: "48 Hours Plus Herbal Honey",
    tagline: "Natural Male Enhancement Revolution",
    shortDescription:
      "Premium Turkish Herbal Formula with 9 Powerful Natural Ingredients. Honey-based delivery system for maximum absorption and 48-hour effectiveness.",
    heroImage: "/images/product-main.png",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug)
}
