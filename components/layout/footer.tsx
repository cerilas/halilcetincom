import Link from "next/link";
import type { SiteContent } from "@/lib/types";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

const faqs = [
  "Saç ekimi fiyatları 2026 ne kadar?",
  "Gaziantep en iyi saç ekim merkezi nasıl seçilir?",
  "Saç ekimi işlemi acıtır mı, ağrılı mıdır?",
  "Saç ekimi sonrası iyileşme süreci kaç gün sürer?",
  "FUE mi yoksa DHI saç ekimi mi daha iyi?",
  "Saç ekimi operasyonu kaç saat sürer?",
  "Saç ekimi sonrası ilk yıkama ne zaman yapılır?",
  "Tıraşsız saç ekimi mümkün mü, kimlere yapılır?",
  "Saç ekimi için uygun yaş aralığı nedir?",
  "Ekilen saçlar ileride dökülür mü, kalıcı mıdır?",
  "Saç ekimi sonuçları ne zaman tam belli olur?",
  "Saç ekimi sonrası şapka takılır mı?",
  "Saç ekimi sonrası spor ve egzersiz ne zaman yapılır?",
  "Saç ekiminden sonra iz kalır mı?",
  "Kadınlarda saç ekimi nasıl yapılır?",
  "Saç ekiminde greft hesaplama nasıl yapılır?",
  "Sigara ve alkol tüketimi saç ekimini etkiler mi?",
  "Saç ekiminde kök hücre ve PRP tedavisi faydalı mı?",
  "Şeker ve tansiyon hastaları saç ekimi yaptırabilir mi?",
  "Saç ekimi yaz aylarında sıcakta yapılır mı?"
];

const seoLocations = [
  "Gaziantep Saç Ekimi", "Gaziantep Şahinbey Saç Ekimi", "Gaziantep Şehitkamil Saç Ekimi", 
  "Nizip Saç Ekimi", "Oğuzeli Saç Ekimi", "İslahiye Saç Ekimi", "Nurdağı Saç Ekimi",
  "Diyarbakır Saç Ekimi", "Diyarbakır Kayapınar Saç Ekimi", "Diyarbakır Yenişehir Saç Ekimi", "Bağlar Saç Ekimi",
  "Şanlıurfa Saç Ekimi", "Urfa Karaköprü Saç Ekimi", "Siverek Saç Ekimi", "Birecik Saç Ekimi", "Viranşehir Saç Ekimi",
  "Mardin Saç Ekimi", "Kızıltepe Saç Ekimi", "Midyat Saç Ekimi", "Nusaybin Saç Ekimi",
  "Batman Saç Ekimi", "Kozluk Saç Ekimi",
  "Adıyaman Saç Ekimi", "Besni Saç Ekimi", "Kahta Saç Ekimi",
  "Osmaniye Saç Ekimi", "Kadirli Saç Ekimi", "Düziçi Saç Ekimi",
  "Kahramanmaraş Saç Ekimi", "Elbistan Saç Ekimi", "Onikişubat Saç Ekimi",
  "Elazığ Saç Ekimi", "Malatya Saç Ekimi", "Kilis Saç Ekimi", 
  "Şırnak Saç Ekimi", "Cizre Saç Ekimi", "Silopi Saç Ekimi",
  "Hatay Saç Ekimi", "İskenderun Saç Ekimi", "Antakya Saç Ekimi"
];

function slugify(text: string) {
  return text.toLowerCase()
    .replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ğ/g, 'g')
    .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/\?/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const legalLinks = [
  { name: "Aydınlatma Metni & KVKK", href: "/kvkk" },
  { name: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  { name: "Kullanım Koşulları", href: "/kullanim-kosullari" },
  { name: "Çerez Politikası", href: "/cerez-politikasi" },
  { name: "Yasal Uyarı", href: "/yasal-uyari" }
];

export function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-line bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-[400px] w-[800px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gold/5 blur-[120px]" />
      
      {/* Main Top Tier */}
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-12">
        <div className="md:col-span-4 lg:col-span-4">
          <Link href="/">
            <img src="/DARK-BG.svg" alt="Halil Çetin Saç Ekim Merkezi Logo" className="h-8 w-auto opacity-90 transition-opacity hover:opacity-100 hidden dark:block" />
            <img src="/LIGHT-BG.svg" alt="Halil Çetin Saç Ekim Merkezi Logo" className="h-8 w-auto opacity-90 transition-opacity hover:opacity-100 block dark:hidden" />
          </Link>
          <p className="mt-6 max-w-sm font-display text-3xl leading-tight text-foreground/90">
            {content.clinic.tagline}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Gaziantep saç ekimi merkezi olarak Uzman Halil Çetin liderliğinde; Safir FUE, DHI ve kök hücre destekli dökülme tedavilerinde ömür boyu kalıcı, %100 doğal sonuçlar ve uluslararası VIP standartlarda sağlık hizmeti sunuyoruz.
          </p>
        </div>
        
        <div className="md:col-span-3 lg:col-span-3">
          <p className="text-xs tracking-[0.2em] text-gold uppercase mb-6 font-medium">
            Navigasyon
          </p>
          <div className="flex flex-col gap-4 text-sm text-muted/80">
            <Link href="/halil-cetin-kimdir" className="hover:text-gold transition-colors w-max">Halil Çetin Kimdir?</Link>
            <Link href="/tedaviler" className="hover:text-gold transition-colors w-max">Saç Ekimi Tedavileri</Link>
            <Link href="/surec" className="hover:text-gold transition-colors w-max">Operasyon Süreci & Planlama</Link>
            <Link href="/bilgi-bankasi" className="hover:text-gold transition-colors w-max">Uzman Bilgi Bankası (Blog)</Link>
            <Link href="/iletisim" className="hover:text-gold transition-colors w-max">Ücretsiz Analiz & İletişim</Link>
          </div>
        </div>
        
        <div className="md:col-span-5 lg:col-span-5">
          <p className="text-xs tracking-[0.2em] text-gold uppercase mb-6 font-medium">
            İletişim & Konum
          </p>
          <div className="space-y-4 text-sm text-muted/80 mb-8">
            <p className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold/50" />
              <span className="leading-relaxed">{content.clinic.address}</span>
            </p>
            <p className="flex items-center gap-3">
              <Clock size={16} className="shrink-0 text-gold/50" />
              <span>{content.clinic.hours}</span>
            </p>
            <p className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-gold/50" />
              <a href={`tel:${content.clinic.phone.replace(/\s+/g, '')}`} className="hover:text-gold transition-colors">
                {content.clinic.phone}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-gold/50" />
              <a href={`mailto:${content.clinic.email}`} className="hover:text-gold transition-colors">
                {content.clinic.email}
              </a>
            </p>
          </div>
          
          <div className="h-48 w-full rounded-xl overflow-hidden border border-line opacity-80 hover:opacity-100 transition-opacity">
            <iframe 
              src="https://maps.google.com/maps?q=37.0748307,37.3705138&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "grayscale(1) invert(90%) contrast(80%)" }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Klinik Konumu"
            />
          </div>
        </div>
      </div>

      {/* Middle Tier: FAQs & SEO Regions */}
      <div className="relative z-10 border-t border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-12">
            
            {/* FAQs */}
            <div className="lg:col-span-4">
              <p className="text-xs tracking-[0.2em] text-gold uppercase mb-6 font-medium">
                Sık Sorulan Sorular
              </p>
              <ul className="flex flex-col gap-3">
                {faqs.map((faq, i) => (
                  <li key={i}>
                    <Link href={`/bilgi-bankasi/${slugify(faq)}`} className="text-xs text-muted/70 hover:text-gold transition-colors line-clamp-1">
                      {faq}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SEO Locations */}
            <div className="lg:col-span-8">
              <p className="text-xs tracking-[0.2em] text-gold uppercase mb-6 font-medium">
                Hizmet Bölgelerimiz
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3">
                {seoLocations.map((loc, i) => (
                  <Link 
                    key={i} 
                    href={`/bilgi-bankasi/${slugify(loc)}`} 
                    className="text-[11px] text-muted/50 hover:text-gold transition-colors truncate block"
                  >
                    {loc}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Tier: Legal & Copyright */}
      <div className="relative z-10 border-t border-black/5 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-5 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted/60">
              {legalLinks.map((link, i) => (
                <Link key={i} href={link.href} className="hover:text-white transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-muted/60">
              <Link href="#" className="hover:text-gold transition-colors">
                <span className="sr-only">Instagram</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </Link>
              <Link href="#" className="hover:text-gold transition-colors">
                <span className="sr-only">Facebook</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </Link>
              <Link href="#" className="hover:text-gold transition-colors">
                <span className="sr-only">YouTube</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </Link>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted/40 border-t border-black/5 dark:border-white/5 pt-8">
            <span>© {new Date().getFullYear()} {content.clinic.legalName}. Tüm hakları saklıdır.</span>
            <Link href="/yonetim" className="hover:text-white transition-colors">
              Yönetim Paneli
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
