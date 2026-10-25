import { PageHeader } from '@/components/layout/PageHeader'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/arc/button/button'
import { Section } from '@/components/layout/Section'
import { WorkshopCard } from '@/components/layout/WorkshopCard'
import { paradoxAssets } from '@/data/paradox'
import { links, workshopAssets, workshopMaps } from '@/data/workshop'

function Subheading({ children }: { children: string }) {
  return <h3 className="font-display mb-4 mt-2 text-xl font-bold uppercase text-[var(--foreground)]">{children}</h3>
}

function LinkPanel({ title, text, href, cta }: { title: string; text: string; href: string; cta: string }) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-[var(--radius-panel)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:flex-row sm:items-center">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{text}</p>
      </div>
      <Button variant="secondary" onClick={() => window.open(href, '_blank', 'noopener')}>
        {cta} <ArrowUpRight size={16} aria-hidden="true" />
      </Button>
    </div>
  )
}

export function ResourcesPage() {
  const { hash } = useLocation()

  // Lleva a la sección indicada en la URL (#mods, #assets, #mapas).
  useEffect(() => {
    if (!hash) return
    const target = document.getElementById(hash.slice(1))
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <div>
      <PageHeader
        eyebrow="Biblioteca"
        title="Recursos para tu ciudad"
        description="Mods, assets y mapas para Cities: Skylines y Cities: Skylines 2."
      />

      <Section id="mods" eyebrow="Recursos" title="Mods">
        <div className="grid gap-4 lg:grid-cols-2">
          <LinkPanel
            title="Mi lista de mods de Cities: Skylines 2"
            text="El playset que uso en el canal: suscríbete y juega con los mismos mods."
            href={links.playsetCs2}
            cta="Ver lista"
          />
          <LinkPanel
            title="Mis creaciones en Paradox Mods"
            text="Mods y assets que publico para Cities: Skylines 2, en mi perfil de autor."
            href={links.paradoxProfile}
            cta="Ver perfil"
          />
        </div>
      </Section>

      <Section id="assets" eyebrow="Recursos" title="Assets">
        <Subheading>Cities: Skylines 2</Subheading>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {paradoxAssets.map((item) => (
            <WorkshopCard key={item.id} item={item} label="Cities: Skylines 2 · Paradox Mods" />
          ))}
        </div>
        <div className="mt-6">
          <Button variant="secondary" onClick={() => window.open(links.paradoxCs2, '_blank', 'noopener')}>
            Ver todo en Paradox Mods <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
        </div>
        <div className="mt-10">
          <Subheading>Cities: Skylines</Subheading>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {workshopAssets.map((item) => (
              <WorkshopCard key={item.id} item={item} label={`${item.game} · Steam Workshop`} />
            ))}
          </div>
          <div className="mt-6">
            <Button variant="secondary" onClick={() => window.open(links.steamCs1, '_blank', 'noopener')}>
              Ver todo en Steam Workshop <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Section>

      <Section id="mapas" eyebrow="Recursos" title="Mapas">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {workshopMaps.map((item) => (
            <WorkshopCard key={item.id} item={item} label={`${item.game} · Steam Workshop`} />
          ))}
        </div>
      </Section>
    </div>
  )
}
