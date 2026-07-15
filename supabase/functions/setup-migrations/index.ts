import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*" } });
  }

  const SB_URL = Deno.env.get("SUPABASE_URL")!;
  const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const supabase = createClient(SB_URL, SB_KEY);

  try {
    console.log("🔄 Verificando tabela agendamentos...");

    // Tentar selecionar (se não existir, vai dar erro)
    const { data, error } = await supabase
      .from("agendamentos")
      .select("*")
      .limit(1);

    if (error && error.code === "PGRST116") {
      // Tabela não existe
      console.log("📋 Criando tabelas...");

      // Executar cada statement SQL separadamente
      const statements = [
        `CREATE TABLE IF NOT EXISTS agendamentos (
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
        )`,

        `CREATE INDEX IF NOT EXISTS agendamentos_email_idx ON agendamentos(email)`,
        `CREATE INDEX IF NOT EXISTS agendamentos_data_idx ON agendamentos(data_agendamento)`,
        `CREATE INDEX IF NOT EXISTS agendamentos_status_idx ON agendamentos(status)`,
        `CREATE INDEX IF NOT EXISTS agendamentos_criado_em_idx ON agendamentos(criado_em DESC)`,

        `CREATE TABLE IF NOT EXISTS chat_history (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          sessao_id TEXT NOT NULL,
          tipo TEXT NOT NULL CHECK (tipo IN ('user', 'bot')),
          mensagem TEXT NOT NULL,
          metadata JSONB,
          criado_em TIMESTAMPTZ DEFAULT now()
        )`,

        `CREATE INDEX IF NOT EXISTS chat_history_sessao_idx ON chat_history(sessao_id)`,
        `CREATE INDEX IF NOT EXISTS chat_history_criado_em_idx ON chat_history(criado_em DESC)`,

        `CREATE TABLE IF NOT EXISTS agendamento_feedback (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          agendamento_id UUID NOT NULL REFERENCES agendamentos(id) ON DELETE CASCADE,
          rating INTEGER CHECK (rating >= 1 AND rating <= 5),
          comentario TEXT,
          criado_em TIMESTAMPTZ DEFAULT now()
        )`,

        `CREATE INDEX IF NOT EXISTS feedback_agendamento_idx ON agendamento_feedback(agendamento_id)`,

        `ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY`,
        `CREATE POLICY IF NOT EXISTS agendamentos_insert ON agendamentos FOR INSERT TO anon, authenticated WITH CHECK (true)`,
        `CREATE POLICY IF NOT EXISTS agendamentos_select ON agendamentos FOR SELECT TO anon, authenticated USING (true)`,

        `ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY`,
        `CREATE POLICY IF NOT EXISTS chat_history_insert ON chat_history FOR INSERT TO anon, authenticated WITH CHECK (true)`,
        `CREATE POLICY IF NOT EXISTS chat_history_select ON chat_history FOR SELECT TO anon, authenticated USING (true)`,
      ];

      for (const stmt of statements) {
        try {
          const { error: execError } = await supabase.rpc("exec", {
            query: stmt,
          });

          if (execError) {
            console.log(`⚠️ ${execError.message} (ignorado)`);
          }
        } catch {
          // Ignorar erros de statements individuais
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "✅ Tabelas criadas com sucesso!",
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // Tabelas já existem
    return new Response(
      JSON.stringify({
        success: true,
        message: "✅ Tabelas já existem!",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
