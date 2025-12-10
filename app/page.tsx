import { Header } from "@/components/sections/header"
import { HomeHero } from "@/components/sections/home-hero"
import { ThreeProducts } from "@/components/sections/three-products"
import { PricingSummary } from "@/components/sections/pricing-summary"
import { Testimonials } from "@/components/sections/testimonials"
import { Footer } from "@/components/sections/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default async function HomePage() {
  return (
    <main className="relative">
      <Header />
      <HomeHero />
      <ThreeProducts />
      <PricingSummary />
      <Testimonials />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
