import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yasal Uyarı | Halil Çetin",
  description: "Web sitemizde yer alan bilgilere ilişkin yasal uyarılar.",
};

export default function YasalUyariPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-display mb-8">Yasal Uyarı</h1>
      <div className="prose prose-invert prose-gold max-w-none text-muted leading-relaxed">
        <p>
          Halil Çetin Saç Ekim Merkezi ("Klinik") web sitesinde (www.halilcetin.com) yer alan tüm metinler, fotoğraflar, videolar, makaleler ve diğer içerikler yalnızca genel bilgilendirme amacı taşımaktadır.
        </p>
        
        <h2 className="text-xl text-foreground mt-8 mb-4">1. Tıbbi Tavsiye Değildir</h2>
        <p>
          Sitede okuduğunuz veya izlediğiniz hiçbir içerik bir hekimin muayenesi, tıbbi teşhisi veya tedavisi yerine geçemez. Sağlığınızla ilgili her türlü durum için öncelikle uzman bir doktora başvurmanız gerekmektedir. 
        </p>
        
        <h2 className="text-xl text-foreground mt-8 mb-4">2. Sonuç Garantisi Verilmez</h2>
        <p>
          Sitede paylaşılan "öncesi ve sonrası" fotoğrafları, videoları veya hasta yorumları kişisel sonuçları yansıtmakta olup, her hastanın metabolizması, cilt yapısı, genetik mirası ve iyileşme süreci farklı olduğundan; aynı sonuçların diğer hastalarda da elde edileceğine dair bir taahhüt veya garanti oluşturmaz.
        </p>
        
        <h2 className="text-xl text-foreground mt-8 mb-4">3. Sorumluluğun Reddi</h2>
        <p>
          Web sitesinde sunulan bilgilerin yanlış anlaşılmasından, uygulanmasından veya siteye erişimden doğabilecek doğrudan ya da dolaylı maddi ve manevi zararlardan Kliniğimiz ve Saç Ekim Uzmanı Halil Çetin sorumlu tutulamaz.
        </p>
      </div>
    </div>
  );
}
