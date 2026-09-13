import type { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { HomeStrategyV1 } from "@/components/home/home-strategy-v1"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "LuVelle | Perfiles y herramientas para profesionales de belleza",
  description: "LuVelle construye perfiles, comunidad y herramientas para profesionales de belleza y bienestar, validando AI, marcas, Club VIP y Beauty Box con datos reales.",
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFF7F3]">
      <Header />
      <HomeStrategyV1 />
      <Footer />
    </main>
  )
}
