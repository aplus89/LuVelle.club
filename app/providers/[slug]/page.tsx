import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProviderProfileDemo } from "@/components/provider-profile/provider-profile-demo"
import { getDemoProvider, getDemoProviderSlugs } from "@/lib/providers/demo-providers"

type ProviderProfilePageProps = {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return getDemoProviderSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: ProviderProfilePageProps): Metadata {
  const provider = getDemoProvider(params.slug)

  if (!provider) {
    return {
      title: "Perfil no encontrado | LuVelle",
    }
  }

  return {
    title: `${provider.name} | LuVelle`,
    description: `${provider.specialties.join(" • ")} en ${provider.area}. Conocé servicios, portafolio y perfil profesional en LuVelle.`,
  }
}

export default function ProviderProfilePage({ params }: ProviderProfilePageProps) {
  const provider = getDemoProvider(params.slug)

  if (!provider) {
    notFound()
  }

  return <ProviderProfileDemo provider={provider} />
}
