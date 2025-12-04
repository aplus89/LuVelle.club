import { ProviderApplicationForm } from "@/components/forms/provider-application-form"
import { GlassCard } from "@/components/ui/glass-card"
import { BackButton } from "@/components/ui/back-button"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Calendar, DollarSign, Award, Heart } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const benefits = [
  {
    icon: Users,
    title: "Clientas garantizadas",
    description: "Acceso directo a nuestra comunidad de socias activas",
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

const onboardingSteps = [
  {
    number: 1,
    title: "Postulación",
    description: "Completá el formulario con tu información y experiencia",
  },
  {
    number: 2,
    title: "Entrevista y validación",
    description: "Conversamos sobre tu negocio y validamos tus credenciales",
  },
  {
    number: 3,
    title: "Activación de perfil y agenda",
    description: "Configuramos tu perfil y sistema de reservas",
  },
  {
    number: 4,
    title: "Primeras reservas",
    description: "Comenzás a recibir tus primeras clientas",
  },
]

export default function ProvidersPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Proveedoras" }]} />
        <BackButton />

        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="heading-font text-4xl md:text-6xl font-bold mb-4">Crecé tu negocio con LuVelle</h1>
          <p className="text-2xl text-[hsl(var(--brand-gold))] font-semibold mb-4">
            Profesionales de belleza y bienestar
          </p>
          <p className="text-xl text-[hsl(var(--brand-cream))]/80 leading-relaxed">
            Uníte a nuestra red de proveedoras y llevá tus servicios a miles de mujeres en Costa Rica.
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

        <div className="text-center mb-16">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="glass-button" size="lg">
                Conocer proceso de onboarding
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[hsl(var(--brand-dark))] border-[hsl(var(--brand-gold))]/30 text-[hsl(var(--brand-cream))]">
              <DialogHeader>
                <DialogTitle className="heading-font text-2xl text-[hsl(var(--brand-gold))]">
                  Proceso de Onboarding
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                {onboardingSteps.map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--brand-gold))]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-[hsl(var(--brand-gold))]">{step.number}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[hsl(var(--brand-cream))] mb-1">{step.title}</h4>
                      <p className="text-sm text-[hsl(var(--brand-cream))]/70">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="heading-font text-3xl md:text-4xl font-bold mb-4">Aplicá ahora</h2>
            <p className="text-[hsl(var(--brand-cream))]/70">
              Completá el formulario y nos pondremos en contacto en 24-48 horas
            </p>
          </div>
          <ProviderApplicationForm />
        </div>

        <div className="mt-12 text-center">
          <BackButton />
        </div>
      </div>
    </main>
  )
}
