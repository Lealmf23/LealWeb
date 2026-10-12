import { PageHeader } from '@/components/layout/PageHeader'
import { useState } from 'react'
import { PlaylistCard } from '@/components/layout/PlaylistCard'
import { groupLabels, groupOf, playlists, type PlaylistGroup } from '@/data/playlists'

type Filter = 'todas' | PlaylistGroup

const filters: { id: Filter; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'cs2', label: groupLabels.cs2 },
  { id: 'cs1', label: groupLabels.cs1 },
  { id: 'otros', label: groupLabels.otros },
]

export function VideosPage() {
  const [filter, setFilter] = useState<Filter>('todas')
  const visible = filter === 'todas' ? playlists : playlists.filter((p) => groupOf(p) === filter)

  return (
    <div>
      <PageHeader
        eyebrow="Series y colecciones"
        title="Listas de reproducción"
        description="Las series y colecciones del canal, agrupadas por juego."
      />
      <section className="px-5 py-10">
        <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar por juego">
          {filters.map((f) => {
            const active = f.id === filter
            const total = f.id === 'todas' ? playlists.length : playlists.filter((p) => groupOf(p) === f.id).length
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={[
                  'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--accent)]'
                    : 'border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--foreground)]',
                ].join(' ')}
              >
                {f.label} <span className="opacity-60">{total}</span>
              </button>
            )
          })}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((p) => (
            <PlaylistCard key={p.id} playlist={p} />
          ))}
        </div>
        </div>
      </section>
    </div>
  )
}
