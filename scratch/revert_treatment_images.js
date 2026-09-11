const fs = require('fs');

const files = [
  'data/content.json',
  'data/content.tr.json',
  'data/content.en.json',
  'data/content.ar.json'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    
    data.treatments.forEach(t => {
      if (t.id === 'fue') t.image = '/protocols/dogal-sac-cizgisi-tasarimi-fue.jpg';
      if (t.id === 'dhi') t.image = '/protocols/tepe-bolgesi-sac-ekimi-sonuclari.jpg';
      if (t.id === 'safir') t.image = '/protocols/safir-fue-sac-ekimi-operasyonu.png';
      if (t.id === 'beard') t.image = '/protocols/sakal-ve-biyik-ekimi-gaziantep.png';
    });
    
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
    console.log('Reverted ' + file);
  }
});
