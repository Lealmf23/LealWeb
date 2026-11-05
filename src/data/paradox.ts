import raw from './paradox.json'

export interface ParadoxMod {
  id: string
  title: string
  description: string
  image: string
  url: string
  /** Métricas de la API de Paradox Mods; pueden faltar si la API falló. */
  subscribers?: number
  likes?: number
  sizeBytes?: number
  /** Fecha de creación (ISO). */
  created?: string
}

/** Publicaciones de Cities: Skylines 2 en Paradox Mods (IDs en paradox-ids.json). */
export const paradoxAssets: ParadoxMod[] = raw as ParadoxMod[]
