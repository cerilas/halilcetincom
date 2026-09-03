import { getInquiries } from "@/lib/content";
import { InboxView } from "./inbox-view";

export const dynamic = "force-dynamic"; // Ensure fresh data on every load

export default async function MesajlarPage() {
  const inquiries = await getInquiries();
  
  return (
    <div className="flex flex-col h-full h-[calc(100vh-80px)]">
      <div className="mb-8">
        <h1 className="font-display text-3xl">Gelen Mesajlar</h1>
        <p className="text-muted mt-2">
          İletişim formundan gelen hasta taleplerini buradan yönetebilirsiniz.
        </p>
      </div>
      
      <InboxView initialInquiries={inquiries} />
    </div>
  );
}
