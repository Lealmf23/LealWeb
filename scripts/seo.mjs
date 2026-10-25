// Después del build: genera un index.html por ruta con sus metaetiquetas (para rastreadores sin JavaScript,
// como Discord, WhatsApp o los de IA) y crea sitemap.xml. Los textos están en src/data/seo.json.
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const DIST = new URL('../dist/', import.meta.url)
const seo = JSON.parse(await readFile(new URL('../src/data/seo.json', import.meta.url), 'utf8'))
const template = await readFile(new URL('index.html', DIST), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const { url: site, name, locale, image, imageAlt } = seo.site

function block(path, page) {
  const url = site + (path === '/' ? '/' : `${path}/`)
  const indexable = page.index !== false
  return [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    page.keywords ? `<meta name="keywords" content="${esc(page.keywords)}" />` : '',
    `<meta name="robots" content="${indexable ? 'index, follow' : 'noindex, follow'}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(name)}" />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${site + image}" />`,
    `<meta property="og:image:alt" content="${esc(imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${site + image}" />`,
  ]
    .filter(Boolean)
    .join('\n    ')
}

const START = '<!--seo-->'
const END = '<!--/seo-->'
const re = new RegExp(`${START}[\\s\\S]*?${END}`)
if (!re.test(template)) throw new Error('index.html no tiene el bloque <!--seo-->')

const urls = []
for (const [path, page] of Object.entries(seo.routes)) {
  const html = template.replace(re, `${START}\n    ${block(path, page)}\n    ${END}`)
  const dir = path === '/' ? DIST : new URL(`.${path}/`, DIST)
  await mkdir(dir, { recursive: true })
  await writeFile(new URL('index.html', dir), html)
  if (page.index !== false) urls.push(path)
}

const today = new Date().toISOString().slice(0, 10)
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map((p) => `  <url><loc>${site}${p === '/' ? '/' : `${p}/`}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n') +
  `\n</urlset>\n`
await writeFile(new URL('sitemap.xml', DIST), sitemap)
console.log(`[seo] ${Object.keys(seo.routes).length} páginas con metaetiquetas, ${urls.length} en el sitemap`)
