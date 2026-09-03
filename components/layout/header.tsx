"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const links = [
  { href: "/halil-cetin-kimdir", label: "Hakkımızda" },
  { href: "/tedaviler", label: "Tedaviler" },
  { href: "/surec", label: "Süreç" },
  { href: "/bilgi-bankasi", label: "Bilgi Bankası" },
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
        isScrolled ? "bg-background/95 dark:bg-background/50 backdrop-blur-md border-b border-line" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <img 
            src="/DARK-BG.svg" 
            alt="Halil Çetin Saç Ekim Merkezi Gaziantep Logo" 
            className={cn("h-14 w-auto", (pathname === "/" && !isScrolled) ? "block" : "hidden dark:block")} 
          />
          <img 
            src="/LIGHT-BG.svg" 
            alt="Halil Çetin Saç Ekim Merkezi Gaziantep Logo" 
            className={cn("h-14 w-auto", (pathname === "/" && !isScrolled) ? "hidden" : "block dark:hidden")} 
          />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-line bg-background dark:bg-background/70 px-2 py-1.5 backdrop-blur-md md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
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
          <ThemeToggle />
          <Link 
            href="/randevu" 
            className="px-6 py-2.5 rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-background transition-colors text-sm font-medium tracking-wide uppercase"
          >
            Ücretsiz Analiz
          </Link>
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
