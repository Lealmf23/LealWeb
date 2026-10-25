import { Tooltip } from '@/components/arc/tooltip/tooltip'
import { socials } from '@/data/site'
import { BrandIcon } from './BrandIcon'

export function SocialBar() {
  return (
    <ul className="flex flex-wrap gap-2.5" aria-label="Redes sociales">
      {socials.map((s) => (
        <li key={s.id}>
          <Tooltip content={s.handle}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label}: ${s.handle}`}
              className="flex items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] py-2 pl-3 pr-4 text-sm font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <BrandIcon path={s.path} size={18} />
              {s.label}
            </a>
          </Tooltip>
        </li>
      ))}
    </ul>
  )
}
