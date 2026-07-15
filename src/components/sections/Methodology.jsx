import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { FadeUp } from '../ui/TextReveal'

const steps = [
  {
    num: '01',
    title: 'Diagnóstico',
    desc: 'Avaliação física completa, análise de composição corporal, histórico de treino e definição de objectivos realistas e mensuráveis.',
    duration: '1ª Sessão',
  },
  {
    num: '02',
    title: 'Estratégia',
    desc: 'Criação do teu programa 100% personalizado — periodização, macros alimentares, progressão de cargas e métricas de sucesso.',
    duration: '72h após diagnóstico',
  },
  {
    num: '03',
    title: 'Execução',
    desc: 'Treinos supervisionados ou acompanhados remotamente, com ajustes semanais baseados na tua recuperação e evolução real.',
    duration: 'Semanas 1–12',
  },
  {
    num: '04',
    title: 'Evolução',
    desc: 'Reavaliação mensal, ajustes de programa e celebração dos resultados. Sem estagnação — o teu corpo adapta-se, o teu plano também.',
    duration: 'Em contínuo',
  },
]

function StepCard({ step, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Circle */}
      <div className="relative z-10 w-16 h-16 mb-6 flex items-center justify-center">
        <div className="absolute inset-0 border border-gold/30 rounded-full" />
        <div className="absolute inset-2 bg-gold/10 rounded-full" />
        <span className="font-display text-lg gradient-text relative z-10">{step.num}</span>
      </div>

      {/* Duration badge */}
      <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 bg-gold/10 border border-gold/20 rounded-full">
        <div className="w-1 h-1 bg-gold rounded-full" />
        <span className="text-gold text-[10px] tracking-wide">{step.duration}</span>
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl text-white tracking-wide mb-3">{step.title}</h3>

      {/* Desc */}
      <p className="text-white/35 text-sm leading-relaxed">{step.desc}</p>
    </motion.div>
  )
}

export default function Methodology() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%'])

  return (
    <section id="metodo" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(ellipse, rgba(200,169,110,0.04) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeUp>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.3em] uppercase">O Método</span>
              <div className="w-8 h-px bg-gold" />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] text-white">
              UM PROCESSO<br />
              <span className="gradient-text">COMPROVADO</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-white/40 text-sm max-w-md mx-auto mt-6 leading-relaxed">
              Cada etapa é desenhada para maximizar os teus resultados e garantir uma progressão sustentável ao longo do tempo.
            </p>
          </FadeUp>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Progress line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-8 right-8 h-px bg-white/[0.04]">
            <motion.div
              className="h-full bg-gradient-to-r from-gold/60 to-gold/20"
              style={{ width: lineProgress }}
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <FadeUp delay={0.3}>
          <div className="mt-20 p-8 lg:p-12 border border-gold/20 bg-gold/[0.02] rounded-sm text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/[0.03] to-transparent" />
            <div className="relative z-10">
              <h3 className="font-display text-3xl lg:text-5xl text-white mb-4">
                PRONTO PARA COMEÇAR?
              </h3>
              <p className="text-white/40 text-sm mb-8 max-w-sm mx-auto">
                A primeira consulta é gratuita. Sem compromisso, sem letras pequenas.
              </p>
              <motion.a
                href="#contacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-bg text-sm font-semibold tracking-wide rounded-sm hover:bg-gold/90 transition-colors cursor-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                data-cursor="true"
              >
                Marcar Consulta Gratuita
              </motion.a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
