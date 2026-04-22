"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { MessageCircle, Sparkles, Heart, Search, Gift, Calendar, User, ChevronDown, Check, ArrowRight, Star } from "lucide-react"
import { trackWhatsAppClick } from "@/lib/gtm-events"

const WHATSAPP_URL = "https://wa.me/15557792120?text=Hola%20LuVelle%2C%20quiero%20probar%20el%20asistente%20de%20belleza"

// Animated Gradient Background
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF7F3] via-[#FFD8CC]/30 to-[#B388FF]/20" />
      <motion.div
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#FF7A59]/20 via-[#E94B8A]/10 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#B388FF]/20 via-[#5B2A86]/10 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#F2C572]/10 to-[#FFD8CC]/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

// CTA Button with premium effects
function CTAButton({ 
  variant = "primary", 
  children, 
  href,
  onClick,
  className = "",
  size = "default"
}: { 
  variant?: "primary" | "secondary" | "ghost"
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  size?: "default" | "large"
}) {
  const sizeStyles = size === "large" ? "px-8 py-4 text-base md:text-lg" : "px-6 py-3 text-sm md:text-base"
  const baseStyles = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ${sizeStyles}`
  
  const variants = {
    primary: "bg-gradient-to-r from-[#FF7A59] to-[#E94B8A] text-white hover:shadow-lg hover:shadow-[#E94B8A]/30 hover:scale-105 active:scale-100",
    secondary: "bg-white text-[#241335] border-2 border-[#E94B8A]/30 hover:border-[#E94B8A] hover:bg-[#FFD8CC]/20 hover:shadow-md",
    ghost: "bg-[#241335] text-white hover:bg-[#5B2A86] hover:shadow-lg"
  }
  
  const handleClick = () => {
    if (href?.includes("wa.me")) {
      trackWhatsAppClick("cta_button")
    }
    onClick?.()
  }

  const content = (
    <motion.span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return <Link href={href} onClick={handleClick}>{content}</Link>
  }
  
  return <button onClick={handleClick}>{content}</button>
}

// Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/images/luvelle-logo.png" 
            alt="LuVelle" 
            width={40} 
            height={40}
            className="w-10 h-10"
          />
          <span className="text-xl font-bold text-[#241335]">LuVelle</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {["Cómo funciona", "Casos de uso", "Planes", "FAQ"].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-").replace("ó", "o")}`} 
              className="text-sm text-[#5B2A86] hover:text-[#E94B8A] transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        <CTAButton href={WHATSAPP_URL} variant="primary" className="hidden md:inline-flex">
          <MessageCircle className="w-4 h-4" />
          Empezar gratis
        </CTAButton>
      </div>
    </motion.nav>
  )
}

// Floating Phone with animated messages
function FloatingPhone() {
  const messages = [
    { from: "user", text: "Hola! Busco una rutina para piel mixta", delay: 0 },
    { from: "ai", text: "Hola! Te ayudo con eso. Tu piel tiende a ser más grasa en la zona T?", delay: 0.8 },
    { from: "user", text: "Sí, y tengo poros visibles", delay: 1.6 },
    { from: "ai", text: "Te recomiendo: limpiador en gel + sérum niacinamida + hidratante ligera. Quieres que te sugiera productos según tu presupuesto?", delay: 2.4 },
  ]

  const [visibleMessages, setVisibleMessages] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleMessages((prev) => (prev < messages.length ? prev + 1 : prev))
    }, 1200)
    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-8 bg-gradient-to-r from-[#B388FF]/30 via-[#E94B8A]/20 to-[#FF7A59]/30 rounded-full blur-3xl animate-pulse" />
      
      {/* Phone frame */}
      <motion.div 
        className="relative bg-[#241335] rounded-[3rem] p-3 shadow-2xl shadow-[#5B2A86]/30"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#241335] rounded-b-2xl z-10" />
        
        {/* Screen */}
        <div className="bg-gradient-to-b from-[#FFF7F3] to-white rounded-[2.5rem] overflow-hidden w-[280px] md:w-[300px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#5B2A86] to-[#E94B8A] px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">LuVelle AI</p>
              <p className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                en línea
              </p>
            </div>
          </div>
          
          {/* Messages */}
          <div className="p-4 space-y-3 min-h-[320px] md:min-h-[360px]">
            {messages.slice(0, visibleMessages).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.from === "user" 
                    ? "bg-gradient-to-r from-[#FF7A59] to-[#E94B8A] text-white rounded-br-md" 
                    : "bg-white text-[#241335] shadow-md border border-[#FFD8CC]/50 rounded-bl-md"
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {visibleMessages < messages.length && (
              <motion.div 
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-white rounded-2xl px-4 py-3 shadow-md border border-[#FFD8CC]/50">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-[#B388FF] rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 px-4 overflow-hidden">
      <AnimatedBackground />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-[#E94B8A]/20"
            >
              <Sparkles className="w-4 h-4 text-[#E94B8A]" />
              <span className="text-sm text-[#5B2A86] font-medium">Tu asistente de belleza con IA</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#241335] leading-tight mb-6 text-balance">
              Cuidar tu belleza nunca fue{" "}
              <span className="bg-gradient-to-r from-[#FF7A59] via-[#E94B8A] to-[#B388FF] bg-clip-text text-transparent">
                tan fácil
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#5B2A86] mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              LuVelle AI te ayuda a descubrir rutinas, productos y servicios personalizados por WhatsApp. Sin buscar, sin complicaciones.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <CTAButton href={WHATSAPP_URL} variant="primary" size="large">
                <MessageCircle className="w-5 h-5" />
                Empezar por WhatsApp
              </CTAButton>
              <CTAButton href="#como-funciona" variant="secondary" size="large">
                Ver cómo funciona
                <ArrowRight className="w-4 h-4" />
              </CTAButton>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 flex items-center gap-4 justify-center md:justify-start"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD8CC] to-[#E94B8A] border-2 border-white" />
                ))}
              </div>
              <p className="text-sm text-[#5B2A86]">
                <span className="font-semibold">+500</span> mujeres ya usan LuVelle
              </p>
            </motion.div>
          </motion.div>

          {/* Phone Mockup */}
          <div className="flex justify-center md:justify-end">
            <FloatingPhone />
          </div>
        </div>
      </div>
    </section>
  )
}

// Trust Strip with animated icons
function TrustStrip() {
  const points = [
    { icon: MessageCircle, text: "100% por WhatsApp", color: "from-[#FF7A59] to-[#E94B8A]" },
    { icon: Sparkles, text: "Recomendaciones con IA", color: "from-[#B388FF] to-[#5B2A86]" },
    { icon: Heart, text: "Personalizado para vos", color: "from-[#E94B8A] to-[#B388FF]" },
    { icon: User, text: "Conexión con profesionales", color: "from-[#5B2A86] to-[#241335]" },
  ]

  return (
    <section className="py-12 bg-gradient-to-r from-[#241335] via-[#5B2A86] to-[#241335]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${point.color} flex items-center justify-center shadow-lg`}>
                <point.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-white font-medium">{point.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Interactive How It Works
function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  
  const steps = [
    {
      number: "01",
      title: "Contanos lo que necesitás",
      description: "Escribinos por WhatsApp sobre tu piel, rutina, presupuesto o lo que buscás. Sin formularios, solo conversación natural.",
      visual: "chat"
    },
    {
      number: "02", 
      title: "LuVelle AI analiza tu contexto",
      description: "Nuestra IA entiende tus necesidades, preferencias y situación para darte recomendaciones realmente relevantes.",
      visual: "ai"
    },
    {
      number: "03",
      title: "Recibís soluciones personalizadas",
      description: "Te sugerimos productos, rutinas, o te conectamos directamente con la profesional de belleza adecuada.",
      visual: "result"
    }
  ]

  return (
    <section id="como-funciona" className="py-20 md:py-28 px-4 bg-gradient-to-b from-white to-[#FFF7F3]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#E94B8A] font-semibold text-sm mb-3 tracking-wider uppercase">
            Simple y poderoso
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#241335] mb-4">
            Cómo funciona LuVelle
          </h2>
          <p className="text-lg text-[#5B2A86] max-w-2xl mx-auto">
            Una experiencia de belleza guiada por inteligencia artificial, en 3 simples pasos
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                onClick={() => setActiveStep(i)}
                className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 ${
                  activeStep === i 
                    ? "bg-gradient-to-r from-[#FF7A59]/10 to-[#E94B8A]/10 border-2 border-[#E94B8A] shadow-lg" 
                    : "bg-white border-2 border-transparent hover:border-[#FFD8CC] shadow-sm"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className={`text-2xl font-bold ${activeStep === i ? "text-[#E94B8A]" : "text-[#B388FF]/50"}`}>
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-bold text-[#241335] text-lg mb-2">{step.title}</h3>
                    <p className="text-[#5B2A86] text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visual */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[#B388FF]/20 via-[#E94B8A]/20 to-[#FF7A59]/20 rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-br from-[#241335] to-[#5B2A86] rounded-3xl p-8 md:p-12 aspect-square flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeStep === 0 && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white font-medium">Conversación natural por WhatsApp</p>
                  </motion.div>
                )}
                {activeStep === 1 && (
                  <motion.div
                    key="ai"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-[#B388FF] to-[#E94B8A] rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                      <Sparkles className="w-10 h-10 text-white" />
                      <motion.div
                        className="absolute -inset-2 bg-gradient-to-r from-[#B388FF] to-[#E94B8A] rounded-2xl opacity-50"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <p className="text-white font-medium">IA analizando tu contexto</p>
                  </motion.div>
                )}
                {activeStep === 2 && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-[#F2C572] to-[#FF7A59] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white font-medium">Soluciones personalizadas para vos</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Use Cases with hover effects
function UseCases() {
  const cases = [
    { icon: Sparkles, title: "Rutina facial", example: "Quiero una rutina simple para piel mixta", color: "from-[#FF7A59] to-[#E94B8A]" },
    { icon: Gift, title: "Ideas de regalo", example: "Necesito un regalo de belleza para mi mamá", color: "from-[#E94B8A] to-[#B388FF]" },
    { icon: Search, title: "Productos por presupuesto", example: "Tengo $15.000, qué me recomiendas?", color: "from-[#B388FF] to-[#5B2A86]" },
    { icon: Heart, title: "Tips de bienestar", example: "Cómo puedo mejorar mi autocuidado?", color: "from-[#5B2A86] to-[#241335]" },
    { icon: Calendar, title: "Servicios cerca", example: "Busco manicure en Heredia esta semana", color: "from-[#F2C572] to-[#FF7A59]" },
    { icon: User, title: "Encontrar profesional", example: "Necesito una facialist para mi tipo de piel", color: "from-[#FF7A59] to-[#E94B8A]" },
  ]

  return (
    <section id="casos-de-uso" className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#E94B8A] font-semibold text-sm mb-3 tracking-wider uppercase">
            Casos de uso
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#241335] mb-4">
            Qué podés preguntarle a LuVelle?
          </h2>
          <p className="text-lg text-[#5B2A86]">
            Desde rutinas hasta reservas, te acompañamos en todo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white rounded-2xl p-6 shadow-sm border border-[#FFD8CC]/50 hover:shadow-xl hover:border-[#E94B8A]/30 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="font-bold text-[#241335] text-lg mb-3">{item.title}</h3>
              
              <div className="bg-[#FFF7F3] rounded-xl p-3 border border-[#FFD8CC]/50">
                <p className="text-sm text-[#5B2A86] italic">{`"${item.example}"`}</p>
              </div>
              
              <motion.div
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: 10 }}
                whileHover={{ x: 0 }}
              >
                <ArrowRight className="w-5 h-5 text-[#E94B8A]" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Concierge Flow Section
function ConciergeSection() {
  const steps = [
    { icon: User, label: "Tu necesidad", color: "#FF7A59" },
    { icon: Sparkles, label: "LuVelle AI", color: "#E94B8A" },
    { icon: Search, label: "Match perfecto", color: "#B388FF" },
    { icon: Calendar, label: "Reserva", color: "#F2C572" },
  ]

  return (
    <section className="py-20 md:py-28 px-4 bg-gradient-to-br from-[#241335] via-[#5B2A86] to-[#241335] relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-[#E94B8A]/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-48 h-48 bg-[#B388FF]/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#F2C572] font-semibold text-sm mb-3 tracking-wider uppercase">
            Tu concierge de belleza
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            No necesitás buscar entre cientos de opciones
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            LuVelle AI te conecta con la profesional perfecta según tu necesidad. Sin directorios, sin perder tiempo.
          </p>
        </motion.div>

        {/* Flow visualization */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-4 md:gap-8"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl"
                  style={{ backgroundColor: step.color }}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <motion.div
                  className="absolute -inset-2 rounded-2xl"
                  style={{ backgroundColor: step.color }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
                <p className="text-white text-sm font-medium text-center mt-3">{step.label}</p>
              </motion.div>
              
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3 }}
                  className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-white/50 to-white/20"
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <CTAButton href={WHATSAPP_URL} variant="primary" size="large">
            <MessageCircle className="w-5 h-5" />
            Probá la experiencia
          </CTAButton>
        </motion.div>
      </div>
    </section>
  )
}

// Pricing Section with premium effects
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
      name: "Club LuVelle",
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
    <section id="planes" className="py-20 md:py-28 px-4 bg-gradient-to-b from-[#FFF7F3] to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#E94B8A] font-semibold text-sm mb-3 tracking-wider uppercase">
            Planes simples
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#241335] mb-4">
            Elegí tu experiencia
          </h2>
          <p className="text-lg text-[#5B2A86]">
            Empezá gratis, mejorá cuando quieras
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                plan.featured 
                  ? "bg-gradient-to-br from-[#241335] via-[#5B2A86] to-[#241335] text-white shadow-2xl shadow-[#5B2A86]/30" 
                  : "bg-white border-2 border-[#FFD8CC] shadow-lg"
              }`}
            >
              {plan.featured && (
                <>
                  <div className="absolute -inset-[2px] bg-gradient-to-r from-[#FF7A59] via-[#E94B8A] to-[#B388FF] rounded-3xl -z-10 animate-pulse" />
                  <motion.span 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF7A59] to-[#E94B8A] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Más popular
                  </motion.span>
                </>
              )}
              
              <h3 className={`text-2xl font-bold mb-2 ${plan.featured ? "text-white" : "text-[#241335]"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.featured ? "text-white/70" : "text-[#5B2A86]"}`}>
                {plan.description}
              </p>
              
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.featured ? "text-[#F2C572]" : "text-[#241335]"}`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={plan.featured ? "text-white/70" : "text-[#5B2A86]"}>
                    {plan.period}
                  </span>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.featured ? "bg-[#F2C572]" : "bg-gradient-to-r from-[#FF7A59] to-[#E94B8A]"
                    }`}>
                      <Check className={`w-3 h-3 ${plan.featured ? "text-[#241335]" : "text-white"}`} />
                    </div>
                    <span className={plan.featured ? "text-white/90" : "text-[#5B2A86]"}>{feature}</span>
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
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  
  const faqs = [
    {
      question: "Cómo funciona LuVelle AI?",
      answer: "LuVelle AI es tu asistente de belleza por WhatsApp. Solo escribinos contándonos lo que necesitás y nuestra IA te dará recomendaciones personalizadas de productos, rutinas, o te conectará con profesionales verificadas."
    },
    {
      question: "Es realmente gratis?",
      answer: "Sí! Podés usar LuVelle AI gratis con consultas básicas ilimitadas. Si querés funciones avanzadas como rutinas personalizadas y conexión con profesionales, podés unirte al Club por ₡4.900/mes."
    },
    {
      question: "Cómo me conectan con profesionales?",
      answer: "Cuando necesitás un servicio, LuVelle AI analiza tu necesidad y te conecta directamente con la profesional verificada más adecuada. No tenés que buscar en directorios ni comparar perfiles."
    },
    {
      question: "Puedo cancelar cuando quiera?",
      answer: "Por supuesto. Si te unís al Club LuVelle, podés cancelar en cualquier momento sin penalidades. Tu suscripción seguirá activa hasta el final del período pagado."
    }
  ]

  return (
    <section id="faq" className="py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#E94B8A] font-semibold text-sm mb-3 tracking-wider uppercase">
            Preguntas frecuentes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#241335]">
            Todavía tenés dudas?
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-[#FFD8CC] overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-[#241335]">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#E94B8A]" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-[#5B2A86] leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Final CTA Section
function FinalCTA() {
  return (
    <section className="py-20 md:py-28 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A59] via-[#E94B8A] to-[#B388FF]" />
      
      {/* Animated glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Empezá tu viaje de belleza hoy
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
            Miles de mujeres ya descubrieron una forma más fácil de cuidarse. Es tu turno.
          </p>
          <CTAButton href={WHATSAPP_URL} variant="ghost" size="large">
            <MessageCircle className="w-5 h-5" />
            Escribinos por WhatsApp
          </CTAButton>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 px-4 bg-[#241335]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/images/luvelle-logo.png" 
              alt="LuVelle" 
              width={32} 
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-white">LuVelle</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/providers" className="text-sm text-white/60 hover:text-white transition-colors">
              LuVelle Pro
            </Link>
            <Link href="/beauty-box" className="text-sm text-white/60 hover:text-white transition-colors">
              Beauty Box
            </Link>
            <Link href="/partners" className="text-sm text-white/60 hover:text-white transition-colors">
              Partners
            </Link>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            2024 LuVelle. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/50 hover:text-white transition-colors">
              <Star className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Mobile Sticky CTA
function MobileStickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-lg border-t border-[#FFD8CC] md:hidden z-50"
        >
          <CTAButton href={WHATSAPP_URL} variant="primary" className="w-full justify-center">
            <MessageCircle className="w-5 h-5" />
            Empezar por WhatsApp
          </CTAButton>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Main Page
export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFF7F3]">
      <Navbar />
      <HeroSection />
      <TrustStrip />
      <HowItWorks />
      <UseCases />
      <ConciergeSection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <MobileStickyCTA />
    </main>
  )
}
