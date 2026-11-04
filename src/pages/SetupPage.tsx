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
import { highlights, setup, type SpecIcon } from '@/data/setup'

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
        eyebrow="Setup"
        title="El equipo detrás de Leal"
        description="La PC y los periféricos que uso para jugar, construir ciudades y crear contenido."
      />

      <Section title="En resumen">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = icons[item.icon]
            return (
              <li
                key={item.label}
                className="flex items-center gap-3 rounded-[var(--radius-panel)] border border-[var(--border-strong)] bg-[var(--surface)] p-4"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-[var(--accent-subtle)] text-[var(--accent)]">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-[var(--text-muted)]">{item.label}</span>
                  <span className="font-display block text-xl font-extrabold leading-tight sm:text-2xl">{item.value}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </Section>

      {setup.map((group) => (
        <Section key={group.title} title={group.title}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {group.specs.map((spec) => {
              const Icon = icons[spec.icon]
              return (
                <li
                  key={`${spec.label}-${spec.value}`}
                  className="flex items-start gap-3 rounded-[var(--radius-panel)] border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[var(--accent-subtle)] text-[var(--accent)]">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-[var(--text-muted)]">{spec.label}</span>
                    <span className="mt-0.5 block text-sm font-semibold leading-snug">{spec.value}</span>
                  </span>
                </li>
              )
            })}
          </ul>
        </Section>
      ))}
    </div>
  )
}
