import { Header } from "@/components/sections/header"
import { ProvidersHero } from "@/components/providers/providers-hero"
import { ProvidersBenefits } from "@/components/providers/providers-benefits"
import { ProvidersDashboardPreview } from "@/components/providers/providers-dashboard-preview"
import { ProvidersPlans } from "@/components/providers/providers-plans"
import { ProvidersOnboarding } from "@/components/providers/providers-onboarding"
import { ProvidersForm } from "@/components/providers/providers-form"
import { Footer } from "@/components/sections/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import Link from "next/link"
import { LuVelleButton } from "@/components/ui/luvelle-button"

export default function ProvidersPage() {
  return (
    <main className="relative">
      <Header />
      <ProvidersHero />

      {/* Provider profile demo */}
      <section className="border-y border-[#f4cc6e]/20 bg-[#141322] px-4 py-10">
        <div className="container mx-auto max-w-5xl">
          <div className="rounded-3xl border border-[#f4cc6e]/25 bg-gradient-to-r from-white/5 to-[#f4cc6e]/5 p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f4cc6e]">Nuevo demo de producto</p>
              <h2 className="mt-2 text-2xl font-bold text-[#efedea] md:text-3xl">Mirá cómo podría verse tu perfil profesional en LuVelle</h2>
              <p className="mt-3 text-sm leading-6 text-[#e8ded3]/70">
                Servicios, portafolio, reputación y privacidad en una experiencia pensada para ayudarte a convertir visitas en solicitudes reales.
              </p>
            </div>
            <Link
              href="/providers/mariana-lopez"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#f4cc6e] px-6 py-3 font-semibold text-[#141322] transition hover:bg-[#e5bd5f] md:mt-0 md:shrink-0"
            >
              Ver perfil demo
            </Link>
          </div>
        </div>
      </section>

      <ProvidersBenefits />
      <ProvidersDashboardPreview />
      <ProvidersPlans />
      <ProvidersOnboarding />
      <ProvidersForm />

      {/* Link to Partners */}
      <section className="py-12 px-4 border-t border-white/10 bg-[#141322]">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#e8ded3]/70">¿Vendés productos? Postulá tu marca →</p>
            <div className="flex gap-4">
              <LuVelleButton asChild variant="outline">
                <Link href="/partners">Ir a Marcas</Link>
              </LuVelleButton>
              <LuVelleButton asChild variant="outline">
                <Link href="/">Volver al inicio</Link>
              </LuVelleButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
