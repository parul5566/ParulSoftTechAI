import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an expert software architect at ParulSoftTechAI. Generate a detailed project concept based on the user's project type and description.

Return ONLY valid JSON with this exact structure:
{
  "name": "Creative project name",
  "description": "2-3 sentence project overview",
  "techStack": ["Technology1", "Technology2", ...],
  "coreFeatures": ["Feature1", "Feature2", ...],
  "estimatedCost": "$XXK - $XXK",
  "estimatedTimeline": "X-X months",
  "teamSize": "X-X people",
  "phases": [
    { "phase": "Phase Name", "duration": "X weeks", "tasks": ["Task1", "Task2"] }
  ]
}

Generate 5-7 tech stack items, 5-8 core features, and 3-4 development phases. Make everything realistic and specific to the project type.`;

export async function POST(req: NextRequest) {
  try {
    const { projectType, description } = await req.json();

    if (!projectType) {
      return NextResponse.json({ error: "Project type is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const baseUrl = process.env.OPENAI_BASE_URL;

    const userPrompt = `Project Type: ${projectType}\nAdditional Details: ${description || "No additional details provided"}`;

    // Fallback concept if no API key
    if (!apiKey || !baseUrl) {
      return NextResponse.json({ concept: generateFallback(projectType) });
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
          { role: "user", content: userPrompt },
        ],
        max_tokens: 800,
        temperature: 0.8,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      throw new Error(`LLM API returned ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "{}";
    const concept = JSON.parse(content);

    // Save concept
    try {
      const { prisma } = await import("@/lib/prisma");
      const sessionId = req.headers.get("x-session-id") || "anonymous";
      await prisma.projectConcept.create({
        data: {
          sessionId,
          projectType,
          concept: content,
          estimatedCost: concept.estimatedCost || null,
          estimatedTimeline: concept.estimatedTimeline || null,
        },
      });
    } catch {
      // Non-critical
    }

    return NextResponse.json({ concept });
  } catch (error) {
    console.error("Project generation error:", error);
    return NextResponse.json({
      concept: generateFallback("General Software"),
    });
  }
}

function generateFallback(type: string) {
  return {
    name: `${type} Solution`,
    description: `A cutting-edge ${type.toLowerCase()} built with modern technologies, designed for scalability, performance, and exceptional user experience.`,
    techStack: ["React/Next.js", "Node.js", "PostgreSQL", "AWS", "Docker", "Redis"],
    coreFeatures: ["User Authentication", "Dashboard & Analytics", "Real-time Updates", "API Integration", "Admin Panel"],
    estimatedCost: "$50K - $150K",
    estimatedTimeline: "4-6 months",
    teamSize: "5-8 people",
    phases: [
      { phase: "Discovery & Design", duration: "3-4 weeks", tasks: ["Requirements", "Wireframes", "Architecture"] },
      { phase: "Core Development", duration: "8-12 weeks", tasks: ["Backend API", "Frontend", "Database"] },
      { phase: "Testing & Launch", duration: "3-4 weeks", tasks: ["QA", "Performance", "Deployment"] },
    ],
  };
}
