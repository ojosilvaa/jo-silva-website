import React, { useState, useEffect } from 'react';
import { Trash2, CheckCircle, Clock, X } from 'lucide-react';

const SUPABASE_URL = 'https://oelbocimyfwwzkzbyswg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lbGJvY2lteWZ3d3premJ5c3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMDI2OTksImV4cCI6MjA5MzU3ODY5OX0.S2V54XWWnF58lTQNkvFU9JL1-toCQxacICvtITYL_3E';

export default function AdminPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const ADMIN_PASSWORD = 'josilva2024'; // TODO: Mover para env var

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadAgendamentos();
    } else {
      alert('Senha incorreta');
    }
  };

  const loadAgendamentos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/agendamentos?order=data_agendamento.desc`,
        {
          headers: {
            'apikey': SUPABASE_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAgendamentos(data);
      } else {
        throw new Error('Supabase não disponível');
      }
    } catch (error) {
      console.error('Supabase indisponível, carregando localStorage:', error);
      // Fallback para localStorage
      const localData = JSON.parse(localStorage.getItem('agendamentos') || '[]');
      setAgendamentos(localData);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id, novoStatus) => {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/agendamentos?id=eq.${id}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: novoStatus }),
        }
      );

      if (response.ok) {
        loadAgendamentos();
      }
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    }
  };

  const deleteAgendamento = async (id) => {
    if (confirm('Tem certeza que quer deletar?')) {
      try {
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/agendamentos?id=eq.${id}`,
          {
            method: 'DELETE',
            headers: {
              'apikey': SUPABASE_KEY,
            },
          }
        );

        if (response.ok) {
          loadAgendamentos();
        }
      } catch (error) {
        console.error('Erro ao deletar:', error);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
        <div className="bg-[#111] border border-[#222] rounded-2xl p-8 w-full max-w-400px">
          <h1 className="text-3xl font-bold text-[#C8A96E] mb-2 text-center">Painel Admin</h1>
          <p className="text-[#666] text-center mb-6">Gerenciar agendamentos</p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Digite sua senha"
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#222] rounded-lg text-white mb-4 focus:border-[#C8A96E] outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-[#C8A96E] text-black font-bold py-3 rounded-lg hover:bg-[#dfc08a] transition"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  const agendamentosFiltrados = agendamentos.filter((a) => {
    if (filtroStatus === 'todos') return true;
    return a.status === filtroStatus;
  });

  return (
    <div className="min-h-screen bg-[#0d0d0d] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#C8A96E]">Agendamentos</h1>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setAgendamentos([]);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Sair
          </button>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {['todos', 'pendente', 'confirmado', 'concluido', 'cancelado'].map((status) => (
            <button
              key={status}
              onClick={() => setFiltroStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filtroStatus === status
                  ? 'bg-[#C8A96E] text-black'
                  : 'bg-[#1a1a1a] text-[#999] border border-[#222] hover:border-[#C8A96E]'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: 'Total',
              value: agendamentos.length,
              color: 'bg-[#1a1a1a]',
            },
            {
              label: 'Pendentes',
              value: agendamentos.filter((a) => a.status === 'pendente').length,
              color: 'bg-yellow-500/20',
            },
            {
              label: 'Confirmados',
              value: agendamentos.filter((a) => a.status === 'confirmado').length,
              color: 'bg-green-500/20',
            },
            {
              label: 'Concluídos',
              value: agendamentos.filter((a) => a.status === 'concluido').length,
              color: 'bg-[#C8A96E]/20',
            },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.color} p-4 rounded-lg border border-[#222]`}>
              <p className="text-[#999] text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabela */}
        <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-[#666]">Carregando...</div>
          ) : agendamentosFiltrados.length === 0 ? (
            <div className="p-8 text-center text-[#666]">Nenhum agendamento encontrado</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a1a] border-b border-[#222]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#999] uppercase">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#999] uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#999] uppercase">Telefone</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#999] uppercase">Data/Hora</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#999] uppercase">Serviço</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#999] uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#999] uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222]">
                  {agendamentosFiltrados.map((agendamento) => (
                    <tr key={agendamento.id} className="hover:bg-[#1a1a1a] transition">
                      <td className="px-6 py-4 text-white">{agendamento.nome}</td>
                      <td className="px-6 py-4 text-[#999] text-sm">{agendamento.email}</td>
                      <td className="px-6 py-4 text-[#999] text-sm">{agendamento.telefone}</td>
                      <td className="px-6 py-4 text-[#999] text-sm">
                        {new Date(agendamento.data_agendamento).toLocaleDateString('pt-BR')} às {agendamento.hora_agendamento}
                      </td>
                      <td className="px-6 py-4 text-[#999] text-sm">{agendamento.servico}</td>
                      <td className="px-6 py-4">
                        <select
                          value={agendamento.status}
                          onChange={(e) => updateStatus(agendamento.id, e.target.value)}
                          className="bg-[#1a1a1a] border border-[#222] rounded text-white text-sm px-2 py-1"
                        >
                          <option value="pendente">Pendente</option>
                          <option value="confirmado">Confirmado</option>
                          <option value="concluido">Concluído</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteAgendamento(agendamento.id)}
                          className="text-red-500 hover:text-red-400 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
