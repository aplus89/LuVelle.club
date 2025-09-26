import { createClient } from "@supabase/supabase-js"

// Verificar que las variables de entorno existan
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL")
}

if (!supabaseAnonKey) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types based on your database schema
export interface Item {
  id: string
  name: string
  brand?: string
  description?: string
  price: number
  image_url?: string
  category: string
  type: "product" | "service"
  available?: boolean // Made optional to handle cases where column might not exist
  provider?: string
  created_at?: string
  updated_at?: string
}

export interface CategoryFromItems {
  id: string
  name: string
  icon: string
  available: boolean
  productCount: number
}

// Legacy Product type for backward compatibility
export interface Product extends Item {}
export interface Category extends CategoryFromItems {}

// API functions with error handling
export async function getItems(): Promise<Item[]> {
  try {
    const { data, error } = await supabase.from("items").select("*").order("name")

    if (error) {
      console.error("Error fetching items:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Unexpected error fetching items:", error)
    return []
  }
}

export async function getAvailableItems(): Promise<Item[]> {
  try {
    // First try to get items with available column
    let { data, error } = await supabase.from("items").select("*").eq("available", true).order("name")

    // If error mentions available column doesn't exist, try without it
    if (error && error.message.includes("available")) {
      console.warn("Column 'available' not found, fetching all items")
      const result = await supabase.from("items").select("*").order("name")
      data = result.data
      error = result.error
    }

    if (error) {
      console.error("Error fetching available items:", error)
      return []
    }

    // Filter by available if the property exists, otherwise return all
    return (data || []).filter((item: Item) => item.available !== false)
  } catch (error) {
    console.error("Unexpected error fetching available items:", error)
    return []
  }
}

export async function getItemsByCategory(category: string): Promise<Item[]> {
  try {
    console.log("Fetching items for category:", category)

    // First try with available column
    let { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("category", category)
      .eq("available", true)
      .order("name")

    // If error mentions available column doesn't exist, try without it
    if (error && error.message.includes("available")) {
      console.warn("Column 'available' not found, fetching items by category only")
      const result = await supabase.from("items").select("*").eq("category", category).order("name")
      data = result.data
      error = result.error
    }

    if (error) {
      console.error("Error fetching items by category:", error)
      return []
    }

    // Filter by available if the property exists, otherwise return all
    const filteredItems = (data || []).filter((item: Item) => item.available !== false)
    console.log(`Found ${filteredItems.length} available items for category "${category}"`)

    return filteredItems
  } catch (error) {
    console.error("Unexpected error fetching items by category:", error)
    return []
  }
}

export async function getProductsByCategory(category: string): Promise<Item[]> {
  try {
    const items = await getItemsByCategory(category)
    return items.filter((item) => item.type === "product")
  } catch (error) {
    console.error("Error fetching products by category:", error)
    return []
  }
}

export async function getServicesByCategory(category: string): Promise<Item[]> {
  try {
    const items = await getItemsByCategory(category)
    return items.filter((item) => item.type === "service")
  } catch (error) {
    console.error("Error fetching services by category:", error)
    return []
  }
}

export async function getAllServices(): Promise<Item[]> {
  try {
    // First try with available column
    let { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("type", "service")
      .eq("available", true)
      .order("name")

    // If error mentions available column doesn't exist, try without it
    if (error && error.message.includes("available")) {
      console.warn("Column 'available' not found, fetching services only")
      const result = await supabase.from("items").select("*").eq("type", "service").order("name")
      data = result.data
      error = result.error
    }

    if (error) {
      console.error("Error fetching services:", error)
      return []
    }

    // Filter by available if the property exists, otherwise return all
    return (data || []).filter((item: Item) => item.available !== false)
  } catch (error) {
    console.error("Unexpected error fetching services:", error)
    return []
  }
}

// Function to get categories from items with availability info - FIXED VERSION
export async function getCategoriesFromItems(): Promise<CategoryFromItems[]> {
  try {
    // First try to get all columns including available
    let { data, error } = await supabase.from("items").select("category, available")

    // If error mentions available column doesn't exist, try without it
    if (error && error.message.includes("available")) {
      console.warn("Column 'available' not found, fetching categories without availability info")
      const result = await supabase.from("items").select("category")
      data = result.data
      error = result.error
    }

    if (error) {
      console.error("Error fetching categories from items:", error)
      return []
    }

    if (!data || data.length === 0) {
      console.warn("No items found in database")
      return []
    }

    // Get unique categories and count ONLY available products
    const categoryMap = new Map<string, { available: number; total: number }>()

    data.forEach((item) => {
      const current = categoryMap.get(item.category) || { available: 0, total: 0 }
      current.total += 1
      // Only count as available if the available property is explicitly true or doesn't exist (assuming available)
      if (!item.hasOwnProperty("available") || item.available === true) {
        current.available += 1
      }
      categoryMap.set(item.category, current)
    })

    // Map categories to our predefined list with icons
    const categoryIcons: { [key: string]: string } = {
      facial: "✨",
      makeup: "💄",
      corporal: "🌿",
      cabello: "💇",
      bienestar: "💆",
      higiene: "🌸",
      medicamentos: "💊",
      maternidad: "🤰",
      lenceria: "👙",
      perfumeria: "🌺",
      "belleza-facial": "✨",
      "belleza facial": "✨",
      maquillaje: "💄",
      "cuidado-corporal": "🌿",
      "cuidado corporal": "🌿",
      "bienestar-emocional": "💆",
      "bienestar emocional": "💆",
      "higiene-femenina": "🌸",
      "higiene femenina": "🌸",
      "medicamentos-menstruales": "💊",
      perfumería: "🌺",
    }

    const categories: CategoryFromItems[] = []

    categoryMap.forEach((counts, categoryName) => {
      const categoryKey = categoryName.toLowerCase().replace(/\s+/g, "-")
      categories.push({
        id: categoryKey,
        name: categoryName,
        icon: categoryIcons[categoryKey] || categoryIcons[categoryName.toLowerCase()] || "🌟",
        available: counts.available > 0, // Only available if there are available products
        productCount: counts.available, // Show only available product count
      })
    })

    // Add categories that don't exist in database but should be shown as unavailable
    const predefinedCategories = [
      { name: "Medicamentos menstruales", icon: "💊" },
      { name: "Maternidad", icon: "🤰" },
      { name: "Lencería", icon: "👙" },
      { name: "Perfumería", icon: "🌺" },
    ]

    predefinedCategories.forEach((predefined) => {
      const exists = categories.find((c) => c.name.toLowerCase() === predefined.name.toLowerCase())
      if (!exists) {
        categories.push({
          id: predefined.name.toLowerCase().replace(/\s+/g, "-"),
          name: predefined.name,
          icon: predefined.icon,
          available: false,
          productCount: 0,
        })
      }
    })

    return categories.sort((a, b) => {
      // Sort available categories first, then by name
      if (a.available && !b.available) return -1
      if (!a.available && b.available) return 1
      return a.name.localeCompare(b.name)
    })
  } catch (error) {
    console.error("Unexpected error fetching categories from items:", error)
    return []
  }
}

// Function to check if the items table has the required structure
export async function checkTableStructure(): Promise<{
  hasTable: boolean
  hasAvailableColumn: boolean
  columns: string[]
  itemCount: number
  error?: string
}> {
  try {
    // Try to get table structure and count
    const { data, error, count } = await supabase.from("items").select("*", { count: "exact" }).limit(1)

    if (error) {
      return {
        hasTable: false,
        hasAvailableColumn: false,
        columns: [],
        itemCount: 0,
        error: error.message,
      }
    }

    const columns = data && data.length > 0 ? Object.keys(data[0]) : []
    const hasAvailableColumn = columns.includes("available")

    return {
      hasTable: true,
      hasAvailableColumn,
      columns,
      itemCount: count || 0,
    }
  } catch (error) {
    return {
      hasTable: false,
      hasAvailableColumn: false,
      columns: [],
      itemCount: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Fallback function to get categories from constants if database fails
export function getFallbackCategories(): CategoryFromItems[] {
  return [
    {
      id: "belleza-facial",
      name: "Belleza facial",
      icon: "✨",
      available: false,
      productCount: 0,
    },
    {
      id: "maquillaje",
      name: "Maquillaje",
      icon: "💄",
      available: false,
      productCount: 0,
    },
    {
      id: "cuidado-corporal",
      name: "Cuidado corporal",
      icon: "🌿",
      available: false,
      productCount: 0,
    },
    {
      id: "cabello",
      name: "Cabello",
      icon: "💇",
      available: false,
      productCount: 0,
    },
    {
      id: "bienestar-emocional",
      name: "Bienestar emocional",
      icon: "💆",
      available: false,
      productCount: 0,
    },
    {
      id: "higiene-femenina",
      name: "Higiene femenina",
      icon: "🌸",
      available: false,
      productCount: 0,
    },
  ]
}

// Function to submit notification request for unavailable categories
export async function submitCategoryNotification(data: {
  categoryName: string
  email?: string
  whatsapp?: string
}): Promise<{ success: boolean; message: string }> {
  try {
    // Here you would typically save to a database table like "category_notifications"
    // For now, we'll just simulate the API call
    console.log("Category notification submitted:", data)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      message: "Notificación registrada exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al registrar notificación",
    }
  }
}

// Function to check environment variables
export function checkEnvironmentVariables(): {
  hasSupabaseUrl: boolean
  hasSupabaseKey: boolean
  supabaseUrl?: string
  error?: string
} {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return {
    hasSupabaseUrl: !!supabaseUrl,
    hasSupabaseKey: !!supabaseKey,
    supabaseUrl: supabaseUrl ? supabaseUrl.substring(0, 30) + "..." : undefined,
    error: !supabaseUrl
      ? "NEXT_PUBLIC_SUPABASE_URL is missing"
      : !supabaseKey
        ? "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing"
        : undefined,
  }
}
