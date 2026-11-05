// Después del build, a partir de src/data:
//  - un index.html por ruta con sus metaetiquetas y datos estructurados (para Discord, WhatsApp, buscadores y rastreadores de IA),
//  - el contenido de cada página dentro de <noscript> (para quien no ejecuta JavaScript),
//  - sitemap.xml con fechas reales y llms-full.txt con todo el contenido en texto.
// Los textos de SEO están en src/data/seo.json.
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const DIST = new URL('../dist/', import.meta.url)
const DATA = new URL('../src/data/', import.meta.url)
const json = async (name) => JSON.parse(await readFile(new URL(name, DATA), 'utf8'))

const seo = await json('seo.json')
const videos = await json('videos.json')
const playlists = await json('playlists.json')
const workshop = await json('workshop.json')
const paradox = await json('paradox.json')
const setup = await json('setup.json')
const addon = await json('addon.json')
addon.entries.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
const links = await json('links.json')
const template = await readFile(new URL('index.html', DIST), 'utf8')

// Redes, menú y recursos viven en site.ts (con los iconos); aquí solo se leen sus textos.
const siteTs = await readFile(new URL('site.ts', DATA), 'utf8')
const socials = [...siteTs.matchAll(/\{ id: '(\w+)', label: '([^']+)', handle: '([^']+)', url: '([^']+)'/g)].map(
  ([, id, label, handle, url]) => ({ id, label, handle, url }),
)
const nav = [...siteTs.matchAll(/\{ to: '([^']+)', label: '([^']+)' \}/g)].map(([, to, label]) => ({ to, label }))
const resources = [
  ...siteTs.matchAll(/\{ slug: '\w+', to: '([^']+)', title: '([^']+)', description: '([^']+)' \}/g),
].map(([, to, title, description]) => ({ to, title, description }))
const social = (id) => socials.find((s) => s.id === id)

const { url: site, name, locale, image, imageAlt } = seo.site
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const pageUrl = (path) => site + (path === '/' ? '/' : `${path}/`)

// ---------- Contenido por página (un solo modelo: se dibuja como HTML y como Markdown) ----------

const fmtDate = (iso) =>
  new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
const isMap = (t) => /\bmap(a|as|s)?\b|savegame/i.test(t)
const groupOf = (title) => (/skylines?\s*(2|ii)\b/i.test(title) ? 'cs2' : /skylines?/i.test(title) ? 'cs1' : 'otros')
const groupLabel = { cs2: 'Cities: Skylines 2', cs1: 'Cities: Skylines', otros: 'Otros' }
const link = (text, url, note) => ({ text, url, note })

const workshopAssets = workshop.filter((i) => !isMap(i.title))
const workshopMaps = workshop.filter((i) => isMap(i.title))

const content = {
  '/': {
    h1: 'Construimos ciudades. Rompemos el tráfico. Lo intentamos de nuevo.',
    intro: 'Cities: Skylines en español: series, mods y consejos para que tu ciudad no se atasque.',
    sections: [
      {
        h2: 'Últimos videos',
        links: videos.slice(0, 8).map((v) => link(v.title, v.url, fmtDate(v.published))),
      },
      {
        h2: 'Recursos para tu ciudad',
        links: resources.map((r) => link(r.title, site + r.to.replace(/#.*/, '') + '/' + (r.to.includes('#') ? r.to.slice(r.to.indexOf('#')) : ''), r.description)),
      },
      {
        h2: 'Sumate a la ciudad',
        text: 'Contenido nuevo cada semana. Sumate al Discord, compartí tu ciudad y, si te gusta el contenido, podés apoyar el canal en Ko-fi.',
        links: [
          link('Unirme al Discord', social('discord').url),
          link('Suscribirme en YouTube', social('youtube').url),
          link('Apoyar en Ko-fi', links.kofi),
        ],
      },
    ],
  },
  '/videos': {
    h1: 'Listas de reproducción',
    intro: 'Las series y colecciones del canal, agrupadas por juego.',
    sections: ['cs2', 'cs1', 'otros']
      .map((g) => ({
        h2: groupLabel[g],
        links: playlists
          .filter((p) => groupOf(p.title) === g)
          .map((p) => link(p.title, p.url, `${p.count} ${p.count === 1 ? 'video' : 'videos'}`)),
      }))
      .filter((s) => s.links.length),
  },
  '/recursos': {
    h1: 'Recursos para tu ciudad',
    intro: 'Mods, assets y mapas para Cities: Skylines y Cities: Skylines 2.',
    sections: [
      {
        h2: 'Mods',
        links: [link('Mi lista de mods de Cities: Skylines 2 (playset)', links.playsetCs2, 'El playset que uso en el canal.')],
      },
      {
        h2: 'Assets de Cities: Skylines 2',
        links: [
          ...paradox.map((m) => link(m.title, m.url, 'Paradox Mods')),
          link('Ver todo en Paradox Mods', links.paradoxCs2),
        ],
      },
      {
        h2: 'Assets de Cities: Skylines',
        links: [
          ...workshopAssets.map((m) => link(m.title, m.url, `${m.game}, Steam Workshop`)),
          link('Ver todo en Steam Workshop', links.steamCs1),
        ],
      },
      { h2: 'Mapas', links: workshopMaps.map((m) => link(m.title, m.url, `${m.game}, Steam Workshop`)) },
    ],
  },
  '/cs2-asset-builder': {
    h1: addon.name,
    intro: addon.intro.es,
    sections: [
      ...(addon.features ?? []).map((g) => ({ h2: g.title.es, items: g.items.map((i) => i.es) })),
      ...(addon.entries.length
        ? [
            {
              h2: 'Registro de avances',
              items: addon.entries.map(
                (e) =>
                  `${fmtDate(`${e.date}T12:00:00Z`)}${e.version ? ` (versión ${e.version})` : ''} · ${e.title.es}: ${e.text.es}`,
              ),
            },
          ]
        : []),
      {
        h2: 'Comentarios y sugerencias',
        text: 'Los comentarios y sugerencias se dejan en esta página y el 👍 de cada comentario sirve para votar las ideas. También puedes dejar tu sugerencia en el Discord.',
        links: [link('Discord', social('discord').url)],
      },
    ],
  },
  '/setup': {
    h1: 'El equipo detrás de Leal',
    intro: 'La PC y los periféricos que uso para jugar, construir ciudades y crear contenido.',
    sections: [
      { h2: 'En resumen', items: setup.highlights.map((h) => `${h.label}: ${h.value}`) },
      ...setup.groups.map((g) => ({ h2: g.title, items: g.specs.map((s) => `${s.label}: ${s.value}`) })),
    ],
  },
  '/sobre-mi': {
    h1: 'Ciudades con historia',
    intro: 'Gameplays, tutoriales, noticias y transmisiones sobre Cities: Skylines y otros juegos de gestión.',
    sections: [
      {
        h2: 'Hola, soy Leal',
        text: 'Creo contenido sobre Cities: Skylines y Cities: Skylines 2 para PC. Me apasionan los juegos de gestión, simulación, mundo abierto y city builders, y comparto cada proyecto desde Argentina. Este sitio organiza el universo del canal para que puedas pasar de una serie a sus recursos, configuración y ciudades sin perderte en el camino.',
        links: socials.map((s) => link(s.label, s.url, s.handle)),
      },
      {
        h2: '¿Hablamos?',
        text: 'Escríbeme a contacto@lealmafor.com o súmate al servidor de Discord para compartir con la comunidad.',
        links: [link('Discord', social('discord').url)],
      },
    ],
  },
}

const sectionHtml = (s) =>
  [
    `<section><h2>${esc(s.h2)}</h2>`,
    s.text ? `<p>${esc(s.text)}</p>` : '',
    s.links ? `<ul>${s.links.map((l) => `<li><a href="${esc(l.url)}">${esc(l.text)}</a>${l.note ? ` · ${esc(l.note)}` : ''}</li>`).join('')}</ul>` : '',
    s.items ? `<ul>${s.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : '',
    '</section>',
  ].join('')

function noscript(path) {
  const c = content[path]
  const menu = nav.map((n) => `<a href="${pageUrl(n.to)}">${esc(n.label)}</a>`).join(' · ')
  return `<noscript><header><a href="${site}/">Leal</a> · <nav aria-label="Principal">${menu}</nav></header><main><h1>${esc(c.h1)}</h1><p>${esc(c.intro)}</p>${c.sections.map(sectionHtml).join('')}</main></noscript>`
}

const sectionMd = (s) =>
  [
    `## ${s.h2}`,
    s.text ?? '',
    ...(s.links ?? []).map((l) => `- [${l.text}](${l.url})${l.note ? `: ${l.note}` : ''}`),
    ...(s.items ?? []).map((i) => `- ${i}`),
  ]
    .filter((x) => x !== '')
    .join('\n')

// ---------- Metaetiquetas y datos estructurados ----------

function jsonLd(path, page) {
  const url = pageUrl(path)
  const graph = [
    {
      '@type': path === '/sobre-mi' ? 'AboutPage' : 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: 'es',
      isPartOf: { '@id': `${site}/#website` },
    },
  ]
  if (path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${site}/` },
        { '@type': 'ListItem', position: 2, name: nav.find((n) => n.to === path)?.label ?? page.title, item: url },
      ],
    })
  }
  if (path === '/videos') {
    graph.push({
      '@type': 'ItemList',
      name: 'Listas de reproducción de Leal',
      itemListElement: playlists.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: p.url })),
    })
  }
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`
}

function block(path, page) {
  const url = pageUrl(path)
  const indexable = page.index !== false
  return [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    page.keywords ? `<meta name="keywords" content="${esc(page.keywords)}" />` : '',
    `<meta name="robots" content="${indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(name)}" />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${site + image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${site + image}" />`,
    `<meta name="twitter:image:alt" content="${esc(imageAlt)}" />`,
    jsonLd(path, page),
  ]
    .filter(Boolean)
    .join('\n    ')
}

const START = '<!--seo-->'
const END = '<!--/seo-->'
const re = new RegExp(`${START}[\\s\\S]*?${END}`)
if (!re.test(template)) throw new Error('index.html no tiene el bloque <!--seo-->')
if (!template.includes('<div id="root"></div>')) throw new Error('index.html no tiene <div id="root"></div>')

const urls = []
for (const [path, page] of Object.entries(seo.routes)) {
  if (!content[path]) throw new Error(`falta el contenido de ${path} en scripts/seo.mjs`)
  const html = template
    .replace(re, `${START}\n    ${block(path, page)}\n    ${END}`)
    .replace('<div id="root"></div>', `<div id="root"></div>\n    ${noscript(path)}`)
  const dir = path === '/' ? DIST : new URL(`.${path}/`, DIST)
  await mkdir(dir, { recursive: true })
  await writeFile(new URL('index.html', dir), html)
  if (page.index !== false) urls.push(path)
}

// ---------- Sitemap: solo con fechas que significan algo (la del último video en inicio y videos) ----------

const latest = videos.map((v) => v.published).sort().at(-1)
const lastmod = { '/': latest, '/videos': latest, '/cs2-asset-builder': addon.entries[0]?.date }
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map((p) => `  <url><loc>${pageUrl(p)}</loc>${lastmod[p] ? `<lastmod>${lastmod[p].slice(0, 10)}</lastmod>` : ''}</url>`)
    .join('\n') +
  `\n</urlset>\n`
await writeFile(new URL('sitemap.xml', DIST), sitemap)

// ---------- llms-full.txt: todo el contenido del sitio en texto ----------

const full = [
  `# Leal`,
  '',
  `> Canal y sitio de Leal (LealMafor), creador de contenido en español sobre Cities: Skylines 2 y Cities: Skylines, desde Argentina.`,
  '',
  ...Object.keys(content).flatMap((path) => {
    const c = content[path]
    return [`# ${c.h1}`, `Página: ${pageUrl(path)}`, '', c.intro, '', ...c.sections.map(sectionMd).flatMap((s) => [s, '']), '']
  }),
]
await writeFile(new URL('llms-full.txt', DIST), full.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n')

console.log(`[seo] ${Object.keys(seo.routes).length} páginas con metaetiquetas y contenido, ${urls.length} en el sitemap, llms-full.txt generado`)
