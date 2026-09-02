import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/layout/site-shell";
import { whatsappHref } from "@/lib/utils";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "İletişim ve Ücretsiz Analiz",
  description:
    "Halil Çetin Hair Transplant ile iletişime geçin. Ücretsiz saç analizi, WhatsApp ve İstanbul Nişantaşı klinik randevusu.",
  alternates: { canonical: "/iletisim" },
};

export default async function ContactPage() {
  const content = await getContent();

  return (
    <SiteShell content={content}>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pt-32 pb-24 md:grid-cols-2">
        <div>
          <p className="text-xs tracking-[0.28em] text-gold uppercase">
            İletişim
          </p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">
            Analiz için yazın.
          </h1>
          <div className="mt-10 space-y-4 text-sm text-muted">
            <p>{content.clinic.address}</p>
            <p>{content.clinic.hours}</p>
            <p>{content.clinic.phone}</p>
            <p>{content.clinic.email}</p>
            <a
              href={whatsappHref(content.clinic.whatsapp)}
              className="inline-block text-gold"
            >
              WhatsApp hattı →
            </a>
          </div>
        </div>
        <ContactForm />
      </section>
    </SiteShell>
  );
}
