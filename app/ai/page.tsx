import { Header } from "@/components/sections/header"
import { AiHero } from "@/components/ai/ai-hero"
import { AiFeatures } from "@/components/ai/ai-features"
import { AiDashboardPreview } from "@/components/ai/ai-dashboard-preview"
import { AiPricing } from "@/components/ai/ai-pricing"
import { AiFinalCTA } from "@/components/ai/ai-final-cta"
import { Footer } from "@/components/sections/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function AiPage() {
  return (
    <main className="relative">
      <Header />
      <AiHero />
      <AiDashboardPreview />
      <AiFeatures />
      <AiPricing />
      <AiFinalCTA />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
