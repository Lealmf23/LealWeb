import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ButtonLink } from '@/components/layout/ButtonLink'
import { GiscusComments } from '@/components/layout/GiscusComments'
import { PageHeader } from '@/components/layout/PageHeader'
import { Section } from '@/components/layout/Section'
import { ADDON_NAME, addon, discussionsUrl, giscusConfigured, type EntryTag } from '@/data/addon'
import { socials } from '@/data/site'
import { LANGS, pick, resolveLang, type Lang } from '@/lib/addonLang'
import { asset } from '@/lib/utils'

const STORAGE_KEY = 'addon-lang'
const discordUrl = socials.find((s) => s.id === 'discord')!.url

/** Textos fijos de la página; el contenido del addon vive en addon.json. */
const ui: Record<
  Lang,
  {
    description: string
    statusLabel: string
    videoTitle: string
    featuresTitle: string
    logTitle: string
    logEmpty: string
    tag: Record<EntryTag, string>
    versionLabel: string
    moreLink: string
    commentsTitle: string
    voteHint: string
    fallbackText: string
    fallbackLink: string
    soonText: string
    soonLink: string
    langLabel: string
  }
> = {
  es: {
    description: 'El addon de Blender para crear assets de Cities: Skylines 2. Registro de avances, comentarios y sugerencias.',
    statusLabel: 'Estado',
    videoTitle: 'Video del addon',
    featuresTitle: 'Qué hace',
    logTitle: 'Registro de avances',
    logEmpty: 'Pronto habrá novedades.',
    tag: { novedad: 'Novedad', mejora: 'Mejora', arreglo: 'Arreglo' },
    versionLabel: 'Versión',
    moreLink: 'Más información',
    commentsTitle: 'Comentarios y sugerencias',
    voteHint: 'Dejá tu sugerencia o comentario. Votá las ideas que más te gusten con el 👍 de cada comentario.',
    fallbackText: 'Los comentarios no están disponibles por ahora. Podés dejar tu mensaje directamente en GitHub.',
    fallbackLink: 'Ver la discusión en GitHub',
    soonText: 'Los comentarios se habilitan pronto. Mientras tanto, dejá tu sugerencia en el Discord.',
    soonLink: 'Ir al Discord',
    langLabel: 'Idioma',
  },
  en: {
    description: 'The Blender addon for creating Cities: Skylines 2 assets. Progress log, comments and suggestions.',
    statusLabel: 'Status',
    videoTitle: 'Addon video',
    featuresTitle: 'What it does',
    logTitle: 'Progress log',
    logEmpty: 'News coming soon.',
    tag: { novedad: 'New', mejora: 'Improvement', arreglo: 'Fix' },
    versionLabel: 'Version',
    moreLink: 'More info',
    commentsTitle: 'Comments and suggestions',
    voteHint: 'Leave your suggestion or comment. Vote for the ideas you like most with the 👍 on each comment.',
    fallbackText: 'Comments are not available right now. You can leave your message directly on GitHub.',
    fallbackLink: 'View the discussion on GitHub',
    soonText: 'Comments are coming soon. In the meantime, leave your suggestion on Discord.',
    soonLink: 'Go to Discord',
    langLabel: 'Language',
  },
  pt: {
    description: 'O addon do Blender para criar assets de Cities: Skylines 2. Registro de avanços, comentários e sugestões.',
    statusLabel: 'Status',
    videoTitle: 'Vídeo do addon',
    featuresTitle: 'O que faz',
    logTitle: 'Registro de avanços',
    logEmpty: 'Novidades em breve.',
    tag: { novedad: 'Novidade', mejora: 'Melhoria', arreglo: 'Correção' },
    versionLabel: 'Versão',
    moreLink: 'Mais informações',
    commentsTitle: 'Comentários e sugestões',
    voteHint: 'Deixe sua sugestão ou comentário. Vote nas ideias de que mais gostar com o 👍 de cada comentário.',
    fallbackText: 'Os comentários não estão disponíveis no momento. Você pode deixar sua mensagem diretamente no GitHub.',
    fallbackLink: 'Ver a discussão no GitHub',
    soonText: 'Os comentários serão habilitados em breve. Enquanto isso, deixe sua sugestão no Discord.',
    soonLink: 'Ir ao Discord',
    langLabel: 'Idioma',
  },
}

const langName: Record<Lang, string> = { es: 'ES', en: 'EN', pt: 'PT' }

const tagColor: Record<EntryTag, string> = {
  novedad: 'var(--accent)',
  mejora: 'var(--zone-residencial)',
  arreglo: 'var(--zone-industrial)',
}

/** localStorage puede no estar disponible (modo privado, datos bloqueados): la página funciona igual. */
function readStoredLang() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function storeLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // sin almacenamiento: no se recuerda la elección
  }
}

export function AddonPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [lang, setLang] = useState<Lang>(() =>
    resolveLang({
      query: new URLSearchParams(location.search).get('lang'),
      stored: readStoredLang(),
      browser: navigator.languages,
    }),
  )
  const t = ui[lang]

  /** Cambia el idioma y lo refleja en la URL sin perder el #ancla ni los demás parámetros (utm, etc.). */
  const changeLang = (next: Lang) => {
    setLang(next)
    storeLang(next)
    const params = new URLSearchParams(location.search)
    params.set('lang', next)
    navigate({ search: `?${params}`, hash: location.hash }, { replace: true })
  }

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso))

  return (
    <div lang={lang}>
      <PageHeader eyebrow={ADDON_NAME} title={ADDON_NAME} description={t.description}>
        <div role="group" aria-label={t.langLabel} className="mt-6 inline-flex gap-1.5">
          {LANGS.map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={l === lang}
              onClick={() => changeLang(l)}
              className={[
                'rounded-[var(--radius-control)] border px-3.5 py-1.5 text-sm font-bold transition-colors',
                l === lang
                  ? 'border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--foreground)]'
                  : 'border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--foreground)]',
              ].join(' ')}
            >
              {langName[l]}
            </button>
          ))}
        </div>
      </PageHeader>

      <section className="px-5 py-10">
        <div
          className={[
            'mx-auto grid max-w-6xl gap-8 lg:items-center',
            addon.videoId ? 'lg:grid-cols-[1fr_1.1fr]' : '',
          ].join(' ')}
        >
          <div className="space-y-4">
            <p className="max-w-xl text-lg text-[var(--text-secondary)]">{pick(addon.intro, lang)}</p>
            <p className="text-sm font-semibold">
              <span className="text-[var(--text-muted)]">{t.statusLabel}: </span>
              {pick(addon.status, lang)}
            </p>
          </div>
          {addon.videoId && (
            <div className="aspect-video overflow-hidden rounded-[var(--radius-surface)] border border-[var(--border)] bg-[var(--surface)]">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${addon.videoId}`}
                title={t.videoTitle}
                loading="lazy"
                allow="accelerometer; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          )}
        </div>
      </section>

      {addon.features.length > 0 && (
        <Section id="funciones" title={t.featuresTitle}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {addon.features.map((group) => (
              <div
                key={group.title.es}
                className="rounded-[var(--radius-surface)] border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <h3 className="font-display text-2xl font-extrabold leading-tight">{pick(group.title, lang)}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--text-secondary)] marker:text-[var(--accent)]">
                  {group.items.map((item) => (
                    <li key={item.es}>{pick(item, lang)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section id="registro" title={t.logTitle}>
        {addon.entries.length === 0 ? (
          <p className="text-[var(--text-secondary)]">{t.logEmpty}</p>
        ) : (
          <ol className="grid gap-5">
            {addon.entries.map((entry) => (
              <li
                key={entry.id}
                className="rounded-[var(--radius-surface)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
                  <time dateTime={entry.date} className="font-semibold text-[var(--text-secondary)]">
                    {formatDate(entry.date)}
                  </time>
                  <span
                    className="rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase"
                    style={{ borderColor: tagColor[entry.tag], color: tagColor[entry.tag] }}
                  >
                    {t.tag[entry.tag]}
                  </span>
                  {entry.version && (
                    <span className="text-[var(--text-muted)]">
                      {t.versionLabel} {entry.version}
                    </span>
                  )}
                </div>
                <h3 className="font-display mt-3 text-2xl font-extrabold leading-tight">{pick(entry.title, lang)}</h3>
                <p className="mt-2 max-w-3xl whitespace-pre-line text-[var(--text-secondary)]">{pick(entry.text, lang)}</p>
                {entry.images && entry.images.length > 0 && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {entry.images.map((src) => (
                      <img
                        key={src}
                        src={asset(`addon/${src}`)}
                        alt={pick(entry.title, lang)}
                        loading="lazy"
                        className="w-full rounded-[var(--radius-control)] border border-[var(--border)]"
                      />
                    ))}
                  </div>
                )}
                {entry.link && (
                  <div className="mt-4">
                    <ButtonLink variant="secondary" href={entry.link}>
                      {t.moreLink} <ArrowUpRight size={16} aria-hidden="true" />
                    </ButtonLink>
                  </div>
                )}
              </li>
            ))}
          </ol>
        )}
      </Section>

      <Section id="comentarios" title={t.commentsTitle}>
        <p className="mb-6 max-w-2xl text-[var(--text-secondary)]">{t.voteHint}</p>
        <GiscusComments
          lang={lang}
          fallbackText={giscusConfigured ? t.fallbackText : t.soonText}
          fallbackLinkLabel={giscusConfigured ? t.fallbackLink : t.soonLink}
          fallbackHref={giscusConfigured ? discussionsUrl : discordUrl}
        />
      </Section>
    </div>
  )
}
