"use client";

import { useState } from "react";
import { GlareButton } from "@/components/ui/glare-button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? "ok" : "err");
    if (res.ok) form.reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-line bg-card p-6"
    >
      <Field name="name" label="Ad soyad" required />
      <Field name="phone" label="Telefon" required />
      <Field name="email" label="E-posta" type="email" />
      <label className="block">
        <span className="text-xs tracking-wide text-muted">Mesaj</span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold"
        />
      </label>
      <GlareButton type="submit" className="w-full bg-gold text-black">
        Gönder
      </GlareButton>
      {status === "ok" && (
        <p className="text-sm text-gold">Talebiniz alındı. En kısa sürede dönüş yapacağız.</p>
      )}
      {status === "err" && (
        <p className="text-sm text-red-300">Gönderilemedi. Tekrar deneyin.</p>
      )}
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs tracking-wide text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold"
      />
    </label>
  );
}
