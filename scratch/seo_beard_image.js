const fs = require('fs');

const trAlt = "Gaziantep Sakal ve Kaş Ekimi Öncesi Sonrası Sonuçları";
const enAlt = "Beard and Eyebrow Transplant Before and After Results Gaziantep";
const arAlt = "نتائج زراعة اللحية والحواجب قبل وبعد في غازي عنتاب";

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
      if (t.id === 'beard') {
        t.image = '/protocols/gaziantep-sakal-kas-ekimi-oncesi-sonrasi.jpg';
        t.imageAlt = u.alt;
      }
    });
    
    fs.writeFileSync(u.file, JSON.stringify(data, null, 2) + '\n');
    console.log('Updated ' + u.file);
  }
});
