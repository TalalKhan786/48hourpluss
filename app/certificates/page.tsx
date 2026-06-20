import type { Metadata } from "next"
import { CertificationsSection } from "@/components/certifications-section"

export const metadata: Metadata = {
  title: "Lab Certificates & Quality Testing",
  description: "NANOLAB safety testing, ISO 9001/22000, GMP, and Halal certifications for 48 Hours Plus Herbal Honey.",
}

export default function CertificatesPage() {
  return (
    <div className="pt-24">
      <CertificationsSection />
    </div>
  )
}
