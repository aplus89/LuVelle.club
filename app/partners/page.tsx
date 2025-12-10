import { Header } from "@/components/sections/header"
import { PartnersHero } from "@/components/partners/partners-hero"
import { PartnersBenefits } from "@/components/partners/partners-benefits"
import { PartnersProcess } from "@/components/partners/partners-process"
import { PartnersForm } from "@/components/partners/partners-form"
import { Footer } from "@/components/sections/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PartnersPage() {
  return (
    <main className="relative">
      <Header />
      <PartnersHero />
      <PartnersBenefits />
      <PartnersProcess />
      <PartnersForm />

      {/* Link to Providers */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-brand-cream/70">¿Sos profesional de servicios? Aplicá aquí →</p>
            <div className="flex gap-4">
              <Button
                asChild
                variant="outline"
                className="border-brand-gold text-brand-gold hover:bg-brand-gold/10 bg-transparent"
              >
                <Link href="/providers">Ir a Proveedoras</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-brand-gold text-brand-gold hover:bg-brand-gold/10 bg-transparent"
              >
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
