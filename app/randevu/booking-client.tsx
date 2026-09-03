"use client";

import { useState, useEffect } from "react";
import { createAppointment } from "../yonetim/actions";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookingClient() {
  const [date, setDate] = useState<string>("");
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!date) {
      setSlots([]);
      setSelectedSlot("");
      return;
    }

    let isMounted = true;
    setLoadingSlots(true);
    setSelectedSlot("");
    
    fetch(`/api/appointments/available?date=${date}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          if (data.slots) setSlots(data.slots);
          else setSlots([]);
        }
      })
      .catch(() => {
        if (isMounted) toast.error("Uygun saatler yüklenemedi.");
      })
      .finally(() => {
        if (isMounted) setLoadingSlots(false);
      });

    return () => { isMounted = false; };
  }, [date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !selectedSlot) {
      toast.error("Lütfen bir gün ve saat seçin.");
      return;
    }
    
    if (!formData.name || !formData.phone) {
      toast.error("Lütfen zorunlu alanları doldurun.");
      return;
    }

    try {
      setIsSubmitting(true);
      const [h, m] = selectedSlot.split(":").map(Number);
      const appointmentDate = new Date(date);
      appointmentDate.setHours(h, m, 0, 0);

      await createAppointment({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        date: appointmentDate
      });

      setIsSuccess(true);
      // Optional: don't show toast if we show the success screen
    } catch (error) {
      toast.error("Randevu oluşturulurken bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-display mb-4">Randevunuz Alındı!</h2>
        <p className="text-muted max-w-md mx-auto">
          Talebiniz başarıyla bize ulaştı. Seçtiğiniz tarih ve saat için kısa süre içerisinde sizinle iletişime geçip onaylayacağız.
        </p>
        <button 
          onClick={() => window.location.href = "/"}
          className="mt-8 px-6 py-3 bg-gold text-background rounded-xl font-medium hover:bg-gold/90 transition-colors"
        >
          Anasayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      
      {/* 1. Date Selection */}
      <div>
        <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center text-sm">1</span>
          Gün Seçimi
        </h2>
        <div className="flex overflow-x-auto gap-3 pb-4 pt-2 w-full no-scrollbar">
          {Array.from({ length: 30 }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() + i);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const dateString = `${year}-${month}-${day}`;
            
            const dayName = d.toLocaleDateString("tr-TR", { weekday: "short" });
            const dayNumber = d.getDate();
            const monthName = d.toLocaleDateString("tr-TR", { month: "short" });
            
            return (
              <button
                key={dateString}
                type="button"
                onClick={() => setDate(dateString)}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[85px] h-[100px] rounded-2xl border transition-all shrink-0",
                  date === dateString
                    ? "bg-gold border-gold text-background shadow-lg scale-105"
                    : "bg-background border-line text-muted hover:border-gold/50"
                )}
              >
                <span className="text-xs font-medium uppercase tracking-wider opacity-80 mb-1">{monthName}</span>
                <span className={cn("text-3xl font-bold mb-1", date === dateString ? "text-background" : "text-foreground")}>{dayNumber}</span>
                <span className="text-sm opacity-90">{dayName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Slot Selection */}
      <div className={cn("transition-opacity duration-300", !date && "opacity-50 pointer-events-none")}>
        <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center text-sm">2</span>
          Saat Seçimi
        </h2>
        
        {loadingSlots ? (
          <div className="flex items-center gap-3 text-muted py-4">
            <Loader2 className="w-5 h-5 animate-spin text-gold" />
            Uygun saatler aranıyor...
          </div>
        ) : !date ? (
          <p className="text-muted text-sm py-2">Önce bir gün seçmelisiniz.</p>
        ) : slots.length === 0 ? (
          <p className="text-red-400 text-sm py-2 bg-red-400/10 px-4 rounded-xl border border-red-400/20 inline-block">
            Seçtiğiniz gün için uygun randevu saati bulunmuyor. Lütfen başka bir gün deneyin.
          </p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {slots.map(slot => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={cn(
                  "py-3 rounded-xl text-sm font-medium transition-all border flex items-center justify-center gap-2",
                  selectedSlot === slot 
                    ? "bg-gold text-background border-gold shadow-lg scale-105" 
                    : "bg-background text-foreground border-line hover:border-gold hover:text-gold"
                )}
              >
                <Clock className="w-4 h-4" />
                {slot}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. Personal Info */}
      <div className={cn("transition-opacity duration-300", (!date || !selectedSlot) && "opacity-50 pointer-events-none")}>
        <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center text-sm">3</span>
          İletişim Bilgileri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Adınız Soyadınız"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-background border border-line rounded-xl pl-12 pr-4 py-4 outline-none focus:border-gold transition-colors"
              required
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
            <input
              type="tel"
              placeholder="Telefon Numaranız"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full bg-background border border-line rounded-xl pl-12 pr-4 py-4 outline-none focus:border-gold transition-colors"
              required
            />
          </div>
          <div className="relative md:col-span-2">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
            <input
              type="email"
              placeholder="E-posta Adresiniz (İsteğe bağlı)"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full bg-background border border-line rounded-xl pl-12 pr-4 py-4 outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || !date || !selectedSlot || !formData.name || !formData.phone}
          className="mt-8 w-full md:w-auto px-10 py-4 bg-gold text-background rounded-xl font-medium hover:bg-gold/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> İşleniyor...</>
          ) : (
            <>Randevuyu Tamamla</>
          )}
        </button>
      </div>

    </form>
  );
}
