/** Google Analytics 4: páginas vistas y clics en enlaces externos. El script base está en index.html. */

type Gtag = (command: string, ...args: unknown[]) => void

function gtag(command: string, ...args: unknown[]) {
  const fn = (window as unknown as { gtag?: Gtag }).gtag
  fn?.(command, ...args)
}

export function trackPageView(path: string) {
  gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

function trackOutbound(rawUrl: string, via: 'link' | 'button') {
  let url: URL
  try {
    url = new URL(rawUrl, window.location.href)
  } catch {
    return
  }
  if (url.origin === window.location.origin || !/^https?:$/.test(url.protocol)) return
  gtag('event', 'outbound_click', {
    link_url: url.href,
    link_domain: url.hostname,
    link_via: via,
    transport_type: 'beacon',
  })
}

let started = false

/** Escucha los clics en <a> externos y los window.open de los botones (que no son enlaces). */
export function initOutboundTracking() {
  if (started) return
  started = true

  document.addEventListener(
    'click',
    (event) => {
      const link = (event.target as Element | null)?.closest?.('a[href]')
      if (link) trackOutbound((link as HTMLAnchorElement).href, 'link')
    },
    true,
  )

  const open = window.open.bind(window)
  window.open = (url, ...rest) => {
    if (url) trackOutbound(String(url), 'button')
    return open(url, ...rest)
  }
}
