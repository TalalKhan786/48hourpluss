"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Clock, Shield, Truck, CreditCard } from "lucide-react"

export function ContactSection() {
  const orderOptions = [
    {
      title: "Single Sachet",
      description: "Perfect for first-time customers",
      price: "1,499 PKR",
      whatsappText: "Hi, I want to order 1 single sachet of 48 Hours Plus Herbal Honey for 1,499 PKR",
      popular: false,
    },
    {
      title: "Complete Box",
      description: "Best value for regular users",
      price: "15,999 PKR (Save 8,001 PKR)",
      whatsappText: "Hi, I want to order 1 complete box (12 sachets) of 48 Hours Plus for 15,999 PKR",
      popular: true,
    },
    {
      title: "Bulk Orders",
      description: "Wholesale pricing available",
      price: "Contact for best rates",
      whatsappText: "Hi, I'm interested in bulk/wholesale pricing for 48 Hours Plus",
      popular: false,
    },
  ]

  const trustSignals = [
    {
      icon: Shield,
      title: "Secure Ordering",
      description: "Safe and encrypted transactions",
    },
    {
      icon: MessageCircle,
      title: "Fast Response",
      description: "Usually respond within 5 minutes",
    },
    {
      icon: Truck,
      title: "Discreet Shipping",
      description: "Private packaging and delivery",
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Multiple payment options available",
    },
  ]

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to <span className="text-yellow-400">Order</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your preferred option below and get in touch via WhatsApp for instant support
          </p>
        </div>

        {/* Order Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {orderOptions.map((option, index) => (
            <Card
              key={index}
              className={`bg-gray-800 border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:scale-105 relative cursor-pointer ${
                option.popular ? "ring-2 ring-yellow-500" : ""
              }`}
            >
              {option.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black">
                  Most Popular
                </Badge>
              )}
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-3">{option.title}</h3>
                <p className="text-gray-400 mb-4">{option.description}</p>
                <p className="text-2xl font-bold text-yellow-400 mb-6">{option.price}</p>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-105"
                  onClick={() =>
                    window.open(`https://wa.me/923194405935?text=${encodeURIComponent(option.whatsappText)}`, "_blank")
                  }
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Business Hours */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-green-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Customer Support Hours</h3>
          </div>
          <p className="text-xl text-green-400 font-semibold mb-2">Available 24/7 via WhatsApp</p>
          <p className="text-gray-400">
            Our dedicated support team is ready to assist you anytime, anywhere in the world
          </p>
        </div>

        {/* Trust Signals */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustSignals.map((signal, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 text-center">
              <CardContent className="p-6">
                <div className="bg-blue-600 p-3 rounded-full inline-block mb-4">
                  <signal.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-white mb-2">{signal.title}</h4>
                <p className="text-gray-400 text-sm">{signal.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">All Orders via WhatsApp</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <MessageCircle className="w-6 h-6 text-white" />
              <span className="text-xl font-bold text-white">WhatsApp: +92-319-4405935</span>
            </div>
            <p className="text-green-100 text-sm">
              For all inquiries, orders (single, box, or bulk), and customer support - WhatsApp is your direct line to
              our team!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
