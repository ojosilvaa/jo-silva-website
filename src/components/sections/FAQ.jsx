import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FadeUp } from '../ui/TextReveal'

const faqs = [
  { q: 'Personal trainer online funciona mesmo?', a: 'Sim, desde que exista um treino estruturado, acompanhamento e consistência. O grande diferencial é ter um plano adaptado à sua rotina e objetivos, evitando treinos aleatórios que atrasam resultados.' },
  { q: 'Quanto tempo demora para começar a ver resultado?', a: 'Depende da sua frequência, alimentação e dedicação. Muitas pessoas começam a perceber mudanças nas primeiras semanas — principalmente em disposição, resistência e hábitos.' },
  { q: 'Dá para emagrecer treinando em casa?', a: 'Sim. Com um plano correto e exercícios adaptados, é possível perder gordura treinando em casa. O mais importante é manter consistência e seguir uma estratégia adequada.' },
  { q: 'Preciso ir para academia para ter resultado?', a: 'Não necessariamente. Tudo depende do seu objetivo e da estrutura disponível. Existem estratégias eficientes tanto para academia quanto para treino em casa.' },
  { q: 'O treino é realmente personalizado?', a: 'Sim. O treino é montado com base no seu objetivo, rotina, nível atual e disponibilidade de tempo. Isso torna o processo muito mais eficiente.' },
  { q: 'Quantas vezes por semana preciso treinar?', a: 'Varia conforme seu objetivo e rotina. O mais importante não é treinar todos os dias, mas conseguir manter frequência de forma sustentável.' },
  { q: 'Dá para ganhar massa muscular com consultoria online?', a: 'Sim. Com treino adequado, progressão e alimentação alinhada, é possível desenvolver hipertrofia muscular através de acompanhamento online.' },
  { q: 'O treino serve para iniciantes?', a: 'Sim. Os planos são adaptados para diferentes níveis, inclusive pessoas que nunca treinaram antes.' },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      className="border-b border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-none group"
        data-cursor="true"
      >
        <span className="text-white/80 font-medium pr-4 group-hover:text-primary transition-colors">{faq.q}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 w-7 h-7 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors"
        >
          <Plus size={14} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-white/40 text-sm leading-relaxed pb-5">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section className="section-padding section-dark">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <FadeUp>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-0.5 bg-primary" />
            <span className="text-primary text-xs tracking-widest uppercase font-medium">FAQ</span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight text-white mb-10">
            PERGUNTAS<br />
            <span className="gradient-text">FREQUENTES</span>
          </h2>
        </FadeUp>
        <div>
          {faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
        </div>
      </div>
    </section>
  )
}
