const fs = require('fs');
const path = require('path');

const langs = ['tr', 'en', 'ar'];

const translations = {
  tr: {
    knowledgeBase: {
      eyebrow: "Kütüphane",
      title: "Bilgi Bankası",
      description: "Saç ekimi, saç sağlığı ve medikal estetik hakkında bilimsel kaynaklara dayalı detaylı rehberler.",
      specialContentCount: "özel içerik",
      libraryHas: "Kütüphanede",
      found: "bulunuyor.",
      noMatch: "aramasıyla eşleşen makale bulunamadı.",
      noArticles: "Henüz makale bulunmamaktadır.",
      readAll: "Tümünü Oku",
      prev: "Önceki",
      next: "Sonraki",
      page: "Sayfa",
      backToLibrary: "← Kütüphaneye Dön"
    }
  },
  en: {
    knowledgeBase: {
      eyebrow: "Library",
      title: "Knowledge Base",
      description: "Detailed guides based on scientific sources about hair transplantation, hair health and medical aesthetics.",
      specialContentCount: "exclusive articles",
      libraryHas: "The library has",
      found: "available.",
      noMatch: "No articles matched your search.",
      noArticles: "There are no articles yet.",
      readAll: "Read Full Article",
      prev: "Previous",
      next: "Next",
      page: "Page",
      backToLibrary: "← Back to Library"
    }
  },
  ar: {
    knowledgeBase: {
      eyebrow: "المكتبة",
      title: "قاعدة المعرفة",
      description: "أدلة مفصلة تستند إلى مصادر علمية حول زراعة الشعر وصحة الشعر والجماليات الطبية.",
      specialContentCount: "مقال حصري",
      libraryHas: "تحتوي المكتبة على",
      found: "متاح.",
      noMatch: "لم يتم العثور على مقالات تطابق بحثك.",
      noArticles: "لا توجد مقالات حتى الآن.",
      readAll: "اقرأ المقال كاملاً",
      prev: "السابق",
      next: "التالي",
      page: "صفحة",
      backToLibrary: "← العودة إلى المكتبة"
    }
  }
};

langs.forEach(lang => {
  const filePath = path.join(__dirname, `data/content.${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.ui.knowledgeBase) data.ui.knowledgeBase = {};
  data.ui.knowledgeBase = translations[lang].knowledgeBase;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log('Knowledge Base UI strings added.');
