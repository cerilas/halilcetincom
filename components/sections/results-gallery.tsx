"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const patients = [
  { id: 1, before: "/before-after-bundle-images/1.jpg", after: "/before-after-bundle-images/2.jpg" },
  { id: 2, before: "/before-after-bundle-images/3.jpg", after: "/before-after-bundle-images/4.jpg" },
  { id: 3, before: "/before-after-bundle-images/5.jpg", after: "/before-after-bundle-images/6.jpg" },
  { id: 4, before: "/before-after-bundle-images/7.jpg", after: "/before-after-bundle-images/8.jpg" },
  { id: 5, before: "/before-after-bundle-images/9.jpg", after: "/before-after-bundle-images/10.jpg" },
  { id: 6, before: "/before-after-bundle-images/11.jpg", after: "/before-after-bundle-images/12.jpg" },
  { id: 7, before: "/before-after-bundle-images/13.jpg", after: "/before-after-bundle-images/14.jpg" },
  { id: 8, before: "/before-after-bundle-images/15.jpg", after: "/before-after-bundle-images/16.jpg" },
  { id: 9, before: "/before-after-bundle-images/17.jpg", after: "/before-after-bundle-images/18.jpg" },
];

export function ResultsGallery() {
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
    let cardMetrics: { left: number; width: number }[] = [];
    let lastProgressCache = new Map<number, number>();

    if (isMobile) {
      // Mobilde JS tabanlı animasyonu tamamen kapat
      return;
    }

    const updateMetrics = () => {
      if (!trackRef.current) return;
      const cards = Array.from(trackRef.current.children) as HTMLElement[];
      
      // Sadece galeri kartlarını al
      const validCards = cards.filter(c => c.classList.contains('gallery-card'));
      
      cardMetrics = validCards.map((card) => {
        return {
          left: card.offsetLeft,
          width: card.offsetWidth
        };
      });
    };

    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      
      // Stop processing if section is completely out of view
      isVisible = rect.top < vh && rect.bottom > 0;
      if (!isVisible) return;

      const scrollY = -rect.top;
      const maxScroll = rect.height - vh;
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      
      const trackWidth = trackRef.current.scrollWidth;
      const vw = window.innerWidth;
      const maxTranslate = trackWidth - vw;

      targetX = progress * -maxTranslate;

      if (!isTicking) {
        isTicking = true;
        tick();
      }
    };

    const tick = () => {
      if (!isVisible && Math.abs(targetX - currentX) < 0.5) {
        // Stop looping completely if not visible and already at target
        isTicking = false;
        return;
      }
      
      // Snap to target if very close to avoid infinite micro-updates
      if (Math.abs(targetX - currentX) < 0.5) {
        currentX = targetX;
      } else {
        currentX += (targetX - currentX) * 0.1;
      }
      
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${currentX}px, 0, 0)`;

        const vw = window.innerWidth;

        for (let i = 0; i < patients.length; i++) {
          const metrics = cardMetrics[i];
          if (!metrics) continue;
          
          // The fixed central line is at vw / 2.
          const splitScreenX = vw / 2;
          const screenX = metrics.left + currentX;
          let progress = (splitScreenX - screenX) / metrics.width;
          
          progress = Math.max(0, Math.min(1, progress));
          
          // Performans Optimizasyonu: Sadece progress değeri değişen kartların DOM'unu güncelle.
          // Bu, mobilde saniyede 60 kez gereksiz yere 9 kartın stilini hesaplamayı önler.
          if (lastProgressCache.get(i) === progress) continue;
          lastProgressCache.set(i, progress);
          
          // Apply clipPath directly to the top image for zero-latency synchronization
          const card = trackRef.current.children[i] as HTMLElement;
          if (card) {
            const topImg = card.querySelector('.gallery-top-img') as HTMLElement;
            if (topImg) {
              topImg.style.clipPath = `inset(0 0 0 ${progress * 100}%)`;
              (topImg.style as any).webkitClipPath = `inset(0 0 0 ${progress * 100}%)`;
            }
          }
        }
      }
      
      rafId = requestAnimationFrame(tick);
    };

    const onResize = () => {
      updateMetrics();
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    
    // Initial setup (delay metrics slightly to ensure DOM is ready)
    setTimeout(() => {
      updateMetrics();
      handleScroll();
    }, 100);
    
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
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
        <div className="md:absolute top-16 left-5 md:top-24 md:left-12 z-20 pointer-events-none px-5 md:px-0 mb-8 md:mb-0">
          <p className="text-xs tracking-[0.28em] text-gold uppercase mb-4">
            Kanıtlanmış Sonuçlar
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-foreground">
            Halil Çetin ile<br className="hidden md:block" /> Büyük Değişim.
          </h2>
        </div>

        {/* Central Fixed Line (Desktop Only) */}
        <div className="hidden md:flex pointer-events-none absolute left-1/2 top-[10vh] bottom-[10vh] flex-col items-center justify-center z-40 -translate-x-1/2">
          <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-gold to-transparent opacity-80" />
          <div className="absolute w-[30px] h-1/2 bg-gold/40 blur-2xl" />
          <div className="absolute w-[4px] h-[80px] bg-[#fffaf0] rounded-full shadow-[0_0_20px_4px_#C4A46A]" />
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
                alt={`Gaziantep Saç Ekimi Sonucu Hasta ${index + 1} - 12. Ay Sonrası`}
                fill
                sizes="(max-width: 768px) 80vw, 35vw"
                className="pointer-events-none object-cover object-top"
              />
              {/* Before image (Right side) - Hidden on mobile for performance, or statically halved */}
              <Image
                src={p.before}
                alt={`Gaziantep Saç Ekimi Öncesi Hasta ${index + 1} - Kellik ve Seyreklik`}
                fill
                sizes="(max-width: 768px) 80vw, 35vw"
                className="gallery-top-img pointer-events-none object-cover object-top hidden md:block"
                style={{ clipPath: "inset(0 0 0 50%)", WebkitClipPath: "inset(0 0 0 50%)" }}
              />
              
              {/* Mobile Label */}
              <div className="absolute bottom-4 left-4 z-10 md:hidden bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20">
                12. Ay Sonuç
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
