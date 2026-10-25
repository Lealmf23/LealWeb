import type { ReactNode } from 'react'

interface DiagramProps {
  active: number
  onSelect: (index: number) => void
}

interface PartProps extends DiagramProps {
  index: number
  label: string
  children: ReactNode
}

/** Pieza interactiva del dibujo: se ilumina cuando es la activa. */
function Part({ index, active, onSelect, label, children }: PartProps) {
  return (
    <g
      className="bp-part"
      data-active={active === index}
      role="button"
      tabIndex={0}
      aria-label={label}
      onMouseEnter={() => onSelect(index)}
      onFocus={() => onSelect(index)}
      onClick={() => onSelect(index)}
    >
      {children}
    </g>
  )
}

/** Torre en corte: el orden de las piezas coincide con el de la lista de componentes. */
export function TowerDiagram(props: DiagramProps) {
  const p = (index: number, label: string, children: ReactNode) => (
    <Part index={index} label={label} {...props}>
      {children}
    </Part>
  )
  return (
    <svg viewBox="0 0 300 380" role="group" aria-label="Esquema de la torre" className="mx-auto h-auto w-full max-w-[22rem]">
      {p(7, 'Gabinete', <rect x="20" y="6" width="260" height="368" rx="14" />)}
      {p(3, 'Motherboard', <rect x="46" y="54" width="208" height="262" rx="6" />)}
      {p(
        4,
        'Refrigeración',
        <>
          <rect x="56" y="14" width="188" height="30" rx="5" />
          <circle cx="104" cy="29" r="11" />
          <circle cx="152" cy="29" r="11" />
          <circle cx="200" cy="29" r="11" />
        </>,
      )}
      {p(0, 'Procesador', <rect x="70" y="74" width="52" height="52" rx="5" />)}
      {p(
        2,
        'Memoria RAM',
        <>
          <rect x="158" y="68" width="9" height="66" rx="2" />
          <rect x="172" y="68" width="9" height="66" rx="2" />
          <rect x="186" y="68" width="9" height="66" rx="2" />
          <rect x="200" y="68" width="9" height="66" rx="2" />
        </>,
      )}
      {p(5, 'Almacenamiento principal', <rect x="62" y="146" width="84" height="12" rx="3" />)}
      {p(6, 'Almacenamiento secundario', <rect x="62" y="164" width="84" height="12" rx="3" />)}
      {p(
        1,
        'Tarjeta gráfica',
        <>
          <rect x="58" y="196" width="184" height="42" rx="6" />
          <circle cx="110" cy="217" r="14" />
          <circle cx="190" cy="217" r="14" />
        </>,
      )}
      <rect x="58" y="270" width="184" height="36" rx="4" className="bp-detail" />
      <path d="M72 288h156" className="bp-detail" />
    </svg>
  )
}

/** Escritorio visto de frente. */
export function DeskDiagram(props: DiagramProps) {
  const p = (index: number, label: string, children: ReactNode) => (
    <Part index={index} label={label} {...props}>
      {children}
    </Part>
  )
  return (
    <svg viewBox="0 0 420 290" role="group" aria-label="Esquema del escritorio" className="mx-auto h-auto w-full max-w-md">
      {p(
        0,
        'Monitor',
        <>
          <rect x="86" y="30" width="248" height="124" rx="7" />
          <rect x="203" y="154" width="14" height="28" />
          <rect x="164" y="182" width="92" height="8" rx="3" />
        </>,
      )}
      {p(3, 'Webcam', <rect x="198" y="14" width="24" height="12" rx="4" />)}
      {p(
        4,
        'Parlantes',
        <>
          <rect x="22" y="76" width="42" height="102" rx="6" />
          <circle cx="43" cy="108" r="9" />
          <circle cx="43" cy="148" r="13" />
          <rect x="356" y="76" width="42" height="102" rx="6" />
          <circle cx="377" cy="108" r="9" />
          <circle cx="377" cy="148" r="13" />
        </>,
      )}
      {p(1, 'Teclado', <rect x="104" y="214" width="156" height="38" rx="5" />)}
      <path d="M118 226h128M118 238h128" className="bp-detail" />
      {p(2, 'Mouse', <rect x="282" y="214" width="26" height="40" rx="13" />)}
      {p(
        5,
        'Micrófono',
        <>
          <rect x="52" y="196" width="26" height="52" rx="13" />
          <rect x="44" y="252" width="42" height="6" rx="3" />
        </>,
      )}
      {p(
        6,
        'Auriculares',
        <>
          <path d="M326 252a24 24 0 0 1 48 0" fill="none" strokeWidth="5" />
          <rect x="320" y="246" width="12" height="22" rx="4" />
          <rect x="368" y="246" width="12" height="22" rx="4" />
        </>,
      )}
      <path d="M8 268h404" className="bp-detail" />
    </svg>
  )
}
