import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Dumbbell, Wifi, Apple, BarChart3, ArrowRight } from 'lucide-react'
import { FadeUp, StaggerContainer, staggerItem } from '../ui/TextReveal'

const services = [
  {
    id: 1,
    icon: Dumbbell,
    tag: '01',
    title: 'Treino Presencial',
    subtitle: 'One-to-One',
    desc: 'Sessões individuais completamente personalizadas. Cada exercício, carga e série é calculado para maximizar os teus resultados com segurança.',
    features: ['Avaliação física completa', 'Programa 100% personalizado', 'Técnica supervisionada', 'Progressão estruturada'],
    color: '#C8A96E',
  },
  {
    id: 2,
    icon: Wifi,
    tag: '02',
    title: 'Coaching Online',
    subtitle: 'Remote Training',
    desc: 'A mesma qualidade de treino, sem fronteiras geográficas. Acompanhamento diário via app, vídeos explicativos e check-ins semanais.',
    features: ['App de treino dedicada', 'Suporte 7 dias/semana', 'Ajustes em tempo real', 'Video-calls mensais'],
    color: '#C8A96E',
  },
  {
    id: 3,
    icon: Apple,
    tag: '03',
    title: 'Nutrição Estratégica',
    subtitle: 'Nutrition Plan',
    desc: 'Planos alimentares criados para o teu corpo, objectivos e estilo de vida. Sem dietas da moda, sem restrições absurdas — nutrição que funciona.',
    features: ['Análise composição corporal', 'Plano alimentar semanal', 'Receitas personalizadas', 'Suplementação estratégica'],
    color: '#C8A96E',
  },
  {
    id: 4,
    icon: BarChart3,
    tag: '04',
    title: 'Performance & Sport',
    subtitle: 'Athletic Development',
    desc: 'Preparação física para atletas de competição. Periodização avançada, análise biomecânica e protocolos de recuperação de elite.',
    features: ['Periodização táctica', 'Análise de performance', 'Treino específico por modalidade', 'Protocolo de recuperação'],
    color: '#C8A96E',
  },
]

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      className="relative p-8 border border-white/[0.06] bg-bg2 group overflow-hidden rounded-sm cursor-none"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="true"
    >
      {/* Hover background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(200,169,110,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Top: tag + icon */}
      <div className="flex items-start justify-between mb-8">
        <span className="font-display text-6xl text-white/[0.05] leading-none select-none">{service.tag}</span>
        <div className="w-12 h-12 bg-gold/10 border border-gold/20 flex items-center justify-center rounded-sm">
          <service.icon size={20} className="text-gold" />
        </div>
      </div>

      {/* Title */}
      <div className="mb-1">
        <span className="text-gold/60 text-xs tracking-[0.2em] uppercase">{service.subtitle}</span>
      </div>
      <h3 className="font-display text-3xl text-white tracking-wide mb-4">{service.title}</h3>

      {/* Desc */}
      <p className="text-white/40 text-sm leading-relaxed mb-6">{service.desc}</p>

      {/* Features */}
      <AnimatePresence>
        {hovered && (
          <motion.ul
            className="space-y-2 mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {service.features.map((f, i) => (
              <motion.li
                key={f}
                className="flex items-center gap-2 text-xs text-white/50"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="w-1 h-1 bg-gold rounded-full" />
                {f}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* CTA */}
      <motion.div
        className="flex items-center gap-2 text-gold text-sm font-medium"
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <span>Saber mais</span>
        <ArrowRight size={14} />
      </motion.div>

      {/* Bottom border accent */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gold"
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="servicos" className="section-padding">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <FadeUp>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-gold" />
                <span className="text-gold text-xs tracking-[0.3em] uppercase">Serviços</span>
              </div>
              <h2 className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] text-white">
                O QUE POSSO<br />
                <span className="gradient-text">FAZER POR TI</span>
              </h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed">
              Cada serviço é concebido para transformar o teu corpo e mentalidade com base científica e acompanhamento total.
            </p>
          </FadeUp>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
