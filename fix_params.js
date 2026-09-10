const fs = require('fs');
const path = require('path');

const files = [
  'app/[lang]/halil-cetin-kimdir/page.tsx',
  'app/[lang]/cerez-politikasi/page.tsx',
  'app/[lang]/yasal-uyari/page.tsx',
  'app/[lang]/iletisim/page.tsx',
  'app/[lang]/kullanim-kosullari/page.tsx',
  'app/[lang]/gizlilik-politikasi/page.tsx',
  'app/[lang]/surec/page.tsx',
  'app/[lang]/kvkk/page.tsx',
  'app/[lang]/bilgi-bankasi/page.tsx',
  'app/[lang]/bilgi-bankasi/[slug]/page.tsx',
  'app/[lang]/randevu/page.tsx',
  'app/[lang]/page.tsx',
  'app/[lang]/tedaviler/page.tsx',
  'app/[lang]/tedaviler/[slug]/page.tsx',
  'app/[lang]/layout.tsx'
];

for (const f of files) {
  const p = path.join(__dirname, f);
  if (!fs.existsSync(p)) continue;
  let content = fs.readFileSync(p, 'utf8');

  // Fix generateMetadata
  content = content.replace(
    /export async function generateMetadata\(\{\s*params\s*\}\s*:\s*\{\s*params:\s*\{\s*lang:\s*string\s*\}\s*\}\)(\s*:\s*Promise<Metadata>)?\s*\{/,
    'export async function generateMetadata(props: { params: Promise<{ lang: string }> })$1 {\n  const params = await props.params;'
  );

  content = content.replace(
    /export async function generateMetadata\(\{\s*params\s*\}\s*:\s*\{\s*params:\s*\{\s*slug:\s*string,\s*lang:\s*string\s*\}\s*\}\)(\s*:\s*Promise<Metadata>)?\s*\{/,
    'export async function generateMetadata(props: { params: Promise<{ slug: string, lang: string }> })$1 {\n  const params = await props.params;'
  );

  // Fix Page components
  content = content.replace(
    /export default async function ([a-zA-Z0-9_]+)\(\{\s*params\s*\}\s*:\s*\{\s*params:\s*\{\s*lang:\s*string\s*\}\s*\}\)\s*\{/,
    'export default async function $1(props: { params: Promise<{ lang: string }> }) {\n  const params = await props.params;'
  );

  content = content.replace(
    /export default async function ([a-zA-Z0-9_]+)\(\{\s*params\s*\}\s*:\s*\{\s*params:\s*\{\s*slug:\s*string,\s*lang:\s*string\s*\}\s*\}\)\s*\{/,
    'export default async function $1(props: { params: Promise<{ slug: string, lang: string }> }) {\n  const params = await props.params;'
  );

  // Fix Layout component
  content = content.replace(
    /export default async function ([a-zA-Z0-9_]+)\(\{\s*children,\s*params,?\s*\}\s*:\s*\{\s*children:\s*React\.ReactNode;\s*params:\s*\{\s*lang:\s*string\s*\}\s*;?\s*\}\)\s*\{/,
    'export default async function $1({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {\n  const resolvedParams = await params;\n  const lang = resolvedParams.lang;'
  );
  
  // Update params.lang usage in layout
  if (f.endsWith('layout.tsx')) {
    content = content.replace(/params\.lang/g, 'lang');
  }

  fs.writeFileSync(p, content, 'utf8');
  console.log(`Fixed params in ${f}`);
}
