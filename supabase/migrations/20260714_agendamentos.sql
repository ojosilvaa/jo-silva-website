-- Tabela de agendamentos para o chatbot
CREATE TABLE IF NOT EXISTS agendamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  servico TEXT NOT NULL,
  data_agendamento DATE NOT NULL,
  hora_agendamento TIME NOT NULL,
  mensagem TEXT,
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado', 'concluido', 'cancelado')),
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS agendamentos_email_idx ON agendamentos(email);
CREATE INDEX IF NOT EXISTS agendamentos_data_idx ON agendamentos(data_agendamento);
CREATE INDEX IF NOT EXISTS agendamentos_status_idx ON agendamentos(status);
CREATE INDEX IF NOT EXISTS agendamentos_criado_em_idx ON agendamentos(criado_em DESC);

-- Trigger para atualizar atualizado_em
CREATE OR REPLACE TRIGGER agendamentos_update_timestamp
  BEFORE UPDATE ON agendamentos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Tabela de conversas do chatbot (para histórico)
CREATE TABLE IF NOT EXISTS chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sessao_id TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('user', 'bot')),
  mensagem TEXT NOT NULL,
  metadata JSONB,
  criado_em TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS chat_history_sessao_idx ON chat_history(sessao_id);
CREATE INDEX IF NOT EXISTS chat_history_criado_em_idx ON chat_history(criado_em DESC);

-- Tabela de feedback dos clientes
CREATE TABLE IF NOT EXISTS agendamento_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agendamento_id UUID NOT NULL REFERENCES agendamentos(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comentario TEXT,
  criado_em TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS feedback_agendamento_idx ON agendamento_feedback(agendamento_id);
