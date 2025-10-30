"use client"

import { usePersona } from "@/components/persona-provider"
import type { Persona } from "@/lib/supabase/types"
import { cn } from "@/lib/utils"

const personas: { value: Persona; label: string }[] = [
  { value: "user", label: "Soy Mujer" },
  { value: "provider", label: "Soy Proveedora" },
  { value: "brand", label: "Soy Marca" },
]

export function PersonaSwitch() {
  const { persona, setPersona } = usePersona()

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {personas.map((p) => (
        <button
          key={p.value}
          onClick={() => setPersona(p.value)}
          className={cn(
            "px-6 py-2.5 rounded-full font-medium transition-all duration-300",
            "border backdrop-blur-sm",
            persona === p.value
              ? "bg-[hsl(var(--brand-gold))] text-[hsl(var(--brand-dark))] border-[hsl(var(--brand-gold))] shadow-lg scale-105"
              : "bg-white/5 text-[hsl(var(--brand-cream))] border-white/20 hover:bg-white/10 hover:border-white/30",
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}
