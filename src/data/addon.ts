import type { Localized } from '@/lib/addonLang'
import raw from './addon.json'

export type EntryTag = 'novedad' | 'mejora' | 'arreglo'

export interface AddonEntry {
  id: string
  /** AAAA-MM-DD */
  date: string
  tag: EntryTag
  version?: string
  title: Localized
  text: Localized
  /** Archivos de public/addon/, sin "/" inicial. */
  images?: string[]
  link?: string
}

/** Grupo de funciones del addon, para la sección "Qué hace". */
export interface AddonFeature {
  title: Localized
  /** Captura del addon, archivo de public/addon/ (sin "/" inicial). */
  image?: string
  items: Localized[]
}

interface AddonData {
  name: string
  status: Localized
  intro: Localized
  videoId?: string
  features: AddonFeature[]
  entries: AddonEntry[]
}

const data = raw as AddonData

export const ADDON_NAME = data.name

/** Contenido del addon; las entradas van de la más nueva a la más vieja. */
export const addon: AddonData = {
  ...data,
  entries: [...data.entries].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)),
}

/**
 * Configuración de Giscus (comentarios). Los ids salen de giscus.app una vez activadas las Discussions
 * del repo; mientras estén vacíos, la página muestra un enlace a GitHub en lugar del hilo.
 */
export const giscus = {
  repo: 'Lealmf23/LealWeb',
  repoId: 'R_kgDOVGdn0Q',
  category: 'Addon',
  categoryId: 'DIC_kwDOVGdn0c4DKc3f',
  term: 'Addon',
}

/** Giscus solo carga con los dos ids; hasta entonces los comentarios no están activos. */
export const giscusConfigured = Boolean(giscus.repoId && giscus.categoryId)

export const discussionsUrl = 'https://github.com/Lealmf23/LealWeb/discussions'
