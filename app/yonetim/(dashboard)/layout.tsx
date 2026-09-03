import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Sidebar } from "./sidebar";

import { Toaster } from "sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value !== "authenticated") {
    redirect("/yonetim/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10">
        {children}
      </main>
      <Toaster position="top-center" richColors theme="system" />
    </div>
  );
}
