import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { Badge } from '@/components/arc/badge/badge'
import { Button } from '@/components/arc/button/button'
import { Backdrop } from '@/components/layout/Backdrop'
import { BrandIcon } from '@/components/layout/BrandIcon'
import { ButtonLink } from '@/components/layout/ButtonLink'
import { Section } from '@/components/layout/Section'
import { socials } from '@/data/site'
import { links } from '@/data/workshop'

const discord = socials[3]
const youtube = socials[0]
const kofi = socials[4]

type CopyState = 'idle' | 'copied' | 'error'

/** Copia la invitación al Discord; el rótulo del botón cambia (con la animación de UIArc) para confirmarlo. */
function CopyInvite({ text }: { text: string }) {
  const [state, setState] = useState<CopyState>('idle')
  const timer = useRef<number>(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    let next: CopyState = 'copied'
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      next = 'error'
    }
    setState(next)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 1800)
  }

  return (
    <Button variant="secondary" size="sm" onClick={copy}>
      {state === 'copied' ? (
        <><Check size={14} aria-hidden="true" /> Copiado</>
      ) : state === 'error' ? (
        <>No se pudo copiar</>
      ) : (
        <><Copy size={14} aria-hidden="true" /> Copiar</>
      )}
    </Button>
  )
}

function SideLink({ href, title, text, icon, color }: { href: string; title: string; text: string; icon: string; color: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ['--c' as string]: color }}
      className="group flex items-center gap-4 rounded-[var(--radius-surface)] border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_88%,transparent)] p-5 backdrop-blur-md transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface-raised)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-[color-mix(in_oklab,var(--c)_18%,var(--surface))] text-[var(--c)]">
        <BrandIcon path={icon} size={22} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="font-display block text-2xl font-extrabold leading-none">{title}</span>
        <span className="mt-1 block text-sm text-[var(--text-secondary)]">{text}</span>
      </span>
      <ArrowUpRight
        size={20}
        className="shrink-0 text-[var(--text-secondary)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--foreground)] motion-reduce:transition-none"
        aria-hidden="true"
      />
    </a>
  )
}

export function Community() {
  return (
    <div className="relative isolate overflow-hidden">
      <Backdrop src="community-bg.jpg" position="center 60%" veil={0.6} />
      <Section id="comunidad" title="Sumate a la ciudad">
        <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
          <div className="grid content-start gap-4 rounded-[var(--radius-surface)] border border-[color-mix(in_oklab,#5865f2_55%,var(--border))] bg-[linear-gradient(135deg,rgb(88_101_242/.22),color-mix(in_oklab,var(--surface)_92%,transparent)_60%)] p-6 backdrop-blur-md sm:p-7">
            <Badge tone="info">Contenido nuevo cada semana</Badge>
            <h3 className="font-display text-[clamp(2rem,5vw,2.75rem)] font-black leading-none">
              Compartí tu ciudad en el Discord
            </h3>
            <p className="max-w-[46ch] text-[var(--text-secondary)]">
              Mostrá lo que construís, pedí ayuda con mods y conocé a otros jugadores de Cities: Skylines.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href={discord.url} size="lg" className="!border-[var(--accent)] !bg-[var(--accent)] !text-[var(--accent-foreground)]">
                <BrandIcon path={discord.path} size={18} /> Unirme al Discord
              </ButtonLink>
              <div className="flex max-w-full flex-wrap items-center gap-2 rounded-[var(--radius-control)] border border-[var(--border)] bg-[color-mix(in_oklab,var(--background)_70%,transparent)] py-1.5 pl-3.5 pr-1.5">
                <code className="break-all font-mono text-sm text-[#cfd6ff]">{discord.url.replace('https://', '')}</code>
                <CopyInvite text={discord.url} />
              </div>
            </div>
          </div>

          <div className="grid content-start gap-4">
            <SideLink
              href={youtube.url}
              title="Suscribirme"
              text="Un video nuevo cada semana."
              icon={youtube.path}
              color="#ff3d3d"
            />
            <SideLink
              href={links.kofi}
              title="Apoyar en Ko-fi"
              text="Ayudá a que el canal siga creciendo."
              icon={kofi.path}
              color="#ff5e5b"
            />
          </div>
        </div>
      </Section>
    </div>
  )
}
