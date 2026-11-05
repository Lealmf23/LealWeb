import { useEffect, useRef, useState } from 'react'
import { giscus, giscusConfigured } from '@/data/addon'
import type { Lang } from '@/lib/addonLang'

interface GiscusCommentsProps {
  lang: Lang
  /** Qué mostrar si el hilo no está activo o no puede cargar: un texto y un enlace que exista. */
  fallbackText: string
  fallbackLinkLabel: string
  fallbackHref: string
}

/** Hilo de comentarios de Giscus (GitHub Discussions); si no puede cargar, el respaldo que indique la página. */
export function GiscusComments({ lang, fallbackText, fallbackLinkLabel, fallbackHref }: GiscusCommentsProps) {
  const container = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)
  const configured = giscusConfigured

  useEffect(() => {
    const host = container.current
    if (!configured || !host) return
    setFailed(false)

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    const attrs: Record<string, string> = {
      'data-repo': giscus.repo,
      'data-repo-id': giscus.repoId,
      'data-category': giscus.category,
      'data-category-id': giscus.categoryId,
      'data-mapping': 'specific',
      'data-term': giscus.term,
      'data-strict': '1',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': 'transparent_dark',
      'data-lang': lang,
      'data-loading': 'lazy',
    }
    for (const [name, value] of Object.entries(attrs)) script.setAttribute(name, value)
    script.onerror = () => setFailed(true)

    host.replaceChildren(script)
    return () => host.replaceChildren()
  }, [configured, lang])

  if (!configured || failed) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-[var(--radius-surface)] border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="text-[var(--text-secondary)]">{fallbackText}</p>
        <a
          href={fallbackHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[var(--accent)] hover:underline"
        >
          {fallbackLinkLabel}
        </a>
      </div>
    )
  }

  return <div ref={container} className="giscus-host" />
}
