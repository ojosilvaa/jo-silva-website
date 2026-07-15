import { Home, Building2, Clock, BarChart3, ArrowRight } from 'lucide-react'
import { FadeUp, SlideIn } from '../components/ui/TextReveal'
import MagneticButton from '../components/ui/MagneticButton'

const types = [
  { icon: Building2, title: 'Treino na academia', desc: 'Plano estruturado para ginásio, com foco em progressão de carga e resultado real.' },
  { icon: Home, title: 'Treino em casa', desc: 'Exercícios adaptados ao espaço e equipamentos que você tem disponível.' },
  { icon: Clock, title: 'Rotina apertada', desc: 'Sessões curtas e eficientes para quem tem pouco tempo mas quer resultado.' },
  { icon: BarChart3, title: 'Todos os níveis', desc: 'Do iniciante absoluto ao avançado — o plano começa de onde você está.' },
]

export default function TreinoPage({ navigate }) {
  return (
    <div className="pt-24">
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <SlideIn direction="left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-0.5 bg-primary" />
                <span className="text-primary text-xs tracking-widest uppercase font-medium">Treino Personalizado</span>
              </div>
              <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-tight text-dark mb-6">
                SEU TREINO,<br />
                <span className="gradient-text">SUA REGRA</span>
              </h1>
              <p className="text-dark-2/60 text-lg leading-relaxed mb-8">
                Aqui não existem treinos genéricos. Cada plano é construído com base no seu objetivo, rotina e evolução.
              </p>
              <MagneticButton
                className="px-8 py-4 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors"
                onClick={() => navigate('contacto')}
              >
                <span className="flex items-center gap-2">Quero meu plano <ArrowRight size={14} /></span>
              </MagneticButton>
            </SlideIn>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {types.map((t, i) => (
              <FadeUp key={t.title} delay={i * 0.1}>
                <div className="p-7 rounded-2xl border border-border bg-white card-hover flex gap-5">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <t.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-1">{t.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="section-padding bg-primary">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-white leading-tight mb-6">
              POR QUE ESCOLHER<br />ESTE ACOMPANHAMENTO?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Aqui não existem treinos genéricos. Cada plano é construído com base no seu objetivo, rotina e evolução.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-10">
              {['Personalização real', 'Acompanhamento contínuo', 'Foco em resultado prático', 'Método simples e eficiente'].map(item => (
                <div key={item} className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3">
                  <span className="text-white font-bold">✔</span>
                  <span className="text-white text-sm">{item}</span>
                </div>
              ))}
            </div>
            <MagneticButton
              className="px-10 py-4 bg-white text-primary text-sm font-semibold rounded-full"
              onClick={() => navigate('contacto')}
            >
              Agendar Avaliação
            </MagneticButton>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
