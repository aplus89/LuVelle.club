"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Mail, Phone, ExternalLink, Calendar, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProviderApplication {
  id: string
  name: string
  email: string
  whatsapp: string
  city: string
  categories: string[]
  portfolio_url: string
  message: string
  plan_requested: string
  status: string
  created_at: string
}

interface BrandApplication {
  id: string
  brand_name: string
  contact_name: string
  email: string
  whatsapp: string
  catalog_url: string
  country: string
  message: string
  status: string
  created_at: string
}

export default function AdminApplicationsPage() {
  const [providerApps, setProviderApps] = useState<ProviderApplication[]>([])
  const [brandApps, setBrandApps] = useState<BrandApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [providerFilter, setProviderFilter] = useState<string>("all")
  const [brandFilter, setBrandFilter] = useState<string>("all")

  const handleLogin = () => {
    // Simple password protection (replace with proper auth in production)
    if (password === "luvelle2025") {
      setAuthenticated(true)
      loadApplications()
    } else {
      alert("Contraseña incorrecta")
    }
  }

  const loadApplications = async () => {
    setLoading(true)
    try {
      console.log("[v0] Fetching applications...")
      const response = await fetch("/api/admin/applications")
      const data = await response.json()

      console.log("[v0] API response:", data)
      console.log("[v0] Provider apps:", data.providerApplications)
      console.log("[v0] Brand apps:", data.brandApplications)

      if (data.success) {
        setProviderApps(data.providerApplications || [])
        setBrandApps(data.brandApplications || [])
        console.log("[v0] State updated - Providers:", data.providerApplications?.length || 0)
        console.log("[v0] State updated - Brands:", data.brandApplications?.length || 0)
      } else {
        console.error("[v0] API returned success: false", data)
      }
    } catch (error) {
      console.error("[v0] Error loading applications:", error)
    }
    setLoading(false)
  }

  const updateStatus = async (
    type: "provider" | "brand",
    id: string,
    newStatus: string,
    email: string,
    name: string,
  ) => {
    try {
      const response = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, id, status: newStatus }),
      })

      if (response.ok) {
        if (newStatus === "Aprobada") {
          const whatsappMessage = encodeURIComponent(
            `¡Felicidades ${name}! Tu aplicación para ${type === "provider" ? "LuVelle Pro" : "alianza con LuVelle"} ha sido aprobada. 🎉\n\nPróximo paso: Crear tu cuenta en crm.luvelle.club`,
          )
          const phoneNumber =
            type === "provider"
              ? providerApps.find((a) => a.id === id)?.whatsapp
              : brandApps.find((a) => a.id === id)?.whatsapp
          const cleanPhone = phoneNumber?.replace(/[^0-9]/g, "")

          alert(
            `✅ Aplicación aprobada!\n\n` +
              `Email enviado a: ${email}\n` +
              `WhatsApp: ${phoneNumber}\n\n` +
              `Link de registro: https://crm.luvelle.club/register\n\n` +
              `Se abrirá WhatsApp para que puedas enviar el mensaje.`,
          )

          if (cleanPhone) {
            window.open(`https://wa.me/${cleanPhone}?text=${whatsappMessage}`, "_blank")
          }
        }

        loadApplications()
      }
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const filteredProviderApps = providerApps.filter((app) => {
    if (providerFilter === "all") return true
    return app.status === providerFilter
  })

  const filteredBrandApps = brandApps.filter((app) => {
    if (brandFilter === "all") return true
    return app.status === brandFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Nuevo":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Contactada":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Aprobada":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Rechazada":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#141322] flex items-center justify-center px-4">
        <Card className="p-8 max-w-md w-full bg-white/5 backdrop-blur border-white/10">
          <h1 className="text-2xl font-bold text-[#f4cc6e] mb-6 text-center">Admin Panel</h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40"
            />
            <Button onClick={handleLogin} className="w-full bg-[#f4cc6e] text-[#141322] hover:bg-[#f4cc6e]/90">
              Ingresar
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141322] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#f4cc6e]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#141322] py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#f4cc6e]">Gestión de Aplicaciones</h1>
          <Button
            onClick={loadApplications}
            variant="outline"
            className="border-[#f4cc6e]/30 text-[#f4cc6e] bg-transparent"
          >
            Actualizar
          </Button>
        </div>

        <Tabs defaultValue="providers" className="space-y-6">
          <TabsList className="bg-white/5">
            <TabsTrigger
              value="providers"
              className="data-[state=active]:bg-[#f4cc6e] data-[state=active]:text-[#141322]"
            >
              Proveedoras ({providerApps.length})
            </TabsTrigger>
            <TabsTrigger value="brands" className="data-[state=active]:bg-[#f4cc6e] data-[state=active]:text-[#141322]">
              Marcas ({brandApps.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="providers" className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-5 h-5 text-[#efedea]/60" />
              <Select value={providerFilter} onValueChange={setProviderFilter}>
                <SelectTrigger className="w-48 bg-white/10 border-white/20 text-[#efedea]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos ({providerApps.length})</SelectItem>
                  <SelectItem value="Nuevo">
                    Nuevo ({providerApps.filter((a) => a.status === "Nuevo").length})
                  </SelectItem>
                  <SelectItem value="Contactada">
                    Contactada ({providerApps.filter((a) => a.status === "Contactada").length})
                  </SelectItem>
                  <SelectItem value="Aprobada">
                    Aprobada ({providerApps.filter((a) => a.status === "Aprobada").length})
                  </SelectItem>
                  <SelectItem value="Rechazada">
                    Rechazada ({providerApps.filter((a) => a.status === "Rechazada").length})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredProviderApps.length === 0 && (
              <p className="text-center text-[#efedea]/60 py-8">No hay aplicaciones con este filtro</p>
            )}

            {filteredProviderApps.map((app) => (
              <Card key={app.id} className="p-6 bg-white/5 backdrop-blur border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-[#efedea]">{app.name}</h3>
                      <Badge className={getStatusBadge(app.status || "Nuevo")}>{app.status || "Nuevo"}</Badge>
                    </div>
                    <p className="text-sm text-[#efedea]/60 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(app.created_at).toLocaleDateString("es-CR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Select
                    value={app.status || "Nuevo"}
                    onValueChange={(value) => updateStatus("provider", app.id, value, app.email, app.name)}
                  >
                    <SelectTrigger className="w-40 bg-white/10 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nuevo">Nuevo</SelectItem>
                      <SelectItem value="Contactada">Contactada</SelectItem>
                      <SelectItem value="Aprobada">✅ Aprobada</SelectItem>
                      <SelectItem value="Rechazada">❌ Rechazada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {app.plan_requested && (
                  <Badge className="mb-3 bg-[#f4cc6e]/20 text-[#f4cc6e] border-[#f4cc6e]/30">
                    Plan: {app.plan_requested}
                  </Badge>
                )}

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-[#efedea]/80">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${app.email}`} className="hover:text-[#f4cc6e]">
                      {app.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[#efedea]/80">
                    <Phone className="w-4 h-4" />
                    <a
                      href={`https://wa.me/${app.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#f4cc6e]"
                    >
                      {app.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-[#efedea]/60 mb-1">Ciudad:</p>
                  <p className="text-[#efedea]">{app.city}</p>
                </div>

                {app.portfolio_url && (
                  <a
                    href={app.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#f4cc6e] hover:underline mb-4"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver Portfolio
                  </a>
                )}

                <div className="mb-4">
                  <p className="text-sm text-[#efedea]/60 mb-2">Categorías:</p>
                  <div className="flex flex-wrap gap-2">
                    {app.categories.map((cat) => (
                      <Badge key={cat} variant="outline" className="border-[#f4cc6e]/30 text-[#efedea]">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                {app.message && (
                  <div>
                    <p className="text-sm text-[#efedea]/60 mb-2">Mensaje:</p>
                    <p className="text-[#efedea]/80 italic">{app.message}</p>
                  </div>
                )}
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="brands" className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-5 h-5 text-[#efedea]/60" />
              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger className="w-48 bg-white/10 border-white/20 text-[#efedea]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos ({brandApps.length})</SelectItem>
                  <SelectItem value="Nuevo">Nuevo ({brandApps.filter((a) => a.status === "Nuevo").length})</SelectItem>
                  <SelectItem value="Contactada">
                    Contactada ({brandApps.filter((a) => a.status === "Contactada").length})
                  </SelectItem>
                  <SelectItem value="Aprobada">
                    Aprobada ({brandApps.filter((a) => a.status === "Aprobada").length})
                  </SelectItem>
                  <SelectItem value="Rechazada">
                    Rechazada ({brandApps.filter((a) => a.status === "Rechazada").length})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredBrandApps.length === 0 && (
              <p className="text-center text-[#efedea]/60 py-8">No hay aplicaciones con este filtro</p>
            )}

            {filteredBrandApps.map((app) => (
              <Card key={app.id} className="p-6 bg-white/5 backdrop-blur border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-[#efedea]">{app.brand_name}</h3>
                      <Badge className={getStatusBadge(app.status || "Nuevo")}>{app.status || "Nuevo"}</Badge>
                    </div>
                    <p className="text-[#efedea]/60">{app.contact_name}</p>
                    <p className="text-sm text-[#efedea]/60 flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(app.created_at).toLocaleDateString("es-CR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Select
                    value={app.status || "Nuevo"}
                    onValueChange={(value) => updateStatus("brand", app.id, value, app.email, app.brand_name)}
                  >
                    <SelectTrigger className="w-40 bg-white/10 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nuevo">Nuevo</SelectItem>
                      <SelectItem value="Contactada">Contactada</SelectItem>
                      <SelectItem value="Aprobada">✅ Aprobada</SelectItem>
                      <SelectItem value="Rechazada">❌ Rechazada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-[#efedea]/80">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${app.email}`} className="hover:text-[#f4cc6e]">
                      {app.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[#efedea]/80">
                    <Phone className="w-4 h-4" />
                    <a
                      href={`https://wa.me/${app.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#f4cc6e]"
                    >
                      {app.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-[#efedea]/60 mb-1">País:</p>
                  <p className="text-[#efedea]">{app.country}</p>
                </div>

                {app.catalog_url && (
                  <a
                    href={app.catalog_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#f4cc6e] hover:underline mb-4"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver Catálogo
                  </a>
                )}

                {app.message && (
                  <div>
                    <p className="text-sm text-[#efedea]/60 mb-2">Mensaje:</p>
                    <p className="text-[#efedea]/80 italic">{app.message}</p>
                  </div>
                )}
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
