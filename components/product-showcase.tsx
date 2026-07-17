// components/product-showcase.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Package, Clock, Droplets, Zap, ArrowUpRight, Star, ShoppingCart } from "lucide-react"
import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Product, ShowcaseVideo } from "@/lib/types"
import { useCart } from "./CartProvider"

interface ProductShowcaseProps {
  products: Product[];
  videos: ShowcaseVideo[];
}

export function ProductShowcase({ products, videos }: ProductShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addToCart } = useCart();

  const activeVideo = videos && videos.length > 0 ? videos[0] : null;

  const formatPrice = (price: string | number) => {
    if (!price) return 'Rs. 0';
    const priceStr = String(price);
    if (priceStr.includes('Rs') || priceStr.includes('PKR')) return priceStr;
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? priceStr : `Rs. ${num.toLocaleString('en-US')}`;
  };

  const features = [
    {
      icon: Package,
      title: "16g Premium Sachets",
      description: "12 individual servings formulated for structured dosing.",
    },
    {
      icon: Droplets,
      title: "Honey-Based Delivery",
      description: "Optimized absorption mechanism utilizing pure raw honey.",
    },
    {
      icon: Zap,
      title: "9 Active Botanicals",
      description: "Carefully calibrated compounds designed for synergistic impact.",
    },
    {
      icon: Clock,
      title: "48-Hour Sustained Duration",
      description: "Sustained bioavailability for physical recovery and stamina.",
    },
  ]

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.autoplay = true;
      video.loop = true;
      video.play().catch((err) => console.log("Showcase video autoplay block:", err));
    }
  }, [activeVideo]);

  // Dynamic Grid Width & Column Calculator for balanced centering [2]
  const visibleProducts = products.slice(0, 4);
  const activeColCount = Math.min(visibleProducts.length, 4);
  const dynamicMaxWidthClass = 
    activeColCount === 1 ? 'max-w-sm' : 
    activeColCount === 2 ? 'max-w-2xl' : 
    activeColCount === 3 ? 'max-w-5xl' : 'max-w-full';

  return (
    /* 
       SEAMLESS DIFFUSION SHOWCASE:
       Removed 'border-b border-zinc-200' to diffuse cleanly into the next section [2].
    */
    <section id="product-showcase" className="py-12 sm:py-20 md:py-28 bg-transparent text-white transition-colors duration-300">
      
      {/* Aligned with your global Navbar container [2] */}
      <div className="container mx-auto px-4">
        
        {/* Dynamic Featured Products Catalog */}
        {products && products.length > 0 && (
          <div className="mb-16 sm:mb-28">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <Badge className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs px-3.5 py-1 mb-4 uppercase tracking-widest font-semibold rounded-full">
                Storefront Catalog
              </Badge>
              <h3 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-100 mb-4 font-serif">
                Featured{" "}
                <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">
                  Formulations
                </span>
              </h3>
              <p className="text-zinc-400 font-light text-base leading-relaxed">
                Explore our certified natural formulations queried directly from our database [1].
              </p>
            </div>

            {/* Dynamic Grid */}
            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${activeColCount} ${dynamicMaxWidthClass} gap-4 sm:gap-6 mx-auto justify-center`}>
              {visibleProducts.map((product) => {
                const reviewsCount = product.reviews.length;
                const averageRating = reviewsCount > 0 
                  ? Math.round(product.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewsCount) 
                  : 5;

                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col justify-between border border-zinc-800 rounded-3xl bg-zinc-950/40 p-4 hover:border-yellow-500/30 hover:shadow-lg dark:hover:shadow-yellow-500/[0.01] transition-all duration-500 hover:-translate-y-1.5"
                  >
                    <div>
                      {/* Image container */}
                      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-black border border-zinc-900/60">
                        <Image
                          src={product.images[0] || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80'}
                          alt={product.name}
                          fill
                          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      
                      <div className="mt-4 space-y-1 text-left">
                        <span className="text-[10px] text-yellow-500 font-semibold uppercase tracking-wider block">
                          {product.categorySlug}
                        </span>
                        
                        <h4 className="text-sm sm:text-md font-bold text-zinc-100 mt-1 group-hover:text-yellow-400 transition-colors">
                          <Link href={`/products/${product.slug}`}>
                            {product.name}
                          </Link>
                        </h4>

                        {/* Star Rating Indicator */}
                        <div className="flex items-center gap-1 pt-0.5">
                          <div className="flex items-center text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < averageRating ? 'fill-amber-400 text-amber-400' : 'text-zinc-850'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-zinc-500 font-medium ml-1">
                            ({reviewsCount})
                          </span>
                        </div>

                        <p className="text-md font-extrabold text-yellow-400 font-serif pt-1">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>

                    {/* Add to Cart button */}
                    <div className="mt-4 pt-3 border-t border-zinc-800/50 flex flex-col gap-2">
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-transform duration-300 hover:scale-[1.02] shadow-sm"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add to Cart
                      </Button>
                      
                      <Link href={`/products/${product.slug}`} className="text-center text-[10px] text-zinc-400 hover:text-yellow-500 transition-colors font-medium">
                        View Specs &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Technical Specifications Section */}
        {/* Removed 'border-t border-zinc-200' to create a continuous dark flow [2] */}
        <div className="pt-16 sm:pt-20">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <h3 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-100 mb-4 font-serif">
              Traditional{" "}
              <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">
                Wisdom
              </span>
            </h3>
            <p className="text-zinc-400 font-light text-base leading-relaxed">
              Synthesized with clinical standards to create a highly bioavailable energy formulation [1].
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left: Dynamic Video Showcase */}
            <div className="lg:col-span-7 relative">
              <div className="bg-gradient-to-br from-yellow-500/[0.05] to-transparent rounded-3xl p-3 sm:p-4 border border-zinc-900/60">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-zinc-800 bg-black aspect-video w-full">
                  <video
                    ref={videoRef}
                    src={activeVideo ? activeVideo.videoUrl : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%282%29-BcjxTQqEgmIXohURl79ynqgmdrUsTh.mp4"}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.01]"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/images/product-main.png"
                  />
                </div>
              </div>

              {/* Dynamic Overlay Badges */}
              <div className="absolute top-8 right-8 bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                Turkish Import
              </div>
              <div className="absolute bottom-8 left-8 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                ISO & Halal
              </div>
            </div>

            {/* Right: Technical Features List */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="rounded-3xl border border-zinc-800 bg-zinc-950/40 p-5 sm:p-6 flex items-start space-x-4 hover:border-yellow-500/30 transition-all duration-300"
                >
                  <div className="bg-yellow-500/10 p-3 rounded-xl border border-yellow-500/20 shrink-0">
                    <feature.icon className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-zinc-100 mb-1">{feature.title}</h3>
                    <p className="text-sm text-zinc-400 font-light leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Action CTA */}
        <div className="text-center mt-16 sm:mt-20">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-md px-10 py-6 h-auto font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-green-600/10 flex items-center justify-center gap-2 mx-auto"
            onClick={() => {
              window.open(
                "https://wa.me/923194405935?text=I want to know more about 48hoursplus Herbal Honey features and place an order",
                "_blank"
              )
            }}
          >
            <MessageCircle className="w-5 h-5" />
            Inquire via WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
