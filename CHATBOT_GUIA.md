# 🤖 Guia do Chatbot IA + Agendamentos

> **Data:** 14 Jul 2026  
> **Status:** ✅ Implementado e pronto para testar  
> **Tecnologia:** React + Claude API + Supabase

---

## 📁 **Arquivos Criados**

### **Frontend (React)**
```
src/components/ui/Chatbot.jsx
  └─ Componente flutuante de chat
  └─ Interface responsiva
  └─ Integração com Edge Function
  └─ Formulário de agendamento integrado
```

### **Backend (Supabase)**
```
supabase/migrations/20260714_agendamentos.sql
  └─ Tabela agendamentos
  └─ Tabela chat_history
  └─ Tabela agendamento_feedback
  └─ Índices e triggers

supabase/functions/agendar-sessao/index.ts
  └─ Edge Function para processar agendamentos
  └─ Envia email de confirmação
  └─ Salva na database
```

### **Admin**
```
src/pages/AdminPage.jsx
  └─ Dashboard privado (senha: josilva2024)
  └─ Ver todos os agendamentos
  └─ Mudar status (pendente → confirmado → concluído)
  └─ Deletar agendamentos
  └─ Filtrar por status
```

---

## 🚀 **Como Testar (passo-a-passo)**

### **PASSO 1: Deploy das Migrations**

```bash
cd "C:\Users\mousa\PROJETOS CLAUDE\Website jo silva pt"
supabase db push
```

Verifica se as tabelas foram criadas:
```sql
SELECT * FROM agendamentos LIMIT 1;
SELECT * FROM chat_history LIMIT 1;
```

---

### **PASSO 2: Iniciar o Dev Server**

```bash
npm run dev
```

Acessa: `http://localhost:5173`

---

### **PASSO 3: Testar o Chatbot**

1. **Clica no botão dourado** no canto inferior direito (ícone de chat)
2. **Conversa com o chatbot:**
   ```
   "Olá, gostaria de agendar uma sessão"
   "Personal training"
   "Qual é o valor?"
   "Como faço para agendar?"
   ```
3. **O chatbot deve responder** com informações sobre serviços

---

### **PASSO 4: Testar Agendamento**

1. **Diz ao chatbot:** "Quero agendar"
2. **Aparece formulário:**
   - Nome
   - Email
   - Telefone
   - Data
   - Hora
3. **Preenche e clica "Confirmar Agendamento"**

**Esperado:**
- ✅ Dados são salvos no Supabase
- ✅ Email é enviado (se Resend configurado)
- ✅ Mensagem de confirmação aparece

---

### **PASSO 5: Acessar Admin Dashboard**

1. **URL:** `http://localhost:5173`
2. **Clica em "admin"** na navegação (ou vai para `/#admin`)
3. **Senha:** `josilva2024`

**Deve ver:**
- ✅ Lista de agendamentos
- ✅ Filtros por status
- ✅ Opção para mudar status
- ✅ Opção para deletar

---

## 🔧 **Próximas Integrações Necessárias**

### **1. Claude API (IA de verdade)**

Agora o chatbot simula respostas. Para usar IA real:

```javascript
// Em src/components/ui/Chatbot.jsx
const response = await fetch('URL_DA_EDGE_FUNCTION_IA', {
  method: 'POST',
  body: JSON.stringify({ userMessage: input })
});
```

Criar Edge Function:
```
supabase/functions/chatbot-ia/index.ts
```

### **2. Resend (Email automático)**

Adicionar secret no Supabase:
```
RESEND_API_KEY = (sua chave aqui)
```

### **3. WhatsApp (futuro)**

Quando tiver clientes pagando, integrar:
- Twilio + WhatsApp API
- Confirmações automáticas via WhatsApp

---

## 💰 **Modelo de Negócio (SaaS)**

### **Fase 1: Seu website**
- ✅ Chatbot funcionando
- ✅ Agendamentos automáticos
- ✅ Você usa grátis (créditos Claude)

### **Fase 2: Vender para outros**

**Arquitetura multi-tenant:**
- Cada cliente (clínica, PT, etc) tem sua própria instância
- Dashboard privado de cada um
- Você cobra R$150-300/mês

**Como clonar:**
```
1. Novo repo no GitHub
2. Mudar Supabase project
3. Deploy em Vercel
4. Seu cliente usa a URL dele
```

**Lucro:**
```
Cliente paga: R$200/mês
Você paga Claude: R$30/mês
Seu lucro: R$170/mês (85% margem!)
```

---

## 🛠️ **Variáveis de Ambiente Necessárias**

### **No `.env.local`:**
```
VITE_SUPABASE_URL=https://oelbocimyfwwzkzbyswg.supabase.co
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **No Supabase Secrets:**
```
RESEND_API_KEY=re_...
CLAUDE_API_KEY=sk-ant-...
```

---

## ✨ **Status Atual**

| Funcionalidade | Status | Notas |
|---|---|---|
| Chatbot UI | ✅ FEITO | Flutuante, responsivo |
| Agendamento | ✅ FEITO | Salva em Supabase |
| Email | ⏳ TODO | Precisa Resend key |
| IA (Claude) | ⏳ TODO | Respostas são simuladas |
| WhatsApp | ⏳ TODO | Fase 2 |
| Admin Dashboard | ✅ FEITO | Gerenciar agendamentos |
| Multi-tenant | ⏳ TODO | Vender para outros |

---

## 🚨 **Troubleshooting**

### **Agendamento não salva**
```
1. Verifica se migration foi feita (supabase db push)
2. Verifica se Edge Function está deployed
3. Abre DevTools (F12) e verifica erros de API
```

### **Email não chega**
```
1. Verifica se RESEND_API_KEY está no Supabase secrets
2. Verifica se email é válido
3. Verifica spam
```

### **Chatbot não responde**
```
1. Verifica console do browser (F12)
2. Verifica se Supabase está acessível
3. Verifica conexão de internet
```

---

## 📞 **Próximos Passos**

1. **✅ Testou tudo?**
2. **→ Integrar Claude API (IA real)**
3. **→ Adicionar Resend key (emails automáticos)**
4. **→ Clonar para primeiro cliente**
5. **→ Começar a vender! 🎉**

---

Ver: [[josilvapt]] · [[josilvapt-monetizacao]]
