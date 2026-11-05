/** Idiomas de la página del addon. Sin imports: lo corre `node --test` directamente. */
export type Lang = 'es' | 'en' | 'pt'
export const LANGS: readonly Lang[] = ['es', 'en', 'pt']

/** Texto en varios idiomas; el español es obligatorio y sirve de respaldo. */
export type Localized = { es: string; en?: string; pt?: string }

const asLang = (value: string | null | undefined): Lang | null => {
  const code = value?.toLowerCase().slice(0, 2)
  return LANGS.find((l) => l === code) ?? null
}

/** Orden: ?lang= → idioma guardado → idiomas del navegador (el primero soportado) → español. */
export function resolveLang(input: {
  query?: string | null
  stored?: string | null
  browser?: readonly string[]
}): Lang {
  return (
    asLang(input.query) ??
    asLang(input.stored) ??
    (input.browser ?? []).map(asLang).find((l) => l !== null) ??
    'es'
  )
}

/** Texto en el idioma pedido; si falta o está vacío, el español. */
export function pick(text: Localized, lang: Lang): string {
  return text[lang] || text.es
}
