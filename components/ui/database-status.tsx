"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { checkTableStructure } from "@/lib/supabase"
import { AlertTriangle, CheckCircle, Database, RefreshCw, ExternalLink } from "lucide-react"

export function DatabaseStatus() {
  const [status, setStatus] = useState<{
    hasTable: boolean
    hasAvailableColumn: boolean
    columns: string[]
    itemCount: number
    error?: string
  } | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const checkStatus = async () => {
    setIsChecking(true)
    try {
      const result = await checkTableStructure()
      setStatus(result)
    } catch (error) {
      setStatus({
        hasTable: false,
        hasAvailableColumn: false,
        columns: [],
        itemCount: 0,
        error: error instanceof Error ? error.message : "Error desconocido",
      })
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  // Only show if there are issues
  if (!status || (status.hasTable && status.hasAvailableColumn && status.itemCount > 0)) {
    return null
  }

  return (
    <Card className="border-yellow-400/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 mb-6">
      <CardHeader>
        <CardTitle className="text-yellow-300 flex items-center gap-2">
          <Database className="h-5 w-5" />
          Estado de la Base de Datos
          <Button onClick={checkStatus} disabled={isChecking} size="sm" variant="ghost">
            <RefreshCw className={`h-4 w-4 ${isChecking ? "animate-spin" : ""}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {status?.error && (
          <div className="flex items-start gap-2 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-300 font-medium">Error de conexión</p>
              <p className="text-red-200/80 text-sm">{status.error}</p>
              <p className="text-red-200/60 text-xs mt-1">
                Verifica que las variables de entorno estén configuradas correctamente.
              </p>
            </div>
          </div>
        )}

        {status && !status.error && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {status.hasTable ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-400" />
              )}
              <span className="text-cream text-sm">
                Tabla 'items': {status.hasTable ? `Existe (${status.itemCount} registros)` : "No encontrada"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {status.hasAvailableColumn ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
              )}
              <span className="text-cream text-sm">
                Columna 'available': {status.hasAvailableColumn ? "Existe" : "Faltante"}
              </span>
            </div>

            {status.itemCount === 0 && status.hasTable && (
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <span className="text-cream text-sm">La tabla está vacía - necesita datos</span>
              </div>
            )}

            {status.columns.length > 0 && (
              <div className="mt-3">
                <p className="text-cream/80 text-sm mb-2">Columnas encontradas:</p>
                <div className="flex flex-wrap gap-1">
                  {status.columns.map((column) => (
                    <span
                      key={column}
                      className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-400/30"
                    >
                      {column}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(!status.hasTable || !status.hasAvailableColumn || status.itemCount === 0) && (
              <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
                <p className="text-yellow-300 font-medium text-sm mb-2">🔧 Acciones requeridas:</p>
                <div className="space-y-2 text-xs text-yellow-200/80">
                  {!status.hasTable && <p>• Crear la tabla 'items' ejecutando el script fix-items-table.sql</p>}
                  {status.hasTable && !status.hasAvailableColumn && (
                    <p>• Agregar la columna 'available' ejecutando el script fix-items-table.sql</p>
                  )}
                  {status.hasTable && status.itemCount === 0 && (
                    <p>• Poblar la tabla con datos ejecutando el script populate-items.sql</p>
                  )}
                </div>
                <div className="mt-3 flex gap-2">
                  <Button
                    onClick={() => window.open("https://supabase.com/dashboard", "_blank")}
                    size="sm"
                    variant="outline"
                    className="text-xs bg-transparent border-yellow-400/30 text-yellow-300 hover:bg-yellow-400/10"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Abrir Supabase
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
