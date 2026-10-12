import raw from './paradox.json'

export interface ParadoxMod {
  id: string
  title: string
  description: string
  image: string
  url: string
}

/** Publicaciones de Cities: Skylines 2 en Paradox Mods (IDs en paradox-ids.json). */
export const paradoxAssets: ParadoxMod[] = raw as ParadoxMod[]
