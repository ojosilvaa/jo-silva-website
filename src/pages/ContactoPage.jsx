import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, Send, CheckCircle, MessageCircle } from 'lucide-react'
import { FadeUp, SlideIn } from '../components/ui/TextReveal'
import MagneticButton from '../components/ui/MagneticButton'

const goals = ['Emagrecer', 'Ganhar massa', 'Definição', 'Condicionamento', 'Saúde geral']

export default function ContactoPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', goal: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1400))
    setSending(false)
    setSent(true)
  }

  return (
    <div className="pt-24">
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left */}
            <div>
              <SlideIn direction="left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-0.5 bg-primary" />
                  <span className="text-primary text-xs tracking-widest uppercase font-medium">Contacto</span>
                </div>
                <h1 className="font-display text-[clamp(3rem,6vw,5rem)] leading-tight text-dark mb-6">
                  VAMOS<br />
                  <span className="gradient-text">COMEÇAR?</span>
                </h1>
                <p className="text-dark-2/60 leading-relaxed mb-10">
                  A primeira conversa é gratuita e sem compromisso. Me conta o seu objetivo e vejo como posso te ajudar.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    { icon: Phone, label: '+351 921 469 901', href: 'tel:+351921469901' },
                    { icon: Mail, label: 'personal@ojosilva.com', href: 'mailto:personal@ojosilva.com' },
                  ].map((c) => (
                    <motion.a
                      key={c.label}
                      href={c.href}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border bg-bg2 hover:border-primary/30 hover:bg-primary/[0.02] transition-all group cursor-none"
                      whileHover={{ x: 4 }}
                      data-cursor="true"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                        <c.icon size={16} className="text-primary" />
                      </div>
                      <span className="text-dark-2/70 text-sm group-hover:text-dark transition-colors">{c.label}</span>
                    </motion.a>
                  ))}
                  <motion.a
                    href="https://wa.me/351921469901"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-border bg-bg2 hover:border-green-400/30 hover:bg-green-50/50 transition-all group cursor-none"
                    whileHover={{ x: 4 }}
                    data-cursor="true"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MessageCircle size={16} className="text-green-600" />
                    </div>
                    <span className="text-dark-2/70 text-sm group-hover:text-dark transition-colors">WhatsApp</span>
                  </motion.a>
                </div>

                <blockquote className="border-l-2 border-primary pl-4 italic text-dark-2/50 text-sm">
                  "Se queres sair do zero e começar a ver resultado de verdade, este é o momento."
                </blockquote>
              </SlideIn>
            </div>

            {/* Right: Form */}
            <SlideIn direction="right" delay={0.15}>
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-4" exit={{ opacity: 0, y: -16 }}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-dark-2/40 text-xs tracking-wider block mb-1.5">Nome</label>
                        <input
                          required type="text" placeholder="Seu nome"
                          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3 bg-bg2 border border-border rounded-xl text-dark text-sm placeholder-muted/50 focus:outline-none focus:border-primary/50 transition-colors"
                          style={{ cursor: 'text' }}
                        />
                      </div>
                      <div>
                        <label className="text-dark-2/40 text-xs tracking-wider block mb-1.5">Email</label>
                        <input
                          required type="email" placeholder="seu@email.com"
                          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 bg-bg2 border border-border rounded-xl text-dark text-sm placeholder-muted/50 focus:outline-none focus:border-primary/50 transition-colors"
                          style={{ cursor: 'text' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-dark-2/40 text-xs tracking-wider block mb-1.5">Telefone</label>
                      <input
                        type="tel" placeholder="+351 ..."
                        value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-bg2 border border-border rounded-xl text-dark text-sm placeholder-muted/50 focus:outline-none focus:border-primary/50 transition-colors"
                        style={{ cursor: 'text' }}
                      />
                    </div>
                    <div>
                      <label className="text-dark-2/40 text-xs tracking-wider block mb-1.5">Objetivo</label>
                      <div className="flex flex-wrap gap-2">
                        {goals.map((g) => (
                          <button
                            key={g} type="button"
                            onClick={() => setForm({ ...form, goal: g })}
                            className={`px-3 py-1.5 text-xs rounded-full border transition-all cursor-none ${
                              form.goal === g
                                ? 'bg-primary/10 border-primary/50 text-primary'
                                : 'bg-bg2 border-border text-muted hover:border-muted'
                            }`}
                            data-cursor="true"
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-dark-2/40 text-xs tracking-wider block mb-1.5">Mensagem (opcional)</label>
                      <textarea
                        rows={4} placeholder="Me conta um pouco sobre você e o que busca..."
                        value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 bg-bg2 border border-border rounded-xl text-dark text-sm placeholder-muted/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                        style={{ cursor: 'text' }}
                      />
                    </div>
                    <MagneticButton
                      className={`w-full py-4 text-sm font-semibold rounded-full transition-colors ${sending ? 'bg-primary/70' : 'bg-primary hover:bg-primary-dark'} text-white`}
                      strength={0.15}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {sending ? (
                          <><motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} /> Enviando...</>
                        ) : (
                          <><Send size={14} /> Agendar Avaliação</>
                        )}
                      </span>
                    </MagneticButton>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center text-center py-24"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
                      <CheckCircle size={56} className="text-primary mb-5" />
                    </motion.div>
                    <h3 className="font-display text-3xl text-dark mb-2">MENSAGEM ENVIADA!</h3>
                    <p className="text-muted text-sm max-w-xs">
                      Obrigado, {form.name.split(' ')[0]}! Vou entrar em contacto em breve.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </SlideIn>
          </div>
        </div>
      </section>
    </div>
  )
}
