import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, url, referrer, duration, pageViewId } = body;

    // If duration and pageViewId are provided, this is an update (heartbeat/exit)
    if (pageViewId && duration !== undefined) {
      await prisma.pageView.update({
        where: { id: pageViewId },
        data: { duration: Number(duration) },
      });
      return NextResponse.json({ success: true });
    }

    // Otherwise, create a new page view record
    if (!sessionId || !url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get location from headers (Vercel/Cloudflare)
    const country = req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry") || "TR";
    const city = req.headers.get("x-vercel-ip-city") || req.headers.get("cf-ipcity") || "Istanbul";

    const pageView = await prisma.pageView.create({
      data: {
        sessionId,
        url,
        referrer: referrer || null,
        country,
        city,
        duration: 0,
      },
    });

    return NextResponse.json({ id: pageView.id });
  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
