const fs = require('fs');
const path = require('path');

const langs = ['tr', 'en', 'ar'];

const translations = {
  tr: {
    categories: {
      "Maliyet ve Planlama": "Maliyet ve Planlama",
      "Tedavi Yöntemleri": "Tedavi Yöntemleri",
      "İyileşme ve Bakım": "İyileşme ve Bakım",
      "Sık Sorulan Sorular": "Sık Sorulan Sorular",
      "Kalıcılık": "Kalıcılık",
      "Diğer": "Diğer"
    }
  },
  en: {
    categories: {
      "Maliyet ve Planlama": "Cost and Planning",
      "Tedavi Yöntemleri": "Treatment Methods",
      "İyileşme ve Bakım": "Recovery and Care",
      "Sık Sorulan Sorular": "Frequently Asked Questions",
      "Kalıcılık": "Permanence",
      "Diğer": "Other"
    }
  },
  ar: {
    categories: {
      "Maliyet ve Planlama": "التكلفة والتخطيط",
      "Tedavi Yöntemleri": "طرق العلاج",
      "İyileşme ve Bakım": "الشفاء والعناية",
      "Sık Sorulan Sorular": "أسئلة مكررة",
      "Kalıcılık": "الديمومة",
      "Diğer": "آخر"
    }
  }
};

langs.forEach(lang => {
  const filePath = path.join(__dirname, `data/content.${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.ui.knowledgeBase) data.ui.knowledgeBase = {};
  data.ui.knowledgeBase.categories = translations[lang].categories;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log('Category translations added.');
