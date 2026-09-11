import { prisma } from "@/lib/db";
import { saveSiteSettings } from "@/app/yonetim/actions/settings";
import { PaintBucket } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });

  let theme = {
    gold: "#4875a1",
    goldSoft: "#6e5e52",
    background: "#fafafa",
    foreground: "#202121",
  };

  if (settings && settings.themeConfig) {
    try {
      theme = { ...theme, ...JSON.parse(settings.themeConfig) };
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <PaintBucket size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Site Tema Ayarları (Aydınlık Mod)</h1>
          <p className="text-sm text-muted-foreground">
            Sitenin aydınlık moddaki (Light Mode) genel renk paletini buradan değiştirebilirsiniz. Karanlık mod varsayılan renklerinde kalır.
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <form action={saveSiteSettings as any} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            
            <div className="space-y-2">
              <label htmlFor="gold" className="text-sm font-medium">Ana Tema Rengi (Primary/Gold)</label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  id="gold" 
                  name="gold" 
                  defaultValue={theme.gold} 
                  className="h-10 w-14 cursor-pointer rounded-md border p-1"
                />
                <input 
                  type="text" 
                  defaultValue={theme.gold} 
                  className="flex-1 rounded-md border px-3 text-sm font-mono"
                  disabled
                />
              </div>
              <p className="text-xs text-muted-foreground">Butonlar, çizgiler ve önemli vurgular.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="goldSoft" className="text-sm font-medium">İkincil Tema Rengi (Secondary/Soft)</label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  id="goldSoft" 
                  name="goldSoft" 
                  defaultValue={theme.goldSoft} 
                  className="h-10 w-14 cursor-pointer rounded-md border p-1"
                />
                <input 
                  type="text" 
                  defaultValue={theme.goldSoft} 
                  className="flex-1 rounded-md border px-3 text-sm font-mono"
                  disabled
                />
              </div>
              <p className="text-xs text-muted-foreground">İkincil detaylar ve yumuşak arka planlar.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="background" className="text-sm font-medium">Arka Plan Rengi</label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  id="background" 
                  name="background" 
                  defaultValue={theme.background} 
                  className="h-10 w-14 cursor-pointer rounded-md border p-1"
                />
                <input 
                  type="text" 
                  defaultValue={theme.background} 
                  className="flex-1 rounded-md border px-3 text-sm font-mono"
                  disabled
                />
              </div>
              <p className="text-xs text-muted-foreground">Sitenin genel zemin rengi.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="foreground" className="text-sm font-medium">Yazı Rengi (Foreground)</label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  id="foreground" 
                  name="foreground" 
                  defaultValue={theme.foreground} 
                  className="h-10 w-14 cursor-pointer rounded-md border p-1"
                />
                <input 
                  type="text" 
                  defaultValue={theme.foreground} 
                  className="flex-1 rounded-md border px-3 text-sm font-mono"
                  disabled
                />
              </div>
              <p className="text-xs text-muted-foreground">Genel başlık ve okunabilir metin rengi.</p>
            </div>

          </div>

          <div className="pt-4 flex justify-end border-t">
            <button 
              type="submit" 
              className="rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Ayarları Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
