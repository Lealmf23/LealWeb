import { useNavigate } from 'react-router-dom'
import { Play } from 'lucide-react'
import { Button } from '@/components/arc/button/button'
import { TextReveal } from '@/components/arc/text-reveal/text-reveal'
import { formatDate, formatViews, videos } from '@/data/videos'
import { SocialBar } from './SocialBar'
import { asset } from '@/lib/utils'

export function Hero() {
  const navigate = useNavigate()
  const latest = videos[0]

  return (
    <section className="relative isolate overflow-hidden px-5 pb-8 pt-28 sm:pt-32">
      <img
        src={asset('hero.jpg')}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_70%]"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--background)_80%,transparent)_0%,color-mix(in_oklab,var(--background)_45%,transparent)_55%,color-mix(in_oklab,var(--background)_10%,transparent)_100%),linear-gradient(to_top,var(--background)_0%,transparent_30%)]"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-6xl items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h1 className="sr-only">Construimos ciudades. Rompemos el tráfico. Lo intentamos de nuevo.</h1>
          <div
            className="font-display text-[clamp(1.6rem,3.6vw,2.6rem)] font-bold uppercase leading-[1.05]"
            aria-hidden="true"
          >
            <TextReveal as="p" text="Construimos ciudades." />
            <TextReveal as="p" text="Rompemos el tráfico." className="text-[var(--accent)]" delay={0.2} />
            <TextReveal as="p" text="Lo intentamos de nuevo." delay={0.4} />
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {latest && (
              <Button onClick={() => window.open(latest.url, '_blank', 'noopener')}>
                <Play size={14} aria-hidden="true" /> Ver último episodio
              </Button>
            )}
            <Button variant="secondary" onClick={() => navigate('/videos')}>
              Explorar videos
            </Button>
          </div>
          <div className="mt-6">
            <SocialBar />
          </div>
        </div>

        {latest && (
          <a
            href={latest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex max-w-sm gap-3 rounded-[var(--radius-panel)] border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_85%,transparent)] p-2.5 backdrop-blur-md transition-transform hover:-translate-y-0.5 lg:ml-auto"
          >
            <img
              src={latest.thumbnail}
              alt=""
              className="aspect-video w-32 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 self-center">
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-[var(--accent)]">Último video</p>
              <p className="line-clamp-2 text-sm font-semibold leading-snug text-[var(--foreground)]">{latest.title}</p>
              <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                {formatDate(latest.published)} · {formatViews(latest.views)}
              </p>
            </div>
          </a>
        )}
      </div>
    </section>
  )
}
