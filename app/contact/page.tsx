// app/contact/page.tsx

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Clock, 
  Sparkles, 
  Info, 
  Flame, 
  BookOpen, 
  HelpCircle,
  TrendingUp,
  Activity
} from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal"; // <-- Import the scroll-observer wrapper [2]

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Elixir Guide & FAQ | 48 Hours Plus',
  description: 'The complete consultative guide, dosing instructions, and biological science behind our certified Turkish herbal honey.',
};

export default function ContactPage() {
  const faqs = [
    {
      q: "How long does a single sachet of 48 Hours Plus last?",
      a: "Due to the unique molecular binding of Turkish raw honey and active botanicals, the formula remains highly bioavailable in your bloodstream, delivering sustained stamina and natural blood flow support for up to 48 hours."
    },
    {
      q: "Is 48 Hours Plus Herbal Honey completely natural?",
      a: "Yes. Our formula contains 100% organic, laboratory-tested active botanicals including Date Syrup, Pure Honey, Premium Saffron, and Royal Jelly, with zero synthetic chemicals, artificial colorings, or preservatives."
    },
    {
      q: "Why do some people experience facial warmth or redness?",
      a: "This is a completely normal physiological reaction known as natural vasodilation. The herbal compounds temporarily expand your microvascular pathways, bringing healthy, oxygen-rich blood flow to the surface. It is entirely harmless and a sign of pure physical vitality."
    },
    {
      q: "How should I store my honey sachets?",
      a: "Keep your sachets in a cool, dry place away from direct sunlight. The product has a stable 2-year shelf life under normal room temperature conditions."
    }
  ];

  return (
    <main 
      className="min-h-screen bg-gradient-to-b from-[#000000] via-[#080602] to-[#170f03] text-zinc-100 py-12 pt-24 px-6 sm:px-8 lg:px-12 transition-colors duration-300 ease-in-out"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header Block (Reveals instantly on load) */}
        <ScrollReveal>
          <div className="text-center space-y-4">
            <Badge className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs px-4 py-1.5 rounded-full select-none uppercase tracking-widest font-semibold">
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              The Sovereign Alchemist's Guide
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-tight">
              The Science, Dosing, & Story of{" "}
              <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">
                48 Hours Plus
              </span>
            </h1>
            <p className="text-zinc-400 font-light text-lg italic max-w-2xl mx-auto pt-2">
              &ldquo;Unlock your baseline stamina, master the art of natural vasodilation, and discover the true capacity of the Turkish botanical elixir.&rdquo;
            </p>
          </div>
        </ScrollReveal>

        {/* Narrative Chapters (Each wrapped in Scroll Reveals for gradual scroll entries) */}
        <article className="space-y-12 text-zinc-300 leading-relaxed text-md sm:text-lg font-light">
          
          {/* Chapter 1 */}
          <ScrollReveal>
            <div className="space-y-4 border-t border-zinc-900 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Chapter I: Sourced from the Untamed Plateaus of Turkey
              </h2>
              <p>
                In the heart of Turkey's high-altitude valleys, wildflowers bloom in pristine, mineral-rich soils. It is from the bees of these untamed lands that our raw honey is harvested—a dense, highly bioavailable golden nectar that has served as the foundation of traditional Eastern vitality tonics for centuries.
              </p>
              <p>
                But 48 Hours Plus is not just honey. It is a calculated botanical formula [2]. By infusing this premium raw honey base with **9 active, organic compounds**—including stone-ground Saffron, pure Royal Jelly, Panax Ginseng, and natural Date Syrup—our alchemists created a synergistic delivery system that floods your cardiovascular pathways with sustained stamina, natural focus, and absolute physical endurance.
              </p>
            </div>
          </ScrollReveal>

          {/* Chapter 2 */}
          <ScrollReveal>
            <div className="space-y-4 border-t border-zinc-900 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Chapter II: The Golden Hour — Dosing & Timing
              </h2>
              <p>
                To experience the peak potential of this organic formula, timing is your most critical tool. We advise our clients to take their custom dose approximately **45 minutes before going to bed** or commencing planned physical activity [2].
              </p>
              <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 flex items-start gap-4 hover:border-yellow-500/20 transition-all duration-300 my-6">
                <div className="bg-yellow-500/10 p-3 rounded-xl border border-yellow-500/20 shrink-0">
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="text-left space-y-1">
                  <h4 className="font-bold text-white text-sm sm:text-md">The 45-Minute Window</h4>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    During this initial 45-minute window, the sublingual pathways under your tongue and your digestive tract absorb the active botanical compounds, gradually expanding your vascular channels and releasing sustained energy smoothly into your bloodstream [2].
                  </p>
                </div>
              </div>
              <p>
                For optimal absorption, take the honey on an empty stomach or at least 2 hours after your last meal, and always accompany your dose with a large, warm glass of water. Water acts as the vehicle, rapidly carrying the honey's active nutrients to your cells [2].
              </p>
            </div>
          </ScrollReveal>

          {/* Chapter 3 */}
          <ScrollReveal>
            <div className="space-y-4 border-t border-zinc-900 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 flex items-center gap-2">
                <Flame className="w-5 h-5" />
                Chapter III: Embrace the Flush — The Science of Circulation
              </h2>
              <p>
                A common question we receive from new users is: *&ldquo;After taking the sachet, I felt a sudden warmth, and my face developed a slight reddish glow. Is this safe?&rdquo;* [2]
              </p>
              <p className="border-l-2 border-yellow-500 pl-4 italic text-zinc-400 font-light my-6">
                &ldquo;Do not fear the flush—embrace the surge of life! A warm, healthy, temporary reddish face or cheeks is the ultimate biological proof that your cardiovascular system is functioning at peak capacity.&rdquo; [2]
              </p>
              <p>
                This sensation is an entirely normal physiological reaction known as **natural vasodilation** [2]. Saffron, Ginseng, and raw honey work together to relax and temporarily expand your microvascular pathways, bringing healthy, oxygen-rich blood flow to the surface of your skin [2]. It is **completely harmless, temporary, and proof** that the organic ingredients have successfully entered your circulation to boost physical stamina [2].
              </p>
            </div>
          </ScrollReveal>

          {/* Chapter 4 */}
          <div className="space-y-4 border-t border-zinc-900 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Chapter IV: The Art of the Sachet — Squeeze, Split, or Power Up
            </h2>
            <p>
              You are the master of your routine. Every 16g sachet of 48 Hours Plus is formulated to be highly versatile. Depending on your physiological goals and experience, you can customize your dosing [2]:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <ScrollReveal delay={0}>
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 hover:border-yellow-500/20 transition-all duration-300 h-full">
                  <h4 className="font-bold text-yellow-400 text-sm">The Full Surge (Single Dose)</h4>
                  <p className="text-xs text-zinc-400 mt-2 font-light">
                    Squeeze and consume one full sachet at once for maximum bioavailability and peak performance lasting up to 48 hours [2].
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={150}>
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 hover:border-yellow-500/20 transition-all duration-300">
                  <h4 className="font-bold text-yellow-400 text-sm">The Micro-Tonic (Split Dosing)</h4>
                  <p className="text-xs text-zinc-400 mt-2 font-light">
                    Squeeze half a sachet, seal, and consume the remaining half across the next 2-3 days for a gentler, highly sustained baseline energy boost [2].
                  </p>
                </div>
              </ScrollReveal> {/* <-- Corrected mismatched closing tag [2] */}
            </div>

            <p>
              To understand this, we use a simple alchemist's rule: **as much as you put the sugar, the product will be sweet** [2]. 
            </p>
            <p>
              The physical output and intensity of the formula are directly proportional to the amount you consume [2]. Like brewing a perfect cup of tea, you control the sweet strength of your endurance [2]. If you seek a subtle, daily wellness tonic, split the sachet [2]; if you seek an extraordinary, unyielding surge of stamina, take the full sachet at once [2].
            </p>
          </div>

        </article>

        {/* FAQs Section */}
        <section className="space-y-8 border-t border-zinc-900 pt-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-yellow-500" />
              Objection-Handling FAQs
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Clear answers to common questions regarding logistics, safety, and payment [2].
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}> {/* Sequential reveal delay */}
                <div 
                  className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 hover:border-yellow-500/20 transition-all duration-300"
                >
                  <h4 className="text-sm sm:text-md font-bold text-yellow-400 font-serif flex items-center gap-2">
                    <Info className="w-4 h-4 text-yellow-500 shrink-0" />
                    {faq.q}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed font-light pl-6">
                    {faq.a}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Consultant CTA */}
        <ScrollReveal>
          <div className="text-center border-t border-zinc-900 pt-16 max-w-2xl mx-auto space-y-6">
            <div className="bg-yellow-500/10 p-3 rounded-full w-12 h-12 flex items-center justify-center border border-yellow-500/20 mx-auto">
              <Activity className="w-6 h-6 text-yellow-500 animate-pulse" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
              Consult with Our Herbal Specialists Today
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Every man's physical makeup is unique. If you would like a personalized dosing consultation, or have any specific delivery requests, speak directly with our team on WhatsApp [2].
            </p>

            <Link 
              href="https://wa.me/923194405935?text=Hi,%20I%20would%20like%20to%20consult%20with%20a%20specialist%20regarding%2048%20Hours%20Plus%20dosing." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white text-md px-10 py-6 h-auto font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-green-600/10 flex items-center justify-center gap-2 mx-auto"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Connect with a Consultant
              </Button>
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </main>
  );
}