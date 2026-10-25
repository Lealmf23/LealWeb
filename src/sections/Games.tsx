import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Backdrop } from '@/components/layout/Backdrop'
import { Section } from '@/components/layout/Section'
import { games } from '@/data/site'

export function Games() {
  return (
    <div className="relative isolate overflow-hidden">
      <Backdrop src="games-bg.jpg" position="center 40%" veil={0.72} />
      <Section id="juegos" title="¿Qué construimos hoy?">
      <ul className="divide-y divide-[var(--border)] border-b border-[var(--border)]">
        {games.map((game, i) => (
          <li key={game.slug}>
            <Link
              to={`/juegos/${game.slug}`}
              className="group grid gap-1 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_auto] sm:items-center sm:gap-8"
            >
              <h3 className="font-display text-4xl font-extrabold leading-none sm:text-5xl">{game.title}</h3>
              <p className="max-w-md text-[var(--text-secondary)]">
                <span
                  className={[
                    'mr-2 rounded px-1.5 py-0.5 text-sm font-semibold',
                    i === 0 ? 'bg-[var(--accent)] text-[var(--accent-foreground)]' : 'bg-[var(--surface-muted)]',
                  ].join(' ')}
                >
                  {game.tag}
                </span>
                {game.description}
              </p>
              <ArrowUpRight
                size={28}
                className="hidden transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
      </Section>
    </div>
  )
}
