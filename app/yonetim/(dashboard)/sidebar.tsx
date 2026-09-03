"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MessageSquare, BookOpen, BarChart3, Calendar, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/yonetim/mesajlar", label: "Gelen Mesajlar", icon: MessageSquare },
  { href: "/yonetim/bilgi-bankasi", label: "Bilgi Bankası", icon: BookOpen },
  { href: "/yonetim/istatistikler", label: "İstatistikler", icon: BarChart3 },
  { href: "/yonetim/randevular", label: "Randevu Talepleri", icon: Calendar },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/yonetim/logout", { method: "POST" });
    router.push("/yonetim/login");
    router.refresh();
  };

  return (
    <aside className="w-64 border-r border-line bg-card flex flex-col hidden md:flex">
      <div className="h-20 flex items-center px-6 border-b border-line">
        <Link href="/yonetim/mesajlar" className="font-display text-xl">
          Yönetim<span className="text-gold">Paneli</span>
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive 
                  ? "bg-gold text-white"
                  : "text-muted hover:bg-line/50 hover:text-foreground"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-line">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
