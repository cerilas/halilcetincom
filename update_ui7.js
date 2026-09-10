const fs = require('fs');
const path = require('path');

const langs = ['tr', 'en', 'ar'];

const translations = {
  tr: {
    reelsTitle: "Öne Çıkan Sonuçlar",
    reelsSubtitle: "Gerçek hastalarımızın operasyon süreçleri ve sonuçları.",
    processEyebrow: "Süreç",
    processTitle: "Kusursuz Sonuca Giden 6 Adım."
  },
  en: {
    reelsTitle: "Featured Results",
    reelsSubtitle: "Operation processes and results of our real patients.",
    processEyebrow: "Process",
    processTitle: "6 Steps to Perfect Results."
  },
  ar: {
    reelsTitle: "النتائج المميزة",
    reelsSubtitle: "عمليات ونتائج مرضانا الحقيقيين.",
    processEyebrow: "العملية",
    processTitle: "6 خطوات لنتائج مثالية."
  }
};

langs.forEach(lang => {
  const filePath = path.join(__dirname, `data/content.${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.ui.home) data.ui.home = {};
  Object.assign(data.ui.home, translations[lang]);
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log('UI reels & process updates complete.');
