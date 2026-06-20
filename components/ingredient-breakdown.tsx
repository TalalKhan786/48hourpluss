"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Image from "next/image"

export function IngredientBreakdown() {
  const mainIngredients = [
    {
      name: "Date Syrup",
      benefit: "Natural energy booster",
      description: "Rich in natural sugars and minerals for sustained energy and vitality enhancement",
      image: "/images/date-syrup.png",
    },
    {
      name: "Pure Honey",
      benefit: "Antioxidant-rich base",
      description: "Premium Turkish honey with powerful antioxidant properties and natural absorption enhancement",
      image: "/images/honey.png",
    },
    {
      name: "Premium Saffron",
      benefit: "Mood & vitality enhancer",
      description: "World's most expensive spice for mood enhancement and natural energy boost",
      image: "/images/saffron.png",
    },
    {
      name: "Royal Jelly",
      benefit: "Superfood for energy",
      description: "Nutrient-dense bee product packed with vitamins, minerals and amino acids",
      image: "/images/royal-jelly.png",
    },
  ]

  const allIngredients = [
    "Date Syrup - Natural energy booster",
    "Pure Turkish Honey - Antioxidant base",
    "Premium Saffron - Mood enhancer",
    "Royal Jelly - Superfood energy",
    "Turnera Diffusa (Damiana) - Traditional vitality herb",
    "Carob Extract - Natural wellness support",
    "Ginger Root - Circulation booster",
    "Cinnamon Bark - Blood flow enhancement",
    "Panax Ginseng - Korean vitality root",
  ]

  return (
    <section id="ingredients" className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="text-yellow-400">Premium</span> Natural Ingredients
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our signature blend features 4 premium ingredients with 5 additional powerful herbs for maximum
            effectiveness
          </p>
        </div>

        {/* Main 4 Ingredients with Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {mainIngredients.map((ingredient, index) => (
            <Card
              key={index}
              className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <Image
                    src={ingredient.image || "/placeholder.svg"}
                    alt={ingredient.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                </div>

                <h3 className="text-xl font-bold text-yellow-400 mb-2">{ingredient.name}</h3>
                <p className="text-green-400 font-semibold mb-3">{ingredient.benefit}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{ingredient.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Complete Ingredients List */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Complete Formula - 9 Natural Ingredients</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allIngredients.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0" />
                <span className="text-white font-medium text-sm">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-105"
            onClick={() => {
              window.open(
                "https://wa.me/923194405935?text=I want to know more about the premium ingredients in 48hoursplus Herbal Honey",
                "_blank",
              )
            }}
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Ask About Ingredients
          </Button>
        </div>
      </div>
    </section>
  )
}
