"use client"

import { usePersona } from "@/components/persona-provider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqData = {
  user: [
    {
      question: "¿Cómo funciona la personalización?",
      answer:
        "Al suscribirte, completás un perfil detallado sobre tu tipo de piel, preferencias y necesidades. Nuestro equipo usa esta información para curar productos específicamente para vos cada mes.",
    },
    {
      question: "¿Puedo cancelar en cualquier momento?",
      answer:
        "Sí, podés cancelar tu suscripción en cualquier momento sin penalidades. Tu cancelación será efectiva al final del período de facturación actual.",
    },
    {
      question: "¿Cuándo llega mi caja?",
      answer:
        "Las cajas se envían durante la primera semana de cada mes. El tiempo de entrega en Costa Rica es de 2-3 días hábiles.",
    },
    {
      question: "¿Qué pasa si no me gusta un producto?",
      answer:
        "Queremos que estés 100% satisfecha. Si algún producto no te funciona, contactanos y te ayudaremos a encontrar una alternativa mejor para tu próxima caja.",
    },
  ],
  provider: [
    {
      question: "¿Cuáles son los requisitos para ser proveedora?",
      answer:
        "Buscamos profesionales con experiencia en servicios de belleza, certificaciones relevantes, y pasión por brindar experiencias excepcionales. El proceso incluye una entrevista y verificación de credenciales.",
    },
    {
      question: "¿Cómo funciona el sistema de pagos?",
      answer:
        "Los pagos se procesan automáticamente después de cada servicio. Recibís tus ganancias quincenalmente directamente en tu cuenta bancaria.",
    },
    {
      question: "¿Hay algún costo para unirme?",
      answer:
        "No hay costo de inscripción. Solo cobramos una comisión pequeña por cada servicio reservado a través de la plataforma.",
    },
  ],
  brand: [
    {
      question: "¿Qué tipo de marcas buscan?",
      answer:
        "Buscamos marcas de belleza premium que compartan nuestros valores de calidad, sostenibilidad y autenticidad. Tanto marcas establecidas como emergentes son bienvenidas.",
    },
    {
      question: "¿Cómo funciona la distribución?",
      answer:
        "Trabajamos contigo para incluir tus productos en nuestras cajas mensuales. Manejamos la logística, distribución y feedback de las usuarias.",
    },
    {
      question: "¿Cuál es el volumen mínimo?",
      answer:
        "El volumen depende del plan de distribución que elijás. Podemos empezar con cantidades pequeñas para probar el mercado y escalar según la demanda.",
    },
  ],
}

export function FAQ() {
  const { persona } = usePersona()
  const faqs = faqData[persona]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-font text-4xl md:text-5xl font-bold mb-4">Preguntas frecuentes</h2>
          <p className="text-xl text-[hsl(var(--brand-cream))]/80">Todo lo que necesitás saber</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card px-6 border-none data-[state=open]:ring-1 data-[state=open]:ring-[hsl(var(--brand-gold))]/30"
              >
                <AccordionTrigger className="text-left text-[hsl(var(--brand-cream))] hover:text-[hsl(var(--brand-gold))] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[hsl(var(--brand-cream))]/70 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
