"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, Heart, Gift, Users, ArrowRight, Star, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Paola Cambronero",
      location: "Costa Rica, Heredia",
      text: "Mi experiencia con Luvelle ha sido satisfactoria, encontré lo que necesitaba desde la comodidad de mi casa.",
      rating: 5,
    },
    {
      name: "Alison Duarte",
      location: "Costa Rica, Limón",
      text: "Contraté algunos servicios y la experiencia y trato personalizado fue excelente.",
      rating: 5,
    },
    {
      name: "Dania Berrios",
      location: "Costa Rica, San José",
      text: "Me encantó poder elegir y personalizar mi caja con las marcas de mi preferencia.",
      rating: 5,
    },
    {
      name: "Helen Rivera",
      location: "Costa Rica, Alajuela",
      text: "Hace un tiempo tuve una crisis en mi rostro porque elegía productos que creía ideales para mi piel, con Luvelle pude encontrar fácilmente asesoría personalizada con profesionales en la materia y en conjunto me brindaron una asesoría guiada con productos aptos para mi tipo de piel, por lo que la recomiendo 100%.",
      rating: 5,
    },
  ]

  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-gold" />,
      title: "Personalización Total",
      description: "Cada Beauty Box se adapta a tus gustos, necesidades y estilo de vida único.",
    },
    {
      icon: <Gift className="h-8 w-8 text-gold" />,
      title: "Productos Premium",
      description: "Marcas exclusivas y productos de alta calidad seleccionados especialmente para ti.",
    },
    {
      icon: <Heart className="h-8 w-8 text-gold" />,
      title: "Servicios Incluidos",
      description: "Acceso a tratamientos de belleza y bienestar en nuestros centros aliados.",
    },
    {
      icon: <Users className="h-8 w-8 text-gold" />,
      title: "Comunidad Exclusiva",
      description: "Únete a una comunidad de mujeres que comparten tu pasión por la belleza y el bienestar.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/95 to-blue/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-gold mb-6 leading-tight">
                Tu experiencia de belleza personalizada
              </h1>
              <p className="text-lg text-cream/90 mb-8 max-w-xl">
                Descubre <strong className="text-gold">The Beauty Box by LuVelle</strong>, una experiencia mensual única
                diseñada especialmente para mujeres en LATAM. Productos premium, servicios exclusivos y beneficios
                únicos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-transparent border border-gold text-gold hover:bg-gold/10 transition-all font-semibold text-lg px-8 py-4"
                >
                  <Link href="/thebeautybox">
                    Crear mi Beauty Box
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-cream/70">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-gold" />
                  <span>Envío gratis</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-gold" />
                  <span>Cancela cuando quieras</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-gold" />
                  <span>100% personalizado</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/images/luvelle-hero-new.png"
                  alt="LuVelle - The Beauty Box"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl hover-lift"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-blue/20 rounded-2xl blur-3xl animate-pulse-slow" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-dark to-dark/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-dancing text-4xl md:text-5xl text-gold mb-4">¿Por qué elegir LuVelle?</h2>
            <p className="text-lg text-cream/80 max-w-3xl mx-auto">
              Más que una suscripción, es una experiencia completa de belleza y bienestar diseñada para empoderar a la
              mujer latina moderna.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-gold bg-dark hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="font-semibold text-cream text-lg mb-2">{feature.title}</h3>
                  <p className="text-cream/70 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-b from-dark/90 to-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-dancing text-4xl md:text-5xl text-gold mb-4">¿Cómo funciona?</h2>
            <p className="text-lg text-cream/80 max-w-2xl mx-auto">
              En solo unos pasos, tendrás tu Beauty Box personalizada lista para disfrutar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Elegí tu plan",
                description: "Selecciona entre Esencial, Premium o Deluxe según tus necesidades y presupuesto.",
              },
              {
                step: "02",
                title: "Personalizá tu experiencia",
                description: "Elegí tus categorías favoritas y preferencias para que podamos crear tu box ideal.",
              },
              {
                step: "03",
                title: "Recibí y disfrutá",
                description:
                  "Cada mes recibirás tu Beauty Box con productos y servicios seleccionados especialmente para ti.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-dark border border-gold rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-gold">{item.step}</span>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gold to-transparent" />
                  )}
                </div>
                <h3 className="font-semibold text-cream text-xl mb-3">{item.title}</h3>
                <p className="text-cream/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-blue/5 to-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-dancing text-4xl md:text-5xl text-gold mb-4">Lo que dicen nuestras LuVellers</h2>
            <p className="text-lg text-cream/80 max-w-2xl mx-auto">
              Miles de mujeres ya transformaron su rutina de belleza con LuVelle.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-gold bg-dark">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-gold fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-cream/90 mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div>
                  <p className="font-semibold text-gold">{testimonials[currentTestimonial].name}</p>
                  <p className="text-cream/60 text-sm">{testimonials[currentTestimonial].location}</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-gold" : "bg-cream/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-dancing text-4xl md:text-5xl text-gold mb-6">¿Lista para transformar tu rutina?</h2>
          <p className="text-lg text-cream/80 mb-8 max-w-2xl mx-auto">
            Únete a miles de mujeres que ya descubrieron el poder de una experiencia de belleza completamente
            personalizada.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-transparent border border-gold text-gold hover:bg-gold/10 transition-all font-semibold text-lg px-8 py-4"
            >
              <Link href="/thebeautybox">
                Comenzar ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <p className="text-sm text-cream/60 mt-6">
            Sin compromisos • Cancela cuando quieras • Envío gratis a toda LATAM
          </p>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gradient-to-b from-dark to-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-dancing text-4xl md:text-5xl text-gold mb-4">Partners</h2>
            <p className="text-lg text-cream/80 max-w-3xl mx-auto">
              ¿Tienes una marca o servicio de belleza y bienestar? Únete a nuestra red de partners y llega a miles de
              mujeres en LATAM.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-gold bg-dark">
              <CardContent className="p-8 text-center">
                <p className="text-cream/90 mb-6">
                  En LuVelle valoramos la calidad y exclusividad. Si tu marca o servicio comparte nuestros valores,
                  queremos conocerte.
                </p>
                <Button
                  asChild
                  className="bg-transparent border border-gold text-gold hover:bg-gold/10 transition-all font-semibold"
                >
                  <Link href="/partners">Convertirme en Partner</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
