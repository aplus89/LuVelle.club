"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Sparkles, Calendar, DollarSign, Users, Clock, CheckCircle, ChevronDown, Instagram, ArrowRight, Zap, Shield, TrendingUp, Bell, Star } from "lucide-react"
import { trackWhatsAppClick } from "@/lib/gtm-events"

const WHATSAPP_URL = "https://wa.me/15557792120?text=Hola%20LuVelle%2C%20soy%20profesional%20de%20belleza%20y%20quiero%20unirme"
const WHATSAPP_CONSUMER_URL = "https://wa.me/15557792120?text=Hola%20LuVelle%2C%20quiero%20probar%20el%20asistente%20de%20belleza"

// Animated gradient background
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-[#FFF7F3]" />
      <motion.div
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #FFD8CC 0%, transparent 70%)" }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #B388FF 0%, transparent 70%)" }}
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

// Sticky Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#como-funciona", label: "Cómo funciona" },
    { href: "#beneficios", label: "Beneficios" },
    { href: "#planes", label: "Planes" },
    { href: "#faq", label: "FAQ" },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/luvelle-logo.png" alt="LuVelle" width={36} height={36} className="w-9 h-9" />
            <span className="text-xl font-bold text-[#241335]">LuVelle</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#5B2A86] hover:text-[#E94B8A] transition-colors font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("navbar_cta")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#E94B8A]/30 transition-all duration-300 hover:scale-105"
            >
              <span>Unirme como profesional</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#241335]"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-current transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-full bg-current transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-full bg-current transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[#5B2A86] font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("mobile_menu_cta")}
                className="block w-full text-center py-3 bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] text-white font-semibold rounded-full mt-4"
              >
                Unirme como profesional
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// Phone mockup with provider notifications
function ProviderPhoneMockup() {
  const notifications = [
    { icon: Bell, text: "Nueva solicitud: Manicure gel", time: "Ahora", color: "#E94B8A" },
    { icon: Calendar, text: "Cita confirmada: Mañana 3pm", time: "Hace 2 min", color: "#5B2A86" },
    { icon: DollarSign, text: "Pago recibido: ₡15,000", time: "Hace 5 min", color: "#22C55E" },
    { icon: Users, text: "Nueva clienta referida", time: "Hace 10 min", color: "#FF7A59" },
  ]

  return (
    <div className="relative">
      <div className="relative w-[280px] sm:w-[320px] h-[560px] sm:h-[640px] bg-[#241335] rounded-[3rem] p-3 shadow-2xl shadow-[#5B2A86]/30">
        <div className="w-full h-full bg-gradient-to-b from-[#FFF7F3] to-white rounded-[2.5rem] overflow-hidden relative">
          <div className="flex justify-between items-center px-6 py-3 text-xs text-[#241335]/60">
            <span>9:41</span>
            <div className="w-4 h-2 bg-[#241335]/60 rounded-sm" />
          </div>

          <div className="px-4 py-3 border-b border-[#FFD8CC]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E94B8A] to-[#FF7A59] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-[#241335]">LuVelle Pro</p>
                <p className="text-xs text-[#5B2A86]">Tu asistente de negocio</p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {notifications.map((notif, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3 + 0.5, duration: 0.5 }}
                className="bg-white rounded-2xl p-4 shadow-md border border-[#FFD8CC]/50"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${notif.color}20` }}
                  >
                    <notif.icon className="w-5 h-5" style={{ color: notif.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#241335] text-sm">{notif.text}</p>
                    <p className="text-xs text-[#5B2A86]/60 mt-0.5">{notif.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#B388FF] to-[#5B2A86] rounded-2xl flex items-center justify-center shadow-lg"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <TrendingUp className="w-10 h-10 text-white" />
      </motion.div>

      <motion.div
        className="absolute -bottom-2 -left-6 px-4 py-2 bg-white rounded-full shadow-lg border border-[#FFD8CC]"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-[#241335]">3 nuevas solicitudes</span>
        </div>
      </motion.div>
    </div>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen pt-24 lg:pt-32 pb-16 overflow-hidden">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5B2A86]/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#5B2A86]" />
              <span className="text-sm font-medium text-[#5B2A86]">Impulsado por AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#241335] leading-tight mb-6">
              Más clientas.{" "}
              <span className="bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] bg-clip-text text-transparent">
                Menos caos.
              </span>
              <br />
              Un solo flujo con LuVelle.
            </h1>

            <p className="text-lg sm:text-xl text-[#5B2A86] mb-8 max-w-xl mx-auto lg:mx-0">
              LuVelle ayuda a profesionales de belleza y bienestar a recibir solicitudes, 
              responder más rápido y cerrar citas a través de una experiencia guiada con AI y WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("hero_primary")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] text-white font-bold rounded-full text-lg hover:shadow-xl hover:shadow-[#E94B8A]/30 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Unirme como profesional</span>
              </a>

              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#5B2A86] font-semibold rounded-full text-lg border-2 border-[#5B2A86]/20 hover:border-[#5B2A86]/40 hover:bg-[#5B2A86]/5 transition-all duration-300"
              >
                <span>Ver cómo funciona</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-[#5B2A86]/70">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Sin descargas</span>
              </div>
              <div className="flex items-center gap-2 text-[#5B2A86]/70">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Funciona en WhatsApp</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <ProviderPhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Why providers join
function WhyProvidersSection() {
  const benefits = [
    {
      icon: Users,
      title: "Más solicitudes calificadas",
      description: "Clientas que ya saben lo que quieren y están listas para agendar.",
      color: "#E94B8A",
    },
    {
      icon: Clock,
      title: "Menos tiempo en WhatsApp",
      description: "LuVelle filtra y organiza las consultas antes de que lleguen a vos.",
      color: "#5B2A86",
    },
    {
      icon: Zap,
      title: "Menos desorden al coordinar",
      description: "Todo en un solo lugar: solicitudes, confirmaciones y seguimiento.",
      color: "#FF7A59",
    },
    {
      icon: TrendingUp,
      title: "Más cierres de citas",
      description: "Respuestas rápidas y profesionales que convierten consultas en citas.",
      color: "#B388FF",
    },
  ]

  return (
    <section id="beneficios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#241335] mb-4">
            Por qué las profesionales eligen LuVelle
          </h2>
          <p className="text-lg text-[#5B2A86] max-w-2xl mx-auto">
            Dejá de perseguir mensajes y empezá a cerrar más citas
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-gradient-to-b from-[#FFF7F3] to-white p-6 rounded-3xl border border-[#FFD8CC] hover:shadow-xl hover:shadow-[#E94B8A]/10 transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${benefit.color}15` }}
              >
                <benefit.icon className="w-7 h-7" style={{ color: benefit.color }} />
              </div>
              <h3 className="text-xl font-bold text-[#241335] mb-2">{benefit.title}</h3>
              <p className="text-[#5B2A86]/80">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// How it works
function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      number: "01",
      title: "La clienta habla con LuVelle AI",
      description: "La clienta escribe por WhatsApp lo que necesita: un servicio, una consulta, una idea.",
    },
    {
      number: "02",
      title: "LuVelle entiende la necesidad",
      description: "Nuestra AI interpreta el pedido, hace preguntas de seguimiento y califica la solicitud.",
    },
    {
      number: "03",
      title: "Te conectamos con la clienta",
      description: "Recibís la solicitud ya filtrada con toda la info que necesitás para responder.",
    },
    {
      number: "04",
      title: "Cerrás la cita fácilmente",
      description: "Confirmás disponibilidad, coordinás los detalles y listo. Clienta nueva ganada.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <section id="como-funciona" className="py-20 bg-gradient-to-b from-[#FFF7F3] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#241335] mb-4">
            Cómo funciona LuVelle
          </h2>
          <p className="text-lg text-[#5B2A86] max-w-2xl mx-auto">
            Un flujo simple que convierte conversaciones en citas reales
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveStep(i)}
                className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 ${
                  activeStep === i
                    ? "bg-gradient-to-r from-[#5B2A86] to-[#E94B8A] text-white shadow-xl"
                    : "bg-white hover:bg-[#FFF7F3] border border-[#FFD8CC]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className={`text-2xl font-bold ${activeStep === i ? "text-white/50" : "text-[#E94B8A]"}`}>
                    {step.number}
                  </span>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${activeStep === i ? "text-white" : "text-[#241335]"}`}>
                      {step.title}
                    </h3>
                    <p className={activeStep === i ? "text-white/80" : "text-[#5B2A86]/70"}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            key={activeStep}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex justify-center"
          >
            <div className="w-full max-w-md bg-gradient-to-br from-[#241335] to-[#5B2A86] rounded-3xl p-8 shadow-2xl">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 min-h-[300px] flex items-center justify-center">
                {activeStep === 0 && (
                  <div className="space-y-4 w-full">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E94B8A] flex-shrink-0" />
                      <div className="bg-white/20 rounded-2xl rounded-tl-none p-4 text-white">
                        Hola! Busco alguien para uñas semipermanentes cerca de Escazú
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex gap-3 justify-end"
                    >
                      <div className="bg-[#F2C572] rounded-2xl rounded-tr-none p-4 text-[#241335]">
                        Perfecto! Te ayudo a encontrar la profesional ideal...
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#B388FF] flex-shrink-0 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  </div>
                )}
                {activeStep === 1 && (
                  <div className="text-center text-white">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#B388FF] to-[#E94B8A] flex items-center justify-center"
                    >
                      <Sparkles className="w-10 h-10" />
                    </motion.div>
                    <p className="text-xl font-semibold">Analizando solicitud...</p>
                    <p className="text-white/60 mt-2">Servicio: Uñas semipermanentes</p>
                    <p className="text-white/60">Zona: Escazú</p>
                    <p className="text-white/60">Urgencia: Esta semana</p>
                  </div>
                )}
                {activeStep === 2 && (
                  <div className="w-full space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Bell className="w-5 h-5 text-[#E94B8A]" />
                        <span className="font-semibold text-[#241335]">Nueva solicitud para vos</span>
                      </div>
                      <div className="text-sm text-[#5B2A86] space-y-1">
                        <p>Servicio: Uñas semipermanentes</p>
                        <p>Zona: Escazú</p>
                        <p>Disponibilidad: Viernes o sábado</p>
                      </div>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="bg-[#F2C572] rounded-xl p-3 text-center text-[#241335] font-semibold"
                    >
                      Ver detalles y responder
                    </motion.div>
                  </div>
                )}
                {activeStep === 3 && (
                  <div className="text-center text-white">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500 flex items-center justify-center"
                    >
                      <CheckCircle className="w-12 h-12" />
                    </motion.div>
                    <p className="text-2xl font-bold mb-2">Cita confirmada!</p>
                    <p className="text-white/70">Viernes 3:00 PM</p>
                    <p className="text-white/70">Servicio: Uñas semipermanentes</p>
                    <p className="text-[#F2C572] font-semibold mt-4">₡18,000</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Pain points section
function PainPointsSection() {
  const painPoints = [
    "Repetir precios todo el día",
    "Perder mensajes entre chats",
    "Responder siempre las mismas preguntas",
    "Coordinar manualmente cada cita",
    "Perder oportunidades por tardar en responder",
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-[#241335] via-[#5B2A86] to-[#241335] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Dejá de hacer esto{" "}
              <span className="text-[#FF7A59]">manualmente</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Sabemos que tu día se va en coordinar. LuVelle se encarga de eso.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("pain_points_cta")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span>Quiero automatizar mi negocio</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          <div className="space-y-4">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
              >
                <div className="w-10 h-10 rounded-full bg-[#FF7A59]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#FF7A59] text-xl">✗</span>
                </div>
                <span className="text-lg">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// What LuVelle gives you
function BenefitsSection() {
  const benefits = [
    { icon: Users, text: "Visibilidad ante nuevas clientas" },
    { icon: Shield, text: "Mejor filtro de solicitudes" },
    { icon: Zap, text: "Apoyo para cerrar citas" },
    { icon: Calendar, text: "Orden en tu operación" },
    { icon: Star, text: "Experiencia moderna para tu negocio" },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#241335] mb-4">
            Lo que LuVelle te da
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-3xl bg-gradient-to-b from-[#FFF7F3] to-white border border-[#FFD8CC] hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#E94B8A] to-[#FF7A59] flex items-center justify-center">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <p className="font-semibold text-[#241335]">{benefit.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Provider plans
function PlansSection() {
  const plans = [
    {
      name: "Prueba Gratis",
      price: "₡0",
      period: "primer mes",
      description: "Probá LuVelle sin compromiso",
      features: [
        "Recibí hasta 10 solicitudes",
        "Perfil básico en LuVelle",
        "Soporte por WhatsApp",
      ],
      cta: "Empezar gratis",
      featured: false,
    },
    {
      name: "Plan Profesional",
      price: "₡9,900",
      period: "/mes",
      description: "Para profesionales que quieren crecer",
      features: [
        "Solicitudes ilimitadas",
        "Perfil destacado",
        "Prioridad en conexiones",
        "Estadísticas de rendimiento",
        "Soporte prioritario",
      ],
      cta: "Elegir plan profesional",
      featured: true,
    },
  ]

  return (
    <section id="planes" className="py-20 bg-gradient-to-b from-[#FFF7F3] to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#241335] mb-4">
            Planes para profesionales
          </h2>
          <p className="text-lg text-[#5B2A86] max-w-2xl mx-auto">
            Empezá gratis y crecé con LuVelle
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-3xl p-8 ${
                plan.featured
                  ? "bg-gradient-to-br from-[#5B2A86] to-[#241335] text-white shadow-2xl shadow-[#5B2A86]/30 scale-105"
                  : "bg-white border-2 border-[#FFD8CC]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] text-white text-sm font-semibold rounded-full">
                  Más elegido
                </div>
              )}

              <h3 className={`text-2xl font-bold mb-2 ${plan.featured ? "text-white" : "text-[#241335]"}`}>
                {plan.name}
              </h3>
              <p className={`mb-4 ${plan.featured ? "text-white/70" : "text-[#5B2A86]"}`}>
                {plan.description}
              </p>

              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.featured ? "text-[#F2C572]" : "text-[#E94B8A]"}`}>
                  {plan.price}
                </span>
                <span className={plan.featured ? "text-white/60" : "text-[#5B2A86]/60"}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <CheckCircle className={`w-5 h-5 flex-shrink-0 ${plan.featured ? "text-[#F2C572]" : "text-[#E94B8A]"}`} />
                    <span className={plan.featured ? "text-white/90" : "text-[#241335]"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`plan_${plan.name}`)}
                className={`block w-full text-center py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 ${
                  plan.featured
                    ? "bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] text-white hover:shadow-lg"
                    : "bg-[#241335] text-white hover:bg-[#5B2A86]"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[#5B2A86]/60 mt-8 text-sm">
          Las clientas usan LuVelle gratis. Vos solo pagás si querés recibir más solicitudes y destacar tu perfil.
        </p>
      </div>
    </section>
  )
}

// Trust section
function TrustSection() {
  const points = [
    "Diseñado para profesionales independientes",
    "Ideal para negocios que hoy viven en WhatsApp",
    "Pensado para cerrar más citas sin complicarte más",
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-6">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#E94B8A]/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#E94B8A]" />
              </div>
              <p className="text-[#241335] font-medium">{point}</p>
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
      q: "¿Para quién es LuVelle?",
      a: "LuVelle es para profesionales de belleza y bienestar: estilistas, manicuristas, maquilladoras, esteticistas, masajistas, y más. Si ofrecés servicios y querés más clientas, LuVelle es para vos.",
    },
    {
      q: "¿Cómo me llegan clientas?",
      a: "Las clientas le escriben a LuVelle AI por WhatsApp. Nuestra AI entiende lo que necesitan y te conecta con las solicitudes que hacen sentido para tu negocio.",
    },
    {
      q: "¿Necesito descargar algo?",
      a: "No. Todo funciona por WhatsApp. No hay apps que descargar ni plataformas complicadas.",
    },
    {
      q: "¿Cuánto cuesta?",
      a: "Podés empezar gratis el primer mes. Después, el plan profesional cuesta ₡9,900/mes para recibir solicitudes ilimitadas y tener un perfil destacado.",
    },
    {
      q: "¿Las clientas pagan por usar LuVelle?",
      a: "No. Para las clientas, LuVelle es completamente gratis. Vos solo pagás si querés recibir más solicitudes y destacar tu perfil.",
    },
  ]

  return (
    <section id="faq" className="py-20 bg-[#FFF7F3]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#241335] mb-4">
            Preguntas frecuentes
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-[#FFD8CC] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-[#241335] pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#5B2A86] flex-shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-[#5B2A86]">{faq.a}</div>
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

// Final CTA
function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#5B2A86] via-[#E94B8A] to-[#FF7A59] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Convertí más conversaciones en citas reales
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Unite a las profesionales que ya están recibiendo clientas con LuVelle
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("final_cta")}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#5B2A86] font-bold rounded-full text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Quiero unirme a LuVelle</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-[#241335] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Image src="/images/luvelle-logo.png" alt="LuVelle" width={40} height={40} />
            <span className="text-xl font-bold">LuVelle</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://instagram.com/luvelle.club"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Términos</Link>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
            <a href={WHATSAPP_CONSUMER_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Experiencia para clientas
            </a>
            <span className="text-white/30">The Beauty Box — Próximamente</span>
          </div>
        </div>

        <p className="text-center text-white/30 text-sm mt-8">
          © {new Date().getFullYear()} LuVelle. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

// Sticky mobile CTA
function StickyMobileCTA() {
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
          className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-[#FFD8CC] z-50 md:hidden"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("sticky_mobile_cta")}
            className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] text-white font-bold rounded-full"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Unirme como profesional</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Main page component
export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFF7F3]">
      <Navbar />
      <HeroSection />
      <WhyProvidersSection />
      <HowItWorksSection />
      <PainPointsSection />
      <BenefitsSection />
      <PlansSection />
      <TrustSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
      <StickyMobileCTA />
    </main>
  )
}
