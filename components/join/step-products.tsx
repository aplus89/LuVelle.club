"use client"

import { useEffect, useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import type { Product, Service } from "@/lib/supabase/types"
import type { WizardState } from "./join-wizard"
import { cn } from "@/lib/utils"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { LoadingPlaceholder } from "@/components/loading-placeholder"

interface StepProductsProps {
  state: WizardState
  updateState: (updates: Partial<WizardState>) => void
  onNext: () => void
  onPrev: () => void
}

export function StepProducts({ state, updateState, onNext, onPrev }: StepProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const maxProducts = state.selectedPlan?.max_products || 0
  const maxServices = state.selectedPlan?.max_services || 0
  const allowsServices = state.selectedPlan?.allows_service_customization || false

  useEffect(() => {
    loadProductsAndServices()
  }, [state.selectedCategories])

  const loadProductsAndServices = async () => {
    if (state.selectedCategories.length === 0) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(false)

    try {
      const supabase = getSupabaseBrowserClient()

      // Load products
      const planType = state.selectedPlan?.slug === "premium" ? "Premium" : "Deluxe"
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .in("category_id", state.selectedCategories)
        .contains("available_in", [planType])
        .eq("is_active", true)

      if (productsError) throw productsError
      setProducts(productsData || [])

      // Load services if Deluxe plan
      if (allowsServices) {
        const { data: servicesData, error: servicesError } = await supabase
          .from("services")
          .select("*")
          .in("category_id", state.selectedCategories)
          .eq("is_active", true)

        if (servicesError) throw servicesError
        setServices(servicesData || [])
      }
    } catch (err) {
      console.error("[v0] Error loading products/services:", err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleProduct = (productId: string) => {
    const isSelected = state.selectedProducts.includes(productId)
    const newProducts = isSelected
      ? state.selectedProducts.filter((id) => id !== productId)
      : state.selectedProducts.length < maxProducts
        ? [...state.selectedProducts, productId]
        : state.selectedProducts

    updateState({ selectedProducts: newProducts })
  }

  const handleToggleService = (serviceId: string) => {
    const isSelected = state.selectedServices.includes(serviceId)
    const newServices = isSelected
      ? state.selectedServices.filter((id) => id !== serviceId)
      : state.selectedServices.length < maxServices
        ? [...state.selectedServices, serviceId]
        : state.selectedServices

    updateState({ selectedServices: newServices })
  }

  const handleContinue = () => {
    if (state.selectedProducts.length > 0 || state.selectedServices.length > 0) {
      onNext()
    }
  }

  const totalEstimate =
    products.filter((p) => state.selectedProducts.includes(p.id)).reduce((sum, p) => sum + Number(p.price_crc), 0) +
    services.filter((s) => state.selectedServices.includes(s.id)).reduce((sum, s) => sum + Number(s.price_crc), 0)

  if (loading) {
    return <LoadingPlaceholder message="Cargando productos..." />
  }

  if (error) {
    return <LoadingPlaceholder message="Error al cargar productos" onRetry={loadProductsAndServices} />
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[hsl(var(--brand-cream))] mb-2">Personalizá tu caja</h2>
        <p className="text-[hsl(var(--brand-cream))]/70">
          Seleccioná hasta {maxProducts} productos
          {allowsServices && ` y ${maxServices} servicios`}
        </p>
      </div>

      {/* Products */}
      {products.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-[hsl(var(--brand-cream))] mb-4">
            Productos ({state.selectedProducts.length}/{maxProducts})
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => {
              const isSelected = state.selectedProducts.includes(product.id)
              const canSelect = state.selectedProducts.length < maxProducts || isSelected

              return (
                <GlassCard
                  key={product.id}
                  className={cn(
                    "p-4 transition-all relative",
                    canSelect && "cursor-pointer",
                    isSelected && "ring-2 ring-[hsl(var(--brand-gold))]",
                    !canSelect && "opacity-50",
                  )}
                  onClick={() => canSelect && handleToggleProduct(product.id)}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 rounded-full bg-[hsl(var(--brand-gold))] flex items-center justify-center">
                        <Check className="w-4 h-4 text-[hsl(var(--brand-dark))]" />
                      </div>
                    </div>
                  )}

                  {product.image_url && (
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}

                  <h4 className="font-semibold text-[hsl(var(--brand-cream))] mb-1">{product.name}</h4>
                  <p className="text-sm text-[hsl(var(--brand-gold))]">₡{product.price_crc.toLocaleString()}</p>
                  {product.description && (
                    <p className="text-xs text-[hsl(var(--brand-cream))]/60 mt-2">{product.description}</p>
                  )}
                </GlassCard>
              )
            })}
          </div>
        </div>
      )}

      {/* Services */}
      {allowsServices && services.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-[hsl(var(--brand-cream))] mb-4">
            Servicios ({state.selectedServices.length}/{maxServices})
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((service) => {
              const isSelected = state.selectedServices.includes(service.id)
              const canSelect = state.selectedServices.length < maxServices || isSelected

              return (
                <GlassCard
                  key={service.id}
                  className={cn(
                    "p-4 transition-all relative",
                    canSelect && "cursor-pointer",
                    isSelected && "ring-2 ring-[hsl(var(--brand-gold))]",
                    !canSelect && "opacity-50",
                  )}
                  onClick={() => canSelect && handleToggleService(service.id)}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 rounded-full bg-[hsl(var(--brand-gold))] flex items-center justify-center">
                        <Check className="w-4 h-4 text-[hsl(var(--brand-dark))]" />
                      </div>
                    </div>
                  )}

                  {service.image_url && (
                    <img
                      src={service.image_url || "/placeholder.svg"}
                      alt={service.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}

                  <h4 className="font-semibold text-[hsl(var(--brand-cream))] mb-1">{service.name}</h4>
                  <p className="text-sm text-[hsl(var(--brand-gold))]">₡{service.price_crc.toLocaleString()}</p>
                  {service.description && (
                    <p className="text-xs text-[hsl(var(--brand-cream))]/60 mt-2">{service.description}</p>
                  )}
                </GlassCard>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {products.length === 0 && services.length === 0 && (
        <GlassCard className="p-12 text-center">
          <p className="text-[hsl(var(--brand-cream))]/70 mb-4">
            No hay productos disponibles para las categorías seleccionadas.
          </p>
          <Button variant="outline" className="glass-button-outline bg-transparent" onClick={onPrev}>
            Volver a categorías
          </Button>
        </GlassCard>
      )}

      {/* Total Estimate */}
      {totalEstimate > 0 && (
        <GlassCard className="p-6">
          <div className="flex justify-between items-center">
            <span className="text-lg text-[hsl(var(--brand-cream))]">Valor estimado:</span>
            <span className="text-2xl font-bold text-[hsl(var(--brand-gold))]">₡{totalEstimate.toLocaleString()}</span>
          </div>
        </GlassCard>
      )}

      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline" className="glass-button-outline bg-transparent" size="lg">
          Atrás
        </Button>
        <Button
          onClick={handleContinue}
          disabled={state.selectedProducts.length === 0 && state.selectedServices.length === 0}
          className="glass-button"
          size="lg"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
