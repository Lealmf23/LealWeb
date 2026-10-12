import { PageHeader } from '@/components/layout/PageHeader'
import { Link, useParams } from 'react-router-dom'
import { Hero } from '@/components/layout/Hero'
import { Community } from '@/sections/Community'
import { Games } from '@/sections/Games'
import { LatestVideos } from '@/sections/LatestVideos'
import { Resources } from '@/sections/Resources'
import { games } from '@/data/site'

export function Home() {
  return (
    <>
      <Hero />
      <LatestVideos />
      <Games />
      <Resources />
      <Community />
    </>
  )
}

interface SoonProps {
  eyebrow: string
  title: string
  text?: string
}

/** Página base mientras se arma el contenido de cada sección. */
export function Soon({ eyebrow, title, text }: SoonProps) {
  return (
    <div>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={text ?? 'Esta sección se está construyendo. Mientras tanto, mirá los últimos videos del canal.'}
      />
      <section className="px-5 py-10">
        <div className="mx-auto max-w-6xl">
          <Link to="/videos" className="font-semibold text-[var(--accent)]">
            Ir a videos →
          </Link>
        </div>
      </section>
    </div>
  )
}

export function GamePage() {
  const { slug } = useParams()
  const game = games.find((g) => g.slug === slug)
  return <Soon eyebrow="Juegos" title={game?.title ?? 'Juego no encontrado'} text={game?.description} />
}

