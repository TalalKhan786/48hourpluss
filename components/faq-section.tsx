"use client"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MessageCircle } from "lucide-react"

export function FAQSection() {
  const faqs = [
    {
      question: "How does the honey-based formula work?",
      answer:
        "Our honey-based delivery system enhances the absorption of herbal ingredients. Honey acts as a natural carrier, allowing the active compounds to be absorbed more efficiently into your system. The natural sugars in honey also provide immediate energy while the herbs work synergistically for extended benefits.",
    },
    {
      question: "What makes Turkish herbs special?",
      answer:
        "Turkey has a rich tradition of herbal medicine spanning thousands of years. The unique climate and soil conditions in Turkey produce herbs with exceptional potency and purity. Our herbs are sourced from specific regions known for their superior quality, and we work directly with local farmers who use traditional cultivation methods.",
    },
    {
      question: "Is it safe with other medications?",
      answer:
        "While our product is made from natural ingredients, we strongly recommend consulting with your healthcare provider before use if you are taking any medications, especially blood thinners, heart medications, or blood pressure medications. Natural doesn't always mean it won't interact with pharmaceuticals.",
    },
    {
      question: "How long does one box last?",
      answer:
        "Each box contains 12 sachets of 16g each. With the recommended maximum dosage of 1 sachet per day, one box will last 12 days. For optimal results, many customers use it 2-3 times per week, making one box last 3-6 weeks depending on usage frequency.",
    },
    {
      question: "What's the shelf life?",
      answer:
        "Our product has a 2-year shelf life when stored properly in a cool, dry place away from direct sunlight. Each box is clearly marked with the manufacturing and expiration dates. We recommend consuming within 6 months of opening for best taste and potency.",
    },
    {
      question: "What are the international shipping options?",
      answer:
        "We ship worldwide with various options: Express shipping (2-5 days) to most countries, Standard shipping (5-10 days), and Economy shipping (10-15 days). All packages are discreetly packaged with tracking numbers provided. Shipping costs vary by destination and are calculated through WhatsApp consultation.",
    },
    {
      question: "Are there any side effects?",
      answer:
        "Our product is made from natural ingredients and is generally well-tolerated. Some users may experience temporary skin flushing due to improved blood circulation, which is normal. Rare side effects may include mild stomach upset if taken on a full stomach. Discontinue use if you experience any adverse reactions.",
    },
    {
      question: "How should I store the product?",
      answer:
        "Store in a cool, dry place at room temperature (15-25°C). Avoid direct sunlight, heat, and moisture. Refrigeration is not necessary but can extend freshness in hot climates. Keep individual sachets sealed until ready to use to maintain potency and prevent contamination.",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="text-yellow-400">Questions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get answers to the most common questions about 48 Hours Plus Herbal Honey
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-800 border-gray-700 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-white hover:text-yellow-400 py-6">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-6 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-6">
            Still have questions? Our customer support team is available 24/7 via WhatsApp
          </p>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-105"
            onClick={() => {
              window.open("https://wa.me/923194405935?text=I have a question about 48hoursplus Herbal Honey", "_blank")
            }}
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Ask via WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
