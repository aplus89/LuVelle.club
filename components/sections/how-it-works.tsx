import { GlassCard } from "@/components/ui/glass-card"
import { UserCircle, Sparkles, Package } from "lucide-react"

const steps = [
  {
    icon: UserCircle,
    title: "1. Personalizá tu perfil",
    description: "Contanos sobre tu tipo de piel, preferencias y necesidades de belleza.",
  },
  {
    icon: Sparkles,
    title: "2. Curamos tu caja",
    description: "Nuestro equipo selecciona los mejores productos especialmente para vos.",
  },
  {
    icon: Package,
    title: "3. Recibí y disfrutá",
    description: "Tu caja llega cada mes con productos premium y sorpresas exclusivas.",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-font text-4xl md:text-5xl font-bold mb-4">Cómo funciona</h2>
          <p className="text-xl text-[hsl(var(--brand-cream))]/80 max-w-2xl mx-auto">
            Tres simples pasos para transformar tu rutina de belleza
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Connection Lines (desktop only) */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--brand-gold))]/30 to-transparent" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <GlassCard key={index} className="p-8 text-center relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[hsl(var(--brand-gold))]/20 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[hsl(var(--brand-gold))]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--brand-cream))] mb-3">{step.title}</h3>
                <p className="text-[hsl(var(--brand-cream))]/70 leading-relaxed">{step.description}</p>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
