import { socials } from '@/data/site'
import { BrandIcon } from './BrandIcon'
import { asset } from '@/lib/utils'

export function Footer() {
  return (
    <footer className="border-t-2 border-[var(--foreground)] px-5 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <img src={asset('logo-mark.png')} alt="" width={445} height={249} className="h-8 w-auto" />
          <p className="text-xs text-[var(--text-muted)]">
            Construimos ciudades, rompemos el tráfico y lo intentamos de nuevo.
          </p>
        </div>
        <ul className="flex items-center gap-1" aria-label="Redes sociales">
          {socials.map((s) => (
            <li key={s.id}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]"
              >
                <BrandIcon path={s.path} size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-4 max-w-6xl text-center text-xs text-[var(--text-muted)] sm:text-left">
        © {new Date().getFullYear()} Leal. Todos los derechos reservados.
      </p>
    </footer>
  )
}
