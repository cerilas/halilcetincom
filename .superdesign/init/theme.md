# Theme tokens

## Compact summary
- Background `#07080b`
- Foreground `#f3eee4`
- Gold `#c4a46a` / gold-soft `#e8d5a3`
- Muted `#9a9386`
- Line `rgba(243,238,228,0.1)`
- Card `#101216` / hover `#16191f`
- Fonts: Geist Sans (body), Instrument Serif (display, italic headlines)
- Radius: pills `rounded-full`, cards `rounded-2xl`, forms `rounded-xl`
- Max width: `max-w-6xl`, page padding `px-5`
- Motion: spotlight fade-in, marquee, number ticker, 3D card tilt, magnetic buttons, scroll progress

## Raw source

### `app/globals.css`
```css
@import "tailwindcss";

:root {
  --background: #07080b;
  --foreground: #f3eee4;
  --gold: #c4a46a;
  --gold-soft: #e8d5a3;
  --muted: #9a9386;
  --line: rgba(243, 238, 228, 0.1);
  --card: #101216;
  --card-hover: #16191f;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-gold: var(--gold);
  --color-gold-soft: var(--gold-soft);
  --color-muted: var(--muted);
  --color-line: var(--line);
  --color-card: var(--card);
  --color-card-hover: var(--card-hover);
  --font-sans: var(--font-geist-sans);
  --font-display: var(--font-instrument);
  --animate-spotlight: spotlight 2s ease 0.75s 1 forwards;
  --animate-marquee: marquee var(--duration, 40s) linear infinite;
  --animate-marquee-reverse: marquee var(--duration, 40s) linear infinite reverse;
  --animate-shimmer: shimmer 2.4s linear infinite;
  --animate-beam: beam 7s linear infinite;
  --animate-float: float 8s ease-in-out infinite;
  --animate-grid: grid-fade 1.2s ease both;
}

@keyframes spotlight {
  0% {
    opacity: 0;
    transform: translate(-72%, -62%) scale(0.5);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -40%) scale(1);
  }
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap, 1rem)));
  }
}

@keyframes shimmer {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

@keyframes beam {
  0% {
    offset-distance: 0%;
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  92% {
    opacity: 1;
  }
  100% {
    offset-distance: 100%;
    opacity: 0;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes grid-fade {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-geist-sans), system-ui, sans-serif;
}

::selection {
  background: color-mix(in oklab, var(--gold) 40%, transparent);
  color: #fff8ea;
}

.font-display {
  font-family: var(--font-instrument), ui-serif, Georgia, serif;
}

.grid-lights {
  background-image:
    linear-gradient(to right, rgba(196, 164, 106, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(196, 164, 106, 0.08) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
}

.gold-line {
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in oklab, var(--gold) 70%, white),
    transparent
  );
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### `lib/utils.ts`
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function whatsappHref(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, "");
  const text = message
    ? `?text=${encodeURIComponent(message)}`
    : "";
  return `https://wa.me/${digits}${text}`;
}
```
