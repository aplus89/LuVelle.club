"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PlanCard } from "@/components/ui/plan-card"
import { CategoryCard } from "@/components/ui/category-card"
import { ProductCard } from "@/components/ui/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PLANS, CATEGORIES, INTERESTS, PRODUCTS } from "@/lib/constants"
import { Plus, Info, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"

interface BoxConfiguration {
  plan: string
  interest: string
  categories: string[]
  selectedProducts: string[]
  extraProducts: number
  extraServices: number
  referralCode: string
  name: string
}

export default function TheBeautyBoxPage() {
  const router = useRouter()
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
        return config.interest !== ""
      case 3:
        return config.categories.length > 0
      case 4: {
        // Product selection step - only for Premium/Deluxe
        const plan = getSelectedPlan()
        if (plan?.id === "esencial") return true // Skip for Esencial
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
      // Skip product selection for Esencial plan
      if (currentStep === 3 && config.plan === "esencial") {
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
      // Skip product selection for Esencial plan when going back
      if (currentStep === 5 && config.plan === "esencial") {
        setCurrentStep(currentStep - 2) // Skip step 4 (product selection)
      } else {
        setCurrentStep(currentStep - 1)
      }
    }
  }

  const handleStepClick = (step: number) => {
    if (step <= currentStep || canProceed()) {
      setCurrentStep(step)
    }
  }

  const handleCategorySelect = (categoryId: string) => {
    const category = CATEGORIES.find((c) => c.id === categoryId)
    if (!category?.available) return

    const plan = PLANS[config.plan as keyof typeof PLANS]
    if (!plan) return

    const maxCategories = plan.maxCategories === "all" ? CATEGORIES.length : plan.maxCategories

    setConfig((prev) => {
      const newCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : prev.categories.length < maxCategories
          ? [...prev.categories, categoryId]
          : prev.categories

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

    setConfig((prev) => {
      const isSelected = prev.selectedProducts.includes(productId)

      if (isSelected) {
        // Remove product
        return {
          ...prev,
          selectedProducts: prev.selectedProducts.filter((id) => id !== productId),
        }
      } else {
        // Add product if under limit
        if (prev.selectedProducts.length < plan.maxProducts) {
          return {
            ...prev,
            selectedProducts: [...prev.selectedProducts, productId],
          }
        }
        return prev // Don't add if at limit
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

  const progress = ((currentStep + 1) / totalSteps) * 100

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="mb-8">
              <h2 className="font-dancing text-3xl text-gold mb-4">¡Hola! Diseñemos juntas tu Beauty Box ideal 🌸</h2>
              <p className="text-cream/80">Comenzemos conociendo tu nombre para personalizar tu experiencia</p>
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
                className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/50"
              />
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-dancing text-3xl text-gold mb-4">Elegí tu plan, {config.name}</h2>
              <p className="text-cream/80">Cada plan está diseñado para diferentes necesidades y estilos de vida</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {Object.values(PLANS).map((plan, index) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isSelected={config.plan === plan.id}
                  onSelect={() => setConfig((prev) => ({ ...prev, plan: plan.id }))}
                  isPopular={index === 1}
                />
              ))}
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
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-dancing text-3xl text-gold mb-4">¿Qué te interesa más?</h2>
              <p className="text-cream/80">Esto nos ayuda a personalizar mejor tu experiencia</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {INTERESTS.map((interest) => (
                <Card
                  key={interest.id}
                  className={`cursor-pointer transition-all duration-300 hover-lift ${
                    config.interest === interest.id
                      ? "ring-2 ring-gold bg-gold/10 border-gold"
                      : "border-cream/20 hover:border-gold/50"
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
        const selectedPlan = getSelectedPlan()
        const maxCategories =
          selectedPlan?.maxCategories === "all" ? CATEGORIES.length : selectedPlan?.maxCategories || 0

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-dancing text-3xl text-gold mb-4">Elegí tus categorías</h2>
              <p className="text-cream/80 mb-4">Selecciona las categorías que más te interesan</p>
              <div className="flex justify-center">
                <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
                  {config.categories.length} de {maxCategories} seleccionadas
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {CATEGORIES.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  isSelected={config.categories.includes(category.id)}
                  onSelect={() => handleCategorySelect(category.id)}
                  onNotify={() => {
                    alert(`Te notificaremos cuando ${category.name} esté disponible!`)
                  }}
                />
              ))}
            </div>

            {config.categories.length === maxCategories && (
              <div className="text-center">
                <p className="text-sm text-cream/60">Has alcanzado el límite de categorías para tu plan</p>
              </div>
            )}
          </div>
        )

      case 4:
        // Product selection step - only for Premium/Deluxe
        const plan = getSelectedPlan()
        if (plan?.id === "esencial") {
          // This step should be skipped for Esencial, but just in case
          return null
        }

        const availableProducts = getAvailableProducts()
        const maxProducts = plan?.maxProducts || 0
        const selectedCount = config.selectedProducts.length

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-dancing text-3xl text-gold mb-4">Seleccioná tus productos</h2>
              <p className="text-cream/80 mb-4">
                Elegí los productos que más te gusten de las categorías seleccionadas
              </p>
              <div className="flex justify-center">
                <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
                  Has seleccionado {selectedCount} de {maxProducts}
                </span>
              </div>
            </div>

            {selectedCount >= maxProducts && (
              <div className="max-w-2xl mx-auto mb-6">
                <div className="bg-blue/10 border border-blue/20 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue mt-0.5 flex-shrink-0" />
                  <p className="text-cream/90 text-sm">Para incluir otro producto, primero eliminá uno de tu Box.</p>
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
                    <div key={categoryId}>
                      <h3 className="font-semibold text-cream text-lg mb-4 flex items-center gap-2">
                        <span className="text-2xl">{category?.icon}</span>
                        {category?.name}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categoryProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            isSelected={config.selectedProducts.includes(product.id)}
                            onSelect={() => handleProductSelect(product.id)}
                            disabled={!config.selectedProducts.includes(product.id) && selectedCount >= maxProducts}
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
        const extraProductsPrice = config.extraProducts * 5
        const extraServicesPrice = config.extraServices * 10
        const totalPrice = basePrice + extraProductsPrice + extraServicesPrice

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-dancing text-3xl text-gold mb-4">Tu Beauty Box</h2>
              <p className="text-cream/80">Revisa tu configuración y personaliza aún más tu experiencia</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              {/* Plan Summary */}
              <Card className="border-gold/20 bg-gold/5">
                <CardHeader>
                  <CardTitle className="text-gold">Plan {finalPlan?.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-cream">Precio base</span>
                    <span className="text-cream font-semibold">${finalPlan?.price}/mes</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-cream/80">Categorías seleccionadas:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.map((category) => (
                        <span key={category.id} className="text-xs bg-cream/10 text-cream px-2 py-1 rounded-full">
                          {category.icon} {category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Products */}
              {selectedProducts.length > 0 && (
                <Card className="border-cream/20">
                  <CardHeader>
                    <CardTitle className="text-cream">Productos seleccionados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedProducts.map((product) => (
                        <div key={product.id} className="flex items-center space-x-3 p-2 bg-cream/5 rounded-lg">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-cream truncate">{product.name}</p>
                            <p className="text-xs text-gold/80">{product.brand}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Extras */}
              {(finalPlan?.id === "premium" || finalPlan?.id === "deluxe") && (
                <Card className="border-cream/20">
                  <CardHeader>
                    <CardTitle className="text-cream flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Extras
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-cream">Productos extra</span>
                        <p className="text-xs text-cream/60">$5 cada uno</p>
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
                          className="border-cream/20 text-cream"
                        >
                          -
                        </Button>
                        <span className="text-cream w-8 text-center">{config.extraProducts}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setConfig((prev) => ({
                              ...prev,
                              extraProducts: prev.extraProducts + 1,
                            }))
                          }
                          className="border-cream/20 text-cream"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {finalPlan?.id === "deluxe" && (
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-cream">Servicios extra</span>
                          <p className="text-xs text-cream/60">$10 cada uno</p>
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
                            className="border-cream/20 text-cream"
                          >
                            -
                          </Button>
                          <span className="text-cream w-8 text-center">{config.extraServices}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setConfig((prev) => ({
                                ...prev,
                                extraServices: prev.extraServices + 1,
                              }))
                            }
                            className="border-cream/20 text-cream"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Referral Code */}
              {finalPlan?.id === "deluxe" && (
                <Card className="border-cream/20">
                  <CardHeader>
                    <CardTitle className="text-cream">Código de referido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="referralCode" className="text-cream/80">
                        ¿Tienes un código de referido?
                      </Label>
                      <Input
                        id="referralCode"
                        type="text"
                        placeholder="Ingresa tu código"
                        value={config.referralCode}
                        onChange={(e) => setConfig((prev) => ({ ...prev, referralCode: e.target.value }))}
                        className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/50"
                      />
                      <p className="text-xs text-cream/60">
                        Personalizá tu experiencia. Recompensamos a quienes comparten LuVelle 💛
                      </p>
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
                  {(extraProductsPrice > 0 || extraServicesPrice > 0) && (
                    <div className="mt-2 text-sm text-cream/70">
                      <div className="flex justify-between">
                        <span>Plan base:</span>
                        <span>${basePrice}</span>
                      </div>
                      {extraProductsPrice > 0 && (
                        <div className="flex justify-between">
                          <span>Productos extra:</span>
                          <span>${extraProductsPrice}</span>
                        </div>
                      )}
                      {extraServicesPrice > 0 && (
                        <div className="flex justify-between">
                          <span>Servicios extra:</span>
                          <span>${extraServicesPrice}</span>
                        </div>
                      )}
                    </div>
                  )}
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
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-dancing text-4xl md:text-5xl text-gold mb-4">The Beauty Box by LuVelle</h1>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto">
            Diseña tu experiencia personalizada de belleza y bienestar
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-cream/60">
              Paso {currentStep + 1} de {totalSteps}
            </span>
            <span className="text-sm text-cream/60">{Math.round(progress)}% completado</span>
          </div>
          <div className="w-full bg-cream/10 rounded-full h-2">
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
                  i <= currentStep ? "bg-gold" : "bg-cream/20 hover:bg-cream/40"
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
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="border-cream/20 text-cream hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gradient-gold text-dark font-semibold hover:opacity-90 transition-opacity"
          >
            {currentStep === totalSteps - 1 ? "Ir al checkout" : "Continuar"}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
