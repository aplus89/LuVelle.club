"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
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
import { PLANS, CATEGORIES, INTERESTS, PRODUCTS } from "@/lib/constants"
import {
  Plus,
  Info,
  ChevronRight,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Check,
  Heart,
  Star,
  ArrowUp,
  Gift,
} from "lucide-react"

interface BoxConfiguration {
  plan: string
  interest: string
  categories: string[]
  selectedProducts: string[]
  extraProducts: number
  extraServices: number
  referralCode: string
  name: string
  unlimitedSelection: boolean
}

export default function TheBeautyBoxPage() {
  const router = useRouter()
  const { toast, dismiss } = useToast()
  const continueButtonRef = useRef<HTMLButtonElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [config, setConfig] = useState<BoxConfiguration>({
    plan: "",
    interest: "",
    categories: [],
    selectedProducts: [],
    extraProducts: 0,
    extraServices: 0,
    referralCode: "",
    name: "",
    unlimitedSelection: false,
  })
  const [showAnnualPrices, setShowAnnualPrices] = useState(false)
  const [notificationModal, setNotificationModal] = useState<{
    isOpen: boolean
    categoryName: string
    categoryIcon: string
  }>({
    isOpen: false,
    categoryName: "",
    categoryIcon: "",
  })

  const totalSteps = 6 // Updated to 6 steps

  // Check if current step can proceed
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return config.name.trim() !== ""
      case 1:
        return config.plan !== ""
      case 2:
        // Skip interest step for Esencial plan
        if (config.plan === "esencial") return true
        return config.interest !== ""
      case 3:
        // Skip categories step for Esencial plan
        if (config.plan === "esencial") return true
        return config.categories.length > 0
      case 4: {
        // Product selection step - only for Premium/Deluxe
        if (config.plan === "esencial") return true // Skip for Esencial
        const plan = getSelectedPlan()
        if (!plan || plan.id === "esencial") return true
        return config.selectedProducts.length > 0
      }
      case 5:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      // Skip steps for Esencial plan
      if (config.plan === "esencial") {
        if (currentStep === 1) {
          // Skip interest, categories, and product selection for Esencial
          setCurrentStep(5) // Go directly to summary
        } else {
          setCurrentStep(currentStep + 1)
        }
      } else if (currentStep === 3 && config.plan === "esencial") {
        setCurrentStep(currentStep + 2) // Skip step 4 (product selection)
      } else {
        setCurrentStep(currentStep + 1)
      }
    } else {
      // Navigate to checkout
      const searchParams = new URLSearchParams({
        plan: config.plan,
        categories: config.categories.join(","),
        selectedProducts: config.selectedProducts.join(","),
        extraProducts: config.extraProducts.toString(),
        extraServices: config.extraServices.toString(),
        referralCode: config.referralCode,
        name: config.name,
      })
      router.push(`/checkout?${searchParams.toString()}`)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      // Handle back navigation for Esencial plan
      if (config.plan === "esencial") {
        if (currentStep === 5) {
          setCurrentStep(1) // Go back to plan selection
        } else {
          setCurrentStep(currentStep - 1)
        }
      } else if (currentStep === 5 && config.plan === "esencial") {
        setCurrentStep(currentStep - 2) // Skip step 4 (product selection)
      } else {
        setCurrentStep(currentStep - 1)
      }
    }
  }

  const handleStepClick = (step: number) => {
    // Don't allow skipping to steps that should be skipped for Esencial
    if (config.plan === "esencial" && (step === 2 || step === 3 || step === 4)) {
      return
    }

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

  // Modified plan selection to auto-advance
  const handlePlanSelect = (planId: string) => {
    // Capitalizar la primera letra del nombre
    const capitalizedName = config.name.charAt(0).toUpperCase() + config.name.slice(1)
    setConfig((prev) => ({ ...prev, plan: planId, name: capitalizedName }))

    // Auto-advance to next step after a short delay for visual feedback
    setTimeout(() => {
      if (planId === "esencial") {
        // Skip interest, categories, and product selection for Esencial
        setCurrentStep(5) // Go directly to summary
      } else {
        setCurrentStep(2) // Go to interest selection
      }
    }, 300)
  }

  const handleCategorySelect = (categoryId: string) => {
    const category = CATEGORIES.find((c) => c.id === categoryId)
    if (!category?.available) return

    // No hay límites en la selección de categorías para Premium y Deluxe
    setConfig((prev) => {
      const newCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId]

      // Reset selected products when categories change
      const validProducts = prev.selectedProducts.filter((productId) => {
        return newCategories.some((catId) => {
          const categoryProducts = PRODUCTS[catId as keyof typeof PRODUCTS] || []
          return categoryProducts.some((p) => p.id === productId)
        })
      })

      return {
        ...prev,
        categories: newCategories,
        selectedProducts: validProducts,
      }
    })
  }

  const handleProductSelect = (productId: string) => {
    const plan = getSelectedPlan()
    if (!plan) return

    // Get product details
    const allProducts = getAvailableProducts()
    const selectedProduct = allProducts.find((p) => p.id === productId)

    setConfig((prev) => {
      const isSelected = prev.selectedProducts.includes(productId)
      const maxProducts = plan?.maxProducts || 0

      if (isSelected) {
        // Remove product
        const newSelectedProducts = prev.selectedProducts.filter((id) => id !== productId)

        // Show toast when removing a product - using fixed ID to replace previous
        if (selectedProduct) {
          toast({
            id: "product-action", // Fixed ID to replace previous notifications
            title: "Producto eliminado",
            description: (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-400/30 to-red-300/20 rounded-lg flex items-center justify-center">
                    <span className="text-xs">❌</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{selectedProduct.name}</p>
                    <p className="text-xs opacity-80">{selectedProduct.brand}</p>
                  </div>
                </div>
                <p className="text-xs">
                  Ahora puedes seleccionar {maxProducts - newSelectedProducts.length} producto(s) más dentro de tu plan.
                </p>
              </div>
            ),
            variant: "elegant",
            duration: 3000,
          })
        }

        return {
          ...prev,
          selectedProducts: newSelectedProducts,
        }
      } else {
        // Add product
        const newSelectedProducts = [...prev.selectedProducts, productId]
        const remaining = Math.max(0, maxProducts - newSelectedProducts.length)

        // Show toast when adding a product - using fixed ID to replace previous
        if (selectedProduct) {
          if (newSelectedProducts.length <= maxProducts) {
            // Product added within plan limits
            toast({
              id: "product-action", // Fixed ID to replace previous notifications
              title: "¡Producto agregado!",
              description: (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-gold/30 to-gold/20 rounded-lg flex items-center justify-center">
                      <Heart className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{selectedProduct.name}</p>
                      <p className="text-xs opacity-80">{selectedProduct.brand}</p>
                    </div>
                  </div>
                  {remaining > 0 ? (
                    <p className="text-xs flex items-center gap-1">
                      <Star className="h-3 w-3 text-gold" />
                      Te faltan {remaining} producto{remaining !== 1 ? "s" : ""} para completar tu plan {plan.name}
                    </p>
                  ) : (
                    <p className="text-xs flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-gold" />
                      ¡Has completado tu plan {plan.name}!
                    </p>
                  )}
                </div>
              ),
              variant: "elegant",
              duration: 3000,
            })
          } else if (prev.unlimitedSelection) {
            // Product added as extra - using fixed ID to replace previous
            toast({
              id: "product-action", // Fixed ID to replace previous notifications
              title: "Producto adicional agregado",
              description: (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-gold/40 to-gold/30 rounded-lg flex items-center justify-center">
                      <Plus className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{selectedProduct.name}</p>
                      <p className="text-xs opacity-80">{selectedProduct.brand}</p>
                    </div>
                  </div>
                  <p className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-lg">+$5.00 - Solo para este mes</p>
                </div>
              ),
              variant: "gold",
              duration: 3000,
            })
          }
        }

        // If we're at the limit and not in unlimited mode, show special toast with actions
        if (newSelectedProducts.length === maxProducts && !prev.unlimitedSelection) {
          // Dismiss the regular product notification first
          dismiss("product-action")

          setTimeout(() => {
            toast({
              id: "plan-limit", // Different ID for the special limit notification
              title: "¡Selección completa!",
              description: (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-gold/30 to-gold/20 rounded-lg flex items-center justify-center">
                      <Check className="h-4 w-4 text-gold" />
                    </div>
                    <p className="text-sm">
                      Has completado tu plan {plan.name} con {maxProducts} productos.
                    </p>
                  </div>
                  <p className="text-xs">¿Deseas agregar más productos con cargo adicional de $5 cada uno?</p>
                </div>
              ),
              variant: "elegant",
              duration: 10000, // Longer duration for this special notification
              action: (
                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={() => {
                      setConfig((c) => ({ ...c, unlimitedSelection: true }))
                      dismiss("plan-limit") // Dismiss this notification
                      toast({
                        id: "unlimited-enabled",
                        title: "¡Perfecto!",
                        description: (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-gold" />
                              <span className="text-sm font-medium">Selección ilimitada activada</span>
                            </div>
                            <p className="text-xs">
                              Ahora puedes agregar productos adicionales. Cada uno costará $5 extra.
                            </p>
                          </div>
                        ),
                        variant: "success",
                        duration: 4000,
                      })
                    }}
                    className="bg-gold text-dark hover:bg-gold/80 rounded-xl"
                    size="sm"
                  >
                    <Check className="mr-1 h-4 w-4" /> Sí, agregar más
                  </Button>
                  <Button
                    onClick={() => {
                      dismiss("plan-limit") // Dismiss this notification
                      // Scroll to continue button
                      if (continueButtonRef.current) {
                        continueButtonRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
                      }
                    }}
                    variant="outline"
                    size="sm"
                    className="border-gold/30 text-gold hover:bg-gold/10 rounded-xl"
                  >
                    No, continuar
                  </Button>
                </div>
              ),
            })
          }, 100)
        }

        return {
          ...prev,
          selectedProducts: newSelectedProducts,
        }
      }
    })
  }

  const getSelectedPlan = () => PLANS[config.plan as keyof typeof PLANS]
  const getSelectedCategories = () => CATEGORIES.filter((c) => config.categories.includes(c.id))

  const getAvailableProducts = () => {
    const products: Array<{
      id: string
      name: string
      brand: string
      description: string
      image: string
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

  const getSelectedProducts = () => {
    const allProducts = getAvailableProducts()
    return allProducts.filter((product) => config.selectedProducts.includes(product.id))
  }

  // Auto-scroll to continue button when selection is complete
  useEffect(() => {
    const plan = getSelectedPlan()
    if (!plan) return

    const maxProducts = plan?.maxProducts || 0

    if (config.selectedProducts.length === maxProducts && !config.unlimitedSelection) {
      setTimeout(() => {
        if (continueButtonRef.current) {
          continueButtonRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 500)
    }
  }, [config.selectedProducts, config.unlimitedSelection])

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
              <p className="text-cream/80">Cada plan está diseñado para diferentes necesidades y estilos de vida</p>

              <div className="flex items-center justify-center mt-4 mb-6">
                <span
                  className={`text-sm px-3 py-1 rounded-l-full ${!showAnnualPrices ? "bg-gold text-dark" : "bg-dark border border-gold/30 text-cream/70"}`}
                >
                  <button onClick={() => setShowAnnualPrices(false)} className="w-full h-full">
                    Mensual
                  </button>
                </span>
                <span
                  className={`text-sm px-3 py-1 rounded-r-full ${showAnnualPrices ? "bg-gold text-dark" : "bg-dark border border-gold/30 text-cream/70"}`}
                >
                  <button onClick={() => setShowAnnualPrices(true)} className="w-full h-full">
                    Anual (15% desc.)
                  </button>
                </span>
              </div>

              {showAnnualPrices && (
                <div className="text-sm text-gold/80 mb-4">
                  Referí 3 amigas Deluxe y tu siguiente compra podría salirte gratis 💛
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {Object.values(PLANS).map((plan, index) => {
                // Calcular precio anual con 15% de descuento
                const annualPrice = showAnnualPrices ? (plan.price * 12 * 0.85).toFixed(2) : plan.price

                // Crear una copia del plan con el precio modificado para mostrar
                const displayPlan = {
                  ...plan,
                  price: showAnnualPrices ? Number(annualPrice) : plan.price,
                  priceLabel: showAnnualPrices ? "/año" : "/mes",
                }

                return (
                  <PlanCard
                    key={plan.id}
                    plan={displayPlan}
                    isSelected={config.plan === plan.id}
                    onSelect={() => handlePlanSelect(plan.id)}
                    isPopular={index === 1}
                    hideButton={true}
                    showAnnual={showAnnualPrices}
                  />
                )
              })}
            </div>

            <div className="text-center">
              <p className="text-sm text-cream/60 flex items-center justify-center gap-2">
                <Info className="h-4 w-4" />
                ¿Solo querés una vez? Lo decidís más adelante
              </p>
            </div>
          </div>
        )

      case 2:
        // Skip this step for Esencial plan
        if (config.plan === "esencial") {
          return null
        }

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-dancing text-3xl text-gold mb-2">¿Qué te interesa más?</h2>
              <div className="font-playfair text-2xl text-cream mb-4">{config.name}</div>
              <p className="text-cream/80">Esto nos ayuda a personalizar mejor tu experiencia</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {INTERESTS.map((interest) => (
                <Card
                  key={interest.id}
                  className={`cursor-pointer transition-all duration-300 hover-lift ${
                    config.interest === interest.id
                      ? "ring-2 ring-gold bg-gold/10 border-gold"
                      : "border-gold/20 hover:border-gold/50"
                  }`}
                  onClick={() => setConfig((prev) => ({ ...prev, interest: interest.id }))}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{interest.icon}</div>
                    <h3 className="font-semibold text-cream">{interest.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 3:
        // Skip this step for Esencial plan
        if (config.plan === "esencial") {
          return null
        }

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-dancing text-3xl text-gold mb-2">Elegí tus categorías</h2>
              <div className="font-playfair text-2xl text-cream mb-4">{config.name}</div>
              <p className="text-cream/80 mb-4">Selecciona las categorías que más te interesan</p>
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-gold/20 to-beige/20 text-gold px-4 py-2 rounded-full border border-gold/30">
                  <span className="font-medium">{config.categories.length} categorías seleccionadas</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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

      case 4:
        // Product selection step - only for Premium/Deluxe
        if (config.plan === "esencial") {
          // This step should be skipped for Esencial
          return null
        }

        const plan = getSelectedPlan()
        if (!plan || plan.id === "esencial") {
          return null
        }

        const availableProducts = getAvailableProducts()
        const maxProducts = plan?.maxProducts || 0
        const selectedCount = config.selectedProducts.length

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-dancing text-3xl text-gold mb-2">Seleccioná tus productos</h2>
              <div className="font-playfair text-2xl text-cream mb-4">{config.name}</div>
              <p className="text-cream/80 mb-4">
                Elegí los productos que más te gusten de las categorías seleccionadas
              </p>
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-gold/20 to-beige/20 text-gold px-4 py-2 rounded-full border border-gold/30">
                  <span className="font-medium">
                    {selectedCount} de {config.unlimitedSelection ? `${maxProducts}+` : maxProducts} productos
                    seleccionados
                  </span>
                  {config.unlimitedSelection && selectedCount > maxProducts && (
                    <span className="ml-2 text-xs bg-gold/30 px-2 py-0.5 rounded-full">
                      {selectedCount - maxProducts} adicionales
                    </span>
                  )}
                </div>
              </div>
            </div>

            {selectedCount >= maxProducts && !config.unlimitedSelection && (
              <div className="max-w-2xl mx-auto mb-6">
                <div className="bg-gradient-to-r from-gold/10 to-beige/10 border border-gold/20 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                  <p className="text-cream/90 text-sm">
                    Has alcanzado el límite de productos incluidos en tu plan. Para incluir otro producto, primero
                    eliminá uno de tu Box o habilita la selección de productos adicionales.
                  </p>
                </div>
              </div>
            )}

            {config.unlimitedSelection && selectedCount > maxProducts && (
              <div className="max-w-2xl mx-auto mb-6">
                <div className="bg-gradient-to-r from-gold/20 to-beige/10 border border-gold/30 rounded-xl p-4 flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gold font-medium">Productos adicionales seleccionados</p>
                    <p className="text-cream/90 text-sm">
                      Has seleccionado {selectedCount - maxProducts} producto(s) adicional(es). Cada producto adicional
                      tendrá un costo extra de $5.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {config.categories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-cream/60">Primero selecciona algunas categorías en el paso anterior</p>
              </div>
            ) : availableProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-cream/60">No hay productos disponibles para las categorías seleccionadas</p>
              </div>
            ) : (
              <div className="space-y-8">
                {config.categories.map((categoryId) => {
                  const category = CATEGORIES.find((c) => c.id === categoryId)
                  const categoryProducts = PRODUCTS[categoryId as keyof typeof PRODUCTS] || []

                  if (categoryProducts.length === 0) return null

                  return (
                    <div
                      key={categoryId}
                      className="bg-gradient-to-br from-dark/40 to-blue/10 rounded-2xl p-6 border border-beige/20"
                    >
                      <h3 className="font-playfair text-xl font-medium text-cream mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center border border-gold/30">
                          <span className="text-xl">{category?.icon}</span>
                        </div>
                        {category?.name}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categoryProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            isSelected={config.selectedProducts.includes(product.id)}
                            onSelect={() => handleProductSelect(product.id)}
                            disabled={
                              !config.selectedProducts.includes(product.id) &&
                              selectedCount >= maxProducts &&
                              !config.unlimitedSelection
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )

      case 5:
        const finalPlan = getSelectedPlan()
        const selectedCategories = getSelectedCategories()
        const selectedProducts = getSelectedProducts()
        const basePrice = finalPlan?.price || 0
        const maxIncludedProducts = finalPlan?.maxProducts || 0
        const additionalProducts = Math.max(0, config.selectedProducts.length - maxIncludedProducts)
        const extraProductsPrice = (config.extraProducts + additionalProducts) * 5
        const extraServicesPrice = config.extraServices * 10
        const totalPrice = basePrice + extraProductsPrice + extraServicesPrice

        const planDescription =
          config.plan === "premium"
            ? "Caja mixta (2-3 productos + 1 servicio o sesión mensual)"
            : config.plan === "deluxe"
              ? "Caja personalizada completa (3+ productos + 2 servicios) + beneficios financieros + eventos exclusivos"
              : "Acceso a contenidos digitales y comunidad"

        // Special layout for Esencial plan
        if (config.plan === "esencial") {
          const premiumPlan = PLANS.premium
          const upgradePrice = +(premiumPlan.price - basePrice).toFixed(1) // Formato con un decimal

          return (
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center min-h-[600px]">
              {/* Right side - Content - Primero en móvil */}
              <div className="space-y-6 order-1 lg:order-2">
                <div className="text-center lg:text-left">
                  <h2 className="font-dancing text-3xl text-gold mb-2">¡Perfecto, {config.name}!</h2>
                  <p className="text-cream/80 mb-6">
                    Has elegido el plan Esencial. Tendrás acceso a contenidos digitales exclusivos y nuestra comunidad.
                  </p>
                </div>

                {/* Plan Summary */}
                <Card className="border-gold/20 bg-dark/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-gold">Plan Esencial</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-cream">Precio mensual</span>
                      <span className="text-cream font-semibold">${finalPlan?.price}/mes</span>
                    </div>
                    <div className="text-sm text-cream/80 mt-2">{planDescription}</div>

                    <div className="mt-4 p-3 bg-gold/5 rounded-lg border border-gold/10">
                      <p className="text-sm text-cream/90">
                        Incluye acceso a contenidos digitales, comunidad LuVelle, eventos online y descuentos
                        exclusivos.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Upgrade Suggestion */}
                <Card className="border-blue/30 bg-gradient-to-br from-dark/90 to-blue/20 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue/30 to-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Gift className="h-6 w-6 text-cream" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-cream mb-2 flex items-center gap-2">
                          ¿Querés crear tu propia Beauty Box?
                          <ArrowUp className="h-4 w-4 text-gold" />
                        </h3>
                        <p className="text-cream/90 text-sm mb-4">
                          Por solo <span className="font-bold text-gold">${upgradePrice} más al mes</span>, podés
                          actualizar al plan Premium y empezar a recibir productos personalizados mensualmente para
                          concentrarte en esos días especiales de autocuidado.
                        </p>
                        <div className="space-y-2 text-xs text-cream/80">
                          <div className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-gold" />
                            <span>2-3 productos personalizados + 1 servicio mensual</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-gold" />
                            <span>Selección de productos según tus preferencias</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-gold" />
                            <span>3% de cashback por cada referida</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            setConfig((prev) => ({ ...prev, plan: "premium" }))
                            setCurrentStep(2) // Go to interest selection for Premium
                          }}
                          className="mt-4 bg-gradient-to-r from-gold to-gold/80 text-dark hover:from-gold/90 hover:to-gold/70 font-semibold"
                          size="sm"
                        >
                          <ArrowUp className="mr-2 h-4 w-4" />
                          Actualizar a Premium
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Total */}
                <Card className="border-gold/20 bg-gold/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-cream font-semibold">Total mensual:</span>
                      <span className="text-gold font-bold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-cream/70 mt-2">
                      Sin compromisos • Cancela cuando quieras • Actualiza tu plan en cualquier momento
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Left side - Image - Segundo en móvil */}
              <div className="relative order-2 lg:order-1 mt-6 lg:mt-0">
                <div className="relative z-10">
                  <img
                    src="/images/beauty-box-woman.png"
                    alt="Mujer profesional con Beauty Box LuVelle"
                    className="w-full max-w-md mx-auto rounded-2xl shadow-2xl hover-lift"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-blue/20 rounded-2xl blur-3xl animate-pulse-slow" />
              </div>
            </div>
          )
        }

        // Regular layout for Premium/Deluxe plans
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-dancing text-3xl text-gold mb-2">Tu Plan LuVelle</h2>
              <div className="font-playfair text-2xl text-cream mb-4">{config.name}</div>
              <p className="text-cream/80">Revisa tu configuración y personaliza aún más tu experiencia</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              {/* Plan Summary */}
              <Card className="border-gold/20 bg-dark">
                <CardHeader>
                  <CardTitle className="text-gold">Plan {finalPlan?.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-cream">Precio base</span>
                    <span className="text-cream font-semibold">${finalPlan?.price}/mes</span>
                  </div>
                  <div className="text-sm text-cream/80 mt-2">{planDescription}</div>

                  {config.plan !== "esencial" && (
                    <div className="space-y-2 mt-4">
                      <p className="text-sm text-cream/80">Categorías seleccionadas:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCategories.map((category) => (
                          <span key={category.id} className="text-xs bg-gold/10 text-cream px-2 py-1 rounded-full">
                            {category.icon} {category.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Selected Products */}
              {config.plan !== "esencial" && selectedProducts.length > 0 && (
                <Card className="border-gold/20 bg-dark">
                  <CardHeader>
                    <CardTitle className="text-cream flex items-center justify-between">
                      <span>Productos seleccionados</span>
                      {additionalProducts > 0 && (
                        <span className="text-sm bg-gold/20 text-gold px-2 py-1 rounded-full">
                          {additionalProducts} adicionales
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedProducts.map((product, index) => (
                        <div
                          key={product.id}
                          className={`flex items-center space-x-3 p-2 rounded-lg ${
                            index >= maxIncludedProducts ? "bg-gold/10 border border-gold/30" : "bg-dark/60"
                          }`}
                        >
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-cream truncate">{product.name}</p>
                            <p className="text-xs text-gold/80">{product.brand}</p>
                            {index >= maxIncludedProducts && <p className="text-xs text-gold mt-1">+$5.00</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Extras */}
              {(config.plan === "premium" || config.plan === "deluxe") && (
                <Card className="border-gold/20 bg-dark">
                  <CardHeader>
                    <CardTitle className="text-cream flex items-center gap-2">
                      <Plus className="h-5 w-5 text-gold" />
                      Productos y servicios extras
                    </CardTitle>
                    <p className="text-sm text-cream/70 mt-2">
                      Los productos y servicios extras solo te llegarán este mes. A partir del próximo mes, recibirás
                      únicamente los productos base que seleccionaste.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Productos adicionales seleccionados en el paso 4 */}
                    {additionalProducts > 0 && (
                      <div className="bg-gradient-to-r from-gold/10 to-beige/10 border border-gold/20 rounded-lg p-4">
                        <h4 className="text-gold font-medium mb-3 flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          Productos adicionales seleccionados ({additionalProducts})
                        </h4>
                        <div className="grid grid-cols-1 gap-2 mb-3">
                          {selectedProducts.slice(maxIncludedProducts).map((product) => (
                            <div key={product.id} className="flex items-center justify-between text-sm">
                              <span className="text-cream/90">
                                {product.name} - {product.brand}
                              </span>
                              <span className="text-gold font-medium">+$5.00</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-cream/60">
                          Estos productos fueron seleccionados en el paso anterior y solo llegarán este mes.
                        </p>
                      </div>
                    )}

                    {/* Productos extra manuales */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-cream font-medium">Productos extra adicionales</span>
                          <p className="text-xs text-cream/60">$5 cada uno - Solo para este mes</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setConfig((prev) => ({
                                ...prev,
                                extraProducts: Math.max(0, prev.extraProducts - 1),
                              }))
                            }
                            className="border-gold/20 text-cream hover:border-gold hover:text-gold"
                          >
                            -
                          </Button>
                          <span className="text-cream w-8 text-center font-medium">{config.extraProducts}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setConfig((prev) => ({
                                ...prev,
                                extraProducts: prev.extraProducts + 1,
                              }))
                            }
                            className="border-gold/20 text-cream hover:border-gold hover:text-gold"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {config.plan === "deluxe" && (
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-cream font-medium">Servicios extra adicionales</span>
                            <p className="text-xs text-cream/60">$10 cada uno - Solo para este mes</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                setConfig((prev) => ({
                                  ...prev,
                                  extraServices: Math.max(0, prev.extraServices - 1),
                                }))
                              }
                              className="border-gold/20 text-cream hover:border-gold hover:text-gold"
                            >
                              -
                            </Button>
                            <span className="text-cream w-8 text-center font-medium">{config.extraServices}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                setConfig((prev) => ({
                                  ...prev,
                                  extraServices: prev.extraServices + 1,
                                }))
                              }
                              className="border-gold/20 text-cream hover:border-gold hover:text-gold"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {(additionalProducts > 0 || config.extraProducts > 0 || config.extraServices > 0) && (
                      <div className="bg-blue/10 border border-blue/20 rounded-lg p-3">
                        <p className="text-sm text-cream/90 flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Importante:</strong> Los productos y servicios extras son únicamente para este mes.
                            A partir del próximo ciclo, recibirás solo los productos base de tu plan seleccionado.
                          </span>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Referral Code */}
              {(config.plan === "premium" || config.plan === "deluxe") && (
                <Card className="border-gold/20 bg-dark">
                  <CardHeader>
                    <CardTitle className="text-cream">Programa de referidos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Usar código de referido */}
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

                    <div className="border-t border-gold/20 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-cream font-medium">Tu código de referido</h4>
                          <p className="text-xs text-cream/60">
                            Comparte este código y gana {config.plan === "premium" ? "3%" : "8%"} de cashback por cada
                            referida
                            {config.plan === "deluxe" ? " que compre caja Deluxe de +$120" : ""}
                          </p>
                        </div>
                        <Button
                          onClick={() => {
                            const newCode = `${config.name.toUpperCase().replace(/\s+/g, "")}${Math.random().toString(36).substr(2, 4).toUpperCase()}`
                            setConfig((prev) => ({ ...prev, referralCode: newCode }))
                            toast({
                              id: "referral-generated",
                              title: "¡Código generado!",
                              description: (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-gold/30 to-gold/20 rounded-lg flex items-center justify-center">
                                      <Sparkles className="h-4 w-4 text-gold" />
                                    </div>
                                    <div>
                                      <p className="font-medium text-sm">Tu código está listo</p>
                                      <p className="text-xs font-mono bg-gold/20 px-2 py-1 rounded">{newCode}</p>
                                    </div>
                                  </div>
                                  <p className="text-xs">¡Compártelo con tus amigas y gana cashback!</p>
                                </div>
                              ),
                              variant: "elegant",
                              duration: 4000,
                            })
                          }}
                          className="bg-gradient-to-r from-gold to-gold/80 text-dark hover:from-gold/90 hover:to-gold/70"
                          size="sm"
                        >
                          Generar mi código
                        </Button>
                      </div>

                      {config.referralCode && (
                        <div className="bg-gradient-to-r from-gold/10 to-beige/10 border border-gold/20 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-gold font-medium">{config.referralCode}</span>
                            <Button
                              onClick={() => {
                                navigator.clipboard.writeText(config.referralCode)
                                toast({
                                  id: "code-copied",
                                  title: "¡Copiado!",
                                  description: (
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 bg-gradient-to-br from-green-400/30 to-green-300/20 rounded-lg flex items-center justify-center">
                                        <Check className="h-4 w-4 text-green-600" />
                                      </div>
                                      <span className="text-sm">Tu código ha sido copiado al portapapeles</span>
                                    </div>
                                  ),
                                  variant: "success",
                                  duration: 2000,
                                })
                              }}
                              variant="outline"
                              size="sm"
                              className="border-gold/30 text-gold hover:bg-gold/10"
                            >
                              Copiar
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Total */}
              <Card className="border-gold/20 bg-gold/10">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-cream font-semibold">Total mensual:</span>
                    <span className="text-gold font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="mt-2 text-sm text-cream/70">
                    <div className="flex justify-between">
                      <span>Plan base:</span>
                      <span>${basePrice}</span>
                    </div>
                    {additionalProducts > 0 && (
                      <div className="flex justify-between">
                        <span>Productos adicionales ({additionalProducts}):</span>
                        <span>${additionalProducts * 5}</span>
                      </div>
                    )}
                    {config.extraProducts > 0 && (
                      <div className="flex justify-between">
                        <span>Productos extra ({config.extraProducts}):</span>
                        <span>${config.extraProducts * 5}</span>
                      </div>
                    )}
                    {config.extraServices > 0 && (
                      <div className="flex justify-between">
                        <span>Servicios extra ({config.extraServices}):</span>
                        <span>${config.extraServices * 10}</span>
                      </div>
                    )}
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

  // Determine which steps to show in the progress bar
  const getVisibleSteps = () => {
    if (config.plan === "esencial") {
      // For Esencial, only show steps 1 (name), 2 (plan), and 6 (summary)
      return [0, 1, 5]
    }
    return Array.from({ length: totalSteps }, (_, i) => i)
  }

  const visibleSteps = getVisibleSteps()
  const visibleStepCount = visibleSteps.length
  const currentVisibleStepIndex = visibleSteps.indexOf(currentStep)
  const visibleProgress = ((currentVisibleStepIndex + 1) / visibleStepCount) * 100

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-cream/60">
              Paso {currentVisibleStepIndex + 1} de {visibleStepCount}
            </span>
            <span className="text-sm text-cream/60">{Math.round(visibleProgress)}% completado</span>
          </div>
          <div className="w-full bg-dark-lighter rounded-full h-2">
            <div
              className="gradient-gold h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${visibleProgress}%` }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {visibleSteps.map((stepIndex, i) => (
              <button
                key={stepIndex}
                onClick={() => handleStepClick(stepIndex)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i <= currentVisibleStepIndex ? "bg-gold" : "bg-cream/30"
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
