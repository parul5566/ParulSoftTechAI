import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventType, pagePath, metadata, sessionId } = body;

    if (!eventType) {
      return NextResponse.json({ error: "eventType is required" }, { status: 400 });
    }

    const headers = req.headers;
    const userAgent = headers.get("user-agent") || "";

    // Simple device detection
    let device = "desktop";
    if (/mobile|android|iphone/i.test(userAgent)) device = "mobile";
    else if (/tablet|ipad/i.test(userAgent)) device = "tablet";

    await prisma.analyticsEvent.create({
      data: {
        sessionId: sessionId || "anonymous",
        eventType,
        pagePath: pagePath || null,
        metadata: metadata ? JSON.stringify(metadata) : null,
        userAgent,
        referrer: headers.get("referer") || null,
        device,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}
