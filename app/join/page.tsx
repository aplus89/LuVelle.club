import { JoinWizard } from "@/components/join/join-wizard"
import { getPlans, getActiveCategories } from "@/lib/supabase/queries"

export default async function JoinPage() {
  const [plans, categories] = await Promise.all([getPlans(), getActiveCategories()])

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-font text-4xl md:text-5xl font-bold mb-4">Creá tu Beauty Box</h1>
            <p className="text-xl text-[hsl(var(--brand-cream))]/80">Personalizá tu experiencia en 3 simples pasos</p>
          </div>

          <JoinWizard plans={plans} categories={categories} />
        </div>
      </div>
    </main>
  )
}
