"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"

interface CertificateModalProps {
  isOpen: boolean
  onClose: () => void
  certificate: {
    name: string
    image: string
    reportNumber: string
    accreditation: string
  } | null
}

export function CertificateModal({ isOpen, onClose, certificate }: CertificateModalProps) {
  if (!certificate) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gray-900 border-gray-700">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-white text-xl">{certificate.name}</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative bg-white rounded-lg p-4">
            <Image
              src={certificate.image || "/placeholder.svg"}
              alt={certificate.name}
              width={800}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Certificate Number:</span>
                <p className="text-white font-mono">{certificate.reportNumber}</p>
              </div>
              <div>
                <span className="text-gray-400">Accreditation:</span>
                <p className="text-green-400">{certificate.accreditation}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
