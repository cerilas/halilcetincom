import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { getContent, getInquiries, saveContent } from "@/lib/content";
import type { SiteContent } from "@/lib/types";

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const [content, inquiries] = await Promise.all([getContent(), getInquiries()]);
  return NextResponse.json({ content, inquiries });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = (await request.json()) as SiteContent;
  if (!content?.clinic?.name) {
    return NextResponse.json({ error: "Geçersiz içerik" }, { status: 400 });
  }
  await saveContent(content);
  return NextResponse.json({ ok: true });
}
