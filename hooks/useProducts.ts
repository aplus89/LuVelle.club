"use client"

import { useState, useEffect } from "react"
import {
  getAvailableItems,
  getCategoriesFromItems,
  getFallbackCategories,
  getAllServices,
  type Item,
  type CategoryFromItems,
} from "@/lib/supabase"

export function useItems() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAvailableItems()
      setItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching items")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return { items, loading, error, refetch: fetchItems }
}

export function useCategoriesFromItems() {
  const [categories, setCategories] = useState<CategoryFromItems[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)

      // Try to get categories from database
      const data = await getCategoriesFromItems()

      if (data.length === 0) {
        // If no categories found, use fallback
        console.warn("No categories found in database, using fallback categories")
        setCategories(getFallbackCategories())
      } else {
        setCategories(data)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error fetching categories"
      setError(errorMessage)

      // Use fallback categories on error
      console.warn("Error fetching categories, using fallback:", errorMessage)
      setCategories(getFallbackCategories())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return { categories, loading, error, refetch: fetchCategories }
}

export function useServices() {
  const [services, setServices] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllServices()
      setServices(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching services")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  return { services, loading, error, refetch: fetchServices }
}

// Legacy hooks for backward compatibility
export const useProducts = useItems
export const useCategories = useCategoriesFromItems
