"use client";

import { useState } from "react";
import { Search, Trophy, AlertCircle, Loader2, Globe } from "lucide-react";
import { checkGoogleRanking } from "@/app/yonetim/actions/seo";
import { cn } from "@/lib/utils";

export function GoogleRankTracker() {
  const [keyword, setKeyword] = useState("Gaziantep Saç Ekimi");
  const [domain, setDomain] = useState("halilcetinsacekimi.com");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<{ rank: number; totalScanned: number; error?: string } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || !domain.trim()) return;

    setIsSearching(true);
    setResult(null);

    try {
      const res = await checkGoogleRanking(keyword, domain);
      if (res.success) {
        setResult({ rank: res.rank!, totalScanned: res.totalScanned! });
      } else {
        setResult({ rank: -1, totalScanned: 0, error: res.error });
      }
    } catch (err: any) {
      setResult({ rank: -1, totalScanned: 0, error: err.message });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gold/10 via-background to-background border border-gold/20 rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden shadow-lg">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center text-gold shadow-inner border border-gold/30">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-medium text-foreground">Anlık Google Sıralamam</h2>
            <p className="text-sm text-muted">Sitenizin belirlediğiniz anahtar kelimedeki sırasını anında öğrenin.</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted" />
            </div>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-line rounded-xl text-sm focus:border-gold outline-none transition-all shadow-sm focus:shadow-md"
              placeholder="Anahtar Kelime (örn: Saç Ekimi)"
              required
            />
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Globe className="h-4 w-4 text-muted" />
            </div>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-line rounded-xl text-sm focus:border-gold outline-none transition-all shadow-sm focus:shadow-md"
              placeholder="Hedef Site (örn: halilcetinsacekimi.com)"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-8 py-3 bg-gold text-background font-medium rounded-xl hover:bg-gold/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center min-w-[160px]"
          >
            {isSearching ? (
              <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Aranıyor...</span>
            ) : "Sıramı Bul"}
          </button>
        </form>

        {/* Results Area */}
        {isSearching && (
          <div className="flex flex-col items-center justify-center py-10 text-gold animate-pulse bg-gold/5 rounded-2xl border border-gold/10">
            <Search className="w-10 h-10 mb-4 animate-bounce" />
            <p className="font-medium text-lg">Google'da sonuçlar taranıyor...</p>
            <p className="text-sm opacity-70 mt-1">Bu işlem birkaç saniye sürebilir.</p>
          </div>
        )}

        {!isSearching && result && (
          <div className={cn(
            "p-6 md:p-8 rounded-2xl border transition-all duration-500 animate-in fade-in zoom-in-95",
            result.error ? "bg-red-500/5 border-red-500/20" : 
            result.rank > 0 && result.rank <= 3 ? "bg-green-500/5 border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.15)]" :
            result.rank > 3 && result.rank <= 10 ? "bg-gold/5 border-gold/30 shadow-[0_0_40px_rgba(212,175,55,0.15)]" :
            result.rank > 10 ? "bg-background border-line shadow-lg" :
            "bg-line/10 border-line"
          )}>
            {result.error ? (
              <div className="flex items-center gap-4 text-red-500">
                <div className="p-3 bg-red-500/10 rounded-full">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Sorgulama Başarısız</h3>
                  <p className="text-sm mt-1">{result.error}</p>
                </div>
              </div>
            ) : result.rank > 0 ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground flex items-center gap-2 justify-center md:justify-start">
                    {result.rank <= 3 ? "🎉 Harika!" : result.rank <= 10 ? "👏 Çok İyi!" : "👍 Bulundu"}
                    <span className={cn(
                      "text-3xl md:text-4xl ml-2", 
                      result.rank <= 3 ? "text-green-500" : result.rank <= 10 ? "text-gold" : "text-foreground"
                    )}>{result.rank}. sıradasınız</span>
                  </h3>
                  <p className="text-muted mt-3 text-lg">
                    <strong className="text-foreground">"{keyword}"</strong> araması için 
                    Google'da ilk {result.totalScanned} organik sonuç arasında tespit edildiniz.
                  </p>
                </div>
                <div className={cn(
                  "w-24 h-24 rounded-full border-4 flex items-center justify-center flex-shrink-0 shadow-2xl font-display font-bold text-4xl",
                  result.rank <= 3 ? "bg-green-500/10 border-green-500 text-green-500" : 
                  result.rank <= 10 ? "bg-gold/10 border-gold text-gold" : 
                  "bg-background border-muted text-foreground"
                )}>
                  #{result.rank}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 text-muted">
                <div className="p-3 bg-line/20 rounded-full">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-lg">İlk {result.totalScanned} sonuçta bulunamadı</p>
                  <p className="text-sm mt-1">"{keyword}" araması için siteniz görünür sonuçlar arasında yer almıyor. Daha spesifik bir kelime deneyebilir veya SEO çalışmalarınızı gözden geçirebilirsiniz.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
