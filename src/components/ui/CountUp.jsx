import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function CountUp({ end, duration = 2, suffix = '', prefix = '', decimals = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const startTime = performance.now()
    const startValue = 0

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const easedProgress = easeOutQuart(progress)
      const currentValue = startValue + (end - startValue) * easedProgress

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, end, duration])

  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString('pt-PT')

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  )
}
