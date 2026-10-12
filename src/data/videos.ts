import raw from './videos.json'

export interface Video {
  id: string
  title: string
  published: string
  views: number
  url: string
  thumbnail: string
}

/** Videos del feed RSS (los 15 más recientes), del más nuevo al más viejo. */
export const videos: Video[] = raw as Video[]

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso))

export const formatViews = (n: number) =>
  `${new Intl.NumberFormat('es-AR', { notation: 'compact', maximumFractionDigits: 1 }).format(n)} vistas`
