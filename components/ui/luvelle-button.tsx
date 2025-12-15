import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ButtonProps } from "@/components/ui/button"

type LuVelleButtonVariant = "gold" | "outline" | "ghost"

interface LuVelleButtonProps extends Omit<ButtonProps, "variant"> {
  variant: LuVelleButtonVariant
  children: React.ReactNode
}

/**
 * Unified button component with strict color rules:
 * - gold (ButtonPrimary): bg #F6CE6F + text #141322 with soft golden glow on hover
 * - outline (ButtonSecondary): border #F6CE6F + text #F6CE6F, hover fills with gold bg
 * - ghost (ButtonGhostDark): bg #141322 + text #EFEDEA, use only on light backgrounds
 */
export function LuVelleButton({ variant, className, children, ...props }: LuVelleButtonProps) {
  const variantClasses = {
    gold: "bg-brand-gold text-brand-navy hover:bg-[#e5bd5f] hover:shadow-lg hover:shadow-yellow-500/20 font-semibold rounded-full px-6 py-3 transition-all duration-300",
    outline:
      "bg-transparent border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-navy font-semibold rounded-full px-6 py-3 transition-colors duration-300",
    ghost:
      "bg-brand-navy text-brand-cream hover:bg-[#1a1a2e] hover:border-brand-gold/30 font-semibold rounded-full px-6 py-3 border border-white/10 transition-all duration-300",
  }

  return (
    <Button className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Button>
  )
}
