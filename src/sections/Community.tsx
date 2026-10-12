import { Button } from '@/components/arc/button/button'
import { Section } from '@/components/layout/Section'
import { socials } from '@/data/site'
import { asset } from '@/lib/utils'

const discord = socials[3]
const youtube = socials[0]

export function Community() {
  return (
    <div className="relative isolate overflow-hidden">
      <img
        src={asset('community-bg.jpg')}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_60%]"
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--background)_0%,color-mix(in_oklab,var(--background)_35%,transparent)_30%,color-mix(in_oklab,var(--background)_45%,transparent)_75%,var(--background)_100%)]"
        aria-hidden="true"
      />
      <Section id="comunidad" eyebrow="Comunidad" title="Sumate a la ciudad">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius-surface)] border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_75%,transparent)] p-6 backdrop-blur-md sm:flex-row sm:items-center">
          <p className="max-w-xl text-base text-[var(--text-secondary)]">
            Contenido nuevo cada semana. Sumate al Discord, compartí tu ciudad y seguimos construyendo juntos.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => window.open(discord.url, '_blank', 'noopener')}>Unirme al Discord</Button>
            <Button variant="secondary" onClick={() => window.open(youtube.url, '_blank', 'noopener')}>
              Suscribirme
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
