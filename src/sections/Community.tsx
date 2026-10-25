import { Button } from '@/components/arc/button/button'
import { Backdrop } from '@/components/layout/Backdrop'
import { Section } from '@/components/layout/Section'
import { socials } from '@/data/site'
import { links } from '@/data/workshop'

const discord = socials[3]
const youtube = socials[0]

export function Community() {
  return (
    <div className="relative isolate overflow-hidden">
      <Backdrop src="community-bg.jpg" position="center 60%" veil={0.6} />
      <Section id="comunidad" title="Sumate a la ciudad">
      <div className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius-surface)] border border-[var(--border-strong)] bg-[color-mix(in_oklab,var(--surface)_88%,transparent)] p-7 backdrop-blur-md sm:flex-row sm:items-center">
        <p className="max-w-xl text-lg">
          Contenido nuevo cada semana. Sumate al Discord, compartí tu ciudad y, si te gusta el contenido, podés apoyar el canal en Ko-fi.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            className="!border-[var(--accent)] !bg-[var(--accent)] !text-[var(--accent-foreground)]"
            onClick={() => window.open(discord.url, '_blank', 'noopener')}
          >
            Unirme al Discord
          </Button>
          <Button
            variant="secondary"
            onClick={() => window.open(youtube.url, '_blank', 'noopener')}
          >
            Suscribirme
          </Button>
          <Button
            variant="secondary"
            onClick={() => window.open(links.kofi, '_blank', 'noopener')}
          >
            Apoyar en Ko-fi
          </Button>
        </div>
      </div>
      </Section>
    </div>
  )
}
