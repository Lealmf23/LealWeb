import { CompactCard } from '@/components/layout/CompactCard'
import { formatDate, formatViews, type Video } from '@/data/videos'

export function VideoCard({ video }: { video: Video }) {
  return (
    <a href={video.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <CompactCard
        title={video.title}
        description={`${formatDate(video.published)} · ${formatViews(video.views)}`}
        media={<img src={video.thumbnail} alt="" loading="lazy" className="aspect-video w-full object-cover" />}
      />
    </a>
  )
}
