"use client";

import React, { useRef, useState, useEffect } from "react";
import { ComparisonSlider } from "@/components/ui/comparison-slider";
import { LineWaves } from "@/components/ui/line-waves";
import { Spotlight } from "@/components/ui/spotlight";
import { GlareButton } from "@/components/ui/glare-button";
import { SplitText } from "@/components/react-bits/split-text";
import type { SiteContent } from "@/lib/types";

export function HeroScrollSequence({ content }: { content: SiteContent }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [sliderPosition, setSliderPosition] = useState(20);
  const [videoProgress, setVideoProgress] = useState(0);

  // Preload video and images for a smooth scroll experience
  // The Splash Screen will wait for the 'app-ready' event before revealing.
  useEffect(() => {
    const loadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Don't block splash screen on failure
      });
    };

    // Preload first 15 frames for quick initial paint
    const initialFrames = [];
    for (let i = 1; i <= 15; i++) {
      const num = i.toString().padStart(4, "0");
      initialFrames.push(loadImage(`/webp_frames_20fps/frame_${num}.webp`));
    }

    // Preload high-res comparison images
    const img1 = loadImage("/results/sac-ekimi-sonrasi-dogal-gorunum.png");
    const img2 = loadImage("/before222.webp");

    Promise.all([...initialFrames, img1, img2])
      .then(() => {
        // Signal splash screen to open
        window.dispatchEvent(new Event("app-ready"));

        // Lazy load the rest in background
        for (let i = 16; i <= 200; i++) {
          const num = i.toString().padStart(4, "0");
          const img = new Image();
          img.src = `/webp_frames_20fps/frame_${num}.webp`;
        }
      })
      .catch((err) => {
        console.error("Error preloading assets:", err);
        window.dispatchEvent(new Event("app-ready"));
      });
  }, []);

  useEffect(() => {
    let targetProgress = 0;
    let currentProgress = 0;
    let rafId: number | null = null;
    let isRunning = false;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const maxScroll = rect.height - vh;
      const scrolled = -rect.top;
      const newTarget = Math.max(0, Math.min(1, scrolled / maxScroll));
      
      // Performans Optimizasyonu: Eğer hedeflenen ilerleme değişmediyse (örneğin animasyon bittiyse ve aşağı inmeye devam ediliyorsa), boş yere RAF başlatma.
      if (newTarget === targetProgress) return;
      targetProgress = newTarget;

      // Only kick off RAF if not already running
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      const diff = targetProgress - currentProgress;
      currentProgress += diff * 0.1;

      if (Math.abs(diff) < 0.0003) {
        currentProgress = targetProgress;
        isRunning = false;
        rafId = null;
        // Apply final state and stop
        applyProgress(currentProgress);
        return;
      }

      applyProgress(currentProgress);
      rafId = requestAnimationFrame(tick);
    };

    let lastSliderPos = 20;

    const applyProgress = (p: number) => {
      // Phase 1 (0 to 0.4): Slider moves from 20% to 100%
      const phase1Progress = Math.min(1, p / 0.4);
      const newPos = 20 + phase1Progress * 80;
      
      // Throttle React state updates to avoid rendering 60 times a second
      if (Math.abs(newPos - lastSliderPos) > 0.5 || newPos === 20 || newPos === 100) {
        lastSliderPos = newPos;
        setSliderPosition(newPos);
      }

      // Phase 2 (0.4 to 1.0): Video scrubs
      const phase2Progress = Math.max(0, (p - 0.4) / 0.6);
      
      if (Math.abs(phase2Progress - videoProgress) > 0.001) {
        setVideoProgress(phase2Progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    // Jump to initial state immediately
    currentProgress = targetProgress;
    applyProgress(currentProgress);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col isolate">
        {/* Background decorators - Removed WebGL LineWaves for performance */}
        <div className="absolute inset-0 z-0 bg-white dark:bg-[#07080b]">
          <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] bg-[url('/noise.png')]" />
        </div>
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#E8D5A3" />

        {/* Comparison slider */}
        <div className="absolute inset-0 flex items-center justify-center pt-24 pb-32">
          <div 
            className="relative w-full h-[70vh] md:w-[80%] max-h-[700px] max-w-5xl pointer-events-none md:rounded-2xl overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
            }}
          >
            <ComparisonSlider
              beforeImage="/results/sac-ekimi-sonrasi-dogal-gorunum.png"
              sequencePrefix="/webp_frames_20fps/frame_"
              sequenceExt=".webp"
              sequenceCount={200}
              sequenceProgress={videoProgress}
              afterImage="/before222.webp"
              priority={true}
              beforeAlt="Saç ekimi sonrası — doğal yoğunluk ve çizgi"
              afterAlt="Saç ekimi öncesi — seyrek ön hat ve tepe"
              value={sliderPosition}
              scrollDriven={false} /* Controlled by parent */
              dividerColor="#C4A46A"
              handleColor="#C4A46A"
              dividerWidth={1}
              dividerExtent={1}
              handleSize={44}
              showLabels
              labelText={{ before: "Önce", after: "Sonra" }}
              labelPosition="top-left"
              className="h-full w-full pointer-events-none"
              imageClassName="object-cover object-top"
              handleClassName="z-20 border border-gold/80 bg-background/55 text-gold shadow-[0_0_18px_rgba(255,246,220,0.8),0_0_40px_rgba(196,164,106,0.9),0_0_72px_rgba(196,164,106,0.45)] backdrop-blur-md"
              labelClassName="tracking-[0.28em]"
              ariaLabel="Saç ekimi önce ve sonra karşılaştırması"
            />
          </div>
        </div>

        {/* Text overlay — bottom-left with gradient fade */}
        <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none">
          {/* Gradient: transparent at top → dark at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 dark:from-[#07080b] dark:via-[#07080b]/80 to-transparent" />
          
          <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-32 pointer-events-auto">
            <div className="max-w-xl">
              <p className="text-xs tracking-[0.32em] text-gold uppercase">
                {content.hero.eyebrow}
              </p>
              <h1 className="mt-4 font-display text-[2.6rem] leading-[0.95] sm:text-6xl md:text-7xl text-foreground">
                <SplitText text={content.hero.title} as="span" className="block" />
                <em className="mt-2 block italic text-gold-soft">
                  {content.hero.italic}
                </em>
              </h1>
              <p className="mt-6 max-w-md text-base leading-8 text-muted">
                {content.hero.subtitle}
              </p>
              
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <GlareButton
                  href="/randevu"
                  className="relative bg-gold text-white font-bold dark:text-black dark:font-medium"
                >
                  {content.hero.primaryCta}
                </GlareButton>
                <a
                  href={`https://wa.me/${content.clinic.whatsapp}?text=Merhaba,%20ücretsiz%20saç%20ekimi%20analizi%20için%20ulaşıyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[3.25rem] items-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-bold text-white transition-transform hover:scale-105"
                >
                  <img src="/WhatsApp.svg.webp" alt="WhatsApp" className="h-5 w-5 object-contain" />
                  WhatsApp'tan Ulaş
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll hint */}
        <div className="absolute bottom-4 right-5 z-30 lg:hidden">
          <p className="text-[10px] tracking-[0.22em] text-muted/60 uppercase">
            Kaydırın · 12. ay sonuç
          </p>
        </div>
      </div>
    </section>
  );
}
