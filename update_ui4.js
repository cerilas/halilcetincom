const fs = require('fs');
const path = require('path');

const langs = ['tr', 'en', 'ar'];

const translations = {
  tr: {
    bio: {
      founderTitle: "Kurucu & Saç Ekim Uzmanı",
      expertiseAndTrust: "Uzmanlık ve Güven",
      experience: "Saç Ekim Deneyimi",
      description: "Yılların tecrübesi, doğal sonuçlar ve memnun hastalar. Saç ekiminde güvenilir ellerdesiniz.",
      button: "Saç Ekim Uzmanı Halil Çetin"
    }
  },
  en: {
    bio: {
      founderTitle: "Founder & Hair Transplant Specialist",
      expertiseAndTrust: "Expertise and Trust",
      experience: "Hair Transplant Experience",
      description: "Years of experience, natural results, and satisfied patients. You are in safe hands for hair transplantation.",
      button: "Hair Transplant Specialist Halil Çetin"
    }
  },
  ar: {
    bio: {
      founderTitle: "المؤسس وأخصائي زراعة الشعر",
      expertiseAndTrust: "الخبرة والثقة",
      experience: "خبرة في زراعة الشعر",
      description: "سنوات من الخبرة، ونتائج طبيعية، ومرضى راضون. أنت في أيد أمينة في زراعة الشعر.",
      button: "أخصائي زراعة الشعر خليل جتين"
    }
  }
};

langs.forEach(lang => {
  const filePath = path.join(__dirname, `data/content.${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.ui) data.ui = {};
  data.ui.bio = translations[lang].bio;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log('UI bio updates complete.');
