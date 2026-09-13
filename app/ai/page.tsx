import type { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { AiProviderExperiment } from "@/components/ai/ai-provider-experiment"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "LuVelle AI para profesionales | LuVelle",
  description: "Piloto de LuVelle AI para profesionales de belleza y bienestar: seguimiento, recuperación de oportunidades y operaciones simples.",
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
