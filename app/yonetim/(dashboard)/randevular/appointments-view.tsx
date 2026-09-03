"use client";

import { useState } from "react";
import { updateAppointmentSettings, updateAppointmentStatus } from "../../actions";
import { toast } from "sonner";
import { Check, X, Clock, Settings, Users, Save, Calendar as CalendarIcon, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type Appointment = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  date: Date;
  status: string;
  createdAt: Date;
};

type Settings = {
  workingDays: string;
  startTime: string;
  endTime: string;
  slotDuration: number;
  concurrentLimit: number;
  notifyPhones: string;
};

const DAYS = [
  { value: "1", label: "Pzt" },
  { value: "2", label: "Sal" },
  { value: "3", label: "Çar" },
  { value: "4", label: "Per" },
  { value: "5", label: "Cum" },
  { value: "6", label: "Cmt" },
  { value: "0", label: "Paz" },
];

export function AppointmentsView({ initialAppointments, settings }: { initialAppointments: Appointment[], settings: Settings }) {
  const [activeTab, setActiveTab] = useState<"list" | "settings">("list");
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isSaving, setIsSaving] = useState(false);

  // Settings State
  const [workingDays, setWorkingDays] = useState<string[]>(settings.workingDays.split(","));
  const [startTime, setStartTime] = useState(settings.startTime);
  const [endTime, setEndTime] = useState(settings.endTime);
  const [slotDuration, setSlotDuration] = useState(settings.slotDuration);
  const [concurrentLimit, setConcurrentLimit] = useState(settings.concurrentLimit);
  const [notifyPhones, setNotifyPhones] = useState(settings.notifyPhones || "");

  const toggleDay = (val: string) => {
    setWorkingDays(prev => 
      prev.includes(val) ? prev.filter(d => d !== val) : [...prev, val]
    );
  };

  const saveSettings = async () => {
    try {
      setIsSaving(true);
      await updateAppointmentSettings({
        workingDays: workingDays.join(","),
        startTime,
        endTime,
        slotDuration,
        concurrentLimit,
        notifyPhones
      });
      toast.success("Ayarlar başarıyla kaydedildi.");
    } catch (error) {
      toast.error("Ayarlar kaydedilirken bir hata oluştu.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateAppointmentStatus(id, status);
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      toast.success(`Randevu durumu güncellendi: ${status}`);
    } catch (error) {
      toast.error("Durum güncellenirken bir hata oluştu.");
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display">Randevular</h1>
        <div className="flex bg-line/20 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("list")}
            className={cn("px-4 py-2 text-sm font-medium rounded-lg transition-all", activeTab === "list" ? "bg-background shadow text-foreground" : "text-muted")}
          >
            Talepler
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={cn("px-4 py-2 text-sm font-medium rounded-lg transition-all", activeTab === "settings" ? "bg-background shadow text-foreground" : "text-muted")}
          >
            Ayarlar
          </button>
        </div>
      </div>

      {activeTab === "list" && (
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted bg-card border border-line rounded-3xl">
              <CalendarIcon className="w-12 h-12 mb-4 opacity-50" />
              <p>Henüz randevu talebi bulunmuyor.</p>
            </div>
          ) : (
            appointments.map(app => (
              <div key={app.id} className="bg-card border border-line p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors hover:border-gold/50">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-medium",
                      app.status === "PENDING" && "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
                      app.status === "APPROVED" && "bg-green-500/10 text-green-500 border border-green-500/20",
                      app.status === "REJECTED" && "bg-red-500/10 text-red-500 border border-red-500/20",
                    )}>
                      {app.status === "PENDING" ? "Bekliyor" : app.status === "APPROVED" ? "Onaylandı" : "İptal"}
                    </span>
                    <span className="text-sm text-muted">
                      {new Date(app.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-foreground">{app.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                    <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" /> {new Date(app.date).toLocaleString('tr-TR', { dateStyle: 'long', timeStyle: 'short' })}</span>
                    <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> <a href={`tel:${app.phone}`} className="hover:text-gold">{app.phone}</a></span>
                    {app.email && <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> <a href={`mailto:${app.email}`} className="hover:text-gold">{app.email}</a></span>}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {app.status !== "APPROVED" && (
                    <button 
                      onClick={() => updateStatus(app.id, "APPROVED")}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500/20 transition-colors"
                    >
                      <Check className="w-4 h-4" /> Onayla
                    </button>
                  )}
                  {app.status !== "REJECTED" && (
                    <button 
                      onClick={() => updateStatus(app.id, "REJECTED")}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
                    >
                      <X className="w-4 h-4" /> İptal Et
                    </button>
                  )}
                  {app.status !== "PENDING" && (
                    <button 
                      onClick={() => updateStatus(app.id, "PENDING")}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 text-yellow-500 rounded-xl hover:bg-yellow-500/20 transition-colors"
                    >
                      <Clock className="w-4 h-4" /> Beklemeye Al
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-card border border-line rounded-3xl p-8 max-w-3xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-gold" /> Çalışma Günleri
              </h2>
              <div className="flex flex-wrap gap-2">
                {DAYS.map(day => (
                  <button
                    key={day.value}
                    onClick={() => toggleDay(day.value)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-colors border",
                      workingDays.includes(day.value) 
                        ? "bg-gold text-background border-gold" 
                        : "bg-transparent text-muted border-line hover:border-gold/50"
                    )}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gold" /> Mesai Saatleri
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-muted mb-2">Başlangıç</label>
                    <input 
                      type="time" 
                      value={startTime} 
                      onChange={e => setStartTime(e.target.value)}
                      className="w-full bg-background border border-line rounded-xl px-4 py-2 text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <span className="text-muted mt-6">-</span>
                  <div className="flex-1">
                    <label className="block text-xs text-muted mb-2">Bitiş</label>
                    <input 
                      type="time" 
                      value={endTime} 
                      onChange={e => setEndTime(e.target.value)}
                      className="w-full bg-background border border-line rounded-xl px-4 py-2 text-sm outline-none focus:border-gold"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gold" /> Randevu Süresi
                </h2>
                <div>
                  <label className="block text-xs text-muted mb-2">Aralık Seçimi</label>
                  <div className="flex bg-background border border-line p-1 rounded-xl overflow-x-auto w-full no-scrollbar">
                    {[
                      { label: "30 dk", value: 30 },
                      { label: "1 Saat", value: 60 },
                      { label: "1.5 Saat", value: 90 },
                      { label: "2 Saat", value: 120 },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setSlotDuration(opt.value)}
                        className={cn(
                          "flex-1 px-2 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all",
                          slotDuration === opt.value
                            ? "bg-gold text-background shadow-sm ring-1 ring-gold/50"
                            : "text-muted hover:text-foreground hover:bg-line/20"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-gold" /> Kapasite Ayarları
              </h2>
              <div>
                <label className="block text-xs text-muted mb-2">Eşzamanlı Randevu Limiti (Aynı saate kaç kişi randevu alabilir?)</label>
                <input 
                  type="number" 
                  min={1}
                  max={20}
                  value={concurrentLimit}
                  onChange={e => setConcurrentLimit(Number(e.target.value))}
                  className="w-full max-w-[200px] bg-background border border-line rounded-xl px-4 py-2 text-sm outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-gold" /> SMS Bildirimleri
              </h2>
              <div>
                <label className="block text-xs text-muted mb-2">Yeni randevu alındığında haber verilecek telefon numaraları (Virgül ile ayırın)</label>
                <input 
                  type="text" 
                  placeholder="05xxxxxxxxx, 05xxxxxxxxx"
                  value={notifyPhones}
                  onChange={e => setNotifyPhones(e.target.value)}
                  className="w-full bg-background border border-line rounded-xl px-4 py-2 text-sm outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-line">
              <button
                onClick={saveSettings}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 bg-gold text-background rounded-xl font-medium hover:bg-gold/90 transition-colors disabled:opacity-50"
              >
                {isSaving ? <span className="animate-spin">⏳</span> : <Save className="w-5 h-5" />}
                Ayarları Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
