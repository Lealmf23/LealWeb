// Descarga el feed RSS del canal y lo guarda en src/data/videos.json.
// Se ejecuta antes de cada build (prebuild). Si falla, conserva el JSON anterior.
import { readFile, writeFile } from 'node:fs/promises'

const CHANNEL_ID = 'UCeSb0ceImyAo9G3wSakXaeA'
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
const OUT = new URL('../src/data/videos.json', import.meta.url)

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
const pick = (block, re) => decode(block.match(re)?.[1]?.trim() ?? '')

try {
  const res = await fetch(FEED)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const xml = await res.text()
  const videos = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => {
    const id = pick(e, /<yt:videoId>(.*?)<\/yt:videoId>/)
    return {
      id,
      title: pick(e, /<title>(.*?)<\/title>/),
      published: pick(e, /<published>(.*?)<\/published>/),
      views: Number(e.match(/<media:statistics views="(\d+)"/)?.[1] ?? 0),
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    }
  })
  if (!videos.length) throw new Error('feed vacío')
  await writeFile(OUT, JSON.stringify(videos, null, 2) + '\n')
  console.log(`[videos] ${videos.length} videos guardados`)
} catch (err) {
  console.warn(`[videos] no se pudo actualizar (${err.message}); se conserva el archivo existente`)
  try { await readFile(OUT) } catch { await writeFile(OUT, '[]\n') }
}
