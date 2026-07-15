import { Star } from 'lucide-react'
import Marquee from '../ui/Marquee'
import { FadeUp } from '../ui/TextReveal'

const testimonials = [
  {
    name: 'Maria C.',
    role: '34 anos',
    text: 'Tô no 3º mês e já perdi 7kg. Nunca fui de academia e achei q ia desistir mas o método é bem simples de seguir. Valeu mto',
    rating: 5,
    result: '-7kg',
  },
  {
    name: 'Rafael S.',
    role: '28 anos',
    text: 'Tentei vários treinos na internet mas não via resultado nenhum. Com o acompanhamento personalizado mudou tudo. Em 2 meses senti diferença msm. O plano é feito pra minha rotina e isso faz toda diferença',
    rating: 5,
    result: '+massa',
  },
  {
    name: 'Carla M.',
    role: '41 anos',
    text: 'Trabalho o dia todo e sempre achei que não teria tempo pra me dedicar a um treino sério. Mas o plano é completamente adaptado à minha rotina. Comecei há 4 meses, já perdi gordura e ganhei disposição no dia a dia. O acompanhamento é constante e faz toda a diferença.',
    rating: 5,
    result: 'Transformação',
  },
  {
    name: 'Lucas B.',
    role: '22 anos',
    text: 'Ganho de massa em 60 dias. Recomendo',
    rating: 5,
    result: '+8kg massa',
  },
  {
    name: 'Priscila R.',
    role: '37 anos',
    text: 'Sendo sincera: cheguei sem esperar mto. Mas funcionou bem melhor do q eu esperava. O foco em resultado real sem enrolação é diferente do q vc encontra por aí',
    rating: 5,
    result: '-11kg',
  },
  {
    name: 'André T.',
    role: '45 anos',
    text: 'Comecei do zero, nunca tinha treinado na vida. O plano é simples e direto, sem aquelas coisas complicadas que a gente vê nos vídeos. Tô conseguindo manter a frequência, que pra mim era o maior problema.',
    rating: 5,
    result: 'Iniciante',
  },
  {
    name: 'Juliana F.',
    role: '29 anos',
    text: 'ameii!! tava travada há meses sem ver resultado e em 3 semanas já senti diferença. o suporte é muito bom tbm, sempre responde rápido',
    rating: 5,
    result: 'Emagrecimento',
  },
  {
    name: 'Diego M.',
    role: '33 anos',
    text: 'Pra mim o maior diferencial foi ter um plano que respeita minha rotina de trabalho. Não adianta ter o melhor treino do mundo se vc n consegue encaixar na vida real',
    rating: 5,
    result: 'Consistência',
  },
]

function TestimonialCard({ t }) {
  return (
    <div className="w-[300px] shrink-0 p-5 glass-dark rounded-2xl border border-white/8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={11} className="text-primary fill-primary" />
          ))}
        </div>
        <span className="text-primary text-[11px] font-medium px-2 py-0.5 bg-primary-soft border border-primary/20 rounded-full">
          {t.result}
        </span>
      </div>
      <p className="text-dark-2/70 text-sm leading-relaxed mb-4">"{t.text}"</p>
      <div className="flex items-center gap-2 border-t border-border pt-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
          {t.name[0]}
        </div>
        <div>
          <div className="text-dark text-sm font-medium">{t.name}</div>
          <div className="text-muted text-xs">{t.role}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-16 overflow-hidden section-dark-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <FadeUp>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-0.5 bg-primary" />
            <span className="text-primary text-xs tracking-widest uppercase font-medium">Resultados reais</span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight text-white">
            O QUE DIZEM<br />
            <span className="gradient-text">OS ALUNOS</span>
          </h2>
        </FadeUp>
      </div>
      <div className="space-y-3">
        <Marquee>
          {testimonials.map((t) => <TestimonialCard key={t.name} t={t} />)}
        </Marquee>
        <Marquee reverse>
          {[...testimonials].reverse().map((t) => <TestimonialCard key={t.name + 'r'} t={t} />)}
        </Marquee>
      </div>
    </section>
  )
}
