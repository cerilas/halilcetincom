import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | Halil Çetin",
  description: "Web sitemizi ziyaret eden kullanıcılarımız için genel kullanım koşulları.",
};

export default function KullanimKosullariPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-display mb-8">Kullanım Koşulları</h1>
      <div className="prose prose-invert prose-gold max-w-none text-muted leading-relaxed">
        <p>
          Lütfen sitemizi kullanmadan önce bu 'Kullanım Koşulları'nı dikkatlice okuyunuz. Sitemizi kullanan ve sitemiz üzerinden hizmet alan tüm ziyaretçilerimiz bu şartları kabul etmiş sayılır.
        </p>
        
        <h2 className="text-xl text-foreground mt-8 mb-4">1. Hizmetin Kapsamı</h2>
        <p>
          Halil Çetin Saç Ekim Merkezi tarafından web sitesi üzerinden sunulan hizmetler; genel olarak tıbbi bilgilendirme ve kullanıcıların kliniğimiz ile iletişim kurabilmesini sağlamak amacı taşımaktadır. Sitede yer alan hiçbir bilgi hekim muayenesi veya teşhisin yerine geçmez.
        </p>
        
        <h2 className="text-xl text-foreground mt-8 mb-4">2. Telif Hakları</h2>
        <p>
          Sitemizde yer alan tüm içerikler, metinler, görseller, logolar ve videolar Halil Çetin Saç Ekim Merkezi'ne aittir veya lisanslı olarak kullanılmaktadır. İzinsiz kopyalanması, çoğaltılması veya başka mecralarda yayınlanması yasaktır.
        </p>
        
        <h2 className="text-xl text-foreground mt-8 mb-4">3. Sorumluluk Reddi</h2>
        <p>
          Web sitesindeki bilgilerin güncelliği ve doğruluğu konusunda azami özen gösterilmekle birlikte, sitede oluşabilecek yazım hataları veya teknik aksaklıklardan dolayı doğrudan ya da dolaylı oluşabilecek zararlardan Kliniğimiz sorumlu tutulamaz.
        </p>
      </div>
    </div>
  );
}
