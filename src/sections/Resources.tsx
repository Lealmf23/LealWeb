import { Link } from 'react-router-dom'
import { Boxes, Map, Monitor, Package } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { resources } from '@/data/site'

const icons = { mods: Package, assets: Boxes, mapas: Map, setup: Monitor } as const

export function Resources() {
  return (
    <Section id="recursos" eyebrow="Biblioteca" title="Recursos para tu ciudad">
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {resources.map((r) => {
          const Icon = icons[r.slug]
          return (
            <Link
              key={r.slug}
              to={r.to}
              className="rounded-[var(--radius-panel)] border border-[var(--border)] bg-[var(--surface)] p-4 transition-all sm:p-5 hover:-translate-y-1 hover:border-[var(--accent)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--accent-subtle)] text-[var(--accent)]">
                <Icon size={22} />
              </span>
              <h3 className="font-display mt-3 text-lg font-bold uppercase sm:text-xl">{r.title}</h3>
              <p className="mt-1 text-xs text-[var(--text-secondary)] sm:text-sm">{r.description}</p>
            </Link>
          )
        })}
      </div>
    </Section>
  )
}
