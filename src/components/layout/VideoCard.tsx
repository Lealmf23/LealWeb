import { Card } from '@/components/arc/card/card'
import { formatDate, formatViews, type Video } from '@/data/videos'

/** Título a 2 líneas máximo, tipografía y márgenes compactos. */
const compact =
  'h-full [&_h3]:line-clamp-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:leading-snug [&_p]:mt-1 [&_p]:max-w-none [&_p]:text-xs [&_[class*=_content_]]:p-3'

export function VideoCard({ video }: { video: Video }) {
  return (
    <a href={video.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <Card
        className={compact}
        title={video.title}
        description={`${formatDate(video.published)} · ${formatViews(video.views)}`}
        media={<img src={video.thumbnail} alt="" loading="lazy" className="aspect-video w-full object-cover" />}
      />
    </a>
  )
}
