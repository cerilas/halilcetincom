import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/content";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
  };

  if (!body.name || !body.phone || !body.message) {
    return NextResponse.json({ error: "Eksik alan" }, { status: 400 });
  }

  await addInquiry({
    id: crypto.randomUUID(),
    name: String(body.name).slice(0, 120),
    phone: String(body.phone).slice(0, 40),
    email: String(body.email ?? "").slice(0, 120),
    message: String(body.message).slice(0, 2000),
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
