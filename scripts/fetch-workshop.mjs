// Lee tus publicaciones del Workshop de Steam (Cities: Skylines) y las guarda en src/data/workshop.json.
// Se ejecuta antes de cada build (prebuild). Si falla, conserva el JSON anterior.
import { readFile, writeFile } from 'node:fs/promises'
import { fetchRetry, warnBuild } from './lib/net.mjs'

const PROFILE = 'lealmafor'
const OUT = new URL('../src/data/workshop.json', import.meta.url)
const MAX_PAGES = 10

const headers = {
  'user-agent': 'Mozilla/5.0',
  'accept-language': 'es-AR,es;q=0.9',
  cookie: 'birthtime=0; lastagecheckage=1-0-1990; wants_mature_content=1',
}

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

function parsePage(html) {
  const items = []
  const blocks = html.split('<div data-panel="{&quot;type&quot;:&quot;PanelGroup&quot;}" class="workshopItem">').slice(1)
  for (const block of blocks) {
    const id = block.match(/data-publishedfileid="(\d+)"/)?.[1]
    const title = block.match(/workshopItemTitle ellipsis">([^<]*)</)?.[1]
    if (!id || !title) continue
    const rawImage = block.match(/workshopItemPreviewImage[^>]*src="([^"]+)"/)?.[1] ?? ''
    const image = rawImage ? `${decode(rawImage).split('?')[0]}?imw=640&imh=360&ima=fit&impolicy=Letterbox&letterbox=false` : ''
    const game = block.match(/workshopItemApp">([^<]*)</)?.[1] ?? ''
    items.push({
      id,
      title: decode(title).trim(),
      image,
      game: decode(game).trim(),
      url: `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`,
    })
  }
  return items
}

/**
 * Suscriptores, favoritos y tamaño desde la API pública de Steam (GetPublishedFileDetails, sin clave).
 * Si falla, se conservan las métricas del JSON anterior y el build sigue.
 */
async function addStats(items) {
  const previous = new Map()
  try {
    for (const p of JSON.parse(await readFile(OUT, 'utf8'))) previous.set(p.id, p)
  } catch {}
  const keep = ['subscribers', 'likes', 'sizeBytes']
  try {
    const body = new URLSearchParams({ itemcount: String(items.length) })
    items.forEach((item, i) => body.set(`publishedfileids[${i}]`, item.id))
    const res = await fetchRetry('https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/', {
      method: 'POST',
      body,
    })
    const details = new Map(
      ((await res.json()).response?.publishedfiledetails ?? []).map((d) => [String(d.publishedfileid), d]),
    )
    for (const item of items) {
      const d = details.get(item.id)
      if (d?.result !== 1) {
        keep.forEach((k) => previous.get(item.id)?.[k] !== undefined && (item[k] = previous.get(item.id)[k]))
        continue
      }
      item.subscribers = Number(d.subscriptions) || 0
      item.likes = Number(d.favorited) || 0
      item.sizeBytes = Number(d.file_size) || 0
    }
  } catch (err) {
    warnBuild('workshop', `métricas no disponibles (${err.message}); se conservan las anteriores`)
    for (const item of items) keep.forEach((k) => previous.get(item.id)?.[k] !== undefined && (item[k] = previous.get(item.id)[k]))
  }
}

try {
  const all = []
  const seen = new Set()
  for (let page = 1; page <= MAX_PAGES; page++) {
    const res = await fetchRetry(`https://steamcommunity.com/id/${PROFILE}/myworkshopfiles/?p=${page}`, { headers })
    const items = parsePage(await res.text()).filter((i) => !seen.has(i.id))
    if (!items.length) break
    items.forEach((i) => seen.add(i.id))
    all.push(...items)
  }
  if (!all.length) throw new Error('sin publicaciones')
  await addStats(all)
  await writeFile(OUT, JSON.stringify(all, null, 2) + '\n')
  console.log(`[workshop] ${all.length} publicaciones guardadas`)
} catch (err) {
  warnBuild('workshop', `no se pudo actualizar (${err.message}); se conserva el archivo existente`)
  try {
    await readFile(OUT)
  } catch {
    await writeFile(OUT, '[]\n')
  }
}
