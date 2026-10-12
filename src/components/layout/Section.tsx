import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  eyebrow: string
  title: string
  action?: ReactNode
  children: ReactNode
}

export function Section({ id, eyebrow, title, action, children }: SectionProps) {
  return (
    <section id={id} className="px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">{eyebrow}</p>
            <h2 className="font-display mt-1 text-2xl font-bold uppercase sm:text-3xl">{title}</h2>
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  )
}
