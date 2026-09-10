const fs = require('fs');
const path = require('path');

const files = [
  'app/[lang]/bilgi-bankasi/page.tsx',
  'app/[lang]/bilgi-bankasi/[slug]/page.tsx',
  'app/[lang]/cerez-politikasi/page.tsx',
  'app/[lang]/gizlilik-politikasi/page.tsx',
  'app/[lang]/halil-cetin-kimdir/page.tsx',
  'app/[lang]/iletisim/page.tsx',
  'app/[lang]/kullanim-kosullari/page.tsx',
  'app/[lang]/kvkk/page.tsx',
  'app/[lang]/randevu/page.tsx',
  'app/[lang]/surec/page.tsx',
  'app/[lang]/tedaviler/page.tsx',
  'app/[lang]/tedaviler/[slug]/page.tsx',
  'app/[lang]/yasal-uyari/page.tsx'
];

for (const f of files) {
  const p = path.join(__dirname, f);
  if (!fs.existsSync(p)) continue;
  let content = fs.readFileSync(p, 'utf8');

  // Fix component signature
  content = content.replace(
    /export default async function ([a-zA-Z0-9_]+)\(\) {/,
    'export default async function $1({ params }: { params: { lang: string } }) {'
  );
  
  // Fix signature for dynamic routes which already have params: { slug: string }
  content = content.replace(
    /export default async function ([a-zA-Z0-9_]+)\(\{\s*params,\s*\}\s*:\s*\{\s*params:\s*\{\s*slug:\s*string\s*\}\s*\}\) {/,
    'export default async function $1({ params }: { params: { slug: string, lang: string } }) {'
  );
  // Also try without comma
  content = content.replace(
    /export default async function ([a-zA-Z0-9_]+)\(\{\s*params\s*\}\s*:\s*\{\s*params:\s*\{\s*slug:\s*string\s*\}\s*\}\) {/,
    'export default async function $1({ params }: { params: { slug: string, lang: string } }) {'
  );

  // Fix getContent
  content = content.replace(/getContent\(\)/g, 'getContent(params.lang)');
  
  // Fix generateMetadata
  content = content.replace(
    /export async function generateMetadata\(\)/,
    'export async function generateMetadata({ params }: { params: { lang: string } })'
  );
  
  content = content.replace(
    /export async function generateMetadata\(\{\s*params\s*\}\s*:\s*\{\s*params:\s*\{\s*slug:\s*string\s*\}\s*\}\)/,
    'export async function generateMetadata({ params }: { params: { slug: string, lang: string } })'
  );

  fs.writeFileSync(p, content, 'utf8');
  console.log(`Updated ${f}`);
}
