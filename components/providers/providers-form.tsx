import { ProviderApplicationForm } from "@/components/forms/provider-application-form"

export function ProvidersForm() {
  return (
    <section id="aplicacion" className="py-12 md:py-16 px-4 scroll-mt-20">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl text-brand-gold mb-4">Aplicá ahora</h2>
          <p className="text-lg text-brand-cream/70">
            Completá el formulario y nos pondremos en contacto en 24-48 horas
          </p>
        </div>
        <ProviderApplicationForm />
      </div>
    </section>
  )
}
