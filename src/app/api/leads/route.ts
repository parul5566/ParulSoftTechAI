import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: public — anyone can submit a lead
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Rough cost estimation based on budget range
    const costMap: Record<string, number> = {
      "< $10K": 10000,
      "$10K - $50K": 30000,
      "$50K - $100K": 75000,
      "$100K - $500K": 200000,
      "$500K+": 500000,
    };

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        projectType: projectType || null,
        budget: budget || null,
        timeline: timeline || null,
        message,
        estimatedCost: budget ? costMap[budget] || null : null,
      },
    });

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}

// GET: requires admin authentication (header-based token check)
export async function GET(req: NextRequest) {
  try {
    // Server-side auth check — only admin can list leads
    const authHeader = req.headers.get("authorization");
    if (authHeader !== "Bearer pst_admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json(leads);
  } catch {
    return NextResponse.json([]);
  }
}
