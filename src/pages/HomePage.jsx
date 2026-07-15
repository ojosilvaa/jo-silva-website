import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Star, CheckCircle, ChevronDown } from 'lucide-react'
import { FadeUp, SlideIn, StaggerContainer, staggerItem } from '../components/ui/TextReveal'
import MagneticButton from '../components/ui/MagneticButton'
import Testimonials from '../components/sections/Testimonials'
import FAQ from '../components/sections/FAQ'
import Logo from '../components/ui/Logo'

const HERO_IMG = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/eYRd3dJOch4WVVyR/chatgpt-image-27-de-abr.-de-2026-13_00_53-C9LO5r8YFuGnvf0X.png'
const ABOUT_IMG = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=768,fit=crop/eYRd3dJOch4WVVyR/2_5285260843196366588-images-1-1-zeMyCZnYuAdqTfwF.png'

const stats = [
  { value: '4,5+', label: 'Anos de experiência' },
  { value: '150+', label: 'Alunos acompanhados' },
  { value: '100%', label: 'Online' },
  { value: '★★★★★', label: 'Avaliação dos alunos' },
]

const steps = [
  { num: '01', title: 'Avaliação inicial', desc: 'Entendo seu objetivo, rotina e nível atual. Tudo antes de criar qualquer plano.' },
  { num: '02', title: 'Plano personalizado', desc: 'Treino 100% para a sua realidade — ginásio, casa ou rotina apertada.' },
  { num: '03', title: 'Ajustes contínuos', desc: 'Acompanhamento semanal para garantir evolução constante sem estagnação.' },
  { num: '04', title: 'Suporte direto', desc: 'Você não está sozinho. Respondo dúvidas e ajusto o plano quando precisar.' },
]

const forWho = [
  'Trabalham e têm rotina corrida',
  'Querem emagrecer ou ganhar massa',
  'Já tentaram treinar sozinhos sem resultado',
  'Procuram algo simples, direto e eficiente',
]

export default function HomePage({ navigate }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="pb-mobile">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden grain">
        {/* Background photo with parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: imgY }}
        >
          <img
            src={HERO_IMG}
            alt="Treino personalizado"
            className="w-full h-full object-cover object-center scale-110"
          />
        </motion.div>

        {/* Dark gradient overlay — bottom heavy */}
        <div className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(to top, #0f0f0f 0%, rgba(15,15,15,0.7) 40%, rgba(15,15,15,0.2) 100%)' }}
        />

        {/* Orange ambient glow */}
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full pointer-events-none z-10"
          style={{ background: 'radial-gradient(ellipse, rgba(255,101,0,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }}
        />

        {/* Content */}
        <motion.div
          className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20"
          style={{ opacity: heroOpacity }}
        >
          {/* Stars */}
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-primary fill-primary" />)}
            </div>
            <span className="text-white/60 text-sm">+150 alunos transformados</span>
          </motion.div>

          {/* Headline */}
          {['TRANSFORME', 'SEU CORPO', 'COM ESTRATÉGIA'].map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                className={`font-display leading-[0.9] tracking-tight ${
                  i === 1 ? 'gradient-text text-glow' : 'text-white'
                }`}
                style={{ fontSize: 'clamp(3.2rem, 12vw, 9rem)' }}
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.12 }}
              >
                {word}
              </motion.h1>
            </div>
          ))}

          <motion.p
            className="text-white/55 text-base sm:text-lg max-w-md mt-5 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
          >
            Treinos feitos para pessoas com rotina normal que querem resultados reais, sem complicações.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <MagneticButton
              className="px-8 py-4 bg-primary text-white text-sm font-bold rounded-full glow animate-pulse-glow hover:bg-primary-dark transition-colors"
              onClick={() => navigate('contacto')}
            >
              <span className="flex items-center gap-2">Agendar Avaliação Gratuita <ArrowRight size={15} /></span>
            </MagneticButton>
            <button
              onClick={() => navigate('acompanhamento')}
              className="text-white/50 text-sm hover:text-white transition-colors flex items-center gap-1.5 cursor-none"
              data-cursor="true"
            >
              Como funciona <ChevronDown size={14} />
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-6 right-6 z-20 hidden sm:flex flex-col items-center gap-1"
          animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        >
          <ChevronDown size={18} className="text-white/30" />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="section-dark-2 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="py-6 px-5 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                <div className="font-display text-3xl sm:text-4xl gradient-text mb-1">{s.value}</div>
                <div className="text-white/40 text-xs sm:text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-padding section-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-5 h-0.5 bg-primary" />
              <span className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Como funciona</span>
            </div>
            <h2 className="font-display text-white mb-10 sm:mb-14" style={{ fontSize: 'clamp(2.2rem,5vw,4rem)' }}>
              O ACOMPANHAMENTO<br /><span className="gradient-text">PASSO A PASSO</span>
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="glass-dark rounded-2xl p-6 card-lift relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                {/* Orange top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                <div className="font-display text-5xl gradient-text mb-4 opacity-70">{step.num}</div>
                <h3 className="text-white font-semibold mb-2 text-sm">{step.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR WHO (dark photo bg) ── */}
      <section className="relative section-padding overflow-hidden grain">
        <div className="absolute inset-0 z-0">
          <img src={ABOUT_IMG} alt="" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,15,15,0.88) 0%, rgba(15,15,15,0.75) 50%, rgba(255,101,0,0.08) 100%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <SlideIn direction="left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-5 h-0.5 bg-primary" />
                <span className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Para quem é</span>
              </div>
              <h2 className="font-display text-white mb-4" style={{ fontSize: 'clamp(2.2rem,5vw,4rem)' }}>
                ESTE SERVIÇO<br /><span className="gradient-text">É PARA VOCÊ</span>
              </h2>
              <p className="text-white/50 mb-8 leading-relaxed">
                Se procura algo realista e sustentável, este método é para você.
              </p>
              <MagneticButton
                className="px-7 py-3.5 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary-dark transition-colors"
                onClick={() => navigate('contacto')}
              >
                Quero começar
              </MagneticButton>
            </SlideIn>

            <StaggerContainer stagger={0.1}>
              {forWho.map((item) => (
                <motion.div
                  key={item}
                  variants={staggerItem}
                  className="flex items-start gap-3 py-4 border-b border-white/10"
                >
                  <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm sm:text-base">{item}</span>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="section-padding section-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <FadeUp>
              <div className="flex items-center gap-3 mb-2">
                <Logo size={28} color="#FF6500" />
                <span className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Sobre o método</span>
              </div>
              <h2 className="font-display text-white mb-5" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
                MAIS DO QUE<br /><span className="gradient-text">UM TREINADOR</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-3 text-sm sm:text-base">
                Meu nome é <strong className="text-white">Joazio Silva</strong> e atuo como personal trainer focado em transformação física e evolução real.
              </p>
              <p className="text-white/40 leading-relaxed text-sm">
                Com mais de <strong className="text-white/70">4 anos e meio de experiência</strong> e mais de <strong className="text-white/70">150 alunos</strong> acompanhados, meu trabalho é voltado para pessoas que querem sair do básico e começar a ter resultado com estratégia.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Hipertrofia', 'Emagrecimento', 'Condicionamento', 'Iniciantes'].map(tag => (
                  <span key={tag} className="glass-orange text-primary text-xs px-3 py-1.5 rounded-full font-medium">{tag}</span>
                ))}
              </div>
            </FadeUp>

            <SlideIn direction="right" delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: '4,5+', label: 'Anos de\nexperiência' },
                  { val: '150+', label: 'Alunos\ntransformados' },
                  { val: '100%', label: 'Planos\npersonalizados' },
                  { val: 'Online', label: 'Qualquer\nlugar do mundo' },
                ].map((item, i) => (
                  <motion.div
                    key={item.val}
                    className="glass-dark rounded-2xl p-5 relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 rounded-full pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at top right, rgba(255,101,0,0.15), transparent 70%)' }} />
                    <div className="font-display text-2xl sm:text-3xl gradient-text mb-1">{item.val}</div>
                    <div className="text-white/40 text-xs whitespace-pre-line leading-snug">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <Testimonials />

      {/* ── FAQ ── */}
      <FAQ />

      {/* ── FINAL CTA ── */}
      <section className="relative py-20 sm:py-28 overflow-hidden grain section-dark">
        {/* Orange glow bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(255,101,0,0.12) 0%, transparent 70%)', filter: 'blur(20px)' }} />
        </div>
        <FadeUp>
          <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
            <Logo size={40} color="#FF6500" />
            <h2 className="font-display text-white mt-6 mb-3" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
              PRONTO PARA<br /><span className="gradient-text text-glow">COMEÇAR?</span>
            </h2>
            <p className="text-white/40 mb-8 text-sm sm:text-base">A avaliação inicial é gratuita. Sem compromisso, sem enrolação.</p>
            <MagneticButton
              className="px-10 py-4 bg-primary text-white text-sm font-bold rounded-full glow hover:bg-primary-dark transition-colors"
              onClick={() => navigate('contacto')}
            >
              <span className="flex items-center gap-2">Agendar Avaliação <ArrowRight size={15} /></span>
            </MagneticButton>
          </div>
        </FadeUp>
      </section>
    </div>
  )
}
