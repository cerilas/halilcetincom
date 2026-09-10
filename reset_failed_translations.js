const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany();
  let resetCount = 0;

  for (const article of articles) {
    if (article.titleEn === article.title || article.titleAr === article.title) {
      await prisma.article.update({
        where: { id: article.id },
        data: {
          titleEn: null,
          contentHtmlEn: null,
          metaTitleEn: null,
          metaDescriptionEn: null,
          metaKeywordsEn: null,
          titleAr: null,
          contentHtmlAr: null,
          metaTitleAr: null,
          metaDescriptionAr: null,
          metaKeywordsAr: null
        }
      });
      resetCount++;
    }
  }

  console.log(`Reset ${resetCount} failed translations.`);
}

main().finally(() => prisma.$disconnect());
