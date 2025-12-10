import { BrandApplicationForm } from "@/components/forms/brand-application-form"

export function PartnersForm() {
  return (
    <section id="postular" className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl text-brand-gold mb-4">Postulá tu marca</h2>
          <p className="text-lg text-brand-cream/70">
            Completá el formulario y nos pondremos en contacto en 24-48 horas
          </p>
        </div>
        <BrandApplicationForm />
      </div>
    </section>
  )
}
