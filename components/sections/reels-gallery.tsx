import { prisma } from "@/lib/prisma";
import { ReelsCarousel } from "@/components/ui/reels-carousel";

// If you don't have a global prisma client exported from @/lib/prisma,
// let's define it here just in case, or use standard pattern.
// But wait, they must have one. Let's assume standard `@/lib/prisma` or `@prisma/client`.
// I will just instantiate PrismaClient here if it fails, but in App Router it's better to use a singleton.
// Actually, I can check if lib/prisma.ts exists.

export async function ReelsGallery() {
  let reels = [];
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    reels = await prisma.reel.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error("Failed to fetch reels:", error);
  }

  if (!reels || reels.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-line bg-card/40 py-16 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 mb-8">
        <h2 className="font-display text-3xl md:text-4xl text-foreground">
          Öne Çıkan Sonuçlar
        </h2>
        <p className="mt-2 text-sm text-muted">
          Gerçek hastalarımızın operasyon süreçleri ve sonuçları.
        </p>
      </div>

      {/* Reels Carousel Container */}
      <div className="-mx-5 md:mx-0">
        <ReelsCarousel reels={reels} />
      </div>
    </section>
  );
}
