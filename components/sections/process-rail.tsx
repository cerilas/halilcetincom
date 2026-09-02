"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { ProcessStep } from "@/lib/types";

export function ProcessRail({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 40%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-5 py-24">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">Süreç</p>
      <h2 className="mt-3 font-display text-4xl md:text-5xl">
        Kusursuz Sonuca Giden 6 Adım.
      </h2>
      <div className="relative mt-14 pl-8">
        <div className="absolute top-0 bottom-0 left-[7px] w-px bg-line" />
        <motion.div
          style={{ height }}
          className="absolute top-0 left-[7px] w-px bg-gold"
        />
        <div className="space-y-12">
          {steps.map((step, i) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              className="relative"
            >
              <span className="absolute top-1.5 -left-8 h-3.5 w-3.5 rounded-full border border-gold bg-background" />
              <h3 className="font-display text-2xl">{step.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
                {step.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
