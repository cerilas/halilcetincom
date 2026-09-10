import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çerez Politikası | Halil Çetin",
  description: "Web sitemizin çerez kullanım politikası ve ayarları.",
};

export default function CerezPolitikasiPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-display mb-8">Çerez Politikası</h1>
      <div className="prose prose-invert prose-gold max-w-none text-muted leading-relaxed">
        <p>
          Halil Çetin Saç Ekim Merkezi ("Klinik") olarak, çevrimiçi mecralarımızı ziyaretleriniz sırasında sizlerin deneyimini geliştirmek için çerezler, pikseller ve benzeri teknolojilerden yararlanmaktayız.
        </p>
        
        <h2 className="text-xl text-foreground mt-8 mb-4">1. Çerez Nedir?</h2>
        <p>
          Çerezler (Cookies), bir web sitesini ziyaret ettiğinizde cihazınıza (bilgisayar, tablet veya telefon) kaydedilen küçük metin dosyalarıdır. Çerezler, web sitesinin daha verimli çalışmasını, sizin tercihlerinizi hatırlamasını ve size daha iyi bir kullanıcı deneyimi sunmasını sağlar.
        </p>
        
        <h2 className="text-xl text-foreground mt-8 mb-4">2. Hangi Çerezleri Kullanıyoruz?</h2>
        <ul>
          <li><strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması ve güvenliği için mutlaka gerekli olan çerezlerdir.</li>
          <li><strong>Performans ve Analiz Çerezleri:</strong> Sitemizin nasıl kullanıldığını analiz etmemize ve performansını iyileştirmemize yardımcı olan çerezlerdir (örneğin; ziyaretçi sayısı, en çok ziyaret edilen sayfalar). <em>Bu veriler anonim olarak kendi sunucularımızda işlenmektedir.</em></li>
        </ul>
        
        <h2 className="text-xl text-foreground mt-8 mb-4">3. Çerez Yönetimi</h2>
        <p>
          Kullandığınız tarayıcının ayarlarını değiştirerek çerezleri reddedebilir veya silebilirsiniz. Ancak zorunlu çerezleri reddetmeniz durumunda sitemizin bazı fonksiyonları düzgün çalışmayabilir.
        </p>
      </div>
    </div>
  );
}
