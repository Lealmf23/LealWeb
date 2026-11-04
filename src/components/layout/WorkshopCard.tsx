import { CompactCard } from '@/components/layout/CompactCard'

interface ResourceItem {
  title: string
  image: string
  url: string
}

/** Tarjeta de una publicación (Steam Workshop o Paradox Mods). */
export function WorkshopCard({ item, label }: { item: ResourceItem; label: string }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <CompactCard
        title={item.title}
        description={label}
        media={<img src={item.image} alt="" loading="lazy" className="aspect-video w-full object-cover" />}
      />
    </a>
  )
}
