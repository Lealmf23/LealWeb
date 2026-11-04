import { ListVideo } from 'lucide-react'
import { CompactCard } from '@/components/layout/CompactCard'
import type { Playlist } from '@/data/playlists'

export function PlaylistCard({ playlist }: { playlist: Playlist }) {
  return (
    <a href={playlist.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <CompactCard
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
