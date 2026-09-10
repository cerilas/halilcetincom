const fs = require('fs');
const path = require('path');

const langs = ['tr', 'en', 'ar'];

const translations = {
  tr: {
    swipeHint: "Kaydırın · 12. ay sonuç",
    developedBy: "Cerilas tarafından geliştirildi",
    adminPanel: "Yönetim Paneli"
  },
  en: {
    swipeHint: "Swipe · 12 months result",
    developedBy: "Developed by Cerilas",
    adminPanel: "Admin Panel"
  },
  ar: {
    swipeHint: "مرر · نتيجة 12 شهرًا",
    developedBy: "تم التطوير بواسطة Cerilas",
    adminPanel: "لوحة الإدارة"
  }
};

langs.forEach(lang => {
  const filePath = path.join(__dirname, `data/content.${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.ui.home) data.ui.home = {};
  data.ui.home.swipeHint = translations[lang].swipeHint;
  
  if (!data.ui.footer) data.ui.footer = {};
  data.ui.footer.developedBy = translations[lang].developedBy;
  data.ui.footer.adminPanel = translations[lang].adminPanel;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log('Final small UI strings added.');
