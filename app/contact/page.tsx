import type { Metadata } from "next"
import { ContactSection } from "@/components/contact-section"
import { InternationalMarket } from "@/components/international-market"
import { FAQSection } from "@/components/faq-section"

export const metadata: Metadata = {
  title: "Contact & Shipping",
  description: "Order 48 Hours Plus Herbal Honey via WhatsApp, check worldwide shipping options, and find answers to common questions.",
}

export default function ContactPage() {
  return (
    <div className="pt-24">
      <ContactSection />
      <InternationalMarket />
      <FAQSection />
    </div>
  )
}
