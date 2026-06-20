import { Badge } from "@/components/ui/badge"
import { MessageCircle, Mail, Shield, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const quickLinks = [
    { name: "Products", href: "/products" },
    { name: "Product Details", href: "/products/48-hours-plus-herbal-honey" },
    { name: "Certificates", href: "/certificates" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ]

  const certifications = ["ISO 22000 Certified", "GMP Certified", "HACCP Certified", "Halal Certified", "Lab Tested"]

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/logo-new.png"
                alt="48 Hours Plus Logo"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-yellow-400">48hoursplus</h3>
                <p className="text-sm text-gray-400">Herbal Honey</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium Turkish herbal honey with 9 powerful natural ingredients. Trusted by thousands worldwide for
              natural male enhancement. Official 48hoursplus distributor.
            </p>
            <div className="flex space-x-2">
              <Badge className="bg-green-600 text-white text-xs">100% Natural</Badge>
              <Badge className="bg-blue-600 text-white text-xs">Turkish Made</Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quality Assurance</h4>
            <ul className="space-y-2">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Shield className="w-3 h-3 text-green-400" />
                  <span className="text-gray-400 text-sm">{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-400 text-sm">+92-319-4405935</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">48hoursplusherbalhoney@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-400 text-sm">Available Worldwide</span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">Available 24/7</p>
              <div className="flex space-x-2">
                <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                  WhatsApp Support
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">© 48hoursplus - 48 Hours Plus Herbal Honey. All rights reserved.</p>
              <p className="text-gray-500 text-xs mt-1">
                Official Turkish distributor - Made with premium natural ingredients
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-gray-900 rounded-lg">
            <p className="text-gray-500 text-xs leading-relaxed">
              <strong>Disclaimer:</strong> This product is not intended to diagnose, treat, cure, or prevent any
              disease. Individual results may vary. Consult your healthcare provider before use, especially if you have
              medical conditions or take medications. For adults 18+ only. Keep out of reach of children.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
