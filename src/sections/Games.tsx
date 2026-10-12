import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/arc/badge/badge'
import { Section } from '@/components/layout/Section'
import { games } from '@/data/site'
import { asset } from '@/lib/utils'

export function Games() {
  return (
    <div className="relative isolate overflow-hidden">
      <img
        src={asset('games-bg.jpg')}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_40%]"
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--background)_0%,color-mix(in_oklab,var(--background)_30%,transparent)_25%,color-mix(in_oklab,var(--background)_38%,transparent)_75%,var(--background)_100%)]"
        aria-hidden="true"
      />
      <Section id="juegos" eyebrow="Explora por juego" title="¿Qué construimos hoy?">
        <div className="grid gap-5 md:grid-cols-3">
          {games.map((game, i) => (
            <Link
              key={game.slug}
              to={`/juegos/${game.slug}`}
              className="group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-[var(--radius-panel)] border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_72%,transparent)] p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[var(--accent)]"
            >
              <span
                className="font-display pointer-events-none absolute -right-2 -top-6 text-[5.5rem] font-extrabold leading-none text-[var(--accent-subtle)]"
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <div>
                <Badge tone={i === 0 ? 'info' : 'neutral'}>{game.tag}</Badge>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold uppercase">{game.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{game.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
                  Explorar{' '}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  )
}
