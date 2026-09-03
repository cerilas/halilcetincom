"use client";

import { useState } from "react";
import { type Inquiry } from "@/lib/types";
import { markInquiryRead, removeInquiry } from "../../actions";
import { Phone, Mail, Clock, Check, Trash2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function InboxView({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedInquiry = inquiries.find((i) => i.id === selectedId);

  const handleMarkRead = async (id: string) => {
    // Optimistic UI update
    setInquiries((prev) => 
      prev.map((i) => (i.id === id ? { ...i, isRead: true } : i))
    );
    await markInquiryRead(id);
  };

  const handleDelete = async (id: string) => {
    toast("Bu mesajı tamamen silmek istediğinize emin misiniz?", {
      action: {
        label: "Evet, Sil",
        onClick: async () => {
          // Optimistic UI update
          setInquiries((prev) => prev.filter((i) => i.id !== id));
          if (selectedId === id) setSelectedId(null);
          
          await removeInquiry(id);
          toast.success("Mesaj başarıyla silindi.");
        },
      },
      cancel: { label: "İptal", onClick: () => {} },
    });
  };

  const selectMessage = (inquiry: Inquiry) => {
    setSelectedId(inquiry.id);
    if (!inquiry.isRead) {
      handleMarkRead(inquiry.id);
    }
  };

  if (inquiries.length === 0) {
    return (
      <div className="flex-1 rounded-3xl border border-line bg-card flex items-center justify-center">
        <p className="text-muted text-lg">Gelen kutusu boş.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex gap-6 overflow-hidden min-h-[500px]">
      {/* Message List */}
      <div className="w-full md:w-1/3 flex flex-col border border-line rounded-3xl bg-card overflow-hidden">
        <div className="p-4 border-b border-line bg-background/50">
          <h2 className="font-medium text-sm text-muted">Mesajlar ({inquiries.length})</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {inquiries.map((inq) => (
            <button
              key={inq.id}
              onClick={() => selectMessage(inq)}
              className={cn(
                "w-full text-left p-5 border-b border-line/50 transition-colors flex flex-col gap-2",
                selectedId === inq.id ? "bg-line/20" : "hover:bg-line/10",
                !inq.isRead ? "bg-gold/5" : ""
              )}
            >
              <div className="flex justify-between items-start w-full">
                <span className={cn("text-sm", !inq.isRead ? "font-bold text-foreground" : "font-medium text-muted")}>
                  {inq.name}
                </span>
                {!inq.isRead && (
                  <span className="w-2 h-2 rounded-full bg-gold shrink-0 mt-1.5" />
                )}
              </div>
              <span className={cn("text-xs truncate w-full", !inq.isRead ? "text-foreground/90 font-medium" : "text-muted")}>
                {inq.message}
              </span>
              <span className="text-[10px] text-muted flex items-center gap-1 mt-1">
                <Clock size={10} />
                {new Date(inq.createdAt).toLocaleString("tr-TR")}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Message Details */}
      <div className="hidden md:flex flex-1 flex-col border border-line rounded-3xl bg-card overflow-hidden">
        {selectedInquiry ? (
          <>
            {/* Toolbar */}
            <div className="p-4 border-b border-line bg-background/50 flex items-center justify-end gap-2">
              <button
                onClick={() => handleMarkRead(selectedInquiry.id)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-line text-xs font-medium text-muted hover:text-foreground hover:bg-line/30 transition-colors"
                title="Okundu İşaretle"
              >
                <Check size={14} /> Okundu İşaretle
              </button>
              <button
                onClick={() => handleDelete(selectedInquiry.id)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-500/20 text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                title="Sil"
              >
                <Trash2 size={14} /> Sil
              </button>
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="flex flex-col gap-6 max-w-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-display">{selectedInquiry.name}</h2>
                    <p className="text-sm text-muted mt-1">{new Date(selectedInquiry.createdAt).toLocaleString("tr-TR", { dateStyle: "full", timeStyle: "short" })}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-6 border-y border-line/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                      <Phone size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-muted">Telefon</p>
                      <a href={`tel:${selectedInquiry.phone.replace(/\\s+/g, "")}`} className="text-sm font-medium hover:text-gold transition-colors truncate block">
                        {selectedInquiry.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-muted">E-Posta</p>
                      <a href={`mailto:${selectedInquiry.email}`} className="text-sm font-medium hover:text-gold transition-colors truncate block">
                        {selectedInquiry.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs tracking-widest text-muted uppercase mb-3">Mesaj Detayı</h3>
                  <div className="p-5 rounded-2xl bg-background/50 border border-line text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={`tel:${selectedInquiry.phone.replace(/\\s+/g, "")}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-bold text-white dark:text-black hover:opacity-90 transition-opacity"
                  >
                    <Phone size={16} /> Müşteriyi Ara
                  </a>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-line/20 transition-colors"
                  >
                    <Mail size={16} /> E-Posta Gönder
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted gap-4">
            <Mail size={48} className="opacity-20" />
            <p>Okumak için listeden bir mesaj seçin.</p>
          </div>
        )}
      </div>
    </div>
  );
}
