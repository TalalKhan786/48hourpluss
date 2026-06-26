"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight } from "lucide-react"

export function HomeCtaSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Explore <span className="text-yellow-400">Everything</span> About 48 Hours Plus
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Full ingredient breakdown, lab certificates, customer reviews, and shipping details.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products/48-hours-plus-herbal-honey">
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-800 bg-transparent text-lg px-8 py-4 h-auto w-full sm:w-auto"
            onClick={() => {
              window.open("https://wa.me/923194405935?text=Hi, I want to order 48 Hours Plus Herbal Honey", "_blank")
            }}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Order via WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
