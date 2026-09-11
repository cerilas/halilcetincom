"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const patients = [
  // Existing patients with SEO alts
  { id: 1, before: "/before-after-bundle-images/1.jpg", after: "/before-after-bundle-images/2.jpg", altBefore: "Gaziantep Saç Ekimi Öncesi Kellik Durumu", altAfter: "Gaziantep Saç Ekimi 12. Ay Sonrası Başarılı Sonuç" },
  { id: 3, before: "/before-after-bundle-images/5.jpg", after: "/before-after-bundle-images/6.jpg", altBefore: "Gaziantep Erkek Tipi Saç Dökülmesi Öncesi", altAfter: "Gaziantep FUE Saç Ekimi Sonrası Doğal Görünüm" },
  { id: 5, before: "/before-after-bundle-images/9.jpg", after: "/before-after-bundle-images/10.jpg", altBefore: "Saç Ekimi Öncesi Seyrek Saç Görünümü", altAfter: "Saç Ekimi Sonrası Gür ve Doğal Saçlar" },
  { id: 6, before: "/before-after-bundle-images/11.jpg", after: "/before-after-bundle-images/12.jpg", altBefore: "Gaziantep Tepe Bölgesi Saç Ekimi Öncesi", altAfter: "Gaziantep Tepe Bölgesi Saç Ekimi Sonrası Kapanma" },
  { id: 7, before: "/before-after-bundle-images/13.jpg", after: "/before-after-bundle-images/14.jpg", altBefore: "Ön Saç Çizgisi Kaybı Saç Ekimi Öncesi", altAfter: "Doğal Ön Saç Çizgisi Tasarımı Sonrası" },
  { id: 9, before: "/before-after-bundle-images/17.jpg", after: "/before-after-bundle-images/18.jpg", altBefore: "İleri Derece Saç Dökülmesi Öncesi", altAfter: "İleri Derece Dökülmelerde Başarılı Saç Ekimi Sonucu" },
  // New patients
  { id: 10, before: "/oncesi-sonrasi-upd/1.jpg", after: "/oncesi-sonrasi-upd/2.jpg", altBefore: "Halil Çetin Saç Ekimi Öncesi Kellik Problemi", altAfter: "Halil Çetin ile Saç Ekimi 1 Yıl Sonrası Kalıcı Sonuç" },
  { id: 11, before: "/oncesi-sonrasi-upd/3.jpg", after: "/oncesi-sonrasi-upd/4.jpg", altBefore: "Gaziantep Safir FUE Öncesi Alın Açıklığı", altAfter: "Gaziantep Safir FUE Sonrası Doğal Saç Çizgisi" },
  { id: 12, before: "/oncesi-sonrasi-upd/5.jpg", after: "/oncesi-sonrasi-upd/6.jpg", altBefore: "Tepe (Vertex) Bölgesi Seyreklik Öncesi", altAfter: "Tepe (Vertex) Bölgesi DHI Saç Ekimi Sonrası" },
  { id: 13, before: "/oncesi-sonrasi-upd/7.jpg", after: "/oncesi-sonrasi-upd/8.jpg", altBefore: "Şakak Bölgesi Saç Dökülmesi Öncesi", altAfter: "Şakak Bölgesi Sıklaştırma Ekimi Sonrası" },
  { id: 14, before: "/oncesi-sonrasi-upd/9.jpg", after: "/oncesi-sonrasi-upd/10.jpg", altBefore: "Genel Saç Seyrekliği Problemi Öncesi", altAfter: "Maksimum Greft FUE Saç Ekimi Sonrası" },
  { id: 15, before: "/oncesi-sonrasi-upd/11.jpg", after: "/oncesi-sonrasi-upd/12.jpg", altBefore: "Erkek Tipi Saç Dökülmesi Öncesi Gaziantep", altAfter: "Erkek Tipi Saç Dökülmesi Tedavisi Sonrası" },
  { id: 16, before: "/oncesi-sonrasi-upd/13.jpg", after: "/oncesi-sonrasi-upd/14.jpg", altBefore: "Ön Bölge Saç Çizgisi Geri Çekilmesi Öncesi", altAfter: "Altın Oran Saç Çizgisi Tasarımı Sonrası" },
  { id: 17, before: "/oncesi-sonrasi-upd/15.jpg", after: "/oncesi-sonrasi-upd/16.jpg", altBefore: "Saç Ekimi Öncesi Planlama ve Çizim Aşaması", altAfter: "Saç Ekimi Operasyonu Sonrası Doğal Görünüm" },
  { id: 18, before: "/oncesi-sonrasi-upd/17.jpg", after: "/oncesi-sonrasi-upd/18.jpg", altBefore: "Geniş Alan Saç Ekimi Öncesi Kellik", altAfter: "Geniş Alan Yüksek Yoğunluklu Saç Ekimi Sonrası" },
  { id: 19, before: "/oncesi-sonrasi-upd/19.jpg", after: "/oncesi-sonrasi-upd/20.jpg", altBefore: "Traşsız Saç Ekimi Öncesi Seyreklik", altAfter: "Traşsız Saç Ekimi Sonrası Gür Saçlar Gaziantep" }
];

import type { SiteContent } from "@/lib/types";

export function ResultsGallery({ content }: { content: SiteContent }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mobil kontrolü
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let rafId: number;
    let currentX = 0;
    let targetX = 0;
    let isVisible = false;
    let isTicking = true;
    let lastProgressCache = new Map<number, number>();

    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      
      isVisible = rect.top < vh && rect.bottom > 0;
      if (!isVisible) return;

      if (!isMobile) {
        const scrollY = -rect.top;
        const maxScroll = rect.height - vh;
        const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
        
        const trackWidth = trackRef.current.scrollWidth;
        const vw = window.innerWidth;
        const maxTranslate = trackWidth - vw;

        const isRtl = document.documentElement.dir === "rtl";
        targetX = isRtl ? progress * maxTranslate : progress * -maxTranslate;
      }

      if (!isTicking) {
        isTicking = true;
        tick();
      }
    };

    const tick = () => {
      if (!isVisible && (!isMobile ? Math.abs(targetX - currentX) < 0.5 : true)) {
        isTicking = false;
        return;
      }
      
      if (!isMobile && trackRef.current) {
        if (Math.abs(targetX - currentX) < 0.5) {
          currentX = targetX;
        } else {
          currentX += (targetX - currentX) * 0.1;
        }
        trackRef.current.style.transform = `translate3d(${currentX}px, 0, 0)`;
      }

      if (trackRef.current) {
        const vw = window.innerWidth;
        const splitScreenX = vw / 2;
        const cards = Array.from(trackRef.current.children).filter(c => c.classList.contains('gallery-card'));

        for (let i = 0; i < patients.length; i++) {
          const card = cards[i] as HTMLElement;
          if (!card) continue;
          
          const rect = card.getBoundingClientRect();
          let progress = (splitScreenX - rect.left) / rect.width;
          progress = Math.max(0, Math.min(1, progress));
          
          if (lastProgressCache.get(i) === progress) continue;
          lastProgressCache.set(i, progress);
          
          const topImg = card.querySelector('.gallery-top-img') as HTMLElement;
          if (topImg) {
            topImg.style.clipPath = `inset(0 0 0 ${progress * 100}%)`;
            (topImg.style as any).webkitClipPath = `inset(0 0 0 ${progress * 100}%)`;
          }
        }
      }
      
      rafId = requestAnimationFrame(tick);
    };

    const onResize = () => handleScroll();

    const handleMobileScroll = () => {
      if (isMobile && !isTicking) {
        isTicking = true;
        tick();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    
    if (trackRef.current) {
      trackRef.current.addEventListener("scroll", handleMobileScroll, { passive: true });
    }
    
    setTimeout(() => {
      handleScroll();
    }, 100);
    
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
      if (trackRef.current) {
        trackRef.current.removeEventListener("scroll", handleMobileScroll);
      }
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <section 
      ref={containerRef} 
      className="relative z-50 bg-background border-t border-line"
      style={{ height: isMobile ? "auto" : "300vh" }}
    >
      <div className="md:sticky md:top-0 md:h-screen w-full md:overflow-hidden flex flex-col justify-center py-24 md:py-0">
        
        {/* Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 opacity-20 blur-[150px] hidden md:block" />

        {/* Section Title */}
        <div className="md:absolute top-16 left-5 md:top-8 md:left-12 z-20 pointer-events-none px-5 md:px-0 mb-8 md:mb-0">
          <p className="text-xs tracking-[0.28em] text-gold uppercase mb-4">
            {content.ui.gallery.eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-4xl lg:text-5xl text-foreground md:whitespace-nowrap">
            {content.ui.gallery.title}
          </h2>
        </div>

        {/* Central Fixed Line */}
        <div className="flex pointer-events-none absolute left-1/2 top-[20vh] bottom-[20vh] md:top-[10vh] md:bottom-[10vh] flex-col items-center justify-center z-40 -translate-x-1/2">
          <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-gold to-transparent opacity-80" />
          <div className="absolute w-[30px] h-1/2 bg-gold/40 blur-2xl" />
          <div className="absolute w-[4px] h-[80px] bg-card rounded-full shadow-[0_0_20px_4px_var(--gold)]" />
        </div>

        {/* Horizontal Track / Mobile Grid */}
        <div 
          ref={trackRef} 
          className="flex md:items-center gap-4 md:gap-6 px-5 md:px-0 md:pl-[60vw] md:pr-[60vw] w-full md:w-max overflow-x-auto snap-x snap-mandatory md:overflow-visible pb-8 md:pb-0 hide-scrollbar"
          style={{ willChange: isMobile ? "auto" : "transform" }}
        >
          {patients.map((p, index) => (
            <div 
              key={p.id} 
              className="gallery-card relative w-[80vw] sm:w-[60vw] md:w-[35vw] lg:w-[28vw] aspect-[4/5] shrink-0 snap-center rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl"
            >
              {/* After image (Left side) */}
              <Image
                src={p.after}
                alt={p.altAfter}
                fill
                sizes="(max-width: 768px) 80vw, 35vw"
                className="pointer-events-none object-cover object-top"
              />
              {/* Before image (Right side) */}
              <Image
                src={p.before}
                alt={p.altBefore}
                fill
                sizes="(max-width: 768px) 80vw, 35vw"
                className="gallery-top-img pointer-events-none object-cover object-top block"
                style={{ clipPath: "inset(0 0 0 50%)", WebkitClipPath: "inset(0 0 0 50%)" }}
              />
              
              {/* Mobile Label */}
              <div className="absolute bottom-4 left-4 z-10 md:hidden bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20">
                12 {content.ui.gallery.monthsLater}
              </div>
            </div>
          ))}
          
          {/* End spacing (Desktop Only) */}
          <div className="hidden md:block w-[15vw] shrink-0" />
        </div>
      </div>
    </section>
  );
}
