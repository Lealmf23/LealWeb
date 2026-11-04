import raw from './setup.json'

export type SpecIcon =
  | 'cpu'
  | 'gpu'
  | 'ram'
  | 'board'
  | 'cooling'
  | 'ssd'
  | 'case'
  | 'monitor'
  | 'keyboard'
  | 'mouse'
  | 'webcam'
  | 'speaker'
  | 'mic'
  | 'headphones'

export interface Spec {
  icon: SpecIcon
  label: string
  value: string
}

export interface SpecGroup {
  eyebrow: string
  title: string
  specs: Spec[]
}

/** Los datos viven en setup.json para que el script de SEO también los lea. */
export const setup: SpecGroup[] = raw.groups as SpecGroup[]

/** Lo esencial del equipo, para quien no quiere leer toda la lista. */
export const highlights = raw.highlights as { icon: SpecIcon; label: string; value: string }[]
