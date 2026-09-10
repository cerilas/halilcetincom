"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveSiteSettings(formData: FormData) {
  try {
    const gold = formData.get("gold") as string;
    const goldSoft = formData.get("goldSoft") as string;
    const background = formData.get("background") as string;
    const foreground = formData.get("foreground") as string;

    const themeConfig = JSON.stringify({
      gold: gold || "#4875a1",
      goldSoft: goldSoft || "#6e5e52",
      background: background || "#fafafa",
      foreground: foreground || "#202121",
    });

    await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: { themeConfig },
      create: { id: "default", themeConfig },
    });

    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error) {
    console.error("Error saving site settings:", error);
    return { success: false, error: "Ayarlar kaydedilemedi" };
  }
}
