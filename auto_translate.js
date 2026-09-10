const { PrismaClient } = require('@prisma/client');
const { translate } = require('@vitalets/google-translate-api');

const prisma = new PrismaClient();

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function safeTranslate(text, to) {
  if (!text) return null;
  try {
    const res = await translate(text, { to });
    return res.text;
  } catch (e) {
    console.error(`Translation error to ${to}:`, e.message);
    return text; // fallback to original if failed
  }
}

async function main() {
  console.log("Fetching articles...");
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { titleEn: null },
        { titleEn: "" }
      ]
    }
  });

  console.log(`Found ${articles.length} articles to translate.`);

  let count = 0;
  for (const article of articles) {
    count++;
    console.log(`Translating [${count}/${articles.length}]: ${article.title}`);

    // EN Translations
    const titleEn = await safeTranslate(article.title, 'en');
    const contentHtmlEn = await safeTranslate(article.contentHtml, 'en');
    const metaTitleEn = await safeTranslate(article.metaTitle, 'en');
    const metaDescriptionEn = await safeTranslate(article.metaDescription, 'en');
    const metaKeywordsEn = await safeTranslate(article.metaKeywords, 'en');

    // AR Translations
    const titleAr = await safeTranslate(article.title, 'ar');
    const contentHtmlAr = await safeTranslate(article.contentHtml, 'ar');
    const metaTitleAr = await safeTranslate(article.metaTitle, 'ar');
    const metaDescriptionAr = await safeTranslate(article.metaDescription, 'ar');
    const metaKeywordsAr = await safeTranslate(article.metaKeywords, 'ar');

    await prisma.article.update({
      where: { id: article.id },
      data: {
        titleEn,
        contentHtmlEn,
        metaTitleEn,
        metaDescriptionEn,
        metaKeywordsEn,
        titleAr,
        contentHtmlAr,
        metaTitleAr,
        metaDescriptionAr,
        metaKeywordsAr
      }
    });

    console.log(`Saved translations for: ${article.title}`);
    
    // Add a delay to avoid rate limiting
    await delay(1500); 
  }

  console.log("Translation process completed successfully!");
}

main()
  .catch(e => {
    console.error("Script failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
