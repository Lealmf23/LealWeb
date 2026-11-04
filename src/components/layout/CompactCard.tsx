import { Card, type CardProps } from '@/components/arc/card/card'

/** Card de UIArc en versión compacta (título a 2 líneas, márgenes cortos). El estilo vive en index.css (.card-compact). */
export function CompactCard({ className, ...props }: CardProps) {
  return <Card {...props} className={['card-compact', className].filter(Boolean).join(' ')} />
}
