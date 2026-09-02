"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Inquiry, SiteContent } from "@/lib/types";

const tabs = [
  "klinik",
  "hero",
  "seo",
  "istatistik",
  "tedaviler",
  "sss",
  "yorumlar",
  "hakkında",
  "talepler",
] as const;

type Tab = (typeof tabs)[number];

export function AdminDesk({
  initial,
  inquiries,
}: {
  initial: SiteContent;
  inquiries: Inquiry[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("klinik");
  const [content, setContent] = useState(initial);
  const [status, setStatus] = useState("");

  const patch = useMemo(
    () =>
      <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
        setContent((c) => ({ ...c, [key]: value })),
    [],
  );

  async function save() {
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setStatus(res.ok ? "Kaydedildi. Ana siteyi yenileyin." : "Kayıt başarısız.");
    if (res.ok) router.refresh();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.28em] text-gold uppercase">CMS</p>
          <h1 className="font-display text-4xl">İçerik paneli</h1>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={save}
            className="rounded-full bg-gold px-5 py-2 text-sm text-black"
          >
            Kaydet
          </button>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-line px-5 py-2 text-sm"
          >
            Çıkış
          </button>
        </div>
      </div>
      {status && <p className="mt-4 text-sm text-gold">{status}</p>}

      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`rounded-full px-3 py-1.5 text-xs tracking-wide capitalize ${
              tab === item ? "bg-gold text-black" : "border border-line text-muted"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {tab === "klinik" && (
          <ObjectFields
            data={content.clinic}
            onChange={(clinic) => patch("clinic", clinic)}
          />
        )}
        {tab === "hero" && (
          <ObjectFields
            data={content.hero}
            onChange={(hero) => patch("hero", hero)}
          />
        )}
        {tab === "seo" && (
          <div className="space-y-3">
            <Field
              label="Title"
              value={content.seo.title}
              onChange={(title) => patch("seo", { ...content.seo, title })}
            />
            <Area
              label="Description"
              value={content.seo.description}
              onChange={(description) =>
                patch("seo", { ...content.seo, description })
              }
            />
            <Area
              label="Keywords (virgülle)"
              value={content.seo.keywords.join(", ")}
              onChange={(value) =>
                patch("seo", {
                  ...content.seo,
                  keywords: value.split(",").map((k) => k.trim()).filter(Boolean),
                })
              }
            />
          </div>
        )}
        {tab === "istatistik" &&
          content.stats.map((stat, i) => (
            <div key={stat.id} className="grid gap-3 rounded-xl border border-line p-4 md:grid-cols-3">
              <Field
                label="Değer"
                value={String(stat.value)}
                onChange={(v) => {
                  const stats = [...content.stats];
                  stats[i] = { ...stat, value: Number(v) || 0 };
                  patch("stats", stats);
                }}
              />
              <Field
                label="Sonek"
                value={stat.suffix}
                onChange={(suffix) => {
                  const stats = [...content.stats];
                  stats[i] = { ...stat, suffix };
                  patch("stats", stats);
                }}
              />
              <Field
                label="Etiket"
                value={stat.label}
                onChange={(label) => {
                  const stats = [...content.stats];
                  stats[i] = { ...stat, label };
                  patch("stats", stats);
                }}
              />
            </div>
          ))}
        {tab === "tedaviler" &&
          content.treatments.map((item, i) => (
            <div key={item.id} className="space-y-3 rounded-xl border border-line p-4">
              <Field
                label="Başlık"
                value={item.title}
                onChange={(title) => {
                  const treatments = [...content.treatments];
                  treatments[i] = { ...item, title };
                  patch("treatments", treatments);
                }}
              />
              <Area
                label="Özet"
                value={item.excerpt}
                onChange={(excerpt) => {
                  const treatments = [...content.treatments];
                  treatments[i] = { ...item, excerpt };
                  patch("treatments", treatments);
                }}
              />
              <Area
                label="Detay"
                value={item.description}
                onChange={(description) => {
                  const treatments = [...content.treatments];
                  treatments[i] = { ...item, description };
                  patch("treatments", treatments);
                }}
              />
            </div>
          ))}
        {tab === "sss" &&
          content.faqs.map((item, i) => (
            <div key={item.id} className="space-y-3 rounded-xl border border-line p-4">
              <Field
                label="Soru"
                value={item.question}
                onChange={(question) => {
                  const faqs = [...content.faqs];
                  faqs[i] = { ...item, question };
                  patch("faqs", faqs);
                }}
              />
              <Area
                label="Cevap"
                value={item.answer}
                onChange={(answer) => {
                  const faqs = [...content.faqs];
                  faqs[i] = { ...item, answer };
                  patch("faqs", faqs);
                }}
              />
            </div>
          ))}
        {tab === "yorumlar" &&
          content.testimonials.map((item, i) => (
            <div key={item.id} className="space-y-3 rounded-xl border border-line p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <Field
                  label="İsim"
                  value={item.name}
                  onChange={(name) => {
                    const testimonials = [...content.testimonials];
                    testimonials[i] = { ...item, name };
                    patch("testimonials", testimonials);
                  }}
                />
                <Field
                  label="Şehir / ülke"
                  value={item.country}
                  onChange={(country) => {
                    const testimonials = [...content.testimonials];
                    testimonials[i] = { ...item, country };
                    patch("testimonials", testimonials);
                  }}
                />
              </div>
              <Area
                label="Yorum"
                value={item.quote}
                onChange={(quote) => {
                  const testimonials = [...content.testimonials];
                  testimonials[i] = { ...item, quote };
                  patch("testimonials", testimonials);
                }}
              />
            </div>
          ))}
        {tab === "hakkında" && (
          <div className="space-y-3">
            <Field
              label="Başlık"
              value={content.about.headline}
              onChange={(headline) => patch("about", { ...content.about, headline })}
            />
            <Area
              label="Metin"
              value={content.about.body}
              onChange={(body) => patch("about", { ...content.about, body })}
            />
            <Area
              label="Öne çıkanlar (satır satır)"
              value={content.about.highlights.join("\n")}
              onChange={(value) =>
                patch("about", {
                  ...content.about,
                  highlights: value.split("\n").map((v) => v.trim()).filter(Boolean),
                })
              }
            />
          </div>
        )}
        {tab === "talepler" &&
          (inquiries.length === 0 ? (
            <p className="text-sm text-muted">Henüz talep yok.</p>
          ) : (
            inquiries.map((item) => (
              <article key={item.id} className="rounded-xl border border-line p-4">
                <p className="text-sm">
                  {item.name} · {item.phone}
                </p>
                <p className="mt-1 text-xs text-muted">{item.email}</p>
                <p className="mt-3 text-sm text-foreground/80">{item.message}</p>
                <p className="mt-2 text-xs text-muted">
                  {new Date(item.createdAt).toLocaleString("tr-TR")}
                </p>
              </article>
            ))
          ))}
      </div>
    </div>
  );
}

function ObjectFields<T extends Record<string, string>>({
  data,
  onChange,
}: {
  data: T;
  onChange: (next: T) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {Object.entries(data).map(([key, value]) => (
        <Field
          key={key}
          label={key}
          value={value}
          onChange={(next) => onChange({ ...data, [key]: next })}
        />
      ))}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs tracking-wide text-muted">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-line bg-background px-3 py-2 text-sm outline-none focus:border-gold"
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs tracking-wide text-muted">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="mt-1 w-full rounded-xl border border-line bg-background px-3 py-2 text-sm outline-none focus:border-gold"
      />
    </label>
  );
}
