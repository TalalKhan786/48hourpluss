"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Package, Clock, Droplets, Zap } from "lucide-react"
import { useEffect, useRef } from "react"

export function ProductShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const features = [
    {
      icon: Package,
      title: "16g Premium Sachets",
      description: "12 pieces per box for optimal dosing",
    },
    {
      icon: Droplets,
      title: "Honey-Based Delivery",
      description: "Natural absorption enhancement system",
    },
    {
      icon: Zap,
      title: "9 Powerful Ingredients",
      description: "Carefully selected herbal compounds",
    },
    {
      icon: Clock,
      title: "48-Hour Effect",
      description: "Extended duration for maximum benefit",
    },
  ]

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Ensure video plays automatically and loops
      video.muted = true
      video.autoplay = true
      video.loop = true
      video.play().catch(console.error)
    }
  }, [])

  return (
    <section id="product-showcase" className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-yellow-500 text-black text-lg px-4 py-2 mb-4">Premium Product</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience the <span className="text-yellow-400">Power</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our premium herbal honey combines traditional Turkish wisdom with modern quality standards
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Video Display */}
          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-3xl p-8">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <video
                  ref={videoRef}
                  className="w-full h-auto rounded-2xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/product-main.png"
                >
                  <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%282%29-BcjxTQqEgmIXohURl79ynqgmdrUsTh.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Turkish Made
            </div>
            <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              ISO Certified
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-500 p-3 rounded-lg">
                      <feature.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-105"
            onClick={() => {
              window.open(
                "https://wa.me/923194405935?text=I want to know more about 48hoursplus Herbal Honey features and place an order",
                "_blank",
              )
            }}
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Order Now via WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
