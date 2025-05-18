"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface Animal {
  id: number
  x: number
  y: number
  z: number
  size: number
  type: string
  pathType: number
  animationDuration: number
  animationDelay: number
  rotationDirection: number
}

export default function FloatingAnimals() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const isMobile = useMobile()

  useEffect(() => {
    // Create animals - only using gothic-themed animals
    const animalCount = isMobile ? 5 : 10
    const gothicAnimalTypes = ["🦇", "🐈‍⬛", "🦉", "🕷️", "🕸️", "🐺", "🌙", "🖤", "⚰️", "🔮"]

    const newAnimals: Animal[] = []
    for (let i = 0; i < animalCount; i++) {
      newAnimals.push({
        id: i,
        x: Math.random() * 80 + 10, // Keep away from edges
        y: Math.random() * 80 + 10, // Keep away from edges
        z: Math.floor(Math.random() * 3), // 0, 1, or 2 for z-index layering
        size: Math.random() * 20 + 20,
        type: gothicAnimalTypes[Math.floor(Math.random() * gothicAnimalTypes.length)],
        pathType: Math.floor(Math.random() * 5), // 5 different path types
        animationDuration: Math.random() * 8 + 12, // 12-20 seconds
        animationDelay: Math.random() * 5, // 0-5 seconds delay
        rotationDirection: Math.random() > 0.5 ? 1 : -1, // clockwise or counter-clockwise
      })
    }

    setAnimals(newAnimals)
  }, [isMobile])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {animals.map((animal) => (
        <div
          key={animal.id}
          className={`absolute floating-animal path-${animal.pathType}`}
          style={
            {
              left: `${animal.x}%`,
              top: `${animal.y}%`,
              fontSize: `${animal.size}px`,
              zIndex: animal.z,
              animationDuration: `${animal.animationDuration}s`,
              animationDelay: `${animal.animationDelay}s`,
              filter: "drop-shadow(0 0 5px rgba(128, 0, 128, 0.7))",
              textShadow: "0 0 10px rgba(255, 0, 255, 0.5)",
              "--rotation-direction": animal.rotationDirection,
            } as React.CSSProperties
          }
        >
          {animal.type}
        </div>
      ))}
    </div>
  )
}
