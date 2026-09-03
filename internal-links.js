const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  console.log('Starting internal linking process...');
  const articles = await prisma.article.findMany();
  let updatedCount = 0;

  for (const article of articles) {
    let content = article.contentHtml;
    let modified = false;

    const replacements = [
      {
        keyword: /(?<!<[^>]*)(?<!<a[^>]*>.*?)\b(saç ekimi)\b(?!.*<\/a>)(?![^<]*>)/i,
        link: '<a href="/tedaviler" class="text-gold hover:underline font-medium">saç ekimi</a>'
      },
      {
        keyword: /(?<!<[^>]*)(?<!<a[^>]*>.*?)\b(Halil Çetin)\b(?!.*<\/a>)(?![^<]*>)/i,
        link: '<a href="/halil-cetin-kimdir" class="text-gold hover:underline font-medium">Halil Çetin</a>'
      },
      {
        keyword: /(?<!<[^>]*)(?<!<a[^>]*>.*?)\b(ücretsiz analiz)\b(?!.*<\/a>)(?![^<]*>)/i,
        link: '<a href="/iletisim" class="text-gold hover:underline font-medium">ücretsiz analiz</a>'
      },
      {
        keyword: /(?<!<[^>]*)(?<!<a[^>]*>.*?)\b(safir fue)\b(?!.*<\/a>)(?![^<]*>)/i,
        link: '<a href="/tedaviler/safir-fue-sac-ekimi" class="text-gold hover:underline font-medium">Safir FUE</a>'
      }
    ];

    for (const rule of replacements) {
      if (rule.keyword.test(content) && !content.includes(rule.link)) {
        content = content.replace(rule.keyword, rule.link);
        modified = true;
      }
    }

    if (modified) {
      await prisma.article.update({
        where: { id: article.id },
        data: { contentHtml: content }
      });
      updatedCount++;
    }
  }

  console.log(`Internal linking complete! Updated ${updatedCount} articles.`);
}

run()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
