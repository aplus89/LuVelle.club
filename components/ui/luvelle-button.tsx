import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ButtonProps } from "@/components/ui/button"

type LuVelleButtonVariant = "gold" | "outline"

interface LuVelleButtonProps extends Omit<ButtonProps, "variant"> {
  variant: LuVelleButtonVariant
  children: React.ReactNode
}

/**
 * Unified button component with strict color rules:
 * - gold (primary CTA): bg #f4cc6e + text #141322 with soft golden glow on hover
 * - outline (secondary): border #f4cc6e + text #f4cc6e, hover fills with gold bg
 */
export function LuVelleButton({ variant, className, children, ...props }: LuVelleButtonProps) {
  const variantClasses = {
    gold: "bg-[#f4cc6e] text-[#141322] hover:bg-[#f6d986] hover:shadow-lg hover:shadow-yellow-500/20 font-semibold transition-all duration-300",
    outline:
      "bg-transparent border-2 border-[#f4cc6e] text-[#f4cc6e] hover:bg-[#f4cc6e] hover:text-[#141322] font-semibold transition-colors duration-300",
  }

  return (
    <Button className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Button>
  )
}
