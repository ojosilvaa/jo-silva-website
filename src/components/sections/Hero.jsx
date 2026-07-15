import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDownRight, ChevronDown } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'

const words = ['FORÇA', 'FORMA', 'FOCO', 'FUTURO']

function FloatingOrb({ x, y, size, color, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        filter: 'blur(80px)',
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  )
}

function AnimatedWordCycle() {
  return (
    <div className="overflow-hidden h-[1em]" style={{ lineHeight: 1 }}>
      <motion.div
        animate={{ y: words.map((_, i) => `-${i * 100}%`) }}
        transition={{
          duration: words.length * 2.5,
          ease: 'linear',
          repeat: Infinity,
          times: words.map((_, i) => i / words.length),
        }}
      >
        {[...words, words[0]].map((word, i) => (
          <div key={i} className="block shimmer">{word}</div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 600], [0, -120])
  const y2 = useTransform(scrollY, [0, 600], [0, -60])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.95])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden noise-bg"
      style={{ background: '#080808' }}
    >
      {/* Ambient orbs */}
      <FloatingOrb x="10%" y="20%" size="400px" color="rgba(200,169,110,0.07)" delay={0} />
      <FloatingOrb x="60%" y="60%" size="500px" color="rgba(200,169,110,0.05)" delay={2} />
      <FloatingOrb x="80%" y="10%" size="300px" color="rgba(138,116,73,0.06)" delay={1} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200,169,110,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,110,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24"
        style={{ y: y1, scale, opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-8 h-px bg-gold" />
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
            Personal Trainer · Portugal
          </span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-[clamp(4rem,12vw,11rem)] leading-[0.9] tracking-tight text-white"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            A TUA
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="font-display text-[clamp(4rem,12vw,11rem)] leading-[0.9] tracking-tight"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            <AnimatedWordCycle />
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-[clamp(4rem,12vw,11rem)] leading-[0.9] tracking-tight text-white"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          >
            COMEÇA AQUI
          </motion.h1>
        </div>

        {/* Bottom row */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mt-12 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Description */}
          <p className="text-white/50 text-base max-w-xs leading-relaxed">
            Treino personalizado, nutrição estratégica e coaching dedicado — para resultados que duram.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <MagneticButton
              className="group px-8 py-4 bg-gold text-bg text-sm font-semibold tracking-wide rounded-sm hover:bg-gold/90 transition-colors"
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="flex items-center gap-2">
                Consulta Gratuita
                <ArrowDownRight size={16} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </span>
            </MagneticButton>

            <motion.a
              href="#resultados"
              className="text-sm text-white/50 hover:text-gold transition-colors flex items-center gap-2 cursor-none tracking-wide"
              whileHover={{ x: 4 }}
              data-cursor="true"
            >
              Ver Resultados →
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ y: y2, opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-gold/50" />
        </motion.div>
        <span className="text-white/20 text-xs tracking-widest uppercase" style={{ writingMode: 'vertical-lr' }}>
          scroll
        </span>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 border-t border-white/[0.04]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-white/[0.04]">
            {[
              { value: '8+', label: 'Anos de Experiência' },
              { value: '300+', label: 'Clientes Transformados' },
              { value: '98%', label: 'Taxa de Satisfação' },
            ].map((stat) => (
              <div key={stat.label} className="py-5 px-6 first:pl-0">
                <div className="font-display text-2xl text-gold">{stat.value}</div>
                <div className="text-xs text-white/30 tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
