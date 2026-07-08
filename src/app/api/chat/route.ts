import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the ParulSoftTechAI Business Assistant, representing a world-class AI and software engineering agency. Your role is to:

1. Answer questions about our services: AI/ML, Generative AI, Web Development, Mobile Apps, Cloud/DevOps, AR/VR, Blockchain, Cybersecurity, IoT, and Enterprise Solutions.
2. Provide rough cost estimates when asked (e.g., "A typical mobile app ranges from $25K-$150K depending on complexity; AI SaaS platforms start at $50K; enterprise systems $100K+").
3. Recommend appropriate technologies for client projects.
4. Qualify leads by asking about their project scope, timeline, and budget.
5. Be professional, knowledgeable, and encouraging.

Keep responses concise (2-4 sentences max). Always offer to connect them with our team for detailed quotes via the contact form.`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const baseUrl = process.env.OPENAI_BASE_URL;

    if (!apiKey || !baseUrl) {
      return NextResponse.json({
        reply: "I'm here to help! Our team offers AI/ML, web, mobile, cloud, AR/VR, and blockchain solutions. What kind of project are you considering? You can also reach us through the contact form below.",
      });
    }

    const response = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "z-ai/glm-5",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`LLM API returned ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I apologize, I couldn't process that. Please try again.";

    // Log the conversation (fire-and-forget)
    try {
      const { prisma } = await import("@/lib/prisma");
      const sessionId = req.headers.get("x-session-id") || "anonymous";
      await prisma.chatLog.create({
        data: {
          sessionId,
          role: "user",
          message,
        },
      });
      await prisma.chatLog.create({
        data: {
          sessionId,
          role: "assistant",
          message: reply,
        },
      });
    } catch {
      // Logging is non-critical
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      reply: "I'm having trouble right now, but I'd love to help! Please describe your project needs and use the contact form below for a detailed response.",
    });
  }
}
