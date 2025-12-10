import { Header } from "@/components/sections/header"
import { BeautyBoxHero } from "@/components/beauty-box/beauty-box-hero"
import { BeautyBoxFeatures } from "@/components/beauty-box/beauty-box-features"
import { BeautyBoxPlans } from "@/components/beauty-box/beauty-box-plans"
import { BeautyBoxCTA } from "@/components/beauty-box/beauty-box-cta"
import { Footer } from "@/components/sections/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function BeautyBoxPage() {
  return (
    <main className="relative">
      <Header />
      <BeautyBoxHero />
      <BeautyBoxFeatures />
      <BeautyBoxPlans />
      <BeautyBoxCTA />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
