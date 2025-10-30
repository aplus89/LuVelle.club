import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  highlight?: boolean
}

export function GlassCard({ children, className, highlight = false }: GlassCardProps) {
  return <div className={cn(highlight ? "glass-card-highlight" : "glass-card", className)}>{children}</div>
}
