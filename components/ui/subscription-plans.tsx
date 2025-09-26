"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SUBSCRIPTION_PLANS } from "@/lib/constants"
import { Crown, Package, Sparkles, Check, Star, Gift } from "lucide-react"

const iconMap = {
  Package: Package,
  Crown: Crown,
  Sparkles: Sparkles,
}

export function SubscriptionPlans() {
  const router = useRouter()

  const handlePlanSelect = (plan: typeof SUBSCRIPTION_PLANS.premium) => {
    if (plan.action === "wizard") {
      // Navigate to wizard and scroll to top
      router.push("/thebeautybox")
      // Small delay to ensure navigation completes before scrolling
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, 100)
    } else if (plan.action === "direct-payment") {
      // Handle direct payment flow
      router.push(`/checkout?plan=${plan.id}`)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-20 px-4 bg-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-gold/20 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-gold/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-gold/20 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-dancing text-5xl md:text-6xl text-gold mb-6">Elige tu experiencia LuVelle</h2>
          <p className="text-cream/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Descubre el plan perfecto para tu journey de belleza y bienestar. Cada caja es una experiencia única
            diseñada para ti.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Object.values(SUBSCRIPTION_PLANS).map((plan, index) => {
            const IconComponent = iconMap[plan.icon as keyof typeof iconMap]
            const isPopular = plan.popular

            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="relative"
              >
                {/* Popular Ribbon */}
                {isPopular && plan.ribbon && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-gold to-gold/80 text-dark px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {plan.ribbon}
                    </div>
                  </div>
                )}

                <Card
                  className={`
                  relative h-full border-2 transition-all duration-500 group bg-dark/80 backdrop-blur-sm
                  ${isPopular ? "border-gold/60 shadow-2xl shadow-gold/20" : "border-cream/20 hover:border-gold/50"}
                  hover:shadow-2xl hover:shadow-gold/30 hover:border-gold/80
                  rounded-2xl overflow-hidden
                `}
                >
                  {/* Glow Effect */}
                  <div
                    className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-gradient-to-br from-gold/5 to-transparent rounded-2xl
                  `}
                  />

                  <CardContent className="p-8 relative z-10 h-full flex flex-col">
                    {/* Icon & Title */}
                    <div className="text-center mb-6">
                      <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-4 group-hover:bg-gold/30 transition-colors duration-300"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className="h-8 w-8 text-gold" />
                      </motion.div>

                      <h3 className="font-dancing text-3xl text-cream mb-2">{plan.name}</h3>

                      <div className="text-2xl font-bold text-cream mb-2">{plan.price}</div>

                      <p className="text-cream/70 text-sm leading-relaxed">{plan.description}</p>
                    </div>

                    {/* Features */}
                    <div className="flex-1 mb-8">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className="flex items-start gap-3 text-cream/90 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: featureIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Check className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handlePlanSelect(plan)}
                      className={`
                        w-full py-4 text-base font-semibold rounded-xl transition-all duration-300
                        ${
                          isPopular
                            ? "bg-gradient-to-r from-gold to-gold/80 text-dark hover:from-gold/90 hover:to-gold/70 shadow-lg hover:shadow-xl hover:shadow-gold/30"
                            : "bg-gradient-to-r from-gold/80 to-gold/60 text-dark hover:from-gold hover:to-gold/80 hover:shadow-lg hover:shadow-gold/20"
                        }
                        hover:scale-105 active:scale-95
                      `}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Guarantees */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-cream/70 text-sm">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-gold" />
              <span>Sin compromisos</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-gold" />
              <span>Cancela cuando quieras</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-gold" />
              <span>Garantía de satisfacción</span>
            </div>
          </div>

          <p className="text-cream/60 text-xs max-w-2xl mx-auto">
            Todos nuestros planes incluyen envío gratuito a toda Costa Rica. Puedes cambiar o pausar tu suscripción en
            cualquier momento.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
