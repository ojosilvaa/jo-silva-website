import { useState, useEffect } from 'react'

export function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState('up')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setScrollDir('up')
      } else if (currentScrollY > lastScrollY) {
        setScrollDir('down')
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollDir, scrollY }
}
