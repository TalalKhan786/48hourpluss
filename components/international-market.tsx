"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Globe, Truck, CreditCard } from "lucide-react"

export function InternationalMarket() {
  const languages = [{ code: "EN", name: "English", flag: "🇺🇸" }]

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "PKR", symbol: "₨", name: "Pakistani Rupee" },
  ]

  const regionalTestimonials = [
    {
      country: "Turkey",
      flag: "🇹🇷",
      customer: "Mehmet A.",
      review: "Türk kalitesi gerçekten fark yaratıyor!",
      translation: "Turkish quality really makes a difference!",
    },
    {
      country: "Germany",
      flag: "🇩🇪",
      customer: "Klaus M.",
      review: "Ausgezeichnete Qualität und schnelle Lieferung!",
      translation: "Excellent quality and fast delivery!",
    },
    {
      country: "UAE",
      flag: "🇦🇪",
      customer: "Omar K.",
      review: "منتج طبيعي ممتاز وفعال جداً",
      translation: "Excellent natural product and very effective",
    },
    {
      country: "France",
      flag: "🇫🇷",
      customer: "Pierre L.",
      review: "Produit naturel de haute qualité!",
      translation: "High quality natural product!",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-blue-600 text-white text-lg px-4 py-2 mb-4">
            <Globe className="w-4 h-4 mr-2" />
            Global Reach
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Available <span className="text-yellow-400">Worldwide</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Serving customers globally with fast, discreet shipping and multilingual support
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Language Selection */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-400" />
                Choose Your Language
              </h3>
              <div className="space-y-3">
                {languages.map((lang, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start border-gray-600 hover:border-yellow-500 hover:bg-yellow-500/10 bg-transparent transition-all duration-300"
                    onClick={() => {
                      console.log(`Switching to language: ${lang.name}`)
                      // Language switching logic would go here
                    }}
                  >
                    <span className="text-2xl mr-3">{lang.flag}</span>
                    <span className="text-white">{lang.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2 text-green-400" />
                Global Shipping
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <span className="text-white">Europe</span>
                  <Badge className="bg-green-600">3-5 Days</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <span className="text-white">Middle East</span>
                  <Badge className="bg-green-600">2-4 Days</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <span className="text-white">North America</span>
                  <Badge className="bg-yellow-600">5-7 Days</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <span className="text-white">Other Regions</span>
                  <Badge className="bg-blue-600">7-10 Days</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Currency Options */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-yellow-400" />
                Currency Options
              </h3>
              <div className="space-y-3">
                {currencies.map((currency, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-yellow-400">{currency.symbol}</span>
                      <span className="text-white">{currency.name}</span>
                    </div>
                    <Badge variant="outline" className="border-gray-500 text-gray-300">
                      {currency.code}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Testimonials */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Customers Worldwide</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalTestimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{testimonial.flag}</div>
                  <h4 className="font-bold text-white mb-2">{testimonial.customer}</h4>
                  <p className="text-sm text-gray-400 mb-2">{testimonial.country}</p>
                  <p className="text-yellow-400 text-sm italic mb-2">"{testimonial.review}"</p>
                  <p className="text-gray-500 text-xs">"{testimonial.translation}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Global Stats */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">50+</div>
              <p className="text-gray-300">Countries Served</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">10K+</div>
              <p className="text-gray-300">Happy Customers</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <p className="text-gray-300">Customer Support</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">99%</div>
              <p className="text-gray-300">Satisfaction Rate</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-105"
            onClick={() => {
              window.open(
                "https://wa.me/923194405935?text=I want to check shipping options to my country for 48hoursplus Herbal Honey and place an order",
                "_blank",
              )
            }}
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Order via WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
