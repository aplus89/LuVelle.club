"use client"

export function HomeHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main message */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-brand-cream">Una sola plataforma.</span>
              <br />
              <span className="font-heading text-brand-gold">Tres formas</span>
              <br />
              <span className="text-brand-cream">de transformar tu bienestar.</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-cream/80 max-w-2xl mx-auto lg:mx-0">
              LuVelle combina inteligencia artificial, una beauty box personalizada y herramientas profesionales para
              proveedoras en una experiencia única de belleza y bienestar.
            </p>
          </div>

          {/* Right side - Quick overview cards will be in ThreeProducts section */}
          <div className="hidden lg:block">
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <img src="/luxury-beauty-wellness-spa-products.jpg" alt="LuVelle Beauty" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--brand-dark))] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
