const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = process.cwd();

// Map of OLD relative path -> NEW relative path
const renames = {
  // Root
  "halil-cetin-bg.png": "uzman-halil-cetin-sac-ekimi-gaziantep-bg.png",
  "halil-cetin-fg.png": "uzman-halil-cetin-sac-ekimi-gaziantep-fg.png",
  "halil-cetin-portrait.jpg": "sac-ekim-uzmani-halil-cetin-portre.jpg",
  "halil-cetin-action.jpg": "halil-cetin-sac-ekimi-operasyonu.jpg",
  "halil-cetin.jpg": "gaziantep-en-iyi-sac-ekim-uzmani.jpg",
  "doctor.jpg": "halil-cetin-hair-transplant-doktor.jpg",
  "doctor2.png": "halil-cetin-hair-transplant-doktor2.png",
  "blog-placeholder.jpg": "sac-ekimi-bilgi-bankasi-gorsel.jpg",
  "hero-optimized.mp4": "safir-fue-sac-ekimi-oncesi-sonrasi-gaziantep.mp4",
  
  // Protocols
  "protocols/hairline.jpg": "protocols/dogal-sac-cizgisi-tasarimi-fue.jpg",
  "protocols/operation.png": "protocols/safir-fue-sac-ekimi-operasyonu.png",
  "protocols/crown.jpg": "protocols/tepe-bolgesi-sac-ekimi-sonuclari.jpg",
  "protocols/beard.png": "protocols/sakal-ve-biyik-ekimi-gaziantep.png",

  // Results
  "results/before.png": "results/sac-ekimi-oncesi.png",
  "results/after.png": "results/sac-ekimi-sonrasi-12-ay.png",
  "results/after-video.mp4": "results/sac-ekimi-sonrasi-video.mp4",
  "results/after-video.mov": "results/sac-ekimi-sonrasi-video.mov",
  "results/before_new.png": "results/sac-ekimi-oncesi-tepe-bolgesi.png",
  "results/after_new.png": "results/sac-ekimi-sonrasi-dogal-gorunum.png",
  "results/before_new.jpg": "results/sac-ekimi-oncesi-tepe-bolgesi.jpg",
  "results/after_new.jpg": "results/sac-ekimi-sonrasi-dogal-gorunum.jpg",
};

// 1. Rename Gallery Folder first if it exists
const oldGallery = path.join(rootDir, "public", "oncesi-sonrasi galeri");
const newGallery = path.join(rootDir, "public", "sac-ekimi-oncesi-sonrasi-sonuclari");

if (fs.existsSync(oldGallery)) {
  fs.renameSync(oldGallery, newGallery);
  console.log('Renamed gallery folder.');
}

// Map the gallery images
for (let i = 1; i <= 10; i++) {
  renames[`oncesi-sonrasi galeri/${i}.jpg`] = `sac-ekimi-oncesi-sonrasi-sonuclari/gaziantep-sac-ekimi-sonuclari-${i}.jpg`;
  // The script will need to look in newGallery since we just renamed the folder
}

// 2. Rename files
Object.entries(renames).forEach(([oldPath, newPath]) => {
  let actualOldPath = path.join(rootDir, 'public', oldPath);
  
  // Handle the gallery files that are already inside the new directory
  if (oldPath.startsWith('oncesi-sonrasi galeri/')) {
    const filename = path.basename(oldPath);
    actualOldPath = path.join(newGallery, filename);
  }

  const actualNewPath = path.join(rootDir, 'public', newPath);

  if (fs.existsSync(actualOldPath)) {
    fs.renameSync(actualOldPath, actualNewPath);
    console.log(`Renamed: ${oldPath} -> ${newPath}`);
  }
});

// 3. Update references in code
// Folders to search: app, components, lib, data
const searchDirs = ['app', 'components', 'lib', 'data'];

function walkAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkAndReplace(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.json') || file.endsWith('.md')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      Object.entries(renames).forEach(([oldPath, newPath]) => {
        // Replace absolute paths e.g. /halil-cetin.jpg
        const escapedOld = oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`/${escapedOld}`, 'g');
        content = content.replace(regex, `/${newPath}`);
      });

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated references in: ${fullPath}`);
      }
    }
  }
}

searchDirs.forEach(dir => {
  const fullDir = path.join(rootDir, dir);
  if (fs.existsSync(fullDir)) {
    walkAndReplace(fullDir);
  }
});

console.log('SEO Media Renaming Complete!');
