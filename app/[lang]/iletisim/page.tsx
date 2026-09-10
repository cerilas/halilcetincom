import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/layout/site-shell";
import { whatsappHref } from "@/lib/utils";
import { ContactForm } from "@/components/sections/contact-form";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim & Ücretsiz Saç Analizi Randevusu | Gaziantep Saç Ekimi",
  description:
    "Halil Çetin Hair Transplant ile iletişime geçin. Ücretsiz saç analizi, WhatsApp ve klinik randevusu ile hayalinizdeki saçlara kavuşun.",
  alternates: { canonical: "/iletisim" },
};

export default async function ContactPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const content = await getContent(params.lang);

  return (
    <SiteShell content={content}>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pt-32 pb-24 md:grid-cols-2">
        <div>
          <p className="text-xs tracking-[0.28em] text-gold uppercase">
            {content.ui.contact.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">
            {content.ui.contact.title}
          </h1>
          <div className="mt-12 mb-12">
            <p className="text-xs tracking-[0.2em] text-muted uppercase mb-4">
              {content.ui.contact.callNow}
            </p>
            <a
              href={`tel:${content.clinic.phone.replace(/\s+/g, '')}`}
              className="group flex flex-wrap items-center gap-4 text-4xl md:text-5xl lg:text-5xl font-display text-foreground hover:text-gold transition-colors duration-300"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-card group-hover:border-gold/50 group-hover:bg-gold/5 transition-all">
                <Phone className="h-6 w-6 text-gold" />
              </div>
              <span className="tracking-tight">{content.clinic.phone}</span>
            </a>
          </div>

          <div className="space-y-6 text-sm text-muted border-t border-line pt-10">
            <div className="flex gap-4">
              <MapPin className="h-5 w-5 shrink-0 text-gold" />
              <p className="leading-relaxed">{content.clinic.address}</p>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="h-5 w-5 shrink-0 text-gold" />
              <p>{content.clinic.hours}</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 shrink-0 text-gold" />
              <a href={`mailto:${content.clinic.email}`} className="hover:text-gold transition-colors">
                {content.clinic.email}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <img src="/whatsapp.png" alt="WhatsApp" className="h-5 w-5 shrink-0 object-contain" />
              <a
                href={whatsappHref(content.clinic.whatsapp, content.ui.whatsappAnalysis)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-[#25D366] transition-colors"
              >
                {content.ui.contact.whatsappLine}
              </a>
            </div>
          </div>
        </div>
        <ContactForm content={content} />
      </section>
    </SiteShell>
  );
}
