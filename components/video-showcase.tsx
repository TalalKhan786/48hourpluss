// components/video-showcase.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ShowcaseVideo } from '@/lib/types';

interface VideoShowcaseProps {
  videos: ShowcaseVideo[];
}

export function VideoShowcase({ videos }: VideoShowcaseProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Fallback default videos
  const activeVideos = videos && videos.length > 0 ? videos : [
    {
      id: "fallback-1",
      title: "Herbal Honey for You",
      badgeText: "Product Demo",
      videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%282%29-BcjxTQqEgmIXohURl79ynqgmdrUsTh.mp4",
      order: 1,
      isActive: true,
    },
    {
      id: "fallback-2",
      title: "48 Hours Plus",
      badgeText: "Ingredients",
      videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%282%29-BcjxTQqEgmIXohURl79ynqgmdrUsTh.mp4",
      order: 2,
      isActive: true,
    }
  ];

  // Intersection Observer for lazy loading videos
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        video.autoplay = false; // Disable autoplay for better performance
        video.loop = true;
        video.preload = 'none'; // Don't preload
        // Only play on hover or when visible
      }
    });
  }, [isVisible]);

  return (
    /* 
       SEAMLESS BREAKOUT VIDEO WALL:
       Lazy-loaded with Intersection Observer to avoid blocking initial page render [2].
    */
    <section ref={containerRef} className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-black p-0">
      <div className={`grid grid-cols-1 md:grid-cols-${Math.min(activeVideos.length, 2)} gap-0 m-0 p-0`}>
        
        {isVisible && activeVideos.slice(0, 2).map((video, idx) => (
          <div 
            key={video.id} 
            className="relative h-[45vh] sm:h-[55vh] md:aspect-video md:h-auto w-full overflow-hidden group border-b md:border-b-0 md:border-r border-zinc-900/60"
          >
            <video
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              src={video.videoUrl}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.01]"
              playsInline
              onMouseEnter={(e) => (e.currentTarget.play())}
              onMouseLeave={(e) => (e.currentTarget.pause())}
            />
            
            {/* Top-Left Category Badge */}
            <div className="absolute top-6 left-6 z-20 bg-purple-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-md tracking-wider uppercase shadow-md select-none">
              {video.badgeText}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
