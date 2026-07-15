import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SB_URL = Deno.env.get("SUPABASE_URL");
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

serve(async (req: Request) => {
  // CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*" } });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { nome, email, telefone, servico, data, hora, mensagem } = await req.json();

    // Validar dados
    if (!nome || !email || !telefone || !data || !hora) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios faltando" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(SB_URL!, SB_KEY!);

    // Inserir agendamento
    const { data: agendamento, error: dbError } = await supabase
      .from("agendamentos")
      .insert({
        nome,
        email,
        telefone,
        servico: servico || "Personal Training",
        data_agendamento: data,
        hora_agendamento: hora,
        mensagem: mensagem || null,
        status: "pendente",
      })
      .select()
      .single();

    if (dbError) {
      console.error("DB error:", dbError);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar agendamento" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Enviar email de confirmação (se Resend estiver configurado)
    if (RESEND_API_KEY) {
      const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background: #f0f0f0; }
              .container { max-width: 600px; margin: 20px auto; background: white; padding: 30px; border-radius: 10px; }
              .header { color: #C8A96E; text-align: center; margin-bottom: 30px; }
              .details { background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0; }
              .detail-item { margin: 10px 0; }
              .label { font-weight: bold; color: #333; }
              .value { color: #666; }
              .button { background: #C8A96E; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✅ Agendamento Confirmado!</h1>
              </div>

              <p>Olá ${nome},</p>

              <p>Seu agendamento foi registrado com sucesso! Aqui estão os detalhes:</p>

              <div class="details">
                <div class="detail-item">
                  <span class="label">📅 Data:</span>
                  <span class="value">${new Date(data).toLocaleDateString('pt-BR')}</span>
                </div>
                <div class="detail-item">
                  <span class="label">⏰ Hora:</span>
                  <span class="value">${hora}</span>
                </div>
                <div class="detail-item">
                  <span class="label">🏋️ Serviço:</span>
                  <span class="value">${servico || 'Personal Training'}</span>
                </div>
                <div class="detail-item">
                  <span class="label">📱 Telefone Confirmado:</span>
                  <span class="value">${telefone}</span>
                </div>
              </div>

              <p>Jo Silva entrará em contacto em breve para confirmar a sua sessão.</p>

              <a href="https://wa.me/5585987654321?text=Olá%20Jo%2C%20gostaria%20de%20confirmar%20meu%20agendamento%20para%20${data}%20às%20${hora}" class="button">
                Confirmar via WhatsApp
              </a>

              <p style="margin-top: 30px; color: #999; font-size: 12px;">
                Se tiver dúvidas, responda este email ou entre em contacto conosco.
              </p>
            </div>
          </body>
        </html>
      `;

      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "noreply@josilvapt.com",
            to: email,
            subject: `✅ Agendamento Confirmado - ${new Date(data).toLocaleDateString('pt-BR')} às ${hora}`,
            html: emailHtml,
          }),
        });

        if (!emailRes.ok) {
          console.error("Email error:", await emailRes.text());
        }
      } catch (emailError) {
        console.error("Email send error:", emailError);
        // Continuar mesmo se email falhar
      }
    }

    // Também adicionar à chat history
    await supabase.from("chat_history").insert({
      sessao_id: `user_${email}`,
      tipo: "bot",
      mensagem: `Agendamento confirmado para ${data} às ${hora}`,
      metadata: { agendamento_id: agendamento.id },
    });

    return new Response(
      JSON.stringify({
        success: true,
        agendamento: agendamento,
        message: "Agendamento criado com sucesso!",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
