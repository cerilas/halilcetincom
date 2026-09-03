import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Halil Çetin",
  description: "Web sitemizin gizlilik politikası ve veri güvenliği uygulamaları.",
};

export default function GizlilikPolitikasiPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-display mb-8">Gizlilik Politikası</h1>
      <div className="prose prose-invert prose-gold max-w-none text-muted leading-relaxed">
        <p>
          Halil Çetin Saç Ekim Merkezi olarak web sitemizi (www.halilcetin.com) ziyaret eden siz kullanıcılarımızın gizliliğine saygı duyuyor ve veri güvenliğinizi önemsiyoruz.
        </p>
        
        <h2 className="text-xl text-foreground mt-8 mb-4">1. Toplanan Bilgiler</h2>
        <p>
          Sitemizdeki iletişim formları veya ücretsiz analiz kısımları aracılığıyla bizimle paylaştığınız ad, soyad, telefon numarası, e-posta adresi ve fotoğraflarınız sadece sizlere daha iyi bir hizmet sunabilmek ve saç analizinizi yapabilmek amacıyla toplanmaktadır.
        </p>
        
        <h2 className="text-xl text-foreground mt-8 mb-4">2. Bilgilerin Kullanımı</h2>
        <p>
          Paylaştığınız iletişim bilgileri, yalnızca randevu oluşturmak, sağlık hizmetlerimiz hakkında sizi bilgilendirmek ve sorularınıza cevap vermek amacıyla kullanılacaktır. Bu bilgiler hiçbir koşulda izniniz olmadan üçüncü şahıslar veya kurumlarla paylaşılmamaktadır.
        </p>
        
        <h2 className="text-xl text-foreground mt-8 mb-4">3. Üçüncü Taraf Bağlantıları</h2>
        <p>
          Web sitemiz üzerinden, başka web sitelerine bağlantılar (linkler) verilebilir. Kliniğimiz, bu bağlantı verilen sitelerin gizlilik politikalarından ve içeriklerinden sorumlu değildir.
        </p>
      </div>
    </div>
  );
}
