import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  /** Se mantiene por compatibilidad: el título ya dice de qué trata la sección. */
  eyebrow?: string
  title: string
  action?: ReactNode
  children: ReactNode
}

export function Section({ id, title, action, children }: SectionProps) {
  return (
    <section id={id} className="px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-[var(--foreground)] pb-3">
          <h2 className="font-display text-4xl font-extrabold leading-none sm:text-5xl">{title}</h2>
          {action}
        </div>
        {children}
      </div>
    </section>
  )
}
