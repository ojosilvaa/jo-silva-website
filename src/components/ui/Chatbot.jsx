import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Olá! 👋 Sou o Assistente IA de Jo Silva PT. Como posso ajudar?',
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

  // Integração com Claude API via Edge Function - Chatbot VENDEDOR
  const getBotResponse = async (userMessage) => {
    try {
      const response = await fetch(
        'https://oelbocimyfwwzkzbyswg.supabase.co/functions/v1/chat-claude',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lbGJvY2lteWZ3d3premJ5c3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMDI2OTksImV4cCI6MjA5MzU3ODY5OX0.S2V54XWWnF58lTQNkvFU9JL1-toCQxacICvtITYL_3E',
          },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return {
          text: data.text,
          action: userMessage.toLowerCase().includes('agendar') || userMessage.toLowerCase().includes('começar') || userMessage.toLowerCase().includes('plano') ? 'requestSchedule' : 'none',
        };
      } else {
        return getBotResponseFallback(userMessage);
      }
    } catch (error) {
      console.error('Erro ao chamar Claude via Edge Function:', error);
      return getBotResponseFallback(userMessage);
    }
  };

  // Respostas VENDEDORAS com preços reais
  const getBotResponseFallback = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // Qualificar: online vs presencial
    if (msg.includes('online') || msg.includes('casa')) {
      return {
        text: '✅ Perfeito! Temos 3 planos online que funcionam muito bem:\n\n🎯 **Avaliação + Plano** - €47\n📊 **Plano 60 Dias** - €89 (€1,48/dia)\n🌟 **Transformação 120 Dias** - €149 (€1,24/dia) ← MELHOR VALOR\n\nQual seu objetivo? Emagrecer, ganhar massa ou condicionamento?',
        action: 'requestSchedule',
      };
    }

    if (msg.includes('presencial') || msg.includes('academia') || msg.includes('ginásio')) {
      return {
        text: '💪 Ótimo! Atendo presencialmente na Viva Gym, Porto.\n\n**Sessão Avulsa:** €35\n**Avaliação Inicial:** €50\n**Pacote Inicial:** €80 (Avaliação + sessão)\n\n**Planos Mensais:**\n• 2x/semana: €259 (8 sessões)\n• 3x/semana: €389 (12 sessões)\n\nQual frequência combina com você?',
        action: 'requestSchedule',
      };
    }

    if (msg.includes('agendar') || msg.includes('começar') || msg.includes('começamos') || msg.includes('plano')) {
      return {
        text: '🚀 Vamos começar! Você prefere:\n\n📱 **Online** (qualquer lugar do mundo)\n💪 **Presencial** (Viva Gym, Porto)\n\nQual é mais conveniente?',
        action: 'none',
      };
    }

    if (msg.includes('preço') || msg.includes('valor') || msg.includes('quanto custa') || msg.includes('custa')) {
      return {
        text: '💰 **PLANOS ONLINE:**\n• Avaliação + Plano: €47\n• Plano 60 Dias: €89\n• Transformação 120 Dias: €149 ⭐ Melhor ROI\n\n💪 **PLANOS PRESENCIAIS** (Porto):\n• Sessão Avulsa: €35\n• Avaliação: €50\n• 2x/semana: €259/mês\n• 3x/semana: €389/mês\n\nQual modelo te interessa?',
        action: 'none',
      };
    }

    if (msg.includes('resultado') || msg.includes('funciona') || msg.includes('prova')) {
      return {
        text: '✨ **RESULTADOS REAIS:**\n• -7kg em 3 meses\n• +8kg de massa em 2 meses\n• -11kg com resultado duradouro\n• Clientes com 150+ alunos transformados\n\nTudo com planos que se adaptam à sua rotina. Sem enrolação, apenas estratégia.\n\nVocê quer saber mais sobre algum objetivo específico?',
        action: 'none',
      };
    }

    if (msg.includes('sobre') || msg.includes('quem é') || msg.includes('experiência')) {
      return {
        text: '👋 Sou **Joazio Silva** - Personal Trainer especializado em transformação física.\n\n📊 **4,5+ anos** de experiência\n👥 **150+ alunos** transformados\n🎯 Especialidades: Hipertrofia | Emagrecimento | Iniciantes | Condicionamento\n🌍 Atendimento: 100% Online + Presencial (Porto)\n\nMeu diferencial? Planos simples e reais que respeitam sua rotina.\n\nQuer começar uma avaliação gratuita?',
        action: 'none',
      };
    }

    if (msg.includes('emagrec') || msg.includes('perder peso') || msg.includes('dieta')) {
      return {
        text: '💪 **Especialista em Emagrecimento!**\n\nNão é sobre restrição, é sobre **estratégia**. Plano personalizado + acompanhamento = resultado real.\n\n✅ Resultado típico: -7kg em 3 meses\n✅ Suporte semanal\n✅ Ajustes contínuos\n\nPrefere começar **Online** (€47) ou **Presencial** (€50)?',
        action: 'requestSchedule',
      };
    }

    if (msg.includes('massa') || msg.includes('ganhar') || msg.includes('hipertrofia')) {
      return {
        text: '💪 **Especialista em Ganho de Massa!**\n\n+8kg de massa em 2 meses é possível com treino + nutrição estratégica.\n\n✅ Treino 100% personalizado\n✅ Acompanhamento semanal\n✅ Protocolo de performance\n\nPrefere **Online** (€47) ou **Presencial** (€50)?',
        action: 'requestSchedule',
      };
    }

    // Default: chamar para ação
    return {
      text: '👋 Oi! Sou o Assistente IA de Jo Silva.\n\nO que você procura?\n\n✅ Emagrecer\n✅ Ganhar massa\n✅ Começar do zero\n✅ Melhorar condicionamento\n\nTe ajudo a encontrar o plano perfeito! 💪',
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

    // Obter resposta da IA
    const response = await getBotResponse(input);
    const botMessage = {
      id: messages.length + 2,
      type: 'bot',
      text: response.text,
      action: response.action,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);

    // Ação para agendar - redireciona ao invés de mostrar form
    if (response.action === 'requestSchedule') {
      const agendaMsg = {
        id: messages.length + 3,
        type: 'bot',
        text: '👇 Clique no botão abaixo para prosseguir com o agendamento:',
        action: 'showScheduleButton',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agendaMsg]);
    }

    setIsLoading(false);
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
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#C8A96E] to-[#a8894e] rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer"
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
                <h3 className="text-white font-bold text-sm">Assistente IA Jo Silva</h3>
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

              {/* Botão de agendamento simples (sem poluir o chat) */}
              {messages.some(m => m.action === 'showScheduleButton') && (
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      // Salvar dados da conversa
                      localStorage.setItem('chatContext', JSON.stringify(messages));
                      // Redirecionar ou abrir página de agendamento
                      window.location.href = '#agendamento';
                    }}
                    className="w-full bg-[#C8A96E] text-black py-2 rounded-lg font-bold text-sm hover:bg-[#dfc08a] transition text-center cursor-pointer"
                  >
                    📅 Agendar Agora
                  </button>
                  <p className="text-xs text-[#999] text-center">Você será redirecionado para agendar sua avaliação gratuita</p>
                </div>
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
