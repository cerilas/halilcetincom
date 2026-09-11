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
      if (t.id === 'beard') t.image = '/protocols/sakal-ve-biyik-ekimi-gaziantep.png';
    });
    
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
    console.log('Reverted ' + file);
  }
});
