import { BrandApplicationForm } from "@/components/forms/brand-application-form"
import { GlassCard } from "@/components/ui/glass-card"
import { Target, BarChart, MessageSquare, Zap, Globe, TrendingUp } from "lucide-react"

const benefits = [
  {
    icon: Target,
    title: "Audiencia calificada",
    description: "Llegá a mujeres apasionadas por la belleza premium",
  },
  {
    icon: BarChart,
    title: "Distribución garantizada",
    description: "Exposición mensual a cientos de clientas potenciales",
  },
  {
    icon: MessageSquare,
    title: "Feedback directo",
    description: "Conocé la opinión real de tus usuarias",
  },
  {
    icon: Zap,
    title: "Lanzamientos rápidos",
    description: "Probá nuevos productos con nuestra comunidad",
  },
  {
    icon: Globe,
    title: "Alcance nacional",
    description: "Presencia en todo Costa Rica",
  },
  {
    icon: TrendingUp,
    title: "Crecimiento medible",
    description: "Métricas y reportes de desempeño",
  },
]

export default function PartnersPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="heading-font text-4xl md:text-6xl font-bold mb-6">Conectá tu marca con nuestra comunidad</h1>
          <p className="text-xl text-[hsl(var(--brand-cream))]/80 leading-relaxed">
            Distribuí tus productos de belleza con una audiencia premium y comprometida en Costa Rica.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <GlassCard key={index} className="p-6">
                <Icon className="w-10 h-10 text-[hsl(var(--brand-gold))] mb-4" />
                <h3 className="text-lg font-bold text-[hsl(var(--brand-cream))] mb-2">{benefit.title}</h3>
                <p className="text-sm text-[hsl(var(--brand-cream))]/70 leading-relaxed">{benefit.description}</p>
              </GlassCard>
            )
          })}
        </div>

        {/* Stats */}
        <div className="mb-16">
          <GlassCard className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[hsl(var(--brand-gold))] mb-2">500+</div>
                <div className="text-[hsl(var(--brand-cream))]/70">Socias activas</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[hsl(var(--brand-gold))] mb-2">95%</div>
                <div className="text-[hsl(var(--brand-cream))]/70">Tasa de satisfacción</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[hsl(var(--brand-gold))] mb-2">12+</div>
                <div className="text-[hsl(var(--brand-cream))]/70">Marcas aliadas</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* How It Works */}
        <div className="mb-16 max-w-4xl mx-auto">
          <h2 className="heading-font text-3xl md:text-4xl font-bold text-center mb-12">Proceso de alianza</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Postulación", desc: "Enviá tu información y catálogo" },
              { step: "2", title: "Evaluación", desc: "Revisamos tu marca y productos" },
              { step: "3", title: "Negociación", desc: "Definimos términos y volúmenes" },
              { step: "4", title: "Lanzamiento", desc: "Comenzamos la distribución" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--brand-gold))]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[hsl(var(--brand-gold))]">{item.step}</span>
                </div>
                <h3 className="font-semibold text-[hsl(var(--brand-cream))] mb-2">{item.title}</h3>
                <p className="text-sm text-[hsl(var(--brand-cream))]/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="heading-font text-3xl md:text-4xl font-bold mb-4">Postulá tu marca</h2>
            <p className="text-[hsl(var(--brand-cream))]/70">
              Completá el formulario y nos pondremos en contacto pronto
            </p>
          </div>
          <BrandApplicationForm />
        </div>
      </div>
    </main>
  )
}
