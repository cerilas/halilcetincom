import { GlareButton } from "@/components/ui/glare-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { whatsappHref } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { SiteContent } from "@/lib/types";

export function CtaSection({ content }: { content: SiteContent }) {
  const wa = whatsappHref(
    content.clinic.whatsapp,
    content.ui.whatsappAnalysis
  );

  return (
    <ScrollReveal>
      <section className="px-5 pb-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-line bg-card px-8 py-16 md:px-16">
          <BorderBeam />
          <p className="text-xs tracking-[0.28em] text-gold uppercase">
            {content.ui.cta.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl md:text-6xl">
            {content.ui.cta.title}
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <GlareButton href="/iletisim" className="bg-gold text-white font-bold dark:text-black dark:font-medium">
              {content.ui.cta.fillForm}
            </GlareButton>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[3.25rem] items-center gap-2 rounded-full border border-line px-8 font-medium transition-colors hover:border-[#25D366] hover:text-[#25D366]"
            >
              <img src="/whatsapp.png" alt="WhatsApp" className="h-5 w-5 object-contain" />
              {content.ui.cta.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
