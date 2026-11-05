import raw from './workshop.json'
import linksRaw from './links.json'

export interface WorkshopItem {
  id: string
  title: string
  image: string
  game: string
  url: string
  /** Métricas de la API de Steam; pueden faltar si falló. "likes" son los favoritos del Workshop. */
  subscribers?: number
  likes?: number
  sizeBytes?: number
}

/** Publicaciones de Cities: Skylines en el Workshop de Steam. */
const items: WorkshopItem[] = raw as WorkshopItem[]

/** Mapas y partidas guardadas, por el título de la publicación. */
const isMap = (item: WorkshopItem) => /\bmap(a|as|s)?\b|savegame/i.test(item.title)

export const workshopMaps = items.filter(isMap)
export const workshopAssets = items.filter((item) => !isMap(item))

/** Enlaces externos; viven en links.json para que el script de SEO también los lea. */
export const links = linksRaw
