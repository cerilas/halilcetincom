"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Şifre hatalı.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 rounded-2xl border border-line bg-card p-8"
      >
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Admin</p>
        <h1 className="font-display text-3xl">Panele giriş</h1>
        <input
          name="password"
          type="password"
          required
          placeholder="Şifre"
          className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold"
        />
        {error && <p className="text-sm text-red-300">{error}</p>}
        <button type="submit" className="w-full rounded-full bg-gold py-3 text-sm text-black">
          Giriş
        </button>
      </form>
    </main>
  );
}
