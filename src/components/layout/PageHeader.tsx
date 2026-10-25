import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Backdrop } from './Backdrop'

interface PageHeaderProps {
  /** Sección a la que pertenece la página; se muestra como ruta de migas. */
  eyebrow: string
  title: string
  description?: string
  children?: ReactNode
}

/** Cabecera común de las páginas internas, sobre la retícula del plano. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden px-5 pb-12 pt-28 sm:pt-32">
      <Backdrop src="header-bg.jpg" position="center 55%" veil={0.65} eager />
      <div className="mx-auto max-w-6xl">
        <p className="text-sm text-[var(--text-muted)]">
          <Link to="/" className="underline-offset-2 hover:underline">Leal</Link> / {eyebrow}
        </p>
        <h1 className="font-display mt-2 text-5xl font-black leading-none sm:text-7xl">{title}</h1>
        {description && <p className="mt-4 max-w-xl text-[var(--text-secondary)]">{description}</p>}
        {children}
      </div>
    </header>
  )
}
