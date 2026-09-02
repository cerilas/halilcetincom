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
