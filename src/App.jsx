import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Cursor from './components/ui/Cursor'
import WhatsApp from './components/ui/WhatsApp'
import Chatbot from './components/ui/Chatbot'
import MobileBar from './components/ui/MobileBar'
import Navbar from './components/sections/Navbar'
import Footer from './components/sections/Footer'
import HomePage from './pages/HomePage'
import SobrePage from './pages/SobrePage'
import AcompanhamentoPage from './pages/AcompanhamentoPage'
import TreinoPage from './pages/TreinoPage'
import ContactoPage from './pages/ContactoPage'
import AdminPage from './pages/AdminPage'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60] origin-left" style={{ scaleX }} />
}

export default function App() {
  const [page, setPage] = useState('home')

  const navigate = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const pages = {
    home: <HomePage navigate={navigate} />,
    sobre: <SobrePage navigate={navigate} />,
    acompanhamento: <AcompanhamentoPage navigate={navigate} />,
    treino: <TreinoPage navigate={navigate} />,
    contacto: <ContactoPage />,
    admin: <AdminPage />,
  }

  return (
    <div className="min-h-screen" style={{ background: '#0f0f0f', color: '#f0f0f0' }}>
      <Cursor />
      <ScrollProgress />
      <WhatsApp />
      <Chatbot />
      <MobileBar navigate={navigate} />
      <Navbar page={page} navigate={navigate} />

      <main>
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          {pages[page]}
        </motion.div>
      </main>

      <Footer navigate={navigate} />
    </div>
  )
}
