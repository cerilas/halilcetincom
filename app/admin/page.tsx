import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/auth";
import { getContent, getInquiries } from "@/lib/content";
import { AdminDesk } from "@/components/admin/admin-desk";

export default async function AdminPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");
  const [content, inquiries] = await Promise.all([getContent(), getInquiries()]);
  return <AdminDesk initial={content} inquiries={inquiries} />;
}
