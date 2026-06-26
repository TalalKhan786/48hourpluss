// components/ingredient-breakdown.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ShieldCheck, Leaf } from "lucide-react";
import Image from "next/image";

export function IngredientBreakdown() {
  const keyIngredients = [
    {
      name: "Date Syrup",
      benefit: "Natural energy booster",
      description: "Rich in natural sugars and minerals for sustained energy and vitality enhancement.",
      imageUrl: "https://www.alphafoodie.com/wp-content/uploads/2024/11/Date-Syrup-Main-1.jpeg"
    },
    {
      name: "Pure Honey",
      benefit: "Antioxidant-rich base",
      description: "Premium Turkish honey with powerful antioxidant properties and natural absorption enhancement.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD--q22Y3lAwgzteJfp-cchkBdVdsDkQ69nssCoUiDIL7LbhxcmC2al8_0&s=10"
    },
    {
      name: "Premium Saffron",
      benefit: "Mood & vitality enhancer",
      description: "World's most expensive spice for mood enhancement and natural energy boost.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrcAnZo0G1unHGDRVM7oywzrAN1lhhiX1slP1AJjMQNisuPyKrfLpn_tQ&s=10"
    },
    {
      name: "Royal Jelly",
      benefit: "Superfood for energy",
      description: "Nutrient-dense bee product packed with vitamins, minerals and amino acids.",
      imageUrl: "https://deleehoney.com/wp-content/uploads/2025/09/royal-jelly-supplier-from-china.jpg.webp"
    }
  ];

  const formulaIngredients = [
    { name: "Date Syrup", benefit: "Natural energy booster" },
    { name: "Pure Turkish Honey", benefit: "Antioxidant base" },
    { name: "Premium Saffron", benefit: "Mood enhancer" },
    { name: "Royal Jelly", benefit: "Superfood energy" },
    { name: "Turnera Diffusa (Damiana)", benefit: "Traditional vitality herb" },
    { name: "Carob Extract", benefit: "Natural wellness support" },
    { name: "Ginger Root", benefit: "Circulation booster" },
    { name: "Cinnamon Bark", benefit: "Blood flow enhancement" },
    { name: "Panax Ginseng", benefit: "Korean vitality root" }
  ];

  const openWhatsApp = () => {
    window.open("https://wa.me/923194405935?text=Hi, I want to ask about 48 Hours Plus ingredients.", "_blank");
  };

  return (
    <section 
      id="ingredients" 
      className="py-24 bg-transparent border-b border-zinc-900/40 text-white transition-colors duration-300"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      {/* Aligned horizontally with your global Navbar elements [2] */}
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs px-3.5 py-1 mb-5 uppercase tracking-widest font-semibold rounded-full select-none">
            Botanical Composition
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4 leading-normal">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">Premium</span>{" "}
            Natural Ingredients
          </h2>
          <p className="text-zinc-400 font-light text-md leading-relaxed">
            Our signature blend features 4 premium ingredients with 5 additional powerful herbs for maximum effectiveness [2].
          </p>
        </div>

        {/* Key Ingredient Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {keyIngredients.map((item, idx) => (
            <div 
              key={idx}
              className="group rounded-3xl border border-zinc-900 bg-zinc-950/40 p-3 flex flex-col justify-between hover:border-yellow-500/30 hover:shadow-lg dark:hover:shadow-yellow-500/[0.01] transition-all duration-300"
            >
              <div>
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black border border-zinc-900/60 mb-4">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority
                  />
                </div>
                
                <div className="space-y-1 text-left">
                  <span className="text-[10px] text-yellow-600 dark:text-yellow-500 font-semibold uppercase tracking-wider block">
                    {item.benefit}
                  </span>
                  <h3 className="text-md sm:text-lg font-bold text-yellow-400 font-serif leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-normal font-light mt-2 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 9 Ingredients list container */}
        <div className="mt-16 rounded-3xl border border-zinc-900 bg-zinc-950/20 p-6 sm:p-8 max-w-4xl mx-auto">
          <h3 className="text-lg sm:text-xl font-bold text-center text-white mb-6 tracking-wide border-b border-zinc-900 pb-4">
            Complete Formula — 9 Natural Ingredients
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formulaIngredients.map((ing, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-zinc-900 bg-zinc-950/30 p-3.5 flex items-center gap-3 transition-colors hover:bg-zinc-900/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0"></span>
                <div className="text-left">
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    {ing.name}
                  </h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    {ing.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-md px-10 py-6 h-auto font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-green-600/10 flex items-center justify-center gap-2 mx-auto"
            onClick={openWhatsApp}
          >
            <MessageCircle className="w-5 h-5" />
            Ask About Ingredients
          </Button>
        </div>

      </div>
    </section>
  );
}