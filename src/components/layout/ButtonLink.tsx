import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import styles from '@/components/arc/button/button.module.css'
import { motionTokens } from '@/components/arc/lib/motion-tokens'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  /** Ruta interna: usa el router, sin recargar. */
  to?: string
  /** URL externa: se abre en una pestaña nueva. */
  href?: string
  variant?: Variant
  size?: Size
  children: ReactNode
}

const MotionLink = motion.create(Link)

/**
 * Enlace con la apariencia y el gesto de pulsación del Button de UIArc.
 * Es un <a> real: se puede abrir en otra pestaña, copiar o compartir, y los lectores de pantalla lo anuncian como enlace.
 */
export function ButtonLink({ to, href, variant = 'primary', size = 'md', className, children, ...props }: ButtonLinkProps) {
  const reduce = useReducedMotion() ?? false
  const classes = [styles.button, styles[variant], styles[size], 'no-underline', className].filter(Boolean).join(' ')
  const label = (
    <span className={styles.labelSlot}>
      <span className={styles.labelContent}>
        <span className={styles.labelPhase}>{children}</span>
      </span>
    </span>
  )
  const press = reduce ? {} : { whileTap: { scale: 0.97 }, transition: motionTokens.spring.snappy }

  if (to) {
    return (
      <MotionLink to={to} className={classes} {...press} {...props}>
        {label}
      </MotionLink>
    )
  }
  return (
    <motion.a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...press} {...props}>
      {label}
    </motion.a>
  )
}
