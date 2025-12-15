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
