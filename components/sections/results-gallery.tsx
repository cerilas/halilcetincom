"use client";

import { useEffect, useRef } from "react";

const patients = [
  { id: 1, before: "/oncesi-sonrasi galeri/1.jpg", after: "/oncesi-sonrasi galeri/2.jpg" },
  { id: 2, before: "/oncesi-sonrasi galeri/3.jpg", after: "/oncesi-sonrasi galeri/4.jpg" },
  { id: 3, before: "/oncesi-sonrasi galeri/5.jpg", after: "/oncesi-sonrasi galeri/6.jpg" },
  { id: 4, before: "/oncesi-sonrasi galeri/7.jpg", after: "/oncesi-sonrasi galeri/8.jpg" },
  { id: 5, before: "/oncesi-sonrasi galeri/9.jpg", after: "/oncesi-sonrasi galeri/10.jpg" },
];

export function ResultsGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let currentX = 0;
    let targetX = 0;
    let isVisible = false;
    let cardMetrics: { left: number; width: number }[] = [];

    const updateMetrics = () => {
      if (!trackRef.current) return;
      const cards = trackRef.current.children;
      cardMetrics = [];
      for (let i = 0; i < patients.length; i++) {
        const card = cards[i] as HTMLElement;
        if (card) {
          cardMetrics.push({ left: card.offsetLeft, width: card.offsetWidth });
        }
      }
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
    };

    const tick = () => {
      if (!isVisible) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      
      // Snap to target if very close to avoid infinite micro-updates
      if (Math.abs(targetX - currentX) < 0.1) {
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
          
          // Apply clipPath directly to the top image for zero-latency synchronization
          const card = trackRef.current.children[i] as HTMLElement;
          if (card) {
            const topImg = card.querySelector('.gallery-top-img') as HTMLElement;
            if (topImg) {
              topImg.style.clipPath = `inset(0 0 0 ${progress * 100}%)`;
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
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative z-50 bg-background border-t border-line"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        
        {/* Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 opacity-20 blur-[150px]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.02] bg-[url('/noise.png')]" />

        {/* Section Title */}
        <div className="absolute top-16 left-5 md:top-24 md:left-12 z-20 pointer-events-none">
          <p className="text-xs tracking-[0.28em] text-gold uppercase mb-4">
            Kanıtlanmış Sonuçlar
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-foreground">
            Halil Çetin ile<br className="hidden md:block" /> Büyük Değişim.
          </h2>
        </div>

        {/* Central Fixed Line */}
        <div className="pointer-events-none absolute left-1/2 top-[10vh] bottom-[10vh] flex flex-col items-center justify-center z-40 -translate-x-1/2">
          <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-gold to-transparent opacity-80" />
          <div className="absolute w-[30px] h-1/2 bg-gold/40 blur-2xl" />
          <div className="absolute w-[4px] h-[80px] bg-[#fffaf0] rounded-full shadow-[0_0_20px_4px_#C4A46A]" />
        </div>

        {/* Horizontal Track */}
        <div 
          ref={trackRef} 
          // Huge padding so first card starts on the right, and last card ends on the left
          className="flex items-center gap-6 pl-[60vw] pr-[60vw] w-max"
          style={{ willChange: "transform" }}
        >
          {patients.map((p, index) => (
            <div 
              key={p.id} 
              className="gallery-card relative w-[70vw] md:w-[35vw] lg:w-[28vw] aspect-[3/4] md:aspect-[4/5] shrink-0 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl"
            >
              {/* After image (Left side) */}
              <img
                src={p.after}
                alt={`Hasta ${index + 1} Sonrası`}
                className="pointer-events-none absolute inset-0 w-full h-full object-cover object-top"
              />
              {/* Before image (Right side) */}
              <img
                src={p.before}
                alt={`Hasta ${index + 1} Öncesi`}
                className="gallery-top-img pointer-events-none absolute inset-0 w-full h-full object-cover object-top"
                style={{ clipPath: "inset(0 0 0 50%)" }}
              />
              
              <span className="pointer-events-none absolute bottom-4 left-4 z-30 whitespace-nowrap text-[10px] tracking-[0.2em] text-gold/90 uppercase font-medium drop-shadow-md">
                SONRASI
              </span>
              <span className="pointer-events-none absolute bottom-4 right-4 z-30 whitespace-nowrap text-[10px] tracking-[0.2em] text-gold/90 uppercase font-medium drop-shadow-md">
                ÖNCESİ
              </span>
            </div>
          ))}
          
          {/* End spacing */}
          <div className="w-[15vw] shrink-0" />
        </div>
      </div>
    </section>
  );
}
