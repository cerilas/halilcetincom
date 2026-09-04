"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReelCard } from "@/components/ui/reel-card";

interface Reel {
  id: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  profileName: string;
  profilePic: string | null;
  description: string | null;
  likes: number;
  comments: number;
}

export function ReelsCarousel({ reels }: { reels: Reel[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  // Handle desktop mouse wheel horizontal scroll
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    if (e.deltaY !== 0 && e.deltaX === 0) {
      const el = scrollRef.current;
      const isAtLeft = el.scrollLeft === 0;
      const isAtRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

      if ((e.deltaY > 0 && !isAtRight) || (e.deltaY < 0 && !isAtLeft)) {
        el.scrollLeft += e.deltaY;
      }
    }
  };

  const scrollByOffset = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const children = Array.from(el.children) as HTMLElement[];
    if (children[index]) {
      const childCenter = children[index].offsetLeft + children[index].offsetWidth / 2;
      const targetScrollLeft = childCenter - el.clientWidth / 2;
      el.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
    // Optional: Add a class to indicate dragging (like grabbing cursor)
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.scrollSnapType = 'none'; // disable snap while dragging
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.scrollSnapType = 'x mandatory'; // re-enable snap
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll fast
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  // Track active index based on scroll position
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let rafId: number;

    const calculateActiveIndex = () => {
      const containerCenter = el.scrollLeft + el.clientWidth / 2;
      const children = Array.from(el.children) as HTMLElement[];
      
      let minDistance = Infinity;
      let closestIndex = 0;

      children.forEach((child, index) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(containerCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(calculateActiveIndex);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    // Initial calculation
    calculateActiveIndex();

    return () => {
      el.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [activeIndex]);

  return (
    <div className="relative group/scroll py-10 overflow-hidden">
      {/* Left Button */}
      <button 
        onClick={() => scrollByOffset(-320)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex hover:bg-black/80 backdrop-blur-sm shadow-xl"
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Button */}
      <button 
        onClick={() => scrollByOffset(320)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex hover:bg-black/80 backdrop-blur-sm shadow-xl"
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>

      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex items-center overflow-x-auto px-[50vw] pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth cursor-grab active:cursor-grabbing"
        // We use px-[50vw] to allow the first and last items to be perfectly centered on the screen.
        // We will adjust it dynamically with style to be exactly 50vw - (cardWidth / 2).
        style={{
           paddingLeft: "calc(50vw - 150px)", 
           paddingRight: "calc(50vw - 150px)"
        }}
      >
        {reels.map((reel, index) => (
          <ReelCard 
            key={reel.id} 
            reel={reel} 
            isActive={index === activeIndex} 
            onActivate={() => scrollToCard(index)}
          />
        ))}
      </div>
    </div>
  );
}
