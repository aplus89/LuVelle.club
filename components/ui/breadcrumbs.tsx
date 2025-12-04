import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbsProps {
  items: { label: string; href?: string }[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-[hsl(var(--brand-cream))]/60 mb-8">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="hover:text-[hsl(var(--brand-gold))] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[hsl(var(--brand-cream))]">{item.label}</span>
          )}
          {index < items.length - 1 && <ChevronRight className="w-4 h-4" />}
        </div>
      ))}
    </nav>
  )
}
