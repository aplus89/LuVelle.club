import { Header } from "@/components/sections/header"
import { ProvidersHero } from "@/components/providers/providers-hero"
import { ProvidersBenefits } from "@/components/providers/providers-benefits"
import { ProvidersPlans } from "@/components/providers/providers-plans"
import { ProvidersOnboarding } from "@/components/providers/providers-onboarding"
import { ProvidersForm } from "@/components/providers/providers-form"
import { Footer } from "@/components/sections/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProvidersPage() {
  return (
    <main className="relative">
      <Header />
      <ProvidersHero />
      <ProvidersBenefits />
      <ProvidersPlans />
      <ProvidersOnboarding />
      <ProvidersForm />

      {/* Link to Partners */}
      <section className="py-12 px-4 border-t border-white/10 bg-[#141322]">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#e8ded3]/70">¿Vendés productos? Postulá tu marca →</p>
            <div className="flex gap-4">
              <Button asChild className="bg-[#141322] hover:bg-[#141322]/80 text-[#f4cc6e] border-2 border-[#f4cc6e]">
                <Link href="/partners">Ir a Marcas</Link>
              </Button>
              <Button asChild className="bg-[#141322] hover:bg-[#141322]/80 text-[#f4cc6e] border-2 border-[#f4cc6e]">
                <Link href="/">Volver al inicio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
