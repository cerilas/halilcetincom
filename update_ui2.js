const fs = require('fs');
const path = require('path');

const langs = ['tr', 'en', 'ar'];

const translations = {
  tr: {
    cta: {
      eyebrow: "Ücretsiz analiz",
      title: "Fotoğrafınızı gönderin. Hemen ücretsiz saç ekim analizinizi alın.",
      fillForm: "Formu doldur",
      whatsapp: "WhatsApp"
    },
    gallery: {
      eyebrow: "Kanıtlanmış Sonuçlar",
      title: "Halil Çetin ile Büyük Değişim.",
      before: "Öncesi",
      after: "Sonrası",
      monthsLater: "ay sonra",
      loadMore: "Daha fazla sonuç yükle"
    },
    whatsappAnalysis: "Merhaba, ücretsiz saç ekimi analizi için ulaşıyorum."
  },
  en: {
    cta: {
      eyebrow: "Free Analysis",
      title: "Send your photo. Get your free hair transplant analysis now.",
      fillForm: "Fill the form",
      whatsapp: "WhatsApp"
    },
    gallery: {
      eyebrow: "Proven Results",
      title: "Great Transformation with Halil Çetin.",
      before: "Before",
      after: "After",
      monthsLater: "months later",
      loadMore: "Load more results"
    },
    whatsappAnalysis: "Hello, I am contacting you for a free hair transplant analysis."
  },
  ar: {
    cta: {
      eyebrow: "تحليل مجاني",
      title: "أرسل صورتك. احصل على تحليل مجاني لزراعة الشعر الآن.",
      fillForm: "املأ النموذج",
      whatsapp: "واتساب"
    },
    gallery: {
      eyebrow: "نتائج مثبتة",
      title: "تغيير كبير مع خليل جتين.",
      before: "قبل",
      after: "بعد",
      monthsLater: "أشهر",
      loadMore: "تحميل المزيد من النتائج"
    },
    whatsappAnalysis: "مرحباً، أتواصل معك للحصول على تحليل مجاني لزراعة الشعر."
  }
};

langs.forEach(lang => {
  const filePath = path.join(__dirname, `data/content.${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.ui) data.ui = {};
  data.ui.cta = translations[lang].cta;
  data.ui.gallery = translations[lang].gallery;
  data.ui.whatsappAnalysis = translations[lang].whatsappAnalysis;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log('UI updates complete.');
