import raw from './playlists.json'

export interface Playlist {
  id: string
  title: string
  count: number
  thumbnail: string
  url: string
}

export type PlaylistGroup = 'cs2' | 'cs1' | 'otros'

export const groupLabels: Record<PlaylistGroup, string> = {
  cs2: 'Cities: Skylines 2',
  cs1: 'Cities: Skylines',
  otros: 'Otros',
}

/** Agrupa por juego según el título de la lista. */
export function groupOf(playlist: Playlist): PlaylistGroup {
  if (/skylines?\s*(2|ii)\b/i.test(playlist.title)) return 'cs2'
  if (/skylines?/i.test(playlist.title)) return 'cs1'
  return 'otros'
}

/** Listas públicas del canal, en el orden en que las devuelve YouTube. */
export const playlists: Playlist[] = raw as Playlist[]
