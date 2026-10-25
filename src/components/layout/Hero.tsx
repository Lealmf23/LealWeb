import { useNavigate } from 'react-router-dom'
import { Play } from 'lucide-react'
import { Button } from '@/components/arc/button/button'
import { formatDate, formatViews, videos } from '@/data/videos'
import { Backdrop } from './Backdrop'
import { SocialBar } from './SocialBar'

export function Hero() {
  const navigate = useNavigate()
  const stations = videos.slice(0, 4)
  const latest = stations[0]

  return (
    <section className="relative isolate overflow-hidden px-5 pb-10 pt-24 sm:pt-28">
      <Backdrop src="hero.jpg" position="center 70%" veil={0.7} eager />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div className="min-w-0">
          <h1 className="font-display text-[clamp(2rem,7.5vw,3.5rem)] sm:text-[clamp(2.25rem,4.8vw,4rem)] font-black leading-[0.95]">
            <span className="block">Construimos ciudades.</span>
            <span className="block">Rompemos el tráfico.</span>
            <span className="block">Lo intentamos de nuevo.</span>
          </h1>
          <p className="mt-4 max-w-md text-base text-[var(--text-secondary)]">
            Cities: Skylines en español: series, mods y consejos para que tu ciudad no se atasque.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {latest && (
              <Button onClick={() => window.open(latest.url, '_blank', 'noopener')}>
                <Play size={14} aria-hidden="true" /> Ver el último video
              </Button>
            )}
            <Button variant="secondary" onClick={() => navigate('/videos')}>
              Ver todos los videos
            </Button>
          </div>
          <div className="mt-5">
            <SocialBar />
          </div>
        </div>

        <nav aria-label="Últimos videos" className="relative min-w-0 pl-10">
          <span
            className="line-rail absolute bottom-3 left-[11px] top-3 w-2 rounded-full bg-[var(--accent)]"
            aria-hidden="true"
          />
          <span
            className="line-rail absolute left-[11px] top-3 h-16 w-2 rounded-full bg-[var(--traffic)]"
            aria-hidden="true"
          />
          <ol className="space-y-4">
            {stations.map((video, i) => (
              <li key={video.id} className="line-station relative" style={{ ['--i' as string]: i }}>
                <span
                  className={[
                    'absolute top-1 rounded-full border-[3px] border-[var(--foreground)] bg-[var(--background)]',
                    i === 0 ? '-left-[39px] h-7 w-7' : '-left-[35px] h-5 w-5',
                  ].join(' ')}
                  aria-hidden="true"
                />
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="group block">
                  {i === 0 && (
                    <img
                      src={video.thumbnail}
                      alt=""
                      className="mb-2 aspect-video w-full max-w-sm rounded-[var(--radius-panel)] border-2 border-[var(--foreground)] object-cover"
                      fetchPriority="high"
                    />
                  )}
                  <p className="text-sm text-[var(--text-muted)]">
                    {i === 0 ? 'Último video · ' : ''}
                    {formatDate(video.published)} · {formatViews(video.views)}
                  </p>
                  <p
                    className={[
                      'font-display font-extrabold leading-tight underline-offset-4 group-hover:underline',
                      i === 0 ? 'text-2xl' : 'text-lg',
                    ].join(' ')}
                  >
                    {video.title}
                  </p>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  )
}
