import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { SiteContent } from "@/lib/types";

export function GoldSection({ content }: { content: SiteContent }) {
  const { goldSection } = content.ui.home;

  return (
    <section className="relative overflow-hidden border-y border-line bg-card py-24">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-full w-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:items-center">
        {/* Left Column - Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold/30 md:aspect-square">
          <Image
            src="/gold-fue-instrument-compressed.jpg"
            alt={goldSection.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Inner Shadow / Overlay removed for light mode compatibility or made subtle */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 dark:opacity-100" />
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col items-start">
          <p className="text-xs tracking-[0.28em] text-gold uppercase mb-3">
            {goldSection.eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            {goldSection.title}
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
            {goldSection.description}
          </p>

          <ul className="mt-8 space-y-4">
            {goldSection.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Check size={14} />
                </div>
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href="/iletisim"
            className="mt-10 group inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-8 py-4 text-sm font-medium text-foreground transition-all hover:bg-gold hover:text-black hover:scale-105"
          >
            <span className="truncate">{goldSection.cta}</span>
            <ArrowUpRight size={16} className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
