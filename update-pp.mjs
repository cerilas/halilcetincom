import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.reel.updateMany({
    data: {
      profilePic: "/sac-ekim-uzmani-halil-cetin-portre.jpg"
    }
  });

  console.log("Profile pictures updated!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
