"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sendSmsNotification } from "@/lib/sms";

export async function getAppointmentsByPhone(phone: string) {
  if (!phone) return [];
  
  return prisma.appointment.findMany({
    where: { phone },
    orderBy: { createdAt: "desc" }
  });
}

export async function cancelAppointmentByPatient(id: string, phone: string) {
  const appointment = await prisma.appointment.findUnique({ where: { id } });
  
  if (!appointment || appointment.phone !== phone) {
    throw new Error("Randevu bulunamadı veya yetkisiz işlem.");
  }
  
  if (appointment.status === "REJECTED" || appointment.status === "CANCELLED_BY_PATIENT") {
    throw new Error("Randevu zaten iptal edilmiş.");
  }

  const updated = await prisma.appointment.update({
    where: { id },
    data: { status: "CANCELLED_BY_PATIENT" } 
  });

  // Notify admins
  const settings = await prisma.appointmentSettings.findUnique({ where: { id: "default" } });
  if (settings && settings.notifyPhones) {
    const phones = settings.notifyPhones.split(",").map(p => p.trim()).filter(Boolean);
    if (phones.length > 0) {
      const msg = `Bilgi: ${appointment.name} isimli hasta, kendi randevusunu iptal etti.`;
      await sendSmsNotification(phones, msg);
    }
  }

  revalidatePath("/randevu");
  revalidatePath("/yonetim/randevular");
  
  return updated;
}
