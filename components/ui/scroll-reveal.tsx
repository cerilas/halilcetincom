"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 40,
  threshold = 0.15,
  ...props
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once it becomes visible, we don't need to observe anymore
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.05, // Trigger when just 5% is visible
        rootMargin: "0px 0px 100px 0px", // Trigger 100px before it even enters the viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out", // Reduced from 1000 to 700 for snappier feel
        isVisible ? "opacity-100 translate-y-0" : "opacity-0",
        className
      )}
      style={{
        transform: isVisible ? "translateY(0)" : `translateY(${y}px)`,
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
