import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Award, Target, Zap, Heart } from 'lucide-react'
import { FadeUp, SlideIn, StaggerContainer, staggerItem, WordReveal } from '../ui/TextReveal'

const credentials = [
  { icon: Award, text: 'CEFE · NSCA Certified' },
  { icon: Target, text: 'Especialista em Hipertrofia' },
  { icon: Zap, text: 'Nutrição Desportiva' },
  { icon: Heart, text: 'Coach de Alta Performance' },
]

const values = [
  { title: 'Ciência', desc: 'Cada programa é baseado em evidência científica actualizada, não em modas passageiras.' },
  { title: 'Individualidade', desc: 'Não existem dois corpos iguais. O teu plano é único como tu és.' },
  { title: 'Consistência', desc: 'Resultados duradouros exigem comprometimento. Estou cá para garantir o teu.' },
]

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40])
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3])

  return (
    <section id="sobre" className="section-padding overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase">Sobre Mim</span>
          </div>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image area */}
          <SlideIn direction="left">
            <div className="relative">
              {/* Main "photo" block */}
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
                {/* Gradient placeholder for image */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #111 50%, #1a1a1a 100%)',
                  }}
                />
                {/* Gold accent lines creating a portrait frame effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-display text-8xl gradient-text mb-2">JS</div>
                    <div className="text-white/20 text-sm tracking-widest">PERSONAL TRAINER</div>
                  </div>
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
              </div>

              {/* Floating credential card */}
              <motion.div
                className="absolute -right-6 bottom-16 glass-gold p-4 max-w-[180px]"
                style={{ y, rotate }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="font-display text-3xl gradient-text">8+</div>
                <div className="text-white/60 text-xs mt-1 leading-relaxed">Anos a transformar atletas em Portugal</div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-gold/20 rounded-sm" />
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gold/10 rounded-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </SlideIn>

          {/* Right: Content */}
          <div>
            <SlideIn direction="right" delay={0.15}>
              <h2 className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] text-white mb-6">
                MAIS DO QUE UM<br />
                <span className="gradient-text">TREINADOR</span>
              </h2>
            </SlideIn>

            <FadeUp delay={0.25}>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Sou o Jo Silva — personal trainer certificado com mais de 8 anos de experiência. Acredito que cada pessoa tem o potencial para transformar o seu corpo e a sua vida, e a minha missão é guiar essa transformação com rigor, ciência e paixão.
              </p>
              <p className="text-white/40 text-base leading-relaxed mb-10">
                Trabalho com atletas de todos os níveis — do iniciante que dá os primeiros passos até ao competidor que quer atingir o próximo nível. O meu método combina treino de força, nutrição estratégica e coaching mental.
              </p>
            </FadeUp>

            {/* Credentials */}
            <FadeUp delay={0.35}>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {credentials.map((cred) => (
                  <div key={cred.text} className="flex items-center gap-3 p-3 bg-bg3 rounded-sm border border-white/[0.04]">
                    <cred.icon size={16} className="text-gold shrink-0" />
                    <span className="text-white/60 text-xs">{cred.text}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Values */}
            <StaggerContainer stagger={0.12}>
              {values.map((v) => (
                <motion.div
                  key={v.title}
                  variants={staggerItem}
                  className="border-t border-white/[0.06] py-4 flex gap-4"
                >
                  <div className="text-gold font-display text-xl w-6 shrink-0 leading-tight">+</div>
                  <div>
                    <div className="text-white/80 font-medium text-sm mb-1">{v.title}</div>
                    <div className="text-white/35 text-xs leading-relaxed">{v.desc}</div>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
