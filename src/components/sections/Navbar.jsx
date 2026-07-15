import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import Logo from '../ui/Logo'

const links = [
  { label: 'Personal Trainer', page: 'home' },
  { label: 'Acompanhamento Online', page: 'acompanhamento' },
  { label: 'Treino Personalizado', page: 'treino' },
  { label: 'Sobre', page: 'sobre' },
  { label: 'Contacto', page: 'contacto' },
]

export default function Navbar({ page, navigate }) {
  const { scrollDir, scrollY } = useScrollDirection()
  const [menuOpen, setMenuOpen] = useState(false)
  const isScrolled = scrollY > 40

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{ y: scrollDir === 'down' && scrollY > 200 ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`transition-all duration-400 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-border' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => navigate('home')}
                className="flex items-center gap-2.5 cursor-none group"
                data-cursor="true"
              >
                <motion.div whileHover={{ rotate: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Logo size={34} color={isScrolled || menuOpen ? '#1a1a1a' : '#fff'} />
                </motion.div>
                <span className={`font-display text-xl tracking-widest transition-colors ${isScrolled || menuOpen ? 'text-dark' : 'text-white'}`}>
                  JÔ SILVA
                </span>
              </button>

              <nav className="hidden lg:flex items-center gap-5">
                {links.map((link) => (
                  <button
                    key={link.page}
                    onClick={() => navigate(link.page)}
                    className={`text-sm transition-colors cursor-none pb-0.5 animated-underline ${
                      page === link.page
                        ? 'text-primary font-medium'
                        : isScrolled ? 'text-dark-2 hover:text-primary' : 'text-white/80 hover:text-white'
                    }`}
                    data-cursor="true"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              <div className="hidden lg:flex">
                <motion.button
                  onClick={() => navigate('contacto')}
                  className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors cursor-none"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  data-cursor="true"
                >
                  Marcar Avaliação
                </motion.button>
              </div>

              <button
                className={`lg:hidden p-2 transition-colors cursor-none ${isScrolled ? 'text-dark' : 'text-white'}`}
                onClick={() => setMenuOpen(!menuOpen)}
                data-cursor="true"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col items-center gap-7 px-8">
              <Logo size={48} color="#1a1a1a" />
              {links.map((link, i) => (
                <motion.button
                  key={link.page}
                  onClick={() => { navigate(link.page); setMenuOpen(false) }}
                  className="font-display text-4xl text-dark hover:text-primary transition-colors tracking-widest cursor-none"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  data-cursor="true"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => { navigate('contacto'); setMenuOpen(false) }}
                className="w-full max-w-xs py-4 bg-primary text-white font-semibold rounded-full text-sm cursor-none"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                data-cursor="true"
              >
                Marcar Avaliação
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
