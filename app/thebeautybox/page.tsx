"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Wizard } from "@/components/ui/wizard"
import { CategoryCardItems } from "@/components/ui/category-card-items"
import { ItemCard } from "@/components/ui/item-card"
import { PlanCard } from "@/components/ui/plan-card"
import { EmptyProductsState } from "@/components/ui/empty-products-state"
import { ProductsErrorState } from "@/components/ui/products-error-state"
import { NotificationModal } from "@/components/ui/notification-modal"
import { ReferralModal } from "@/components/ui/referral-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useCategoriesFromItems } from "@/hooks/useProducts"
import { getItemsByCategory, submitCategoryNotification, type Item } from "@/lib/supabase"
import { PLANS, INTERESTS, calcularPrecioFinal } from "@/lib/constants"
import { Crown, Package, Sparkles, Gift, Calculator, ShoppingBag, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface WizardData {
  interests: string[]
  selectedCategories: string[]
  selectedItems: { [key: string]: number }
  personalInfo: {
    name: string
    email: string
    phone: string
    preferences: string
    referralCode: string
    acceptsMarketing: boolean
  }
}

export default function TheBeautyBoxPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategoriesFromItems()

  const [currentStep, setCurrentStep] = useState(0)
  const [wizardData, setWizardData] = useState<WizardData>({
    interests: [],
    selectedCategories: [],
    selectedItems: {},
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      preferences: "",
      referralCode: "",
      acceptsMarketing: true,
    },
  })

  const [categoryItems, setCategoryItems] = useState<{ [key: string]: Item[] }>({})
  const [loadingItems, setLoadingItems] = useState(false)
  const [itemsError, setItemsError] = useState<string | null>(null)
  const [notificationModal, setNotificationModal] = useState<{
    isOpen: boolean
    categoryName: string
    categoryIcon: string
  }>({
    isOpen: false,
    categoryName: "",
    categoryIcon: "",
  })
  const [referralModal, setReferralModal] = useState(false)

  const wizardRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to top when component mounts (coming from plans)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  // Check for plan parameter in URL
  useEffect(() => {
    const planParam = searchParams.get("plan")
    if (planParam && Object.keys(PLANS).includes(planParam)) {
      // Could set initial plan preference here
    }
  }, [searchParams])

  // Load items when categories are selected
  useEffect(() => {
    const loadItemsForCategories = async () => {
      if (wizardData.selectedCategories.length === 0) {
        setCategoryItems({})
        return
      }

      setLoadingItems(true)
      setItemsError(null)
      const newCategoryItems: { [key: string]: Item[] } = {}

      try {
        for (const categoryName of wizardData.selectedCategories) {
          try {
            console.log(`Loading items for category: "${categoryName}"`)
            const items = await getItemsByCategory(categoryName)
            console.log(
              `Found ${items.length} items for "${categoryName}":`,
              items.map((i) => i.name),
            )
            newCategoryItems[categoryName] = items
          } catch (error) {
            console.error(`Error loading items for ${categoryName}:`, error)
            newCategoryItems[categoryName] = []
          }
        }

        console.log("Final categoryItems:", newCategoryItems)
        setCategoryItems(newCategoryItems)
      } catch (error) {
        setItemsError(error instanceof Error ? error.message : "Error loading products")
      } finally {
        setLoadingItems(false)
      }
    }

    loadItemsForCategories()
  }, [wizardData.selectedCategories])

  const totalSteps = 5

  const updateWizardData = (updates: Partial<WizardData>) => {
    setWizardData((prev) => ({ ...prev, ...updates }))
  }

  const scrollToTop = () => {
    if (wizardRef.current) {
      wizardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
      setTimeout(scrollToTop, 100)
    } else {
      handleFinish()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setTimeout(scrollToTop, 100)
    }
  }

  const handleStepClick = (step: number) => {
    if (step <= currentStep || canProceedToStep(step)) {
      setCurrentStep(step)
      setTimeout(scrollToTop, 100)
    }
  }

  const canProceedToStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return true
      case 1:
        return wizardData.interests.length > 0
      case 2:
        return wizardData.selectedCategories.length > 0
      case 3:
        // Can proceed if we have available categories with items OR if all selected categories are unavailable
        const availableCategories = wizardData.selectedCategories.filter((categoryName) => {
          const category = categories.find((c) => c.name === categoryName)
          return category?.available && category?.productCount > 0
        })
        const hasSelectedItems = Object.keys(wizardData.selectedItems).length > 0

        // Allow proceeding if either:
        // 1. We have selected items from available categories
        // 2. All selected categories are unavailable (they filled notification forms)
        return hasSelectedItems || availableCategories.length === 0
      case 4:
        return (
          wizardData.personalInfo.name.trim() !== "" &&
          wizardData.personalInfo.email.trim() !== "" &&
          wizardData.personalInfo.phone.trim() !== ""
        )
      default:
        return false
    }
  }

  const canProceed = canProceedToStep(currentStep + 1)

  const handleFinish = () => {
    const selectedItemsList = Object.entries(wizardData.selectedItems)
      .filter(([_, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => {
        for (const items of Object.values(categoryItems)) {
          const item = items.find((i) => i.id === itemId)
          if (item) return { item, quantity }
        }
        return null
      })
      .filter(Boolean) as { item: Item; quantity: number }[]

    if (selectedItemsList.length === 0) {
      // Handle case where user only selected unavailable categories
      toast({
        title: "¡Gracias por tu interés! 💛",
        description: "Te contactaremos cuando las categorías seleccionadas estén disponibles.",
        variant: "elegant",
      })
    } else {
      const totalItemsCost = selectedItemsList.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0)
      const pricing = calcularPrecioFinal(totalItemsCost)

      toast({
        title: "¡Beauty Box creada exitosamente! 🎉",
        description: `Tu box ${pricing.planAlcanzado} por ₡${pricing.precioFinal.toLocaleString()} está lista.`,
        variant: "elegant",
      })
    }

    console.log("Wizard completed:", {
      wizardData,
      selectedItems: selectedItemsList,
    })
  }

  const handleCategorySelect = (categoryName: string) => {
    const category = categories.find((c) => c.name === categoryName)

    // If category is not available, show notification modal instead of selecting
    if (!category?.available) {
      handleNotifyClick(categoryName, category?.icon || "🌟")
      return
    }

    const isSelected = wizardData.selectedCategories.includes(categoryName)
    const newCategories = isSelected
      ? wizardData.selectedCategories.filter((c) => c !== categoryName)
      : [...wizardData.selectedCategories, categoryName]

    updateWizardData({ selectedCategories: newCategories })
  }

  const handleItemSelect = (itemId: string) => {
    const currentQuantity = wizardData.selectedItems[itemId] || 0
    const newQuantity = currentQuantity > 0 ? 0 : 1

    updateWizardData({
      selectedItems: {
        ...wizardData.selectedItems,
        [itemId]: newQuantity,
      },
    })
  }

  const handleItemQuantityChange = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      const { [itemId]: removed, ...rest } = wizardData.selectedItems
      updateWizardData({ selectedItems: rest })
    } else {
      updateWizardData({
        selectedItems: {
          ...wizardData.selectedItems,
          [itemId]: quantity,
        },
      })
    }
  }

  const handleNotifyClick = (categoryName: string, categoryIcon: string) => {
    setNotificationModal({
      isOpen: true,
      categoryName,
      categoryIcon,
    })
  }

  const handleNotificationSubmit = async (data: { email?: string; whatsapp?: string }) => {
    try {
      const result = await submitCategoryNotification({
        categoryName: notificationModal.categoryName,
        ...data,
      })

      if (result.success) {
        toast({
          title: "¡Notificación registrada! 📝",
          description: `Te avisaremos cuando ${notificationModal.categoryName} esté disponible.`,
          variant: "elegant",
        })

        // Add the category to selected categories so user can proceed
        const newCategories = [...wizardData.selectedCategories, notificationModal.categoryName]
        updateWizardData({ selectedCategories: newCategories })
      } else {
        toast({
          title: "Error al registrar notificación",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error al registrar notificación",
        description: "Por favor intenta de nuevo",
        variant: "destructive",
      })
    }
  }

  const handleRetryItems = async () => {
    if (wizardData.selectedCategories.length === 0) return

    setLoadingItems(true)
    setItemsError(null)
    const newCategoryItems: { [key: string]: Item[] } = {}

    try {
      for (const categoryName of wizardData.selectedCategories) {
        const items = await getItemsByCategory(categoryName)
        newCategoryItems[categoryName] = items
      }
      setCategoryItems(newCategoryItems)
    } catch (error) {
      setItemsError(error instanceof Error ? error.message : "Error loading products")
    } finally {
      setLoadingItems(false)
    }
  }

  const getErrorType = (error: string): "connection" | "empty" | "unknown" => {
    if (error.includes("fetch") || error.includes("network") || error.includes("connection")) {
      return "connection"
    }
    if (error.includes("empty") || error.includes("no data") || error.includes("not found")) {
      return "empty"
    }
    return "unknown"
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-dancing text-3xl text-gold mb-4">¿Qué te interesa más?</h2>
              <p className="text-cream/80">Selecciona todas las opciones que te llamen la atención</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {INTERESTS.map((interest) => {
                const isSelected = wizardData.interests.includes(interest.id)
                return (
                  <Card
                    key={interest.id}
                    className={`cursor-pointer transition-all duration-300 hover-lift ${
                      isSelected ? "ring-2 ring-gold bg-beige border-gold" : "border-gold bg-dark hover:border-gold/80"
                    }`}
                    onClick={() => {
                      const newInterests = isSelected
                        ? wizardData.interests.filter((i) => i !== interest.id)
                        : [...wizardData.interests, interest.id]
                      updateWizardData({ interests: newInterests })
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="mb-4">
                        {interest.icon === "Package" && <Package className="h-12 w-12 mx-auto text-gold" />}
                        {interest.icon === "Sparkles" && <Sparkles className="h-12 w-12 mx-auto text-gold" />}
                        {interest.icon === "Crown" && <Crown className="h-12 w-12 mx-auto text-gold" />}
                      </div>
                      <h3 className={`font-medium ${isSelected ? "text-dark" : "text-cream"}`}>{interest.name}</h3>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case 1:
        // Show error state if categories failed to load
        if (categoriesError) {
          return (
            <ProductsErrorState
              errorType={getErrorType(categoriesError)}
              onRetry={refetchCategories}
              isRetrying={categoriesLoading}
              customMessage="No pudimos cargar las categorías disponibles."
            />
          )
        }

        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-dancing text-3xl text-gold mb-4">¿Qué categorías te interesan?</h2>
              <p className="text-cream/80">Selecciona las categorías que quieres incluir en tu Beauty Box</p>
              <p className="text-cream/60 text-sm mt-2">
                💡 Si una categoría no está disponible, podrás registrarte para recibir notificaciones
              </p>
            </div>

            {categoriesLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
                <p className="text-cream/60 mt-4">Cargando categorías...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <CategoryCardItems
                    key={category.id}
                    category={category}
                    isSelected={wizardData.selectedCategories.includes(category.name)}
                    onSelect={() => handleCategorySelect(category.name)}
                    onNotify={() => handleNotifyClick(category.name, category.icon)}
                  />
                ))}
              </div>
            )}
          </div>
        )

      case 2:
        const availableCategories = wizardData.selectedCategories.filter((categoryName) => {
          const category = categories.find((c) => c.name === categoryName)
          return category?.available && category?.productCount > 0
        })

        const unavailableCategories = wizardData.selectedCategories.filter((categoryName) => {
          const category = categories.find((c) => c.name === categoryName)
          return !category?.available || category?.productCount === 0
        })

        // Show error state if items failed to load
        if (itemsError) {
          return (
            <ProductsErrorState
              errorType={getErrorType(itemsError)}
              onRetry={handleRetryItems}
              isRetrying={loadingItems}
            />
          )
        }

        // If no available categories, show empty state
        if (availableCategories.length === 0) {
          return (
            <div className="space-y-8">
              {unavailableCategories.length > 0 && (
                <div className="max-w-2xl mx-auto">
                  <Card className="border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-blue-400/5">
                    <CardContent className="p-6 text-center">
                      <AlertCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="font-playfair text-xl text-blue-300 mb-2">Categorías en desarrollo</h3>
                      <p className="text-cream/80 mb-4">
                        Las categorías que seleccionaste están en desarrollo. Ya registramos tu interés y te
                        contactaremos cuando estén disponibles.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {unavailableCategories.map((categoryName) => (
                          <span
                            key={categoryName}
                            className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-400/30"
                          >
                            {categoryName}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <EmptyProductsState
                title="¡Pronto tendremos productos increíbles!"
                subtitle="Mientras tanto, puedes explorar otras categorías"
                selectedCategories={wizardData.selectedCategories}
                showWhatsAppInput={false}
              />
            </div>
          )
        }

        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-dancing text-3xl text-gold mb-4">Selecciona tus productos favoritos</h2>
              <p className="text-cream/80">Elige los productos que quieres incluir en tu Beauty Box</p>
            </div>

            {unavailableCategories.length > 0 && (
              <div className="max-w-2xl mx-auto">
                <Card className="border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-blue-400/5">
                  <CardContent className="p-4 text-center">
                    <p className="text-blue-300 text-sm mb-2">✅ Ya registramos tu interés en estas categorías:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {unavailableCategories.map((categoryName) => (
                        <span
                          key={categoryName}
                          className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-400/30"
                        >
                          {categoryName}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {loadingItems ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
                <p className="text-cream/60 mt-4">Cargando productos...</p>
              </div>
            ) : (
              <div className="space-y-8">
                {availableCategories.map((categoryName) => {
                  const items = categoryItems[categoryName] || []
                  const availableItems = items.filter((item) => item.available !== false)

                  if (availableItems.length === 0) {
                    return (
                      <div key={categoryName} className="text-center py-8">
                        <h3 className="font-playfair text-xl text-gold mb-2">{categoryName}</h3>
                        <p className="text-cream/60">No hay productos disponibles en esta categoría</p>
                      </div>
                    )
                  }

                  return (
                    <div key={categoryName}>
                      <h3 className="font-playfair text-xl text-gold mb-4 text-center">
                        {categoryName} ({availableItems.length} productos)
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {availableItems.map((item) => (
                          <ItemCard
                            key={item.id}
                            item={item}
                            isSelected={(wizardData.selectedItems[item.id] || 0) > 0}
                            quantity={wizardData.selectedItems[item.id] || 0}
                            onSelect={() => handleItemSelect(item.id)}
                            onQuantityChange={(quantity) => handleItemQuantityChange(item.id, quantity)}
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

      case 3:
        // Calculate pricing
        const selectedItemsList = Object.entries(wizardData.selectedItems)
          .filter(([_, quantity]) => quantity > 0)
          .map(([itemId, quantity]) => {
            for (const items of Object.values(categoryItems)) {
              const item = items.find((i) => i.id === itemId)
              if (item) return { item, quantity }
            }
            return null
          })
          .filter(Boolean) as { item: Item; quantity: number }[]

        // Handle case where user only selected unavailable categories
        if (selectedItemsList.length === 0) {
          return (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="font-dancing text-3xl text-gold mb-4">¡Gracias por tu interés!</h2>
                <p className="text-cream/80">
                  Registramos tu interés en las categorías seleccionadas y te contactaremos cuando estén disponibles.
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <Card className="border-gold/30 bg-gradient-to-br from-gold/10 to-gold/5">
                  <CardContent className="p-8 text-center">
                    <Crown className="h-16 w-16 text-gold mx-auto mb-4" />
                    <h3 className="font-playfair text-2xl text-gold mb-4">Tu interés es valioso</h3>
                    <p className="text-dark/80 mb-6">
                      Estamos trabajando para traerte las mejores opciones en las categorías que seleccionaste.
                    </p>
                    <div className="space-y-2">
                      {wizardData.selectedCategories.map((categoryName) => (
                        <div key={categoryName} className="flex items-center justify-center gap-2">
                          <span className="text-gold">✓</span>
                          <span className="text-dark">{categoryName}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        }

        const totalItemsCost = selectedItemsList.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0)
        const pricing = calcularPrecioFinal(totalItemsCost)

        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-dancing text-3xl text-gold mb-4">Resumen de tu Beauty Box</h2>
              <p className="text-cream/80">Revisa tu selección y el plan alcanzado</p>
            </div>

            <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
              {/* Selected Items */}
              <Card className="border-gold/30 bg-dark">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl text-gold mb-4 flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Productos Seleccionados
                  </h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {selectedItemsList.map(({ item, quantity }) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-beige/5 rounded-lg">
                        <div className="flex-1">
                          <p className="text-cream font-medium text-sm">{item.name}</p>
                          <p className="text-gold/80 text-xs">{item.brand || item.provider}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-cream text-sm">x{quantity}</p>
                          <p className="text-gold text-sm font-medium">₡{(item.price * quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Summary */}
              <Card className="border-gold/30 bg-dark">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl text-gold mb-4 flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Resumen de Costos
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-cream/80">Productos:</span>
                      <span className="text-cream">₡{totalItemsCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream/80">Caja + Envío:</span>
                      <span className="text-cream">₡{(pricing.costoTotal - totalItemsCost).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gold/20 pt-3">
                      <div className="flex justify-between font-semibold">
                        <span className="text-gold">Total:</span>
                        <span className="text-gold">₡{pricing.precioFinal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Plan Achieved */}
            <div className="max-w-2xl mx-auto">
              <PlanCard
                plan={PLANS[pricing.planAlcanzado as keyof typeof PLANS]}
                isAchieved={true}
                hideButton={true}
                currentPrice={pricing.precioFinal}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-dancing text-3xl text-gold mb-4">Información Personal</h2>
              <p className="text-cream/80">Completa tus datos para finalizar tu Beauty Box</p>
            </div>

            <Card className="max-w-2xl mx-auto border-gold/30 bg-dark">
              <CardContent className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-cream">
                      Nombre completo *
                    </Label>
                    <Input
                      id="name"
                      value={wizardData.personalInfo.name}
                      onChange={(e) =>
                        updateWizardData({
                          personalInfo: { ...wizardData.personalInfo, name: e.target.value },
                        })
                      }
                      className="bg-beige/5 border-beige/20 text-cream"
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
                      onChange={(e) =>
                        updateWizardData({
                          personalInfo: { ...wizardData.personalInfo, email: e.target.value },
                        })
                      }
                      className="bg-beige/5 border-beige/20 text-cream"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-cream">
                    Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    value={wizardData.personalInfo.phone}
                    onChange={(e) =>
                      updateWizardData({
                        personalInfo: { ...wizardData.personalInfo, phone: e.target.value },
                      })
                    }
                    className="bg-beige/5 border-beige/20 text-cream"
                    placeholder="+506 8888-8888"
                  />
                </div>

                <div>
                  <Label htmlFor="referral" className="text-cream">
                    Código de referido (opcional)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="referral"
                      value={wizardData.personalInfo.referralCode}
                      onChange={(e) =>
                        updateWizardData({
                          personalInfo: { ...wizardData.personalInfo, referralCode: e.target.value },
                        })
                      }
                      className="bg-beige/5 border-beige/20 text-cream"
                      placeholder="LUVELLE2024"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setReferralModal(true)}
                      className="border-gold/30 text-gold hover:bg-gold/10"
                    >
                      <Gift className="h-4 w-4 mr-2" />
                      Info
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="preferences" className="text-cream">
                    Preferencias adicionales (opcional)
                  </Label>
                  <Textarea
                    id="preferences"
                    value={wizardData.personalInfo.preferences}
                    onChange={(e) =>
                      updateWizardData({
                        personalInfo: { ...wizardData.personalInfo, preferences: e.target.value },
                      })
                    }
                    className="bg-beige/5 border-beige/20 text-cream"
                    placeholder="Cuéntanos sobre alergias, preferencias de marcas, etc."
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketing"
                    checked={wizardData.personalInfo.acceptsMarketing}
                    onCheckedChange={(checked) =>
                      updateWizardData({
                        personalInfo: { ...wizardData.personalInfo, acceptsMarketing: checked as boolean },
                      })
                    }
                  />
                  <Label htmlFor="marketing" className="text-cream/80 text-sm">
                    Acepto recibir comunicaciones de marketing y ofertas especiales
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div ref={wizardRef} className="min-h-screen py-8">
      <Wizard
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={handleNext}
        onPrev={handlePrev}
        onStepClick={handleStepClick}
        canProceed={canProceed}
        title="Crea tu Beauty Box"
        subtitle="Personaliza tu experiencia de belleza y bienestar en unos simples pasos"
      >
        {renderStepContent()}
      </Wizard>

      <NotificationModal
        isOpen={notificationModal.isOpen}
        onClose={() => setNotificationModal({ isOpen: false, categoryName: "", categoryIcon: "" })}
        categoryName={notificationModal.categoryName}
        categoryIcon={notificationModal.categoryIcon}
        onSubmit={handleNotificationSubmit}
      />

      <ReferralModal isOpen={referralModal} onClose={() => setReferralModal(false)} />
    </div>
  )
}
