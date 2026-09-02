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
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [sliderPosition, setSliderPosition] = useState(20);
  const [videoSrc, setVideoSrc] = useState<string>("");

  // Preload video and images for a smooth scroll experience
  // The Splash Screen will wait for the 'app-ready' event before revealing.
  useEffect(() => {
    // 1. Fetch Video as Blob (Fixes Opera/Chromium buffering issues)
    const videoPromise = fetch("/results/after-video.mp4")
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob));

    // 2. Preload high-res comparison images
    const loadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Don't block splash screen on failure
      });
    };

    const img1 = loadImage("/results/after_new.png");
    const img2 = loadImage("/results/before_new.png");

    Promise.all([videoPromise, img1, img2])
      .then(([videoUrl]) => {
        setVideoSrc(videoUrl as string);
        // Signal splash screen to open
        window.dispatchEvent(new Event("app-ready"));
      })
      .catch((err) => {
        console.error("Error preloading assets:", err);
        // Fallback open
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
      targetProgress = Math.max(0, Math.min(1, scrolled / maxScroll));
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
      if (videoRef.current && videoRef.current.duration) {
        const phase2Progress = Math.max(0, (p - 0.4) / 0.6);
        const targetTime = phase2Progress * videoRef.current.duration;
        
        // Videos are usually 30fps (33ms per frame). Scrubbing faster than 0.04s causes extreme CPU lag,
        // because the browser tries to decode sub-frames. We threshold it to 0.05s.
        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.05) {
          videoRef.current.currentTime = targetTime;
        }
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
        <div className="absolute inset-0 z-0 bg-[#07080b]">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />
        </div>
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#E8D5A3" />

        {/* Comparison slider */}
        <div className="absolute inset-0 flex items-center justify-center pt-24 pb-32">
          <div 
            className="relative w-[80%] h-[70vh] max-h-[700px] max-w-5xl pointer-events-none rounded-2xl overflow-hidden ring-1 ring-white/10"
          >
            <ComparisonSlider
              beforeImage="/results/after_new.png"
              beforeVideo={videoSrc || undefined}
              videoRef={videoRef}
              afterImage="/results/before_new.png"
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
              labelText={{ before: "Sonra", after: "Önce" }}
              labelPosition="top-left"
              className="h-full w-full pointer-events-auto"
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
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          
          <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-32 pointer-events-auto">
            <div className="max-w-xl">
              <p className="text-xs tracking-[0.32em] text-gold uppercase">
                {content.hero.eyebrow}
              </p>
              <h1 className="mt-4 font-display text-[2.6rem] leading-[0.95] sm:text-6xl md:text-7xl">
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
                  href="/iletisim"
                  className="relative bg-gold text-black"
                >
                  {content.hero.primaryCta}
                </GlareButton>
                <GlareButton
                  href="/sonuclar"
                  className="border border-line text-foreground"
                >
                  {content.hero.secondaryCta}
                </GlareButton>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll hint */}
        <div className="absolute bottom-4 right-5 z-30 lg:hidden">
          <p className="text-[10px] tracking-[0.22em] text-muted/50 uppercase">
            Kaydırın · 12. ay sonuç
          </p>
        </div>
      </div>
    </section>
  );
}
