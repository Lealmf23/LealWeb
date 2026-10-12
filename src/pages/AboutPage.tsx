import { PageHeader } from '@/components/layout/PageHeader'
import { Mail } from 'lucide-react'
import { Button } from '@/components/arc/button/button'
import { SocialBar } from '@/components/layout/SocialBar'
import { Section } from '@/components/layout/Section'
import { socials } from '@/data/site'
import { asset } from '@/lib/utils'

const discord = socials[3]
const email = 'contacto@lealmafor.com'

export function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Sobre Leal"
        title="Ciudades con historia"
        description="Gameplays, tutoriales, noticias y transmisiones sobre Cities: Skylines y otros juegos de gestión."
      />

      <section className="px-5 py-10">
        <div className="mx-auto grid max-w-6xl items-start gap-8 rounded-[var(--radius-surface)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 md:grid-cols-[auto_1fr]">
          <img src={asset('logo-96.png')} alt="Logo de Leal" width={96} height={96} className="h-24 w-24 rounded-2xl" />
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold uppercase">Hola, soy Leal</h2>
            <p className="max-w-2xl text-[var(--text-secondary)]">
              Creo contenido sobre Cities: Skylines y Cities: Skylines 2 para PC. Me apasionan los juegos de gestión,
              simulación, mundo abierto y city builders, y comparto cada proyecto desde Argentina.
            </p>
            <p className="max-w-2xl text-[var(--text-secondary)]">
              Este sitio organiza el universo del canal para que puedas pasar de una serie a sus recursos,
              configuración y ciudades sin perderte en el camino.
            </p>
            <SocialBar />
          </div>
        </div>
      </section>

      <Section id="contacto" eyebrow="Contacto" title="¿Hablamos?">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius-surface)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:flex-row sm:items-center">
          <div>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--accent)] hover:underline"
            >
              <Mail size={20} aria-hidden="true" /> {email}
            </a>
            <p className="mt-2 text-[var(--text-secondary)]">
              También podés sumarte al servidor de Discord para compartir con la comunidad.
            </p>
          </div>
          <Button onClick={() => window.open(discord.url, '_blank', 'noopener')}>Unirme al Discord</Button>
        </div>
      </Section>
    </div>
  )
}
