import { HardDrive, ThumbsUp, Users } from 'lucide-react'
import { CompactCard } from '@/components/layout/CompactCard'

interface ResourceItem {
  title: string
  image: string
  url: string
  subscribers?: number
  likes?: number
  sizeBytes?: number
}

const formatSize = (bytes: number) => {
  const mb = bytes / 1024 / 1024
  return mb >= 1024 ? `${(mb / 1024).toFixed(1)} GB` : `${Math.max(1, Math.round(mb))} MB`
}

/** Suscriptores, likes y tamaño; solo las publicaciones de Paradox Mods los traen. */
function Stats({ item }: { item: ResourceItem }) {
  if (item.subscribers === undefined) return null
  const stats = [
    { Icon: Users, value: item.subscribers.toLocaleString('es'), label: 'suscriptores' },
    { Icon: ThumbsUp, value: (item.likes ?? 0).toLocaleString('es'), label: 'me gusta' },
    ...(item.sizeBytes ? [{ Icon: HardDrive, value: formatSize(item.sizeBytes), label: 'tamaño' }] : []),
  ]
  return (
    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-[var(--text-secondary)]">
      {stats.map(({ Icon, value, label }) => (
        <li key={label} className="flex items-center gap-1.5" title={label}>
          <Icon size={16} aria-hidden="true" />
          <span aria-label={`${value} ${label}`}>{value}</span>
        </li>
      ))}
    </ul>
  )
}

/** Tarjeta de una publicación (Steam Workshop o Paradox Mods). */
export function WorkshopCard({ item, label }: { item: ResourceItem; label: string }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <CompactCard
        title={item.title}
        description={label}
        media={<img src={item.image} alt="" loading="lazy" className="aspect-square w-full object-cover" />}
      >
        <Stats item={item} />
      </CompactCard>
    </a>
  )
}
