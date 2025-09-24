"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Settings, Copy, Eye, EyeOff } from "lucide-react"
import { checkEnvironmentVariables } from "@/lib/supabase"

export function EnvironmentCheck() {
  const [envStatus, setEnvStatus] = useState<{
    hasSupabaseUrl: boolean
    hasSupabaseKey: boolean
    supabaseUrl?: string
    error?: string
  } | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const status = checkEnvironmentVariables()
    setEnvStatus(status)
  }, [])

  // Only show if there are missing environment variables
  if (!envStatus || (envStatus.hasSupabaseUrl && envStatus.hasSupabaseKey)) {
    return null
  }

  const copyEnvTemplate = () => {
    const template = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Example:
# NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

    navigator.clipboard.writeText(template)
  }

  return (
    <Card className="border-red-400/30 bg-gradient-to-br from-red-500/10 to-orange-500/10 mb-6">
      <CardHeader>
        <CardTitle className="text-red-300 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Variables de Entorno Faltantes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-2 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-red-300 font-medium">Configuración de Supabase requerida</p>
            <p className="text-red-200/80 text-sm mt-1">{envStatus.error}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {envStatus.hasSupabaseUrl ? (
              <CheckCircle className="h-4 w-4 text-green-400" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-400" />
            )}
            <span className="text-cream text-sm">
              NEXT_PUBLIC_SUPABASE_URL: {envStatus.hasSupabaseUrl ? "✓ Configurada" : "✗ Faltante"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {envStatus.hasSupabaseKey ? (
              <CheckCircle className="h-4 w-4 text-green-400" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-400" />
            )}
            <span className="text-cream text-sm">
              NEXT_PUBLIC_SUPABASE_ANON_KEY: {envStatus.hasSupabaseKey ? "✓ Configurada" : "✗ Faltante"}
            </span>
          </div>

          {envStatus.supabaseUrl && (
            <div className="mt-2">
              <Button
                onClick={() => setShowDetails(!showDetails)}
                size="sm"
                variant="ghost"
                className="text-xs text-cream/60 hover:text-cream"
              >
                {showDetails ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                {showDetails ? "Ocultar" : "Mostrar"} detalles
              </Button>
              {showDetails && (
                <p className="text-xs text-cream/60 mt-1 font-mono bg-dark/60 p-2 rounded">
                  URL: {envStatus.supabaseUrl}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg">
          <p className="text-blue-300 font-medium text-sm mb-3">🔧 Pasos para configurar:</p>
          <div className="space-y-2 text-xs text-blue-200/80">
            <p>
              1. Crea un archivo <code className="bg-dark/60 px-1 rounded">.env.local</code> en la raíz del proyecto
            </p>
            <p>2. Agrega las variables de entorno de Supabase</p>
            <p>3. Reinicia el servidor de desarrollo</p>
          </div>

          <div className="mt-3 flex gap-2">
            <Button
              onClick={copyEnvTemplate}
              size="sm"
              variant="outline"
              className="text-xs bg-transparent border-blue-400/30 text-blue-300 hover:bg-blue-400/10"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copiar plantilla .env.local
            </Button>
            <Button
              onClick={() => window.open("https://supabase.com/dashboard", "_blank")}
              size="sm"
              variant="outline"
              className="text-xs bg-transparent border-blue-400/30 text-blue-300 hover:bg-blue-400/10"
            >
              <Settings className="h-3 w-3 mr-1" />
              Abrir Supabase
            </Button>
          </div>
        </div>

        <div className="text-xs text-cream/60 bg-dark/40 p-3 rounded-lg">
          <p className="font-medium mb-1">💡 ¿Dónde encontrar estas variables?</p>
          <p>1. Ve a tu proyecto en Supabase Dashboard</p>
          <p>2. Settings → API</p>
          <p>3. Copia "Project URL" y "anon public" key</p>
        </div>
      </CardContent>
    </Card>
  )
}
