import { ProviderApplicationForm } from "@/components/forms/provider-application-form"

export function ProvidersForm() {
  return (
    <section id="aplicacion" className="scroll-mt-24 bg-[#FFF7F3] px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-[#5B2A86]/10 px-4 py-2 text-sm font-semibold text-[#5B2A86]">
            Piloto para profesionales fundadoras
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#241335] md:text-5xl">Creemos tu perfil LuVelle</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6D5577] md:text-lg">
            Contanos cómo trabajás hoy, qué servicios ofrecés y qué resultado necesitás primero. Esta información nos ayuda a preparar tu perfil y a decidir qué funcionalidades construir después.
          </p>
        </div>
        <ProviderApplicationForm />
      </div>
    </section>
  )
}
