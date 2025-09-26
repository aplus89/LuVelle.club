"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Heart, Shield, Truck, Star, Crown, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { SubscriptionPlans } from "@/components/ui/subscription-plans"

export default function HomePage() {
  const features = [
    {
      icon: Sparkles,
      title: "Productos Premium",
      description: "Seleccionamos cuidadosamente productos de belleza de las mejores marcas internacionales y locales.",
    },
    {
      icon: Heart,
      title: "Personalización Total",
      description: "Cada caja se adapta a tus preferencias, tipo de piel y necesidades específicas de belleza.",
    },
    {
      icon: Shield,
      title: "Garantía de Calidad",
      description: "Todos nuestros productos pasan por rigurosos controles de calidad y autenticidad.",
    },
    {
      icon: Truck,
      title: "Envío Gratuito",
      description: "Recibe tu caja directamente en tu hogar sin costos adicionales en toda Costa Rica.",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Cuéntanos sobre ti",
      description: "Completa nuestro cuestionario personalizado sobre tus preferencias y necesidades de belleza.",
      icon: Star,
    },
    {
      number: "02",
      title: "Seleccionamos para ti",
      description: "Nuestro equipo de expertos cura productos perfectos basados en tu perfil único.",
      icon: Crown,
    },
    {
      number: "03",
      title: "Recibe tu caja",
      description: "Disfruta de tu caja personalizada con productos premium entregada en tu puerta.",
      icon: Package,
    },
  ]

  return (
    <div className="min-h-screen bg-dark text-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/luvelle-hero-new.png"
            alt="LuVelle Beauty"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/60 to-dark/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="font-dancing text-5xl md:text-7xl lg:text-8xl text-gold mb-6 leading-tight">
              Tu belleza,
              <br />
              <span className="text-cream">curada con amor</span>
            </h1>

            <p className="text-xl md:text-2xl text-cream/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              Descubre productos de belleza premium seleccionados especialmente para ti. Cada mes, una nueva experiencia
              de autocuidado llega a tu puerta.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-gold to-gold/80 text-dark hover:from-gold/90 hover:to-gold/70 font-semibold px-8 py-4 text-lg"
              >
                <Link href="/thebeautybox" className="flex items-center gap-2">
                  Crear mi caja personalizada
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-cream/30 text-cream hover:bg-cream/10 hover:border-gold/50 px-8 py-4 text-lg bg-transparent"
              >
                <Link href="#como-funciona">Cómo funciona</Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-cream/60 text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-gold" />
                <span>Más de 1,000 clientas satisfechas</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gold" />
                <span>Productos 100% auténticos</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-gold" />
                <span>Envío gratis en Costa Rica</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="por-que-luvelle" className="py-20 bg-dark/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-dancing text-4xl md:text-5xl text-gold mb-6">¿Por qué elegir LuVelle?</h2>
            <p className="text-lg text-cream/80 max-w-3xl mx-auto">
              Somos más que una caja de belleza. Somos tu compañera en el journey hacia tu mejor versión.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-cream/20 bg-dark/80 backdrop-blur-sm hover:border-gold/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/20 mb-4">
                      <feature.icon className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="font-playfair text-xl text-cream mb-3">{feature.title}</h3>
                    <p className="text-cream/70 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-dancing text-4xl md:text-5xl text-gold mb-6">Cómo funciona</h2>
            <p className="text-lg text-cream/80 max-w-3xl mx-auto">
              En solo 3 simples pasos, tendrás tu caja personalizada de productos premium en camino.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gold/50 to-transparent transform translate-x-1/2 z-0" />
                )}

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gold to-gold/80 text-dark font-bold text-xl mb-6">
                    {step.number}
                  </div>

                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/20 mb-4">
                    <step.icon className="h-6 w-6 text-gold" />
                  </div>

                  <h3 className="font-playfair text-xl text-cream mb-4">{step.title}</h3>
                  <p className="text-cream/70 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-gold to-gold/80 text-dark hover:from-gold/90 hover:to-gold/70 font-semibold px-8 py-4"
            >
              <Link href="/thebeautybox" className="flex items-center gap-2">
                Comenzar ahora
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Subscription Plans Section */}
      <section id="planes">
        <SubscriptionPlans />
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
