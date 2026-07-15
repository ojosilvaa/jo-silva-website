import { Wifi, MessageCircle, RefreshCw, Target, ArrowRight } from 'lucide-react'
import { FadeUp, SlideIn, StaggerContainer, staggerItem } from '../components/ui/TextReveal'
import MagneticButton from '../components/ui/MagneticButton'
import Testimonials from '../components/sections/Testimonials'

const features = [
  { icon: Target, title: 'Avaliação inicial completa', desc: 'Entendemos seu objetivo, rotina e nível atual antes de montar qualquer coisa.' },
  { icon: RefreshCw, title: 'Ajustes estratégicos', desc: 'O plano evolui junto com você. Sem estagnação, sem fazer a mesma coisa para sempre.' },
  { icon: MessageCircle, title: 'Suporte direto', desc: 'Você não está sozinho. Acompanhamento contínuo durante todo o processo.' },
  { icon: Wifi, title: 'Funciona de qualquer lugar', desc: 'Ginásio, casa, viagem — o plano se adapta à sua realidade.' },
]

export default function AcompanhamentoPage({ navigate }) {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <SlideIn direction="left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-0.5 bg-primary" />
                <span className="text-primary text-xs tracking-widest uppercase font-medium">Acompanhamento Online</span>
              </div>
              <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-tight text-dark mb-6">
                RESULTADO<br />COM<br />
                <span className="gradient-text">ESTRATÉGIA</span>
              </h1>
              <p className="text-dark-2/60 text-lg leading-relaxed mb-8 max-w-lg">
                Acompanhamento completo para pessoas que querem sair do zero e começar a ver resultado de verdade — sem complicação, sem perder tempo.
              </p>
              <MagneticButton
                className="px-8 py-4 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors"
                onClick={() => navigate('contacto')}
              >
                <span className="flex items-center gap-2">Agendar Avaliação <ArrowRight size={14} /></span>
              </MagneticButton>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-bg2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight text-dark mb-12">
              O QUE INCLUI O<br /><span className="gradient-text">ACOMPANHAMENTO</span>
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.1}>
                <div className="p-7 bg-white rounded-2xl border border-border card-hover">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <f.icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-dark mb-2">{f.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="py-20 bg-primary text-white text-center">
        <FadeUp>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] mb-4">PRONTO PARA EVOLUIR?</h2>
          <p className="text-white/70 mb-8">A primeira avaliação é gratuita.</p>
          <MagneticButton
            className="px-10 py-4 bg-white text-primary text-sm font-semibold rounded-full"
            onClick={() => navigate('contacto')}
          >
            Marcar Avaliação
          </MagneticButton>
        </FadeUp>
      </section>
    </div>
  )
}
