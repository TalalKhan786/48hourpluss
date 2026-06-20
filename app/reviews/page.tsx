import type { Metadata } from "next"
import { ReviewsSection } from "@/components/reviews-section"

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "Read verified customer reviews for 48 Hours Plus Herbal Honey from buyers worldwide.",
}

export default function ReviewsPage() {
  return (
    <div className="pt-24">
      <ReviewsSection />
    </div>
  )
}
