"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const locales = [
  { code: "tr", label: "TR" },
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
];

export function LanguageSwitcher() {
  const pathname = usePathname();
  
  // Extract current locale from pathname
  // Since we use rewriting, /en/about has 'en', /about has 'tr' natively, but next/navigation 
  // usePathname will return what's in the browser URL.
  // Actually, if we use /en and /ar, those will be visible. TR will just be /.
  const currentLocale = locales.find((l) => pathname.startsWith(`/${l.code}/`) || pathname === `/${l.code}`)?.code || "tr";

  const getPathForLocale = (locale: string) => {
    // If it's TR, we want to strip the locale prefix if it exists
    let cleanPath = pathname;
    if (pathname.startsWith(`/${currentLocale}/`)) {
      cleanPath = pathname.replace(`/${currentLocale}/`, "/");
    } else if (pathname === `/${currentLocale}`) {
      cleanPath = "/";
    }

    if (locale === "tr") return cleanPath;
    return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-line bg-background/50 px-2 py-1 md:backdrop-blur-md">
      {locales.map((locale) => (
        <Link
          key={locale.code}
          href={getPathForLocale(locale.code)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
            currentLocale === locale.code
              ? "bg-gold text-white dark:text-black"
              : "text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
          )}
        >
          {locale.label}
        </Link>
      ))}
    </div>
  );
}
