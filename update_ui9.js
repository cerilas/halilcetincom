const fs = require('fs');
const path = require('path');

const langs = ['tr', 'en', 'ar'];

const translations = {
  tr: {
    treatment: {
      pageTitle: "Teknikler, yüzünüze göre.",
      pageSubtitle: "Her yöntem bir pazarlama adı değil; donör, yoğunluk ve çizgi ihtiyacına göre seçilen bir araçtır.",
      backToTreatments: "← Tedaviler",
      analyzeBtn: "Bu tedavi için analiz",
      imageAltSuffix: "- Saç Ekimi Operasyonu"
    }
  },
  en: {
    treatment: {
      pageTitle: "Techniques, tailored to your face.",
      pageSubtitle: "Each method is not just a marketing name; it is a tool chosen based on donor, density and hairline needs.",
      backToTreatments: "← Treatments",
      analyzeBtn: "Analysis for this treatment",
      imageAltSuffix: "- Hair Transplant Operation"
    }
  },
  ar: {
    treatment: {
      pageTitle: "التقنيات، مصممة لوجهك.",
      pageSubtitle: "كل طريقة ليست مجرد اسم تسويقي؛ إنها أداة يتم اختيارها بناءً على المانح والكثافة واحتياجات خط الشعر.",
      backToTreatments: "← العلاجات",
      analyzeBtn: "تحليل لهذا العلاج",
      imageAltSuffix: "- عملية زراعة الشعر"
    }
  }
};

langs.forEach(lang => {
  const filePath = path.join(__dirname, `data/content.${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.ui.treatment) data.ui.treatment = {};
  data.ui.treatment = translations[lang].treatment;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log('Treatment UI strings added.');
