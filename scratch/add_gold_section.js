const fs = require('fs');

const trData = {
  eyebrow: "PREMIUM DENEYİM",
  title: "Gold Saç Ekimi",
  description: "Altın uçlu özel medikal enstrümanlar kullanılarak gerçekleştirilen bu yenilikçi teknik, doku hasarını minimuma indirirken iyileşme hızını en üst seviyeye çıkarır. Saç ekiminde lüks ve konforun birleşimi.",
  features: [
    "Daha Hızlı İyileşme Süreci",
    "Sıfır Doku Hasarı Garantisi",
    "Doğal Altın Oran Tasarımı",
    "İzsiz ve Ağrısız Operasyon"
  ],
  cta: "Hemen Randevu Al"
};

const enData = {
  eyebrow: "PREMIUM EXPERIENCE",
  title: "Gold Hair Transplant",
  description: "Performed using exclusive gold-tipped medical instruments, this innovative technique minimizes tissue damage while maximizing healing speed. The perfect combination of luxury and comfort in hair transplantation.",
  features: [
    "Faster Healing Process",
    "Zero Tissue Damage",
    "Natural Golden Ratio Design",
    "Scarless and Painless Operation"
  ],
  cta: "Book an Appointment Now"
};

const arData = {
  eyebrow: "تجربة مميزة",
  title: "زراعة الشعر الذهبية",
  description: "يتم تنفيذ هذه التقنية المبتكرة باستخدام أدوات طبية حصرية ذات أطراف ذهبية، مما يقلل من تلف الأنسجة إلى أدنى حد مع زيادة سرعة الشفاء إلى أقصى حد. المزيج المثالي بين الفخامة والراحة في زراعة الشعر.",
  features: [
    "عملية شفاء أسرع",
    "صفر تلف للأنسجة",
    "تصميم النسبة الذهبية الطبيعية",
    "عملية بدون ندبات أو ألم"
  ],
  cta: "احجز موعداً الآن"
};

const updates = [
  { file: 'data/content.json', data: trData },
  { file: 'data/content.tr.json', data: trData },
  { file: 'data/content.en.json', data: enData },
  { file: 'data/content.ar.json', data: arData }
];

updates.forEach(u => {
  if (fs.existsSync(u.file)) {
    const json = JSON.parse(fs.readFileSync(u.file, 'utf8'));
    
    if (json.ui && json.ui.home) {
      json.ui.home.goldSection = u.data;
    }
    
    fs.writeFileSync(u.file, JSON.stringify(json, null, 2) + '\n');
    console.log('Updated ' + u.file);
  }
});
