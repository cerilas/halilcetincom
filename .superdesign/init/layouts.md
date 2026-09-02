# Shared layouts

## `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import { getContent } from "@/lib/content";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const url = siteUrl();

  return {
    metadataBase: new URL(url),
    title: {
      default: content.seo.title,
      template: `%s | ${content.clinic.name}`,
    },
    description: content.seo.description,
    keywords: content.seo.keywords,
    authors: [{ name: content.clinic.doctorName }],
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url,
      siteName: content.clinic.legalName,
      title: content.seo.title,
      description: content.seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
    },
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${geist.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
```

## `components/layout/site-shell.tsx`

```tsx
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import type { SiteContent } from "@/lib/types";

export function SiteShell({
  content,
  children,
}: {
  content: SiteContent;
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer content={content} />
    </>
  );
}
```

## `components/layout/header.tsx`

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/tedaviler", label: "Tedaviler" },
  { href: "/surec", label: "Süreç" },
  { href: "/sonuclar", label: "Sonuçlar" },
  { href: "/hakkimizda", label: "Klinik" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full border border-line bg-background/70 px-4 py-2 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="text-sm tracking-[0.18em] uppercase">
            Halil Çetin
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-line bg-background/70 px-2 py-1.5 backdrop-blur-md md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs tracking-wide text-muted transition-colors hover:text-foreground",
                pathname.startsWith(link.href) && "bg-white/5 text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/iletisim"
          className="hidden rounded-full bg-gold px-4 py-2 text-xs tracking-[0.14em] text-black uppercase md:inline-flex"
        >
          Analiz
        </Link>

        <button
          type="button"
          className="rounded-full border border-line bg-background/70 p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="mx-5 rounded-2xl border border-line bg-background/95 p-4 backdrop-blur-xl md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-muted"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
```

## `components/layout/footer.tsx`

```tsx
import Link from "next/link";
import type { SiteContent } from "@/lib/types";

export function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-sm tracking-[0.22em] text-gold uppercase">
            {content.clinic.legalName}
          </p>
          <p className="mt-4 max-w-sm font-display text-3xl leading-tight">
            {content.clinic.tagline}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] text-muted uppercase">
            Navigasyon
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
            <Link href="/tedaviler">Tedaviler</Link>
            <Link href="/surec">Süreç</Link>
            <Link href="/sonuclar">Sonuçlar</Link>
            <Link href="/hakkimizda">Klinik</Link>
            <Link href="/iletisim">İletişim</Link>
          </div>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] text-muted uppercase">
            Klinik
          </p>
          <div className="mt-4 space-y-2 text-sm text-muted">
            <p>{content.clinic.address}</p>
            <p>{content.clinic.hours}</p>
            <p>{content.clinic.phone}</p>
            <p>{content.clinic.email}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl justify-between border-t border-line px-5 py-6 text-xs text-muted">
        <span>© {new Date().getFullYear()} {content.clinic.name}</span>
        <Link href="/admin" className="hover:text-gold">
          Admin
        </Link>
      </div>
    </footer>
  );
}
```
