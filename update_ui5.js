const fs = require('fs');
const path = require('path');

const langs = ['tr', 'en', 'ar'];

const translations = {
  tr: {
    home: {
      treatmentsEyebrow: "Tedaviler",
      treatmentsTitle: "Protokole göre, pakete göre değil.",
      allTreatments: "Tüm tedaviler",
      testimonialsEyebrow: "Danışanlar",
      faqTitle: "Sık sorulanlar"
    }
  },
  en: {
    home: {
      treatmentsEyebrow: "Treatments",
      treatmentsTitle: "Based on protocol, not by package.",
      allTreatments: "All treatments",
      testimonialsEyebrow: "Patients",
      faqTitle: "Frequently asked questions"
    }
  },
  ar: {
    home: {
      treatmentsEyebrow: "العلاجات",
      treatmentsTitle: "حسب البروتوكول، وليس الباقة.",
      allTreatments: "جميع العلاجات",
      testimonialsEyebrow: "المرضى",
      faqTitle: "أسئلة مكررة"
    }
  }
};

langs.forEach(lang => {
  const filePath = path.join(__dirname, `data/content.${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.ui) data.ui = {};
  data.ui.home = translations[lang].home;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log('UI home sections complete.');
