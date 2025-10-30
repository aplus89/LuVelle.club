import { Users, Award, MapPin } from "lucide-react"

export function SocialProof() {
  return (
    <section className="py-12 border-y border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Counter */}
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-[hsl(var(--brand-gold))]" />
            <div>
              <div className="text-2xl font-bold text-[hsl(var(--brand-cream))]">500+</div>
              <div className="text-sm text-[hsl(var(--brand-cream))]/70">Socias activas</div>
            </div>
          </div>

          {/* Quality Badge */}
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-[hsl(var(--brand-gold))]" />
            <div>
              <div className="text-lg font-semibold text-[hsl(var(--brand-cream))]">Calidad verificada</div>
              <div className="text-sm text-[hsl(var(--brand-cream))]/70">Productos premium</div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3">
            <MapPin className="w-8 h-8 text-[hsl(var(--brand-gold))]" />
            <div>
              <div className="text-lg font-semibold text-[hsl(var(--brand-cream))]">Hecho en Costa Rica</div>
              <div className="text-sm text-[hsl(var(--brand-cream))]/70">Con amor local</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
