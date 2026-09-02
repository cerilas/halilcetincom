# Halil Çetin Hair Transplant — Proje Planı

Premium, SEO öncelikli, scroll-animasyonlu klinik sitesi. İlk sürüm: içerik JSON’dan yönetilir, admin panelinden güncellenir.

## 1. Hedef

İstanbul merkezli bir saç ekimi kliniği için:

- Modern, minimal, teknolojik ve lüks bir marka hissi
- Scroll’a bağlı 3D / mikro animasyonlar
- Admin panelinden kritik içeriklerin güncellenmesi
- Organik aramada görünürlük (teknik + semantik SEO)

## 2. Stack

| Katman | Seçim | Neden |
| --- | --- | --- |
| Framework | Next.js 16 App Router | SSR, Metadata API, sitemap, JSON-LD, çekirdek web vitals |
| Dil | TypeScript | Tip güvenliği, admin şeması |
| Stil | Tailwind CSS v4 | Aceternity / Magic UI / shadcn uyumu |
| Animasyon | Motion + CSS | Spotlight, marquee, scroll-scrub, manyetik etkileşim |
| İçerik | `data/content.json` | İlk sürümde DB’siz, admin’den yazılabilir |
| Auth | HttpOnly cookie + HMAC | Basit, localhost için yeterli |

Bileşen kaynakları:

- **Aceternity UI** — Spotlight, 3D kart / pin, grid ışıkları, scroll izi
- **Magic UI** — Marquee, number ticker, border beam, shimmer CTA
- **React Bits** — Split / blur text, manyetik buton

## 3. Bilinçli kısıtlar

- 3D için Three.js yok: canvas + CSS perspective. Daha hafif, SEO ve mobil için daha güvenli.
- Lenis yok: native scroll + Motion `useScroll`. Erişilebilirlik ve performans.
- Fotoğraflar ilk sürümde soyut / yer tutucu. Gerçek hasta görselleri admin’den eklenecek.
- Dil: Türkçe (latin-ext font). EN / hreflang sonraki sprint.

## 4. Site haritası

| Rota | Amaç | SEO |
| --- | --- | --- |
| `/` | Dönüşüm + marka | H1, MedicalClinic JSON-LD, FAQ schema |
| `/tedaviler` | FUE, DHI, safir, sakal, kaş | Collection + iç link |
| `/tedaviler/[slug]` | Tedavi detayı | Unique title/desc, MedicalProcedure |
| `/surec` | 6 adımlık süreç | Long-form, scroll story |
| `/sonuclar` | Önce / sonra | Görsel alt metinleri |
| `/hakkimizda` | Hekim + klinik | Physician schema |
| `/iletisim` | Form + WhatsApp | LocalBusiness NAP |
| `/admin` | CMS | `noindex` |

## 5. Admin’den güncellenen veriler

- Klinik kimliği (telefon, WhatsApp, e-posta, adres, çalışma saatleri)
- Hero metinleri ve CTA
- İstatistikler
- Tedaviler
- Süreç adımları
- Hasta yorumları
- SSS
- Hakkımızda
- SEO varsayılanları (title, description, keywords)
- İletişim formundan gelen talepler (salt okunur liste)

## 6. SEO omurgası (hayati)

1. Sunucu tarafı render — içerik HTML’de
2. Sayfa bazlı `generateMetadata` + canonical
3. `sitemap.ts` + `robots.ts`
4. JSON-LD: MedicalClinic, Physician, FAQPage, Review
5. Semantik HTML, tek H1, iç link ağı
6. Open Graph / Twitter
7. Core Web Vitals: animasyonlar client island, LCP metin + CSS
8. `prefers-reduced-motion` saygısı

## 7. Sprintler

**v1 (bu kurulum)** — Tasarım sistemi, landing, iç sayfalar, admin, SEO iskeleti, localhost.

**v2** — Gerçek görseller, blog, çok dil, randevu takvimi.

**v3** — CMS/DB (Postgres), medya kütüphanesi, analitik, A/B hero.
