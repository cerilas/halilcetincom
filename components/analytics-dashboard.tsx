"use client";

import { useState, useEffect, useMemo } from "react";
import { getAnalyticsData } from "@/app/yonetim/actions";
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Users, Eye, Clock, MapPin, Loader2 } from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { cn } from "@/lib/utils";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function AnalyticsDashboard() {
  const [days, setDays] = useState<number>(7);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getAnalyticsData(days).then(res => {
      if (isMounted) {
        setData(res);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [days]);

  // Compute metrics
  const metrics = useMemo(() => {
    const totalVisits = data.length;
    const uniqueSessions = new Set(data.map(d => d.sessionId)).size;
    
    // Average duration (only counting non-zero durations to be accurate, or all?)
    const visitsWithDuration = data.filter(d => d.duration > 0);
    const avgDuration = visitsWithDuration.length > 0 
      ? Math.floor(visitsWithDuration.reduce((acc, curr) => acc + curr.duration, 0) / visitsWithDuration.length)
      : 0;

    // Top pages
    const pageCounts = data.reduce((acc: any, curr) => {
      const path = new URL(curr.url).pathname;
      acc[path] = (acc[path] || 0) + 1;
      return acc;
    }, {});
    const topPages = Object.entries(pageCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 5);

    // Chart Data (Group by Day)
    const chartDataMap = data.reduce((acc: any, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' });
      if (!acc[date]) acc[date] = { date, visits: 0, unique: new Set() };
      acc[date].visits += 1;
      acc[date].unique.add(curr.sessionId);
      return acc;
    }, {});
    
    const chartData = Object.values(chartDataMap).map((d: any) => ({
      date: d.date,
      visits: d.visits,
      unique: d.unique.size
    }));

    // Top Countries
    const countryCounts = data.reduce((acc: any, curr) => {
      const c = curr.country || "Bilinmiyor";
      acc[c] = (acc[c] || 0) + 1;
      return acc;
    }, {});
    const topCountries = Object.entries(countryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a: any, b: any) => b.count - a.count);

    return { totalVisits, uniqueSessions, avgDuration, topPages, chartData, topCountries };
  }, [data]);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} dk ${s} sn`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-display">İstatistikler</h1>
        
        <div className="flex bg-card border border-line p-1 rounded-xl overflow-x-auto w-full sm:w-auto max-w-full no-scrollbar">
          {[
            { label: "Bugün", value: 1 },
            { label: "3 Gün", value: 3 },
            { label: "1 Hafta", value: 7 },
            { label: "1 Ay", value: 30 },
            { label: "3 Ay", value: 90 },
            { label: "1 Yıl", value: 365 },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setDays(opt.value)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all",
                days === opt.value
                  ? "bg-background text-foreground shadow-sm ring-1 ring-line/50"
                  : "text-muted hover:text-foreground hover:bg-line/20"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center border border-line rounded-3xl bg-card">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-line rounded-3xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted">Toplam Ziyaret</p>
                <p className="text-2xl font-bold">{metrics.totalVisits}</p>
              </div>
            </div>
            <div className="bg-card border border-line rounded-3xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted">Tekil Ziyaretçi</p>
                <p className="text-2xl font-bold">{metrics.uniqueSessions}</p>
              </div>
            </div>
            <div className="bg-card border border-line rounded-3xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted">Ortalama Süre</p>
                <p className="text-2xl font-bold">{formatDuration(metrics.avgDuration)}</p>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart */}
            <div className="bg-card border border-line rounded-3xl p-6 lg:col-span-2">
              <h2 className="text-lg font-medium mb-6">Trafik Grafiği</h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metrics.chartData}>
                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--line)', borderRadius: '12px' }}
                      itemStyle={{ color: 'var(--foreground)' }}
                    />
                    <Line type="monotone" name="Toplam" dataKey="visits" stroke="var(--gold)" strokeWidth={3} dot={false} />
                    <Line type="monotone" name="Tekil" dataKey="unique" stroke="#3b82f6" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-card border border-line rounded-3xl p-6">
              <h2 className="text-lg font-medium mb-6">En Çok Ziyaret Edilenler</h2>
              <div className="space-y-4">
                {metrics.topPages.map((page, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm truncate max-w-[200px]" title={page.name}>{page.name === "/" ? "/ (Anasayfa)" : page.name}</span>
                    <span className="text-sm font-medium bg-line/30 px-2 py-1 rounded-md">{page.count as number}</span>
                  </div>
                ))}
                {metrics.topPages.length === 0 && (
                  <p className="text-muted text-sm">Henüz veri yok.</p>
                )}
              </div>
            </div>
          </div>

          {/* Location / Map Row */}
          <div className="bg-card border border-line rounded-3xl p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold" /> Konuma Göre Ziyaretler
              </h2>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {metrics.topCountries.map((country, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-line/50 pb-2 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-line/50 w-6 h-6 flex items-center justify-center rounded-full">{i + 1}</span>
                      <span className="text-sm">{country.name}</span>
                    </div>
                    <span className="text-sm font-medium">{country.count as number}</span>
                  </div>
                ))}
                {metrics.topCountries.length === 0 && (
                  <p className="text-muted text-sm">Henüz veri yok.</p>
                )}
              </div>
            </div>
            <div className="flex-[2] hidden md:block bg-background/50 rounded-2xl overflow-hidden border border-line">
              <ComposableMap projection="geoMercator" projectionConfig={{ scale: 100 }}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="var(--line)"
                        stroke="var(--card)"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "var(--gold)", outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ComposableMap>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
