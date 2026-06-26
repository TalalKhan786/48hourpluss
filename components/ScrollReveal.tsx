// components/ScrollReveal.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // Optional delay in milliseconds to support cascading animations [2]
}

export function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  const [hasRevealed, setHasRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // High-performance native browser IntersectionObserver API [2]
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setHasRevealed(true);
          }, delay);
        }
      },
      {
        threshold: 0.05, // Triggers when 5% of the card is visible on screen [2]
        rootMargin: '0px 0px -10% 0px', // Triggers slightly before entering viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={containerRef}
      /* 
         LUXURY MOTION: 
         A slow, decelerating 1.2-second transition (ease-[cubic-bezier(0.16,1,0.3,1)]) [2]
         with a subtle blur-md and scale-98 depth-of-field reveal.
      */
      className={`transform transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hasRevealed
          ? 'opacity-100 translate-y-0 blur-0 scale-100'
          : 'opacity-0 translate-y-10 blur-md scale-[0.98]'
      }`}
    >
      {children}
    </div>
  );
}