"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (value: string) => {
    setQuery(value);
    
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("q", value);
        params.delete("page"); // Reset pagination on search
      } else {
        params.delete("q");
      }
      
      router.push(`/bilgi-bankasi?${params.toString()}`);
    });
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-muted/50" />
        <input
          type="text"
          placeholder="Makalelerde ara..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="h-12 w-full rounded-full border border-line bg-card/50 pl-11 pr-11 text-sm text-foreground outline-none transition-all focus:border-gold/50 focus:bg-card focus:ring-1 focus:ring-gold/50"
        />
        {query && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-3 flex h-6 w-6 items-center justify-center rounded-full bg-line/50 text-muted transition-colors hover:bg-line hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {isPending && (
        <div className="absolute right-4 -bottom-6 text-[10px] text-muted/50">
          Aranıyor...
        </div>
      )}
    </div>
  );
}
