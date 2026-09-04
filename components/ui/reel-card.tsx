"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Send, MoreHorizontal, User, Music } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface ReelCardProps {
  reel: Reel;
  isActive?: boolean;
  onActivate?: () => void;
}

export function ReelCard({ reel, isActive = false, onActivate }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      if (videoRef.current) {
         videoRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (!isActive && onActivate) {
      onActivate();
      return;
    }
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className={cn(
        "relative w-[280px] h-[500px] md:w-[300px] md:h-[533px] shrink-0 snap-center rounded-2xl overflow-hidden bg-black text-white shadow-xl group/card transition-all duration-700 ease-in-out origin-center",
        isActive ? "scale-100 z-10 opacity-100 mx-2 md:mx-6" : "scale-[0.80] md:scale-90 z-0 opacity-40 hover:opacity-70"
      )}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.thumbnailUrl || undefined}
        className="w-full h-full object-cover cursor-pointer"
        onClick={togglePlay}
        loop
        muted
        playsInline
      />
      
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/10 transition-opacity duration-500">
           <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover/card:opacity-100 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L20 12L6 20V4Z" />
              </svg>
           </div>
        </div>
      )}

      {/* Overlay top */}
      <div className={cn("absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-none flex justify-between items-center transition-opacity duration-500", isActive ? "opacity-100" : "opacity-0")}>
        <span className="font-semibold text-lg tracking-wide drop-shadow-md">Reels</span>
      </div>

      {/* Overlay bottom */}
      <div className={cn("absolute bottom-0 left-0 w-full p-4 pb-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end transition-opacity duration-500", isActive ? "opacity-100" : "opacity-0")}>
        {/* Profile and description */}
        <div className="flex items-center gap-3 mb-3 pointer-events-auto">
          <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/20 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
            {reel.profilePic ? (
              <img src={reel.profilePic} alt={reel.profileName} className="w-full h-full object-cover" />
            ) : (
              <User size={18} />
            )}
          </div>
          <span className="font-semibold text-sm drop-shadow-md">{reel.profileName}</span>
          <a 
            href="https://www.instagram.com/mehmetcetin_sacekimi/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-white/40 backdrop-blur-sm text-[11px] px-3 py-1 rounded-full font-medium ml-1 hover:bg-white/20 transition drop-shadow-md"
          >
            Takip Et
          </a>
        </div>

        {reel.description && (
          <p className="text-[13px] leading-snug line-clamp-2 pr-12 text-zinc-100 font-normal mb-3 drop-shadow-md pointer-events-auto">
            {reel.description}
          </p>
        )}

        {/* Audio tag */}
        <div className="flex items-center gap-2 text-xs font-medium drop-shadow-md pointer-events-none">
          <Music size={12} className="shrink-0" />
          <span className="truncate">{reel.profileName} • Orijinal Ses</span>
        </div>
      </div>

      {/* Right side actions */}
      <div className={cn("absolute bottom-8 right-3 flex flex-col items-center gap-5 transition-opacity duration-500 pointer-events-auto", isActive ? "opacity-100" : "opacity-0")}>
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={cn("p-1.5 rounded-full transition-transform active:scale-75 drop-shadow-md", isLiked ? "text-red-500" : "text-white")}>
            <Heart size={28} className={cn("transition-all", isLiked ? "fill-red-500" : "group-hover:text-zinc-300")} />
          </div>
          <span className="text-[11px] font-semibold drop-shadow-md">{reel.likes + (isLiked ? 1 : 0)}</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="p-1.5 text-white drop-shadow-md">
            <MessageCircle size={28} className="group-hover:text-zinc-300 transform -scale-x-100" />
          </div>
          <span className="text-[11px] font-semibold drop-shadow-md">{reel.comments}</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="p-1.5 text-white drop-shadow-md">
            <Send size={26} className="group-hover:text-zinc-300 -rotate-12" />
          </div>
        </button>

        <button className="flex flex-col items-center gap-1 mt-1">
          <div className="p-1.5 text-white drop-shadow-md">
            <MoreHorizontal size={24} />
          </div>
        </button>
        
        {/* Profile audio spinner */}
        <div className={cn("w-8 h-8 rounded-md border-2 border-white mt-3 overflow-hidden flex items-center justify-center bg-zinc-800 shadow-lg pointer-events-none", isPlaying ? "animate-[spin_4s_linear_infinite]" : "")}>
           {reel.profilePic ? (
              <img src={reel.profilePic} alt={reel.profileName} className="w-full h-full object-cover" />
            ) : (
              <User size={16} />
            )}
        </div>
      </div>
    </div>
  );
}
