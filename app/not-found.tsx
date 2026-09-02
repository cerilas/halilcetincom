import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">404</p>
      <h1 className="mt-4 font-display text-5xl">Sayfa bulunamadı</h1>
      <Link href="/" className="mt-8 text-sm text-gold">
        Ana sayfaya dön
      </Link>
    </main>
  );
}
