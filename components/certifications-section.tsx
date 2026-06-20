"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Shield, Award, CheckCircle, Eye } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { CertificateModal } from "./certificate-modal"

export function CertificationsSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const certificates = [
    {
      name: "NANOLAB Safety Analysis",
      description: "Heavy metals and toxins test - All results: Not Detected ✓",
      icon: Shield,
      image: "/images/nanolab-report-preview.png",
      details: "Arsenic, Mercury, Cadmium, Lead: Not Detected",
      reportNumber: "1363/0/16.04.2024",
      accreditation: "TÜRKAK Accredited AB-0566-T",
    },
    {
      name: "Certificate of Analysis",
      description: "Complete nutritional breakdown and ingredient verification",
      icon: Award,
      image: "/images/certificate-analysis-preview.png",
      details: "Verified nutritional content and 2-year shelf life",
      reportNumber: "COA-48HP-2024",
      accreditation: "Official Company Certificate",
    },
    {
      name: "Quality Management Certificates",
      description: "ISO 9001, ISO 22000, GMP & Halal Certifications",
      icon: CheckCircle,
      image: "/images/iso-9001-certificate.png",
      details: "Complete quality management system certifications",
      reportNumber: "Multiple DSR Certificates",
      accreditation: "DSR Certification - Valid until 2027",
      additionalCertificates: [
        {
          name: "ISO 9001:2015 Quality Management",
          image: "/images/iso-9001-certificate.png",
          reportNumber: "QMS-20.03.393",
          accreditation: "DSR Certification - Quality Management System",
        },
        {
          name: "Halal Certificate TS OIC/SMIIC",
          image: "/images/halal-certificate.png",
          reportNumber: "H-20.03.123",
          accreditation: "DSR Certification - Halal Food System",
        },
        {
          name: "GMP Certificate",
          image: "/images/gmp-certificate.png",
          reportNumber: "GMP-20.03.393",
          accreditation: "DSR Certification - Good Manufacturing Practices",
        },
        {
          name: "ISO 22000:2018 Food Safety",
          image: "/images/iso-22000-certificate.png",
          reportNumber: "FSMS-20.03.393",
          accreditation: "DSR Certification - Food Safety Management",
        },
      ],
    },
  ]

  const testResults = [
    { test: "Ochratoxin A", result: "Not Detected", status: "✓" },
    { test: "Arsenic (Heavy Metal)", result: "Not Detected", status: "✓" },
    { test: "Mercury (Heavy Metal)", result: "Not Detected", status: "✓" },
    { test: "Cadmium (Heavy Metal)", result: "Not Detected", status: "✓" },
    { test: "Lead (Heavy Metal)", result: "Not Detected", status: "✓" },
  ]

  const nutritionalInfo = [
    { nutrient: "Energy", value: "253 kj / 60 kcal per 20g" },
    { nutrient: "Total Fat", value: "2.3g per serving" },
    { nutrient: "Carbohydrates", value: "6.02g per serving" },
    { nutrient: "Protein", value: "0.86g per serving" },
    { nutrient: "Shelf Life", value: "2 Years Verified" },
  ]

  const handleCertificateClick = (certificate: any) => {
    setSelectedCertificate(certificate)
    setIsModalOpen(true)
  }

  return (
    <section id="certificates" className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-blue-600 text-white text-lg px-4 py-2 mb-4">Quality Assured</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="text-yellow-400">Certified</span> Excellence
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our commitment to quality is backed by rigorous testing and official certifications. Click on certificates
            to view full images.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {certificates.map((cert, index) => (
            <Card
              key={index}
              className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105 group cursor-pointer"
              onClick={() => handleCertificateClick(cert)}
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.name}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-600 text-white text-xs px-2 py-1">
                        <Eye className="w-3 h-3 mr-1" />
                        Click to View
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-600 p-3 rounded-full inline-block">
                    <cert.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-blue-400 mb-2">{cert.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{cert.description}</p>
                <p className="text-green-400 text-xs font-semibold mb-4">{cert.details}</p>

                <div className="bg-gray-700 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Report #:</span>
                    <span className="text-white font-mono text-xs">{cert.reportNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Accreditation:</span>
                    <span className="text-green-400 text-xs">{cert.accreditation}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white text-center mb-8">DSR Quality Certifications</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates[2].additionalCertificates?.map((cert, index) => (
              <Card
                key={index}
                className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:scale-105 group cursor-pointer"
                onClick={() => handleCertificateClick(cert)}
              >
                <CardContent className="p-4">
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.name}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-yellow-400 mb-1">{cert.name}</h4>
                  <p className="text-xs text-gray-400 mb-2">#{cert.reportNumber}</p>
                  <p className="text-xs text-green-400">{cert.accreditation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Shield className="w-6 h-6 text-green-400 mr-3" />
              NANOLAB Test Results
            </h3>
            <div className="space-y-4">
              {testResults.map((test, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-white font-medium">{test.test}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400 font-semibold">{test.result}</span>
                    <span className="text-green-400 text-xl">{test.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-700">
              <p className="text-green-400 text-sm font-semibold">✓ All harmful substances tested: ZERO DETECTION</p>
              <p className="text-gray-300 text-xs mt-1">Tested by TÜRKAK accredited laboratory (AB-0566-T)</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Award className="w-6 h-6 text-yellow-400 mr-3" />
              Nutritional Analysis
            </h3>
            <div className="space-y-4">
              {nutritionalInfo.map((info, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <span className="text-white font-medium">{info.nutrient}</span>
                  <span className="text-yellow-400 font-semibold text-sm">{info.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-700">
              <p className="text-blue-400 text-sm font-semibold">✓ Complete nutritional breakdown verified</p>
              <p className="text-gray-300 text-xs mt-1">Ingredients: Ginseng, Maca Root, Ashwagandha, Tribulus</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Badge className="bg-green-600 text-white px-4 py-2 text-sm">
            <Shield className="w-4 h-4 mr-2" />
            Heavy Metal Free
          </Badge>
          <Badge className="bg-blue-600 text-white px-4 py-2 text-sm">
            <Award className="w-4 h-4 mr-2" />
            ISO Certified
          </Badge>
          <Badge className="bg-purple-600 text-white px-4 py-2 text-sm">
            <CheckCircle className="w-4 h-4 mr-2" />
            Halal Certified
          </Badge>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-105"
            onClick={() => {
              window.open(
                "https://wa.me/923194405935?text=I want to know more about 48hoursplus quality certifications and place an order",
                "_blank",
              )
            }}
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Order Certified Product
          </Button>
        </div>
      </div>

      <CertificateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} certificate={selectedCertificate} />
    </section>
  )
}
