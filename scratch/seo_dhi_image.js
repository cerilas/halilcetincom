const fs = require('fs');

const trAlt = "Gaziantep DHI Saç Ekimi Tepe Bölgesi Öncesi ve Sonrası Sonuçları";
const enAlt = "DHI Hair Transplant Crown Area Before and After Results Gaziantep";
const arAlt = "نتائج زراعة الشعر بتقنية DHI في منطقة التاج قبل وبعد في غازي عنتاب";

const updates = [
  { file: 'data/content.json', alt: trAlt },
  { file: 'data/content.tr.json', alt: trAlt },
  { file: 'data/content.en.json', alt: enAlt },
  { file: 'data/content.ar.json', alt: arAlt }
];

updates.forEach(u => {
  if (fs.existsSync(u.file)) {
    const data = JSON.parse(fs.readFileSync(u.file, 'utf8'));
    
    data.treatments.forEach(t => {
      if (t.id === 'dhi') {
        t.image = '/protocols/gaziantep-dhi-sac-ekimi-tepe-bolgesi-sonuclari.jpg';
        t.imageAlt = u.alt;
      }
    });
    
    fs.writeFileSync(u.file, JSON.stringify(data, null, 2) + '\n');
    console.log('Updated ' + u.file);
  }
});
