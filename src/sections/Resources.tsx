import { Link } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { resources } from '@/data/site'

/** Cada categoría lleva el color de una zona del juego. */
const zone = {
  mods: 'var(--zone-comercial)',
  assets: 'var(--zone-residencial)',
  mapas: 'var(--zone-industrial)',
  setup: 'var(--zone-oficina)',
} as const

export function Resources() {
  return (
    <Section id="recursos" title="Recursos para tu ciudad">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((r) => (
          <Link
            key={r.slug}
            to={r.to}
            className="group relative overflow-hidden rounded-[var(--radius-panel)] border border-[var(--border-strong)] bg-[var(--surface)] p-5 pt-7 transition-colors hover:bg-[var(--surface-raised)]"
          >
            <span
              className="absolute inset-x-0 top-0 h-2 transition-[height] group-hover:h-3"
              style={{ background: zone[r.slug] }}
              aria-hidden="true"
            />
            <h3 className="font-display text-3xl font-extrabold leading-none">{r.title}</h3>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">{r.description}</p>
          </Link>
        ))}
      </div>
    </Section>
  )
}
