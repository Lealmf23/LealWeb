import { Carousel } from '@/components/arc/carousel/carousel'
import { Backdrop } from '@/components/layout/Backdrop'
import { ButtonLink } from '@/components/layout/ButtonLink'
import { Section } from '@/components/layout/Section'
import { WorkshopCard } from '@/components/layout/WorkshopCard'
import { paradoxAssets } from '@/data/paradox'

const LABEL = 'Cities: Skylines 2 · Paradox Mods'

/** Más nuevos primero: por fecha de creación; sin fecha (la API falló), por ID, que crece con el tiempo. */
const latest = [...paradoxAssets]
  .sort((a, b) => (b.created ?? '').localeCompare(a.created ?? '') || Number(b.id) - Number(a.id))
  .slice(0, 4)

export function LatestAssets() {
  return (
    <div className="relative isolate overflow-hidden">
      <Backdrop src="assets-bg.jpg" position="center 55%" veil={0.72} />
      <Section
        id="nuevos-assets"
        title="Nuevos assets"
        action={
          <ButtonLink variant="secondary" to="/recursos#assets">
            Ver todos los assets
          </ButtonLink>
        }
      >
        {/* En móvil se desliza; desde tablet, cuadrícula. */}
        <div className="sm:hidden">
          <Carousel label="Nuevos assets" slideSize="min(78cqw, 300px)" slideLabel={(i, n) => `Asset ${i + 1} de ${n}`}>
            {latest.map((item) => (
              <WorkshopCard key={item.id} item={item} label={LABEL} />
            ))}
          </Carousel>
        </div>
        <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((item) => (
            <WorkshopCard key={item.id} item={item} label={LABEL} />
          ))}
        </div>
      </Section>
    </div>
  )
}
