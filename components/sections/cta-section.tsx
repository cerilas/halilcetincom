import { GlareButton } from "@/components/ui/glare-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { whatsappHref } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { SiteContent } from "@/lib/types";

export function CtaSection({ content }: { content: SiteContent }) {
  const wa = whatsappHref(
    content.clinic.whatsapp,
    "Merhaba, saç ekimi analizi için yazıyorum.",
  );

  return (
    <ScrollReveal>
      <section className="px-5 pb-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-line bg-card px-8 py-16 md:px-16">
          <BorderBeam />
          <p className="text-xs tracking-[0.28em] text-gold uppercase">
            Ücretsiz analiz
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl md:text-6xl">
            Fotoğrafınızı gönderin. Hemen ücretsiz saç ekim analizinizi alın.
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <GlareButton href="/iletisim" className="bg-gold text-white font-bold dark:text-black dark:font-medium">
              Formu doldur
            </GlareButton>
            <GlareButton href={wa} className="border border-line">
              WhatsApp
            </GlareButton>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
