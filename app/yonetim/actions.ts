"use server";

import { revalidatePath } from "next/cache";
import { updateInquiry, deleteInquiry } from "@/lib/content";
import { cookies } from "next/headers";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (session?.value !== "authenticated") {
    throw new Error("Unauthorized");
  }
}

export async function markInquiryRead(id: string) {
  await checkAuth();
  await updateInquiry(id, { isRead: true });
  revalidatePath("/yonetim/mesajlar");
}

export async function removeInquiry(id: string) {
  await checkAuth();
  await deleteInquiry(id);
  revalidatePath("/yonetim/mesajlar");
}

// -- Knowledge Base (Articles) Actions --
import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export async function createArticle(data: Prisma.ArticleCreateInput) {
  await checkAuth();
  const article = await prisma.article.create({ data });
  revalidatePath("/bilgi-bankasi");
  revalidatePath("/yonetim/bilgi-bankasi");
  return article;
}

export async function updateArticle(id: string, data: Prisma.ArticleUpdateInput) {
  await checkAuth();
  const article = await prisma.article.update({
    where: { id },
    data,
  });
  revalidatePath("/bilgi-bankasi");
  revalidatePath("/yonetim/bilgi-bankasi");
  return article;
}

export async function deleteArticle(id: string) {
  await checkAuth();
  await prisma.article.delete({ where: { id } });
  revalidatePath("/bilgi-bankasi");
  revalidatePath("/yonetim/bilgi-bankasi");
}

export async function getAnalyticsData(days: number) {
  await checkAuth();
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - days);
  return prisma.pageView.findMany({
    where: { createdAt: { gte: dateLimit } },
    orderBy: { createdAt: "asc" }
  });
}

// -- Appointment Settings & Booking Actions --

export async function getAppointmentSettings() {
  let settings = await prisma.appointmentSettings.findUnique({ where: { id: "default" } });
  if (!settings) {
    settings = await prisma.appointmentSettings.create({
      data: { id: "default", workingDays: "1,2,3,4,5,6", startTime: "09:00", endTime: "19:00", slotDuration: 60, concurrentLimit: 2, notifyPhones: "" }
    });
  }
  return settings;
}

export async function updateAppointmentSettings(data: { workingDays: string, startTime: string, endTime: string, slotDuration: number, concurrentLimit: number, notifyPhones: string }) {
  await checkAuth();
  const updated = await prisma.appointmentSettings.update({
    where: { id: "default" },
    data
  });
  revalidatePath("/yonetim/randevular");
  revalidatePath("/randevu");
  return updated;
}

export async function getAppointments() {
  await checkAuth();
  return prisma.appointment.findMany({ orderBy: { createdAt: "desc" } });
}

export async function deleteAppointment(id: string) {
  await checkAuth();
  await prisma.appointment.delete({ where: { id } });
  revalidatePath("/yonetim/randevular");
  revalidatePath("/randevu");
}

import { sendSmsNotification } from "@/lib/sms";

export async function updateAppointmentStatus(id: string, status: string) {
  await checkAuth();
  const updated = await prisma.appointment.update({
    where: { id },
    data: { status }
  });

  if (updated.phone) {
    const formattedDate = updated.date.toLocaleDateString("tr-TR");
    const dayName = updated.date.toLocaleDateString("tr-TR", { weekday: "long" });
    const timeString = updated.date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });

    if (status === "APPROVED") {
      const msg = `Sn. ${updated.name} randevu talebiniz onaylanmistir. ${formattedDate} ${timeString} Konum: www.halilcetinsacekimi.com`;
      await sendSmsNotification([updated.phone], msg);
    } else if (status === "REJECTED") {
      const msg = `Sn. ${updated.name}, randevunuz iptal edilmistir. Lutfen klinik ile iletisime geciniz.`;
      await sendSmsNotification([updated.phone], msg);
    }
  }

  revalidatePath("/yonetim/randevular");
  return updated;
}

export async function createAppointment(data: { name: string, phone: string, email?: string, date: Date | string, type: string }) {
  try {
    const appointmentDate = new Date(data.date);
    
    const created = await prisma.appointment.create({ 
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        type: data.type,
        date: appointmentDate
      }
    });
    
    const formattedDate = appointmentDate.toLocaleDateString("tr-TR");
    const dayName = appointmentDate.toLocaleDateString("tr-TR", { weekday: "long" });
    const timeString = appointmentDate.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
    
    // Hastaya SMS gönderimi
    if (data.phone) {
      // Convert type to english chars to be safe
      const safeType = data.type.replace(/ö/g, 'o').replace(/Ö/g, 'O').replace(/ş/g, 's').replace(/Ş/g, 'S').replace(/ğ/g, 'g').replace(/Ğ/g, 'G').replace(/ü/g, 'u').replace(/Ü/g, 'U').replace(/ı/g, 'i').replace(/İ/g, 'I').replace(/ç/g, 'c').replace(/Ç/g, 'C');
      const safeName = data.name.replace(/ö/g, 'o').replace(/Ö/g, 'O').replace(/ş/g, 's').replace(/Ş/g, 'S').replace(/ğ/g, 'g').replace(/Ğ/g, 'G').replace(/ü/g, 'u').replace(/Ü/g, 'U').replace(/ı/g, 'i').replace(/İ/g, 'I').replace(/ç/g, 'c').replace(/Ç/g, 'C');
      
      const patientMsg = `Sn. ${safeName}, Halil Cetin Sac Ekimi'ni tercih ettiginiz icin tesekkurler. ${formattedDate} ${timeString} saatli ${safeType} talebiniz alinmistir.`;
      await sendSmsNotification([data.phone], patientMsg);
    }

  // Get settings to find notifyPhones
  const settings = await prisma.appointmentSettings.findUnique({ where: { id: "default" } });
  if (settings && settings.notifyPhones) {
    const phones = settings.notifyPhones.split(",").map(p => p.trim()).filter(Boolean);
    if (phones.length > 0) {
      const safeType = data.type.replace(/ö/g, 'o').replace(/Ö/g, 'O').replace(/ş/g, 's').replace(/Ş/g, 'S').replace(/ğ/g, 'g').replace(/Ğ/g, 'G').replace(/ü/g, 'u').replace(/Ü/g, 'U').replace(/ı/g, 'i').replace(/İ/g, 'I').replace(/ç/g, 'c').replace(/Ç/g, 'C');
      const message = `${formattedDate} ${timeString} icin ${safeType} talebi var. Goruntuleyin: halilcetinsacekimi.com/yonetim`;
      // Call the external SMS API for admins
      await sendSmsNotification(phones, message);
    }
  }

  revalidatePath("/yonetim/randevular");
  return { success: true };
  } catch (error: any) {
    console.error("Create Appointment Error:", error);
    require('fs').writeFileSync('/Users/deniz/Downloads/HalilCetinHairTransplant/debug-error.log', (error.stack || error.message) + '\n' + JSON.stringify(data, null, 2));
    throw new Error(error.message || "Randevu oluşturulamadı");
  }
}
