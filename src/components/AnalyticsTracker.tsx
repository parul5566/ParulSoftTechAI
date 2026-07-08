"use client";

import { useEffect } from "react";

export default function AnalyticsTracker() {
  useEffect(() => {
    // Generate or retrieve session ID
    const getSessionId = () => {
      let id = sessionStorage.getItem("pst_session");
      if (!id) {
        id = `pst_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
        sessionStorage.setItem("pst_session", id);
      }
      return id;
    };

    const sessionId = getSessionId();
    const track = (eventType: string, pagePath?: string) => {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventType, pagePath, sessionId }),
      }).catch(() => {});
    };

    // Track page view
    track("page_view", window.location.pathname);

    // Track scroll depth
    let maxScroll = 0;
    const onScroll = () => {
      const scrolled = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrolled > maxScroll + 25) {
        maxScroll = scrolled;
        track("scroll_depth", `${scrolled}%`);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Track time on page
    const timeInterval = setInterval(() => {
      track("time_on_page", `${Math.floor(performance.now() / 1000)}s`);
    }, 30000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(timeInterval);
    };
  }, []);

  return null;
}
