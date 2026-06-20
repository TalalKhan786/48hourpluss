"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/923194405935?text=Hi, I'm interested in 48hoursplus Herbal Honey", "_blank")
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <Button
        onClick={handleWhatsAppClick}
        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-2xl animate-pulse hover:animate-none transition-all duration-300 hover:scale-110 whatsapp-pulse"
        size="lg"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="sr-only">Contact via WhatsApp</span>
      </Button>

      <div className="absolute bottom-16 right-0 bg-white text-black p-3 rounded-lg shadow-lg max-w-xs opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="flex items-center space-x-2 mb-1">
          <Image src="/images/logo-new.png" alt="48 Hours Plus" width={20} height={20} className="rounded" />
          <p className="text-sm font-medium">Need help? Chat with us!</p>
        </div>
        <p className="text-xs text-gray-600">48hoursplus Support Team</p>
        <div className="absolute bottom-0 right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
      </div>
    </div>
  )
}
