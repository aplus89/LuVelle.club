"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Persona } from "@/lib/supabase/types"

interface PersonaContextType {
  persona: Persona
  setPersona: (persona: Persona) => void
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined)

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>("user")

  // Load persona from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("luvelle-persona")
    if (saved && (saved === "user" || saved === "provider" || saved === "brand")) {
      setPersonaState(saved)
    }
  }, [])

  // Save persona to localStorage when it changes
  const setPersona = (newPersona: Persona) => {
    setPersonaState(newPersona)
    localStorage.setItem("luvelle-persona", newPersona)
  }

  return <PersonaContext.Provider value={{ persona, setPersona }}>{children}</PersonaContext.Provider>
}

export function usePersona() {
  const context = useContext(PersonaContext)
  if (context === undefined) {
    throw new Error("usePersona must be used within a PersonaProvider")
  }
  return context
}
