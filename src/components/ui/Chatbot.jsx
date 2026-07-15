import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Olá! 👋 Sou a secretária eletrônica de Jo Silva PT. Como posso ajudar?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    nome: '',
    email: '',
    telefone: '',
    servico: '',
    data: '',
    hora: '',
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simular respostas da IA (depois integrar com Claude API)
  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('agendar') || msg.includes('marcar') || msg.includes('horário')) {
      return {
        text: 'Perfeito! Vou te ajudar a agendar uma sessão. Qual serviço você tem interesse?\n\n1. Personal Training\n2. Nutrição\n3. Avaliação Física\n4. Acompanhamento Online',
        action: 'showServices',
      };
    }

    if (msg.includes('personal') || msg.includes('treino')) {
      return {
        text: 'Ótimo! Personal Training é nosso serviço principal. Duramos 50 minutos por sessão.\n\nQual é a sua disponibilidade preferida?',
        action: 'requestSchedule',
      };
    }

    if (msg.includes('nutrição') || msg.includes('dieta')) {
      return {
        text: 'Acompanhamento nutricional! Jo oferece planos personalizados baseados em seus objetivos.\n\nQual é a sua disponibilidade?',
        action: 'requestSchedule',
      };
    }

    if (msg.includes('preço') || msg.includes('valor') || msg.includes('custa')) {
      return {
        text: '💰 Nossos valores:\n\n• Personal Training: R$ 150/sessão\n• Nutrição: R$ 120/consultoria\n• Avaliação Física: R$ 80\n• Online: R$ 100/sessão\n\nQuer agendar?',
        action: 'none',
      };
    }

    if (msg.includes('sobre') || msg.includes('experiência') || msg.includes('quem')) {
      return {
        text: 'Jo Silva é personal trainer com 10+ anos de experiência. Especializado em hipertrofia, emagrecimento e performance atlética. Formado em Educação Física e com certificações internacionais.\n\nGostaria de agendar uma avaliação gratuita?',
        action: 'none',
      };
    }

    return {
      text: 'Entendi! Você tem interesse em nossos serviços. Gostaria de agendar uma sessão ou quer saber mais sobre algo específico?',
      action: 'none',
    };
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simular delay de resposta
    setTimeout(() => {
      const response = getBotResponse(input);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: response.text,
        action: response.action,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);

      if (response.action === 'requestSchedule') {
        setShowScheduleForm(true);
      }

      setIsLoading(false);
    }, 500);
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();

    // Validar dados
    if (!scheduleData.nome || !scheduleData.email || !scheduleData.telefone || !scheduleData.data || !scheduleData.hora) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);

    try {
      // Guardar em localStorage (para teste sem Supabase)
      const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
      const novoAgendamento = {
        id: Date.now(),
        ...scheduleData,
        status: 'pendente',
        criado_em: new Date().toISOString(),
      };
      agendamentos.push(novoAgendamento);
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

      // Também tentar enviar para Supabase (se estiver disponível)
      try {
        await fetch(
          'https://oelbocimyfwwzkzbyswg.supabase.co/functions/v1/agendar-sessao',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lbGJvY2lteWZ3d3premJ5c3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMDI2OTksImV4cCI6MjA5MzU3ODY5OX0.S2V54XWWnF58lTQNkvFU9JL1-toCQxacICvtITYL_3E',
            },
            body: JSON.stringify({
              nome: scheduleData.nome,
              email: scheduleData.email,
              telefone: scheduleData.telefone,
              servico: scheduleData.servico || 'Personal Training',
              data: scheduleData.data,
              hora: scheduleData.hora,
            }),
          }
        );
      } catch {
        console.log('Supabase não disponível - usando localStorage');
      }

      const confirmationMessage = {
        id: messages.length + 1,
        type: 'bot',
        text: `✅ Agendamento confirmado!\n\n📅 Data: ${new Date(scheduleData.data).toLocaleDateString('pt-BR')}\n⏰ Hora: ${scheduleData.hora}\n👤 Nome: ${scheduleData.nome}\n📧 Email: ${scheduleData.email}\n📱 Telefone: ${scheduleData.telefone}\n\n💾 Salvo localmente (execute o SQL no Supabase para persistir)`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, confirmationMessage]);
      setShowScheduleForm(false);
      setScheduleData({ nome: '', email: '', telefone: '', servico: '', data: '', hora: '' });
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: messages.length + 1,
        type: 'bot',
        text: 'Desculpa, houve um erro ao salvar seu agendamento. Por favor, tente novamente ou entre em contacto conosco via WhatsApp.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-[#C8A96E] to-[#a8894e] rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer"
          >
            <MessageCircle size={24} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Janela de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-[#111] rounded-2xl shadow-2xl flex flex-col border border-[#222] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#C8A96E] to-[#a8894e] p-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-sm">Secretária Jo Silva</h3>
                <p className="text-xs text-white/80">Sempre online 🟢</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0d0d0d]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-xl text-sm leading-relaxed ${
                      msg.type === 'user'
                        ? 'bg-[#C8A96E] text-black rounded-br-none'
                        : 'bg-[#1a1a1a] text-white rounded-bl-none border border-[#222]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] px-4 py-3 rounded-xl border border-[#222]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-[#C8A96E] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#C8A96E] rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-[#C8A96E] rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              {showScheduleForm && (
                <form onSubmit={handleScheduleSubmit} className="space-y-3 mt-4">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={scheduleData.nome}
                    onChange={(e) => setScheduleData({ ...scheduleData, nome: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#222] rounded-lg text-white text-sm focus:border-[#C8A96E] outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={scheduleData.email}
                    onChange={(e) => setScheduleData({ ...scheduleData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#222] rounded-lg text-white text-sm focus:border-[#C8A96E] outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Telefone"
                    value={scheduleData.telefone}
                    onChange={(e) => setScheduleData({ ...scheduleData, telefone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#222] rounded-lg text-white text-sm focus:border-[#C8A96E] outline-none"
                  />
                  <input
                    type="date"
                    value={scheduleData.data}
                    onChange={(e) => setScheduleData({ ...scheduleData, data: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#222] rounded-lg text-white text-sm focus:border-[#C8A96E] outline-none"
                  />
                  <input
                    type="time"
                    value={scheduleData.hora}
                    onChange={(e) => setScheduleData({ ...scheduleData, hora: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#222] rounded-lg text-white text-sm focus:border-[#C8A96E] outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#C8A96E] text-black py-2 rounded-lg font-bold text-sm hover:bg-[#dfc08a] transition"
                  >
                    Confirmar Agendamento
                  </button>
                </form>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-[#222] bg-[#0d0d0d]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escreva sua mensagem..."
                  className="flex-1 px-4 py-2 bg-[#1a1a1a] border border-[#222] rounded-lg text-white text-sm focus:border-[#C8A96E] outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#C8A96E] hover:bg-[#dfc08a] text-black p-2 rounded-lg transition disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
