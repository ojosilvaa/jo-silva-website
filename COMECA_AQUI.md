# 🤖 CHATBOT IA + AGENDAMENTOS

> **Status:** ✅ PRONTO PARA TESTAR  
> **Tempo:** 5 minutos  
> **Custo:** GRÁTIS

---

## 🚀 COMEÇA EM 3 PASSOS

### **PASSO 1: Execute a Migration SQL**

Copia e cola isto no **Supabase Dashboard → SQL Editor → New Query**:

```sql
-- ====== COPY EVERYTHING FROM HERE ======
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

CREATE INDEX IF NOT EXISTS agendamentos_email_idx ON agendamentos(email);
CREATE INDEX IF NOT EXISTS agendamentos_data_idx ON agendamentos(data_agendamento);
CREATE INDEX IF NOT EXISTS agendamentos_status_idx ON agendamentos(status);
CREATE INDEX IF NOT EXISTS agendamentos_criado_em_idx ON agendamentos(criado_em DESC);

CREATE OR REPLACE TRIGGER agendamentos_update_timestamp
  BEFORE UPDATE ON agendamentos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

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

CREATE TABLE IF NOT EXISTS agendamento_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agendamento_id UUID NOT NULL REFERENCES agendamentos(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comentario TEXT,
  criado_em TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS feedback_agendamento_idx ON agendamento_feedback(agendamento_id);

ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "agendamentos_insert" ON agendamentos FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "agendamentos_select" ON agendamentos FOR SELECT TO anon, authenticated USING (true);

ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "chat_history_insert" ON chat_history FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "chat_history_select" ON chat_history FOR SELECT TO anon, authenticated USING (true);
-- ====== COPY UNTIL HERE ======
```

Clica em **"Run"** ✅

---

### **PASSO 2: Inicia o Dev Server**

```bash
cd "C:\Users\mousa\PROJETOS CLAUDE\Website jo silva pt"
npm run dev
```

Abre: `http://localhost:5173`

---

### **PASSO 3: Testa o Chatbot**

1. **Clica no botão dourado** no canto inferior direito (🤖)
2. **Escreve:** "Olá, quero agendar uma sessão"
3. **Segue a conversa** e agenda uma sessão
4. **Preenche o formulário** com seus dados
5. **Clica em "Confirmar Agendamento"**

Vai aparecer mensagem de sucesso! ✅

---

## 🎛️ VER AGENDAMENTOS

**URL:** `http://localhost:5173/#admin`  
**Senha:** `josilva2024`

Você vê todos os agendamentos criados! 📅

---

## 📋 O Que Foi Criado

✅ Chatbot flutuante no website  
✅ Formulário de agendamento  
✅ Banco de dados (Supabase)  
✅ Dashboard privado para você gerenciar  
✅ Histórico de conversas  

---

## 💡 Próximas Features (Futuro)

- [ ] Claude API para IA inteligente
- [ ] Emails automáticos (Resend)
- [ ] WhatsApp confirmations
- [ ] Vender para outras clínicas/PTs

---

**Pronto! Teste agora! 🚀**
