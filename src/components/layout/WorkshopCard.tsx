import { Card } from '@/components/arc/card/card'

/** Título a 2 líneas máximo, tipografía y márgenes compactos. */
const compact =
  'h-full [&_h3]:line-clamp-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:leading-snug [&_p]:mt-1 [&_p]:max-w-none [&_p]:text-xs [&_[class*=_content_]]:p-3'

interface ResourceItem {
  title: string
  image: string
  url: string
}

/** Tarjeta de una publicación (Steam Workshop o Paradox Mods). */
export function WorkshopCard({ item, label }: { item: ResourceItem; label: string }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <Card
        className={compact}
        title={item.title}
        description={label}
        media={<img src={item.image} alt="" loading="lazy" className="aspect-video w-full object-cover" />}
      />
    </a>
  )
}
