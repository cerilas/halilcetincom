const fs = require('fs');
const path = require('path');

const langs = ['tr', 'en', 'ar'];

const translations = {
  tr: {
    marquee: [
      "FUE",
      "DHI",
      "Safir FUE",
      "Sakal ekimi",
      "Doğal saç çizgisi",
      "12 ay takip",
      "Gaziantep"
    ]
  },
  en: {
    marquee: [
      "FUE",
      "DHI",
      "Sapphire FUE",
      "Beard Transplant",
      "Natural Hairline",
      "12 Months Follow-up",
      "Gaziantep"
    ]
  },
  ar: {
    marquee: [
      "FUE",
      "DHI",
      "السفير FUE",
      "زراعة اللحية",
      "خط شعر طبيعي",
      "متابعة لمدة 12 شهرًا",
      "غازي عنتاب"
    ]
  }
};

langs.forEach(lang => {
  const filePath = path.join(__dirname, `data/content.${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.ui.home) data.ui.home = {};
  data.ui.home.marquee = translations[lang].marquee;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log('Marquee updates complete.');
