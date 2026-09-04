import { prisma } from "@/lib/db";
import { ReelsCarousel } from "@/components/ui/reels-carousel";

export async function ReelsGallery() {
  let reels: any[] = [];
  try {
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
