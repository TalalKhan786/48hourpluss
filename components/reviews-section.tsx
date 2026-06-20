"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Star, ThumbsUp, Verified } from "lucide-react"
import Image from "next/image"

export function ReviewsSection() {
  const detailedReviews = [
    {
      name: "Ahmed Y.",
      age: 34,
      location: "Istanbul, Turkey",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      review:
        "Excellent natural product. The honey-based formula works effectively and tastes pleasant. Noticed results within the promised timeframe.",
      image: "/placeholder.svg?height=60&width=60&text=AY",
      helpful: 23,
    },
    {
      name: "Marcus W.",
      age: 42,
      location: "Munich, Germany",
      rating: 5,
      date: "1 week ago",
      verified: true,
      review:
        "High quality product with discreet packaging. Fast international delivery. The 48-hour effectiveness is accurate as described.",
      image: "/placeholder.svg?height=60&width=60&text=MW",
      helpful: 18,
    },
    {
      name: "Omar A.",
      age: 29,
      location: "Dubai, UAE",
      rating: 5,
      date: "3 days ago",
      verified: true,
      review:
        "Natural ingredients give me confidence in the product. Customer service via WhatsApp was very responsive and professional.",
      image: "/placeholder.svg?height=60&width=60&text=OA",
      helpful: 31,
    },
    {
      name: "David T.",
      age: 38,
      location: "London, UK",
      rating: 5,
      date: "5 days ago",
      verified: true,
      review:
        "Impressed with the quality and effectiveness. The Turkish herbal blend is unique. Will definitely reorder.",
      image: "/placeholder.svg?height=60&width=60&text=DT",
      helpful: 15,
    },
  ]

  const reviewStats = [
    { stars: 5, count: 1089, percentage: 87 },
    { stars: 4, count: 124, percentage: 10 },
    { stars: 3, count: 23, percentage: 2 },
    { stars: 2, count: 8, percentage: 1 },
    { stars: 1, count: 3, percentage: 0 },
  ]

  return (
    <section id="reviews" className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-green-600 text-white text-lg px-4 py-2 mb-4">
            <Verified className="w-4 h-4 mr-2" />
            Verified Customer Reviews
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Customer <span className="text-yellow-400">Feedback</span>
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold text-white">4.9/5</div>
              <div className="text-gray-400">1,247 reviews</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Review Breakdown</h3>
                <div className="space-y-4">
                  {reviewStats.map((stat, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 w-12">
                        <span className="text-white text-sm">{stat.stars}</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${stat.percentage}%` }} />
                      </div>
                      <span className="text-gray-400 text-sm w-12">{stat.count}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <Verified className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-semibold">Verified Purchases Only</span>
                  </div>
                  <p className="text-gray-300 text-sm">All reviews from customers who purchased and used our product</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-4">
              {detailedReviews.map((review, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <Image
                        src={review.image || "/placeholder.svg"}
                        alt={review.name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-bold text-white">{review.name}</h4>
                          <Badge className="bg-green-600 text-white text-xs px-2 py-1">
                            <Verified className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          Age {review.age} • {review.location} • {review.date}
                        </p>
                        <div className="flex space-x-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-4">"{review.review}"</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Helpful ({review.helpful})
                      </Button>
                      <span className="text-xs text-gray-500">Verified Purchase</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-105"
            onClick={() => {
              window.open(
                "https://wa.me/923194405935?text=I want to join thousands of satisfied 48hoursplus customers",
                "_blank",
              )
            }}
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Join Our Happy Customers
          </Button>
        </div>
      </div>
    </section>
  )
}
