import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/arc/button/button'
import { Section } from '@/components/layout/Section'
import { VideoCard } from '@/components/layout/VideoCard'
import { videos } from '@/data/videos'

export function LatestVideos() {
  const navigate = useNavigate()
  return (
    <Section
      id="videos"
      eyebrow="Directo del canal"
      title="Últimos videos"
      action={
        <Button variant="secondary" onClick={() => navigate('/videos')}>
          Ver listas de reproducción
        </Button>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {videos.slice(0, 4).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </Section>
  )
}
