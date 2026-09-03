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

export async function updateAppointmentStatus(id: string, status: string) {
  await checkAuth();
  const updated = await prisma.appointment.update({
    where: { id },
    data: { status }
  });
  revalidatePath("/yonetim/randevular");
  return updated;
}

import { sendSmsNotification } from "@/lib/sms";

export async function createAppointment(data: { name: string, phone: string, email?: string, date: Date }) {
  const created = await prisma.appointment.create({ data });
  
  // Get settings to find notifyPhones
  const settings = await prisma.appointmentSettings.findUnique({ where: { id: "default" } });
  if (settings && settings.notifyPhones) {
    const phones = settings.notifyPhones.split(",").map(p => p.trim()).filter(Boolean);
    if (phones.length > 0) {
      const formattedDate = data.date.toLocaleDateString("tr-TR");
      const dayName = data.date.toLocaleDateString("tr-TR", { weekday: "long" });
      const timeString = data.date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
      
      const message = `${formattedDate} tarihi ${dayName} günü ${timeString} saati için Halil Çetin adına randevu talebiniz var. Hemen görüntüleyin: www.halilcetinsacekimi.com/yonetim`;
      
      // Call the external SMS API
      await sendSmsNotification(phones, message);
    }
  }

  revalidatePath("/yonetim/randevular");
  return created;
}
