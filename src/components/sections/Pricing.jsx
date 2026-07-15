import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import { FadeUp, StaggerContainer, staggerItem } from '../ui/TextReveal'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    tag: 'Para começar',
    price: { monthly: 89, quarterly: 79 },
    desc: 'Ideal para quem está a dar os primeiros passos no treino estruturado.',
    features: [
      'Programa de treino mensal',
      'Guia nutricional base',
      'Check-in semanal via app',
      'Acesso à biblioteca de exercícios',
      'Suporte por mensagem',
    ],
    cta: 'Começar',
    highlight: false,
  },
  {
    id: 'transform',
    name: 'Transform',
    tag: 'Mais popular',
    price: { monthly: 169, quarterly: 149 },
    desc: 'O plano completo para transformações sérias e resultados documentados.',
    features: [
      'Programa de treino semanal',
      'Plano nutricional personalizado',
      'Acompanhamento diário',
      '2 video-calls/mês',
      'Ajustes em tempo real',
      'Análise de composição corporal',
      'Suporte prioritário 24/7',
    ],
    cta: 'Transformar Agora',
    highlight: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    tag: 'Performance máxima',
    price: { monthly: 349, quarterly: 299 },
    desc: 'Para atletas e profissionais que exigem o máximo da sua performance.',
    features: [
      'Tudo do Transform',
      '4 sessões presenciais/mês',
      'Periodização avançada',
      'Análise biomecânica',
      'Protocolo de recuperação',
      'Nutrição de competição',
      'Acesso directo 24/7',
    ],
    cta: 'Ir ao Elite',
    highlight: false,
  },
]

export default function Pricing() {
  const [billing, setBilling] = useState('monthly')

  return (
    <section id="precos" className="section-padding">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeUp>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.3em] uppercase">Preços</span>
              <div className="w-8 h-px bg-gold" />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] text-white mb-6">
              INVESTIMENTO<br />
              <span className="gradient-text">NO TEU FUTURO</span>
            </h2>
          </FadeUp>

          {/* Billing toggle */}
          <FadeUp delay={0.2}>
            <div className="inline-flex items-center gap-1 p-1 bg-bg2 border border-white/[0.06] rounded-full mt-4">
              {['monthly', 'quarterly'].map((type) => (
                <button
                  key={type}
                  className={`relative px-5 py-2 text-sm rounded-full transition-colors cursor-none ${
                    billing === type ? 'text-bg' : 'text-white/40 hover:text-white/70'
                  }`}
                  onClick={() => setBilling(type)}
                  data-cursor="true"
                >
                  {billing === type && (
                    <motion.div
                      layoutId="billing-pill"
                      className="absolute inset-0 bg-gold rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {type === 'monthly' ? 'Mensal' : 'Trimestral'}
                    {type === 'quarterly' && (
                      <span className="ml-2 text-[10px] text-green-400">-12%</span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <FadeUp key={plan.id} delay={i * 0.1}>
              <div
                className={`relative h-full p-8 rounded-sm border transition-all duration-300 ${
                  plan.highlight
                    ? 'border-gold/40 bg-gold/[0.04]'
                    : 'border-white/[0.06] bg-bg2 hover:border-white/[0.12]'
                }`}
              >
                {/* Popular badge */}
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gold text-bg text-[11px] font-bold tracking-wider rounded-full">
                      <Zap size={10} />
                      MAIS POPULAR
                    </div>
                  </div>
                )}

                {/* Tag + Name */}
                <div className="mb-6">
                  <span className="text-white/30 text-xs tracking-wide">{plan.tag}</span>
                  <h3 className="font-display text-3xl text-white tracking-wide mt-1">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={billing + plan.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-end gap-1"
                    >
                      <span className="font-display text-5xl gradient-text">
                        €{plan.price[billing]}
                      </span>
                      <span className="text-white/30 text-sm mb-1">/mês</span>
                    </motion.div>
                  </AnimatePresence>
                  <p className="text-white/35 text-xs mt-2 leading-relaxed">{plan.desc}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-white/50">
                      <Check
                        size={14}
                        className={`shrink-0 mt-0.5 ${plan.highlight ? 'text-gold' : 'text-white/30'}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="#contacto"
                  className={`block w-full py-3.5 text-center text-sm font-semibold tracking-wide rounded-sm transition-all cursor-none ${
                    plan.highlight
                      ? 'bg-gold text-bg hover:bg-gold/90'
                      : 'border border-white/[0.1] text-white/70 hover:border-gold/40 hover:text-gold'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor="true"
                >
                  {plan.cta}
                </motion.a>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Note */}
        <FadeUp delay={0.4}>
          <p className="text-center text-white/20 text-xs mt-8">
            Todos os planos incluem consulta inicial gratuita · Sem contratos de longa duração · Cancelamento a qualquer momento
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
