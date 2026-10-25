import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/arc/button/button'
import { Section } from '@/components/layout/Section'
import { VideoCard } from '@/components/layout/VideoCard'
import { videos } from '@/data/videos'

/** El héroe ya muestra los 4 más nuevos; aquí siguen los anteriores. */
export function LatestVideos() {
  const navigate = useNavigate()
  return (
    <Section
      id="videos"
      title="Más videos"
      action={
        <Button variant="secondary" onClick={() => navigate('/videos')}>
          Ver listas de reproducción
        </Button>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {videos.slice(4, 8).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </Section>
  )
}
