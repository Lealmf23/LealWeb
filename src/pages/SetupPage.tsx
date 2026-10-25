import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  Cpu,
  CircuitBoard,
  Fan,
  Gpu,
  HardDrive,
  Headphones,
  Keyboard,
  MemoryStick,
  Mic,
  Monitor,
  Mouse,
  PcCase,
  Speaker,
  Webcam,
  type LucideIcon,
} from 'lucide-react'
import { DeskDiagram, TowerDiagram } from '@/components/layout/SetupDiagram'
import { Section } from '@/components/layout/Section'
import { setup, type SpecGroup, type SpecIcon } from '@/data/setup'

const icons: Record<SpecIcon, LucideIcon> = {
  cpu: Cpu,
  gpu: Gpu,
  ram: MemoryStick,
  board: CircuitBoard,
  cooling: Fan,
  ssd: HardDrive,
  case: PcCase,
  monitor: Monitor,
  keyboard: Keyboard,
  mouse: Mouse,
  webcam: Webcam,
  speaker: Speaker,
  mic: Mic,
  headphones: Headphones,
}

/** Dibujo a la izquierda y lista a la derecha; elegir una pieza o una fila ilumina la otra. */
function SetupGroup({ group }: { group: SpecGroup }) {
  const [active, setActive] = useState(0)
  const Diagram = group.diagram === 'tower' ? TowerDiagram : DeskDiagram

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
      <div className="relative overflow-hidden rounded-[var(--radius-surface)] border border-[var(--border-strong)] bg-[var(--surface)] p-6">
        <div className="city-grid absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <Diagram active={active} onSelect={setActive} />
        </div>
      </div>

      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {group.specs.map((spec, i) => {
          const Icon = icons[spec.icon]
          const on = active === i
          return (
            <li key={`${spec.label}-${spec.value}`}>
              <button
                type="button"
                aria-pressed={on}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={[
                  'flex h-full w-full items-start gap-3 rounded-[var(--radius-panel)] border p-3 text-left transition-colors',
                  on
                    ? 'border-[var(--accent)] bg-[var(--surface-raised)]'
                    : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]',
                ].join(' ')}
              >
                <span
                  className={[
                    'grid h-10 w-10 shrink-0 place-items-center rounded-md transition-colors',
                    on ? 'bg-[var(--accent)] text-[var(--accent-foreground)]' : 'bg-[var(--accent-subtle)] text-[var(--accent)]',
                  ].join(' ')}
                >
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-[var(--text-muted)]">{spec.label}</span>
                  <span className="mt-0.5 block text-sm font-semibold leading-snug">{spec.value}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function SetupPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Setup"
        title="El equipo detrás de Leal"
        description="La PC y los periféricos que uso para jugar, construir ciudades y crear contenido."
      />

      {setup.map((group) => (
        <Section key={group.title} title={group.title}>
          <SetupGroup group={group} />
        </Section>
      ))}
    </div>
  )
}
