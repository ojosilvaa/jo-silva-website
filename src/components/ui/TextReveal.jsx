import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035 },
  },
}

const wordVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export function WordReveal({ text, className, once = true, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-10% 0px' })

  const words = text.split(' ')

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            variants={wordVariants}
            style={{ display: 'inline-block' }}
            transition={{ delay: delay + i * 0.035 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export function FadeUp({ children, className, delay = 0, once = true }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export function SlideIn({ children, className, direction = 'left', delay = 0, once = true }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-5% 0px' })

  const from = direction === 'left' ? { x: -60, opacity: 0 } : { x: 60, opacity: 0 }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={from}
      animate={isInView ? { x: 0, opacity: 1 } : from}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({ children, className, delay = 0, once = true }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className, stagger = 0.1, once = true }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}
