"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

import type { SiteContent } from "@/lib/types";

export function Header({ content }: { content: SiteContent }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const locales = ["tr", "en", "ar"];
  const currentLocale = locales.find((l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`) || "tr";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header 
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        isScrolled ? "bg-background/95 dark:bg-background/80 md:backdrop-blur-md border-b border-line" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href={currentLocale === "tr" ? "/" : `/${currentLocale}`}
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <img 
            src="/DARK-BG.png" 
            alt="Halil Çetin Saç Ekim Merkezi Gaziantep Logo" 
            className="hidden h-14 w-auto dark:block" 
          />
          <img 
            src="/LIGHT-BG.png" 
            alt="Halil Çetin Saç Ekim Merkezi Gaziantep Logo" 
            className="block h-14 w-auto dark:hidden" 
          />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-line bg-background dark:bg-background/70 px-2 py-1.5 md:backdrop-blur-md md:flex">
          {content.headerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href === "/" ? (currentLocale === "tr" ? "/" : `/${currentLocale}`) : (currentLocale === "tr" ? link.href : `/${currentLocale}${link.href}`)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs tracking-wide text-muted transition-colors hover:text-foreground",
                pathname.startsWith(link.href) && "bg-black/5 dark:bg-white/5 text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link 
            href={currentLocale === "tr" ? "/randevu" : `/${currentLocale}/randevu`}
            className="flex items-center justify-center rounded-full bg-gold px-6 py-2 text-sm font-bold text-white transition-all hover:bg-gold-soft dark:text-black"
          >
            {content.ui.appointment}
          </Link>
          <a
            href={`https://wa.me/905321616090?text=${encodeURIComponent(content.ui.whatsappCta)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] transition-transform hover:scale-105"
            title={content.ui.whatsappAria}
          >
            <img src="/whatsapp.png" alt="WhatsApp" className="h-5 w-5 object-contain" />
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-full border border-line bg-background dark:bg-background/70 p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menü"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-5 rounded-2xl border border-line bg-background/95 p-4 md:backdrop-blur-xl md:hidden">
          {content.headerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href === "/" ? (currentLocale === "tr" ? "/" : `/${currentLocale}`) : (currentLocale === "tr" ? link.href : `/${currentLocale}${link.href}`)}
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
