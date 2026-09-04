"use client";

import { useState, useEffect } from "react";
import { createAppointment } from "../yonetim/actions";
import { getAppointmentsByPhone, cancelAppointmentByPatient } from "./actions";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, Loader2, CheckCircle2, Settings, X, AlertTriangle, Users, Activity, Sparkles, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookingClient() {
  const [date, setDate] = useState<string>("");
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  
  const [formData, setFormData] = useState({ type: "", name: "", phone: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const APPOINTMENT_TYPES = [
    { id: "Ön Görüşme", icon: Users, label: "Ön Görüşme", desc: "Süreci planlamak ve tanışmak için" },
    { id: "Saç Analizi", icon: Activity, label: "Saç Analizi", desc: "Kök yapınızın detaylı incelenmesi" },
    { id: "Bakım", icon: Sparkles, label: "Bakım (PRP vb.)", desc: "PRP, Mezoterapi ve güçlendirme" },
    { id: "Kontrol", icon: Stethoscope, label: "Kontrol", desc: "Ekim sonrası rutin takip ve inceleme" },
  ];

  // Manage State
  const [mode, setMode] = useState<"book" | "manage">("book");
  const [managePhone, setManagePhone] = useState("");
  const [manageAppointments, setManageAppointments] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!managePhone) {
      toast.error("Lütfen telefon numaranızı girin.");
      return;
    }
    
    setIsSearching(true);
    try {
      const results = await getAppointmentsByPhone(managePhone);
      setManageAppointments(results);
      setHasSearched(true);
    } catch (error) {
      toast.error("Randevular alınırken bir hata oluştu.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      setIsCancelling(true);
      await cancelAppointmentByPatient(id, managePhone);
      toast.success("Randevunuz başarıyla iptal edildi.");
      setManageAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "CANCELLED_BY_PATIENT" } : a));
      setCancelModalOpen(null);
    } catch (error: any) {
      toast.error(error.message || "İptal işlemi başarısız.");
    } finally {
      setIsCancelling(false);
    }
  };

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
    if (!formData.type) {
      toast.error("Lütfen bir randevu türü seçin.");
      return;
    }
    if (!date || !selectedSlot) {
      toast.error("Lütfen bir gün ve saat seçin.");
      return;
    }
    
    if (!formData.name || !formData.phone) {
      toast.error("Lütfen zorunlu alanları (Ad, Telefon) doldurun.");
      return;
    }

    try {
      setIsSubmitting(true);
      const [h, m] = selectedSlot.split(":").map(Number);
      const appointmentDate = new Date(date);
      appointmentDate.setHours(h, m, 0, 0);

      await createAppointment({
        type: formData.type,
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

  if (mode === "manage") {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display">Randevularımı Yönet</h2>
          <button onClick={() => setMode("book")} className="text-sm text-muted hover:text-foreground underline">Geri Dön</button>
        </div>
        
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
            <input
              type="tel"
              placeholder="Telefon Numaranız"
              value={managePhone}
              onChange={(e) => setManagePhone(e.target.value)}
              className="w-full bg-background border border-line rounded-xl pl-12 pr-4 py-3 outline-none focus:border-gold transition-colors"
            />
          </div>
          <button type="submit" disabled={isSearching} className="px-6 py-3 bg-gold text-background rounded-xl font-medium hover:bg-gold/90 transition-colors disabled:opacity-50 whitespace-nowrap">
            {isSearching ? "Aranıyor..." : "Sorgula"}
          </button>
        </form>

        {hasSearched && (
          <div className="space-y-4">
            {manageAppointments.length === 0 ? (
              <p className="text-muted text-center py-8">Bu numaraya ait randevu bulunamadı.</p>
            ) : (
              manageAppointments.map(app => (
                <div key={app.id} className="bg-background border border-line p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-medium",
                        app.status === "PENDING" && "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
                        app.status === "APPROVED" && "bg-green-500/10 text-green-500 border border-green-500/20",
                        (app.status === "REJECTED" || app.status === "CANCELLED_BY_PATIENT") && "bg-red-500/10 text-red-500 border border-red-500/20",
                      )}>
                        {app.status === "PENDING" ? "Bekliyor" : app.status === "APPROVED" ? "Onaylandı" : "İptal Edildi"}
                      </span>
                      <span className="text-sm text-muted">{new Date(app.date).toLocaleString('tr-TR', { dateStyle: 'long', timeStyle: 'short' })}</span>
                    </div>
                    <p className="font-medium">{app.name}</p>
                  </div>
                  
                  {app.status !== "REJECTED" && app.status !== "CANCELLED_BY_PATIENT" && new Date(app.date) > new Date() && (
                    <button 
                      onClick={() => setCancelModalOpen(app.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      <X className="w-4 h-4" /> İptal Et
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Custom Cancel Modal */}
        {cancelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
            <div className="bg-card border border-line rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-center mb-2 text-foreground">Randevuyu İptal Et</h3>
              <p className="text-muted text-center text-sm mb-8">
                Bu randevuyu iptal etmek istediğinize emin misiniz? İptal işleminden sonra randevuyu geri alamazsınız. Yeni bir tarih için tekrar randevu oluşturmanız gerekecektir.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleCancel(cancelModalOpen)}
                  disabled={isCancelling}
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isCancelling ? <Loader2 className="w-5 h-5 animate-spin" /> : "Evet, İptal Et"}
                </button>
                <button
                  onClick={() => setCancelModalOpen(null)}
                  disabled={isCancelling}
                  className="w-full py-3 bg-transparent border border-line text-foreground hover:bg-line/20 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  Vazgeç
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        
        {/* 1. Type Selection */}
        <div>
          <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center text-sm">1</span>
            Randevu Türü
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {APPOINTMENT_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: type.id }))}
                className={cn(
                  "p-5 rounded-2xl border text-left transition-all flex items-start gap-4",
                  formData.type === type.id
                    ? "bg-gold/5 border-gold shadow-[0_0_15px_rgba(212,175,55,0.15)] ring-1 ring-gold"
                    : "bg-background border-line hover:border-gold/50"
                )}
              >
                <div className={cn(
                  "p-3 rounded-xl",
                  formData.type === type.id ? "bg-gold text-background" : "bg-line/20 text-muted"
                )}>
                  <type.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={cn("font-medium mb-1", formData.type === type.id ? "text-foreground" : "text-foreground")}>{type.label}</h3>
                  <p className="text-xs text-muted leading-relaxed">{type.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      {/* 2. Date Selection */}
      <div>
        <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center text-sm">2</span>
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

      {/* 3. Slot Selection */}
      <div>
        <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center text-sm">3</span>
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

      {/* 4. Personal Info */}
      <div>
        <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center text-sm">4</span>
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
          disabled={isSubmitting}
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

      <div className="mt-8 pt-8 border-t border-line text-center">
        <button 
          type="button"
          onClick={() => setMode("manage")}
          className="text-sm text-muted hover:text-foreground transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <Settings className="w-4 h-4" /> Randevumu Yönet
        </button>
      </div>
    </div>
  );
}
