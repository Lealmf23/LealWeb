import { ButtonLink } from '@/components/layout/ButtonLink'
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
          <ButtonLink
            href={discord.url}
            className="!border-[var(--accent)] !bg-[var(--accent)] !text-[var(--accent-foreground)]"
          >
            Unirme al Discord
          </ButtonLink>
          <ButtonLink variant="secondary" href={youtube.url}>
            Suscribirme
          </ButtonLink>
          <ButtonLink variant="secondary" href={links.kofi}>
            Apoyar en Ko-fi
          </ButtonLink>
        </div>
      </div>
      </Section>
    </div>
  )
}
