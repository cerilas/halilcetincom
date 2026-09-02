import { NextResponse } from "next/server";
import { setAdminCookie, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  if (!(await verifyPassword(body.password ?? ""))) {
    return NextResponse.json({ error: "Şifre hatalı" }, { status: 401 });
  }
  await setAdminCookie();
  return NextResponse.json({ ok: true });
}
