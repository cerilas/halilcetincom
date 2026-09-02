"use client";

import { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

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
        isScrolled ? "bg-background/50 backdrop-blur-md border-b border-line" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <img src="/DARK-BG.svg" alt="Halil Çetin Logo" className="h-14 w-auto" />
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
