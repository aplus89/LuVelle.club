"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { MessageCircle, Sparkles, Heart, Search, Gift, Calendar, User, ChevronDown, Check, Instagram } from "lucide-react"
import { trackWhatsAppClick } from "@/lib/gtm-events"

const WHATSAPP_URL = "https://wa.me/50688888000?text=Hola%20LuVelle%2C%20quiero%20probar%20el%20asistente%20de%20belleza"

// Reusable CTA Button
function CTAButton({ 
  variant = "primary", 
  children, 
  href,
  onClick,
  className = "" 
}: { 
  variant?: "primary" | "secondary"
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
}) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 text-sm md:text-base"
  const variants = {
    primary: "bg-[#E6C27A] text-[#2A2233] hover:bg-[#d4b06a] hover:scale-105 shadow-lg shadow-[#E6C27A]/20",
    secondary: "bg-white text-[#2A2233] border-2 border-[#E6C27A]/30 hover:border-[#E6C27A] hover:bg-[#FFF8F6]"
  }
  
  const handleClick = () => {
    if (href?.includes("wa.me")) {
      trackWhatsAppClick("cta_button")
    }
    onClick?.()
  }

  if (href) {
    return (
      <Link href={href} onClick={handleClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    )
  }
  
  return (
    <button onClick={handleClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

// Sticky Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-[#2A2233]">
          LuVelle
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#como-funciona" className="text-sm text-[#7D657D] hover:text-[#2A2233] transition-colors">
            Cómo funciona
          </a>
          <a href="#casos-de-uso" className="text-sm text-[#7D657D] hover:text-[#2A2233] transition-colors">
            Casos de uso
          </a>
          <a href="#planes" className="text-sm text-[#7D657D] hover:text-[#2A2233] transition-colors">
            Planes
          </a>
          <a href="#faq" className="text-sm text-[#7D657D] hover:text-[#2A2233] transition-colors">
            FAQ
          </a>
        </div>

        <CTAButton href={WHATSAPP_URL} variant="primary" className="hidden md:inline-flex">
          <MessageCircle className="w-4 h-4" />
          Empezar por WhatsApp
        </CTAButton>
      </div>
    </nav>
  )
}

// Phone Mockup with Chat
function PhoneMockup() {
  const messages = [
    { from: "user", text: "Hola! Quiero una rutina simple para piel mixta" },
    { from: "ai", text: "¡Hola! Con gusto te ayudo. ¿Tu piel tiende a ser más grasa en la zona T o en general?" },
    { from: "user", text: "Más en la zona T, y tengo poros visibles" },
    { from: "ai", text: "Perfecto. Te recomiendo una rutina de 3 pasos: limpiador en gel, sérum de niacinamida, y una hidratante ligera. ¿Querés que te sugiera productos específicos según tu presupuesto?" },
  ]

  return (
    <div className="relative w-full max-w-[280px] md:max-w-[320px] mx-auto">
      {/* Phone frame */}
      <div className="relative bg-[#2A2233] rounded-[2.5rem] p-2 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#2A2233] rounded-b-2xl z-10" />
        
        {/* Screen */}
        <div className="bg-[#F4E3E6] rounded-[2rem] overflow-hidden">
          {/* WhatsApp Header */}
          <div className="bg-[#A56C7B] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E6C27A] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#2A2233]" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">LuVelle AI</p>
              <p className="text-white/70 text-xs">en línea</p>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="p-3 space-y-2 min-h-[280px] md:min-h-[320px]">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.5, duration: 0.3 }}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs ${
                  msg.from === "user" 
                    ? "bg-[#E6C27A] text-[#2A2233]" 
                    : "bg-white text-[#2A2233] shadow-sm"
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#E6C27A]/20 via-[#A56C7B]/10 to-[#E6C27A]/20 rounded-full blur-3xl -z-10" />
    </div>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A2233] leading-tight mb-4 text-balance">
              Tu asistente de belleza y bienestar por WhatsApp
            </h1>
            <p className="text-base md:text-lg text-[#7D657D] mb-6 max-w-lg mx-auto md:mx-0">
              LuVelle AI te ayuda a descubrir rutinas, productos y servicios personalizados. Y si necesitás atención profesional, te conecta con la persona adecuada sin que tengas que buscar por tu cuenta.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <CTAButton href={WHATSAPP_URL} variant="primary">
                <MessageCircle className="w-4 h-4" />
                Empezar por WhatsApp
              </CTAButton>
              <CTAButton href="#como-funciona" variant="secondary">
                Ver cómo funciona
              </CTAButton>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Trust Strip
function TrustStrip() {
  const points = [
    { icon: MessageCircle, text: "Disponible por WhatsApp" },
    { icon: Sparkles, text: "Recomendaciones personalizadas" },
    { icon: Search, text: "Descubrí servicios y productos" },
    { icon: User, text: "Te conectamos con la profesional correcta" },
  ]

  return (
    <section className="py-8 bg-[#F4E3E6]/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <point.icon className="w-5 h-5 text-[#A56C7B]" />
              </div>
              <p className="text-xs md:text-sm text-[#5A465E] font-medium">{point.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// How It Works
function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Contanos lo que necesitás",
      description: "Escribinos por WhatsApp sobre tu piel, rutina actual, presupuesto o lo que buscás."
    },
    {
      number: "2", 
      title: "LuVelle AI entiende tu contexto",
      description: "Analizamos tu situación y preferencias para darte recomendaciones relevantes."
    },
    {
      number: "3",
      title: "Recibís recomendaciones personalizadas",
      description: "Te sugerimos productos, rutinas, o te conectamos con una profesional de confianza."
    }
  ]

  return (
    <section id="como-funciona" className="py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#2A2233] mb-3">
            Cómo funciona
          </h2>
          <p className="text-[#7D657D] max-w-lg mx-auto">
            Una experiencia de belleza guiada por inteligencia artificial
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#F4E3E6]"
            >
              <div className="w-10 h-10 rounded-full bg-[#E6C27A] flex items-center justify-center mb-4">
                <span className="text-[#2A2233] font-bold">{step.number}</span>
              </div>
              <h3 className="font-semibold text-[#2A2233] mb-2">{step.title}</h3>
              <p className="text-sm text-[#7D657D]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Use Cases
function UseCases() {
  const cases = [
    { icon: Sparkles, title: "Rutina facial personalizada", example: "\"Quiero una rutina simple para piel mixta\"" },
    { icon: Gift, title: "Ideas de regalo", example: "\"Necesito un regalo de belleza para mi mamá\"" },
    { icon: Search, title: "Productos según tu presupuesto", example: "\"Tengo ₡15.000, ¿qué me recomiendas?\"" },
    { icon: Heart, title: "Recomendaciones de bienestar", example: "\"¿Cómo puedo mejorar mi autocuidado?\"" },
    { icon: Calendar, title: "Encontrar un servicio cerca", example: "\"Busco manicure en Heredia esta semana\"" },
    { icon: User, title: "Agendar con la profesional correcta", example: "\"Necesito una facialist para mi tipo de piel\"" },
  ]

  return (
    <section id="casos-de-uso" className="py-12 md:py-16 px-4 bg-[#F4E3E6]/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#2A2233] mb-3">
            ¿Qué podés preguntarle a LuVelle?
          </h2>
          <p className="text-[#7D657D]">
            Desde rutinas hasta reservas, te acompañamos en todo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-[#F4E3E6] hover:shadow-md hover:border-[#E6C27A]/30 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-[#A56C7B]/10 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 text-[#A56C7B]" />
              </div>
              <h3 className="font-semibold text-[#2A2233] mb-2 text-sm">{item.title}</h3>
              <p className="text-xs text-[#7D657D] italic">{item.example}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Concierge Section
function ConciergeSection() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#5A465E] to-[#2A2233] rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-[#E6C27A] flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-[#2A2233]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            No necesitás buscar entre cientos de opciones
          </h2>
          <p className="text-white/80 max-w-lg mx-auto mb-6">
            LuVelle AI te ayuda a encontrar la opción adecuada según tu necesidad. 
            Sin directorios interminables, sin perder tiempo comparando perfiles.
          </p>
          <CTAButton href={WHATSAPP_URL} variant="primary">
            <MessageCircle className="w-4 h-4" />
            Probá la experiencia
          </CTAButton>
        </motion.div>
      </div>
    </section>
  )
}

// Human Warmth Section
function HumanWarmthSection() {
  return (
    <section className="py-12 md:py-16 px-4 bg-[#F4E3E6]/30">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#2A2233] mb-4">
              Una amiga que entiende de belleza
            </h2>
            <p className="text-[#7D657D] mb-4">
              LuVelle AI no es un chatbot frío. Está entrenada para entender el contexto, 
              los gustos y las necesidades reales de mujeres que quieren cuidarse mejor.
            </p>
            <ul className="space-y-3">
              {[
                "Respuestas personalizadas, no genéricas",
                "Entiende tu presupuesto y preferencias",
                "Te acompaña sin presión de venta"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-[#5A465E]">
                  <Check className="w-5 h-5 text-[#A56C7B]" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-[#F4E3E6]"
          >
            <div className="space-y-3">
              <div className="flex justify-start">
                <div className="bg-[#F4E3E6] rounded-2xl px-4 py-2 text-sm text-[#2A2233] max-w-[80%]">
                  Estoy un poco perdida con mi rutina de skincare, no sé por dónde empezar
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#E6C27A] rounded-2xl px-4 py-2 text-sm text-[#2A2233] max-w-[80%]">
                  Tranquila, es súper normal sentirse así al principio. Contame: ¿cómo describirías tu tipo de piel? ¿Más seca, grasa, o un poco de ambas? 🌸
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Pricing Section
function PricingSection() {
  const plans = [
    {
      name: "LuVelle AI Gratis",
      price: "₡0",
      description: "Empezá sin compromiso",
      features: [
        "Consultas básicas ilimitadas",
        "Recomendaciones de productos",
        "Tips de belleza y bienestar"
      ],
      cta: "Empezar gratis",
      featured: false
    },
    {
      name: "Club LuVelle AI",
      price: "₡4.900",
      period: "/mes",
      description: "La experiencia completa",
      features: [
        "Todo lo de Gratis",
        "Rutinas personalizadas avanzadas",
        "Conexión con profesionales verificadas",
        "Descuentos exclusivos en servicios",
        "Soporte prioritario"
      ],
      cta: "Unirme al Club",
      featured: true
    }
  ]

  return (
    <section id="planes" className="py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#2A2233] mb-3">
            Elegí tu experiencia
          </h2>
          <p className="text-[#7D657D]">
            Empezá gratis, mejorá cuando quieras
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`rounded-2xl p-6 ${
                plan.featured 
                  ? "bg-gradient-to-br from-[#5A465E] to-[#2A2233] text-white ring-2 ring-[#E6C27A]" 
                  : "bg-white border border-[#F4E3E6]"
              }`}
            >
              {plan.featured && (
                <span className="inline-block bg-[#E6C27A] text-[#2A2233] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Más popular
                </span>
              )}
              <h3 className={`text-xl font-bold mb-1 ${plan.featured ? "text-white" : "text-[#2A2233]"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-4 ${plan.featured ? "text-white/70" : "text-[#7D657D]"}`}>
                {plan.description}
              </p>
              <div className="mb-4">
                <span className={`text-3xl font-bold ${plan.featured ? "text-[#E6C27A]" : "text-[#2A2233]"}`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={plan.featured ? "text-white/70" : "text-[#7D657D]"}>
                    {plan.period}
                  </span>
                )}
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 ${plan.featured ? "text-[#E6C27A]" : "text-[#A56C7B]"}`} />
                    <span className={plan.featured ? "text-white/90" : "text-[#5A465E]"}>{feature}</span>
                  </li>
                ))}
              </ul>
              <CTAButton 
                href={WHATSAPP_URL} 
                variant={plan.featured ? "primary" : "secondary"}
                className="w-full justify-center"
              >
                {plan.cta}
              </CTAButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: "¿Qué hace LuVelle AI?",
      a: "LuVelle AI es tu asistente personal de belleza y bienestar por WhatsApp. Te ayuda a encontrar rutinas, productos y servicios personalizados según tus necesidades y presupuesto."
    },
    {
      q: "¿Cómo empiezo?",
      a: "Simplemente hacé clic en \"Empezar por WhatsApp\" y envianos un mensaje. No necesitás descargar nada ni crear una cuenta."
    },
    {
      q: "¿Necesito descargar algo?",
      a: "No. LuVelle AI funciona directamente en WhatsApp, la app que ya tenés en tu celular."
    },
    {
      q: "¿Puedo encontrar una profesional por medio de LuVelle?",
      a: "Sí. Si necesitás un servicio profesional, LuVelle AI te ayuda a encontrar la persona adecuada según tu ubicación, presupuesto y necesidades específicas."
    },
    {
      q: "¿LuVelle AI reemplaza a una especialista?",
      a: "No. LuVelle AI te orienta y recomienda, pero para tratamientos especializados siempre te conectamos con profesionales calificadas."
    },
    {
      q: "¿Cómo usan mis datos?",
      a: "Tus conversaciones son privadas y solo las usamos para darte mejores recomendaciones. Nunca compartimos tu información con terceros sin tu consentimiento."
    }
  ]

  return (
    <section id="faq" className="py-12 md:py-16 px-4 bg-[#F4E3E6]/30">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#2A2233] mb-3">
            Preguntas frecuentes
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-[#F4E3E6] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-medium text-[#2A2233] text-sm md:text-base">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#7D657D] transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-[#7D657D]">{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Final CTA
function FinalCTA() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#E6C27A]/20 via-[#A56C7B]/10 to-[#E6C27A]/20 rounded-3xl blur-3xl" />
          
          <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-[#F4E3E6]">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2A2233] mb-4">
              Empezá a conversar con una experiencia de belleza más inteligente
            </h2>
            <p className="text-[#7D657D] mb-6 max-w-lg mx-auto">
              Tu bienestar merece atención personalizada. LuVelle AI está lista para ayudarte.
            </p>
            <CTAButton href={WHATSAPP_URL} variant="primary" className="px-8">
              <MessageCircle className="w-5 h-5" />
              Hablar con LuVelle AI
            </CTAButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-[#F4E3E6]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-[#2A2233]">LuVelle</span>
            <div className="flex items-center gap-3">
              <a href={WHATSAPP_URL} className="text-[#7D657D] hover:text-[#A56C7B] transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/luvelle.club" className="text-[#7D657D] hover:text-[#A56C7B] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-[#7D657D]">
            <Link href="/privacy" className="hover:text-[#2A2233] transition-colors">Privacidad</Link>
            <Link href="/terms" className="hover:text-[#2A2233] transition-colors">Términos</Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#F4E3E6]">
          <p className="text-xs text-[#7D657D] text-center mb-2">Otras experiencias LuVelle</p>
          <div className="flex items-center justify-center gap-4 text-xs text-[#7D657D]">
            <Link href="/providers" className="hover:text-[#A56C7B] transition-colors">LuVelle Pro — Próximamente</Link>
            <Link href="/beauty-box" className="hover:text-[#A56C7B] transition-colors">The Beauty Box — Próximamente</Link>
          </div>
        </div>

        <p className="text-xs text-[#7D657D] text-center mt-6">
          © {new Date().getFullYear()} LuVelle. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

// Sticky Mobile CTA
function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-[#F4E3E6] md:hidden z-50">
      <CTAButton href={WHATSAPP_URL} variant="primary" className="w-full justify-center">
        <MessageCircle className="w-5 h-5" />
        Empezar por WhatsApp
      </CTAButton>
    </div>
  )
}

// Main Page
export default function HomePage() {
  return (
    <main className="relative bg-[#FFF8F6] min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustStrip />
      <HowItWorks />
      <UseCases />
      <ConciergeSection />
      <HumanWarmthSection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </main>
  )
}
