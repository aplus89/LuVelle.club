"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PlanCard } from "@/components/ui/plan-card"
import { CategoryCard } from "@/components/ui/category-card"
import { ProductCard } from "@/components/ui/product-card"
import { NotificationModal } from "@/components/ui/notification-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { PLANS, CATEGORIES, PRODUCTS, SERVICES, calcularPrecioFinal } from "@/lib/constants"
import { Plus, Info, ChevronRight, ArrowLeft, Sparkles, Package, Crown, Lightbulb } from "lucide-react"

interface BoxConfiguration {
  name: string
  selectedPlan: string
  categories: string[]
  selectedProducts: { [key: string]: number } // productId: quantity
  selectedServices: { [key: string]: number } // serviceId: quantity
  referralCode: string
}

export default function TheBeautyBoxPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast, dismiss } = useToast()
  const continueButtonRef = useRef<HTMLButtonElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [config, setConfig] = useState<BoxConfiguration>({
    name: "",
    selectedPlan: searchParams.get("plan") || "", // Pre-select plan from URL
    categories: [],
    selectedProducts: {},
    selectedServices: {},
    referralCode: "",
  })
  const [notificationModal, setNotificationModal] = useState<{
    isOpen: boolean
    categoryName: string
    categoryIcon: string
  }>({
    isOpen: false,
    categoryName: "",
    categoryIcon: "",
  })

  const totalSteps = 5 // 5 pasos: nombre, plan, categorías, productos/servicios, resumen

  // Calcular precios en tiempo real
  const calculateCurrentPricing = () => {
    const productsCost = Object.entries(config.selectedProducts).reduce((total, [productId, quantity]) => {
      const allProducts = getAllProducts()
      const product = allProducts.find((p) => p.id === productId)
      return total + (product?.price || 0) * quantity
    }, 0)

    const servicesCost = Object.entries(config.selectedServices).reduce((total, [serviceId, quantity]) => {
      const service = SERVICES.find((s) => s.id === serviceId)
      return total + (service?.price || 0) * quantity
    }, 0)

    const totalProductsCost = productsCost + servicesCost
    return calcularPrecioFinal(totalProductsCost)
  }

  const pricing = calculateCurrentPricing()

  // Check if current step can proceed
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return config.name.trim() !== ""
      case 1:
        return config.selectedPlan !== ""
      case 2:
        return config.categories.length > 0
      case 3:
        return Object.keys(config.selectedProducts).length > 0 || Object.keys(config.selectedServices).length > 0
      case 4:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Navigate to checkout
      const searchParams = new URLSearchParams({
        name: config.name,
        selectedPlan: config.selectedPlan,
        categories: config.categories.join(","),
        selectedProducts: JSON.stringify(config.selectedProducts),
        selectedServices: JSON.stringify(config.selectedServices),
        referralCode: config.referralCode,
        finalPrice: pricing.precioFinal.toString(),
        planAchieved: pricing.planAlcanzado,
      })
      router.push(`/checkout?${searchParams.toString()}`)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (step: number) => {
    if (step <= currentStep || canProceed()) {
      setCurrentStep(step)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && config.name.trim() !== "") {
      handleNext()
    }
  }

  const handleNotifyClick = (categoryName: string, categoryIcon: string) => {
    setNotificationModal({
      isOpen: true,
      categoryName,
      categoryIcon,
    })
  }

  const handlePlanSelect = (planId: string) => {
    setConfig((prev) => ({ ...prev, selectedPlan: planId }))
    // Auto-advance to next step after a short delay for visual feedback
    setTimeout(() => {
      setCurrentStep(2) // Go to categories
    }, 300)
  }

  const handleCategorySelect = (categoryId: string) => {
    const category = CATEGORIES.find((c) => c.id === categoryId)
    if (!category?.available) return

    setConfig((prev) => {
      const newCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId]

      // Reset selected products when categories change
      const validProducts: { [key: string]: number } = {}
      Object.entries(prev.selectedProducts).forEach(([productId, quantity]) => {
        const allProducts = getAllProducts()
        const product = allProducts.find((p) => p.id === productId)
        if (
          product &&
          newCategories.some((catId) => {
            const categoryProducts = PRODUCTS[catId as keyof typeof PRODUCTS] || []
            return categoryProducts.some((p) => p.id === productId)
          })
        ) {
          validProducts[productId] = quantity
        }
      })

      return {
        ...prev,
        categories: newCategories,
        selectedProducts: validProducts,
      }
    })
  }

  const handleProductSelect = (productId: string) => {
    setConfig((prev) => {
      const currentQuantity = prev.selectedProducts[productId] || 0
      const newProducts = { ...prev.selectedProducts }

      if (currentQuantity > 0) {
        delete newProducts[productId]
      } else {
        newProducts[productId] = 1
      }

      return {
        ...prev,
        selectedProducts: newProducts,
      }
    })
  }

  const handleProductQuantityChange = (productId: string, quantity: number) => {
    setConfig((prev) => {
      const newProducts = { ...prev.selectedProducts }

      if (quantity <= 0) {
        delete newProducts[productId]
      } else {
        newProducts[productId] = quantity
      }

      return {
        ...prev,
        selectedProducts: newProducts,
      }
    })
  }

  const handleServiceSelect = (serviceId: string) => {
    setConfig((prev) => {
      const currentQuantity = prev.selectedServices[serviceId] || 0
      const newServices = { ...prev.selectedServices }

      if (currentQuantity > 0) {
        delete newServices[serviceId]
      } else {
        newServices[serviceId] = 1
      }

      return {
        ...prev,
        selectedServices: newServices,
      }
    })
  }

  const handleServiceQuantityChange = (serviceId: string, quantity: number) => {
    setConfig((prev) => {
      const newServices = { ...prev.selectedServices }

      if (quantity <= 0) {
        delete newServices[serviceId]
      } else {
        newServices[serviceId] = quantity
      }

      return {
        ...prev,
        selectedServices: newServices,
      }
    })
  }

  const getAllProducts = () => {
    const products: Array<{
      id: string
      name: string
      brand: string
      description: string
      image: string
      price: number
      available: boolean
      category: string
    }> = []

    config.categories.forEach((categoryId) => {
      const categoryProducts = PRODUCTS[categoryId as keyof typeof PRODUCTS] || []
      categoryProducts.forEach((product) => {
        products.push({
          ...product,
          category: categoryId,
        })
      })
    })

    return products
  }

  const getAvailableServices = () => {
    return SERVICES.filter((service) => service.available)
  }

  // Auto-scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentStep])

  // If plan is pre-selected from URL, skip to step 1 (plan selection) to show confirmation
  useEffect(() => {
    if (searchParams.get("plan") && config.name === "") {
      // If coming from homepage with plan selected, start at step 0 to get name first
      setCurrentStep(0)
    }
  }, [searchParams, config.name])

  const progress = ((currentStep + 1) / totalSteps) * 100

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="mb-8">
              <h2 className="font-dancing text-3xl text-gold mb-4">
                ¡Hola! Diseñemos juntas tu experiencia LuVelle 🌸
              </h2>
              <p className="text-cream/80">Comencemos conociendo tu nombre para personalizar tu experiencia</p>
              {config.selectedPlan && (
                <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-beige/20 text-gold px-4 py-2 rounded-full border border-gold/30">
                  <Crown className="h-4 w-4" />
                  <span className="font-medium">
                    Plan {PLANS[config.selectedPlan as keyof typeof PLANS]?.name} preseleccionado
                  </span>
                </div>
              )}
            </div>

            <div className="max-w-md mx-auto">
              <Label htmlFor="name" className="text-cream mb-2 block">
                ¿Cómo te llamas?
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={config.name}
                onChange={(e) => setConfig((prev) => ({ ...prev, name: e.target.value }))}
                onKeyDown={handleKeyDown}
                className="bg-dark border-gold/20 text-cream placeholder:text-cream/50"
              />
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-dancing text-3xl text-gold mb-2">Elegí tu plan</h2>
              <div className="font-playfair text-4xl text-cream mb-6">{config.name}</div>
              <p className="text-cream/80 mb-6">
                Cada plan representa un rango de valor. Selecciona el que mejor se adapte a tu presupuesto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(PLANS).map((plan, index) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isSelected={config.selectedPlan === plan.id}
                  onSelect={() => handlePlanSelect(plan.id)}
                  isPopular={index === 1}
                  hideButton={true}
                />
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-cream/60 flex items-center justify-center gap-2">
                <Info className="h-4 w-4" />
                Tu plan final se ajustará automáticamente según los productos que elijas
              </p>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-dancing text-3xl text-gold mb-2">Elegí tus categorías</h2>
              <div className="font-playfair text-2xl text-cream mb-4">{config.name}</div>
              <p className="text-cream/80 mb-4">Selecciona todas las categorías que te interesan, sin límites</p>
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-gold/20 to-beige/20 text-gold px-4 py-2 rounded-full border border-gold/30">
                  <span className="font-medium">{config.categories.length} categorías seleccionadas</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {CATEGORIES.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  isSelected={config.categories.includes(category.id)}
                  onSelect={() => handleCategorySelect(category.id)}
                  onNotify={() => handleNotifyClick(category.name, category.icon)}
                />
              ))}
            </div>
          </div>
        )

      case 3:
        const availableProducts = getAllProducts()
        const availableServices = getAvailableServices()

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-dancing text-3xl text-gold mb-2">Seleccioná productos y servicios</h2>
              <div className="font-playfair text-2xl text-cream mb-4">{config.name}</div>
              <p className="text-cream/80 mb-4">
                Selecciona los productos y servicios que más te gusten para tu Beauty Box.
              </p>
            </div>

            {config.categories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-cream/60">Primero selecciona algunas categorías en el paso anterior</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Products Section */}
                {availableProducts.length > 0 && (
                  <div>
                    <h3 className="font-playfair text-xl font-medium text-cream mb-6 flex items-center gap-3">
                      <Package className="h-6 w-6 text-gold" />
                      Productos disponibles
                    </h3>

                    {config.categories.map((categoryId) => {
                      const category = CATEGORIES.find((c) => c.id === categoryId)
                      const categoryProducts = PRODUCTS[categoryId as keyof typeof PRODUCTS] || []

                      if (categoryProducts.length === 0) return null

                      return (
                        <div
                          key={categoryId}
                          className="bg-gradient-to-br from-dark via-dark/95 to-blue/20 rounded-2xl p-6 border border-gold/20 mb-6"
                        >
                          <h4 className="font-playfair text-lg font-medium text-cream mb-4 flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center border border-gold/30">
                              <span className="text-lg">{category?.icon}</span>
                            </div>
                            {category?.name}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {categoryProducts.map((product) => (
                              <ProductCard
                                key={product.id}
                                product={product}
                                isSelected={(config.selectedProducts[product.id] || 0) > 0}
                                quantity={config.selectedProducts[product.id] || 0}
                                onSelect={() => handleProductSelect(product.id)}
                                onQuantityChange={(quantity) => handleProductQuantityChange(product.id, quantity)}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Services Section */}
                {availableServices.length > 0 && (
                  <div className="bg-gradient-to-br from-dark via-dark/95 to-blue/20 rounded-2xl p-6 border border-gold/20">
                    <h3 className="font-playfair text-xl font-medium text-cream mb-6 flex items-center gap-3">
                      <Sparkles className="h-6 w-6 text-gold" />
                      Servicios disponibles
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availableServices.map((service) => (
                        <Card
                          key={service.id}
                          className={`cursor-pointer transition-all duration-300 hover-lift ${
                            (config.selectedServices[service.id] || 0) > 0
                              ? "ring-2 ring-gold bg-beige border-gold shadow-lg shadow-gold/25"
                              : "border-gold bg-dark hover:border-gold/80 hover:shadow-lg hover:shadow-gold/10"
                          }`}
                          onClick={() => handleServiceSelect(service.id)}
                        >
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <h4
                                className={`font-medium ${(config.selectedServices[service.id] || 0) > 0 ? "text-dark" : "text-cream"}`}
                              >
                                {service.name}
                              </h4>
                              <p
                                className={`text-sm ${(config.selectedServices[service.id] || 0) > 0 ? "text-dark/70" : "text-gold/80"}`}
                              >
                                {service.provider}
                              </p>
                              <p
                                className={`text-xs ${(config.selectedServices[service.id] || 0) > 0 ? "text-dark/60" : "text-cream/70"}`}
                              >
                                {service.description}
                              </p>
                              <p
                                className={`text-sm font-bold ${(config.selectedServices[service.id] || 0) > 0 ? "text-dark" : "text-gold"}`}
                              >
                                ₡{service.price.toLocaleString()}
                              </p>
                            </div>

                            {(config.selectedServices[service.id] || 0) > 0 && (
                              <div className="mt-3 flex items-center justify-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleServiceQuantityChange(
                                      service.id,
                                      Math.max(0, (config.selectedServices[service.id] || 0) - 1),
                                    )
                                  }}
                                  className="w-8 h-8 p-0 border-dark/30 text-dark hover:bg-dark/10"
                                >
                                  <Plus className="h-3 w-3 rotate-45" />
                                </Button>
                                <span className="text-dark font-medium w-8 text-center">
                                  {config.selectedServices[service.id]}
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleServiceQuantityChange(
                                      service.id,
                                      (config.selectedServices[service.id] || 0) + 1,
                                    )
                                  }}
                                  className="w-8 h-8 p-0 border-dark/30 text-dark hover:bg-dark/10"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Warnings */}
            {pricing.utilidad < 5000 &&
              (Object.keys(config.selectedProducts).length > 0 || Object.keys(config.selectedServices).length > 0) && (
                <div className="max-w-2xl mx-auto">
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-yellow-100 font-medium">💡 Tu caja tiene un margen bajo</p>
                      <p className="text-yellow-200/80 text-sm mt-1">
                        Considerá agregar más productos o cambiar de nivel para una mejor experiencia.
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </div>
        )

      case 4:
        const selectedProductsList = Object.entries(config.selectedProducts)
          .map(([productId, quantity]) => {
            const allProducts = getAllProducts()
            const product = allProducts.find((p) => p.id === productId)
            return product ? { ...product, quantity } : null
          })
          .filter(Boolean)

        const selectedServicesList = Object.entries(config.selectedServices)
          .map(([serviceId, quantity]) => {
            const service = SERVICES.find((s) => s.id === serviceId)
            return service ? { ...service, quantity } : null
          })
          .filter(Boolean)

        const finalPlan = Object.values(PLANS).find((plan) => plan.id === pricing.planAlcanzado)

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-dancing text-3xl text-gold mb-2">Tu Beauty Box personalizada</h2>
              <div className="font-playfair text-2xl text-cream mb-4">{config.name}</div>
              <p className="text-cream/80">Revisa tu configuración y personaliza aún más tu experiencia</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              {/* Plan Summary */}
              <Card className="border-gold/20 bg-dark">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    Plan {finalPlan?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-cream">Precio final</span>
                    <span className="text-cream font-semibold">₡{pricing.precioFinal.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-cream/80 mt-2">{finalPlan?.description}</div>

                  <div className="space-y-2 mt-4">
                    <p className="text-sm text-cream/80">Categorías seleccionadas:</p>
                    <div className="flex flex-wrap gap-2">
                      {config.categories.map((categoryId) => {
                        const category = CATEGORIES.find((c) => c.id === categoryId)
                        return (
                          <span key={categoryId} className="text-xs bg-gold/10 text-cream px-2 py-1 rounded-full">
                            {category?.icon} {category?.name}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Products */}
              {selectedProductsList.length > 0 && (
                <Card className="border-gold/20 bg-dark">
                  <CardHeader>
                    <CardTitle className="text-cream flex items-center justify-between">
                      <span>Productos seleccionados</span>
                      <span className="text-sm bg-gold/20 text-gold px-2 py-1 rounded-full">
                        {selectedProductsList.length} productos
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedProductsList.map((product) => (
                        <div key={product!.id} className="flex items-center justify-between p-3 bg-dark/60 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <img
                              src={product!.image || "/placeholder.svg"}
                              alt={product!.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="text-sm font-medium text-cream">{product!.name}</p>
                              <p className="text-xs text-gold/80">{product!.brand}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-cream">Cantidad: {product!.quantity}</p>
                            <p className="text-xs text-gold">
                              ₡{(product!.price * product!.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Selected Services */}
              {selectedServicesList.length > 0 && (
                <Card className="border-gold/20 bg-dark">
                  <CardHeader>
                    <CardTitle className="text-cream flex items-center justify-between">
                      <span>Servicios seleccionados</span>
                      <span className="text-sm bg-gold/20 text-gold px-2 py-1 rounded-full">
                        {selectedServicesList.length} servicios
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedServicesList.map((service) => (
                        <div key={service!.id} className="flex items-center justify-between p-3 bg-dark/60 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-cream">{service!.name}</p>
                            <p className="text-xs text-gold/80">{service!.provider}</p>
                            <p className="text-xs text-cream/70">{service!.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-cream">Cantidad: {service!.quantity}</p>
                            <p className="text-xs text-gold">
                              ₡{(service!.price * service!.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Referral Code */}
              <Card className="border-gold/20 bg-dark">
                <CardHeader>
                  <CardTitle className="text-cream">Programa de referidos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="referralCode" className="text-cream/80">
                      ¿Tienes un código de referido?
                    </Label>
                    <Input
                      id="referralCode"
                      type="text"
                      placeholder="Ingresa el código que te compartieron"
                      value={config.referralCode}
                      onChange={(e) => setConfig((prev) => ({ ...prev, referralCode: e.target.value }))}
                      className="bg-dark/60 border-gold/20 text-cream placeholder:text-cream/50"
                    />
                    <p className="text-xs text-cream/60">
                      Si alguien te compartió un código, ingrésalo aquí para que reciba su cashback.
                    </p>
                  </div>

                  {finalPlan?.cashback && (
                    <div className="border-t border-gold/20 pt-4">
                      <div className="bg-gradient-to-r from-gold/10 to-beige/10 border border-gold/20 rounded-lg p-3">
                        <p className="text-gold font-medium text-sm">
                          🎁 Con tu plan {finalPlan.name}, ganarás {finalPlan.cashback}% de cashback por cada referida
                          {finalPlan.id === "deluxe" && " que compre caja Deluxe de +₡60.000"}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Pricing Breakdown */}
              <Card className="border-gold/20 bg-gold/10">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-cream/70">
                      <span>Costo productos:</span>
                      <span>₡{(pricing.costoTotal - 8000).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-cream/70">
                      <span>Caja + Envío:</span>
                      <span>₡8.000</span>
                    </div>
                    <div className="flex justify-between text-sm text-cream/70">
                      <span>Margen aplicado:</span>
                      <span>{(pricing.margen * 100).toFixed(0)}%</span>
                    </div>
                    <div className="border-t border-gold/20 pt-3">
                      <div className="flex justify-between items-center text-lg">
                        <span className="text-cream font-semibold">Total mensual:</span>
                        <span className="text-gold font-bold">₡{pricing.precioFinal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-cream/60">
              Paso {currentStep + 1} de {totalSteps}
            </span>
            <span className="text-sm text-cream/60">{Math.round(progress)}% completado</span>
          </div>
          <div className="w-full bg-dark-lighter rounded-full h-2">
            <div
              className="gradient-gold h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <button
                key={i}
                onClick={() => handleStepClick(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i <= currentStep ? "bg-gold" : "bg-cream/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[400px] mb-8">{renderStep()}</div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="text-cream hover:text-gold hover:bg-gold/10 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {/* Only show Continue button for steps that need it (not plan selection) */}
          {currentStep !== 1 && (
            <Button
              ref={continueButtonRef}
              onClick={handleNext}
              disabled={!canProceed()}
              className="gradient-gold text-dark font-semibold hover:opacity-90 transition-opacity"
            >
              {currentStep === totalSteps - 1 ? "Ir al checkout" : "Continuar"}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={notificationModal.isOpen}
        onClose={() => setNotificationModal({ isOpen: false, categoryName: "", categoryIcon: "" })}
        categoryName={notificationModal.categoryName}
        categoryIcon={notificationModal.categoryIcon}
      />

      {/* Toast notifications */}
      <Toaster />
    </div>
  )
}
