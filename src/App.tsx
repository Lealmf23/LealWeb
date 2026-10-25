import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { GamePage, Home, Soon } from '@/pages/Pages'
import { AboutPage } from '@/pages/AboutPage'
import { ResourcesPage } from '@/pages/ResourcesPage'
import { SetupPage } from '@/pages/SetupPage'
import { VideosPage } from '@/pages/VideosPage'
import { initOutboundTracking, trackPageView } from '@/lib/analytics'
import { applySeo } from '@/lib/seo'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  // Una página vista por ruta; los cambios de #ancla dentro de la misma página no cuentan.
  // El título se actualiza antes, para que Analytics registre el de la página nueva.
  useEffect(() => {
    applySeo(pathname)
    trackPageView(pathname)
  }, [pathname])

  useEffect(() => {
    initOutboundTracking()
  }, [])
  return null
}

/** Enlaces viejos /recursos/mods → /recursos#mods */
function LegacyResource() {
  const { tipo } = useParams()
  return <Navigate to={`/recursos#${tipo ?? ''}`} replace />
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <FloatingNav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/juegos" element={<Soon eyebrow="Explora" title="Juegos" />} />
          <Route path="/juegos/:slug" element={<GamePage />} />
          <Route path="/recursos" element={<ResourcesPage />} />
          <Route path="/recursos/:tipo" element={<LegacyResource />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/sobre-mi" element={<AboutPage />} />
          <Route path="*" element={<Soon eyebrow="404" title="Página no encontrada" />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
