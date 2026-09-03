"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlareButton } from "@/components/ui/glare-button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/yonetim/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/yonetim/mesajlar");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Giriş başarısız");
      }
    } catch (err) {
      setError("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-3xl border border-line bg-card p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10">
          <div className="mb-8 text-center">
            <p className="text-xs tracking-[0.2em] text-gold uppercase mb-2 font-medium">Yönetim Paneli</p>
            <h1 className="font-display text-3xl">Giriş Yap</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs tracking-wide text-muted mb-1">E-Posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                placeholder="ornek@cerilas.com"
              />
            </div>
            <div>
              <label className="block text-xs tracking-wide text-muted mb-1">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <GlareButton type="submit" className="w-full bg-gold text-white font-bold dark:text-black dark:font-medium mt-4">
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </GlareButton>
          </form>
        </div>
      </div>
    </div>
  );
}
