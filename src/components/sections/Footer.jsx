import { motion } from 'framer-motion'
import { Instagram, Phone, Mail } from 'lucide-react'

export default function Footer({ navigate }) {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl tracking-widest mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-base font-bold" style={{fontFamily:'sans-serif'}}>J</span>
              JÔ SILVA
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Personal Trainer Online — treinos personalizados para resultados reais.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/40 text-xs tracking-widest uppercase mb-4">Páginas</h4>
            <ul className="space-y-2">
              {[
                { label: 'Personal Trainer', page: 'home' },
                { label: 'Acompanhamento Online', page: 'acompanhamento' },
                { label: 'Treino Personalizado', page: 'treino' },
                { label: 'Sobre', page: 'sobre' },
                { label: 'Contacto', page: 'contacto' },
              ].map(l => (
                <li key={l.page}>
                  <button
                    onClick={() => navigate(l.page)}
                    className="text-white/50 text-sm hover:text-primary transition-colors cursor-none"
                    data-cursor="true"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/40 text-xs tracking-widest uppercase mb-4">Contacto</h4>
            <div className="space-y-3">
              <a href="tel:+351921469901" className="flex items-center gap-3 text-white/50 text-sm hover:text-primary transition-colors cursor-none" data-cursor="true">
                <Phone size={14} /> +351 921 469 901
              </a>
              <a href="mailto:personal@ojosilva.com" className="flex items-center gap-3 text-white/50 text-sm hover:text-primary transition-colors cursor-none" data-cursor="true">
                <Mail size={14} /> personal@ojosilva.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">© 2026 Jô Silva. Todos os direitos reservados.</p>
          <p className="text-white/15 text-xs">Desenvolvido com Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}
