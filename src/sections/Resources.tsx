import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/arc/badge/badge'
import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { paradoxAssets } from '@/data/paradox'
import { resources } from '@/data/site'
import { workshopAssets, workshopMaps } from '@/data/workshop'

/** Cada categoría lleva el color de una zona del juego. */
const zone = {
  mods: 'var(--zone-comercial)',
  assets: 'var(--zone-residencial)',
  mapas: 'var(--zone-industrial)',
  setup: 'var(--zone-oficina)',
} as const

/** Texto del Badge de cada categoría; los conteos salen de los datos del sitio. */
const badge = {
  mods: 'Playset de CS2',
  assets: `${paradoxAssets.length + workshopAssets.length} creaciones`,
  mapas: `${workshopMaps.length} mapas`,
  setup: 'Mi equipo',
} as const

export function Resources() {
  return (
    <Section id="recursos" title="Recursos para tu ciudad">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((r, i) => (
          <Reveal key={r.slug} delay={i * 0.08} className="h-full">
            <Link
              to={r.to}
              className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-[var(--radius-panel)] border border-[var(--border-strong)] bg-[var(--surface)] p-5 pt-7 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface-raised)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span
                className="absolute inset-x-0 top-0 h-2 transition-[height] group-hover:h-3"
                style={{ background: zone[r.slug] }}
                aria-hidden="true"
              />
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-3xl font-extrabold leading-none">{r.title}</h3>
                <ArrowUpRight
                  size={22}
                  className="shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </div>
              <Badge tone="info">{badge[r.slug]}</Badge>
              <p className="flex-1 text-sm text-[var(--text-secondary)]">{r.description}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
