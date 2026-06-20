"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Star, Award, Shield, Heart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function ProductGallery() {
  const [selectedImage, setSelectedImage] = useState(0)

  const productImages = [
    {
      title: "Natural Garden Setting",
      image: "/images/gallery-natural-garden.jpeg",
      description: "48 Hours Plus Herbal Honey showcased in beautiful natural wildflower garden with honeycomb lantern",
      badge: "Natural",
      badgeColor: "bg-green-600",
    },
    {
      title: "Vintage Apothecary Style",
      image: "/images/gallery-vintage-apothecary.jpeg",
      description: "Traditional herbal medicine aesthetic with brass scales, glass jars, and candlelit ambiance",
      badge: "Premium",
      badgeColor: "bg-blue-600",
    },
    {
      title: "48-Hour Energy Concept",
      image: "/images/gallery-energy-concept.jpeg",
      description: "Dynamic visualization of the 48-hour effectiveness with energy effects and time displays",
      badge: "Power",
      badgeColor: "bg-purple-600",
    },
    {
      title: "Clean Minimal Display",
      image: "/images/gallery-clean-minimal.jpeg",
      description: "Professional product photography with clean white background and reflective surface",
      badge: "Featured",
      badgeColor: "bg-yellow-500",
    },
    {
      title: "Healthy Lifestyle Choice",
      image: "/images/gallery-lifestyle-fitness.jpeg",
      description: "Active couple showcasing 48 Hours Plus as part of their healthy fitness lifestyle",
      badge: "Lifestyle",
      badgeColor: "bg-orange-600",
    },
  ]

  const productFeatures = [
    { icon: Star, text: "Premium Quality", color: "text-yellow-400" },
    { icon: Award, text: "Lab Tested", color: "text-blue-400" },
    { icon: Shield, text: "Certified Safe", color: "text-green-400" },
    { icon: Heart, text: "100% Natural", color: "text-red-400" },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-lg px-6 py-3 mb-6 animate-bounce">
            ✨ Premium Product Gallery ✨
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Discover Our Premium Product
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Explore every detail of our authentic 48 Hours Plus Herbal Honey with stunning high-resolution imagery
          </p>
        </div>

        <div className="mb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-8">
                <Image
                  src={productImages[selectedImage].image || "/placeholder.svg"}
                  alt={productImages[selectedImage].title}
                  width={600}
                  height={600}
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />

                <div
                  className={`absolute top-4 right-4 ${productImages[selectedImage].badgeColor} text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse`}
                >
                  {productImages[selectedImage].badge}
                </div>

                <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping delay-1000"></div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">{productImages[selectedImage].title}</h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">{productImages[selectedImage].description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {productFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg backdrop-blur-sm"
                    >
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                      <span className="text-white font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                    onClick={() =>
                      window.open(
                        "https://wa.me/923194405935?text=I want to order this premium 48hoursplus product",
                        "_blank",
                      )
                    }
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    Order This Product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Product Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productImages.map((product, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedImage === index
                    ? "ring-4 ring-yellow-500 bg-gray-700 border-yellow-500"
                    : "bg-gray-800 border-gray-700 hover:border-yellow-500"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <CardContent className="p-3">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div
                      className={`absolute top-1 right-1 ${product.badgeColor} text-white px-2 py-1 rounded-full text-xs font-bold`}
                    >
                      {product.badge}
                    </div>
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-black rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-white text-xs mt-2 font-medium truncate">{product.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Experience Premium Quality?</h3>
            <p className="text-green-100 mb-6 text-lg">Join thousands of satisfied customers worldwide</p>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-black text-xl px-12 py-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse"
              onClick={() => {
                window.open(
                  "https://wa.me/923194405935?text=I want to order the premium 48hoursplus Herbal Honey after seeing the product gallery",
                  "_blank",
                )
              }}
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Order Premium Product Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
