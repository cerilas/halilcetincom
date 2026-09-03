"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function ParallaxBio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const fgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bg = bgRef.current;
    const fg = fgRef.current;
    if (!container || !bg || !fg) return;

    let rafId: number | null = null;
    let lastScrollY = -1;

    const update = () => {
      rafId = null;
      const scrollY = window.scrollY;
      if (scrollY === lastScrollY) return;
      lastScrollY = scrollY;

      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      // progress: 0 when element enters bottom, 1 when it leaves top
      const progress = 1 - rect.bottom / (viewH + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));

      const bgTranslate = (clamped - 0.5) * 30; // ±15px
      const fgTranslate = (0.5 - clamped) * 20; // ±10px
      const fgScale = 0.85 + clamped * 0.3; // 0.85 → 1.15

      bg.style.transform = `translate3d(0, ${bgTranslate}px, 0)`;
      fg.style.transform = `translate3d(0, ${fgTranslate}px, 0) scale(${fgScale})`;
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative mb-6 rounded-2xl border border-line bg-background p-2 aspect-[4/5] w-[85%] max-w-[280px] sm:max-w-[320px] group cursor-pointer"
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl bg-background/50">
        <Image 
          ref={bgRef}
          src="/uzman-halil-cetin-sac-ekimi-gaziantep-bg.png" 
          alt="Gaziantep Saç Ekimi Kliniği - VIP Ortam" 
          fill
          sizes="(max-width: 768px) 50vw, 320px"
          className="absolute -left-[15%] -top-[15%] h-[130%] w-[130%] max-w-none object-cover opacity-80 transition-opacity group-hover:opacity-100 will-change-transform"
          style={{ transformOrigin: "center center" }}
        />
      </div>
        
      <Image 
        ref={fgRef}
        src="/uzman-halil-cetin-sac-ekimi-gaziantep-fg.png" 
        alt="Saç Ekim Uzmanı Halil Çetin Profil" 
        fill
        sizes="(max-width: 768px) 50vw, 320px"
        className="absolute bottom-0 left-0 w-full h-[120%] object-contain object-bottom pointer-events-none will-change-transform"
        style={{ 
          transformOrigin: "bottom center",
          WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)"
        }}
      />
    </div>
  );
}
