import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { whatsappHref } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import { PinCard } from "@/components/ui/pin-card";
import { FaqList } from "@/components/ui/faq-list";
import { GlareButton } from "@/components/ui/glare-button";
import { ProcessRail } from "@/components/sections/process-rail";
import { HeroScrollSequence } from "@/components/sections/hero-scroll-sequence";
import { Counter } from "@/components/ui/counter";
import { ParallaxBio } from "@/components/ui/parallax-bio";
import { ResultsGallery } from "@/components/sections/results-gallery";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function HomeView({ content }: { content: SiteContent }) {
  const wa = whatsappHref(
    content.clinic.whatsapp,
    "Merhaba, saç ekimi analizi için yazıyorum.",
  );

  return (
    <>
      <HeroScrollSequence content={content} />

      <ScrollReveal>
        <section className="border-y border-line">
          <Marquee pauseOnHover className="[--duration:36s]">
            {[
              "FUE",
              "DHI",
              "Safir FUE",
              "Sakal ekimi",
              "Doğal saç çizgisi",
              "12 ay takip",
              "İstanbul",
            ].map((item) => (
              <span
                key={item}
                className="px-8 text-sm tracking-[0.28em] text-muted uppercase"
              >
                {item}
              </span>
            ))}
          </Marquee>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="relative min-h-[40vh] overflow-hidden border-b border-line bg-background/50 py-24">
          {/* Glow effect */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 opacity-50 blur-[120px]" />

          <div className="relative z-10 mx-auto grid max-w-5xl gap-8 px-5 md:grid-cols-2 md:items-center">
            {/* Left Column - Photo */}
            <div className="flex flex-col items-center md:items-end md:pr-8">
              <ParallaxBio />
            </div>

            {/* Right Column - Bio & Stats */}
            <div className="flex flex-col items-center border-t border-line pt-20 text-center md:items-start md:border-l md:border-t-0 md:pl-12 md:pt-0 md:text-left">
              <h2 className="font-display text-3xl text-foreground md:text-5xl">
                Halil Çetin
              </h2>
              <p className="mt-2 mb-12 text-xs tracking-[0.28em] text-gold uppercase">
                Kurucu & Saç Ekim Uzmanı
              </p>

              <p className="mb-4 text-xs tracking-[0.28em] text-gold uppercase">
                Uzmanlık ve Güven
              </p>
              <div className="flex items-end text-gold">
                <Counter
                  value={4876}
                  places={[1000, 100, 10, 1]}
                  fontSize={80}
                  padding={10}
                  gap={12}
                  textColor="currentColor"
                  fontWeight={300}
                  gradientFrom="#07080b"
                />
                <span className="mb-4 ml-2 font-display text-7xl font-light">+</span>
              </div>
              <h2 className="mt-6 font-display text-3xl text-foreground md:text-4xl">
                Saç Ekim Deneyimi
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Yılların tecrübesi, doğal sonuçlar ve memnun hastalar. Saç ekiminde güvenilir ellerdesiniz.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mx-auto max-w-6xl px-5 py-24">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="text-xs tracking-[0.28em] text-gold uppercase">
                Tedaviler
              </p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">
                Protokole göre, pakete göre değil.
              </h2>
            </div>
            <Link
              href="/tedaviler"
              className="hidden items-center gap-2 text-sm text-gold md:flex"
            >
              Tüm tedaviler <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {content.treatments.map((treatment, i) => (
              <Link key={treatment.id} href={`/tedaviler/${treatment.slug}`}>
                <PinCard title={`0${i + 1}`}>
                  <div className="flex min-h-[360px] flex-col justify-between p-7 group">
                    <div>
                      <h3 className="font-display text-3xl">{treatment.title}</h3>
                      <p className="mt-3 max-w-md text-sm leading-7 text-muted">
                        {treatment.excerpt}
                      </p>
                    </div>

                    <div className="my-6 overflow-hidden rounded-xl border border-line">
                      <img
                        src={
                          i === 0 ? "/protocols/hairline.jpg" :
                            i === 1 ? "/protocols/crown.jpg" :
                              i === 2 ? "/protocols/operation.png" :
                                "/protocols/beard.png"
                        }
                        alt={treatment.title}
                        className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs tracking-wide text-gold">
                      <span>{treatment.grafts}</span>
                      <span>{treatment.duration}</span>
                    </div>
                  </div>
                </PinCard>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ResultsGallery />

      <ScrollReveal>
        <section className="border-y border-line bg-card/40">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-8 pb-20 md:grid-cols-4">
            {content.stats.map((stat) => (
              <div key={stat.id}>
                <p className="font-display text-5xl text-gold-soft">
                  <NumberTicker value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <ProcessRail steps={content.process} />
      </ScrollReveal>


      <ScrollReveal>
        <section className="overflow-hidden border-y border-line py-16">
          <p className="mb-8 text-center text-xs tracking-[0.28em] text-gold uppercase">
            Danışanlar
          </p>
          <Marquee pauseOnHover className="[--duration:50s]">
            {content.testimonials.map((item) => (
              <figure
                key={item.id}
                className="w-[340px] rounded-2xl border border-line bg-card p-5"
              >
                <blockquote className="text-sm leading-7 text-foreground/90">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-4 text-xs tracking-wide text-muted">
                  {item.name} · {item.country}
                </figcaption>
              </figure>
            ))}
          </Marquee>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mx-auto max-w-6xl px-5 py-24">
          <h2 className="font-display text-4xl">Sık sorulanlar</h2>
          <div className="mt-10">
            <FaqList items={content.faqs} />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="px-5 pb-24">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-line bg-card px-8 py-16 md:px-16">
            <BorderBeam />
            <p className="text-xs tracking-[0.28em] text-gold uppercase">
              Ücretsiz analiz
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl md:text-6xl">
              Fotoğrafınızı gönderin. 24 saatte plan.
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <GlareButton href="/iletisim" className="bg-gold text-black">
                Formu doldur
              </GlareButton>
              <GlareButton href={wa} className="border border-line">
                WhatsApp
              </GlareButton>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
