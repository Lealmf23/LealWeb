import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionTokens } from '@/components/arc/lib/motion-tokens'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Segundos de espera antes de aparecer. */
  delay?: number
}

/** Hace aparecer su contenido (sube y se aclara) la primera vez que entra en pantalla. Sin movimiento si la persona lo prefiere así. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion() ?? false
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some', margin: '0px 0px -8% 0px' }}
      transition={{ duration: motionTokens.duration.considered, ease: [...motionTokens.ease.enter], delay }}
    >
      {children}
    </motion.div>
  )
}
