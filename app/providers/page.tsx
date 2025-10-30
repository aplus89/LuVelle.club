import { ProviderApplicationForm } from "@/components/forms/provider-application-form"
import { GlassCard } from "@/components/ui/glass-card"
import { Users, TrendingUp, Calendar, DollarSign, Award, Heart } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Clientas garantizadas",
    description: "Acceso directo a nuestra comunidad de 500+ socias activas",
  },
  {
    icon: Calendar,
    title: "Gestión simplificada",
    description: "Sistema automatizado de reservas y pagos",
  },
  {
    icon: TrendingUp,
    title: "Crecimiento constante",
    description: "Marketing y promoción incluidos",
  },
  {
    icon: DollarSign,
    title: "Ingresos predecibles",
    description: "Flujo constante de reservas mensuales",
  },
  {
    icon: Award,
    title: "Reconocimiento",
    description: "Destacá tu trabajo en nuestra plataforma",
  },
  {
    icon: Heart,
    title: "Comunidad",
    description: "Red de apoyo con otras proveedoras",
  },
]

export default function ProvidersPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="heading-font text-4xl md:text-6xl font-bold mb-6">Crecé tu negocio con LuVelle</h1>
          <p className="text-xl text-[hsl(var(--brand-cream))]/80 leading-relaxed">
            Uníte a nuestra red de proveedoras de belleza y llevá tus servicios a cientos de mujeres en Costa Rica.
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

        {/* How It Works */}
        <div className="mb-16 max-w-4xl mx-auto">
          <h2 className="heading-font text-3xl md:text-4xl font-bold text-center mb-12">Cómo funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[hsl(var(--brand-gold))]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[hsl(var(--brand-gold))]">1</span>
              </div>
              <h3 className="font-semibold text-[hsl(var(--brand-cream))] mb-2">Aplicá</h3>
              <p className="text-sm text-[hsl(var(--brand-cream))]/70">
                Completá el formulario con tu información y experiencia
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[hsl(var(--brand-gold))]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[hsl(var(--brand-gold))]">2</span>
              </div>
              <h3 className="font-semibold text-[hsl(var(--brand-cream))] mb-2">Entrevista</h3>
              <p className="text-sm text-[hsl(var(--brand-cream))]/70">Conversamos sobre tu negocio y expectativas</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[hsl(var(--brand-gold))]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[hsl(var(--brand-gold))]">3</span>
              </div>
              <h3 className="font-semibold text-[hsl(var(--brand-cream))] mb-2">Comenzá</h3>
              <p className="text-sm text-[hsl(var(--brand-cream))]/70">
                Configurá tu perfil y empezá a recibir reservas
              </p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="heading-font text-3xl md:text-4xl font-bold mb-4">Aplicá ahora</h2>
            <p className="text-[hsl(var(--brand-cream))]/70">
              Completá el formulario y nos pondremos en contacto pronto
            </p>
          </div>
          <ProviderApplicationForm />
        </div>
      </div>
    </main>
  )
}
