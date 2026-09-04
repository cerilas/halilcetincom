import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear old ones first
  await prisma.reel.deleteMany();

  const reels = [
    {
      videoUrl: "/insta-videos/reel-1.mp4",
      thumbnailUrl: null,
      profileName: "halilcetin",
      description: "Saç aşısı PRP Mezoterapi uzman ellerde! 🌟",
      likes: 1240,
      comments: 45,
      order: 1
    },
    {
      videoUrl: "/insta-videos/reel-2.mp4",
      thumbnailUrl: null,
      profileName: "halilcetin",
      description: "Kolejen Plazma Complex Saç Serumu ✨ Saç ve saç deriniz için profesyonel bakım zamanı!",
      likes: 856,
      comments: 21,
      order: 2
    },
    {
      videoUrl: "/insta-videos/reel-3.mp4",
      thumbnailUrl: null,
      profileName: "halilcetin",
      description: "Kolejen Plazma Saç Aşısı ✨ Saçlarınıza daha dolgun, daha güçlü ve daha canlı bir görünüm.",
      likes: 2100,
      comments: 89,
      order: 3
    },
    {
      videoUrl: "/insta-videos/reel-4.mp4",
      thumbnailUrl: null,
      profileName: "halilcetin",
      description: "Kolejen Plazma Saç Aşısı ile saç dökülmesine karşı güçlü koruma.",
      likes: 1540,
      comments: 63,
      order: 4
    },
    {
      videoUrl: "/insta-videos/reel-5.mp4",
      thumbnailUrl: null,
      profileName: "halilcetin",
      description: "Saçlarınıza Güçlü Bir Dokunuş! Kolejen Plazma Saç Aşısı ile saçlarınıza ihtiyaç duyduğu destek.",
      likes: 1102,
      comments: 34,
      order: 5
    },
    {
      videoUrl: "/insta-videos/reel-6.mp4",
      thumbnailUrl: null,
      profileName: "halilcetin",
      description: "Saçlarınıza Yeniden Güç Kazandırın! ✨ Saç aşısı uygulaması ile saç köklerini destekliyoruz.",
      likes: 980,
      comments: 41,
      order: 6
    }
  ];

  for (const reel of reels) {
    await prisma.reel.create({
      data: reel,
    });
  }

  console.log("Seeded real reels successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
