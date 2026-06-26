// components/video-showcase.tsx
'use client';

import { useEffect, useRef } from 'react';
import { ShowcaseVideo } from '@/lib/types';

interface VideoShowcaseProps {
  videos: ShowcaseVideo[];
}

export function VideoShowcase({ videos }: VideoShowcaseProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.play().catch((err) => console.log("Showcase video autoplay block:", err));
      }
    });
  }, [activeVideos]);

  return (
    /* 
       SEAMLESS BREAKOUT VIDEO WALL:
       Removed 'border-y border-zinc-200' to prevent horizontal division lines [2].
    */
    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-black p-0">
      <div className={`grid grid-cols-1 md:grid-cols-${Math.min(activeVideos.length, 2)} gap-0 m-0 p-0`}>
        
        {activeVideos.slice(0, 2).map((video, idx) => (
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