import { motion } from 'framer-motion'
import { Award, CheckCircle, ArrowRight } from 'lucide-react'
import { FadeUp, SlideIn } from '../components/ui/TextReveal'
import MagneticButton from '../components/ui/MagneticButton'

const credentials = [
  'Formação em Exercício Físico',
  'Avaliação e Prescrição de Treino',
  'Especialista em Hipertrofia',
  'Especialista em Perda de Peso',
]

const values = [
  { title: 'Resultado real', desc: 'Foco em evolução prática, não em promessas vazias.' },
  { title: 'Plano adaptado', desc: 'Cada aluno tem uma realidade diferente. O plano respeita isso.' },
  { title: 'Sem complicação', desc: 'Método simples, direto e que encaixa na sua rotina.' },
]

export default function SobrePage({ navigate }) {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideIn direction="left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-0.5 bg-primary" />
                <span className="text-primary text-xs tracking-widest uppercase font-medium">Sobre</span>
              </div>
              <h1 className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-tight text-dark mb-6">
                QUEM ESTÁ<br />POR TRÁS DO<br />
                <span className="gradient-text">MÉTODO</span>
              </h1>
              <p className="text-dark-2/60 leading-relaxed mb-6">
                Meu nome é <strong className="text-dark">Joazio Silva</strong> e atuo como personal trainer focado em transformação física e evolução real.
              </p>
              <p className="text-dark-2/60 leading-relaxed mb-6">
                Ao longo de mais de <strong className="text-dark">4 anos e meio de experiência</strong>, já acompanhei mais de <strong className="text-dark">150 alunos</strong>, tanto no presencial quanto online.
              </p>
              <p className="text-dark-2/60 leading-relaxed mb-8">
                Meu trabalho é voltado para pessoas que querem sair do básico e começar a ter resultado com estratégia.
              </p>
              <MagneticButton
                className="px-7 py-3.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors"
                onClick={() => navigate('contacto')}
              >
                <span className="flex items-center gap-2">Agendar Avaliação <ArrowRight size={14} /></span>
              </MagneticButton>
            </SlideIn>

            <SlideIn direction="right" delay={0.15}>
              {/* Photo placeholder */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-bg3">
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-display text-5xl gradient-text">J</span>
                  </div>
                  <span className="text-muted text-sm tracking-widest uppercase">Jô Silva</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-white/20 to-transparent" />
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-padding bg-bg2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <FadeUp>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight text-dark mb-6">
                FORMAÇÃO &<br />
                <span className="gradient-text">ESPECIALIDADES</span>
              </h2>
              <div className="space-y-3">
                {credentials.map((c) => (
                  <div key={c} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-border">
                    <Award size={16} className="text-primary shrink-0" />
                    <span className="text-dark-2 text-sm">{c}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight text-dark mb-6">
                MEUS<br />
                <span className="gradient-text">VALORES</span>
              </h2>
              <div className="space-y-5">
                {values.map((v) => (
                  <div key={v.title} className="border-b border-border pb-5">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle size={15} className="text-primary" />
                      <span className="font-semibold text-dark">{v.title}</span>
                    </div>
                    <p className="text-muted text-sm pl-6">{v.desc}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <FadeUp>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] mb-4">VAMOS COMEÇAR?</h2>
          <p className="text-white/70 mb-8 max-w-sm mx-auto">A avaliação inicial é gratuita e sem compromisso.</p>
          <MagneticButton
            className="px-10 py-4 bg-white text-primary text-sm font-semibold rounded-full hover:bg-white/90 transition-colors"
            onClick={() => navigate('contacto')}
          >
            Agendar Avaliação
          </MagneticButton>
        </FadeUp>
      </section>
    </div>
  )
}
