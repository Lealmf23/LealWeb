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
import { Section } from '@/components/layout/Section'
import { setup, type SpecIcon } from '@/data/setup'

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

export function SetupPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Mi setup"
        title="El equipo detrás de Leal"
        description="La PC y los periféricos que uso para jugar, construir ciudades y crear contenido."
      />

      {setup.map((group) => (
        <Section key={group.title} eyebrow={group.eyebrow} title={group.title}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {group.specs.map((spec) => {
              const Icon = icons[spec.icon]
              return (
                <li
                  key={`${spec.label}-${spec.value}`}
                  className="flex gap-4 rounded-[var(--radius-panel)] border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--accent-subtle)] text-[var(--accent)]">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">{spec.label}</p>
                    <p className="mt-0.5 text-sm font-semibold leading-snug">{spec.value}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Section>
      ))}
    </div>
  )
}
