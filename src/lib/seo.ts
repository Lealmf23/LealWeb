import seo from '@/data/seo.json'

type RouteMeta = { title: string; description: string; keywords?: string; index?: boolean }
const routes = seo.routes as Record<string, RouteMeta>

function setMeta(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

const meta = (key: 'name' | 'property', name: string, content: string) =>
  setMeta(
    `meta[${key}="${name}"]`,
    () => {
      const el = document.createElement('meta')
      el.setAttribute(key, name)
      return el
    },
    'content',
    content,
  )

/** Actualiza título y metaetiquetas al navegar; las páginas prerenderizadas ya vienen con las suyas. */
export function applySeo(pathname: string) {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  const found = routes[path]
  const page = found ?? { ...seo.notFound, keywords: '', index: false }
  const url = seo.site.url + (path === '/' ? '/' : `${path}/`)

  document.title = page.title
  meta('name', 'description', page.description)
  meta('name', 'keywords', page.keywords ?? '')
  meta('name', 'robots', page.index === false ? 'noindex, follow' : 'index, follow')
  meta('property', 'og:title', page.title)
  meta('property', 'og:description', page.description)
  meta('property', 'og:url', url)
  meta('name', 'twitter:title', page.title)
  meta('name', 'twitter:description', page.description)
  setMeta('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', url)
}
