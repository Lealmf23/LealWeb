import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/arc/drawer/drawer'
import { nav, socials } from '@/data/site'
import { BrandIcon } from './BrandIcon'
import { asset } from '@/lib/utils'

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
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled
          ? 'border-[var(--border)] bg-[color-mix(in_oklab,var(--background)_88%,transparent)] backdrop-blur-lg'
          : 'border-transparent bg-transparent',
      ].join(' ')}
    >
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" aria-label="Leal, inicio" className="flex h-full items-center">
          <img src={asset('logo-mark.png')} alt="Leal" width={445} height={249} className="h-9 w-auto sm:h-10" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [
                    'relative block px-4 py-5 text-sm font-semibold transition-colors',
                    'after:absolute after:inset-x-4 after:bottom-3 after:h-0.5 after:origin-left after:bg-[var(--accent)] after:transition-transform',
                    isActive
                      ? 'text-[var(--foreground)] after:scale-x-100'
                      : 'text-[var(--text-secondary)] after:scale-x-0 hover:text-[var(--foreground)] hover:after:scale-x-100',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Drawer>
          <DrawerTrigger asChild>
            <button
              type="button"
              aria-label="Abrir menú"
              className="grid h-10 w-10 place-items-center rounded-md border border-[var(--border-strong)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] md:hidden"
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
                    className="font-display rounded-md px-4 py-3 text-left text-3xl font-extrabold text-[var(--foreground)] hover:bg-[var(--surface-muted)]"
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
                    className="grid h-11 w-11 place-items-center rounded-md bg-[var(--surface-muted)] text-[var(--foreground)]"
                  >
                    <BrandIcon path={s.path} />
                  </a>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </nav>
    </header>
  )
}
