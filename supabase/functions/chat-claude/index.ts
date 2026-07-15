import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST", "Access-Control-Allow-Headers": "Content-Type" },
    });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { message } = await req.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": Deno.env.get("ANTHROPIC_API_KEY") || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        system: `Você é um assistente IA para Jo Silva PT, personal trainer.
        Responda perguntas sobre os serviços: Personal Training (R$150), Nutrição (R$120), Avaliação Física (R$80), Acompanhamento Online (R$100).
        Jo tem 10+ anos de experiência, especializado em hipertrofia, emagrecimento e performance.
        Seja amigável, profissional e direto. Se o cliente perguntar sobre agendamento, ofereça para agendar uma sessão.
        Sempre em português.`,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return new Response(JSON.stringify({ error: error.message }), {
        status: response.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify({ text: data.content[0].text }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
});
