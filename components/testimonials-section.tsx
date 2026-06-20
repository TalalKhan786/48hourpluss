"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ahmed K.",
      age: 34,
      location: "Istanbul, Turkey",
      rating: 5,
      review:
        "Amazing natural results! I was skeptical at first, but this product really works. The honey taste makes it pleasant to take, and the effects last exactly as promised.",
      image: "/placeholder.svg?height=100&width=100&text=AK",
    },
    {
      name: "Marcus R.",
      age: 42,
      location: "Berlin, Germany",
      rating: 5,
      review:
        "Better than expected quality. The packaging is professional, ingredients are clearly listed, and I can feel the difference. Will definitely order again.",
      image: "/placeholder.svg?height=100&width=100&text=MR",
    },
    {
      name: "Yusuf M.",
      age: 29,
      location: "Dubai, UAE",
      rating: 5,
      review:
        "Discreet packaging, fast delivery. Exactly what I was looking for. The natural ingredients give me peace of mind, and the results speak for themselves.",
      image: "/placeholder.svg?height=100&width=100&text=YM",
    },
    {
      name: "David L.",
      age: 38,
      location: "London, UK",
      rating: 5,
      review:
        "Excellent product with genuine results. The honey-based formula is unique and effective. Customer service was very responsive via WhatsApp.",
      image: "/placeholder.svg?height=100&width=100&text=DL",
    },
    {
      name: "Carlos S.",
      age: 45,
      location: "Madrid, Spain",
      rating: 5,
      review:
        "Natural and effective solution. I appreciate the transparency about ingredients and the detailed usage instructions. Highly recommended!",
      image: "/placeholder.svg?height=100&width=100&text=CS",
    },
    {
      name: "Hassan A.",
      age: 31,
      location: "Cairo, Egypt",
      rating: 5,
      review:
        "Perfect blend of traditional herbs. As someone who prefers natural products, this exceeded my expectations. The 48-hour effect is real.",
      image: "/placeholder.svg?height=100&width=100&text=HA",
    },
  ]

  return (
    <section id="testimonials" className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-green-600 text-white text-lg px-4 py-2 mb-4">Customer Reviews</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our <span className="text-yellow-400">Customers</span> Say
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-white">4.8/5</span>
          </div>
          <p className="text-xl text-gray-300">Based on 1,247+ verified customer reviews</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">
                      Age {testimonial.age} • {testimonial.location}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed italic">"{testimonial.review}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-105"
            onClick={() => {
              window.open(
                "https://wa.me/923194405935?text=I want to join your satisfied 48hoursplus customers",
                "_blank",
              )
            }}
          >
            Join Our Happy Customers
          </Button>
        </div>
      </div>
    </section>
  )
}
