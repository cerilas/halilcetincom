"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlareButton } from "./glare-button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Delay slightly so it doesn't pop up instantly, giving a better UX
    const timer = setTimeout(() => {
      const consent = localStorage.getItem("cookie-consent");
      if (!consent) {
        setIsVisible(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] p-4 sm:p-6 pointer-events-none md:bottom-6 md:left-6 md:right-auto">
      <div 
        className={cn(
          "pointer-events-auto relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-background/80 p-6 backdrop-blur-xl shadow-2xl transition-all duration-500",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}
      >
        <button
          onClick={handleDecline}
          className="absolute right-4 top-4 text-muted hover:text-foreground transition-colors"
          aria-label="Kapat"
        >
          <X size={16} />
        </button>
        
        <div className="mb-4">
          <p className="text-xs tracking-[0.2em] text-gold uppercase mb-2 font-medium">
            Gizlilik & Çerezler
          </p>
          <h3 className="font-display text-lg mb-2">Deneyiminizi Kişiselleştiriyoruz</h3>
          <p className="text-sm text-muted leading-relaxed">
            Size daha iyi hizmet verebilmek, site trafiğini analiz etmek ve içerikleri kişiselleştirmek için çerezler (cookies) kullanıyoruz. Detaylı bilgi için{" "}
            <Link href="/iletisim" className="text-gold hover:underline">
              Çerez Politikamızı
            </Link>{" "}
            inceleyebilirsiniz.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
          <GlareButton
            onClick={handleAccept}
            className="w-full bg-gold text-white font-bold dark:text-black dark:font-medium py-2 px-4"
          >
            Tümünü Kabul Et
          </GlareButton>
          <button
            onClick={handleDecline}
            className="w-full rounded-xl border border-line bg-card/50 px-4 py-2.5 text-sm hover:bg-line transition-colors text-foreground"
          >
            Yalnızca Gerekli
          </button>
        </div>
      </div>
    </div>
  );
}
