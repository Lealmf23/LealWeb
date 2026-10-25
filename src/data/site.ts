import { siDiscord, siInstagram, siKofi, siSteam, siTiktok, siYoutube } from 'simple-icons'

export const socials = [
  { id: 'youtube', label: 'YouTube', handle: '@lealmafor', url: 'https://www.youtube.com/@lealmafor?sub_confirmation=1', path: siYoutube.path },
  { id: 'instagram', label: 'Instagram', handle: '@LealMafor', url: 'https://www.instagram.com/LealMafor', path: siInstagram.path },
  { id: 'tiktok', label: 'TikTok', handle: '@lealmafor', url: 'https://www.tiktok.com/@lealmafor', path: siTiktok.path },
  { id: 'discord', label: 'Discord', handle: 'Comunidad', url: 'https://discord.gg/aBYyh5makp', path: siDiscord.path },
  { id: 'kofi', label: 'Ko-fi', handle: 'Apoya el canal', url: 'https://ko-fi.com/lealmafor', path: siKofi.path },
  { id: 'steam', label: 'Steam', handle: 'LealMafor', url: 'https://steamcommunity.com/id/LealMafor', path: siSteam.path },
] as const

export const nav = [
  { to: '/', label: 'Inicio' },
  { to: '/videos', label: 'Videos' },
  { to: '/recursos', label: 'Recursos' },
  { to: '/setup', label: 'Setup' },
  { to: '/sobre-mi', label: 'Sobre mí' },
] as const

export const games = [
  { slug: 'cities-skylines-2', title: 'Cities: Skylines 2', description: 'La serie principal del canal: ciudades desde cero, tráfico y economía.', tag: 'Serie actual' },
  { slug: 'cities-skylines', title: 'Cities: Skylines', description: 'Nuestra serie clásica de principiantes y los mejores consejos.', tag: 'Clásico' },
  { slug: 'otros-juegos', title: 'Otros juegos', description: 'Otros simuladores y city builders que probamos en el canal.', tag: 'Variado' },
] as const

export const resources = [
  { slug: 'mods', to: '/recursos#mods', title: 'Mods', description: 'Mis mods y creaciones para Cities: Skylines 2.' },
  { slug: 'assets', to: '/recursos#assets', title: 'Assets / Creaciones', description: 'Edificios, props y creaciones para tu ciudad.' },
  { slug: 'mapas', to: '/recursos#mapas', title: 'Mapas', description: 'Mapas para empezar tu próxima ciudad.' },
  { slug: 'setup', to: '/setup', title: 'Setup', description: 'La PC y los periféricos que uso para jugar y crear contenido.' },
] as const
