import type { ReactNode } from 'react'
import { asset } from '@/lib/utils'

interface PageHeaderProps {
  eyebrow: string
  title: string
  description?: string
  children?: ReactNode
}

/** Cabecera común de las páginas internas, con la ciudad de fondo. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden px-5 pb-12 pt-28 sm:pt-32">
      <img
        src={asset('header-bg.jpg')}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_55%]"
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--background)_80%,transparent)_0%,color-mix(in_oklab,var(--background)_35%,transparent)_60%,transparent_100%),linear-gradient(to_top,var(--background)_0%,transparent_55%)]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">{eyebrow}</p>
        <h1 className="font-display mt-1 text-3xl font-bold uppercase sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-[var(--text-secondary)]">{description}</p>}
        {children}
      </div>
    </header>
  )
}
