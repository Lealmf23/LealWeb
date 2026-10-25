import raw from './workshop.json'

export interface WorkshopItem {
  id: string
  title: string
  image: string
  game: string
  url: string
}

/** Publicaciones de Cities: Skylines en el Workshop de Steam. */
const items: WorkshopItem[] = raw as WorkshopItem[]

/** Mapas y partidas guardadas, por el título de la publicación. */
const isMap = (item: WorkshopItem) => /\bmap(a|as|s)?\b|savegame/i.test(item.title)

export const workshopMaps = items.filter(isMap)
export const workshopAssets = items.filter((item) => !isMap(item))

export const links = {
  paradoxCs2: 'https://mods.paradoxplaza.com/authors/lealmafor/cities_skylines_2',
  paradoxProfile: 'https://mods.paradoxplaza.com/authors/lealmafor',
  playsetCs2: 'https://mods.paradoxplaza.com/playsets/cities_skylines_2/4421189',
  kofi: 'https://ko-fi.com/lealmafor',
  steamCs1: 'https://steamcommunity.com/id/lealmafor/myworkshopfiles/?p=1',
} as const
