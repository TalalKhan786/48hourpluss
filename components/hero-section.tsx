// components/hero-section.tsx
"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { HeroSlide } from "@/lib/types"

interface HeroSectionProps {
  slides: HeroSlide[]
}

export function HeroSection({ slides }: HeroSectionProps) {
  const activeSlides = slides && slides.length > 0 ? slides : [
    {
      id: "static",
      title: "48 Hours Plus Banner",
      imageUrl: "/images/product-main.png",
      order: 1,
      isActive: true
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50; 

  const activeSlide = activeSlides[currentIndex];

  useEffect(() => {
    if (activeSlides.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, activeSlides.length]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setFadeState('fade-out');

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
      setFadeState('fade-in');
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setFadeState('fade-out');

    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
      setFadeState('fade-in');
      setIsTransitioning(false);
    }, 300);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setFadeState('fade-out');

    setTimeout(() => {
      setCurrentIndex(index);
      setFadeState('fade-in');
      setIsTransitioning(false);
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    /* 
       SEAMLESS DIFFUSION HERO:
       Removed the bottom border to allow the banner to diffuse directly into the next section [2].
    */
    <section 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-auto overflow-hidden bg-black mt-16 select-none"
    >
      {/* Image container */}
      <div className={`w-full h-auto transition-all duration-300 ease-in-out ${
        fadeState === 'fade-in' 
          ? 'opacity-100 blur-0 scale-100' 
          : 'opacity-0 blur-sm scale-[1.01]'
      }`}>
        <Image
          src={activeSlide.imageUrl}
          alt={activeSlide.title || "48 Hours Plus Banner"}
          width={1920}
          height={1080}
          className="w-full h-auto block"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Navigation Columns */}
      {activeSlides.length > 1 && (
        <div className="container mx-auto px-4 h-full relative z-30 pointer-events-none">
          <div
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center bg-gradient-to-r from-black/60 to-transparent text-white/40 hover:text-yellow-400 opacity-0 hover:opacity-100 cursor-pointer transition-all duration-300 select-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-8 h-8" />
          </div>
          
          <div
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-1/3 w-16 pointer-events-auto flex items-center justify-center bg-gradient-to-l from-black/60 to-transparent text-white/40 hover:text-yellow-400 opacity-0 hover:opacity-100 cursor-pointer transition-all duration-300 select-none"
            aria-label="Next slide"
          >
            <ChevronRight className="w-8 h-8" />
          </div>
        </div>
      )}

      {/* Progress Indicators/Dots */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-1.5 rounded-full transition-all duration-600 ${
                idx === currentIndex ? 'bg-yellow-400 w-8' : 'bg-white/30 w-2 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}