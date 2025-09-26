"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Sparkles, Heart, Crown } from "lucide-react"
import { CategoryCardItems } from "./category-card-items"
import { ItemCard } from "./item-card"
import { PlanCard } from "./plan-card"
import { NotificationModal } from "./notification-modal"
import { useProducts } from "@/hooks/useProducts"
import { SUBSCRIPTION_PLANS } from "@/lib/constants"

interface WizardData {
  selectedCategories: string[]
  selectedItems: any[]
  selectedPlan: string
  personalInfo: {
    name: string
    email: string
    phone: string
    address: string
    preferences: string
  }
  unavailableCategories: string[]
}

interface WizardProps {
  onComplete?: (data: WizardData) => void
}

export function Wizard({ onComplete }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [selectedUnavailableCategory, setSelectedUnavailableCategory] = useState<string>("")
  const { categories, items, loading, error, getCategoriesFromItems } = useProducts()

  const [wizardData, setWizardData] = useState<WizardData>({
    selectedCategories: [],
    selectedItems: [],
    selectedPlan: "",
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      preferences: "",
    },
    unavailableCategories: [],
  })

  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  // Auto-scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentStep])

  const totalSteps = 4

  const handleCategorySelect = (categoryId: string) => {
    const categoriesWithItems = getCategoriesFromItems()
    const category = categoriesWithItems.find((cat) => cat.id === categoryId)

    if (!category || category.availableCount === 0) {
      setSelectedUnavailableCategory(categoryId)
      setShowNotificationModal(true)
      return
    }

    setWizardData((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter((id) => id !== categoryId)
        : [...prev.selectedCategories, categoryId],
    }))
  }

  const handleItemSelect = (item: any) => {
    setWizardData((prev) => ({
      ...prev,
      selectedItems: prev.selectedItems.find((i) => i.id === item.id)
        ? prev.selectedItems.filter((i) => i.id !== item.id)
        : [...prev.selectedItems, item],
    }))
  }

  const handlePlanSelect = (planId: string) => {
    setWizardData((prev) => ({ ...prev, selectedPlan: planId }))
  }

  const handlePersonalInfoChange = (field: string, value: string) => {
    setWizardData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }

  const handleNotificationSubmit = (email: string) => {
    setWizardData((prev) => ({
      ...prev,
      unavailableCategories: [...prev.unavailableCategories, selectedUnavailableCategory],
    }))
    setShowNotificationModal(false)
  }

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return wizardData.selectedCategories.length > 0 || wizardData.unavailableCategories.length > 0
      case 2:
        return wizardData.selectedItems.length > 0
      case 3:
        return wizardData.selectedPlan !== ""
      case 4:
        return wizardData.personalInfo.name && wizardData.personalInfo.email
      default:
        return false
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps && canProceedToNextStep()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    if (onComplete) {
      onComplete(wizardData)
    }
  }

  const getAvailableItems = () => {
    return items.filter((item) => wizardData.selectedCategories.includes(item.category_id) && item.available)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-cream mb-2">Selecciona tus categorías favoritas</h2>
              <p className="text-cream/70">Elige las categorías que más te interesan para personalizar tu Beauty Box</p>
            </div>

            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
                <p className="text-cream/70 mt-2">Cargando categorías...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <p className="text-red-400">Error al cargar las categorías</p>
              </div>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getCategoriesFromItems().map((category) => (
                  <CategoryCardItems
                    key={category.id}
                    category={category}
                    isSelected={wizardData.selectedCategories.includes(category.id)}
                    onSelect={() => handleCategorySelect(category.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )

      case 2:
        const availableItems = getAvailableItems()
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-cream mb-2">Elige tus productos favoritos</h2>
              <p className="text-cream/70">Selecciona los productos que te gustaría recibir en tu Beauty Box</p>
            </div>

            {availableItems.length === 0 ? (
              <div className="text-center py-12">
                <Sparkles className="h-16 w-16 text-gold/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-cream mb-2">¡Próximamente productos increíbles!</h3>
                <p className="text-cream/70 mb-6">
                  Estamos preparando una selección especial de productos para las categorías que elegiste.
                </p>
                <Button onClick={nextStep} className="bg-gold text-dark hover:bg-gold/90">
                  Continuar al siguiente paso
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    isSelected={wizardData.selectedItems.some((i) => i.id === item.id)}
                    onSelect={() => handleItemSelect(item)}
                  />
                ))}
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-cream mb-2">Elige tu plan de suscripción</h2>
              <p className="text-cream/70">Selecciona el plan que mejor se adapte a tus necesidades</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isSelected={wizardData.selectedPlan === plan.id}
                  onSelect={() => handlePlanSelect(plan.id)}
                />
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-cream mb-2">Información personal</h2>
              <p className="text-cream/70">Completa tus datos para finalizar tu Beauty Box personalizada</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-cream">
                    Nombre completo *
                  </Label>
                  <Input
                    id="name"
                    value={wizardData.personalInfo.name}
                    onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                    className="bg-dark border-cream/30 text-cream"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-cream">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={wizardData.personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                    className="bg-dark border-cream/30 text-cream"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-cream">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    value={wizardData.personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                    className="bg-dark border-cream/30 text-cream"
                    placeholder="+506 1234-5678"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-cream">
                    Dirección
                  </Label>
                  <Input
                    id="address"
                    value={wizardData.personalInfo.address}
                    onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
                    className="bg-dark border-cream/30 text-cream"
                    placeholder="Tu dirección de envío"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="preferences" className="text-cream">
                  Preferencias adicionales
                </Label>
                <Textarea
                  id="preferences"
                  value={wizardData.personalInfo.preferences}
                  onChange={(e) => handlePersonalInfoChange("preferences", e.target.value)}
                  className="bg-dark border-cream/30 text-cream"
                  placeholder="Cuéntanos sobre tus preferencias, alergias o necesidades especiales..."
                  rows={4}
                />
              </div>

              {/* Summary */}
              <Card className="border-gold/30 bg-dark/50">
                <CardHeader>
                  <CardTitle className="text-cream flex items-center">
                    <Crown className="h-5 w-5 text-gold mr-2" />
                    Resumen de tu Beauty Box
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-cream/70 text-sm">Categorías seleccionadas:</p>
                    <p className="text-cream">{wizardData.selectedCategories.length} categorías</p>
                  </div>
                  <div>
                    <p className="text-cream/70 text-sm">Productos seleccionados:</p>
                    <p className="text-cream">{wizardData.selectedItems.length} productos</p>
                  </div>
                  <div>
                    <p className="text-cream/70 text-sm">Plan seleccionado:</p>
                    <p className="text-cream">
                      {SUBSCRIPTION_PLANS.find((p) => p.id === wizardData.selectedPlan)?.name || "No seleccionado"}
                    </p>
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
    <div className="min-h-screen bg-dark py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gold">Tu Beauty Box Personalizada</h1>
            <span className="text-cream/70">
              Paso {currentStep} de {totalSteps}
            </span>
          </div>
          <div className="w-full bg-cream/20 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-gold to-gold/80 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-cream/20 bg-dark/80 backdrop-blur-sm">
          <CardContent className="p-8">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="ghost"
            className={`text-gold hover:bg-gold/10 transition-all duration-200 ${
              currentStep === 1 ? "opacity-30 cursor-not-allowed" : "hover:scale-105"
            }`}
            size="sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i + 1 === currentStep ? "bg-gold" : i + 1 < currentStep ? "bg-gold/60" : "bg-cream/30"
                }`}
              />
            ))}
          </div>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              disabled={!canProceedToNextStep()}
              className="bg-gold text-dark hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!canProceedToNextStep()}
              className="bg-gradient-to-r from-gold to-gold/80 text-dark hover:from-gold/90 hover:to-gold/70 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Heart className="mr-2 h-4 w-4" />
              Completar Beauty Box
            </Button>
          )}
        </div>
      </div>

      <NotificationModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        onSubmit={handleNotificationSubmit}
        categoryName={selectedUnavailableCategory}
      />
    </div>
  )
}
