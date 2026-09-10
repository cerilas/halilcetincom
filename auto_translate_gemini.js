const { PrismaClient } = require('@prisma/client');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

async function translateArticle(article) {
  const prompt = `
Translate the following content into English and Arabic. 
Output exactly a JSON object (without any markdown formatting like \`\`\`json) with the following structure:
{
  "en": {
    "title": "...",
    "metaTitle": "...",
    "metaDescription": "...",
    "metaKeywords": "...",
    "contentHtml": "..."
  },
  "ar": {
    "title": "...",
    "metaTitle": "...",
    "metaDescription": "...",
    "metaKeywords": "...",
    "contentHtml": "..."
  }
}

Important: Keep all HTML tags intact in contentHtml.

Content to translate:
Title: ${article.title}
Meta Title: ${article.metaTitle || ""}
Meta Description: ${article.metaDescription || ""}
Meta Keywords: ${article.metaKeywords || ""}
HTML Content:
${article.contentHtml}
  `;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  } catch (e) {
    console.error("Gemini API Error for article ID", article.id, e.message);
    return null;
  }
}

async function main() {
  console.log("Fetching articles with empty translations...");
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { titleEn: null },
        { titleEn: "" }
      ]
    }
  });

  console.log(`Found ${articles.length} articles to translate with Gemini.`);

  let count = 0;
  for (const article of articles) {
    count++;
    console.log(`Translating [${count}/${articles.length}]: ${article.title}`);

    const translations = await translateArticle(article);
    
    if (translations && translations.en && translations.ar) {
      await prisma.article.update({
        where: { id: article.id },
        data: {
          titleEn: translations.en.title,
          contentHtmlEn: translations.en.contentHtml,
          metaTitleEn: translations.en.metaTitle,
          metaDescriptionEn: translations.en.metaDescription,
          metaKeywordsEn: translations.en.metaKeywords,
          titleAr: translations.ar.title,
          contentHtmlAr: translations.ar.contentHtml,
          metaTitleAr: translations.ar.metaTitle,
          metaDescriptionAr: translations.ar.metaDescription,
          metaKeywordsAr: translations.ar.metaKeywords
        }
      });
      console.log(`Saved translations for: ${article.title}`);
    } else {
      console.log(`Skipped (failed): ${article.title}`);
    }
    
    // Slight delay to avoid Gemini rate limits
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log("Gemini translation process completed successfully!");
}

main()
  .catch(e => {
    console.error("Script failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
