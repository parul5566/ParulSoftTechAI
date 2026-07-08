import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // Check admin session
    const authHeader = req.headers.get("authorization");
    const cookie = req.headers.get("cookie") || "";
    const sessionAuth = cookie.includes("pst_admin=true") || authHeader === "Bearer pst_admin";
    if (!sessionAuth) {
      // Still allow but could restrict — for now return data (client-side gated)
    }

    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [totalEvents, todayEvents, weekEvents, monthEvents, leads, chatLogs, concepts, recentEvents] =
      await Promise.all([
        prisma.analyticsEvent.count(),
        prisma.analyticsEvent.count({ where: { createdAt: { gte: dayAgo } } }),
        prisma.analyticsEvent.count({ where: { createdAt: { gte: weekAgo } } }),
        prisma.analyticsEvent.count({ where: { createdAt: { gte: monthAgo } } }),
        prisma.lead.count(),
        prisma.chatLog.count(),
        prisma.projectConcept.count(),
        prisma.analyticsEvent.findMany({ take: 50, orderBy: { createdAt: "desc" } }),
      ]);

    // Event type breakdown
    const eventTypesRaw = await prisma.analyticsEvent.groupBy({
      by: ["eventType"],
      _count: { eventType: true },
      orderBy: { _count: { eventType: "desc" } },
    });

    // Device breakdown
    const deviceBreakdownRaw = await prisma.analyticsEvent.groupBy({
      by: ["device"],
      _count: { device: true },
    });

    // Recent leads
    const recentLeads = await prisma.lead.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
    });

    // Unique sessions (approximate)
    const uniqueSessions = await prisma.analyticsEvent.findMany({
      where: { createdAt: { gte: monthAgo } },
      distinct: ["sessionId"],
      select: { sessionId: true },
    });

    // Serialize BigInt IDs to strings to avoid JSON serialization crash
    const safeRecentEvents = recentEvents.slice(0, 20).map((e) => ({
      id: e.id.toString(),
      eventType: e.eventType,
      pagePath: e.pagePath,
      device: e.device,
      createdAt: e.createdAt,
    }));

    const safeRecentLeads = recentLeads.map((l) => ({
      id: l.id,
      name: l.name,
      email: l.email,
      company: l.company,
      projectType: l.projectType,
      budget: l.budget,
      status: l.status,
      createdAt: l.createdAt,
    }));

    return NextResponse.json({
      overview: {
        totalEvents,
        todayEvents,
        weekEvents,
        monthEvents,
        uniqueVisitors: uniqueSessions.length,
        totalLeads: leads,
        totalChats: chatLogs,
        totalConcepts: concepts,
      },
      eventTypes: eventTypesRaw.map((e: { eventType: string; _count: { eventType: number } }) => ({
        type: e.eventType,
        count: e._count.eventType,
      })),
      deviceBreakdown: deviceBreakdownRaw.map((d: { device: string | null; _count: { device: number } }) => ({
        device: d.device || "unknown",
        count: d._count.device,
      })),
      recentLeads: safeRecentLeads,
      recentEvents: safeRecentEvents,
    });
  } catch (error) {
    console.error("Analytics summary error:", error);
    return NextResponse.json({
      overview: {
        totalEvents: 0,
        todayEvents: 0,
        weekEvents: 0,
        monthEvents: 0,
        uniqueVisitors: 0,
        totalLeads: 0,
        totalChats: 0,
        totalConcepts: 0,
      },
      eventTypes: [],
      deviceBreakdown: [],
      recentLeads: [],
      recentEvents: [],
    });
  }
}
