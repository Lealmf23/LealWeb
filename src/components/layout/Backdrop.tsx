import { asset } from '@/lib/utils'

interface BackdropProps {
  /** Archivo de /public con captura del juego. */
  src: string
  /** object-position de la imagen. */
  position?: string
  /** Opacidad del navy sobre la imagen en el centro (0-1). */
  veil?: number
  eager?: boolean
}

/** Captura del juego de fondo, teñida de navy y fundida con el fondo de la página arriba y abajo. */
export function Backdrop({ src, position = 'center', veil = 0.55, eager }: BackdropProps) {
  return (
    <>
      <img
        src={asset(src)}
        alt=""
        loading={eager ? undefined : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ objectPosition: position }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to bottom, var(--background) 0%, color-mix(in oklab, var(--background) ${veil * 100}%, transparent) 30%, color-mix(in oklab, var(--background) ${veil * 100}%, transparent) 70%, var(--background) 100%)`,
        }}
        aria-hidden="true"
      />
    </>
  )
}
