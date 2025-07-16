"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const getButtonVariantClasses = (variant?: string) => {
  switch (variant) {
    case "destructive":
      return "bg-destructive text-destructive-foreground hover:bg-destructive/90"
    case "outline":
      return "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
    case "secondary":
      return "bg-secondary text-secondary-foreground hover:bg-secondary/80"
    case "ghost":
      return "hover:bg-accent hover:text-accent-foreground"
    case "link":
      return "text-primary underline-offset-4 hover:underline"
    default:
      return "bg-primary text-primary-foreground hover:bg-primary/90"
  }
}

const getButtonSizeClasses = (size?: string) => {
  switch (size) {
    case "sm":
      return "h-9 rounded-md px-3"
    case "lg":
      return "h-11 rounded-md px-8"
    case "icon":
      return "h-10 w-10"
    default:
      return "h-10 px-4 py-2"
  }
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          getButtonVariantClasses(variant),
          getButtonSizeClasses(size),
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button }
export type { ButtonProps }
