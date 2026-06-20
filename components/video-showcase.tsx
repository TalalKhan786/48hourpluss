"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Play } from "lucide-react"
import { useEffect, useRef } from "react"

export function VideoShowcase() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const videos = [
    {
      title: "Herbal Honey for You",
      description: "Discover the authentic quality and premium packaging of our 48 Hours Plus Herbal Honey",
      videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design-SlAOUT0anPcqhDPtGv2PYbES015YvX.mp4",
      category: "Product Demo",
    },
    {
      title: "48 Hours Plus",
      description: "Explore the natural ingredients and traditional preparation methods behind our herbal formula",
      videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%281%29-5fatfWNAPzydjmXgtY0ShNguH9qge6.mp4",
      category: "Ingredients",
    },
  ]

  useEffect(() => {
    // Auto-play all videos when component mounts
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true
        video.autoplay = true
        video.loop = true
        video.play().catch(console.error)
      }
    })
  }, [])

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-purple-600 text-white text-lg px-4 py-2 mb-4">
            <Play className="w-4 h-4 mr-2" />
            Video Gallery
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            See Our Product In <span className="text-yellow-400">Action</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch exclusive videos showcasing our premium herbal honey and the natural ingredients that make it special
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {videos.map((video, index) => (
            <Card
              key={index}
              className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative">
                  {/* Video Element */}
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="w-full h-64 object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Info Overlay */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600 text-white text-sm px-3 py-1">{video.category}</Badge>
                  </div>

                  {/* Auto-playing indicator */}
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-green-600 text-white text-xs px-2 py-1 animate-pulse">● LIVE</Badge>
                  </div>
                </div>

                {/* Video Information */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{video.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{video.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm font-medium">Auto-Playing</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-105"
            onClick={() => {
              window.open(
                "https://wa.me/923194405935?text=I watched your product videos and want to order 48hoursplus Herbal Honey",
                "_blank",
              )
            }}
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Order After Watching Videos
          </Button>
        </div>
      </div>
    </section>
  )
}
