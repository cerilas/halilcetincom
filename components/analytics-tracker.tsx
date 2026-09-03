"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const pageViewIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    // Skip if running in admin dashboard
    if (pathname?.startsWith("/yonetim")) return;

    // Generate or get sessionId
    let sessionId = sessionStorage.getItem("agy_session_id");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("agy_session_id", sessionId);
    }

    startTimeRef.current = Date.now();
    pageViewIdRef.current = null;

    const trackPage = async () => {
      try {
        const res = await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            url: window.location.href,
            referrer: document.referrer,
          }),
        });
        const data = await res.json();
        if (data.id) {
          pageViewIdRef.current = data.id;
        }
      } catch (error) {
        console.error("Failed to track page view", error);
      }
    };

    trackPage();

    // Send duration on unmount or beforeunload
    const sendDuration = () => {
      if (!pageViewIdRef.current) return;
      
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
      
      // Use navigator.sendBeacon for reliable delivery when page unloads
      const payload = JSON.stringify({
        pageViewId: pageViewIdRef.current,
        duration,
      });
      
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/analytics", new Blob([payload], { type: "application/json" }));
      } else {
        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true
        }).catch(() => {});
      }
    };

    window.addEventListener("beforeunload", sendDuration);

    return () => {
      window.removeEventListener("beforeunload", sendDuration);
      sendDuration();
    };
  }, [pathname]);

  return null;
}
