import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/arc/button/button'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/arc/drawer/drawer'
import { nav, socials } from '@/data/site'
import { BrandIcon } from './BrandIcon'
import { asset } from '@/lib/utils'

const youtube = socials[0]

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Principal"
        className={[
          'pointer-events-auto flex items-center gap-1 rounded-full border border-[var(--border)] px-2 py-1.5 backdrop-blur-xl transition-all duration-300',
          scrolled
            ? 'bg-[color-mix(in_oklab,var(--surface)_88%,transparent)] shadow-[var(--shadow-floating)]'
            : 'bg-[color-mix(in_oklab,var(--surface)_60%,transparent)]',
        ].join(' ')}
      >
        <Link
          to="/"
          className="font-display flex items-center gap-2 rounded-full py-1 pl-3 pr-3 text-xl font-extrabold uppercase tracking-wide text-[var(--foreground)]"
        >
          <img src={asset('logo-96.png')} alt="" width={28} height={28} className="h-7 w-7 rounded-lg" />
          Leal
        </Link>

        <ul className="hidden items-center md:flex">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [
                    'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[var(--accent-subtle)] text-[var(--accent)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="ml-1 flex items-center gap-1">
          <Button size="sm" onClick={() => window.open(youtube.url, '_blank', 'noopener')}>
            Suscribirme
          </Button>
          <Drawer>
            <DrawerTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menú"
                className="grid h-9 w-9 place-items-center rounded-full text-[var(--foreground)] hover:bg-[var(--surface-muted)] md:hidden"
              >
                <Menu size={20} />
              </button>
            </DrawerTrigger>
            <DrawerContent side="bottom" title="Menú" description="Navega por el sitio">
              <div className="flex flex-col gap-1 pb-4">
                {nav.map((item) => (
                  <DrawerClose key={item.to} asChild>
                    <button
                      type="button"
                      onClick={() => navigate(item.to)}
                      className="font-display rounded-2xl px-4 py-3 text-left text-xl font-bold uppercase text-[var(--foreground)] hover:bg-[var(--surface-muted)]"
                    >
                      {item.label}
                    </button>
                  </DrawerClose>
                ))}
                <div className="mt-3 flex gap-2 px-2">
                  {socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full bg-[var(--surface-muted)] text-[var(--foreground)]"
                    >
                      <BrandIcon path={s.path} />
                    </a>
                  ))}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  )
}
