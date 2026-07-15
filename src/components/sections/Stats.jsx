import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from '../ui/CountUp'
import { FadeUp } from '../ui/TextReveal'

const stats = [
  { value: 300, suffix: '+', label: 'Clientes Activos', desc: 'Atletas a atingir os seus objectivos' },
  { value: 8, suffix: '+', label: 'Anos de Experiência', desc: 'A transformar vidas através do fitness' },
  { value: 98, suffix: '%', label: 'Taxa de Retenção', desc: 'Dos clientes renovam o seu plano' },
  { value: 12, suffix: 'k', label: 'Sessões Realizadas', desc: 'De treino presencial e online' },
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section className="section-padding border-t border-white/[0.04]" id="stats">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-bg p-8 lg:p-12 relative group overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gold/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Number */}
              <div className="font-display text-5xl lg:text-7xl gradient-text mb-3">
                <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
              </div>

              {/* Label */}
              <div className="text-white/80 font-medium text-sm mb-1">{stat.label}</div>
              <div className="text-white/30 text-xs">{stat.desc}</div>

              {/* Accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
