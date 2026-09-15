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

const textColor: Record<LogoVariant, string> = {
  white: "text-white",
  gold: "text-[#F2C572]",
  "dark-blue": "text-[#241335]",
  navy: "text-[#241335]",
}

export function LuVelleLogo({ variant = "dark-blue", className, width = 120, height = 48 }: LuVelleLogoProps) {
  const iconSize = Math.max(30, Math.min(40, height - 6))

  return (
    <span
      className={cn("inline-flex items-center gap-2", textColor[variant], className)}
      style={{ minWidth: width }}
    >
      <Image
        src="/images/luvelle-logo.png"
        alt=""
        aria-hidden="true"
        width={iconSize}
        height={iconSize}
        className="shrink-0 object-contain"
        priority
      />
      <span className="text-xl font-bold tracking-tight sm:text-2xl">LuVelle</span>
    </span>
  )
}

export function getLogoVariant(bgColor: "dark" | "light" | "gold" | "blue"): LogoVariant {
  switch (bgColor) {
    case "dark":
      return "white"
    case "light":
      return "dark-blue"
    case "gold":
      return "dark-blue"
    case "blue":
      return "gold"
    default:
      return "dark-blue"
  }
}
