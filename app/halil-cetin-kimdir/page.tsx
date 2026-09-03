import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/layout/site-shell";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Saç Ekim Uzmanı Halil Çetin Kimdir? | Uzman Biyografisi",
  description:
    "Gaziantep'in en çok tercih edilen saç ekim uzmanı Halil Çetin hakkında detaylı bilgi. 15 yılı aşkın tecrübe, 10.000'den fazla başarılı operasyon ve Safir FUE uzmanlığı.",
  alternates: { canonical: "/halil-cetin-kimdir" },
  keywords: [
    "Halil Çetin kimdir",
    "Gaziantep saç ekim uzmanı",
    "Halil Çetin saç ekimi",
    "En iyi saç ekim uzmanı",
    "Safir FUE uzmanı",
  ],
};

const qualifications = [
  "15+ Yıllık Kesintisiz Saç Ekimi Tecrübesi",
  "10.000'in Üzerinde Başarılı Saç ve Sakal Ekimi Operasyonu",
  "DHI (Choi Pen) ve Safir FUE Yöntemlerinde İleri Düzey Uzmanlık",
  "Uluslararası Saç Restorasyon Cerrahisi Derneği (ISHRS) Standartlarında Tedavi",
  "Tam Donanımlı VIP Hastane Ortamında Steril Operasyon",
  "Kişiye Özel Doğal Saç Çizgisi (Altın Oran) Tasarımı"
];

export default async function HalilCetinPage() {
  const content = await getContent();

  return (
    <SiteShell content={content}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Halil Çetin",
          jobTitle: "Saç Ekim Uzmanı",
          worksFor: {
            "@type": "MedicalClinic",
            name: "Halil Çetin Hair Transplant"
          },
          url: "https://halilcetin.com/halil-cetin-kimdir",
          image: "https://halilcetin.com/sac-ekim-uzmani-halil-cetin-portre.jpg",
          description: "15 yılı aşkın tecrübesi ve 10.000'in üzerinde başarılı operasyonu ile Gaziantep ve Türkiye'nin önde gelen saç ekim uzmanlarından biridir.",
          knowsAbout: ["Saç Ekimi", "Sakal Ekimi", "FUE Tekniği", "DHI Tekniği", "Safir FUE"]
        }}
      />
      <article className="pb-32 pt-24 md:pt-40">
        <div className="mx-auto max-w-6xl px-5">
          
          {/* Header Section */}
          <div className="mb-16 md:mb-24 text-center">
            <p className="text-xs tracking-[0.2em] text-gold uppercase mb-4 font-medium">
              Kurucu & Başuzman
            </p>
            <h1 className="font-display text-5xl md:text-7xl mb-6">
              Saç Ekim Uzmanı <br/>
              <span className="text-gold">Halil Çetin</span>
            </h1>
            <p className="mx-auto max-w-2xl text-muted text-lg leading-relaxed">
              Saç ekimi sadece bir cerrahi işlem değil, tıbbın ve estetik vizyonun kusursuz birleşimidir. Doğal, kalıcı ve kimsede anlaşılmayan sonuçlar için tecrübeli ellere güvenin.
            </p>
          </div>

          {/* First Image & Bio Section */}
          <section className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center mb-24">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold/30 to-gold/0 opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-40" />
              <div className="relative overflow-hidden rounded-2xl border border-line bg-card aspect-[3/4] md:aspect-auto md:h-[600px]">
                <Image 
                  src="/sac-ekim-uzmani-halil-cetin-portre.jpg" 
                  alt="En İyi Saç Ekim Uzmanı Halil Çetin - VIP Klinik Portresi" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full border border-gold/20 bg-background/80 backdrop-blur-md flex items-center justify-center text-center p-4 shadow-2xl">
                <div>
                  <span className="block font-display text-3xl text-gold">15+</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted font-bold">Yıllık Tecrübe</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="font-display text-3xl md:text-4xl">
                Estetik ve Tıbbın Kusursuz Birleşimi
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  Gaziantep merkezli kliniğinde Türkiye'nin dört bir yanından ve Avrupa'dan gelen hastalara hizmet veren <strong>Saç Ekim Uzmanı Halil Çetin</strong>, saç restorasyonu alanında bölgesinin en çok tercih edilen ve güvenilen isimlerinin başında gelmektedir.
                </p>
                <p>
                  15 yılı aşkın mesleki hayatında 10.000'in üzerinde hastanın saç, sakal ve kaş ekimi operasyonunu bizzat yönetmiş, binlerce insanın hayatına ve özgüvenine pozitif dokunuşlar yapmıştır. Sıradan ve "seri üretim" mantığıyla çalışan saç ekim merkezlerinin aksine Halil Çetin, <strong>"butik ve kişiye özel"</strong> tedavi protokolünü benimsemektedir.
                </p>
                <p>
                  Saç ekimi operasyonlarında başarı oranını maksimize eden Safir FUE (Sapphire FUE) ve DHI (Doğrudan Saç Ekimi) teknolojilerini en güncel cihazlarla uygulamaktadır.
                </p>
              </div>
            </div>
          </section>

          {/* Second Image & Technique Section */}
          <section className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center mb-24">
            <div className="order-1 lg:order-2 relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-l from-gold/30 to-gold/0 opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-40" />
              <div className="relative overflow-hidden rounded-2xl border border-line bg-card aspect-[4/3]">
                <Image 
                  src="/halil-cetin-sac-ekimi-operasyonu.jpg" 
                  alt="Gaziantep Safir FUE Saç Ekimi Operasyon Anı - Uzman Halil Çetin" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            <div className="order-2 lg:order-1 flex flex-col gap-6">
              <h2 className="font-display text-3xl md:text-4xl">
                Operasyon Masasındaki Hassasiyet
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  Başarılı bir saç ekiminin sırrı sadece köklerin toplanıp ekilmesi değildir. <strong>Köklerin hangi açıyla, hangi derinlikte ve nasıl bir ön saç çizgisi tasarımıyla ekileceği</strong> asıl farkı yaratan unsurdur. Halil Çetin, operasyon masasında bir sanatçı titizliğiyle çalışır.
                </p>
                <p>
                  Altın oran kurallarına uygun olarak planlanan saç çizgisi tasarımı, hastanın yaşına, yüz anatomisine ve beklentilerine göre lazer cetveller kullanılarak çizilir. İşlem esnasında donör bölgeden alınan her bir greft (saç kökü), canlılığını yitirmeden, en uygun solüsyonlarda bekletilerek yeni yuvalarına transfer edilir.
                </p>
              </div>
            </div>
          </section>

          {/* Qualifications List */}
          <section className="mx-auto max-w-4xl bg-card border border-line rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
            <h2 className="font-display text-3xl mb-10 text-center">Neden Halil Çetin?</h2>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {qualifications.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={20} />
                  <p className="text-sm text-muted/90 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium text-black transition-transform hover:scale-105"
              >
                Ücretsiz Analiz Alın <ArrowUpRight size={16} />
              </Link>
            </div>
          </section>

        </div>
      </article>

      <CtaSection content={content} />
    </SiteShell>
  );
}
