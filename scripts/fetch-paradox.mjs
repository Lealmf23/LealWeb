// Lee título, descripción e imagen de tus publicaciones de Paradox Mods (Cities: Skylines 2)
// y las guarda en src/data/paradox.json. Se ejecuta antes de cada build (prebuild).
// Para agregar una publicación, suma su ID a src/data/paradox-ids.json.
// Si una publicación falla, conserva el dato anterior de esa publicación.
import { readFile, writeFile } from 'node:fs/promises'
import https from 'node:https'

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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** GET con node:https. */
function getHttps(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'user-agent': 'LealWeb-build/1.0', accept: '*/*' } }, (res) => {
        let body = ''
        res.setEncoding('utf8')
        res.on('data', (chunk) => (body += chunk))
        res.on('end', () => resolve({ status: res.statusCode ?? 0, body }))
      })
      .on('error', reject)
  })
}

/** GET con fetch. */
async function getFetch(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'LealWeb-build/1.0', accept: '*/*' } })
  return { status: res.status, body: await res.text() }
}

/** Paradox responde distinto (406 o página genérica) según el cliente y el momento: se alternan ambos. */
const clients = [getFetch, getHttps]

/** Descarga una publicación; reintenta si la respuesta viene incompleta (título genérico o sin imagen). */
async function fetchMod(id, url) {
  let lastError = new Error('sin intentos')
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const res = await clients[attempt % clients.length](url)
      if (res.status !== 200) throw new Error(`HTTP ${res.status}`)
      const html = res.body
      const title = meta(html, /<meta property="og:title" content="([^"]*)"/).replace(/\s*-\s*Paradox Mods\s*$/, '')
      const image = meta(html, /<meta[^>]*property="og:image"[^>]*content="([^"]*)"/)
      if (!title || title === 'Paradox Mods' || !image) throw new Error('respuesta incompleta')
      return {
        id: String(id),
        title,
        description: meta(html, /<meta property="og:description" content="([^"]*)"/),
        image,
        url,
      }
    } catch (err) {
      lastError = err
      await sleep(attempt * 800)
    }
  }
  throw lastError
}

for (const id of ids) {
  const url = `https://mods.paradoxplaza.com/mods/${id}/Any`
  try {
    result.push(await fetchMod(id, url))
  } catch (err) {
    console.warn(`[paradox] ${id}: ${err.message}`)
    const old = byId.get(String(id))
    // Solo se conserva un dato anterior si es válido.
    if (old && old.title && old.title !== 'Paradox Mods' && old.image) result.push(old)
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
