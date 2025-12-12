"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

type LogoVariant = "white" | "gold" | "dark-blue" | "navy"

interface LuVelleLogoProps {
  variant?: LogoVariant
  className?: string
  width?: number
  height?: number
}

const logoSources: Record<LogoVariant, string> = {
  white: "/images/luvelle-logo-blanco.svg",
  gold: "/images/luvelle-logo-gold.svg",
  "dark-blue": "/images/luvelle-logo-dark-blue.svg",
  navy: "/images/luvelle-logo-azul-navy.svg",
}

export function LuVelleLogo({ variant = "gold", className, width = 120, height = 48 }: LuVelleLogoProps) {
  return (
    <Image
      src={logoSources[variant] || "/placeholder.svg"}
      alt="LuVelle"
      width={width}
      height={height}
      className={cn("object-contain", className)}
      priority
    />
  )
}

// Helper to determine logo variant based on background
export function getLogoVariant(bgColor: "dark" | "light" | "gold" | "blue"): LogoVariant {
  switch (bgColor) {
    case "dark":
      return "white" // Light logo on dark background
    case "light":
      return "dark-blue" // Dark logo on light background
    case "gold":
      return "dark-blue" // Dark logo on gold background
    case "blue":
      return "gold" // Gold logo on blue background
    default:
      return "gold"
  }
}
