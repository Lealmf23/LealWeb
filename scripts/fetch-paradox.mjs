// Lee título, descripción e imagen de tus publicaciones de Paradox Mods (Cities: Skylines 2)
// y las guarda en src/data/paradox.json. Se ejecuta antes de cada build (prebuild).
// Para agregar una publicación, suma su ID a src/data/paradox-ids.json.
// Si una publicación falla, conserva el dato anterior de esa publicación.
import { readFile, writeFile } from 'node:fs/promises'

const IDS_FILE = new URL('../src/data/paradox-ids.json', import.meta.url)
const OUT = new URL('../src/data/paradox.json', import.meta.url)

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

const meta = (html, re) => decode(html.match(re)?.[1]?.trim() ?? '')

async function readJson(url, fallback) {
  try {
    return JSON.parse(await readFile(url, 'utf8'))
  } catch {
    return fallback
  }
}

const ids = await readJson(IDS_FILE, [])
const previous = await readJson(OUT, [])
const byId = new Map(previous.map((m) => [String(m.id), m]))
const result = []

for (const id of ids) {
  const url = `https://mods.paradoxplaza.com/mods/${id}/Any`
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'LealWeb-build/1.0', accept: '*/*' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const html = await res.text()
    const title = meta(html, /<meta property="og:title" content="([^"]*)"/).replace(/\s*-\s*Paradox Mods\s*$/, '')
    if (!title) throw new Error('sin título')
    result.push({
      id: String(id),
      title,
      description: meta(html, /<meta property="og:description" content="([^"]*)"/),
      image: meta(html, /<meta[^>]*property="og:image"[^>]*content="([^"]*)"/),
      url,
    })
  } catch (err) {
    console.warn(`[paradox] ${id}: ${err.message}`)
    const old = byId.get(String(id))
    if (old) result.push(old)
  }
}

if (result.length) {
  await writeFile(OUT, JSON.stringify(result, null, 2) + '\n')
  console.log(`[paradox] ${result.length}/${ids.length} publicaciones guardadas`)
} else {
  console.warn('[paradox] sin resultados; se conserva el archivo existente')
  try {
    await readFile(OUT)
  } catch {
    await writeFile(OUT, '[]\n')
  }
}
