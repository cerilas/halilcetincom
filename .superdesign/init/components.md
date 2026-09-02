# Shared UI primitives

Framework: Next.js 16 App Router + React 19 + Tailwind v4 + Motion. Custom primitives; no shadcn install.

## MagneticButton
- Path: `components/react-bits/magnetic-button.tsx`
- Description: Spring-follow CTA used as pill button or link.

```tsx
"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export function MagneticButton({
  children,
  className,
  href,
  strength = 0.35,
  type,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16 });
  const springY = useSpring(y, { stiffness: 220, damping: 16 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const shared = {
    ref: ref as never,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: { x: springX, y: springY },
    className: cn(
      "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm tracking-wide transition-colors",
      className,
    ),
  };

  if (href) {
    return (
      <motion.a href={href} {...shared}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type ?? "button"} {...shared}>
      {children}
    </motion.button>
  );
}
```

## PinCard
- Path: `components/ui/pin-card.tsx`
- Description: 3D tilt card with hover pin label.

```tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function PinCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn("relative group/pin h-full", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{ perspective: "1000px" }}
        className="h-full"
      >
        <motion.div
          animate={
            hovered
              ? { rotateX: 8, rotateY: -8, scale: 1.02 }
              : { rotateX: 0, rotateY: 0, scale: 1 }
          }
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="relative h-full overflow-hidden rounded-2xl border border-line bg-card"
        >
          {children}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-gold/5" />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        className="pointer-events-none absolute -top-3 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="rounded-full border border-gold/30 bg-background/90 px-3 py-1 text-[11px] tracking-[0.18em] text-gold-soft uppercase">
          {title}
        </span>
      </motion.div>
    </div>
  );
}
```

## Marquee
- Path: `components/ui/marquee.tsx`
- Description: Infinite horizontal ticker.

```tsx
import { cn } from "@/lib/utils";

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  repeat = 4,
}: {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  repeat?: number;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem] [--duration:40s] [gap:var(--gap)]",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            reverse ? "animate-marquee-reverse" : "animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
```

## Spotlight
- Path: `components/ui/spotlight.tsx`
- Description: SVG spotlight overlay for hero.

```tsx
import { cn } from "@/lib/utils";

export function Spotlight({
  className,
  fill = "white",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute z-[1] h-[169%] w-[138%] animate-spotlight opacity-0 lg:w-[84%]",
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#spotlight-filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="spotlight-filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}
```

## NumberTicker
- Path: `components/ui/number-ticker.tsx`
- Description: Count-up stat when in view.

```tsx
"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  motion,
} from "motion/react";
import { cn } from "@/lib/utils";

export function NumberTicker({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 40, stiffness: 80 });
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest).toLocaleString("tr-TR")}${suffix}`;
      }
    });
    return unsubscribe;
  }, [spring, suffix]);

  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums", className)}
    >
      0{suffix}
    </motion.span>
  );
}
```

## BorderBeam
- Path: `components/ui/border-beam.tsx`
- Description: Rotating conic border highlight.

```tsx
import { cn } from "@/lib/utils";

export function BorderBeam({
  className,
  size = 140,
  duration = 8,
  colorFrom = "#C4A46A",
  colorTo = "transparent",
}: {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className,
      )}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          padding: 1,
          background: `conic-gradient(from var(--beam-angle), ${colorFrom}, ${colorTo}, ${colorFrom})`,
          animation: `spin-beam ${duration}s linear infinite`,
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />
      <style>{`
        @property --beam-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin-beam {
          to { --beam-angle: 360deg; }
        }
      `}</style>
      <span className="sr-only" style={{ width: size }} />
    </div>
  );
}
```

## FaqList
- Path: `components/ui/faq-list.tsx`
- Description: Accordion FAQ list.

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Faq } from "@/lib/types";

export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((faq) => {
        const isOpen = open === faq.id;
        return (
          <div key={faq.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              onClick={() => setOpen(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
            >
              <span className="text-lg text-foreground">{faq.question}</span>
              <span className="text-gold">{isOpen ? "–" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 max-w-3xl text-sm leading-7 text-muted">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
```

## ScrollProgress
- Path: `components/ui/scroll-progress.tsx`
- Description: Fixed gold top progress bar.

```tsx
"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 right-0 left-0 z-50 h-[2px] bg-gold"
    />
  );
}
```

## SplitText
- Path: `components/react-bits/split-text.tsx`
- Description: Word-stagger reveal heading.

```tsx
"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function SplitText({
  text,
  className,
  delay = 0.04,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const words = text.split(" ");

  return (
    <Tag className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="mr-[0.28em] overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
```
