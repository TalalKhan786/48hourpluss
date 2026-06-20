"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Package, Star, Zap, Crown } from "lucide-react"

export function PricingSection() {
  const pricingOptions = [
    {
      title: "Single Sachet",
      subtitle: "Try Before You Buy",
      price: "1,499",
      originalPrice: "2,000",
      currency: "PKR",
      description: "Perfect for first-time customers who want to experience the quality",
      features: ["1 Premium Sachet (16g)", "48-Hour Effectiveness", "Natural Herbal Formula", "Discreet Packaging"],
      badge: "Trial",
      badgeColor: "bg-blue-600",
      icon: Package,
      whatsappText: "Hi, I want to order 1 single sachet of 48 Hours Plus Herbal Honey for 1,499 PKR",
      popular: false,
    },
    {
      title: "Complete Box",
      subtitle: "Most Popular Choice",
      price: "15,999",
      originalPrice: "24,000",
      currency: "PKR",
      description: "Best value for regular users with significant savings",
      features: [
        "12 Premium Sachets (16g each)",
        "192g Total Content",
        "2-Week Supply (Max 1 Daily)",
        "Free Shipping Included",
        "33% Discount Applied",
      ],
      badge: "Best Value",
      badgeColor: "bg-green-600",
      icon: Star,
      whatsappText: "Hi, I want to order 1 complete box (12 sachets) of 48 Hours Plus for 15,999 PKR",
      popular: true,
    },
    {
      title: "Wholesale Package",
      subtitle: "Business & Bulk Orders",
      price: "Contact",
      originalPrice: null,
      currency: "for Price",
      description: "Maximum discount for resellers and bulk purchasers",
      features: [
        "100 Boxes (1,200 Sachets)",
        "19.2kg Total Content",
        "Wholesale Pricing",
        "Maximum Discount Available",
        "Business Partnership",
      ],
      badge: "Wholesale",
      badgeColor: "bg-purple-600",
      icon: Crown,
      whatsappText: "Hi, I'm interested in wholesale package pricing for 100 boxes (1,200 sachets) of 48 Hours Plus",
      popular: false,
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-yellow-500 text-black text-lg px-4 py-2 mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Transparent Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your <span className="text-yellow-400">Package</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Flexible pricing options to suit every need - from trial to wholesale
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingOptions.map((option, index) => (
            <Card
              key={index}
              className={`bg-gray-800 border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:scale-105 relative ${
                option.popular ? "ring-2 ring-green-500 transform scale-105" : ""
              }`}
            >
              {option.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white animate-pulse">
                  Most Popular
                </Badge>
              )}

              <CardContent className="p-8 text-center">
                {/* Icon and Badge */}
                <div className="flex items-center justify-center mb-4">
                  <div className={`${option.badgeColor} p-4 rounded-full`}>
                    <option.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Title and Subtitle */}
                <h3 className="text-2xl font-bold text-white mb-2">{option.title}</h3>
                <p className="text-gray-400 mb-6">{option.subtitle}</p>

                {/* Pricing */}
                <div className="mb-6">
                  {option.originalPrice && (
                    <div className="text-gray-500 line-through text-lg mb-1">
                      {option.originalPrice} {option.currency}
                    </div>
                  )}
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold text-yellow-400">{option.price}</span>
                    <span className="text-xl text-gray-300">{option.currency}</span>
                  </div>
                  {option.originalPrice && (
                    <Badge className="bg-red-600 text-white text-sm mt-2">
                      Save{" "}
                      {Number.parseInt(option.originalPrice.replace(",", "")) -
                        Number.parseInt(option.price.replace(",", ""))}{" "}
                      PKR
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">{option.description}</p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {option.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    option.popular ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600"
                  } text-white transition-all duration-300 hover:scale-105 py-3`}
                  onClick={() =>
                    window.open(`https://wa.me/923194405935?text=${encodeURIComponent(option.whatsappText)}`, "_blank")
                  }
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {option.price === "Contact" ? "Get Quote" : "Order Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-gray-800 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Why Choose Our Pricing?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-full">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Free Shipping</p>
                <p className="text-gray-400 text-sm">On all box orders</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-full">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Best Value</p>
                <p className="text-gray-400 text-sm">Bulk discounts available</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-2 rounded-full">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">24/7 Support</p>
                <p className="text-gray-400 text-sm">WhatsApp assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
