"use client"

import type React from "react"

import { useRef } from "react"
import { useScrollProgress } from "@/hooks/use-scroll-progress"
import { Sparkles, Heart, Star, Gift } from "lucide-react"

interface ScrollOpeningBoxProps {
  label?: string
  items?: Array<{ id: string; icon: React.ReactNode; name: string }>
  delay?: number
  size?: "small" | "large"
}

const defaultItems = [
  { id: "1", icon: <Sparkles className="w-6 h-6" />, name: "Skincare" },
  { id: "2", icon: <Heart className="w-6 h-6" />, name: "Wellness" },
  { id: "3", icon: <Star className="w-6 h-6" />, name: "Premium" },
  { id: "4", icon: <Gift className="w-6 h-6" />, name: "Surprise" },
]

export function ScrollOpeningBox({ label, items = defaultItems, delay = 0, size = "large" }: ScrollOpeningBoxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rawProgress = useScrollProgress(ref)

  // Apply delay and easing
  const progress = Math.max(0, Math.min(1, (rawProgress - delay) * 1.3))
  const smoothProgress = Math.pow(progress, 0.8)

  // Lid movement: translates up and rotates
  const lidTranslateY = -80 * smoothProgress
  const lidRotateX = -15 * smoothProgress

  const boxSize = size === "large" ? "h-[320px] w-[280px]" : "h-[200px] w-[180px]"
  const svgScale = size === "large" ? 1 : 0.6

  return (
    <div className="flex flex-col items-center gap-4">
      {label && <h3 className="text-xl font-serif text-[#f4cc6e]">{label}</h3>}

      <div ref={ref} className={`relative ${boxSize} mx-auto`}>
        {/* Base SVG */}
        <div className="absolute inset-0 flex items-end justify-center">
          <svg viewBox="0 0 705 591" className="w-full h-auto" style={{ transform: `scale(${svgScale})` }}>
            <image href="/images/caja-20the-20beauty-20box.svg" width="705" height="591" />
          </svg>
        </div>

        {/* Lid SVG with transform */}
        <div
          className="absolute inset-0 flex items-start justify-center origin-bottom transition-transform duration-300"
          style={{
            transform: `translateY(${lidTranslateY}px) rotateX(${lidRotateX}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <svg viewBox="0 0 705 591" className="w-full h-auto" style={{ transform: `scale(${svgScale})` }}>
            <image href="/images/tapa-20the-20beauty-20box.svg" width="705" height="591" />
          </svg>
        </div>

        {/* Items floating out */}
        {items.map((item, index) => {
          const itemProgress = Math.max(0, smoothProgress * 1.2 - index * 0.15)
          return (
            <div
              key={item.id}
              className="absolute left-1/2 -translate-x-1/2 text-[#f4cc6e] drop-shadow-lg"
              style={{
                bottom: `${30 + itemProgress * 120}%`,
                opacity: itemProgress,
                transform: `translateX(-50%) scale(${0.5 + itemProgress * 0.5})`,
              }}
            >
              {item.icon}
            </div>
          )
        })}
      </div>
    </div>
  )
}
