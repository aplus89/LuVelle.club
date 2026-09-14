import type { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { AiProviderExperiment } from "@/components/ai/ai-provider-experiment"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "LuVelle AI para profesionales",
  description: "Conocé LuVelle AI Beta: seguimiento, recuperación de oportunidades y apoyo para el día a día de profesionales de belleza y bienestar.",
  openGraph: {
    title: "LuVelle AI | Menos conversaciones perdidas, más tiempo para tu negocio",
    description: "Seguimiento, recuperación de oportunidades y apoyo para profesionales de belleza y bienestar.",
    url: "https://www.luvelle.club/ai",
  },
}

export default function AiPage() {
  return (
    <main className="min-h-screen bg-[#FFF7F3]">
      <Header />
      <AiProviderExperiment />
      <Footer />
    </main>
  )
}
