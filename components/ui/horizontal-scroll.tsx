"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HorizontalScroll({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    
    // If the user is scrolling vertically (deltaY is non-zero) 
    // and not horizontally (deltaX is 0), translate it to horizontal scroll
    if (e.deltaY !== 0 && e.deltaX === 0) {
      // Prevent default vertical scrolling if we are actively scrolling this container
      // However, React passive event listeners make e.preventDefault() tricky here.
      // But just incrementing scrollLeft often is enough.
      const el = scrollRef.current;
      const isAtLeft = el.scrollLeft === 0;
      const isAtRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

      // Only scroll horizontally if we aren't at the edges, otherwise let it scroll the page
      if ((e.deltaY > 0 && !isAtRight) || (e.deltaY < 0 && !isAtLeft)) {
        el.scrollLeft += e.deltaY;
      }
    }
  };

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/scroll">
      {/* Left Button */}
      <button 
        onClick={() => scrollBy(-320)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex hover:bg-black/80 backdrop-blur-sm"
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Button */}
      <button 
        onClick={() => scrollBy(320)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex hover:bg-black/80 backdrop-blur-sm"
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>

      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex overflow-x-auto gap-4 px-5 pb-8 snap-x snap-mandatory md:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
      >
        {children}
      </div>
    </div>
  );
}
