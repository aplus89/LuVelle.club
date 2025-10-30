import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { SocialProof } from "@/components/sections/social-proof"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Plans } from "@/components/sections/plans"
import { ProvidersBlock } from "@/components/sections/providers-block"
import { BrandsBlock } from "@/components/sections/brands-block"
import { Testimonials } from "@/components/sections/testimonials"
import { FAQ } from "@/components/sections/faq"
import { FinalCTA } from "@/components/sections/final-cta"
import { Footer } from "@/components/sections/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { getPlans } from "@/lib/supabase/queries"

export default async function HomePage() {
  const plans = await getPlans()

  return (
    <main className="relative">
      <Header />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Plans plans={plans} />
      <ProvidersBlock />
      <BrandsBlock />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
