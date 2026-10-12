// Lee las listas de reproducción públicas del canal y las guarda en src/data/playlists.json.
// Se ejecuta antes de cada build (prebuild). Si falla, conserva el JSON anterior.
import { readFile, writeFile } from 'node:fs/promises'

const HANDLE = 'LealMafor'
const URL_PLAYLISTS = `https://www.youtube.com/@${HANDLE}/playlists?view=1&sort=dd&shelf_id=6`
const OUT = new URL('../src/data/playlists.json', import.meta.url)

/** Recorre el JSON de YouTube y devuelve cada nodo que cumple `test`. */
function collect(node, test, out = []) {
  if (!node || typeof node !== 'object') return out
  if (test(node)) out.push(node)
  for (const value of Object.values(node)) collect(value, test, out)
  return out
}

function parse(html) {
  const raw = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/)?.[1]
  if (!raw) throw new Error('no se encontró ytInitialData')
  const data = JSON.parse(raw)
  const seen = new Set()
  const playlists = []

  for (const { lockupViewModel: l } of collect(data, (n) => n.lockupViewModel?.contentId)) {
    const id = l.contentId
    if (seen.has(id) || l.contentType !== 'LOCKUP_CONTENT_TYPE_PLAYLIST') continue
    seen.add(id)

    const title = l.metadata?.lockupMetadataViewModel?.title?.content ?? ''
    const source = l.contentImage?.collectionThumbnailViewModel?.primaryThumbnail?.thumbnailViewModel
    const thumb = source?.image?.sources?.at(-1)?.url?.split('?')[0] ?? ''
    const badge = collect(source, (n) => typeof n.text === 'string' && /video/i.test(n.text))[0]?.text ?? ''
    const count = Number(badge.match(/\d+/)?.[0] ?? 0)

    playlists.push({
      id,
      title,
      count,
      thumbnail: thumb,
      url: `https://www.youtube.com/playlist?list=${id}`,
    })
  }
  return playlists
}

try {
  const res = await fetch(URL_PLAYLISTS, {
    headers: {
      'user-agent': 'Mozilla/5.0',
      'accept-language': 'es-AR,es;q=0.9',
      cookie: 'CONSENT=YES+1; SOCS=CAI',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const playlists = parse(await res.text()).filter((p) => p.title && p.count > 0)
  if (!playlists.length) throw new Error('sin listas')
  await writeFile(OUT, JSON.stringify(playlists, null, 2) + '\n')
  console.log(`[playlists] ${playlists.length} listas guardadas`)
} catch (err) {
  console.warn(`[playlists] no se pudo actualizar (${err.message}); se conserva el archivo existente`)
  try {
    await readFile(OUT)
  } catch {
    await writeFile(OUT, '[]\n')
  }
}
