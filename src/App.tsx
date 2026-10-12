import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { GamePage, Home, Soon } from '@/pages/Pages'
import { AboutPage } from '@/pages/AboutPage'
import { ResourcesPage } from '@/pages/ResourcesPage'
import { SetupPage } from '@/pages/SetupPage'
import { VideosPage } from '@/pages/VideosPage'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
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
