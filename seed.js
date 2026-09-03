const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Veritabanı...");

  const articles = [
    {
      slug: "sac-ekimi-fiyatlari-2026",
      category: "Maliyet ve Planlama",
      title: "Saç Ekimi Fiyatları 2026: Maliyetleri Belirleyen Faktörler Nelerdir?",
      metaTitle: "2026 Saç Ekimi Fiyatları ve Maliyet Faktörleri | Halil Çetin",
      metaDescription: "2026 yılı saç ekimi fiyatlarını belirleyen temel faktörleri, kullanılan yöntemlerin maliyetlere etkisini ve Türkiye'deki fiyat aralıklarını öğrenin.",
      metaKeywords: "saç ekimi fiyatları 2026, saç ekimi ne kadar, fue fiyatları, dhi saç ekimi fiyatı, saç ekim maliyeti",
      contentHtml: `
        <h2>Saç Ekimi Fiyatlarını Neler Belirliyor?</h2>
        <p>Saç ekimi maliyetleri, her hastanın ihtiyacına ve kliniğin sunduğu olanaklara göre değişiklik gösterir. 2026 yılında saç ekimi fiyatlarını belirleyen en önemli faktörler şunlardır:</p>
        <ul>
          <li><strong>Kullanılan Teknik:</strong> FUE, DHI veya Safir FUE gibi yöntemler arasında fiyat farklılıkları bulunur. DHI (Direct Hair Implantation) genellikle özel medikal kalemler (Choi) kullanıldığı için FUE yöntemine kıyasla daha maliyetlidir.</li>
          <li><strong>Greft Sayısı:</strong> İhtiyacınız olan saç kökü (greft) sayısı, operasyonun süresini ve harcanan eforu doğrudan etkiler. Bu nedenle geniş açıklıklı alanlarda maliyet daha yüksek olabilir.</li>
          <li><strong>Uzmanlık ve Deneyim:</strong> Operasyonun bir doktor liderliğinde yapılması, kliniğin kalite standartları ve ekibin deneyimi fiyatı belirleyen temel unsurlardır.</li>
        </ul>
        <h3>Kalite ve Başarı Oranının Önemi</h3>
        <p>Saç ekimi fiyat araştırması yaparken sadece maliyete odaklanmak, istenmeyen sonuçlara yol açabilir. Kalıcı, doğal görünümlü ve sağlıklı bir sonuç için, alanında uzman bir ekibin cerrahi titizlikle uyguladığı tedavileri seçmek en doğru yatırımdır.</p>
        <p>Klinik olarak hastalarımıza en uygun bütçeyle en yüksek kaliteyi sunmak için şeffaf fiyatlandırma politikası izliyoruz. Ücretsiz saç analizinizi yaptırarak kişisel bütçe planlamanızı hemen öğrenebilirsiniz.</p>
      `,
    },
    {
      slug: "fue-vs-dhi-sac-ekimi-yontemleri",
      category: "Tedavi Yöntemleri",
      title: "FUE mi, DHI mi? Hangi Saç Ekimi Yöntemi Size Daha Uygun?",
      metaTitle: "FUE ve DHI Saç Ekimi Karşılaştırması - Hangisi Daha İyi?",
      metaDescription: "FUE ve DHI saç ekimi yöntemleri arasındaki farklar nelerdir? Kendi saç yapınıza ve dökülme tipinize en uygun olan tekniği keşfedin.",
      metaKeywords: "fue mi dhi mi, dhi saç ekimi, fue saç ekimi, saç ekim yöntemleri, safir fue farkı",
      contentHtml: `
        <h2>FUE ve DHI Arasındaki Temel Farklar</h2>
        <p>Günümüzde en çok tercih edilen iki saç ekimi yöntemi FUE (Foliküler Ünite Ekstraksiyonu) ve DHI (Doğrudan Saç Ekimi) teknikleridir. İkisi de son derece başarılı sonuçlar verir ancak uygulama şekilleri farklıdır.</p>
        <h3>FUE Yöntemi</h3>
        <p>FUE yönteminde saç kökleri dönör alandan tek tek toplanır, ardından ekim yapılacak alanda mikro kanallar açılır ve bu kökler kanallara yerleştirilir. <strong>Geniş alanların</strong> kapatılmasında çok hızlı ve etkilidir. Özel uçlu bıçakların kullanıldığı Safir FUE ise iyileşme süresini daha da kısaltır.</p>
        <h3>DHI Yöntemi</h3>
        <p>DHI yönteminde ise kanal açma ve kök yerleştirme işlemi 'Choi Pen' adı verilen özel medikal kalemlerle aynı anda yapılır. <strong>Sıklaştırma işlemleri</strong> ve <strong>tıraşsız saç ekimi</strong> için idealdir. Daha yoğun ve doğal bir ön hat planlamasında çok avantajlıdır.</p>
        <p>Hangi yöntemin sizin için doğru olduğu, saçınızın seyrekliğine, saç telinizin kalınlığına ve beklentilerinize göre doktor kontrolünde belirlenmelidir.</p>
      `,
    },
    {
      slug: "sac-ekimi-sonrasi-iyilesme-sureci",
      category: "İyileşme ve Bakım",
      title: "Saç Ekimi Sonrası İyileşme Süreci: Adım Adım Rehber",
      metaTitle: "Saç Ekimi Sonrası İyileşme Süreci - Gün Gün Bakım Rehberi",
      metaDescription: "Saç ekimi sonrasında ilk yıkama, kabuk dökme, şok dökülme ve sonuçların görünmesi. Detaylı saç ekimi sonrası bakım rehberi.",
      metaKeywords: "saç ekimi sonrası, şok dökülme, ilk yıkama, saç ekimi iyileşme süreci, kabuk dökme",
      contentHtml: `
        <h2>İlk 15 Gün: Hassas Dönem</h2>
        <p>Saç ekimi sonrası iyileşme sürecinin en kritik evresi ilk 15 gündür. Doğru bakım, ekilen köklerin tutunması için hayati önem taşır.</p>
        <ul>
          <li><strong>1.-3. Gün:</strong> Ekilen bölgede hafif kızarıklık ve kabuklanmalar başlar. İlk yıkama klinikte uzmanlar tarafından gerçekleştirilir. Yatış pozisyonuna çok dikkat edilmeli, sırt üstü yatılmalıdır.</li>
          <li><strong>4.-10. Gün:</strong> Klinikte gösterilen şekilde günlük yıkamalara devam edilir. 10. gün civarında 'kabuk dökme' işlemi gerçekleştirilir ve kafa derisi nefes alır.</li>
        </ul>
        <h3>Şok Dökülme ve Yeniden Çıkış (1. - 3. Ay)</h3>
        <p>Operasyondan 3-4 hafta sonra ekilen saç telleri dökülmeye başlar. Buna <em>şok dökülme</em> denir ve tamamen normal, beklenen bir süreçtir. Kökler derinin altındadır ve güvendedir.</p>
        <p>3. aydan itibaren yeni, kalıcı saç telleriniz çıkmaya başlar. 6. ayda sonuçların %60'ı görünür hale gelir. <strong>12. ile 15. aylar</strong> arasında süreç tamamlanır ve nihai, doğal görünümünüze kavuşursunuz.</p>
      `,
    },
    {
      slug: "sac-ekimi-agrili-bir-islem-midir",
      category: "Sık Sorulan Sorular",
      title: "Saç Ekimi Ağrılı Bir İşlem midir? Bilmeniz Gereken Gerçekler",
      metaTitle: "Saç Ekimi Acıtır Mı? Ağrısız Saç Ekimi ve Lokal Anestezi",
      metaDescription: "Saç ekimi işlemi sırasında ağrı hissedilir mi? Lokal anestezi uygulamaları ve ağrısız saç ekimi teknikleri hakkında her şey.",
      metaKeywords: "saç ekimi acıtır mı, ağrısız saç ekimi, lokal anestezi, iğnesiz saç ekimi, saç ekiminde ağrı",
      contentHtml: `
        <h2>Ağrısız Lokal Anestezi Uygulamaları</h2>
        <p>Birçok hastanın saç ekimi kararını ertelerken aklındaki en büyük soru işaretlerinden biri işlemin ne kadar acı vereceğidir. Gelişen medikal teknolojiler sayesinde saç ekimi işlemi <strong>son derece konforlu ve ağrısız</strong> bir şekilde tamamlanmaktadır.</p>
        <p>İşlem öncesinde kafa derisine lokal anestezi uygulanır. Anestezi sırasında hafif bir sızı hissedilebilir ancak sonrasında, operasyonun 6-8 saatlik bölümü boyunca hiçbir acı hissetmezsiniz. Hastalarımız işlem sırasında kitap okuyabilir, film izleyebilir veya uyuyabilirler.</p>
        <h3>İyileşme Döneminde Ağrı Olur mu?</h3>
        <p>Operasyon sonrası anestezinin etkisi geçtiğinde hafif bir gerginlik veya sızı hissedilebilir. Bu durum doktorunuzun reçete edeceği standart ağrı kesicilerle kolayca kontrol altına alınır ve genellikle 1-2 gün içinde tamamen geçer.</p>
        <p>Eğer ağrı konusunda endişeleriniz varsa, iğnesiz (dermojet) anestezi cihazları gibi yöntemlerle süreci çok daha rahat geçirmeniz mümkündür.</p>
      `,
    },
    {
      slug: "ekilen-saclar-dokulur-mu",
      category: "Kalıcılık",
      title: "Ekilen Saçlar Dökülür Mü? Kalıcı Sonuçlar İçin İpuçları",
      metaTitle: "Ekilen Saçlar İleride Dökülür Mü? Kalıcılık ve Bakım",
      metaDescription: "Saç ekiminden sonra elde edilen sonuçlar kalıcı mıdır? Ekilen saçların dökülmemesi için dikkat edilmesi gereken bilimsel gerçekler.",
      metaKeywords: "ekilen saçlar dökülür mü, saç ekimi kalıcı mı, enseden alınan saçlar, saç dökülmesi",
      contentHtml: `
        <h2>Ekilen Köklerin Genetik Yapısı</h2>
        <p>Saç ekiminin en büyük avantajı, elde edilen sonuçların <strong>ömür boyu kalıcı</strong> olmasıdır. Bu kalıcılığın sırrı, saç köklerinin alındığı 'donör bölge'nin genetik yapısında gizlidir.</p>
        <p>Ense üstü bölgedeki saç kökleri, genetik olarak <em>DHT (Dihidrotestosteron)</em> hormonuna karşı duyarsızdır. Yani dökülmeye karşı kodlanmışlardır. Bu sağlam kökler alınıp, ön veya tepe bölgesine transfer edildiklerinde kendi genetik özelliklerini korumaya devam ederler.</p>
        <h3>Dikkat Edilmesi Gereken Noktalar</h3>
        <ul>
          <li><strong>Doğal Saçların Dökülmesi:</strong> Ekilen saçlar dökülmese de, ekim yapılan alandaki var olan, dökülmeye meyilli <em>kendi zayıf saçlarınız</em> zamanla dökülmeye devam edebilir. Bu nedenle PRP veya vitamin destekleyici tedaviler önerilir.</li>
          <li><strong>Sağlıklı Yaşam:</strong> Şiddetli stres, ağır vitamin eksiklikleri (Demir, B12, D Vitamini) ve düzensiz beslenme, saç kalitesini geçici olarak bozabilir.</li>
        </ul>
        <p>Sonuç olarak, profesyonel bir ekim planlamasıyla doğru yerden alınan kökler ömür boyu kafa derinizde sizinle kalacaktır.</p>
      `,
    }
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
    console.log(`- "${article.title}" eklendi.`);
  }

  console.log("Seeding başarıyla tamamlandı!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
