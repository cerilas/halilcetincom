"use client";

import { useState } from "react";
import { updateAppointmentSettings, updateAppointmentStatus, deleteAppointment } from "../../actions";
import { toast } from "sonner";
import { Check, X, Clock, Settings, Users, Save, Calendar as CalendarIcon, Phone, Mail, ChevronLeft, ChevronRight, ArrowUpDown, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Appointment = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  type: string;
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
  const [deleteModalOpen, setDeleteModalOpen] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pagination & Sorting State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortBy, setSortBy] = useState<"createdAt" | "date">("createdAt");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const sortedAppointments = [...appointments].sort((a, b) => {
    const valA = new Date(a[sortBy]).getTime();
    const valB = new Date(b[sortBy]).getTime();
    if (sortOrder === "asc") return valA - valB;
    return valB - valA;
  });

  const totalPages = Math.ceil(sortedAppointments.length / itemsPerPage);
  const paginatedAppointments = sortedAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      await deleteAppointment(id);
      setAppointments(prev => prev.filter(a => a.id !== id));
      toast.success("Randevu kalıcı olarak silindi.");
      setDeleteModalOpen(null);
    } catch (error) {
      toast.error("Randevu silinirken bir hata oluştu.");
    } finally {
      setIsDeleting(false);
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
          {appointments.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-line p-4 rounded-2xl mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">Sırala:</span>
                
                <div className="flex bg-line/20 p-1 rounded-xl items-center">
                  <button
                    onClick={() => setSortBy("createdAt")}
                    className={cn(
                      "px-4 py-1.5 text-xs font-medium rounded-lg transition-all", 
                      sortBy === "createdAt" ? "bg-background shadow-sm text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted hover:text-foreground"
                    )}
                  >
                    Alınma Tarihi
                  </button>
                  <button
                    onClick={() => setSortBy("date")}
                    className={cn(
                      "px-4 py-1.5 text-xs font-medium rounded-lg transition-all", 
                      sortBy === "date" ? "bg-background shadow-sm text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted hover:text-foreground"
                    )}
                  >
                    Randevu Tarihi
                  </button>
                </div>

                <div className="w-px h-5 bg-line mx-1" />

                <button 
                  onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
                  className="flex items-center gap-2 px-3 py-1.5 bg-line/10 hover:bg-line/30 rounded-xl text-xs font-medium text-foreground transition-colors border border-line"
                  title={sortOrder === "desc" ? "Yeniden Eskiye" : "Eskiden Yeniye"}
                >
                  <ArrowUpDown className="w-3.5 h-3.5 text-gold" />
                  {sortOrder === "desc" ? "Azalan" : "Artan"}
                </button>
              </div>
              <div className="text-sm text-muted">
                Toplam {appointments.length} randevu
              </div>
            </div>
          )}

          {appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted bg-card border border-line rounded-3xl">
              <CalendarIcon className="w-12 h-12 mb-4 opacity-50" />
              <p>Henüz randevu talebi bulunmuyor.</p>
            </div>
          ) : (
            <>
              {paginatedAppointments.map(app => (
              <div key={app.id} className="bg-card border border-line p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors hover:border-gold/50">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-medium",
                      app.status === "PENDING" && "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
                      app.status === "APPROVED" && "bg-green-500/10 text-green-500 border border-green-500/20",
                      app.status === "REJECTED" && "bg-red-500/10 text-red-500 border border-red-500/20",
                      app.status === "CANCELLED_BY_PATIENT" && "bg-orange-500/10 text-orange-500 border border-orange-500/20",
                    )}>
                      {app.status === "PENDING" ? "Bekliyor" : app.status === "APPROVED" ? "Onaylandı" : app.status === "CANCELLED_BY_PATIENT" ? "Hasta İptal Etti" : "İptal"}
                    </span>
                    <span className="text-sm text-muted">
                      {new Date(app.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-foreground">{app.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-gold/10 text-gold rounded-md font-medium text-xs border border-gold/20">{app.type}</span>
                    <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" /> {new Date(app.date).toLocaleString('tr-TR', { dateStyle: 'long', timeStyle: 'short' })}</span>
                    <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> <a href={`tel:${app.phone}`} className="hover:text-gold">{app.phone}</a></span>
                    {app.email && <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> <a href={`mailto:${app.email}`} className="hover:text-gold">{app.email}</a></span>}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {app.status !== "CANCELLED_BY_PATIENT" && (
                    <>
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
                    </>
                  )}
                  {app.status === "CANCELLED_BY_PATIENT" && (
                    <span className="text-sm text-muted italic flex items-center gap-2 px-4 py-2 bg-orange-500/5 rounded-xl border border-orange-500/10">
                      <X className="w-4 h-4 text-orange-500" /> Düzenlenemez
                    </span>
                  )}
                  
                  <div className="w-px h-6 bg-line mx-2" />
                  
                  <button 
                    onClick={() => setDeleteModalOpen(app.id)}
                    className="flex items-center justify-center p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
                    title="Kalıcı Olarak Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination UI */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-line rounded-xl hover:bg-line/20 disabled:opacity-50 transition-colors bg-card"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium px-4 bg-card border border-line py-2 rounded-xl">Sayfa {currentPage} / {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-line rounded-xl hover:bg-line/20 disabled:opacity-50 transition-colors bg-card"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
            <div className="bg-card border border-line rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-center mb-2 text-foreground">Randevuyu Kalıcı Sil</h3>
              <p className="text-muted text-center text-sm mb-8">
                Bu randevuyu kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleDelete(deleteModalOpen)}
                  disabled={isDeleting}
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Evet, Sil"}
                </button>
                <button
                  onClick={() => setDeleteModalOpen(null)}
                  disabled={isDeleting}
                  className="w-full py-3 bg-transparent border border-line text-foreground hover:bg-line/20 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  Vazgeç
                </button>
              </div>
            </div>
          </div>
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
