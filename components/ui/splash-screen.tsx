"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Animated Splash Screen
 * Uses an SVG mask with a scaled circle to create an "iris wipe" effect
 * that opens from the center towards the edges.
 * SVG mask + transform scale is perfectly GPU accelerated and lag-free on Safari/Opera.
 */
export function SplashScreen() {
  const pathname = usePathname();
  const [key, setKey] = useState(0);

  // Re-trigger animation on every page navigation
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [pathname]);

  return <SplashAnimation key={key} />;
}

function SplashAnimation() {
  const circleRef = useRef<SVGCircleElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!circleRef.current || !logoRef.current || !containerRef.current) return;
    
    let rafId: number;

    // 1. Initial State (Reset)
    circleRef.current.setAttribute("r", "0");
    
    logoRef.current.style.transition = "none";
    logoRef.current.style.opacity = "1";
    logoRef.current.style.transform = "scale(1)";
    
    containerRef.current.style.display = "block";

    const reveal = () => {
      if (!logoRef.current || !circleRef.current || !containerRef.current) return;
      
      // 2. Logo fades out and shrinks slightly
      logoRef.current.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      logoRef.current.style.opacity = "0";
      logoRef.current.style.transform = "scale(0.9)";

      // 3. Animate SVG circle 'r' attribute via RAF (Safari workaround)
      setTimeout(() => {
        let progress = 0;
        const duration = 1200; // ms
        const start = performance.now();

        const tick = (now: number) => {
          const elapsed = now - start;
          progress = Math.min(elapsed / duration, 1);
          
          // easeInOutQuint approximation for smooth acceleration/deceleration
          const t = progress < 0.5 
            ? 16 * Math.pow(progress, 5) 
            : 1 - Math.pow(-2 * progress + 2, 5) / 2;
          
          // Max radius 4000px covers large 4K screens easily
          const r = t * 4000;
          if (circleRef.current) {
            circleRef.current.setAttribute("r", r.toString());
          }

          if (progress < 1) {
            rafId = requestAnimationFrame(tick);
          } else {
            // 4. Hide wrapper when animation finishes so user can click things
            if (containerRef.current) {
              containerRef.current.style.display = "none";
            }
          }
        };

        rafId = requestAnimationFrame(tick);
      }, 150);
    };

    // If we are on the home page, wait for the heavy video & images to preload
    // via the 'app-ready' event. For other pages, just use a short delay.
    let timer: NodeJS.Timeout;
    const pathname = window.location.pathname;
    
    if (pathname === "/") {
      let revealed = false;
      const onReady = () => {
        if (revealed) return;
        revealed = true;
        reveal();
        window.removeEventListener("app-ready", onReady);
      };
      window.addEventListener("app-ready", onReady);
      // Fallback max wait in case fetch fails
      timer = setTimeout(onReady, 5000);
    } else {
      timer = setTimeout(reveal, 600);
    }
    
    return () => {
      clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Black overlay with an SVG hole mask */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <mask id="splash-mask">
            {/* White background: solid black */}
            <rect width="100%" height="100%" fill="white" />
            {/* Black circle: creates a transparent hole */}
            <circle
              ref={circleRef}
              cx="50%"
              cy="50%"
              r="0"
              fill="black"
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="#050505" mask="url(#splash-mask)" />
      </svg>

      {/* Logo and Glow */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative flex items-center justify-center">
          <div
            style={{
              position: "absolute",
              width: "440px",
              height: "440px",
              background:
                "radial-gradient(circle at center, rgba(196,164,106,0.3) 0%, rgba(196,164,106,0.08) 38%, transparent 65%)",
            }}
          />
          <img
            src="/DARK-BG.svg"
            alt="Halil Çetin"
            className="relative z-10 h-12 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
