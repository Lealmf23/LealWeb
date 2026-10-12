import { ListVideo } from 'lucide-react'
import { Card } from '@/components/arc/card/card'
import type { Playlist } from '@/data/playlists'

/** Título a 2 líneas máximo, tipografía y márgenes compactos. */
const compact =
  'h-full [&_h3]:line-clamp-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:leading-snug [&_p]:mt-1 [&_p]:max-w-none [&_p]:text-xs [&_[class*=_content_]]:p-3'

export function PlaylistCard({ playlist }: { playlist: Playlist }) {
  return (
    <a href={playlist.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <Card
        className={compact}
        title={playlist.title}
        description={`${playlist.count} ${playlist.count === 1 ? 'video' : 'videos'}`}
        media={
          <div className="relative">
            <img src={playlist.thumbnail} alt="" loading="lazy" className="aspect-video w-full object-cover" />
            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-black/75 px-2 py-0.5 text-xs font-medium text-white">
              <ListVideo size={14} aria-hidden="true" /> {playlist.count}
            </span>
          </div>
        }
      />
    </a>
  )
}
