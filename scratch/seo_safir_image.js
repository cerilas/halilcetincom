const fs = require('fs');

const trAlt = "Gaziantep Safir FUE Saç Ekimi Operasyonu ve Kullanılan Gerçek Safir Uç";
const enAlt = "Sapphire FUE Hair Transplant Operation with Real Sapphire Blade in Gaziantep";
const arAlt = "عملية زراعة الشعر بتقنية السفير FUE مع شفرة الياقوت الحقيقية في غازي عنتاب";

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
      if (t.id === 'safir') {
        t.image = '/protocols/gaziantep-safir-fue-sac-ekimi-ucu.jpg';
        t.imageAlt = u.alt;
      }
    });
    
    fs.writeFileSync(u.file, JSON.stringify(data, null, 2) + '\n');
    console.log('Updated ' + u.file);
  }
});
