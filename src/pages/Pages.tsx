import { PageHeader } from '@/components/layout/PageHeader'
import { Link } from 'react-router-dom'
import { Hero } from '@/components/layout/Hero'
import { Community } from '@/sections/Community'
import { LatestAssets } from '@/sections/LatestAssets'
import { LatestVideos } from '@/sections/LatestVideos'
import { Resources } from '@/sections/Resources'

export function Home() {
  return (
    <>
      <Hero />
      <LatestVideos />
      <LatestAssets />
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

