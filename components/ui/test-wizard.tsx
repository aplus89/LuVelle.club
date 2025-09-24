"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCategoriesFromItems, useItems } from "@/hooks/useProducts"
import { getItemsByCategory, type Item, type CategoryFromItems } from "@/lib/supabase"
import { Loader2, CheckCircle, AlertCircle, Database, Package, Sparkles } from "lucide-react"

export function TestWizard() {
  const [testResults, setTestResults] = useState<{
    categories: { success: boolean; data?: CategoryFromItems[]; error?: string }
    items: { success: boolean; data?: Item[]; error?: string }
    categoryItems: { success: boolean; data?: { [key: string]: Item[] }; error?: string }
  }>({
    categories: { success: false },
    items: { success: false },
    categoryItems: { success: false },
  })

  const [isRunningTests, setIsRunningTests] = useState(false)
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategoriesFromItems()
  const { items, loading: itemsLoading, error: itemsError } = useItems()

  const runTests = async () => {
    setIsRunningTests(true)
    const results = { ...testResults }

    try {
      // Test 1: Verificar categorías
      if (categories.length > 0) {
        results.categories = { success: true, data: categories }
      } else if (categoriesError) {
        results.categories = { success: false, error: categoriesError }
      } else {
        results.categories = { success: false, error: "No se encontraron categorías" }
      }

      // Test 2: Verificar items
      if (items.length > 0) {
        results.items = { success: true, data: items }
      } else if (itemsError) {
        results.items = { success: false, error: itemsError }
      } else {
        results.items = { success: false, error: "No se encontraron items" }
      }

      // Test 3: Verificar items por categoría
      if (categories.length > 0) {
        const categoryItems: { [key: string]: Item[] } = {}
        let hasError = false
        let errorMessage = ""

        for (const category of categories.slice(0, 3)) {
          // Solo probar las primeras 3 categorías
          try {
            const items = await getItemsByCategory(category.name)
            categoryItems[category.id] = items
          } catch (error) {
            hasError = true
            errorMessage = error instanceof Error ? error.message : "Error desconocido"
            break
          }
        }

        if (hasError) {
          results.categoryItems = { success: false, error: errorMessage }
        } else {
          results.categoryItems = { success: true, data: categoryItems }
        }
      }

      setTestResults(results)
    } catch (error) {
      console.error("Error running tests:", error)
    } finally {
      setIsRunningTests(false)
    }
  }

  useEffect(() => {
    if (!categoriesLoading && !itemsLoading && !isRunningTests) {
      runTests()
    }
  }, [categoriesLoading, itemsLoading, categories, items])

  const TestResult = ({ title, result, icon }: { title: string; result: any; icon: React.ReactNode }) => (
    <Card className="border-gold/20 bg-dark">
      <CardHeader className="pb-3">
        <CardTitle className="text-cream flex items-center gap-2 text-lg">
          {icon}
          {title}
          {result.success ? (
            <CheckCircle className="h-5 w-5 text-green-400" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-400" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {result.success ? (
          <div className="space-y-2">
            <p className="text-green-300 text-sm">✅ Prueba exitosa</p>
            {result.data && Array.isArray(result.data) && (
              <p className="text-cream/80 text-sm">Encontrados: {result.data.length} elementos</p>
            )}
            {result.data && !Array.isArray(result.data) && (
              <p className="text-cream/80 text-sm">Categorías probadas: {Object.keys(result.data).length}</p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-red-300 text-sm">❌ Prueba fallida</p>
            {result.error && <p className="text-red-200/80 text-xs">{result.error}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="border-gold/30 bg-gradient-to-br from-dark via-dark/95 to-blue/20">
        <CardHeader>
          <CardTitle className="text-gold flex items-center gap-2">
            <Database className="h-6 w-6" />
            Verificación del Wizard con Datos Reales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-cream/80 mb-4">
            Esta herramienta verifica que el wizard funcione correctamente con los datos de Supabase.
          </p>

          {(categoriesLoading || itemsLoading || isRunningTests) && (
            <div className="flex items-center gap-2 text-gold">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Ejecutando pruebas...</span>
            </div>
          )}

          <Button
            onClick={runTests}
            disabled={categoriesLoading || itemsLoading || isRunningTests}
            className="gradient-gold text-dark font-semibold"
          >
            {isRunningTests ? "Ejecutando..." : "Ejecutar Pruebas"}
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TestResult
          title="Categorías"
          result={testResults.categories}
          icon={<Package className="h-5 w-5 text-gold" />}
        />
        <TestResult title="Items" result={testResults.items} icon={<Sparkles className="h-5 w-5 text-gold" />} />
        <TestResult
          title="Items por Categoría"
          result={testResults.categoryItems}
          icon={<Database className="h-5 w-5 text-gold" />}
        />
      </div>

      {/* Detalles de los resultados */}
      {testResults.categories.success && testResults.categories.data && (
        <Card className="border-gold/20 bg-dark">
          <CardHeader>
            <CardTitle className="text-cream">Categorías Encontradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {testResults.categories.data.map((category) => (
                <div
                  key={category.id}
                  className={`p-3 rounded-lg border ${
                    category.available ? "border-green-400/30 bg-green-400/10" : "border-yellow-400/30 bg-yellow-400/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <p className="text-cream font-medium">{category.name}</p>
                      <p className="text-xs text-cream/60">
                        {category.productCount} productos • {category.available ? "Disponible" : "No disponible"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {testResults.items.success && testResults.items.data && (
        <Card className="border-gold/20 bg-dark">
          <CardHeader>
            <CardTitle className="text-cream">Items Disponibles (Muestra)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {testResults.items.data.slice(0, 10).map((item) => (
                <div key={item.id} className="p-3 rounded-lg border border-gold/20 bg-gold/5">
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image_url || "/placeholder.svg?height=40&width=40"}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-cream font-medium text-sm">{item.name}</p>
                      <p className="text-gold/80 text-xs">{item.brand || item.provider}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-cream/60">₡{item.price.toLocaleString()}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.type === "product"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-purple-500/20 text-purple-300"
                          }`}
                        >
                          {item.type === "product" ? "Producto" : "Servicio"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {testResults.items.data.length > 10 && (
              <p className="text-cream/60 text-sm mt-3">
                Mostrando 10 de {testResults.items.data.length} items disponibles
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {testResults.categoryItems.success && testResults.categoryItems.data && (
        <Card className="border-gold/20 bg-dark">
          <CardHeader>
            <CardTitle className="text-cream">Items por Categoría (Muestra)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(testResults.categoryItems.data).map(([categoryId, items]) => {
                const category = testResults.categories.data?.find((c) => c.id === categoryId)
                return (
                  <div key={categoryId} className="border border-gold/20 rounded-lg p-4">
                    <h4 className="text-cream font-medium mb-2 flex items-center gap-2">
                      <span>{category?.icon}</span>
                      {category?.name}
                      <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full">{items.length} items</span>
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {items.slice(0, 4).map((item) => (
                        <div key={item.id} className="text-sm text-cream/80 flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.type === "product" ? "bg-green-400" : "bg-purple-400"
                            }`}
                          />
                          {item.name} - ₡{item.price.toLocaleString()}
                        </div>
                      ))}
                      {items.length > 4 && <p className="text-xs text-cream/60">+{items.length - 4} más...</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resumen final */}
      <Card className="border-gold/30 bg-gradient-to-br from-gold/10 to-gold/5">
        <CardContent className="p-6">
          <div className="text-center">
            {Object.values(testResults).every((result) => result.success) ? (
              <div className="space-y-2">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
                <h3 className="text-xl font-semibold text-green-300">¡Todas las pruebas pasaron!</h3>
                <p className="text-cream/80">El wizard está listo para funcionar con datos reales.</p>
              </div>
            ) : (
              <div className="space-y-2">
                <AlertCircle className="h-12 w-12 text-yellow-400 mx-auto" />
                <h3 className="text-xl font-semibold text-yellow-300">Algunas pruebas fallaron</h3>
                <p className="text-cream/80">
                  Revisa los errores arriba y asegúrate de que la tabla items esté poblada correctamente.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
