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
