"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import FloatingAnimals from "@/components/floating-animals"
import CustomVideoPlayer from "@/components/custom-video-player"
import VisitorCounter from "@/components/visitor-counter"

const galleryItems = [
  {
    type: "video",
    src: "naxxa.mp4",
    alt: "Gothic cat with roses",
    quote: "In the darkness, we find the light that guides us home.",
  },
  {
    type: "video",
    src: "naxxa1.mp4",
    quote: "The night is darkest just before the dawn.",
  },
  {
    type: "video",
    src: "naxxa2.mp4",
    alt: "Gothic bunny in moonlight",
    quote: "Embrace the shadows, for they are part of your story.",
  },
  {
    type: "video",
    src: "naxxa3.mp4",
    quote: "Beauty exists even in the darkest corners of our world.",
  },
  {
    type: "video",
    src: "naxxa4.mp4",
    alt: "Gothic owl on branch",
    quote: "The stars shine brightest against the darkest sky.",
  },
]

export default function Gallery() {
  const [loading, setLoading] = useState(true)
  const [isOwner, setIsOwner] = useState(false)
  const router = useRouter()
  const [currentAffirmation, setCurrentAffirmation] = useState("")

  const affirmations = [
    "You are a dark and beautiful soul",
    "Embrace your inner darkness",
    "Your gothic spirit is powerful",
    "The night welcomes you with open arms",
    "Your uniqueness is your strength",
    "The shadows dance with you, not against you",
    "Your path is illuminated by moonlight",
  ]

  useEffect(() => {
    // Check if user came through proper authentication
    const visitors = JSON.parse(localStorage.getItem("visitors") || "[]")
    const ownerStatus = localStorage.getItem("isOwner")

    if (visitors.length === 0 && !ownerStatus) {
      router.push("/")
      return
    }

    setIsOwner(ownerStatus === "true")

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  useEffect(() => {
    // Set initial affirmation
    setCurrentAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)])

    // Change affirmation every 6 seconds
    const affirmationInterval = setInterval(() => {
      setCurrentAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)])
    }, 6000)

    return () => clearInterval(affirmationInterval)
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <Loader2 className="h-16 w-16 animate-spin mb-4 text-purple-500" />
        <h1 className="text-3xl font-gothic">Loading Naxxa&apos;s Gallery...</h1>
        <div className="y2k-animal">
          <div className="y2k-animal-container">
            <div className="y2k-animal-emoji">🦇</div>
            <div className="y2k-glow"></div>
            <div className="y2k-sparkle"></div>
            <div className="y2k-ring"></div>
            <div className="y2k-ring"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white pb-20 relative">
      <FloatingAnimals />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8 flex-col sm:flex-row gap-4">
          <h1 className="text-4xl font-gothic text-purple-400">Naxxa&apos;s Gallery</h1>
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            {isOwner && <div className="text-purple-400 font-semibold">Owner Mode</div>}
            <VisitorCounter isOwner={isOwner} />
          </div>
        </div>

        <div className="mb-10 text-center">
          <div className="bg-black/50 py-6 rounded-lg">
            <h2 className="text-2xl font-y2k text-pink-400 mb-2">Daily Affirmation</h2>
            <p className="text-xl font-y2k text-purple-300">{currentAffirmation}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {galleryItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="bg-gray-900/80 rounded-lg overflow-hidden border border-purple-500">
                {item.type === "image" ? (
                  <div className="relative h-80 w-full">
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt={item.alt || "Gallery image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <CustomVideoPlayer src={item.src} />
                )}
              </div>
              <p className="italic text-gray-300 text-center font-gothic">&quot;{item.quote}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
