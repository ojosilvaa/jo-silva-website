import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Instagram, Phone, Mail, CheckCircle } from 'lucide-react'
import { FadeUp, SlideIn } from '../ui/TextReveal'
import MagneticButton from '../ui/MagneticButton'

const goals = ['Perda de gordura', 'Ganho muscular', 'Performance desportiva', 'Recomposição corporal', 'Saúde geral']

const contacts = [
  { icon: Instagram, label: '@josilvapt', href: 'https://instagram.com/josilvapt' },
  { icon: Phone, label: '+351 912 345 678', href: 'tel:+351912345678' },
  { icon: Mail, label: 'jo@josilvapt.pt', href: 'mailto:jo@josilvapt.pt' },
]

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', goal: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setSubmitted(true)
  }

  return (
    <section id="contacto" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '500px',
            height: '500px',
            background: 'radial-gradient(ellipse at bottom right, rgba(200,169,110,0.06) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Info */}
          <div>
            <FadeUp>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-gold" />
                <span className="text-gold text-xs tracking-[0.3em] uppercase">Contacto</span>
              </div>
            </FadeUp>
            <SlideIn direction="left" delay={0.1}>
              <h2 className="font-display text-[clamp(3rem,5vw,5rem)] leading-[0.9] text-white mb-8">
                VAMOS<br />
                <span className="gradient-text">CONVERSAR</span>
              </h2>
            </SlideIn>
            <FadeUp delay={0.2}>
              <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-sm">
                A primeira conversa é gratuita e sem compromisso. Diz-me os teus objectivos e vejo como posso ajudar-te a atingi-los.
              </p>
            </FadeUp>

            {/* Contact methods */}
            <FadeUp delay={0.3}>
              <div className="space-y-4">
                {contacts.map((c) => (
                  <motion.a
                    key={c.label}
                    href={c.href}
                    className="flex items-center gap-4 p-4 border border-white/[0.06] bg-bg2 rounded-sm hover:border-gold/30 hover:bg-gold/[0.02] transition-all group cursor-none"
                    whileHover={{ x: 6 }}
                    data-cursor="true"
                  >
                    <div className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-sm flex items-center justify-center group-hover:bg-gold/15 transition-colors">
                      <c.icon size={16} className="text-gold" />
                    </div>
                    <span className="text-white/60 text-sm group-hover:text-white/80 transition-colors">{c.label}</span>
                  </motion.a>
                ))}
              </div>
            </FadeUp>

            {/* Quote */}
            <FadeUp delay={0.4}>
              <div className="mt-12 p-6 border-l-2 border-gold/40">
                <p className="text-white/40 text-sm italic leading-relaxed">
                  "A melhor altura para começar foi ontem. A segunda melhor é agora."
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Right: Form */}
          <SlideIn direction="right" delay={0.15}>
            <div className="relative">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/30 text-xs tracking-wider block mb-2">Nome</label>
                        <input
                          type="text"
                          required
                          placeholder="O teu nome"
                          value={formState.name}
                          onChange={e => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-4 py-3 bg-bg2 border border-white/[0.08] rounded-sm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 transition-colors"
                          style={{ cursor: 'text' }}
                        />
                      </div>
                      <div>
                        <label className="text-white/30 text-xs tracking-wider block mb-2">Email</label>
                        <input
                          type="email"
                          required
                          placeholder="email@exemplo.pt"
                          value={formState.email}
                          onChange={e => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-4 py-3 bg-bg2 border border-white/[0.08] rounded-sm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 transition-colors"
                          style={{ cursor: 'text' }}
                        />
                      </div>
                    </div>

                    {/* Goal */}
                    <div>
                      <label className="text-white/30 text-xs tracking-wider block mb-2">Objectivo Principal</label>
                      <div className="flex flex-wrap gap-2">
                        {goals.map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setFormState({ ...formState, goal: g })}
                            className={`px-3 py-1.5 text-xs rounded-full border transition-all cursor-none ${
                              formState.goal === g
                                ? 'bg-gold/20 border-gold/50 text-gold'
                                : 'bg-bg2 border-white/[0.08] text-white/40 hover:border-white/20'
                            }`}
                            data-cursor="true"
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-white/30 text-xs tracking-wider block mb-2">Mensagem (opcional)</label>
                      <textarea
                        rows={4}
                        placeholder="Conta-me um pouco mais sobre ti e os teus objectivos..."
                        value={formState.message}
                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-3 bg-bg2 border border-white/[0.08] rounded-sm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 transition-colors resize-none"
                        style={{ cursor: 'text' }}
                      />
                    </div>

                    {/* Submit */}
                    <MagneticButton
                      className={`w-full py-4 text-sm font-semibold tracking-wide rounded-sm transition-all ${
                        sending
                          ? 'bg-gold/70 text-bg cursor-not-allowed'
                          : 'bg-gold text-bg hover:bg-gold/90'
                      }`}
                      strength={0.2}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {sending ? (
                          <>
                            <motion.div
                              className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            />
                            A enviar...
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            Enviar Mensagem
                          </>
                        )}
                      </span>
                    </MagneticButton>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center text-center py-20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle size={60} className="text-gold mb-6" />
                    </motion.div>
                    <h3 className="font-display text-3xl text-white mb-3">MENSAGEM ENVIADA!</h3>
                    <p className="text-white/40 text-sm max-w-xs">
                      Obrigado pela mensagem, {formState.name.split(' ')[0]}! Vou responder nas próximas 24 horas.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}
