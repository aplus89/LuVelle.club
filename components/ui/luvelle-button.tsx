import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ButtonProps } from "@/components/ui/button"

type LuVelleButtonVariant = "ai" | "pro" | "box" | "ai-outline" | "pro-outline" | "box-outline"

interface LuVelleButtonProps extends Omit<ButtonProps, "variant"> {
  variant: LuVelleButtonVariant
  children: React.ReactNode
}

/**
 * Reusable button component with strict LuVelle color rules:
 * - AI: Blue bg (#1A5276) + gold text (#f4cc6e)
 * - Pro: Gold bg (#f4cc6e) + dark text (#141322)
 * - Box: Dark bg (#141322) + cream text (#e8ded3)
 */
export function LuVelleButton({ variant, className, children, ...props }: LuVelleButtonProps) {
  const variantClasses = {
    ai: "bg-[#1A5276] hover:bg-[#1A5276]/90 text-[#f4cc6e] font-semibold",
    pro: "bg-[#f4cc6e] hover:bg-[#f4cc6e]/90 text-[#141322] font-semibold",
    box: "bg-[#141322] hover:bg-[#141322]/90 text-[#e8ded3] font-semibold border border-white/10",
    "ai-outline": "bg-transparent border-2 border-[#1A5276] text-[#1A5276] hover:bg-[#1A5276]/10 font-semibold",
    "pro-outline": "bg-transparent border-2 border-[#f4cc6e] text-[#f4cc6e] hover:bg-[#f4cc6e]/10 font-semibold",
    "box-outline": "bg-transparent border-2 border-[#e8ded3] text-[#e8ded3] hover:bg-[#e8ded3]/10 font-semibold",
  }

  return (
    <Button className={cn(variantClasses[variant], "transition-all duration-300", className)} {...props}>
      {children}
    </Button>
  )
}
