import { Carousel } from '@/components/arc/carousel/carousel'
import { ButtonLink } from '@/components/layout/ButtonLink'
import { Section } from '@/components/layout/Section'
import { VideoCard } from '@/components/layout/VideoCard'
import { videos } from '@/data/videos'

/** El héroe ya muestra los 4 más nuevos; aquí siguen los anteriores. */
export function LatestVideos() {
  const more = videos.slice(4, 8)
  return (
    <Section
      id="videos"
      title="Más videos"
      action={
        <ButtonLink variant="secondary" to="/videos">
          Ver listas de reproducción
        </ButtonLink>
      }
    >
      {/* En móvil se desliza; desde tablet, cuadrícula. */}
      <div className="sm:hidden">
        <Carousel label="Más videos" slideSize="min(78cqw, 300px)" slideLabel={(i, n) => `Video ${i + 1} de ${n}`}>
          {more.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </Carousel>
      </div>
      <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {more.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </Section>
  )
}
