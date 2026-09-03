import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date"); // YYYY-MM-DD
    
    if (!dateParam) {
      return NextResponse.json({ error: "Tarih gerekli" }, { status: 400 });
    }

    const date = new Date(dateParam);
    if (isNaN(date.getTime())) {
      return NextResponse.json({ error: "Geçersiz tarih formatı" }, { status: 400 });
    }

    // Settings
    let settings = await prisma.appointmentSettings.findUnique({ where: { id: "default" } });
    if (!settings) {
      settings = {
        id: "default",
        workingDays: "1,2,3,4,5,6",
        startTime: "09:00",
        endTime: "19:00",
        slotDuration: 60,
        concurrentLimit: 2,
        updatedAt: new Date()
      };
    }

    const workingDays = settings.workingDays.split(",").map(Number);
    const dayOfWeek = date.getDay(); // 0=Sun, 1=Mon...

    if (!workingDays.includes(dayOfWeek)) {
      return NextResponse.json({ slots: [] }); // Not a working day
    }

    // Generate slots based on startTime, endTime, and slotDuration
    const slots: string[] = [];
    const [startH, startM] = settings.startTime.split(":").map(Number);
    const [endH, endM] = settings.endTime.split(":").map(Number);
    
    let currentSlot = new Date(date);
    currentSlot.setHours(startH, startM, 0, 0);
    
    const endSlot = new Date(date);
    endSlot.setHours(endH, endM, 0, 0);

    // Filter out past slots if the date is today
    const now = new Date();

    while (currentSlot < endSlot) {
      if (currentSlot > now) {
        slots.push(
          `${currentSlot.getHours().toString().padStart(2, '0')}:${currentSlot.getMinutes().toString().padStart(2, '0')}`
        );
      }
      currentSlot.setMinutes(currentSlot.getMinutes() + settings.slotDuration);
    }

    if (slots.length === 0) {
      return NextResponse.json({ slots: [] });
    }

    // Get existing appointments for this day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay
        },
        status: {
          in: ["PENDING", "APPROVED"]
        }
      },
      select: { date: true }
    });

    // Count bookings per slot
    const bookingsBySlot: Record<string, number> = {};
    appointments.forEach(app => {
      const time = `${app.date.getHours().toString().padStart(2, '0')}:${app.date.getMinutes().toString().padStart(2, '0')}`;
      bookingsBySlot[time] = (bookingsBySlot[time] || 0) + 1;
    });

    // Filter available slots
    const availableSlots = slots.filter(slot => {
      const bookedCount = bookingsBySlot[slot] || 0;
      return bookedCount < (settings?.concurrentLimit ?? 2);
    });

    return NextResponse.json({ slots: availableSlots });
  } catch (error) {
    console.error("Available slots error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
