import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export default function MagneticButton({ children, className, strength = 0.4, onClick }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = e.clientX - centerX
    const dy = e.clientY - centerY
    setPosition({ x: dx * strength, y: dy * strength })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.5 }}
      className={cn('relative overflow-hidden cursor-none', className)}
      data-cursor="true"
    >
      {children}
    </motion.button>
  )
}
