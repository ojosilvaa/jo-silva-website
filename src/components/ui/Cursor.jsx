import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 }
  const ringX = useSpring(mouseX, { damping: 22, stiffness: 180, mass: 0.8 })
  const ringY = useSpring(mouseY, { damping: 22, stiffness: 180, mass: 0.8 })

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseDown = () => setClicking(true)
    const handleMouseUp = () => setClicking(false)

    const handleHoverStart = () => setHovering(true)
    const handleHoverEnd = () => setHovering(false)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart)
      el.addEventListener('mouseleave', handleHoverEnd)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart)
        el.removeEventListener('mouseleave', handleHoverEnd)
      })
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <motion.div
        ref={dotRef}
        className="cursor-dot"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: clicking ? 0.4 : hovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring */}
      <motion.div
        ref={ringRef}
        className={`cursor-ring ${hovering ? 'hovering' : ''}`}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: clicking ? 0.85 : 1,
          opacity: hovering ? 1 : 0.7,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
